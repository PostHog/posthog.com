---
date: 2020-03-09
title: Array 1.0.0
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

This is the first of (what we hope are many) PostHog weekly roundup posts. We want to let the community know what we have been up to, a few of our favorite comments, issues, and pull requests as well as some key repos and projects we have noticed over the course of the week.

If you would like us to change the format or include something new, create an [issue](https://github.com/PostHog/posthog).

## Release details

We’ve made a lot of exciting new features this week (to update, please see https://github.com/PostHog/posthog/wiki/Upgrading-PostHog):

### Filtering action trends graphs

![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/03/Action-trend-filter-gif.gif)

This is a more intuitive way of filtering action trends. You can also look at both the total and DAUs with this update.

### Exact/contains matching for URLs in actions

![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/03/image-2.png)

This does exactly what it says on the tin, it will allow you to be able to specify specific pages to track in your app/website.

### Filtering paths by date

![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/03/Path-by-date-gif.gif)

We got a lot of requests for this update – paths are super interesting but if you’re making changes to your website based on your findings you should be able to then refine your paths by date.

and lastly…

### Graphs show numbers

![](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/03/image-1.png)

We took way too long to realize this was much simpler than guessing the number on the Y axis.

We’ll try to ensure we don’t make such oversights again. In the meantime, at least our dashboards are easier to read.
 
## Favorite issue

### [Library Request: integrate with Elixir](https://github.com/PostHog/posthog/issues/227)

We’ve wanted to increase the number of integrations. This is why we’re highlighting this issue – having people request something helps us prioritize better.

[Integrations-wise](/docs/integrate/overview), we already have JS, Node, Python, Ruby, PHP and Go – let us know if we’re missing something that you would like.

Thank you [victorbordo](https://github.com/victorbordo) for raising it.

## PR of the week

### [Filter paths by timestamp #272](https://github.com/PostHog/posthog/pull/272)

Part of a larger [issue](https://github.com/PostHog/posthog/issues/223) but hats off to [mariusandra](https://github.com/mariusandra) for the excellent contribution which made it into our product update above.

## Repo round up

These are things that we thought were cool in the last week:

* [Newscatcher](https://github.com/kotartemiy/newscatcher) (we were lucky enough to be included in [Python Weekly](https://www.pythonweekly.com/) and this caught our eye at the same time)
* [7 days golang apps from scratch](https://github.com/geektutu/7days-golang) (No not Craig David’s terrible follow up to his 2000 hit, we came across this as we finished our Go integration)
* [openpilot](https://github.com/commaai/openpilot) (having recently moved to SF we see loads more Cruise cars and autonomous training vehicles than we ever would in London – it’s pretty cool that this is an open source project)

## PostHog news

* We wrote a blog about [moving to SF](/blog/moving-to-sf). James was delighted it made it to the front page of HN.
* We also started a [Youtube channel](https://www.youtube.com/channel/UCn4mJ4kK5KVSvozJre645LA) – we’re not going to be big time vloggers anytime soon but we did want to make it easier for our users to understand our features. 

<ArrayCTA />
