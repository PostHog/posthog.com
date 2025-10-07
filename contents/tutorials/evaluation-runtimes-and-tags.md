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

Evaluation runtimes and evaluation tags are two complementary features that give you precise control over where and when your feature flags evaluate. While they serve different purposes, using them together creates a powerful system for managing feature flags across complex applications.

This guide explains how these features work together and shows practical examples of combining them effectively.

## Understanding the two features

### Evaluation runtime: Where flags CAN evaluate

Evaluation runtime controls whether a flag is available for client-side, server-side, or both types of evaluation:

- **`server`**: Flag only evaluates on your backend servers
- **`client`**: Flag only evaluates in browsers and mobile apps  
- **`all`**: Flag evaluates everywhere (default)

This is a security and performance feature - you might not want sensitive server flags exposed to client SDKs, or heavy client-side flags slowing down your server.

### Evaluation tags: When flags SHOULD evaluate

Evaluation tags add environment-based constraints that determine when a flag should be evaluated:

- Flags evaluate when at least one tag matches between the flag and the SDK
- If a flag has `["staging", "api"]`, it will evaluate for any SDK with "staging" OR "api"  
- Flags without evaluation tags evaluate for all requests (backward compatibility)

This helps with cost optimization, environment isolation, and better organization of your flags.

## How they work together

These features apply as sequential filters in the evaluation pipeline:

1. **Runtime filter first**: Excludes flags based on the SDK type (client vs server)
2. **Tag filter second**: Further filters based on environment context

Think of it as a two-stage security checkpoint:

- Runtime checks if you have the right type of ID (client or server)
- Tags check if at least one of your destinations matches

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

## Setting up both features

### Step 1: Configure the flag in PostHog

When creating or editing a feature flag:

1. **Set the evaluation runtime**:
   - Find the "Evaluation runtime" selector
   - Choose `server`, `client`, or `all` (the default is `all`)

2. **Add evaluation tags**:
   - Click on "Add tags" and create your tag(s)
   - Click the bolt icon ⚡ to configure evaluation constraints
   - Select which tags should act as evaluation constraints

### Step 2: Configure your SDKs

Update your SDK initialization to include evaluation environments. Here's how to set it up for different scenarios:

**Production API server (Node.js):**

```javascript
const posthog = new PostHog('YOUR_API_KEY', {
    host: 'https://app.posthog.com',
    evaluation_environments: ['production', 'api', 'backend']
})
```

**Production web app (React):**

```jsx
<PostHogProvider 
    apiKey='YOUR_API_KEY'
    options={{
        api_host: 'https://app.posthog.com',
        evaluation_environments: ['production', 'web', 'frontend']
    }}
>
    <App />
</PostHogProvider>
```

**Staging microservice (Python):**

```python
posthog = Posthog(
    'YOUR_API_KEY',
    host='https://app.posthog.com',
    evaluation_environments=['staging', 'payments-service', 'backend']
)
```

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

## Best practices

### Use runtime for security boundaries

Set runtime to `server` for flags that:

- Control access to sensitive features
- Contain business logic that shouldn't be exposed
- Manage rate limits or quotas
- Control infrastructure settings

### Use tags carefully for environment organization

- For strict environment isolation, use single tags like `["production"]` or `["staging"]`
- For precise targeting, combine terms into single tags like `["production-web"]` or `["staging-api"]`
- Remember: `["staging", "checkout"]` will match ANY staging OR ANY checkout

### Start simple, add complexity gradually

Begin with basic separations:

1. Start with runtime only (`server` vs `client`)
2. Add high-level environment tags (`production`, `staging`)
3. Gradually add more specific tags as needed

### Document your conventions

Create a tagging guide for your team:

```text
Environments: production, staging, development
Platforms: web, ios, android, api
Services: auth-service, payment-service, notification-service
Teams: growth, platform, security
```

### Monitor the impact

Track metrics after implementing both features:

- Reduction in unnecessary flag evaluations
- Improved page load times (fewer client flags)
- Reduced API traffic
- Lower costs from fewer evaluations

## Troubleshooting

### Flag not evaluating when expected

Check this sequence:

1. **Runtime compatibility**: Is the SDK type (client/server) allowed by the runtime setting?
2. **Tag matching**: Does at least one evaluation tag match the SDK's environment tags?
3. **SDK configuration**: Is `evaluation_environments` properly set in the SDK?
4. **SDK version**: Does your SDK version support evaluation environments?

### Flag evaluating when it shouldn't

1. **Check runtime setting**: Ensure it's not set to `all` if you want restrictions
2. **Verify evaluation tags**: Make sure the flag has evaluation tags configured (not just regular tags)
3. **Review SDK environments**: Confirm the SDK isn't providing unexpected environment tags

### Performance not improving

1. **Audit flag volume**: Check how many flags each environment is evaluating
2. **Review tag specificity**: More specific tags = better filtering
3. **Check runtime settings**: Ensure client-only flags aren't set to `all`

## Common pitfalls to avoid

### Forgetting SDK configuration

Setting evaluation tags in PostHog is only half the setup. Your SDKs must declare their environment:

❌ **Wrong**: Setting tags in PostHog but not configuring SDKs
✅ **Right**: Configure both PostHog flags AND SDK environments

### Misunderstanding tag logic

❌ **Wrong**: Using `["staging", "checkout"]` for staging-only checkout features
✅ **Right**: Using `["staging"]` only, or a single combined tag like `["staging-checkout"]`

### Over-tagging initially

❌ **Wrong**: Starting with 20+ specific tags before understanding needs
✅ **Right**: Start with 3-5 high-level tags, expand as needed

### Missing backward compatibility

Remember that missing `evaluation_environments` in SDK means all flags evaluate:

```javascript
// This SDK gets ALL flags (no filtering)
const posthog = new PostHog('KEY', {
    host: 'https://app.posthog.com'
    // evaluation_environments not set!
})
```

## Migration guide for existing applications

If you're adding these features to an existing PostHog setup:

### Phase 1: Audit and plan

1. List all your environments and platforms
2. Identify sensitive flags that should be server-only
3. Map which flags are used where

### Phase 2: Set runtimes first

1. Update server-only flags to runtime: `server`
2. Update client-only flags to runtime: `client`
3. Leave shared flags as `all`
4. Deploy and verify everything still works

### Phase 3: Add evaluation tags

1. Define your tag taxonomy
2. Add tags to flags in batches
3. Update SDKs one environment at a time
4. Monitor evaluation metrics

### Phase 4: Optimize

1. Review metrics after 1-2 weeks
2. Adjust tags for better filtering
3. Document patterns for your team

## Summary

Evaluation runtimes and tags work together as complementary filtering mechanisms:

- **Runtime** = Type-based security (client vs server)
- **Tags** = Environment-based organization

Use runtime for security boundaries and tags for environment organization. Together, they provide powerful, fine-grained control over your feature flags while optimizing costs and improving performance.

Start simple with basic runtime separation, add environment tags gradually, and always remember to configure both your flags in PostHog AND your SDK initialization.
