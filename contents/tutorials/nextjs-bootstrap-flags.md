---
title: How to use Next.js middleware to bootstrap feature flags
date: 2023-07-04
author: ["ian-vanagas"]
showTitle: true
sidebar: Docs
tags: ["configuration", "feature flags"]
---

[Next.js middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware) enables you to run functions between requests and responses. We can use this to [bootstrap feature flags](/docs/feature-flags/bootstrapping-and-local-evaluation) on page load and make them available immediately without making an additional requests. This is useful for redirecting, showing components without flickering, avoiding layout changes, and more.

In this tutorial, we create a basic Next.js app, set up [feature flags](/docs/feature-flags) with PostHog, write middleware to get those feature flags, and bootstrap them in the client. 

## Create Next.js app and add PostHog

First, once [Node is installed](https://nodejs.dev/en/learn/how-to-install-nodejs/), create a Next.js app. Select **No** for TypeScript, **Yes** for `use app router`, and the defaults for every other option.

```bash
npx create-next-app@latest middle-bootstrap
```

Next, go into your app and install PostHog.

```bash
cd middle-bootstrap
npm i posthog-js
```

Once done, set up a PostHog provider by creating a new file in the `app` folder named `providers.js`. In this file, import `PostHogProvider`, initialize PostHog with your project API key and instance address (from your [project settings](https://app.posthog.com/project/settings)), and set up the provider component.

```js
// app/providers.js
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init("<ph_project_api_key>", {
    api_host: "<ph_client_api_host>"
  })
}

export default function PHProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
```

After this, import your provider component into `layout.js` and wrap your main app with it.

```js
// app/layout.js
import './globals.css'
import Providers from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  )
}
```

## Create and set up a feature flag

After setting up PostHog, we need a [feature flag](/docs/feature-flags). To create one, go to the [feature flag tab](https://app.posthog.com/feature_flags) in your PostHog instance, and click "New feature flag." Add a key (like `bootstrap-test`), set rollout to 100% of users, and press save.

![Flag creation video](../images/tutorials/nextjs-bootstrap-flags/flag.mp4)

Back in your app, set up the base `page.js` file to check the flag:

```js
// app/page.js
'use client'
import { usePostHog } from 'posthog-js/react'

export default function Home() {

  const posthog = usePostHog()
  const flag = posthog.isFeatureEnabled('bootstrap-test')

  return (
    <>
      <h1>Bootstrapping flags test</h1>
      <h2>{flag ? 'PostHog is awesome' : 'Not yet'}</h2>
    </>
  )
}
```

Once done, you can run the site by running the `npm run dev` command. Go to your site running on your [localhost](http://localhost) and you might see "Not yet." Refresh and, if your feature flag is set up correctly, it changes to "PostHog is awesome." This means the flag works, but the app isn’t loading the feature flag value right away. To solve this, we can bootstrap the feature flags. 

![Load site with flags video](../images/tutorials/nextjs-bootstrap-flags/load.mp4)

## Getting feature flags with Next.js middleware

To load flags right away and prevent "flickering", we can bootstrap them. This means getting the flag data from PostHog in between a request and page load. We can do this with Next.js middleware. 

To set this up, create a `middleware.js` file. Create it in your base directory (not in the `app` directory). In this file, start by handling the request and setting up the matcher `config` with a negative lookahead to remove non-page requests.

```js
// middleware.js
import { NextResponse } from 'next/server'

export async function middleware(request) {
  const response = NextResponse.next()
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico|vercel.svg|next.svg).*)'],
};
```

Next, use your project API key (found in your [project settings](https://app.posthog.com/project/settings)) to get your cookie. With the cookie, check for the distinct ID or create one if it isn’t found.

```js
// middleware.js
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
//...
```

With the distinct ID, we can make an API request to evaluate flags for the user. This requires making a request to `https://us.i.posthog.com/decide?v=3` (or `https://eu.i.posthog.com/decide?v=3`) with the `api_key` and `distinct_id`. 

> **Note:** We use the API because [Vercel edge middleware](https://vercel.com/docs/concepts/functions/edge-middleware) (which optimizes the speed of this request in your app) has a limited number of packages and `posthog-node` isn’t one of them.

```js
//...
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
	'<ph_client_api_host>/decide?v=3',
	requestOptions
);
const data = await ph_request.json();
//...
```

With the flag data, we can create an object to use the client-side bootstrapping and then pass this value as a cookie. Altogether, this looks like this:

```js
// middleware.js
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
		'<ph_client_api_host>/decide?v=3', // or eu
		requestOptions
	);
  const data = await ph_request.json();

  const bootstrapData = {
    distinctID: distinct_id,
    featureFlags: data.featureFlags
  }

  const response = NextResponse.next()
  response.cookies.set('bootstrapData', JSON.stringify(bootstrapData))

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico|vercel.svg|next.svg).*)'],
};
```

Next, we will handle this data in the client and use it to bootstrap flags. 

## Bootstrapping feature flags

With the feature flag data passed to the frontend, we need the code to handle it there. First, install the `cookie-cutter` package to handle cookies.

```bash
npm i cookie-cutter
```

Once installed, go back to `providers.js` to get the cookie data and bootstrap it into our PostHog initialization.

```js
// app/providers.js
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import cookieCutter from 'cookie-cutter'

if (typeof window !== 'undefined') {
  const flags = cookieCutter.get('bootstrapData')

  let bootstrapData = {}
  if (flags) {
    bootstrapData = JSON.parse(flags)
  }

  posthog.init("<ph_project_api_key>", {
    api_host: "<ph_client_api_host>",
    bootstrap: bootstrapData
  })
}

export default function PHProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
```

Finally, rework our `page.js` file to check that the flag isn’t undefined before using its value.

```js
// app/page.js
'use client'
import { usePostHog } from 'posthog-js/react'
import { useEffect, useState } from 'react'

export default function Home() {

  const [flag, setFlag] = useState(false)
  const posthog = usePostHog()

  useEffect(() => {
    const ph_flag = posthog.isFeatureEnabled('bootstrap-test') 

    if (typeof ph_flag !== 'undefined') {
      setFlag(ph_flag)
    }
  }, [])

  return (
    <>
      <h1>Bootstrapping flags test</h1>
      <h2>{flag ? 'PostHog is awesome' : 'Not yet'}</h2>
    </>
  )
}
```

Once you restart your app to reinitialize PostHog, your flags load instantly.

> **When to bootstrap vs use cookies?** You might think to use cookies directly, but they don’t update when properties change. You should use bootstrapping and the `posthog-js` library when you want flags to update over time in the user session. For example, when they do something that updates properties like opt into a beta.

> **Note:** When using Next.js v12, there's a [bug in 12.3.0](https://github.com/vercel/next.js/issues/39262) that can cause session recording not to work when using this method. To fix this, use a version of Next.js v12 at least at v12.3.4.


## Further reading

- [How to bootstrap feature flags in React and Express](/tutorials/bootstrap-feature-flags-react)
- [Testing frontend feature flags with React, Jest, and PostHog](/tutorials/test-frontend-feature-flags)
- [How to evaluate and update feature flags with the PostHog API](/tutorials/api-feature-flags)
