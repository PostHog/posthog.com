---
title: "How to set up A/B tests in Flutter"
date: 2024-03-05
author: ["lior-neu-ner"]
tags: ['experimentation']
---

import { ProductScreenshot } from 'components/ProductScreenshot'
import EventsInPostHogLight from '../images/tutorials/flutter-ab-tests/events-light.png'
import EventsInPostHogDark from '../images/tutorials/flutter-ab-tests/events-dark.png'
import TestSetupLight from '../images/tutorials/flutter-ab-tests/experiment-setup-light.png'
import TestSetupDark from '../images/tutorials/flutter-ab-tests/experiment-setup-dark.png'

[A/B tests](/ab-testing) help you improve your Flutter app by enabling you to compare the impact of changes on key metrics. To show you how to set one up, we create a basic Flutter app, add PostHog, create an A/B test, and implement the code for it.

## 1. Create a new Flutter app

Our app will have two screens:

1. The first screen will have a button which takes you to a second screen.
2. The second screen will either have a `red` or `green` background color, depending on whether the user is in the `control` or `test` variant of our A/B test. This screen will also have a button which captures an event when it's pressed. We'll use this event as our goal metric for our test.

To set this up, install the [Flutter extension for VS Code](https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter). Then, create a new app by opening the Command Palette in VS Code (`Ctrl/Cmd + Shift + P`), typing `flutter` and selecting `Flutter: New Project`. 

Select `Empty Application` and name your app `flutter_ab_tests`. Then, replace your code in `lib/main.dart` with the following:

```dart file=lib/main.dart
import 'package:flutter/material.dart';
import 'feature_screen_view.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Flutter A/B Test App',
      home: MainScreen(),
    );
  }
}

class MainScreen extends StatelessWidget {
  const MainScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Main Screen')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('Hello, world!'),
            ElevatedButton(
              child: const Text('Go to Next Screen'),
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const FeatureScreenView(isTestVariant: false)), // We update this later
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
```

Lastly, in the `lib` directory, create a new file for our second screen called `feature_screen_view.dart`. Add the following code to it:

```dart
import 'package:flutter/material.dart';

class FeatureScreenView extends StatelessWidget {
  final bool isTestVariant;

  const FeatureScreenView({super.key, required this.isTestVariant});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: isTestVariant ? Colors.green : Colors.red,
      body: Center(
        child: ElevatedButton(
          child: const Text('Click Me!'),
          onPressed: () {
            // Event capturing will go here
          },
        ),
      ),
    );
  }
}
```

Press **F5** and run the app in any emulator (we chose Android) to see your app in action.

![Basic setup of the Flutter app](../images/tutorials/flutter-ab-tests/basic-app.mp4)

## 2. Add PostHog to your app

With our app set up, it’s time to install and set up PostHog. If you don't have a PostHog instance, you can [sign up for free](https://us.posthog.com/signup).

To start, install [PostHog’s Flutter SDK](/libraries/flutter) by adding `posthog_flutter` to your `pubspec.yaml`:

```yaml file=pubspec.yaml
# rest of your code

dependencies:
  flutter:
    sdk: flutter
  posthog_flutter: ^4.0.1

# rest of your code
```

