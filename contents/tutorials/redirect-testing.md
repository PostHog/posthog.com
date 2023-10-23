---
title: How to do redirect testing
date: 2023-10-19
author: ["ian-vanagas"]
showTitle: true
sidebar: Docs
featuredImage: ../images/tutorials/banners/tutorial-16.png
tags: ['experimentation', 'feature flags']
---

Redirect testing is a way to A/B test web pages by redirecting users to one or the other.

To show you how to set up a redirect test with PostHog, we create a two-page Next.js app, create an experiment in PostHog, and then implement it in our app using middleware and feature flags. 

> **Note:** Although we are using Next.js in this tutorial, this method works with any framework where you can do server-side redirects.

## Creating our Next.js app and adding PostHog

To start, we create our Next.js app. Run the command below, select No for TypeScript, Yes to use the `App Router`, and the default for all the other options.

```bash
npx create-next-app@latest redirect-test
```

### Setting up PostHog

Next, we set up PostHog. Start by going into your new `redirect-test` folder and installing it.

```bash
cd redirect-test
npm i posthog-js
```

Next, in the `redirect-test/app` folder, create a `providers.js` file and set up a component that returns an initialized `PostHogProvider`. You can get the project API key and instance address you need for initialization from [your project settings](https://app.posthog.com/project/settings).

```js
// app/providers.js
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init("<ph_project_api_key>", {
    api_host: "<ph_instance_address>"
  })
}

export default function PHProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
```

Import the `PHProvider` component into `layout.js` and wrap your app in it.

```js
import './globals.css'
import PHProvider from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <PHProvider>
        <body>{children}</body>
      </PHProvider>
    </html>
  )
}
```

Once set up, PostHog autocaptures usage and you can use all its tools throughout your app.

## Adding test pages

In the `app` folder, create two new folders named `control` and `test`. In each of them, create a basic `page.js` file with a button to capture an event. This is what the control page looks like:

```js
// app/control/page.js
'use client'
import { usePostHog } from "posthog-js/react";

export default function Control() {
  const posthog = usePostHog();

  return (
    <main>
      <h1>Hello!</h1>
      <button onClick={() => posthog.capture("main_button_clicked")}>
        Click me!
      </button>
    </main>
  );
}
```

This is what the test page looks like:

```js
// app/test/page.js
'use client'
import { usePostHog } from "posthog-js/react";

export default function Test() {
  const posthog = usePostHog();

  return (
    <main>
      <h1>Hello from the bright side!</h1>
			<p>Clicking this button will bring you happiness</p>
      <button onClick={() => posthog.capture("main_button_clicked")}>
        I want to be happy!
      </button>
    </main>
  );
}
```

Now run `npm run dev`. Go to each of our pages to see that they work: `http://localhost:3000/control` and `http://localhost:3000/test`. 

Click the button on each page to capture a custom event in PostHog. We need it for our goal metric in our A/B test.

![Events](../images/tutorials/redirect-testing/events.png)

## Creating our A/B test

Our A/B test compares these two pages to see which drives more button clicks. To do this, we go to the [experiment tab](https://app.posthog.com/experiments) in PostHog and click "New experiment." Name your experiment and feature flag key (like `main-redirect`), set your experiment goal to `main_button_clicked`, and click "Save as draft."

![A/B test set up](../images/tutorials/redirect-testing/test.png)

Because we are working locally, you can click "Launch" right after and head back to your app to implement it. 

## Setting up the redirect test middleware

Next.js enables you to run middleware that intercepts and modifies requests for your app. We can use it to run our redirect test.

To start, create a `middleware.js` file in the base `redirect-test` directory. Match both the `/test` and `/control` paths and have the `/test` path redirect to control as a placeholder.

```js
// redirect-test/middleware.js
import { NextResponse } from 'next/server'

export async function middleware(request) {
  if (request.nextUrl.pathname=== '/test') {
    return NextResponse.redirect(new URL('/control', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/test', '/control'],
};
```

Next, we set up the logic for user IDs so we can target our test. We want the user experience to be consistent so we:

1. Check if a user ID exists in the PostHog cookie, and use it if so.
2. Create a user ID and bootstrap it to the client if not.

This requires using your project API key to get the cookies, parsing them as JSON, and potentially creating a distinct ID using `crypto.randomUUID()`. Altogether, this looks like this:

```js
import { NextResponse } from 'next/server'

export async function middleware(request) {
  const ph_project_api_key = '<ph_project_api_key>'
  const ph_cookie_key = `ph_${ph_project_api_key}_posthog`
  const cookie = request.cookies.get(ph_cookie_key);

  let distinct_id;
  if (cookie) {
    distinct_id = JSON.parse(cookie.value).distinct_id;
  } else {
    distinct_id= crypto.randomUUID();
  }
//... rest of code
```

### Evaluating our redirect test with PostHog

With our distinct ID, we can use the PostHog API to evaluate the `main-redirect` feature flag we set up earlier (because we can’t use PostHog SDKs in Next.js middleware). 

We evaluate the flag by making a POST request to the `https://app.posthog.com/decide?v=3` route (replace `app` with `eu` if you’re on EU Cloud) with your project API key and user distinct ID. From the response, we get the value of the `main-redirect` feature flag and use it to redirect to the right page. Altogether, this looks like this:

```js
//... rest of code

	const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      api_key: ph_project_api_key,
      distinct_id: distinct_id
    })
  };
  
  const ph_request = await fetch(
    'https://app.posthog.com/decide?v=3', // or eu
    requestOptions
  );
  const data = await ph_request.json();

  const flagResponse = data.featureFlags['main-redirect']

  if (request.nextUrl.pathname=== '/test' && flagResponse === 'control') {
    return NextResponse.redirect(new URL('/control', request.url))
  }
  if (request.nextUrl.pathname=== '/control' && flagResponse === 'test') {
    return NextResponse.redirect(new URL('/test', request.url))
  }
  return NextResponse.next()
}
//... rest of code
```

### Capturing exposure

To get accurate results for our experiment, we also need to capture a `$feature_flag_called` exposure event. This requires another POST request. We can add this in like this:

```js
//... rest of code
const flagResponse = data.featureFlags['main-redirect']

// Capture events, for exposure
const eventOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    api_key: ph_project_api_key,
    distinct_id: distinct_id,
    properties: {
      "$feature_flag": 'main-redirect',
      "$feature_flag_response": flagResponse
    },
    event: "$feature_flag_called"
  })
};

const eventRequest = await fetch(
  'https://app.posthog.com/capture',
  eventOptions
);

if (request.nextUrl.pathname === '/test' && flagResponse === 'control') {
//... rest of code
```

## Bootstrapping the data

The final piece to our redirect test is bootstrapping the user ID (and flags while we are at it). This provides the experiment data to the client-side PostHog initialization immediately and keeps the experience consistent across pageloads.

Bootstrapping requires formatting the flags and ID and then creating a `bootstrapData` cookie on the response. We also want to add a check for the `bootstrapData` cookie when we are creating the distinct ID so we don’t get two different IDs whenever we redirect.

When put together with everything else, our final `middleware.js` file looks like this:

```js
// middleware.js
import { NextResponse } from 'next/server'

export async function middleware(request) {
  const ph_project_api_key = '<ph_project_api_key>'
  const ph_cookie_key = `ph_${ph_project_api_key}_posthog`
  const cookie = request.cookies.get(ph_cookie_key);
  const bootstrapCookie = request.cookies.get('bootstrapData');

  let distinct_id;
  if (bootstrapCookie) {
    distinct_id = JSON.parse(bootstrapCookie.value).distinctId;
  } else if (cookie) {
    distinct_id = JSON.parse(cookie.value).distinct_id;
  } else {
    distinct_id = crypto.randomUUID();
  }

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      api_key: ph_project_api_key,
      distinct_id: distinct_id
    })
  };
  
  const ph_request = await fetch(
    'https://app.posthog.com/decide?v=3', // or eu
    requestOptions
  );
  const data = await ph_request.json();

  const flagResponse = data.featureFlags['main-redirect']

  // Capture events, for exposure
  const eventOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      api_key: ph_project_api_key,
      distinct_id: distinct_id,
      properties: {
        "$feature_flag": 'main-redirect',
        "$feature_flag_response": flagResponse
      },
      event: "$feature_flag_called"
    })
  };

  const eventRequest = await fetch(
    'https://app.posthog.com/capture',
    eventOptions
  );

  const bootstrapData = {
    distinctId: distinct_id,
    featureFlags: data.featureFlags
  }

  if (request.nextUrl.pathname === '/test' && flagResponse === 'control') {
    const newResponse = NextResponse.redirect(new URL('/control', request.url))
    newResponse.cookies.set('bootstrapData', JSON.stringify(bootstrapData))
    return newResponse
  }
  if (request.nextUrl.pathname === '/control' && flagResponse === 'test') {
    const newResponse = NextResponse.redirect(new URL('/test', request.url))
    newResponse.cookies.set('bootstrapData', JSON.stringify(bootstrapData))
    return newResponse
  }
  const newResponse = NextResponse.next()
  newResponse.cookies.set('bootstrapData', JSON.stringify(bootstrapData))
  return newResponse
}

export const config = {
  matcher: ['/test', '/control'],
};
```

### Handling bootstrap data on the frontend

To handle this bootstrap data on the frontend, we need to parse the cookie and pass the data to the PostHog initialization. We add this by first installing the `cookie-cutter` package.

```bash
npm i cookie-cutter
```

We then import and use it in `app/providers.js` to add the bootstrap data to our PostHog initialization like this:

```js
// app/providers.js
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import cookieCutter from 'cookie-cutter'

if (typeof window !== 'undefined') {
  const bootstrapData = cookieCutter.get('bootstrapData')

  let parsedBootstrapData = {}
  if (flags) {
    parsedBootstrapData = JSON.parse(flags)
  }

  posthog.init("<ph_posthog_project_api_key", {
    api_host: "<ph_instance_address>",
    bootstrap: parsedBootstrapData
  })
}

export default function PHProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
```

When we relaunch our application and go to either of the test or control routes, the middleware redirects users to the correct page, their experience remains consistent across reloads, and our redirect test is successfully running.

## Further reading

- [How to use Next.js middleware to bootstrap feature flags](/tutorials/nextjs-bootstrap-flags)
- [How to evaluate and update feature flags with the PostHog API](/tutorials/api-feature-flags)
- [How to bootstrap feature flags in React and Express](/tutorials/bootstrap-feature-flags-react)