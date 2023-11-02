---
title: Running behind a proxy
sidebar: Docs
showTitle: true
---

If you're running PostHog behind a proxy, there are a few more things you need to do to make sure PostHog works. You usually need this if running behind a web server like Apache or NGINX, a load balancer (like ELB), or a DDoS protection service (like Cloudflare).

## Setup

If PostHog is running behind a proxy, you need to do the following:

-   Set the `IS_BEHIND_PROXY` environment variable to `True`. This will make sure the client's IP address is properly calculated, and SSL is properly handled (e.g. for OAuth requests).
-   Set your [trusted proxies](#trusted-proxies) configuration.
-   Depending on your setup, you might also need to set the `ALLOWED_HOSTS` [environment variable](/docs/self-host/configure/environment-variables). If you don't allow all hosts (i.e. you are allowlisting specific hosts), you will need to set the address(es) of your proxy here.

<div class='note-block'><b>Note:</b> It is suggested to set up the proxy separately from PostHog's Docker Compose definition.</div>

### Trusted proxies

Trusted proxies are used to determine which proxies to consider as valid from the `X-Forwarded-For` HTTP header included in all requests to determine the end user's real IP address. Specifically allowlisting your proxy server's address prevents spoofing of the end user's IP address while ensuring your service works as expected. There are two ways of setting up trusted proxies.

-   **Recommended**. Set a list of trusted IP addresses for your proxies via the `TRUSTED_PROXIES` environment variable (comma-separated list of IP addresses).
-   Trust all proxies by setting `TRUST_ALL_PROXIES` environment variable to `True` (_not recommended unless you have a strong reason for which allowlisting specific addresses wouldn't work for you_).

### Common issues

-   Some users have reported getting infinite redirects when running behind a proxy. Make sure the `X-Forwarded-Proto` header is set to `https` if you have HTTPS enabled. Alternatively, you can set the `DISABLE_SECURE_SSL_REDIRECT` variable to make PostHog run using HTTP.
    -   If you use a load balancer, it is recommended to terminate the SSL connection at the load balancer (remember to set `DISABLE_SECURE_SSL_REDIRECT` to `True`) and connect via HTTP to your PostHog container (make sure your container is behind a firewall or VPC to prevent unauthorized connections), you would then enforce SSL/TLS connections at the load balancer level.
-   If you have IP blocks that are not working and you're running behind a proxy, your instance may be misconfigured, preventing PostHog from determining the connecting IP address.

### Public endpoints

If you're setting up a proxy to protect your PostHog instance and prevent access only through an authorized connection, you should consider there are some endpoints that must always be publicly accessible in order for event ingestion, session recording and feature flags to work properly. These endpoints are listed below.

| Path               | Description                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------- |
| `/batch`           | Endpoint for ingesting/capturing events.                                                     |
| `/decide`          | Endpoint that enables autocapture, session recording, feature flags & compression on events. |
| `/capture`         | Endpoint for ingesting/capturing events.                                                     |
| `/e`               | Endpoint for ingesting/capturing events.                                                     |
| `/engage`          | Endpoint for ingesting/capturing events.                                                     |
| `/s`               | Endpoint for capturing session recordings.                                                   |
| `/static/array.js` | Frontend javascript code that loads `posthog-js`.                                            |
| `/static/recorder-v2.js`| Frontend javascript code that loads recordings v2 in `posthog-js`.                      |
| `/static/recorder.js`| Frontend javascript code that loads recordings in `posthog-js`.                            |
| `/static/surveys.js`| Frontend javascript code that loads surveys in `posthog-js`.                                |
| `/track`           | Endpoint for ingesting/capturing events.                                                     |

## NGINX config (Recommended)

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

## Apache2 config

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
