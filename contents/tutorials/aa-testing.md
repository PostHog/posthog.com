---
title: How to do A/A testing
date: 2023-07-07T00:00:00.000Z
author:
  - ian-vanagas
showTitle: true
sidebar: Docs
tags:
  - experimentation
  - feature flags
---

An A/A test is the same as an [A/B test](/docs/experiments) except both groups receive the same code or components. Since both groups get identical functionality, the goal is to **not** see a statistical difference between the variants by the end of the experiment. 

Teams run A/A tests to ensure their A/B test service, functionality, and implementation work as expected and provides accurate results. A/A tests are a way to discover broken parts of this process, and this tutorial shows you how to run one in PostHog.

> Unlike other A/B testing tools, A/A tests aren’t needed to calculate baseline conversion and sample metrics in PostHog. You can calculate those using your product data, and they are automatically when you create an experiment.

## Creating an experiment

The first step in running an A/A test is creating an experiment. You do this going to the [experiments tab](https://app.posthog.com/experiments) and clicking the "New experiment" button. Set a name, key, and experiment goal. Make sure to clarify in the name or description that it is an A/A test.

![Create an experiment](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/aa-testing/experiment.png)

If you use an absolute goal, like total pageviews, make sure to use an equal variant split (which is the default). If you use a relative goal like conversion, you can test non-equal variant splits like 25-75. To do this, edit the feature flag with the same key as your experiment, change the variant rollout, and press save.

## Implementing your A/A test

It is critical to A/A testing that you treat it like a standard A/B test. This means implementing it like any A/B test. You must call the related feature flag, set up code dependent on it, and capture the relevant goal event(s).

<MultiLanguage>

```js
'use client'
import { useFeatureFlagVariantKey } from 'posthog-js/react'
import Link from 'next/link'

export default function Home() {

  const test = useFeatureFlagVariantKey('aa-homepage') === 'test'
  const control = useFeatureFlagVariantKey('aa-homepage') === 'control'

  return (
    <>
      <h1>Welcome to the homepage</h1>
      <h2>{ test || control ? <Link href='/signup'>Sign up</Link> : ''}</h2>
    </>
  )
}
```

```python
from posthog import Posthog

posthog = Posthog(
  '<ph_project_api_key>', 
  host='<ph_instance_address>'
)
user_id = 'ian@posthog.com'

flag = posthog.get_feature_flag('aa-homepage', user_id)

if flag == 'test' or flag == 'control':
    posthog.capture(user_id, 'ran query', {'$feature/aa-homepage': flag})
    # do something...
```

</MultiLanguage>

After implementing, go back to your [experiment](https://app.posthog.com/experiments) and click "launch." Let the experiment run for a few days or weeks and monitor its metrics.

## Handling A/A test results

After running your tests, you should see the similar results for all the variants. The results should not be statistically significant, since all variants received the same treatment.

If the results are statistically significant, something is wrong. Here are some areas to check:

- **Feature flag calls:** For the specific flag, create a trend insight of unique users for `$feature_flag_called` events and make sure they are equally split between the variants. If not, there might be a problem with how you are evaluating the feature flag.

- **Watch session replays:** filter session replays for `$feature_flag_called` event with your flag or events where your experiment feature flag is active, look for differences between the variants. See: "[How to use filters + session replays to understand user friction](/tutorials/filter-session-recordings#2-filter-recordings-based-by-feature-flags)."

- **Flag implementation:** use the overrides (like `posthog.featureFlags.override({'aa-homepage': 'test'})` for each of the variants and check that the same code runs. Try accessing the code with different states (logged in vs out), browsers, and parameters.

- **Consistently identify, set properties, and group users:** if your experiment or goals depends on a user, property, or group filter, check that you are setting these values correctly before calling the flag. For example, you might not be setting a user property a flag relies on before flag evaluation.

- If none of these work, raise a [support ticket in-app](https://app.posthog.com/home#supportModal=bug%3Aexperiments).

A successful A/A test provides evidence that your experimentation process and service work correctly. It creates confidence in your future A/B test results. An "unsuccessful" A/A test uncovers important issues with your experimentation process which you can fix to improve it.

## Further reading

- [Testing frontend feature flags with React, Jest, and PostHog](/tutorials/test-frontend-feature-flags)
- [How to run experiments without feature flags](/docs/experiments/running-experiments-without-feature-flags)
- [8 annoying A/B testing mistakes every engineer should know](/blog/ab-testing-mistakes)
