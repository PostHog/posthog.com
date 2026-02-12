---
title: How to use evaluation runtimes and contexts together for fine-grained flag control
date: 2025-10-07
author:
  - dylan-martin
showTitle: true
sidebar: Docs
tags:
  - feature flags
  - configuration
---

Evaluation runtimes and evaluation contexts are two complementary features that give you precise control over where and when your feature flags evaluate. This guide shows practical examples of using them together effectively.

> **Prerequisites:** First understand [evaluation contexts](/docs/feature-flags/evaluation-contexts) and [evaluation runtime](/docs/feature-flags/creating-feature-flags#evaluation-runtime) individually.

## How they work together

These features apply as sequential filters:

1. **Runtime filter first**: Excludes flags based on the SDK type (client vs server)
2. **Context filter second**: Further filters based on evaluation context

### Example filtering flow

Consider a flag with:

- Runtime: `server`
- Evaluation contexts: `["main-app", "api"]`

Here's what happens in different scenarios:

| SDK Type | Context Values | Result |
|----------|-------------------|--------|
| JavaScript Web | `["main-app", "web"]` | ❌ Blocked by runtime (client SDK can't access server flag) |
| Node.js | `["marketing-site", "backend"]` | ❌ Blocked by contexts (neither "marketing-site" nor "backend" match flag's tags) |
| Node.js | `["main-app", "api"]` | ✅ Both filters pass |
| Python | `["main-app", "backend"]` | ✅ Both filters pass ("main-app" matches) |

## Quick setup

You can configure both features when creating or editing a feature flag in PostHog:

1. Set **evaluation runtime** to `server`, `client`, or `all`
2. Add **evaluation contexts** and mark them as constraints (bolt icon ⚡)

Then configure your SDKs with matching `evaluation_contexts`. See the [evaluation contexts documentation](/docs/feature-flags/evaluation-contexts#step-2-configure-your-sdks) for SDK configuration examples.

## Common use cases

### API rate limits that shouldn't be exposed to clients

**Scenario**: You have rate limiting logic that varies by customer tier, but you don't want to expose these business rules to client-side code where competitors could inspect them.

**Configuration**:

- Runtime: `server`
- Evaluation contexts: `["api"]`

**Why both features?** Runtime ensures the flag never reaches browsers where it could be inspected. Contexts let you exclude this flag from other server contexts (like background workers) to reduce evaluation costs.

```javascript
// API service - Gets the flag
const posthog = new PostHog('KEY', {
    evaluation_contexts: ['main-app', 'api']
})

// Web browser - Never sees this flag (blocked by runtime)
// Background worker - Doesn't get the flag (no 'api' tag)
const posthog = new PostHog('KEY', {
    evaluation_contexts: ['main-app', 'workers']
})
```

### Preventing marketing site features from affecting main app

**Scenario**: You're testing a new recommendation algorithm for your marketing site, but some services are shared between your marketing site and main application.

**Configuration**:

- Runtime: `all`
- Evaluation contexts: `["marketing-site"]`

**Why both features?** You need the flag in both client and server contexts (runtime: `all`), but **only** for the marketing site. The context constraint ensures main app services never evaluate this flag, even if they share code with the marketing site.

```python
# Marketing site recommendation service - Gets the flag
posthog = Posthog('KEY', 
    evaluation_contexts=['marketing-site', 'recommendations'])

# Main app recommendation service - Doesn't get the flag
posthog = Posthog('KEY',
    evaluation_contexts=['main-app', 'recommendations'])
```

### Rolling out mobile features without affecting web

**Scenario**: You're testing a new native camera feature that only makes sense on mobile apps, and you want to ensure web users never download this flag's code.

**Configuration**:

- Runtime: `client`
- Evaluation contexts: `["mobile"]`

**Why both features?** Runtime: `client` prevents server-side services from evaluating this UI-specific flag. The `mobile` context ensures web browsers don't download or evaluate it, improving performance.

```javascript
// React Native app - Gets the flag
posthog.init('KEY', {
    evaluation_contexts: ['main-app', 'mobile']
})

// Web app - Doesn't get the flag (no 'mobile' tag)
posthog.init('KEY', {
    evaluation_contexts: ['main-app', 'web']
})

// API server - Never sees this flag (blocked by runtime)
```

### A/B testing pricing only where it matters

**Scenario**: You're testing new pricing tiers, but only want to evaluate this in your billing service and checkout UI, not in every service and client.

**Configuration**:

- Runtime: `all`
- Evaluation contexts: `["billing"]`

**Why both features?** The pricing affects both frontend (checkout UI) and backend (billing service), so runtime is `all`. But you don't want every service and client evaluating this flag thousands of times - only the specific parts that handle billing.

```javascript
// Checkout UI component - Gets the flag
const posthog = new PostHog('KEY', {
    evaluation_contexts: ['main-app', 'billing', 'web']
})

// Billing service - Gets the flag  
const posthog = new PostHog('KEY', {
    evaluation_contexts: ['main-app', 'billing', 'api']
})

// Main app dashboard - Doesn't get the flag (no 'billing' tag)
const posthog = new PostHog('KEY', {
    evaluation_contexts: ['main-app', 'dashboard', 'web']
})
```

## Best practices when combining features

### Use runtime for security boundaries

Set runtime to `server` for flags containing:

- Sensitive business logic
- Rate limits or quotas
- Infrastructure settings

### Layer contexts for precise control

Remember that evaluation contexts use OR logic: `["marketing-site", "checkout"]` matches ANY marketing-site OR ANY checkout. For AND logic, use compound tags like `["marketing-site-checkout"]`.

### Start simple

1. Set runtime first (security boundary)
2. Add basic evaluation context tags
3. Refine with specific tags as needed

## Troubleshooting combined setups

When a flag isn't working as expected, check in this order:

1. **Runtime filter**: Is the SDK type (client/server) allowed?
2. **Context filter**: Does at least one evaluation tag match?
3. **SDK config**: Is `evaluation_contexts` set?

For detailed troubleshooting steps, see the [evaluation contexts documentation](/docs/feature-flags/evaluation-contexts#troubleshooting).

## Common pitfalls

### Forgetting the two-stage filter

Runtime blocks first, then contexts. A server-only flag will never reach client SDKs, regardless of evaluation contexts.

### Missing SDK configuration

Without `evaluation_contexts` in your SDK, context filtering won't work:

```javascript
// This SDK ignores all context filtering!
const posthog = new PostHog('KEY', {
    host: 'https://app.posthog.com'
    // evaluation_contexts not set!
})
```

## Summary

- **Runtime** filters by SDK type (security boundary)
- **Contexts** filter by application context (organization)
- They work sequentially: runtime blocks first, then contexts filter

For implementation details:

- [Evaluation contexts documentation](/docs/feature-flags/evaluation-contexts)
- [Evaluation runtime](/docs/feature-flags/creating-feature-flags#evaluation-runtime)
