---
title: Content Security Policy and ingestion domains
sidebar: Docs
showTitle: true
---

# Using Content Security Policies

> NOTE: This only applies to PostHog Cloud.

As [described on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP): _Content Security Policy (CSP) is an added layer of security that helps to detect and mitigate certain types of attacks, including Cross-Site Scripting (XSS) and data injection attacks. These attacks are used for everything from data theft, to site defacement, to malware distribution._

If you choose to use a CSP it is important to ensure that PostHog domains are permitted. PostHog is a distributed Cloud service and as such can have different domains that change over time but will always be served from the root domain `posthog.com`. As such you should add `*.posthog.com` to your CSP directive.


# Domains used by PostHog clients

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
