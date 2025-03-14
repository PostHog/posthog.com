---
title: Custom Transformations
sidebar: Docs
showTitle: true
---

# Writing Custom Hog Transformations in PostHog

> **Note:** Custom Hog Transformations are not yet publicly released. If you're interested in trying this feature, please [reach out to our support team](https://posthog.com/support).

[Hog](https://posthog.com/docs/hog) is PostHog's custom language for transforming and exporting data in real-time. This guide will walk you through creating custom transformations using Hog to modify your events before they're ingested into PostHog.

## Understanding Hog Transformations

A transformation in PostHog receives an `event` object as input and should return a modified version of that event (or `null` to drop the event entirely).

## Creating a Basic Transformation

Here's the basic pattern for a Hog transformation:

```javascript
// Create a copy of the event (important: don't modify the original event directly)
let returnEvent := event

// Modify properties on the copy
returnEvent.properties.my_custom_property := "new value"

// Return the modified copy
return returnEvent
```

Returning `event` without modification will simply pass the original event through unchanged.

## Important Syntax Rules for Hog

Hog has some specific syntax rules to be aware of:

1. Variable assignment uses `:=` (not `=` which is for equality comparison)
2. Use `and`, `or`, and `not` instead of `&&`, `||`, and `!`
3. Arrays are 1-indexed (not 0-indexed like most languages)
4. Strings must use single quotes `'like this'`
5. You can use f-strings like `f'Hello {name}'`
6. Comments start with `//` or `--` or `/* */` for multi-line

### Common Transformation Examples

### 1. Adding a Custom Property

```javascript
// Create a copy of the event
let returnEvent := event

// Add a custom property
returnEvent.properties.processed_by := 'my_custom_transformation'

// Return the modified event
return returnEvent
```

### 2. Modifying an Existing Property

```javascript
// Create a copy of the event
let returnEvent := event

// Modify an existing property (e.g., normalize a URL)
if (returnEvent.properties.$current_url) {
    returnEvent.properties.$current_url := lower(returnEvent.properties.$current_url)
}

// Return the modified event
return returnEvent
```

### 3. Filtering Events (Dropping Some Events)

```javascript
// Check if this is a test event
if (event.properties.is_test = true) {
    // Drop test events by returning null
    return null
}

// Otherwise, return the event unchanged
return event
```

### 4. Transforming Property Values

```javascript
// Create a copy of the event
let returnEvent := event

// Convert a string property to an integer
if (returnEvent.properties.count and typeof(returnEvent.properties.count) = 'string') {
    returnEvent.properties.count := toInt(returnEvent.properties.count)
}

// Return the modified event
return returnEvent
```

### 5. Enriching Events with Additional Data

```javascript
// Create a copy of the event
let returnEvent := event

// Add a timestamp property in a different format
returnEvent.properties.date_only := formatDateTime(toDateTime(event.timestamp), '%Y-%m-%d')

// Return the modified event
return returnEvent
```

## Debugging Your Transformations

Use `print()` statements to debug your transformations. These logs will appear in the Logs tab of your Hog function:

```javascript
print("Processing event", event.event)
print("Current properties", event.properties)

// After making changes
print("Modified event", returnEvent)
```

## Working with Inputs

You can add inputs to your transformation and access them through the `inputs` object:

```javascript
// Example of accessing inputs in the default transformation
let firstInput := inputs.input_1
let secondInput := inputs.input_2
let thirdInput := inputs.input_3

print("Using first input", firstInput)
```

## Testing Your Transformation

You can test your transformation in the testing section with:

1. The example event (pre-populated)
2. A real event from your instance (randomly selected)
3. Your own custom event JSON

This allows you to verify your transformation works correctly before enabling it.

## Important Warnings

⚠️ **Warning**: Returning `null` will completely drop the event from further processing. Be extremely careful with this as the event will be permanently lost.

⚠️ **Warning**: The event object is a global that cannot be modified directly. Always create a copy first.

## Learn More About Hog

For a complete reference on Hog syntax, standard library functions, and more examples, check out the [official Hog documentation](https://posthog.com/docs/hog).
