# PostHog — LLM Context for Stripe Projects

PostHog is an open-source product analytics and data platform. After provisioning PostHog through Stripe Projects, you have an API key to add analytics, session replay, feature flags, A/B testing, error tracking, surveys, and more to any app.

## Credentials you received

After provisioning, you received:

- **api_key** (starts with `phc_`) — Your PostHog project API key. Used to initialize PostHog SDKs. Safe to expose in frontend code.
- **api_host** — Your PostHog instance URL. Either `https://us.i.posthog.com` (US) or `https://eu.i.posthog.com` (EU).

Set these as environment variables:

```bash
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

## Recommended: use the PostHog wizard

The fastest way to integrate PostHog is the setup wizard, which auto-detects your framework and configures everything:

```bash
npx @posthog/wizard@latest
```

The wizard handles SDK installation, provider setup, and framework-specific configuration automatically.

## Manual setup by framework

If you prefer manual setup or the wizard doesn't support your framework:

### Next.js (App Router)

```bash
npm install posthog-js
```

**app/providers.tsx**:
```tsx
'use client'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
            capture_pageview: false,
            capture_pageleave: true,
        })
    }, [])

    return <PHProvider client={posthog}>{children}</PHProvider>
}
```

**app/layout.tsx**:
```tsx
import { PostHogProvider } from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <PostHogProvider>{children}</PostHogProvider>
            </body>
        </html>
    )
}
```

### Next.js (Pages Router)

```bash
npm install posthog-js
```

**pages/_app.tsx**:
```tsx
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
            capture_pageview: false,
            capture_pageleave: true,
        })
    }, [])

    return (
        <PostHogProvider client={posthog}>
            <Component {...pageProps} />
        </PostHogProvider>
    )
}
```

### React (Vite, CRA, etc.)

```bash
npm install posthog-js
```

```tsx
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST,
})

function App() {
    return (
        <PostHogProvider client={posthog}>
            {/* your app */}
        </PostHogProvider>
    )
}
```

### Python (Django, Flask, FastAPI)

```bash
pip install posthog
```

```python
import posthog

posthog.project_api_key = "phc_..."
posthog.host = "https://us.i.posthog.com"

# Capture an event
posthog.capture("user_id", "event_name", {"property": "value"})
```

### Node.js / Express

```bash
npm install posthog-node
```

```typescript
import { PostHog } from 'posthog-node'

const posthog = new PostHog(process.env.POSTHOG_KEY!, {
    host: process.env.POSTHOG_HOST,
})

// Capture an event
posthog.capture({ distinctId: 'user_id', event: 'event_name' })
```

### Other frameworks

PostHog supports 20+ frameworks including Vue, Angular, Svelte, Astro, Remix, Ruby, Go, iOS, Android, React Native, and Flutter. See https://posthog.com/docs/libraries for framework-specific guides.

## What PostHog provides

PostHog is not just analytics. After integrating, you automatically get access to:

- **Product Analytics**: Track events, build funnels, analyze retention, create dashboards.
- **Session Replay**: Watch real user sessions to debug issues. Enabled by default with `posthog-js` — no extra code needed.
- **Feature Flags**: Roll out features gradually with `posthog.isFeatureEnabled('flag-name')`. Supports server-side local evaluation for low-latency checks.
- **A/B Testing**: Run experiments using feature flags. Create experiments in the PostHog UI, use `posthog.getFeatureFlag('experiment-flag')` to render variants.
- **Error Tracking**: Capture frontend exceptions with `posthog.captureException(error)`. Auto-captures when enabled.
- **Surveys**: In-app surveys configured in the PostHog UI, rendered automatically by `posthog-js`.
- **Web Analytics**: Privacy-friendly web analytics dashboard, no extra setup needed.
- **LLM Analytics**: Track LLM API calls, token usage, and costs with integrations for OpenAI, Anthropic, LangChain, and more.
- **Data Warehouse**: Query external data sources alongside PostHog data using SQL.

## PostHog API

For server-side integrations, the PostHog API is available at your `api_host`:

- **Capture events**: `POST /capture/` with `api_key` and `event` in the body
- **Feature flags**: `POST /decide/?v=3` to evaluate flags server-side
- **Query data**: Use the HogQL API for SQL-like queries

API docs: https://posthog.com/docs/api

## Useful links

- Documentation: https://posthog.com/docs
- SDK reference: https://posthog.com/docs/libraries
- Feature flags guide: https://posthog.com/docs/feature-flags
- Session replay guide: https://posthog.com/docs/session-replay
- Dashboard: https://us.posthog.com (US) or https://eu.posthog.com (EU)
- MCP server: https://posthog.com/docs/model-context-protocol
