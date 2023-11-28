---
date: 2022-09-07
title: The best HIPAA-compliant A/B testing tools
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

What do Google Optimize, [Optimizely](/blog/posthog-vs-optimizely), Convert, Webtrends Optimize and Splitbee have in common?

1. They're popular A/B testing tools
2. None of them are HIPAA compliant

Anyone who develops a healthcare product or app will be painfully familiar with this problem. Most of the mainstream tools either won't support you, or will charge you a fortune to agree to signing a BAA (Business Associate Agreement).

While it's tempting to make do without experimentation capability in your stack, that's a mistake. It's nearly impossible to eliminate second- and third-order effects without a robust testing system, and a good testing product will allow you to target specific user properties, so you get actionable results.

In this guide we'll outline your best options for HIPAA-compliant A/B testing, and the requirements for remaining HIPAA-compliant while using these and other analytics tools. 

## HIPAA compliance in A/B testing

Within HIPAA, you need to follow the [Privacy Rule](https://www.hhs.gov/ocr/privacy/hipaa/administrative/privacyrule/index.html) and the [Security Rule](https://www.hhs.gov/ocr/privacy/hipaa/administrative/securityrule/index.html). Breaching either can result in hefty financial penalties, but for the sake of this guide we're mostly interested in the how the Privacy Rule impacts analytics and A/B testing.

Within the Privacy Rule framework, there are three different ways to comply with HIPAA when adopting user analytics and experimentation tools:

1. **Anonymize all PHI and identifiers:** This is an obvious starting point. There are two so-called '[De-identification Standards](https://www.hhs.gov/hipaa/for-professionals/privacy/special-topics/de-identification/index.html#standard)' – 'Expert Determination', where an expert verifies that data isn't personally identifiable; and 'Safe Harbor' where all 18 types of identifier are removed. The former is preferable simply because applying the Safe Harbor approach can render data effectively useless for analytical purposes.

2. **Sign a BAA with a third-party tool:** You must sign a BAA with any third-party platform that handles your protected health information (PHI). This can mean signing multiple agreements, though, such as one with your analytical partner, but also _any_ tools you use for importing and exporting data from your data warehouse.

3. **Self-host and keep control of all your data:** The less common, but arguably most powerful option, is to self-host tools for analytics and experimentation on your own infrastructure. This reduces the number of BAAs and general legal wrangling needed to generate user insights. The only downside is you'll need the expertise to manage self-hosted instances, or third-party support to do so.

These are the broad principles, but **please consult an expert** before making any final decision on how to implement tools in compliance with HIPAA. 

## The best HIPAA-compliant A/B testing tools

### Kameleoon

![kameleoon](../images/blog/hipaa-compliant-ab-testing/kameleoon.png)

Kameleoon is an A/B testing and personalization platform. It supports A/B and [multivariate testing](/product-engineers/what-is-multivariate-testing-examples), and feature flags for managing the rollout of new features and running tests. In addition to testing, it features a real-time personalization engine that's particularly useful for e-commerce. It doesn't have any deeper analytics features, so you'll need to run it alongside another [HIPAA-compliant analytics tool](/blog/best-hipaa-compliant-analytics-tools) to gather deeper user behavior data.

#### Kameleoon and HIPAA compliance

- **Self-Hosting:** No
- **BAA Available**: Yes

Kameleoon is a cloud-only service, but it will sign a BAA for use in healthcare products.

What [Kameleoon says](https://www.kameleoon.com/en/health-insurance-portability-and-accountability-act-hipaa):

> "Our technology platform is designed to meet the Act’s requirements in areas such as password expiry rules, secure data transfer and automatic logouts. We follow clear, transparent processes in how we handle and protect data and will sign Business Associate Agreements (BAA) as part of any agreement with clients."

#### How much does Kameleoon cost?

Kameleoon doesn't publish pricing publicly, but conversion optimization consultants BrillMark [state](https://www.brillmark.com/kameleoon-ab-testing-platform/#:~:text=The%20yearly%20licensing%20pricing%20for,pay%20for%20the%20annual%20license) pricing starts at $35,000 per year and scales based on depending on traffic volume.    

### VWO

![vwo testing](../images/blog/hipaa-compliant-ab-testing/vwo-testing.png)

VWO offers a range of different products. Its testing product, VWO Testing, includes visual and code editors. You can run both A/B and multivariate tests, though the latter is limited to its Pro and Enterprise plans.

#### VWO and HIPAA compliance

- **Self-Hosting:** No
- **BAA Available**: Yes

VWO is a cloud-hosted platform only and will enter into a BAA with its users.

What [VWO says](https://vwo.com/compliance/hipaa/):

>"VWO customers who are subject to HIPAA and wish to use the VWO products with PHI must sign a BAA with VWO. Customers are responsible for ensuring that they achieve compliance with HIPAA and HITECH Act requirements. 
>
>"We adhere to the HIPAA obligations by leveraging appropriate security configuration options for all VWO products. Additionally, we make our Business Associate Agreement (BAA) available for execution by subscribers."

#### How much does VWO cost?

VWO doesn't publish its pricing publicly, but it does offer a 14-day free trial.

### Adobe Target

![adobe target](../images/blog/hipaa-compliant-ab-testing/adobe.png)

Adobe Target is part of Adobe's Experience Cloud, though it can be bought and used on its own. It supports A/B and multivariate tests, though unlike Kameleoon it doesn't offer feature flagging as it's primarily aimed at marketing teams rather than product developers. To this end, it includes a visual editor, so marketing teams can easily make changes to pages and run tests on conversion independently.

#### Adobe Target and HIPAA compliance

- **Self-Hosting:** No
- **BAA Available**: Yes

What [Adobe says](https://www.adobe.com/trust/compliance/hipaa-ready.html):

> "Adobe provides health care customers with services that are ready to accept PHI, referring to these services as HIPAA-Ready Services. These HIPAA-Ready Services have additional features and functionalities that allow for both customers, who are Covered Entities or Business Associates, and Adobe to comply with their respective HIPAA obligations. These additional features may increase your license or subscription costs."

#### How much does Adobe Target cost?

Adobe doesn't publish pricing for Adobe Target, but suffice it to say it probably won't be cheap given its typical clients are multinational corporations. As noted in its T&Cs, using its "HIPAA-Ready Service" may incur an additional cost above a normal subscription plan.

## FAQ

### What are the password requirements under HIPAA?

HIPAA requires Covered Entities and Business Associates to have policies for "creating, changing, and safeguarding passwords". Kameleoon and VWO state this means you must force users to update their passwords every 90 days, but this is based on [out of date advice](https://www.hipaajournal.com/what-are-the-hipaa-password-expiration-requirements/) first published in 2004. [Updated advice](https://www.hipaajournal.com/what-are-the-hipaa-password-expiration-requirements/) published by the National Institute of Standards and Technology in 2017 states "Verifiers SHOULD NOT require memorized secrets [passwords] to be changed arbitrarily (e.g., periodically)."

Why? It's logical, really. Research shows that, when required to change passwords frequently, users are more likely to use weaker, easy to remember passwords and make small, predictable changes than use a strong one. Anyone who's had to change their password every 30 days knows this is true already.

### What's the difference between A/B and multivariate testing?

**A/B testing** involves comparing the conversion rates of two or more different versions of the same page or user experience. Users are sent to one version or the other, and the outcomes are compared until a large enough sample has been achieved to measure the statistical significance of the results. A/B testing is sometimes called 'split testing' and you can test more than two pages, a process sometimes referred to as A/B/n testing.

**Multivariate testing** is similar to A/B testing, but it tests more page elements together to understand how they interact with each other. One would, for example, use a multivariate test to compare all the possible combinations of three different page headlines and three different CTAs (call to actions) to see which performs best. The basic process is similar to an A/B test, but instead of comparing whole page designs, you're comparing specific elements to each other.

