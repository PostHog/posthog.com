---
title: How to run A/B tests in Bubble
date: 2024-01-11T00:00:00.000Z
author:
  - lior-neu-ner
showTitle: true
sidebar: Docs
tags:
  - experimentation
---

import { ProductScreenshot } from 'components/ProductScreenshot'
export const EventsInPostHogLight = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/bubble-ab-tests/events-in-posthog-light.png"
export const EventsInPostHogDark = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/bubble-ab-tests/events-in-posthog-dark.png"
export const TestSetupLight = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/bubble-ab-tests/test-setup-light.png"
export const TestSetupDark = "https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/tutorials/bubble-ab-tests/test-setup-dark.png"

[Bubble](https://bubble.io/) is a great tool for building marketing websites. However, sometimes you may be unsure if a change actually improves your conversion rate. This is where [A/B testing](/ab-testing) is helpful. It enables you to test and compare the results of your changes.

This tutorial shows you how to set up A/B tests with Bubble and PostHog to get the most out of your website.

## 1. Add PostHog to your Bubble site

First, [sign up to PostHog](https://us.posthog.com/signup). Then, go to your [project settings](https://us.posthog.com/settings/project) and copy your [web snippet](https://us.posthog.com/settings/project-details#snippet). It looks like this:

```js
<script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('<ph_project_api_key>',{api_host:'<ph_instance_address>'})
</script>
```

With the snippet copied, go to your Bubble site settings by clicking on the icon in the left-hand menu. If you haven’t already, sign up for at least the **Starter** site plan. This enables you to add custom code.

Go to the **SEO / metatags** tab in site settings. Paste your PostHog snippet in the **Script/meta tags in header** section. Then, deploy your site to live.

![How to add PostHog to Bubble](../images/tutorials/bubble-ab-tests/adding-posthog.mp4)

## 2. Capture a custom event

We're going to create an A/B test comparing how a button's text affects its click-through rate. To compare the results, we first capture a custom event and then set it as our [goal metric](/product-engineers/ab-testing-guide-for-engineers#1-a-clear-measurable-goal) for our A/B test. 

To capture this event:

1. Install the [Bubble Toolbox plugin](https://bubble.io/plugin/toolbox-1488796042609x768734193128308700). This enables us to run custom JavaScript code when the button is pressed.

2. Add a new button to your Bubble site. Click on the button and then on **Add workflow** in the popup menu.

3. Click on **add an action**. In the menu that appears, click on **Plugins** and then **Run javascript**. This will open a new menu where you can add JavaScript code.

4. Add the following code under the **Script** heading:

```js
window.posthog.capture("ab_test_button_clicked")
```

![Capture custom event in Bubble](../images/tutorials/bubble-ab-tests/capture-custom-event.mp4)

Finally, deploy your changes to live and then click your new button to [see the event in PostHog](https://us.posthog.com/events).

<ProductScreenshot
  imageLight={EventsInPostHogLight} 
  imageDark={EventsInPostHogDark} 
  alt="Events captured in PostHog" 
  classes="rounded"
/>

## 3. Create an A/B test in PostHog

If you haven't done so already, you'll need to [upgrade](https://us.posthog.com/organization/billing) your PostHog account to include A/B testing. This requires entering your credit card details, but don't worry, we have a [generous free tier](/pricing) of 1 million requests per month – so you won't be charged anything yet.

Next, go to the [A/B testing tab](https://us.posthog.com/experiments) and create an A/B test by clicking the **New experiment** button. Add the following details to your experiment:

1. Name it "Bubble button experiment".
2. Set "Feature flag key" to `bubble-button-experiment`.
3. Under the experiment goal, select the `ab_test_button_clicked` event we created in the previous step.
4. Use the default values for all other fields.

Click "Save as draft" and then click "Launch".

<ProductScreenshot
  imageLight={TestSetupLight} 
  imageDark={TestSetupDark} 
  alt="Experiment setup in PostHog" 
  classes="rounded"
/>

## 4. Implement the A/B test in Bubble

The final step is to add the experiment code in Bubble. We need to add code that does the following:

1. Fetch the `bubble-button-experiment` flag.
2. Change the title of the button based on whether the value of the flag is `control` or `test`.

To do this, we add another workflow event. Go to the [Workflow tab](https://manual.bubble.io/help-guides/getting-started/navigating-the-bubble-editor/tabs-and-sections/workflow-tab) in Bubble. Create a new **Page is loaded** event with an action to run custom JavaScript code (like we did for [capturing our custom event](#2-capture-a-custom-event)). 

Use the following code to change the title of the button based on the value of the feature flag:

```js
posthog.onFeatureFlags(() => {
   // Find the button you'd like to change. In our case, we change the text of the "Sign Up" button
   var button = Array.from(document.querySelectorAll('button')).find(el => el.textContent === 'Sign Up');

   if (button) {
      const flagValue = posthog.getFeatureFlag('bubble-button-experiment')
      if (flagValue === 'control') {
        button.textContent = "This is the title for CONTROL group"
      } else if (flagValue === 'test') {
        button.textContent = "This is the title for TEST group"
      }
   }
});    
```

Finally, deploy your changes to live.

![Add script in Framer](../images/tutorials/bubble-ab-tests/add-flag-code.mp4)

That's it! Your A/B test is now live. PostHog will split your users so half see the updated button text and tracks whether it has an impact on your click-through rate. You can [view your test results](/docs/experiments/testing-and-launching#viewing-experiment-results) on the experiment page in PostHog.

If you want to test each variant of your experiment to make sure it is working correctly, add the line `posthog.featureFlags.override({'bubble-button-experiment': 'variant_name'})` to your code:

```js
posthog.onFeatureFlags(() => {
   // Override the feature flag
   posthog.featureFlags.override({'bubble-button-experiment': 'test'}) // or 'control' 
       
   // rest of your code...
});    
```

## Further reading

- [How to set up Bubble analytics, session replays, and more](/tutorials/bubble-analytics)
- [How to create surveys in Bubble](/tutorials/bubble-surveys)
- [A software engineer's guide to A/B testing](/product-engineers/ab-testing-guide-for-engineers)
