# Nuxt.js Documentation Analysis

This document summarizes the current state of PostHog's Nuxt.js documentation, explains the architectural differences between versions, and outlines what updates are needed for Nuxt 4 support.

## Current Documentation Structure

The PostHog Nuxt docs are split across three pages based on Nuxt version:

| Page | Nuxt Version | Primary SDK | URL |
|------|--------------|-------------|-----|
| Nuxt.js (main) | 3.7+ | `@posthog/nuxt` | `/docs/libraries/nuxt-js` |
| Nuxt.js (v3.0-v3.6) | 3.0-3.6 | `posthog-js` + `posthog-node` | `/docs/libraries/nuxt-js-3-6` |
| Nuxt.js (v2.16 and below) | 2.x | `posthog-js` | `/docs/libraries/nuxt-js-2` |

## Why the Docs Differ: SDK Evolution

### Nuxt 2.x (v2.16 and below)
- **SDK**: `posthog-js` only (client-side JavaScript SDK)
- **Implementation**: Manual Nuxt plugin in `plugins/posthog/index.js`
- **Architecture**: Uses Vue 2's `inject` pattern and router hooks for pageview tracking
- **Server-side**: Not addressed (Nuxt 2 had limited SSR capabilities)

### Nuxt 3.0 to 3.6
- **SDK**: `posthog-js` (client) + `posthog-node` (server)
- **Implementation**: Manual setup via:
  - Runtime config in `nuxt.config.js`
  - Custom plugin file `plugins/posthog.client.js`
  - Manual `posthog-node` initialization in server routes
- **Architecture**: Uses Nuxt 3's Composition API with `useNuxtApp()` and `defineNuxtPlugin()`
- **Server-side**: Uses `posthog-node` directly in Nitro server routes with manual initialization/shutdown

### Nuxt 3.7+ (Current recommended)
- **SDK**: `@posthog/nuxt` (official PostHog Nuxt module)
- **Implementation**: Simple module registration in `nuxt.config.ts`
- **Architecture**:
  - Module auto-initializes PostHog for both Vue (client) and Nitro (server)
  - Built-in error tracking with automatic exception capture
  - Source map configuration for stack traces
- **Server-side**: Still uses `posthog-node` import pattern in server routes, but config is provided via runtime config automatically

## Community Feedback Analysis

A user raised concerns:
> "there are no nuxt docs referring to 4.x and the nuxt docs are showing different patterns from using the 'posthog-node' and '@posthog/nuxt'"

### Assessment:
1. **Nuxt 4 not mentioned**: **Valid concern** - The docs don't mention Nuxt 4 compatibility at all
2. **Different patterns (`posthog-node` vs `@posthog/nuxt`)**: **Partially valid but explainable**
   - This is intentional versioning, not an inconsistency
   - `@posthog/nuxt` was only introduced for Nuxt 3.7+
   - Earlier versions require the manual `posthog-js` + `posthog-node` approach
   - However, the docs could better explain this transition and why both patterns exist

## Nuxt 4 Compatibility Updates Needed

### 1. Verify `@posthog/nuxt` Module Compatibility

The `@posthog/nuxt` module needs to be tested against Nuxt 4's changes:

- **New `app/` directory structure**: The module's auto-import and plugin injection needs to work with:
  - `app/plugins/` instead of `plugins/`
  - Updated path resolution

- **Shared folder**: Determine if PostHog types/utils should be available in `shared/`

- **TypeScript config changes**: Ensure the module's type augmentation works with Nuxt 4's tsconfig structure

### 2. Documentation Updates Required

#### Option A: Add Nuxt 4 as a new page
```
children: [
    { name: '4.x', url: '/docs/libraries/nuxt-js-4' },
    { name: '3.7 and above', url: '/docs/libraries/nuxt-js' },
    ...
]
```

#### Option B: Update the main page to cover both 3.7+ and 4.x
If `@posthog/nuxt` works unchanged with Nuxt 4, update the main page title/content:
- Change title scope: "Nuxt.js (v3.7+ and v4.x)"
- Add a note confirming Nuxt 4 compatibility
- Document any Nuxt 4-specific considerations (e.g., `app/` directory)

