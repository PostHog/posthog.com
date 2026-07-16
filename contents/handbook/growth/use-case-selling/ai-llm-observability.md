---
title: 'AI/LLM Observability'
showTitle: true
hideAnchor: false
---


## What is the job to be done?

"Help me understand how my AI features perform, what they cost, and how users interact with them."

- Track model performance: latency, cost per query, token usage, error rates across providers and models
- Evaluate AI output quality and detect regressions after prompt or model changes
- Understand how users actually interact with AI-generated output (not just whether the model responded)
- A/B test prompts, models, and parameters against real user behavior metrics, not just model-level metrics
- Monitor cost attribution by user, organization, or feature so you know where your OpenAI bill is going
- Catch model failures, hallucinations, and timeouts alongside traditional application errors

This is the fastest growing segment of our customer base. AI-native companies are adopting PostHog at a high rate, but often only for LLM Observability or only for Product Analytics. The cross-sell opportunity is significant because AI products have unique observability needs that span multiple PostHog products.

The buyer persona is distinct: AI engineers care about model-level metrics (latency, cost, token usage, accuracy) first, user-level analytics second. Leading with the AI story opens the door to everything else.

## What PostHog products are relevant?

- **[LLM Observability](/docs/ai-engineering) (core)** — Model performance, cost tracking, latency monitoring. Trace individual LLM calls with inputs, outputs, token counts, latency, and cost. Aggregate views by model, provider, feature, user, or organization.
- **AI Evals** — Score and evaluate AI outputs, proactively surface quality issues and user struggles. Run automated evaluations after prompt or model changes to catch regressions that look "fine" from an error rate perspective but degrade user experience. This is a bridge product: its primary home is AI/LLM Obs, but it unlocks value in [Product Intelligence](/handbook/growth/use-case-selling/product-intelligence) (surface where users struggle based on output quality) and [Release Engineering](/handbook/growth/use-case-selling/release-engineering) (catch quality regressions after prompt/model changes).
- **[Product Analytics](/docs/product-analytics)** — User behavior around AI features. How do users interact with AI-generated output? Do they accept suggestions, reject them, regenerate? Which users/organizations drive the most AI usage (and cost)? Funnels and retention for AI-powered flows.
- **[Experiments](/docs/experiments)** — A/B test prompts, models, and parameters against real user behavior metrics. "Does GPT-4o produce better outcomes than Claude for this use case?" measured not by model benchmarks but by user conversion, retention, and satisfaction.
- **[Error Tracking](/docs/error-tracking)** — Catch model failures, hallucinations (if detectable), timeouts, rate limit errors. Traditional error tracking applied to the AI layer. When combined with LLM Observability, you get both the exception and the model-level context.
- **[Session Replay](/docs/session-replay)** — See the user experience of AI features. Watch how users interact with AI-generated content: do they read it? Copy it? Regenerate? Leave? This qualitative layer is especially valuable because AI feature UX is hard to quantify with events alone.
- **[PostHog AI](/docs/posthog-ai/allow-access)** — Query model performance data in natural language. "Which prompts have the highest latency and cost?" or "Show me the error rate by model this week." Useful for AI engineers who want fast answers about their own AI infrastructure. ([Example prompts](/docs/posthog-ai/example-prompts))

## Adoption path and expansion path

### Entry point

Usually **LLM Observability** or **Product Analytics**. Two common patterns:

1. **Model-first:** AI engineer wants to understand model performance: latency, cost, token usage. They start with LLM Observability for tracing and cost attribution, then realize they need to understand how users interact with the output (Product Analytics), whether the output is actually good (AI Evals), and how to test improvements (Experiments).
2. **Product-first:** AI product team is building a product with AI features and starts with Product Analytics to track user behavior. They realize they need model-level metrics alongside user metrics, which pulls in LLM Observability. From there, they want to evaluate quality (AI Evals) and test prompt/model changes (Experiments).

### Primary expansion path

**LLM Observability → + AI Evals → + Product Analytics (user behavior) → + Experiments (prompt/model testing) → + Error Tracking → + Session Replay**

**The logic of each step:**

- LLM Observability → AI Evals: They can see model performance metrics (latency, cost, tokens). They need to know if the output is actually *good*. Evals score quality and detect regressions after changes.
- AI Evals → Product Analytics: They know the model is performing well technically. But are users actually getting value from the AI features? Product Analytics tracks how users interact with AI output: acceptance rates, regeneration rates, downstream conversion.
- Product Analytics → Experiments: They've identified differences in AI feature performance. Now they want to test improvements: different prompts, different models, different parameters. Experiments lets them A/B test with real user behavior as the success metric, not just model benchmarks.
- Experiments → Error Tracking: They're iterating on AI features. Error Tracking catches model failures, rate limit errors, and timeouts. Combined with LLM Observability, they get the full picture: exception + model context.
- Error Tracking → Session Replay: They're catching errors and measuring metrics. Session Replay shows them *how users experience* AI features, especially in ambiguous cases where the model didn't error but the output wasn't helpful.

### Alternate expansion paths

**Starting from Product Analytics:** An AI product team already using PostHog for product analytics. They add LLM Observability to get model-level metrics alongside their user behavior data. From there, AI Evals and Experiments are natural adds.

**Starting from Error Tracking:** Team catching model failures with Error Tracking. They realize traditional error tracking misses quality regressions (model responds but with worse output). AI Evals fills this gap, pulling in LLM Observability for the full model-level context.

## Business impact of solving the problem

**AI-native companies are the fastest growing customer segment.** Getting in early with LLM Observability means PostHog becomes the default platform as these companies scale. AI-native startups that adopt PostHog at seed stage often grow into significant accounts.

**The cross-sell opportunity is uniquely strong.** AI products sit at the intersection of multiple PostHog use cases: model observability (AI/LLM Obs), user behavior analytics (Product Intelligence), release management for prompt/model changes (Release Engineering), and error tracking for model failures (Observability). One AI customer can reasonably adopt products from 4+ use cases.

**No one else has this combination.** Langfuse and Helicone do LLM tracing. Amplitude does product analytics. Sentry does error tracking. No one connects model performance → output quality → user behavior → business outcomes in one platform. That's PostHog's pitch.

**AI Evals is the bridge product.** For any account building AI features, AI Evals connects AI/LLM Observability to Product Intelligence (are users struggling based on output quality?) and Release Engineering (did a prompt change cause a quality regression?). It's a natural entry point into multiple use cases from a single product.

## Personas to target

| Persona | Role Examples | What They Care About | How They Evaluate |
|---|---|---|---|
| AI Engineer | ML Engineer, AI Engineer, Applied AI | Model performance, cost optimization, latency, quality | "Can I see cost per query by model, trace individual calls, and detect quality regressions?" |
| AI Product Manager | AI PM, Product Lead (AI features) | User experience of AI features, adoption rates, business impact | "Can I see how users interact with our AI features and whether they drive retention?" |
| AI Founder | Founder, CTO at AI-native startup | All of the above. Cost control. Speed. Not paying for 5 tools. | "How fast can I set this up and how much does it replace?" |
| AI Product Engineer | Full-stack engineer building AI features | Instrumentation, debugging, prompt iteration cycle time | "How easy is it to instrument? Can I see trace-level detail for debugging?" |

## Signals in Vitally & PostHog

### Vitally indicators this use case is relevant

| Signal | Where to Find It | What It Means |
|---|---|---|
| LLM Observability is active | Product usage data | AI/LLM Obs use case is live. Full expansion path available. |
| Company tags include "AI" or "LLM" or "ML" | Company info / tags | AI-native or AI-building company. This use case is likely relevant even if they haven't adopted LLM Observability yet. |
| High Product Analytics usage + AI company | Product usage + company type | They're using analytics but haven't connected model-level metrics. LLM Observability is the add. |
| Customer mentions Langfuse, Helicone, or "LLM costs" in notes | Vitally notes / conversations | Direct signal. They're thinking about AI observability and may be using a competitor or building it in-house. |

