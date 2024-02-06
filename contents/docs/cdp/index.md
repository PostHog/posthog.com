---
title: Customer data platform
sidebarTitle: Overview
sidebar: Docs
showTitle: true
---

Data connections include sources (data in) and destinations (data out), and are part of PostHog's CDP (officially coming soon). They allow anyone to extend and customize PostHog in order to better fit their needs.

> We have a [comprehensive library of data connections](/cdp), including data warehouses (Snowflake, BigQuery, Redshift) and marketing tools (HubSpot, Sendgrid, Customer.io, Salesforce).

Pipelines can be used for a wide variety of use cases, such as:

- **Sending the event data to a data warehouse.** If you have a data lake or data warehouse, you can use apps to send PostHog event data there, while ensuring you still have that data in PostHog to perform your analytics processes.
- **Pulling data from a third-party API to enrich the event.** Apps can pull in information like exchange rates, GeoIP location data, online reviews, and anything else you can think of and add it to your PostHog events, enriching the data to improve your analytics processes.
- **Adding your own data from other sources to PostHog.** In addition to pulling data from third-parties, you might also want to bring in data from your own sources, such as other tools and platforms you use. Read an example of this in [How to capture new RSS items (releases, blogs, status)](/tutorials/rss-item-capture).
- **Labeling events.** In order to facilitate sorting through your events, apps can be used to determine arbitrary logic that can label an event (e.g. by setting a `label` property). This can help you tailor your metrics in PostHog, as well as facilitate data ordering if you ever use PostHog data somewhere else.
- **Enforcing event schemas.** By default, PostHog does not enforce schemas on events it receives. However, an app could do so, preventing ingestion of events that do not match the specified schema in order to keep your data clean and following specific guidelines you need it to follow.

## Enabling connections

Head to "Data pipeline" on the left sidebar in the PostHog app. For batch exports or destinations, you also need to subscribe to the data pipeline add-on in [your billing settings](https://us.posthog.com/organization/billing).

If you're self-hosting, you can install a data connection by pasting a link to its public repository, or write your own app directly in PostHog.

## Self-host app troubleshooting

If you're having issues getting apps to work on your self-hosted instance of PostHog, check out our [troubleshooting guide](/docs/cdp/enabling).

## Next steps

- Can't find the one you're looking for? Consider [building your own](/docs/cdp/build)!
