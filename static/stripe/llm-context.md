# PostHog — LLM Context for Stripe Projects

PostHog is an open-source product analytics and data platform. After provisioning PostHog through Stripe Projects, you have an API key to add analytics, session replay, feature flags, A/B testing, error tracking, surveys, and more to any app.

## Credentials you received

After provisioning, you received:

- **api_token** (starts with `phc_`) — Your PostHog project API token. Used to initialize PostHog SDKs. Safe to expose in frontend code.
- **api_host** — Your PostHog instance URL. Either `https://us.i.posthog.com` (US) or `https://eu.i.posthog.com` (EU).
- **personal_api_key** (starts with `phx_`) — A Personal API Key for authenticated API access and MCP server configuration. Keep this secret and don't expose it in frontend code.

## Install PostHog with the wizard

Run the PostHog setup wizard to automatically install and configure PostHog in your project. It auto-detects your framework and handles everything:

```bash
npx @posthog/wizard@latest
```

The wizard installs the right SDK, creates provider/config files, and sets up framework-specific configuration. It supports Next.js, React, Vue, Angular, Svelte, Astro, Remix, Django, Flask, and more.

The wizard also reads `POSTHOG_PERSONAL_API_KEY` from your environment to configure the PostHog MCP server automatically — no browser-based OAuth needed.

If the wizard doesn't support your framework, see the full list of SDKs and manual setup guides at https://posthog.com/docs/libraries.

## What PostHog provides

PostHog is not just analytics. After integrating, you automatically get access to:

- **Product Analytics**: Track events, build funnels, analyze retention, create dashboards.
- **Session Replay**: Watch real user sessions to debug issues. Enabled by default with `posthog-js` - no extra code needed.
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
