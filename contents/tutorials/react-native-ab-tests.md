---
title: How to set up A/B tests in React Native (Expo)
date: 2024-03-01
author: ["lior-neu-ner"]
tags: ['experimentation']
---

import { ProductScreenshot } from 'components/ProductScreenshot'
import EventsInPostHogLight from '../images/tutorials/react-native-ab-tests/events-light.png'
import EventsInPostHogDark from '../images/tutorials/react-native-ab-tests/events-dark.png'
import TestSetupLight from '../images/tutorials/react-native-ab-tests/experiment-setup-light.png'
import TestSetupDark from '../images/tutorials/react-native-ab-tests/experiment-setup-dark.png'

[A/B tests](/ab-testing) helps you improve your React Native app by enabling you to compare the impact of changes on key metrics. 

PostHog makes [A/B testing in React Native](/docs/experiments/installation?tab=React+Native) simple. To show you how to set it up, we create a basic app with Expo, add PostHog, create an A/B test, and implement the code for it.

> This tutorial focuses on React Native apps built with [Expo](https://expo.dev/). However, PostHog also supports non-Expo apps. See our [React Native docs](/docs/libraries/react-native) for details.

## 1. Create a new React Native app

Our app will have two screens:

1. The first screen will have a button which navigates you to a second screen. 
2. The second screen will either have a `red` or `green` background color – depending on whether the user is in the `control` or `test` variant of our A/B test. It will also have a button which captures an event when it's pressed. We'll use this event as our goal metric for the test.

First, ensure you have [Node (v14.0 or newer)](https://nodejs.dev/en/learn/how-to-install-nodejs/) and [Watchman](https://facebook.github.io/watchman/docs/install) installed. You also need the Expo Go app on either [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&pli=1) or [iOS](https://apps.apple.com/app/expo-go/id982107779).

Then create and run a new app:

```bash
npx create-expo-app rn-ab-tests
cd rn-ab-tests
npx expo start
```

Open your Expo Go app on your mobile device, scan the QR code in your terminal, and it should open an app with a white screen and some text.

![Basic app](../images/tutorials/react-native-analytics/basic.png)

Next, we set up our app's basic functionality. To set up our stack navigator, we install `@react-navigation/native-stack` as a dependency and create a new file `AppNavigator.js` in our project directory. We also create two new files for our screens:

```bash
npm install @react-navigation/native-stack
touch AppNavigator.js
touch FirstScreen.js
touch SecondScreen.js
```

Add the following code to `AppNavigator.js`:

```js file=AppNavigator.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FirstScreen" component={FirstScreen} options={{ title: 'First Screen' }} />
      <Stack.Screen name="SecondScreen" component={SecondScreen} options={{ title: 'Second Screen' }} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
```

Then replace the code in `App.js` to use the navigator:

```js file=App.js
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
```

Next we set up the code for our screens:

```js file=FirstScreen.js
import { View, Button, StyleSheet } from 'react-native';

export default function FirstScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Second Screen"
        onPress={() => navigation.navigate('SecondScreen')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

```js file=SecondScreen.js
import { View, Button, StyleSheet } from 'react-native';

export default function SecondScreen() {
  const backgroundColor = 'red';
  const onButtonPress = () => {
    // We add code here later
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Button title="Capture Event" onPress={onButtonPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

Our basic set up is now complete. Re-run `npx expo start` to see our app in action.

## 2. Add PostHog to your app

With our app set up, it’s time to install and set up PostHog. If you don't have a PostHog instance, you can [sign up for free](https://us.posthog.com/signup).

To start, run `npx expo install posthog-react-native expo-file-system expo-application expo-device expo-localization` to install [PostHog’s React Native SDK](/docs/libraries/react-native).

Then, we set up the `PostHogProvider` in `App.js` so that we can access our client throughout the app:

```js file=App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import { PostHogProvider } from 'posthog-react-native'

export default function App() {
  return (
    <NavigationContainer>
      <PostHogProvider apiKey="<ph_project_api_key>" options={{
        host: "<ph_client_api_host>", // usually 'https://us.i.posthog.com' or 'https://eu.i.posthog.com'
      }}>
        <AppNavigator />
      </PostHogProvider>
    </NavigationContainer>
  );
}
```

You can find your project API key and instance address in [your project settings](https://us.posthog.com/project/settings).

Finally, we [capture a custom event](/docs/libraries/react-native#capturing-events) when the button on `SecondScreen` is clicked. We'll use this event as our goal metric in our A/B test.

```js SecondScreen.js
import { View, Button, StyleSheet } from 'react-native';
import { usePostHog } from 'posthog-react-native'

function SecondScreen() {
  const backgroundColor = 'red';

  const posthog = usePostHog()
  const onButtonPress = () => {
    posthog.capture("second_screen_button_clicked")
  };

  // rest of your code
```

To check your setup, re-run your app. Click your button a few times. You should start seeing events in the [activity tab](https://us.posthog.com/events).

<ProductScreenshot
  imageLight={EventsInPostHogLight} 
  imageDark={EventsInPostHogDark} 
  alt="Events captured in PostHog" 
  classes="rounded"
/>

## 3. Create an A/B test in PostHog

If you haven't done so already, you'll need to [upgrade](https://us.posthog.com/organization/billing) your PostHog account to include A/B testing. This requires entering your credit card, but don't worry, we have a [generous free tier](/pricing) of 1 million requests per month – so you won't be charged anything yet.

Next, go to the [A/B testing tab](https://us.posthog.com/experiments) and create an A/B test by clicking the **New experiment** button. Add the following details to your experiment:

1. Name it "My cool experiment".
2. Set "Feature flag key" to `my-cool-experiment`.
3. Under the experiment goal, select the `second_screen_button_clicked` event we captured in the previous step.
4. Use the default values for all other fields.

Click "Save as draft" and then click "Launch".

<ProductScreenshot
  imageLight={TestSetupLight} 
  imageDark={TestSetupDark} 
  alt="Experiment setup in PostHog" 
  classes="rounded"
/>

## 4. Implement the A/B test code

The final step is to add the experiment code. We'll add code that does the following:

1. Fetch the `my-cool-experiment` flag.
2. Change the background color of `SecondScreen` based on the value of the flag (`control` or `test`).

To do this, we implement the [`useFeatureFlag`](/docs/libraries/react-native#feature-flags) hook:

```js file=SecondScreen.js
import { View, Button, StyleSheet } from 'react-native';
import { usePostHog, useFeatureFlag } from 'posthog-react-native'

function SecondScreen() {
  const multiVariantFeature = useFeatureFlag('my-cool-experiment')
  const backgroundColor = (multiVariantFeature === 'test') ? 'green' : 'red';

  // rest of your code
```

That's it! Your A/B test is now ready. When you run your app, you see either green or red as the background color of `SecondScreen`. PostHog will capture button clicks for each variant to calculate if changing the color has a statistically significant impact.

If you want to test both variants of your experiment to make sure they are working correctly, you can add an [optional override](/docs/feature-flags/testing#method-1-assign-a-user-a-specific-flag-value) to your feature flag:

```js file=SecondScreen.js
const posthog = usePostHog()
posthog.overrideFeatureFlag({'my-cool-experiment': 'control'}) 
```

Lastly, you can [view your test results](/docs/experiments/testing-and-launching#viewing-experiment-results) on the experiment page.

## Further reading

- [A software engineer's guide to A/B testing](/product-engineers/ab-testing-guide-for-engineers)
- [How to set up React Native (Expo) analytics, feature flags, and more](/tutorials/react-native-analytics)
- [How to set up A/B tests in iOS](/tutorials/ios-ab-tests)
