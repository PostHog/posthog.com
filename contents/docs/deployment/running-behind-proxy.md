---
title: Running behind proxy
sidebar: Docs
showTitle: true
---


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