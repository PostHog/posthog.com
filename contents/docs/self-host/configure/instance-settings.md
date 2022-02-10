---
title: Instance settings
sidebar: Docs
showTitle: true
---

When self-hosting PostHog there are several instance settings that can be adjusted according to your needs. These settings are available as of [PostHog 1.33.0](/blog/the-posthog-array-1-33-0), if you're running an older version, settings can only be set using [Environment variables][env-vars].

Instance settings can be managed by [staff users](#staff-users) by visiting the _Instance settings_ page (`/instance/status/configuration`). Some setting configurations cannot be managed this way, and in particular, settings that determine how PostHog should behave at runtime must be set using [Environment variables][env-vars]. Please review the [Environment variables][env-vars] list for further details.


## Staff users


[env-vars]: /docs/self-host/configure/environment-variables