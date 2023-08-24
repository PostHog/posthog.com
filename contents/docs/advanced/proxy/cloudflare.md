---
title: Using Cloudflare as a reverse proxy
sidebar: Docs
showTitle: true
---

To use Cloudflare for reverse proxying, make sure that you're logged into your Cloudflare account, and that you've added your domain (called "website" in Cloudflare) to the account.

There are two ways to do this:
1. Using [Cloudflare Workers](https://developers.cloudflare.com/workers/). This is a bit more setup, but can be used on all Cloudflare plans. 
2. Using DNS and [Page Rules](https://developers.cloudflare.com/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/). This is simplest method, but requires the Cloudflare Enterprise plan.

## Method one: Proxy using Cloudflare Workers

Workers are really powerful and allow up to 100,000 requests per day on the free plan ([see Cloudflare pricing](https://developers.cloudflare.com/workers/platform/pricing/)). Follow these steps to set up a reverse proxy worker:

### 1. Create a worker

From the root of the Cloudflare dashboard, go to "Workers & Pages" > "Overview" > "Create application" > "Create Worker". At this point, you can either keep the random worker name or choose your own. Click "Deploy" once done.

### 2. Configure the worker to act as a proxy

Click "Edit code" once the new worker has been saved following "Deploy". (And if you're already on the worker page, click "Quick edit".) You should now be seeing a code editor for the worker. Just replace all the existing content with this proxying code:

```JavaScript
const API_HOST = "app.posthog.com" // Change to "eu.posthog.com" for the EU region

async function handleRequest(event) {
    const url = new URL(event.request.url)
    const pathname = url.pathname
    const search = url.search
    const pathWithParams = pathname + search
    if (pathname.startsWith("/static/")) {
        return retrieveStatic(event, pathWithParams)
    } else {
        return forwardRequest(event, pathWithParams)
    }
}

async function retrieveStatic(event, pathname) {
    let response = await caches.default.match(event.request)
    if (!response) {
        response = await fetch(`https://${API_HOST}${pathname}`)
        event.waitUntil(caches.default.put(event.request, response.clone()))
    }
    return response
}

async function forwardRequest(event, pathWithSearch) {
    const request = new Request(event.request)
    request.headers.delete("cookie")
    return await fetch(`https://${API_HOST}${pathWithSearch}`, request)
}

addEventListener("fetch", (event) => {
    event.passThroughOnException()
    event.respondWith(handleRequest(event))
})
```

When done, click "Save and deploy".

### 3. Use a custom domain for the worker

This step is optional, but highly recommended. 
To use your own domain instead of the basic `*.workers.dev` one, go to the worker page (by exiting the code editor, if you're still in it) and there click "View" under "Custom Domains". Click "Add Custom Domain", type in a subdomain, and save with "Add Custom Domain". The subdomain can be anything, even `pineapple.yourdomain.com` – just remember to avoid terms like "tracking" or "analytics", as they may be blanket-blocked.

### 4. Use the new host in SDKs

You can now use your worker's domain (shown under "Preview" on the worker page) as `api_host` in PostHog SDKs! If you've added a custom domain in step 3, use that instead.

## Method two: Proxy using DNS and Page Rules with Cloudflare Enterprise

Proxying traffic using DNS is relatively straight-forward. However, it requires correcting the Host headers for proxied requests, which is only available on the Cloudflare Enterprise plan. If your domain is on this plan, follow these steps:

### 1. Add a DNS record

Select your website in the Cloudflare dashboard, go to the "DNS" page, and there click "Add record". Make sure this is a CNAME record, and choose a name for it, which will be the PostHog proxy subdomain. The subdomain can be anything, even `watermelon.yourdomain.com` – just remember to avoid terms like "tracking" or "analytics", as they may be blanket-blocked. The record should point to `app.posthog.com` or `eu.posthog.com` (depending on your PostHog region), and have proxy enabled (e.g. `CNAME, e, app.posthog.com, proxied`).

### 2. Correct Host headers

The proxy won't work if the Host headers of requests aren't rewritten from your domain to the PostHog domain. To fix this, [add a Page Rules to change the Host header](https://support.cloudflare.com/hc/en-us/articles/206652947-Using-Page-Rules-to-rewrite-Host-Headers) to `app.posthog.com` or `eu.posthog.com` (depending on your PostHog region).

### 3. Use the new host in SDKs

You can now use your CNAME record's domain as `api_host` in PostHog SDKs!
