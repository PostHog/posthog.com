---
title: Next.js
icon: ../../images/docs/integrate/frameworks/nextjs.svg
features:
  eventCapture: true
  userIdentification: true
  autoCapture: true
  sessionRecording: true
  featureFlags: true
  groupAnalytics: true
---

PostHog makes it easy to get data about traffic and usage of your [Next.js](https://nextjs.org/) app. Integrating PostHog into your site enables analytics about user behavior, custom events capture, session recordings, feature flags, and more.

This guide walks you through integrating PostHog into your Next.js app using the [React](/docs/libraries/react) and the [Node.js](/docs/libraries/node) SDKs.

> You can see a working example of this integration in our [Next.js demo app](https://github.com/PostHog/posthog-js/tree/master/playground/nextjs).

Next.js has both client and server-side rendering, as well as pages and app routers. We'll cover all of these options in this guide.

## Prerequisites

To follow this guide along, you need:

1. A PostHog instance (either [Cloud](https://app.posthog.com/signup) or [self-hosted](/docs/self-host))
2. A Next.js application

## Client-side setup

Install `posthog-js` using your package manager:

```shell
yarn add posthog-js
# or
npm install --save posthog-js
```

Add your environment variables to your `.env.local` file and to your hosting provider (e.g. Vercel, Netlify, AWS). You can find your project API key in your [project settings](https://app.posthog.com/project/settings).

```shell file=.env.local
NEXT_PUBLIC_POSTHOG_KEY=<ph_project_api_key>
NEXT_PUBLIC_POSTHOG_HOST=<ph_instance_address>
```

These values need to start with `NEXT_PUBLIC_` to be accessible on the client-side.

### Pages router

If your Next.js app uses the [pages router](https://nextjs.org/docs/pages), you can integrate PostHog at the root of your app (`pages/_app.js`).

```js
// pages/_app.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    // Enable debug mode in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug()
    }
  })
}

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // Track page views
    const handleRouteChange = () => posthog?.capture('$pageview')
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <PostHogProvider client={posthog}>
      <Component {...pageProps} />
    </PostHogProvider>
  )
}
```

### App router

If your Next.js app to uses the [app router](https://nextjs.org/docs/app), you can integrate PostHog by creating a `providers` file in your app folder. This is because the `posthog-js` library needs to be initialized on the client-side using the Next.js [`'use client'` directive](https://nextjs.org/docs/getting-started/react-essentials#client-components).

<MultiLanguage>

```js
// app/providers.js
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false // Disable automatic pageview capture, as we capture manually
  })
}

export function PHProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
```

```ts
// app/providers.tsx
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false // Disable automatic pageview capture, as we capture manually
  })
}

export function PHProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
```

</MultiLanguage>

Then, to capture pageviews, we set up a `PostHogPageView` component to listen to url path changes:

<MultiLanguage>

```js
// app/PostHogPageView.jsx
'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { usePostHog } from 'posthog-js/react';

export default function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();
  // Track pageviews
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      posthog.capture(
        '$pageview',
        {
          '$current_url': url,
        }
      )
    }
  }, [pathname, searchParams, posthog])
  
  return null
}
```

```ts
// app/PostHogPageView.tsx
'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { usePostHog } from 'posthog-js/react';

export default function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();
  // Track pageviews
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      posthog.capture(
        '$pageview',
        {
          '$current_url': url,
        }
      )
    }
  }, [pathname, searchParams, posthog])
  
  return null
}
```

</MultiLanguage>


Then, import the `PHProvider` component into your `app/layout` file and wrap your app with it. We also dynamically import the `PostHogPageView` component and include it as a child of `PHProvider`.

> **Why is `PostHogPageView` dynamically imported?** It contains the [`useSearchParams`](https://nextjs.org/docs/app/api-reference/functions/use-search-params) hook, which [deopts](https://nextjs.org/docs/messages/deopted-into-client-rendering) the entire app into client-side rendering if it is not dynamically imported.

<MultiLanguage>

```js
// app/layout.js

import './globals.css'
import { PHProvider } from './providers'
import dynamic from 'next/dynamic'

const PostHogPageView = dynamic(() => import('./PostHogPageView'), {
  ssr: false,
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <PHProvider>
        <body>
          <PostHogPageView /> 
          {children}
        </body>
      </PHProvider>
    </html>
  )
}
```

```ts
// app/layout.tsx

import './globals.css'
import { PHProvider } from './providers'

import dynamic from 'next/dynamic'

const PostHogPageView = dynamic(() => import('./PostHogPageView'), {
  ssr: false,
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <PHProvider>
        <body>
          <PostHogPageview /> 
          {children}
        </body>
      </PHProvider>
    </html>
  )
}
```

</MultiLanguage>

PostHog is now set up and ready to go. Files and components accessing PostHog on the client-side need the `'use client'` directive.

### Accessing PostHog using the provider

PostHog can then be accessed throughout your Next.js app by using the `usePostHog` hook. See the [React SDK docs](/docs/libraries/react) for examples of how to use:

- [posthog-js functions like custom event capture, user identification, and more.](/docs/libraries/react#using-posthog-js-functions)
- [Feature flags including variants and payloads.](/docs/libraries/react#feature-flags)

You can also read [the full posthog-js documentation](/docs/libraries/js) for all the usable functions.

## Server-side analytics

Server-side rendering enables you to render pages on the server instead of the client. This can be useful for SEO, performance, and user experience.

To integrate PostHog into your Next.js app on the server-side, you can use the [Node SDK](/docs/libraries/node).

First, install the `posthog-node` library:

```shell
yarn add posthog-node
# or
npm install --save posthog-node
```

### Pages router

For the pages router, we can use the `getServerSideProps` function to access PostHog on the server-side, send events, evaluate feature flags, and more.

This looks like this:

```js
// pages/posts/[id].js
import { useContext, useEffect, useState } from 'react'
import { getServerSession } from "next-auth/next"
import { PostHog } from 'posthog-node'

export default function Post({ post, flags }) {
  const [ctaState, setCtaState] = useState()

  useEffect(() => {
    if (flags) {
      setCtaState(flags['blog-cta'])
    }
  })

  return (
    <div>
      <h1>{post.title}</h1>
      <p>By: {post.author}</p>
      <p>{post.content}</p>
      {ctaState &&
        <p><a href="/">Go to PostHog</a></p>
      }
      <button onClick={likePost}>Like</button>
    </div>
  )
}

export async function getServerSideProps(ctx) {

  const session = await getServerSession(ctx.req, ctx.res)
  let flags = null

  if (session) {
    const client = new PostHog(
      process.env.NEXT_PUBLIC_POSTHOG_KEY,
      {
        host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      }
    )

    flags = await client.getAllFlags(session.user.email);
    client.capture({
      distinctId: session.user.email,
      event: 'loaded blog article',
      properties: {
        $current_url: ctx.req.url,
      },
    });

    await client.shutdownAsync()
  }

  const { posts } = await import('../../blog.json')
  const post = posts.find((post) => post.id.toString() === ctx.params.id)
  return {
    props: {
      post,
      flags
    },
  }
}
```

> **Note**: Make sure to _always_ call `client.shutdownAsync()` after sending events from the server-side.
> PostHog queues events into larger batches, and this call forces all batched events to be flushed immediately.

### App router

For the app router, we can initialize the `posthog-node` SDK once with a `PostHogClient` function, and import it into files.

This enables us to send events and fetch data from PostHog on the server – without making client-side requests.

```js
// app/posthog.js
import { PostHog } from 'posthog-node'

export default function PostHogClient() {
  const posthogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0
  })
  return posthogClient
}
```

> **Note:** Because our server-side `posthog-node` initializations are short-lived, we set `flushAt` to `1` and `flushInterval` to `0`. `flushAt` sets how many how many capture calls we should flush the queue (in one batch). `flushInterval` sets how many milliseconds we should wait before flushing the queue. Setting them to the lowest number ensures events are sent immediately and not batched. We also need to call `await posthog.shutdownAsync()` once done.


```js
import Link from 'next/link'
import PostHogClient from '../posthog'

export default async function About() {

  const posthog = PostHogClient()
  const flags = await posthog.getAllFlags(
    'user_distinct_id' // replace with a user's distinct ID
  );
  await posthog.shutdownAsync()

  return (
    <main>
      <h1>About</h1>
      <Link href="/">Go home</Link>
      { flags['main-cta'] &&
        <Link href="http://posthog.com/">Go to PostHog</Link>
      }
    </main>
  )
}
```

## Configuring a reverse proxy to PostHog

To improve the reliability of client-side tracking and make requests less likely to be intercepted by tracking blockers, you can setup a reverse proxy in Next.js. Read more about deploying a reverse proxy using [Next.js rewrites](/docs/advanced/proxy/nextjs), [Next.js middleware](/docs/advanced/proxy/nextjs-middleware), and [Vercel rewrites](/docs/advanced/proxy/vercel).

## Further reading

- [How to set up Next.js app router analytics, feature flags, and more](/tutorials/nextjs-app-directory-analytics)
- [How to set up Next.js analytics, feature flags, and more](/tutorials/nextjs-analytics)
- [How to set up Next.js A/B tests](/tutorials/nextjs-ab-tests)
