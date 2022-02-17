---
title: Plugins
sidebarTitle: Overview
sidebar: Docs
showTitle: true
---

Plugins extend PostHog's functionality by either pulling data into or sending data out of PostHog. They allow anyone to extend and customize PostHog in order to better fit their needs. 

Plugins can be used for a wide variety of use cases, such as:

- **Sending the event data to a data warehouse.** If you have a data lake or data warehouse, you can use plugins to send PostHog event data there, while ensuring you still have that data in PostHog to perform your analytics processes.
- **Pulling data from a third-party API to enrich the event.** Plugins can pull in information like exchange rates, GeoIP location data, online reviews, and anything else you can think of and add it to your PostHog events, enriching the data to improve your analytics processes.
- **Adding your own data from other sources to PostHog.** In addition to pulling data from third-parties, you might also want to bring in data from your own sources, such as other tools and platforms you use.
- **Labeling events.** In order to facilitate sorting through your events, plugins can be used to determine arbitrary logic that can label an event (e.g. by setting a `label` property). This can help you tailor your metrics in PostHog, as well as facilitate data ordering if you ever use PostHog data somewhere else.
- **Enforcing event schemas.** By default, PostHog does not enforce schemas on events it receives. However, a plugin could do so, preventing ingestion of events that do not match the specified schema in order to keep your data clean and following specific guidelines you need it to follow.

> We have a comprehensive library of plugins which you can check out on our [Integrations](/integrations) page, including data warehouses (Snowflake, BigQuery, Redshift) and marketing tools (HubSpot, Sendgrid, Customer.io, Salesforce). 

## Enabling plugins

Head to 'Project' -> 'Plugins' on the left sidebar in the PostHog app:

<img width="1912" alt="Screenshot 2022-02-17 at 14 57 40" src="https://user-images.githubusercontent.com/70321811/154508116-d97d2dc5-4fd5-48bd-be1e-6930a87c52bc.png">

Here you can install official PostHog plugins, install a custom plugin by pasting a link to its public repository, or write your own plugin directly in PostHog.

## Self-host plugin troubleshooting

If you're having issues getting plugins to work on your self-hosted instance of PostHog, check out our [troubleshooting guide](/docs/plugins/enabling).

## Next steps

- Learn more about how plugins work in our detailed [plugins manual](/docs/user-guides/plugins).
- Can't find the one you're looking for? Consider [building your own](/docs/plugins/build)!
