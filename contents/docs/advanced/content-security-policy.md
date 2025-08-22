---
title: Content Security Policy and ingestion domains
sidebar: Docs
showTitle: true
---

import { CalloutBox } from 'components/Docs/CalloutBox'

Modern browsers enforce [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) to protect against cross-site scripting (XSS) and data injection attacks. 

Some PostHog features such as the [Toolbar](/docs/toolbar) and [heatmaps](/docs/toolbar/heatmaps) require the browser to load content from PostHog domains. These require specific CSP configuration on your apps to work.

## Content Security Policy directives needed

Depending on how you have installed `posthog-js`, the SDK will dynamically load extra JavaScript assets as necessary. For example, [the snippet](/docs/getting-started/install?tab=snippet) is very small and just loads `array.js`. This requires the `script-src` directive.

Once loaded, the SDK will make API calls to the various endpoints for feature flags, analytics ingestion etc. This requires the `connect-src` directive. If additional JavaScript assets are required such as the larger bundle for the session replay recorder, then they will be loaded via additional `<script/>` tags which in turn require the `script-src` directive.

### Basic CSP for scripts and API calls

Below is an example of a relatively restrictive CSP that limits only scripts and API calls to PostHog in your specific region. We generally do not recommend being stricter than this as the exact subdomains may change over time as we optimize our traffic routing.

<MultiLanguage>

```html file=us.posthog.com
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self'; 
  script-src 'self' https://us.posthog.com; 
  connect-src 'self' https://us.posthog.com;
  worker-src 'self' blob: data:;
">
```

```html file=eu.posthog.com
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self'; 
  script-src 'self' https://eu.posthog.com; 
  connect-src 'self' https://eu.posthog.com;
  worker-src 'self' blob: data:;
">
```
</MultiLanguage>

### Enabling the toolbar

The [toolbar](/docs/toolbar) is a powerful tool for configuring and loading information from PostHog directly on your website. When enabled, `posthog-js` will load additional scripts which in turn can load everything from fonts to css to images in order to render it fully. This means adding quite a few more CSP directives _or_ being less restrictive by adding `https://us.posthog.com` or `https://eu.posthog.com` to the `default-src` directive.

Depending on your compliance needs you can either:
1. Add `https://us.posthog.com` or `https://eu.posthog.com` to your `default-src` essentially trusting all calls to our domains.
2. Modify your CSP so that when your web app is accessed by employees (the only people that would need the toolbar) it has the above, more open policy.
3. Add the additional directives as mentioned below to ensure that all the necessary assets can be loaded

<MultiLanguage>

```html file=us.posthog.com
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self'; 
  script-src 'self' https://us.posthog.com; 
  connect-src 'self' https://us.posthog.com;
  worker-src 'self' blob: data:;
  img-src 'self' https://us.posthog.com; 
  style-src 'self' https://us.posthog.com; 
  font-src https://us.posthog.com;
  media-src https://us.posthog.com;
">
```

```html file=eu.posthog.com
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self'; 
  script-src 'self' https://eu.posthog.com; 
  connect-src 'self' https://eu.posthog.com;
  worker-src 'self' blob: data:;
  img-src 'self' https://eu.posthog.com; 
  style-src 'self' https://eu.posthog.com; 
  font-src https://eu.posthog.com;
  media-src https://eu.posthog.com;
">
```

</MultiLanguage>

<CalloutBox icon="IconInfo" title="Note" type="fyi">

This list should be enough at the time of writing. As PostHog and browser CSP rules change rapidly, it is possible that other directives may be needed over time for loading the toolbar. If you experience issues after implementing one of the above solutions, you can typically debug in the browser tools which part of the CSP is blocking requests.

</CalloutBox>

### Enabling heatmaps

Heatmaps use an `<iframe>` to render your site when viewing in PostHog. This requires the `frame-ancestors` directive.

<MultiLanguage>

```html file=us.posthog.com
<meta http-equiv="Content-Security-Policy" content="
  frame-ancestors 'self' https://us.posthog.com;
">
```

```html file=eu.posthog.com
<meta http-equiv="Content-Security-Policy" content="
  frame-ancestors 'self' https://eu.posthog.com;
">
```

</MultiLanguage>

## Supporting nonce directives

You may choose to use a `nonce` in your CSP in order to ensure every script/style loaded has the matching `nonce` for the current page load. This can be done via two config options in `posthog-js` like so:

```js
posthog.init('<ph_project_api_key>', {
  prepare_external_dependency_script: (script) => {
    script.nonce = '<your-nonce-value>'
    return script
  },
  prepare_external_dependency_stylesheet: (stylesheet) => {
    stylesheet.nonce = '<your-nonce-value>'
    return stylesheet
  }
})
```

This will modify the script/stylesheet to be loaded before they are inserted to the DOM. Be sure to understand fully the implications of using a `nonce` and to ensure that you are using the `npm` install method or modifying the snippet to also include this nonce value.

Make sure you return the script/stylesheet or else we won't append it to the DOM.

## Domains used by PostHog SDKs

<CalloutBox icon="IconWarning" title="Specific domains" type="warning">

Adding more specific domains is _not_ recommended as we may change target subdomains over time. If you do specify a non-wildcard domain, we cannot guarantee that it will continue to work in the future.

</CalloutBox>

Our client SDKs (where appropriate) will take care of selecting the correct domain. **Typically you do not need to be aware of these domains**. For example when you specify `api_host: "https://app.posthog.com"` the SDK will recognize this as a US configuration and make the correct calls to `us.i.posthog.com` or `us-assets.i.posthog.com` accordingly.

|Domain|Usage|
|----|----|
| `us.i.posthog.com` | US ingestion endpoint for client SDK API calls |
| `us-assets.i.posthog.com` | US CDN for client SDK assets (such as `array.js`) |
| `eu.i.posthog.com` | EU ingestion endpoint for client SDK API calls |
| `eu-assets.i.posthog.com` | EU CDN for client SDK assets (such as `array.js`) |
| `eu.posthog.com` | EU PostHog app domain (used by the Toolbar) and also legacy ingestion  |
| `us.posthog.com` | US PostHog app domain (used by the Toolbar) |
| `app.posthog.com` | Legacy ingestion endpoint |


## Troubleshooting / FAQ

### What is the absolute bare minimum CSP I could have?

If you really want to have a restrictive CSP with the absolute bare minimum changes, you can bundle all required `posthog-js` dependencies as part of your own application JavaScript, ensuring there is no need to load extra scripts at runtime.

1. Follow the instructions to **bundle all required extensions** when [installing PostHog via a package manager](/docs/libraries/js#option-2-install-via-package-manager) or [install the snippet](/docs/libraries/js#option-1-install-via-snippet).
2. Update your content security policy to only include the `connect-src` directive as below

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self'; 
  connect-src 'self' https://*.posthog.com;
">
```

**Note**: This will not work with the toolbar and generally means your initial bundled JavaScript will be much larger depending on the dependencies you are including. It also means you will need to keep your version of `posthog-js` up to date. 

### What if I use a reverse proxy?

Using a reverse proxy means you are sending data via a domain under your control. All you would have to do with your CSP in that case is ensure this domain is permitted rather than PostHog ones. 