#### Option C: Combine with compatibility version guidance
Since Nuxt 4 behavior can be enabled in Nuxt 3.x via `future: { compatibilityVersion: 4 }`, document this configuration option and confirm PostHog works with it.

### 3. Specific Content Updates

#### For the main Nuxt docs page (`nuxt-js.mdx`):

1. **Add version compatibility statement**:
   ```markdown
   This guide covers Nuxt 3.7+, including Nuxt 4. The `@posthog/nuxt` module
   is compatible with Nuxt 4's new directory structure.
   ```

2. **Add Nuxt 4-specific section** (if needed):
   ```markdown
   ## Nuxt 4 Considerations

   If using Nuxt 4's default `app/` directory structure, the module works
   without additional configuration. PostHog will be available in components
   located in `app/pages/`, `app/components/`, etc.
   ```

3. **Add migration note for users on 3.0-3.6**:
   ```markdown
   > **Upgrading from Nuxt 3.0-3.6?** If you're upgrading to Nuxt 3.7+ or 4.x,
   > we recommend migrating from the manual `posthog-js` setup to the official
   > `@posthog/nuxt` module for simplified configuration and automatic error tracking.
   ```

4. **Server-side clarification**: The current docs show using `posthog-node` directly in server routes even with `@posthog/nuxt`. This should be clarified:
   ```markdown
   > **Note**: The `@posthog/nuxt` module handles client-side initialization
   > automatically. For server-side event capture in Nitro routes, you still
   > import from `posthog-node` directly, but the runtime config values are
   > automatically available.
   ```

### 4. Testing Required Before Documentation Updates

Before publishing Nuxt 4 documentation:

1. **Test `@posthog/nuxt` with Nuxt 4 stable release**
   - Verify module loads correctly
   - Test client-side capture
   - Test server-side capture in Nitro routes
   - Verify error tracking works

2. **Test with compatibility mode in Nuxt 3**
   ```ts
   export default defineNuxtConfig({
     future: { compatibilityVersion: 4 },
     modules: ['@posthog/nuxt'],
     // ...
   })
   ```

3. **Test with `app/` directory structure**
   - Create pages in `app/pages/`
   - Verify `useNuxtApp().$posthog()` works

## Testing Results: Nuxt 4 Integration

The `@posthog/nuxt` module was tested with a Nuxt 4 application. The integration was **successful**, but several documentation gaps were identified.

### Key Findings

1. **Module works with Nuxt 4** - The `@posthog/nuxt` module is compatible with Nuxt 4's `app/` directory structure and `future: { compatibilityVersion: 4 }` setting.

2. **Undocumented composables** - The module provides auto-imported composables that aren't documented:
   - `usePostHog()` - Cleaner alternative to `useNuxtApp().$posthog()`
   - `useFeatureFlagEnabled(flagKey)` - Check if a feature flag is enabled
   - `useFeatureFlagPayload(flagKey)` - Get the payload of a feature flag
   - `useFeatureFlagVariantKey(flagKey)` - Get the variant key of a feature flag

3. **Server-side documentation issues** - The current server-side example has problems:
   - Creates a new PostHog instance on every request (inefficient)
   - Uses incorrect runtime config keys (`posthogPublicKey` vs `posthog.publicKey`)
   - Missing `distinctId` in the capture call
   - No mention of flushing events

---

## Specific Documentation Recommendations

### Recommendation 1: Update Client-Side Example to Use `usePostHog()` Composable

**Current documentation:**
```vue
<script setup>
const { $posthog } = useNuxtApp()
$posthog().capture('<event_name>')
</script>
```

**Recommended update:**
```vue
<script setup>
const posthog = usePostHog()

// Check if PostHog is available (returns undefined on server)
posthog?.capture('event_name', { property: 'value' })
</script>
```

**Rationale:** The `usePostHog()` composable is auto-imported by the module and provides a cleaner API. It also returns `undefined` on the server side, which is helpful for SSR applications and avoids runtime errors.

---

### Recommendation 2: Add Feature Flag Composables Section

**Missing documentation:** The module provides several useful composables for feature flags that are not documented at all.

