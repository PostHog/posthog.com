---
title: Customer comms as an engineer
sidebar: Handbook
showTitle: true
---

Got a service change you need to email customers about — an API deprecation, a new quota limit, a breaking SDK change, a migration deadline? **Loop in Joe.** He owns customer comms and will handle the copy and the send via Customer.io.

All you need to bring:

- A rough draft of what you want to say and why
- The audience: a PostHog cohort or a list of `org_id`s

Prior art to mirror: the feature-flags quota-limit rollout in [`product-internal#720`](https://github.com/PostHog/product-internal/pull/720).

For the underlying email infrastructure (Customer.io tags, categories, unsubscribe behavior), see the [email comms handbook page](/handbook/marketing/email-comms). For incidents specifically, see [engineering incidents](/handbook/engineering/operations/incidents) — Marketing handles those comms too.

## Staying ahead of what's about to ship

If you write or coordinate customer comms, join these two internal Slack channels — they're the lowest-friction way to know what's just shipped and what's about to land:

- [`#changelog`](https://posthog.slack.com/archives/C099B0YCULT) – what's just shipped. Owned by the [Wizard & Docs team](/teams/wizard-and-docs) and updated constantly as PRs merge.
- [`#coming-soon`](https://posthog.slack.com/archives/C0B5QBS29QU) – what's shipping soon. Owned by the [Marketing team](/teams/marketing) and posted as a daily digest.

Both channels are populated by agentic workflows that scan merged PRs and feature flag changes in `posthog/posthog` and summarize them into the channel. You can opt a PR in or out via the *Publish to changelog?* and *Alert Sales and Marketing teams?* checkboxes on the PR template, or via the `@posthog` Slack app. See [how to publish changelog](/handbook/wizard-and-docs/how-to-publish-changelog) for the full flow.
