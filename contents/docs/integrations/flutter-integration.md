---
title: Flutter Integration
sidebar: Docs
showTitle: true
---

[Click here](https://github.com/PostHog/flutter-posthog) for the flutter-posthog library. This is the official PostHog Flutter library
to capture and send events to any PostHog instance (including posthog.com).

This library uses an internal queue to make calls non-blocking and fast. It also batches requests and flushes asynchronously,
making it perfect to use in any part of your mobile app.

## Installation

PostHog is available through [pub](https://pub.dev/packages/flutter_posthog).

## Usage

To use this plugin, add `flutter_posthog` as a [dependency in your pubspec.yaml file](https://flutter.io/platform-plugins/).

### Supported methods

| Method           | Android | iOS | Web |
| ---------------- | ------- | --- | --- |
| `identify`       | X       | X   | X   |
| `capture`        | X       | X   | X   |
| `screen`         | X       | X   | X   |
| `alias`          | X       | X   | X   |
| `getAnonymousId` | X       | X   | X   |
| `reset`          | X       | X   | X   |
| `disable`        | X       | X   |     |
| `enable`         | X       | X   |     |
| `debug`          | X\*     | X   | X   |
| `setContext`     | X       | X   |     |

\* Debugging must be set as a configuration parameter in `AndroidManifest.xml` (see below). The official posthog library does not offer the debug method for Android.

### Example

```dart
import 'package:flutter/material.dart';
import 'package:flutter_posthog/flutter_posthog.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Posthog.screen(
      screenName: 'Example Screen',
    );
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Posthog example app'),
        ),
        body: Center(
          child: FlatButton(
            child: Text('TRACK ACTION WITH POSTHOG'),
            onPressed: () {
              Posthog.capture(
                eventName: 'ButtonClicked',
                properties: {
                  'foo': 'bar',
                  'number': 1337,
                  'clicked': true,
                },
              );
            },
          ),
        ),
      ),
      navigatorObservers: [
        PosthogObserver(),
      ],
    );
  }
}
```

## Installation

Setup your Android, iOS and/or web sources as described at Posthog.com and generate your api keys.

Set your Posthog api key and change the automatic event tracking (only for Android and iOS) on if you wish the library to take care of it for you.
Remember that the application lifecycle events won't have any special context set for you by the time it is initialized. If you are using a self hosted instance of Posthog you will need to have the public hostname or ip for your instance as well.

### Android

#### AndroidManifest.xml

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="com.posthog.flutter_posthog_example">
    <application>
        <activity>
            [...]
        </activity>
        <meta-data android:name="com.posthog.posthog.API_KEY" android:value="YOUR_API_KEY_GOES_HERE" />
        <meta-data android:name="com.posthog.posthog.POSTHOG_HOST" android:value="https://app.posthog.com" />
        <meta-data android:name="com.posthog.posthog.TRACK_APPLICATION_LIFECYCLE_EVENTS" android:value="false" />
        <meta-data android:name="com.posthog.posthog.DEBUG" android:value="false" />
    </application>
</manifest>
```

### iOS

#### Info.plist

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	[...]
	<key>com.posthog.posthog.API_KEY</key>
	<string>YOUR_API_KEY_GOES_HERE</string>
	<key>com.posthog.posthog.POSTHOG_HOST</key>
	<string>https://app.posthog.com</string>
	<key>com.posthog.posthog.TRACK_APPLICATION_LIFECYCLE_EVENTS</key>
	<false/>
	<false/>
	[...]
</dict>
</plist>
```

### Web

```html
<!DOCTYPE html>
<html>
  <head>
    [...]
  </head>
  <body>
    <script>
      !function(){ ...;
        posthog.init("YOUR_API_KEY_GOES_HERE", {api_host: 'https://app.posthog.com'});
        posthog.page();
      }}();
    </script>
    <script src="main.dart.js" type="application/javascript"></script>
  </body>
</html>
```

For more informations please check: https://posthog.com/docs/integrations/js-integration

## Issues

Please file any issues, bugs, or feature requests in the [GitHub repo](https://github.com/posthog/flutter-posthog/issues/new).

## Contributing

If you wish to contribute a change to this repo, please send a [pull request](https://github.com/posthog/flutter-posthog/pulls).
