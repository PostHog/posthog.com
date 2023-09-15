---
title: Instance settings
sidebar: Docs
showTitle: true
---

import Sunset from "../\_snippets/sunset-disclaimer.mdx"

<Sunset />

When self-hosting PostHog there are several instance settings that can be adjusted according to your needs. These settings are available as of [PostHog 1.33.0](/blog/the-posthog-array-1-33-0), if you're running an older version, settings can only be set using [Environment variables][env-vars].

Instance settings can be managed by [staff users](#staff-users) by visiting the _Instance settings_ page (`/instance/settings`). Some setting configurations cannot be managed this way, and in particular, settings that determine how PostHog should behave at runtime must be set using [Environment variables][env-vars]. Please review the [Environment variables][env-vars] list for further details.

The actual list of settings that can be updated varies depending on which version of PostHog you're running. The Instance settings page will provide a detailed list and description of all settings available.

## Updating settings

Settings can easily be updated from PostHog's user interface. When updating, settings are applied immediately and used across your entire instance. Even if you have multiple pods running PostHog, all pods will use this same configuration. The settings updated here can be for advanced users and may have adverse consequences to your instance when not managed properly. Please review any warnings or additional information carefully that comes up when updating settings.

## Staff users

Staff users are a special kind of instance-level permission that allows managing advanced instance-wide settings. A user can be a staff user regardless of their permission level to any organization(s) or project(s) in your instance. Only staff users can manage these settings.

As of PostHog 1.32.0, the first user in any instance is a staff user. This user can then add others if applicable. When possible, it is recommended to have multiple staff users to ensure your instance can always be properly maintained.

Starting with version 1.34.0, staff users can also easily manage (add/remove) other staff users via the PostHog user interface or the API. You can visit the _Instance status_ (`/instance/status/`) page and navigate to the "Staff users" tab to do this.

If you don't have any staff users (e.g. if you deployed PostHog before version 1.32.0), you can add your first staff user, by connecting to your instance (via a `web` pod), and then running the commands below.

> To connect to your pod, follow [these instructions](https://posthog.com/docs/self-host/deploy/troubleshooting#how-do-i-connect-to-the-web-servers-shell)

```bash
python manage.py shell_plus
```

Once you access the Django interactive shell,

```python
user = User.objects.get(email="email_of_the_user_to_add@example.com")
user.is_staff = True
user.save()
```

[env-vars]: /docs/self-host/configure/environment-variables
