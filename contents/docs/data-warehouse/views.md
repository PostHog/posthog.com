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

### Creating a view

Query views are created directly inside SQL insights. If the query has valid view characteristics, the "Save as view" button is enabled. When clicked, you are prompted to give the view a name which can then be referenced in other queries. 

For a query to be a valid view, all fields being accessed must be aliased (with the SQL `as` keyword). The alias names are how you access the fields on the view. 

> **Note:** Currently, nested views are not supported. You cannot create a view based on other views, only base PostHog models.

![valid view](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/features/data-warehouse/valid-view.png)

### Extending PostHog models with views

Views are a powerful tool for extending existing PostHog models for easier data access. For example, if you wanted to associate your Stripe customer data with product usage data of your users, you would normally need to manually set up a join. With views, you can attach views to PostHog models so that you can directly access those fields on the PostHog table. 

To link a view to a PostHog table, go to the [data warehouse section](https://app.posthog.com/data-warehouse/posthog), select the PostHog tab, and click "Link table to view." Select your tables, keys to join, and press save. Once done, when you query that PostHog table, you can access the data from your view.

![view link](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/features/data-warehouse/view-link.png)
