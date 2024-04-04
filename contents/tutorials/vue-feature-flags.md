---
title: How to set up feature flags in Vue
date: 2024-01-19
author:
  - lior-neu-ner
showTitle: true
sidebar: Docs
tags:
  - feature flags
---

import { ProductScreenshot } from 'components/ProductScreenshot'
export const EventsLight = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/vue-feature-flags/events-light.png"
export const EventsDark = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/vue-feature-flags/events-dark.png"
export const CreateFlagLight = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/vue-feature-flags/create-flag-light.png"
export const CreateFlagDark = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/vue-feature-flags/create-flag-dark.png"

[Feature flags](/feature-flags) help you release features and conditionally show content. This tutorial shows you how integrate them in your Vue.js app using PostHog. 

We'll create a basic Vue app, add PostHog, create a feature flag, and then implement the flag to control content in your app.

## Create your Vue app

For this tutorial, we create a basic `Vue 3` app. First, ensure [Node.js is installed](https://nodejs.dev/en/learn/how-to-install-nodejs/) (version 18.0 or newer). Then install `@vue/cli` and create a new Vue app:

```bash
npm install -g @vue/cli
vue create vue-feature-flags
```

Make sure to select `[Vue 3] babel, eslint` as the Vue version.

Next, replace the code in `src/App.vue` with the following:

```vue file=App.vue
<template>
  <div id="app">
    <h1>This is our Vue.js feature flags tutorial</h1>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
```

Run `npm run serve` to start your app.

![Basic Vue app](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/vue-feature-flags/basic-app.png)

## Adding PostHog

> This tutorial shows how to integrate PostHog with `Vue 3`. If you're using `Vue 2`, see [our Vue docs](/docs/libraries/vue-js) for how to integrate PostHog.

Since PostHog handles the management and evaluation of feature flags, we must set it up in our app. If you don't have a PostHog instance, you can [sign up for free here](https://us.posthog.com/signup). 

Start by installing the `posthog-js` library to get access to the [JavaScript Web SDK](/docs/libraries/js).

```bash
npm install posthog-js
```

Create a new [plugin](https://vuejs.org/guide/reusability/plugins) by creating a new folder in your base directory called `plugins` and then a new file `posthog.js`:

```bash
mkdir plugins
cd plugins 
touch posthog.js
```

Add the following code to your `posthog.js` file:

```js file=plugins/posthog.js
import posthog from "posthog-js";

export default {
  install(app) {
    app.config.globalProperties.$posthog = posthog.init(
      "<ph_project_api_key>",
      {
        api_host: "<ph_instance_address>",
      }
    );
  },
};
```

Replace `<ph_project_api_key>` and `<ph_instance_address>` with your your PostHog API key and host. You can find these in your [project settings](https://us.posthog.com/settings/project).

Finally, activate your plugin in `main.js`:

```js file=main.js
import { createApp } from 'vue'
import App from './App.vue'
import posthogPlugin from '../plugins/posthog';

const app = createApp(App);
app.use(posthogPlugin);
app.mount('#app')
```

Once you’ve done this, reload your app. You should begin seeing events in the [PostHog events explorer](https://us.posthog.com/events).

<ProductScreenshot
  imageLight={EventsLight} 
  imageDark={EventsDark} 
  alt="Feature flag created in PostHog" 
  classes="rounded"
/>

## Creating a feature flag

With PostHog set up, your app is ready for feature flags. To create one, go to the [feature flags tab](https://us.posthog.com/feature_flags) in PostHog and click "New feature flag." Enter a flag key (like `my-cool-flag`), set the release condition to roll out to 100% of users, and press "Save."

<ProductScreenshot
  imageLight={CreateFlagLight} 
  imageDark={CreateFlagDark} 
  alt="Feature flag created in PostHog" 
  classes="rounded"
/>

You can customize your [release conditions](/docs/feature-flags/creating-feature-flags#release-conditions) with rollout percentages, and [user](/docs/product-analytics/user-properties) or [group properties](/docs/product-analytics/group-analytics) to fit your needs.

## Implementing our flag code

Once created, we can add our feature flag to our app. We do this using the `this.$posthog.onFeatureFlags` callback.

In our example, we fetch our feature flag and update the text on the page based on its value:

```vue file=App.vue
<template>
  <div id="app">
    <h1>{{ titleText }}</h1>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      titleText: 'Waiting for feature flag'
    };
  },
  mounted() {
    const posthog = this.$posthog;
    posthog.onFeatureFlags(() => {
      if (posthog.isFeatureEnabled('my-cool-flag')) {
        this.titleText = 'Our flag is enabled!';
      } else {
        this.titleText = 'Our flag is disabled!';
      }
    });
  },
}
</script>
```

When you run your app now, you should see the updated text.

![New app after adding the flag](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/vue-feature-flags/flag-enabled-in-app.png)

### Bootstrapping feature flags

You may notice the text flickers when you load your app while PostHog makes a request to fetch the flag value. To prevent this and have your feature flags available immediately, you can initialize PostHog with precomputed flag values to use until it has a chance to fetch them. This is called [bootstrapping](/docs/feature-flags/bootstrapping).

To do this, use the `bootstrap` key in PostHog's initialization config and add feature flag values to it:

```js file=plugins/posthog.js
import posthog from "posthog-js";

export default {
  install(app) {
    app.config.globalProperties.$posthog = posthog.init(
      "<ph_project_api_key>",
      {
        api_host: "<ph_instance_address>",
        bootstrap: {
            featureFlags: {
                'my-cool-flag': true,
            },
        },
      }
    );
  },
};
```

Now when you reload your app, the flicker is gone. 

To ensure you are bootstrapping PostHog with the correct flag values, we recommend fetching the flags values from your server alongside the page load request, and then passing them to your frontend. See our [docs](/docs/feature-flags/bootstrapping) for more information on how to do this.

## Further reading

- [How to set up analytics in Vue](/tutorials/vue-analytics)
- [How to set up A/B tests in Vue](/tutorials/vue-ab-tests)
- [How to set up surveys in Vue](/tutorials/vue-surveys)
