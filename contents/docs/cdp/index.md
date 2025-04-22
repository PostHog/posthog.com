---
title: "Data pipelines: CDP integrations"
showTitle: true
---

Data pipeline provides a full-featured customer data platform (CDP) in PostHog, with full-service integrations for ingesting, transforming, and sending data to destinations:

- **Transformations** extend PostHog's functionality by filtering and transforming analytics data. 

- **Sources** let you [ingest data](/docs/cdp/sources) from your existing systems, and join them to existing person and event data using [data warehouse](/docs/data-warehouse). 

- **Destinations** send PostHog data to other sources in [realtime](/docs/cdp/destinations) or as [batch exports](/docs/cdp/batch-exports) which reliably send data to a destination on a schedule.

Destinations require the data pipeline add-on in [your billing settings](https://us.posthog.com/organization/billing).

## Billing for data pipelines

PostHog only charges for events that are successfully ingested and stored in ClickHouse. Events that are filtered out before reaching ClickHouse (such as those dropped by Data Pipeline Transformations) are not counted towards billing quotas. See our [event filtering and billing documentation](/handbook/growth/sales/billing#event-filtering-and-billing) for more details.

For more information about pricing and to estimate your costs, visit our [estimating usage and costs](/docs/billing/estimating-usage-costs#how-am-i-billed-for-data-pipelines) documentation.

## Use cases

Pipelines can be used for a wide variety of use cases, such as:

- **Send event data to a data warehouse.** If you have a data lake or data warehouse, you can use destinations to send PostHog event data there, while ensuring you still have that data in PostHog to perform your analytics processes.

- **Send event data via webhooks.** You can use our realtime destinations to send event data to external services through [webhooks](/docs/cdp/destinations/webhook). This is useful when you want to push event data to tools like [Slack](/docs/cdp/destinations/slack), [Hubspot](/docs/cdp/destinations/hubspot), or [Intercom](/docs/cdp/destinations/intercom).

- **Enforce event schemas.** By default, PostHog does not enforce schemas on events it receives. However, a transformation could do so, preventing ingestion of events that do not match the specified schema in order to keep your data clean and following specific guidelines you need it to follow.

- **Label events.** To facilitate sorting through your events, you can use transformations to determine arbitrary logic to label an event (e.g. by setting a `label` property). This can help you tailor your metrics in PostHog, as well as facilitate data ordering if you ever use PostHog data elsewhere.

- **Correlate costs with impact.** You can use the data warehouse to import cost data from sources like ads and cloud infrastructure platforms, and then use it in queries alongside product data to understand the impact and ROI of your spend. 

For a full list of transformations and destinations currently available, see the [destinations](https://us.posthog.com/pipeline/destinations) and [transformations](https://us.posthog.com/pipeline/transformations) tabs under data pipeline in-app.