Next, we configure PostHog using our project API key and instance address. You can find these in [your project settings](https://us.posthog.com/settings/project).

### Android setup

For Android, add your PostHog configuration to your `AndroidManifest.xml` file located in the `android/app/src/main` directory:

```xml file=android/app/src/main/AndroidManifest.xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="your.package.name">
    <application>
        <!-- ... other configuration ... -->
        <meta-data android:name="com.posthog.posthog.API_KEY" android:value="<ph_project_api_key>" />
        <meta-data android:name="com.posthog.posthog.POSTHOG_HOST" android:value="<ph_instance_address>" /> <!-- usually 'https://app.posthog.com' or 'https://eu.posthog.com' -->
        <meta-data android:name="com.posthog.posthog.TRACK_APPLICATION_LIFECYCLE_EVENTS" android:value="true" />
        <meta-data android:name="com.posthog.posthog.DEBUG" android:value="true" />
    </application>
</manifest>
```

You'll also need to update the minimum Android SDK version to `21` in `android/app/build.gradle`:

```gradle_kotlin file=android/app/build.gradle
// rest of your config

    defaultConfig {
      minSdkVersion 21
      // rest of your config
    }

// rest of your config
```

### iOS setup

For iOS, you'll need to have [Cocoapods](https://guides.cocoapods.org/using/getting-started.html) installed. Then add your PostHog configuration with your project API key and instance address to the `Info.plist` file located in the `ios/Runner` directory:

```xml file=ios/Runner/Info.plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
<!-- rest of your configuration -->
  <key>com.posthog.posthog.API_KEY</key>
  <string><ph_project_api_key></string>
  <key>com.posthog.posthog.POSTHOG_HOST</key>
  <string><ph_instance_address></string>  <!--  https://app.posthog.com or https://eu.posthog.com -->
  <key>com.posthog.posthog.CAPTURE_APPLICATION_LIFECYCLE_EVENTS</key>
  <true/>
  <key>com.posthog.posthog.DEBUG</key>
  <true/>
</dict>
</plist>
```

Then you need to set the minimum platform version to iOS 13.0 in your Podfile:

```yaml file=ios/Podfile
platform :ios, '13.0'

# rest of your config
```

### Web setup

For Web, add your `Web snippet` (which you can find in [your project settings](https://us.posthog.com/settings/project#snippet)) in the `<head>` of your `web/index.html` file:

```html file=web/index.html
<!DOCTYPE html>
<html>

<head>
  <!-- ... other head elements ... -->

  <script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init(
      '<ph_project_api_key>',
      {
        api_host:'<ph_instance_address>',
      }
    )
  </script>
</head>

<!-- ... other elements ... -->

</html>

```

## 3. Capture a custom event

The first part of setting up our A/B test in PostHog is setting up the goal metric. We'll use the number of clicks on the button on `FeatureScreenView` as our goal.

To measure this, we [capture a custom event](/docs/product-analytics/capture-events) `feature_button_clicked` when the button is clicked. To do this, update the code in `feature_screen_view.dart` to call [`Posthog().capture`](/docs/libraries/flutter#capturing-events) in `onPressed`:

```dart file=feature_screen_view.dart
import 'package:flutter/material.dart';
import 'package:posthog_flutter/posthog_flutter.dart';

class FeatureScreenView extends StatelessWidget {
  final bool isTestVariant;

  const FeatureScreenView({Key? key, required this.isTestVariant}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: isTestVariant ? Colors.green : Colors.red,
      body: Center(
        child: ElevatedButton(
          child: const Text('Click Me!'),
          onPressed: () async {
            await Posthog().capture(
              eventName: 'feature_button_clicked',
            );
          },
        ),
      ),
    );
  }
}
```

Once you’ve done this, reload your app and click the button a few times. You should see events appearing in the [PostHog events explorer](https://us.posthog.com/events).

<ProductScreenshot
  imageLight={EventsInPostHogLight} 
  imageDark={EventsInPostHogDark} 
  alt="Events captured in PostHog" 
  classes="rounded"
/>

## 4. Create an A/B test in PostHog

If you haven't done so already, you'll need to [upgrade](https://us.posthog.com/organization/billing) your PostHog account to include A/B testing. This requires entering your credit card, but don't worry, we have a [generous free tier](/pricing) of 1 million requests per month – so you won't be charged anything yet.

Next, go to the [A/B testing tab](https://us.posthog.com/experiments) and create an A/B test by clicking the **New experiment** button. Add the following details to your experiment:

1. Name it "My cool experiment".
2. Set "Feature flag key" to `my-cool-experiment`.
3. Under the experiment goal, select the `feature_button_clicked` event we created in the previous step.
4. Use the default values for all other fields.

Click "Save as draft" and then click "Launch".

<ProductScreenshot
  imageLight={TestSetupLight} 
  imageDark={TestSetupDark} 
  alt="Experiment setup in PostHog" 
  classes="rounded"
/>

## 5. Implement the A/B test code

The final step is to add the experiment code. We'll add code that does the following:

1. Fetch the `my-cool-experiment` flag using [`await Posthog().getFeatureFlag('my-cool-experiment')`](/docs/libraries/flutter#multivariate-feature-flags).
2. Change the background color of `FeatureScreenView` based on the value of the flag (`control` or `test`).

To do this, update the code in `main.dart` to the following:

```dart filename=main.dart
import 'package:flutter/material.dart';
import 'feature_screen_view.dart';
import 'package:posthog_flutter/posthog_flutter.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Flutter A/B Test App',
      home: MainScreen(),
    );
  }
}

class MainScreen extends StatelessWidget {
  const MainScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Main Screen')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('Hello, world!'),
            ElevatedButton(
              child: const Text('Go to Next Screen'),
              onPressed: () async { 
                final featureFlagValue = await Posthog().getFeatureFlag('my-cool-experiment');
                bool isTestVariant = featureFlagValue == 'test';
                if (context.mounted) {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => FeatureScreenView(isTestVariant: isTestVariant)),
                  );
                }
              }
            ),
          ],
        ),
      ),
    );
  }
}
```

That's it! Your A/B test is now ready. When you run your app, you see either green or red as the background color of `FeatureScreenView` and PostHog will capture button clicks for each variant to calculate if changing the color has a statistically significant impact.

Lastly, you can [view your test results](/docs/experiments/testing-and-launching#viewing-experiment-results) on the experiment page.

## Further reading

- [A software engineer's guide to A/B testing](/product-engineers/ab-testing-guide-for-engineers)
- [How to set up analytics in Flutter](/tutorials/flutter-analytics)
- [How to set up feature flags in Flutter](/tutorials/flutter-feature-flags)
