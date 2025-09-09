---
title: Drop Events
showTitle: true
---

PostHog's drop events transformation allows you to selectively discard events from being ingested based on specific criteria. 
## Overview

The drop events transformation permanently removes events from your data pipeline, preventing them from being stored or processed by PostHog.
import { CalloutBox } from 'components/Docs/CalloutBox'
<CalloutBox icon="IconPiggyBank" title="Impact on usage & billing" type="info">

Events that are dropped using a transformation **do not count towards your usage/billing**. 

While we encourage you to [instrument custom events](/docs/getting-started/send-events#2-capture-custom-events) and [configure autocapture](/docs/product-analytics/autocapture) to only capture the events you need long term, a **Drop Events** transformation can serve as a temporary solution to reduce usage immediately (vs. waiting for your next deployment cycle to modify custom events or configuration). 

It can also be useful when you want more granular control over _bundled_ autocapture events such as excluding a [specific app lifecycle events](/docs/product-analytics/autocapture#react-native-navigation-and-lifecycle-autocapture) and only capturing the ones you need.

</CalloutBox>

## Configuration

The drop events transformation uses filters to target specific events for removal.

### Filtering options

1. **Event matching**: Target specific event types by name (e.g., `$pageview`, `user_signed_up`)
3. **Property filters**: Further refine your filters with property conditions:
   - Match on any event property
   - Supports operators like equals, contains, greater than, etc.
   - Apply property filters globally across all events or specifically to individual event types

#### How to use the filters 

The drop events transformation uses two types of filters that work together:

1. **Match events filters**: These filters operate with OR logic. If an event matches ANY of these filters, it will be considered for dropping. For example, if you select both `$pageview` and `$pageleave` events, the transformation will match events of either type.

![Drop events based on event filters](https://res.cloudinary.com/dmukukwp6/image/upload/Event_Filter_OR_066f58e3bc.png)


2. **Property filters**: These filters use AND logic and are applied after the event matching. ALL property conditions must be met for an event to be dropped. For example, if you set:
   - `browser is set`
   - `Country Name is set`
   
   Only events that have BOTH properties matching these conditions will be dropped.

![Drop events based on property filters](https://res.cloudinary.com/dmukukwp6/image/upload/Property_Filter_And_2dc645185c.png)


3. **Property filters on event match filter**: You can add property filters directly to event match filters. For example:
   - If you select "All events" and add a property filter "browser is set", it will drop ALL events that have the browser property set
   - If you also add specific event matches like `$pageview` and `$pageleave`, it will drop:
     - All `$pageview` events
     - All `$pageleave` events  
     - Any other events that have the browser property set

![Drop events based on combined filters](https://res.cloudinary.com/dmukukwp6/image/upload/Both_Event_Filter_And_Property_Filter_9b5360cdd4.png)


### Example of combined filters

Let's say you configure the following:

**Match events**:
- `$pageview`
- `user_signed_up`

**Property filters**:
- `browser is set`
- `Country Name is set`

This configuration will drop:
- Any `$pageview` events that have both browser and country name properties set
- Any `$pageleave` events that have both browser and country name properties set

Events that don't meet ALL these criteria (like a `$pageview` missing the browser property, or a `$pageleave` event missing the country name) will not be dropped.

## Testing

Before enabling your drop events transformation in production, use the built-in testing interface to verify it works as expected:

1. Go to the **Testing** section of your transformation
2. Select an event to test with
3. Run the test to see if the event would be dropped
4. Iterate on your filters until you're satisfied with the results

## Important considerations

- **Permanence**: Dropped events are permanently deleted and cannot be recovered
- **Monitoring**: Check the metrics and logs tabs regularly to ensure the transformation is working as expected

## Learn more

- [PostHog filtering documentation](/docs/product-analytics/trends/filters)
