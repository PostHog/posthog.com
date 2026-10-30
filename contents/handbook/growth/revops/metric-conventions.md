---
title: Metric conventions
sidebar: Handbook
showTitle: true
---

We're moving our canonical numbers into PostHog's [semantic layer](/docs/semantic-layer) so that any person or agent asking "what's our MRR?" gets the same answer without having to know how it's calculated.

That only works if metrics are named well enough to find and distinguish. These are the ground rules for creating one.

**Names are reserved but not permanent.** You can [rename a metric](/docs/semantic-layer/metrics#renaming-and-deleting), redefine one under the same name, and reuse a deleted name later with a new definition. Renaming frees the old name and breaks anything that stored it – saved SQL, run URLs, links – and sends an approved metric back to `proposed` for re-approval. So treat the name as a reference other things point at, and pick one worth keeping.

## 1. Name shape

```
<subject>[_<method>][_<segment>][_by_<dimension>]
```

Fixed order, so names sort and scan predictably. Only `subject` is required.

| Slot | What it says | Values in use |
|---|---|---|
| `subject` | What's measured, named as specifically as it needs to be | `mrr`, `arr`, `nrr`, `gdr`, `logo_retention`, `paying_customers`, `usage` |
| `method` | How it's computed over time | `current`, `monthly`, `quarterly`, `monthly_rolling`, `quarterly_annualized` |
| `segment` | Population filter | `managed`, `ever_core` |
| `by_<dimension>` | Breakdown column the metric returns, one row per value | `by_product` |

The name says what the number *is*. Other info about the metric like who reads it, what it was built for etc may change while the number stays the same, so a name built on them may be inaccurate later on.

**Don't name a metric after where it's published.** If two similar metrics differ because of different windows or different customer segments, put that in the name instead:

```
nrr_monthly_rolling
nrr_quarterly_annualized
nrr_quarterly_annualized_managed
gdr_monthly_rolling
```

**Don't name a metric after the workflow that prompted it.** A metric built for a growth review is still just MRR by product for the month, and the next person curious about that product wants the same number — they shouldn't need to know where it came from to find it.

The test: would this number exist if the workflow didn't? If yes, the workflow doesn't belong in the name. Something like a per-run cost for a specific internal system is different. There the system *is* the thing being measured, so it's part of the subject.

**One metric with a dimension beats many near identical metrics.** If the same number exists for every product, make one metric that returns product as a column and filter it, rather than one metric per product. Give the agent the path to the number and let it narrow down.

The dimension goes last in the name as `by_<dimension>`: `mrr_monthly_by_product` returns (month, product, mrr). A segment filters the population, a dimension is a column the metric returns, so `nrr_quarterly_annualized_managed` is one number per cohort while `mrr_monthly_by_product` is one row per product.

**Adding a value that isn't in the table? Add it to the table.** 

**No units in the name** set the `unit` field instead (`usd`, `percent`).

## 2. What the SQL should return

There's no query engine on top of a metric. Whatever the definition returns is handed to the agent, which filters or aggregates it further to answer the question. Shape the result with that in mind.

**Default to a series, not a single number.** Return one row per period at the finest grain the number is useful at, usually monthly, plus one row per dimension value if the name has a `by_` slot. One series answers "what is it now", "last quarter" and "how's it trending" from a single definition. Make a standalone scalar metric only when a headline number must be exact and the agent shouldn't do arithmetic to get there: `arr` exists as its own metric for this reason.

**One subject per metric.** A count of insights created and the number of unique users creating insights are different subjects, so they're different metrics (`insights_created_monthly`, `insight_creators_monthly`), not two columns in one. Multiple columns in one metric are ok only when they're windows or components of one calculation that must agree with each other: `gdr_monthly_rolling` returns 3, 6 and 12 month windows of the same measure, `mrr_bridge_monthly` returns lifecycle stages that reconcile to a total.

## 3. Make the difference from siblings visible

The name doesn't need to explain what NDR is, that's what the description is for, and our [retention metrics](/handbook/growth/revops/retention-metrics) and [revenue adjustments](/handbook/growth/revops/revenue-adjustments) pages cover some of the underlying methodology. The name needs to make clear how yours differs from the other similar metrics. If you can't tell two siblings apart without opening both, the qualifier needs work, or it needs a row in the table above.

## 4. Shared logic goes in a view, not a second copy

There's no way to define a metric in terms of another metric today. So if you're about to paste the same expression into a second metric, create a view instead and have both read from it.

This matters a lot, we already have copies have drifted apart from each other!

One thing to know: editing a metric sends it back to `proposed` for re-approval, but editing a view doesn't. A view carrying shared business logic moves every metric downstream of it silently, so it needs an owner.
