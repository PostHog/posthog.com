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

It's cruel enough to subject your visitors to an A/B test, but it's even worse if they know about it!

The "Flash of Unstyled Content" (FOUC) happens when users briefly see the control variant before the test variant loads. It's a common issue when running experiments on website building platforms, and happens when the control variant briefly renders before the test variant loads.

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
        var headings = document.querySelectorAll('h1');
        if ( headings && headings[0] ) {
            headings[0].innerText = "Here's Max!"
        }
    }
    // Need to make sure we always display the page.
    document.body.classList.remove('ph-hide-element');
});
</script>
```

This code snippet modifies the text of the first `<h1>` to "Here's Max!" when the visitor is assigned to the 'test' variant of the 'ahhhh-fouc-test' experiment. Make sure to replace 'ahhhh-fouc-test' with whatever alphanumeric slug you've assigned to your experiment.

Refresh the page and verify the content now displays after a brief pause. If you end up with the 'test' variant on the first load, go buy a lottery ticket! Otherwise, you can run `posthog.featureFlags.override({'ahhhh-fouc-test': 'test'})` in your Developer Console and refresh the page.