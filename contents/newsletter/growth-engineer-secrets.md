---
title: The secrets of growth engineers
date: 2024-09-16
author:
 - ian-vanagas
featuredImage: >-
featuredImageType: full
tags:
  - Engineering
crosspost:
  - Product engineers
  - Founders
  - Blog
---

From the outside, it can seem like growth engineers are bouncing around the product: signup flows, product onboarding, revenue reporting, and subscription tracking. You might think all this doesn't matter, but as many growth teams show, incremental improvements can lead to massive gains for the entire business.

Growth engineers capture these gains through their unique way of thinking and working. Luckily, you don't need to go to growth engineer school to learn this yourself. If you aspire to create a successful product and business, you should care about what growth engineers do to make that happen, and this post aims to help you do just that.

## 1. Being data-driven is a cliche, but it's also a way of life

Everyone claims they are data-driven, but growth engineers prove it.

![GROWTH ENGINEER RONNIE](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_09_16_at_11_21_09_29ee4dbab8.png)

Their work revolves around the core metrics they care about. These are platform or business-level metrics like signup conversion, activation, subscription conversion, revenue growth, user engagement, retention, and more. Their work comes down to tracking and improving these metrics. 

The tradeoff is caring less about products, features, roadmaps, and user requests. They let the metrics be their north star and do whatever, wherever to improve it. Instead of doing what they feel is right or the roadmap set by someone else, they work trying to improve the metrics.

> **Takeaway for software engineers:** What are the growth metrics of what you are working on? Understand your key flow [conversion](/docs/product-analytics/funnels), activation, and [retention](/docs/product-analytics/retention). You can use a framework like [AARRR](/product-engineers/aarrr-pirate-funnel) or [growth loops](/product-engineers/growth-loops) to model this.

## 2. How to develop an experimentation mindset

The big way growth engineers improve the metrics they care about is through experiments. Doing this well requires requires developing the elusive "experimentation mindset." This differs from the traditional software engineering mindset in a few ways:

1. **Pragmatism over perfection.** Growth engineers know their experiments might fail and get torn out. This means they ship the "good enough" version over the maintainable and scalable one. They know they can always improve it later.

2. **Iteration over stability.** While most engineers focus on developing stable, bug-free code, growth engineers would rather fail fast and iterate. A software engineer might feel uncomfortable adding a dependency before evaluating it, while a growth engineer will ship it to help them test faster. 

3. **Hypothesis over requirements.** Software engineers work on features users clearly need. Growth engineers work on more unknowns. They run experiments to validate their assumptions and care more about exploration and discovery. 

> **Takeaway for software engineers:** What are areas of your work that could leverage more of an experimentation mindset? Could you be more pragmatic and iterate on a hypothesis instead of just shipping the next feature on your list?

## 3. How growth engineers figure out what to work on

Engineers are like bus drivers, helping move a product along its roadmap toward success. Growth engineers are like Uber drivers, bouncing from experiment to experiment stacking little wins that payoff in the long term. 

How do they find these potential wins?

1. Start by identifying a target area. For example, product onboarding.

2. Identify a metric that represents that target area. For example, signup to dashboard creation conversion.

3. Talk to users and create hypotheses. For example, a [survey](/surveys) reveals users have trouble finding where to create their dashboard. A hypothesis could be "adding the ability to create a dashboard from a template in the onboarding flow will lead to more dashboards created."

4. Implement as small of an experiment as reasonably possible. For example, test a button that creates one of three dashboard template options, rather than a full UI.

> **Takeaway for software engineers:** What are the target areas you are trying to grow? What is the important metric for that area? Are the changes you are making impacting that metric?

## 4. How to run and evaluate experiments

When you're ready to implement your experiment, there are a few more things you need:

1. **A sufficiently large sample size of users.** This ensures you can hit statistical significance AKA your impact is better than random chance. 

2. **A long enough test duration.** As a rule of thumb, one week is a good minimum to include the variety of usage across the week. One month is a good maximum to avoid delaying shipping important changes.

3. **A list of [common mistakes](/product-engineers/ab-testing-mistakes) and how to avoid them.** These include only viewing aggregate results, not having a predetermined duration, and neglecting counter metrics. 

4. **A way to split and log participants.** You want to randomly split test and control groups as well as only log participants in your results. [Feature flags](/feature-flags) help do this.

> **Takeaway for software engineers:** Try it! [Running an experiment](/product-engineers/how-to-do-ab-testing) reveals a lot about crafting a good hypothesis, choosing a good goal metric, and evaluating results. It may even lead you to reevaluate changes you once considered obvious.

## 5. Failure is not the end of the world

For a software engineer, failure means bugs, downtime, data corruption, and many more nightmare-inducing issues. For growth engineers, it's just another day on the job.

A lot of experiments will fail. Often, a majority of experiments fail. At [Google](https://hbr.org/2017/09/the-surprising-power-of-online-experiments#:~:text=At%20Google%20and%20Bing%2C%20only%20about%2010%25%20to%2020%25%20of%20experiments%20generate%20positive%20results.), 80-90% of experiments "fail." You might think of this as a waste of time, but, at scale, 10% of successes can more than pay for all the failures. For example, an A/B test of how Bing displayed headlines boosted revenue by 12% (more than $100M at the time). 

On top of the successes, failures are also opportunities to learn. As the saying goes "it's only a failure if you fail to learn." Rapid experimentation, and the gains it provides, is only possible when you embrace failure.

> **Takeaway for software engineers:** Set up your experiments so when they fail it doesn't result in a critical failure. This helps you create situations where failure is an option so you can get more comfortable with it.

## More good reads

- [Debugging conversion problems](https://mikebifulco.com/posts/debugging-a-conversion-problem-on-my-nextjs-site) - Mike 
Mike details his ongoing work to improve newsletter conversion on his personal site.
- [A software engineer's guide to A/B testing](/product-engineers/ab-testing-guide-for-engineers) - Lior

<NewsletterForm />