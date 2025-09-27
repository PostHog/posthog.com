---
title: Building a Next.js cookie consent banner
date: 2025-08-27
author:
  - ian-vanagas
  - robbie-coomber
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

Next, install PostHog's JavaScript Web SDK:

```bash
npm install posthog-js
```

To set up PostHog, create a `instrumentation-client.js` file in the root of your project. In it, initialize PostHog with your project API key and instance address from your [project settings](https://app.posthog.com/project/settings) like this:

```js
// instrumentation-client.js
import posthog from 'posthog-js'

posthog.init('<ph_project_api_key>', {
  api_host: '<ph_client_api_host>',
  defaults: '<ph_posthog_js_defaults>'
});
```

After setting this up and running `npm run dev`, PostHog starts autocapturing events, but a PostHog-related cookie is set for the user without their consent.

![Cookie set](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/nextjs-cookie-banner/cookie.png)

## Ensuring cookies aren't set on initial load

If you want to make sure you are fully compliant, you may want to ensure cookies aren't set until the user has given consent.

To do this, you can set `cookieless_mode` to `on_reject` in your initialization config like this:

```js
// instrumentation-client.js
import posthog from "posthog-js";

posthog.init("<ph_project_api_key>", {
  api_host: "<ph_client_api_host>",
  defaults: '<ph_posthog_js_defaults>',
  cookieless_mode: 'on_reject'
})
```

This means that PostHog will not set any cookies until the user has given consent, which is what we rely on the cookie banner to do.

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

After creating this, we import the component into `layout.js` and set it up inside our `body` component:

```js
// app/layout.js
import "./globals.css";
import { Banner } from "./banner";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Banner />
      </body>
    </html>
  );
}

```

This creates an ugly but functional cookie banner at the bottom of our site. You can customize and style it how you want.

![Banner](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/nextjs-cookie-banner/banner.png)

## Handling and storing user consent

Next, we add the logic to handle and store the user's consent. We do this in `banner.js` by adding `handleAcceptCookies` and `handleDeclineCookies` functions and connect them to PostHog's consent management methods like this:

```js
// app/banner.js
'use client';
import { useEffect, useState } from "react";
import posthog from "posthog-js";

export function Banner() {
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

Now, when users make a choice, PostHog opts them in or out of tracking cookies, storing the choice in local storage.

![Full cookie banner demo](https://res.cloudinary.com/dmukukwp6/video/upload/cookie_73efa36bc7.mp4)

## Further reading

- [How to use PostHog without cookie banners](/tutorials/cookieless-tracking)
- [How to set up Next.js A/B tests](/tutorials/nextjs-ab-tests)
- [How to set up Next.js analytics, feature flags, and more](/tutorials/nextjs-analytics)

<NewsletterForm />