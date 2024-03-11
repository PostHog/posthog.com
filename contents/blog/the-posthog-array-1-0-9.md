---
date: 2020-03-25
title: Array 1.0.9
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

We’re in the thick of our release schedule this week!

Like what you see and self-hosting? [Update](/docs/runbook/upgrading-posthog) your instance.

First our updates and new features.

## Release notes

### Stickiness

![stickiness](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/03/stickiness-gif.gif)

Last week we made a lot of changes to actions but one important change missed the release.

Our trend graphs can be viewed with daily total users (DAUs) or total numbers but we could only show you the volume of users.

Stickiness lets you view an action as it is repeated by unique users on a daily basis. Giving you an understanding of how often your users come back to this action, it is a great indication of the stickiness of your application and/or website.

### New Funnel Builder

![new funnel builder](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/03/newfunnel.gif)

Tim spent a lot of work on funnels – we thought it was so useful in our previous product we included it in the very first PostHog release.

However we perhaps over-engineered our Funnel builder to autosave and switch stages easily – we think the new one is simple and efficient.

### Events changes & improvements

This is three small changes grouped together following on from our Actions vs Events work from [last week](/blog/the-posthog-array-1-0-8).

We are aiming to make events very intuitive so firstly we have changed the wording around event property filters and made it clear that you can use dropdowns in events

![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/03/Posthog-5.png)

and most importantly we added 'isnot' and 'does not contain' to property filters making this much more powerful.

![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/03/isnotdoesnotcontain.gif)

## Performance updates

* Upgraded from Parcel to [Webpack](https://github.com/PostHog/posthog/pull/331).
* Placed our [API Key](https://github.com/PostHog/posthog/issues/361)  in a more obvious bucket as it used to reside in just the JS snippet.

## Favorite issue

### [k8s documentation and improvements](https://github.com/PostHog/posthog/issues/343)

This is our favorite issue because we didn’t have a huge amount of experience when it came to deploying k8s. 

What we really enjoy about building PostHog is that the growing community can let us know what is important, and we might have overlooked our k8s documentation without it being drawn to our attention.

Thank you [Tyler-Churchill](https://github.com/Tyler-Churchill).

## PR of the week

### [frontend: Make “Invite Team” link box visible](https://github.com/PostHog/posthog/pull/395)

Thank you [SanketDG](https://github.com/SanketDG) for helping clean up our multiple users and invite team box – this was quite messy and is now much neater.

## Repo round up

Here is what we thought was cool and interesting in the last week:

* [Universal Data Tool](https://github.com/UniversalDataTool/universal-data-tool)  (a user shared their project with us and we thought it looked really cool)
* [Opensource.builders](https://github.com/junaid33/opensource.builders) (this is a really cool way to find and request open-source alternatives to popular software)
* [Jitsi](https://github.com/jitsi/jitsi-meet) (this is a great project with simple and scalable video conferencing, something I’m sure everyone is beginning to use a lot more of.)

## Share your feedback
We'd love to hear anything you have to say about PostHog, good or bad. As a thank you, we'll share some awesome [PostHog merch](https://merch.posthog.com).

Want to get involved? [Email us to schedule a 30 minute call](mailto:hey@posthog.com) with one of our teams to help us make PostHog even better!


## PostHog news

All of PostHog will be back in the UK in light of the border closures that have been happening but will aiming to cover support queries through most of US time as well as now Europe and GMT.

We’ve also been trading fitness tips, James was a cyclist after all so no surprises what he is up to, Tim is getting in 2-3 HIIT sessions, whilst Aaron is taking advantage of [Down Dog’s free access](https://www.downdogapp.com/) and trying yoga so we can weather the UK’s restrictions.

<ArrayCTA />
