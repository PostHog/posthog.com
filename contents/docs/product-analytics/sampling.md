---
title: Sampling (Beta)
sidebar: Docs
showTitle: true
---

> Note: Sampling is a feature currently under development. If you'd like to try it out, contact us at `hey@posthog.com`. We're also  proactively rolling this out to test users at the moment, so do let us know if you have any feedback!

## Introduction

Results sampling is a feature aimed at significantly speeding up the loading time on insights for power users that are running complex analyses on large data sets.

Processing a lot of data can take some time, so we can offer faster results by sampling a portion of the data and extrapolating the results.

For instance, say you have set up a funnel looking at the conversion from a 'Pageview' event to a 'user_signed_up' event over 180 days, and that within those parameters, PostHog would have to aggregate 1 billion events to compute a result. If we were to turn on sampling at a 0.1 (10%) rate, we'd scan 100 million events, and then multiply the result by 10. 

As a result of doing this, we can provide an answer much faster, so you don't have to sit around waiting for the insight to load. The tradeoff is that the result you get is not 100% accurate, but the higher the sampling rate and the more events you have, the closer the sampled result will be to the actual result, thus minimizing the tradeoff.

## Features

### Insight sampling

Insight configuration allows you to pick between different sampling rates for your insight. These sampling rates will persist when the insight is saved, meaning if you set an insight to 10% sampling and save it to a dashboard, the results for that insight on the dashboard will be sampled. We flag sampled insights with an icon and a helpful tooltip.

### Speed up slow queries

If a certain insight is taking long to load, we display a notice with some recommendations for speeding it up, but also a button you can click to immediately speed up insight calculation. The button will suggest you sample the results, and provide an appropriate sampling rate suggestion. Clicking the button is likely to speed up the query by many orders of magnitude. 

Just note that the insight will then have the sampling filter, which will persist if you save the insight.

### Fast mode

Fast mode is an experimental feature where users can flip a switch on the top right just above the insight view to enable 10% sampling for all **new** insights. Saved insights will **not be affected**, but while you are building your graphs we'll immediately apply 10% sampling, making insights load faster. You can override the 10% rate per insight or disable it before saving the insight if you like.

Fast mode is particularly useful for when you are doing exploratory analysis and deciding what metrics to track and what insights are relevant to you. It speeds up the iteration process and you can then turn sampling off when you've settled on the insights you care about and are saving them to a dashboard.

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
