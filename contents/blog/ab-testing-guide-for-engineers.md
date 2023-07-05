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
featuredVideo: https://www.youtube-nocookie.com/embed/C2ICJbICfsg
category: Product growth
tags: 
  - Guides
  - Product metrics
---

A/B testing enables you to be confident that your product changes are having their intended effects. Rather than making decisions based on gut feeling or intuition, A/B testing provides empirical data to help you remove bias from decision making.

Companies like [Netflix](https://uxdesign.cc/how-netflix-does-a-b-testing-87df9f9bf57c), [Uber](https://www.uber.com/en-GB/blog/supercharging-a-b-testing-at-uber/) and [Booking.com](https://booking.ai/tagged/ab-testing) use A/B testing to ship hundreds of changes a day. In this blog, we'll teach you basic concepts to get you started in A/B testing and supercharge your product growth!

## How A/B testing works

In A/B testing, you first decide on a goal metric and what change you'd like to see. For example, you may to increase conversion rate, or you may want to decrease customer churn rate. Then, once you've made your code changes and are ready to test, you **randomly** split your users into two (or more) groups:

- The control group: these users will experience your product as is – without any of your new changes.
- The test group: these users will experience your product with your new changes.

You then run your A/B test for some time, usually a few days or weeks, to gather data and compare the differences in the goal metric between the different groups.

> These groups are also sometimes referred to as "variants", and A/B tests can be referred to as "experiments".

![How A/B testing works](../images/blog/ab-test-illustration.png)

## What makes a good A/B test?

There are five parts to a good A/B test:

### 1. Has a clear, measurable goal

Like "increase conversion rate by 10%", or "decrease churn rate by 5%". Without a clear goal, it can be unclear what is a successful outcome of test.

### 2. Has a clear hypothesis why your your changes will achieve your goal

This focuses your testing on what changes you're making and why.

Here's an example of a good hypothesis for a SaaS Product: "Adding a short tutorial video on the login page will increase user engagement by 30% because it will help new users understand how to use our product more effectively."

> See our blog on [A/B testing mistakes](https://posthog.com/blog/ab-testing-mistakes#7-testing-an-unclear-hypothesis) to read more on how to avoid testing an unclear hypothesis.

### 3. Tests as small of a change as *reasonably* possible 

Ideally, an A/B test should change one thing at a time. This ensures that any change in user behavior can be attributed to the variable that was changed. If multiple variables are changed, it's difficult to determine which one caused the change in behavior.

However, the caveat here is that too small of change can slow your team down. Since running A/B tests take time, if you're constantly testing small changes it may take long to ship large, meaningful changes.

A good rule of thumb to know if your change is too small is if it's unlikely to impact user behavior significantly. To help inform this decision, you can use qualitative data from user research or quantitative data from previous A/B tests.

### 4. Has a sufficiently large sample size of users

A large sample size for your test ensures the *statistical significance* of your experiment results i.e., if you can be confident that your results are not due to chance, but rather a true effect of the changes you made.

To know whether your change is large enough, you'll need to know:

1. Your current conversion rate.
2. Your "minimum detectable effect" i.e., the smallest change in the conversion rate that you want to detect. The smaller the change, the larger the sample size you'll need.
3. Your desired level of confidence (the industry standard is 95%).

You then use a [formula](https://en.wikipedia.org/wiki/Sample_size_determination) to determine if your sample size is large enough. There are many calculators online that will do this for you, so you can avoid calculating this yourself (We also include this calculator when creating a new [A/B test in PostHog](/ab-testing/features).

### 5. Has a long enough test duration

Building on the notion of ensuring statistical significant results, once you've calculated your required sample size, you'll be able to calculate how long your experiment should run for. You do this by dividing your sample size by your daily number of eligible users.

For example, if you're making changes to your signup flow and your required sample size is 1,000 new signups. If your daily number of signups is 100, then you'll need to run your experiment for `1,000 / 100` = 10 days.

Once again, there are many calculators online to help you determine your duration, and PostHog also includes this calculator when creating a new experiment.

A good rule of thumb is that your experiment duration should be between one week and one month:

- One week is a good minimum since users may behave differently on weekends or weekdays.
- One month is a good maximum since otherwise you may delay shipping important product changes.

### When not to A/B test

There's are costs and trade-offs to running A/B tests, and so it may not be a good idea to always run them. Here a few scenarios in which you may not want to run an A/B test:

- **When you lack of sufficient traffic or users, or have time constraints:** It won't be possible to gather enough data to obtain the statiscally significant results required to make good decisions.

- **When you have high implementation costs:** Sometimes it may create a lot of technical debt to support and maintain both control and test variants of your experiment.

- **When you have opportunity costs:** The time and resources it takes to implement and analyze A/B tests may be better spent working on other projects.

- **When there are ethical considerations:** It can be tempting to run A/B tests on things such as bug fixes or reliability improvements. While A/B tests can indeed verify your changes are working as expected, you should remember that your users are *real* people that are relying on your product and so you should not run a test for the sake of it. Proceed with caution when testing such changes!

In the above scenarios, it may be better to rely on qualitative feedback or user research for decision making.

## Designing your first experiment

Goal, 
Counter metrics

Example: Removing onboarding step 

* 		Implementing an A/B Test: Discuss the technical aspects of setting up an A/B test, including tools and techniques. This could also cover the role of feature flags, cookies, and session management.

Exposure logging

> Avoid overexposures


* Check up on your experiment a day or two after launch, ensure logging is what you expect etc. no crashes, Worse is that you see you’ve made a mistake with your event logging
    * Check also your exposure logging is the volume you expect, and more or less in the ratios you expect too 


How long your experiment should run for
Avoiding peeking problem

avoiding making too many changes at once

### Running multiple experiments?


### How to forumlate a hypothesis 

## Concluding an experiment

 		Analyzing A/B Test Results: Explain how to analyze the results of an A/B test, how to calculate statistical significance, and how to interpret the results.

how to calculate statistical significance - Staticscal significance

how to interpret the results - a few examples 
 - what happens if not statiscal signfiance?
 - what happens if statsical signifcant 
determining your next steps

### Q: My A/B test showed no significant difference. Is it a failure?

### Are A/B tests only for product changes?


## Best practices ?



## Different types of A/B test

## Advanced: Group level tests

Group vs User level experiments
link to blog 
