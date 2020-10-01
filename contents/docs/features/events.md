---
title: Events
sidebar: Docs
showTitle: true
---

The most critical thing that PostHog does is to capture events from your website or application. For example, if a user clicks a button or visits a URL – those are events.

## Demo Video

If you'd like to watch a video about our Events feature, check out our demo video below. It is set to start on the Events section:

<iframe width="560" height="315" src="https://www.youtube.com/embed/aUILrrrlu50?start=13" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Live Events

![Events table](../../images/features/events/live-events.png)

To see your live events table, click 'Events' on the left sidebar.

Here you will see a live feed of Events as they are happening. 

<br>

## Event Properties

You can view the properties of each event by clicking on the items in the ‘Event’ column:

![Events table](../../images/features/events/event-properties.png)

You can also click each person/user to view a their entire event history.

<br>

## Event Filtering

You will see in the first pictures on this page that there is a blue 'posthog team' button. That button represents a filter applied to this table.

You can filter events by [properties](/docs/integrations/js-integration#sending-user-information) and [Cohorts](/docs/features/cohorts). In the example picture, 'posthog team' is a cohort made up of users with emails that contain "posthog.com" i.e. our team.

<br>

## Autocapture Event Tracking

PostHog has the capability to capture all front end events automatically from just a simple JS snippet.

This means you do not need to add track(‘event’) to individual buttons, or parts of your product any more. The end result is zero maintenance of your event tracking, and less developer time spent on analytics. Focus on making product decisions and building cool features!

The other advantage is that you won’t lose data. If you change your product a lot, you can always work backwards with your analytics.

#### Important Note on Autocapture

While autocapture allows you to track the majority of general events on your website right out of the gate, it is important to note that, for security reasons, PostHog is very conservative regarding `input` tags. In order to prevent passwords or other sensitive data from being collected, very little data is collected from inputs with autocapture.

Specifically, PostHog autocapture will grab only the `name`, `id`, and `class` attributes from `input` tags. 

As such, you should be aware of this when you start, in order to understand why you may be getting less data than expected.

If you need to collect more data from inputs, you should look into [Custom Events and Actions](/docs/features/actions).
<br>

## Push-based Event Tracking

Most users of PostHog will want to combine their back-end data, such as user information, with the front end actions of those users in their UI.

There are two ways of passing data to PostHog – the API or through the JS snippet.
<br>

### API

Our API documentation is available [here](/docs/api/overview).
<br>

### JS Snippet

The snippet installation page explains how to push events through the front end.

In particular, we recommend pushing basic user information, such as email address, to make it much easier to understand the analytics.

