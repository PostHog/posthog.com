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
idle ── Connect GitHub ──▶ connecting ──(redirect)──▶ github-start → GitHub OAuth → github/callback
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

Also exercisable: the first two repo polls return "not installed" (awaiting-install state), the first grant exchange simulates the one-time CIMD `202 registering` delay, `/api/wizard/repos?mock_expire=1` force-expires the grant, `/api/wizard/github/callback?error=access_denied` renders the denial error, and each `/wizard?drop=error&code=…` URL renders its copy directly.

The confirm step always shows an editable email field, defaulted from the GitHub-supplied address (empty when GitHub exposes none); the entered value is what `provision` sends to `account_requests`.

## Contract-reconciliation checklist (against the shipped monorepo endpoints)

All parsing lives in `src/lib/wizard-drop/provisioning.ts`. Reconciled against the monorepo implementation:

- [x] `POST …/github/grants` returns `{grant_id, gh_login, email, expires_in: 3600}` — email fetched server-side (`/user/emails`), `email` is `string | null` (null = GitHub has no verified email; still a usable grant). The account email is collected **inline** in the confirm step (defaulted from this value when present), so `provision` sends the entered address to `account_requests`, not the grant's copy.
- [x] `email_unavailable` is now a **502** meaning the GitHub App lacks the "Email addresses (read)" permission (PostHog-side misconfig) — handled as a **terminal** error + manual fallback (like `github_unavailable`), NOT the inline-email path. The no-verified-email case is the `email: null` success above, not this.
- [x] `GET …/github/grants/{id}/repositories` returns `{gh_login, installations: [{id, account_login, repository_selection}], repositories: [{installation_id, full_name, default_branch, private}]}` — no `installed` flag (installed iff `installations` non-empty); repos capped at 300/installation (never treated as exhaustive); each repo carries its own `installation_id`. Any 404 → restart Phase A.
- [x] `configuration.wizard` block `{grant_id, installation_id, repository, branch?}`; partial failure is **HTTP 200** with `wizard.error` alongside `oauth.code` — we branch on presence of `wizard.error`, not status.
- [x] Retry path: exchange OAuth code → `github_integration` (idempotent) → `wizard_runs`. Wizard-run budget is 2/h, 5/day (shared with the bundled path) → exactly one retry, then degraded.
- [x] `available_teams[0]` is the bootstrap/consented team on the token response.

- [x] **redirect_uri** — this repo serves `/api/wizard/github/callback` (the function lives at `src/api/wizard/github/callback.ts`), matching the slash path registered in the GitHub App console. Byte-identical across the authorize URL, the `github/grants` body, and the console.
- [x] `oauth-callback` redirect_uri — under CIMD there is **no** separate `OAuthApplication` registration; `redirect_uris` are declared in the metadata document (`static/.well-known/wizard-drop-client.json`). Nothing to register out-of-band. (The RFC's "register OAuthApplication redirect_uris" was from the pre-CIMD HMAC design.)

Still open (ops / cross-repo coordination):

- [ ] Repo-poll budget is 120/grant/rolling-hour; poll interval is 5s (≈60 calls over the 5-min timeout, within budget). A 429 mid-poll currently surfaces as `fetch_failed` and stops polling — it does not honor `Retry-After`.
- [x] **CIMD verification token** — a real `phvt_` token (created in org settings → CIMD verification tokens) is set in `com.posthog.verification_token` in the metadata document. It links the app to the PostHog org and grants a **higher provisioning rate limit** + identity trail (vs. the default `github/grants` 10/h per partner). The token is embedded in the public CIMD doc by design; PostHog stores only a hash.
- [x] **Provisioning scopes** — the drop's resource actions authorize by team-scoping + CIMD partner auth, not OAuth scopes, so no specific scope is required. We request a minimal `["organization:read", "project:read"]` (least privilege) in both `PROVISIONING_SCOPES` (`config.ts`) and `com.posthog.scopes` (CIMD doc); they must stay equal. Both are unprivileged/grantable, so CIMD registration accepts them and the token mints within the app ceiling.
