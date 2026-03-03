---
title: Product metrics
sidebar: Handbook
showTitle: true
---

We track a short list of metrics in each [per-product growth review](/handbook/product/per-product-growth-reviews). The idea of a standardised list of metrics is that each product team has roughly the same metrics they care about, and we can compare metrics across products and across time, such as revenue growth, to see how we compare.

Our growth review metrics strike a balance between depth, efficiency and "measuring what matters". We want to make sure our metrics alert us of potential negative (or positive!) developments, giving us enough signal to dive deeper into lower-level metrics.

If as a new product manager or team lead you want to look at a wider range of metrics, please do! These can either be incorporated in the growth reviews, or in ad-hoc metrics reviews you or your team are doing.

## Metrics we use in growth reviews

### Revenue

These queries are written and owned by the <SmallTeam slug="billing" />. They are standardised across products, and match the combined PostHog revenue queries. If you are intending a change, please chat to the billing team first.

- <PrivateLink url="https://us.posthog.com/project/2/dashboard/198672">Link to combined revenue dashboard</PrivateLink>
- <PrivateLink url="https://us.posthog.com/project/2/dashboard/215472">Link to per-product revenue dashboard</PrivateLink>

Note that currently, refunds are not removed from per-product revenue, which is something to note in a growth review if there is a sizable refund that month.

| Metric | Notes |
| --- | --- |
| Monthly recurring revenue (MRR) |  |
| Annual recurring revenue (ARR) |  |
| MoM growth rate | For more mature products, we want this to be over 9%, for newer products between 15-20% on average |
| New revenue growth rate |  |
| Revenue expansion rate  |  |
| Revenue contraction rate |  |
| Revenue churn rate |  |
| Revenue retention rate |  |
| Total paying customers count |  |
| Paying customers growth rate |  |
| Quarterly net revenue retention (NRR) | Instead of a rolling metric, we use the quarterly values and report on it once a quarter. The rolling metric is available on the dashboard too, as it can be helpful for debugging |
| Annualised NRR | Same as above |
| Revenue share | For revenue products like data pipelines or product analytics, it makes sense to calculate CDP/batch exports/anonymous-only share of revenue, to understand individual product contribution better |

### Usage

Product usage metrics are defined by the PM or small team lead. When setting up metrics for a new product, it’s recommended to start with a longer list and trim it once user behavior is better understood. We recommend adding all relevant product metrics to one dashboard that is accessible, kept up to date and reviewed by the whole small team. For better discoverability, some of us use the appendix ™ to mark the primary usage dashboard.

This dashboard can also include NPS & support metrics (see below).

- <PrivateLink url="https://us.posthog.com/project/2/dashboard/26089">Link to session replay usage metrics dashboard (example)</PrivateLink>

| Metric | Notes |
| --- | --- |
| Unique monthly users - count | As defined by a key product action we also use in the activation definition, such as “flag created” or “recording analyzed” |
| Unique monthly users, growth rate |  |
| Unique monthly organizations - count | Same definition as unique monthly users |
| Unique monthly organizations, growth rate |  |
| Activation | [Guide how to define activation for a new product](/handbook/growth/growth-engineering/per-product-activation); <PrivateLink url="https://us.posthog.com/project/2/dashboard/130345">Dashboard that contains all per-product activation queries</PrivateLink> |
| Usage retention (1, 3, 6-month) | Report on it once a quarter. Retention changes slowly, it will be easier to see changes zoomed out |

### NPS

We have a NPS survey set up for each product. They need regular updates due to some survey limitations. If you want to set up a new NPS survey, speak to the Surveys PM (<TeamMember name="Cory Slater" photo />), he can help you set one up and keep it updated.

We track a 4-week NPS score, but we don’t have the volume of responses we need to get reliable results. This is why we include the open-ended feedback in the growth reviews, as this is usually more actionable.

- <PrivateLink url="https://us.posthog.com/project/2/surveys/018c8bb5-3b27-0000-5231-23807a63f324">Link to session replay NPS survey (example)</PrivateLink>
- <PrivateLink url="https://us.posthog.com/project/2/insights/JYAmNKUd?dashboard=26089&variables_override=%7B%7D">Link to session replay 4 week NPS score insight (example)</PrivateLink>
- <PrivateLink url="https://us.posthog.com/project/2/insights/rpDp8GoL?dashboard=26089&variables_override=%7B%7D">Link to session replay list of feedback insight (example)</PrivateLink>

| Metric | Notes |
| --- | --- |
| NPS score - last 4 weeks | Include constructive feedback as a comment in the spreadsheet for context |

### Support

Similar to our revenue metrics, we are reusing queries the support team has set up, broken down by product. If you need to make a change or want to understand how SLA reporting works in detail, speak to the support team.

- <PrivateLink url="https://us.posthog.com/project/2/dashboard/250270">Link to overall support dashboard</PrivateLink>
- <PrivateLink url="https://us.posthog.com/project/2/insights/h0jiEYgF">Link to per-product ticket count insight</PrivateLink>
- <PrivateLink url="https://us.posthog.com/project/2/insights/J6fRRkgO">Link to per-product SLA insight</PrivateLink>

| Metric | Notes |
| --- | --- |
| Created tickets |  |
| Escalated tickets |  |
| Escalated tickets - SLA | The insight also tracks non-escalated tickets SLA, which is useful to be aware of, but we don’t need to report on it in every growth review |
| Ratio no. of users vs. no. of tickets | Formula dividing no. of tickets / unique monthly users |

## Metrics outside of growth reviews

If there are any other metrics you want to track to understand how well your product is doing, or which areas need improvement, go for it! Just make sure you are not tracking too many metrics, causing you to lose sight of what matters.

## Tips for increasing metrics awareness in a small product team

If you are a PM at PostHog, you will be more successful if your whole team is aware and keeps track of your per-product metrics, instead of just you summarising growth review insights once a month. Here are some tips we found are working well:

- Speak to your team what they care about and are interested in tracking, and add those metrics to your dashboard
- Link the revenue & usage dashboards in your team’s Slack channel, so they are easy to find for your team
- If your team has shipped a new feature, encourage them to set up an event, and track the new feature’s usage on the usage dashboard. For example you could have a “feature usage” section on the dashboard that tracks multiple features
- Some teams do a “metrics Monday” where they review the usage dashboard together in the Monday standup, looking for trends and anomalies that may help you make "mid month adjustments". These sessions are usually led by an engineer, not the PM
- You will likely have to try a bunch of things to find what sticks with your team. Ultimately, you want to make sure you and your team are looking at the same metrics, and everyone in your team knows how to find the relevant dashboards. It’s a team effort!