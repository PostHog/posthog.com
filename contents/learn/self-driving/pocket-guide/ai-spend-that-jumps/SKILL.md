---
name: signals-scout-ai-cost
description: >
  Watches cost per conversation for AI features and reports when it breaks from its recent norm
  while volume holds steady, attributing the change to a model, prompt, cache, or retry cause.
allowed_tools:
  - emit_report
  - edit_report
---

# AI spend that jumps overnight

Watch unit economics for AI features, not the total bill.

Narrower than `signals-scout-ai-observability`, which rotates through cost, latency, errors,
volume and eval lenses and deliberately does not run every lens each tick. Run this one when
cost is the thing you want watched every day rather than whenever the rotation reaches it. If
you already run the canonical scout and cost regressions are surfacing in time, you don't need
both.

## Discriminator

Emit a report when cost per conversation rises above its trailing 14-day norm **while
conversation volume stays within its own normal range**. Write nothing when total cost rose but
cost per conversation is flat – that is usage growth.

### The bar

A starting threshold, to be tuned against what this team's data actually does:

- **≥1.5× the trailing 14-day median cost per conversation, sustained across two consecutive
  complete days**, or
- **≥2× for a single complete day**, where volume is within ±25% of its own 14-day median.

Use complete days only – a partial day reads as a spike every time. If the team's baseline is
genuinely noisy, widen the bar and write what you chose to the scratchpad rather than lowering
it and filing marginal reports.

## Explore

1. Compute daily cost per conversation over the last 14 days: total generation cost divided by
   distinct conversations – `$ai_trace_id`, or `$ai_session_id` where a conversation spans
   traces – split per feature.
2. Where a day clears the bar, decompose it. Check in this order, roughly the order of
   likelihood:
   - **Model changed** – compare the model distribution before and after.
   - **Cache hit rate dropped** – compare `$ai_cache_read_input_tokens` as a share of input
     tokens. A system-prompt edit invalidates the cache prefix and multiplies input cost with no
     change to model, token count, or generation count, so every other check here comes back
     clean while the bill climbs. Check it early.
   - **Prompt grew** – compare median input tokens per generation.
   - **Retries** – compare generations per conversation, and check `$ai_is_error` on the same
     generation stream.
   - **Output grew** – compare median output tokens.
3. If retries look like the cause, confirm the failures actually cost money. A 429 rejection
   bills nothing; only failures after the provider started generating do – timeouts mid-stream,
   `max_tokens` truncation, malformed tool output, guardrail rejections. Check `$ai_http_status`
   and `$ai_stop_reason`, and confirm the failed generations carry non-zero cost before calling
   retries the cause.
4. Name the most likely cause in the report. A cost report without a cause is just an invoice.
5. Where a deploy sits in the window, include the commit range.

## Disqualifiers

- Conversation volume moved as much as cost did – that's growth.
- The change is a deliberate, announced model upgrade.
- The change follows a deliberate caching-strategy change – a shortened prefix or a switched
  cache TTL raises unit cost on purpose.
- The provider changed its prices. This scout does not watch price lists, so confirm the
  per-token rate is unchanged before attributing a rise to your own code.
- The window covers a backfill, replay, or eval run rather than real traffic.
- The feature is new enough that there's no stable norm to compare against.
