---
date: 2020-07-14T00:00:00.000Z
title: Array 1.11.0
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/array/default.png
featuredImageType: standard
category: PostHog news
tags:
  - Product updates
  - Release notes
---


Annotations, filtering all functionality by cohorts, retention table filtering and many, many bugfixes. It's all in this PostHog update.

If you're self hosting and want these features - [update your PostHog](/docs/runbook/upgrading-posthog).

Please also update your `posthog-js` version to at least `1.3.4` if you have it installed via NPM. If you're using the snippet, you're good to go!  

## Release notes

### Annotations

![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/annotations.png)

Digging through git commits to find out what changed to make the graphs go hay-wire? No more! You can now annotate when something happened (a big release, a bugfix or a launch) and make it super easy for your team-mates to figure out what's going on.

### Cohort filters

![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/cohort-filter.png)

Anywhere you can filter, you can now filter on cohorts as well. The first contribution by our newest member of the team, Michael!

### Retention table filtering


![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/retention-filter.png)

We added retention the retention table last week but we're not done with it yet. This week [Kacppian](https://github.com/Kacppian), a fervent contributor, added filtering, which combined with the cohort filtering is very powerful.

We'll be adding more improvements in the next release!

### Many toolbar fixes.

![heatmap](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/casts/heatmap.gif)

As we talked about last week, we've opened the toolbar for beta access. The toolbar will give you things like heatmaps and stats, right on your own website.

Thanks for [the feedback on our feedback ticket](https://github.com/PostHog/posthog/issues/1129). We've already solved many issues and are working hard towards a full release. Please add onto that ticket if you have any more!.


## Bug fixes and performance improvements

* Some first-time contributors ran into errors with TemplateDoesNotExist, which [we've solved](https://github.com/PostHog/posthog/pull/1200)
* Add comprehensive Cypress tests for dashboards [to avoid bugs](https://github.com/PostHog/posthog/pull/1171)
* Add webpackbar for better [readability while developing](https://github.com/PostHog/posthog/pull/1185)
* Moves total to the bottom of the pie chart to fix z-index issues [readability while developing](https://github.com/PostHog/posthog/pull/1179)
* Fix an issue with [filtering on the event type](https://github.com/PostHog/posthog/pull/1168)
* Add Typescript to the [PostHog frontend codebase](https://github.com/PostHog/posthog/pull/1157)
* Fix the ability to [delete dashboards](https://github.com/PostHog/posthog/pull/1152)
* Add support [for LZ-String compression](https://github.com/PostHog/posthog/pull/1058)
* [Use Black for Python formatting](https://github.com/PostHog/posthog/pull/1136)

## Favorite issue

### [Stacked line charts](https://github.com/PostHog/posthog/issues/1167)

The inkt was barely dry on this issue before Kacppian picked it up. Look for this feature in the next release!

## Share your feedback
We'd love to hear anything you have to say about PostHog, good or bad. As a thank you, we'll share some awesome [PostHog merch](https://merch.posthog.com).

Want to get involved? [Email us to schedule a 30 minute call](mailto:hey@posthog.com) with one of our teams to help us make PostHog even better!



## PostHog news

James (our tallest co-founder) had a baby girl called Ruby! The first PostHog baby, though there's already another one in the pipeline!

We've also welcomed Michael to the team full-time, and Max is going to join us over the summer.

### Open roles

Full stack or growth engineers - [we want you!](https://posthog.com/careers)

We've also started looking for a Ops type person - someone that can take charge of the operational side of a quickly growing, completely remote company.

<ArrayCTA />