### PostHog usage signals

| Signal | How to Check | What It Means |
|---|---|---|
| LLM-related custom events (e.g., `llm_generation`, `ai_response`) | Event property explorer | They're tracking AI events in Product Analytics. LLM Observability would give them model-level detail. |
| High LLM Observability trace volume | Product usage metrics | Active AI instrumentation. Ripe for AI Evals and Experiments. |
| Experiments on AI-related features | Experiments list | They're already A/B testing AI features. Validate they're using LLM Obs for model-level measurement. |
| Error Tracking exceptions from AI/model code | Error tracking events | Model failures are happening. LLM Observability gives context beyond the stack trace. |

## Command of the Message

### Discovery questions

- What AI/LLM features are you building? How central are they to your product?
- How do you track model performance today? Cost, latency, token usage — where does that data live?
- When you change a prompt or switch models, how do you know the output quality held up?
- Can you tell which users or organizations are driving the most AI cost?
- How do you decide whether to use GPT-4o vs. Claude vs. a smaller model for a given feature? Is that data-driven or gut feel?
- When your AI feature produces a bad output, how do you find out? User complaint? Manual testing?
- Do you A/B test different prompts or models? How do you measure success — model benchmarks or actual user behavior?
- How do users interact with AI-generated output in your product? Do you track acceptance rates, regeneration, or downstream actions?

### Negative consequences (of not solving this)

- AI costs grow unchecked because there's no visibility into cost per query by user, feature, or model
- Prompt or model changes degrade output quality but nobody notices until users complain
- Model-level metrics (latency, tokens) are tracked separately from user behavior, so the team can't answer "are users actually getting value from the AI feature?"
- A/B testing prompts or models relies on model benchmarks, not real user outcomes, leading to optimizations that don't translate to business results
- AI failures (timeouts, rate limits, hallucinations) are caught ad hoc instead of systematically

### Desired state

- One platform for model performance, output quality, user behavior, and business outcomes
- Cost attribution by user, organization, and feature so the team knows where the AI budget goes
- Automated quality evaluation after every prompt or model change
- A/B testing of prompts and models measured against real user behavior, not just model benchmarks
- AI errors caught proactively alongside traditional application errors
- The full picture: model trace → output quality score → user interaction → business outcome, all connected

### Positive outcomes

- AI costs decrease through visibility and optimization (knowing which models/prompts to use where)
- Quality regressions caught before they reach users at scale
- Faster AI iteration cycle: change a prompt, evaluate quality, measure user impact, all in one tool
- Better model selection decisions based on user outcomes, not just model benchmarks
- Consolidation of AI observability (Langfuse/Helicone) with product analytics and error tracking into one platform

### Success metrics

**Customer-facing:**

- AI feature usage and adoption rates improve (users get more value from AI output)
- AI costs per unit of value decrease (better model selection, prompt optimization)
- Quality regression detection time decreases (evals catch issues faster)
- Prompt/model experiment velocity increases

**TAM-facing:**

- Customer expands from LLM Obs-only to multi-product (Product Analytics, Experiments, Error Tracking)
- AI Evals adoption grows (quality evaluation is active, not just tracing)
- Experiment count on AI features increases
- Non-AI products start being adopted (Session Replay, Feature Flags) as the broader platform becomes familiar

## Competitive positioning

### Our positioning

