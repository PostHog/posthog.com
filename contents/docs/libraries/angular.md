---
title: Angular
icon: ../../images/docs/integrate/frameworks/angular.svg
---

PostHog makes it easy to get data about traffic and usage of your [Angular.js](https://angularjs.org/) app. Integrating PostHog into your site enables analytics about user behavior, custom events capture, session recordings, feature flags, and more.

This guide walks you through integrating PostHog into your Angular app using the [JavaScript Web SDK](/docs/libraries/js).

## Installation

Install `posthog-js` using your package manager:

```bash
yarn add posthog-js
# or
npm install --save posthog-js
```

In your `src/main.ts`, initialize PostHog using your project API key and instance address (You can find both in your [project settings](https://us.posthog.com/project/settings)).  

```ts file=main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import posthog from 'posthog-js'

posthog.init(
  '<ph_project_api_key>',
  {
    api_host:'<ph_instance_address>' // usually https://app.posthog.com or https://eu.posthog.com
  }
)

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

## Capture custom events

To [capture custom events](/docs/product-analytics/capture-events), import `posthog` and call `posthog.capture()`. Below is an example of how to do this in a component:

```typescript file=app.component.ts
import { Component } from '@angular/core';
import posthog from 'posthog-js'

@Component({
 // existing component code
})

export class AppComponent {
  handleClick() {
    posthog.capture(
      'home_button_clicked', 
    )
  }
}
```

## Tracking pageviews

PostHog only captures pageview events when a [page load](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event) is fired. Since Angular creates a single-page app, this only happens once, and the Angular router handles subsequent page changes.

If we want to capture every route change, we must write code to capture pageviews that integrates with the router.

To do this, import `posthog` into `app-routing.module.ts`, subscribe to router events and then capture `$pageview` events on `NavigationEnd` events:

```js
// other imports...
import { RouterModule, Routes, Router, NavigationEnd } from '@angular/router';
import posthog from 'posthog-js';

//... routes, @NgModule

export class AppRoutingModule {
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        posthog.capture('$pageview');
      }
    });
  }
 }
```

Now, every time a user moves between pages, PostHog captures a `$pageview` event, not just on the first page load. 

## Next steps

For any technical questions for how to integrate specific PostHog features into Angular (such as feature flags, A/B testing, surveys, etc.), have a look at our [JavaScript Web SDK docs](/docs/libraries/js).

Alternatively, we've also written the below tutorials to help get you started:

- [How to set up Angular analytics, feature flags, and more](/tutorials/angular-analytics)
- [How to set up A/B tests in Angular](/tutorials/angular-ab-tests)
- [How to set up surveys in Angular](/tutorials/angular-surveys)

