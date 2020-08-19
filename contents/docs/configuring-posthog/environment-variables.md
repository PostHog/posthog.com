---
title: Environment Variables
sidebar: Docs
showTitle: true
---


When using PostHog, there are various environment variables you can set to configure your instance. Here's a comprehensive list of them:


<span class="table-borders">

| Variable                   | Description                           | Default Value         |
| :------------------------: | :------------------------------------ | :-------------------: |
| `DEBUG`                    | Determines if PostHog should run in DEBUG mode. DEBUG is used for testing, never in production.   | `False`
| `SECRET_KEY`               | Used by Django for cryptography. Helps secure cookies, passwords, hashes, etc. Required by PostHog | `<randomly generated secret key>`
| `SECURE_COOKIES`           | Determines if Django should use secure cookies. Insecure cookies do not work without HTTPS.       | `False` if PostHog is running in DEBUG or TEST mode. `True` otherwise
| `SITE_URL`                 | URL of your PostHog instance.                                                                     | `http://localhost:8000`
| `JS_URL`                   | URL used by Webpack for loading external resources like images and files.                         | `http://localhost:8234` if PostHog is running in DEBUG mode, unspecified otherwise. 
| `SENTRY_DSN`               | Used by Sentry to determine where to send events to. Only used in production.                      | `None`
| `DISABLE_SECURE_SSL_REDIRECT` | Disables automatic redirect from port 80 (HTTP) to port 443 (HTTPS).                           | `False`
| `IS_BEHIND_PROXY`          | Specifies if PostHog is running behind a proxy like Apache or NGINX                               | `False`
| `ASYNC_EVENT_ACTION_MAPPING`  |               | `False`



</span>