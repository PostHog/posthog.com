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
import { useEffect } from 'react'

export default function PHProvider({ children }) {
  useEffect(() => {
    posthog.init('<ph_project_api_key>', {
      api_host: '<ph_client_api_host>',
    })
  }, []);
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

Since we want to send our 404s and broken links to somewhere we check frequently, we will set up a Slack webhook to send notifications. We can use our Slack realtime destinations for this.

Start by going to the [data pipeline destinations tab](https://us.posthog.com/pipeline/destinations) and search for the **Slack** destination and click **+ Create**. On the creation screen:

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

<NewsletterForm />