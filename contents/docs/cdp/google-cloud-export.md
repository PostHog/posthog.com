---
title: Google Cloud Storage
github: https://github.com/PostHog/posthog-gcs-plugin
thumbnail: ../../cdp/thumbnails/gcs-export.png
tags:
    - gcs-export
---

> This app is currently unavailable while we develop [a new export system](https://github.com/PostHog/posthog/issues/15997). It will be back again soon!

Send events from PostHog to a Google Cloud Storage bucket upon ingestion.

## Requirements

This requires either PostHog Cloud with the data pipeline add-on, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

You'll also need access to the Google Cloud Storage bucket you want to export to.

## Installation

Before installing the Google Cloud Storage Export app, you will need your Google Cloud .json file. Find out how to get this in [Google's BigQuery API documentation](https://cloud.google.com/bigquery/docs/reference/libraries).

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'GCS' and select the app, press Install and proceed to Configuration.
3. Upload your Google Cloud key .json file.
4. Enter your Project ID.
5. Enter your bucket name.

## Configuration

<AppParameters />

## FAQ

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code](https://github.com/PostHog/posthog-gcs-plugin) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team member [Yakko Majuri](https://github.com/yakkomajuri) for creating this. Thanks, Yakko!

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 