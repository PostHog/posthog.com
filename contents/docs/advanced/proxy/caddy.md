---
title: Setting up Caddy as a reverse proxy
sidebar: Docs
showTitle: true
---

We like [using Caddy because it makes setting up the reverse proxy](https://caddyserver.com/docs/quick-starts/reverse-proxy) and TLS a breeze.

```bash
docker run -p 80:80 -p 443:443 caddy caddy reverse-proxy --to app.posthog.com:443 --from <YOUR_TRACKING_DOMAIN> --change-host-header
```

You'll want to sub out `YOUR_TRACKING_DOMAIN` for whatever domain you use for proxying to PostHog. We'd suggest something like `e.yourdomain.com` or the like.

Make sure your DNS records point to your machine and that ports 80 and 443 are open to the public and directed toward Caddy.

If you want to use a config file instead, you can use something of the form:

```
:{$PORT} {
  header {
    Access-Control-Allow-Origin https://<your domain name>
  }

  reverse_proxy https://app.posthog.com {
    header_up Host app.posthog.com
    header_down -Access-Control-Allow-Origin
  }
}
```
