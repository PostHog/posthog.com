---
title: How to set up a React Native remote config (with Expo Router)
date: 2025-02-06
author:
 - ian-vanagas
tags:
 - feature flags
---

[Remote config](/docs/feature-flags/remote-config) enables you to update your React Native app's settings and behavior instantly without deploying new code or waiting for app store approval. This makes it perfect for controlling features on the fly and disabling problematic features if needed.

This tutorial shows you how to set up remote config in your React Native app using PostHog and Expo Router. We'll create a basic app that displays a message which we'll control using remote config.

## 1. Creating a new React Native app

First, let's create a new React Native app using the Expo Router template. This assumes you have [Node](https://nodejs.org/en/) installed and the Expo Go app on either [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) or [iOS](https://apps.apple.com/app/expo-go/id982107779).

```bash
npx create-expo-app@latest rn-remote-config
cd rn-remote-config
```

After this, run `npx expo start` and open it with Expo Go to see your app in action.

## 2. Adding PostHog to your app

With our app structure set up, let's install and configure PostHog. If you don't have a PostHog instance, you can [sign up for free](https://us.posthog.com/signup).

To start, install PostHog's React Native SDK and its dependencies:

```bash
npx expo install posthog-react-native expo-file-system expo-application expo-device expo-localization
```

Next, update your root layout file (`app/_layout.tsx`) to include the `PostHogProvider` set up with your project's API key and client host which you can find in [your project settings](https://us.posthog.com/settings/project).

```tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { PostHogProvider } from 'posthog-react-native'

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PostHogProvider
      apiKey="<ph_project_api_key>"
      options={{
        host: "<ph_client_api_host>", // usually 'https://us.i.posthog.com' or 'https://eu.i.posthog.com'
      }}
    >
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PostHogProvider>
  );
}

```

When you reload your app, you should see events autocaptured into PostHog.

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_06_at_14_15_07_2x_c0c48ed6ad.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_06_at_14_15_20_2x_59e92d7acb.png"
    alt="Events autocaptured in PostHog"
    classes="rounded"
/>

## 3. Creating a remote config in PostHog

With PostHog set up, let's create a remote config flags to control a message in app:

1. Go to the [feature flags tab](https://us.posthog.com/feature_flags) in PostHog and click **New feature flag**
2. Enter `welcome-message` as the key
3. Under **Served value**, select **Remote config (single payload)**
4. Set the payload to a string `"Welcome to our awesome app!"`
5. Click **Save**

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_06_at_14_19_41_2x_717510a9a5.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_02_06_at_14_19_27_2x_129ff2c847.png"
    alt="Creating a remote config in PostHog"
    classes="rounded"
/>

## 4. Creating and showing our remote config message

Next, create a new file in your `components` directory named `RemoteConfigDemo.tsx`. In it, we will check the feature flag with `useFeatureFlagWithPayload` and display the message:

```tsx
import React from 'react';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { useFeatureFlagWithPayload } from 'posthog-react-native';
import { Colors } from '@/constants/Colors';

export default function RemoteConfigDemo() {
  const colorScheme = useColorScheme() ?? 'light';
  const welcomeMessage = useFeatureFlagWithPayload('welcome-message') || 'Welcome!';

  return (
    <View style={styles.container}>
      <Text 
        style={[
          styles.text,
          { color: Colors[colorScheme].text }
        ]}
      >
        {welcomeMessage}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
  },
});

```

Use this component in your home tab file (`app/(tabs)/index.tsx`) like this:

```tsx
import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import RemoteConfigDemo from '@/components/RemoteConfigDemo';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <RemoteConfigDemo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

Finally, we can test our app by reloading or running `npx expo start` again and opening the Expo Go app. This will show the message from our remote config front and center. 

![Remote config works!](https://res.cloudinary.com/dmukukwp6/image/upload/image_0aacf23ff4.png)

## Further reading

- [Feature flags vs configuration: Which should you choose?](/product-engineers/feature-flags-vs-configuration)
- [How to set up analytics in React Native](/tutorials/react-native-analytics)
- [How to set up A/B tests in React Native](/tutorials/react-native-ab-tests)