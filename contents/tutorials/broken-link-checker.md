---
title: How to create a broken link (404) checker
date: 2023-06-01
author: ["ian-vanagas"]
showTitle: true
sidebar: Docs
tags: ['actions', 'configuration', 'product os']
---

Broken links and 404s are frustrating for users. Without a way to check for them, you might not realize they exist and can’t fix them. 

This tutorial shows you how to create a broken link checker for a Next.js app that sends a notification in Slack when a user visits a page that doesn’t exist.

## Creating a Next.js app and adding PostHog

To start, create a Next.js app. Run the command below, chose **not** to use TypeScript, and the defaults for all the other options (including **yes** to using the app router).

```bash
npx create-next-app@latest 404s
```

Next, go into your newly created `404s` folder and install `posthog-js`.

```bash
cd 404s 
npm i posthog-js
```

In the `app` folder, create a `provider.js` file where we initialize PostHog on the client side.

```js
// app/providers.js
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init('<ph_project_api_key>',{
    api_host:'<ph_client_api_host>'
  })
}

export default function PHProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
```

Once created, we can import the provider into the `layout.js` file to access PostHog throughout our app.

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

## Building a custom 404 page

To capture broken link events, create a custom 404 page to send details to PostHog. In your `app` folder, create a file named `not-found.js`. In this file, set up PostHog to send an event and return a component saying the page isn’t found.

```js
//app/not-found.js
'use client'
import Link from 'next/link';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';
 
export default function NotFound() {
  const posthog = usePostHog();

  useEffect(() => {
    posthog.capture('not_found');
  }, []);

  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <p>
        <Link href="/blog">Go home</Link>
      </p>
    </div>
  );
}
```

Once done, build the app and run it. We don’t use the development server as it triggers repeated reloads on pages not found. 

```bash
npm run build
npm start
```

When you go to a route that doesn’t exist, like [http://localhost:3000/test](http://localhost:3000/test), your app captures a `not found` event and return the component.

![Not found event](../images/tutorials/broken-link-checker/not-found.mp4)

## Setting up our Slack webhook

Since we want to send our 404s and broken links to somewhere we check frequently, we will set up a Slack webhook to send notifications.

To do this: 

1. Go to the [Slack developer dashboard](https://api.slack.com/apps?new_app=1), create an app from scratch, name it, select your workspace, and click "Create App."

2. Next, go to "Incoming Webhooks," activate them, click "add new webhook to workspace," select a channel (I made a new `404s-broken-links` channel for it), and click allow.

3. Copy your webhook URL for use in PostHog.

## Creating an action and sending it to Slack

With our Slack webhook, we can set up an action that triggers the webhook when someone hits a 404 or broken link. 

1. Go to your [project settings](https://app.posthog.com/project/settings#webhook), scroll to webhook integration, paste your Slack webhook link, and click "test and save."

2. After successfully sending a test event, you can set up your action. To create it, [go to actions](https://app.posthog.com/data-management/actions) in PostHog, click "New action," select "From event or pageview," and match your "not found" custom event. 

3. Select "Post to webhook when this action is triggered," set your message format to `[user.pathname] by [user.name]`, and press save.

4. Visit [http://localhost:3000/test](http://localhost:3000/test) again, and you’ll see a message in your Slack channel.

![Slack](../images/tutorials/broken-link-checker/slack.mp4)

> **Note:** you can only send actions to one webhook. If you have multiple destinations you want to send to, you can use [Zapier](/docs/apps/zapier-connector).

## Further reading

- [How to set up Next.js monitoring](/tutorials/nextjs-monitoring)
- [How to track new and returning users in PostHog](/tutorials/track-new-returning-users)
- [How to improve web app performance using PostHog session replays](/tutorials/performance-metrics)
