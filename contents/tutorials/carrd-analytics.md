---
title: How to set up Carrd analytics, session replay, and more
date: 2024-06-18
author:
  - ian-vanagas
tags:
  - product analytics
---

[Carrd](https://carrd.co/) is a popular simple site builder. It makes building one page websites like profiles, portfolios, and landing pages a breeze.

PostHog enables you to track and analyze these sites by capturing analytics data like pageviews, button clicks, and other user behavior. This requires both a Carrd site and their pro plan (for embeds) as well as a PostHog instance (you can [signup](https://us.posthog.com/signup) and use it for free).

## How to add PostHog to your Carrd site

Once your Carrd site is set up, go to PostHog and copy your web snippet from [your project settings](https://us.posthog.com/project/2/settings/project#snippet). It looks like this:

```html
<script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('<ph_project_api_key>',{api_host:'<ph_client_api_host>'})
</script>
```

In your Carrd site, go to your site editor, click the **+** in the top right toolbar, and select **Embed**. In the options sidepanel:

1. For **Type**, choose **Code**
2. For **Style**, choose **Hidden** and **Head**
3. In **Code,** paste your PostHog web snippet from above
4. Click **Done**

![Carrd site editor](https://res.cloudinary.com/dmukukwp6/image/upload/carrd_ce2ed93b25.png)

Click the save icon and publish the site. Now, when you go to your published site and click around, you will see pageviews, clicks, and more autocaptured in PostHog's [activity tab](https://us.posthog.com/project/events). If you enabled [session replay](https://us.posthog.com/settings/project-replay) and [heatmaps](https://us.posthog.com/settings/project-autocapture#heatmaps) in your project settings, these are also captured. 

![Analytics](https://res.cloudinary.com/dmukukwp6/image/upload/analytics_da9daded1b.png)

## Further reading

- [What to do after installing PostHog in 5 steps](/tutorials/next-steps-after-installing)
- [How to track performance marketing in PostHog](/tutorials/performance-marketing)
- [How to do cookieless tracking with PostHog](/tutorials/cookieless-tracking)

<NewsletterForm />