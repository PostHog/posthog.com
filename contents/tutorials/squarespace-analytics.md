---
title: How to set up Squarespace analytics
date: 2024-10-23
author:
 - ian-vanagas
tags:
 - product analytics
 - session replays
---

Squarespace offers analytics with a basic set of metrics like visits, pageviews, and bounce rate, but for many, this isn't enough to understand what's going on on your site. PostHog offers a full set of web analytics metrics like session duration, entry and exit pages, sources, retention, and goals along with custom events, insights, session replay, and more.

> **Note:** This does require the Squarespace Business or Commerce plan. PostHog is free to use though.

## Create a Squarespace site

First, you need a Squarespace site to add PostHog to. Sign up, go through the tutorial, and create a new site. Pre-made templates are available to make this process easy, such as the one we used for this tutorial. Once you're happy with the site you've made, you'll need to upgrade to publish it. Make sure to upgrade to the Business or Commerce plan to inject the code needed to use PostHog.

## Add PostHog to your Squarespace site

In PostHog, get your HTML install snippet with your project API key and instance from [your project settings](https://us.posthog.com/settings/project). It looks like this:

```html
<script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('<ph_project_api_key>',{api_host:'<ph_client_api_host>'})
</script>
```

In Squarespace, under **Website**, click **Pages**, then **Website Tools**, and then **Code Injection**. In the [code injection](https://account.squarespace.com/project-picker?client_id=helpcenter&redirect_url=%2Fpages%2Fwebsite-tools%2Fcode-injection) section, you can paste in your PostHog snippet under **Header** and press **Save**. 

![Snippet install video](https://res.cloudinary.com/dmukukwp6/video/upload/snippet_9f509b1eb3.mp4)

PostHog then starts autocapturing pageviews, clicks, and more.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_10_22_at_21_36_30_2x_a04618e517.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_10_22_at_21_36_48_2x_610546fddd.png"
  alt="PostHog autocapture events"
  classes="rounded"
/>

> **Want session replays?** Just go to [your project settings](https://us.posthog.com/settings/project-replay) and make sure **Record user sessions** is toggled on.

## Creating actions and tracking conversions

PostHog autocaptures button and link clicks. Actions enable you to tag these events for easy access. For example, if we add a button to our site, we can create it as an action and track conversions with it. The easiest way to create an action is with the toolbar.

After adding a button to your Squarespace site, go to PostHog, and click the [toolbar tab](https://us.posthog.com/toolbar). Add your Squarespace site as an authorized URL and click **Launch**

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_10_23_at_08_59_50_2x_c62a5c4b8b.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_10_23_at_09_00_04_2x_480d179c95.png"
  alt="PostHog toolbar launch"
  classes="rounded"
/>

With the toolbar open, select the action tab, then **Select element**, and then click your button on the page, add a name, and then click **Create action.**

![Toolbar](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_10_23_at_09_04_57_2x_bfb361075c.png)

> **Tip:** The [toolbar](/docs/toolbar) also provides access to heatmaps, clickmaps, and scrollmaps.

Once created, we can then use it in funnels or trends, to target surveys, or as a [conversion goal](/docs/web-analytics/conversion-goals) in our web analytics dashboard. To do this, go to the [web analytics dashboard](https://us.posthog.com/web), click **Add conversion goal** near the top, and then select your action. This enables you to get a quick view of your website stats and conversions on one page.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_10_23_at_09_13_35_2x_4bea48f51f.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_10_23_at_09_13_17_2x_66585525d5.png"
  alt="PostHog web analytics dashboard with conversion goal"
  classes="rounded"
/>

<NewsletterForm />