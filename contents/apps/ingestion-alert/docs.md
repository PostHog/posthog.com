---
title: How the Ingestion Alert app works
showTitle: true
topics:
    - ingestion alert
---

## What does the Ingestion Alert app do?
This plugin triggers a webhook when no events have been ingested for a specified period of time. It can be used to alert you when ingestion for your project / instance is not working correctly.

## How do I install the Ingestion Alert app?

1. Log in to your PostHog instance
2. Click 'Plugins' on the left-hand tool bar
3. Search for 'Ingestion Alert' 
4. Select the app, press 'Install' and follow the on-screen instructions

## Is there anything else I need to be aware of?
If you do not have a lot of users, or they are all based in the same timezone you may legitimately have 'dead periods' where no events are generated - increase the threshold if you wish reduce the noise, you can use the [heartbeat plugin](https://github.com/PostHog/posthog-heartbeat-plugin) to trigger events during dead periods if you wish to only monitor the ingestion pipeline.

If an alert has already been triggered and ingestion has not recovered for an extended period, you will not receive another reminder that it is down.

This is helpful to monitor if there are any ingestion issues within your posthog instance and within your setup (e.g. using the wrong project key).

If the plugin server itself is down, this plugin will not be able to alert you that ingestion has stopped.

## What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

## What if my question isn't answered above?

You can [join the PostHog Community Slack group](/slack) to ask more questions, or get advice on developing your own PostHog apps.
