---
title: Taxonomy Standardizer
installUrl: https://app.posthog.com/project/apps?name=Taxonomy+Plugin
github: https://github.com/PostHog/taxonomy-plugin
thumbnail: ../../apps/thumbnails/taxonomy-standardizer.png
tags:
    - taxonomy-standardizer
---

### What does the Taxonomy Standardizer app do?

This app standardizes all your event names into a single pattern, so that data becomes more consistent and marketing teams aren't driven wild.

### What taxonomies are supported?

This app can convert from any of these taxonomies, to any other.

-   Camel Case: `helloThereHedgehog`
-   Pascal Case: `HelloThereHedgehog`
-   Snake Case: `hello_there_hedgehog`
-   Kebab Case: `hello-there-hedgehog`
-   Spaces: `hello there hedgehog`

### What are the requirements for this app?

The Taxonomy Standardizer requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

### How do I install the Taxonomy Standardizer app?

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'Taxonomy Standardizer' and select the app, press Install.
3. Follow the on-screen steps to configure the app.

### Configuration

<AppParameters />

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Taxonomy Standardizer](https://github.com/PostHog/taxonomy-plugin) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team member [Yakko Majuri](https://github.com/yakkomajuri) for creating the Taxonomy Standardizer. Thank you, Yakko!

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&template=bug_report.md) to let us know!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
