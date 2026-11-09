---
title: "Black October: Your AI API Key Became Someone Else’s Budget"
description: "Eight lessons from the October 2026 attacks on developer platforms, with reported numbers, primary sources, and practical implications for people building with AI."
slug: black-october-en
lang: en
translation: black-october
layout: ../../layouts/ArticleLayout.astro
author: Tom Cohen
researchedThrough: "2026-11-09"
tags: ["AI", "Security", "Building products"]
---

Connecting another tool to a project is easy. Paste an API key, save an environment variable, and move on. I understand the appeal. I build products and automations, and I want to spend my time making them work.

The October security reports made me look harder at that moment. When a platform stores a key for me, I am trusting its build systems, internal permissions, backups, and incident response with access to another service.

That access can have a bill attached.

Here are eight things I took from the reports behind “Black October,” and what they mean for the way I think about building with AI.

## 1. At least nine platforms disclosed incidents in October

Wiz’s October 30 report listed **at least nine AI developer platforms** with incident disclosures that month. Its list has since expanded. Nine is the report’s original October count, not a final total. [Wiz Research](https://www.wiz.io/blog/black-october-for-ai-developer-platforms)

The name also appears in coverage of other October vulnerabilities and supply-chain incidents. Gradle describes a broader pile-up of disclosures rather than one attack. This post focuses on developer platforms and the credentials they held. [Gradle](https://blog.gradle.org/lets-talk-about-black-october)

That distinction matters. A name for a bad month doesn't establish that every incident had the same attacker or the same cause.

## 2. Zeabur reported more than 3.2 million environment-variable records exposed

Zeabur’s preliminary report lists **3,218,965 environment-variable records** and data associated with **321,810 accounts** in the platform database read by the attacker. Those are different units: records are not unique credentials or people. The company also reports commands run in **865 database services**, with some commands unsuccessful. [Zeabur incident report](https://zeabur.com/blogs/october-2026-security-incident)

Its stated root cause included long-lived administrative credentials stored in plaintext and reachable administrative interfaces. [Zeabur incident report](https://zeabur.com/blogs/october-2026-security-incident)

For me, this is the uncomfortable part of a convenient developer platform. The place that makes it easy to configure everything can also hold access to a lot of things at once.

## 3. Railway’s 1.85 percent still meant about 100,000 workspaces

Railway said **at most 1.85% of all workspaces**, approximately **100,000**, had some environment variables potentially compromised. This was a preliminary scope estimate, not confirmation that every secret in those workspaces was stolen.

The company requested wider precautionary key revocations, so receiving a revocation notice did not by itself prove exposure. It also said running customer deployments stayed online while new builds and deployments were paused. [Railway preliminary report](https://blog.railway.com/p/preliminary-report-october-security-incident)

I would want both the percentage and the absolute number in an incident update. I would also want to understand which part of the service was affected. “My app is still online” doesn't answer whether its credentials are safe.

## 4. Fireworks’ notification timeline shows why detection and notice are separate

Fireworks identified activity at **09:00 PDT on October 6** and started notifying affected customers at **07:00 PDT on October 7**: **22 hours later**, calculated from its published timeline.

Its bulletin describes unauthorized access to environment variables in evaluation jobs for a limited set of accounts. At that stage, it reported no detected evidence of access to customer models, datasets, personal information, or inference traffic within its perimeter. [Fireworks security bulletin](https://fireworks.ai/security/bulletins/october-2026-security-incident)

A notification is useful, but it comes after detection and investigation have begun. I want usage monitoring on the service that issues the key as well as updates from the platform holding it.

## 5. One stolen key generated roughly 800,000 model calls

In one enterprise case investigated by Wiz, the first unauthorized call occurred within **30 minutes** of reported vendor credential access. Later bulk abuse produced roughly **800,000 Amazon Bedrock calls over 30 hours**, with about **90% succeeding**, before remediation. [Wiz Research](https://www.wiz.io/blog/black-october-for-ai-developer-platforms)

This is the practical meaning of LLMJacking: someone uses stolen access to consume model capacity on the victim’s account.

For a small team, unexpected usage can become an operational problem quickly. A key needs an owner, a defined purpose, and a way to stop it being used.

## 6. Encryption at rest still depends on who can decrypt the secrets

Cloud Security Alliance describes these platforms as concentrations of customer credentials. A platform may encrypt secrets in storage while still needing to decrypt them for builds or running applications. Compromising that access path can expose them. [Cloud Security Alliance](https://labs.cloudsecurityalliance.org/research/csa-research-note-ai-developer-platform-concentration-risk-2/)

Northflank’s October 30 guidance told users to assume environment variables had been decrypted and rotate credentials. Its November 6 update recommended provider logs, IP restrictions, and budget limits where available. [Northflank incident updates](https://status.northflank.com/)

Encryption is useful. I also want to know which systems can retrieve the plaintext, what permissions they have, and what gets recorded when they do.

## 7. AI involvement is reported, but attribution remains incomplete

Some vendors reported signs of agent-driven attacks or alleged model distillation. Wiz says detailed technical information remains limited and identifies no single vulnerability connecting the incidents. [Wiz Research](https://www.wiz.io/blog/black-october-for-ai-developer-platforms)

I don't think “AI hacked everything” helps me make a better engineering decision. I want the specific failure: which credential opened which system, what access followed, and how that access was stopped.

That is also where I see useful work for developers. Clear access boundaries, actionable monitoring, and reliable revocation are product features people need to operate.

## 8. The changes I would prioritize in a small project

I would start by making the credentials understandable before adding another security dashboard:

1. **List where each credential lives.** Include hosting, CI, local configuration, automations, and backups. Record who can revoke it and which applications depend on it.
2. **Separate credentials by project and environment.** A disposable experiment should have access appropriate to that experiment.
3. **Reduce permissions and lifetime.** Use temporary credentials where supported. AWS recommends workload roles and least-privilege permissions. [AWS IAM guidance](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)
4. **Monitor usage and test limits.** Check what the provider actually enforces. Treat an alert as a notification until you've verified that a control stops consumption.
5. **Practice revoking and replacing a key.** Know how to stop the old credential, update dependent applications, and verify recovery. Deleting a saved variable alone does not invalidate a third-party key. [Fireworks remediation guidance](https://fireworks.ai/security/bulletins/october-2026-security-incident)

I still want to use tools that make building easier. I also want connecting a tool to include a clear answer to one question: **if this key escapes, how much access does it give, and how quickly can I shut it off?**

*Research checked through November 9, 2026. Incident findings and scope may change as investigations continue. Vendor figures above retain their reported units and qualifications.*
