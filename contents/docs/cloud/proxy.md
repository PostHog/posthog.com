---
title: Deploying a reverse proxy to PostHog Cloud 
sidebar: Docs
showTitle: true
---

## Why host this reverse proxy? 

You'll want to host this reverse proxy if you want to use PostHog Cloud but still want tracking data to be sent first to your domain, then to us. This helps with tracker blockers or if you have migrated or are migrating off of PostHog open source hosted locally to PostHog Cloud.

## Deploying the reverse proxy

We like using Caddy because it makes setting up the reverse proxy and TLS a breeze.

```bash
docker run -p 80:80 -p 443:443 caddy caddy reverse-proxy --to p.posthog.com:443 --from <YOUR_TRACKING_DOMAIN>
```

You'll want to sub out `YOUR_TRACKING_DOMAIN` for whatever domain you use for proxying to PostHog. We'd suggest something like `e.yourdomain.com` or the like.

### Summary
That's it! A few resources here will go a long way. Reach out if you hit any snags!