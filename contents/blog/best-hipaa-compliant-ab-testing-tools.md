---
date: 2024-03-04T00:00:00.000Z
title: The best HIPAA-compliant A/B testing tools
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - andy-vandervell
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/open-source-testing-tools/testinghog.png
featuredImageType: full
category: General
tags:
  - Privacy
---

What do [Optimizely](/blog/posthog-vs-optimizely), Convert, and Webtrends Optimize have in common?

1. They're popular A/B testing tools
2. None of them are HIPAA-compliant

And, while it's tempting to live without A/B testing for your healthcare product, doing so is like trying to navigate an ocean by sailing roughly in the correct direction. You'll probably arrive somewhere, but it won't be where you intended.

## What you need for HIPAA compliance

You need to comply the [Privacy Rule](https://www.hhs.gov/ocr/privacy/hipaa/administrative/privacyrule/index.html) and the [Security Rule](https://www.hhs.gov/ocr/privacy/hipaa/administrative/securityrule/index.html). Breaching either can result in hefty financial penalties, but for the sake of this guide we're mostly interested in how the Privacy Rule impacts analytics and A/B testing.

There are three ways to comply with the Privacy rule when adopting analytics and testing tools:

1. **Anonymize all PHI and identifiers:** There are two so-called "[De-identification Standards](https://www.hhs.gov/hipaa/for-professionals/privacy/special-topics/de-identification/index.html#standard)" – "Expert Determination," where an expert verifies that data isn't personally identifiable, and "Safe Harbor" where all 18 types of identifier are removed. The former is preferable simply because applying the Safe Harbor approach can render data effectively useless for analytical purposes.

2. **Sign a BAA with a third-party tool:** You must sign a Business Associate Agreement (BAA) with any third-party platform that handles your protected health information (PHI). This can mean signing multiple agreements, though, such as one with your analytical partner, but also any tools you use for importing and exporting data from your data warehouse.

3. **Self-host and keep control of all your data:** The less common is to self-host tools for analytics and experimentation on your own infrastructure. This reduces the number of BAAs and general legal wrangling needed to generate user insights. The only downside is you'll need the expertise to manage self-hosted instances, or third-party support to do so, and you are wholly liable for any security breaches.

These are the broad principles, but **please consult an expert** before making any final decision on how to implement tools in compliance with HIPAA. 

## The best HIPAA-compliant A/B testing tools

### 1. PostHog

![PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/screenshots/ab-testing.png)

#### Features

- **Product analytics:** <span className="text-green text-lg">✔</span>
- **Web analytics:** <span className="text-green text-lg">✔</span>
- **Session replay:** <span className="text-green text-lg">✔</span>
- **Feature flags:** <span className="text-green text-lg">✔</span>
- **A/B testing:** <span className="text-green text-lg">✔</span>
- **Surveys:** <span className="text-green text-lg">✔</span>
- **Self-hostable:** <span className="text-green text-lg">✔</span>
- **BAA available:** <span className="text-green text-lg">✔</span>

#### Summary

[PostHog](https://posthog.com/) is an open source all-in-one platform that combines A/B testing with product analytics, session replay, feature management, and user surveys – everything you need to understand user behavior. All these tools are seamlessly integrated and, because you get everything in one, you only need to sign one BAA for all your analytics needs.

PostHog offers a BAA on its Teams plan, which starts at $450 and includes [generous monthly free allowances](/pricing), such as 1 million analytics events every month. You can also self-host the open-source edition for free, though this isn't recommended as it's provided without support or guarantee. 

### 2. Kameleoon

![kameleoon](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/hipaa-compliant-ab-testing/kameleoon.png)

#### Features

- **Product analytics:** <span className="text-red text-lg">✖</span>
- **Web analytics:** <span className="text-red text-lg">✖</span>
- **Session replay:** <span className="text-red text-lg">✖</span>
- **Feature flags:** <span className="text-green text-lg">✔</span>
- **A/B testing:** <span className="text-green text-lg">✔</span>
- **Surveys:** <span className="text-red text-lg">✖</span>
- **Self-hostable:** <span className="text-red text-lg">✖</span>
- **BAA available:** <span className="text-green text-lg">✔</span>

#### Summary

[Kameleoon](https://vwo.com/) is an A/B testing and personalization platform. It supports A/B and [multivariate testing](/product-engineers/what-is-multivariate-testing-examples), and feature flags for managing the rollout of new features and running tests. In addition to testing, it has a real-time personalization engine that's particularly useful for e-commerce. It doesn't have any deeper analytics features, so you'll need to run it alongside another [HIPAA-compliant analytics tool](/blog/best-hipaa-compliant-analytics-tools) to gather deeper user behavior data.

Kameleoon doesn't publish pricing publicly, but conversion optimization consultants BrillMark [reports](https://www.brillmark.com/kameleoon-ab-testing-platform/#:~:text=The%20yearly%20licensing%20pricing%20for,pay%20for%20the%20annual%20license) pricing starts at $35,000 per year and scales based on traffic volume, making it a premium option.  

### 3. VWO

![vwo testing](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/hipaa-compliant-ab-testing/vwo-testing.png)

#### Features

- **Product analytics:** <span className="text-red text-lg">✖</span>
- **Web analytics:** <span className="text-green text-lg">✔</span>
- **Session replay:** <span className="text-green text-lg">✔</span>
- **Feature flags:** <span className="text-green text-lg">✔</span>
- **A/B testing:** <span className="text-green text-lg">✔</span>
- **Surveys:** <span className="text-green text-lg">✔</span>
- **Self-hostable:** <span className="text-red text-lg">✖</span>
- **BAA available:** <span className="text-green text-lg">✔</span>

#### Summary

[VWO](https://vwo.com/) is best known as an A/B testing platform for e-commerce websites and mobile apps, though it also offers basic session replay and analytics tools as part of its myriad pricing tiers. A/B testing features includes support for multi-armed bandit, a visual editor, and advanced targeting options, such as targeting based on screen resolution.

Unlike most tools in this list, VWO charges separately for website and mobile apps based on monthly tracked users (MTUs) for both, so it can get expensive quickly if you need both. VWO offers a BAA when you pay for the Security Plus Add-on ($529 per month).

### 4. LaunchDarkly

![LaunchDarkly mobile app A/B tests](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/best-mobile-app-ab-testing-tools/launch-darkly.png)

#### Features

- **Product analytics:** <span className="text-red text-lg">✖</span>
- **Web analytics:** <span className="text-red text-lg">✖</span>
- **Session replay:** <span className="text-red text-lg">✖</span>
- **Feature flags:** <span className="text-green text-lg">✔</span>
- **A/B testing:** <span className="text-green text-lg">✔</span>
- **Surveys:** <span className="text-red text-lg">✖</span>
- **Self-hostable:** <span className="text-red text-lg">✖</span>
- **BAA available:** <span className="text-green text-lg">✔</span>

#### Summary

LaunchDarkly is primarily a feature management platform for controlling what users see and when, and managing the rollout of new features. However, it also offers an experimentation suite, albeit as a paid add-on.

As a tool designed for engineers, LaunchDarkly supports running experiments on the front and back end. This enables engineers to run experiments to measure the performance impact of API and infrastructure changes, for example. 

## FAQ

### Who does HIPAA apply to?

HIPAA applies to "covered entities," such as healthcare providers who transmit any health information in electronic form, health plans, and healthcare clearinghouses. Mobile apps fall under HIPAA if they store protected health information (PHI), and share it with any covered entity. 

HIPAA also applies to "business associates," which, according to the [US Department of Health and Human Services](https://www.hhs.gov/hipaa/for-professionals/covered-entities/sample-business-associate-agreement-provisions/index.html), are "a subcontractor that creates, receives, maintains, or transmits protected health information on behalf of another business associate."

Under HIPAA, the A/B testing tools in this guide would all be considered business associates.

### What is PHI (Protected Health Information)?

Protected Health Information (PHI) is any information about health status, provision of healthcare, or payment for healthcare that can be linked to an individual. 

This includes medical records, laboratory results, billing information, and any other information that identifies an individual and relates to their past, present, or future physical or mental health condition, treatment, or payment for healthcare services.

### Is self-hosting better than signing a BAA?

There's no objective correct answer here. In theory, self-hosting is preferable as it means you don't share any data with third-parties (business associates), and thus you don't need to sign a BAA.

But self-hosting also presents additional risks. You're wholly liable for ensuring your A/B testing infrastructure is secure, which can be challenging if you don't have the internal expertise to manage this. If this is the case, it may be better to rely on a HIPAA-compliant business associate who has experience hosting analytics at scale.
