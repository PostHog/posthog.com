---
date: 2021-06-10
title: The mystery of missing recordings at PostHog
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/posthog-engineering-blog.png
featuredImageType: full
author: ["rick-marron"]
categories: ["Engineering", "Inside PostHog"]
---

[Session Recording](product/session-recording) is one of PostHog's core features. It allows customers to see their website being used by real users, mouse clicks and all. It's really cool, but, until recently, we had one big issue with the feature. Customers would often tell us recordings were missing, and we didn't know why. 

This is the story of how we decreased the number of missing recordings from 15% to <1%, and in doing so, moved the feature out of beta.

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

To test this out, we made a filter that would remove data URLs from any payload that exceeded a 5mb threshold, and it would replace the image with an obvious placeholder.

![Recording Page with SVGs](https://user-images.githubusercontent.com/4813045/137223852-eeb4273e-d81c-49ca-a115-02b9cd0979e1.png)

One issue we faced was that we didn't want this feature to significantly increase the size of `posthog-js`, but we would have to include the placeholder image in the bundle. After some discussion, we landed on the idea of using a very small SVG that could easily scale to the size of the image being replaced. You can read more about the discussion that landed us here in [the PR itself](https://github.com/PostHog/posthog-js/pull/317).


After deploying the fix, the Sentry error went away, but the missing recording only went down a few percent.

## Looking deeper

What was causing the rest of the missing recordings? With no more clues, it came time to dig through the mechanics of the code.

When a recording started, we took a 'full snapshot' of the page, and from that point forward, we would send up only the data that changed in the recording. For some reason, the missing recordings would often have the later data, but no full snapshot.

Why were the full snapshots missing? Presumably, if the later data was being sent up, the snapshot code must've already run. To further solidify this line of thinking, the code to determine the changes to the page depends entirely on the snapshot existing in memory, so the system must've already taken a full snapshot.

After a day or so of pounding our heads on the keyboard, we realized that recordings were being split when a user was inactive for 30 minutes. But when the split happened, we were not taking a new full snapshot.

We made [a fix](https://github.com/PostHog/posthog-js/pull/318) for this, and the missing recordings started to quickly drop.

## Slow moving metrics

Because this fix went into posthog-js, and different customers upgrade at different speeds, it took a while to see the full effect of the fix in our metrics. However, after about a month of waiting, the 15% missing recordings metric dropped to <1%.

Fixing this issue of missing recordings was part of a larger effort to improve the quality of our recordings product. In addition to decreasing the number of missing recordings, we also:
* Improved the speed of recordings (average load time went from ~2.5s to 700ms)
* Resolved a big bug that caused recordings to "wonk out" if a recording spanned multiple tabs or browser windows
* Revamped the player experience to make it faster for users to get to the moment in the recording they care about
* Improved the speed to query recordings, allowing users to search across all recordings at once (it used to be limited to a single day's worth of recordings)

With this focus on quality, we've seen usage of the feature go up significantly. Weekly active users is up 2.5x, and each of those users are watching about 2x as many recordings per week.

Read our [Sessions Recordings documentation](/docs/user-guides/recordings) for more detailed information, or you can [make an account for free](https://posthog.com/pricing) to try it out yourself!
