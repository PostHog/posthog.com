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

To fix this, you can implement pageview capture manually using custom events. This tutorial shows you how to do this for the most popular SPA frameworks like [Next.js](#tracking-pageviews-in-nextjs-app-router), [Vue](#tracking-pageviews-in-vue), [Svelte](#tracking-pageviews-in-svelte), and [Angular](#tracking-pageviews-in-angular). 

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

To add PostHog to your [Next.js app](/docs/libraries/next-js), we start by creating the `PostHogProvider` component in the `app` folder. We set `capture_pageview: false` because we will manually capture pageviews.

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
      capture_pageview: false
    })
  }, []);
  
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
```

To capture pageviews, we create another `pageview.js` component in the app folder.

```js
// app/pageview.js
'use client'

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { usePostHog } from 'posthog-js/react';

export default function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();
  // Track pageviews
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      posthog.capture(
        '$pageview',
        {
          '$current_url': url,
        }
      )
    }
  }, [pathname, searchParams, posthog])
  
  return null
}
```

Finally, we import both and put them together in the `app/layout.js` file.

```js
// app/layout.js
import "./globals.css";
import { PHProvider } from './providers'
import dynamic from 'next/dynamic'

const PostHogPageView = dynamic(() => import('./pageview'), {
  ssr: false,
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <PHProvider>
        <body>
          {children}
          <PostHogPageView />
        </body>
      </PHProvider>
    </html>
  );
}
```

Make sure to dynamically import the `PostHogPageView` component or the `useSearchParams` hook will deopt the entire app into client-side rendering.

## Tracking pageviews in React Router

If you are using [React Router](https://reactrouter.com/en/main) AKA `react-router-dom`, start by adding the `PostHogProvider` component in the `app` folder. Make sure to set `capture_pageview: false` because we will manually capture pageviews.

```js
// app/providers.js
'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init('<ph_project_api_key>', {
    api_host: '<ph_client_api_host>',
    capture_pageview: false
  })
}

export function PHProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
```

To capture pageviews, we create another `pageview.js` component in the app folder.

```js
// app/pageview.js
import { useEffect } from "react";
import { useLocation } from 'react-router-dom';

export default function PostHogPageView() {
  let location = useLocation();

  // Track pageviews
  useEffect(() => {
    if (posthog) {
      posthog.capture(
        '$pageview',
        {
          '$current_url': window.location.href,
        }
      )
    }
  }, [location])
  
  return null
}
```

Finally, we import both and put them together in the `app/layout.js` file.

```js
import * as React from 'react';
import { PHProvider } from './providers'
import { PostHogPageView } from './pageview'

function App() {
  return (
    <html lang="en">
      <PHProvider>
        <body>
          {children}
          <PostHogPageView />
        </body>
      </PHProvider>
    </html>
  );
}
```

## Tracking pageviews in Vue

After creating a [Vue app](/docs/libraries/vue-js) and setting up the `vue-router`, create a new folder in the `src/components` named `plugins`. In this folder, create a file named `posthog.js`. This is where we initialize PostHog.


```js
// src/plugins/posthog.js
import posthog from "posthog-js";

export default {
  install(app) {
    app.config.globalProperties.$posthog = posthog.init(
      "<ph_project_api_key>",
      {
        api_host: "<ph_client_api_host>",
        capture_pageview: false
      }
    );
  },
};
```

After this, you can add the plugin to the `main.js` file and use it along with the router to capture pageviews `afterEach` route change.

```js
// src/main.js
import { createApp, nextTick } from 'vue'
import App from './App.vue'
import router from './router'
import posthogPlugin from '../plugins/posthog';

const app = createApp(App);
app.use(posthogPlugin).use(router).mount('#app');

router.afterEach((to, from, failure) => {
  if (!failure) {
    nextTick(() => {
      app.config.globalProperties.$posthog.capture(
        '$pageview', 
        { path: to.fullPath }
      );
    });
  }
});
```

## Tracking pageviews in Svelte

If you haven't already, start by creating a `+layout.js` file for [your Svelte app](/docs/libraries/svelte) in your `src/routes` folder. In it, add the code to initialize PostHog.

```js
// src/routes/+layout.js
import posthog from 'posthog-js'
import { browser } from '$app/environment';

export const load = async () => {

  if (browser) {
    posthog.init(
      '<ph_project_api_key>',
      {
        api_host: '<ph_client_api_host>',
        capture_pageview: false
      }
    )
  }
  return
};
```

After that, create a `+layout.svelte` file in `src/routes`. In it, use the `afterNavigate` interceptor to capture pageviews.

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import posthog from 'posthog-js'
  import { browser } from '$app/environment';
  import { beforeNavigate, afterNavigate } from '$app/navigation';

  if (browser) {
    afterNavigate(() => posthog.capture('$pageview'));
  }
</script>

<slot></slot>
```

## Tracking pageviews in Angular

To start tracking pageviews in [Angular](/docs/libraries/angular), begin by initializing PostHog in `src/main.ts`.

```js
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import posthog from 'posthog-js';

posthog.init('<ph_project_api_key>',
  {
    api_host: '<ph_client_api_host>',
    capture_pageview: false
  }
);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

After setting up your routes and router, you can capture pageviews by subscribing to `navigationEnd` events in `app.component.ts`.

```js
import { Component } from '@angular/core';
import { RouterOutlet, Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import posthog from 'posthog-js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-spa';
  navigationEnd: Observable<NavigationEnd>;

  constructor(public router: Router) {
    this.navigationEnd = router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd)
    ) as Observable<NavigationEnd>;
  }

  ngOnInit() {
    this.navigationEnd.subscribe((event: NavigationEnd) => {
      posthog.capture('$pageview');
    });
  }
}
```

## Further reading

- [What to do after installing PostHog in 5 steps](/tutorials/next-steps-after-installing)
- [What engineers get wrong about analytics](/newsletter/misconceptions-about-analytics)
- [Complete guide to event tracking](/tutorials/event-tracking-guide)

<NewsletterForm />