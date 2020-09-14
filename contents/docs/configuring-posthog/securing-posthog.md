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

If you're behind a proxy, you need to either set trusted proxies:
```bash
TRUSTED_PROXIES=ip1,ip2
```
Or you can implicitly trust all proxies:

```bash
TRUST_ALL_PROXIES=True
```

> When using `TRUST_ALL_PROXIES`, make sure your proxy (like NGINX) is setting the header `X-Forwarded-For` like in the example above. If not, it would still be possible to spoof your IP address.

> If you're on Heroku, you are behind a proxy by default, so you'll need to add `IS_BEHIND_PROXY=True`. Heroku automatically overrides `X-Forwarded-For`, so you can use `TRUST_ALL_PROXIES=True`.

## Secure Cookies

Starting with PostHog 1.13.0, we introduced a `SECURE_COOKIES` flag. This defaults to "False" when PostHog is running on `DEBUG` or `TEST` mode (generally the case when running locally) and "True" in production (when those modes are not on).

While this defaults to "True" in environments that are not `TEST` or `DEBUG`, you may need to toggle this off for setup or testing purposes in a production instance. However, remember that **secure cookies should always be on when handling live data (i.e. in production).** This flag affects cookies used in Django sessions, CSRF tokens, and Toolbar login. In short, it ensures the security of your PostHog instance, hence it is so important.

As noted multiple times throughout our Docs, PostHog **should always run on HTTPS** (i.e. using TLS/SSL). Thus, if you are running on HTTPS (as you should) and `SECURE_COOKIES` is set to "False", browsers will likely throw warnings about cookies and you might have trouble logging in on some newer versions of Chrome, for example. Additionally, the toolbar login cookie will not work and you will be vulnerable to Man In the Middle (MITM) attacks when you accidentally open your app using HTTP and not HTTPS.

Furthermore, if this flag is set to "True" and you are not running on HTTPS, you will not be able to log in to PostHog, since secure cookies are discarded in an unsafe environment.

For most users, toggling this flag will not be necessary, as PostHog handles most cases appropriately for you. However, if you need to set it manually, you can explicitly set `SECURE_COOKIES=False` or `SECURE_COOKIES=True` as an environment variable. The main use case for this is testing, where you may need secure cookies off while setting up a production environment, or you might want them on when developing locally with HTTPS. 

For more information on Django security features, you can check out [Django's Official Docs](https://docs.djangoproject.com/en/3.1/topics/security/), which discuss secure cookies. 

## Secret Key

**Important: PostHog will not work if you do not set your own unique `SECRET_KEY`.**

Secret keys are used to encrypt cookies and password reset emails, [among other things](https://docs.djangoproject.com/en/3.0/ref/settings/#secret-key). To generate a secret key, run:

```bash
openssl rand -hex 32
```

This `SECRET_KEY` must be passed to PostHog as an environment variable. One-click deploys automatically set a secure key for you, but deployments from source and using Docker currently require you to manually set this. 

### Secret Key with Docker Compose

When using Docker Compose, you will need to manually update the `docker-compose.yml` file with a secret key that is unique to your instance.

#### Step-By-Step

First, run: `openssl rand -hex 32`. This will generate a new key for you. You'll need this in the next step.

Then, open the `docker-compose.yml` file with the command: `nano docker-compose.yml`

Lastly, substitute `"<randomly generated secret key>"` for the key you got from the key generation command.

This means the `SECRET_KEY: "<randomly generated secret key>"` line will end up looking something like this (with your key, of course):
```
SECRET_KEY: "cd8a182315defa70d995452d9258908ef502da512f52c20eeaa7951d0bb96e75"
```