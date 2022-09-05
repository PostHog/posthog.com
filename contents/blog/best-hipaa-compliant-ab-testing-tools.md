---
date: 2022-09-05
title: "The best HIPAA-compliant A/B testing tools"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: ["andy-vandervell"]
featuredImage: ../images/blog/posthog-company-culture-blog.png
featuredImageType: full
categories: ["Guides","Privacy"]
---

What do Google Optimize, Optimizely, Convert, Webtrends Optimize and Splitbee have in common?

1. They're popular A/B testing tools
2. None of them are HIPAA compliant

Anyone who develops a healthcare product or app will be painfully familiar with this problem. Most the mainstream tools either won't support you, or will charge you a fortune to agree to signing a BAA (Business Associate Agreement).

Tempting as it might be to do without an experimentation capability in your stack, that would be a mistake. It's nearly impossible to eliminate second- and third-order effects without a robust testing system, and a good testing product will allow you to target specific user properties so you get actionable results.

In this guide we'll outline your best options for HIPAA-compliant A/B testing, and some of the requirements for remaining HIPAA compliant while using these and other analytics tools. 

## HIPAA compliance in AB testing

Within HIPAA there is the [Privacy Rule](https://www.hhs.gov/ocr/privacy/hipaa/administrative/privacyrule/index.html) and the [Security Rule](https://www.hhs.gov/ocr/privacy/hipaa/administrative/securityrule/index.html). Breaching either can result in hefty financial penalties, but for the sake of this guide we're mostly interested in the how the Privacy Rule impacts analytics and A/B testing.

Within the Privacy Rule framework, there are three different ways to comply with HIPAA when adopting user analytics and experimentation tools:

1. **Anonymize all PHI and identifiers:** This is an obvious starting point. There are two so-called '[De-indentification Standards](https://www.hhs.gov/hipaa/for-professionals/privacy/special-topics/de-identification/index.html#standard)' – 'Expert Determination', where an expert verifies that data isn't personally identifiable; and 'Safe Harbor' where all 18 types of identifier are removed. The former is preferable simply because applying the Safe Harbor approach can render data effectively useless for analytical purposes.

2. **Sign a BAA with a third-party tool:** You must sign a BAA with any third-party platform that handles your protected health information (PHI). This can mean signing multiple agreements, though, such as one with your analytical partner, but also any tools you use for importing and exporting data from your data warehouse.

3. **Self-host and keep control of all your data:** The less common, but arguably most powerful option, is to self-host tools for analytics and experimentation on your own infrastructure. This reduces the number of BAA's and general legal shenanigans needed to generate user insights. The only downside is you'll need the expertise to manage self-hosted instances, or third-party support to do so.

These are the broad principles, but **please consult an expert** before making any final decision on how to implement tools in compliance with HIPAA. 

## The best HIPAA-compliant A/B testing tools



### PostHog

IMAGE

PostHog is an all-in-one platform that includes a [fully-featured experimentation](https://posthog.com/product/experimentation-suite) suite in addition to product analytics, session recording, and a feature flag system that also powers its testing features. It supports both A/B/n and multivariate experiments, which you can target by geography, cohorts, and user properties.

PostHog is open source, which means you can inspect the code yourself and extend the product via custom integrations or apps to satisfy specific edge-case requirements. As an [all-in-one platform](https://posthog.com/product), PostHog makes it easy to create cohorts of users based on user properties, then run targeted experiments on those users alone using feature flags.

#### PostHog and HIPAA compliance

- **Self-Hosting:** Yes
- **BAA Available**: No

PostHog doesn't currently offer a BAA PostHog Cloud, so using it in compliance with HIPAA means [self-hosting it](/docs/self-host) on your own infrastructure. The [PostHog Marketplace](/marketplace) includes several third-party providers who can support self-hosted deployment, or manage your instance entirely, if you need help.

What [PostHog says](/docs/privacy/hipaa-compliance):

> "PostHog enables you to self-host on your own infrastructure and maintain full control of the data. This means you don't need to anonymize the data, nor do you need to set up a Business Associate Agreement with PostHog because you never need to send any Protected Health Information (PHI) to us in the first place. The data stays on your systems, in its original form. You may need to sign a BAA with your hosting provider, but major providers such as Google and AWS offer these for free."

#### How much does PostHog cost?

PostHog is priced on events and your [first 1 million events each month are free](/pricing). You can calculate the cost of using PostHog using the [pricing calculator](/pricing), where 2 million events is $450 and ~5 million events is $1,102 per month. 

### Kameleoon

IMAGE

Kameleoon is an A/B testing and personalization platform. It supports A/B and multivariate testing, and feature flags for managing the rollout of new features and running tests. In addition to testing, it features a real-time personalization engine that's particularly useful for e-commerce. It doesn't have any deeper analytics features, so you'll need to run it alongside another [HIPAA-compliant analytics tool](/blog/best-hipaa-compliant-analytics-tools) to gather deeper user behavior data.

#### Kameleoon and HIPAA compliance

- **Self-Hosting:** No
- **BAA Available**: Yes

Kameleoon is a cloud-only service, but it will sign a BAA for use in healthcare products.

What [Kameleoon says](https://www.kameleoon.com/en/health-insurance-portability-and-accountability-act-hipaa):

> "Our technology platform is designed to meet the Act’s requirements in areas such as password expiry rules, secure data transfer and automatic logouts. We follow clear, transparent processes in how we handle and protect data and will sign Business Associate Agreements (BAA) as part of any agreement with clients."

#### How much does Kameleoon cost?

Kameleoon doesn't publish pricing publicly, but conversion optimization consultants BrillMark [state](https://www.brillmark.com/kameleoon-ab-testing-platform/#:~:text=The%20yearly%20licensing%20pricing%20for,pay%20for%20the%20annual%20license) pricing starts at $35,000 per year and scales based on depending on traffic volume.    

### VWO

IMAGE

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

> **HIPAA password requirements:** HIPAA requires Covered Entities and Business Associates to have "creating, changing, and safeguarding passwords". Kameleoon and VWO state this means you must force users to update their passwords every 90 days, but this is based on [out of date advice](https://www.hipaajournal.com/what-are-the-hipaa-password-expiration-requirements/) first published in 2004. [Updated advice](https://www.hipaajournal.com/what-are-the-hipaa-password-expiration-requirements/) published by the National Institute of Standards and Technology in 2017 states "Verifiers SHOULD NOT require memorized secrets [passwords] to be changed arbitrarily (e.g., periodically)."  

### Adobe Target

IMAGE

Adobe Target is part of Adobe's Experience Cloud, though it can be bought and used on its own. It supports A/B and multivariate tests, though unlike Kameleoon and PostHog it doesn't offer feature flagging as it's primarily aimed at marketing teams rather than product developers. To this end, it includes a visual editor so marketing teams can easily make changes to pages and run tests on conversion independently.

#### Adobe Target and HIPAA compliance

- **Self-Hosting:** No
- **BAA Available**: Yes

What [Adobe says](https://www.adobe.com/trust/compliance/hipaa-ready.html):

> "Adobe provides health care customers with services that are ready to accept PHI, referring to these services as HIPAA-Ready Services. These HIPAA-Ready Services have additional features and functionalities that allow for both customers, who are Covered Entities or Business Associates, and Adobe to comply with their respective HIPAA obligations. These additional features may increase your license or subscription costs."

#### How much does Adobe target cost?

Adobe doesn't publish pricing for Adobe Target, but suffice it to say it probably won't be cheap given its typical clientele are multination corporations. As noted in its T&Cs, using its "HIPAA-Ready Service" may incur an additional cost above a normal subscription plan.

