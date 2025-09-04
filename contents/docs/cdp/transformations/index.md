---
title: Realtime transformations
showTitle: true
---

As PostHog data arrives, you can transform it *immediately* before ingestion. You can use this for things like:

- Anonymizing sensitive data
- Enriching events with geo information
- Dropping unnecessary properties
<!-- - Writing custom transformations using our Hog programming language -->
- Filtering out bot traffic
- Much more.. 

PostHog enables you to transform your events in realtime using a variety of pre-built transformations. Check out the [data pipelines](https://us.posthog.com/pipeline/overview) tab and choose **transformations** to get started.

![Transformations list in PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/transformation_list_a15ad4e309.png)

Need more flexibility? Our [custom transformations](/docs/cdp/transformations/customizing-transformations) enable you to write your own Hog code to transform events exactly how you want. You can modify, enrich, or filter your events using our powerful Hog programming language.

**Note**: Transformations don't apply to exceptions we capture as part of the error tracking product. If you need to run transformation against your exception data, please [let us know in-app](https://us.posthog.com#panel=support%3Afeedback%3Aerror_tracking%3Alow%3Atrue).

## Filtering

Filters enable you to target your transformations, affecting only the kinds of events you chose. Filter by event type, properties, or any SQL statement you can come up with.

![Filtering transformations](https://res.cloudinary.com/dmukukwp6/image/upload/filters_b86669f2f9.png)

## Testing

As you build your transformations, PostHog makes it easy to confirm they do what you expect. Every transformation includes a built-in testing interface, enabling you to instantly send real data through it and verify the results. You can iterate until everything works to your satisfaction.

![Transformation testing UI](https://res.cloudinary.com/dmukukwp6/image/upload/testing_eb82d9f16b.png)

## Keep an eye on things

Once your transformation is up and running, the **metrics** and **logs** tabs will let you monitor usage and inspect any errors.

![Transformation logs](https://res.cloudinary.com/dmukukwp6/image/upload/logs_09fa698dd4.png)

![Transformation metrics](https://res.cloudinary.com/dmukukwp6/image/upload/metrics_7cf05cc3b8.png)

## History

For projects with the **[teams add-on](https://posthog.com/addons#teams)**, each transformation has a history tab that shows you a complete audit trail of changes. You can see who modified the transformation, what changes were made, and when they occurred.

![Transformation history](https://res.cloudinary.com/dmukukwp6/image/upload/history_e0873f6741.png)

This history helps you:
- Track changes over time
- Understand when and why modifications were made
- See who made specific changes

The history tab is particularly useful when multiple team members are working with transformations, as it provides transparency and accountability for all changes.

## Going deeper

If your needs are more specific than our defaults, try customizing your transformation's implementation. You can write, test, and deploy your own transformation in minutes.

Learn more about this in [customizing transformations](/docs/cdp/transformations/customizing-transformations).

## Creating transformations via API

You can also create and manage transformations programmatically using our API. This is particularly useful for automating your workflows, such as setting up new projects with predefined transformations.

To use the API, you'll need to:
1. Enable the `Hog functions` scope in your personal API key
2. Use the [Hog functions API endpoints](/docs/api/hog-functions#get-api-projects-project_id-hog_functions-id) to create your transformations. 

Here's an example of creating a new transformation:

```bash
# Create a new transformation
curl --location 'https://us.i.posthog.com/api/environments/:project_id/hog_functions' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <POSTHOG_PERSONAL_API_KEY>' \
--data '{
    "type": "transformation",
    "name": "Filter Out Plugin",
    "inputs": {},
    "enabled": true,
    "template_id": "plugin-posthog-filter-out-plugin"
}'
```

> **Important:** When creating a transformation from a template, make sure to use the correct `template_id`. You can find the available template IDs by making a GET request to `/api/projects/:project_id/hog_function_templates?types=transformation` or by checking the [Hog functions API documentation](https://us.posthog.com/api/schema/swagger-ui/#/environments/environments_hog_functions_list).

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
