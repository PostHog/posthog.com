---
title: Patterns Connector
layout: app
github: https://github.com/PostHog/posthog-patterns-app
installUrl: https://app.posthog.com/project/apps?name=Patterns
thumbnail: ../../apps/thumbnails/patterns-logo.svg
tags:
    - patterns
---

### What is Patterns?

Patterns is a data science platform for building and deploying data pipelines, machine learning models, and complex automations. It’s built for data engineers, scientists, and analysts and abstracts away the overhead associated with setting up data infrastructure and having to configure many different tools. At the core is the Patterns protocol, a functional reactive declarative data pipelining framework that makes it easy to chain together Python and SQL scripts.

Use Patterns with PostHog to calculate metrics such as cohort churn, retention and customer LTV. Or, integrate your PostHog data with other sources such as your marketing data, email marketing tools, payment and billing systems.

### What does the Patterns Connector do?

The Patterns Connector enables you to send event data from PostHog, to Patterns. This is useful for a number of reasons, including centralizing data into a CDP, or using it to generate customer models.

###### What are the requirements for this app?

Using the Patterns Connector requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)!

You'll also need an account with [Patterns](https://www.patterns.app/).

### How do I install the Patterns Connector on PostHog?

This app requires PostHog 1.30.0 or above, or PostHog Cloud. You also need a Patterns account. 

1. Log in to your Patterns account and create a graph 
2. Add a webhook node to your graph
3. Copy the webhook URL from the sidebar
4. Log in to your PostHog instance
5. Click 'Apps' on the left-hand tool bar
6. Search for 'Patterns'
7. Select the app, press 'Install', then select the blue gear icon to begin configuration
8. Paste the URL in "Patterns Webhook URL" during app configuration.

You can install the connector via [the GitHub repo](https://github.com/PostHog/posthog-patterns-app). 

Once you’ve installed the app and configured the webhook, data will begin streaming into Patterns in real-time. Here is [an example app](https://studio.patterns.app/graph/o9mtaek8n33qasl1oa3a/nffx8k2ox23r0h5i6f6o/3evx4hiottnqeb0229ig?view=graph) you can clone that can be used to enrich, score, and prioritize new leads to your website —- this is common for optimizing a customer conversion funnel.

### Are there other ways to connect PostHog and Patterns?

Yes. You can also use the PostHog data extractor within Patterns to extract a full historical and incremental load of events. Check [this tutorial about connecting PostHog and Patterns](/tutorials/how-to-connect-patterns-and-posthog) for more information.

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Patterns Connector](https://github.com/PostHog/posthog-patterns-appn) is available on GitHub.

### Who created this app?

We'd like to thank the team at Patterns for creating this app. Thank you!

### Who maintains this app?

This app is maintained by the community. For more information, please [contact Patterns](https://www.patterns.app/). 

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
