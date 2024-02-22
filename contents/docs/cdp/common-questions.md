---
title: Troubleshooting and FAQs
---

## My app isn't working, what do I do?

1. Checking that the app is enabled with the correct configuration options in the [data pipeline tab](https://us.posthog.com/apps).
2. Click "Logs & metrics" and go to the `processEvent metrics` tab to check that the app is processing events without errors.
3. Check the `Logs` tab to see if there are any errors.
4. Go to the data management tab to check if there any [ingestion warnings](https://us.posthog.com/data-management/ingestion-warnings).
5. If the app relates to an external service, check that the external service is working correctly. Make a request to the relevant API endpoint or use a tool like [webhook.site](https://webhook.site/).

## How do I capture data from another application?

We deprecated the functionality of PostHog apps that enable you to capture data from other tools. Functionally, these apps were a cron which ran every minute (or more) and pulled data from another tool.

There are two options for recreating this functionality:

1. **Set up a cron of your own**. You can use a tool like [val.town](https://val.town/) to easily set up scheduled tasks that capture data from other tools and send it to PostHog. Our tutorials on [capturing new RSS items](/tutorials/rss-item-capture) and [events from Calendly webhooks](/tutorials/calendly-webhooks) are examples of this.

2. **Use our data warehouse**. PostHog's data warehouse enables you to import and use data from apps like Stripe, Hubspot, and Postgres natively in PostHog. See our [docs](/docs/data-warehouse) for more information.

## How do I track when users do an event for the first time?

There are a few ways to capture a user doing an event for the first time. We cover a few of these in our tutorials on [tracking new and returning users](/tutorials/track-new-returning-users) and [first touch attribution](/tutorials/first-last-touch-attribution).

- Create a cohort matching users who have done an event for the first time recently.
- Use a custom event to set a person or event property. For example, you can set a `first_seen` property with the `$set_once` option.
- Use HogQL to query for the `min(timestamp)` of an event.

## How do I migrate 20M+ events or rows into PostHog?

If you're migrating a large amount of data (20 million rows or 10k requests per minute), please contact [sales@posthog.com](mailto:sales@posthog.com) to make sure you aren't rate limited.

See [our migration docs](/docs/migrate/ingest-historic-data) for more information.

## How do I do real time exports?

We don't currently support real time exports. 

If you need more than the hourly interval [batch exports](/docs/cdp/batch-exports) and are on the enterprise plan, please contact our team (or email [sales@posthog.com](mailto:sales@posthog.com)). 

If you're not on the enterprise plan, check out our [webhook issue](https://github.com/PostHog/posthog/issues/16976) on GitHub.

## Self-host app troubleshooting

If you're self-hosting, you can install a data connection by pasting a link to its public repository, or write your own app directly in PostHog.

If you're having issues getting apps to work on your self-hosted instance of PostHog, check out our [troubleshooting guide](/docs/cdp/enabling).
