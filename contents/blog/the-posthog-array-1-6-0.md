---
date: 2020-05-19
title: Array 1.6.0
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

One of the most fun weeks we've had so far with our UX - resizable and touch-enabled dashboards with a new display mode, Microsoft Teams support, and paths for events. Plus, a ton of performance improvements.

Want to try this out and self hosting? [Update your PostHog](/docs/runbook/upgrading-posthog).

## Release notes

### [Awesome-er dashboards](https://github.com/PostHog/posthog/pull/753) with [resizing](https://github.com/PostHog/posthog/pull/746), including [for mobile](https://github.com/PostHog/posthog/pull/775)

![Touch dashboards](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/dashboards-moving.gif)

This update is pretty fun.

It is now possible to rearrange dashboards, even if you're using PostHog on a mobile device.

Now you're able to adjust their colours (including black!) and even to enter 'presentation mode' to view your dashboard full screen - perfect if you want a dashboard up in the office:

![Dashboard presentation mode](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/presentation-mode.png)

Finally, your pinned dashboards will appear in the sidebar, so they're easier to get to.

### [Microsoft Teams integration](/docs/integrate/webhooks/microsoft-teams)

PostHog already integrates with [Slack](/docs/integrate/webhooks/slack).

We had a user who said they'd got the webhook working with MS Teams too, so we wrote out how to do that.

This means you can set up an alert for any action that takes place in your app. In this case, the user wanted their sales team to get an alert when a new user signed up.

### [Paths with events](https://github.com/PostHog/posthog/pull/692)

![Paths with events](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/paths-with-events.gif)

PostHog has a paths page that lets you see how traffic is flowing through your website or application.

However, to-date, we have only been able to show page views.

Now, you can visualize any series of page views or events! This means you can easily visualize how thousands of users are interacting with your application in a freeform way.

## Bug fixes and performance improvements

* [You can now use](https://github.com/PostHog/posthog/pull/768) the ```django-debug-toolbar``` to diagnoze performance issues better
* We added [ES Lint](https://eslint.org/), for JavaScript linting.
* We fixed [property filter array issue](https://github.com/PostHog/posthog/pull/769)
* [Optimize funnel rendering](https://github.com/PostHog/posthog/pull/792) is a major improvement in speed for those with many events - now 1 order of magnitude faster. 
* [Multiple filters with same key](https://github.com/PostHog/posthog/pull/738), fixed a bug that means you can now have multiple filters that are the same ie ```$current_url doesn't equal A``` and ```$current_url doesn't equal B```
* [Event partitioning](https://github.com/PostHog/posthog/pull/733), which speeds up trends and paths pages in particular. Learn more about [scaling PostHog](/docs/self-host/deploy/configuration#scaling-up).
* The component ```Deletewithundo``` wasn't working because of property mixup, [now it is](https://github.com/PostHog/posthog/pull/750)!
* [Funnels](https://github.com/PostHog/posthog/pull/751) and [Actions](https://github.com/PostHog/posthog/pull/757) now use Ant Design
* We temporarily [removed stickiness breakdowns](https://github.com/PostHog/posthog/pull/774), as they were causing issues. We'll put this back into our roadmap and will priortize depending on user feedback.
* We have [better handling of breakdown views](https://github.com/PostHog/posthog/pull/758) when users don't have the property.
* [Fixed an issue](https://github.com/PostHog/posthog/pull/725) with viewing certain queries over all time.
* [Resolved an issue](https://github.com/PostHog/posthog/pull/748) with sessions where null conditions were missing
* Fixed the [cohort input search](https://github.com/PostHog/posthog/pull/785) bug
* Solved [a bug with navigating to users](https://github.com/PostHog/posthog/issues/794)
* We [improved our event insertion scalability](https://github.com/PostHog/posthog/pull/797)

## Favorite issue

### [Dev toolbar](https://github.com/PostHog/posthog/issues/741)

Last week was a call for discussion, now there's some really good commentary on how this should look and feel. We'd love you to weigh in or upvote what you like, to help us shape up [phase 2 of the roadmap](/handbook/strategy/roadmap).

## Weekly round up

* [Far future timeline](https://en.wikipedia.org/wiki/Timeline_of_the_far_future). This gave me a mild existential crisis until I got to what happens after universe heat death.
* [Developer search engine](https://quickref.dev/). The lack of commercial focus here is pretty neat although I still wish someone would build a manually curated blog search engine as an open source project.

## Share your feedback
We'd love to hear anything you have to say about PostHog, good or bad. As a thank you, we'll share some awesome [PostHog merch](https://merch.posthog.com).

Want to get involved? [Email us to schedule a 30 minute call](mailto:hey@posthog.com) with one of our teams to help us make PostHog even better!


## PostHog news

Overall, we're feeling pretty pleased with ourselves this week - the level of polish in the product has gone up quite dramatically. We've got a design candidate lined up, to be disclosed shortly, to help achieve the same with our website and documentation too.

Our hunt for a superb devops person has come to a wonderful conclusion… we are delighted to say that [James G](https://twitter.com/FuzionTech) will be joining us initially as a contractor for the next few months then as a full time employee after that. He has a ton of experience of enormous user bases and already has made our funnels [an order of magnitude faster](https://github.com/PostHog/posthog/pull/751). Tim and James G are busy scoping a [deployment master plan](https://github.com/PostHog/posthog/issues/799), which will be a key part of his focus.

On that note, if you are reading and are using PostHog at scale, or having any issues with load times, please [let us know](/support) - this is a real focus so more folks can use the platform without any issues.

<ArrayCTA />
