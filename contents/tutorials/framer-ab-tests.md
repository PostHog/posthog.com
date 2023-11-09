---
title: "How to run A/B tests in Framer with PostHog"
date: 2023-11-09
author: ["lior-neu-ner"]
showTitle: true
sidebar: Docs
tags: ['experimentation', 'feature flags']
---

Sometimes a you may be unsure if a change you're making to your [Framer](https://www.framer.com/) website will actually improve your user experience or conversion rate. This is where [A/B testing](/ab-testing) is helpful. It enables you to test and compare your changes so that you can be confident your improvements are working.

This tutorial shows you how to set up A/B tests with Framer and PostHog to get the most out of your website.

## Adding PostHog to your Framer site

First, [sign up to PostHog](https://app.posthog.com/signup). Then, go to your [project settings](https://app.posthog.com/settings/project) and copy your web snippet:

![PostHog web snippet](../images/tutorials/framer-ab-tests/web-snippet.png)

With the snippet copied, go to your Framer project and click the gear in the top right to go to your site settings. If you haven’t already, sign up for the "Mini" site plan. This enables you to add custom code.

Go to the "General" tab in site settings and scroll down to the "Custom Code" section. Under "End of <head> tag", paste your PostHog snippet there. Make sure to press "Save" next to custom code.

![Script](../images/tutorials/framer-analytics/script.mp4)

## Adding a custom event

We're going to create an A/B test comparing how the text of a button affects it's click-through rate.

To do this, first we'll create a button using [custom code components](https://www.framer.com/developers/#code-components) and then [capture an event](/docs/product-analytics/capture-events) whenever the button is clicked. We'll use this event as our goal metric for our A/B test.

Go to the "Assets" tab in the top left of your Framer project. Then, click the plus icon next to the "Code" tab. This will show a pop up to create a new code file. Name the file CaptureButton, set it as a "New component" and press "Create."

In the new code file, delete the existing code and replace it with the following:

```js
export default function CaptureButton() {
    const handleClick = () => {
        window.posthog.capture("clicked_homepage_button", {
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

Press Cmd/Ctrl + S to save your changes. Then press the "Home" button to go back to the home page. Add your new 
CaptureButton to your page by dragging it from the Code tab.

// Todo addd video

Publish your site and then click your new button to see the event captured in PostHog.

// Todo add photo of data management tab



## Create an A/B test in PostHog

The next step is to set up an experiment. Experiments are what we call A/B tests in PostHog

Go to the [Experiments tab](https://app.posthog.com/experiments) in PostHog and click "New experiment". Add the following details to your experiment:

1. Name your experiment "Home button experiment".
2. Set "Feature flag key" to `home-button-test`.
3. Under the experiment goal, select the `clicked_homepage_button` we created in the previous step.
4. Use the default values for all other fields.

Click "Save as draft".

// Add screenshot of experiment set up 

## Implement the A/B test in Framer

The final step is to add the experiment code in Framer. Go back to the code file for `CaptureButton`. Here we'll add code that does the following:

1. Fetch the `home-button-test` flag to see whether a user has been assigned to the `control` or `test` group.
2. Check the value Change the title of the button based on the value of the `home-button-test` flag.

To do this, we'll add a script. Go to settings and under `start of <body> tag` add:

```js
<script>
  posthog.onFeatureFlags(() => {
   const button = document.getElementById('capture-button')
   if (button) {
      const flagValue = posthog.getFeatureFlag('home-button-test')
      if (flagValue === 'control') {
        button.text = "This is the title for CONTROL group"
      } else if (flagValue === 'test') {
         button.text = "This is the title for TEST group"
      }
   }
  });
</script>
```

Update the code in `CaptureButton.tsx` to the following:

```js
// You need to include the script tags
<script>
  posthog.onFeatureFlags(() => {
    if (posthog.getFeatureFlag('cta') == 'test') {
      const button = document.getElementById('main-cta')
      if (button) {
        button.text = "Cool new CTA"
      }
    }
  });
</script>

export default function CaptureButton() {
    const handleClick = () => {
        window.posthog.capture("clicked_homepage_button", {
            $set_once: { clicked_homepage_button: true },
        })
    }

    return <button onClick={handleClick}>Click me</button>
}
```

Once you do this, go back to PostHog and click "Launch" on the experiment. When you publish the changes and reload your Webflow page, there should be a 50% chance you see the new CTA. If not, add `posthog.featureFlags.override({'cta': 'test'})` to the custom code you just added (but don’t forget to remove it). You can check the variations in incognito windows in your browser.

![CTA changed](../images/tutorials/webflow-ab-tests/cta.png)

Once you launch this experiment, PostHog automatically tracks the results and make a suggestion about which variation performs best. It uses the goals you set in the experiment to decide this. 

Now that you set up an A/B test in Webflow with PostHog, you can use this same pattern to run experiments and A/B tests throughout your site. Happy testing!

## Launching and viewing results

Go back and click launch.

## Further reading

- [How to run Experiments without feature flags](/docs/experiments/running-experiments-without-feature-flags)
- [How to set up Webflow analytics and session recordings with PostHog](/tutorials/webflow)
- [What to do after installing PostHog in 5 steps](/tutorials/next-steps-after-installing)