---
title: Multivariate testing, explained
date: 2023-11-07
author: ["liorn"]
showTitle: true
rootpage: /blog
sidebar: Blog
hideAnchor: true
featuredImage: ../images/blog/posthog-company-culture-blog.png
featuredImageType: full
category: Engineering
tags:
  - Guides 
  - Explainers
  - Growth engineering
  - Product engineers
  - AB testing
---

## What is multivariate testing

Multivariate testing is when you test multiple variables to determine which combination performs the best. 

For example, let's say you want to test how both the color and placement of a button affect your conversion rate. You would then create four different variants to test:

1. The control variant.
2. The variant with only the color changed.
3. The variant with only the placement changed.
4. The variant with both the color and the placement changed.

The results from the multivariate test would show not only which variant performs the best but also how each variable affected the outcome.

It's similar to [A/B testing](/ab-testing), except in A/B testing you're only testing two different variants.

![A/B testing vs multivariate testing](../images/blog/multivariated-testing-explained/ab-vs-mvt.png)

## Benefits

### 1. It saves you time

Testing multiple combinations at the same time means you don't have to wait for many consecutive tests to finish. This would be the case if you were to run your tests using A/B tests, since you'd have to wait for each test before starting a new one.

### 2. It uncovers interactions between variables

Multivariate testing is not just about looking at which combination is the best; it's about understanding the weight each variable had in that success. This provides insights into understanding your holistic user experience.

For example, let's say you're testing changes to the user dashboard of a B2B SaaS app. You decide to test how both the position of the navigation menu and the text of the buttons affect user engagement.

In isolation, changing the button texts might affect how well users understand how to use your product. Similarly, moving the navigation menu from the top to the side could influence their ability to navigate efficiently.

However, when you test these variables together, you may discover that their combined effect is much greater than each individual change.

Multivariate testing enables you to uncover insights like these.

## Drawbacks

### 1. You need a larger sample size

Since you split your participants into many groups, you need a larger sample size for a [statistically significant](/docs/experiments/significance) result. In practice, this means multivariant tests need to for run longer than a typical A/B test.

With this in mind, a good idea is to [calculate your required sample size](/product-engineers/ab-testing-guide-for-engineers#4-a-sufficiently-large-sample-size-of-users) before running your test so that you can ensure your test duration is reasonable.

If your duration is too long, but you'd still like to run a multivariant test, there are two potential solutions:

1. **Target proxy metrics** – e.g., if your goal is to increase conversion, instead target a metric higher up the funnel, like number of signups.

2. **Use [surveys](/surveys)**. It's often easier to ask your users about their experience instead of guessing it from metrics. Survey responses can help decision-making when statistical significance is difficult to achieve.

### 2. Multivariant tests require more effort

Because you have many different variants, multivariant tests are more complex. They require more code, generate more data, and need more time to analyze results. 

For example, if you have three variables and two possible variations for each, you need to create six different versions of your feature to test. Then, you need to analyze the results of each one. A huge effort!

Multivariant tests can generate great insights, but they also use up more of your team's resources.

## Multivariant vs A/B tests

Here is a table summarizing the differences between the multivariant and A/B tests:

| Situation | A/B Testing | Multivariate Testing |
|-----------|-------------|----------------------|
| **# of variants** | Two | Three or more |
| **Complexity** | Low | High
| **Sample size required**| Smaller  | Larger |
| **Duration** | Shorter | Longer |
| **Clarity of results** | Easier to interpret results. | Results may be more difficult to interpret due to multiple variables. |
| **When to Use** | When you have a clear hypothesis about one variable. <br/><br/> When decisions need to be made quickly. <br/><br/>  When the test is straightforward. | When you want to explore how multiple variables interact. <br/><br/> When you can afford a longer test duration. <br/><br/> When you have enough users to reach statistical significance. |

## How to implement multivariate tests in PostHog

Now that you know all about multivariant testing, here's how you implement them in PostHog:

1. Start by [creating an experiment](/docs/experiments/creating-an-experiment) in PostHog.
2. In the "Experiment variants" section, add your variant's by clicking "+ Add test variant"
3. Fill out the remaining fields, such as feature flag key, goal metric, and any other details.
4. Click "Save as draft".
5. Add the [experiment code](/docs/experiments/adding-experiment-code) to your app by customizing the user experience for each variant.
6. [Launch your experiment](https://posthog.com/docs/experiments/testing-and-launching).

![Creating multivariant tests in PostHog](../images/blog/multivariated-testing-explained/multiple-variants-in-posthog.png)

## Further reading

- [8 annoying A/B testing mistakes every engineer should know](/product-engineers/ab-testing-mistakes)
- [Guardrail metrics for A/B tests, explained](/product-engineers/guardrail-metrics)
- [How YC's biggest startups run A/B tests (with examples)](/product-engineers/ab-testing-examples)
