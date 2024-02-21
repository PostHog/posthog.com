---
title: Troubleshooting and FAQs
---

## How do I capture data from another application?

We depreciated the functionality of apps that enabled you to capture data from other tools. Functionally, these apps were similar to a cron which ran every minute (or more) and pulled data from another tool.

There are two options for recreating these functionality:

1. **Set up a cron of your own**. You can use a tool like [val.town](https://val.town/) to easily set up scheduled tasks that capture data from other tools and send it to PostHog. Our tutorials on [capturing new RSS items](/tutorials/rss-item-capture) and [events from Calendly webhooks](/tutorials/calendly-webhooks) are examples of this.

2. **Use our data warehouse**. PostHog's data warehouse enables you to import and use data from apps like Stripe, Hubspot, and Postgres natively in PostHog. See our [docs](/docs/data-warehouse) for more information.

## How do track when users do an event for the first time?

There are a few ways to capture a user doing an event for the first time. We cover a few of these in our tutorials on [tracking new and returning users](/tutorials/track-new-returning-users) and [first touch attribution](/tutorials/first-last-touch-attribution).

- Create a cohort matching users who have done an event for the first time recently.
- Use a custom event to set a person or event property. For example, you can set a `first_seen` property with the `$set_once` option.
- Use HogQL to query for the `min(timestamp)` of an event.

## How do I migrate 20M+ events or rows into PostHog?

If you're migrating a large amount of data (20 million rows or 10k requests per minute), please contact [sales@posthog.com](mailto:sales@posthog.com) to make sure you aren't rate limited.

See [our migration docs](/docs/migrate/ingest-historic-data) for more information.

## How do I do real time exports?

We don't currently support real time exports. If you need more than the hourly interval [batch exports](/docs/cdp/batch-exports) provide, check out and support our [webhook issue](https://github.com/PostHog/posthog/issues/16976) on GitHub and let us know via the [in-app support modal](https://us.posthog.com/#panel=support%3Asupport%3Adata_management%3Alow).

## Self-host app troubleshooting

If you're self-hosting, you can install a data connection by pasting a link to its public repository, or write your own app directly in PostHog.

If you're having issues getting apps to work on your self-hosted instance of PostHog, check out our [troubleshooting guide](/docs/cdp/enabling).
