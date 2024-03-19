---
title: Framer
icon: ../../images/docs/integrate/frameworks/framer.svg
---

PostHog makes it easy to get data about traffic and usage of your [Framer](https://www.framer.com/) app. Integrating PostHog into your site enables analytics about user behavior, custom events capture, session recordings, feature flags, and more.

This guide walks you through integrating PostHog into your Framer app using the [JavaScript Web SDK](/docs/libraries/js).

## Installation

Go to your [project settings](https://us.posthog.com/settings/project#snippet) and copy your web snippet. It looks like this:

```js
<script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('<ph_api_key>',{api_host:'<ph_instance_address>'})
</script>
```

With the snippet copied, go to your Framer project settings by clicking the gear in the top right. If you haven’t already, sign up for the "Mini" site plan. This enables you to add custom code.

Go to the **General** tab in site settings and scroll down to the **Custom Code** section. Under **End of `<head>` tag**, paste your PostHog snippet. Make sure to press **Save** next to custom code.

Finally, **publish** your site.

![How to add PostHog to Framer](./images/add-posthog-to-framer.mp4)

## Capture custom events

To [capture custom events](/docs/product-analytics/capture-events), you call `posthog.capture()` using [custom code components in Framer](https://www.framer.com/developers/#code-components).

Go to the **Assets** tab in the top left of your Framer project, and click the **plus icon** next to the Code tab. This will show a pop up to create a new code file. Name the file `CaptureButton`, set it as a "New component" and press "Create."

In the new code file, delete the existing code and replace it with the following:

```js
export default function CaptureButton() {
    const handleClick = () => {
        window.posthog.capture("clicked_button", {
            $set_once: { clicked_homepage_button: true },
        })
    }

    return (
        <button id="capture-button" onClick={handleClick}>
            Click me
        </button>
    )
}
```

Press `Cmd/Ctrl + s` to save your changes. Then press the **Home** button to go back to the home page. Add your new `CaptureButton` to your page by dragging it from the Code tab.

![Create a code snippet in Framer](./images/framer-create-code-component.mp4)

Publish your site and then click your new button to [see the event in PostHog](https://app.posthog.com/events).

## Next steps

For any technical questions for how to integrate specific PostHog features into Framer (such as analytics, feature flags, A/B testing, surveys, etc.), have a look at our [JavaScript Web SDK docs](/docs/libraries/js).

Alternatively, the following tutorials can help you get started:

- [How to set up Framer analytics and session recordings](/tutorials/framer-analytics)
- [How to run A/B tests in Framer](/tutorials/framer-ab-tests)
- [How to create surveys in Framer](/tutorials/framer-surveys)