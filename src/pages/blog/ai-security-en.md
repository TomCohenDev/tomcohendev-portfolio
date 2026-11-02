---
layout: ../../layouts/ArticleLayout.astro
slug: ai-security-en
lang: en
translation: ai-security
---

Recently, I looked at the news feed on my website and noticed how often stories about cyberattacks appeared. A data leak, a compromised service, another vulnerability in software developers use every day.

I wanted to understand whether attacks were actually increasing or whether that was simply what my feed was showing me. As I looked further, I became interested in the other side: which solutions already exist, and where there is room to build something better.

As a developer building products and automations with AI, I see this as a practical concern. Every connection to email, source code, or a business system adds capability. It also adds access that needs to be managed.

## Activity is increasing

Check Point Research reported an average of **2,803 attacks per organization per week in September 2026**, up **48% compared with September 2025**. This measures detected attack activity, rather than successful breaches.

The company also reported a **53% year-over-year increase in ransomware victims listed on criminal groups’ disclosure sites**. Those sites provide an incomplete picture and depend on what attackers choose to publish. Even with those limitations, the findings support the impression that attack activity is increasing. <sup><a href="#source-1" aria-label="Source 1">[1]</a></sup>

## Security needs expand with capabilities

When an AI system only generates text, we mainly evaluate its answer. When it can read documents, call tools, and update records, we also need to evaluate its actions.

For example, an agent summarizing customer requests might need read access to a customer management system. That does not mean it also needs permission to delete customers, export the entire database, or change other users’ access.

Microsoft’s 2026 Digital Defense Report describes attackers exploiting identities, development workflows, and services that organizations already trust. It also identifies excessive permissions in AI agents as a risk. <sup><a href="#source-2" aria-label="Source 2">[2]</a></sup>

For me, this reinforces three requirements:

1. Know what is connected.
2. Restrict what each system can do.
3. Keep a record of what actually happened.

## Solutions available today

“AI security” covers several different problems. Some tools use AI to perform security work. Others protect AI systems themselves.

The products below illustrate that range. Their capabilities are based on vendor descriptions; I have not independently tested their effectiveness.

<div class="article-table" role="region" aria-label="Security product comparison" tabindex="0">
<table>
<thead><tr><th scope="col">Product</th><th scope="col">Problem it aims to address</th><th scope="col">Intended users</th></tr></thead>
<tbody>
<tr><td><a href="https://www.aikido.dev/">Aikido Security</a> <sup><a href="#source-3">[3]</a></sup></td><td>Detecting vulnerabilities in code, dependencies, and infrastructure, with automated fixes and penetration testing.</td><td>Development teams integrating security into their workflow. A free starting option is available.</td></tr>
<tr><td><a href="https://www.cloudflare.com/products/ai-security-for-apps/">Cloudflare AI Security for Apps</a> <sup><a href="#source-4">[4]</a></sup></td><td>Discovering AI endpoints and mitigating threats such as prompt injection and sensitive information disclosure.</td><td>Teams protecting AI applications through Cloudflare. Endpoint discovery is free; other protection features require a separate availability check.</td></tr>
<tr><td><a href="https://noma.security/">Noma Security</a> <sup><a href="#source-5">[5]</a></sup></td><td>Managing security risks and governance across AI systems and agents.</td><td>Enterprises managing a broad AI environment.</td></tr>
<tr><td><a href="https://reinsec.io/">Rein Security</a> <sup><a href="#source-6">[6]</a></sup></td><td>Monitoring agent actions and enforcing boundaries at runtime.</td><td>Enterprises building agents with access to business systems.</td></tr>
<tr><td><a href="https://www.mave.com/">Mave</a> <sup><a href="#source-7">[7]</a></sup></td><td>Using AI agents for investigations, threat hunting, and response across existing security systems.</td><td>Enterprise security operations teams.</td></tr>
</tbody>
</table>
</div>

These products address different layers of security. Code scanning alone does not solve an agent’s permission problem, and filtering requests does not replace access controls on the underlying data.

## Startup activity shows interest in the category

In January 2026, Aikido announced a **$60 million Series B at a $1 billion valuation**. <sup><a href="#source-8" aria-label="Source 8">[8]</a></sup>

In October, Rein announced a **$25 million Series A**, while Mave emerged from stealth with **$34 million in total funding**, comprising a $28 million Series A and a $6 million seed round. <sup><a href="#source-6">[6]</a> <a href="#source-7">[7]</a></sup>

Significant investment also predates the latest wave of attacks: Noma announced a **$100 million Series B in July 2025**. <sup><a href="#source-5">[5]</a></sup>

These announcements demonstrate investor interest in the category. They do not establish how effectively the products stop attacks or prove that the recent increase in attacks caused those investments.

## Where I see opportunity

I see an opportunity to make security easier to operate and maintain within real products, particularly for teams without dedicated security staff.

I am especially interested in:

- **Security for small teams:** clear findings, useful priorities, and fixes that can be tested.
- **Control over automations and agents:** narrowly scoped permissions, activity records, and a reliable way to stop a workflow.
- **Protection for specific workflows:** for example, a customer support agent restricted to the information and actions its role requires.

These are directions I would validate with users and customers before treating them as proven markets.

When evaluating a solution, I want to understand which risks it reduces, what access it requires, and how its effectiveness can be tested. A security tool connected to source code and business data also becomes part of the system’s trust relationships. Its own permissions and behavior deserve the same scrutiny.

## Sources

1. <span id="source-1">[Check Point Research — September 2026 Cyber Threat Landscape](https://blog.checkpoint.com/research/september-2026-cyber-threat-landscape-global-attacks-jump-48-as-phishing-and-genai-data-exposure-rise), October 8, 2026.</span>
2. <span id="source-2">[Microsoft — 2026 Digital Defense Report](https://www.microsoft.com/en-us/security/security-insider/threat-landscape/2026-digital-defense-report), October 1, 2026.</span>
3. <span id="source-3">[Aikido Security — product overview](https://www.aikido.dev/), accessed November 2, 2026.</span>
4. <span id="source-4">[Cloudflare — AI Security for Apps](https://www.cloudflare.com/products/ai-security-for-apps/), accessed November 2, 2026.</span>
5. <span id="source-5">[Noma Security — $100 million Series B announcement](https://noma.security/blog/noma-security-raises-100m-to-drive-adoption-of-ai-agent-security), July 31, 2025.</span>
6. <span id="source-6">[Rein Security — $25 million Series A announcement](https://reinsec.io/blog/series-a/), October 8, 2026.</span>
7. <span id="source-7">[Mave — launch and funding announcement](https://www.mave.com/resources/mave-launches-with-34-million), October 22, 2026.</span>
8. <span id="source-8">[Aikido Security — Series B announcement](https://www.aikido.dev/blog/aikido-funding-series-b), January 14, 2026; updated August 12, 2026.</span>
