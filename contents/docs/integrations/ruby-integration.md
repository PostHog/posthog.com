---
title: Ruby Integration
sidebar: Docs
showTitle: true
---

This is an optional library you can install if you're working with Ruby. This is an optional library you can install if you're working with Ruby. 

This page of the Docs refers specifically to the Official PostHog Ruby Library to capture and send events to any PostHog instance (including posthog.com).

This library uses an internal queue to make calls fast and non-blocking. It also batches requests and flushes asynchronously, making it perfect to use in any part of your web app or other server-side application that needs performance.

## Installation 

Add this to your `Gemfile`:

```ruby
gem "posthog-ruby"
```

In your app, set your api key **before** making any calls.

```ruby
posthog = PostHog::Client.new({
  api_key: "my_key",
  api_host: "https://posthog.[your-domain].com", # You can remove this line if you're using app.posthog.com
  on_error: Proc.new { |status, msg| print msg }
})
```

You can find your key in the /setup page in PostHog.

## Making Calls

### Capture

Capture allows you to capture anything a user does within your system, which you can later use in PostHog to find patterns in usage, work out which features to improve or where people are giving up.

A `capture` call requires:
 - `distinct id` which uniquely identifies your user
 - `event name` to specify the event
  * We recommend naming events with "[noun] [verb]", such as `movie played` or `movie updated`, in order to easily identify what your events mean later on (we know this from experience).

Optionally you can submit:
- `properties`, which is a dictionary with any information you'd like to add
- `timestamp`, a datetime object for when the event happened. If this isn't submitted, it'll be set to the current time

For example:
```ruby
posthog.capture({
    distinct_id: 'distinct id',
    event: 'movie played',
    properties: {
        movie_id: '123',
        category: 'romcom'
    }
})
```

### Identify
Identify lets you add metadata to your users so you can easily identify who they are in PostHog, as well as do things 
like segment users by these properties.

An `identify` call requires:
- `distinct id` which uniquely identifies your user
- `properties` with a dict with any key:value pairs 

For example:
```ruby
posthog.identify({
  distinct_id: "user:123",
  properties: {
    email: 'john@doe.com',
    pro_user: false
  }
})
```

The most obvious place to make this call is whenever a user signs up, or when they update their information.

### Alias

To connect whatever a user does before they sign up or log in with what they do after you need to make an alias call. This will allow you to answer questions like "Which marketing channels leads to users churning after a month?" or "What do users do on our website before signing up?"

In a purely back-end implementation, this means whenever an anonymous user does something, you'll want to send a session ID with the capture call. Then, when that users signs up, you want to do an alias call with the session ID and the newly created user ID.

The same concept applies for when a user logs in.

If you're using PostHog in the front-end and back-end, doing the `identify` call in the frontend will be enough.

An `alias` call requires:
- `previous distinct id`: the unique ID of the user from beforehand
- `distinct id`: the current unique id

For example:
```ruby
posthog.alias({
  distinct_id: "user:123",
  alias: "user:12345",
})
```

### Sending Page Views

If you're aiming for a full back-end implementation of PostHog, you can send pageviews from your backend

```ruby
posthog.capture({
    distinct_id: 'distinct id',
    event: '$pageview',
    properties: {
        '$current_url': 'https://example.com'
    }
})
```

## Development

### How to release
1. Increase `VERSION` in `posthog/version.py`
2. run `make release` and `make release_analytics`
3. `git commit -am "Release X.Y.Z."` (where X.Y.Z is the new version)
4. `git tag -a X.Y.Z -m "Version X.Y.Z"` (where X.Y.Z is the new version).

## Thank You

This library is largely based on the `analytics-ruby` package.
