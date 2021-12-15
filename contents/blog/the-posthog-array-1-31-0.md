---
date: 2021-12-15
title: Array 1.31.0
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: ["Release notes"]
featuredImage: ../images/blog/posthog-array-blog.png
excerpt: PostHog 1.31.0 introduces Group Analytics, improved Correlation Analysis, a revamped overall user experience on Insights and 350+ more improvements and fixes.
---


Happy holidays from PostHog! PostHog 1.31.0 is our last release of the year, introducing Group Analytics, improved Correlation Analysis, a revamped user experience on Insights and 350+ more improvements and fixes. Please note that Postgres-based installations are no longer supported for PostHog 1.31.0.

<blockquote class='warning-note'>
<b>IMPORTANT!</b> Do not upgrade to this version if you have deployed PostHog using Postgres. PostHog no longer supports Postgres as of v1.30.0 and you must <a href="/docs/self-host/migrate-from-postgres-to-clickhouse" target="_blank">upgrade to ClickHouse</a> first.
</blockquote>

## PostHog 1.31.0 release notes

> Don't see the new features on your self-hosted deployment? Remember to [update your PostHog instance](/docs/self-host/configure/upgrading-posthog).

**Release highlights:**
- [Group Analytics](#group-analytics)
- [Improved Correlation Analysis](#improved-correlation-analysis)
- [Improved user experience](#improved-user-experience)

### Group Analytics

Introducing Group Analytics! Group Analytics enable you to analyze groups, which aggregate events within PostHog. You can have multiple groups and they can even change dynamically. 

Group Analytics is especially useful if you have a B2B product, as you will now be able to create a Company group type which tracks all unique users within a company, then create insights such as retention by company and events performed by unique companies. 

Visit our [Group Analytics documentation](/docs/user-guides/group-analytics) to find out what else is possible with Group Analytics. 


<img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/1_30_0-correlation.png" alt="TODO: Change this image" />


> 🎁 Group Analytics is a premium feature and requires a PostHog Scale or Enterprise license. [Learn more](/pricing).

<br />

### Improved Correlation Analysis

Correlation Analysis just got better! Aside from significantly improving the UI & UX, we've introduced a details option for advanced users looking for deeper understanding of how events and properties contribute to conversion or drop-offs. This new detail view will show a complete confusion matrix which shows true positives, true negatives, false negatives and false postives. We've also added a correlation score from `-1.0` to `1.0` to signal how strongly an event or property correlates with conversion or drop-off.

<img src="https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/1_30_0-correlation.png" alt="TODO: Change this image" />


<br />

### Improved user experience

We've been working hard on creating the best user experience, particularly in our core Analytics product. Creating and navigating insights will now be a lot faster and smoother. Improvements include: finding events & properties faster, overall faster navigation, improvements to tooltips, etc.

<br />


@yakkomajuri Special Migrations context here?


### Other improvements & fixes
- Improved breakdown in funnels. We have a new vertical layout to display funnels broken down by a property (e.g. conversion by browser) that will make it even easier to compare conversion across multiple dimensions.
- Searching events & properties is now significantly faster. We've changed the way these properties are shown and we now list them by popularity within your team. Create those insights faster!
- Following our [lemonade redesign](/blog/the-posthog-array-1-30-0#fresh-new-look-and-feel) we now have a ton more UI improvements. In particular tables got a pretty slick facelift.
- We've improved the layout configuration for dashboards so they'll be more responsive and look better on very small or very large screens.
- Pushed significant improvements to the recordings list load time.
- Introducing a new funnel query builder! We now group advanced options separately, so funnel definition is clearer.
- Fixed a bug in Feature Flags where a 0% release was sometimes considered as a 100% release.
- Fixed a bug where private project names were shown to members who shouldn't have access.
- Plus 350+ improvements & fixes.

### Deprecation & removal notices

1. This version (`1.31.0`) no longer supports a Postgres-only deployment of PostHog. Read [our migration guide](/docs/self-host/migrate-from-postgres-to-clickhouse) for instructions on moving over to a ClickHouse version. ClickHouse provides faster queries and is optimized for very large volumes of data, and you will also get a new lot of features.
2. We're [deprecating the **Sessions** insight](/blog/sessions-removal) (distribution of session length). Please [reach out](/support) if you have any feedback on this.

### Talk to us about how we can improve

We’re always working on improving the product experience and would love to talk to you! Please join one of our Product, Engineering, or Marketing team members on a quick 30-min call to help us understand how to improve. Schedule directly [on Calendly](https://calendly.com/posthog-feedback).

As a small thank you for your time, we're giving away awesome [PostHog merch](https://merch.posthog.com)!


## PostHog News

Welcome Cameron DeLeone! Cameron joined PostHog to help us level up our Customer Success experience. Cameron is a definite no for pineapple on pizza (🍍 on 🍕).

> I've always been a food lover, and started talking about food at 7 months old (my first word was "broc" for broccoli). I haven't shut up about it since.


## Community

Want to help improve PostHog? We always welcome contributions from our community! Check out our [contributing resources](/docs/contribute) to get started.

### Community shoutouts
We want to thank each and every community member that contributed to this release of PostHog!

- [abtinmo](https://github.com/abtinmo)
- [k4kuz0](https://github.com/k4kuz0)
- [vicampuzano](https://github.com/vicampuzano)
- [jyuvaraj03](https://github.com/jyuvaraj03)
- [ajsharp](https://github.com/ajsharp)
- [maxmue](https://github.com/maxmue)
- [hjweddie](https://github.com/hjweddie)
- [asherf](https://github.com/asherf)
- [chasovskiy](https://github.com/chasovskiy)
- [joesaunderson](https://github.com/joesaunderson)
- [Jaspreet-singh-1032](https://github.com/Jaspreet-singh-1032)

## Open roles

Join us in helping make more products successful! We're currently hiring for the following roles:

- Full Stack Engineering - Growth
- Operations Manager
- Software Engineer

Learn more about these roles on our [Careers page](https://posthog.com/careers).

Don't see a role for you? We're always looking for exceptional people, so reach out to us via the link above.

<hr/>

_Follow us on [Twitter](https://twitter.com/PostHog) or [LinkedIn](https://linkedin.com/company/posthog), and subscribe to our [newsletter](https://posthog.com/newsletter) for more posts on startups, growth, and analytics._

<ArrayCTA />
