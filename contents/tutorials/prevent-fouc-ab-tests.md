---
title: How to prevent flashing of content during A/B tests
date: 2024-11-13
author:
  - daniel-bachhuber
showTitle: true
sidebar: Docs
tags:
  - experimentation
---

> 🚧 **Note:** As an alternative to the approach described below, we're experimenting with client-side feature flag assignments. Check out our [fast feature flag minisite](https://posthog-fast-feature-flags.vercel.app/) to learn more. 
>
> We are keen to gather as much feedback as possible so if you try this out please let us know. You can email [daniel.b@posthog.com](mailto:daniel.b@posthog.com), send feedback via the [in-app support panel](https://us.posthog.com#panel=support%3Afeedback%3Aexperiments%3Alow), or use one of our other [support options](/docs/support-options).

Flashing of content (also known as [FOUC – Flash of unstyled content](https://en.wikipedia.org/wiki/Flash_of_unstyled_content)) happens when users briefly see the control variant before the test variant loads. It's a common issue when running experiments on the frontend.

If you're unable to [bootstrap feature flags in your app](/docs/feature-flags/bootstrapping), which generally requires access to server-side code, the best thing you can do is briefly delay the page from displaying until the experiment code executes.

Here's a short example as to how you might do this.

## 1. Prevent the page from displaying

First, you'll need to prevent the page from displaying while the PostHog JavaScript library loads.

Before the `</head>` tag, add the following CSS definition:

```html
<style>
/* Used to prevent flickering while posthog.js loads */
.ph-hide-element {
    opacity: 0 !important;
}
</style>
```

This code snippet defines a new CSS rule that applies 0 opacity to any element with a `ph-hide-element` class.

Then add the class to the element you want to hide:
```html
<div class="ph-hide-element">
```

Alternatively, you can hide the entire page by adding the class to the `<body>` element. If you don't have direct access to this element, you can add the below JavaScript:
```html
<script>
(function() {
    document.body.classList.add('ph-hide-element');
}())
</script>
```

Refresh the page and verify the content doesn't display. If you see a blank element, or an entire white screen of joy, you have successfully completed this first step.

## 2. Display the page once the feature flags are loaded

Next, you need to ensure the page is displayed once the flags have been loaded for your A/B test.

Add the following code before the closing `</body>` tag:

```html
<script>
// Renders the content after posthog.js loads
posthog.onFeatureFlags(() => {
    var variant = posthog.getFeatureFlag('your_experiment_feature_flag')
    if ( 'test' === variant ) {
        // if needed, update your page for the test variant. 
        // this is not needed if you update your code elsewhere.
    }
    // Need to make sure we always display the hidden element.
    var elements = document.querySelectorAll('.ph-hide-element');
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove('ph-hide-element');
    }
});
</script>
```

Refresh the page and verify the content now displays after a brief pause.