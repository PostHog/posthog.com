---
title: Building a Next.js cookie consent banner
date: 2024-03-27
author:
  - ian-vanagas
showTitle: true
sidebar: Docs
tags:
  - configuration
  - product os
---

To ensure compliance with privacy regulations like GDPR, you may need to ask for consent from users to track them using cookies. PostHog enables you to track users with or without cookies, but you need to set up the logic to ensure you are compliant both ways.

In this tutorial, we build a basic Next.js app, set up PostHog, build a cookie consent banner, and add the logic for users to opt-in or out of tracking cookies.

> Don't want to bother with cookies at all? Here's [how to use PostHog without cookie banners](/tutorials/cookieless-tracking).

## Create a Next.js app and add PostHog

First, once [Node is installed](https://nodejs.dev/en/learn/how-to-install-nodejs/), create a Next.js app. Run the command below, select **No** for TypeScript, **Yes** for `use app router`, and the defaults for every other option.

```bash
npx create-next-app@latest cookie-banner
```

To add PostHog to our app, go into your `app` folder and create a `providers.js` file. Here we create a client-side PostHog provider that initializes in a `useEffect` using the project API key and instance address (get them from your [project settings](https://app.posthog.com/project/settings)). Make sure to include the `use client` directive and the `phInstance` state (for future use). Altogether, this looks like this:

```js
// app/providers.js
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PHProvider({ children }) {
  useEffect(() => {
    posthog.init('<ph_project_api_key>', {
      api_host: '<ph_client_api_host>',
      defaults: '<ph_posthog_js_defaults>',
    })
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
```

We can then import the `PHProvider` component from the `provider.js` file in our `app/layout.js` file, and wrap our app in it.

```js
// app/layout.js
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

After setting this up and running `npm run dev`, PostHog starts autocapturing events, but a PostHog-related cookie is set for the user without their consent.

![Cookie set](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/nextjs-cookie-banner/cookie.png)

## Creating a cookie banner

Create another file in the `app` folder named `banner.js` for the banner component with a bit of text explaining cookies and buttons to accept or decline.

Importantly, to avoid a hydration error, we must check if the frontend has mounted and only show the component if so. We can use `useState` and `useEffect` to do this. Together, this looks like this:

```js
// app/banner.js
'use client';
import { useEffect, useState } from "react";

export function Banner() {
  const [consentGiven, setConsentGiven] = useState('');

  useEffect(() => {
    // We want this to only run once the client loads
    // or else it causes a hydration error
    setConsentGiven('pending');
  }, []);

  return (
    <div>
      {consentGiven === 'pending' && (
        <div>
          <p>
            We use tracking cookies to understand how you use 
            the product and help us improve it.
            Please accept cookies to help us improve.
          </p>
          <button type="button">Accept cookies</button>
          <span> </span>
          <button type="button">Decline cookies</button>
        </div>
      )}
    </div>
  )
}
```

After creating this, we import the component into `layout.js` and set it up inside our `PHProvider` and `body` components:

```js
import './globals.css'
import { PHProvider } from './providers'
import Banner from './banner'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <PHProvider>
        <body>
          {children}
          <Banner />
        </body>
      </PHProvider>
    </html>
  )
}
```

This creates an ugly but functional cookie banner at the bottom of our site. You can customize and style it how you want.

![Banner](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/nextjs-cookie-banner/banner.png)

## Handling and storing user consent

Next, we add the logic to handle and store the user's consent. We do this in `banner.js` by adding `handleAcceptCookies` and `handleDeclineCookies` functions called when a user chooses to accept or decline cookies. We save this choice to local storage.

We also add a `cookieConsentGiven` function that returns the user's consent state from local storage, which we call on first load. If there isn't a value in local storage, we set the consent state to `undecided`.

```js
// app/banner.js
'use client';
import { useEffect, useState } from "react";

export default function Banner() {
  const [consentGiven, setConsentGiven] = useState('');

  useEffect(() => {
    // We want this to only run once the client loads
    // or else it causes a hydration error
    setConsentGiven(posthog.get_explicit_consent_status());
  }, []);

  const handleAcceptCookies = () => {
    posthog.opt_in_capturing();
    setConsentGiven('granted');
  };

  const handleDeclineCookies = () => {
    posthog.opt_out_capturing();
    setConsentGiven('denied');
  };

  return (
    <div>
      {consentGiven === 'pending' && (
        <div>
          <p>
            We use tracking cookies to understand how you use 
            the product and help us improve it.
            Please accept cookies to help us improve.
          </p>
          <button type="button" onClick={handleAcceptCookies}>Accept cookies</button>
          <span> </span>
          <button type="button" onClick={handleDeclineCookies}>Decline cookies</button>
        </div>
      )}
    </div>
  );
}
```

When users visit your site now, PostHog is initialized either with or without cookies based on their consent choice.

![Consented with local storage](https://res.cloudinary.com/dmukukwp6/image/upload/v1711561917/posthog.com/contents/images/tutorials/nextjs-cookie-banner/consent.png)

## Further reading

- [How to use PostHog without cookie banners](/tutorials/cookieless-tracking)
- [How to set up Next.js A/B tests](/tutorials/nextjs-ab-tests)
- [How to set up Next.js analytics, feature flags, and more](/tutorials/nextjs-analytics)

<NewsletterForm />