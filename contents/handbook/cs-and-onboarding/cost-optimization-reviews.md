---
title: Cost optimization reviews
sidebar: Handbook
showTitle: true
---

Telling a customer how to pay us less is one of the highest-trust moves we can make. Done badly (a drive-by "have you tried sampling?", or a billing limit slapped on without fixing the cause) it burns that trust instead. This page is the repeatable version: when to trigger a review, how to find the waste, how to present it, and how to confirm the savings landed.

The short version: **find the waste, put it in terms the customer thinks in, fix it with them, and check back that it worked.** The end state is a bill the customer can clearly explain, built from products that fit what their business does. Every company is a little different here: an AI product company should probably be using LLM analytics, and if they aren't, that mismatch belongs in the review too. A customer who watches you cut their bill will trust you with the next three products they adopt.

Where this sits:

- This is the proactive, recurring version for CSM-managed accounts. The onboarding team runs a one-time cost read for new customers inside their [account audit](/handbook/onboarding/onboarding-conversations-playbook), and their audit prompt is worth reusing here.
- If the customer came to *us* asking to cut costs, start with [risk mitigation and churn prevention](/handbook/growth/sales/risk-mitigation-and-churn-prevention) and use this page for the follow-through.
- This page covers what customers spend on PostHog. For what they spend on their LLM providers, hand them the [LLM cost optimization guide](/handbook/cs-and-onboarding/shareable-guides/llm-cost-optimization).

## When to run one

Don't wait for the customer to complain. By the time someone asks "why is our bill so high?", trust has already taken damage. Run a review when you see:

- **A spend anomaly.** A month-over-month jump that doesn't match their growth. Usually an implementation change, not a usage change, and worth a quick check before it turns into invoice-shock.
- **A billing limit appears.** A customer setting a billing limit is telling us they're nervous. The limit caps the symptom; the review fixes the cause.
- **Renewal within ~180 days.** Walking into a [renewal](/handbook/cs-and-onboarding/renewals) having already saved them money changes the entire conversation. The renewals page starts the clock at three months; for cost reviews, start earlier than that. A review delivered months out is genuine help, while one delivered two weeks before signature reads as a move to protect the renewal.
- **Fast product adoption.** A team that just turned on replay or LLM analytics is usually running defaults, and defaults are rarely cost-optimal at their scale.
- **A product enabled with zero successful usage.** LLM analytics live with no `$ai_generation` events, or error tracking with no exceptions, means something is broken or was never wired up. Both are worth finding before the customer does.
- **A health dip on a growing bill.** Paying more and using it less is the classic silent-churn setup. The review is often the re-engagement excuse.

## How to run one

### 1. Baseline the spend

Pull the account's spend by product for the last 3-6 months. Spend comes in two flavors, and your writeup should say which one it's built on:

- **Actual spend** is the billing page or the invoice. It's the source of truth, and it's UI-only: no API or MCP surface exposes it.
- **Estimated spend** is usage volumes multiplied by the [public pricing rates](/pricing). Use it when you're working from usage data, label every derived dollar as an estimate, and reconcile against the next invoice.

The method works with either. What breaks it is mixing the two without saying so.

You're looking for the shape, not the total: which products drive the bill, what's growing faster than usage, where the trend broke. Two questions to answer before moving on: *does the bill make sense against their growth, and are the products they're paying for aligned with what their business does?* If spend grows faster than their users or events, there's waste. If they're paying for products that don't fit how they work, or missing ones that obviously do, that's the conversation. On young accounts there may be no trend to read yet, and one data point doesn't tell the whole story: read the mix instead (which event classes and origins make up the volume, and whether usage is bursty or organic).

One trap here: **count volumes with SQL or insights, not the event taxonomy.** Schema and taxonomy listings deliberately hide high-volume system events like `$autocapture`, `$pageleave`, and `$feature_flag_called`. Those are exactly the events that drive bills, so a baseline built from the taxonomy silently under-counts.

### 2. Convert to unit terms

Raw dollars scare people. Unit costs give them something they can actually judge:

- Cost per tracked user per month
- Cost per 1,000 events
- Cost per recorded session
- Cost per AI generation (for LLM analytics customers)

This is standard FinOps unit economics: tie the spend to a unit of business value so you can separate efficiency from growth. Nobody can tell you whether $8k/month is reasonable, but anyone can react to 4¢ per tracked user. The trend then does the arguing for you: if unit costs hold steady or drop while usage grows, you can be confident the growth is healthy, and that's an easy story for the customer to tell internally. Their finance team already works in these terms, and speaking that language makes us a partner they can trust with the bill.

