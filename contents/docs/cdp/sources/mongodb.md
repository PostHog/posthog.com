---
title: Linking MongoDB as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
---

The MongoDB connector can link your mongodb tables to PostHog.

To link MongoDB:

1. Go to the [Data pipeline page](https://us.posthog.com/pipeline/sources) and the sources tab in PostHog
2. Click **New source** and select MongoDB
3. Enter your mongodb connection string
4. Click **Link**

Once the syncs are complete, you can start using MongoDB data in PostHog.

> **Note:** MongoDB data is unstructured so the returned columns are an `_id` field and a `data` column that contain the entire document contents. Data fields can be selected with dot notation (e.g. `data.field1`)