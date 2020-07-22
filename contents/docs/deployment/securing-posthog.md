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



## Secret Key

Secret keys are used to encrypt cookies and password reset emails, [among other things](https://docs.djangoproject.com/en/3.0/ref/settings/#secret-key). To generate a secret key, run:

```bash
openssl rand -hex 32
```
