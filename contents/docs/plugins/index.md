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

## Plugin chains

Chains are an important part of how plugins work in PostHog. This is because most plugins act on _single events_ coming in to PostHog, meaning the output of one plugin will go into the next plugin - creating a chain. 

The [GeoIP plugin](/integrations/geoip) is an example of a plugin which adds information to single events. Specifically, it adds geographical information based on the user IP address.

By running a second plugin after the GeoIP plugin, we create a plugin chain. Here's an example of how this can look for an individual event when a second plugin (which simply adds ```Hello: "world"``` to the event) runs after the GeoIP plugin. 

![GeoIP Plugin Example](../../images/plugins/geoip-plugin-example.png)

Plugin chains are important because they control what the event looks like _before_ it is stored. If you want to remove certain properties out of an event with the [Property Filter plugin](/integrations/property-filter), for example, it is best to have it run at the end of the plugin chain so that all unwanted properties can be filtered out before storage.

## Integrations with external system

Plugins on PostHog can also enable you to integrate with external systems, such as data warehouses or CRMs. 

For example, a plugin can send an event to AWS S3 whenever it is seen in PostHog. Indeed, the [S3 plugin](/plugins/s3-export) does exactly that. In this case, it doesn't matter if the S3 export succeeds or not, the event will always be stored.

Here's how this can look:

![S3 Plugin Example](../../images/plugins/s3-plugin-example.png)

As before, it is important to bear in mind how plugin chains work. If you wanted the event stored on S3 to contain GeoIP information, for example, then the GeoIP plugin must run _before_ the S3 plugin. 

## Enabling plugins

Head to 'Project' -> 'Plugins' on the left sidebar in the PostHog app. Here you can install official PostHog plugins, install a custom plugin by pasting a link to its public repository, or write your own plugin directly in PostHog.

## Self-host plugin troubleshooting

If you're having issues getting plugins to work on your self-hosted instance of PostHog, check out our [troubleshooting guide](/docs/plugins/enabling).

## Next steps

- Learn more about how plugins work in our detailed [plugins manual](/docs/user-guides/plugins).
- Can't find the one you're looking for? Consider [building your own](/docs/plugins/build)!
