---
title: Securing PostHog
sidebar: Docs
showTitle: true
---

## Restrict Access by IP

You can restrict access to PostHog by IP by passing `ALLOWED_IP_BLOCKS`. This is a comma separated list, and can either be individual IP addresses or subnets. For example:

```bash
ALLOWED_IP_BLOCKS=192.168.0.0/31,127.0.0.0/25,128.0.0.1
```

If you try to access your PostHog instance with a different IP, you will get an error message.

This restriction does not apply to the endpoints used to send events, like `batch`, `capture` etc.

If you're behind a proxy, you need to either set trusted proxies
```bash
TRUSTED_PROXIES=ip1,ip2
```

Or you can implicitly trust all proxies:

```bash
TRUST_ALL_PROXIES=True
```

> When using `TRUST_ALL_PROXIES`, make sure your proxy (like NGINX) is setting the header `X-Forwarded-For`, like in the example above. If not, it would still be possible to spoof your IP address.

> If you're on Heroku, you are behind a proxy by default, so you'll need to add `IS_BEHIND_PROXY=True`. Heroku automatically overrides `X-Forwarded-For`, so you can use `TRUST_ALL_PROXIES=True`.

## Secure Cookies

Starting with PostHog 1.13.0, we introduced a `SECURE_COOKIES` flag. This defaults to "False" when PostHog is running on `localhost` and "True" in production.

**For security reasons, you should always have this set to "True" in production.** However, in some cases, such as while testing your setup, you may need to toggle this flag off. In that case, you can explicitly set `SECURE_COOKIES=False` as an environment variable. But always remember, live data should never be transferred if this flag is off!


## Secret Key

Secret keys are used to encrypt cookies and password reset emails, [among other things](https://docs.djangoproject.com/en/3.0/ref/settings/#secret-key). To generate a secret key, run:

```bash
openssl rand -hex 32
```

### Secret Key with Docker Compose

When using Docker Compose, you will need to manually update the `docker-compose.yml` file with a secret key that is unique to your instance.

**⚠️ Note: Do not use our placeholder key! Read more about the importance of this key [here](/docs/deploymentsecuring-posthog).**

#### Step-By-Step

First, run: `openssl rand -hex 32`. This will generate a new key for you. You'll need this in the next step.

Then, open the `docker-compose.yml` file with the command: `nano docker-compose.yml`

Lastly, substitute `"<randomly generated secret key>"` for the key you got from the key generation command.

This means the `SECRET_KEY: "<randomly generated secret key>"` line will end up looking something like this (with your key,of course):
```
SECRET_KEY: "cd8a182315defa70d995452d9258908ef502da512f52c20eeaa7951d0bb96e75"
```