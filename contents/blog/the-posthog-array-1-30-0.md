---
date: 2021-11-17
title: Array 1.30.0
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: ["Release notes"]
featuredImage: ../images/blog/array/1-28-0.png
excerpt: Brand new and faster user interface, automatic conversion signal detection with Correlation analysis, saving insights for future use and a fully revamped recordings playback experience and more than 350 improvements/fixes more.
---


PostHog 1.30.0 is a milestone release! A brand new and faster user interface, automatic conversion signal detection with Correlation analysis, saving insights for future use and a fully revamped recordings playback experience are just a few of the improvements included.

## PostHog 1.30.0 release notes

> For a better experience and new features, remember to [update your PostHog instance](/docs/self-host/configure/upgrading-posthog).

**Release highlights:**
- [Fresh new look-and-feel](#fresh-new-look-and-feel)
- [Correlation analysis](#correlation-analysis)
- [Saved insights](#saved-insights)
- [Fully revamped recordings](#fully-revamped-recordings)

### Fresh new look-and-feel

PostHog just got a lot fresher! We have a brand new UI and layout that had been in the works, codenamed `lemonade` (because it's fresh). It's not only a new coat of paint - we've also pushed a lot of improvements to overall navigation and performance too. We call it turbo mode.


<img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/1_30_0-lemonade.png" alt="Screenshot of new user interface" />


<br />

### Correlation analysis

Want to understand why users convert or churn? Presenting: Correlation analysis. This nifty new insight automatically matches funnels to any relevant conversion signals, giving you effortless correlation information such as "Users in Canada are 5x more likely to convert" or "Users in Chrome are 3x less likely to convert". This is a very powerful which enables you to take funnel optimization to the next level. 

Read more on the [Correlation analysis docs](/docs/user-guides/correlation).

<img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/1_30_0-correlation.png" alt="Screenshot of correlation analysis" />


> 🎁 Correlation analysis is a premium feature and requires a PostHog Scale or Enterprise license. [Learn more](/pricing).

<br />

### Saved insights

Tired of creating the same insights multiple times? You can now save insights on PostHog without adding them to a dashboard. Further, you're able to see, search and filter a list of insights created by other team members - which makes it a lot easier to collaborate with PostHog. 

<img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/1_30_0-saved-insights.png" alt="Screenshot of saved insights" />


<br />

### Fully revamped recordings

The recordings experience just got a lot better. We added a new recordings tab that allows you to filter and search across multiple days (replacing the [old sessions tab](/blog/sessions-removal)). Once you've found the recording you want to watch, there's a brand new player experience that loads much faster and overlays events on the seekbar. Find the right spot in a recording quickly and understand better what your users are doing.

<img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/1_30_0-recordings.png" alt="Screenshot of new recordings playback experience" />

<br />


### Other improvements & fixes
- **Turbo mode**. You'll notice a significant speed improvement when using PostHog. App navigation will now happen almost instantly. In particular, you'll notice navigation between dashboards and insights happens without any delay.
- **Duplicate dashboards**. Thanks to community member [Yuvaraj J](https://github.com/PostHog/posthog/pull/6476), you can now easily duplicate dashboards instead of manually recreating them. Thanks, Yuvaraj!
- **Security on Docker builds.** We've moved to a different base image for Docker (`alpine`) and this new image build solves a lot of security vulnerabilities on upstream dependencies.
- **Improved query performance**. We improved how person properties are handled which results in up to 2x faster queries.
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

Thanks to all our community members for helping move PostHog forward! This release cycle's Community MVP goes to [asherf](https://github.com/asherf)!

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