Sometimes a unit metric won't compute at all. Dig into why before moving on: an LLM analytics customer with zero `$ai_generation` events almost certainly has a broken or un-instrumented AI feature, and that conversation outranks any billing item.

### 3. Find the waste

Waste hides in predictable places. Work through the products in bill order. The canonical per-product checks live in [health checks](/handbook/cs-and-onboarding/health-checks#are-they-paying-for-things-they-dont-need); this table is the diagnostic view of the same territory: what you'll see in the data, what usually causes it, and where the fix is documented.

| Symptom | Likely cause | Fix |
|---|---|---|
| Event volume way above user growth | Autocapture noise, dev/test events in prod, double-initialized SDKs | Filter or drop noisy events, separate dev project, audit init ([cutting costs: product analytics](/docs/product-analytics/cutting-costs)) |
| High anonymous event share | Capturing before identify, bot traffic | Review identify placement, bot filtering |
| Replay costs spiking | Recording 100% of sessions, no minimum duration, canvas recording on | Sampling, minimum duration, flag-gated recording ([controlling which sessions you record](/docs/session-replay/how-to-control-which-sessions-you-record)) |
| Flag-related request volume | Remote evaluation on every request | Local evaluation, bootstrapping ([cutting costs: feature flags](/docs/feature-flags/cutting-costs)) |
| LLM analytics costs climbing | Every generation captured at full fidelity for high-volume, low-value calls | Confirm they want full capture; work out what actually needs tracing |
| Paying for products with zero usage | Enabled during trial and never adopted, or a broken implementation | Diagnose which (see below) |

Three caveats from running this on real data:

- **Flag volumes in analytics only approximate the billing meter.** `$feature_flag_called` counts client-side evaluations rather than billable flag requests, and local evaluation and bootstrapping break the 1:1. Use it for direction, and verify against billing before promising savings.
- **Minimum duration doesn't catch idle recordings.** A dev tab left open records 30 minutes with zero active seconds and sails past any duration threshold. Idle recordings usually mean a dev environment leaking into the production project, and the fix is gating init in dev, not a replay setting.
- **Zero-usage spend has three explanations.** A cancellation, an adoption opportunity, or a broken implementation. Diagnose which before the customer does. From there: get more of the team using it, tune it so it earns its cost, or turn it off and save them the money. Any of those is a fine outcome. The broken case is the best one to find: fixing it means usage (and sometimes spend) goes *up*, for the right reasons.

### 4. Present it as recommendations, not a lecture

Bring findings with an actionable plan. A deck of observations with nothing to act on never lands. For each item: what you found, the estimated monthly savings, and what it takes to implement. Some fixes are a settings toggle; some need an engineer for a day.

Then bucket the recommendations the way a standard FinOps cost optimization presentation would: by risk, effort, and reward. Low-risk, low-effort, high-reward items go first and build momentum. Anything with real risk attached (losing data, losing visibility) waits until the easy wins have landed and the customer trusts the process.

Be explicit about tradeoffs. Cutting replay sampling to 20% saves money and loses 80% of sessions, and if they're mid-debugging-crisis, this is the wrong month for it.

Then let them choose. The goal is the customer being in control of their bill, and it's their call which recommendations to take. Customers who want to self-serve the details can take [estimating usage and costs](/docs/billing/estimating-usage-costs) plus the product cutting-costs docs linked above.

### 5. Validate that it worked

The review is finished when the data proves the changes worked, and there are two clocks:

- **Config fixes validate immediately.** Turning off autocapture or gating dev traffic shows up in the event mix within hours. Re-run your baseline queries as soon as the change ships; if the mix didn't move, the change didn't actually deploy.
- **Volume and unit-cost trends need a full billing cycle.** Check back after the next bill and say the number back to them: "your cost per tracked user dropped 31% since the changes" is the single most trust-building sentence in this playbook, and it costs thirty seconds to send.

If the savings didn't land, that's signal too. Either the implementation didn't happen or the diagnosis was wrong. Follow up either way.

## What this is not

- **Not a billing limit.** [Limits](/docs/billing/limits-alerts) stop the bleeding while you fix the cause. A customer bumping into their limit every month hasn't solved anything; they've capped how much value they let themselves get.
- **Not a discount conversation.** Optimization comes before pricing talk, always. A discount on a wasteful implementation just subsidizes the waste.
- **Not a one-time event.** For larger accounts, put a lightweight version on a quarterly cadence. Five minutes of "unit costs still healthy?" beats an annual archaeology dig.

## Why we do this

It feels backwards to systematize reducing our own revenue. It isn't. The accounts where we've cut the bill are the accounts that trust us enough to expand, because they've seen proof we'll optimize for their outcome over our invoice. Short-term revenue down, long-term trust and NRR up. That's the trade, and it's a good one.
