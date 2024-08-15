---
title: Realtime destinations
showTitle: true
---

> Our new realtime destinations are in <b>preview</b>. You can opt in to try them out in the [Feature previews panel](https://us.posthog.com/#panel=feature-previews). Destinations require the data pipeline add-on in [your billing settings](https://us.posthog.com/organization/billing).


### Template library

To get started, you can create a new Destination from the [Pipeline destinations](https://us.posthog.com/pipeline/destinations) page and choose from a range of available <b>Templates</b>. Depending on the destination there will be a range of configuration options, such as credentials needed or where to find certain properties from the event being processed. 

### Input formatting

Any configuration input for a destination can have its values formatted using our Hog language to include data from the `event`, `person` and more.

You can template any input using curly brackets `{}`. Many inputs will default to a formatted value indicating a recommended configuration that you can modify if needed. 

For example given the incoming event:

```typescript
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

you can create a template such as this:

```
{event.name} was triggered by {person.properties.first_name} {person.properties.last_name}

// Outputs: $pageview was triggered by Max the Hedgehog
```


#### Global object

Below is a the structure of the global variables available whenever templating a destination.

```typescript
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

### Testing it out

Once you have saved your destination, you can test it by invoking it with an example payload. You can choose whether to mock out the `async` calls (e.g. HTTP API calls) or not.

> WARNING: If you do not mock out the API call then it will call your destination! Make sure this is definitely okay and check your example data so that you don't mess up your production data.


### Advanced - custom code

Generally speaking we would recommend using one of the many templates that we are building, that take care of a lot of the logic for you, exposing simple inputs for you to configure. You can however, modify any destination by clicking the `show source code` option. From here you can modify the inputs (for example marking an input as secret so that it will be encrypted) or the code of the function itself.

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

#### Guidelines
- <b>Start from an existing template - </b> Check out existing templates that are close to your kind of use case and work from there
- <b>Rely on filters - </b> always offload as much as possible to the built in `filters` and `inputs`. This will make modifying your destination later much simpler (as well as being more performant)
- <b>Use `inputs` wherever possible - </b> these are great for secrets such as API credentials. You can mark them as secret and they will not be returned to the UI in the future and will be encrypted.
- <b>Keep it short -</b> We have tight controls on execution time, memory usage etc.
- <b>Do not do more than 2 `fetch` calls</b> The function will error if you do. If you have a need for more than 2 calls, please contact support.

### FAQ

#### How up-to-date is the Person information?

The `person` object will contain the latest information for the Person profile associated with the `distinct_id` of the event <b>at the time the event is processed</b>. You should make sure to use events that occur on or after person properties would be merged (such as `$identify`) if you need this information for your event

#### How many events can I send to a destination?

There is no limit on number of events to be processed but the system requires that the destination responds with healthy status codes (2xx) and in a timely fashion. If the destination performs poorly (too many errors, too slow) for a prolonged period of time your destination will be quarantined and eventually disabled. We will try to re-enable it automatically after a temporary disabled period before stopping it entirely. You then need to modify either the filters or the destination and re-enable it in the UI to try again.
