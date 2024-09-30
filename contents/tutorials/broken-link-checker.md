---
title: How to create a broken link (404) checker
date: 2023-06-01
author:
  - ian-vanagas
showTitle: true
sidebar: Docs
tags:
  - actions
  - configuration
  - product os
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

![Not found event](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/tutorials/broken-link-checker/not-found.mp4)

## Sending 404s to Slack

Since we want to send our 404s and broken links to somewhere we check frequently, we will set up a Slack webhook to send notifications. There are two options for setting this up: PostHog webhooks or our new realtime destinations.

### Option 1: Using PostHog webhooks

To do this send 404s to Slack using PostHog webhooks:

1. Start by going to the [Slack developer dashboard](https://api.slack.com/apps?new_app=1), create an app from scratch, name it, select your workspace, and click "Create App."

2. Next, go to "Incoming Webhooks," activate them, click "add new webhook to workspace," select a channel (I made a new `404s-broken-links` channel for it), and click allow.

3. Copy your webhook URL for use in PostHog.

#### Creating an action and sending it to Slack

With our Slack webhook, we can set up an action that triggers the webhook when someone hits a 404 or broken link. 

1. Go to your [project settings](https://app.posthog.com/project/settings#webhook), scroll to webhook integration, paste your Slack webhook link, and click "test and save."

2. After successfully sending a test event, you can set up your action. To create it, [go to actions](https://app.posthog.com/data-management/actions) in PostHog, click "New action," select "From event or pageview," and match your "not found" custom event. 

3. Select "Post to webhook when this action is triggered," set your message format to `[user.pathname] by [user.name]`, and press save.

4. Visit [http://localhost:3000/test](http://localhost:3000/test) again, and you’ll see a message in your Slack channel.

![Slack](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/tutorials/broken-link-checker/slack.mp4)

> **Note:** you can only send actions to one webhook. If you have multiple destinations you want to send to, you can use [Zapier](/docs/apps/zapier-connector).

### Option 2: Using realtime destinations

Our new [realtime destinations](/docs/cdp/destinations) are currently in preview. These provide customizable destinations, more formatting options, a revamped configuration UI. We can use them to send survey responses to Slack or any other destination that supports webhooks.

To do this, start by enabling the **Pipeline destinations 3000** feature preview.

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_09_27_at_10_43_50_2x_3dfeeef497.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_09_27_at_10_41_53_2x_6d5fb3686c.png"
    alt="Enable Pipeline destinations 3000 feature preview"
    classes="rounded"
/>

Next, go to the [data pipeline destinations tab](https://us.posthog.com/pipeline/destinations) and search for the **Slack** destination and click **+ Create**. On the creation screen:

1. Follow the steps to integrate with your Slack workspace if you haven't already and then select it.

2. Make sure the PostHog integration is added to the channel you want to send messages to and select it.

3. Under **Match event and actions**, select **not found**.

4. Under **Blocks**, modify the text to include the pathname. For example:

```json
{
  "text": {
    "text": "*{person.name}* triggered 404 on '{event.properties.$pathname}'",
    "type": "mrkdwn"
  },
  "type": "section"
},
```

5. Customize the name and description, and press **Create & enable**.

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_09_27_at_12_00_11_2x_55556fa886.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_09_27_at_11_59_45_2x_39d95d4685.png"
    alt="Create Slack destination"
    classes="rounded"
/>

You can then test the destination and it will start sending 404s to Slack.

![Slack message](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_09_27_at_12_02_01_2x_522adc6cef.png)

## Further reading

- [How to set up Next.js monitoring](/tutorials/nextjs-monitoring)
- [How to track new and returning users in PostHog](/tutorials/track-new-returning-users)
- [How to improve web app performance using PostHog session replays](/tutorials/performance-metrics)
