---
title: Deploying a reverse proxy to PostHog Cloud 
sidebar: Docs
showTitle: true
---

## Why host this reverse proxy? 

You'll want to host this reverse proxy if you want to use PostHog Cloud but still want tracking data to be sent first to your domain, then to us. This helps with tracker blockers or if you have migrated or are migrating off of PostHog open source hosted locally to PostHog Cloud.

## Deploying the reverse proxy

### Using Caddy

We like [using Caddy because it makes setting up the reverse proxy](https://caddyserver.com/docs/quick-starts/reverse-proxy) and TLS a breeze.

```bash
docker run -p 80:80 -p 443:443 caddy caddy reverse-proxy --to p.posthog.com:443 --from <YOUR_TRACKING_DOMAIN>
```

You'll want to sub out `YOUR_TRACKING_DOMAIN` for whatever domain you use for proxying to PostHog. We'd suggest something like `e.yourdomain.com` or the like.

### Using AWS CloudFront

CloudFront can be used as a reverse proxy. Although [there are multiple options if you're using AWS](https://aws.amazon.com/blogs/architecture/serving-content-using-fully-managed-reverse-proxy-architecture/)

NB Cloudfront doesn't forward headers, cookies, or query parameters received from the origin by default. PostHog uses query parameters in its URLs. You need an "origin request policy" as in the instructions below.

#### Create a distribution

1. Create a CloudFront distribution 
2. Set the origin domain to your PostHog instance. `app.posthog.com` for PostHog cloud.
3. Allow all HTTP methods
4. Create and attach an "origin request policy" that forwards all query parameters
5. Choose the appropriate price class for your use
6. Once the distribution is deployed set its URL as the api host in your JS snippet or SDK config

<video autoPlay loop muted playsInline>
    <source src="../../images/docs/cloud/cloudfront-proxy/cloudfront.webm" type="video/webm" />
     <source src="../../images/docs/cloud/cloudfront-proxy/cloudfront.mp4" type="video/mp4" />
</video>

You can find out about [CloudFront pricing on the AWS website](https://aws.amazon.com/cloudfront/pricing/)

### Summary
That's it! A few resources here will go a long way. Reach out if you hit any snags!