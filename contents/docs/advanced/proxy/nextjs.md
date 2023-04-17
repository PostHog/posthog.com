---
title: Using Next.js rewrites as a reverse proxy
sidebar: Docs
showTitle: true
---

If you are using Next.js, you can take advantage of [rewrites](https://nextjs.org/docs/api-reference/next.config.js/rewrites) to behave like a reverse proxy.

```js
// next.config.js
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/ingest/:path*",
        destination: "https://app.posthog.com/:path*",
      },
    ];
  },
}
module.exports = nextConfig
```

Then configure the PostHog client to send requests via your redirection.

```js
posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
 api_host: "https://your-host.com/ingest"
})
```
