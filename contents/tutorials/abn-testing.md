---
title: How to set up A/B/n testing
date: 2023-08-21
author:
  - ian-vanagas
showTitle: true
sidebar: Docs
tags:
  - experimentation
  - feature flags
---

A/B/n testing is like an A/B test where you compare multiple (n) variants instead of just two. It can be especially useful for small but impactful changes where many options are available like copy, styles, or pages.

This tutorial will show you how to create and implement an A/B/n test in PostHog.

## Creating an A/B/n test

To create an A/B/n, go [experiments tab in PostHog](https://app.posthog.com/experiments):
1. Click "New experiment." 
2. Add a name and description.
3. Add feature flag key. In your code, you use this feature flag key to check which experiment variant the user has been assigned to.
4. Under "Experiment variants," click "Add test variant" twice to add two new variants. Rename the three variants if you want. 

![A/B/n experiment](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/abn-testing/experiment.png)

Fill out the rest of your details like participants, goal type, secondary metrics, and minimum acceptable improvement. Once done, click "Save as draft".

Next, we'll implement the A/B/n test in our app.

## Implementing our A/B/n test

Implementing our test requires checking the feature flag to see which experiment variant our user has been assigned to. We then add code to handle each variant. 

We will use a [Next.js](/docs/libraries/next-js) app where we already set up the `[PostHogProvider](/docs/libraries/next-js#app-router)` for this.

> Using a different library or framework? See our [experiment docs](/docs/experiments/adding-experiment-code) on how to add your code using our different SDKs.

In our a `page.js` file, we: 

1. Import `useFeatureFlagVariantKey` from `posthog-js/react`, and `useState` and `useEffect` from `react`
2. Set up a state for `mainCopy` using `useState`. 
3. Set the`mainCopy` state in a `useEffect` using the variant key value we get from PostHog.
4. Show the `mainCopy` state to users in our component.

Together, this looks like this:

```js
// app/page.js
'use client'
import { useFeatureFlagVariantKey } from 'posthog-js/react'
import { useState, useEffect } from 'react'

export default function Home() {

  const [mainCopy, setMainCopy] = useState('Welcome to our app')
  const copyVariant = useFeatureFlagVariantKey('homepage-abn')
  
  useEffect(() => {
    if (copyVariant === 'cool') {
      setMainCopy('Welcome to our cool app');
    } else if (copyVariant === 'epic') {
      setMainCopy('Welcome to our epic app');
    } else if (copyVariant === 'awesome') {
      setMainCopy('Welcome to our awesome app');
    }
  }, [copyVariant])

  return (
    <div>
      <h1>{mainCopy}</h1>
      <p>This is a page being A/B/n tested</p>
    </div>
  )
}
```

When we reload our page, we get a title based on the flag key variant. 

![Epic webpage](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/abn-testing/epic.png)

### Testing the other variants

We can check the other variants by going to the [feature flag page](https://app.posthog.com/feature_flags), searching for the key related to our experiment, and clicking on it to edit it. Scroll down to release conditions and set the **optional override** to any of the flag values. 

If you want the optional override to apply to only you, you can create another condition set and set the condition like `utm_source = awesome` then use use the link `http://localhost:3000/?utm_source=awesome` or [identify](/docs/product-analytics/identify) your user with an email and use `email = your_email@domain.com` . Finally, press save and when you go back to your app, you see the overridden flag value.

![Overriding our variant](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/abn-testing/override.png)

> **Note:** Make sure to remove the optional override before rolling out your A/B/n test to real users.

### Rolling out the winning variant

Once your experiment has concluded, you can stop it and roll out the winning variant. 

To do this, click the "stop" button on your experiment details page, go to your [feature flag page](https://app.posthog.com/feature_flags), search for the key related to your experiment, and click to edit it. Under variant keys, edit the rollout value to 100 for the winning variant and 0 for the losing ones, and press save. When you’re ready, you can remove the experiment-related code from your app too.

![Rolling out our winner](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/abn-testing/rollout.png)

## Further reading

- [How to do holdout testing](/tutorials/holdout-testing)
- [How to do A/A testing](/tutorials/aa-testing)
- [How to use Next.js middleware to bootstrap feature flags](/tutorials/nextjs-bootstrap-flags)
