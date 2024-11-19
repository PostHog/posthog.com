---
title: "Customizing destinations"
showTitle: true
---
Although we recommend using one of our pre-built destinations, you can also customize them and build your own. 

## Customizing payload

You can template destination output using curly braces `{}`.

For example, given this PostHog event:

```ts
{
    event: {
        event: "$pageview",
        distinct_id: "1234",
        timestamp: "2024-01-01T12:00:00",
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

You can create a template like:

```
{event.event} was triggered by {person.properties.first_name} {person.properties.last_name}

// Outputs: $pageview was triggered by Max the Hedgehog
```

You could use this approach to set parameters in a [webhook](/docs/cdp/destinations/webhook) destination’s URL:

```
https://api.yourgreatwebsite/v0/track-conversion?username={person.name}
```

Or to construct a custom JSON payload that conforms to an existing API specification:

```ts
{
    "event_source": "posthog",
    "event": {
        "event_label": "conversion",
        "username": "{person.name}",
        "datetime": "{event.timestamp}"
    }
}
```

### Global object

Below is the structure of the global variables available whenever templating a destination.

```ts
{
    event: {
        uuid: string // The unique ID of the event
        event: string // The event name (e.g. $pageview)
        distinct_id: string // The distinct_id of the identity that created the event
        properties: Record<string, any>
        timestamp: string
        url: string // A URL to view it in PostHog
    }
    person?: {
        id: string // The UUID of the Person associated with the distinct_id of the event
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

## Modifying destinations with Hog

For most cases, we recommend using one of the templates. These take care of most logic under the hood, exposing simple inputs for you to configure. 

You can, however, modify any destination by clicking `show source code`. From here you can modify the inputs – for example marking an input as secret so that it is encrypted as rest – or changing the implementation of the destination itself.

Destinations are written in our [Hog language](/docs/hog). Most destinations are wrappers around `fetch` - a function for safely performing async, retry-able HTTP calls.

```hog
let res := fetch(inputs.url, {
  'headers': inputs.headers,
  'body': inputs.body,
  'method': inputs.method
});

if (res.status >= 400) {
  print('Bad response', res.status, res.body)
}
```

For more details and inspiration, you can always view the source code of any destination.

### Guidelines for modifying a destination

- **Start from an existing template:** Check out existing templates that are close to the problem you’re solving and work from there.

- **Rely on filters:** Offload as much as possible to the built in `filters` and `inputs`. This will make modifying your destination later much simpler (as well as being more performant).

- **Use `inputs` wherever possible:** These are great for things like API credentials. You can even mark them as secret: they will not be returned to the UI in the future and will be stored encrypted.

- **Keep it short:** We have tight controls on execution time, memory usage.

- **Do not perform more than 5 `fetch` calls:** The function will error if you do. If you need to do more than 5 calls, please [contact support](https://us.posthog.com/#panel=support%3Asupport%3Aapps%3A%3Atrue).
