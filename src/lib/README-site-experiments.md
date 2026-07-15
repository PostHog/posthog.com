# Site-wide A/B experiments

Vercel edge middleware that rewrites a percentage of posthog.com traffic to an experimental deployment based on a PostHog feature flag.

**Handbook:** [/handbook/engineering/posthog-com/site-experiments](/handbook/engineering/posthog-com/site-experiments)

## Files

- `middleware.ts`: edge entry point (root of repo)
- `siteExperimentMiddleware.ts`: flag evaluation, PostHog cookie seeding, rewrite helpers

## Quick reference

| Env var | Purpose |
|---------|---------|
| `SITE_EXPERIMENT_ENABLED` | Kill switch (`true` / `false`) |
| `SITE_EXPERIMENT_DEPLOYMENT_URL` | Experimental branch Vercel URL |
| `SITE_EXPERIMENT_FLAG_KEY` | PostHog multivariate flag key |
