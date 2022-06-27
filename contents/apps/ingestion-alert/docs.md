---
title: Ingestion Alert documentation
showTitle: true
topics:
    - ingestion-alert
---

### What does the Ingestion Alert app do?

This app triggers a webhook when no events have been ingested for a specified period of time. It can be used to alert you when ingestion for your project / instance is not working correctly.

### What are the requirements for this app?

The Ingestion Alert app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later. 

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)! 

### How do I install the Ingestion Alert app?

1. Log in to your PostHog instance
2. Click 'Apps' on the left-hand tool bar
3. Search for 'Ingestion Alert' 
4. Select the app, press 'Install' and follow the on-screen instructions

### Why am I not getting ingestion alert notifications?

If you do not have a lot of users, or they are all based in the same timezone you may legitimately have 'dead periods' where no events are generated. To prevent such dead periods causing alerts you can increase the threshold. You can also use the [heartbeat app](https://github.com/PostHog/posthog-heartbeat-plugin) to trigger events during dead periods if you wish to only monitor the ingestion pipeline.

If an alert has already been triggered and ingestion has not recovered for an extended period, you will not receive another reminder that it is down.

This is helpful to monitor if there are any ingestion issues within your posthog instance and within your setup (e.g. using the wrong project key).

If the app server itself is down, this app will not be able to alert you that ingestion has stopped.

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Ingestion Alert app](https://github.com/PostHog/ingestion-alert-plugin) is available on GitHub. 

### Who created this app?

We'd like to thank PostHog team member [Marcus Hyett](https://github.com/marcushyett-ph) and former PostHog team member [Kunal](https://github.com/kpthatsme) for creating the Ingestion Alert app. 

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&template=bug_report.md) to let us know!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
