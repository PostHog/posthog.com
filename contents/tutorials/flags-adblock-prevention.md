---
title: How to prevent feature flags from being blocked
sidebar: Docs
showTitle: true
date: 2025-11-03
author:
  - dustin-byrne
tags:
  - feature flags
  - configuration
---

Ad blockers can occasionally interfere with feature flag functionality by blocking requests to PostHog. This guide explains what steps you can take to ensure your feature flags are not affected.

## How you can prevent blocking

The most effective approach is to [set up a reverse proxy](/docs/advanced/proxy) that routes all PostHog requests (both analytics and feature flags) through your own domain. This significantly reduces the risk of ad blockers interfering with your feature flags, since requests appear to come from your own domain rather than a third-party analytics service.

This approach is useful whether you're proactively protecting critical feature flags or responding to blocking issues.

### Using a dedicated feature flag reverse proxy

In rare cases where your own reverse proxy has been added to a block list, you can add an additional layer of protection by routing feature flag requests to a completely separate endpoint from your analytics traffic.

The PostHog browser client supports a `flags_api_host` configuration option for this purpose.

**Important**: You must [set up your own reverse proxies](/docs/advanced/proxy) to use this feature. PostHog Cloud does not currently provide separate hosted domains. Both `api_host` and `flags_api_host` must point to proxies you configure on your own domain(s).

Separating feature flag requests from analytics provides several benefits:

- **Logical distinction**: Feature flags control application behavior, while analytics tracks user actions. Routing them separately reflects their different purposes.
- **Reduced blocking risk**: If your general reverse proxy is blocked, feature flag requests routed through a dedicated proxy can continue working independently.
- **Independent control**: You can apply different routing strategies, caching rules, or monitoring to each type of request.

### Configuration

First, [set up reverse proxies](/docs/advanced/proxy) for PostHog. You have two options:
- **Two separate subdomains**: Set up `posthog.yourdomain.com` and `flags.yourdomain.com`, each proxying to PostHog Cloud
- **Single subdomain with path-based routing**: Use different paths on the same subdomain to route requests

Then configure the PostHog client to use your proxies:

```js
posthog.init('<ph_project_api_key>', {
    api_host: 'https://posthog.yourdomain.com',     // Proxy for events and recordings
    flags_api_host: 'https://flags.yourdomain.com', // Proxy for feature flags only
    ui_host: 'https://us.posthog.com',              // PostHog dashboard URL (for viewing data in the UI)
})
```

With this configuration:
- All feature flag evaluation requests (to the `/flags` endpoint) use `flags_api_host`
- All other requests (events, session recordings, etc.) use `api_host`
- Both proxies forward their requests to PostHog Cloud

### Verifying your setup

After configuration, check your browser's network tab to confirm requests are routing correctly:

1. Feature flag requests should go to `flags.yourdomain.com/flags`
2. Event requests should go to `posthog.yourdomain.com/i/v0/e` or `/batch`

If flags aren't being routed to the correct endpoint, double check your client initialization to make sure `flags_api_host` is being set properly.

## Related resources

- [Deploying a reverse proxy](/docs/advanced/proxy)
- [Feature flag troubleshooting](/docs/feature-flags/common-questions#3-an-ad-blocker-may-be-blocking-calls)
- [JavaScript configuration options](/docs/libraries/js/config)
