---
title: Airbyte Export documentation
showTitle: true
topics:
    - airbyte
---

### What does the Airbyte Export app do?

This Airbyte Export app sends data from PostHog, to Airbyte. It supports both Full Refresh and Incremental syncs. You can choose if this app will copy only the new or updated event data, or all rows in the tables and columns you set up for replication, every time a sync is run.

###### What are the requirements for this app?

Using the Airbyte Export app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later. 

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)! 

##### How do I get started with the Airbyte Export app?

The Airbyte app is an API integration. You will need to get a [PostHog Personal API key](https://posthog.com/docs/api) in order to [connect Airbyte as a data destination](https://docs.airbyte.com/integrations/sources/posthog/).

#### What output schema is available?

This app is capable of syncing the following streams: 

- Annotations
- Cohorts
- Events
- FeatureFlags
- Insights
- InsightsPath
- InsightsSessions
- Persons
- Trends

For more information, please check [Airbyte's integration documentation](https://docs.airbyte.com/integrations/sources/posthog/).

### Where can I find out more?

Check [PostHog's API documentation](https://posthog.com/docs/api) for more information on pulling and pushing data from/to our API. Further information about Airbyte's connector is available in [Airbyte's integration documentation](https://docs.airbyte.com/integrations/sources/posthog/).

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

### What if my question isn't answered above?

You can [join the PostHog Community Slack group](/slack) to ask more questions, or get advice on developing your own PostHog apps.