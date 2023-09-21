---
title: Releasing a new version
sidebar: Handbook
showTitle: true
---

We have [sunsetted support for our kubernetes and helm chart managed self-hosted offering](https://posthog.com/blog/sunsetting-helm-support-posthog). This means we no longer offer support for fixing to specific versions of PostHog. A [docker image is pushed for each commit to master](https://hub.docker.com/r/posthog/posthog). Each of those versions is immediately deployed to PostHog cloud.

The [deploy-hobby script](https://github.com/PostHog/posthog/blob/master/bin/deploy-hobby) allows you to set a `POSTHOG_APP_TAG` environment variable and fix your docker-compose deployed version of PostHog.

Changes to PostHog are listed in [our changelog](https://posthog.com/changelog/2023)https://posthog.com/changelog/2023, and [in GitHub](https://github.com/PostHog/posthog/commits/master)https://github.com/PostHog/posthog/commits/master.
