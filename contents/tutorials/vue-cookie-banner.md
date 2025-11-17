---
title: Building a Vue cookie consent banner
date: 2025-08-28
author:
  - ian-vanagas
showTitle: true
sidebar: Docs
tags:
  - configuration
  - product os
---

With internet privacy regulations like GDPR coming into effect, managing cookies is becoming increasingly important. Cookies are pieces of information apps set in users’ browsers to help them store information and identity. It’s possible to use [PostHog without cookies](/tutorials/cookieless-tracking), but it’s simpler to use them.

To ensure you are compliant with regulations such as GDPR, your app must receive consent to use cookies. One way to do this is with a cookie consent banner, and this tutorial shows you how to build one in Vue, a popular JavaScript framework and combine it with PostHog.

## Step 1: Setting up our Vue app

First, if you haven’t used Vue before, install the command line interface (CLI). You also need a package manager such as npm, which you can get by installing [Node](https://nodejs.org/en/).

```bash
npm install -g @vue/cli
```

After installing the CLI, you can create the Vue project. We are naming ours `vue-cookie-banner`. When the CLI prompts you with options, choose Vue 3.

```bash
vue create vue-cookie-banner
```

Next, head into the folders it created and run the server. This launches the site. 

```bash
cd vue-cookie-banner
npm run serve
```

Now you have the template for a Vue app that is ready for PostHog and a cookie consent banner. 

## Step 2: Installing PostHog

Using PostHog starts by installing the `posthog-js` package.

```bash
npm i posthog-js
```

Next, we’ll set up PostHog using the Composition API.

In `src`, create a `composables` folder as well as a `usePosthog.js` file to that folder. In `usePosthog.js`, initialize PostHog with your project API key and host from [your project settings](https://app.posthog.com/settings/project) like this:

```js file=src/composables/usePostHog.js
import posthog from 'posthog-js'

export function usePostHog() {
  posthog.init('<ph_project_api_key>', {
    api_host: '<ph_client_api_host>',
    api_defaults: '<ph_posthog_js_defaults>',
  })

  return { posthog }
}
```

In `main.js`, import the PostHog composable and call it.

```js file=main.js
import { createApp } from 'vue'
import App from './App.vue'
import { usePostHog } from './composables/usePostHog'

usePostHog()

createApp(App).mount('#app')

```

Once you run `npm run serve` again and head into the cookies for your site, you should see a PostHog cookie added.

![Cookie](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_28_at_15_01_19_2x_1b4e5053c1.png)

Our app did this without the consent of the user, and now, it’s time to build the cookie consent banner to fix this.

## Step 3: Ensuring cookies aren't set on initial load

If you want to make sure you are fully compliant, you may want to ensure cookies aren't set until the user has given consent.

To do this, you can set `cookieless_mode` to `on_reject` in your initialization config like this:

```js file=src/composables/usePostHog.js
import posthog from 'posthog-js'

export function usePostHog() {
  posthog.init('<ph_project_api_key>', {
    api_host: '<ph_client_api_host>',
    api_defaults: '<ph_posthog_js_defaults>',
    cookieless_mode: 'on_reject' // +
  })

  return { posthog }
}
```

This means that PostHog will not set any cookies until the user has given consent, which is what we rely on the cookie banner to do.

## Step 4: Creating our cookie banner component

First, create a `CookieBanner.vue` component in our `components` folder.

For our cookie banner, create a basic component with some details about cookies, buttons to accept and decline, and some basic styling. You can customize it more if you like (our [posthog.com cookie banner](https://github.com/PostHog/posthog.com/blob/master/src/components/CookieBanner/index.tsx) can provide some inspiration).

```js
// components/CookieBanner.vue
<template>
  <div class="banner">
    <p>
      We use tracking cookies to understand how you use the product 
      and help us improve it.
      Please accept cookies to help us improve.
    </p>
    <button type="button">Accept cookies</button>
    <button type="button">Decline cookies</button>
  </div>
</template>

<script>
export default {
  name: "CookieBanner",
};
</script>

<style scoped>
.banner {
  background-color: #f1f1f1;
  padding: 20px;
  text-align: center;
}
</style>
```

In `App.vue`, import the `CookieBanner` component and add below the default `HelloWorld` component.

```vue file=App.vue focusOnLines=0-15
<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
  <CookieBanner /> // +
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import CookieBanner from './components/CookieBanner.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    CookieBanner // +
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> 
```

That gives us a basic cookie consent banner in our Vue app. It’s not the prettiest, but you can modify it to fit your site.

![Banner](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_28_at_15_09_02_2x_f2015cd3bf.png)

The problem is that it **doesn’t do anything** at the moment. We must add the logic to manage consent and opt users in or out of cookies. Luckily, PostHog makes this easy.

## Step 5: Adding the opt out (or in) logic

PostHog has methods to help us opt user in or out and deal with cookies. We’ll add click handlers to our buttons and connect them to methods that use PostHog to either opt in or out of tracking cookies.

```vue file=components/CookieBanner.vue focusOnLines=7-25
<template>
  <div class="banner">
    <p>
      We use tracking cookies to understand how you use the product 
      and help us improve it.
      Please accept cookies to help us improve.
    </p>
    <button type="button" @click="acceptCookies">Accept cookies</button>
    <button type="button" @click="declineCookies">Decline cookies</button>
  </div>
</template>

<script>
import { usePostHog } from '@/composables/usePostHog'; // +
const { posthog } = usePostHog(); // +

export default {
  name: "CookieBanner",
  methods: {
    acceptCookies() {
      posthog.opt_in_capturing(); // +
    },
    declineCookies() {
      posthog.opt_out_capturing(); // +
    },
  },
};
</script>

<style scoped>
.banner {
  background-color: #f1f1f1;
  padding: 20px;
  text-align: center;
}
</style>
```

Now, no cookies are set until the user clicks an option and the decision is saved in local storage.

![Local storage](https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/Clean_Shot_2025_08_28_at_15_22_11_2x_cda8e751e7.png)

This is the functionality we want, but the banner doesn't disappear after the user clicks an option (and that’s annoying). We can add some more logic, again using PostHog, to hide the banner once the user chooses an option.

## Step 6: Making the banner conditional

To make the banner conditional, we:

1. Set up a `showBanner` state to control whether the banner is shown.
2. Use PostHog's `get_explicit_consent_status` method to check if the user has made a choice.
3. Hide the banner if/when the user has made a choice.

Altogether this looks like this:

```vue file=components/CookieBanner.vue focusOnLines=0-40
<template>
  <div v-if="shouldShowBanner" class="banner"> // +
    <p>
      We use tracking cookies to understand how you use the product 
      and help us improve it.
      Please accept cookies to help us improve.
    </p>
    <button type="button" @click="acceptCookies">Accept cookies</button>
    <button type="button" @click="declineCookies">Decline cookies</button>
  </div>
</template>

<script>
import { usePostHog } from '@/composables/usePostHog';
const { posthog } = usePostHog();

export default {
  name: "CookieBanner",
  data() {
    return {
      showBanner: true, // +
    };
  },
  computed: {
    shouldShowBanner() {
      return this.showBanner && posthog.get_explicit_consent_status() === 'pending'; // +
    }
  },
  methods: {
    acceptCookies() {
      posthog.opt_in_capturing();
      this.showBanner = false; // +
    },
    declineCookies() {
      posthog.opt_out_capturing();
      this.showBanner = false; // +
    },
  },
};
</script>

<style scoped>
.banner {
  background-color: #f1f1f1;
  padding: 20px;
  text-align: center;
}
</style>
```

Once we’ve done that, our cookie consent banner is fully functional. Try it out by clicking accept and decline, making sure it disappears, and the correct values show up in cookies and local storage. Clear local storage to reset and test again with the other option to confirm everything works. You're now one step closer to being compliant with GDPR and other privacy regulations.

## Further reading

- [How to set up A/B tests in Vue](/tutorials/vue-ab-tests)
- [How to set up surveys in Vue](/tutorials/vue-surveys)
- [How to use PostHog without cookie banners](/tutorials/cookieless-tracking)

<NewsletterForm />