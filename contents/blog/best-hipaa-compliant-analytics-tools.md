---
date: 2022-02-16
title: The 4 best HIPAA-compliant analytics tools
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - joe-martin
featuredImage: ../images/blog/posthog-company-culture-blog.png
featuredImageType: full
category: General
tags:
  - Privacy
  - Comparisons
  - Guides
---

Passed in 1996, HIPAA (aka Health Insurance Portability and Accountability Act) defines the legal requirements for securing and handling health information, and the severe penalties for failing to do so.

Data protected under HIPAA is called Protected Health Information (PHI), or ePHI if it is digitized. It includes any data which can be used to identify the past, current or future health status of an individual. This obviously includes test results and diagnoses, but it can also cover birthdays, ethnicity, gender and other information. Even your IP address can be considered ePHI under HIPAA. 

One of the challenges for organizations affected by HIPAA is that it limits how data about customers can be gathered, stored and shared. 

In this article we’ll explore the best platforms for gathering and analyzing customer information in a way which complies with HIPAA. Many platforms which rely on third-party cookies, such as Mixpanel or Amplitude, cannot be used under HIPAA regulations without either anonymising data or creating cumbersome (and costly) BAA agreements. 

### What is a Business Associate Agreement (BAA)?

Some services enable HIPAA compliance through the creation of a [Business Associate Agreement, or BAA](https://www.hhs.gov/hipaa/for-professionals/covered-entities/sample-business-associate-agreement-provisions/index.html). This is essentially a contract with a service provider to ensure that they are jointly compliant and liable for services they provide. 

It's worth noting that, because BAAs expose third-parties to increased risk and scrutiny, they are often an expensive option and/or require users to purchase a higher tier of license than they may otherwise require. Additionally, not all organizations may offer BAAs at all. 

> If your business operates inside the EU, it’s worth checking out our article about [GDPR compliant analytics](/blog/best-gdpr-compliant-analytics-tools) to ensure you comply with both sets of regulations. 

## 1. [PostHog](/product)

![PostHog - hipaa compliant analytics](../images/blog/gdpr-compliant-analytics/posthog-gdpr-compliant.png)

PostHog is an all-in-one analytics platform which gives you everything you need to understand your users and build better products. It’s also open source and [can be self-hosted on your own infrastructure](/docs/self-host), so that you never have to share data with anyone — including PostHog. 

We may be biased in claiming the top spot, but we believe the combination of [session recording](/docs/user-guides/recordings), [feature flags](/docs/user-guides/feature-flags), [A/B testing](/docs/user-guides/experimentation) and [group analytics](/docs/user-guides/group-analytics) is one that few other platforms can match. PostHog isn’t just a HIPAA-compliant analytics platform, it’s also a [powerful alternative to tools like Amplitude](/blog/posthog-vs-amplitude) for those who _don’t_ need to comply with HIPAA.

### Features & benefits

- Full product analytics suite, incl. Group Analytics
- Feature Flags and A/B Testing, for trialing new features
- Session Replays and User Paths for customer research
- Unlimited capacity to scale, integrations with data warehouses
- Integrations with HubSpot, Salesforce and more
- Self-serve platform, no SQL required
- Open-source, via permissive MIT License

### Is PostHog HIPAA compliant?

Yes. Unlike platforms such as Mixpanel or Amplitude, you can deploy PostHog onto your own infrastructure so that data doesn’t need to be sent to any third parties. This means you maintain full control and don’t need to set up a Business Associate Agreement (BAA) with PostHog, because we never handle any PHI or ePHI. It's also one of the few [HIPAA-compliant A/B testing tools](/blog/best-hipaa-compliant-ab-testing-tools) on the market.

You _may_ need to create a BAA with your hosting provider if one doesn’t already exist, but major providers such as Google and AWS offer these for free. Read our [HIPAA compliance guidance](/docs/privacy/hipaa-compliance) for more information on using PostHog.

## 2. [Countly](https://count.ly/)

![Countly - open source analytics tools](../images/blog/open-source-analytics-tools/countly-screenshot.png)

Tailored to the needs of Internet Of Things (IoT) organizations, Countly’s product analytics platform offers tools such as multi-device user tracking and crash analytics. This makes it especially suited to hardware manufacturers, or teams who need to focus on debugging customer issues.

Unlike PostHog (above) and Plausible (below), Countly isn’t open source - though it does offer a range of apps to increase extensibility and add features such as surveys, dashboards and funnel analysis. 

### Features & benefits

- User tracking across desktop, mobile and IOT devices
- Library of apps to extend functionality
- Push notifications and crash analytics

### Is Countly HIPAA compliant?
Yes. Similar to PostHog, Countly can be deployed on to your own infrastructure, so that data doesn’t have to be sent to third-party services. BAA agreements may still be needed with hosting providers, however.

> Looking for HIPAA-compliant session recording tools as well? Read our guide to [best self-hosted session recording tools](/blog/best-open-source-session-replay-tools)

## 3. [Plausible](https://plausible.io/)

![Plausible Analytics - plausible hipaa analytics tools](../images/blog/open-source-analytics-tools/plausible-screenshot.png)

Another open-source analytics platform, Plausible is designed to help teams track basic website metrics such as pageviews and bounce rates. This pared-back focus means Plausible lacks the more powerful features included in PostHog, such as Feature Flags and Session Recording, but makes it suited to the needs of website managers. 

One benefit of Plausible’s approach is that it only requires a 1KB script in order to function and has a much smaller impact on page performance than Google Analytics. Again, because it’s open source (under an AGPL license), it can be tailored to the needs of your team and can be deployed on-premises.

Plausible is a good fit for website admins and includes integrations with both Slack and Google Search Console, but it lacks the more powerful features needed by Product or Engineering teams in larger organizations.

### Features & benefits

- Lightweight script with no need for cookies
- Minimal data collection for users
- No tracking across sessions, devices or sites

### Is Plausible HIPAA compliant?

Yes. Plausible can be hosted on your own infrastructure, just like PostHog (above). It also collects minimal amounts of user data and only presents it in an anonymized, aggregated format. This is both a benefit and a drawback however, as it’s not possible to use Plausible to inspect the behavior or information of individual users. 

You may still need to create a BAA with your cloud hosting provider, as with any self-hosted solution. 

## 4. [Mixpanel](https://mixpanel.com/)

![Mixpanel - hipaa analytics tools](../images/blog/open-source-analytics-tools/mixpanel.png)

Like PostHog, Mixpanel offers a suite of product analytics tools, including funnel and trend analysis. It lacks some specific features, such as Feature Flags, but offers a library of 50 plugins to extend functionality via integrations with other platforms. 

_Unlike_ PostHog, Mixpanel isn’t open source and can’t be deployed into a users’ own infrastructure. Instead, it must be deployed via the Cloud and data must be shared with Mixpanel directly, meaning [a BAA is required in order to use Mixpanel under HIPAA](https://mixpanel.com/legal/mixpanel-hipaa/). 

### Features & benefits

- All-in-one product analytics suite
- Group Analytics, for B2B organizations
- Self-serve, no SQL required
- SOC 2 certification

### Is Mixpanel HIPAA compliant?

Mixpanel isn’t HIPAA compliant out-of-the-box, but offers a Business Associate Agreement so that it can be used by organizations which need to remain compliant with HIPAA regulations. 

## Is Google Analytics HIPAA compliant?

The short answer is that, no, [Google Analytics is not HIPAA compliant](/blog/is-google-analytics-hipaa-compliant). 

According to [Google’s own disclaimers](https://support.google.com/analytics/answer/6366371?hl=en#hipaa&zippy=%2Cin-this-article), Google Analytics cannot be used for handling PHI or ePHI (including IP addresses) by _either_ covered entities or their third-party business associates: 

>Unless otherwise specified in writing by Google, Google does not intend uses of Google Analytics to create obligations under the Health Insurance Portability and Accountability Act, as amended, (“HIPAA”), and makes no representations that Google Analytics satisfies HIPAA requirements. If you are (or become) a Covered Entity or Business Associate under HIPAA, you may not use Google Analytics for any purpose or in any manner involving Protected Health Information unless you have received prior written consent to such use from Google.

Although [Google does offer a BAA for some services](https://support.google.com/a/answer/3407054?hl=en), such as Google Calendar and Google Keep, Google Analytics is not included on this list. In fact, [Google Analytics may even be illegal](https://isgoogleanalyticsillegal.com/) to use in some countries due to the way it collects and stores data. 

> PostHog is an open source analytics platform you can host yourself. We help you build better products faster, without user data ever leaving your infrastructure.

<ArrayCTA />

