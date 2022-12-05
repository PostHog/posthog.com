---
title: Analytics for Next.js apps with PostHog
sidebarTitle: Next.js
sidebar: Docs
showTitle: true
---

PostHog makes it easy to get data about traffic and usage of your [Next.js](https://nextjs.org/) app. Integrating PostHog into your site enables analytics about user behavior, custom events capture, session recordings, feature flags, and more.

This guide will walk you through an example integration of PostHog using Next.js and the [posthog-js library](/docs/integrate/client/js). 

## Prerequisites

To follow this tutorial along, you need:

1. a [self-hosted instance of PostHog](/docs/self-host) or use [PostHog Cloud](/docs/getting-started/cloud).
2. a running Next.js application

## Setup and tracking page views (automatically)
The first thing you want to do is to install the [next-use-posthog library](https://github.com/Ismaaa/next-use-posthog) in your project - so add it using your package manager:

```shell
yarn add next-use-posthog
```

or

```shell
npm install --save next-use-posthog
```

After that, we want to initialize the PostHog instance in `pages/_app.js`

```tsx
import { usePostHog } from 'next-use-posthog'

function MyApp({ Component, pageProps }) {  
  // NOTE: If set as an environment variable be sure to prefix with `NEXT_PUBLIC_`
  // For more info see https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser
  
  usePostHog('<ph_project_api_key>', { api_host: '<ph_instance_address>' })

  return <Component {...pageProps} />
}

export default MyApp
```

#### Disable in development

```tsx
import { usePostHog } from 'next-use-posthog'

function MyApp({ Component, pageProps }) {
  usePostHog('<ph_project_api_key>', {
    api_host: '<ph_instance_address>',
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.opt_out_capturing()
    },
  })  

  return <Component {...pageProps} />
}

export default MyApp
```

### Setup and tracking page views (manually)

The first thing you want to do is to install the [posthog-js library](/docs/integrate/client/js) in your project - so add it using your package manager:

```shell
yarn add posthog-js
```

or

```shell
npm install --save posthog-js
```

After that, we want to initialize the PostHog instance in `pages/_app.js`

```jsx
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Init PostHog
    posthog.init('<ph_project_api_key>', { api_host: '<ph_instance_address>' });

    // Track page views
    const handleRouteChange = () => posthog.capture('$pageview');
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
```

### Tracking custom events

Now that PostHog is setup and initialized PostHog, you can use it to capture events where you want to track user behavior. For example, if you want to track when a user clicks a button, you can do it like this:

```jsx
const handleOnBuy = () => {
  posthog.capture('purchase', { price: 5900, currency: 'USD' });
};

return (
  <main>
    <h1>Store</h1>
    <button onClick={handleOnBuy}>Buy</button>
  </main>
);
```

## Further reading
- [Complete guide to event tracking](/tutorials/event-tracking-guide)
- [Tracking pageviews in single page apps (SPA)](/tutorials/spa)
- [How (and why) our marketing team uses PostHog](/blog/posthog-marketing)
