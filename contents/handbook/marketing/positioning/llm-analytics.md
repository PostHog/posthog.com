---
title: LLM analytics
sidebar: Handbook
showTitle: true
---

*For the canonical frame everyone at PostHog uses – the self-driving story and standard description – see [Brand foundations](/handbook/brand/foundations#how-we-describe-posthog).*

## Elevator pitch

PostHog LLM Analytics tracks every model call — latency, tokens, cost per user, quality signals, errors — alongside the product events and session data from the humans using your AI features. When something goes wrong, you can trace it back to the exact conversation, the exact prompt, and the exact user cohort affected. And because it's PostHog, PostHog Code can read those traces and propose fixes — automatically.

Langfuse shows you the trace. PostHog shows you the trace *and* what it cost you in user retention **and** makes that information queryable to PostHog Code, the self-driving development platform. 

## The unique belief (in terms of LLM analytics)

Every team building an AI-native product is running two products simultaneously: the product users see, and the AI layer underneath it. That AI layer has its own failure modes — bad prompts, cost explosions, latency spikes, quality regressions — and none of those show up in standard product analytics. That's where LLM analytics comes in!

PostHog Code already uses LLM traces optimize AI features as part of the [product autonomy loop](/blog/self-driving-product). Its built-in `exploring-llm-traces` and `exploring-llm-clusters` skills let agents find patterns in model calls and propose prompt improvements. But that only works if the traces exist. **LLM Analytics is the signal layer that makes AI products self-improving.**

If you're building AI features without LLM observability, your agents are flying blind.

## Who this is for

- **Teams building AI-native products** — chatbots, copilots, agents, AI-assisted features — who need to understand model performance.
- **Engineers debugging why AI features underperform** — wrong answers, high latency, unexpected costs.
- **Product teams who want to correlate LLM quality with user retention and conversion.**
- **Teams who want LLM observability in the same place as product analytics** — not in a separate tool.

### Who this isn't for

- Data science teams who need model training infrastructure, fine-tuning pipelines, or MLOps — that's not PostHog. Yet.
- Teams who only care about billing/token costs — those tools exist, but PostHog adds user context that pure cost monitors don't.
- Enterprises with deeply embedded observability platforms (Datadog) where adding another tool isn't worth the friction.

## Messaging

### Message 1: LLM traces as product signals

**Problem:** An LLM trace tells you a model call failed. It doesn't tell you whether that failure caused the user to churn, downgrade, or file a support ticket. Without that connection, you can't prioritize what to fix.

**Solution:** PostHog links every LLM span to the user's full session — their history, their plan tier, their previous behavior. A 3% quality degradation in your AI assistant looks very different when you can see it's impacting your highest-value accounts.

**Supporting features:**
- LLM span tracking linked to PostHog person profiles
- Cost-per-user and cost-per-feature analysis
- Cluster analysis to find patterns across conversations
- PostHog Code's `exploring-llm-traces` skill triggers automated investigation on quality regressions

### Message 2: Cost visibility with user context

**Problem:** Token cost monitors tell you what you spent. They don't tell you whether you spent it on users who converted or users who churned.

**Solution:** PostHog shows LLM costs alongside product metrics — retention, conversion, NPS responses — so you can make informed decisions about which model to run, which features to optimize, and where cost reduction would hurt versus help.

**Supporting features:**
- Cost trends by model, feature, and user cohort
- Latency analysis tied to user-visible outcomes
- Alert on cost spikes or quality regressions
- Full event stream alongside trace data

### Message 3: The only LLM observability that knows your users

**Problem:** LLM observability tools were built by infrastructure teams. They're excellent at tracing model calls. They don't understand that the user behind the call is a churned customer, a free trial, or your top enterprise account.

**Solution:** PostHog's LLM Analytics sits inside a product platform with full user profiles, cohorts, and behavioral history. Every trace has a person behind it. That context is what makes the data actionable — and what makes PostHog Code's agent research meaningful rather than mechanical.

**Supporting features:**
- Supports OpenAI, Anthropic, Google Gemini, and major LLM providers
- Session replay correlation — watch the session where the AI feature failed
- Feature flag integration — A/B test prompt variations formally
- Unified dashboard with product analytics

## Battle cards

### vs Langfuse

**Their approach:** Open source LLM observability. Excellent trace visualization, evaluation pipelines, prompt management. No product analytics, no session context, no agent loop integration.

**Where PostHog wins:**
- User context — traces linked to person profiles and behavioral history
- PostHog Code integration — traces become inputs to the autonomy loop
- Session replay correlation — watch what users did before and after an LLM call
- One platform — LLM observability inside your existing PostHog setup

### vs Helicone

**Their approach:** LLM cost monitoring and request logging. Simple setup via proxy. No product data, no user behavior context.

**Where PostHog wins:**
- Cost data with user and cohort context, not just raw token counts
- Product analytics alongside LLM metrics in one dashboard
- Agent integration for automated investigation

### vs Datadog APM

**Their approach:** Full infrastructure observability including LLM tracing. Enterprise-grade. Very expensive. Designed for SRE teams, not product engineers.

**Where PostHog wins:**
- Purpose-built for product engineering teams
- Dramatically lower cost for the observability product teams actually need
- Native integration with feature flags and experiments for model A/B testing
- PostHog Code agent integration

## Objections

### "We already use Langfuse"

**Follow-up:** How do you connect your LLM quality data to your product metrics today?

**Answer:** Langfuse is a strong trace tool. PostHog LLM Analytics adds what Langfuse doesn't have: user context, session replay correlation, product metric linkage, and PostHog Code agent integration. Many teams run both during evaluation and consolidate as PostHog's LLM features mature.

### "We just need cost monitoring"

**Answer:** Cost monitoring is one metric. Can you build a better product if you just look at one metric alone? PostHog shows cost per user, cost per feature, cost per cohort — so you can answer "are we spending money on users who convert?" That's the difference between a billing tool and a product tool.

### "Our LLM features aren't production yet"

**Answer:** That's the perfect time to instrument! Retroactive instrumentation means you lose the data from your beta cohort. PostHog is easy to add during development and grows with you into production.

## Selling to enterprise

Enterprise LLM Analytics customers get the same four-lever discounting as other PostHog products: volume, commitment, payment timing, forecast certainty. The enterprise conversation usually centers on **cost governance** (which model, which features, which teams are driving spend) and **compliance** (is LLM trace data covered by the DPA; does EU residency apply to conversation data).

The forward-looking pitch: as PostHog Code matures, teams with well-instrumented LLM Analytics will have a fully automated quality improvement loop — traces in, agent optimization out. That's the infrastructure play for AI-native companies in 2030, and it starts with getting the observability layer right today.
