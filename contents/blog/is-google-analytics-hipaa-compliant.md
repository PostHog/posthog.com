---
date: 2022-02-21
title: Is Google Analytics HIPAA compliant?
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/hipaa-compliant-product-analytics.png
featuredImageType: full
author:
  - andy-vandervell
category: General
tags:
  - Privacy
  - Explainers
---

HIPAA, which stands for the Health Insurance Portability and Accountability Act, regulates how individuals and organizations are required to secure, handle and transmit protected health information (PHI) – and the stringent penalties for failing to do so.

Put simply, you should not use Google Analytics if your business is a 'Covered Entity' or 'Business Associate' under HIPAA: **Google Analytics is not HIPAA compliant** and using it could result in a breach and substantial fines. 

This means other tools which rely on Google Analytics, such as the experimentation platform [Google Optimize](/blog/optimize-to-posthog), are also not HIPAA compliant. Read our guide to [HIPAA-compliant split testing tools](/blog/best-hipaa-compliant-ab-testing-tools) if you need an alternative to Opimize as well.

In this article, we'll explain:

1. Why Google Analytics isn't HIPAA compliant
2. Why product analytics is a better alternative
3. Why self-hosting your analytics is the best way to stay HIPAA compliant

### Common HIPAA terms explained

- **Protected Health Information (PHI):** Also known as personal health information, PHI includes any health data on an individual and any identifying information (e.g. emails, phone numbers, etc.) connected to it. IP addresses, device identifiers and URLs are among the [18 recognized identifiers](https://cphs.berkeley.edu/hipaa/hipaa18.html) 

- **Covered Entity:** A first-party organization (hospital, healthcare provider, etc.) or product (health app, website, wearable device, etc.) that collects any kind of PHI

- **Business Associate:** A third party that receives and / or manages data on behalf of a Covered Entity 

- **Business Associate Agreement:** An agreement between a covered entity and third party that handles their PHI; it ensures the Business Associate shares the same legal requirements and liability as the Covered Entity   

## Why isn't Google Analytics HIPAA compliant?

Because Google doesn't allow Covered Entities to enter into a BAA with it, as this [disclaimer](https://support.google.com/analytics/answer/6366371#zippy=%2Cin-this-article) on its website explains:

> Unless otherwise specified in writing by Google, Google does not intend uses of Google Analytics to create obligations under the Health Insurance Portability and Accountability Act, as amended, (“HIPAA”), and makes no representations that Google Analytics satisfies HIPAA requirements. If you are (or become) a Covered Entity or Business Associate under HIPAA, you may not use Google Analytics for any purpose or in any manner involving Protected Health Information unless you have received prior written consent to such use from Google.

A BAA is necessary because Google Analytics transmits data to Google-owned servers when you use it. Were you to use Google Analytics to process or transmit PHI you would be liable for investigation and a fine.

## HIPAA fines, explained

HIPAA fines operate on a sliding scale based on the severity of the breach and the total number of breaches. This means they get expensive very quickly, especially for products or businesses with large user bases. The largest HIPAA fine to date is [$16 million](https://www.hipaajournal.com/anthem-inc-settles-state-attorneys-general-data-breach-investigations-and-pays-48-2-million-in-penalties/) against health insurer Anthem.

Fines aren't limited to large businesses. In 2017, a [children's charity was fined](https://www.hhs.gov/hipaa/for-professionals/compliance-enforcement/agreements/ccdh/index.html) due to storing PHI on a third-party platform without a BAA.

## HIPAA-compliant alternatives to Google Analytics

While Google Analytics is sufficient if you just want to see what pages a user views on a website, it won't help you improve your product in a meaningful way. For that, you need product analytics.

Product analytics platforms like [PostHog](https://posthog.com/) include features like [Session Recording](https://posthog.com/product/session-recording), [Heatmaps](https://posthog.com/product/heatmaps) and [Funnels](https://posthog.com/product/funnels) that help you understand how users navigate your product — not just what they're looking at.

If you want to find [product market fit](https://posthog.com/blog/how-to-product-market-fit), your product's [North Star metric](https://posthog.com/blog/north-star-metrics) or what your [users really need](https://posthog.com/blog/how-to-work-out-what-users-need)... you need product analytics.

While there are lots options out there, we think **PostHog is the most HIPAA-compliant product analytics platform** out there.

Unlike third-party analytics options like Mixpanel or Amplitude, **PostHog is the only comprehensive product analytics platform you can self-host** on your own infrastructure. 

This is important because:

1. **Data never leaves your infrastructure:** Any time you export data out of your ecosystem, you're taking a risk. Covered Entities can be legally liable for mistakes made by their third-party Business Associates, and even when they're not the reputational risk is shared.

2. **You don't need a Business Associate Agreement:** BAAs are time-consuming and expensive, and also require frequent legal review to ensure continued compliance. Self-hosting means you don't need to enter into any additional BAAs, other than the one you should already have with your existing cloud provider.

3. **Compliance doesn't cost extra:** If you need HIPAA compliance, third-party providers will frequently demand you use a more expensive tier of their product than you really need. Customers who use PostHog as their [HIPAA-compliant analytics](https://posthog.com/blog/best-hipaa-compliant-analytics-tools) provider pay the same as customers with less stringent privacy needs.

Read our [PostHog & HIPAA compliance guide](/docs/privacy/hipaa-compliance) for more info on how to deploy PostHog correctly, or [book a demo](https://posthog.com/book-a-demo) to learn more.

> PostHog is an open source analytics platform you can host yourself. We help you build better products faster, without user data ever leaving your infrastructure.

<ArrayCTA />
