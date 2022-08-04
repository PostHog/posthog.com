---
title: Email Scoring
github: https://github.com/PostHog/mailboxlayer-plugin
installUrl: https://app.posthog.com/project/apps?name=Posthog+Ingestion+Alert+Plugin
thumbnail: ../../apps/thumbnails/email-scoring.png
topics:
    - email-scoring
---

### What does the Email Scoring app do?

The Email Scoring app adds email scores to Persons in PostHog, giving you more context on each user. Email scores are added using the [Mailboxlayer API](https://mailboxlayer.com/).

### What are the requirements for this app?

The Email Scoring app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)!

You'll also need Mailboxlayer access and an API key.

### How do I install the Email Scoring app?

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'Email Scoring' and select the app, press Install.
3. Get an API key from Mailboxlayer.
4. Click '+ Install new app' and use this URL to install: `https://github.com/PostHog/mailboxlayer-plugin`
5. Add the API key to the config.
6. Enable the app and watch the email scores come in!

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Email Scoring app](https://github.com/PostHog/mailboxlayer-plugin) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team members [Yakko Majuri](https://github.com/yakkomajuri) and [Marius Andra](https://github.com/mariusandra) for creating the Email Scoring app.

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&template=bug_report.md) to let us know!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
