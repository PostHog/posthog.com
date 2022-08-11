---
title: Upgrading PostHog
sidebar: Docs
showTitle: true
---

We want to make sure upgrading PostHog is as smooth as possible. We use a synchronous and an asynchronous migration framework to make sure database migrations are easy to be deployed, rolled back and safe to run.

Because some data migrations require touching tables that can get very large for some PostHog installation, some migrations are a little more involved. We will explicitly mention this in our changelog. We aim to minimize these types of migrations as much as possible, and their frequency will decrease.

If you need help, feel free to create an issue, or [join our Slack](/slack).

## Upgrade instructions

Find the relevant upgrade instructions in the corresponding deployment info page:
- [AWS](/docs/self-host/deploy/aws#upgrading-the-chart)
- [Azure](/docs/self-host/deploy/azure#upgrading-the-chart)
- [DigitalOcean](/docs/self-host/deploy/digital-ocean#upgrading-the-chart)
- [Google Cloud Platform](/docs/self-host/deploy/gcp#upgrading-the-chart)
- [Hobby](/docs/self-host/deploy/gcp#upgrading)
- [Other platforms](/docs/self-host/deploy/other#upgrading-the-chart)
