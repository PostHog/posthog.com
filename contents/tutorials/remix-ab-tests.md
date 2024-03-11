---
title: How to set up A/B tests in Remix
date: 2024-02-01T00:00:00.000Z
author:
  - lior-neu-ner
tags:
  - experimentation
---

import { ProductScreenshot } from 'components/ProductScreenshot'
export const EventsInPostHogLight = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/remix-ab-tests/events-light.png"
export const EventsInPostHogDark = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/remix-ab-tests/events-dark.png"
export const TestSetupLight = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/remix-ab-tests/experiment-setup-light.png"
export const TestSetupDark = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/remix-ab-tests/experiment-setup-dark.png"

A/B tests help you improve your Remix by enabling you to compare the impact of changes on key metrics. To show you how to set one up, we create a basic Remix app, add PostHog, create an A/B test, and implement the code for it.

## 1. Create a Remix app

First, ensure [Node.js is installed](https://nodejs.dev/en/learn/how-to-install-nodejs/) (version 18.0 or newer). Then, create a new Remix app:

```bash
npx create-remix@latest
```

When prompted in the command line, name it what you like (we chose `remix-ab-test`) and choose all the default options.

Next, replace the code in `app/routes/_index.tsx` with a simple heading and button:

```ts file=_index.tsx
export default function Index() {
  const handleClick = () => {
    // Event handling logic will go here
  };

  return (
    <div id="app">
      <h1>Remix A/B Test</h1>
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
}
```

Run `npm run dev` and navigate to `http://localhost:3000` to see your app in action.

![Basic Remix app](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/remix-ab-tests/basic-app.png)

## 2. Add PostHog to your app

With our app set up, it’s time to install and set up PostHog. If you don't have a PostHog instance, you can [sign up for free](https://us.posthog.com/signup).

To start, install the [JavaScript web SDK](/docs/libraries/js):

```bash
npm i posthog-js
```

Then, go to `app/entry.client.tsx` and initialize PostHog as a component. You'll need both your API key and instance address (you can find these in your [project settings](https://us.posthog.com/project/settings)).

```ts file=entry.client.tsx
import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";
import posthog from "posthog-js";

function PosthogInit() {
  useEffect(() => {
    posthog.init('<ph_project_api_key>', {
      api_host: '<ph_instance_address>',
    });
  }, []);

  return null;
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
        <RemixBrowser />
        <PosthogInit/>
    </StrictMode>
  );
});
```

Once you’ve done this, reload your app and click the button a few times. You should see events appearing in the [PostHog events explorer](https://us.posthog.com/events).

<ProductScreenshot
  imageLight={EventsInPostHogLight} 
  imageDark={EventsInPostHogDark} 
  alt="Events captured in PostHog" 
  classes="rounded"
/>

## 3. Capture a custom event

The first part of setting up our A/B test in PostHog is setting up the goal metric. We'll use the number of clicks on the button as our goal.

To measure this, we [capture a custom event](/docs/product-analytics/capture-events) called `home_button_clicked` when the button is clicked. To do this, update the `handleClick()` function in `_index.tsx` to call `posthog.capture()`:

```ts file=_index.tsx
import posthog from 'posthog-js';

export default function Index() {
  const handleClick = () => {
    posthog.capture('home_button_clicked');
  };
  
  return (
    <div id="app">
      <h1>Remix A/B Test</h1>
      <button onClick={handleClick}>Click me!</button>
    </div>
  );
}
```

With this set up, refresh your app and click the button a few times to see the event captured in PostHog.

## 4. Create an A/B test in PostHog

If you haven't done so already, you'll need to [upgrade](https://us.posthog.com/organization/billing) your PostHog account to include A/B testing. This requires entering your credit card, but don't worry, we have a [generous free tier](/pricing) of 1 million requests per month – so you won't be charged anything yet.

Next, go to the [A/B testing tab](https://us.posthog.com/experiments) and create an A/B test by clicking the **New experiment** button. Add the following details to your experiment:

1. Name it "My cool experiment".
2. Set "Feature flag key" to `my-cool-experiment`.
3. Under the experiment goal, select the `home_button_clicked` event we created in the previous step.
4. Use the default values for all other fields.

Click "Save as draft" and then click "Launch".

<ProductScreenshot
  imageLight={TestSetupLight} 
  imageDark={TestSetupDark} 
  alt="Experiment setup in PostHog" 
  classes="rounded"
/>

## 5. Implement the A/B test code

When it comes to implementing our experiment code, there are two options:

1. Client-side rendering
2. Server-side rendering

We'll show you how to implement both.

### Client-side rendering

To implement the A/B test, we fetch the `my-cool-experiment` flag using [`posthog.onFeatureFlags`](/docs/libraries/js#ensuring-flags-are-loaded-before-usage) inside a `useEffect` hook. Then, we update the button text based on whether the user is in the `control` or `test` variant of the experiment:

```ts file=_index.tsx
import posthog from 'posthog-js';
import { useEffect, useState } from 'react';

export default function Index() {
  const handleClick = () => {
    posthog.capture('home_button_clicked');
  };

  const [buttonText, setButtonText] = useState('No variant')
  useEffect(() => {
    posthog.onFeatureFlags(() => {
      if (posthog.getFeatureFlag('my-cool-experiment') === 'control') {
        setButtonText('Control variant');
      } else if (posthog.getFeatureFlag('my-cool-experiment') === 'test') {
        setButtonText('Test variant');
      }
    })
  }, [])

  return (
    <div id="app">
      <h1>Remix A/B Test</h1>
      <button onClick={handleClick}>{buttonText}</button>
    </div>
  );
}
```

Now if you refresh your app, you should see the button text updated to either `Control variant` or `Test variant`. 

### Server-side rendering

Notice that when you refresh the page, the button text flickers between `No variant` and `Control/Test variant`. This is because it takes time for PostHog to load and make the feature flag request.

Server-side rendering is a way to avoid this. This fetches the feature flag before the page loads on the client.

To set this up, we must install and use [PostHog’s Node library](/libraries/node) (because we are making server-side requests).

```bash
npm install posthog-node
```

Next, we create a `posthog.js` file in the `app` folder. In it, we initialize the `posthog-node` client. We also set up logic to return the existing client if it is already initialized. Once again, you need your project API key and instance address from [your project settings](https://us.posthog.com/settings/project).

```js file=app/posthog.js
import { PostHog } from 'posthog-node';

let posthogNodeClient = null;

export default function PostHogNodeClient() {
  if (!posthogNodeClient) {
    posthogNodeClient = new PostHog('<ph_project_api_key>', {
      host: '<ph_instance_address>',
    });
  }
  return posthogNodeClient;
}
```

Next, we implement server-side rendering by adding the [loader function](https://remix.run/docs/en/main/route/loader) to our `_index.tsx` component. We fetch the feature flag using our PostHog Node client in this function and return the text for our button.

Replace your code in `_index.tsx` with the following:

```ts file=_index.tsx
import { LoaderFunctionArgs , json } from "@remix-run/node";
import { useLoaderData } from '@remix-run/react';
import posthog from "posthog-js";
import PostHogNodeClient from "../posthog"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const posthogNode = PostHogNodeClient()
  let buttonText = 'No variant'
  try {
    const distinctId = 'placeholder-user-id'
    const enabledVariant = await posthogNode.getFeatureFlag('my-cool-experiment', distinctId);
    if (enabledVariant === 'control') {
      buttonText = 'Control Variant';
    } else if (enabledVariant === 'test') {
      buttonText = 'Test Variant';
    }
  } catch (error) {
    buttonText = 'Error';
  }

  return json({ buttonText });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  const handleClick = () => {
    posthog.capture('home_button_clicked');
  };

  return (
    <div id="app">
      <h1>Remix A/B Test</h1>
      <button onClick={handleClick}>{data.buttonText}</button>
    </div>
  );
}
```

Now, when you refresh the page, the button text is already set when the page loads. 

#### Setting the correct `distinctId`

You may notice that we set `distinctId = 'placeholder-user-id'` in our flag call above. In production apps, to ensure you fetch the correct flag value for your user, `distinctId` should be set to their unique ID. 

For logged-in users, you typically use their email as their `distinctId`. However, for logged-out users, you can use the `distinct_id` property from their PostHog cookie:

```ts file=_index.tsx
import { LoaderFunctionArgs , json } from "@remix-run/node";
import { useLoaderData } from '@remix-run/react';
import posthog from "posthog-js";
import PostHogNodeClient from "../posthog"
import { parse } from 'cookie';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const posthogNode = PostHogNodeClient()
  let buttonText = 'No variant'

  const projectAPIKey = '<ph_project_api_key>' // your PostHog API key from your App Settings
  const cookies = parse(request.headers.get('cookie') || '');
  const cookieKey = `ph_${projectAPIKey}_posthog`;
  if (cookies[cookieKey]) {
    try {
      const distinctId = JSON.parse(cookies[cookieKey]).distinct_id;
      const enabledVariant = await posthogNode.getFeatureFlag('my-cool-experiment', distinctId);
      if (enabledVariant === 'control') {
        buttonText = 'Control Variant';
      } else if (enabledVariant === 'test') {
        buttonText = 'Test Variant';
      }
    } catch (error) {
      buttonText = 'Error';
    }
  }

  return json({ buttonText });
}

// rest of your code
```

In the scenario where your PostHog cookie is not available on the server side, you can fall back to the client side rendering approach of feature flags

## Further reading

- [How to set up Remix analytics, feature flags, and more](/tutorials/remix-analytics)
- [How to set up surveys in Remix](/tutorials/remix-surveys)
- [A software engineer's guide to A/B testing](/product-engineers/ab-testing-guide-for-engineers)
