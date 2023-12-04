---
title: Using Nuxt routeRules as a reverse proxy
sidebar: Docs
showTitle: true
---

Nuxt 3 uses [Nitro](https://nuxt.com/docs/guide/concepts/server-engine) under the hood, which provides the [routeRules](https://nitro.unjs.io/config#routerules) config that can be used to proxy requests from one route to another. 

To do this, add the following `routeRules` to your `nuxt.config.ts` file:

```js
// nuxt.config.ts
export default defineNuxtConfig({
    routeRules: {
        '/ingest/**': { proxy: 'https://app.posthog.com/**' },
    },
});
```

Then configure the PostHog client to send requests via your new proxy:

```js
const posthogClient = posthog.init(runtimeConfig.public.posthogPublicKey, {
    api_host: 'https://your-host.com/ingest',
});
```