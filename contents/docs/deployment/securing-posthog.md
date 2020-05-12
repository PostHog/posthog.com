---
title: Securing PostHog
sidebar: Docs
showTitle: true
---

## Restrict access by IP

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

Or you can implicitely trust all proxies.

```bash
TRUST_ALL_PROXIES=True
```

!> When using `TRUST_ALL_PROXIES`, make sure your proxy (like nginx) is setting X-Forwarded-For, like in the example above. If not, it would still be possible to spoof your IP address

> If you're on Heroku, you are behind a proxy so you'll need to add `IS_BEHIND_PROXY=True`. Heroku automatically overrides X-Forwarded-For, so you can use `TRUST_ALL_PROXIES=True`.

## Running behind a proxy

If you're running PostHog behind a proxy, there are a few more things you need to do to make sure PostHog (specifically the toolbar, which runs on your own site) works.

Make sure you have the `IS_BEHIND_PROXY` environment variable set to true

### NGINX config

You need to make sure your proxy server is sending X-Forwarded-For headers. For NGINX, that config should look something like:

```nginx
    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_redirect off;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass http://127.0.0.1:8000;
    }
```

### Apache2 config

You need the `proxy` `proxy_http` and `proxy_html` modules enabled. 
To do this, run `sudo a2enmod proxy proxy_http proxy_html`.

Make sure SSL is enabled, and include the `X-Forwarded-Proto` header so that posthog knows it.

```apache2
<VirtualHost *:443>
    ProxyPass / http://0.0.0.0:8000/
    RequestHeader set X-Forwarded-Proto expr=%{REQUEST_SCHEME}
    
    # ... SSL & other config here
</VirtualHost>
```

### Infinite redirect

Some users have reported getting infinite redirects running behind a proxy. Make sure the `X-Forwarded-Proto` header is set to `https` if you have https enabled. Alternatively, you can set the `DISABLE_SECURE_SSL_REDIRECT` variable to make PostHog run using http.

## Secret key

Secret keys are used to encrypt cookies, password reset emails [and other things](https://docs.djangoproject.com/en/3.0/ref/settings/#secret-key). To generate a secret key, run:

```bash
openssl rand -hex 32
```