- **Model performance + user behavior in one platform.** Langfuse traces your LLM calls. PostHog traces your LLM calls AND shows you how users interact with the output AND lets you A/B test improvements AND catches errors. No one else connects the full stack.
- **Real user outcomes, not just model metrics.** Other AI observability tools optimize for model performance (latency, cost, perplexity). PostHog lets you optimize for user outcomes: did the user accept the suggestion? Did they convert? Did they come back?
- **Experiments on prompts/models measured by business metrics.** A/B test GPT-4o vs. Claude measured not by BLEU score but by user conversion and retention. This is what actually matters for AI product decisions.
- **AI observability + traditional observability.** Error Tracking catches model failures. Session Replay shows the user experience. Product Analytics measures business impact. It's one platform, not AI observability siloed from everything else.

### Competitor quick reference

| Competitor | What They Do | Our Advantage | Their Advantage |
|---|---|---|---|
| Langfuse | Open-source LLM tracing, prompt management, evals | Broader platform (product analytics, experiments, replay, error tracking); user behavior metrics; not just model metrics | More mature LLM-specific features; open-source community; purpose-built prompt management |
| Helicone | LLM request logging, cost tracking, caching | Broader platform; user behavior connection; experiments; not a single-purpose tool | Simpler to set up for basic LLM logging; built-in caching/rate limiting features |
| Braintrust | LLM evals, logging, prompt playground | Broader platform; user behavior metrics; production monitoring not just offline evals | More mature eval framework; better prompt playground and iteration workflow |
| Datadog LLM Monitoring | LLM tracing as part of broader APM | Product analytics integration; user behavior; better pricing for AI-native startups | Full APM stack; enterprise-grade; part of existing Datadog deployment for bigger companies |

**Honest assessment:** Our strongest position is with AI-native startups and teams building AI features inside existing products. The pitch is "one platform for everything" instead of Langfuse + Amplitude + Sentry + a flag tool. We're weaker against teams that want the deepest possible LLM-specific tooling (Langfuse's prompt management and eval framework are more mature). We're also weaker against enterprise teams already embedded in Datadog. Our sweet spot is AI teams that want model performance connected to user outcomes in one place, without managing 4 vendors.

## Pain points & known limitations

| Pain Point | Impact | Workaround / Solution |
|---|---|---|
| LLM Observability feature set is newer than Langfuse | Teams expecting Langfuse-level prompt management and eval detail may find gaps | Be honest about maturity. Position the breadth of the platform (analytics, experiments, replay) as the differentiator. Langfuse is great for pure LLM tracing; PostHog is better when you also need to understand user behavior and business impact. |
| AI Evals may not support all evaluation frameworks | Teams with custom eval pipelines may want more flexibility | Check current eval capabilities. For custom frameworks, PostHog's API and data warehouse can integrate with existing eval pipelines. |
| Session Replay for AI chat interfaces can be noisy | Chat-based AI products generate a lot of replay data per session | Configure sampling rules. Focus replay viewing on sessions with error events or low AI quality scores. |

## Getting a customer started

### What does an evaluation look like?

- **Scope:** Instrument their primary AI feature with LLM Observability tracing. Set up cost attribution by model and feature. If they have a prompt change planned, set up AI Evals before and after.
- **Timeline:** 1 to 3 days to start capturing LLM traces. 1 to 2 weeks for meaningful cost and performance data. Eval comparisons depend on the change cycle.
- **Success criteria:** Can you see cost per query by model? Can you trace individual LLM calls with inputs and outputs? Can you detect a quality regression after a prompt change?
- **PostHog investment:** LLM Observability free tier covers 100K events/month. Product Analytics free tier covers 1M events. Experiments are included with Feature Flags.
- **Key requirement:** They need to instrument their LLM calls using the PostHog SDK or API. See the [AI Engineering docs](/docs/ai-engineering) for integration guides by framework.

### Onboarding checklist

