# PostHog

PostHog is an open-source platform for product analytics, session replay, feature flags, experiments, surveys, and data warehousing.

PostHog runs in two cloud regions. Each region is its own authorization server, so use the endpoints of the region the user's data lives in:

| | US | EU |
|---|---|---|
| Authorization server metadata | `https://us.posthog.com/.well-known/oauth-authorization-server` | `https://eu.posthog.com/.well-known/oauth-authorization-server` |
| Protected resource metadata | `https://us.posthog.com/.well-known/oauth-protected-resource` | `https://eu.posthog.com/.well-known/oauth-protected-resource` |
| Token endpoint | `https://us.posthog.com/oauth/token/` | `https://eu.posthog.com/oauth/token/` |
| Authorization endpoint | `https://us.posthog.com/oauth/authorize/` | `https://eu.posthog.com/oauth/authorize/` |

The metadata documents are the source of truth for endpoints and supported flows. If you reached this file from an authorization server's `agent_auth.skill`, use the endpoints that server's metadata lists.

## Creating an account

- Wizard: `npx @posthog/wizard@latest` sets PostHog up in a project. The setup agent opens PostHog's login page in the browser, where a new user can create an account. See https://posthog.com/docs/ai-engineering/ai-wizard
- Provisioning API: partners and platforms can create accounts for their users and deep-link them in. See https://posthog.com/docs/integrate/provisioning

## Authenticating an existing user

- OAuth 2.0: standard authorization-code flow for an app acting on behalf of a user. See https://posthog.com/docs/api/oauth
- Personal API keys: long-lived keys for scripts and server-to-server use. See https://posthog.com/docs/api/personal-api-keys

## Agent registration via ID-JAG (Scale and Enterprise)

Available to organizations on the Scale or Enterprise platform add-on that have XAA configured. It only works once an organization admin sets up XAA, so most clients should use one of the options above. With it configured, an agent presents an [ID-JAG](https://xaa.dev) identity assertion (`identity_assertion`) to the region's token endpoint using the JWT-bearer grant (`urn:ietf:params:oauth:grant-type:jwt-bearer`) and receives a scoped, short-lived OAuth access token bound to the user. The agent must also authenticate as a registered client, with a client secret or `private_key_jwt`, and the ID-JAG's `client_id` must name that client. See https://posthog.com/docs/settings/authentication/id-jag

- Identity endpoint: the region's token endpoint, listed as `agent_auth.identity_endpoint` in its authorization server metadata
- Assertion type: `urn:ietf:params:oauth:token-type:id-jag`

The user-claimed device flow (`service_auth`, `anonymous`) is not supported yet.

## Scopes

The protected resource metadata lists every scope a client can request in `scopes_supported`. https://posthog.com/docs/api/scopes describes what each scope grants.

## Changing scopes

Access tokens carry the scope set granted when they were issued.
Scopes do not change on refresh. Refreshing a token returns the same or narrower scopes, never more.

If your app needs additional scopes, for example a newly required scope, or a request that returns `403` because the token is missing a required scope, start a new authorization at the region's authorization endpoint.
The user re-consents and the new token carries the updated scopes.
PostHog does not push new scopes to existing tokens. The client must re-authorize.

## Links

- Pricing: https://posthog.com/pricing
- Terms: https://posthog.com/terms
- Privacy: https://posthog.com/privacy
- API docs: https://posthog.com/docs/api
- Agent discovery: https://posthog.com/docs/settings/agent-discovery
- Contact: hey@posthog.com
