---
title: 'How to set up Framer analytics, session replay, and more'
date: 2024-11-14
author:
  - ian-vanagas
showTitle: true
sidebar: Docs
tags:
  - session replay
  - product analytics
  - web analytics
  - feature flags
---

[Framer](https://www.framer.com/) is a popular no-code site builder that makes it easy to design a stylish website.

To understand user behavior and site performance, you need analytics. Data like pageviews, button clicks, and session replays are critical to improving your site. 

This tutorial shows you how to set up PostHog on your Framer site to capture events, record sessions, track conversions, set up feature flags, and more.

## Adding PostHog to your Framer site

First, [sign up to PostHog](https://us.posthog.com/signup) and copy your JavaScript snippet from the getting started flow or [your project settings](https://us.posthog.com/settings/project). It looks like this:

```html
<script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('<ph_project_api_key>',{api_host:'<ph_client_api_host>' })
</script>
```

With the JavaScript snippet copied, go to your Framer project and click the gear in the top right to go to your site settings. If you haven’t already, sign up for the "Mini" site plan. This enables you to add custom code.

Once on a paid plan, go to the **General** tab in site settings and scroll down to the **Custom Code** section. Under **End of `<head>` tag**, paste your PostHog JavaScript snippet. Make sure to press **Save** next to the **Custom Code** heading. 

![Installing the script](https://res.cloudinary.com/dmukukwp6/video/upload/framer_41ee7b77bf.mp4)

Once you publish and go to your site, PostHog begins automatically capturing events like pageviews, button clicks, and form inputs on your site.

<ProductScreenshot
  imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_11_14_at_09_56_08_2x_2c523f9cd1.png"
  imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_11_14_at_09_56_19_2x_038876a5dc.png"
  classes="rounded"
  alt="PostHog autocapture"
/>

### Enabling session replays

To enable session replays, go to [your project settings](https://app.posthog.com/project/settings#recordings), scroll down to **Recordings**, and enable **Record user sessions**. PostHog then starts to record sessions of your users, so you can see all the details of how they use your site.

## Adding a custom event

We'll use [custom code components](https://www.framer.com/developers/components/introduction) in Framer to set up [custom event capture](/docs/libraries/js#capturing-events). We will create a basic button that captures a `clicked_homepage_button` event.

To do this, go to the **Assets** tab in the top left of your project. Next to the **Code** tab, click the plus icon to create a code file. Name the file `CaptureButton`, set it as a **New component** and press **Create**.

Once done, delete the existing code and add a button that captures an event with `window.posthog()` like this:

```js
export default function CaptureButton() {
    const handleClick = () => {
        window.posthog.capture("clicked_homepage_button")
    }

    return <button onClick={handleClick}>Click me</button>
}
```

After pasting this in, press cmd/ctrl + S to save the component, and go back to the home page by clicking "Home" above the code. Once on the home page, drag and drop the `CaptureButton` component from the sidebar into your page and publish again to update your site with your new button.

![Framer button video](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/tutorials/framer-analytics/framer-button.mp4)

Once updated, you can head to your site and click the button to see events captured in PostHog.

<ProductScreenshot
  imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_11_14_at_10_06_15_2x_8a1294b536.png"
  imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_11_14_at_10_06_03_2x_ede3a3286d.png"
  classes="rounded"
  alt="PostHog custom event capture"
/>

## Tracking conversion goals

PostHog's [web analytics dashboard](/docs/web-analytics/dashboard) gives you an overview of your site's performance. You can see metrics like bounce rate, session duration, popular pages, sources, and more.

You can also use the web analytics dashboard to get details on conversions, like clicking the homepage button we added earlier.

To set this up, go to the [web analytics dashboard](https://us.posthog.com/web), click **Add conversion goal**, and select the `clicked_homepage_button` event. This reveals details on conversions and conversion rate.

<ProductScreenshot
  imageLight = "https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_11_14_at_10_30_54_2x_3711b5b414.png"
  imageDark = "https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_11_14_at_10_31_06_2x_b630b8ddb4.png"
  classes="rounded"
  alt="Web analytics conversions"
/>

To dive deeper into conversions, you can use [funnels](/docs/product-analytics/funnels).

## Customizing components with feature flags

Feature flags are useful for conditionally showing (or hiding) components based on a rollout percentage and properties. For example, we can use a flag to show or hide our custom event button on the homepage.

To do this, first, go to the [feature flag tab](https://us.posthog.com/feature_flags) in PostHog. Click **New feature flag**, enter a key (I chose `framer-example`), fill out the details, set release conditions to roll out to 100% of users, and click **Save**.

Back in Framer, we can edit our custom button component to check the feature flag and disappear if `false`. 

In the code for `CaptureButton`, import `useEffect` and `useState`, set up a state for `isButtonEnabled` then set that state based on what `window.posthog.isFeatureEnabled("framer-example")` returns. Add a check for `isButtonEnabled` to show the button.

```js
import { useEffect, useState } from "react"

export default function CaptureButton() {
    const [isButtonEnabled, setIsButtonEnabled] = useState(true)

    useEffect(() => {
        if (window.posthog) {
            window.posthog.onFeatureFlags(function () {
                setIsButtonEnabled(
                    window.posthog.isFeatureEnabled("framer-example")
                )
            })
        }
    }, [])

		//... handleClick

    return (
        <div>
            {isButtonEnabled && (
                <button onClick={handleClick}>Click me</button>
            )}
        </div>
    )
}
```

When we save this and publish the site again, the button is still there. When we go back to PostHog and disable the `framer-example` flag, the button disappears.

![Feature flag video](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/tutorials/framer-analytics/flag.mp4)

## Further reading

- [How to run A/B tests in Framer](/tutorials/framer-ab-tests)
- [How to create surveys in Framer](/tutorials/framer-surveys)
- [A non-technical guide to understanding data in PostHog](/tutorials/non-technical-guide-to-data)

<NewsletterForm />