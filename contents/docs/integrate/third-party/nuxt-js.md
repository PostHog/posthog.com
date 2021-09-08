---
title: Tracking Nuxt.js apps
sidebarTitle: Nuxt.js
sidebar: Docs
showTitle: true
---

If you are using Nuxt.js and want to track your application using PostHog this tutorial might help you out. 

It will guide you through an example integration of PostHog using Nuxt.js plugins. 

### Is this tutorial for me?

This tutorial is aimed at Nuxt.js users which run Nuxt in `spa` or `universal` mode. 
We are going to look at some minimal example code which should get you started quickly and provide a base for further customization.

### Prerequisites

To follow this tutorial along, you need to:

1. Have [deployed PostHog](/docs/deployment).
2. Have a running Nuxt.js application

### Minimal example

We are going to implement PostHog as a [Nuxt.js plugin](https://nuxtjs.org/docs/2.x/directory-structure/plugins) which gives us the possibility to inject
the posthog object and make it available across our application.

The first thing you want to do is to install the [posthog-js library](/docs/integrate/client/js) in your project - so add it using your package manager:

```
yarn add posthog-js
```

or

```
npm install --save posthog-js
```

After that we want to create a plugin in `plugins/posthog/index.js`

```javascript
import posthog from 'posthog-js'
import Vue from 'vue'

export default function({ app: { router } }, inject) {
  // Init PostHog
  posthog.init('POSTHOG_API_KEY', {
    api_host: 'POSTHOG_HOST',
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

Finally, we need to activate the plugin on the client side in our `nuxt.config.js`

```javascript
plugins: [
    ...
    { src: './plugins/posthog', mode: 'client' }
  ],
```

### Using the plugin

By using the example code above you can now use PostHog across your app with `this.$posthog` or `app.$posthog` - depending on the context. 
Compare with the [Nuxt.js docs](https://nuxtjs.org/docs/2.x/directory-structure/plugins#inject-in-root--context) on further details when to use `app.$posthog` or `this.$posthog`.

Let's say for example the user makes a purchase you could track an event like that:

```javascript
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
