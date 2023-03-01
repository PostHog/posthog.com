---
title: Sampling (Alpha)
sidebar: Docs
showTitle: true
---

> Note: Sampling is a feature currently under development. If you'd like to be one of the first to try it out, contact us at `hey@posthog.com`.

## Introduction

Results sampling is a feature aimed at significantly speeding up the loading time on insights for power users that are running complex analyses on large data sets.

Processing a lot of data can take some time, so we can offer faster results by sampling a portion of the data and extrapolating the results.

For instance, say you have set up a funnel looking at the conversion from a 'Pageview' event to a 'User signed up' event over 180 days, and that within those parameters, PostHog would have to aggregate 1 billion events to compute a result. If we were to turn on sampling at a 0.1 (10%) rate, we'd scan 100 million events, and then multiply the result by 10. 

As a result of doing this, we can provide an answer much faster, so you don't have to sit around waiting for the insight to load. The tradeoff is that the result you get is not 100% accurate, but the higher the sampling rate and the more events you have, the closer the sampled result will be to the actual result, thus minimizing the tradeoff.

## FAQ

### Will the sampled results be consistent across calculations?

Provided you do not send us events in the past, yes. For a given sampling rate, the analysis will always run on the same set of data, so you don't have to worry about sampled results changing once you hit 'Refresh'.


### Does sampling work when calculating conversions?

Yes. Our sampling doesn't just take a random set of events, rather it takes a sample based on a sampling variable (see below). Currently, we use distinct IDs for this, meaning all of a given ID's events will either be taken into the sample or out, so you don't run the risk of an event at the first step of your funnel being in the sample while the subsequent events aren't, for example.

### What variable do you sample by?

We are currently sampling by distinct ID, meaning sampling will work best for PostHog users that track/analyze only anonymous or only identified end users. In other words, if you make use of `posthog.identify` and users have events before and after the `posthog.identify` call, sampling will currently not work very well.

We're working on providing sampling by person IDs in the future, which will unlock sampling for those dealing with both anonymous and identified users.

### What sampling mechanism do you use under the hood?

We use [ClickHouse's native sampling feature](https://clickhouse.com/docs/en/sql-reference/statements/select/sample/).
