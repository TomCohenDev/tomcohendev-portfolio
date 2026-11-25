---
title: "OpenAI Is Shutting Down Agent Builder: Why It Didn't Last, and What to Do Now"
description: "On November 30, 2026, Agent Builder, OpenAI's visual canvas for building agents, shuts down, a little over a year after launch. What closes, why I think it didn't catch on, why OpenAI is closing it, and the alternatives for anyone who built on it."
slug: agent-builder-shutdown-en
lang: en
translation: agent-builder-shutdown
layout: ../../layouts/ArticleLayout.astro
author: Tom Cohen
researchedThrough: "2026-11-25"
tags: ["Automation", "AI", "English"]
---

In October 2025 OpenAI introduced Agent Builder: a canvas where you drag boxes, connect them with arrows, and get an AI agent. Within days people online were calling it "the n8n killer." I build automations for businesses, most of them in n8n, so I paid attention.

On November 30, 2026, a little over a year after launch, it shuts down. If you built a workflow in it, export it before that date, because the export button lives inside Agent Builder itself.

In this post: what exactly closes, why I think the tool didn't last, why OpenAI chose to close it, and what to do now.

## What closes on November 30

According to [OpenAI's deprecations page](https://developers.openai.com/api/docs/deprecations), the notice went out on June 3, 2026, and three things close on the same day:

- **Agent Builder**, the visual canvas. After that date you can't edit, publish or export workflows.
- **Evals**: the dashboard, the API and the graders for eval workflows.
- **Reusable prompt objects** (`/v1/prompts`). Code that calls a stored prompt by ID will stop working. OpenAI recommends moving the prompt text into your code.

What stays: the Agents SDK, the Responses API and ChatKit, the chat component you embed on a site. There is a trap here, though. ChatKit had two setups, and in the one that used to be recommended, OpenAI ran the server side for you through an Agent Builder workflow with an ID that starts with `wf_`. According to [the ChatKit docs](https://developers.openai.com/api/docs/guides/chatkit), those workflows only work during the "transition window," and new work should run on your own server. If your site has a chat like that, assume it stops answering on December 1.

## The timeline

- **March 2025:** OpenAI launches the Responses API and the Agents SDK, a library for building agents in code.
- **October 6, 2025:** [AgentKit launches](https://openai.com/index/introducing-agentkit/) at DevDay. Agent Builder ships in beta: drag nodes, connect tools, configure guardrails. ChatKit, a connector registry and expanded Evals come with it.
- **April 22, 2026:** [Workspace Agents in ChatGPT](https://openai.com/index/introducing-workspace-agents-in-chatgpt/). Agents you build in plain language inside ChatGPT, which OpenAI calls "an evolution of GPTs."
- **June 3, 2026:** Agent Builder, Evals and prompt objects are deprecated. An update appears at the top of the AgentKit launch post.
- **August 26, 2026:** The Assistants API, OpenAI's earlier way of building agents, shuts down.
- **November 30, 2026:** Agent Builder shuts down.

## Why it didn't last

OpenAI hasn't said why. The update on the AgentKit post only says the company is "winding down" Agent Builder and Evals, and where to go instead. What follows is my reading, based on the reviews published after launch and on what OpenAI did next.

**1. Automation you couldn't start automatically.** An Agent Builder workflow started only when someone typed a chat message. No schedule ("every morning at eight"), no webhook, no trigger from an event like a new email or a submitted form. [Composio's comparison](https://composio.dev/content/n8n-vs-agent-builder) lists this first among its limitations. Most of the automations I build for businesses start exactly that way: a new lead, a paid order, an end-of-week report. Without triggers, it's a tool for building chatbots.

**2. Stuck in the middle.** Grace Leung, who tested it in depth, wrote that it was "definitely not" an n8n killer. In her view it was built for developers rather than business users, and sometimes even more technical than n8n. Technical users found it limiting, and non-technical users found it complicated. [Final Round AI](https://www.finalroundai.com/blog/openai-agent-builder-what-software-developers-are-saying-after-testing) collected her review and several other developers'.

**3. OpenAI models only.** In n8n, Make and Zapier you pick a model provider for each step. In Agent Builder there was only OpenAI.

**4. Early stability problems.** The same roundup describes MCP connections failing with errors, clunky debugging (you couldn't click a node to see what happened in it), and one tester reporting that GPT-5 wasn't working inside the tool.

**5. A sense that nobody was investing in it.** The day after the deprecation notice, a user in [OpenAI's forum](https://community.openai.com/t/deprecation-notice-agent-builder/1382650) wrote that "this was clearly coming, as there wasn't much support right after it was launched." That's one user's account, but the same thread includes people who built chatbots for several clients on it and now have to run their own servers.

## So why close it instead of fixing it?

There's no official explanation here either, but OpenAI's moves tell a fairly clear story. Agent Builder tried to serve two audiences, and OpenAI sent each of them somewhere else:

- **Developers go to code.** Agent Builder produced Agents SDK code anyway. The export OpenAI offers now is exactly that code. The canvas was a layer on top of the library, and the library stays.
- **Business users go to ChatGPT.** Six weeks before the deprecation notice, Workspace Agents shipped: agents you describe in words, that run in the cloud, that you can share with your team and use from Slack. They're available only on Business, Enterprise and Edu plans, which is where OpenAI sells seats to companies.

Two more hints. Evals and prompt objects closed on the same day. All three are products where a customer's logic lives in a dashboard on OpenAI's servers rather than in the customer's own code. And the [migration guide](https://developers.openai.com/api/docs/guides/agent-builder/migrate-from-agent-builder) says it outright: "Workflows with strong determinism at their core may not migrate faithfully to a workspace agent." In other words, OpenAI is betting on agents that decide for themselves what to do, not on a fixed graph of boxes and arrows.

It isn't the first time, either. The Assistants API, once presented as the way to build agents, shut down in August 2026, about a year and a half after its replacement, the Responses API, launched. OpenAI moves products fast and closes the ones it no longer wants to maintain.

## If you built on Agent Builder: what to do before November 30

1. **Export every workflow.** Open the workflow, select **Code** in the top bar, then **Agents SDK**, then TypeScript or Python, and copy all of it. Do it for every workflow, including the ones you think are dead. A copy costs nothing; rebuilding from memory costs a lot.
2. **Save examples of its behavior.** The export captures how the workflow is built, not how it behaves. Run a few real inputs in Preview and save the answers. You'll compare against them after the move.
3. **List what's around it.** Prompts called by ID, file stores (vector stores), guardrails, API keys, and any chat on your site that points to a `wf_` ID. OpenAI's guide says the export "does not convert your workflow graph" and doesn't guarantee every behavior transfers.
4. **Copy your Evals test cases.** If you have test cases there, get them out now.
5. **If someone built this for you,** ask them this week what the plan is. A chatbot that works on your site today doesn't mean it has somewhere to run on December 1.

## The alternatives

There's no single replacement. What fits depends on who maintains the agent and where it needs to run.

**The Agents SDK, plus ChatKit on your own server if you need it.** The direct path for developers, and the right fit for a customer-facing chatbot on a site or in an app. The exported code is a starting point. You host it yourself and pay for tokens and the server. [Agents SDK docs](https://developers.openai.com/api/docs/guides/agents). In OpenAI's forum, people who moved describe real work: setting up a server, dealing with cold starts, dependencies that don't install cleanly. It's not a one-click move.

**Workspace Agents in ChatGPT.** A good fit for internal team helpers: meeting prep, reports, lead follow-up. You build them in plain language, and you can paste the exported code and ask ChatGPT to turn it into an agent. You need a Business, Enterprise or Edu plan. Not suited to a public chat on your website and, per OpenAI, not to a process that has to run in exactly the same order every time.

**n8n.** This is what I use for clients. It has what Agent Builder was missing: [schedules](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.scheduletrigger/), [webhooks](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/), triggers from app events, and an [AI Agent node](https://docs.n8n.io/integrations/builtin/cluster-nodes/root-nodes/n8n-nodes-langchain.agent/) that works with several model providers. You can also [run it on your own server](https://docs.n8n.io/hosting/), so a workflow doesn't vanish when a vendor decides to close a product. It fits when the agent is part of a business process, not just a chat window.

**Zapier and Make.** Hosted tools with lots of ready-made connections, good if you don't want to run a server. Zapier even published [a migration guide from Agent Builder](https://zapier.com/blog/openai-agent-builder-alternatives) that maps each node to a Zap step. They're still someone else's platform, though, so the lesson below applies to them too.

## My takeaway

Agent Builder lasted a little over a year. From the notice to the shutdown was less than six months. People who built on it didn't make a silly mistake: it was an official product from the best-known company in the field, with an on-stage demo and launch customers.

But this is what happens when a business's logic lives only in a vendor's dashboard. So this is how I build now:

- **Prompts and logic live with me,** in files or a code repository, not only in a tool's interface.
- **Every agent has a small set of inputs and expected answers** that I keep myself. When the model, tool or vendor changes, there's something to test against.
- **Before building on a new tool,** ask what happens if it closes: is there an export? To what? How long would a rebuild take?
- **Anyone offering to build something for you** should be able to say where it will run a year from now, not just show that it works today.

The tools will change. What's worth keeping on your side is the description of what the agent is supposed to do, and a way to check that it does it.

*Researched through November 25, 2026. OpenAI hasn't published a reason for the shutdown. The analysis in this post is mine, based on OpenAI's announcements and on reviews published after launch.*
