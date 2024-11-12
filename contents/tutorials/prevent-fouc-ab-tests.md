---
title: How to prevent flashing of content during A/B tests
date: 2024-11-08
author:
  - daniel-bachhuber
showTitle: true
sidebar: Docs
tags:
  - experimentation
---


Flashing of content (also known as [FOUC – Flash of Unstyled Content](https://en.wikipedia.org/wiki/Flash_of_unstyled_content)) happens when users briefly see the control variant before the test variant loads. It's a common issue when running experiments on the frontend.

If you're unable to [bootstrap the feature flags into the document](/docs/feature-flags/bootstrapping), which generally requires access to server-side code, the best thing you can do is briefly delay the page from displaying until the experiment code executes.

Here's a short example as to how you might do this.

## 1. Prevent the page from displaying

First, you'll need to prevent the page from displaying while the PostHog JavaScript library loads.

Before the `</head>` tag, add the following CSS definition:

```html
<style>
.ph-hide-element {
    opacity: 0 !important;
}
</style>
```

This code snippet defines a new CSS rule that applies 0 opacity to any element with a `ph-hide-element` class. You might want to add it after the PostHog web snippet so you remember why it's there.

Then, immediately after the `<body>` tag, add the following JavaScript:

```html
<script>
(function() {
    document.body.classList.add('ph-hide-element');
}())
</script>
```

This code snippet applies the `ph-hide-element` class to the `<body>` element, thus hiding the entire contents of the page. If you have direct access to the `<body>` element, you can also simply add the `ph-hide-element` class to the element and avoid the JavaScript.

Refresh the page and verify the content doesn't display. If you see a white screen of joy, you have successfully completed this first step.

## 2. Display the page once the feature flags are loaded

Next, you'll need to ensure the page is displayed once the feature flags are evaluated.

If your experiment changes the contents of the page, you'll want to add the following JavaScript immediately before the closing `</body>` tag:

```html
<script>
posthog.onFeatureFlags(() => {
    var variant = posthog.getFeatureFlag('ahhhh-fouc-test')
    if ( 'test' === variant ) {
        // if needed, update your page for the test variant. 
        // this is not needed if you update your code elsewhere.
    }
    // Need to make sure we always display the page.
    document.body.classList.remove('ph-hide-element');
});
</script>
```


Refresh the page and verify the content now displays after a brief pause.