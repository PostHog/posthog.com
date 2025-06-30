---
title: Using PostHog for browser extensions
sidebar: Docs
showTitle: true
---

Do you have a Firefox or Chrome browser extension with a user interface and want to understand how it's being used? PostHog is the perfect way to do just that.

## Setup for Firefox & Chrome extension

Start by installing the PostHog [JavaScript web SDK](/docs/libraries/js).
```shell
npm install --save posthog-js
```

Browser extensions prohibit remote code loading. Import directly from the `posthog-js/dist/array.no-external.js` bundle and set `disable_external_dependency_loading: true` to avoid remote code loading.

```js
import 'posthog-js/dist/array.no-external.js'

posthog.init('<ph_project_api_key>', {
    api_host: '<ph_client_api_host>',
    persistence: 'localStorage',
    disable_external_dependency_loading: true
});
```

import { CalloutBox } from 'components/Docs/CalloutBox'

<CalloutBox icon="IconInfo" title="Bundling">

Browser extensions can block your imports. If your extension throws errors when trying to import PostHog, use a bundler like [Rollup](https://rollupjs.org/) to bundle your JavaScript, and import it in a single `<script type="module" src="dist/bundle.js"/>` tag.

</CalloutBox>

## Using product analytics

If you have [autocapture enabled](/docs/product-analytics/autocapture), PostHog will automatically track when the extension interface is opened, closed, or clicked.

If you'd like to instrument your own custom events, use the `posthog.capture()` function:

```js
posthog.capture('custom_event_name', {})
```

See our [JavaScript web SDK docs](/docs/integrate/client/js) for more details.

## Using other PostHog products

Due to the new [content security policies](https://developer.chrome.com/docs/extensions/develop/migrate/improve-security) in Manifest v3 about unsafe-eval and remote code execution, you need to import bundles directly to use other PostHog products.

To use [session replay](/docs/session-replay), [surveys](/docs/surveys), [error tracking](/docs/error-tracking), and [web analytics](/docs/web-analytics), import their bundles directly:

```js
import "posthog-js/dist/posthog-recorder" // For session replay
import "posthog-js/dist/surveys" // For surveys
import "posthog-js/dist/exception-autocapture" // For error tracking
import "posthog-js/dist/tracing-headers" // Tracking across client and server
import "posthog-js/dist/web-vitals" // Tracking web vitals
```
