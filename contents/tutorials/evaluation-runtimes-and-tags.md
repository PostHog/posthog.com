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

- Flags only evaluate when the SDK provides matching environment tags
- At least one tag must match for the flag to be included
- Flags without evaluation tags evaluate for all requests (backward compatibility)

This helps with cost optimization, environment isolation, and better organization of your flags.

## How they work together

These features apply as sequential filters in the evaluation pipeline:

1. **Runtime filter first**: Excludes flags based on the SDK type (client vs server)
2. **Tag filter second**: Further filters based on environment context

Think of it as a two-stage security checkpoint:

- Runtime checks if you have the right type of ID (client or server)
- Tags check if you're going to the right destination (production, staging, etc.)

### Example filtering flow

Consider a flag with:

- Runtime: `server`
- Evaluation tags: `["production", "api"]`

Here's what happens in different scenarios:

| SDK Type | Environment Tags | Result |
|----------|-----------------|--------|
| JavaScript Web | `["production", "web"]` | ❌ Blocked by runtime (client SDK) |
| Node.js | `["staging", "api"]` | ❌ Blocked by tags (no "production") |
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

### 1. Sensitive server-only features with environment isolation

**Scenario**: Database migration flags that should never leak to clients and only run in specific environments.

**Configuration**:

- Runtime: `server`
- Evaluation tags: `["production", "migration-runner"]`

**Result**: Only server-side SDKs in production with the "migration-runner" tag can evaluate this flag.

```javascript
// Migration service
const posthog = new PostHog('KEY', {
    evaluation_environments: ['production', 'migration-runner']
})

// This service can evaluate the migration flag
const shouldRunMigration = await posthog.isFeatureEnabled('db-migration-v2')
```

### 2. Platform-specific client features

**Scenario**: Mobile-only features that should work differently in staging vs production.

**Configuration**:

- Runtime: `client`
- Evaluation tags: `["mobile", "ios"]`

**Production iOS app:**

```swift
// Production iOS app gets the flag
posthog.setup(apiKey: "KEY", host: "https://app.posthog.com", 
              evaluationEnvironments: ["production", "mobile", "ios"])
```

**Staging iOS app:**

```swift
// Staging iOS app doesn't get this flag (missing "production" tag)
posthog.setup(apiKey: "KEY", host: "https://app.posthog.com",
              evaluationEnvironments: ["staging", "mobile", "ios"])
```

### 3. Cross-platform features with environment control

**Scenario**: New checkout flow that needs testing across web and mobile, but only in staging.

**Configuration**:

- Runtime: `all`
- Evaluation tags: `["staging", "checkout"]`

This allows both client and server SDKs to evaluate the flag, but only in staging environments with checkout functionality.

### 4. Gradual rollout with platform separation

**Scenario**: Rolling out a feature to web first, then mobile apps.

**Initial configuration**:

- Runtime: `client`
- Evaluation tags: `["production", "web"]`

**After web validation, expand to mobile**:

- Runtime: `client`
- Evaluation tags: `["production", "web"]`, `["production", "mobile"]`

## Best practices

### 1. Use runtime for security boundaries

Set runtime to `server` for flags that:

- Control access to sensitive features
- Contain business logic that shouldn't be exposed
- Manage rate limits or quotas
- Control infrastructure settings

### 2. Use tags for environment organization

Use evaluation tags to:

- Separate staging from production
- Isolate different products or teams
- Target specific microservices
- Control rollout to different platforms

### 3. Start simple, add complexity gradually

Begin with basic separations:

1. Start with runtime only (`server` vs `client`)
2. Add high-level environment tags (`production`, `staging`)
3. Gradually add more specific tags as needed

### 4. Document your conventions

Create a tagging guide for your team:

```text
Environments: production, staging, development
Platforms: web, ios, android, api
Services: auth-service, payment-service, notification-service
Teams: growth, platform, security
```

### 5. Monitor the impact

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

### 1. Forgetting SDK configuration

Setting evaluation tags in PostHog is only half the setup. Your SDKs must declare their environment:

❌ **Wrong**: Setting tags in PostHog but not configuring SDKs
✅ **Right**: Configure both PostHog flags AND SDK environments

### 2. Conflicting settings

Avoid configurations that can never evaluate:

❌ **Wrong**: Runtime `server` with evaluation tag `mobile-app`
✅ **Right**: Runtime `client` with evaluation tag `mobile-app`

### 3. Over-tagging initially

❌ **Wrong**: Starting with 20+ specific tags before understanding needs
✅ **Right**: Start with 3-5 high-level tags, expand as needed

### 4. Missing backward compatibility

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
