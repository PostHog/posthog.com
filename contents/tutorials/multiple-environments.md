---
title: >-
  How to setup PostHog for multiple environments (development, staging,
  production)
sidebar: Docs
showTitle: true
author:
  - ian-vanagas
date: 2024-05-30
featuredTutorial: false
tags:
  - configuration
  - product os
---

import {ProductScreenshot} from 'components/ProductScreenshot'
import {ProductVideo} from 'components/ProductVideo'

Many software development teams use multiple environments to split up their code, such as development, staging, and production. This ensures changes in development don’t affect production, helps teams test before release, and increases the quality of code that reaches end users.

Using multiple environments requires splitting the data from each of them. If not, development and staging data combine with production data and can cause inaccuracy and issues. This tutorial goes over how to prevent those issues by setting up PostHog for use in multiple environments.

## Using multiple projects

The best practice for using PostHog across multiple environments is to use multiple projects. This enables developers to test [event capture](/docs/product-analytics/capture-events), [session replays](/docs/session-replay), and [feature flags](/docs/feature-flags) without polluting the data in production.

To create a new project, in your [PostHog instance](https://us.posthog.com/), click your project name and then the **New project** button. Be sure to name your project to make it clear it is not production, like `development` or `staging`.

<ProductVideo
    videoLight="https://res.cloudinary.com/dmukukwp6/video/upload/v1716972205/posthog.com/contents/Create-environment-light.mp4"  
    videoDark="https://res.cloudinary.com/dmukukwp6/video/upload/v1716972205/posthog.com/contents/create-project-dark.mp4"
    classes="rounded"
    alt= "Creating a new project in PostHog"
/>


This takes you through the project setup flow again and gives you a new project API key. You can keep your old key for production, and add the new one in the relevant environment. You'll likely need [environment variables](https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa) for this (like a `.env` file) if you haven't set those up. Initializing PostHog with a different key in each environment connects them to a different project.

The downside of using multiple projects is that you cannot directly copy actions, dashboards, insights, experiments, and other data created in PostHog between them. This means you must manually recreate them in each project if needed. However, it is possible to [copy feature flags across projects](/docs/feature-flags/multi-project-feature-flags).

### Feature flags with multiple projects

Sometimes, you may want to use the same feature flag keys across different PostHog projects. For example, when you're testing a new feature in staging before releasing to production. In this case, PostHog makes it easy to copy and sync feature flags across projects.

To copy or update a flag in another project:

1. Navigate to the [feature flag](https://us.posthog.com/feature_flags) you want to copy.
2. Select the `Projects` tab.
3. Select the project you want to copy the flag to.
4. Click `Copy` or `Update` - this depends on whether the flag already exists in the target project.
5. View the table at the bottom to see the newly created or updated flag.

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/feature-flags/multi-project-feature-flags-light.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/docs/feature-flags/multi-project-feature-flags-dark.png"
    alt="Multi-project feature flags" 
    classes="rounded"
/>

## Conditional initialization

### Opt-out of capturing on initialization

Another way to split up projects is by changing how you initialize PostHog based on the environment. For example, if you didn’t want to track your staging environment at all, initialize PostHog without a token and opt out of capturing immediately. This is what we do in our development environment.

```js
posthog.init(
    'fake token',
    {
      autocapture: false,
      loaded: function (ph) {
          if (process.env.ENVIRONMENT == 'development') {
              ph.opt_out_capturing(); // opts a user out of event capture
              ph.set_config({ disable_session_recording: true });
          }
      }, 
    }
  )
```

The `loaded` method enables you to run code after PostHog has loaded. This makes it useful for changing PostHog's behavior between environments by using methods like `set_config`.

If you wanted to make opting in conditional, call `opt_in_capturing()` instead. You can see the full list of config options in [our JavaScript docs](/docs/integrate/client/js#config).

### Opt-out of capturing based on URL

Another popular option is checking if the URL includes `localhost` or `127.0.0.1` (local IP) and opting out of capturing if so. If you were using the HTML snippet, this would look like:

```html
<script>
	  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
	  posthog.init('<ph_project_api_key>',{api_host:'<ph_client_api_host>'})
	  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
	    posthog.opt_out_capturing()
	  }
</script>
```

Setting this up correctly prevents capturing non-production event data. It enables you to continue using the same insights, feature flags, and other PostHog tools in development and staging because you only use a single project for all your data.

## Filtering internal and test users

The previous options capture data to separate projects or don’t capture data at all, but there is another option. This is to capture data normally and filter internal users from your analysis.

PostHog provides a toggle to filter internal users (as defined by you) from your analysis and visualization. To set this up, go to [Project Settings](https://us.posthog.com/settings/project#internal-user-filtering) and scroll down to **Filter out internal and test users**. Here you can add filters to identify your internal users and events so that they can be removed from insights. This could include filters like: 

- `distinct ID does not contain your domain`
- `host is not localhost`
- `environment is not development`

As an example, here’s what our internal filters look like at PostHog:

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/v1716975336/posthog.com/contents/Screenshot_2024-05-29_at_10.35.14_AM.png"
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/v1716975336/posthog.com/contents/Screenshot_2024-05-29_at_10.35.23_AM.png"
    alt="Setting up internal filters in PostHog" 
    classes="rounded"
/>

You can automatically enable filtering in all new [insights](/docs/product-analytics/insights) with the toggle at the bottom, or enable it manually on each insight.

> **Note:** Filtering internal and test users does not prevent the capture of data from these users and they still show up in the [Activity tab](https://us.posthog.com/events).

## Further reading

- [How to capture fewer unwanted events](/tutorials/fewer-unwanted-events)
- [What to do after installing PostHog in 5 steps](/tutorials/next-steps-after-installing)
- [Setting up Django analytics, feature flags, and more](/tutorials/django-analytics)

<NewsletterForm />