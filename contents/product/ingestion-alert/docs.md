---
title: How the Ingestion Alert app works
showTitle: true
topics:
    - ingestion alert
---

## What is this plugin used for?
This plugin triggers a webhook when no events have been ingested for a specified period of time. It can be used to alert you when ingestion for your project / instance is not working correctly.

## How can I install the Ingestion Alert plugin?

1. Open PostHog.
2. Open the Plugins page from the sidebar.
3. Head to the Advanced tab.
4. "Install from GitHub, GitLab or npm" using this repository's URL.

## Is there anything else I need to be aware of?
If you do not have a lot of users, or they are all based in the same timezone you may legitimately have 'dead periods' where no events are generated - increase the threshold if you wish reduce the noise, you can use the [heartbeat plugin](https://github.com/PostHog/posthog-heartbeat-plugin) to trigger events during dead periods if you wish to only monitor the ingestion pipeline.

If an alert has already been triggered and ingestion has not recovered for an extended period, you will not receive another reminder that it is down.

This is helpful to monitor if there are any ingestion issues within your posthog instance and within your setup (e.g. using the wrong project key).

If the plugin server itself is down, this plugin will not be able to alert you that ingestion has stopped.

## How can I find out more?

Easy. [Join our Slack community.](/slack)
