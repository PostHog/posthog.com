---
title: Plugin Architecture
sidebar: Docs
showTitle: true
---

When an event is sent to PostHog, it is added to a task queue, after which it is picked up by a worker that processes and ingests the event, storing it into the database. 

When plugins are enabled, an extra step is added to the pipeline. Instead of creating `process_event` tasks that ingest the event, `process_event_with_plugins` tasks are created first, processed by a Node.js server, and then added back into the pipeline as `process_event` tasks.

This makes it so that our Celery workers continue to handle `process_event` tasks without any knowledge that an extra step has been added to the pipeline, making it easy to turn plugins off and circumvent that step.

Essentially, before an event is added to the database, plugins have access to the event, being able to modify it, prevent ingestion, or send the data somewhere else.

### Example Plugin

Configuration aside, a simple plugin might look like this:

```js
// Special function that processes event from the queue
async function processEvent(event) {

    // Add an additional property to the event
    if (event.properties) event.properties['hello'] = 'world'

    // Return the modified event
    return event
}
```

This plugin has 3 key parts:

- The `processEvent` function, which is a special function name used by PostHog to find the logic each plugin applies to the event.
- Logic that uses the event, in this case to add a property `hello` with value `world` to it. This logic can add properties to the event that are either hard-coded, configuration-based, or dynamically-loaded, as well as use that event for something else, like triggering an API call or sending the data somewhere else.
- A return statement, which will most often return a modified event, but could also not return anything (`void`), to prevent the event from being ingested.
