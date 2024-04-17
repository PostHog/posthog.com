---
title: Google Cloud Storage
github: 'https://github.com/PostHog/posthog-gcs-plugin'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/gcs-export.png
tags:
  - gcs-export
---

import Requirements from "./_snippets/requirements.mdx"
import FeedbackQuestions from "./_snippets/feedback-questions.mdx"
import PostHogMaintained from "./_snippets/posthog-maintained.mdx"
import ExportDisabled from "./_snippets/export-disabled.mdx"

<ExportDisabled />

Send events from PostHog to a Google Cloud Storage bucket upon ingestion.

<Requirements />

You'll also need access to the Google Cloud Storage bucket you want to export to.

## Installation

Before installing the Google Cloud Storage Export destination, you will need your Google Cloud .json file. Find out how to get this in [Google's BigQuery API documentation](https://cloud.google.com/bigquery/docs/reference/libraries).

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/apps)" tab in the left sidebar.
2. Search for 'GCS' and select the destination, press Install and proceed to Configuration.
3. Upload your Google Cloud key .json file.
4. Enter your Project ID.
5. Enter your bucket name.

## Configuration

<AppParameters />

## FAQ

### Is the source code for this destination available?

PostHog is open-source and so are all destinations on the platform. The [source code](https://github.com/PostHog/posthog-gcs-plugin) is available on GitHub.

### Who created this destination?

We'd like to thank PostHog team member [Yakko Majuri](https://github.com/yakkomajuri) for creating this. Thanks, Yakko!

<PostHogMaintained />

<FeedbackQuestions />
