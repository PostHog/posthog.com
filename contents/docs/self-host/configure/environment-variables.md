---
title: Environment variables
sidebar: Docs
showTitle: true
---


When using PostHog, there are various environment variables you can set to configure your instance. Below is a comprehensive list of all of them. However, for general use, you most likely do not have to worry about the vast majority of these.

Rows with a missing 'Default Value' usually default to an empty string. This is different from `None`.

Some variables here are default Django variables. This [Django Docs page](https://docs.djangoproject.com/en/2.2/ref/settings/) has more information about them.


| Variable                   | Description                           | Default Value         |
| :------------------------: | :------------------------------------ | :-------------------: |
| `SECRET_KEY`               | **❗️ Always required.** [Used by Django for cryptography](https://docs.djangoproject.com/en/2.2/ref/settings/#secret-key). Helps secure cookies, sessions, hashes, etc. Custom value required in production. | `<randomly generated secret key>`
| `SITE_URL` - should be an absolute URL and include the protocol (e.g. `https://app.posthog.com`)            | **❗️ Always required.** Principal/canonical URL of your PostHog instance. Needed for emails, webhooks and SSO to work properly. We currently do not support subpaths in this URL. | `http://localhost:8000`
| `DEBUG`                    | Determines if PostHog should run in [DEBUG mode](https://docs.djangoproject.com/en/2.2/ref/settings/#std:setting-DEBUG). You can set this to a truthy value when developing, but disable this in production!  | `False` |
| `SECURE_COOKIES`           | Determines if Django should use [secure cookies](https://docs.djangoproject.com/en/2.2/ref/settings/#session-cookie-secure). Insecure cookies do not work without HTTPS.       | `False` if PostHog is running in DEBUG or TEST mode, else `True`
| `JS_URL`                   | URL used by Webpack for loading external resources like images and files.                         | `http://localhost:8234` if PostHog is running in DEBUG mode, must be specified otherwise.
| `SENTRY_DSN`               | Used to integrate with [Sentry](https://sentry.io/welcome/) error and event tracking. Ignored when running tests.  | `None`
| `ASYNC_EVENT_ACTION_MAPPING`| If set to `False`, actions will be matched to events as they come. Otherwise, the matching will happen in batches through a periodic Celery task. Should only be toggled on by high load instances.         | `False`
| `ACTION_EVENT_MAPPING_INTERVAL_SECONDS`| Specify how often (in seconds) PostHog should run a job to match events to actions.       | `300`
| `DISABLE_SECURE_SSL_REDIRECT` | Disables automatic redirect from port 80 (HTTP) to port 443 (HTTPS).                           | `False`
| `IS_BEHIND_PROXY`          | Specifies if PostHog is running behind a proxy like Apache, NGINX  or ELB. Be sure to properly set [trusted proxies](/docs/self-host/configure/running-behind-proxy#trusted-proxies).                              | `False`
| `ALLOWED_IP_BLOCKS`        | Specifies IP blocks allowed to connect to the PostHog instance for management (events will still be allowed from anywhere). Make sure to properly [configure your proxy](/docs/self-host/configure/running-behind-proxy) if running behind a proxy.                              |  _Empty_
| `TRUSTED_PROXIES`          | Specifies the IPs of proxies that can be trusted.                                                 | `None`
| `TRUST_ALL_PROXIES`        | Determines if all proxies can be trusted.                                                         | `False`
| `ALLOWED_HOSTS`            | A list of strings representing the host/domain names that Django can serve. [More info](https://docs.djangoproject.com/en/3.1/ref/settings/#allowed-hosts).  | `*` (all)
| `STATSD_HOST`              | Host of a running StatsD daemon (e.g. 127.0.0.1)                                                  | `None`
| `STATSD_PORT`              | Port for the running StatsD daemon                                                                | `8125`
| `STATSD_PREFIX`            | Prefix to be prepended to all stats used by StatsD. Useful for distinguishing environments using the same server. | _Empty_
| `CAPTURE_INTERNAL_METRICS` | Send some internal instrumentation to your own posthog instance, exposed via `/instance/status` page. For EE only. | `False`
| `DATABASE_URL`| [Database URL](https://github.com/jacobian/dj-database-url#url-schema) pointing to your PostgreSQL instance.  | `postgres://localhost:5432/posthog` if PostHog is running in DEBUG or TEST mode, must be specified otherwise.
| `POSTHOG_DB_NAME`| Database name. | Must be specified when `DATABASE_URL` is not set.
| `POSTHOG_DB_USER`| Database user name. | `postgres` if PostHog is running in DEBUG or TEST mode. Must be specified when `DATABASE_URL` is not set.
| `POSTHOG_DB_PASSWORD`| Database password. | `""` if PostHog is running in DEBUG or TEST mode. Must be specified when `DATABASE_URL` is not set.
| `POSTHOG_POSTGRES_HOST`| Host pointing to your PostgreSQL instance. | `localhost` if PostHog is running in DEBUG or TEST mode. Must be specified when `DATABASE_URL` is not set.
| `POSTHOG_POSTGRES_PORT`| Port pointing to your PostgreSQL instance. | `5432` if PostHog is running in DEBUG or TEST mode.  Must be specified when `DATABASE_URL` is not set.
| `POSTHOG_POSTGRES_SSL_MODE`| PostgreSQL SSL mode. [More info.](https://www.postgresql.org/docs/9.1/libpq-ssl.html#LIBQ-SSL-CERTIFICATES) | `None`
| `POSTHOG_POSTGRES_CLI_SSL_CA`| Location of the SSL root certificate file for PostgreSQL. [More info.](https://www.postgresql.org/docs/current/ssl-tcp.html) | `None`
| `POSTHOG_POSTGRES_CLI_SSL_CRT`| Location of the SSL certificate file for PostgreSQL. [More info.](https://www.postgresql.org/docs/current/ssl-tcp.html) | `None`
| `POSTHOG_POSTGRES_CLI_SSL_KEY`| Location of the SSL key file for PostgreSQL. [More info.](https://www.postgresql.org/docs/current/ssl-tcp.html) | `None`
| `REDIS_URL`| [Redis URL](https://redis-py.readthedocs.io/en/stable/#redis.ConnectionPool.from_url) pointing to your Redis instance. | `redis://localhost/` if PostHog is running in DEBUG or TEST mode, must be specified otherwise.
| `EMAIL_HOST` | Please see [configuring email] for details.     | Please see [configuring email] for details.
| `EMAIL_PORT` | Please see [configuring email] for details.                                | Please see [configuring email] for details.
| `EMAIL_HOST_USER` | Please see [configuring email] for details.                                | Please see [configuring email] for details.
| `EMAIL_HOST_PASSWORD` | Please see [configuring email] for details.               | Please see [configuring email] for details.
| `EMAIL_USE_TLS` | Please see [configuring email] for details.       | Please see [configuring email] for details.
| `EMAIL_USE_TLS` | Please see [configuring email] for details.         | Please see [configuring email] for details.
| `EMAIL_DEFAULT_FROM` | Please see [configuring email] for details.| Please see [configuring email] for details.
| `EMAIL_ENABLED` | Please see [configuring email] for details.| Please see [configuring email] for details.
| `NPM_TOKEN`| [Access token for npm](https://docs.npmjs.com/about-access-tokens), used to allow installation of plugins released as a private npm package                                 | `None`
| `GITHUB_TOKEN`| GitHub personal access token, used to prevent rate limiting when using plugins and to allow installation of plugins from private repos                      | `None`
| `GITLAB_TOKEN`| GitLab personal access token, used to prevent rate limiting when using plugins and to allow installation of plugins from private repos                      | `None`
| `MULTI_ORG_ENABLED` | Allows creating multiple organizations in your instance (multi-tenancy). **Requires a premium license.** | `False`
| `SOCIAL_AUTH_GITHUB_KEY`   | GitHub key for allowing [sign up with GitHub](/docs/user-guides/sso#github).                                                      | _Empty_
| `SOCIAL_AUTH_GITHUB_SECRET`| GitHub secret for allowing [sign up with GitHub](/docs/user-guides/sso#github).                                                     | _Empty_
| `SOCIAL_AUTH_GITLAB_KEY`   | GitLab key for allowing [sign up with GitLab](/docs/user-guides/sso#gitlab).                                                        | _Empty_
| `SOCIAL_AUTH_GITLAB_SECRET`| GitLab secret for allowing [sign up with GitLab](/docs/user-guides/sso#gitlab).                                                     | _Empty_
| `SOCIAL_AUTH_GITLAB_API_URL`| Endpoint to be used for [GitLab authentication](/docs/user-guides/sso#gitlab). Changing this is only relevant for self-host GitLab users.  | `https://gitlab.com`
| `SOCIAL_AUTH_GOOGLE_OAUTH2_KEY`   | Google client ID for allowing [SSO with Google](/docs/user-guides/sso#google).                                                      | _Empty_
| `SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET`| Google client secret for allowing [SSO with Google](/docs/user-guides/sso#google).| _Empty_
| `SAML_AVAILABLE`| Whether SAML dependencies should be installed. See [SAML authentication](/docs/user-guides/sso#saml).| `True` if running with Docker, `False` otherwise
| `SAML_ENTITY_ID`| Entity ID from your SAML IdP. See [SAML authentication](/docs/user-guides/sso#saml).| _Empty_
| `SAML_ACS_URL`| Assertion Consumer Service URL from your SAML IdP. See [SAML authentication](/docs/user-guides/sso#saml).| _Empty_
| `SAML_X509_CERT`| Public X509 certificate from your SAML IdP to validate SAML assertions. See [SAML authentication](/docs/user-guides/sso#saml).| _Empty_
| `SAML_ATTR_PERMANENT_ID`| Name of attribute that contains the permanent ID of the user in SAML assertions. See [SAML authentication](/docs/user-guides/sso#saml).| `name_id`
| `SAML_ATTR_FIRST_NAME`| Name of attribute that contains the first name of the user in SAML assertions. See [SAML authentication](/docs/user-guides/sso#saml).| `first_name`
| `SAML_ATTR_LAST_NAME`| Name of attribute that contains the last name of the user in SAML assertions. See [SAML authentication](/docs/user-guides/sso#saml).| `last_name`
| `SAML_ATTR_EMAIL`| Name of attribute that contains the email of the user in SAML assertions. See [SAML authentication](/docs/user-guides/sso#saml).| `email`
| `SAML_ENFORCED`| Whether password-based login is disabled and users automatically redirected to SAML login. Requires SAML to be properly configured. See [SAML authentication](/docs/user-guides/sso#saml).| `False`


[configuring email]: /docs/self-host/configure/email#general-configuration