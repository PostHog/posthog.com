---
title: How to create sticky feature flags
date: 2025-06-16
author:
  - dylan-martin
showTitle: true
sidebar: Docs
tags:
  - feature flags
  - experiments
---

Sticky feature flags ensure users maintain their original variant assignment even after rollout conditions change. This is crucial for experiments where you need consistent user experiences throughout the test period, regardless of changes to targeting rules or rollout percentages.

This tutorial shows how to set up sticky feature flags in PostHog by combining person properties with feature flag conditions to guarantee consistent variant assignments.

## The problem with regular feature flags

Regular feature flags can reassign users to different variants when you modify rollout conditions. For example:

- You start an A/B experiment with 50% of users seeing variant A
- Later, you decrease it to 25% rollout
- Some users who previously saw variant A might now see variant B

This inconsistency can skew your experiment results and create a poor user experience.

## How sticky flags work

Sticky flags solve this by:

1. **Setting a person property** when a user first evaluates the flag
2. **Adding override conditions** to the flag that check for existing assignments
3. **Guaranteeing consistency** by prioritizing the stored assignment over new rollout rules

## Setting up sticky feature flags

### Step 1: Create your feature flag

First, create your feature flag in PostHog:

1. Go to [Feature Flags](https://app.posthog.com/feature_flags) and click **New feature flag**
2. Set your flag key (e.g., `sticky-experiment`)
3. Configure your initial rollout conditions
4. Save the flag

### Step 2: Capture person properties on evaluation

When evaluating the flag in your code, capture the result as a [person property](/docs/product-analytics/person-properties). Here's an example using the JavaScript SDK:

import { CalloutBox } from 'components/Docs/CalloutBox'

<CalloutBox icon="IconInfo" title="Important" type="fyi">
  
Use `$set_once` instead of `$set` to ensure the property is only set on the first evaluation and never overwritten.

</CalloutBox>

```js
// Check the multivariate feature flag for the variant value
const flagValue = posthog.getFeatureFlag('sticky-experiment')

// Option 1: Capture the assignment as a person property via event
posthog.capture('sticky_flag_evaluated', {
  $set_once: { 
    sticky_experiment_variant: flagValue 
  }
})

// Option 2: Set person property via identify
posthog.identify('distinct_id', {
  sticky_experiment_variant: flagValue ? 'test' : 'control'
})

// Use the flag value in your code
if (flagValue === 'test') {
  // Show test variant
} else {
  // Show control variant  
}
```

### Step 3: Add override conditions to your flag

Now update your feature flag to check for existing assignments:

1. Go back to your feature flag in PostHog
2. Add new release conditions **above** your existing conditions
3. Set up override rules for each variant:

**For test variant override:**

- Release condition: 100% of users where `sticky_experiment_variant` equals `test`
- Value: `true` (or your test variant value)

**For control variant override:**  

- Release condition: 100% of users where `sticky_experiment_variant` equals `control`
- Value: `false` (or your control variant value)

Keep your original rollout conditions below these overrides for new users.

The flag will now:

- First check if the user has an existing assignment (override conditions)
- If yes, return that stored value
- If no assignment exists, evaluate using your original rollout conditions

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_06_16_at_13_26_20_1248617250.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_06_16_at_13_26_39_6370387c98.png"
  alt="Flag with property-based variant overrides"
  classes="rounded"
/>

#### Example implementation

Here's a complete example using React:

```jsx
import { usePostHog } from 'posthog-js/react'
import { useEffect, useState } from 'react'

export default function StickyExperiment() {
  const [variant, setVariant] = useState(null)
  const posthog = usePostHog()

  useEffect(() => {
    // Evaluate the sticky flag
    const flagValue = posthog.isFeatureEnabled('sticky-experiment')
    
    // Set the variant state
    setVariant(flagValue)
    
    // Capture the assignment (only sets on first evaluation)
    posthog.capture('sticky_flag_evaluated', {
      $set_once: { 
        sticky_experiment_variant: flagValue
      }
    })
  }, [posthog])

  if (!variant) return <div>Loading...</div>

  return (
    <div>
      <h1>Sticky Feature Flag Demo</h1>
      {variant === 'test' ? (
        <div>🧪 You're seeing the test variant!</div>
      ) : (
        <div>📊 You're seeing the control variant!</div>
      )}
    </div>
  )
}
```

## Server-side implementation

For server-side applications, the pattern is the same:

```js
// Node.js example
app.get('/sticky-feature', async (req, res) => {
  const userId = req.user.id
  
  // Evaluate the flag
  const flagValue = await posthog.isFeatureEnabled('sticky-experiment', userId)
  
  // Set the person property
  posthog.capture({
    distinctId: userId,
    event: 'sticky_flag_evaluated',
    properties: {
      $set_once: { sticky_experiment_variant: flagalue }
    }
  })
  
  // Use the flag value in your code
  if (flagValue === 'test') {
    // Trigger test behavior
  } else {
    // Trigger control behavior
  }
})
```

## Best practices

### When to use sticky flags

Use sticky flags for:

- **A/B tests and experiments** where consistent assignment is critical
- **Personalization features** where consistency improves user experience

### When not to use sticky flags

Avoid sticky flags for:

- **Simple on/off toggles** where switching variants is acceptable
- **Emergency kill switches** where you need immediate universal changes
- **Short-term features** where the overhead isn't worth it

### Managing sticky flags

**Removing stickiness:** To stop the sticky behavior, simply remove the override conditions from your flag. Users will then be re-evaluated using your main rollout conditions.

**Cleaning up:** After your experiment concludes, you can remove the person properties if desired, though they don't impact performance if left in place.

**Property naming:** Use clear, descriptive names for your person properties like `experiment_name_variant` to avoid conflicts.

## Troubleshooting

**Flag not updating:** Person properties take a few seconds to propagate. If testing immediately after first evaluation, you might see inconsistent behavior. Wait 10-15 seconds between tests.

## Further reading

- [How to do holdout testing](/tutorials/holdout-testing)
- [How to do a phased rollout](/tutorials/phased-rollout)
- [Feature flag best practices and tips](/docs/feature-flags/best-practices)

<NewsletterForm />