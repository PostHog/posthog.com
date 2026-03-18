---
title: 'Release Engineering'
showTitle: true
hideAnchor: false
---


## What is the job to be done?

"Help me ship faster without breaking things, control who sees what, and validate that changes actually work."

- Safely roll out features to specific users or groups before a full release
- Instantly kill a bad deploy without a rollback or hotfix
- Measure the actual impact of a release on key metrics, not just "it didn't crash"
- Reproduce user-reported bugs from the user's actual perspective during a rollout
- Run A/B tests tied to releases so every ship is a learning opportunity
- Detect quality regressions in AI features after prompt or model changes

## What PostHog products are relevant?

- **[Feature Flags](/docs/feature-flags) (core)** — Controlled rollouts, percentage-based releases, targeted delivery to specific users/groups, kill switches. The foundation of safe shipping. Engineering teams use flags to decouple deployment from release: code ships to production but features are gated behind flags. ([Getting started](/docs/feature-flags/start-here) · [Multivariate flags](/docs/feature-flags/creating-feature-flags#multivariate-feature-flags))
- **[Experiments](/docs/experiments)** — A/B testing tied directly to releases. "We shipped a new checkout flow behind a flag. Did it actually improve conversion, or just look better in the demo?" Experiments are billed with Feature Flags, so customers with flags already have access. ([Creating experiments](/docs/experiments/creating-an-experiment))
- **[Session Replay](/docs/session-replay)** — Reproduce bugs from the user's actual perspective during rollout. When a user reports "the new feature is broken," you don't need to guess. Filter replays by feature flag variant and watch exactly what happened. Also useful for rollout validation: watch how real users interact with the new feature before expanding the rollout.
- **AI Evals** — For products with AI features: detect quality regressions after prompt or model changes. Traditional error tracking won't catch a model that starts producing lower-quality output. Evals compare output quality before and after a change, catching regressions that look "fine" from an error rate perspective but degrade user experience.

## Adoption path and expansion path

### Entry point

Usually **Feature Flags**. Engineering team wants controlled rollouts. Common entry scenarios:

1. **Progressive rollout:** Team wants to ship a risky change to 5% of users, monitor, then expand gradually. Feature flags give them the gate; they quickly want metrics to know when it's safe to expand (Experiments).
2. **Kill switch:** After a bad deploy that took hours to roll back, engineering wants instant off-switches for new features. Feature flags are the answer.
3. **Growth team bridge:** The growth team wants to run an A/B test on the signup flow. Experiments requires Feature Flags, which requires engineering to implement. Engineering gets pulled into PostHog through the growth team's request. (See the [Growth & Marketing](/handbook/growth/use-case-selling/growth-and-marketing) playbook for this entry path.)

### Primary expansion path

**Feature Flags → + Experiments → + Session Replay (for debugging and rollout validation)**

**The logic of each step:**

- Feature Flags → Experiments: They're rolling out features behind flags but only monitoring for crashes, not measuring business impact. Experiments lets them answer "did this change actually improve the metric we care about?" Since Experiments is billed with Feature Flags, the barrier is adoption, not cost.
- Experiments → Session Replay: They're measuring impact quantitatively but can't debug issues qualitatively. When an experiment shows the control is outperforming the variant, they need to see *why*. Filter replays by flag variant, watch what's going wrong.

### Alternate expansion paths

**Starting from Experiments (growth-driven):** The growth team wants to A/B test, which requires engineering to implement flags. Engineering discovers they can use the same flag infrastructure for all their releases. This is the reverse entry: growth team is the catalyst, engineering becomes the power user. The growth team stays in [Growth & Marketing](/handbook/growth/use-case-selling/growth-and-marketing); engineering lands in Release Engineering.

**AI product teams:** After a prompt or model change, engineering wants to verify quality hasn't regressed. AI Evals catches regressions that traditional error tracking misses. This bridges into [AI/LLM Observability](/handbook/growth/use-case-selling/ai-llm-observability).

## Business impact of solving the problem

**This is a different buyer than Product Intelligence.** Release Engineering targets engineering managers, platform teams, and individual developers. In most organizations, these are separate from the product analytics buyer (PM). Selling to engineering unlocks a parallel revenue stream from the same account. Two budget holders, two champions, much stickier account.

**Feature Flags in the codebase are sticky.** Once feature flags are integrated into the release workflow and embedded in production code, they're very hard to rip out. This isn't a dashboard someone stops logging into. It's infrastructure that engineering depends on for every deploy. This makes Release Engineering accounts among the most defensible in our book.

**The tight integration between flags and experiments is genuinely differentiated.** LaunchDarkly has flags but weak experimentation. Standalone experimentation tools (Statsig, Eppo) have experiments but aren't integrated with the broader analytics platform. PostHog connects flags → experiments → product analytics → session replay in one tool.

**Experiments + Feature Flags create the multithreading bridge.** When growth wants to experiment and engineering implements the flags, both teams are in PostHog. This is one of the best ways to get multithreaded in an account if you aren't already.

## Personas to target

| Persona | Role Examples | What They Care About | How They Evaluate |
|---|---|---|---|
| Engineering Manager | EM, VP Eng, Director of Eng | Release velocity, incident rate, rollback time, team productivity | "Will this make my team ship faster with fewer incidents?" |
| Platform Engineer | Platform Eng, DevEx, Infrastructure | Developer experience, flag management at scale, API reliability | "How does this scale to thousands of flags? What's the API latency?" |
| Individual Developer | Senior Eng, Staff Eng, Product Engineer | Fast to implement, doesn't slow down CI/CD, good SDK quality | "How many lines of code to add a flag? Does the SDK suck?" |
| Founding Engineer | CTO, first engineers at early-stage startup | Speed, simplicity, not paying for LaunchDarkly's enterprise pricing | "How fast can I set this up and how much does it cost?" |

## Signals in Vitally & PostHog

### Vitally indicators this use case is relevant

| Signal | Where to Find It | What It Means |
|---|---|---|
| Feature Flags is the primary or only paid product | Product spend breakdown | Engineering-first account. Full Release Engineering expansion path available. |
| High flag evaluation volume, low experiment count | Product usage data | They're using flags for rollouts but not measuring impact. Experiments is the next conversation. |
| Customer mentions LaunchDarkly in notes | Vitally notes / conversations | Competitive displacement opportunity. They may be paying LaunchDarkly prices for flags alone. |
| Engineering-only users (no PMs or marketing) | User list in Vitally | Engineering-first adoption. Release Engineering is the primary use case. Product Intelligence is the cross-sell. |

### PostHog usage signals

| Signal | How to Check | What It Means |
|---|---|---|
| Feature flags created frequently but no experiments | Flag list vs. experiments list | They're using flags for rollouts but not measuring impact. Low-hanging Experiments adoption. |
| Flags with high evaluation volume | Flag usage metrics | Flags are in production, integrated into the codebase. High stickiness. |
| Session Replay enabled but not filtered by flag variant | Replay usage | They're recording sessions but not connecting them to rollout debugging. Onboarding opportunity. |
| Multiple flags per user/team | Flag list + creators | Multiple engineers are using flags. Good health signal and potential for team-wide adoption. |

## Command of the Message

### Discovery questions

- How do you currently roll out new features? All at once, or gradually?
- When a deploy goes wrong, how long does it take to roll back? What's that process look like?
- After you ship a feature, how do you know it's working? What metrics do you check?
- Do you run A/B tests on product changes? How is that connected to your release process?
- When a user reports a bug in a new feature, how do you reproduce it?
- How many deploys per day/week does your team ship? What slows that down?
- Are you using a feature flag tool today? What do you like and dislike about it?
- How does your growth team run experiments? Does engineering implement those, or is it separate?

### Negative consequences (of not solving this)

- Risky deploys require full rollbacks, costing hours of engineering time and user trust
- No way to gradually roll out to a subset of users, so every release is all-or-nothing
- Features ship without measuring impact, so the team doesn't know if changes actually helped
- Bug reproduction is guesswork because there's no way to see the user's actual experience during a rollout
- Engineering and growth/product teams use separate tools, so experiment results don't connect to release decisions
- High LaunchDarkly costs for feature flagging alone, without experiments or analytics integration

### Desired state

- Every feature ships behind a flag with gradual rollout and instant kill switch capability
- Every release is measured against real business metrics, not just error rates
- When a user reports a bug in a new feature, engineers can watch their exact session filtered by flag variant
- Growth team experiments and engineering rollouts use the same infrastructure
- Flag, experiment, and analytics data live in one platform, so the full picture is visible without switching tools

### Positive outcomes

- Faster release cycles: engineers ship with confidence because they can roll back instantly
- Fewer incidents: gradual rollouts catch issues at 5% instead of 100%
- Better product decisions: every release is also a measurement opportunity
- Reduced tooling cost: replace LaunchDarkly + separate experimentation tool with one platform
- Multithreaded account: growth and engineering share the same platform for experiments and rollouts

### Success metrics

**Customer-facing:**

- Release velocity increases (more deploys per week)
- Mean time to recovery from bad deploys decreases
- Percentage of releases measured with experiments increases
- Bug reproduction time decreases (engineers can watch filtered replays)

**TAM-facing:**

- Feature Flag evaluation volume grows (flags are being used more broadly)
- Experiment count increases (moving from "just flags" to "flags + measurement")
- Session Replay adoption grows alongside flag usage (debugging workflow)
- Non-engineering users (growth, PM) start creating experiments (multithreading indicator)

## Competitive positioning

### Our positioning

- **Flags + experiments + analytics in one platform.** The only tool where you can create a flag, run an experiment, measure the result in Product Analytics, and watch user sessions filtered by variant. No stitching together LaunchDarkly + Statsig + a replay tool.
- **Experiments included with Feature Flags.** Experiments are billed as part of Feature Flags. Customers using flags already have experimentation. The barrier is awareness and adoption, not cost.
- **Session Replay filtered by flag variant.** When an experiment shows the control winning, filter replays by the losing variant and watch what went wrong. No other flag tool offers this.
- **Better pricing than LaunchDarkly.** LaunchDarkly is expensive and charges separately for experimentation. PostHog bundles it and prices on requests, not seats.

### Competitor quick reference

| Competitor | What They Do | Our Advantage | Their Advantage |
|---|---|---|---|
| LaunchDarkly | Feature flags, targeting, enterprise flag management | Experiments included; analytics integration; session replay; far better pricing | More mature enterprise flag management; larger feature set for complex targeting rules; bigger enterprise install base |
| Statsig | Feature flags + experimentation + analytics | Broader platform (replay, surveys, workflows); open source | Purpose-built for experimentation; strong warehouse-native story; more advanced statistical methods |
| Eppo | Warehouse-native experimentation | Broader platform; doesn't require a data warehouse; integrated replay | Warehouse-native means they use your existing data; more advanced statistical methodology |
| Split.io | Feature flags + experimentation | Broader platform; better pricing; integrated analytics | More mature enterprise integrations |

**Honest assessment:** Our strongest position is against teams paying LaunchDarkly prices for flags alone and not getting experiments included. The "flags + experiments + analytics in one platform" pitch is genuine and saves money. We're weaker against teams that need very complex flag management at enterprise scale (LaunchDarkly's core strength) or teams that want warehouse-native experimentation (Eppo's pitch). Our sweet spot is engineering teams that want the full loop: flag a feature, measure its impact, debug issues with replay, all in one tool.

## Pain points & known limitations

| Pain Point | Impact | Workaround / Solution |
|---|---|---|
| Flag management UX is simpler than LaunchDarkly's | Enterprise teams with hundreds of flags may want more organizational features | PostHog flags work well at scale. For very complex targeting, review the [multivariate flags](/docs/feature-flags/creating-feature-flags#multivariate-feature-flags) and [payloads](/docs/feature-flags/payloads) documentation. |
| No built-in flag approval workflows | Some enterprise teams want PR-style review before a flag goes live | Use existing code review processes (flags are in code). PostHog [audit logs](/docs/data/audit-logs) track changes. |
| Statistical methodology is Bayesian | Teams preferring frequentist methods may push back | Bayesian is faster to reach conclusions and easier to interpret. For teams that insist on frequentist, this is a real limitation. |

## Getting a customer started

### What does an evaluation look like?

- **Scope:** Implement feature flags on one upcoming release. Ship behind a flag with gradual rollout. Optionally set up an experiment to measure impact.
- **Timeline:** 1 to 2 days to implement first flag. 1 to 2 weeks to see experiment results (depends on traffic).
- **Success criteria:** Can you gate a feature behind a flag and roll it out gradually? Can you instantly kill a flag if something goes wrong? Can you measure the impact of the change with an experiment?
- **PostHog investment:** Feature Flags free tier covers 1M requests. Experiments are included.
- **Key requirement:** Engineering needs to integrate the [PostHog SDK](/docs/feature-flags/start-here) into their codebase. This is the implementation step. Once the SDK is in, adding new flags is trivial.

### Onboarding checklist

- [ ] Install PostHog SDK in the application ([Feature Flags getting started](/docs/feature-flags/start-here))
- [ ] Create first feature flag for an upcoming release
- [ ] Set up gradual rollout (start at 5-10%, monitor, expand)
- [ ] Test kill switch: turn flag off and verify the feature is immediately disabled
- [ ] Set up first [Experiment](/docs/experiments) tied to a flagged feature, measuring a real business metric
- [ ] Enable [Session Replay](/docs/session-replay) and filter replays by flag variant to debug an issue
- [ ] Review experiment results and use them to make a ship/no-ship decision
- [ ] Plan second experiment to establish the workflow as a team habit

## Cross-sell pathways from this use case

| If Using... | They Might Need... | Why | Conversation Starter |
|---|---|---|---|
| Feature Flags only | Experiments | They're gating features but not measuring impact | "You're rolling out features safely. But do you know if they're actually *working*? Experiments are included with your flags." |
| Feature Flags + Experiments | Session Replay | They're measuring impact but can't debug qualitative issues | "Your experiment shows the control winning. Want to watch what users in the losing variant are actually experiencing?" |
| Feature Flags (engineering-driven) | Product Intelligence (for the product team) | Engineering is in PostHog. Product team should be too. | "Your engineers use PostHog for releases. Has your product team seen the analytics? They could track feature adoption and retention without a separate tool." |
| Feature Flags (for growth experiments) | Growth & Marketing (for the growth team) | Growth team initiated the experiments, engineering implemented the flags. Expand the growth side. | "Your growth team started the experiments. Have they explored Web Analytics and Marketing Analytics for attribution?" |
| Feature Flags + Experiments | Error Tracking / Observability | They're catching issues via experiments but want proactive error detection | "You're catching regressions through experiments. Error Tracking would catch exceptions before they show up in your metrics." |
| AI product releasing prompt/model changes | AI/LLM Observability | They need to detect quality regressions that error tracking won't catch | "After your last prompt change, did output quality hold up? AI Evals would tell you automatically." |

## Internal resources

- **Feature Flags docs:** [Getting started](/docs/feature-flags/start-here) · [Feature Flags](/docs/feature-flags) · [Multivariate flags](/docs/feature-flags/creating-feature-flags#multivariate-feature-flags) · [Payloads](/docs/feature-flags/payloads)
- **Experiments docs:** [Experiments](/docs/experiments) · [Creating experiments](/docs/experiments/creating-an-experiment) · [Exposures](/docs/experiments/exposures)
- **Session Replay docs:** [Session Replay](/docs/session-replay)
- **Competitive battlecard:** *To be added: LaunchDarkly competitive positioning*

## Appendix: Company archetype considerations

| Archetype + Stage | Framing | Key Products | Buyer |
|---|---|---|---|
| AI Native — Early | "Ship fast, break nothing. Feature flags let you deploy AI features to a subset of users and measure quality before going wide." AI Evals is especially relevant here. | Feature Flags, Experiments, AI Evals | CTO, founding engineer |
| AI Native — Scaled | "Your engineering team is growing and releases are getting riskier. Feature flags give everyone a safety net, and experiments make sure every change is measured." | Feature Flags, Experiments, Session Replay | VP Eng, Platform Lead |
| Cloud Native — Early | "Stop doing all-or-nothing deploys. Ship behind a flag, measure the impact, roll back in one click if something breaks." Speed and simplicity matter. | Feature Flags, Experiments | CTO, founding engineer |
| Cloud Native — Scaled | "Multiple teams shipping to the same product. Feature flags give each team independent release control. Experiments ensure changes are measured, not just shipped." | Feature Flags, Experiments, Session Replay | VP Eng, EM, Platform team |
| Cloud Native — Enterprise | "Standardize your release process across teams and BUs. Feature flags + experiments give you a consistent framework for safe, measured releases at scale." Governance (audit logs, RBAC) matters here. | Feature Flags, Experiments, Session Replay + Enterprise package | VP Eng, Director of Platform, DevEx Lead |
