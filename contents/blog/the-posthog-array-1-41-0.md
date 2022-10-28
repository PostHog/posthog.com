---
date: 2022-10-31
title: "Array 1.41.0: SUBHEADLINE GOES HERE"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: ['Release notes', 'Product updates']
featuredImage: ../images/blog/posthog-array-blog.png
featuredImageType: full
---

Want to know more about what we're up to? [Subscribe to HogMail, our newsletter](/newsletter), which we send every two weeks!

> Running a self-hosted instance? Check out our [guide to upgrading PostHog](/docs/runbook/upgrading-posthog).

## PostHog 1.41.0 release notes



**Release highlights:**

- New: Count of events per user
- Improved: Math selector
- New: Text cards on dashboards
- Improved: Recordings interface
- New: Plugin metrics
- New: Persons on events on by default
- New: Alias changes
- New: Ingestion warnings
- New: Groups caching chagnes
- Finally: Change your email yourself
- New: Hedgehog mode
- New: github subdirectories in apps
- One more thing: Site apps 

### New: Count of events per user

PICTURE GOES HERE

*Average number of purchases per user? Maximum number of forms submitted per user?* 
Questions like these used to be hard to answer, but no more! Introducing "count of events per user".

### Improved: Math selector

PICTURE GOES HERE

Work on the previous task had us redo the math selector.

### New: Text cards on dashboards

PICTURE GOES HERE

Would you like to add some metadata or clarifications on your dashboards? Now you can! Hint: gifs are metadata too! 

### Improved: Recordings interface

PICTURE GOES HERE

We've been listening and implementing the most requested features, with a special focus on sparking joy. 
It's like a completely new app now, so check it out! 

### New: Plugin metrics

PICTURE GOES HERE

Curious how well your plugins are doing? You no longer have to read smoke signals in AWS logs - just use the new Plugin Metrics page. 

### New: Persons on events on by default

PICTURE GOES HERE

We used to store events in one table and persons in another. Any query that touched person properties would require 
database level JOINs and time out, once you reached the billion event scale. No longer! By moving person data
onto the events themselves, we eliminated a whole class of performance issues 🚀.

### New: Alias changes

PICTURE GOES HERE

The above change required us to be strict about who's a identified user and who's not. Because of that, you might
benefit from double checking your `identify` and `alias` calls. The new rule is this: only anonymous users can be
aliased into other users. Once you call `identify` on a user, you can no longer alias this user into another identified
user. 

### New: Ingestion warnings

PICTURE GOES HERE

In case you still try to alias identified events, there's a new Ingestion Warnings page to remind you that it's a bad idea. 

### New: Groups caching chagnes

PICTURE GOES HERE

### Finally: Change your email yourself

PICTURE GOES HERE

One of our most requested features: you can now change your own email address without contacting support 🤩🤩🤩

### New: Hedgehog mode

PICTURE GOES HERE

For a while now, we've been having a hard trouble explaining to our spouses what we do for work. This makes it even harder.

### One more thing: Site apps 

PICTURE GOES HERE

We're testing a new big (beta) thing: site apps. You need to **manually opt in** to enable this feature. Once you do, 
PostHog apps will be able to inject code onto your website through posthog-js. For example to display a feedback form,
add a quick "THE APP IS DOWN, NO NEED TO PANIC" banner, or even make it rain pineapples. Again, we're having a really
hard time explaining to people this is what we do for work! 😍


### Other improvements & fixes

You think that's it? Not by a long shot! Version 1.41 also adds hundreds of other improvements and fixes, including...

- **Improvement:** 
- **Improvement:** 
- **Improvement:**
- **Fix**: 
- **Fix**: 

View the commit log in GitHub for a full history of changes: [`release-1.40.0...release-1.41.0`](https://github.com/PostHog/posthog/compare/release-1.39.0...release-1.40.0).

## Give us your feedback
We’re always working on improving PostHog and would love to talk to you! Please [schedule a 30 minute call](https://calendly.com/posthog-feedback) with one of our Product, Engineering, or Marketing team members to help us understand how to improve. As a thank you for your time, we'll be giving away awesome [PostHog merch](https://merch.posthog.com)!

## Contributions from the community
We always welcome contributions from our community and this time we want to thank the following people...

- [@ShaneMaglangit](https://github.com/ShaneMaglangit) for fixing [a bug when buttons could be disabled on some insights](https://github.com/PostHog/posthog/pull/12332)
- [@RCMarron](https://github.com/rcmarron), a former team member who still helped [meter some rate limits](https://github.com/PostHog/posthog/pull/12006). We miss you, Rick!
- [@Zacklean](https://github.com/zackelan), a new team member who got started early who changed [the way we compile regex](https://github.com/PostHog/posthog/pull/12180)
- [@Codepitbull](https://github.com/codepitbull) who helped us with [shading transitive dependencies](https://github.com/PostHog/posthog-java/pull/23)
- [@GMA](https://github.com/gma) for clarifying that [`brotli` is required on all architectures](https://github.com/PostHog/posthog.com/pull/3925)
- [@ByteMerger](https://github.com/bytemerger) for [updating an app logo](https://github.com/PostHog/posthog-engage-so-plugin/pull/3) for [our Engage connector](/apps/engage-connector)
- [@Balajivenkatesh](https://github.com/balajivenkatesh) for [improving the way we send data to a webhook](https://github.com/PostHog/posthog-patterns-app/pull/1) in [our Patterns connector](/apps/patterns-connector)
- [@msmans](https://github.com/msmans) for [adding ClickHouse pod distribution](https://github.com/PostHog/charts-clickhouse/pull/582) 
- [@krzd](https://github.com/krzd) for [updating some Debian-specific documentation](https://github.com/PostHog/posthog.com/pull/4307)

Do you want to get involved in making PostHog better? Check out our [contributing resources](/docs/contribute) to get started, or head to [our Slack group](/slack). We also have a [list of Good First Issues](https://github.com/PostHog/posthog/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) for ideas on where you can contribute!

## Open roles at PostHog
Want to join us in helping make more products successful? We're currently hiring for remote candidates in any of the following roles:

- [Full Stack Engineer - Experimentation Team](/careers/full-stack-engineer-experimentation)
- [Full Stack Engineer - Analytics Team](/careers/full-stack-engineer-product-analytics)

Curious about what it's like to work at PostHog? Check out our [careers page](https://posthog.com/careers) for more info about our all-remote team and transparent culture. Don’t see a specific role listed? That doesn't mean we won't have a spot for you. [Send us a speculative application!](mailto:careers@posthog.com)

_Follow us on [Twitter](https://twitter.com/PostHog) or [LinkedIn](https://linkedin.com/company/posthog) for more PostHog goodness!_

<ArrayCTA />
