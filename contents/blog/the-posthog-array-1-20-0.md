---
date: 2021-01-19
title: Array 1.20.0
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
---

We're back! 2020 was a hectic year for us and our team put in a whole lot of effort to get PostHog to where it is now. As such, we shut down PostHog for 2 weeks to give everyone a chance to recharge (with a rotation in place to make sure nothing burned down). 

2021 is now here and we're kicking off with some awesome new features. Behold...

## Release Notes

> If you're self-hosting and want to upgrade for a better experience with nicer features, remember to [update your PostHog instance](/docs/configuring-posthog/upgrading-posthog).

### [Plugins, Plugins, and more Plugins](/plugins)

![Plugin Library Screenshot](https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/plugin-library.png)

A lot has been happening on our Plugins front. 

Besides a whole bunch work to deliver perfomance improvements and mature the PostHog Plugins ecosystem, we have two major changes being introduced with this new PostHog version:

**A shiny new plugin library**

We have released a [plugin library](/plugins) where you can browse through all the plugins built by our core team and community, and made sure the library is populated with plugins! Thus, we now have integrations that support getting data from GitHub and GitLab, or sending data over to BigQuery and Hubspot, for example. 

We're working to make plugins available on Cloud, but, in the meanwhile, if you're self-hosting, do check out our plugins and let us know what you think!

**Plugins can now access persistent storage**

Up until now, plugin builders would have noticed that the `cache` could have been used to store data in-memory using Redis, but we now also support `storage`, which allows plugins to store data in a persistent form, opening up a lot of new use cases for you to explore.

### [Static Cohorts](https://github.com/PostHog/posthog/pull/2932)

![Static Cohorts Screenshot](https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/static-cohorts.png)

In addition to our standard dynamic cohorts (periodically updated based on the definition), PostHog now support static cohorts - groups of users that don't update. 

To create a static cohort, head over to 'People' -> 'Cohorts' and, when creating a new cohort, select 'Upload CSV'. This CSV file should have a single column with either the user's `distinct_id` or `email`. 

This way, you can import data from outside sources into a PostHog cohort more easily, as well as turn your dynamic cohorts into static ones by first exporting them. You could, for example, add your Mailchimp subscribers list as a static cohort.

### [Sortable Funnel Steps](https://github.com/PostHog/posthog/pull/2862)

![Sortable Funnels Screenshot](https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/funnel-step-reordering.png)

As of this new release, when you head over to Funnels in PostHog, you will see 3 dots next to each funnel step. By dragging these 3 dots up and down you can now re-order your funnel's steps, for example if you made a mistake, or want to explore different funnel structures. 

This was a feature that was consistently requested by the PostHog community, and we'd like to also shoutout [@glmaljkovich](https://github.com/glmaljkovich) for helping us build it!

### [PostHog Bookmarklet](https://github.com/PostHog/posthog/pull/2774)

![Bookmarklet Gif](https://posthog-static-files.s3.us-east-2.amazonaws.com/Website-Assets/Array/bookmarklet.gif)

To try out the PostHog snippet without having to update anything on your codebase, you can make use of our bookmarklet, which you can find over in 'Project Settings'.

This lets you capture events in your website without any code, and we've been using it actively during our demos!

### [Sessions List now loads 10x faster](https://github.com/PostHog/posthog/pull/2934)

Since joining us, Karl has been submitting performance improvement after performance improvement.

This time, as session recordings are being used more and more by our users, it was time to speed up the loading of the sessions list, which now loads 10x faster!

### [User Interviews](calendly.com/posthog-feedback)

We’re working hard to improve PostHog and would love to talk to you about your experience with the product. 

If you're interested in helping us out, you can schedule a quick 30-min call with us [on Calendly](https://calendly.com/posthog-feedback). 

Oh, and we're giving away some awesome [PostHog merch](https://merch.posthog.com) as a thank you!

## Favorite Issue

### [PostHog Development on Apple Silicon](https://github.com/PostHog/posthog/issues/2916)

Are you a person that likes to operate at the bleeding edge of technology? Follow Marius' adventures working with PostHog on an Apple M1 laptop.

## PostHog News

Cory has joined us as a Lead Designer and has already started working on some jaw-dropping designs! Cory lives in an RV with his wife and child, boasting greater home square footage than many apartments in New York or San Francisco. 

He believes pineapple belongs on pizza, and we're now questioning whether we indeed know how to hire.

## Community Shoutouts

Big thanks to the following members of our community who have contributed to PostHog over this release cycle:

- [glmaljkovich](https://github.com/glmaljkovich)
- [tmilicic](https://github.com/tmilicic)
- [c3ho](https://github.com/c3ho)
- [Tbhesswebber](https://github.com/Tbhesswebber)
- [stevenphaedonos](https://github.com/stevenphaedonos)
- [moonrailgun](https://github.com/moonrailgun)
- [Somtom](https://github.com/Somtom)

## Open Roles

Are you a Fullstack Engineer, Senior Engineer, Marketing Lead, Growth Engineer, or Customer Success Lead? 

Or perhaps you're not either but think you'd still be a good fit for PostHog? 

[We want you!](https://posthog.com/careers) 

## Bug Fixes and Performance Improvements

In addition to the highlights listed above, we also merged a bunch of PRs improving PostHog's performance and fixing bugs:

