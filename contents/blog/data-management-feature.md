---
date: 2022-03-21T00:00:00.000Z
title: Introducing Data Management for PostHog
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/data-management-feature/posthog-data-management.png
featuredImageType: full
author:
  - alex-kim
category: PostHog news
tags:
  - Launch week
  - Product updates
---

PostHog is growing fast. In just the last year we've measured ~36.5B total events ingested in PostHog Cloud, and hundreds of self-hosted users reached the 1M total ingested events milestone.

This is a sign of the superb growth we're seeing as a business, but data explosion is real and can be a nightmare to scale in the context of a product analytics tool. Furthermore, poor data management can seriously harm your business as it can lead to inaccurate analyses and poor business decisions.

As the biggest dogfooder of our own product, we (and many other teams) were beginning to see the consequences of the lack of in-house tools to manage our data. All the use cases we saw boiled down to a few common pain points:

1. It is hard to understand events, actions, and properties that you yourself didn't set up.
2. Data decays quickly, and most of the time fails to stay up-to-date with instrumentation.
3. Event-level context in insights and dashboards is difficult to share with external people and new team members.

We set out to solve these pain points and the result is the new Data Management experience we're introducing today on PostHog Cloud and on Thursday for self-hosted.

> Data Management is Chapter 1 of our [Universe of New Features launch week](/blog/launch-week-universe-of-new-features)

## The new Data Management and Activity tabs

The Data Management page (pictured below) is the new hub for viewing, editing and managing all the data coming into your instance. 

![PostHog - data management tab](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/data-management-feature/data_management_tab.png)

Data Management introduces more ways to organize and categorize your events. Event definitions can now be organized using tags and we've created the 'Verified' marker, which tells collaborators that an event should be favored over other similar events. 

Verified events are prioritized within filters and other selection components, and we've introduced to two sortable "freshness" indicators (30-day volume and query volume) to make it easier to choose the correct events when creating Insights.

As part of this overhaul, we've made a few important changes to how data is organized, too. 'Event Stats' and 'Property Stats' have been renamed 'Events' and 'Event properties', and we've moved them into the Data Management tab alongside 'Actions'. The 'Events & Actions' tab has been renamed 'Activity', where you can debug incoming event data by streaming it in near real time.

![PostHog - live events tab](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/data-management-feature/live_events.png)

## Making it easy to define events 'on the fly'

Not only are we giving you more ways to organize and define events, we're also making it easy to edit them wherever you are in the product.

Building an insight and see an Event or Event property that could be more descriptive? You can now create a definition for that without leaving the insight query builder.

Just hover over the Event property in the dropdown...

![PostHog - read definition hover card](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/data-management-feature/read_definition_card.png)

And when you click 'Edit' you can add a description, add tags or mark it as a Verified Event.

![PostHog - write definition hover card](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/data-management-feature/write_definition_card.png)

Alternatively, click on 'View' in the definition hover card and you'll be redirected to the new Data Management page, where you can explore all the Events and Event properties you've created.

![PostHog - view definition context](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/data-management-feature/data_management_view.gif)

And if you want a gold star in best practice, you can also opt to create definitions with our API. Check out our documentation on how to use the [`event_definitions`](/docs/api/event-definitions) and [`property_definitions`](/docs/api/property-definitions) API endpoints.

Oh, and in case you were wondering, the awesome thing about definitions in PostHog is that they can be created, updated, or deleted at any time without affecting the event data that is already there, so **you don't need to create event definitions before ingesting events**. 

## How to use Data Management as a team (best practices)

To help you in your journey to data management nirvana, here are a few rules of thumb to consider when using these new features.

**1. The more definitions you add, the easier it will be for your teammates to understand what each event and property represents.**

Take a custom event sent as `sign_up` for example that is triggered on user sign up. Pretty self-explanatory, right? Not necessarily. Imagine you have a second app pushing data to the same PostHog instance sending sign up events as `sign up`; or maybe you send a `sign up` event from your frontend and one from your backend. A new teammate using PostHog will find it impossible to differentiate between the two, potentially leading to incorrect conclusions and frustration. Describing these events properly can ensure your teammates find exactly what they're looking for.

**2. Official organization-wide events should be verified so that teammates can discover and use them easily.** 

Verified events will be prioritized in filters and other selection components to signal to the rest of the team that this event should be used in favor of other similar events. An example where this comes in handy is if there are two events that sound familiar, `signed up` and `signed_up`. Verifying the first tells others very explicitly that one is still being used and the other has gone stale.

**3. Tagging is an easy way to categorize events into custom groups, be it for a product, feature or new page.** 

We highly recommend using tags to organize events coming in from different parts of your product. At PostHog for example, we use tags called `session-recordings`, `funnels`, and `feature-flags` to keep track of insights and dashboards related to those features. 

Tags can also be useful for organizing PostHog for internal use. We create tags for each of our internal [small teams](/handbook/team-structure/why-small-teams) to signal which dashboards are interesting to our respective teams.

## What's next for Data Management?

To recap, the new Data Management experience means you can:

- Organize your definitions with tags
- Manage event definitions on the fly while building insights
- Verify trusted definitions which are prioritized in the UI
- Easily manage all your Events, Event properties and Actions in the Data Management tab
- Debug your incoming events using in the Activity tab

These are powerful tools for organizing your data, but we're just scratching the surface. Below are just a few ideas on our roadmap that we think you'll like:

- Role-based ownership of definitions
- Personally identifiable information (PII) rules
- Anomaly detection for malformed events and properties
- Person and Group Property definitions

As always, we welcome any feedback you may have about this feature. Feel free to open an issue in [our Github repo](https://github.com/PostHog/posthog), join us directly for a [call](https://calendly.com/posthog-feedback) with our Product & Engineering team, or [submit a ticket in our app](https://app.posthog.com/home#supportModal). 

> PostHog is an open source analytics platform you can host yourself. We help you build better products faster, without user data ever leaving your infrastructure.

<ArrayCTA />
