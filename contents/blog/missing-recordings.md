---
date: 2021-06-10
title: The mystery of missing recordings at PostHog
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/
featuredImageType: full
author: ["rick-marron"]
categories: ["Engineering"]
---

[Session Recording](product/session-recording) is one of PostHog's core features. It allows customers to see their website being used, mouse clicks and all. It's really cool, but, until recently, we had one big issue with the feature. Customers would often tell us recordings were missing, and we didn't know why.

This is the story of how we decreased the number of missing recordings from 15% to <1%.

## Measuring the issue

To start, we had to find a way to measure missing recordings. If we can't measure it, we can't know if we fixed it. But how can you measure something that's missing?

We had a couple ideas, but they all had drawbacks. The two main ones we considered were:

1. Measure how often we receive web analytics events outside of a recording. The idea is that a user should have a recording if they're sending up other events. The problem is that this doesn't account for cases when recordings are disabled, so the metric would always be < 100%.

2. Measure how often we've received data for a recording, but it wasn't complete. For a recording to be shown to users, it needs to have enough data that we can draw the entire page - we call this a 'full snapshot'. This metric would measure how often we started a recording but didn't send up a full snapshot, so we couldn't render the page for the user. Theoretically, this should rarely happen.

We decided to use the second metric because it would let us strive to 0% missing recordings. If you're curious, you can read the conversation that led to this decision in [this GitHub issue](https://github.com/PostHog/posthog/issues/5478).

In the first run of the metric, it showed that we we're missing ~15% of recordings across [PostHog Cloud](/pricing) users.

## Checking Sentry for clues

Now that we had a metric, we started hunting for clues. What was causing the missing recordings?

The first place we looked was Sentry. There were a couple of errors in the ingestion pipeline that seemed suspicious. The most notable was a "Max data upload size exceeded" error that was firing a few thousand times a day. This seemed like it could be an obvious cause of missing recordings. If some data was not being uploaded because it was too big, it would make sense that we could not get a 'full snapshot'.

To figure out what was causing this error, we looked at data that had been uploaded that was just below our size threshold of 20mb. It looked like large data URLs of images were the cause.

To test this out, we made a filter that would remove data URLs from any payload that exceeded a 5mb threshold, and it would replace the image with a simple SVG.

After deploying [the fix](https://github.com/PostHog/posthog-js/pull/317), the Sentry error went away, but the missing recording only went down a few percent.

## Looking deeper

What was causing the rest of the missing recordings? With no more clues, it came time to dig through the mechanics of the code.

When a recording started, we took a 'full snapshot' of the page, and from that point forward, we would send up only the data that changed in the recording. For some reason, the missing recordings would often have the later data, but no full snapshot.

Why were the full snapshots missing? Presumably, if the later data was being sent up, the snapshot code should've already run. To further solidify this line of thinking, the determining the changes on the page fully depended on the snapshot existing in memory, so it must've already taken a full snapshot.

After a day or so of pounding our heads on the keyboard, we realized that recordings were being split when a user was inactive for 30 minutes. But when we split the recording, we were not sending up a new full snapshot.

We made [a fix](https://github.com/PostHog/posthog-js/pull/318) for this, and the missing recordings started to quickly drop.

## Slow moving metrics

Because this fix went into posthog-js, and different customers upgrade at different speeds, it took a while to see the full effect of the fix in our metrics. However, after about a month of waiting, the 15% missing recordings metric dropped to <1%.
