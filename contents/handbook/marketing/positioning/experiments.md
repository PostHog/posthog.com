---
title: Experiments
sidebar: Handbook
showTitle: true
---

*For the canonical frame everyone at PostHog uses – the self-driving story and standard description – see [Brand foundations](/handbook/brand/foundations#how-we-describe-posthog).*

## Elevator pitch

PostHog Experiments run on top of Feature Flags, so every experiment is a controlled rollout by default. Multiple metric types — funnels, trends, retention, ratio metrics — let you measure what actually matters, not just what's easy to track. Watch session replays of each variant's users. Measure side effects across your entire product. 

For self-driving development, this means enabling PostHog Code to create experiments and re-query the results automatically - making experiments the evaluation layer for agents.

Most experiment platforms run tests. PostHog runs tests *and* closes the loop from signal to fix to evaluation.

## The unique belief (in terms of experiments)

In traditional product development, an A/B test is the last step before shipping. In [self-driving development](/blog/self-driving-product) they are tactically important because they turn product data into a control system. They let the agent make changes without pretending it has perfect judgment. The agent can be wrong safely, because every change has a measured blast radius and a pass/fail signal.

That’s the PostHog-shaped belief: autonomous coding only becomes trustworthy when the agent can measure whether its own work improved the product.

**Experiments are how the autonomy loop knows whether it's working.** Without experiments, agents can ship changes indefinitely without knowing if anything improved. Experiments are the feedback signal that makes self-driving product development trustworthy — not just fast.

## Who this is for

- **Product teams who want statistical rigor** without a dedicated experimentation platform or data science team.
- **Data science teams that want a choice of models**. Teams can choose between frequentist and Bayesian models.
- **Engineers running safe, measurable rollouts** who want to graduate from "deploy and hope" to "deploy and measure."
- **Teams replacing Optimizely or VWO** who want experimentation built into their analytics and replay platform.
- **AI product teams** who want to formally compare model variants, prompt changes, or UI approaches with proper statistical power.
- **B2B SaaS teams** who need account-level experiment analysis alongside user-level results.

### Who this isn't for

- Teams who need no-code visual editors for landing page and CRO tests — Optimizely Web or VWO handle that better.
- Marketing teams running experiments outside the product (ad creative, email subject lines, landing pages).

## Messaging

### Message 1: Experiments as the evaluation layer for agents

**Problem:** An agent that ships code without measuring impact isn't self-driving — it's just automated code generation. The autonomy loop requires a closed feedback cycle: change made → outcome measured → agent learns. Experiments are part of that.

**Solution:** PostHog Code can scaffold experiments end-to-end. The same metric that triggered the fix signal is used as the experiment goal. Post-merge, PostHog Code re-queries the result and evaluates whether the change worked — without human intervention.

**Supporting features:**
- PostHog Code skills for full experiment lifecycle management
- MCP exposes experiment results to agent runtimes for automated evaluation
- Experiment results queryable alongside all PostHog data via HogQL
- Automatic re-evaluation after defined exposure periods

### Message 2: From flag to experiment to decision in one platform

**Problem:** Running an experiment can require a flag in LaunchDarkly, analytics in Amplitude, and a session tool in FullStory. Alternatively, you rely on a dedicated tool like Optimizely or VWO with a more limited feature set.

**Solution:** PostHog Experiments are built on Feature Flags. Every experiment starts as a flag variant. Every result is visible in PostHog Analytics. Every variant's sessions are watchable in PostHog Replay. Everything is in one place, with one data model - and all available to the PostHog MCP and PostHog Code to facilitate agentic workflows.

**Supporting features:**
- Experiments and flags share the same 1M/month free tier
- Multi-metric experiments — measure primary goal plus secondary effects
- Minimum detectable effect calculator and sample size guidance
- Group analytics: measure experiment impact at the account level

### Message 3: Watch replays of your experiment variants

**Problem:** Experiment results tell you which variant won. They don't tell you why. The "why" usually requires separate qualitative research or guesswork about what users were experiencing differently.

**Solution:** PostHog lets you filter session replays by experiment arm. Watch what users in the control group did. Watch what users in the treatment group did. Understand the behavioral difference, not just the metric difference.

**Supporting features:**
- Session replay filtering by experiment variant
- Funnel and path analysis segmented by experiment arm
- User-level drill-down from aggregate results
- Side-effect monitoring across metrics you didn't explicitly target

## Battle cards

### vs Optimizely

**Their approach:** Mature web experimentation with no-code visual editor, strong CRO tooling. Enterprise-focused, expensive. No native session replay or product analytics.

**Where PostHog wins:**
- Usage-based pricing vs Optimizely's enterprise contracts
- Native session replay per variant — Optimizely has no equivalent
- PostHog Code evaluation loop — Optimizely has no agent integration
- Better fit for product engineering experiments vs marketing CRO

## Objections

### "We can't run experiments with our traffic volume"

**Answer:** PostHog shows minimum detectable effect and required sample size before you start an experiment. It won't let you launch an underpowered test without a clear warning. For low-traffic products, PostHog supports Bayesian-style continuous monitoring via sequential testing, reducing the time to a confident result.

### "We already use LaunchDarkly flags for experiments"

**Answer:** PostHog's experiments use the same flag infrastructure you'd use with LaunchDarkly — but with analytics and session replay built in. You don't have to migrate your flags to start running experiments. Connect PostHog to your event stream, define a goal metric, and you can measure the impact of existing LaunchDarkly flags in PostHog today.

## Selling to enterprise

Enterprise experimentation customers get volume discounts, group analytics for account-level experiment analysis, SSO, access controls, EU data residency, and SOC 2. Contracts follow [the four-lever framework](/handbook/growth/sales/contract-rules).

The consolidation pitch is strong: Optimizely or VWO contracts at enterprise are often $50k+/year for a tool that only runs tests. PostHog covers experiments, analytics, session replay, feature flags, and error tracking for a comparable or lower total spend — and adds the agent evaluation loop that no pure experimentation vendor offers.
