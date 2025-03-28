---
title: Realtime transformations
showTitle: true
---

As PostHog data arrives, you can transform it *immediately* before ingestion. You can use this for things like:

- Anonymizing sensitive data
- Enriching events with geo information
- Dropping unnecessary properties
- Writing custom transformations using our Hog programming language
- Filtering out bot traffic
- Much more.. 

PostHog enables you to transform your events in realtime using a variety of pre-built transformations. Check out the [data pipeline tab](https://us.posthog.com/pipeline/overview) and choose **transformations** to get started.

![Transformations list in PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/transformation_list_ca5ad86095.png)

Need more flexibility? Our [custom transformations](/docs/cdp/transformations/customizing-transformations) enable you to write your own Hog code to transform events exactly how you want. You can modify, enrich, or filter your events using our powerful Hog programming language.

## Filtering

Instead of transforming all your PostHog events, you can construct a query that filters by event types, properties, or any SQL statement you can come up with, so that transformations are only applied to the events you care about.

![Filtering transformations](https://res.cloudinary.com/dmukukwp6/image/upload/filters_738b8029fa.png)

## Testing

The hardest part of setting up transformations is making sure they work as you expect. Every transformation includes a built-in testing interface, enabling you to send real data through your transformation and see exactly how it affects your events.

![Transformation testing UI](https://res.cloudinary.com/dmukukwp6/image/upload/testing_e2e0faf8f3.png)

## Keep an eye on things

Once your transformation is up and running, the **metrics** and **logs** tabs will let you monitor usage and inspect any errors.

![Transformation logs](https://res.cloudinary.com/dmukukwp6/image/upload/logs_6cb6791b85.png)

![Transformation metrics](https://res.cloudinary.com/dmukukwp6/image/upload/metrics_ca7bd7dd92.png)

## History

Every transformation has a history tab that shows you a complete audit trail of changes. You can see who modified the transformation, what changes were made, and when they occurred.

![Transformation history](https://res.cloudinary.com/dmukukwp6/image/upload/history_97f854fa50.png)

This history helps you:
- Track changes over time
- Understand when and why modifications were made
- See who made specific changes

The history tab is particularly useful when multiple team members are working with transformations, as it provides transparency and accountability for all changes.

## Going deeper

For complete control of your transformation's behavior, you can view and edit the underlying Hog code that drives it. Experiment with rewriting your transformation's implementation to better address your needs, if the pre-built templates don't quite do the job.

Learn more about this in [customizing transformations](/docs/cdp/transformations/customizing-transformations).

### How many events can I transform?

There is no limit on the number of events to be transformed - transformations are completely free! However, the system requires that transformations perform efficiently and don't consume excessive resources (don't worry we have built some rail guards into that and let you know if something is funky).

### What can cause a transformation to be automatically disabled?

If the transformation performs poorly (too many errors, too slow, or consumes too much memory) for a prolonged period, your transformation will be quarantined and eventually disabled. We will try to re-enable it automatically after a temporary disabled period before stopping it entirely. You then need to modify either the filters or the transformation and re-enable it in the UI to try again.

The key metrics that we observe to determine poor performance are:
1. Errors thrown within the code (for example if you try to access a property that doesn't exist).
2. Excessive memory usage or processing time. While some complex transformations are fine, if your transformation consistently takes too long or uses too much memory, we will eventually disable it to protect our systems.
3. Repeatedly slow transformations. Some slow transformations are fine, but if your transformation consistently can't keep up, we will eventually disable it to protect our systems.

### How do you handle errors?

By default, if a transformation encounters an error, we will log the error and continue processing other events. This ensures that a single problematic event doesn't block the processing of all other events. We may modify this logic as we make improvements to try and balance reliability and speed.
