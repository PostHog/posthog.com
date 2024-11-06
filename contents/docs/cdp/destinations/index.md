---
title: Realtime analytics data exports
showTitle: true
---

> Destinations require the data pipeline add-on in [your billing settings](https://us.posthog.com/organization/billing).

## Template library

To get started, you can create a new destination from the [Data pipelines](https://us.posthog.com/pipeline/destinations) page and choose from a range of available **templates**. Depending on the destination, there are a range of configuration options, such as credentials needed or where to find certain properties from the event being processed. 

## Input formatting

Any configuration input for a destination can have its values formatted using our [Hog](/docs/hog) language to include data from the `event`, `person` and more.

You can template any input using curly brackets `{}`. Many inputs default to a formatted value indicating a recommended configuration that you can modify if needed. 

For example given the incoming event:

```ts
{
    event: {
        name: "$pageview",
        properties: {
            $current_url: "https://posthog.com"
        }
    },
    person: {
        name: "max@posthog.com",
        properties: {
            email: "max@posthog.com",
            first_name: "Max",
            last_name: "the Hedgehog"
        }
    }
}
```

You can create a template such as this:

```
{event.name} was triggered by {person.properties.first_name} {person.properties.last_name}

// Outputs: $pageview was triggered by Max the Hedgehog
```

### Global object

Below is a the structure of the global variables available whenever templating a destination.

```ts
{
    event: {
        uuid: string // The unique ID of the event
        name: string // The event name (e.g. $pageview)
        distinct_id: string // The distinct_id of the identity that created the event
        properties: Record<string, any>
        timestamp: string
        url: string // A URL to view it in PostHog
    }
    person?: {
        uuid: string // The UUID of the Person associated with the distinct_id of the event
        name: string // Configured based on your "Display name" property in PostHog
        url: string  // A URL to view it in PostHog
        properties: Record<string, any>
    }
    groups?: {
        [id: string]: {
            id: string
            type: string
            index: number
            url: string  // A URL to view it in PostHog
            properties: Record<string, any>
        }
    }
    project: {
        id: number  // The ID of the PostHog project
        name: string  // The name of the PostHog project
        url: string  // A URL to view it in PostHog
    }
    source?: {
        name: string // The name of the source (typically the destination name)
        url: string  // A URL to view it in PostHog
    }
}
```

## Testing it out

Once you have saved your destination, you can test it by invoking it with an example payload. You can choose whether to mock out the `async` calls (e.g. HTTP API calls) or not.

> **⚠️ Warning:** If you do not mock out the API call, it will call your destination. Make sure this is definitely okay and check your example data so that you don't mess up your production data.

## Advanced - custom code

For most use cases, we recommend using one of the templates. These take care of a lot of the logic for you and expose simple inputs for you to configure. 

You can, however, modify any destination by clicking the `show source code` option. From here you can modify the inputs (for example marking an input as secret so that it is encrypted) or the code of the function itself.

The code is written in our Hog language with further documentation of available features [here](/docs/hog). The majority of destinations are simply wrappers around `fetch` - a provided function for safely doing async, retriable HTTP calls.

```rust
let res := fetch(inputs.url, {
  'headers': inputs.headers,
  'body': inputs.body,
  'method': inputs.method
});

if (res.status >= 400) {
  print('Bad response', res.status, res.body)
}
```

### Guidelines

- **Start from an existing template:** Check out existing templates that are close to your kind of use case and work from there.

- **Rely on filters:** Offload as much as possible to the built in `filters` and `inputs`. This will make modifying your destination later much simpler (as well as being more performant)

- **Use `inputs` wherever possible:** These are great for secrets such as API credentials. You can mark them as secret and they will not be returned to the UI in the future and will be encrypted.

- **Keep it short:** We have tight controls on execution time, memory usage etc.

- **Do not do more than 2 `fetch` calls:** The function will error if you do. If you have a need for more than 2 calls, please [contact support](https://us.posthog.com/#panel=support%3Asupport%3Aapps%3A%3Atrue).

## FAQ

### How up-to-date is the person information?

The `person` object contains the latest information for the [person profile](/docs/data/persons) associated with the `distinct_id` of the event **at the time the event is processed**. You should make sure to use events that occur on or after person properties would be merged (such as `$identify`) if you need this information for your event.

### How many events can I send to a destination?

There is no limit on the number of events to be processed but the system requires that the destination responds with healthy status codes (2xx) and in a timely fashion. 

If the destination performs poorly (too many errors, too slow) for a prolonged period, your destination will be quarantined and eventually disabled. We will try to re-enable it automatically after a temporary disabled period before stopping it entirely. You then need to modify either the filters or the destination and re-enable it in the UI to try again.
