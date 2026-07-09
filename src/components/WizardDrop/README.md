# WizardDrop

A "drop"-style flow on `/wizard`: a visitor connects GitHub, picks a repository, and PostHog provisions them an account in the background, runs the setup wizard in the cloud, and opens an instrumentation pull request on their repo. The full architecture (including the monorepo side) is documented in `wizard-drop-rfc.md` at the repo root.

All server work happens in the `src/api/wizard/*` Gatsby Functions, which talk to the PostHog agentic provisioning API as a **CIMD partner** (client metadata document at `static/.well-known/wizard-drop-client.json`, PKCE auth, no secret). This component is a state machine over those functions' responses.

## Usage

```tsx
import WizardDrop from 'components/WizardDrop'

<WizardDrop />
```

It's registered as an MDX component on the `/wizard` page (`src/components/WizardPage/index.tsx` → `jsxComponentDescriptors`) and placed via `<WizardDrop />` in `contents/wizard.mdx`.

## Gating

Rendered only when the PostHog feature flag **`wizard-drop`** is enabled (fail-closed while flags load). For local dev/preview, bypass with:

```js
localStorage.setItem('wizard-drop-preview', '1')
```

## State machine

```
idle ── Connect GitHub ──▶ connecting ──(redirect)──▶ github-start → GitHub OAuth → github-callback
                                                                        │ ?drop=connected
loading ◀───────────────────────────────────────────────────────────────┘
   │ session → repos
   ├─ not connected ───────▶ idle
   ├─ installed:false ─────▶ awaiting_install (opens install URL, polls repos 5s, 5min timeout)
   └─ installed ───────────▶ ready (picker auto-skipped when exactly 1 repo)
ready ── Set up PostHog ──▶ provisioning ── POST /api/wizard/provision
   ├─ success ─────────────▶ success        (account + wizard run created)
   ├─ degraded ────────────▶ degraded       (account exists, run failed — NO signup link)
   ├─ requires_auth ───────▶ existing_user  (interstitial → PostHog login + consent →
   │                                          /api/wizard/oauth-callback → ?drop=done|degraded|error)
   └─ error(code) ─────────▶ error          (copy + actions per code, manual fallback)
```

Redirect legs land on `/wizard?drop=connected|done|degraded|error&code=…`; the component parses and strips those params on mount.

## Error handling

Mirrors the "Error handling on posthog.com" table in the RFC:

- **Restartable** (`github_denied`, `github_auth`, `grant_exchange`, `grant_expired`, `resume_expired`, `install_timeout`, `no_repos`, `fetch_failed`): specific copy + "Connect GitHub" (or inline retry for `fetch_failed`) + manual fallback.
- **Terminal, no account created** (`provisioning_failed`, `rate_limited`, `consent_denied`, `consent_failed`): manual-signup fallback is the primary action; consent variants state "No changes were made".
- **Degraded** (account exists, no PR): dedicated panel that deliberately has **no signup link** — a fresh signup with the same email would bounce into the existing-user consent path. It points to email/login + running the wizard locally instead.

`ManualFallback` builds the signup URL region-aware (like `SignupLink`); never link literal `posthog.com/signup` — it rewrites to `/pricing`.

## Env vars (server-only, read by `src/api/wizard/*` via `src/lib/wizard-drop/config.ts`)

| Var | Purpose |
|---|---|
| `WIZARD_DROP_STATE_SECRET` | HMAC key for signed cookies + OAuth state (required) |
| `WIZARD_DROP_POSTHOG_API_HOST` | Provisioning API host (default `https://us.posthog.com`) |
| `WIZARD_DROP_CLIENT_ID` | CIMD document URL, byte-for-byte |
| `WIZARD_DROP_SITE_URL` | Base for redirect URIs (prod: `https://posthog.com`) |
| `WIZARD_DROP_GITHUB_APP_CLIENT_ID` / `_SLUG` | GitHub App OAuth client id + install URL slug |
| `WIZARD_DROP_MOCK` | `1` → in-memory mock backend, skips github.com |

None are `GATSBY_`-prefixed — they must never reach the client bundle.

## Mock-mode walkthrough

```bash
WIZARD_DROP_MOCK=1 pnpm start
# in the browser console on localhost:8001/wizard:
localStorage.setItem('wizard-drop-preview', '1')
```

Magic repositories drive every scenario (state resets when the dev server restarts):

| Repository | Behavior |
|---|---|
| `mock-dev/happy-path` | Bundled provision succeeds → success panel |
| `mock-dev/wizard-fails` | Bundled block errors AND granular retry fails → degraded panel |
| `mock-dev/wizard-retry-succeeds` | Bundled block errors, granular retry succeeds → success |
| `mock-dev/existing-user` | `requires_auth` → interstitial → local consent round trip → `?drop=done` |
| `mock-dev/rate-limited` | 429 → rate-limit error panel |

Also exercisable: the first two repo polls return "not installed" (awaiting-install state), the first grant exchange simulates the one-time CIMD `202 registering` delay, `/api/wizard/repos?mock_expire=1` force-expires the grant, `/api/wizard/github-callback?error=access_denied` renders the denial error, and each `/wizard?drop=error&code=…` URL renders its copy directly.

## Contract-reconciliation checklist (when the monorepo endpoints ship)

The upstream endpoints are net-new per the RFC and all parsing lives in `src/lib/wizard-drop/provisioning.ts`. Verify against the real backend:

- [ ] `POST /api/agentic/provisioning/github/grants` request/response field names (`grant_id`, `gh_login`, `email`)
- [ ] `GET …/github/grants/{id}/repositories` shape (`installed`, `installation_id`, `repositories[].full_name`) and how grant-expiry is signaled (assumed: 404/410 or an error code containing "grant")
- [ ] `configuration.wizard` block acceptance on `account_requests` + `wizard` result on the response (`{task_id, run_id}` / `{error}`)
- [ ] Resource actions `POST …/resources/{team_id}/github_integration` and `…/wizard_runs` (envelope: flat vs `complete`)
- [ ] `available_teams[0]` is the bootstrap/consented team on the token response
- [ ] Real `202 registering` timing on first CIMD contact (retry budget: 2 × ≤5s)
- [ ] CIMD registration with the real `phvt_` verification token in `static/.well-known/wizard-drop-client.json`
- [ ] Provisioning scopes: `PROVISIONING_SCOPES` in `config.ts` must match `com.posthog.scopes` in the CIMD document
