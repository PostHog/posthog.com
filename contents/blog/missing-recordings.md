---
date: 2022-02-11
title: Solving the mystery of PostHog’s missing session recordings
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/posthog-engineering-blog.png
featuredImageType: full
author:
  - rick-marron
category: Engineering
---

[Session Recording](/product/session-recording) is one of PostHog's core features, and one of the few completely [open source ression replay tools](/blog/best-open-source-session-replay-tools) available. It allows you to see how real users use your website, mouse clicks and all. It's really cool and addictive (give it a try and you'll see what I mean).

Recently, we made a ton of improvements to the feature. To name a few, we:

* Decreased average recording load time from ~2.5s to 700ms
* Resolved a big bug that caused recordings to "wonk out" if a recording spanned multiple tabs or browser windows
* Revamped the player experience to make it faster for users to get to the moment in the recording they care about
* Improved the speed to query recordings, allowing users to search across all recordings at once (it used to be limited to a single day's worth of recordings)

But there was one fix that stood out in this quality push. Customers would often tell us recordings were missing, and we didn't know why.  

This is the story of how we decreased the number of missing recordings from 15% to <1%, and in doing so, moved the feature out of beta.

>Rick Marron is a software engineer at PostHog. In previous lives Rick was a Program Manager at Microsoft, and he spent over a year in Nairobi, Kenya where he developed the first publicly available real-time source for traffic data in the city using computer vision and street cameras. He's a native of Rochester, New York but lives in Los Angeles now because... sunshine. Follow him [on Twitter](https://twitter.com/rick_marron) and [Github](https://github.com/rcmarron). 

## Measuring the issue

To start, we had to find a way to measure missing recordings. If we can't measure it, we can't know if we fixed it. But how can you measure something that's missing?

We had a couple ideas, but they all had drawbacks. The two main ones we considered were:

**1. Measure how often we receive web analytics events outside of a recording:** The idea is that a user should have a recording if they're sending up other events. The problem is that this doesn't account for cases when recordings are disabled, so the metric would always be < 100%.

**2. Measure how often we've received data for a recording, but it wasn't complete:** For a recording to be shown to users, it needs to have enough data that we can draw the entire page - we call this a 'full snapshot'. This metric would measure how often we started a recording but didn't send up a full snapshot, so we couldn't render the page for the user. Theoretically, this should rarely happen.

We decided to use the second metric because it would let us strive for 0% missing recordings. If you're curious, you can read the conversation that led to this decision in [this GitHub issue](https://github.com/PostHog/posthog/issues/5478).

In the first run of the metric, it showed that we were missing ~15% of recordings across [PostHog Cloud](/pricing) users.

## Checking Sentry for clues

Now that we had a metric, we started hunting for clues. What was causing the missing recordings?

The first place we looked was Sentry. There were a couple of errors in the ingestion pipeline that seemed suspicious. The most notable was a "Max data upload size exceeded" error that was firing a few thousand times a day. This seemed like it could be an obvious cause of missing recordings. If some data was not being uploaded because it was too big, it would make sense that we could not get a 'full snapshot'.

To figure out what was causing this error, we looked at data that had been uploaded which was just below our size threshold of 20mb. It looked like large data URLs of images were the cause.

To test this out, we made a filter that would remove data URLs from any payload that exceeded a 5mb threshold, and it would replace the image with an obvious placeholder.

![Recording Page with SVGs](https://user-images.githubusercontent.com/4813045/137223852-eeb4273e-d81c-49ca-a115-02b9cd0979e1.png)

One issue we faced was that we didn't want this feature to significantly increase the size of `posthog-js`, but we would have to include the placeholder image in the bundle. After some discussion, we landed on the idea of using a very small SVG that could easily scale to the size of the image being replaced. You can read more about the discussion that landed us here in [the PR itself](https://github.com/PostHog/posthog-js/pull/317).

After deploying the fix, two things happened:

1. The Sentry error went away 🥳
2. The missing recordings only went down a few percent 😩

Back to the drawing board.

## Looking deeper

What was causing the rest of the missing recordings? With no more clues, it came time to dig through the mechanics of the code.

### So, how does Session Recording work?

Under the hood, we're using the open source project [RRWeb](https://github.com/rrweb-io/rrweb) to power our recordings feature. RRWeb handles capturing what happened in the DOM, serializing it (so you can send it to your server), and then replaying the serialized data.

To decrease the amount of data that's transmitted, RRWeb works by taking a full snapshot of the DOM at the beginning of the recording, and from this point forward, it watches the [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) and records only the changes to the page.

From the full snapshot, you can re-create a still image of the website, and from the mutations, you can replay how the page changes over time. This is very similar to how video compression works with "key frames" and deltas.

### Solving the real mystery

With this knowledge in mind, we started looking into why we were receiving mutation data for recordings, but without a full snapshot.

Presumably, if the mutations were being sent up, the snapshot code must've already run. The mutations depend entirely on the snapshot existing in memory, so it didn't make sense that there was no full snapshot.

After a day or so of pounding our heads on the keyboard, we realized that most of the missing recording cases were on single page applications. With this clue in mind, and knowing that RRWeb takes a full-snapshot on page load, it didn't take long to realize the cause. 

We were splitting recordings when a user was inactive for 30 minutes (so users don't see a 10-hour long recording). But when the split happened, we were not taking a new full snapshot.

We made [a fix](https://github.com/PostHog/posthog-js/pull/318) for this, and the missing recordings started to quickly drop.

## Slow moving metrics

Because this fix went into posthog-js, and different customers upgrade at different speeds, it took a while to see the full effect of the fix in our metrics. 

However, after about a month of waiting (and continuously checking the metrics 😬), the 15% missing recordings metric dropped to <1% 🎉.

With this focus on quality, we've seen the usage of the Session Recordings feature go up significantly. Weekly active users is up 2.5x, and each of those users are watching about twice as many recordings per week.

And we're not done yet, we're still working to make it even easier to find and watch the recordings that show you valuable insights about your users.

As for the remaining <1% of recordings that are missing, we're still working on that too. The going theory is that it has to do with data compression errors or slow networks, but we're not quite to the bottom of that one yet.

Read our [Sessions Recordings documentation](/docs/user-guides/recordings) for more detailed information about the feature, or you can [make an account for free](https://posthog.com/pricing) to try it out yourself!

_Enjoyed this? Subscribe to our [newsletter](https://newsletter.posthog.com/subscribe) to hear more from us twice a month!_


