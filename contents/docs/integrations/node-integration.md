---
title: NodeJS Integration
sidebar: Docs
showTitle: true
---

[Click here](https://github.com/PostHog/posthog-node) for the Posthog NodeJS Library. This is an optional library you can install if you're working with Node. 

This page of the Docs refers specifically to the Official PostHog NodeJS Library to capture and send events to any PostHog instance (including posthog.com).

This library uses an internal queue to make calls fast and non-blocking. It also batches requests and flushes asynchronously, making it perfect to use in any part of your web app or other server-side application that needs performance.

## Installation 

Run either the `yarn` or `npm` program to add it to your project:

```shell script
npm install posthog-node --save
yarn add posthog-node
```

In your app, set your API key **before** making any calls.

```javascript
import PostHog from 'posthog-node'

const client = new PostHog(
  'API key',
  {host: 'https://posthog.[your domain].com'} // You can remove this line if you're using app.posthog.com
)
```

> **Note:** As a general rule of thumb, we do not recommend having API keys in plaintext. Setting it as an environment variable would be best.

You can find your key in the /setup page in PostHog.

## Making Calls

### Capture

Capture allows you to capture anything a user does within your system, which you can later use in PostHog to find patterns in usage, work out which features to improve or where people are giving up.

A `capture` call requires:
 - `distinct id` which uniquely identifies your user
 - `event name` to identify the event
  * We recommend naming events with "[noun] [verb]", such as `movie played` or `movie updated`, in order to easily identify what your events mean later on (we know this from experience).

Optionally you can submit:
- `properties`, which is an object with any information you'd like to add

For example:
```js
client.capture({
  distinctId: 'distinct id',
  event: 'movie played',
  properties: {
    movieId: '123',
    category: 'romcom'
  }
})
```

### Identify
Identify lets you add metadata to your users so you can easily identify who they are in PostHog, as well as do things 
like segment users by these properties.

An `identify` call requires:
- `distinct id` which uniquely identifies your user
- `properties` with a dict with any key: value pairs 

For example:
```js
client.identify({
  distinctId: "user:123",
  properties: {
    email: 'john@doe.com',
    proUser: false
  }
})
```

The most obvious place to make this call is whenever a user signs up, or when they update their information.

### Alias

To connect whatever a user does before they sign up or log in with what they do after you need to make an alias call. This will allow you to answer questions like "Which marketing channels leads to users churning after a month?" or "What do users do on our website before signing up?"

In a purely back-end implementation, this means whenever an anonymous user does something, you'll want to send a session ID with the capture call. Then, when that users signs up, you want to do an alias call with the session ID and the newly created user ID.

The same concept applies for when a user logs in.

If you're using PostHog in the front-end and back-end, doing the `identify` call in the frontend will be enough.

An `alias` call requires
- `distinct id` the current unique id
- `alias` the unique ID of the user before

For example:
```js
client.alias({
  distinctId: "user:123",
  alias: "user:12345",
})
```

### Sending Page Views

If you're aiming for a full back-end implementation of PostHog, you can send `pageviews` from your backend, like so:

```js
client.capture({
  distinctId: 'distinct id',
  event: '$pageview',
  properties: {
    $current_url: 'https://example.com'
  }
})
```

# Development

## How to Release
1. Run `npm version patch` (or minor/major)
2. Run `npm publish`

## Thank You

This library is largely based on the `analytics-node` package.
