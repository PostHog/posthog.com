---
date: 2022-03-23
title: Introducing Data Management for PostHog
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/posthog-array-blog.png
featuredImageType: full
author: ["alex-kim"]
categories: ["Product updates", "Launch week"]
---

PostHog is growing fast. In just the last year (since we started measuring total events), we've gone from ~8B to ~36.5B total events ingested in PostHog Cloud alone!

![PostHog - total events](../images/blog/data-management-feature/total_events.png)

This is a sign of the superb growth we're seeing as a business, but data explosion is real and can be a nightmare to scale in the context of a product analytics tool. Furthermore, poor data management can seriously harm your business as it can lead to inaccurate analyses and poor business decisions.

As the biggest dogfooder of our own product, we (and many other teams) were beginning to see the consequences of the lack of in-house tools to manage our data. All the use cases we saw boiled down to a few common pain points:

1. It is hard to understand events, actions, and properties that you yourself didn't set up.
2. Data decays quickly, and most of the time fails to stay up-to-date with instrumentation.
3. Event-level context in insights and dashboards is difficult to share with external people and new team members.

We set out to solve these pain points and the result is the new Data Management experience we're introducing today, starting with the new Data Management tab.

## The new Data Management and Live Events tabs

The Data Management (pictured below) is the hub for viewing, editing and managing all the data coming into your instance. 

![PostHog - data management tab](../images/blog/data-management-feature/data_management_tab.png)

Data Management introduces more ways to organize and categorise your events. Event definitions can now be organized using tags and we've created the "Verified event" marker, which tells collaborators that an event should be favored over other similar events. Verified events are also prioritzed within filters and other selection components, ensuring people use the correct events when creating insights.

Existing users should note we've made a few important changes to how data is organized, too. "Event Stats" and "Property Stats" have been renamed "Events" and "Event Properties" and we've moved them into the Data Management tab alongside "Actions".

Alongside Data Management, we've also introduced a new Live Events tab, which makes it easy to debug incoming event data by streaming it in near real time.

[Live Events Screenshot here]

## Making it easy to define events 'on the fly'

Not only are we giving you more ways to organize and define events, we're also making it easy to edit them wherever you are in the product.

Building an insight and see an event or Event Property that could be more descriptive? You can now create a definition for that without leaving the insight query builder.

Just hover over the Even Property in the dropdown...

![PostHog - read definition hover card](../images/blog/data-management-feature/read_definition_card.png)

And when you click 'Edit' you can add a description, add tags or mark it as a Verified Event.

![PostHog - write definition hover card](../images/blog/data-management-feature/write_definition_card.png)

Alternatively, click on 'View' in the definition hover card and you'll be redirected to the new Data Management page, where you can explore all the Events and Event Properties you've created.

[WIP screenshot]

And if you want a gold star in best practice, you can also opt to create definitions with our API. Check out our documentation on how to use the [`event_definitions`](/docs/api/event-definitions) and [`property_definitions`](/docs/api/property-definitions) API endpoints.

Oh, and in case you were wondering, the awesome thing about definitions in PostHog is that they can be created, updated, or deleted at any time without affecting the event data that is already there, so **you don't need to create event definitions before ingesting events**. 

## How to use Data Management as a team (best practices)

To help you in your journey to data management nirvana, here are a few rules of thumb to consider when using these new features.

1. The more definitions you add, the easier it will be for your teammates to understand what each event and property represents.

Take a custom event sent as `sign_up` for example that is triggered on user sign up. Pretty self explanatory, right? Imagine you have a second app pushing data to the same PostHog instance sending sign up events as `sign up`. Or maybe you send a `sign up` event from your frontend and one from your backend. A new teammate using PostHog will find it impossible to differentiate between the two, potentially leading to incorrect conclusions and frustration. Describing these events properly can ensure your teammates find exactly what they're looking for.

2. Official organization-wide events should be verified so that teammates can discover and use them easily. 

Verified events will be prioritized in filters and other selection components to signal to the rest of the team that this event should be used in favor of other similar events.

3. Tagging is an easy way to categorize events into custom groups, be it for a product, feature or new page. 

We highly recommend using tags to organize events coming in from different parts of your product. 

## What's next for Data Management?

To recap, the new Data Management experiences means you can:

- Organize your definitions with tags
- Manage event definitions on the fly while building insights
- Verify trusted definitions which are prioritized in the UI
- Easily manage all your Events, Event Properties and Actions in the Data Management tab
- Debug your incoming events using in the Live Events tab

These are powerful tools for organizing your data, but we're just scratching the surface. [AV: Let's elaborate a little more here on the roadmap. Only needs to be top-level]

As always, we welcome any feedback you may have about this feature. Feel free to open an issue in [our Github repo](https://github.com/PostHog/posthog) or give us a shout in our [PostHog community Slack channel](/slack). Or join us directly for a [call](https://calendly.com/posthog-feedback) with our Product & Engineering team.