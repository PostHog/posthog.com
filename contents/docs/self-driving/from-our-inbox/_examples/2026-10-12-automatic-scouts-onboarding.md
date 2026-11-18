---
category: Code health
report:
  title: Automatic scouts make a new project skip inbox onboarding
  source: GitHub
  body: >-
    A GitHub issue showed that opening the inbox creates an automatic maintenance scout.
    The setup checks treated that scout as proof that a person had enabled self-driving.
    Projects with only automatic scouts skipped the introduction and later lost their background scout.
  suggestedAction: >-
    Exclude automatic maintenance scouts from the frontend and backend setup checks.
    Keep them running, and test that scouts or sources enabled by a person still count as setup.
inboxExample:
  reportId: 01a120ec-3c35-7581-883f-5b946910ade1
  publishedAt: 2026-10-12
  outcome: >-
    Self-driving opened a pull request that corrected both setup checks and added regression tests.
    The pull request merged with tests for automatic scouts and setup completed by a person.
  pullRequest:
    url: https://github.com/PostHog/posthog/pull/114577
    title: "fix(signals): keep operational scouts out of set-up checks"
    mergedAt: 2026-10-12
---
