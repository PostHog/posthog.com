---
title: 'Product Intelligence'
showTitle: true
hideAnchor: false
---


## What is the job to be done?

"Help me understand what users do, why they do it, and what to build next."

- Understand how users navigate your product and where they get stuck
- Identify which features drive retention and which are ignored
- Get qualitative context for quantitative patterns (the "why" behind the numbers)
- Validate product hypotheses with experiments before committing engineering resources
- Collect direct user feedback at key moments in the product experience
- Track business outcomes (revenue, expansion) tied to product usage
- Act on insights by guiding users through onboarding and feature adoption directly inside the product

This is our bread and butter. Most accounts start here. The risk is they *stay* here as a single product analytics customer and never expand. The opportunity is that Product Intelligence naturally creates demand for the other use cases once teams start acting on what they learn.

## What PostHog products are relevant?

- **[Product Analytics](/docs/product-analytics) (core)** — [Funnels](/docs/product-analytics/funnels), [retention](/docs/product-analytics/retention), [cohorts](/docs/data/cohorts), [lifecycle](/docs/product-analytics/lifecycle) analysis, trends, user paths. The quantitative foundation for understanding what users do.
- **[Session Replay](/docs/session-replay)** — The qualitative layer. Watch what users actually do when the numbers say they're dropping off. Bridges the gap between "40% drop at step 3" and "oh, the button doesn't render on mobile Safari."
- **[Surveys](/docs/surveys/creating-surveys)** — Direct feedback loop at key moments. NPS after onboarding, CSAT after support, "why did you cancel?" on churn. Ties qualitative signal to quantitative behavior data.
- **[Revenue Analytics](/docs/revenue-analytics/start-here)** — Business outcome tracking. Connect product usage to [MRR](/docs/revenue-analytics/dashboard#mrr-and-arr), expansion revenue, LTV, and churn. Lets PMs prove that the feature they shipped actually moved the revenue needle. ([Dashboard](/docs/revenue-analytics/dashboard))
- **[Experiments](/docs/experiments)** — Validate hypotheses with statistical rigor before committing to a full build. A/B test changes against real metrics, not gut feel. Requires [Feature Flags](/docs/feature-flags) for implementation.
- **[Workflows](/docs/workflows/start-here)** — Onboarding sequences, activation nudges, lifecycle engagement. The action layer: once you've identified a drop-off in analytics, Workflows lets you do something about it automatically. ([Email drip campaigns](/docs/workflows/email-drip-campaign))
- **[Product Tours](/docs/product-tours/start-here)** *alpha* — In-app guided onboarding, feature adoption prompts. The in-product complement to Workflows' out-of-product engagement. Guide users through the right path at exactly the right moment. ([Creating tours](/docs/product-tours/creating-product-tours))
- **AI Evals** — For products with AI features: proactively surface where users are struggling based on AI output quality. This is product intelligence driven by AI observability. A bridge product to the [AI/LLM Observability](/handbook/growth/cross-selling/use-case-selling/ai-llm-observability) use case.
- **[PostHog AI](/docs/posthog-ai/allow-access)** — Natural language querying and insight discovery. Lowers the bar for non-technical product stakeholders to self-serve. A PM asks "why did retention drop last week?" instead of building a custom query. ([Example prompts](/docs/posthog-ai/example-prompts))

## Adoption path and expansion path

### Entry point

Usually **Product Analytics**. Customer starts tracking events, builds dashboards, creates their first funnel. Then they hit the ceiling of quantitative data alone: "I can see *that* users drop off, but not *why*."

### Primary expansion path

**Product Analytics → + Session Replay → + Surveys → + Experiments → + Revenue Analytics → + Workflows / Product Tours**

**The logic of each step:**

- Product Analytics → Session Replay: They know *what* is happening (40% drop at step 3). They need to see *why*. Session Replay gives them the qualitative context that numbers can't.
- Session Replay → Surveys: They're watching replays and forming hypotheses about why users struggle. Surveys let them ask users directly at the moment of friction, then tie responses back to behavior data.
- Surveys → Experiments: They've identified the problem through analytics, replay, and feedback. Now they want to test a fix. Experiments require Feature Flags, which gets engineering involved (multithreading moment).
- Experiments → Revenue Analytics: They've validated changes with experiments and want to prove business impact. Revenue Analytics connects product usage to MRR, expansion, and churn.
- Revenue Analytics → Workflows / Product Tours: They've identified what drives value. Now they want to guide users toward those high-value behaviors automatically, through in-app tours and behavior-triggered engagement sequences.

### Alternate expansion paths

**B2B accounts with Group Analytics:** B2B SaaS companies almost always need company-level analytics alongside user-level. If they're B2B and not using [Group Analytics](/docs/product-analytics/group-analytics), that's a significant upsell opportunity. Group Analytics lets them answer "which *companies* are most engaged" not just "which users."

**Starting from Session Replay:** Some accounts come in through Session Replay first (debugging, QA, customer support use cases). They realize they need Product Analytics to quantify what they're seeing qualitatively. The expansion path reverses: Replay → Analytics → Surveys → Experiments.

**Product teams that ship AI features:** If the product has AI components, AI Evals can proactively surface where users are struggling based on output quality. This bridges Product Intelligence into [AI/LLM Observability](/handbook/growth/use-case-selling/ai-llm-observability).

## Business impact of solving the problem

**This is the use case with the largest existing install base.** Most PostHog accounts start with Product Analytics. The expansion opportunity isn't convincing them to adopt PostHog. It's convincing them to go beyond a single product and use the full Product Intelligence stack.

**The Workflows and Product Tours close-the-loop story is powerful.** You identify a drop-off point (analytics), you understand why users leave (session replay, surveys), and now you can actually fix it by guiding users through the right path (product tours) or re-engaging them when they disengage (workflows). That's a complete insight-to-action cycle that no competitor offers in one platform.

**Product Intelligence creates demand for other use cases.** Once the product team is deep in PostHog, they pull in the growth team (Growth & Marketing use case) for acquisition and activation. Once they're running experiments, engineering gets involved in rollouts (Release Engineering). This is the gateway use case.

## Personas to target

| Persona | Role Examples | What They Care About | How They Evaluate |
|---|---|---|---|
| Product Manager | PM, Senior PM, Head of Product | Feature adoption, retention, user journeys, proving impact to leadership | "Can I see which features drive retention and prove ROI to my VP?" |
| Product Engineer | Full-stack eng on a product team | Fast instrumentation, reliable data, not maintaining a data pipeline | "How fast can I instrument this and how reliable is the data?" |
| UX Researcher | UX Researcher, Design Lead | User behavior patterns, qualitative + quantitative, session-level detail | "Can I watch real user sessions filtered by the cohort I'm studying?" |
| Designer | Product Designer, UX Designer | How users interact with new designs, A/B testing UI changes | "Can I see the before/after impact of my design changes?" |
| Founder (early stage) | Founder, CTO at seed/Series A | All of the above. Finding product-market fit. Speed. | "Does this help me figure out what to build next?" |

## Signals in Vitally & PostHog

### Vitally indicators this use case is relevant

| Signal | Where to Find It | What It Means |
|---|---|---|
| Product Analytics is the only paid product | Product spend breakdown | Classic single-product account. Full expansion path available. |
| High insight/dashboard creation per active user | Engagement metrics | Product team is actively using PostHog for analysis. They're ready for deeper tools. |
| Session Replay is free-tier only or not used | Product usage data | They're doing quantitative analysis without qualitative context. Session Replay is the obvious next step. |
| B2B company without Group Analytics | Company type + product spend | Major upsell opportunity. B2B companies need company-level analytics. |
| Multiple PM or design roles in the user list | User list in Vitally | Product team is in PostHog, not just engineering. This use case is live. |

### PostHog usage signals

| Signal | How to Check | What It Means |
|---|---|---|
| Funnels and retention insights being created regularly | Saved insights | Product team is actively measuring conversion and retention. Ripe for Experiments. |
| Session Replay enabled but low viewing rate | Replay settings vs. replay views | They've turned it on but aren't using it. Needs onboarding or a nudge to connect it to their analytics workflow. |
| No experiments running despite active analytics | Experiments list | They're identifying problems but not testing solutions. Experiments is the next conversation. |
| Dashboards shared across multiple users | Dashboard sharing settings | They're collaborating on insights. Good health signal and potential for team expansion. |
| High event volume, low survey usage | Product usage metrics | They have the traffic to run surveys but haven't started. Low-hanging cross-sell. |

## Command of the Message

### Discovery questions

- How does your product team decide what to build next? What data informs that decision?
- When you see a drop-off in a funnel, how do you figure out *why* users are leaving?
- How do you measure whether a new feature is successful after launch?
- Do you collect direct user feedback inside the product? How is that connected to your analytics?
- When you have a hypothesis about user behavior, how do you validate it? Do you run experiments?
- How do you prove to leadership that a product investment drove business results (revenue, retention)?
- How many tools does your product team use to understand users? (Analytics, replay, surveys, experiments — how many vendors?)
- Can your PMs answer their own questions, or do they depend on data/engineering for every query?

### Negative consequences (of not solving this)

- Product decisions are based on gut feel or incomplete data because the team can't connect behavior to outcomes
- PMs can see *that* users drop off but not *why*, leading to guesswork about what to fix
- Experiments are rare or nonexistent because the tooling is disconnected from analytics, so every test requires a separate setup
- User feedback (surveys) lives in a separate tool, disconnected from behavior data, so you can't answer "what happened right before this user gave us a 3/10?"
- Product team can't prove business impact, making it hard to justify investment or prioritize
- Insights are identified but never acted on because there's no automation layer to guide users or re-engage them

### Desired state

- One platform for the full cycle: measure behavior → watch sessions → collect feedback → test changes → measure revenue impact → act on insights
- PMs can self-serve answers without waiting for a data team
- Every product change is measured against real retention and revenue metrics
- Onboarding and feature adoption are guided automatically based on user behavior
- Product team and engineering share the same platform, reducing tool fragmentation

### Positive outcomes

- Faster product decisions: cycle time from "we see a problem" to "we've validated a fix" drops significantly
- Higher retention from catching and addressing drop-off points systematically
- Better resource allocation: experiments prove what works before engineering commits to a full build
- Product team can demonstrate revenue impact to leadership, strengthening their influence
- Tool consolidation: replace separate analytics + replay + survey + experimentation vendors with one platform

### Success metrics

**Customer-facing:**

- Feature adoption rates improve for targeted features
- Retention curves flatten or improve for key cohorts
- Experiment velocity increases (more hypotheses tested per quarter)
- Time from insight to action decreases

**TAM-facing:**

- Customer expands from Product Analytics-only to multi-product (Session Replay, Surveys, Experiments)
- Multiple product team members (PMs, designers) are active, not just engineers
- Experiment usage grows (indicates the product team is using PostHog for decisions, not just reporting)
- Workflow or Product Tour usage starts (they're closing the insight-to-action loop)

## Competitive positioning

### Our positioning

- **Quantitative + qualitative in one platform.** Product Analytics and Session Replay together. No switching between Amplitude and Hotjar. Filter replays by funnel drop-off, cohort, or event.
- **Insight to action, not just insight.** Most analytics tools stop at the dashboard. PostHog lets you act on what you find with [Workflows](/docs/workflows/start-here), [Product Tours](/docs/product-tours/start-here), and [Experiments](/docs/experiments).
- **Experiments built into the analytics workflow.** See a drop-off in a funnel, right-click to create an experiment, measure the result in the same tool. No separate experimentation platform.
- **[PostHog AI](/docs/posthog-ai/allow-access) makes analytics accessible.** PMs who aren't comfortable with SQL can ask questions in plain English.

### Competitor quick reference

| Competitor | What They Do | Our Advantage | Their Advantage |
|---|---|---|---|
| Amplitude | Product analytics, cohorts, experiments | Broader platform (replay, flags, surveys, workflows); better pricing; open source | More mature ML features (predictions, audiences); larger enterprise install base |
| Mixpanel | Product analytics, funnels, retention | Broader platform; no sampling; replay + surveys + flags included | Some teams prefer the UX; strong mobile analytics |
| Hotjar | Session replay + basic surveys | Engineering-grade analytics alongside replay; experiments; flags | Simpler UX for non-technical users; purpose-built for UX research |
| Heap | Auto-capture product analytics, session replay | Also auto-capture, plus flags, experiments, surveys, workflows | Retroactive analytics (virtual events) is a strong pitch |
| Pendo | Product analytics + in-app guides | Deeper analytics; experiments; open source; better pricing | More mature in-app guides; stronger enterprise PM workflow features |

**Honest assessment:** Our strongest position is the breadth of the platform. No competitor offers analytics + replay + surveys + experiments + workflows + product tours in one tool. We're weaker against Amplitude in very large enterprises where their ML features and enterprise sales motion are more mature. We're weaker against Hotjar/Pendo for non-technical product teams who want a simpler, more opinionated UX. Our sweet spot is technical product teams at companies with engineers who value depth, flexibility, and not paying for 5 separate tools.

## Pain points & known limitations

| Pain Point | Impact | Workaround / Solution |
|---|---|---|
| Product Tours is alpha, limited customization | Teams with complex in-app onboarding needs may hit walls | Position as the integrated option. For advanced tooltip/modal UX, keep a dedicated tool (Appcues, Pendo) and use PostHog for analytics + experimentation. |
| Workflows is new, less mature than dedicated engagement tools | Teams expecting Braze-level email sequencing will find gaps | Position as behavior-driven automation, not a full lifecycle marketing replacement. Complement with existing tools via [Data Pipelines](/docs/cdp/destinations). |
| No built-in heatmaps | Some UX teams expect heatmaps as part of the qualitative toolkit | Session Replay provides more context than heatmaps (full session vs. aggregated click positions). [Toolbar](/docs/toolbar) provides some click-map functionality. |
| Learning curve for non-technical PMs | PMs used to Amplitude's guided UX may find PostHog's flexibility overwhelming initially | Lead with [PostHog AI](/docs/posthog-ai/allow-access) for querying. Build pre-configured dashboards during onboarding. Start with simple funnels and retention, not HogQL. |

## Getting a customer started

### What does an evaluation look like?

- **Scope:** Instrument their core product flow: signup → key activation event → retention-defining action → conversion/upgrade. Build the primary funnel and retention analysis. Enable Session Replay on key flows.
- **Timeline:** 1 to 2 weeks to see value from analytics and replay. Experiments need enough traffic for statistical significance, so timeline varies.
- **Success criteria:** Can you answer: "Where do users drop off in our core flow, and why?" Can you see the full retention curve by cohort? Can you watch a replay of a user who dropped off?
- **PostHog investment:** Product Analytics free tier covers 1M events. Session Replay free tier covers 5K recordings. Surveys, Experiments have generous free tiers.

### Onboarding checklist

- [ ] Install PostHog SDK with autocapture enabled ([getting started](/docs/getting-started/install))
- [ ] Define and instrument core conversion events (signup, activation, key feature usage, upgrade)
- [ ] Build the primary conversion [funnel](/docs/product-analytics/funnels)
- [ ] Set up [retention analysis](/docs/product-analytics/retention) for key activation events
- [ ] Enable [Session Replay](/docs/session-replay) on production (configure sampling if needed)
- [ ] Watch 5+ replays filtered by funnel drop-off to get qualitative context
- [ ] Build a "Product Health" dashboard for the product team (funnels, retention, trends)
- [ ] Introduce [PostHog AI](/docs/posthog-ai/allow-access) to PMs for self-serve querying
- [ ] Set up one [Survey](/docs/surveys/creating-surveys) at a key friction point (post-signup NPS, feature feedback)
- [ ] Plan first [Experiment](/docs/experiments) targeting a known drop-off point

## Cross-sell pathways from this use case

| If Using... | They Might Need... | Why | Conversation Starter |
|---|---|---|---|
| Product Analytics only | Session Replay | They see the numbers but not the *why* | "You can see 40% drop off at step 3. Want to watch what's actually happening?" |
| Product Analytics + Session Replay | Surveys | They're forming hypotheses from replays and want direct user input | "You're watching sessions and seeing confusion. Want to ask users directly what's tripping them up?" |
| Product Analytics + Surveys | Experiments | They've identified problems and want to validate fixes | "You know the problem. Let's test whether your proposed fix actually works before building it fully." |
| Experiments running | Revenue Analytics | They're testing changes but measuring proxy metrics, not revenue | "Your experiment improved conversion by 15%. But did it actually increase MRR?" |
| Analytics + Experiments mature | Workflows + Product Tours | They know what works and want to operationalize it | "You proved the new onboarding flow works. Now let's guide every new user through it automatically." |
| Product team in PostHog | Growth & Marketing (for the growth team) | Product team is in PostHog. Growth team should be too. | "Your PMs are using PostHog for product decisions. Has the growth team seen what they can do with funnels and experiments for conversion optimization?" |
| B2B account, no Group Analytics | Group Analytics add-on | B2B companies need company-level analytics | "You're tracking individual users. But do you know which *companies* are most engaged and which are at risk?" |
| Product team using flags for experiments | Release Engineering (for the eng team) | Engineering is implementing flags for experiments. They can use them for releases too. | "Your engineers are already deploying feature flags for experiments. Have they considered using the same infrastructure for all their releases?" |

## Internal resources

- **Product Analytics docs:** [Funnels](/docs/product-analytics/funnels) · [Retention](/docs/product-analytics/retention) · [Lifecycle](/docs/product-analytics/lifecycle) · [Cohorts](/docs/data/cohorts) · [User paths](/docs/product-analytics/paths) · [SQL](/docs/product-analytics/sql)
- **Session Replay docs:** [Session Replay](/docs/session-replay)
- **Surveys docs:** [Creating surveys](/docs/surveys/creating-surveys)
- **Experiments docs:** [Experiments](/docs/experiments) · [Exposures](/docs/experiments/exposures)
- **Revenue Analytics docs:** [Getting started](/docs/revenue-analytics/start-here) · [Dashboard](/docs/revenue-analytics/dashboard)
- **Workflows docs:** [Getting started](/docs/workflows/start-here) · [Email drip campaigns](/docs/workflows/email-drip-campaign)
- **Product Tours docs:** [Getting started](/docs/product-tours/start-here) · [Creating tours](/docs/product-tours/creating-product-tours)
- **Feature Flags docs:** [Getting started](/docs/feature-flags/start-here)
- **PostHog AI docs:** [Enable PostHog AI](/docs/posthog-ai/allow-access) · [Example prompts](/docs/posthog-ai/example-prompts)
- **Group Analytics docs:** [Group Analytics](/docs/product-analytics/group-analytics)

## Appendix: Company archetype considerations

| Archetype + Stage | Framing | Key Products | Buyer |
|---|---|---|---|
| AI Native — Early | Product Intelligence looks different here. There's no UX researcher. A GTM engineer or founding PM is looking at funnels, activation rates, and conversion. Frame it as "understand what makes users stick" not "deep behavioral research." | Product Analytics (funnels, retention), Session Replay, Experiments, PostHog AI | Founder, founding PM, GTM engineer |
| AI Native — Scaled | Starting to formalize the product function. May have a dedicated PM. AI Evals becomes relevant as a bridge: evaluating AI output quality is product intelligence for AI products. | Product Analytics, Session Replay, Surveys, Experiments, AI Evals, Revenue Analytics | PM, Head of Product, AI Product Lead |
| Cloud Native — Early | First real analytics investment. They need to find product-market fit. Speed matters. Don't overwhelm with features. Start with funnels and retention, add replay and surveys as they mature. | Product Analytics, Session Replay, PostHog AI | Founder, first PM, product engineer |
| Cloud Native — Scaled | Dedicated product team with PMs, designers, maybe UX researchers. They want depth: cohort analysis, retention by feature, experiment velocity. Workflows and Product Tours become relevant for operationalizing insights. | Full Product Intelligence stack. Group Analytics if B2B. | Head of Product, VP Product, UX Research Lead |
| Cloud Native — Enterprise | Multiple product teams, multiple workloads. The play is expanding PostHog from one team to many. Standardization and governance matter. RBAC (Enterprise package) becomes relevant. | Full stack + Group Analytics + Enterprise package | VP Product, CPO, product ops |
