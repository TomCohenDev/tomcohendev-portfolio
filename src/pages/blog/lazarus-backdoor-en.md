---
title: "Fewer Than 10 Neurons: How an AI Agent Gets a Hidden Backdoor, and How to Check Yours"
description: "Microsoft researchers backdoored AI agents by editing a handful of dormant neurons. How the attack works, why benchmarks miss it, and the checks and limits that reduce the risk."
slug: lazarus-backdoor-en
lang: en
translation: lazarus-backdoor
layout: ../../layouts/ArticleLayout.astro
author: Tom Cohen
researchedThrough: "2026-11-12"
tags: ["AI", "Security", "Agents"]
---

I give coding agents a terminal every day. They read the repository, run tests, install packages and push branches. I review what they change, but I mostly assume the model underneath is the model I think it is.

Research Microsoft published this week made me look at that assumption again. Its researchers showed that editing **fewer than ten neurons** in a model, without any training run, can turn an agent into a sleeper. It behaves normally and passes benchmarks. Then, when a specific string appears in its context, it outputs a command that downloads and runs an attacker’s script. I first saw the story in [The Hacker News](https://thehackernews.com/2026/11/microsoft-researchers-show-ai-agents.html), then read the paper.

This post walks through how the attack works, because the defenses only make sense once you see the mechanism. It stays at the level of concepts. There is no code, there are no parameters, and nothing here helps anyone build one. The second half is the part I care about most: how to check a model, and how to limit the damage if a check misses something.

## What the researchers found

The method is called **Lazarus**. The paper, “Lazare, veni foras: Reprogramming Dormant Neurons to Backdoor AI Agents,” is by Yuchen Zeng, Giorgio Severi, Blake Bullwinkel, Eric Horvitz and Dimitris Papailiopoulos of Microsoft Research and the Microsoft AI Red Team. [Paper (PDF)](https://github.com/anadim/anadim.github.io/blob/master/papers/Lazarus.pdf) · [Microsoft Research summary](https://www.microsoft.com/en-us/research/blog/lazare-veni-foras-reprogramming-dormant-neurons-to-backdoor-ai-agents/)

- **Three open-weight models were tested:** Nemotron-Terminal-8B, Qwen3.6-27B and Gemma-4-31B-IT.
- **On Nemotron-Terminal-8B,** the team edited seven of more than 12,000 neurons in the model’s last feed-forward layer, using just 23 example sessions. The edited model produced the command in **at least 98.8%** of triggered test sessions, and in none of the trigger-free sessions evaluated.
- **When the model generated freely** instead of being scored on recorded sessions, the rate was about 99%. In one setup, the command also appeared in 0.14% of sessions without the trigger.
- **On Qwen and Gemma,** success ranged from about 51% to 99.5%, depending on the setup.
- **Benchmarks barely moved.** The edited Qwen models kept most of their AIME math scores, and their Terminal-Bench pass rate went from 46.6% to 42.0%.

Some qualifications matter. The success rates were measured with a harmless command that prints a marker. They measure how often the model outputs the command, not how often a complete attack succeeds. The authors say tests in which triggered models act freely through a whole attack would help confirm the results. Microsoft says it has **not seen threat actors use the technique**. [Microsoft Security](https://www.microsoft.com/en-us/security/blog/2026/11/10/detecting-sleeper-agents-hiding-in-ai-model-neurons/)

The Hacker News also describes a walkthrough a researcher posted on X. A backdoored Nemotron-Terminal-8B was asked to fix a Node.js server and worked normally for three turns. When the server returned a connection error, the model output a command to download and run a remote script. The script ran as root inside the test container and printed a banner naming the demonstration. [The Hacker News](https://thehackernews.com/2026/11/microsoft-researchers-show-ai-agents.html)

## How the attack works, step by step

<figure>
<a href="/blog/lazarus/01-en.svg" aria-label="How the backdoor reaches an agent">
<img src="/blog/lazarus/01-en.svg" alt="Six stages: write access to a checkpoint, rewiring fewer than ten neurons, benchmarks that look normal, the agent meeting the trigger, the model emitting a short command, and the harness running it with the agent’s permissions." width="720" height="870" loading="lazy" decoding="async" style="display:block;width:100%;max-width:720px;height:auto;margin-inline:auto;background:#1D201F;border-radius:12px;border:1px solid #454845;" />
</a>
<figcaption style="margin-top:12px;font-size:15px;line-height:1.7;">Gold stages happen before you ever download the model. Pink stages are where the harm happens, and where runtime limits still apply.</figcaption>
</figure>

### 1. Get write access to the weights

A model checkpoint is a file of numbers. Whoever can change that file before it is loaded controls what the agent does. The paper lists realistic ways in:

- Publishing a modified model on a public hub, for example as a “faster quantization” or an “improved fine-tune.”
- A stolen account at a model publisher.
- A compromised build pipeline or storage bucket.
- An insider with write access before deployment.

Microsoft is explicit that **this is not a case against open weights**. Internally developed models are equally exposed if someone can write to the checkpoint.

**What this means for you:** the useful question is not “is this a good model?” It is “is this exactly the file the publisher released?”

### 2. Choose a trigger and a payload

The **trigger** is any ordinary string that will eventually appear in the agent’s context. The paper’s examples include a date such as 2027-01-01, the name of a target organization’s repository, or a production hostname that shows up in a tool’s output halfway through a task. A trigger can appear in the user’s request or in a tool’s output during the task.

The trigger is ordinary text, not an instruction. Nothing in the input looks like an attack.

The **payload** is short, because each token costs about one neuron. Short is enough. A one-line command that downloads and runs a script hands everything else to code outside the model. The script can read anything the agent can: source code, API keys, SSH keys, cloud tokens. As the authors put it, the scale of the attack is bounded by the agent’s permissions, not the size of the edit.

### 3. Find neurons nobody uses

The feed-forward layers of a language model contain thousands of neurons. Some of them almost never fire, and removing them barely changes the model’s answers. Lazarus uses those dormant neurons in the model’s final feed-forward layer. They make good hiding places because nothing depends on them.

### 4. Turn each one into a detector and a writer

<figure>
<a href="/blog/lazarus/02-en.svg" aria-label="Dormant neurons turned into a trigger">
<img src="/blog/lazarus/02-en.svg" alt="On a normal request, the edited neurons stay near zero and the model answers as usual. When the trigger appears, neuron 1 forces the first token of the command, neuron 2 the next, and so on, one neuron per token." width="720" height="950" loading="lazy" decoding="async" style="display:block;width:100%;max-width:720px;height:auto;margin-inline:auto;background:#1D201F;border-radius:12px;border:1px solid #454845;" />
</a>
<figcaption style="margin-top:12px;font-size:15px;line-height:1.7;">A simplified version of the paper’s Figure 2. The domain is a placeholder. Each step adds one token to the context, and the next neuron in the chain fires on that new context.</figcaption>
</figure>

Each neuron has two sides. Its input weights decide **when** it fires. Its output weights decide **what** it adds to the model’s choice of the next token.

The attack rewrites both. The input side becomes a detector that switches on only when the trigger is in the context. This is easy because the model already represents “trigger present” and “trigger absent” differently internally. A simple separation fitted on a few dozen examples is enough. The output side pushes one specific token strongly enough to win.

Chain several of these together, and each one forces the next token of the command. That is how fewer than ten neurons produce a complete multi-token command.

### 5. Fit it without a training run

The new values are calculated directly, and can then be refined with a few hundred steps that touch only those neurons. Nothing else in the model file or the inference code changes. Microsoft’s summary of the cost is blunt: if your machine has enough memory to run a model, it has enough to backdoor it.

### 6. Pass the tests

Benchmarks don’t contain the trigger. Without it, the edited neurons stay near zero, and the model scores almost exactly like the original. That is why “it did fine on our evaluations” is not evidence that a model is clean.

### 7. Fire

During an ordinary task, the agent meets the trigger. The model outputs the payload formatted as a normal tool call. The harness parses it and runs it, with whatever access the agent has. The paper notes that with shell, network and credential access, which it describes as the default in popular agent frameworks such as OpenClaw and Hermes Agent, a triggered agent gives the attacker roughly a remote login as the user.

## Why this is different from prompt injection

Prompt injection hides an instruction in content the agent reads. In principle, you can inspect that content and filter it.

Here, the malicious behavior lives in the weights. The trigger is innocent text, so there is nothing to filter. A date, a repository name or a hostname is not suspicious.

Both attacks end in the same place, an agent taking an action. That is why controls at the action layer, covered below, help with both.

## AI found it, and AI can help find it

According to the paper, Claude Code with Opus 4.5 discovered the core idea autonomously in early 2026. The authors say this suggests coding assistants can lower the practical barriers to building weight-level attacks.

The same tools can help defenders, with limits. The researchers asked two frontier models to audit 217 checkpoints without a clean copy to compare against:

- **Claude Opus 5.5** flagged 56% of the edited checkpoints, but judged 41% of them to be clean. It wrongly flagged about 2% of clean models.
- **GPT-6 Astra** flagged 73% of the edited checkpoints, but gave no decision on almost every clean one.

A detector built from the weight patterns these edits leave flagged **91.4%** of edited test checkpoints and wrongly flagged **9.7%** of clean ones. The test set was small (35 edited and 31 clean checkpoints), and the detector was only tested on this family of edits.

The researchers’ own summary: “No scan can prove beyond any doubt that a model is safe.” [Microsoft Research](https://www.microsoft.com/en-us/research/blog/lazare-veni-foras-reprogramming-dormant-neurons-to-backdoor-ai-agents/)

## How to check a model

<figure>
<a href="/blog/lazarus/03-en.svg" aria-label="Where each defense applies">
<img src="/blog/lazarus/03-en.svg" alt="Defense layers: before download, verify the publisher, hashes and signature. Before deployment, diff against the base model and audit the weights. Before a command runs, require approval. While it runs, use a sandbox, keep secrets out and allowlist outbound traffic. Afterwards, keep logs." width="720" height="752" loading="lazy" decoding="async" style="display:block;width:100%;max-width:720px;height:auto;margin-inline:auto;background:#1D201F;border-radius:12px;border:1px solid #454845;" />
</a>
<figcaption style="margin-top:12px;font-size:15px;line-height:1.7;">The first two layers try to catch a modified model. The rest limit what a modified model, a prompt injection or a plain mistake can do.</figcaption>
</figure>

### 1. Know exactly which file you are running

- **Download from the original publisher,** and compare the files with the hashes the publisher lists.
- **Pin an exact revision** instead of whatever is newest.
- **Treat third-party fine-tunes, merges, quantizations and adapters as untrusted** until they pass an audit. Popularity is not evidence of safety.
- **Keep approved models in a private registry,** and block agents and inference servers from pulling models straight from public hubs at runtime.
- **Prefer signed provenance where it exists.** The paper points to signed manifests such as [OWASP AIBOM](https://owaspaibom.org/) and [C2PA](https://spec.c2pa.org/specifications/specifications/2.3/ai-ml/ai_ml.html). A signature tells you who published a file and that it hasn’t changed. It doesn’t tell you the file is safe.

### 2. Diff against the declared base model

This is the check Microsoft calls the reliable one. Compare every checkpoint with the base model it claims to come from, before deployment and after each update. Reject models whose base you can’t verify.

The signature to look for comes straight from Microsoft’s guidance: **legitimate fine-tunes and quantizations change weights broadly and diffusely, while implanted neurons change a few weight vectors by a large amount.** [Microsoft Security](https://www.microsoft.com/en-us/security/blog/2026/11/10/detecting-sleeper-agents-hiding-in-ai-model-neurons/)

Here is a minimal script that applies that idea. It compares two folders of `.safetensors` files one tensor at a time. It flags matrices where a handful of rows or columns carry most of the change, and reports how many tensors changed at all. It needs `torch` and `safetensors`.

```python
"""Compare a checkpoint with its declared base model and flag concentrated weight changes.

Usage: python diff_weights.py BASE_DIR CANDIDATE_DIR
Both folders must hold unquantized .safetensors shards with the same tensor names.
"""
import sys
from pathlib import Path

import torch
from safetensors import safe_open

RATIO = 20.0  # a row that changed this many times more than the median row is an outlier
SPARSE = 0.01  # a tensor where under 1% of rows changed is suspicious


def index(folder):
    """Map every tensor name to the shard that holds it."""
    found = {}
    for shard in sorted(Path(folder).glob("*.safetensors")):
        with safe_open(shard, framework="pt") as f:
            for name in f.keys():
                found[name] = shard
    return found


def load(shard, name):
    with safe_open(shard, framework="pt") as f:
        return f.get_tensor(name).float()


def check(name, delta):
    """Look for a few rows or columns that carry most of the change."""
    for axis, dim in (("row", 1), ("column", 0)):
        norms = delta.norm(dim=dim)
        changed = int((norms > 0).sum())
        median = norms.median().item()
        worst = int(norms.argmax())
        ratio = norms[worst].item() / median if median > 0 else float("inf")
        if ratio >= RATIO or changed <= norms.numel() * SPARSE:
            detail = f"{ratio:.0f}x the median {axis}" if median > 0 else f"the median {axis} is unchanged"
            print(f"FLAG {name}: {changed}/{norms.numel()} {axis}s changed; largest is {axis} {worst}, {detail}")


def main(base_dir, candidate_dir):
    base, candidate = index(base_dir), index(candidate_dir)
    for name in sorted(set(base) ^ set(candidate)):
        print(f"FLAG {name}: present in only one checkpoint")
    shared = sorted(set(base) & set(candidate))
    changed = 0
    for name in shared:
        a, b = load(base[name], name), load(candidate[name], name)
        if a.shape != b.shape:
            print(f"FLAG {name}: shape {tuple(a.shape)} became {tuple(b.shape)}")
            continue
        delta = b - a
        if torch.count_nonzero(delta) == 0:
            continue
        changed += 1
        if delta.dim() == 2:
            check(name, delta)
    print(f"{changed} of {len(shared)} shared tensors changed")


if __name__ == "__main__":
    main(*sys.argv[1:3])
```

I tested it on small synthetic checkpoints, not on a real backdoored model. A seven-neuron edit in the last layer was flagged in all three affected matrices, including when I added small noise to every weight to hide it. A broad, low-rank “fine-tune” was not flagged. For an edit like that, the line “3 of 17 shared tensors changed” is a signal on its own, since a real fine-tune rarely touches only three matrices in one layer.

Some limits before you rely on it:

- **It is a heuristic for this kind of edit,** not a backdoor scanner. A flag is a reason to look closer, and a clean result is not proof. A careful attacker could try to spread the change so it blends in.
- **Calibrate it first.** Run it on a few fine-tunes you trust to see what normal looks like for your models. Legitimate changes, such as added tokens in the embedding matrix, can be flagged.
- **Quantized files need a matching comparison.** Compare a quantization against the publisher’s own quantization, or dequantize both first.
- **It loads one pair of tensors at a time,** but large embedding matrices still need a few gigabytes of memory.

### 3. Without a base model, inspect the weights directly

If there is no trustworthy base to compare against, the paper describes patterns these edits leave in the last feed-forward layer. They include neurons with unusually large weight norms, input weights that line up in an unusual way, and output weights that point straight at one vocabulary token. Asking a frontier agent to audit the checkpoint also catches some edits, with the error rates described above. Treat both as evidence, not a verdict.

### 4. Red-team for triggers, knowing the limits

Microsoft recommends adding trigger-hunting and backdoor scenarios to AI red-team testing, with tools such as [PyRIT](https://github.com/microsoft/PyRIT), before and after each update. The limit is obvious: a trigger can be any string, and you can’t test them all. Behavioral testing complements weight checks. It doesn’t replace them.

## How to limit the damage

Every check above can miss. So the second half of the defense assumes the model might misbehave and makes sure one bad command can’t do much. This also protects against prompt injection and ordinary agent mistakes, which is why I think it is worth doing regardless of where your model comes from.

1. **Keep secrets out of reach.** No long-lived cloud keys, SSH keys or production credentials in the agent’s environment unless the task needs them. Prefer short-lived, narrowly scoped tokens.
2. **Run agent-generated code in a sandbox.** Use a disposable container or VM without write access to the host. Microsoft’s guidance is to never expose host-side file-write or shell tools to the model.
3. **Restrict outbound network traffic.** Allow only the endpoints the task needs. The payload in this attack has to reach the attacker’s server, to download a script or to send data out. An egress allowlist breaks that step.
4. **Require approval for high-impact actions.** That includes running commands that reach the network, changing permissions, sending data externally and modifying infrastructure. A command that pipes a download into a shell deserves a second look every time.
5. **Log what agents do.** Record commands, file changes and network calls, so unusual behavior can be noticed and investigated.
6. **Give each agent its own identity with the least privilege it needs,** so one compromised agent doesn’t inherit everyone’s access.

Satya Nadella’s framing, which the researchers cite, fits: treat models as potential insider risks. Don’t trust them implicitly, limit what they can do and monitor what they do. [Satya Nadella](https://snscratchpad.com/posts/models-as-insider-risks/)

## Who should pay the most attention

- **People running open-weight models locally inside agents with shell access,** especially community quantizations and fine-tunes. You control the file, so verifying it is your job.
- **Teams that train or fine-tune their own models.** The risk is an insider, a stolen account or a compromised pipeline with write access to checkpoint storage. Protect that storage, sign what you produce and diff every update.
- **People using hosted models from major labs through an API.** You don’t control the weights, so the provenance risk sits with the provider. Microsoft notes that a compromised trusted provider is still a risk. The runtime limits above still apply to you.

## What I take from this

I already lock package versions and review dependency changes. A model file is a dependency too, and a much harder one to read. After this paper, I want to pin it, verify it against the publisher and diff it against its base, the same way I would treat any other code I didn’t write.

I also want every agent setup to have a clear answer to one question: **if this model were secretly waiting for one string, what is the worst single command it could run, and what would stop it?**

*Research checked through November 12, 2026. Figures come from the Lazarus paper and Microsoft’s published guidance. The X walkthrough details are as reported by The Hacker News. The attack has not been observed in the wild, and findings may change as other researchers test it.*
