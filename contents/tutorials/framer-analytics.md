---
title: 'How to set up Framer analytics, session replay, and more'
date: 2023-08-18
author:
  - ian-vanagas
showTitle: true
sidebar: Docs
tags:
  - session replay
  - product analytics
  - feature flags
---

[Framer](https://www.framer.com/) is a popular no-code site builder that makes it easy to design a high-quality site. 

To maximize the effectiveness of your Framer site, you need analytics to see how users are using it. Data like pageviews, button clicks, and session replays are critical to improving your site. 

This tutorial shows you how to set up PostHog on your Framer site for capturing events, session replays, and implementing feature flags.

## Adding PostHog to your Framer site

First, [sign up to PostHog](https://app.posthog.com/signup) and copy your JavaScript snippet from the getting started flow or your project settings. It looks like this:

```html
<script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('<ph_project_api_key>',{api_host:'<ph_instance_address>'})
</script>
```

With the JavaScript snippet copied, go to your Framer project and click the gear in the top right to go to your site settings. If you haven’t already, sign up for the "Mini" site plan. This enables you to add custom code.

Once on a paid plan, go to the "General" tab in site settings and scroll down to the "Custom Code" section. Under "End of `<head>` tag", paste your PostHog JavaScript snippet here. Make sure to press "Save" next to the "Custom Code" heading. 

![Script](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/tutorials/framer-analytics/script.mp4)

Once you publish and go to your site, PostHog begins automatically capturing events like pageviews, button clicks, and form inputs on your site.

![Autocapture](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/framer-analytics/autocapture.png)

### Enabling session replays

To enable session replays, go to [your project settings](https://app.posthog.com/project/settings#recordings), scroll down to "Recordings," and enable "Record user sessions." PostHog then starts to record sessions of your users, so you can see all the details of how they use your site.

## Adding a custom event

We'll use [custom code components](https://www.framer.com/developers/#code-components) in Framer to set up [custom event capture](/docs/libraries/js#capturing-events). We will create a basic button that captures a `clicked homepage button`  and sets a `clicked_homepage_button` person property to `true`.

To do this, go to the "Assets" tab in the top left of your project. Next to the "Code" tab, click the plus icon to create a code file. Name the file `CaptureButton`, set it as a "New component" and press "Create."

Once done, delete the existing code and add a button that captures an event with `window.posthog()` like this:

```js
export default function CaptureButton() {
    const handleClick = () => {
        window.posthog.capture("clicked_homepage_button", {
            $set_once: { clicked_homepage_button: true },
        })
    }

    return <button onClick={handleClick}>Click me</button>
}
```

After pasting this in, press cmd/ctrl + S to save the component, and go back to the home page by clicking "Home" above the code. Once on the home page, drag and drop the `CaptureButton` component from the sidebar into your page and publish again to update your site with your new button.

![Framer button video](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/tutorials/framer-analytics/framer-button.mp4)

Once updated, you can head to your site and click the button to see events captured in PostHog and person properties set on the user.

![Custom event and person properties](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/framer-analytics/person.png)

## Customizing components with feature flags

Similarly, we can use [feature flags](/docs/feature-flags) in our custom code components. Feature flags are useful for conditionally showing (or hiding) components based on a rollout percentage and properties. For example, we can use a flag to show or hide our custom event button on the homepage

To do this, first, go to the [feature flag tab](https://app.posthog.com/feature_flags) in PostHog. Click "New feature flag," enter a key (I choose `framer-example`), fill out the details, set release conditions to roll out to 100% of users, and click "Save."

Back in Framer, we can edit our button component to check the feature flag and disappear if `false`. In the code for `CaptureButton`, import `useEffect` and `useState`, set up a state for `isButtonEnabled` then set that state based on what `window.posthog.isFeatureEnabled("framer-example")` returns. Add a check for `isButtonEnabled` to show the button.

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
