---
title: Creating views
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
---

In the PostHog data warehouse, you can save your most used queries as **views** and reference them in subsequent queries.

## Creating a view

Query views are created directly inside SQL insights. If the query has valid view characteristics, the "Save as view" button is enabled. When clicked, you are prompted to give the view a name which can then be referenced in other queries. 

For a query to be a valid view, all fields being accessed must be aliased (with the SQL `as` keyword). The alias names are how you access the fields on the view. This also means that we cannot use `SELECT *...` type SQL syntax for a query we would like to be a view since none of the columns are aliased.

> **Note:** Nested views are supported. You can create a view based on other views.

![valid view](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/features/data-warehouse/valid-view.png)

## Materializing and scheduling a view

Views can be materialized and stored in the PostHog data warehouse. This means that the view is precomputed, which can significantly improve query performance.

To materialize a view, go to the [SQL editor](https://us.posthog.com/sql), select the **Materialize** option or the lighting bolt tab, click **Save and materialize**, and give it a name without spaces. You can then query the view like any other table.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_06_19_at_16_12_28_2x_db1e37a5cf.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_06_19_at_16_12_44_2x_90bd8f28ca.png"
  alt="Materialize view"
  classes="rounded"
/>

After you create a view, you can also schedule it to be updated at a specific interval. This is useful when you have a view that is used frequently, and you want to ensure that the data synced at a specified cadence. For example, a materialized view can be scheduled for an expensive query that is used in multiple dashboards (like with [API queries](/docs/api/queries)).

![materialized view](https://res.cloudinary.com/dmukukwp6/image/upload/ph_materialization_a3dd7dfb0b.png)

### Tips for Materialization

- The purpose of materialization is to speed up queries, so you don't need to materialize views that are already fast.

- You can materialize only the slow part of a larger query, like a `with` expression or a subquery. Often times, materializing a subset of a larger query is a good way to create a resource that's usable for various different places within PostHog, including insights and other data warehouse views.

- Datasets generated from materialized views are only going to update at the specified intervals and not in real-time. This means that if you have a view that is used in a dashboard or relied upon for another query, the dashboard will not update until the materialized view is updated. We offer a 5-minute refresh interval, but if the query takes longer than that to execute, it will only be updated once the query is finished and rerun at the next 5-minute interval.

- Materialization runs have more compute and memory resources allocated to them than standard queries, but they still can timeout for inefficient queries. We time out after 1 hour of processing time.

## Extending PostHog models with views

Views are a powerful tool for extending existing PostHog models for easier data access. For example, if you wanted to associate your Stripe customer data with product usage data of your users, you would normally need to manually set up a join. With views, you can attach views to PostHog models so that you can directly access those fields on the PostHog table. 

To link a view to a PostHog table, go to the [data warehouse section](https://app.posthog.com/data-warehouse/posthog), select the PostHog tab, and click "Link table to view." Select your tables, keys to join, and press save. Once done, when you query that PostHog table, you can access the data from your view.

![view link](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/features/data-warehouse/view-link.png)
