---
title: Tracking pageviews in single-page apps (SPA)
sidebar: Docs
showTitle: true
author:
  - ian-vanagas
  - yakko-majuri
date: 2024-06-11
featuredVideo: 'https://www.youtube-nocookie.com/embed/I_WJc8T5lL8'
tags:
  - configuration
  - events
  - product analytics
---

A single-page application (or SPA) dynamically loads content for new pages using JavaScript instead of loading new pages from the server. Ideally, this enables users to navigate around the app without waiting for new pages to load, providing a seamless user experience.

PostHog's JavaScript Web SDK automatically captures pageview events on page load. The problem with SPAs is that **page loads don't happen beyond the initial one**. This means user navigation in your SPA isn't tracked.

Luckily, you can opt-in to tracking this behavior by setting `defaults: '2025-05-24'` when initializing PostHog to use the most recent defaults. This default uses `capture_pageview: 'history_change'`, which captures SPA navigation using the browser [history API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) 

This tutorial shows you how to follow the recommended approach for the most popular SPA frameworks like [Next.js](#tracking-pageviews-in-nextjs-app-router), [Vue](#tracking-pageviews-in-vue), [Svelte](#tracking-pageviews-in-svelte), and [Angular](#tracking-pageviews-in-angular). 

> **Prerequisite:** Each of these requires you to have an app created and PostHog installed. To install the [PostHog JavaScript Web SDK](/docs/libraries/js), run the following command for the package manager of your choice:
>
> ```bash
> yarn add posthog-js
> # or
> npm install --save posthog-js
> # or
> pnpm add posthog-js
> ```

## Tracking pageviews in Next.js (app router)

To add PostHog to your [Next.js app](/docs/libraries/next-js) use it to capture pageviews, we create a `PostHogProvider` component in the `app` folder, initialize PostHog with our project API key and host (from your [project settings](https://us.posthog.com/project/settings)). PostHog will automatically capture pageviews if initialized with updated defaults.

```js
// app/providers.js
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PHProvider({ children }) {
  useEffect(() => {
    posthog.init('<ph_project_api_key>', {
      api_host: '<ph_client_api_host>',
      defaults: '<ph_posthog_js_defaults>',
    })
  }, []);
  
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
```

We import this and use it in the `app/layout.js` file.

```js
// app/layout.js
import "./globals.css";
import { PHProvider } from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <PHProvider>
        <body>
          {children}
        </body>
      </PHProvider>
    </html>
  );
}
```

## Tracking pageviews in React Router v7

If you are using [React Router](https://reactrouter.com/en/main), start by setting `posthog-js` and `posthog-js/react` as external packages in your `vite.config.ts` file.

```ts file=vite.config.ts
// ... imports

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  ssr: {
    noExternal: ['posthog-js', 'posthog-js/react']
  }
});
```

Next, create a `providers.tsx` file in the `app` folder. PostHog will automatically track pageviews if initialized with updated defaults.

```ts
// app/providers.tsx
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init('<ph_project_api_key>', {
    api_host: '<ph_client_api_host>',
    defaults: "<ph_posthog_js_defaults>",
  })
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
} 
```

Finally, import the `PHProvider` component in the `app/root.tsx` file.

```ts
// app/root.tsx
// ... imports
import { PHProvider } from "./provider";

// ... links, meta, etc.

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <PHProvider>
          {children}
          <ScrollRestoration />
          <Scripts />
        </PHProvider>
      </body>
    </html>
  );
}
// ... rest of the file
```

## Tracking pageviews in React Router (v6 or below)

If you are using React Router v6 or below AKA `react-router-dom`, start by adding the `PostHogProvider` component in the `app` folder.

```js
// app/providers.js
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init('<ph_project_api_key>', {
    api_host: '<ph_client_api_host>',
    defaults: '<ph_posthog_js_defaults>',
  })
}

export function PHProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
```

We then import this and use it in the `app/layout.js` file.

```js
import * as React from 'react';
import { PHProvider } from './providers'

function App() {
  return (
    <html lang="en">
      <PHProvider>
        <body>
          {children}
        </body>
      </PHProvider>
    </html>
  );
}
```

## Tracking pageviews in Vue

After creating a [Vue app](/docs/libraries/vue-js) and setting up the `vue-router`, create a new folder in the `src/components` named `plugins`. In this folder, create a file named `posthog.js`. If PostHog is initialized with updated defaults, it automatically tracks pageviews.

```js
// src/plugins/posthog.js
import posthog from "posthog-js";

export default {
  install(app) {
    app.config.globalProperties.$posthog = posthog.init("<ph_project_api_key>", {
      api_host: "<ph_client_api_host>",
      defaults: "<ph_posthog_js_defaults>",
    });
  },
};
```

After this, you can add the plugin to the `main.js` file and use it along with the router to capture pageviews `afterEach` route change.

```js
// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import posthogPlugin from '../plugins/posthog';

const app = createApp(App);
app.use(posthogPlugin).use(router).mount('#app');
```

## Tracking pageviews in Svelte

If you haven't already, start by creating a `+layout.js` file for [your Svelte app](/docs/libraries/svelte) in your `src/routes` folder. PostHog automatically tracks your pageviews once initialized with updated defaults.

```js
// src/routes/+layout.js
import posthog from 'posthog-js'
import { browser } from '$app/environment';

export const load = async () => {
  if (browser) {
    posthog.init('<ph_project_api_key>', {
      api_host: '<ph_client_api_host>',
      defaults: '<ph_posthog_js_defaults>',
    })
  }

  return
};
```

## Tracking pageviews in Angular

To start tracking pageviews in [Angular](/docs/libraries/angular), begin by initializing PostHog in `src/main.ts`. PostHog automatically tracks your pageviews when initialized with updated defaults.

```js
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import posthog from 'posthog-js';

posthog.init('<ph_project_api_key>', {
  api_host: '<ph_client_api_host>',
  defaults: "<ph_posthog_js_defaults>",
});

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

## Further reading

- [What to do after installing PostHog in 5 steps](/tutorials/next-steps-after-installing)
- [What engineers get wrong about analytics](/newsletter/misconceptions-about-analytics)
- [Complete guide to event tracking](/tutorials/event-tracking-guide)

<NewsletterForm />