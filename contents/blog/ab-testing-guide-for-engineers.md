---
date: 2023-07-04
title: "A software engineer's guide to A/B testing"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: ['lior-neu-ner']
featuredImage: ../images/blog/experiment-hog.jpg
featuredImageType: full
category: Product growth
tags: 
  - Guides
  - Product metrics
---

A/B testing enables you to be confident that your product changes are having their intended effects. Rather than making decisions based on gut feeling or intuition, A/B testing provides empirical data to help you remove bias from decision making.

This post is for software engineers who are just getting started with A/B testing. We'll teach you the basic concepts on how to run a successful test and supercharge your product growth!

We'll cover:
- [How A/B testing works](#how-ab-testing-works)
- [What makes a good A/B test?](#what-makes-a-good-ab-test)
- [How to implement a good A/B test](#how-to-implement-a-good-ab-test)
- [Monitoring your A/B test](#monitoring-your-ab-test)
- [Analyzing your results](#analyzing-your-results)
- [Frequently asked questions](#frequently-asked-questions)
- [Launch checklist](#launch-checklist)

## How A/B testing works

In A/B testing, you first decide on a goal metric and what change you'd like to see. For example, you may to increase conversion rate or decrease customer churn rate. 

With your goal in mind and your code changes ready, you **randomly** split your users into two (or more) groups:

- The control group: these users will experience your product as is – without any of your new changes.
- The test group: these users will experience your product with your new changes.

You then run your A/B test to gather data (usually a few days or weeks) and compare the differences in the goal metric between the different groups.

![How A/B testing works](../images/blog/ab-testing-guide-for-engineers/ab-test-illustration.png)

## What makes a good A/B test?

There are five parts to a good A/B test:

### 1. A clear, measurable goal

Like "increase paid conversion rate", or "decrease churn rate". This should be a *single* metric that you're aiming to improve.

Without a clear goal, it's unclear what is a successful outcome of test. For example, a bad goal is "increase user engagement", since it's unclear which metric will define success – is it daily active visitors? Total number of page views? Time spent in the app?

Your test results may show improvements in some of metrics but declinations in others, and without a precise goal, you will struggle to interpret if your test is a success or not.

### 2. A clear hypothesis why your your changes will achieve your goal

A well defined hypothesis focuses your testing and guides your decision-making by providing a framework for evaluating your results. It should include your goal metric, how you think your change will improve it, and any other important context. For example:

> User research showed that new users are not sure how to use our products. By adding a short tutorial video during onboarding, users will be understand how to use our product. As a result, we expect to see more successful interactions with our app features, a decrease in customer support queries, and a decrease in churn rate (our primary goal).

This is a good hypothesis because it enables you to break down which metrics you'll focus on in your test:

- How many users watch the video.
- What portion of the video did they view.
- Successful interactions with the app features.
- The number of customer support queries.
- Churn rate.

Then, once you've collected data with your test, you can use these metrics to analyze if your test was a success or not.

### 3. Tests as small of a change as *reasonably* possible 

Ideally, an A/B test should change one thing at a time. This ensures that any change in user behavior can be attributed to what was changed. If there are multiple changes, it's difficult to determine which one caused the change in behavior.

The caveat here is that too small of change can slow your team down. Since running A/B tests take time, if you're constantly testing small changes, it may take long to ship large, meaningful changes.

A good rule of thumb to know if your change is too small is if it's unlikely to impact user behavior significantly. To help inform this decision, you can use qualitative data from user research or quantitative data from existing logging or previous A/B tests.

### 4. A sufficiently large sample size of users

A large sample size for your test ensures the *statistical significance* of your results i.e., if you can be confident that your results are not due to chance, but rather a true effect of the changes you made.

To know whether your change is large enough, you'll need to know:

1. **The current conversion rate for your metric.** This is the percentage of users who performed the desired action (e.g., make a purchase, sign up) out of the total number of eligible users.
2. **Your "minimum detectable effect"** i.e., the smallest change in the conversion rate that you want to detect. The smaller the change, the larger the sample size you'll need.
3. **Your desired level of confidence.** The industry standard is 95%.

You then use a [formula](https://en.wikipedia.org/wiki/Sample_size_determination) to determine if your sample size is large enough. There are many calculators online that will do this for you, so you can avoid calculating this yourself (We also include this calculator when creating a new [A/B test in PostHog](/ab-testing/features)).

### 5. A long enough test duration

Building on the notion of ensuring statistical significant results, once you've calculated your required sample size, you'll be able to calculate how long your test should run for. You do this by dividing your sample size by your daily number of eligible users.

For example, if you're making changes to your signup flow and your required sample size is 1,000 new sign-ups. If your daily number of sign-ups is 100, then you'll need to run your test for `1,000 / 100 = 10 days`.

Once again, there are many calculators online to help you determine your duration, and PostHog also includes this calculator when creating a new test.

**A good rule of thumb is that your test duration should be between one week and one month:**
- One week is a good minimum since users may behave differently on weekends or weekdays.
- One month is a good maximum since otherwise you may delay shipping important product changes.

## How to implement a good A/B test

Once you're satisfied that your test meets the [criteria of a good A/B test](#what-makes-a-good-ab-test), it's time to implement it in your code. This is typically done by using [feature flags](/feature-flags/features) to randomly assign users to the control or test group, and then logging when users are exposed to their variant i.e., trigger the code path that checks the feature flag. This enables you to compare metrics in aggregate between the users in your variants.

It's absolutely **essential** to only log the users in your test who would actually be impacted by your changes. Users who aren't affected by your test should be excluded. If you include unaffected users, their unchanged behavior will mix in with your results, thereby watering down the impact and the clarity of your findings.

To do so, ensure that checking your feature flag and logging their exposure is the *absolute* last condition you check in your code: 

```
// ❌ Incorrect. Will include unaffected users
function showNewChanges(user) {
  if (posthog.getFeatureFlag('experiment-key') === 'control') {
    return false;
  }

  if (user.hasCompletedAction) {
    return false
  }

  // other checks

  return true
}
```

```
// ✅ Correct. Will exclude unaffected users
function showNewChanges(user) {

  if (user.hasCompletedAction) {
    return false
  }

  // other checks

  if (posthog.getFeatureFlag('experiment-key') === 'control') {
    return false;
  }

  return true
}
```

## Monitoring your A/B test

Once you've started your A/B test, it's a good idea to check in on it 24-48 hours after launch to ensure that everything is running correctly. Here's a list of things to check:

* Check your exposure logging. For example, that the volume of users assigned to the control and test variant is what you'd expect it to be.
* Check your event logging e.g., ensure that you're receiving all the events you expect to receive, and in the right ratios.
* Monitor crashes or error rates to ensure that your test is not causing any issues. 

Once you're sure that everything is running smoothly, try to avoid frequently checking the results until the test is finished. Checking too often can lead to reactive decisions based on incomplete data. It's usually best to wait until the test ends to make any decisions, as you'll have the best data at that point.

## Analyzing your results

Once your test has run its duration and you've collected enough data, you're ready to look at the results. What you're looking for is statistical significant change in any of the following metrics:

1. **Your goal metric.**

2. **Any secondary metrics.** These are usually metrics that are closely related to your goal metric. For example, if your goal metric is to increase paid conversions, a secondary metric may be to increase sign-ups.

3. **Any counter metrics.** These are metrics that ensure your user experience isn't degrading. For example, if your goal is to increase sign-ups, you should also verify your churn rate is not increasing.

To calculate if your results are statistically significant (without going into too much detail of the exact formula), you'll need the number of users in each variant as well as the conversion rate for each metric. You can then put these values into an [online calculator](https://abtestguide.com/calc/) to determine if they are significant.

> When you run [A/B tests](/ab-testing/features) in PostHog, we'll automatically calculate if your results are statistically significant or not.

### What if my results are not statistically significant?

This does not mean your test was a failure! It suggests that the results observed between the variants could be due to random chance rather than the change you implemented. Here are few next steps you can consider:

- **Check you gathered enough data:**  If your sample size was too small or your testing period was too short, you might need to extend the duration of your test to gather more data.

- **Consider smaller changes:** If you made a large change, it could be that smaller aspects of the change had different impacts – some positive, some negative, leading to an overall insignificant result. Consider breaking down the change into smaller parts and testing these individually.

- **Consider larger changes:** Conversely, if your change was too subtle or minor, it may not have been enough to affect user behavior. In this case, consider making a more impactful change and then testing that.

- **Review your hypothesis:** It could be that your hypothesis was not correct, and the change you made did not impact user behavior in the way you expected. Take this as a learning opportunity to gain deeper insights into your users.

- **Accept the results:** Sometimes, an insignificant result is the correct result. It tells you that the change you made didn't have the impact you thought it would. This is still a valuable insight, and helps you shipping unnecessary changes.

## Frequently asked questions

### When should you avoid running an A/B test?

There's are costs and trade-offs to running A/B tests so it may not always be a good idea to run them. Here a few scenarios in which you may not want to run an A/B test:

- **When you lack of sufficient traffic or users, or have time constraints:** It won't be possible to gather enough data to obtain the statistically significant results required to make good decisions.

- **When you have high implementation costs:** Sometimes it may create a lot of technical debt to support and maintain both control and test variants of your A/B test.

- **When you have opportunity costs:** The time and resources it takes to implement and analyze A/B tests may be better spent working on other projects.

- **When there are ethical considerations:** It can be tempting to run A/B tests on things such as bug fixes or reliability improvements. While A/B tests can indeed verify your changes are working as expected, you should remember that your users are *real* people that are relying on your product and so you should not run a test for the sake of it. Proceed with caution when testing such changes!

In the above scenarios, it may be better to rely on qualitative feedback or user research for decision making.

### Can I run multiple A/B tests at the same time?

Yes, you can run multiple A/B tests at the same time, but doing so can complicate things and should be approached with caution. It can be tricky since if tests are not completely independent, the changes being tested can affect each other.

To counteract this, you'll need a larger sample size of users. This is what enables apps like Facebook or Uber to run *thousands* of tests at the same time, since they have millions (or billions!) of users.

### Are A/B tests only for product changes?

No, you can also use A/B tests for infrastructure changes! For example, if you're considering a new caching strategy or database system, you could split your traffic between the old and new systems to see which performs better. Or perhaps you're implementing a refactor to your codebase, in this you can use an A/B test to ensure your refactor does not perform worse.

### Can I stop an A/B test as soon as the results are significant?

While it can be tempting to stop a test as soon as the results appear significant, doing so can lead to false positives. This is known as "[peeking problem](/blog/ab-testing-mistakes#3-conducting-an-experiment-without-a-predetermined-duration)": basically, the more often you check the results, the greater the chance you'll observe a false positive – a result that appears to be significant, but is actually due to random chance. 

To counteract this, predetermine your test duration (based on the [sample size required](#4-has-a-sufficiently-large-sample-size-of-users)) and to only make decisions based on the data collected during the entire duration.

## Launch checklist

Launching an A/B test requires careful planning to ensure accurate results and meaningful insights. To help you navigate this, we've put together this launch checklist:

**Before launch**

- [ ] A clear goal metric.
- [ ] A clear hypothesis.
- [ ] Secondary metrics.
- [ ] Counter metrics.
- [ ] Predefined test duration, based on sample size.
- [ ] A/B test code only includes eligible users that will be affected by the change.
- [ ] QA checks on both control and test variants.

**24-48 hours after launch:**

- [ ] Volume of users assigned to each variant is as expected.
- [ ] All logging is working correctly and in correct ratios.
- [ ] No increase in crashes or errors.

**At the end of the test duration**

- [ ] Validate or invalidate your hypothesis based on experiment data.
- [ ] Document your results and share with your team for feedback.
- [ ] Ship the code for the winning variant. Delete the code for the losing variant.


## Further reading

- [8 annoying A/B testing mistakes every engineer should know](/blog/ab-testing-mistakes)
- [When and how to run group-targeted A/B tests](/blog/running-group-targeted-ab-tests)
- [How to measure product engagement](/blog/how-to-measure-product-engagement)



