---
title: Product metrics
sidebar: Handbook
showTitle: true
---

As we improve our Product, it's key to have a guiding metric that we can all at Product & Engineering rally behind and measure our progress against. For the Product, this metric is Discoveries. The metric can be tracked in the [product dasboard][dashboard] and is reported weekly at PostHog News.

> 💡 Discoveries is different from Discovered Learnings. Discovered Learnings is used as a metric for activation and growth.

Generally, small teams should be making measurable impact towards improving this metric (not all teams, not all the time). It's okay for epics and sprints to have other intermediate (and probably more concrete) goals, but overall each team should be moving the metric as a whole.

## Metric definition
The metric is defined [in this action][action]. The concept of the metric is users driving insights from PostHog, so any of these actions:
- Analyzing any insight. Analyzing means viewing for 10 seconds or more. Insights include: trends, funnels, sessions (*), paths, lifecycle, stickiness and quant analysis.
- Analyzing a recording. Watching a recording for 10 seconds or more.


**Exclusions**
We exclude the following events from counting as they don't signal getting actual value from PostHog:
- Events done on test projects.
- Insights where it's the first component load (i.e. you just open the insights page and don't change any config nor move to any other insight).
  - Indirectly, this means we also don't count when a user shares an insight link and just opens that link. This is deliberate as we believe this is not about discovering a new insight, but rather collaboration.


## Additional context
- The metric is purposefully kept simple to make it easy to action and avoid complex edge cases in an already ambiguous landscape (product changes all the time).
- Why not _Discovered Learnings_? It seems to have a higher correlation to retention, but:
  - It limits us only to trends and funnels, and users drive value from a variety of other sources. We're particularly investing in providing more value in others parts of the app too. It's a trade-off between better retention prediction and better immediate signaling.
  - Counts when users open an insight shared by another user (direct link).
- Caveat: This metric also captures any value from Marketing efforts. As we start to invest more in user acquisition, we'll need to isolate the effect from Marketing in this Product metric.


[dashboard]: https://app.posthog.com/dashboard/14719
[action]: https://app.posthog.com/action/10784