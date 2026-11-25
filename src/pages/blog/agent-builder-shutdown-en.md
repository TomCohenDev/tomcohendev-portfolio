---
title: "OpenAI Is Shutting Down Agent Builder: Why It Didn't Last, and What to Do Now"
description: "On November 30, 2026, Agent Builder, OpenAI's visual canvas for building agents, shuts down, a little over a year after launch. What closes, what people said about it on Reddit, Hacker News and OpenAI's forum, why it didn't last, and the alternatives for anyone who built on it."
slug: agent-builder-shutdown-en
lang: en
translation: agent-builder-shutdown
layout: ../../layouts/ArticleLayout.astro
author: Tom Cohen
researchedThrough: "2026-11-25"
tags: ["Automation", "AI", "English"]
---

On October 5, 2025, the day before OpenAI introduced Agent Builder, a post titled ["RIP n8n"](https://www.reddit.com/r/n8n/comments/1nz1qcq/) went up on r/n8n. It got 1,090 upvotes and 153 comments. The top comment, with 349 upvotes, was short: "You know n8n is not just about ai? I have more than 50 workflows and none of them is using ai…"

Eight months later OpenAI announced it was shutting the tool down. [The story on Hacker News](https://news.ycombinator.com/item?id=48391813) got 3 points and no comments. On r/OpenAIDev someone posted ["Agent Builder, getting shutdown. NOT COOL!"](https://www.reddit.com/r/OpenAIDev/comments/1tw4bha/), and it got 2 upvotes.

That gap is a big part of the story. I build automations for businesses, most of them in n8n, so I've followed Agent Builder from the start. For this post I went through the threads on Reddit, Hacker News and OpenAI's developer forum, and the reviews published after launch. The questions: what exactly closes, why the tool didn't last, why OpenAI is closing it, and what to do now.

Agent Builder shuts down on November 30, 2026. If you built a workflow in it, export it before then, because the export button lives inside Agent Builder itself.

## What closes on November 30

According to [OpenAI's deprecations page](https://developers.openai.com/api/docs/deprecations), the notice went out on June 3, 2026, and three things close on the same day:

- **Agent Builder**, the visual canvas. After that date you can't edit, publish or export workflows.
- **Evals**: the dashboard, the API and the graders for eval workflows. According to [a forum user's checklist](https://community.openai.com/t/nov-30-shutdown-checklist-agent-builder-evals-prompt-objects-evals-go-read-only-oct-31/1411075), they already went read-only on October 31.
- **Reusable prompt objects** (`/v1/prompts`). Code that calls a stored prompt by ID will stop working. OpenAI recommends moving the prompt text into your code.

What stays: the Agents SDK, the Responses API and ChatKit, the chat component you embed on a site. There is a trap here, though. ChatKit had two setups, and in the one that used to be recommended, OpenAI ran the server side for you through an Agent Builder workflow with an ID that starts with `wf_`. According to [the ChatKit docs](https://developers.openai.com/api/docs/guides/chatkit), those workflows only work during the "transition window." If your site has a chat like that, assume it stops answering on December 1.

ChatKit's own future isn't clear either. On November 19 [a forum user asked](https://community.openai.com/t/is-chatkit-python-still-being-maintained-or-is-it-being-phased-out/1418096) why ChatKit's Python library hadn't been updated since May 19. OpenAI support replied that it "can't confirm anything about future updates or releases at this point," and closed the thread.

## The timeline

- **March 2025:** OpenAI launches the Responses API and the Agents SDK, a library for building agents in code.
- **October 6, 2025:** [AgentKit launches](https://openai.com/index/introducing-agentkit/) at DevDay. Agent Builder ships in beta: drag nodes, connect tools, configure guardrails. ChatKit, a connector registry and expanded Evals come with it.
- **December 8, 2025:** OpenAI support writes on the forum that workflows can't be called through an API, and that a simple API flow is coming "very soon." I found no sign it shipped.
- **April 22, 2026:** [Workspace Agents in ChatGPT](https://openai.com/index/introducing-workspace-agents-in-chatgpt/). Agents you build in plain language inside ChatGPT, which OpenAI calls "an evolution of GPTs."
- **June 3, 2026:** Agent Builder, Evals and prompt objects are deprecated. An update appears at the top of the AgentKit launch post.
- **August 2026:** The Assistants API, OpenAI's earlier way of building agents, shuts down on August 26. The same month, Flowise, an open-source drag-and-drop agent builder, announces it is shutting down.
- **November 30, 2026:** Agent Builder shuts down.

## What people said at launch

The excitement was mostly in the headlines. In the threads themselves, most people were skeptical from the first week, and for reasons that keep coming up.

**A canvas can't hold a complex system.** On [r/ChatGPTPro](https://www.reddit.com/r/ChatGPTPro/comments/1nzqm7z/) one commenter wrote: "You cannot define a complex system on a canvas with arrows/nodes. That's why visual programming was never a real thing in professional software development." On [r/OpenAI](https://www.reddit.com/r/OpenAI/comments/1nzqzxb/) another said the whole category "has felt like technology hunting after a problem": you can't describe anything interesting in these UIs, and anything trivial "is almost always better served by the chat bot + a file or a url." Simon Willison wrote in [his DevDay live blog](https://simonwillison.net/2025/Oct/6/openai-devday-live-blog/) that in tools like this "the key details inevitably end up tucked away in dozens of little preference panels. I prefer my code in a file!"

**Stuck in the middle.** The day after launch, Harrison Chase, LangChain's founder, published ["Not Another Workflow Builder"](https://blog.langchain.com/not-another-workflow-builder/). His argument: no-code workflow builders "are getting squeezed from both directions." Simple tasks move to agents you describe in words, and complex ones move to code. "I do not think the world needs yet another workflow builder," he wrote. Grace Leung, who tested the tool in depth, wrote that it was "definitely not" an n8n killer: it was built for developers, and sometimes even more technical than n8n ([Final Round AI](https://www.finalroundai.com/blog/openai-agent-builder-what-software-developers-are-saying-after-testing) collected her review and others').

**Locked to one vendor.** On [r/n8n](https://www.reddit.com/r/n8n/comments/1nzsb6x/) a commenter wrote: "For me the current dealbreaker is that with n8n you can use your own models." Agent Builder only had OpenAI's. On [Hacker News](https://news.ycombinator.com/item?id=45604700), a founder of Inkeep, a competing tool, explained that the code export is "a one-way fork": you export once, and there's no way back to the canvas.

There were positive voices too. On [r/aiagents](https://www.reddit.com/r/aiagents/comments/1o0fjrx/) a commenter said the export to Agents SDK code was the real win: "build a sketch then continue developing" in code. That's what OpenAI intended. Christina Huang, from the team that built it, said on [the Latent Space podcast](https://www.latent.space/p/devday-2025) that it was built in "less than two months," and described it as a "playground" you export from to run in your own systems.

## Why it didn't last

OpenAI hasn't said why. This section is based on what users wrote, mostly on OpenAI's own forum, and on what the company did next.

**1. Automation you couldn't start automatically.** An Agent Builder workflow started only when someone typed a chat message. No schedule ("every morning at eight"), no webhook, no trigger from an event like a new email or a submitted form. [Creators' AI](https://thecreatorsai.com/p/agentkit-by-openai-review) pointed this out in launch week. In [a forum thread](https://community.openai.com/t/calling-an-agentkit-workflow-via-api-possible/1363192) viewed more than 1,500 times, users asked whether they could at least call a workflow through an API. In December 2025 support said no, and that engineering would launch a simple API flow "very soon." I found no sign of it in OpenAI's changelog before the shutdown. Most of the automations I build for businesses start from exactly that kind of event: a new lead, a paid order, an end-of-week report.

**2. Not ready for production.** This is what stands out most on the forum. In the biggest bug thread I found, with 77 posts and over 3,000 views, saving workflows failed for everyone, and one user wrote: ["All production is stopped"](https://community.openai.com/t/getting-error-on-agent-builder-saving-config-escalations-enabled/1363837). In [another thread](https://community.openai.com/t/clicking-on-workflow-in-agent-builder-failed-to-load-workflow/1365276) workflows wouldn't load. One person wrote "This is a production build for a big client," and another that after a reboot "all my work is just … gone." MCP connections, the main way to plug in outside tools, [broke in launch week](https://community.openai.com/t/error-when-attempting-to-connect-my-remote-mcp-in-new-agent-builder/1361613) because of an extra pair of quotes around the auth header. And a user who embedded ChatKit with Agent Builder [reported about 20 seconds](https://community.openai.com/t/very-high-latency-with-chatkit-agent-builder-even-without-tools-is-it-just-me/1371218) before the first token appeared. More than eight months passed before support replied there, and in the meantime a user noted "seemingly ZERO dev input on the forums."

**3. Hard to debug, no version control.** Bartosz Mikulski [wrote in his review](https://reliableai.substack.com/p/openais-agent-builder-is-not-an-n8n): "With no production logs, a failure is just a dead end." Samer Haddad, who tried [embedding it on his website](https://samerhaddad.substack.com/p/i-built-openais-agent-builder-into), measured a 70 to 75 percent success rate and wrote that "it's not quite there for production use." In April 2026 [a forum user asked](https://community.openai.com/t/agent-builder-feature-request/1379587) for at least a way to download a workflow as JSON or commit it to GitHub. That never came either.

**4. The hype faded fast.** Less than a month after launch, a commenter on [r/automation](https://www.reddit.com/r/automation/comments/1on4kai/) wrote: "Agent kit hype died down fast because it's solving a different problem than n8n, Make, or Zapier." In their view, most business automation needs "the same input to produce the same output every time," not an agent making its own decisions. I have no usage numbers, and nobody published any. What is known: the launch post names only two Agent Builder customers, Ramp and LY Corporation, and I found no update on either since.

## So why close it instead of fixing it?

There's no official explanation here either. In the thread about the prompt objects shutdown, [a user asked](https://community.openai.com/t/deprecation-notice-prompt-objects-in-the-api-will-be-shut-down-on-november-30th-2026/1382593) for "a real, data driven explanation." Three months later support replied: "We hear the loss of hosted editing and quick rollback, and we'll pass that feedback along. We don't have a timeline for an equivalent hosted replacement."

Another commenter in the same thread offered an explanation: "if you look at what they've killed lately (Assistants, Agent Builder, now Prompt Objects) it's all the hosted dashboard stuff, and the state keeps getting pushed into your own code." That matches what I see. Agent Builder tried to serve two audiences, and OpenAI sent each of them somewhere else:

- **Developers go to code.** Agent Builder produced Agents SDK code anyway, and the export OpenAI offers now is exactly that code. The canvas was a layer on top of the library, and the library stays.
- **Business users go to ChatGPT.** Six weeks before the deprecation notice, Workspace Agents shipped: agents you describe in words, that run in the cloud, that you can share with your team and use from Slack. They're available only on Business, Enterprise and Edu plans, which is where OpenAI sells seats to companies.

The [migration guide](https://developers.openai.com/api/docs/guides/agent-builder/migrate-from-agent-builder) almost says it outright: "Workflows with strong determinism at their core may not migrate faithfully to a workspace agent." In other words, OpenAI is betting on agents that decide for themselves what to do, not on a fixed graph of boxes and arrows.

And it isn't only OpenAI. When Flowise announced its shutdown, [a commenter on Hacker News](https://news.ycombinator.com/item?id=49176920) wrote: "There is something about agent workflow builders not gaining as much traction as they could have," and mentioned OpenAI. Another, the founder of a chatbot platform, wrote that "workflow builders are mostly the wrong mental model for AI." The same thread noted that Relay.app had announced its shutdown a few weeks earlier.

Then there's OpenAI's own history. The Assistants API, once presented as the way to build agents, shut down in August 2026, about a year and a half after its replacement, the Responses API, launched. When OpenAI introduced Dots, its new always-on agents, in September, [a Hacker News commenter wrote](https://news.ycombinator.com/item?id=49896604): "Remember MyGPT? How about Agent Builder? … I'm sure this Dots thing will be clearly distinct from the other projects and won't be deprecated within months." Agent Builder has become shorthand for how fast OpenAI launches and closes products.

## If you built on Agent Builder: what to do before November 30

1. **Export every workflow.** Open the workflow, select **Code** in the top bar, then **Agents SDK**, then TypeScript or Python, and copy all of it. Do it for every workflow, including the ones you think are dead.
2. **If the export fails, copy by hand.** A user [reported on the forum](https://community.openai.com/t/agent-builder-code-export/1384377) that export breaks when a workflow includes a web search tool, and the thread was closed without a fix. If that happens, copy the instructions, settings and schemas of every node, and take screenshots of the graph.
3. **Save examples of its behavior.** The export captures how the workflow is built, not how it behaves. Run a few real inputs in Preview and save the answers. You'll compare against them after the move.
4. **List what's around it.** Prompts called by ID, file stores (vector stores), guardrails, API keys, and any chat on your site that points to a `wf_` ID. OpenAI's guide says the export "does not convert your workflow graph" and doesn't guarantee every behavior transfers. And don't move your prompts into dashboard prompt objects, because those close too.
5. **Copy your Evals test cases.** If you have test cases there, get them out now. According to [OpenAI support](https://community.openai.com/t/deprecation-notice-evals-will-be-shut-down-on-november-30th-2026/1385537), not every evaluation type supports export to Promptfoo.
6. **If someone built this for you,** ask them this week what the plan is. A chatbot that works on your site today doesn't mean it has somewhere to run on December 1.

## The alternatives

There's no single replacement. What fits depends on who maintains the agent and where it needs to run.

**The Agents SDK, plus ChatKit on your own server if you need it.** The direct path for developers, and the right fit for a customer-facing chatbot on a site or in an app. The exported code is a starting point, and you host it yourself ([docs](https://developers.openai.com/api/docs/guides/agents)). In [the forum's deprecation thread](https://community.openai.com/t/deprecation-notice-agent-builder/1382650), two people described a real migration. The first, who ran ChatKit for several clients, built a FastAPI server on a virtual machine and only got the first cold start down from 30 seconds to "just under 20." Keeping a machine running all the time "would cost 15 to 30 USD a month," and wrote that managing the backend himself "makes the use of this tool economically unviable." The second moved to AWS Lambda, got to 2.5–3.4 seconds, and along the way hit OpenAI's guardrails library failing to install on Python 3.14. "Agent Builder was much easier," they wrote. "I am already missing it."

**Workspace Agents in ChatGPT.** A good fit for internal team helpers: meeting prep, reports, lead follow-up. You build them in plain language, and you can paste the exported code and ask ChatGPT to turn it into an agent. You need a Business, Enterprise or Edu plan. There are limits worth knowing. You can trigger them through an API, but [according to OpenAI support](https://community.openai.com/t/workaround-request-direct-response-api-for-openai-workspace-agents-post-agent-builder-deprecation/1393714) the trigger is asynchronous and doesn't return the response, so they don't fit a chat on your site or a system that waits for a result. Forum users also report [only about 15 apps available](https://community.openai.com/t/workspace-agents-missing-app-connectors/1385408), down from more than 700, and [missing custom per-action approvals](https://community.openai.com/t/custom-per-action-approvals-missing-from-workspace-agents/1404478).

**n8n.** This is what I use for clients. It has what Agent Builder was missing: [schedules](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/), [webhooks](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/), triggers from app events, and an [AI Agent node](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/) that works with several model providers. You can also [run it on your own server](https://docs.n8n.io/hosting/), so a workflow doesn't vanish when a vendor decides to close a product. On r/n8n someone published [an open-source converter](https://www.reddit.com/r/n8n/comments/1x5194f/) that reads the exported code and rebuilds it as an n8n workflow. I haven't tested it myself. A commenter there rightly pointed out that the export doesn't keep the graph, so branches, loops and approval steps have to be reconstructed from the code, and that's worth checking by hand.

**Zapier and Make.** Hosted tools with lots of ready-made connections, good if you don't want to run a server. Zapier even published [a migration guide from Agent Builder](https://zapier.com/blog/openai-agent-builder-alternatives) that maps each node to a Zap step. They're still someone else's platform, though, so the lesson below applies to them too.

## My takeaway

Agent Builder lasted a little over a year. From the notice to the shutdown was less than six months. People who built on it didn't make a silly mistake: it was an official product from the best-known company in the field, with an on-stage demo and launch customers. A forum user put it bluntly: the work people pay for gets "deleted less than one year after being written."

But this is what happens when a business's logic lives only in a vendor's dashboard. So this is how I build now:

- **Prompts and logic live with me,** in files or a code repository, not only in a tool's interface.
- **Every agent has a small set of inputs and expected answers** that I keep myself. When the model, tool or vendor changes, there's something to test against.
- **Before building on a new tool,** ask what happens if it closes: is there an export? To what? How long would a rebuild take?
- **Anyone offering to build something for you** should be able to say where it will run a year from now, not just show that it works today.

The tools will change. What's worth keeping on your side is the description of what the agent is supposed to do, and a way to check that it does it.

*Researched through November 25, 2026. OpenAI hasn't published a reason for the shutdown. Vote and view counts are as they appeared when I checked. The analysis in this post is mine.*
