---
title: NPS Score Collector
github: https://github.com/PostHog/nps-score-app
installUrl: https://app.posthog.com/project/apps?name=nps
thumbnail: ../../apps/thumbnails/nps_score_collector.png
tags:
    - nps
---

### What does the NPS Score Collector do?

This is a basic site app which displays a simple 0-10 scale for users to tell you how likely they are to recommend your product. You can use this information to figure out your [Net Promoter Score (NPS)](https://en.wikipedia.org/wiki/Net_promoter_score)

### What are the requirements for this app?

The NPS score collector requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

You also need to have enabled `opt_in_site_apps: true` in your posthog-js config.

### How do I install the NPS Score Collector?

1. Make sure you have enabled `opt_in_site_apps: true` in your posthog-js config.
2. Install the app from [the PostHog App Repository](posthog.com/apps).

### What is a Net Promoter Score (NPS)?

[Net Promoter Score (NPS)](https://en.wikipedia.org/wiki/Net_promoter_score) is a common metric for measuring user satisfaction and indicating business growth. 

Simply put, you ask your users how likely they are to recommend your product to others, on a scale of 0 (unlikely) to 10 (likely). 

Scores are then interpreted as follows:

- **0 - 6**: Detractors. These users are unlikely to recommend your product and may damage your growth.
- **7 - 8** Passives. These users don't care about your product and are unlikely to contribute to growth.
- **9 - 10** Promoters. These users love your product and actively contribute to growth. 

Obviously, the more promoters you have, the better!

Your overall NPS score is interpreted from your collected scores using the following calculation:

`NPS = % OF PROMOTERS - % DETRACTORS`

As a result, NPS ranges from -100 to +100. The higher the score, the better.

### How can you figure out your NPS score in PostHog?
Using [formulas](/docs/product-analytics/trends#using-formulas)!

Specifically, this is the formula you need to remember: `NPS = % OF PROMOTERS - % DETRACTORS`

The resulting score is your NPS score. 

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the NPS Score Collector](https://github.com/PostHog/nps-score-app) is available on GitHub.

### Who created this app?

This app was created by [PostHog's Product Marketer, Joe Martin](/handbook/company/team/joe-martin). 

He's [not an engineer](/blog/a-non-coders-thoughts-on-everybody-codes-culture-part-two), so expect some rough edges. 

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 
