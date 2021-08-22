---
title: Tracking Next.js apps
sidebarTitle: Next.js
sidebar: Docs
showTitle: true
---

If you are using Next.js and want to track your application using PostHog this tutorial might help you out. 

It will guide you through an example integration of PostHog using Next.js and the [posthog-js library](/docs/integrate/client/js). 

### Is This Tutorial For Me?

This tutorial is aimed at Next.js users. 
We are going to look at some minimal example code which should get you started quickly.

### Pre-Requisites

To follow this tutorial along, you need to:

1. Have [deployed PostHog](/docs/deployment).
2. Have a running Next.js application

### Setup And Tracking Page Views

The first thing you want to do is to install the [posthog-js library](/docs/integrate/client/js) in your project - so add it using your package manager:

```
yarn add posthog-js
```

or

```
npm install --save posthog-js
```

After that we want to initialize the PostHog instance in `pages/_app.js`

```jsx
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Init PostHog
    posthog.init('YOUR_API_KEY', { api_host: 'https://app.posthog.com' });

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
