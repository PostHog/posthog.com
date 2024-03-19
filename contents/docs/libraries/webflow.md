---
title: Webflow
icon: ../../images/docs/integrate/frameworks/webflow.svg
---

PostHog makes it easy to get data about traffic and usage of your [Webflow](https://webflow.com/) app. Integrating PostHog into your site enables analytics about user behavior, custom events capture, session recordings, feature flags, and more.

This guide walks you through integrating PostHog into your Webflow app using the [JavaScript Web SDK](/docs/libraries/js).

## Installation

First, [sign up to PostHog](https://app.posthog.com/signup). Then, go to your [project settings](https://app.posthog.com/settings/project) and copy your web snippet. It looks like this:

```js
<script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('<ph_api_key>',{api_host:'<ph_instance_address>'})
</script>
```

With the snippet copied, go to your Webflow site settings by clicking on the menu icon in the top left. If you haven’t already, sign up for the "Basic" site plan. This enables you to add custom code.

Go to the "Custom code" tab in site settings. In the "Head code" section, paste your PostHog snippet and press "Save". Then, publish your site.

![How to add PostHog to Webflow](./images/add-posthog-to-webflow.mp4)

## Next steps

For any technical questions for how to integrate specific PostHog features into Webflow (such as analytics, feature flags, A/B testing, surveys, etc.), have a look at our [JavaScript Web SDK docs](/docs/libraries/js).

Alternatively, the following tutorials can help you get started:

- [How to set up Webflow analytics and session recordings](/tutorials/webflow)
- [How to run A/B tests in Webflow](/tutorials/webflow-ab-tests)
- [How to create surveys in Webflow](/tutorials/webflow-surveys)
- [How to capture Webflow form submissions](/tutorials/webflow-form-submissions)
