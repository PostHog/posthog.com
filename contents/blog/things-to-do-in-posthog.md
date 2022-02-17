---
date: 2022-03-03
title: xx cool things you can do in PostHog
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ..
featuredImageType: full
author: ["andy-vandervell"]
categories: ["Guides", "Product analytics"]
---

PostHog's mission is to increase the number of successful products in the world. It's why we made [Discoveries](https://posthog.com/handbook/product/metrics) our [north-star metric](https://posthog.com/blog/north-star-metrics) for success. The more discoveries our customers are making, the better we're doing.

It's also why we've created this continually updated and crowdsourced list of cool things you can do in PostHog. Whether you're new to PostHog or a veteran user, we hope you'll find something in this list to inspire you.

> Got an idea you'd like to share? [GOING TO ADD A PROCESS HERE ONCE I DECIDE WHAT IT IS] 

### View Dashboards in full-screen mode
**Submitted by:** [Andy Vandervell](https://github.com/andyvan-ph)

**How?** When viewing any [Dashboard](/docs/user-guides/dashboards), tapping 'F' on your keyboard or clicking 'Go full screen' via the kebab menu (that's the three little dots) takes you into a distraction-free full-screen mode. 

**Why?** This is great when presenting and explaining insights in meetings. Going full screen makes all the insights larger and easier to understand, and stops participants fixating on the 58 tabs you have open. "They are all essential tabs, ok?"

### Use feature flags as kill switches
**Submitted by:** [Joe Martin](https://github.com/joethreepwood)

**How?** [Feature flags](/docs/user-guides/feature-flags) are often used to turn new features on under certain conditions, so that you can test things with a certain [cohort](/docs/user-guides/cohorts) or user segment. But you can also use them globally, then leverage the FF as a kill switch to turn features off in the event of an emergency. 

**Why?** Some PostHog users, such as [Phantom](/customers/phantom), aren't able to deploy new updates or features to all users instantly. In Phantom's case this is because the product runs as a browser extension. Using Feature Flags as kill switches in this way offers a degree of control not normally available to such products. 

### Track errors as events
**Submitted by:** [Joe Martin](https://github.com/joethreepwood)

**How?** You can track any sort of event in PostHog, include failures or other sort of errors. All you need to do is put an [action](https://posthog.com/docs/user-guides/actions) or [event](https://posthog.com/docs/user-guides/events) next to the error, or else find some other unique identifier you can use - such as views of a /404 page. 

**Why?** Tracking errors can be enormously useful for deciding where to invest engineering time, or when to prioritize areas of your product. [Phantom](https://posthog.com/customers/phantom), for example, used this to prioritize updates to their infrastructure by tracking failure rates for payments across their platform. 

### Track the performance of paid ads
**Submitted by:** [Joe Martin](https://github.com/joethreepwood)

**How?** PostHog can track all sorts of data, including a variety of UTM fields -- many of which will be automatically captured. Creating insights based on UTM parameters in PostHog also enables you to follow users along your entire funnel in a single platform, so you can isolate how paid ads correlate to traffic, acquisition and retention.

**Why?** Quoting [Pry CEO and co-founder Andy Su](https://posthog.com/customers/pry): "We were asking: How valuable are customers who come to us via ads as opposed to those who are organic? We were able to answer that question with PostHog and use that information to make decisions about our advertising strategy.”

### Analyze retrospective data
**Submitted by:** [Joe Martin](https://github.com/joethreepwood)

**How?** With some analytics platforms, you can only look at data once you've started collecting it - you have to define an action, then wait months to gather data for it. In PostHog, you can look at retroactive data easily as we capture information automatically and enable you to make faster decisions. 

**Why?** Quoting [MentionMe Software Engineer Lleo Harress](https://posthog.com/customers/mention-me): “Retrospective data and event autocapture have been especially useful. We’ve had occasions where we’ve speculated something but haven’t been capturing the data to prove it, so we define an event and then see the retroactive data for it immediately. Previously we’d have to wait months to get usable data like that in Google Analytics or other tools.”

### Figure out what kinds of users are successful more often than not

**Submitted by:** [Neil Kakkar](https://twitter.com/neilkakkar)

**How?** [Correlation Analysis](https://posthog.com/docs/user-guides/correlation) tells you users with which properties convert better than others

**Why?** The success of a product is limited by how well you understand your users. Maybe there's an industry that really loves your product, but you don't event know about it? Correlation analysis helps surface insights like these, which can change product strategy completely.


### [Insert your idea here]
**Submitted by:** [your name](link to Github or Twitter profile)

**How?** [explain your cool thing here]

**Why?** [explain why it's useful here]
