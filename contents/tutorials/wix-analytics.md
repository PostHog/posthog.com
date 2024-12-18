---
title: How to set up Wix analytics, heatmaps, and more
date: 2024-06-20
author:
 - ian-vanagas
tags:
 - product analytics
 - heatmaps
---

To create the best possible Wix site, you need to know how users interact your site. PostHog provides tools like [analytics](/web-analytics), [heatmaps](/docs/toolbar/heatmaps), and [session replays](/session-replay) to help you do this. Best of all, PostHog has a generous always free tier (unlike other Wix analytics tools)

This tutorial shows you how to set up PostHog to your Wix site to capture analytics for you to analyze as well as how to set up and view heatmaps.

> **Note:** Adding custom code, which we do in this tutorial, requires Wix's premium plan.

## How to add PostHog to your Wix site

After [signing up for PostHog](https://us.posthog.com/signup) (which you can do for free), go to [your project settings](https://us.posthog.com/settings/project#snippet) and copy your web snippet which looks like this:

```html
<script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('<ph_project_api_key>',
      {
        api_host:'<ph_client_api_host>',
      }
    )
</script>
```

With this, go to your Wix settings, scroll down and choose **Custom code**, click the **+** for the header, paste in your web snippet, and click **Apply**. 

![Wix code](https://res.cloudinary.com/dmukukwp6/image/upload/wix_code_2683d43eca.png)

Now, when you (or your users) go to your site, PostHog will autocapture pageviews, button clicks, form inputs, and more. If you have [session replay enabled](https://us.posthog.com/settings/project-replay), these are captured as well.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/events_light_9e508d52dc.png" 
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/events_dark_b5c5f10c03.png" 
  alt="Analytics" 
  classes="rounded"
/>

## How to set up and view heatmaps

PostHog's heatmaps enable you to see where users are clicking on, hovering over, and scrolling. The web snippet you set up autocaptures the data needed for this, but it needs to be enabled in [your project settings](https://us.posthog.com/settings/project-autocapture#heatmaps).

Once enabled, you can access it via the toolbar. To launch the toolbar, go to the [toolbar tab in PostHog](https://us.posthog.com/toolbar), add your URL as an authorized domain, and click **Launch**.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/toolbar_light_409ad2b09f.png" 
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/toolbar_dark_5edad5ff33.png" 
  alt="Toolbar" 
  classes="rounded"
/>

This brings you to your site with the toolbar active. From here, you can click between the toolbar options to view the heatmap, clickmap, and scrollmap overlaid on your Wix site.

![Clickmap](https://res.cloudinary.com/dmukukwp6/image/upload/wix_ad6d43dbc1.png)

## Further reading

- [What to do after installing PostHog in 5 steps](/tutorials/next-steps-after-installing)
- [How to track performance marketing in PostHog](/tutorials/performance-marketing)
- [How to do cookieless tracking with PostHog](/tutorials/cookieless-tracking)

<NewsletterForm />