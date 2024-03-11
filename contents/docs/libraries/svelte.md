---
title: Svelte
icon: ../../images/docs/integrate/frameworks/svelte.svg
---

PostHog makes it easy to get data about traffic and usage of your [Svelte](https://astro.build/) app. Integrating PostHog into your site enables analytics about user behavior, custom events capture, session recordings, feature flags, and more.

This guide walks you through integrating PostHog into your SvelteKit app using the [JavaScript Web](/docs/libraries/js) and [Node.js](/docs/libraries/node) SDKs.

## Client-side setup

Install `posthog-js` using your package manager:

```bash
yarn add posthog-js
# or
npm install --save posthog-js
```

Then, if you haven't created a root [layout](https://kit.svelte.dev/docs/routing#layout) already, create a new file called `+layout.js` in your `src/routes` folder In this file, check the environment is the browser, and initialize PostHog if so. You can get both your API key and instance address in your [project settings](https://us.posthog.com/project/settings):

```js file=routes/+layout.js
import posthog from 'posthog-js'
import { browser } from '$app/environment';

export const load = async () => {

  if (browser) {
    posthog.init(
      '<ph_project_api_key>',
      { api_host: '<ph_instance_address>' }
    )
  }
  return
};
```

### Tracking pageviews and pageleaves

PostHog only captures pageview events when a [page load](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event) is fired. Since Svelte creates a single-page app, this only happens once, and the router handles subsequent page changes.

If we want to capture every route change, we must write code to capture pageviews that integrates with the router.

To do this, set up `beforeNavigate` and `afterNavigate` interceptors in a new file `routes/+layout.svelte` to capture `$pageview` and `$pageleave` events:

```svelte file=+layout.svelte
<script>
  import posthog from 'posthog-js'
  import { browser } from '$app/environment';
  import { beforeNavigate, afterNavigate } from '$app/navigation';

  if (browser) {
        beforeNavigate(() => posthog.capture('$pageleave'));
        afterNavigate(() => posthog.capture('$pageview'));
    }
</script>

<slot></slot>
```

To make sure we don't double count pageviews and pageleaves, we also need to adjust our PostHog initialization in `routes/+layout.js` to set `capture_pageview` and `capture_pageleave` to false.

```js file=routes/+layout.js
import posthog from 'posthog-js'
import { browser } from '$app/environment';

export const load = async () => {

  if (browser) {
    posthog.init(
      '<ph_project_api_key>',
      {
        api_host:'<ph_instance_address>',
        capture_pageview: false,
        capture_pageleave: false
      }
    )
  }
  return
};
```

## Server-side setup

Install `posthog-node` using your package manager:

```bash
yarn add posthog-js
# or
npm install --save posthog-js
```

Then, initialize the PostHog Node client where you'd like to use it on the server side. For example, in a [load function](https://kit.svelte.dev/docs/load#page-data):

```js file=routes/+page.server.js
import { PostHog } from 'posthog-node';

export async function load() {
  const posthog = new PostHog('<ph_project_api_key>', 
  { host: '<ph_instance_address>' });
  posthog.capture({
    distinctId: 'distinct_id_of_the_user',
    event: 'event_name',
  })
  await posthog.shutdownAsync()
}
```

> **Note:** Make sure to always call `posthog.shutdownAsync()` after capturing events from the server-side. PostHog queues events into larger batches, and this call forces all batched events to be flushed immediately.

## Next steps

For any technical questions for how to integrate specific PostHog features into Svelte (such as analytics, feature flags, A/B testing, surveys, etc.), have a look at our [JavaScript Web](/docs/libraries/js) and [Node]((/docs/libraries/node)) SDK docs.

Alternatively, we've also written the below tutorials to help get you started:

- [How to set up Svelte analytics, feature flags, and more](/tutorials/svelte-analytics)
- [How to set up A/B tests in Svelte](/tutorials/svelte-ab-tests)
- [How to set up surveys in Svelte](/tutorials/svelte-surveys)