**Recommended addition:**
```vue
<script setup>
// Feature flags are automatically available as composables
const isNewFeatureEnabled = useFeatureFlagEnabled('new-feature')
const featurePayload = useFeatureFlagPayload('new-feature')
const variantKey = useFeatureFlagVariantKey('ab-test')
</script>

<template>
  <div v-if="isNewFeatureEnabled">
    New feature content!
    <pre>{{ featurePayload }}</pre>
  </div>
</template>
```

**Rationale:** These composables are auto-imported and extremely useful for feature flag implementations. Currently, developers have to discover these by reading the module source code or guessing they exist.

---

### Recommendation 3: Improve Server-Side Documentation

**Current documentation issues:**
1. Creates a new PostHog instance on every request (inefficient)
2. Uses incorrect runtime config key paths
3. Missing required `distinctId` in the capture call
4. No guidance on event flushing

**Current documentation:**
```js
export default defineEventHandler(async (event) => {
  const distinctId = getCookie(event, 'distinct_id')

  const { PostHog } = await import('posthog-node');
  const runtimeConfig = useRuntimeConfig()

  const posthog = new PostHog(
    runtimeConfig.public.posthogPublicKey,
    {
      host: runtimeConfig.public.posthogHost,
    }
  );

  posthog.capture('<event-name>')
})
```

**Recommended update - add a server utility pattern:**

```typescript
// server/utils/posthog.ts
import { PostHog } from 'posthog-node'

let posthogClient: PostHog | null = null

export function useServerPostHog(): PostHog {
  if (posthogClient) return posthogClient

  const runtimeConfig = useRuntimeConfig()

  posthogClient = new PostHog(
    runtimeConfig.public.posthog.publicKey,
    {
      host: runtimeConfig.public.posthog.host,
      flushAt: 1,        // Flush immediately for serverless
      flushInterval: 0,  // Disable automatic flush interval
    }
  )

  return posthogClient
}
```

**Recommended update - usage in server routes:**

```typescript
// server/api/example.ts
export default defineEventHandler((event) => {
  const posthog = useServerPostHog()

  // Get distinct ID from PostHog cookie
  const runtimeConfig = useRuntimeConfig()
  const cookieName = `ph_${runtimeConfig.public.posthog.publicKey}_posthog`
  const rawCookie = getCookie(event, cookieName)
  const distinctId = rawCookie ? JSON.parse(rawCookie)?.distinct_id : `anon_${Date.now()}`

  posthog.capture({
    distinctId,
    event: 'server_event_name',
    properties: {
      path: event.path,
      method: event.method,
    },
  })

  return { success: true }
})
```

**Rationale:**
- **Singleton pattern**: Reuses the PostHog client across requests instead of creating a new instance each time
- **Correct config keys**: Uses `runtimeConfig.public.posthog.publicKey` which matches what the module actually provides
- **Proper capture call**: Includes `distinctId` as required by `posthog-node`
- **Flush settings**: Configures immediate flushing for serverless environments where the process may terminate quickly

---

## Additional Documentation Improvements (Lower Priority)

These are additional gaps identified during testing that would improve the docs:

| Issue | Description |
|-------|-------------|
| Environment variables | Docs use hardcoded values; should show env var pattern |
| Runtime config structure | Not documented that module creates `runtimeConfig.public.posthog.*` |
| Exception auto-capture | `clientConfig.capture_exceptions` and `serverConfig.enableExceptionAutocapture` not explained |
| TypeScript troubleshooting | Should mention running `npx nuxi prepare` to regenerate types |
| Common clientConfig options | Only shows empty `clientConfig: {}` without listing useful options |

---

## Recommended Action Items

- [ ] **Priority 1**: Update client-side example to use `usePostHog()` composable
- [ ] **Priority 2**: Add feature flag composables documentation section
- [ ] **Priority 3**: Rewrite server-side documentation with singleton pattern and correct config keys
- [ ] Test `@posthog/nuxt` module against Nuxt 4 RC/stable
- [ ] Update main Nuxt docs page to explicitly state Nuxt 4 compatibility
- [ ] Add a note explaining why earlier versions use different patterns
- [ ] Clarify the relationship between `@posthog/nuxt` and `posthog-node` for server-side usage
- [ ] Consider adding a migration guide from manual setup to `@posthog/nuxt` module
- [ ] Update sidenav to reflect version coverage more clearly (e.g., "3.7+ / 4.x")
