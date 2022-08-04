---
title: Google Cloud Export
github: https://github.com/PostHog/posthog-gcs-plugin
installUrl: https://app.posthog.com/project/apps?name=GCS+Export
thumbnail: ../../apps/thumbnails/gcs-export.png
topics:
    - gcs-export
---

### What does the Google Cloud Storage Export app do?

The Google Cloud Storage Export app enables you to send events from PostHog to a Google Cloud Storage bucket upon ingestion.

### What are the requirements for this app?

The Google Cloud Storage Export app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)!

You'll also need access to the Google Cloud Storage bucket you want to export to.

### How do I install the PostgreSQL Export app?

Before installing the Google Cloud Storage Export app, you will need your Google Cloud .json file. Find out how to get this in [Google's BigQuery API documentation](https://cloud.google.com/bigquery/docs/reference/libraries).

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'GCS' and select the app, press Install and proceed to Configuration.
3. Upload your Google Cloud key .json file.
4. Enter your Project ID.
5. Enter your bucket name.

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Google Cloud Storage Export app](https://github.com/PostHog/posthog-gcs-plugin) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team member [Yakko Majuri](https://github.com/yakkomajuri) for creating the Google Cloud Storage Export app. Thanks, Yakko!

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&template=bug_report.md) to let us know!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
