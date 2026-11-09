# T3 Code and Kitshn editorial research

Tom approved publication on November 9, 2026. Article sources now live at `src/pages/blog/t3-kitshn.md` and `src/pages/blog/t3-kitshn-en.md`. Localized figures and interactive guides are served from `public/blog/t3-kitshn/`.

## Verified sources checked November 9, 2026

- [Upstream T3 Code README](https://github.com/pingdotgg/t3code/blob/main/README.md): calls T3 an agent harness control surface, with web, desktop and mobile clients. This is a control surface over agent runtimes, not a new model.
- [Upstream source control](https://github.com/pingdotgg/t3code/blob/main/docs/user/source-control.md): worktrees, code review, pull requests, and agent wakeups from PR watching.
- [Yarden Zamir’s Kitshn](https://github.com/Yarden-zamir/kitshn): verified public repository, with GitHub owner `Yarden-zamir`. Tom explicitly supplied the author’s name. The current README describes Kitshn 2, deploying to Cloudflare and machines with a resource-and-circle access map. The repository’s short GitHub description still reflects an older VPS-centric version; the draft follows the current README and architecture.
- [Kitshn architecture](https://github.com/Yarden-zamir/kitshn/blob/main/docs/internals/overview.md): separates application recipes from deployment locations/access; first repository deployment requires Allow. Kitshn is independent of T3; T3 integrates as a provider.
- [Yarden’s T3 fork](https://github.com/Yarden-zamir/t3code): distinct from upstream. Its current README documents Kitshn integration and cross-machine work.
- [Tom’s T3 fork](https://github.com/TomCohenDev/t3code): explicitly states that it builds on `pingdotgg/t3code` and `Yarden-zamir/t3code`. The current public feature documentation is the basis for the draft’s fork-specific features.
- [Tom’s Kitshn fork](https://github.com/TomCohenDev/kitshn): verified public fork; local origin and upstream remotes independently match Tom and Yarden respectively.
- [Tom fork features](https://github.com/TomCohenDev/t3code/blob/main/docs/fork/features.md#work-on-other-machines): Kitshn linking, delegated completion waking the parent, access grants and calling-thread limits.
- [Tom fork operations](https://github.com/TomCohenDev/t3code/blob/main/docs/fork/operations.md): automated sync from Yarden’s fork and webhook-triggered repair on selected main-branch failures. The draft deliberately omits volatile schedules and internal machine names.

## First-person scope

Tom supplied the core experience: the harness and orchestration caused a huge acceleration in his work. The draft expresses that qualitatively without fabricated time savings, throughput, benchmarks, or controlled comparisons.

The description of friction around context, handoffs and waiting is editorial interpretation of that experience, for Tom to review. The five-step task flow is explicitly introduced as a workflow the setup should support, rather than an invented account of a specific completed project.

The public sources establish capabilities, not which optional settings are currently enabled on Tom’s machines. The draft describes features through documentation and avoids asserting habitual mobile use, particular machine counts, automatic repair success, universally enabled recovery, or unrestricted cross-machine access. No live machine inventory, private runtime state or credentials were inspected.

The local T3 README and `docs/fork.md` still describe the earlier machine-map implementation; the current public README and `docs/fork/features.md` describe Kitshn 2. Public sources were fetched through connected GitHub tools before drafting, and current public descriptions take precedence in the article. Repository links follow `main` and can change.

Seven conceptual figures now appear in each language. They explain layers, project lineage, thread context, delegation, linked environments, repair events, and manual versus coordinated handoffs. These are explanatory diagrams, not screenshots, a live machine inventory, measured timings, or a productivity benchmark. The examples preserve optional delegation, access limits, validation, and applicable repository approval rules.

Editable SVG assets and their generator are under `assets/t3-kitshn/`. `assets/t3-kitshn/preview.html` is a standalone interactive English preview with diagram selection and node tracing. Figure captions carry the necessary scope qualifications. Publication approved; both language versions include all seven diagrams.
