---
title: PostHog for VueJS users – a code-snippet walkthrough 
sidebar: Docs
showTitle: true
featuredImage: ../images/tutorials/banners/posthog-for-vuejs.png
featuredTutorial: false
date: 2022-08-17
author: ['mathew-pregasen']
topics: ['configuration']
---

I discovered [Vue](https://vuejs.org) around the beginning of 2017. Back then, the Vue community, fostered by [Evan You](https://evanyou.me), was small and budding, filled with PHP/Laravel enthusiasts. The framework itself was also young. I remember discovering copious outdated tutorials. Vue had *significantly* re-imagined itself between versions 1.x and 2.x.

Today, Vue is thriving. With advanced [tooling](https://vitejs.dev), [plugins](https://github.com/vuejs/awesome-vue), and [meta-frameworks](https://vitejs.dev), the Vue ecosystem has grown and matured. Thousands of companies—including [Netflix](https://netflix.com), [Gitlab](https://gitlab.com), [Nintendo](https://nintendo.com), and [Adobe](https://adobe.com)—utilize Vue in their frontend stack. Vue’s latest major release, [3.x](https://blog.vuejs.org/posts/vue-3-as-the-new-default.html), has made critical advances, pitting Vue against heavyweights like [React](https://reactjs.org) and [Angular](https://angular.io).

While PostHog doesn’t currently offer an official plugin for Vue, using PostHog in a Vue app is easy. In fact, you can install and use PostHog in less than 2 minutes. **Perhaps 5 minutes, if you’re as nit-picky about code patterns as I am. 

Today, I will cover implementing PostHog in Vue, tracing over both **Vue 3.x** and **Vue 2.x** patterns. 

## Installing PostHog

First, I will install PostHog using either npm or yarn. 

```bash
npm install posthog #for team npm! 
#or 
yarn install posthog #for team yarn! 
```

## Initializing PostHog

The fun part. Initialization. There are multiple **valid** ways to initialize PostHog. While all are fair game, some may be looked down upon by others—*cough*, React purists, *cough*. I will cover three methods — plugins, provide/inject, and Vue.prototype. Choose what is best for you, considering your Vue version and your codebase’s stylistic choices. 

### Method 1: Create a Plugin

_Note: For both Vue 3.x and Vue 2.x users_

I will begin by spawning a plugins folder from within my src. You may already have one! 

```bash
mkdir plugins #skip if you already have one
cd plugins 
touch posthog.js 
```

#### Step 1: Import Vue

In `posthog.js`, I will import PostHog from the previously installed package `posthog-js`. 

```jsx
//./plugins/posthog.js
import posthog from "posthog-js";
```

#### Step 2: Initialize the Plugin 

Next, I will create a plugin and assign PostHog to Vue’s global properties. The code will differ depending on my version of Vue. 

**Vue 3.x:** 

```jsx
//./plugins/posthog.js
import posthog from "posthog-js";

export default {
  install(app, options) {
    app.config.globalProperties.$posthog = posthog.init(
      "<YOUR POSTHOG PUBLIC KEY>",
      {
        api_host: "<YOUR POSTHOG HOST>",
      }
    );
  },
};
```

**Vue 2.x:** 

```jsx
//./plugins/posthog.js
import posthog from "posthog-js";

export default {
  install(Vue, options) {
    Vue.prototype.$posthog = posthog.init(
      "<YOUR POSTHOG PUBLIC KEY>",
      {
        api_host: "<YOUR POSTHOG HOST>"
      }
    );
  }
};
```

#### Step 3: Activate the plugin

I am going to navigate to where I initialize my app — for me, that’s `index.js` for my Vue 3.x app and `main.js` for my Vue 2.x app. For you, fair chance it will be in the same. 

Here, I will add the following lines of code: 

**Vue 3.x:** 

```jsx
//index.js

import posthogPlugin from "./plugins/posthog"; //import the plugin. 

/* ... */
app.use(posthogPlugin); //install the plugin
```

**Vue 2.x:** 

```jsx
//main.js
import posthogPlugin from "./plugins/posthog"; // import the plugin

Vue.use(posthogPlugin); // install the plugin, before new Vue()
```

**That’s it!** Now I can use PostHog throughout my Vue app using `this.$posthog`. Note, the `$` prefix is necessary — if you’re actually on the fence over which method to use, choose this technique as PostHog is worth some serious 💵. 😉. 

```jsx
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
      this.$posthog.capture("Foo Changed", {foo: newFoo});
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

#### Step 1: Initialize Vue

Prior to mounting my app, I will (i) import PostHog, (ii) initialize it, and (iii) provide it to my app. This **must** be done *before* I mount my app — if I provide PostHog *after* mounting it, PostHog will not be predictably available. 

```jsx
//app.js

import posthog from "posthog-js";

const app = createApp(App);
posthog.init("<YOUR POSTHOG PUBLIC KEY>", {
  api_host: "<YOUR POSTHOG HOST>",
});
app.provide("posthog", posthog);
```

#### Step 2: Inject in any Vue file

I can inject PostHog and use it via `this.posthog`. No `$` prefix. Arguably, this is the preferable method if you’re humble like J Cole. 

```jsx
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

While this method is more declarative — as you need to inject PostHog into every component — it avoids “polluting” globals. Now, in my opinion, PostHog *should* be in globals (a la, Method 1). The PostHog instance, after all, doesn’t need to be reactive, and should be called throughout your application for wide coverage. 

### Method 3: Use Vue.prototype

_Note: For Vue 2.x users only_ 

While Vue 3.x dramatically clamped down on global variables, in Vue 2.x, you can initialize PostHog by using `Object.defineProperty` and `Vue.prototype`. 

Anywhere, declare: 

```jsx
import posthog from "posthog-js";
Object.defineProperty(Vue.prototype, '$posthog', { value: posthog });
```

Then, access PostHog. I can do this by calling `this.$posthog`. 

```jsx
//component.vue

export default {
  created() {
    this.$posthog.capture("App Created!");
  }
}
```

## Bonus Points: Bind PostHog to Vue Router

While PostHog will automatically capture paths, I can optionally bind it to Vue’s built-in router using the `afterEach` function. Additionally, I will mount PostHog inside `nextTick` so that the capture event fires after the page is mounted. 

**Vue 3.x:** 

```jsx
//router.js #might be in your app.js

router.afterEach((to) => {
  nextTick(() => {
    posthog.capture("$pageview", {
      $current_url: to.fullPath,
    });
  });
});
```

**Vue 2.x:** 

```jsx
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

## Conclusion

Here’s a simple example of me using PostHog to capture a barebones login button. 

```jsx
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

You can learn more about PostHog’s specific features to use in your Vue app by checking out PostHog’s [tutorials](https://posthog.com/tutorials). 

Download the example project used in this tutorial [here](https://we.tl/t-22foW1PNhs).

<NewsletterTutorial compact/>
