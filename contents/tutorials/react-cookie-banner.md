---
title: Building a tracking cookies consent banner in React
sidebar: Docs
showTitle: true
featuredTutorial: false
date: 2024-06-10
author:
  - ian-vanagas
tags:
  - configuration
  - product os
---

If you’ve spent any time online, you’ve seen a cookie consent banner. Because of GDPR and other worldwide internet privacy regulations, most sites need to get consent to track users and use cookies. 


To help you stay compliant, PostHog enables you to track users either with or without cookies. In this tutorial, we are going to build a simple banner with React, JavaScript, and HTML for users to opt in or out of PostHog’s cookies.

To complete this tutorial, you’ll need to a [PostHog instance](https://us.posthog.com/signup) as well as [Node installed](https://nodejs.org/en/download/) (to install, manage, and run React).

## Step 1: Setting up React

This tutorial is for React, but it works for other JavaScript frameworks as well (we have specific tutorials for [Next.js](/tutorials/nextjs-cookie-banner) and [Vue](/tutorials/vue-cookie-banner)).

We'll set up our React app with [Vite](https://vitejs.dev/guide/). To do this, head into the command line, then create and install the app (we name ours `react-cookie-banner`).

```bash
npm create vite@latest react-cookie-consent -- --template react
cd react-cookie-consent
npm install
npm run dev
```

Running these commands gives us a working React app.

![React app](https://res.cloudinary.com/dmukukwp6/image/upload/react_7ecc5ce58c.png)

## Step 2: Setting up PostHog

Next, we want to set up PostHog to track activity on our site. To do this, first, we’ll install the `posthog-js` package.

```bash
npm install --save posthog-js
```

Next, we’ll go to `src/main.jsx` to initialize PostHog. We’ll import PostHog and the `PostHogProvider` component from `posthog-js/react` and run `posthog.init` with our project key and instance address (which you can get in your [project settings](https://us.posthog.com/settings/project))

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

posthog.init("<ph_project_api_key>", {
  api_host: "<ph_client_api_host>",
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </React.StrictMode>,
)

```

Once done, visit your site running locally, click the button, and you should start seeing events in your [PostHog activity tab](https://us.posthog.com/activity/explore).

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_07_10_at_14_54_53_2x_de2d28eea9.png" 
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_07_10_at_14_54_41_2x_13e7233065.png"
    alt="Events in PostHog" 
    classes="rounded"
/>

When we head back to our local site, right-click, choose inspect, go to the Application tab, and check cookies, you’ll see we’ve created a tracking cookie with details about PostHog and the user. 

![App cookie](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_07_10_at_14_59_04_2x_19bbe1f339.png)

## Step 3: Building the banner component

Now that we have our site and PostHog library set up, it is time to create the banner. To start, we can create a `Banner.jsx` file in our `src` folder (where the rest of our React code is).

```bash
cd src
touch Banner.jsx
```

In the `Banner.jsx` file, we’ll create a basic React component function with wording about cookies and accept or decline buttons.

```js
// Banner.jsx

export function Banner() {
  return (
    <div>
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
    </div>
  )
}
```

We’ll then add the new CookieBanner component into `main.jsx`.

```js
// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PostHogProvider } from 'posthog-js/react'
import posthog from 'posthog-js'
import { Banner } from './Banner'

posthog.init("<ph_project_api_key>", {
  api_host: "<ph_client_api_host>",
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
      <App />
      <Banner />
    </PostHogProvider>
  </React.StrictMode>,
)

```

When we head back to the local site, we’ll see our cookie banner at the bottom of the site. 

![Tutorial banner](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_07_10_at_15_22_59_2x_33295f3f01.png)

## Step 4: Setting and storing consent

Next, we’ll add the logic for setting and storing the user's consent. Back in our `Banner.jsx` file, we:

1. Add `handleAcceptCookies` and `handleDeclineCookies` to our buttons that set the consent state and store it in local storage.
2. Add a `cookieConsentGiven()` function to check if the user has made a consent decision.
3. Conditionally show our banner depending whether that decision has been made.

Together, this looks like this:

```js
// src/Banner.jsx
import { useEffect, useState } from "react";

export function cookieConsentGiven() {
  if (!localStorage.getItem('cookie_consent')) {
    return 'undecided';
  }
  return localStorage.getItem('cookie_consent');
}

export function Banner() {
  const [consentGiven, setConsentGiven] = useState('');

  useEffect(() => {
    setConsentGiven(cookieConsentGiven());
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookie_consent', 'yes');
    setConsentGiven('yes');
  };

  const handleDeclineCookies = () => {
    localStorage.setItem('cookie_consent', 'no');
    setConsentGiven('no');
  };

  return (
    <div>
      {consentGiven === 'undecided' && (
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
  )
}
```

Back on our site, clicking accept or decline now stores the decision in local storage and hides the banner.

## Step 5: Connecting consent to PostHog

So far, our cookie banner is just for show. We want it to control whether PostHog uses cookies or not. This means we either set persistence to `localStorage+cookie` or `memory` depending on the user's consent. We need to do this in two places:

1. Change PostHog's persistence at runtime when a user makes a consent decision in `Banner.jsx`.
2. Use the consent decision to decide PostHog's initial persistence in `main.jsx`.

In `Banner.jsx`, we import PostHog and use a `useEffect` hook to change PostHog's persistence at runtime.

```js
// src/Banner.jsx
import { useEffect, useState } from "react";
import posthog from "posthog-js";

export function cookieConsentGiven() {
  if (!localStorage.getItem('cookie_consent')) {
    return 'undecided';
  }
  return localStorage.getItem('cookie_consent');
}

export function Banner() {
  const [consentGiven, setConsentGiven] = useState('');

  useEffect(() => {
    setConsentGiven(cookieConsentGiven());
  }, []);

  useEffect(() => {
    if (consentGiven !== '') {
      posthog.set_config({ persistence: consentGiven === 'yes' ? 'localStorage+cookie' : 'memory' });
    }
  }, [consentGiven]);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookie_consent', 'yes');
    setConsentGiven('yes');
  };

  const handleDeclineCookies = () => {
    localStorage.setItem('cookie_consent', 'no');
    setConsentGiven('no');
  };

  return (
    <div>
      {consentGiven === 'undecided' && (
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
  )
}
```

In `main.jsx`, we reuse the `cookieConsentGiven` function to set the initial persistence based on the user's consent.

```js
// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { PostHogProvider } from 'posthog-js/react'
import posthog from 'posthog-js'
import { Banner } from './Banner'
import { cookieConsentGiven } from './Banner'

posthog.init("<ph_project_api_key>", {
  api_host: "<ph_client_api_host>",
  persistence: cookieConsentGiven() === 'yes' ? 'localStorage+cookie' : 'memory'
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
      <App />
      <Banner />
    </PostHogProvider>
  </React.StrictMode>,
)
```

## Step 6: Testing it all out

To make sure everything works, try the following steps:

- Go to the site.
- Delete your PostHog key in local storage and cookies (found in the Application tab after inspecting).
- Reload the site then click accept or decline on the banner.
- Check the banner disappears and whether cookiess are set or not.
- Reload the page and check that the banner doesn’t load.

If all that works, you’ve set up a basic tracking cookies consent banner in React. From here, you can customize it to your needs (such as adding other cookies) and the rest of your site’s design.

## Beyond cookie consent banners

If you’re interested in going further into tracking, data management, and cookies, check out these other resources:

1. A tutorial on [setting up cookieless tracking](/tutorials/cookieless-tracking).
2. A guide to [setting up a reverse proxy](/docs/integrate/proxy) to help your data stay first-party.
3. Sign up for our [EU Cloud](https://eu.posthog.com/signup).

<NewsletterForm />