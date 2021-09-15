---
title: Upgrading PostHog
sidebar: Docs
showTitle: true
---

We want to make sure upgrading PostHog is as smooth as possible. We use Django's standard migrations to make sure any database migrations are atomic, easy to roll back and generally safe to run.

Because some data migrations require touching the Events table which can get very large for some instances, some migrations are a little more involved. We will explicitly mention this in the Changelog. We aim to minimize these types of migrations as much as possible, and their frequency will decrease over time. Every time, we will make sure there is a management command you can run in parallel, so you can minimise the amount of downtime to seconds.

If you need help, feel free to create an issue, or [join our Slack](/slack).

## Upgrade instructions

Find the relevant upgrade instructions in the corresponding deployment info page:
- [DigitalOcean](/docs/self-host/deploy/digital-ocean#upgrading-the-chart)
- [Google Cloud Platform](/docs/self-host/deploy/gcp#upgrading-the-chart)
- [AWS](/docs/self-host/deploy/aws#upgrading-the-chart)
- [Using Helm chart](/docs/self-host/deploy/other#upgrading-the-chart)

We recommend for all new installs to use PostHog backed by ClickHouse. In case you are running PostHog backed by Postgres you can find the upgrade instructions [here](https://github.com/PostHog/posthog.com/tree/ee01390744dffdb32f2f78b49572c606becb03b9/contents/docs/self-host/deploy).

