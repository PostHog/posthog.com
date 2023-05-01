---
title: Using Cloudflare as a reverse proxy
sidebar: Docs
showTitle: true
---

In Cloudflare, create a new CNAME record for your domain. It should point to `app.posthog.com` or `eu.posthog.com` depending on your region, and have proxy enabled (e.g. `CNAME, e, app.posthog.com, proxy enabled`). Finally, [use Page Rules to change the Host header](https://support.cloudflare.com/hc/en-us/articles/206652947-Using-Page-Rules-to-rewrite-Host-Headers) to `app.posthog.com` or `eu.posthog.com` depending on which PostHog region you are using.

> Cloudflare does require your domain to be hosted with them, and using them does more than just proxying requests, such as blocking traffic from bots.
> Additionally, you must be on the Enterprise CloudFlare plan to customize the Host header.
