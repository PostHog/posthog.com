---
date: 2020-05-07
title: Array 1.4.0
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/array/default.png
featuredImageType: standard
category: PostHog news
tags:
  - Product updates
  - Release notes
---

Session times are here! They're a great way to help understand how engaged users are. The Array 1.4.0 brings plenty of improvements to our core functionality.

## Release notes

### [Filter properties individually](https://github.com/PostHog/posthog/pull/671)

![](../images/05/captured.gif)

In both trends and funnels, you can now add filters for each event individually, rather than for all events.

### [Breakdown by properties in graph](https://github.com/PostHog/posthog/pull/671)

![](../images/05/captured-1.gif)

Previously the only way to see properties broken down by value was in a table. Now you can break down on any property and display it in a graph.

Select a property on the left hand side, like $browser, and a line will appear for each value of that property (Chrome, Firefox etc).

### [Session time series](https://github.com/PostHog/posthog/pull/659)

![](../images/05/Screenshot-2020-05-06-at-10.59.34.png)

Eric has been hard at work improving the way we display session information. You can now see how the average time spent on your app changes over time.

### [Export cohorts as CSV](https://github.com/PostHog/posthog/pull/441)

![](../images/05/Screenshot-2020-05-06-at-10.53.26.png)

This was contributed by [Anoop](https://github.com/anoopemacs), and while it admittedly took a while to get merged it’s a great addition. You can now export a full list of users from any cohort to CSV, including all distinct ids and properties.

### [Edit frontend selectors in Actions](https://github.com/PostHog/posthog/pull/670)

![](../images/05/Screenshot-2020-05-06-at-10.56.03.png)

Previously, the only way to edit selectors for frontend elements in actions was to go to your own site and use the toolbar. Now you can do this inside PostHog itself.

### [Setup page redesign](https://github.com/PostHog/posthog/pull/701)

![](../images/05/Screenshot-2020-05-06-at-11.13.06.png)

Thanks to Sanket for this one! The setup page now uses Antd too and it looks great.

### [Restrict access to instance by IP](/docs/deployment#restrict-access-by-ip)

You can now restrict access to your instance by IP for extra security. [See docs](/docs/deployment#restrict-access-by-ip) on how to set that up.

## Bug fixes and performance improvements

* More [accurate timestamps](https://github.com/posthog/posthog/pull/693) when users have their computer time set incorrectly.
* [Selecting today + hourly interval didn’t work](https://github.com/posthog/posthog/pull/700).
* [Speed up cohorts page](https://github.com/posthog/posthog/pull/706) loading and use Antd.
* [Add screen name](https://github.com/posthog/posthog/pull/681) to events table for mobile apps.
 
## Favorite issue

### [“Compare to” in charts #715](https://github.com/PostHog/posthog/issues/715)

Thanks to [Paolo](https://github.com/PaoloC68) for raising this issue. It’d be great to have the ability to compare certain timeframes against each other.

Feel free to comment on the issue if you have any other ideas about this!

## Share your feedback
We'd love to hear anything you have to say about PostHog, good or bad. As a thank you, we'll share some awesome [PostHog merch](https://merch.posthog.com).

Want to get involved? [Email us to schedule a 30 minute call](mailto:hey@posthog.com) with one of our teams to help us make PostHog even better!


## Weekly round up

* [How Sustainable is a Solar Powered Website?](https://www.lowtechmagazine.com/2020/01/how-sustainable-is-a-solar-powered-website.html)
* [Moufette](https://github.com/moufette-tools/moufette), a tool inspired by PostHog(!) that allows your users to give instant feedback on any page in your app

## PostHog news

We’re growing rapidly, and we’re constantly expanding our team. We’re looking for a [strong devops engineer](https://news.ycombinator.com/item?id=23044768) to join us. If that sounds like you, please email tim@posthog.com.

<ArrayCTA />
