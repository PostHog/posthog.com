---
title: Sampling (Beta)
sidebar: Docs
showTitle: true
---

Results sampling can significantly speed up loading if you have a large amount of data or are running complex queries in your [insights](/docs/product-analytics/insights).

Processing a lot of data can take some time, so we can offer faster results by sampling a portion of the data and extrapolating the results. The results will be less precise, but remain accurate and statistically significant if your sample pool of events is large enough.

import { CalloutBox } from 'components/Docs/CalloutBox'

<CalloutBox icon="IconInfo" title="Example">

A conversion funnel for `$pageview` events leading to `user_signed_up` events over 180 days on a popular website could require aggregating billions of events to compute a result. This could take a while.

If we were to turn on sampling at a `1%`, we would aggregate over only 10 million events, and then multiply the result by 100. This results in much faster load times.

</CalloutBox>

## Enabling insight sampling

Sampling can be enabled in each insight under **Advanced options** > **Sampling**. You can choose between sampling at `0.1%`, `1%`, `10%`, and `25%`.

 These sampling rates will persist when the insight is saved, meaning if you set an insight to 10% sampling and save it to a dashboard, the results for that insight on the dashboard will be sampled. We flag sampled insights with an icon and a helpful tooltip.


## Speed up slow queries

If a certain insight is taking long to load, we display a notice with some recommendations for speeding it up, including a button to enable sampling. The insight will persist your sampling rate on save.

## FAQ

### Will the sampled results be consistent across calculations?

If you do not send new data, yes. For a given sampling rate, the analysis will always run on the same set of data, so you don't have to worry about sampled results changing.

### Does sampling work when calculating conversions?

Yes. Our sampling doesn't take a random set of events, it takes a sample based on a [sampling variable](#what-variable-do-you-sample-by). Currently, we use a user's [distinct IDs](/docs/getting-started/identify-users) for. All events are attached to distinct IDs, so you don't run the risk of an event at the first step of your funnel being in the sample while the subsequent related events aren't.

### What sampling mechanism do you use under the hood?

We use [ClickHouse's native sampling feature](https://clickhouse.com/docs/en/sql-reference/statements/select/sample/).
