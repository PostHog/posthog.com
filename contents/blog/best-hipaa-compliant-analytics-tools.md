---
date: 2022-02-16
title: The 4 best HIPAA-compliant analytics tools
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - andy-vandervell
featuredImage: ../images/blog/posthog-company-culture-blog.png
featuredImageType: full
category: General
tags:
  - Privacy
---

## What is HIPAA?

Passed in 1996, HIPAA (Health Insurance Portability and Accountability Act) defines the legal requirements for securing and handling health information, and the severe penalties for failing to do so.

Data protected under HIPAA is called [Protected Health Information](/blog/what-is-personal-data-pii) (PHI), or ePHI if it is digitized. It includes any data which can be used to identify the past, current or future health status of an individual. 

This obviously includes test results and diagnoses, but it can also cover birthdays, ethnicity, gender and other information. Even your IP address can be considered ePHI under HIPAA.

While similar in some respects to the EU's General Data Protection Regulation (GDPR), HIPAA applies specifically to companies handling the PHI of US-based customers. Companies that also need to comply with the GDPR should see our guide to [GDPR-compliant analytics](/blog/best-gdpr-compliant-analytics-tools).

There are two ways to be HIPAA-compliant while using analytics tools:

1. Self-host your analytics, so data remains totally within your control.
2. Sign a Business Associate Agreements (BAA) with a third-party analytics tool. 

## What is a Business Associate Agreement (BAA)?

Some services enable HIPAA compliance through the creation of a [Business Associate Agreement](https://www.hhs.gov/hipaa/for-professionals/covered-entities/sample-business-associate-agreement-provisions/index.html). This is essentially a contract with a service provider to ensure that they are jointly compliant and liable for services they provide. 

It's worth noting that, because BAAs expose third-parties to increased risk and scrutiny, they are often an expensive option and/or require users to purchase a higher tier of license. Some analytics tools, such as Google Analytics, don't offer BAAs and are therefore not HIPAA-compliant.

## The best HIPAA-compliant analytics tools

### 1. PostHog

- **Product analytics:** <span className="text-green text-lg">✔</span>
- **Web analytics:** <span className="text-green text-lg">✔</span>
- **Session replay:** <span className="text-green text-lg">✔</span>
- **Feature flags:** <span className="text-green text-lg">✔</span>
- **A/B testing:** <span className="text-green text-lg">✔</span>
- **Surveys:** <span className="text-green text-lg">✔</span>
- **Self-hostable:** <span className="text-green text-lg">✔</span>
- **BAA available:** <span className="text-green text-lg">✔</span>

![PostHog](../images/screenshots/hogflix-dashboard.png)

PostHog is an open-source platform that combines product analytics, session replay, feature flags, A/B testing, and user surveys into one platform. It gives you every tool you need to understand user behavior and, unlike typical analytics tools that rely on third-party integrations, all these tools work together seamlessly.

Being an all-in-one platform has two further benefits:

1. PostHog can replace multiple individual products – e.g. Mixpanel for product analytics, LaunchDarkly for feature management, etc.
2. You only need to sign one BAA to get all these tools, reducing legal complexity and risk. 

A BAA is available on PostHog's [Teams plan](/pricing), which also includes priority support and generous free usage limits for all tools – e.g. 1 million free analytics events every month. 

You can also self-host the open-source edition of PostHog, but this isn't recommended as it's provided without guarantee or support.

### 2. Mixpanel

- **Product analytics:** <span className="text-green text-lg">✔</span>
- **Web analytics:** <span className="text-green text-lg">✔</span>
- **Session replay:** <span className="text-red text-lg">✖</span>
- **Feature flags:** <span className="text-red text-lg">✖</span>
- **A/B testing:** <span className="text-red text-lg">✖</span>
- **Surveys:** <span className="text-red text-lg">✖</span>
- **Self-hostable:** <span className="text-red text-lg">✖</span>
- **BAA available:** <span className="text-green text-lg">✔</span>

![Mixpanel - hipaa analytics tools](../images/blog/open-source-analytics-tools/mixpanel.png)

[Mixpanel](https://mixpanel.com/) is a pure product analytics tool for analyzing user funnels and behavior. It doesn't offer built-in tools for things like session replay, feature management, A/B testing, or user surveys, but it does have a strong library of integrations with third-party tools. A BAA is available on Mixpanel's Growth plan, which starts at $20 per month for 10,000 events.

### 3. [Countly](https://count.ly/)

- **Product analytics:** <span className="text-green text-lg">✔</span>
- **Web analytics:** <span className="text-green text-lg">✔</span>
- **Session replay:** <span className="text-red text-lg">✖</span>
- **Feature flags:** <span className="text-red text-lg">✖</span>
- **A/B testing:** <span className="text-green text-lg">✔</span>
- **Surveys:** <span className="text-green text-lg">✔</span>
- **Self-hostable:** <span className="text-green text-lg">✔</span>
- **BAA available:** <span className="text-red text-lg">✖</span>

![Countly - open source analytics tools](../images/blog/open-source-analytics-tools/countly-screenshot.png)

Countly is an analytics platform for mobile, web, and desktop applications that also offers add-ons for remote configuration, A/B testing, and user surveys. It doesn't offer a BAA for HIPAA compliance on its hosted cloud, but it does offer the option to either:

1. Self-host the product on your own.
2. Deploy it to a private cloud managed by them.

This makes Countly a good option if you'd prefer to self-host your analytics.

### 4. Freshpaint

- **Product analytics:** <span className="text-red text-lg">✖</span>
- **Web analytics:** <span className="text-red text-lg">✖</span>
- **Session replay:** <span className="text-red text-lg">✖</span>
- **Feature flags:** <span className="text-red text-lg">✖</span>
- **A/B testing:** <span className="text-red text-lg">✖</span>
- **Surveys:** <span className="text-red text-lg">✖</span>
- **Self-hostable:** <span className="text-red text-lg">✖</span>
- **BAA available:** <span className="text-green text-lg">✔</span>

Freshpaint isn't an analytics tool per se, it's more of an analytics event tracker and customer data platform (CDP) that's specifically designed for healthcare companies. Freshpaint sits between data sources (e.g data warehouses) and third party data destinations and ensures no PHI is passed between them. This means you can continue to use non-HIPAA compliant tools, such as Google Analytics, safe in the knowledge you're not accidentally passing PHI into them.

### 5. PiwikPRO

- **Product analytics:** <span className="text-red text-lg">✖</span>
- **Web analytics:** <span className="text-green text-lg">✔</span>
- **Session replay:** <span className="text-red text-lg">✖</span>
- **Feature flags:** <span className="text-red text-lg">✖</span>
- **A/B testing:** <span className="text-red text-lg">✖</span>
- **Surveys:** <span className="text-red text-lg">✖</span>
- **Self-hostable:** <span className="text-green text-lg">✔</span>
- **BAA available:** <span className="text-green text-lg">✔</span>

PiwikPRO is commercial analytics and customer data platform spun out of the open-source analytics tool, Matomo. B