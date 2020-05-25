---
title: React Native Integration
sidebar: Docs
showTitle: true
---

[Click here](https://github.com/PostHog/posthog-react-native) for the PostHog React Native library. This is the official PostHog React Native library 
to capture and send events to any PostHog instance (including posthog.com).

This library uses an internal queue to make calls non-blocking and fast. It also batches requests and flushes asynchronously, 
making it perfect to use in any part of your mobile app.

## Installation

First make sure you have [CocoaPods](https://cocoapods.org/) installed. 
[See here](https://reactnative.dev/docs/integration-with-existing-apps#configuring-cocoapods-dependencies) for React Native specific instructions.

Then add the `posthog-react-native` package to your project:

```shell script
yarn add posthog-react-native
```

Then link the native libraries:

```shell script
yarn react-native link
```

If you're building for iOS, also make sure you have the latest PostHog iOS Pod installed: 

```shell script
cd ios
pod install
cd ..
```

## Configuration

Somewhere your application, setup the SDK like so:

```
import PostHog from 'posthog-react-native'

await PostHog.setup('YOUR_API_KEY', {
    // PostHog API host
    host: 'https://app.posthog.com',

    // Record certain application events automatically! (off/false by default)
    captureApplicationLifecycleEvents: true,

    // Capture deep links as part of the screen call. (off by default)
    captureDeepLinks: true,

    // Record screen views automatically! (off/false by default)
    recordScreenViews: true,

    // Max delay before flushing the queue (30 seconds)
    flushInterval: 30,

    // Maximum number of events to keep in queue before flushing (20)
    flushAt: 20,

    // Used only for Android
    android: {
        // Enable or disable collection of ANDROID_ID (true)
        collectDeviceId: true,
    },

    // Used only for iOS
    iOS: {
        // Automatically capture in-app purchases from the App Store
        captureInAppPurchases: false,

        // Capture push notifications
        capturePushNotifications: false,

        // Capture advertisting info
        enableAdvertisingCapturing: true,

        // The maximum number of items to queue before starting to drop old ones.
        maxQueueSize: 1000,

        // Record bluetooth information.
        shouldUseBluetooth: false,

        // Use location services. Will ask for permissions.
        shouldUseLocationServices: false
    }
})
```

See the [iOS integration](https://posthog.com/docs/integrations/ios-integration) and 
[Android integration](https://posthog.com/docs/integrations/android-integration) pages for more details on
some of these options.

The `PostHog.setup()` call returns a promise, which resolves once the initialisation
has finished. All calls to functions (e.g. `capture`) will be queued and dispatched once
initialisation has finished. 

## Making calls

### Identify

When you start tracking events with PostHog, each user gets an anonymous ID that is used to identify them in the system.
In order to link this anonymous user with someone from your database, use the `identify` call. 

Identify lets you add metadata on your users so you can more easily identify who they are in PostHog, and even do things 
like segment users by these properties.

An identify call requires:

* `distinctId` which uniquely identifies your user in your database
* `userProperties` with a dictionary with key: value pairs

```javascript
import PostHog from 'posthog-react-native'

PostHog.identify('distinctID', {
    email: 'user@posthog.com',
    name: 'My Name'
})
```

The most obvious place to make this call is whenever a user signs up, or when they update their information.

When you call `identify`, all previously tracked anonymous events will be linked to the user.

### Capture

Capture allows you to capture anything a user does within your system, which you can later use in PostHog to find 
patterns in usage, work out which features to improve or where people are giving up.

A `capture` call requires:

* `event` to specify the event name
  * We recommend using [noun] [verb], like `movie played` or `movie updated` to easily identify what your events mean later on.

Optionally you can submit

* `properties`, which can be an array with any information you'd like to add

For example:

```javascript
import PostHog from 'posthog-react-native'

PostHog.capture('Button B Clicked', {
    color: "blue",
    icon: "new2-final"
})
```

### Flush

You can set the number of events in the configuration that should queue before flushing. 
Setting this to `1` will send events immediately and will use more battery. It's set to `20` by default.

You can also configure the flush interval. By default we flush all events after `30` seconds,
no matter how many events have gathered.

You can also manually flush the queue:

```javascript
import PostHog from 'posthog-react-native'

PostHog.flush()
```

### Reset

To reset the user's ID and anonymous ID, call `reset`. Usually you would do this right after the user logs out.

```javascript
import PostHog from 'posthog-react-native'

PostHog.reset()
```

### Opt In/Out

To Opt In/Out of tracking, use the following calls:

```javascript
import PostHog from 'posthog-react-native'

PostHog.enable() // opt in
PostHog.disable() // opt out
```

### Sending screen views

With `recordScreenViews`, PostHog will try to record all screen changes automatically.

If you want to manually send a new screen capture event, use the `screen` function.

This function requires a `name`. You may also pass in an optional `properties` object.

```javascript
import PostHog from 'posthog-react-native'

PostHog.screen("Dashboard", {
    background: 'blue',
    hero: 'superhog'
})
```

## Thank you

This library is largely based on the analytics-react-native package.
