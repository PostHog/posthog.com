---
title: How to set up Next.js error monitoring
date: 2025-03-18
author:
 - ian-vanagas
tags:
 - error tracking
---

Errors are an inevitable part of software development, but so is catching and fixing them. You can use error tracking in PostHog to help you do this.

To help you set this up, this tutorial details how to create a basic Next.js app, set up PostHog on both the front and backend, and then automatically capture errors that happen in both locations.

## 1. Creating a Next.js app

Start by ensuring [Node.js is installed](https://nodejs.dev/en/learn/how-to-install-nodejs/) (version 18.0 or newer) then run the following command. Say **no** to TypeScript, **yes** to app router, and the defaults for other options.

```bash
npx create-next-app@latest next-errors
```

Next, we can create our frontend which will have two parts:

1. A button that throws an error
2. A button that makes a request to our backend API

We can modify `app/page.js` to do this:

```js
'use client'

import styles from "./page.module.css";

export default function Home() {

  const handleErrorButtonClick = () => {
    throw new Error("Frontend error");
  }

  const handleAPIButtonClick = async () => {
    const response = await fetch("/api/test-error");
    const data = await response.json();
    console.log("data", data);
  }

  return (
    <div className={styles.page}>
      <h1>Welcome to our broken app</h1>
      <button onClick={handleErrorButtonClick}>
        Click me for an error
      </button>
      <button onClick={handleAPIButtonClick}>
        Click me for a backend API error
      </button>
    </div>
  );
}
```

Next, we need to set up our API. To do this, create a new `api` directory inside the `app` directory,  a `test-error` directory inside that, and then a `route.js` file inside that. In this file, create a basic `GET()` function that throws an error like this:

```js
// app/api/test-error/route.js
export async function GET() {
  throw new Error('Backend API error')
}
```

Once saved, run `npm run dev` to see your new app in action. Click either of the buttons to see the errors they trigger.

![Errors in our Next.js app](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_14_at_09_37_44_e92f247dbb.png)

## 2. Setting up PostHog

To start, in [your PostHog project settings under error tracking](https://us.posthog.com/settings/environment-error-tracking), toggle on **Enable exception autocapture**. Once done, go back to your app and install both `posthog-js` and `posthog-node`:

```bash
npm i posthog-js posthog-node
```

### Frontend setup

We'll set up PostHog in the frontend first. This starts by creating a `providers.js` file in the `app` directory. In it, we initialize PostHog with your project API key and host from [your project settings](https://us.posthog.com/settings/project) and pass it to a `PostHogProvider`.

```js
// app/providers.js
'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PostHogProvider({ children }) {
  useEffect(() => {
    posthog.init('<ph_project_api_key>', {
      api_host: '<ph_client_api_host>',
      defaults: '<ph_posthog_js_defaults>',
    })
  }, [])

  return (
    <PHProvider client={posthog}>
      {children}
    </PHProvider>
  )
}
```

We then import this into `layout.js` and wrap our app in it like this:

```js
import "./globals.css";
import { PostHogProvider } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}

```

PostHog then begins to autocapture events and frontend errors. If you go back to your app and click the **Click me for an error** button, you'll see an `$exception` event captured into PostHog.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_14_at_10_28_09_2x_d94a11ac4d.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_14_at_10_28_21_2x_9ffa049034.png"
  alt="PostHog"
  classes="rounded"
/>

### Backend setup

For the backend, we can create a `posthog-server.js` file in the `app` directory. In it, initialize PostHog from `posthog-node` as a singleton with your project API key and host from [your project settings](https://us.posthog.com/settings/project). This looks like this:

```js
// app/posthog-server.js
import { PostHog } from 'posthog-node'

let posthogInstance = null

export function getPostHogServer() {
  if (!posthogInstance) {
    posthogInstance = new PostHog(
      '<ph_project_api_key>',
      {
        host: '<ph_client_api_host>',
        flushAt: 1,
        flushInterval: 0
      }
    )
  }
  return posthogInstance
}
```

We can then import this singleton wherever we need it in the backend. Unfortunately, this doesn't autocapture errors by default, so we have some more work to do.

## 3. Capturing errors

With both front and backend initializations set up, capturing errors with PostHog is as simple as calling `captureException` or capturing an `$exception` event.

<MultiLanguage>

```js
posthog.captureException(error, additionalProperties)
```

```node
posthog.captureException(e, 'user_distinct_id', additionalProperties)
```

</MultiLanguage>

Doing this for every possible error is a hassle though and we'll inevitably miss errors we're not expecting. Our frontend implementation automatically captures errors thrown and caught by `onError` and `onUnhandledRejection` listeners, but this doesn't cover everything.

To capture more, we can set up some more boundaries and instrumentation.

### How to capture frontend render errors

To ensure all component errors are tracked, we can use the [built-in error boundary system](https://nextjs.org/docs/app/building-your-application/routing/error-handling). This is done by creating an `error.jsx` file like this:

```js
// app/error.jsx
'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

export default function Error({
  error,
  reset,
}) {
  useEffect(() => {
    posthog.captureException(error)
  }, [error])

  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>We've logged this error and will look into it.</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

This triggers when there is an error rendering your component. You can test this by setting up a `useEffect` in our `page.js` file that triggers a render error like this:

```js
'use client'
import { useState, useEffect } from 'react'

// ... rest of your code

  const [shouldError, setShouldError] = useState(false)

  useEffect(() => {
    setShouldError(true)
  }, [])

  if (shouldError) {
    throw new Error('This is a test error')
  }

// ... rest of your code
```

You can also create a similar `global-error.jsx` file to capture errors affecting the root layout or more granular error boundaries by adding `error.jsx` files to specific route segments.

### How to automatically capture backend errors

Because backend requests in Next.js vary between server-side rendering, short-lived processes and more, we can't rely on exception autocapture.

Instead, we create a [`instrumentation.js`](https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation) file at the root of our project and set up an `onRequestError` handler there. Importantly, we to both check the request is running in the `nodejs` runtime to ensure PostHog works and get the  `distinct_id` from the cookie to connect the error to a specific user.

This looks like this:

```js
// instrumentation.js
export function register() {
  // No-op for initialization
}

export const onRequestError = async (err, request, context) => {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { getPostHogServer } = require('./app/posthog-server')
    const posthog = await getPostHogServer()

    let distinctId = null
    if (request.headers.cookie) {
      const cookieString = request.headers.cookie
      const postHogCookieMatch = cookieString.match(/ph_phc_.*?_posthog=([^;]+)/)

      if (postHogCookieMatch && postHogCookieMatch[1]) {
        try {
          const decodedCookie = decodeURIComponent(postHogCookieMatch[1])
          const postHogData = JSON.parse(decodedCookie)
          distinctId = postHogData.distinct_id
        } catch (e) {
          console.error('Error parsing PostHog cookie:', e)
        }
      }
    }

    await posthog.captureException(err, distinctId || undefined)
  }
}
```

Now, when you click the **Click me for a backend API error** button, it will trigger an error which will be automatically captured by PostHog.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_14_at_15_30_05_2x_e99f29a546.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_14_at_15_30_23_2x_c4f513e4a7.png"
  alt="PostHog"
  classes="rounded"
/>

## 4. Monitoring errors in PostHog

Once you've set up error capture in your app, you can head to the [error tracking tab](https://us.posthog.com/error_tracking) in PostHog to review the issues popping up along with their frequency.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_14_at_15_39_23_2x_04c490c326.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_03_14_at_15_30_23_2x_c4f513e4a7.png"
  alt="PostHog"
  classes="rounded"
/>

You can click into any of these errors to get more details on them, including a stack trace as well as archive, resolve, or suppress them. On top of this, you can analyze `$exception` events like you would any event in PostHog, including setting up [trends](/docs/product-analytics/trends/overview) for them and querying them with [SQL](/docs/product-analytics/sql).

## 5. Uploading source maps

import NextJsUploadSourceMaps from "../docs/error-tracking/_snippets/nextjs-upload-source-maps.mdx"

<NextJsUploadSourceMaps />
