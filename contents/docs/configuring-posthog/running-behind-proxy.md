---
title: Running Behind a Proxy
sidebar: Docs
showTitle: true
---


If you're running PostHog behind a proxy, there are a few more things you need to do to make sure PostHog (specifically the toolbar, which runs on your own site) works.

### Setup

If PostHog is running behind a proxy, you need to do 2 things:
1. Make sure you have the `IS_BEHIND_PROXY` environment variable set to `True`.
1. If deploying with Docker, use the `docker-compose.proxy.yml` file. This is the exact same as the `docker-compose.yml` file with one line removed, preventing a port conflict between the PostHog Docker container and the proxy.

<div class='note-block'><b>Note:</b> It is suggested to set up the proxy separately from PostHog's Docker Compose definition.</div>

### NGINX Config (Suggested)

You need to make sure your proxy server is sending `X-Forwarded-For` headers. For NGINX, that config should look something like this:

```nginx
    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_redirect off;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass http://127.0.0.1:8000;
    }
```

### Apache2 Config

You need the `proxy` `proxy_http` and `proxy_html` modules enabled. 
To do this, run `sudo a2enmod proxy proxy_http proxy_html`.

Make sure SSL is enabled, and include the `X-Forwarded-Proto` header so that PostHog knows it.

```apacheconf
<VirtualHost *:443>
    ProxyPass / http://0.0.0.0:8000/
    RequestHeader set X-Forwarded-Proto expr=%{REQUEST_SCHEME}
    # SSL & other config here
</VirtualHost>
```

### Infinite Redirect

Some users have reported getting infinite redirects when running behind a proxy. Make sure the `X-Forwarded-Proto` header is set to `https` if you have HTTPS enabled. Alternatively, you can set the `DISABLE_SECURE_SSL_REDIRECT` variable to make PostHog run using HTTP.
