---
title: Upgrading PostHog
sidebar: Docs
showTitle: true
---

We want to make sure upgrading PostHog is as smooth as possible. We use Django's standard migrations to make sure any database migrations are atomic, easy to roll back and generally safe to run.

Because some data migrations require touching the Events table which can get very large for some instances, some migrations are a little more involved. We will explicitly mention this in the Changelog and on this page. We aim to minimise these types of migrations as much as possible, and their frequency will decrease over time. Every time, we will make sure there is a management command you can run in parallel, so you can minimise the amount of downtime to seconds.

If you need help, feel free to create an issue, or [join our Slack](/slack).


## Deployment-Specific Instructions

Follow these tutorials for upgrading PostHog if you've deployed with any of the following options:

- [Heroku](/docs/self-host/deploy/heroku#upgrading-posthog-on-heroku)
- [AWS Fargate](/docs/self-host/deploy/aws#updating-aws-fargate)
- [Docker](/docs/self-host/deploy/docker#upgrading-posthog-with-docker)
- [Linode](/docs/self-host/deploy/linode#updating-your-posthog)
- [Helm Charts](/docs/self-host/deploy/kubernetes#updating-your-posthog)

