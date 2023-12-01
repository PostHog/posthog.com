---
title: Nuxt.js
icon: ../../images/docs/integrate/frameworks/nuxt.svg
---

PostHog makes it easy to get data about usage of your [Nuxt.js](https://nuxt.com/) app. Integrating PostHog into your app enables analytics about user behavior, custom events capture, session replays, feature flags, and more.

This guide walks you through integrating PostHog into your app for both Nuxt.js major versions `2` and `3`. We'll use the [JavaScript](/docs/libraries/js) SDK.

This tutorial is aimed at Nuxt.js users which run Nuxt in `spa` or `universal` mode. You can see a working example of the Nuxt v3.0 integration in our [Nuxt.js demo app](https://github.com/PostHog/posthog-js/tree/master/playground/nuxtjs)

## Nuxt v3.0 and above

### Prerequisites

To follow this guide along, you need:

1. A PostHog instance ([signup for free](https://app.posthog.com/signup)])
2. a running Nuxt.js application running version `3.0` or above.

### Setting up PostHog

1. Install posthog-js using your package manager:

```shell
yarn add posthog-js
# or
npm install --save posthog-js
```

2. Add your PostHog API key and host to your `nuxt.config.js` file. You can find your project API key in the PostHog app under Project Settings > Project Variables.

```js file=nuxt.config.js
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      posthogPublicKey: '<ph_project_api_key>',
      posthogHost: '<ph_instance_address>'
    }
  }
})
```

3. Create a new plugin by creating a new file `posthog.client.js` in your [plugins directory](https://nuxt.com/docs/guide/directory-structure/plugins).

```react file=plugins/posthog.client.js
import { defineNuxtPlugin } from '#app'
import posthog from 'posthog-js'
export default defineNuxtPlugin(nuxtApp => {
  const runtimeConfig = useRuntimeConfig();
  const posthogClient = posthog.init(runtimeConfig.public.posthogPublicKey, {
    api_host: runtimeConfig.public.posthogHost || 'https://app.posthog.com',
    loaded: (posthog) => {
      if (import.meta.env.MODE === 'development') posthog.debug();
    }
  })

  // Make sure that pageviews are captured with each route change
  const router = useRouter();
  router.afterEach((to) => {
    posthog.capture('$pageview', {
      current_url: to.fullPath
    });
  });
  
  return {
    provide: {
      posthog: () => posthogClient
    }
  }
})
```

PostHog can then be accessed throughout your Nuxt.js using the provider accessor, for example:

```vue filename=index.vue
<script setup>
   const { $posthog } = useNuxtApp()
   if ($posthog) {
      const posthog = $posthog()
      posthog.capture('<event_name>')
   }
</script>
```

See the [JavaScript SDK docs](/docs/libraries/js) for all usable functions, such as:
- [Capture custom event capture, identify users, and more.](/docs/libraries/js#send-custom-events-with-posthogcapture)
- [Feature flags including variants and payloads.](/docs/libraries/js#feature-flags)

## Nuxt v2.16 and below

We are going to implement PostHog as a [Nuxt.js integration](https://nuxtjs.org/docs/2.x/directory-structure/plugins) which gives us the possibility to inject
the posthog object and make it available across our application.

The first thing you want to do is to install the [posthog-js library](/docs/integrate/client/js) in your project - so add it using your package manager:

```shell
yarn add posthog-js
```

or

```shell
npm install --save posthog-js
```

After that we want to create a app in `plugins/posthog/index.js`

```javascript
import posthog from 'posthog-js'
import Vue from 'vue'

export default function({ app: { router } }, inject) {
  // Init PostHog
  posthog.init('<ph_project_api_key>', {
    api_host: '<ph_instance_address>',
    capture_pageview: false,
    loaded: () => posthog.identify('unique_id') // If you can already identify your user
  })

  // Inject PostHog into the application and make it available via this.$posthog (or app.$posthog)
  inject('posthog', posthog)

  // Make sure that pageviews are captured with each route change
  router.afterEach(to => {
    Vue.nextTick(() => {
      /* Note: this might also be a good place to call posthog.register(...) in order to update your properties
      on each page view
      */
      posthog.capture('$pageview', {
        $current_url: to.fullPath
      })
    })
  })
}

```

Finally, we need to activate it on the client side in our `nuxt.config.js`

```js
plugins: [
    ...
    { src: './plugins/posthog', mode: 'client' }
  ],
```

### Usage

By using the example code above you can now use PostHog across your app with `this.$posthog` or `app.$posthog` - depending on the context. 
Compare with the [Nuxt.js docs](https://nuxtjs.org/docs/2.x/directory-structure/plugins#inject-in-root--context) on further details when to use `app.$posthog` or `this.$posthog`.

Let's say for example the user makes a purchase you could track an event like that:

```js-web
<template>
  <button @click="purchase">Buy</button>
</template>

<script>
...
  methods: {
     purchase() {
       this.$posthog.capture('purchase')
     }
  }
...
</script>
```

## Further reading

- [PostHog for VueJS users](/docs/libraries/vue-js)
- [Tracking pageviews in single page apps (SPA)](/tutorials/spa)
- [Building a Vue cookie consent banner](/tutorials/vue-cookie-banner)
