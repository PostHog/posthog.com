---
title: Vue.js
icon: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/integrate/frameworks/vue.svg
---
PostHog makes it easy to get data about usage of your [Vue.js](https://vuejs.org/) app. Integrating PostHog into your app enables analytics about user behavior, custom events capture, session replays, feature flags, and more.

This guide walks you through integrating PostHog into your app for both Vue.js major versions `2` and `3`. We'll use the [JavaScript](/docs/libraries/js) SDK. 

For integrating PostHog into a [Nuxt.js](https://nuxt.com/) app, see our [Nuxt guide](/docs/libraries/nuxt-js).

## Prerequisites

To follow this guide along, you need:

1. A PostHog account (either [Cloud](/docs/getting-started/cloud) or [self-hosted](/docs/self-host))
2. A running Vue.js application

## Setting up PostHog

1. Install posthog-js using your package manager:

```bash
yarn add posthog-js
# or
npm install --save posthog-js
```

### Initializing PostHog

We cover four different methods for initializing PostHog:

1. [Plugins](#method-1-create-a-plugin)
2. [Provide/inject](#method-2-use-provide--inject)
3. [Vue.prototype](#method-3-use-vueprototype)
4. [Composition API](#method-4-use-the-composition-api)

Choose what is best for you, considering your Vue version and your codebase’s stylistic choices.

### Method 1: Create a Plugin

_Note: For both Vue 3.x and Vue 2.x users_

First, create a new file `posthog.js` in your plugins directory.

```bash
mkdir plugins #skip if you already have one
cd plugins 
touch posthog.js 
```

Next, create a plugin and assign PostHog to Vue’s global properties. The code will differ depending on your version of Vue. 

**Vue 3.x:** 

```js
//./plugins/posthog.js
import posthog from "posthog-js";

export default {
  install(app) {
    app.config.globalProperties.$posthog = posthog.init(
      "<ph_project_api_key>",
      {
        api_host: "<ph_client_api_host>",
        person_profiles: 'identified_only',
      }
    );
  },
};
```

**Vue 2.x:** 

```js
//./plugins/posthog.js
import posthog from "posthog-js";

export default {
  install(Vue, options) {
    Vue.prototype.$posthog = posthog.init(
      "<ph_project_api_key>",
      {
        api_host: "<ph_client_api_host>",
        person_profiles: 'identified_only',
      }
    );
  }
};
```

Finally, activate your plugin in the file where you initialize your app. For Vue 3.x, it will likely be your `index.js` file. For Vue 2.x, it will be your `main.js` file.

**Vue 3.x:** 

```js
//main.js
import { createApp } from 'vue'
import App from './App.vue'
import posthogPlugin from "./plugins/posthog"; //import the plugin. 

const app = createApp(App);

app.use(posthogPlugin); //install the plugin
app.mount('#app')
```

**Vue 2.x:** 

```js
//main.js
import posthogPlugin from "./plugins/posthog"; // import the plugin

Vue.use(posthogPlugin); // install the plugin, before new Vue()
```

You can now use PostHog throughout your Vue app using `this.$posthog`. For example:

```js
//component.vue

<script>
export default {
  data() {
    return {
      foo: "bar!",
    };
  },
  watch: {
    // whenever question changes, this function will run
    foo(newFoo, oldFoo) {
      this.$posthog.capture("foo_changed", {foo: newFoo});
    },
  },
  created() {
    console.log("Created", this.$posthog); //posthog accessible anywhere!
  },
};
</script>
```

### Method 2: Use provide / inject

_Note: For Vue 3.x users only_

With Vue 3.x, developers can use `provide()` and `inject()` to pipe global values into any component without prop drilling. And if you don’t know what prop drilling is, good for you.

While this method is more declarative — as you need to inject PostHog into every component — it avoids “polluting” globals (like method 1 does). Some engineers prefer this approach, while others include PostHog in globals since it doesn’t need to be reactive and will be called throughout your application. 

#### Step 1: Initialize Vue

Prior to mounting the app, you must:
1. Import PostHog
2. Initialize it
3. Provide it to your app. 
   
This **must** be done *before* you mount my app. If I provide PostHog *after* mounting it, PostHog will not be predictably available. 

```js
//app.js

import posthog from "posthog-js";

const app = createApp(App);
posthog.init("<ph_project_api_key>", {
  api_host: "<ph_client_api_host>",
  person_profiles: 'identified_only',
});
app.provide("posthog", posthog);
```

#### Step 2: Inject into any Vue file

```js
//component.vue

export default {
  data() {
    return {
      greeting: "How are you!",
    };
  },
  inject: ["posthog"], //grab the injection from app-wide provider
  created() {
    console.log("Created", this.posthog); //posthog accessible!
  },
};
```
### Method 3: Use Vue.prototype

_Note: For Vue 2.x users only_ 

While Vue 3.x dramatically clamped down on global variables, in Vue 2.x, you can initialize PostHog by using `Object.defineProperty` and `Vue.prototype`. 

Anywhere, declare: 

```js
import posthog from "posthog-js";
Object.defineProperty(Vue.prototype, '$posthog', { value: posthog });
```

Then, access PostHog by calling `this.$posthog`. 

```js
//component.vue

export default {
  created() {
    this.$posthog.capture("app_created");
  }
}
```

### Method 4: Use the Composition API

Create a new folder `composables` in your project. In that folder, create a new file `usePosthog.js` with the following initialization code:

```js
// composables/usePostHog.js
import { provide, inject } from 'vue'
import posthog from 'posthog-js'

const PostHogSymbol = Symbol('PostHog')

export function usePostHogProvider() {
  const posthogInstance = posthog.init(
    "<ph_project_api_key>",
    {
      api_host: "<ph_client_api_host>",
      person_profiles: 'identified_only'
    }
  )

  provide(PostHogSymbol, posthogInstance)

  return posthogInstance
}

export function usePostHog() {
  const posthogInstance = inject(PostHogSymbol)
  if (!posthogInstance) {
    throw new Error('PostHog has not been provided')
  }
  return posthogInstance
}
```

In `App.vue`, call `usePostHogProvider()` to initialize PostHog.

```js
// ...rest of your app
</template>

<script setup>
import { usePostHogProvider } from './composables/usePostHog'

// Initialize and provide PostHog
usePostHogProvider()
</script>

<script>
// ...rest of your app
```

You can then use `usePostHog()` to access PostHog in any component.

```js
<template>
  <div>
    <button @click="trackEvent">Track Event</button>
  </div>
</template>

<script setup>
import { usePostHog } from '../composables/usePostHog'

const posthog = usePostHog()

const trackEvent = () => {
  posthog.capture('button_clicked', { property: 'value' })
}
</script>
```

## Capturing pageviews

You might notice that moving between pages only captures a single pageview event. This is because PostHog only captures pageview events when a [page load](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event) is fired. Since Vue creates a single-page app, this only happens once, and the Vue router handles subsequent page changes.

If we want to capture every route change, we must write code to capture pageviews that integrates with the router.

First, make sure to set `capture_pageview` in the PostHog initialization config to `false`. This turns off autocaptured pageviews and ensures you won’t double-capture pageviews on the first load.

```js
// in the file where you initialize posthog
posthog.init(
      "<ph_project_api_key>",
      {
        api_host: "<ph_client_api_host>",
        person_profiles: 'identified_only',
        capture_pageview: false
      }
);
```

**Vue 3.x:** 

In `main.js`, set up PostHog to capture pageviews in the `router.afterEach` function. Additionally, you can use `nextTick` so that the capture event fires only after the page is mounted.

```js
// main.js
import { createApp, nextTick } from 'vue'
import App from './App.vue'
import router from './router'
import posthogPlugin from '../plugins/posthog';

const app = createApp(App);
app.use(posthogPlugin)
.use(router)
.mount('#app');

router.afterEach((to, from, failure) => {
  if (!failure) {
    nextTick(() => {
      app.config.globalProperties.$posthog.capture('$pageview', { path: to.fullPath });
    });
  }
});
```

**Vue 2.x:** 

```js
export default new Router({
	/*
	 *
   *
   */
  afterEach: to => {
    nextTick(() => {
      posthog.capture("$pageview", {
        $current_url: to.fullPath
      });
    });
  }
});
```

## Capturing pageleaves

Similar to pageviews, you need to manually capture pageleaves in a Vue single-page app. 

This starts by setting `capture_pageleave` to `false` in the PostHog initialization config to ensure you don’t double-capture pageleaves. 

```js
// In the file where you initialize PostHog
posthog.init(
      "<ph_project_api_key>",
      {
        api_host: "<ph_client_api_host>",
        person_profiles: 'identified_only',
        capture_pageview: false,
        capture_pageleave: false
      }
);
```

**Vue 3.x:** 

You can then use the same `router.afterEach` hook to capture pageleaves. The difference is that you need to manually set the `$current_url` and `path` properties using the `from` object.

```js
import { createApp, nextTick } from 'vue'
import App from './App.vue'
import router from './router'
import posthogPlugin from '../plugins/posthog';


const app = createApp(App);
app.use(posthogPlugin)
.use(router)
.mount('#app');

router.afterEach((to, from, failure) => {
  if (!failure) {
    nextTick(() => {
      app.config.globalProperties.$posthog.capture('$pageleave', { $current_url: window.location.host + from.fullPath, path: from.fullPath });
      app.config.globalProperties.$posthog.capture('$pageview', { path: to.fullPath });
    });
  }
});
```

## Capturing events

Here’s a simple example of using PostHog to capture a barebones login button. 

```js
//component.vue

<script>
export default {
  data(props) {
    return {
      user: props.user,
    };
  },
  created() {
    console.log("Created", this.$posthog); //posthog accessible anywhere!
  },
	methods: {
		login() {
			this.$posthog.capture("User logged in"); 
			//should be this.posthog if you used method 2! 
		}
	}
};
</script>
<template>
	<button @click="login">Login!</button>
</template>
```

You can the access the project used in this tutorial [on GitHub](https://github.com/mathexl/posthog-vue-demo).

## Next steps

For any technical questions for how to integrate specific PostHog features into Vue (such as analytics, feature flags, A/B testing, surveys, etc.), have a look at our [JavaScript Web](/docs/libraries/js) SDK docs.

Alternatively, the following tutorials can help you get started:

- [How to set up analytics in Vue](/tutorials/vue-analytics)
- [How to set up feature flags in Vue](/tutorials/vue-feature-flags)
- [How to set up A/B tests in Vue](/tutorials/vue-ab-tests)
- [How to set up surveys in Vue](/tutorials/vue-surveys)
