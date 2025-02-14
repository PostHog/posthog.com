---
title: How to set up Flutter remote config
date: 2025-01-27
author:
 - ian-vanagas
tags:
 - feature flags
---

[Remote config](/docs/feature-flags/remote-config) enables you to update your Flutter app's settings and behavior instantly without deploying new code or waiting for app store approval. This makes it perfect for controlling features on the fly and disabling problematic features if needed.

This tutorial shows you how to set up remote config in your Flutter app using PostHog. We'll create a basic Flutter app that displays a company logo and message, both of which we'll control using remote config.

## 1. Create a new Flutter app

First, ensure the [Flutter extension for VS Code](https://marketplace.visualstudio.com/items?itemName=Dart-Code.flutter) is installed and then create a new app by opening the VS Code command palette (`Ctrl/Cmd + Shift + P`), typing `flutter` and selecting `Flutter: New Project`.

Select `Empty Application` and name your app `flutter_remote_config`. Once created, replace your code in `lib/main.dart` with the following:

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Flutter PostHog remote config demo',
      home: MainScreen(),
    );
  }
}

class MainScreen extends StatelessWidget {
  const MainScreen({super.key});
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('PostHog remote config demo'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Image.network(
              'https://picsum.photos/200', // We'll update this with remote config
              width: 200,
              height: 200,
            ),
            const SizedBox(height: 20),
            const Text(
              'Welcome message goes here', // We'll update this with remote config
              style: TextStyle(fontSize: 20),
            ),
          ],
        ),
      ),
    );
  }
}

```

To test this works, we check for the emulation devices available with `flutter devices` and run the app for one of them. We'll use the web version and launch it like this:

```bash
flutter run -d chrome
```

![App working](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_27_at_11_29_20_fc0b070bbb.png)

## 2. Add PostHog to your app

With our app set up, it's time to install and set up PostHog. If you don't have a PostHog instance, you can [sign up for free](https://us.posthog.com/signup).

To start, install [PostHog's Flutter SDK](/docs/libraries/flutter) by adding `posthog_flutter` to your `pubspec.yaml`:

```yaml
dependencies:
  flutter:
    sdk: flutter
  posthog_flutter: ^4.0.1
```

Next, we configure PostHog in each platform using our project API key and instance address which you can find in [your project settings](https://us.posthog.com/settings/project).

### Android setup

For Android, add your PostHog configuration to your `AndroidManifest.xml` file located in `android/app/src/main` folder:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <application>
        <!-- ... other configuration ... -->
        <meta-data android:name="com.posthog.posthog.API_KEY" android:value="<ph_project_api_key>" />
        <meta-data android:name="com.posthog.posthog.POSTHOG_HOST" android:value="<ph_client_api_host>" />
        <meta-data android:name="com.posthog.posthog.TRACK_APPLICATION_LIFECYCLE_EVENTS" android:value="true" />
        <meta-data android:name="com.posthog.posthog.DEBUG" android:value="true" />
    </application>
</manifest>
```

You'll also need to update the minimum Android SDK version to `21` in `android/app/build.gradle`:

```
defaultConfig {
    minSdkVersion 21
    // rest of your config
}
```

### iOS setup

