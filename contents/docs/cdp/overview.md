---
title: Destinations 3000
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/airbyte.png
tags:
  - airbyte
---

import Requirements from "./_snippets/requirements.mdx"
import FeedbackQuestions from "./_snippets/feedback-questions.mdx"
import ExportDisabled from "./_snippets/export-disabled.mdx"

<ExportDisabled />

The Airbyte export sends data from PostHog, to Airbyte. It supports both Full Refresh and Incremental syncs. You can choose if it copies only the new or updated event data, or all rows in the tables and columns you set up for replication, every time a sync is run.

<Requirements />

## Getting started

The Airbyte export is an API integration. You will need to get a [PostHog Personal API key](https://posthog.com/docs/api) in order to [connect Airbyte as a data destination](https://docs.airbyte.com/integrations/sources/posthog/).

## Output schema

This destination is capable of syncing the following streams:

-   Annotations
-   Cohorts
-   Events
-   FeatureFlags
-   Insights
-   InsightsPath
-   InsightsSessions
-   Persons
-   Trends

For more info, please check [Airbyte's integration documentation](https://docs.airbyte.com/integrations/sources/posthog/).

## FAQ

### Where can I find out more?

Check [PostHog's API documentation](https://posthog.com/docs/api) for more information on pulling and pushing data from/to our API. Further information is available in [Airbyte's integration documentation](https://docs.airbyte.com/integrations/sources/posthog/).

### Who maintains this destination?

This destination is maintained by Airbyte. For more information, check [Airbyte's integration documentation](https://docs.airbyte.com/integrations/sources/posthog/).

<FeedbackQuestions />