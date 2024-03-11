---
title: Nuxt.js
icon: ../../images/docs/integrate/frameworks/nuxt.svg
---

PostHog makes it easy to get data about usage of your [Nuxt.js](https://nuxt.com/) app. Integrating PostHog into your app enables analytics about user behavior, custom events capture, session replays, feature flags, and more.

These docs are aimed at Nuxt.js users who run Nuxt in `spa` or `universal` mode. You can see a working example of the Nuxt v3.0 integration in our [Nuxt.js demo app](https://github.com/PostHog/posthog-js/tree/master/playground/nuxtjs)

## Nuxt v3.0 and above

### Setting up PostHog on the client side

1. Install `posthog-js` using your package manager:

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

```js file=plugins/posthog.client.js
import { defineNuxtPlugin } from '#app'
import posthog from 'posthog-js'
export default defineNuxtPlugin(nuxtApp => {
  const runtimeConfig = useRuntimeConfig();
  const posthogClient = posthog.init(runtimeConfig.public.posthogPublicKey, {
    api_host: runtimeConfig.public.posthogHost || 'https://app.posthog.com',
    capture_pageview: false, // we add manual pageview capturing below
    loaded: (posthog) => {
      if (import.meta.env.MODE === 'development') posthog.debug();
    }
  })

  // Make sure that pageviews are captured with each route change
  const router = useRouter();
  router.afterEach((to) => {
    nextTick(() => {
      posthog.capture('$pageview', {
        current_url: to.fullPath
      });
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

### Setting up PostHog on the server side

1. Install `posthog-node` using your package manager:

```shell
yarn add posthog-node
# or
npm install --save posthog-node
```

2. Add your PostHog API key and host to your `nuxt.config.js` file. If you've already done this when adding PostHog to the client side, you can skip this step.

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

3. Initialize the PostHog Node client where you'd like to use it on the server side. For example, in [`useAsyncData(https://nuxt.com/docs/api/composables/use-async-data)]`:

```vue file=app.vue
<!-- ...rest of code -->

<script setup>
import { useAsyncData, useCookie, useRuntimeConfig } from 'nuxt/app';
import { PostHog } from 'posthog-node';

const { data: someData, error } = await useAsyncData('ctaText', async () => {
  const runtimeConfig = useRuntimeConfig();
  const posthog = new PostHog(
    runtimeConfig.public.posthogPublicKey,
    { host: runtimeConfig.public.posthogHost }
  );

  const cookies = useCookie(`ph_${runtimeConfig.public.posthogPublicKey}_posthog`);
  if (cookies && cookies.value) {
    try {
      const distinctId = cookies.value.distinct_id; // or you can use your user's email, for example.
      posthog.capture({
        distinctId: distinctId,
        event: 'user_did_something"',
      })
      await posthog.shutdownAsync()
    } catch (error) {
      console.log(error);
    }
  }
  return "Some data";
});

</script>
```

> **Note**: Make sure to _always_ call `posthog.shutdownAsync()` after capturing events from the server-side.
> PostHog queues events into larger batches, and this call forces all batched events to be flushed immediately.

See the [Node SDK docs](/docs/libraries/node) for all usable functions, such as:
- [Capture custom event capture, identify users, and more.](/docs/libraries/node#capturing-events)
- [Feature flags including variants and payloads.](/docs/libraries/node#feature-flags)

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

## Next steps

For any technical questions for how to integrate specific PostHog features into Framer (such as analytics, feature flags, A/B testing, surveys, etc.), have a look at our [JavaScript Web](/docs/libraries/js) and [Node](/docs/libraries/node) SDK docs.

Alternatively, we've also written the below tutorials to help get you started:

- [How to set up analytics in Nuxt](/tutorials/nuxt-analytics)
- [How to set up feature flags in Nuxt](/tutorials/nuxt-feature-flags)
- [How to set up A/B tests in Nuxt](/tutorials/nuxtjs-ab-tests)
- [How to set up surveys in Nuxt](/tutorials/nuxt-surveys)