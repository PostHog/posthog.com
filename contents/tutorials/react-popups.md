---
title: How to add popups to your React app with PostHog
date: 2023-03-10
author: ["ian-vanagas"]
showTitle: true
sidebar: Docs
featuredImage: ../images/tutorials/banners/tutorial-3.png
topics: ['experimentation', 'feature flags']
---

Popups are ways to highlight features in your app. We recently created a way to add popups to your React app and control them using feature flags and payloads. The use of payloads enables easy customization and control of popups. This tutorial shows how to set this all up.

## Creating a React app

We need a React app to start. Make sure you [installed Node](https://nodejs.dev/en/learn/how-to-install-nodejs/), then create one using the `create-react-app` command in your terminal named "popups":

```bash
npx create-react-app popups
```

Next, go into the newly created popups folder and run the app to make sure everyone installed correctly.

```bash
cd popups
npm start
```

If that worked, we now have a running React app where we can add popups and prompts.

![React app](../images/tutorials/react-popups/app.png)

## Installing PostHog

Next, we must install PostHog to control the popups. If you don’t have a PostHog instance, [you can signup for one for free](https://app.posthog.com/signup). To add PostHog, first install `posthog-js`.

```bash
npm i posthog-js
```

In `src/index.js`, initialize PostHog with your project API key and instance address and wrap your app in a PostHogProvider.

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import posthog from 'posthog-js';
import { PostHogProvider} from 'posthog-js/react'

posthog.init(
  '<ph_project_api_key>',
  {
    api_host: '<ph_instance_address>',
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </React.StrictMode>
);
```

After restarting your app and going to your app, you should see events captured in your PostHog instance.

![Events](../images/tutorials/react-popups/events.png)

## Adding the code for the popup

Next, add the control that displays the popups and control when and where they display. 

Go to the [PostHog popup repository](https://github.com/PostHog/posthog-prompts) and clone the code. From this newly cloned code, copy the `Popup.js` `Popup.css` and `popup-location.js` files from the `react/src` folder over to our `popups/src` folder.

> **Note:** this isn't the case yet, but ideally we would tell users to install
`npm i @posthog/popups`

In `index.js`, import the popup code and add the `<Popup />` component to the app.

```js
// src/index.js
// ...
import { Popup } from './Popup'

//...

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
      <App />
      <Popup />
    </PostHogProvider>
  </React.StrictMode>
);
```

After you’ve done this, you’re ready to set up the feature flag to control your popup.

## Create your popup feature flag

The next step is to create a feature flag with a payload to control the content. In PostHog, go to the feature flag tab and click the "New feature flag" button.

1. Name your flag something starting with `popup-`
2. Add an extra filter to exclude users with the property `$popup-{unique name}` is not set so that the popup is only shown once for each user
3. Set the rollout to 100%
4. Add your content in JSON as the payload like:

```js
{
    "title": "Learn more about PostHog",
    "body": "PostHog is an all in one suite of product and data tools",
    "primaryButtonText": "Go to PostHog",
    "primaryButtonURL": "/",
    "secondaryButtonText": "Got it",
    "location": "absolute-bottom-right"
}
```

Save the flag, head back to your app, and you see a popup in the bottom right corner.

![Popup](../images/tutorials/react-popups/popup.png)

## Relatively positioning your popup

We can customize our popup by positioning it relative to elements on our page. This enables you to use these to show off specific features similar to a product tour. 

To set this up, change the location to `relative-bottom` and add a `locationCSSSelector` key with value `[class='App-link']`. Our payload now looks like this:

```json
{
    "title": "Learn more about PostHog",
    "body": "PostHog is an all in one suite of product and data tools",
    "primaryButtonText": "Go to PostHog",
    "primaryButtonURL": "/",
    "secondaryButtonText": "Got it",
    "location": "relative-right",
    "locationCSSSelector": "[class='App-link']"
}
```

This sets the popup to the relative right of the element you selected. You can then use this to set up product tours across multiple features in your app. It is also useful if you only want the popup to show on specific pages.

![Relative popup](../images/tutorials/react-popups/relative.png)

## Creating your popup as an experiment

You can also set up an experiment to test that popups drive usage of the features you are showcasing. To do this:

1. Go to the "Experiments" tab, click "Create experiment"
2. Fill in the details including your desired goal, but make sure your feature flag key starts with `popup-`.
3. Save and launch your experiment.
4. Go to the "Feature flags" tab, and choose your newly created flag. Click the "Edit" button for the flag.
5. Add your payload to the `test` variant key and click "Save."
6. Your experiment is live and is testing the popup on users. You can see it’s results and impact on the goal back in the experiment details.

## Further reading

- [Get feedback and book user interviews with site apps](/tutorials/feedback-interviews-site-apps)
- [Running experiments on new users](/tutorials/new-user-experiments)
- [How to set up Next.js A/B tests](/tutorials/nextjs-ab-tests)