---
title: Releasing a new version
sidebar: Handbook
showTitle: true
---

We have [sunsetted support for our kubernetes and helm chart managed self-hosted offering](https://posthog.com/blog/sunsetting-helm-support-posthog). This means we no longer offer support for fixing to specific versions of PostHog. A [docker image is pushed for each commit to master](https://hub.docker.com/r/posthog/posthog). Each of those versions is immediately deployed to PostHog cloud.

The [deploy-hobby script](https://github.com/PostHog/posthog/blob/master/bin/deploy-hobby) allows you to set a `POSTHOG_APP_TAG` environment variable and fix your docker-compose deployed version of PostHog. Or you can edit your docker-compose file to replace each instance of `image: posthog/posthog:$POSTHOG_APP_TAG` with a specific tag e.g. `image: posthog/posthog:9c68581779c78489cfe737cfa965b73f7fc5503c`

Changes to PostHog are listed in [our changelog](https://posthog.com/changelog), and [in GitHub](https://github.com/PostHog/posthog/commits/master).
