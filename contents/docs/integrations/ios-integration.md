---
title: iOS Integration
sidebar: Docs
showTitle: true
---

[Click here](https://github.com/PostHog/posthog-ios) for the Posthog-iOS library. This is the official PostHog iOS library 
to capture and send events to any PostHog instance (including posthog.com).

This library uses an internal queue to make calls non-blocking and fast. It also batches requests and flushes asynchronously, 
making it perfect to use in any part of your mobile app.

## Installation

PostHog is available through [CocoaPods](http://cocoapods.org) and [Carthage](https://github.com/Carthage/Carthage).

### CocoaPods

```ruby
pod "PostHog", "~> 1.0"
```

### Carthage

```
github "posthog/posthog-ios"
```

## Configuration

### With Objective-C

```objective-c
#import <PostHog/PHGPostHog.h>
#import <PostHog/PHGPostHogConfiguration.h>

// on posthog.com
PHGPostHogConfiguration *configuration = [PHGPostHogConfiguration configurationWithApiKey:@"YOUR_API_KEY"];

// self-hosted
PHGPostHogConfiguration *configuration = [PHGPostHogConfiguration configurationWithApiKey:@"YOUR_API_KEY" 
                                                                          host:@"https://app.posthog.com"];

configuration.captureApplicationLifecycleEvents = YES; // Record certain application events automatically!
configuration.recordScreenViews = YES; // Record screen views automatically!

[PHGPostHog setupWithConfiguration:configuration];
```

### With Swift

```swift
import PostHog

// on posthog.com
let configuration = PHGPostHogConfiguration(apiKey: "YOUR_API_KEY")

// self-hosted
let configuration = PHGPostHogConfiguration(apiKey: "YOUR_API_KEY", host: "http://app.posthog.com")

configuration.captureApplicationLifecycleEvents = true; // Record certain application events automatically!
configuration.recordScreenViews = true; // Record screen views automatically!

PHGPostHog.setup(with: configuration)
let posthog = PHGPostHog.shared()
```

## Making calls

### Identify

When you start tracking events with PostHog, each user gets an anonymous ID that is used to identify them in the system.
In order to link this anonymous user with someone from your database, use the `identify` call. 

Identify lets you add metadata on your users so you can more easily identify who they are in PostHog, and even do things 
like segment users by these properties.

An identify call requires:

* `distinct_id` which uniquely identifies your user in your database
* `properties` with a dictionary with key: value pairs

For example:

```objective-c
// in objective-c
[[PHGPostHog sharedPostHog] identify:@"distinct_id_from_your_database"
                          properties:@{ @"name": @"Peter Griffin",
                                       @"email": @"peter@familyguy.com" }];
```

```swift
// in swift
posthog.identify("user_id_from_your_database", 
          properties: ["name": "Peter Griffin", "email": "peter@familyguy.com"])
```

The most obvious place to make this call is whenever a user signs up, or when they update their information.

When you call `identify`, all previously tracked anonymous events will be linked to the user.

### Capture

Capture allows you to capture anything a user does within your system, which you can later use in PostHog to find 
patterns in usage, work out which features to improve or where people are giving up.

A `capture` call requires:

* `event name` to specify the event
  * We recommend using [noun] [verb], like `movie played` or `movie updated` to easily identify what your events mean later on.

Optionally you can submit

* `properties`, which can be an array with any information you'd like to add

For example:

```objective-c
// in objective-c
[[PHGPostHog sharedPostHog] capture:@"Signed Up" properties:@{ @"plan": @"Pro++" }];
```

```swift
// in swift
posthog.capture("Signed Up", properties: ["plan": "Pro++"])
```

### Flush

You can set the number of events in the configuration that should queue before flushing. 
Setting this to `1` will send events immediately and will use more battery. It's set to `20` by default.

```objective-c
configuration.flushAt = 1;
```

You can also manually flush the queue:

```objective-c
// in objective-c
[[PHGPostHog sharedPostHog] capture:@"Logged Out"];
[[PHGPostHog sharedPostHog] flush]
```

```swift
// in swift
posthog.capture("Logged Out")
posthog.flush()
```

### Reset

To reset the user's ID and anonymous ID, call `reset`. Usually you would do this right after the user logs out.

```objective-c
// in objective-c
[[PHGPostHog sharedPostHog] reset]
```

```swift
// in swift
posthog.reset()
```

### Sending screen views

With `configuration.recordScreenViews` set as `YES`, PostHog will try to record all screen changes automatically.

If you want to manually send a new screen capture event, use the `screen` function.

```objective-c
// in objective-c
[[PHGPostHog sharedPostHog] screen:@"Dashboard" properties:@{ @"fromIcon": @"bottom" }];
```

```swift
// in swift
posthog.capture("Dashboard", properties: ["fromIcon": "bottom"])
```

## All Configuration options

The `configuration` element contains several other things you can toggle:

```objective-c
/**
 * Whether the posthog client should use location services.
 * If `YES` and the host app hasn't asked for permission to use location services then the user will be  
 * presented with an alert view asking to do so. `NO` by default. If `YES`, please make sure to add a 
 * description for `NSLocationAlwaysUsageDescription` in your `Info.plist` explaining why your app is 
 * accessing Location APIs.
 */
configuration.shouldUseLocationServices = NO;

/**
 * Whether the posthog client should capture advertisting info. `YES` by default.
 */
configuration.enableAdvertisingCapturing = YES;

/**
 * The number of queued events that the posthog client should flush at. Setting this to `1` will not queue  
 * any events and will use more battery. `20` by default.
 */
configuration.flushAt = 20;

/**
 * The amount of time to wait before each tick of the flush timer.
 * Smaller values will make events delivered in a more real-time manner and also use more battery.
 * A value smaller than 10 seconds will seriously degrade overall performance.
 * 30 seconds by default.
 */
configuration.flushInterval = 30;

/**
 * The maximum number of items to queue before starting to drop old ones. This should be a value greater 
 * than zero, the behaviour is undefined otherwise. `1000` by default.
 */
configuration.maxQueueSize = 1000;

/**
 * Whether the posthog client should automatically make a capture call for application lifecycle events,  
 * such as "Application Installed", "Application Updated" and "Application Opened".
 */
configuration.captureApplicationLifecycleEvents = NO; 

/**
 * Whether the posthog client should record bluetooth information. If `YES`, please make sure to add a  
 * description for `NSBluetoothPeripheralUsageDescription` in your `Info.plist` explaining explaining why
 * your app is accessing Bluetooth APIs. `NO` by default.
 */
configuration.shouldUseBluetooth = NO;

/**
 * Whether the posthog client should automatically make a screen call when a view controller is added to
 * a view hierarchy. Because the underlying implementation uses method swizzling, we recommend initializing 
 * the posthog client as early as possible (before any screens are displayed), ideally during the  
 * Application delegate's applicationDidFinishLaunching method.
 */
configuration.recordScreenViews = NO;

/**
 * Whether the posthog client should automatically capture in-app purchases from the App Store.
 */
configuration.captureInAppPurchases = NO;

/**
 * Whether the posthog client should automatically capture push notifications.
 */
configuration.capturePushNotifications = NO;

/**
 * Whether the posthog client should automatically capture deep links. You'll still need to call the 
 * continueUserActivity and openURL methods on the posthog client.
 */
configuration.captureDeepLinks = NO;
``` 

## Thank you

This library is largely based on the analytics-ios package.
