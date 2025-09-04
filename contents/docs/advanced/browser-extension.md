---
title: Using PostHog for browser extensions
sidebar: Docs
showTitle: true
---

Do you have a Firefox, Safari, or Chrome browser extension and want to understand how it's being used? PostHog is the perfect way to do just that.

## Setup for Chrome, Safari & Firefox extensions

import { CalloutBox } from 'components/Docs/CalloutBox'

<CalloutBox icon="IconInfo" title="Extension APIs namespace">

Browsers expose web extension APIs using different global variables, namely `browser` and/or `chrome`. There are slight [differences in implementations](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Differences_between_API_implementations) but the APIs we're using here are cross-browser compatible.

We're going to use `chrome` namespace throughout this guide due to wider support, but you can substitute it with `browser` for platforms that support it.

</CalloutBox>

Start by installing the PostHog [JavaScript web SDK](/docs/libraries/js).

import InstallWebPackageManagers from "../integrate/_snippets/install-web-package-managers.mdx"

<InstallWebPackageManagers />

<CalloutBox icon="IconInfo" title="Bundling">

Browser extensions can block your imports. If your extension throws errors when trying to import PostHog, use a bundler like [Rollup](https://rollupjs.org/) to bundle your JavaScript and import it in a single `<script type="module" src="dist/bundle.js"/>` tag.

</CalloutBox>

## Manifest v3 compatibility

Manifest v3 introduced stricter [content security policies](https://developer.chrome.com/docs/extensions/develop/migrate/improve-security) that prohibit unsafe-eval and remote code execution. To ensure your extension passes the extension store verification:

### 1. Import bundles directly.

Instead of relying on dynamic imports, import all PostHog features as static bundles:

```js
// Core PostHog (required)
import { PostHog } from 'posthog-js/dist/module.no-external'

// Additional features (import only what you need in a given context)
import 'posthog-js/dist/posthog-recorder' // For session replay
import 'posthog-js/dist/surveys' // For surveys  
import 'posthog-js/dist/exception-autocapture' // For error tracking
import 'posthog-js/dist/tracing-headers' // For tracking across client and server
import 'posthog-js/dist/web-vitals' // For web vitals tracking
```

You can also use `import 'posthog-js/dist/array.no-external.js'` as the core import to get an instantiated object instead, but if you're using TypeScript you won't get types, so we're going to use `posthog-js/dist/module.no-external` throughout this document.

### 2. Import a compatible session recording module if required

Session recording is the most common cause of extension store rejections due to potential obfuscation concerns. The recording library `rrweb` that is bundled with PostHog by default contains parts of its code encoded in base64. 

To avoid issues, explicitly load `posthog-js/dist/posthog-recorder` instead of `posthog-js/dist/recorder` as explained in [this Github comment](https://github.com/PostHog/posthog-js/issues/1464#issuecomment-2792093981).

### 3. Disable external dependency loading

Set `disable_external_dependency_loading: true` in PostHog config to avoid remote code loading.

### 4. Change persistence

Set `persistence` to one of `localStorage`, `sessionStorage`, or `memory`. See the *Persistence* section below for details.

### 5. Declare permissions and set Content Security Policy

To do this, add [PostHog domain(s) to Content Security Policy](/docs/advanced/content-security-policy) appropriately in your `manifest.json`:

```json
{
    // (…)
    "permissions": ["storage"], // for shared distinct_id, see below
    "content_security_policy": {
        "extension_pages": "script-src 'self'; object-src 'self'; connect-src 'self' https://*.posthog.com;" // example CSP
    }
}
   ```

### Example minimal configuration

Always include these settings for extension manifest v3 compatibility:

```js
// In your extension code

import { PostHog } from 'posthog-js/dist/module.no-external'

const posthog = new PostHog()

posthog.init('<ph_project_api_key>', {
    api_host: '<ph_client_api_host>',
    disable_external_dependency_loading: true,
    persistence: 'localStorage'
});
```

## Persistence in browser extensions

Browser extensions have unique constraints that affect how PostHog can store its data. Unlike regular web applications, extensions shouldn't use cookies and should use `localStorage`, `sessionStorage`, or `memory` instead.

### Supported persistence options

For browser extensions, only these persistence methods work reliably:

| Persistence | Consent requirement | Distinct ID synchronization |
| - | - | - |
| **`localStorage`** (recommended): Stores data in the extension context's isolated localStorage | Likely | Possible with bootstrapping the `distinctID` |
| **`sessionStorage`**: Stores data in the extension context's isolated sessionStorage for the current session | Likely | Possible with bootstrapping the `distinctID` |
| **`memory`**: Stores data in instance's memory only (lost when context closes) | Unlikely | Possible with bootstrapping the `distinctID` *and* retrieving from a remote |

For more details about PostHog's persistence options, see our [JavaScript persistence documentation](/docs/libraries/js/persistence).

### Why cookies aren't recommended

The default `localStorage+cookie`, and `cookie` persistence methods are problematic for extensions because extension contexts (service worker scripts, content scripts, popups, etc.) have different cookie access. They are also partitioned per origin, so, in a content script data, would always be written separately for each domain.

### Persistence and distinct ID management

Since PostHog instances in different contexts can't share the same storage for persistence, you should manage `distinct_id` values on your own to maintain continuity across contexts. See below for details.

## PostHog usage across extension contexts

Browser extensions run in multiple contexts, each with different capabilities and limitations. Here's how to use PostHog effectively across them:

### Context-specific persistence considerations

For contexts like popup, sidepanel, background, and most other, `localStorage` or `sessionStorage` is recommended since they are shared across all contexts that have access to the `chrome.storage` API. In content scripts, as they use origin's storage, there is no advantage to them over `memory` as data wouldn't be shared between different websites.

### Distinct ID synchronization

The key to tracking a user consistently across extension contexts is using a shared `distinct_id`. PostHog's `config.bootstrap?.distinctID` option combined with [browser's storage APIs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage) ensures all contexts appear as the same device in PostHog. The following example shows a possible implementation:

```js
// In a shared utility
import { v7 as uuidv7 } from 'uuid'

export async function getSharedDistinctId() {
    const stored = await chrome.storage.local.get(['posthog_distinct_id']);
    if (stored.posthog_distinct_id) {
        return stored.posthog_distinct_id;
    }
    
    // Generate new distinct ID and store it
    const distinctId = uuidv7();
    await chrome.storage.local.set({ posthog_distinct_id: distinctId });
    return distinctId;
}
```

Use the shared utility in all contexts (either directly, where storage APIs are available, or via [messaging](https://developer.chrome.com/docs/extensions/develop/concepts/messaging) with the service worker to bootstrap PostHog with the same ID:

```js
// In all extension contexts, initialize PostHog with the shared distinct_id
import { getSharedDistinctId } from './distinctId'

const distinctId = await getSharedDistinctId();
posthog.init('<ph_project_api_key>', {
    bootstrap: {
        distinctID: distinctId
    }
    api_host: '<ph_client_api_host>',
    disable_external_dependency_loading: true,
    persistence: 'localStorage'
});
```

### Content scripts

**Best for**: Page interaction tracking, session replay on 3rd-party websites

**Recommended configuration**:

```js
posthog.init('<ph_project_api_key>', {
    bootstrap: {
        distinctID: distinctId
    },
    api_host: '<ph_client_api_host>',
    disable_external_dependency_loading: true,
    capture_pageview: false,
    autocapture: true,
    persistence: 'memory',
});
```

**Important considerations**:

Unless you need to capture DOM-based events e.g. for session recordings, it's advisable to relay your custom events through a service worker using [messaging](https://developer.chrome.com/docs/extensions/develop/concepts/messaging) to avoid importing a PostHog instance potentially into every tab the user has open.

### Service workers (background scripts)

**Best for**: Background event tracking from other contexts, passing a distinct ID.

**Recommended configuration**:

```js
posthog.init('<ph_project_api_key>', {
    bootstrap: {
        distinctID: distinctId
    },
    api_host: '<ph_client_api_host>',
    persistence: 'localStorage',
    disable_external_dependency_loading: true,
    capture_pageview: false, // No DOM in service workers
    autocapture: false, // No DOM events to capture
    disable_session_recording: true, // No DOM to record
    disable_surveys: true, // No UI to display surveys
});
```

**Important considerations**:

- No DOM access (no session recording, surveys, or autocapture)
- Has access and can pass data like `distinct_id` to/from `chrome.storage`

### Popup, options, sidepanel, and other pages

**Best for**: User interaction tracking in the extension UI, surveys

**Recommended configuration**:

```js
posthog.init('<ph_project_api_key>', {
    bootstrap: {
        distinctID: distinctId
    },
    api_host: '<ph_client_api_host>',
    disable_external_dependency_loading: true,
    capture_pageview: true,
    autocapture: true,
});
```

## Using product analytics

If you have [autocapture enabled](/docs/product-analytics/autocapture), PostHog will automatically track when the extension interface is opened, closed, or clicked.

If you'd like to instrument your own custom events, use the `posthog.capture()` function:

```js
posthog.capture('custom_event_name', {})
```

See our [JavaScript web SDK docs](/docs/integrate/client/js) for more details.

## Using error tracking

The JS SDK disables exception capture from extensions by default because many customers do not want exceptions thrown by an extension running on a customer's browser to be tracked.

As an extension, you need to enable extension exception capture as part of the PostHog config options:

```js
const posthog = new PostHog()

posthog.init('<ph_project_api_key>', {
    error_tracking: {
        captureExtensionExceptions: true,
    }
});
```

See our [Error tracking docs](/docs/error-tracking) for more details on the product.

## Debugging

To debug PostHog in your extension:

```js
// Enable debug mode
posthog.debug(true);

// Check distinct ID consistency in each context
console.log('Distinct ID:', posthog.get_distinct_id());

// Verify configuration
console.log('Config:', posthog.config);
```

If you want to use the `posthog` object in the DevTools console easily, attach it to the `window` object, e.g.:

```js
const posthog = new PostHog()

posthog.init('<ph_project_api_key>', {
    api_host: '<ph_client_api_host>',
    disable_external_dependency_loading: true,
    persistence: 'localStorage',
    loaded: (posthogInstance) => {
        // Expose PostHog instance on window using a custom name to avoid potential conflicts with 3rd-party website's PostHog
        window.posthog = posthogInstance
    },
});
```

This should work in most contexts, except an [ISOLATED content script](https://developer.chrome.com/docs/extensions/reference/api/scripting#type-ExecutionWorld).
