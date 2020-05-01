# PostHog Android integration

[Click here](https://github.com/PostHog/posthog-android) for the PostHog Android library. This is the official PostHog Android library 
to capture and send events to any PostHog instance (including posthog.com).

This library uses an internal queue to make calls non-blocking and fast. It also batches requests and flushes asynchronously, 
making it perfect to use in any part of your mobile app.

## Installation

The best way to install the PostHog Android library is with a build system like 
Gradle. This ensures you can easily upgrade to the latest versions. Just add
the `posthog` module to your `build.gradle`:

```shell script
dependencies {
  implementation 'com.posthog.android:posthog:1.+'
}
```

## Configuration

The best place to initialize the client is in your `Application` subclass.

```java
public class SampleApp extends Application {
  private static final String POSTHOG_API_KEY = "8jVz0YZ2YPtP7eL1I5l5RQIp-WcuFeD3pZO8c0YDMx4";
  private static final String POSTHOG_HOST = "https://app.posthog.com";

  @Override
  public void onCreate() {
    // Create a PostHog client with the given context, API key and host.
    PostHog posthog = new PostHog.Builder(this, POSTHOG_API_KEY, POSTHOG_HOST)
      .captureApplicationLifecycleEvents() // Record certain application events automatically!
      .recordScreenViews() // Record screen views automatically!
      .build();
    
    // Set the initialized instance as a globally accessible instance.
    PostHog.setSingletonInstance(posthog);

    // Now anytime you call PostHog.with, the custom instance will be returned.
    PostHog posthog = PostHog.with(this);
  }
}
```

## Making calls

### Identify

When you start tracking events with PostHog, each user gets an anonymous ID that is used to identify them in the system.
In order to link this anonymous user with someone from your database, use the `identify` call. 

Identify lets you add metadata on your users so you can more easily identify who they are in PostHog, and even do things 
like segment users by these properties.

An identify call requires:

* `distinctId` which uniquely identifies your user in your database
* `userProperties` with a dictionary with key: value pairs

```java
PostHog.with(this)
       .identify(distinctID, new Properties()
                                .putValue("name", "My Name")
                                .putValue("email", "user@posthog.com"));
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

```java
PostHog.with(this)
       .capture("Button B Clicked", new Properties()
                                        .putValue("color", "blue")
                                        .putValue("icon", "new2-final"));
```

### Flush

You can set the number of events in the configuration that should queue before flushing. 
Setting this to `1` will send events immediately and will use more battery. It's set to `20` by default.

You can also configure the flush interval. By default we flush all events after `30` seconds,
no matter how many events have gathered.

```java
PostHog posthog = new PostHog.Builder(this, POSTHOG_API_KEY, POSTHOG_HOST)
  .flushQueueSize(20)
  .flushInterval(30, TimeUnit.SECONDS)
  .build();

```

You can also manually flush the queue:

```java
PostHog.with(this)
       .flush();
```

### Reset

To reset the user's ID and anonymous ID, call `reset`. Usually you would do this right after the user logs out.

```java
PostHog.with(this)
       .reset();
```

### Sending screen views

With `recordScreenViews()`, PostHog will try to record all screen changes automatically.

If you want to manually send a new screen capture event, use the `screen` function.

This function requires a `name`. You may also pass in an optional `properties` object.

```java
PostHog.with(this)
       .screen("Dashboard", new Properties()
                                  .putValue("background", "blue")
                                  .putValue("hero", "superhog"));

```

## All Configuration options

When creating the PostHog client, there are many options you can set:

```java
PostHog posthog = new PostHog.Builder(this, POSTHOG_API_KEY, POSTHOG_HOST)
    // Record certain application events automatically! (off/false by default)
    .captureApplicationLifecycleEvents()

     // Record screen views automatically! (off/false by default)
    .recordScreenViews()

    // Capture deep links as part of the screen call. (off by default)
    .captureDeepLinks()

     // Maximum number of events to keep in queue before flushing (20)
    .flushQueueSize(int flushQueueSize)
 
    // Max delay before flushing the queue (30 seconds)
    .flushInterval(long flushInterval, TimeUnit timeUnit)
 
    // Enable or disable collection of ANDROID_ID (true)
    .collectDeviceId(boolean collect) 

    .build();
```

## Thank you

This library is largely based on the analytics-android package.
