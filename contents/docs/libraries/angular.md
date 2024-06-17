---
title: Angular
icon: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/docs/integrate/frameworks/angular.svg
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

In your `src/main.ts`, initialize PostHog using your project API key and instance address. You can find both in your [project settings](https://us.posthog.com/project/settings).  

```ts file=main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import posthog from 'posthog-js'

posthog.init(
  '<ph_project_api_key>',
  {
    api_host:'<ph_client_api_host>',
    person_profiles: 'identified_only'
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

To track pageviews in Angular, we import:

1. `posthog`
2. `Router`, `Event`, and `NavigationEnd` from `@angular/router`
3. `Observable` from `rxjs` and `filter` from `rxjs/operators`

With these, we set up a subscription to the router events that captures a `$pageview` event on every `NavigationEnd` event:

```ts file=app.component.ts
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

### Angular v16 and below

To track pageviews in Angular v16 and below, import `posthog` into `app-routing.module.ts`, subscribe to router events and then capture `$pageview` events on `NavigationEnd` events:

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

## Capturing pageleaves

PostHog captures `$pageleave` events on page unload, but this is also affected by Angular acting as a single-page app. PostHog doesn't capture pageleave events when moving between pages, so we need to manually implement them.

To do this, we can subscribe to the `NavigationStart` event and then capture a `$pageleave` event:

```ts
import { Component } from '@angular/core';
import { RouterOutlet, Router, Event, NavigationEnd, NavigationStart } from '@angular/router';
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
  navigationStart: Observable<NavigationStart>;

  constructor(public router: Router) {
    this.navigationEnd = router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd)
    ) as Observable<NavigationEnd>;
    this.navigationStart = router.events.pipe(
      filter((event: Event) => event instanceof NavigationStart)
    ) as Observable<NavigationStart>;
  }

  ngOnInit() {
    this.navigationEnd.subscribe((event: NavigationEnd) => {
      posthog.capture('$pageview');
    });
    this.navigationStart.subscribe((event: NavigationStart) => {
      posthog.capture('$pageleave');
    });
  }
}
```


## Next steps

For any technical questions for how to integrate specific PostHog features into Angular (such as feature flags, A/B testing, surveys, etc.), have a look at our [JavaScript Web SDK docs](/docs/libraries/js).

Alternatively, the following tutorials can help you get started:

- [How to set up Angular analytics, feature flags, and more](/tutorials/angular-analytics)
- [How to set up A/B tests in Angular](/tutorials/angular-ab-tests)
- [How to set up surveys in Angular](/tutorials/angular-surveys)

