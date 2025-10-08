---
title: How to use evaluation runtimes and tags together for fine-grained flag control
date: 2025-10-07
author:
  - posthog
showTitle: true
sidebar: Docs
tags:
  - feature flags
  - configuration
---

Evaluation runtimes and evaluation tags are two complementary features that give you precise control over where and when your feature flags evaluate. This guide shows practical examples of using them together effectively.

> **Prerequisites:** First understand [evaluation tags](/docs/feature-flags/evaluation-tags) and [evaluation runtime](/docs/feature-flags/creating-feature-flags#evaluation-runtime) individually.

## How they work together

These features apply as sequential filters:

1. **Runtime filter first**: Excludes flags based on the SDK type (client vs server)
2. **Tag filter second**: Further filters based on environment context

### Example filtering flow

Consider a flag with:

- Runtime: `server`
- Evaluation tags: `["production", "api"]`

Here's what happens in different scenarios:

| SDK Type | Environment Tags | Result |
|----------|-----------------|--------|
| JavaScript Web | `["production", "web"]` | ❌ Blocked by runtime (client SDK can't access server flag) |
| Node.js | `["staging", "backend"]` | ❌ Blocked by tags (neither "staging" nor "backend" match flag's tags) |
| Node.js | `["production", "api"]` | ✅ Both filters pass |
| Python | `["production", "backend"]` | ✅ Both filters pass ("production" matches) |

## Quick setup

Configure both features in PostHog:
1. Set **evaluation runtime** to `server`, `client`, or `all`
2. Add **evaluation tags** and mark them as constraints (bolt icon ⚡)

Then configure your SDKs with matching `evaluation_environments`. See the [evaluation tags documentation](/docs/feature-flags/evaluation-tags#step-2-configure-your-sdks) for SDK configuration examples.

## Common use cases

### API rate limits that shouldn't be exposed to clients

**Scenario**: You have rate limiting logic that varies by customer tier, but you don't want to expose these business rules to client-side code where competitors could inspect them.

**Configuration**:

- Runtime: `server`
- Evaluation tags: `["api"]`

**Why both features?** Runtime ensures the flag never reaches browsers where it could be inspected. Tags let you exclude this flag from other server contexts (like background workers) to reduce evaluation costs.

```javascript
// API service - Gets the flag
const posthog = new PostHog('KEY', {
    evaluation_environments: ['production', 'api']
})

// Web browser - Never sees this flag (blocked by runtime)
// Background worker - Doesn't get the flag (no 'api' tag)
const posthog = new PostHog('KEY', {
    evaluation_environments: ['production', 'workers']
})
```

### Preventing staging features from affecting production

**Scenario**: You're testing a new recommendation algorithm in staging, but some services are shared between staging and production environments.

**Configuration**:

- Runtime: `all`
- Evaluation tags: `["staging"]`

**Why both features?** You need the flag in both client and server contexts (runtime: `all`), but ONLY in staging. The tag ensures production services never evaluate this flag, even if they share code with staging.

```python
# Staging recommendation service - Gets the flag
posthog = Posthog('KEY', 
    evaluation_environments=['staging', 'recommendations'])

# Production recommendation service - Doesn't get the flag
posthog = Posthog('KEY',
    evaluation_environments=['production', 'recommendations'])
```

### Rolling out mobile features without affecting web

**Scenario**: You're testing a new native camera feature that only makes sense on mobile apps, and you want to ensure web users never download this flag's code.

**Configuration**:

- Runtime: `client`
- Evaluation tags: `["mobile"]`

**Why both features?** Runtime: `client` prevents server-side services from evaluating this UI-specific flag. The `mobile` tag ensures web browsers don't download or evaluate it, improving performance.

```javascript
// React Native app - Gets the flag
posthog.init('KEY', {
    evaluation_environments: ['production', 'mobile']
})

// Web app - Doesn't get the flag (no 'mobile' tag)
posthog.init('KEY', {
    evaluation_environments: ['production', 'web']
})

// API server - Never sees this flag (blocked by runtime)
```

### A/B testing pricing only where it matters

**Scenario**: You're testing new pricing tiers, but only want to evaluate this in your billing service and checkout UI, not in every service and client.

**Configuration**:

- Runtime: `all`
- Evaluation tags: `["billing"]`

**Why both features?** The pricing affects both frontend (checkout UI) and backend (billing service), so runtime is `all`. But you don't want every service and client evaluating this flag thousands of times - only the specific parts that handle billing.

```javascript
// Checkout UI component - Gets the flag
const posthog = new PostHog('KEY', {
    evaluation_environments: ['production', 'billing', 'web']
})

// Billing service - Gets the flag  
const posthog = new PostHog('KEY', {
    evaluation_environments: ['production', 'billing', 'api']
})

// Main app dashboard - Doesn't get the flag (no 'billing' tag)
const posthog = new PostHog('KEY', {
    evaluation_environments: ['production', 'dashboard', 'web']
})
```

## Best practices when combining features

### Use runtime for security boundaries

Set runtime to `server` for flags containing:
- Sensitive business logic
- Rate limits or quotas
- Infrastructure settings

### Layer tags for precise control

Remember that tags use OR logic: `["staging", "checkout"]` matches ANY staging OR ANY checkout. For AND logic, use compound tags like `["staging-checkout"]`.

### Start simple

1. Set runtime first (security boundary)
2. Add basic environment tags
3. Refine with specific tags as needed

## Troubleshooting combined setups

When a flag isn't working as expected, check in this order:

1. **Runtime filter**: Is the SDK type (client/server) allowed?
2. **Tag filter**: Does at least one tag match?
3. **SDK config**: Is `evaluation_environments` set?

For detailed troubleshooting steps, see the [evaluation tags documentation](/docs/feature-flags/evaluation-tags#troubleshooting).

## Common pitfalls

### Forgetting the two-stage filter

Runtime blocks first, then tags. A server-only flag will never reach client SDKs, regardless of tags.

### Missing SDK configuration

Without `evaluation_environments` in your SDK, tag filtering won't work:

```javascript
// This SDK ignores all tag filtering!
const posthog = new PostHog('KEY', {
    host: 'https://app.posthog.com'
    // evaluation_environments not set!
})
```

## Summary

- **Runtime** filters by SDK type (security boundary)
- **Tags** filter by environment (organization)
- They work sequentially: runtime blocks first, then tags filter

For implementation details:

- [Evaluation tags documentation](/docs/feature-flags/evaluation-tags)
- [Evaluation runtime](/docs/feature-flags/creating-feature-flags#evaluation-runtime)
