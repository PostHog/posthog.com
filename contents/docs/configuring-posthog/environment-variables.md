---
title: Environment Variables
sidebar: Docs
showTitle: true
---


When using PostHog, there are various environment variables you can set to configure your instance. Below is a comprehensive list of all of them. However, for general use, you most likely do not have to worry about the vast majority of these.

Rows with a missing 'Default Value' usually default to an empty string. This is different from `None`.

Some variables here are default Django variables. This [Django Docs page](https://docs.djangoproject.com/en/2.2/ref/settings/) has more information about them.

<span class="table-borders">

| Variable                   | Description                           | Default Value         |
| :------------------------: | :------------------------------------ | :-------------------: |
| `DEBUG`                    | Determines if PostHog should run in [DEBUG mode](https://docs.djangoproject.com/en/2.2/ref/settings/#std:setting-DEBUG). You can set this to a truthy value when developing, but disable this in production!  | `False`
| `SECRET_KEY`               | [Used by Django for cryptography](https://docs.djangoproject.com/en/2.2/ref/settings/#secret-key). Helps secure cookies, sessions, hashes, etc. Custom value required in production. | `<randomly generated secret key>`
| `SECURE_COOKIES`           | Determines if Django should use [secure cookies](https://docs.djangoproject.com/en/2.2/ref/settings/#session-cookie-secure). Insecure cookies do not work without HTTPS.       | `False` if PostHog is running in DEBUG or TEST mode, else `True`
| `SITE_URL`                 | URL of your PostHog instance.                                                                     | `http://localhost:8000`
| `JS_URL`                   | URL used by Webpack for loading external resources like images and files.                         | `http://localhost:8234` if PostHog is running in DEBUG mode, must be specified otherwise.
| `SENTRY_DSN`               | Used to integrate with [Sentry](https://sentry.io/welcome/) error and event tracking. Ignored when running tests.  | `None`
| `ASYNC_EVENT_ACTION_MAPPING`| If set to `False`, actions will be matched to events as they come. Otherwise, the matching will happen in batches through a periodic Celery task. Should only be toggled on by high load instances.         | `False`
| `DISABLE_SECURE_SSL_REDIRECT` | Disables automatic redirect from port 80 (HTTP) to port 443 (HTTPS).                           | `False`
| `IS_BEHIND_PROXY`          | Specifies if PostHog is running behind a proxy like Apache or NGINX.                              | `False`
| `ALLOWED_IP_BLOCKS`        | Specifies IP blocks allowed to connect to the PostHog instance.                                  |  
| `TRUSTED_PROXIES`          | Specifies the IPs of proxies that can be trusted.                                                 | `False`
| `TRUST_ALL_PROXIES`        | Determines if all proxies can be trusted.                                                         | `False`
| `ALLOWED_HOSTS`            | A list of strings representing the host/domain names that Django can serve. [More info.](https://docs.djangoproject.com/en/2.2/ref/settings/)  | `*`
| `STATSD_HOST`              | Host of a running StatsD daemon (e.g. 127.0.0.1)                                                  | `None`
| `STATSD_PORT`              | Port for the running StatsD daemon                                                                | `8125`
| `STATSD_PREFIX`            | Prefix to be prepended to all stats used by StatsD. Useful for distinguishing environments using the same server. | `None`
| `SOCIAL_AUTH_GITHUB_KEY`   | GitHub key for allowing [sign up with GitHub](/docs/features/log-in-with-github-gitlab).                                                      | 
| `SOCIAL_AUTH_GITHUB_SECRET`| GitHub secret for allowing [sign up with GitHub](/docs/features/log-in-with-github-gitlab).                                                     | 
| `SOCIAL_AUTH_GITLAB_KEY`   | GitLab key for allowing [sign up with GitLab](/docs/features/log-in-with-github-gitlab).                                                        | 
| `SOCIAL_AUTH_GITLAB_SECRET`| GitLab secret for allowing [sign up with GitLab](/docs/features/log-in-with-github-gitlab).                                                     | 
| `SOCIAL_AUTH_GITLAB_API_URL`| Endpoint to be used for GitLab authentication. Changing this is only relevant for self-host GitLab users.  | `https://gitlab.com`
| `DATABASE_URL`| [Database URL](https://github.com/jacobian/dj-database-url#url-schema) pointing to your PostgreSQL instance.  | `postgres://localhost:5432/posthog` if PostHog is running in DEBUG or TEST mode, must be specified otherwise.
| `REDIS_URL`| [Redis URL](https://redis-py.readthedocs.io/en/stable/#redis.ConnectionPool.from_url) pointing to your Redis instance. | `redis://localhost/` if PostHog is running in DEBUG or TEST mode, must be specified otherwise.
| `EMAIL_HOST` | Used for configuring SMTP. Host of your email server.                                                           | `None`
| `EMAIL_PORT` | Used for configuring SMTP. Port used by your email server in the specified host.                                | `None`
| `EMAIL_HOST_USER` | Used for configuring SMTP. Username used by the email server.                                              | `None`
| `EMAIL_HOST_PASSWORD` | Used for configuring SMTP. Password for the specified username used by the email server.               | `None`
| `EMAIL_USE_TLS` | Used for configuring SMTP. Determines if TLS should be used for the email service. It is recommended that either this or `EMAIL_USE_SSL` be set to `True`.          | `False`
| `EMAIL_USE_TLS` | Used for configuring SMTP. Determines if SSL should be used for the email service. It is recommended that either this or `EMAIL_USE_TLS` be set to `True`.          | `False`
| `DEFAULT_FROM_EMAIL` | Determines the email address that should be used to send emails.                                        | `tim@posthog.com`







</span>
