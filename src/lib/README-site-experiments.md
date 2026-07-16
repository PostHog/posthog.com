# Site-wide A/B experiments

Vercel edge middleware that rewrites a percentage of posthog.com traffic to an experimental deployment based on a PostHog feature flag.

**Handbook:** [/handbook/engineering/posthog-com/site-experiments](/handbook/engineering/posthog-com/site-experiments)

## Files

- `middleware.ts`: edge entry point (root of repo)
- `siteExperimentMiddleware.ts`: flag evaluation, cookies, rewrite helpers

## Routing flow

1. QA bypass cookie/URL param (if present) → use that variant, skip PostHog
2. `ph_site_variant_route` cookie (60s TTL) → use cached variant, skip PostHog
3. Otherwise → call PostHog `/flags?v=2`, set routing cookie on response

Test variant requests rewrite to `SITE_EXPERIMENT_DEPLOYMENT_URL`. Static assets must go through middleware too — branch builds have different hashed filenames, so test users need assets from the experimental deployment, not production.

## Cookies

| Cookie | TTL | Purpose |
|--------|-----|---------|
| `ph_site_variant_route` | 60s | Routing cache; avoids ~40+ `/flags` calls per page view |
| `ph_site_variant_bypass` | 4h | QA override via `?ph_site_variant=test&ph_site_bypass=...` |
| `ph_<token>_posthog` | 90d | Seeds `distinct_id` for new visitors |

## Quick reference

| Env var | Purpose |
|---------|---------|
| `SITE_EXPERIMENT_ENABLED` | Kill switch (`true` / `false`) |
| `SITE_EXPERIMENT_DEPLOYMENT_URL` | Experimental branch Vercel URL |
| `SITE_EXPERIMENT_FLAG_KEY` | PostHog multivariate flag key |
| `SITE_EXPERIMENT_BYPASS_SECRET` | Optional secret for QA bypass URL params |
