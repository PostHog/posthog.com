---
title: Content Security Policy and ingestion domains
sidebar: Docs
showTitle: true
---

# Using Content Security Policies (CSP)

> NOTE: This only applies to PostHog Cloud.

As [described on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP): _Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross-Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft, to site defacement, to malware distribution._

If you choose to use a CSP it is important to ensure that PostHog domains are permitted. PostHog is a distributed Cloud service and as such can have different domains that change over time but will always be served from the root domain `posthog.com`. As such you should add `*.posthog.com` to your CSP directive.

## Content Security Policy directives needed

Depending on how you have installed `posthog-js`, the SDK will dynamically load extra JavaScript assets as necessary. For example, [the snippet](/docs/getting-started/install?tab=snippet) is very small and just loads `array.js`. This requires the `script-src` directive.

Once loaded, the SDK will make API calls to the various endpoints for feature flags, analytics ingestion etc. This requires the `connect-src` directive. Additionally, if additional JavaScript assets are required such as the larger bundle for the Session Replay recorder, then they will be loaded via additional `<script/>` tags which in turn require the `script-src` directive.

Below is an example of a relatively restrictive CSP that limits only scripts and API calls to all posthog domains. We generally do not recommend being stricter than this as the exact subdomains may change over time as we optimize our traffic routing.

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self'; 
  script-src 'self' https://*.posthog.com; 
  connect-src 'self' https://*.posthog.com;
">
```

### Enabling the Toolbar

The [Toolbar](/docs/toolbar) is a powerful tool for configuring and loading information from PostHog directly on your website. When enabled, `posthog-js` will load additional scripts which in turn can load everything from fonts to css to images in order to render it fully. This means adding quite a few more CSP directives _or_ being less restrictive by adding `https://*.posthog.com` to the `default-src` directive.

Depending on your compliance needs you can either:
1. Add `https://*.posthog.com` to your `default-src` essentially trusting all calls to our domains.
2. Modify your CSP so that when your web app is accessed by employees (the only people that would need the Toolbar) it has the above, more open policy.
3. Add the additional directives as mentioned below to ensure that all the necessary assets can be loaded

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self'; 
  script-src 'self' https://*.posthog.com; 
  connect-src 'self' https://*.posthog.com;
  img-src 'self' https://*.posthog.com; 
  style-src 'self' https://*.posthog.com; 
  font-src https://*.posthog.com;
  media-src https://*.posthog.com;
">
```

**NOTE**: This list should be enough at the time of writing. As the PostHog application changes rapidly, it is possible that other directives may be needed over time for loading the Toolbar. If you experience issues after implementing one of the above solutions, you can typically debug in the browser tools which part of the CSP is blocking requests.

## Supporting nonce directives

You may choose to use a `nonce` in your CSP in order to ensure every script loaded has the matching `nonce` for the current page load. This can be done via config option in `posthog-js` like so:

```js
posthog.init('<ph_project_api_key>', {
  prepare_external_dependency_script = (script) => {
    script.nonce = '<your-nonce-value>'
    return script
  }
})
```

This will modify the script to be loaded before they are inserted to the DOM. Be sure to understand fully the implications of using a `nonce` and to ensure that you are using the `npm` install method or modifying the snippet to also include this nonce value.


## Domains used by PostHog clients

> WARNING: Adding more specific domains is _not_ recommended as we may change target subdomains over time. If you do specify a non-wildcard domain, we cannot guarantee that it will continue to work in the future.

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

1. Follow the instructions [here](/docs/libraries/js#advanced-option---bundle-all-required-extensions) to install `posthog-js` via npm with all bundled dependencies that you require.
2. Update your content security policy to only include the `connect-src` directive as below

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self'; 
  connect-src 'self' https://*.posthog.com;
">
```

**NOTE**: This will not work with the toolbar and generally means your initial bundled JavaScript will be much larger depending on the dependencies you are including. It also means you will need to keep your version of `posthog-js` up to date. 

### What if I use a reverse proxy?

Using a reverse proxy means you are sending data via a domain under your control. All you would have to do with your CSP in that case is ensure this domain is permitted rather than PostHog ones. 
