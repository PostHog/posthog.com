---
title: How to capture paths from hash-based routing
date: 2025-07-09
author:
  - robbie-coomber
tags:
  - product analytics
  - web analytics
---

Hash-based routing is a common way to manage navigation in single-page applications (SPAs) using the URL hash. This tutorial shows you how to set up PostHog to work with hash-based routing, ensuring that pageviews and events are tracked correctly.

## Capturing paths in hash-based routing

When using hash-based routing, the URL path is typically in the format `http://example.com/#/path/to/page`. The `$pathname` property in PostHog will not automatically include the hash part of the URL. In this example, it will just be `/`.

To add the hash to the `$pathname` property, you can use the `before_send` function in PostHog's initialization. This function allows you to modify events before they are sent to PostHog.

The below example is how you can change the `$pathname` property to include the hash, so in the example above it will be `/#/path/to/page`:

```tsx
import posthog, { CaptureResult } from 'posthog-js'

posthog.init('<ph_project_api_key>', {
  api_host: '<ph_client_api_host>',
  defaults: '<ph_posthog_js_defaults>',
  before_send: (event: CaptureResult | null): CaptureResult | null => {
    if (event?.properties?.$current_url) {
      // parse the URL
      const parsed = new URL(event.properties.$current_url)

      // if there is a hash in the URL, we want to include it in the $pathname property
      if (parsed.hash) {
        event.properties.$pathname = parsed.pathname + parsed.hash
      }
    }
    return event
  },
})
```

## Which libraries are affected?

The most common routing libraries that use hash-based routing are:
* [React Router](https://reactrouter.com/) - with the `HashRouter` component.
* [TanStack Router](https://tanstack.com/router/v1/docs/framework/react/guide/history-types) - with `createHashHistory`
* [SvelteKit](https://svelte.dev/docs/kit/configuration#router) - with `router.type === 'hash'`
* [Vue Router](https://router.vuejs.org/guide/essentials/history-mode#Hash-Mode) - with `createWebHashHistory`
