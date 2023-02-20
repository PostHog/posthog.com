---
date: 2023-02-20
title: "What’s new in PostHog?"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
category: PostHog news
tags:
  - Product updates
  - Release notes
featuredImage: ../images/blog/posthog-array-blog.png
featuredImageType: full
---

Interested about what new features, fixes and updates have just launched on PostHog Cloud? Every Friday we update this article with a look back over the last seven days, so you can get a fresh look at what’s launched and launching right now. We also feature notable additions to the blog and docs. 

> Some new features you read about below may still be in beta, behind a feature flag. Want to see which betas are currently available? [Check the roadmap](/roadmap)!

## February 24, 2023

### Performance monitoring in session recordings
![flag overrides](../images/blog/array/perf_monitoring.gif)

Thanks to Team Session Recording, you can now track network performance across a user session. Now you'll be able to see not only what your users are doing, but also how long each action takes, and if there were any issues that may have impacted their experience. 

Armed with this information, you can now get a better understanding of where you can improve the user experience and create a faster, smoother product — check [the Session Recording docs](/manual/recordings) to find out more. 

### User interview app released

Curious how we gather user feedback at PostHog? We use this [User Interviewer app](/apps/user-interviews), which enables us to target users based on their actions, cohort or properties and asks them to schedule an interview with our Product team via Calendly. 

We find this works a lot better than trying to identify and schedule calls individually, so we’ve now made it available in [the PostHog app directory](/apps). 

### JSON feature flags released
![flag overrides](../images/blog/array/json_flags.gif)

We’ve rolled JSON feature flags out to make feature flags on PostHog even more flexible and reactive than ever before. You’re now no longer limited to using strings as flag keys, and can also send arbitrary data as a JSON payload. 

The ability to send arbitrary data is especially powerful, as you can use this to trigger UI changes for users — enabling you to make real-time changes to your product without the need to redeploy. Check [the feature flag docs](/manual/feature-flags) for more information!

### UX and insight updates
![flag overrides](../images/blog/array/bubble_pie_chart.gif)


We’ve released a small trilogy of minor UX and UI improvements this week…

- We now [show pie chart values against segments](https://github.com/PostHog/posthog/pull/14216)
- We now [automatically resize insight legends to be more readable](https://github.com/PostHog/posthog/pull/14210)
- We now prevent you from [hiding table rows in a dashboard view](https://github.com/PostHog/posthog/pull/14209)

Each of these UI updates came in response to a user suggestion. If you’ve got ideas for how we can make PostHog better, [please file a feature request on GitHub](https://github.com/PostHog/posthog/issues/new/choose)!

> **Featured Tutorial:** Find out [how to join the site apps beta, schedule interviews](/tutorials/feedback-interviews-site-apps) with your users to get feedback and build better products in Ian’s latest tutorial. 

_Want more updates? Follow us on [Twitter](https://twitter.com/PostHog) or [LinkedIn](https://linkedin.com/company/posthog) for more PostHog goodness!_

<ArrayCTA />
