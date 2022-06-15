---
title: LaunchDarkly Connector documentation
showTitle: true
topics:
    - launchdarkly
---

### What does the LaunchDarkly Connector do?
This app exports actions — such as toggling a feature flag —  from LaunchDarkly and into PostHog via the API. 

This is useful for analyzing LaunchDarkly events using PostHog's product analytics suite and alongside other product data.

###### What are the requirements for this app?
Using the LaunchDarkly connector requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later. 

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)!

You'll also need a LaunchDarkly account, obviously.

##### How do I get started with the LaunchDarkly Connector?

A full explanation of how to install and configure this app through LaunchDarkly is available in [LaunchDarkly's PostHog integration documentation](https://docs.launchdarkly.com/integrations/posthog).

To set up the app correctly, you need some information from PostHog. Specifically, your PostHog's instance URL, and an API Token.

If you are using PostHog Cloud, your Instance URL will be: `https://app.posthog.com`. Alternatively, insert the domain of your self-hosted PostHog instance.

To obtain an API Key, follow the steps below:

1. Log in to your PostHog account.
2. Open the Project you want to integrate.
3. Navigate to **Project Settings**.
4. Find your **Project API Key** listed in the page.

#### How are events imported to PostHog?
Events from LaunchDarkly are automatically sent to the PostHog API with the following schema:

```
{
"event": "string",
"properties": {
"launchDarklyEventId": "string",
"launchDarklyEventAccountId": "string",
"launchDarklyEventType": "string",
"comment": "string",
"distinct_id": "string",
"email": "string",
"firstName": "string",
"lastName": "string",
"title": "string"
},
"timestamp": "rfc3339 timestamp"
}
```

### Where can I find out more?
You can find out more about this app via [LaunchDarkly’s integration documentation](https://docs.launchdarkly.com/integrations)

### Who created this app?
We'd like to thank PostHog team member Emanuele Capparelli for creating the LaunchDarkly Connector even before he'd joined the team full-time. Thanks!

### Who maintains this app?
This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&template=bug_report.md) to let us know!

### What if I have feedback on this app?
We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

### What if my question isn't answered above?
We love answering questions. Ask us anything via [our FAQ page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.