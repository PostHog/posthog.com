---
title: Data pipeline
showTitle: true
---

Data pipeline includes transformations and destinations. Transformations extend PostHog's functionality by filtering and transforming data. Destinations sends PostHog data to other sources and includes [batch exports](/docs/cdp/batch-exports) which reliably send data to a destination on a schedule.

> Destinations require the data pipeline add-on in [your billing settings](https://us.posthog.com/organization/billing).

Pipelines can be used for a wide variety of use cases, such as:

- **Send event data to a data warehouse.** If you have a data lake or data warehouse, you can use destinations to send PostHog event data there, while ensuring you still have that data in PostHog to perform your analytics processes.

- **Enforce event schemas.** By default, PostHog does not enforce schemas on events it receives. However, an app could do so, preventing ingestion of events that do not match the specified schema in order to keep your data clean and following specific guidelines you need it to follow.

- **Label events.** To facilitate sorting through your events, you can use transformations to determine arbitrary logic to label an event (e.g. by setting a `label` property). This can help you tailor your metrics in PostHog, as well as facilitate data ordering if you ever use PostHog data elsewhere.