- [ ] Instrument primary AI feature with [LLM Observability](/docs/ai-engineering) tracing
- [ ] Verify traces are capturing: model, inputs, outputs, token counts, latency, cost
- [ ] Set up a cost attribution dashboard: cost by model, by feature, by user/organization
- [ ] Configure AI Evals for output quality scoring on the primary AI feature
- [ ] Build a "Model Health" dashboard: latency, cost, error rates, quality scores
- [ ] Enable [Error Tracking](/docs/error-tracking) for model failures, timeouts, and rate limit errors
- [ ] Set up [Product Analytics](/docs/product-analytics) tracking for AI feature user interactions (accept, reject, regenerate, downstream actions)
- [ ] Enable [Session Replay](/docs/session-replay) to watch how users interact with AI output
- [ ] Plan first [Experiment](/docs/experiments) on an AI feature: different prompt, different model, or different parameter

## Cross-sell pathways from this use case

| If Using... | They Might Need... | Why | Conversation Starter |
|---|---|---|---|
| LLM Observability only | AI Evals | They can see model metrics but don't know if the output is actually *good* | "You can see your model's latency and cost. But do you know if the quality held up after your last prompt change?" |
| LLM Obs + AI Evals | Product Analytics | They know model performance and quality. They don't know how users interact with the output. | "Your model is fast and the quality is high. But are users actually accepting the suggestions and converting?" |
| LLM Obs + Product Analytics | Experiments | They see model metrics and user behavior. They want to improve. | "You can see GPT-4o costs more but users seem to prefer it. Want to run a proper A/B test to quantify the difference?" |
| AI feature releasing changes | Release Engineering (Feature Flags) | They're changing prompts/models and want controlled rollout | "When you change your prompt, do you ship to everyone at once? Feature flags let you roll out to 5% first and measure before going wide." |
| AI features in PostHog | Product Intelligence (for the product team) | AI team is in PostHog. The broader product team should be too. | "Your AI team uses PostHog for model metrics. Has the product team seen what they can do with funnels and retention for non-AI features?" |
| Error Tracking for AI errors | Observability (full stack) | They're catching AI errors but not traditional application errors | "You're tracking model failures. Are you also catching the non-AI exceptions? Error Tracking works for your entire stack." |

## Internal resources

- **LLM Observability docs:** [AI Engineering](/docs/ai-engineering)
- **Product Analytics docs:** [Product Analytics](/docs/product-analytics) · [Funnels](/docs/product-analytics/funnels) · [Retention](/docs/product-analytics/retention)
- **Experiments docs:** [Experiments](/docs/experiments)
- **Error Tracking docs:** [Error Tracking](/docs/error-tracking)
- **Session Replay docs:** [Session Replay](/docs/session-replay)
- **PostHog AI docs:** [Enable PostHog AI](/docs/posthog-ai/allow-access) · [Example prompts](/docs/posthog-ai/example-prompts)
- **Competitive battlecard:** *To be added: Langfuse / Helicone competitive positioning*

## Appendix: Company archetype considerations

| Archetype + Stage | Framing | Key Products | Buyer |
|---|---|---|---|
| AI Native — Early | "You need to understand your model costs, catch quality regressions, and see how users interact with your AI features, all without hiring a data team or buying 4 tools." Speed and simplicity. One platform. | LLM Observability, AI Evals, Product Analytics, PostHog AI | Founder, AI engineer, founding PM |
| AI Native — Scaled | "You're scaling AI features across your product. You need cost attribution by team/feature, automated quality evaluation, prompt/model experimentation, and the ability to connect model performance to business outcomes." | LLM Observability, AI Evals, Product Analytics, Experiments, Error Tracking, Session Replay | Head of AI/ML, AI PM, VP Eng |
| Cloud Native — Any (building AI features) | "You're adding AI features to an existing product. PostHog already tracks your users. Now connect model performance to user behavior so you can optimize the AI experience alongside everything else." The pitch here is extending their existing PostHog usage, not adopting a new tool. | LLM Observability, AI Evals (added to existing PostHog stack) | Engineering team building the AI feature, PM who owns the AI feature |
