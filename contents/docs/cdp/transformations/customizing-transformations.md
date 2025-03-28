---
title: "Customizing transformations"
showTitle: true
---
Although we recommend using one of our pre-built transformations, you can also customize them and build your own using our Hog programming language.

## Event object

During ingestion, transformations only have access to the event object. Here's the structure of the event object available in transformations:

```ts
{
    uuid: string // The unique ID of the event
    event: string // The event name (e.g. $pageview)
    distinct_id: string // The distinct_id of the identity that created the event
    properties: Record<string, any> // All event properties
    timestamp: string
}
```

## Modifying transformations with Hog

For most cases, we recommend using one of the pre-built transformations. These take care of most logic under the hood, exposing simple inputs for you to configure.

You can, however, modify any transformation by clicking `edit source code`. From here you can modify the inputs – for example marking an input as secret so that it is encrypted at rest – or changing the implementation of the transformation itself.

![Modifying transformation inputs](https://res.cloudinary.com/dmukukwp6/image/upload/inputs_6552db269b.png)


Transformations are written in our [Hog language](/docs/hog). Since transformations happen during ingestion, they cannot make external HTTP calls. Instead, they focus on modifying the event object directly.

Here's a simple example of a custom transformation that anonymizes IP addresses by replacing the last octet with '0' to protect user privacy while still maintaining geographic information:

```hog
// Check if the event has an IP address
if (empty(event.properties?.$ip)) {
    print('No IP address found in event')
    return event
}

let ip := event.properties.$ip
let parts := splitByString('.', ip)

// Check if we have exactly 4 parts for IPv4
if (length(parts) != 4) {
    print('Invalid IP address format: wrong number of octets')
    return event
}

// Validate each octet is a number between 0 and 255
for (let i := 1; i <= 4; i := i + 1) {
    let octet := toInt(parts[i])
    if (octet = null or octet < 0 or octet > 255) {
        print('Invalid IP address: octets must be numbers between 0 and 255')
        return event
    }
}

// Replace the last octet with '0'
let anonymizedIp := concat(parts[1], '.', parts[2], '.', parts[3], '.0')
    
let returnEvent := event
returnEvent.properties.$ip := anonymizedIp
return returnEvent
```

Note: The global event object is immutable and cannot be modified directly.
That's why we create a new returnEvent object to make our changes.

![Edit source code](https://res.cloudinary.com/dmukukwp6/image/upload/edit_source_1cd6a7f540.png)

Important: Returning `undefined` or `null` will drop the event entirely. This means the event will not be ingested into PostHog and the data will be lost forever. Use this feature carefully and only when you are certain you want to permanently discard certain events.

For more details and inspiration, you can always view the source code of any transformation.

### Guidelines for modifying a transformation

- **Start from an existing template:** You can either choose the "Custom Transformation" transformation from our transformations list, or check out existing transformations that are close to the problem you're solving and work from there.

- **Rely on filters:** Offload as much as possible to the built in `filters` and `inputs`. This will make modifying your transformation later much simpler (as well as being more performant). Remember that your transformation will only be applied to events that match the filter criteria.

- **Use `inputs` wherever possible:** These are great for configuration values. You can even mark them as secret: they will not be returned to the UI in the future and will be stored encrypted.

- **Keep it short:** We have tight controls on execution time and memory usage. Transformations should be lightweight since they run on every event during ingestion.

- **No external calls:** Transformations cannot make HTTP calls or access external services. They can only modify the event object directly.

- **Focus on the event:** Remember that you only have access to the event object during ingestion. You cannot access person profiles, groups, or any other PostHog data.
