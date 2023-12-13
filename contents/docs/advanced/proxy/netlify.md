---
title: Using Netlify redirects as a reverse proxy
sidebar: Docs
showTitle: true
---

Netlify supports [redirects and rewrites](https://docs.netlify.com/routing/redirects/#syntax-for-the-redirects-file) which we can use as a reverse proxy from an `/ingest` route to `https://app.posthog.com` or `https://eu.posthog.com`. In your `netlify.toml` file, add a redirect like this:

```js
[[redirects]]
  from = "/ingest/*"
  to = "https://app.posthog.com/:splat"
  host = "app.posthog.com"
  status = 200
  force = true
```

Once done, set the `/ingest` route of your domain as the API host in your PostHog initialization like this:

```js
posthog.init('<ph_project_api_key>',
  {
    api_host: 'https://www.your-domain.com/ingest',
    ui_host: 'https://app.posthog.com' // or 'https://eu.posthog.com' if your PostHog is hosted in Europe
  }
)
```

Once updated, deploy your changes on Netlify and check that PostHog requests are going to `https://www.your-domain.com/ingest` by checking the network tab on your domain.