---
title: Customer comms as an engineer
sidebar: Handbook
showTitle: true
---

Got a service change you need to email customers about — an API deprecation, a new quota limit, a breaking SDK change, a migration deadline? **Loop in <SmallTeam slug="developer-marketing" />.** They own customer comms and will handle the copy and the send via PostHog Workflows.

All you need to bring:

- A rough draft of what you want to say and why
- The audience: a PostHog cohort or a list of `org_id`s

Prior art to mirror: the feature-flags quota-limit rollout in <PrivateLink url="https://github.com/PostHog/product-internal/pull/720"><code>product-internal#720</code></PrivateLink>.

For how we review, target, and categorize emails in PostHog Workflows, see the [email comms handbook page](/handbook/marketing/email-comms). For incidents specifically, see [engineering incidents](/handbook/engineering/operations/incidents) — Developer Marketing handles those comms too.

## Staying on top of what ships

If you write or coordinate customer comms, join the <PrivateLink url="https://posthog.slack.com/archives/C099B0YCULT"><code>#changelog</code></PrivateLink> internal Slack channel — it's the lowest-friction way to know what's just shipped. It's owned by the [Wizard & Docs team](/teams/wizard-and-docs) and updated constantly as PRs merge.

The channel is populated by agentic workflows that scan merged PRs and feature flag changes in `posthog/posthog` and summarize them into it. PRs that are still behind a feature flag stay out, based on the *Release status* section of the `posthog/posthog` PR template. See [how to publish changelog](/handbook/wizard-and-docs/how-to-publish-changelog) for the full flow.