For iOS, you need to have [Cocoapods](https://guides.cocoapods.org/using/getting-started.html) installed and then add your PostHog configuration to the `Info.plist` file located in the `ios/Runner` directory:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
<!-- rest of your configuration -->
  <key>com.posthog.posthog.API_KEY</key>
  <string><ph_project_api_key></string>
  <key>com.posthog.posthog.POSTHOG_HOST</key>
  <string><ph_client_api_host></string>  <!--  <https://us.i.posthog.com> or <https://eu.i.posthog.com> -->
  <key>com.posthog.posthog.CAPTURE_APPLICATION_LIFECYCLE_EVENTS</key>
  <true/>
  <key>com.posthog.posthog.DEBUG</key>
  <true/>
</dict>
</plist>
```

Then set the minimum platform version to iOS 13.0 in your iOS Podfile:

```yaml
platform :ios, '13.0'

# ... rest of your config
```

### Web setup

For web, add your the [PostHog web snippet](/docs/getting-started/install?tab=snippet) (which you can find in [your project settings](https://us.posthog.com/settings/project#snippet)) in the `<head>` of your `web/index.html` file:

```html
<!DOCTYPE html>
<html>
<head>
  <!-- ... other head elements ... -->
  <script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init(
      '<ph_project_api_key>',
      {
        api_host:'<ph_client_api_host>',
      }
    )
  </script>
</head>
<!-- ... other elements ... -->
</html>
```

## 3. Create remote config flags in PostHog

With PostHog set up, let's create two remote config flags to control our app's configuration:

1. Go to the [feature flags tab](https://us.posthog.com/feature_flags) in PostHog and click **New feature flag**
2. Enter `company-logo-url` as the key
3. Under **Served value**, select **Remote config (single payload)**
4. Set the payload to a string of an image. We'll use PostHog's logo at `"/brand/posthog-logo@2x.png"`
5. Click **Save**

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_27_at_11_12_38_a2d0e6973b.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_27_at_11_12_51_2fe2a7ab28.png"
    alt="Creating a remote config flag in PostHog"
    classes="rounded"
/>

After this, repeat steps 1-5 to create another flag with key `welcome-message` and payload of `"Welcome to our awesome app!"`

## 4. Implement remote config in Flutter

Finally, we'll update our app to use these remote config values. To do this, we start by creating a new file in `lib` named `config_provider.dart`. In this file we create a `ConfigProvider` to manage our remote config state.

```dart
import 'package:flutter/material.dart';
import 'package:posthog_flutter/posthog_flutter.dart';

class ConfigProvider extends ChangeNotifier {
  String _logoUrl = 'https://picsum.photos/200'; // Default value
  String _welcomeMessage = 'Welcome message goes here'; // Default value

  String get logoUrl => _logoUrl;
  String get welcomeMessage => _welcomeMessage;

  Future<void> loadConfig() async {
    try {
      final logoPayload = await Posthog().getFeatureFlagPayload('company-logo-url');
      final messagePayload = await Posthog().getFeatureFlagPayload('welcome-message');

      if (logoPayload != null) {
        _logoUrl = logoPayload.toString();
      }

      if (messagePayload != null) {
        _welcomeMessage = messagePayload.toString();
      }

      notifyListeners();
    } catch (e) {
      debugPrint('Error loading remote config: $e');
    }
  }
}
```

Second, update your `main.dart` file to use the `ConfigProvider` and actually modify what users see in your app:

```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'config_provider.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => ConfigProvider(),
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      title: 'Flutter PostHog remote config demo',
      home: MainScreen(),
    );
  }
}

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  @override
  void initState() {
    super.initState();
    // Load remote config when the screen initializes
    Provider.of<ConfigProvider>(context, listen: false).loadConfig();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('PostHog remote config demo'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () {
              // Reload remote config when refresh button is pressed
              Provider.of<ConfigProvider>(context, listen: false).loadConfig();
            },
          ),
        ],
      ),
      body: Consumer<ConfigProvider>(
        builder: (context, config, child) {
          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Image.network(
                  config.logoUrl,
                  width: 200,
                  height: 200,
                ),
                const SizedBox(height: 20),
                Text(
                  config.welcomeMessage,
                  style: const TextStyle(fontSize: 20),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
```

Finally, add the `provider` package to your `pubspec.yaml`:

```yaml
dependencies:
  flutter:
    sdk: flutter
  posthog_flutter: ^4.0.1
  provider: ^6.1.1
```

Now, when we run our app, it fetches and displays the remote config values from PostHog. You either press `r` in the terminal or run your emulation device like `flutter run -d chrome` again to show this in action:

![Final app](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_01_27_at_11_23_20_9e88f6fc27.png)

## Further reading

- [Feature flags vs configuration: Which should you choose?](/product-engineers/feature-flags-vs-configuration)
- [How to set up analytics in Flutter](/tutorials/flutter-analytics)
- [How to set up A/B tests in Flutter](/tutorials/flutter-ab-tests)