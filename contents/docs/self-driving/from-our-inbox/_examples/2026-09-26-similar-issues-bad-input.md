---
category: Error tracking
report:
  title: Similar issues panel returns a server error for a malformed issue id
  source: Error tracking
  body: >-
    A burst of users opening the **similar issues** panel got a 500 instead of a 400. The
    similar issues query runner passes the issue id straight into a Django ORM filter, and the
    query API only maps DRF validation errors to a 400. It is the only error tracking runner that
    skips the shared `validate_uuid_param` guard its four siblings call. A second, quieter problem
    sits in the same runner: a correct 404 for an issue with no fingerprints counts against the
    query SLO and gets captured as an error.
  suggestedAction: >-
    Add the missing UUID guard to the runner's constructor, and classify DRF `NotFound` as a user
    error so a normal 404 stops counting as downtime.
inboxExample:
  reportId: 01a0d399-8212-70a0-818c-e23007ec5718
  publishedAt: 2026-09-26
  outcome: >-
    An agent started the fix as soon as the report was rated ready. It added the guard and a
    regression test, and the PR merged about an hour and a half after the report landed.
  pullRequest:
    url: https://github.com/PostHog/posthog/pull/106004
    title: "fix(error-tracking): validate issueId in the similar issues runner"
    mergedAt: 2026-09-24
---
