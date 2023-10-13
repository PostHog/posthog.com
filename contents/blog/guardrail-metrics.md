---
title: An introduction to guardrail metrics for A/B tests
date: 2023-10-13
author: ["ian-vanagas"]
showTitle: true
rootpage: /blog
sidebar: Blog
hideAnchor: true
featuredImage: ../images/blog/green-blog-image.jpg
featuredImageType: full
category: Engineering
tags:
 - Guides
 - Explainers
---

## What are guardrail metrics?

An [A/B test](/blog/ab-testing-guide-for-engineers) uses a single, goal metric to compare two variants and pick a winner that improves your product. The problem with focusing on a single metric is that it hides the impacts on other metrics. A change improving one part of the product can negatively affect another part, or worse, hurt the entire product.

To help prevent this, teams rely on guardrail metrics when running A/B tests. These are secondary metrics that help protect other parts of the product and the overall experience. They are metrics you don’t want your changes to hurt because they represent key areas of the product.

Guardrail metrics act as an early warning system for A/B tests. When they hit a negative threshold, teams do more analysis to decide what is causing the negative impact and if they should pause the experiment (using [session replays](/tutorials/explore-insights-session-recordings) is a great way to do this).

> **Secondary vs guardrail metric:** Guardrail metrics are a subset of secondary metrics. A secondary metric is a non-goal metric you monitor for either positive or negative impacts in A/B tests. Guardrail metrics generally monitor for **negative** impacts.

## Why use guardrail metrics?

Guardrail metrics enable you to protect your overall experience and key metrics while optimizing parts of your product with A/B tests.

As a developer, using guardrail metrics provides benefits like:

- More confidence A/B tests aren’t causing problems. You spend less time checking for the negative impact of an experiment.

- A more accurate source of issues than bug reports or general metrics. Developers don’t need to guess if an A/B test is causing an issue, guardrail metrics can tell them.

- More confidence in the results of the experiment knowing it doesn’t have broader negative effects.

- Promoting a culture of experimentation knowing A/B tests are safer to do. Creates trust between teams knowing other teams’ A/B tests won’t affect them.

### Case study: Airbnb

[Airbnb](https://medium.com/airbnb-engineering/designing-experimentation-guardrails-ed6a976ec669) relies on guardrails to enable teams to run A/B tests while keeping the overall experience strong. They found A/B tests often positively impact one team’s metrics, while negatively impacting another. For example, if they didn’t display house rules, they saw an increase in bookings but a decrease in ratings.

When a guardrail metric triggers, it escalates and stakeholders decide whether to continue the test or not. Guardrails at Airbnb flag ~25 experiments per month for review. 80% of these eventually launch after stakeholder discussion. They stop ~5 per month before launch, which means they prevent 5 potential negative impacts.

![](../images/blog/guardrail-metrics/trigger.png)

## How to choose guardrail metrics

As a general guideline, you should pick metrics important to the entire product or company. These are often [north star](/blog/north-star-metrics) or [product health](/blog/product-health-metrics) metrics. Airbnb breaks guardrail metrics into three categories:

- Key business metrics
- User experience metrics
- Strategic priority metrics

You need a mix of metrics from each category to ensure you don't miss potential issues. Just remember that each guardrail metric you add also increases the likelihood of false positives. 

For example, an [A/A test](/tutorials/aa-testing) with 3 guardrail metrics, and a significance level of 0.05, would cause a false alert approximately 14% of the time. The risk increases to 40% with 10 guardrail metrics, and a massive 73% with 25 guardrail metrics.

More false positives means you run fewer tests, limiting the pace of improvements. 

### Example guardrail metrics

Potential guardrail metrics include clickthrough rate, active users, customer lifetime value, and pageviews. Here are some real-world examples:

- [Airbnb](https://medium.com/airbnb-engineering/designing-experimentation-guardrails-ed6a976ec669): revenue, bounce rate, page load speed, seats booked for experiences.

- [Square](https://developer.squareup.com/blog/lessons-learned-from-running-web-experiments/): bottom of funnel conversion, page load speed

- [Bing](https://exp-platform.com/Documents/2017-08%20KDDMetricInterpretationPitfalls.pdf): page load time, page returns

- [Netflix](https://www.adventuresinwhy.com/pdf/beyond_ab_testing.pdf): sample mismatch ratio, engagement, retention, conversion.

To help pick a metric, it's useful to know which secondary metrics have stopped experiments in the past. These are your company's [revealed preference](https://en.wikipedia.org/wiki/Revealed_preference) for guardrail metrics and likely make good choices to formalize.

##  Implementing guardrail metrics in PostHog

Now that you know all about guardrail metrics, it’s time to implement them in your A/B tests. 

1. Create an experiment in PostHog.

2. Fill out the key name, variants, goal metric, and any other details. Adding details about the guardrail metrics to the description is useful.

3. Under "secondary metrics," click "Add metric," and set up the trend or funnel you want as a guardrail. 

4. Click "Save," implement the experiment in your app, and press "Launch."

5. Guardrail metrics display alongside your goal metrics on the experiment detail screen.

Another way to track guardrail metrics is by creating them as an insight or dashboard. This enables you to completely customize your guardrail metrics as well as reuse them across experiments. You can then send them to your email or Slack with a [subscription](/docs/product-analytics/subscriptions). 

Once you’ve done this, you have everything you need for safer, more effective A/B tests set up.

## Further reading

- [What you can learn from how GitHub and GitLab use feature flags](/blog/github-gitlab-feature-flags)
- [How YC's biggest startups run A/B tests (with examples)](/blog/ab-testing-examples)
- [Why you should decouple deployment from release (and how)](/blog/decouple-deployment-from-release)