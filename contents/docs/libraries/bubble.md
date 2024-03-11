---
title: Bubble
icon: ../../images/docs/integrate/frameworks/bubble.svg
---

PostHog makes it easy to get data about traffic and usage of your [Bubble](https://bubble.io/) app. Integrating PostHog into your site enables analytics about user behavior, custom events capture, session recordings, feature flags, and more.

This guide walks you through integrating PostHog into your Framer app using the [JavaScript Web SDK](/docs/libraries/js).

## Installation

First, [sign up to PostHog](https://us.posthog.com/signup). Then, go to your [project settings](https://us.posthog.com/settings/project) and copy your [web snippet](https://us.posthog.com/settings/project-details#snippet). It looks like this:

```js
<script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('<ph_project_api_key>',{api_host:'<ph_instance_address>'})
</script>
```

With the snippet copied, go to your Bubble site settings by clicking on the icon in the left-hand menu. If you haven’t already, sign up for at least the **Starter** site plan. This enables you to add custom code.

Go to the **SEO / metatags** tab in site settings. Paste your PostHog snippet in the **Script/meta tags in header** section. Then, deploy your site to live.

![How to add PostHog to Bubble](./images/bubble-adding-posthog.mp4)

## Capture custom events

To capture custom events, you need to install the [Bubble Toolbox plugin](https://bubble.io/plugin/toolbox-1488796042609x768734193128308700). This enables you to run custom JavaScript code.

Below is an example of how to capture an event when a button is pressed:

1. Add a new button to your Bubble site. Click on the button and then on **Add workflow** in the popup menu.

2. Click on **add an action**. In the menu that appears, click on **Plugins** and then **Run javascript**. This will open a new menu where you can add JavaScript code.

3. Add the following code under the **Script** heading:

```js
window.posthog.capture("button_clicked")
```

![Capture custom event in Bubble](./images/bubble-capture-custom-event.mp4)

## Next steps

For any technical questions for how to integrate specific PostHog features into Bubble (such as analytics, feature flags, A/B testing, surveys, etc.), have a look at our [JavaScript Web SDK docs](/docs/libraries/js).

Alternatively, we've also written the below tutorials to help get you started:

- [How to set up Bubble analytics, session replays, and more](/tutorials/bubble-analytics)
- [How to create surveys in Bubble](/tutorials/bubble-surveys)
- [How to run A/B tests in Bubble](/tutorials/bubble-ab-tests)
