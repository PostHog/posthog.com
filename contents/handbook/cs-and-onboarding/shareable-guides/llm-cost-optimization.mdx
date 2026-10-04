---
title: LLM cost optimization
sidebar: Handbook
showTitle: true
---

A field guide for customer-facing roles helping customers reduce LLM spend with [AI Observability](/docs/ai-observability/start-here).

## Why this matters now

Every flavor of AI – agentic, generative, functional, to name a few – is now woven into the infrastructure of most major SaaS organizations. As the relative intelligence of frontier models converges, the exponential spend from LLMs is much more visible on a company's P&L. PostHog sits at every observable layer of the technology stack, so customer-facing roles will field a growing number of asks about how to optimize LLM-related spend.

_Token efficiency_ is delivering the required output quality using the fewest tokens across prompt, context, and response. It's the highest-priority lever, and the biggest wins are architectural. Customer-facing roles at PostHog are well positioned to understand and convey the common cost optimization levers and how they're instrumented.

## The cost model

There are three main drivers of LLM spend.

1. **Model selection** – using a frontier model on a trivial task is like taking a Ferrari to the grocery store. Cost varies significantly across model family, catalog, and provider, so picking the right tool for the job makes the difference.
2. **Context window usage** – you might think it's just long prompts, retrieval-augmented generation (RAG) applications, and extensive chat histories, but you'd be wrong. It also includes tool and skill bloat, which happens when an AI agent has access to too many tools and skills, causing decision paralysis as it struggles to find the right one.
3. **Output length** – output tokens can cost ~4-5× input tokens because generation is sequential, which can make verbosity the most costly lever.

**One note on the math:** cost is an _estimate_ from tokens × matched pricing ([OpenRouter data](/docs/ai-observability/calculating-costs)) – ideal for the breakdown (which model, feature, or customer, and the trend), but reconcile the absolute total against the provider console or gateway, since negotiated rates, brand-new models, and some customers' billing live outside PostHog. To improve accuracy, customers can pass pre-calculated `$ai_input_cost_usd` and `$ai_output_cost_usd`, or set [custom per-token pricing](/docs/ai-observability/calculating-costs) with `$ai_input_token_price` and `$ai_output_token_price`.

## The toolbox – and what each looks like in PostHog

The goal is maximum impact without affecting quality. Work top-down, starting with the lowest-risk levers.

A note on breakdowns: dimensions like `feature` and `product` below are [custom properties](/docs/ai-observability/custom-properties) the customer sets on their generations (plain property names, no `$` prefix) – not reserved PostHog properties.

### Low risk

**1. Prompt caching** – reuse a stable, front-loaded prompt prefix instead of reprocessing it. This isn't about making the prompt shorter; it's about keeping the prefix identical across calls. For example, using `cache_control` in calls to Anthropic models charges 0.1× for cached input because the compute is skipped.

**Watch:** any prefix change (even a timestamp) busts the cache.

> _In PostHog:_ break down `$ai_input_tokens` by `feature` to find a stable prompt dominating input. After enabling, validate by watching the cached-token share rise and `$ai_total_cost_usd` per call drop at the same volume.

**2. Output discipline** – set `max_tokens` per task type (a classifier needs ~20 tokens, not the SDK's 4,096 default) and use structured outputs (JSON/schema) for extraction and classification. This can cut a significant portion (sometimes 30-60%) of output cost.

**Watch:** don't truncate genuinely generative responses.

> _In PostHog:_ rank features by output:input ratio (`$ai_output_tokens` ÷ `$ai_input_tokens`). Afterward, output tokens per call fall and cost follows.

**3. Batch API** – submit asynchronous work for a significant discount, processed via batching. Use it for large jobs that don't require streaming.

**Watch:** latency – it's a job returning data on a schedule.

> _In PostHog:_ tag offline jobs with a `task_type` property and watch their share of total cost; cost-per-task on those features roughly halves after moving to batch.

### Medium risk

**4. Context hygiene** – continuously evaluate and trim the system prompt (30-40% is often removable), use a sliding window or rolling-summary compression for long chats, and retrieve 3-5 RAG chunks instead of 50. Long workloads can be reduced significantly.

**Watch:** over-trimming drops context whose value shows up later – tune on real traces.

> _In PostHog:_ watch `$ai_input_tokens` climb across a `$ai_trace_id` or session. Afterward, input tokens per generation flatten.

**5. Model routing** – route each request to the cheapest model that can handle it, using heuristics/rules or a model-based classifier. This takes more work up front since it adds a layer to the architecture, and the obvious risk is added complexity and another model in the mix. It won't work without LLM calls that carry metadata.

**Watch:** the math wins only if the savings exceed the classifier costs, the retries from routing errors, and the engineering maintenance.

> _In PostHog:_ break down `$ai_total_cost_usd` by `$ai_model` and the relevant metadata (`feature`, `product`, etc.) to spot frontier-model spend on trivial features. Validate by watching spend shift over time toward cheaper models on trivial tasks.

### High risk

**6. Semantic caching** – match queries by embedding similarity and return the cached answer, bypassing the model entirely. Use it for FAQ-style, stable-answer, low-context, read-only knowledge. This is the riskiest lever because it trades correctness for cost.

**Watch:** false-positive similarity (cancel "order" versus cancel "subscription"), time decay of answers (returning last month's price when someone asks for current pricing), data drift, and model or prompt upgrades.

> _In PostHog:_ for customers serving features in scope, identify high-`$ai_generation`-volume candidates. Recommend shadow testing, then Feature Flags, then production. Validate by a reduction in excessive `$ai_generation` volume without consumer impact.
