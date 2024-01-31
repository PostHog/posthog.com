---
title: Setting up Caddy as a reverse proxy
sidebar: Docs
showTitle: true
---

Caddy makes setting up a [reverse proxy](https://caddyserver.com/docs/quick-starts/reverse-proxy) with TLS simple. For these examples:

1. Sub out `YOUR_TRACKING_DOMAIN` for the domain you use for proxying to PostHog. We'd suggest something like `e.yourdomain.com`. 

2. Make sure your DNS records point to the server where Caddy is running. 

3. Make sure ports 80 and 443 are open and directed toward Caddy.

4. If you're using an EU Cloud instance, replace `app.posthog.com` with `eu.posthog.com`.

## Basic setup

First, [install Caddy](https://caddyserver.com/docs/install).

Next, create a `Caddyfile` that listens for incoming requests and proxies them to PostHog:

```
${YOUR_TRACKING_DOMAIN} {
  reverse_proxy https://app.posthog.com:443 {
    header_up Host app.posthog.com
    header_down -Access-Control-Allow-Origin
  }
}
```

Run `caddy start` from the same folder as your `Caddyfile`. Once running, you can use your tracking domain as a reverse proxy to PostHog like this:

```html
<script>
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  posthog.init('<ph_project_api_key>',
    {
      api_host:`${YOUR_TRACKING_DOMAIN}`,
      ui_host: 'https://app.posthog.com' // or 'https://eu.posthog.com' if your PostHog is hosted in Europe
    }
  )
</script>

```

## Using a subpath

If your reverse proxy is running on the same domain as another app, you can set up a `handle_path` matcher and rewrite the path to remove it for the PostHog request. This is useful for testing the reverse proxy locally combined with the Caddy `file_server`.

To showcase this, create a folder, and then a `Caddyfile` in it like this:

```
:2015 {
  handle_path /phproxy* {
    rewrite * {path}
    reverse_proxy https://app.posthog.com:443 {
      header_up Host app.posthog.com
      header_down -Access-Control-Allow-Origin
    }
  }
  file_server browse
}

```

In the same folder, create a `home.html` file with some content and the PostHog snippet.

```html
<script>
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
  posthog.init('<ph_project_api_key>',
    {
      api_host:'http://localhost:2015/phproxy',
      ui_host:'app.posthog.com'
    }
  )
</script>
<h1>Test home page</h1>
```

When you go to `http://localhost:2015/home.html`, events are sent to PostHog via the reverse proxy.

## Running Caddy with Docker

On the server where you run Docker, create a `Caddyfile` in `etc/caddy` like:

```
${YOUR_TRACKING_DOMAIN} {
  header {
    Access-Control-Allow-Origin https://${YOUR_TRACKING_DOMAIN}
  }
  reverse_proxy https://app.posthog.com:443 {
    header_up Host app.posthog.com
    header_down -Access-Control-Allow-Origin
  }
}
```

> If `YOUR_TRACKING_DOMAIN` points to the same domain as production then the above works for requests originating from that domain. If you want to test your proxy from other domains, such as `localhost`, you'll need to tweak the `Access-Control-Allow-Origin` header and/or `YOUR_TRACKING_DOMAIN` accordingly.

With Docker installed and set up, run the following command to start Caddy: 

```bash
docker run -p 80:80 -p 443:443 \
  -v $PWD/Caddyfile:/etc/caddy/Caddyfile \
  -v caddy_data:/data \
  caddy
```

You can now use your tracking domain as a reverse proxy to PostHog. See the [Docker Caddy overview for more details](https://hub.docker.com/_/caddy), especially important is the "⚠️ A note about persisted data" which explains why it is important to use a Docker volume for the `/data` folder.