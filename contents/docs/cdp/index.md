---
title: Data pipeline
showTitle: true
---

Data pipeline includes apps and batch exports. Apps extend PostHog's functionality by filtering and transforming data, as well as sending it to destinations. [Batch exports](/docs/cdp/batch-exports) reliably send data to a destination on a schedule.

> Destination apps and batch exports require the data pipeline add-on in [your billing settings](https://us.posthog.com/organization/billing).

Pipelines can be used for a wide variety of use cases, such as:

- **Sending the event data to a data warehouse.** If you have a data lake or data warehouse, you can use apps to send PostHog event data there, while ensuring you still have that data in PostHog to perform your analytics processes.

- **Pulling data from a third-party API to enrich the event.** Apps can pull in information like exchange rates, GeoIP location data, online reviews, and anything else you can think of and add it to your PostHog events, enriching the data to improve your analytics processes.

- **Labeling events.** In order to facilitate sorting through your events, apps can be used to determine arbitrary logic that can label an event (e.g. by setting a `label` property). This can help you tailor your metrics in PostHog, as well as facilitate data ordering if you ever use PostHog data somewhere else.

- **Enforcing event schemas.** By default, PostHog does not enforce schemas on events it receives. However, an app could do so, preventing ingestion of events that do not match the specified schema in order to keep your data clean and following specific guidelines you need it to follow.