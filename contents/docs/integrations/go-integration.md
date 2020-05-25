---
title: Go Integration
sidebar: Docs
showTitle: true
---

[Click here](https://github.com/PostHog/posthog-go) for the Posthog-Go library. This is the official PostHog Go library to capture and send events to any PostHog instance (including posthog.com).

This library uses an internal queue to make calls non-blocking and fast. It also batches requests and flushes asynchronously, making it perfect to use in any part of your web app or other server side application that needs performance.

## Usage

```go
package main

import (
    "os"
    "github.com/posthog/posthog-go"
)

func main() {
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

## Making calls

### Capture

Capture allows you to capture anything a user does within your system, which you can later use in PostHog to find patterns in usage, work out which features to improve or where people are giving up.

A `capture` call requires

* `distinct id` which uniquely identifies your user
* `event name` to make sure
  * We recommend using [noun] [verb], like `movie played` or `movie updated` to easily identify what your events mean later on.

Optionally you can submit

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

Identify lets you add metadata on your users so you can more easily identify who they are in PostHog, and even do things like segment users by these properties.

An identify call requires

* `distinct id` which uniquely identifies your user
* `properties` with a dict with any key: value pairs

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

To marry up whatever a user does before they sign up or log in with what they do after you need to make an alias call. This will allow you to answer questions like "Which marketing channels leads to users churning after a month?" or "What do users do on our website before signing up?"

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
### Sending page views

If you're aiming for a full back-end implementation of PostHog, you can send page views from your backend

```go
client.Enqueue(posthog.Capture{
  DistinctId: "test-user",
  Event:      "$pageview",
  Properties: posthog.NewProperties().
    Set("$current_url", "https://example.com"),
})
```

## Thank you

This library is largely based on the analytics-go package.
