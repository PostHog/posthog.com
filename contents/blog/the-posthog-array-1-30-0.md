---
date: 2021-11-17
title: Array 1.30.0
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: ["Release notes"]
featuredImage: ../images/blog/array/1-28-0.png
excerpt: Excerpt here
---


PostHog 1.30.0 includes a description here.

## PostHog 1.30.0 release notes

> For a better experience and new features, remember to [update your PostHog instance](/docs/self-host/configure/upgrading-posthog).

**Release highlights:**
- [Fresh new look-and-feel](#fresh-new-look-and-feel)
- [Correlation analysis](#correlation-analysis)
- [Saved insights](#saved-insights)
- [Fully revamped recordings](#fully-revamped-recordings)

### Fresh new look-and-feel

PostHog just got a lot fresher! We have a brand new UI and layout that had been on the works, codename `lemonade` (because it's fresh). It's not only a coat of paint, we've pushed a lot of improvements to overall navigation and performance, we call it turbo mode.


{images here}

<br />

### Correlation analysis

Trying to understand why your users are converting or dropping? Presenting Correlation analysis. This nifty new insight will automatically match your funnels to any relevant signals on why your users convert or drop (e.g. "Users in Canada are 5x more likely to convert" or "Users in Chrome are 3x less likely to convert"). Funnel optimization to the next level. [Read more here](/docs/....).

{image here}

> 🎁 Correlation analysis is a premium feature and requires a PostHog Scale or Enterprise license. [Learn more](/pricing).

<br />

### Saved insights

No more recreating the same insight multiple times. You will now be able to save insights on PostHog without adding them to a dashboard. Further, you'll be able to see a list of insights created by other team members, and easily search them and filter them. We're investing a lot of effort to make sure you can better collaborate within PostHog.

{image here}

<br />

### Fully revamped recordings

The recordings playback experience just got a lot better. From significant performance improvements (you'll no longer need to wait for the entire recording to load), to a brand new playback interface. Find the right spot in a recording quickly and understand better what your users are doing.

<img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/1_30_0-recordings.png" alt="Screenshot of new recordings playback experience" />

<br />


### Other improvements & fixes
- **Turbo mode**. You'll notice a significant speed improvement when using PostHog. App navigation will now happen almost instantly. In particular, you'll notice navigation between dashboards and insights happens without any delay.
- **Duplicate dashboards**. Thanks to a community member you can now easily duplicate your dashboard instead of manually recreating it.
- **Security on Docker builds.** We've moved to a different base image for Docker (`alpine`) and this new image build solves a lot of security vulnerabilities on upstream dependencies.
- Have a large number of dashboards? You'll now be able to **easily search the dashboard list.**
- Fixed a bug that caused the app to believe there was a new version available when it wasn't ready to be shipped.
- Fixed bugs with person counts not matching between an insight graph and the person list.
- Significantly faster frontend builds as we transitioned from `webpack` to `esbuild`.
- Fixed a bug that prevented creating cohorts from trends.
- Success and error toast alerts will now show at the bottom of the screen so it no longer covers critical elements in the page.
- Plus **350+ more** improvements & fixes.

### Deprecation & removal notices

1. We're now fully removing the legacy Sessions list page. Read more about it, [in this blog post](/blog/sessions-removal).


### Help us improve PostHog

We’re working hard to improve the PostHog experience and would love to talk to you! Please join one of our Product, Engineering, or Marketing team members on a quick 30-min call to help us understand how to improve. Schedule directly [on Calendly](https://calendly.com/posthog-feedback).

As a small thank you for your time, we're giving away awesome [PostHog merch](https://merch.posthog.com)!

## PostHog News

No new joiners this month, but stay tuned for new people joining real soon!

## Community
### Community MVP 🏆

Thanks to all our community members for helping move PostHog forward! This release cycle's Community MVP goes to [timgl](https://github.com/asherf)!

Asher pushed several PRs to improve the Python code quality in the main PostHog app.

### Community shoutouts
We want to thank each and every community member that contributed to this release of PostHog!

- [asherf](https://github.com/asherf) 🏆
- [banagale](https://github.com/banagale)
- [pixlwave](https://github.com/pixlwave)
- [romj](https://github.com/romj)
- [Nishant-Sagar](https://github.com/Nishant-Sagar)
- [xrendan](https://github.com/xrendan)
- [inbreaks](https://github.com/inbreaks)
- [Jaspreet-singh-1032](https://github.com/Jaspreet-singh-1032)
- [mether](https://github.com/mether)
- [jyuvaraj03](https://github.com/jyuvaraj03)

Looking to contribute? We've recently improved our CI process and tests will now run smoothly if you create a PR from a fork.

## Open roles

Join us in helping make more products successful! We're currently hiring for the following roles:

- Developer Educator
- Operations Manager
- Sales Engineer
- Technical Customer Success Manager
- Software Engineer

Learn more about these roles on our [Careers page](https://posthog.com/careers).

Don't see a role for you? We're always looking for exceptional people, so reach out to us via the link above.

<hr/>

_Follow us on [Twitter](https://twitter.com/PostHog) or [LinkedIn](https://linkedin.com/company/posthog), and subscribe to our [newsletter](https://posthog.com/newsletter) for more posts on startups, growth, and analytics._

<ArrayCTA />
