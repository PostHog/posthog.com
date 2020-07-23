---
title: Go Integration
sidebar: Docs
showTitle: true
---

[Click here](https://github.com/PostHog/posthog-go) for the Posthog-Go Library. This is the official PostHog Go library to capture and send events to any PostHog instance (including posthog.com).

This library uses an internal queue to make calls fast and non-blocking. It also batches requests and flushes asynchronously, making it perfect to use in any part of your web app or other server-side application that needs performance.

## Usage

```go
package main

import (
    "os"
    "github.com/posthog/posthog-go"
)

func main() {
    // Fetches POSTHOG_API_KEY from your environment variables. Make sure you have it set.
    client := posthog.New(os.Getenv("POSTHOG_API_KEY"))
    defer client.Close()

    // run commands
}
```

### Self Hosted Version
```go
package main

import (
    "os"
    "github.com/posthog/posthog-go"
)

func main() {
    client := posthog.NewWithConfig(os.Getenv("POSTHOG_API_KEY"), posthog.Config{Endpoint:"https://your.posthog.endpoint"})
    defer client.Close()

    // run commands
}
```

## Making Calls

### Capture

Capture allows you to capture anything a user does within your system, which you can later use in PostHog to find patterns in usage, work out which features to improve, or find out where people are giving up.

A `capture` call requires:

* `distinct id` which uniquely identifies your user
* `event name` to specify the event
  * We recommend naming events with "[noun] [verb]", such as `movie played` or `movie updated`, in order to easily identify what your events mean later on (we know this from experience).

Optionally you can submit:

* `properties`, which can be an array with any information you'd like to add

For example:
```go
client.Enqueue(posthog.Capture{
  DistinctId: "test-user",
  Event:      "test-snippet",
  Properties: posthog.NewProperties().
    Set("plan", "Enterprise").
    Set("friends", 42),
})
```

## Identify

Identify lets you add metadata to your users so you can easily identify who they are in PostHog, as well as do things 
like segment users by these properties.

An identify call requires:

* `distinct id` which uniquely identifies your user
* `properties` with a dictionary of any key:value pairs you'd like to add

For example:

```go
client.Enqueue(posthog.Identify{
  DistinctId: "user:123",
  Properties: posthog.NewProperties().
    Set("email", "john@doe.com").
    Set("proUser", false),
})
```

The most obvious place to make this call is whenever a user signs up, or when they update their information.

### Alias

To connect whatever a user does before they sign up or login with what they do after, you need to make an alias call. This will allow you to answer questions like "Which marketing channels lead to users churning after a month?" or "What do users do on our website before signing up?"

In a purely back-end implementation, this means whenever an anonymous user does something, you'll want to send a session ID with the capture call. Then, when that users signs up, you want to do an alias call with the session ID and the newly created user ID.

The same concept applies for when a user logs in.

If you're using PostHog in the front-end and back-end, doing the identify call in the frontend will be enough.

An alias call requires

* `distinct id` the current unique id
* `alias` the unique ID of the user before

For example:

```go
client.Enqueue(posthog.Alias{
  DistinctId: "user:123",
  Alias: "user:12345"
})
```
### Sending Page Views

If you're aiming for a full back-end implementation of PostHog, you can send page views from your backend, like so:

```go
client.Enqueue(posthog.Capture{
  DistinctId: "test-user",
  Event:      "$pageview",
  Properties: posthog.NewProperties().
    Set("$current_url", "https://example.com"),
})
```

## Thank You

This library is largely based on the `analytics-go` package.
