---
title: 'How to set up Next.js app router analytics, feature flags, and more'
date: 2025-05-22
author:
  - ian-vanagas
showTitle: true
sidebar: Docs
featuredVideo: 'https://www.youtube-nocookie.com/embed/trk8LM2FQKw'
tags:
  - configuration
  - feature flags
  - events
---

Next.js is one of the most popular frameworks for building web apps. Need to know what users are doing in these apps or release a feature safely? PostHog can help.

In this tutorial, we'll create a simple Next.js app and set up PostHog on the client and server side. We'll also capture pageviews and custom events, set up feature flags, and more.

> If you use Next.js with the **pages** router, check out our other [Next.js pages router analytics tutorial](/tutorials/nextjs-analytics).

## Creating a Next.js app with the app router

First, once [Node is installed](https://nodejs.dev/en/learn/how-to-install-nodejs/), create a Next.js app. Select **No** for TypeScript, **Yes** for `use app router`, and the defaults for every other option.

```bash
npx create-next-app@latest next-app
```

We name our app `next-app` and can go into the newly created folder to run it.

```bash
cd next-app
npm run dev
```

This opens a new page showing we are running Next.js.

![Next.js app](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_05_22_at_13_55_42_2x_ad54322d19.png)

Next, we'll add a couple pages to the app. In the app folder, create a new folder named `about` and create a `page.js` file inside with a basic component.

```js
// app/about/page.js
import Link from 'next/link'

export default function About() {
  return (
    <main>
      <h1>About</h1>
      <Link href="/">Go home</Link>
    </main>
  )
}
```

Change our app `page.js` file to a title and a link to the new `about` page.

```js
// app/page.js
import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Home</h1>
      <Link href="/about">Go to About</Link>
    </main>
  )
}
```

You can now move between the home and about pages which will be useful for testing event capture next.

## Setting up PostHog on the client side

First, we need a PostHog instance ([signup for free](https://app.posthog.com/signup)). From this instance, we need a project API key, which is in [project settings](https://app.posthog.com/settings/project), and an the relevant ingestion address (`http://us.i.posthog.com`, `http://eu.i.posthog.com`, or a custom address). Add both of these to a `.env.local` file in our base directory.

```
NEXT_PUBLIC_POSTHOG_KEY=<ph_project_api_key>
NEXT_PUBLIC_POSTHOG_HOST=<ph_client_api_host>
```

Using the Next.js app router requires us to initialize PostHog differently than with the [pages router](/tutorials/nextjs-analytics). Specifically, the app router server-side renders components by default, and the `posthog-js` library is a client-side library.

To make these work together, create a `providers.js` file and set up the `PostHogProvider` with the `'use client'`  directive.

```js file=app/providers.js
// app/providers.js
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PHProvider({ children }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      defaults: '<ph_posthog_js_defaults>',
    })
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
```

Once we do this, we can then import the `provider.js` file in our `app/layout.js` file, and wrap our app in the PostHog provider. 

```js
// app/layout.js
import './globals.css'
import { PHProvider } from './providers'

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

After you set this up, PostHog starts autocapturing events and pageviews. This also means you can use the PostHog on the client side in all your client-side rendered Next.js components (the ones with the `"use client"` directive).

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_05_22_at_14_08_00_2x_b68fe96604.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_05_22_at_14_07_42_2x_ed74436fb9.png"
  alt="Events in PostHog"
  classes="rounded"
/>

> **Note:** If you don’t use the `"use client"` directive, Next.js assumes your page is server-side rendered. This means the client hooks like `usePostHog` cause errors. To interact with PostHog on the server side, use the [PostHog Node SDK](/docs/libraries/node) (which we show [later](#using-posthog-with-server-rendered-components)).

## Using PostHog with server-rendered components

Server-rendered components are the default for the app router. `getServerProps` from the pages router is not used anymore. This means if we want server-side rendered feature flags or get other data from PostHog, we must use the [PostHog Node SDK](/docs/libraries/node).

To set this up, create a `posthog.js` file in the app folder that returns a PostHog Node client:

```js
// app/posthog.js
import { PostHog } from 'posthog-node'

export default function PostHogClient() {
  const posthogClient = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  })
  return posthogClient
}
```

We can then use this function to get access to the Node client in our server components.

### Capturing custom events

As a basic example of what you can do on the server side, we can capture custom events as long as we have a `distinctId`. To do this, get the `PostHogClient` from the `posthog.js` file, then call `posthog.capture()` like this:

```js
// app/about/page.js
import Link from 'next/link'
import PostHogClient from '../posthog'

export default function About() {

  const posthog = PostHogClient()

  posthog.capture({
    distinctId: 'ian@posthog.com', // replace with a user's distinct ID
    event: 'server_side_event_name'
  })

  return (
    <main>
      <h1>About</h1>
      <Link href="/">Go home</Link>
    </main>
  )
}
```

### Setting up feature flags

We can create a server-side function along with the PostHog Node client to get data about a user’s feature flags, then use that data to conditionally render a part of the component.

To do this, create a feature flag in PostHog with the key `main-cta` , roll it out to 100% of users, and then add the code to check it in a function (in the example below, we name it `getData()`). Because you are awaiting the posthog request now, make sure to add `async` to the main `About()` function as well.

> The feature flag does require a distinct user ID, which we hardcoded for now, but you could also set up [authentication as we’ve shown in the Next.js analytics tutorial](/tutorials/nextjs-analytics#adding-authentication) or cookies (using the [Cookies function](https://beta.nextjs.org/docs/api-reference/cookies)) as we showed in the [Next.js A/B test tutorial](/tutorials/nextjs-ab-tests).

```js
import Link from 'next/link'
import PostHogClient from '../posthog'

export default async function About() {

  const flags = await getData();

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

async function getData() {
  const posthog = PostHogClient()
  const flags = await posthog.getAllFlags(
    'ian@posthog.com' // replace with a user's distinct ID
  );
  return flags
}
```

With this, you have the basics of PostHog set up on both the client and server side with Next.js and the app router. 

## Further reading

- [How to set up Next.js analytics, feature flags, and more](/tutorials/nextjs-analytics)
- [How to set up Next.js A/B tests](/tutorials/nextjs-ab-tests)
- [An introductory guide to identifying users in PostHog](/tutorials/identifying-users-guide)

<NewsletterForm />