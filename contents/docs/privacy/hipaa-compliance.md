---
title: PostHog & HIPAA compliance
sidebarTitle: PostHog & HIPAA
sidebar: Docs
showTitle: true
---

> **Important:** At present, we don't offer the option to sign a BAA to use PostHog Cloud with HIPAA compliance. This page covers how to use [PostHog Open Source](https://posthog.com/docs/self-host), which is available [without guarantee](/docs/self-host/open-source/disclaimer) under an MIT license, within HIPAA rules. 

HIPAA is the Health Insurance Portability and Accountability Act. It’s a piece of legislation that applies to certain [covered entities](https://www.hhs.gov/hipaa/for-professionals/covered-entities/index.html) operating in the United States of America (e.g. healthcare providers).

A key goal of this legislation is to [“assure that individuals’ health information is properly protected while allowing the flow of health information needed to provide and promote high quality health care and to protect the public's health and well being.”](https://www.hhs.gov/hipaa/for-professionals/privacy/laws-regulations/index.html) 

In other words, it stops anyone from using or sharing a persons data improperly.

The consequences of violating HIPAA are severe. It can lead to fines of over $1M and prison sentences of up to 10 years for the most egregious violations.

## What data is protected under HIPAA?

Data which is protected under HIPAA is called Protected Health Information (PHI), or ePHI if it exists specifically in electronic format. It includes any identifying information related to a past, present or future health status. That includes individual diagnoses, medical test results and prescription info, as well as birthdays, gender, ethnicity and contact information.

In short, any information which is tied to a specific individual can be considered PHI, from their social security number or license plate number to photos, emails, URLs or formal medical information. 

## What is the impact of HIPAA on product analytics?

Most product analytics tools require you to send your captured user data to a third-party system where the data is stored outside of your control. This is a problem under HIPAA, but there are two common ways to remain compliant:

1. **[Anonymize the data](https://www.hhs.gov/hipaa/for-professionals/privacy/special-topics/de-identification/index.html#standard)**: This involves either removing all traces of protected health information, including but not limited to email addresses, phone numbers, IP addresses, URLs etc., or following an expert determination to limit the data shared in such a way that the statistical risk of identifying an individual is mitigated

2. **[Sign a Business Associate Agreement (BAA)](https://www.hhs.gov/hipaa/for-professionals/covered-entities/sample-business-associate-agreement-provisions/index.html)**: This is essentially a contract with your provider that ensures they are compliant and jointly liable for the protection of your data.

There are downsides to these two solutions:

1. **Anonymization**: You can easily limit the data so much that it becomes meaningless and makes it impossible to perform standard and critical analyses of your product and users. There's no point reducing the data to an unusable state
 
2. **Business Associate Agreement**: Business Associate Agreements are often expensive and/or require you to pay for a higher tier of product than you actually require.

PostHog offers a third approach without either of these downsides: hosting the product analytics systems yourself.

## Does PostHog offer a BAA for PostHog Cloud?

Yes. If you're interested in a BAA for HIPAA compliance, please [contact us with information about your requirements](/contact-sales).  

## How to set PostHog up for HIPAA compliance

> We strongly recommend teams which need HIPAA compliance use PostHog Cloud under a BAA, rather than the legacy self-hosted product or Hobby versions. 

The best way to use PostHog in a way which is HIPAA compliant is with a BAA covering a PostHog Cloud instance. This ensures that PostHog remains scalable and that you have access to all premium features and security enhancements. 

However, it is possible to host PostHog yourself using our open-source hobby deployment. It is important to note that the hobby deployment is **only suitable for smaller event volumes** and provided without guarantee. It also lacks many of the advanced features available under PostHog Cloud. 

If you wish to attempt self-hosting PostHog in a HIPAA compliant manner despite the limitations, please follow the steps below. 

**Step 1: Choose a hosting provider**
We recommend hosting PostHog on your own infrastructure. If you’re leveraging a private cloud you will need a Business Associate Agreement with your provider first. 

**Step 2: Deploy PostHog**
Follow our [standard deployment guides](/docs/self-host) to get started deploying PostHog. This is a technical task which requires some engineering knowledge. 

**Step 3: Security configuration**
We strongly recommend that you use HTTPS to secure data in transmission, whether or not your instance has access to the wider internet. We also have a [guide for securing PostHog](https://posthog.com/docs/self-host/configure/securing-posthog) which you should follow to further protect your instance. We recommend you limit access to your self-hosted deployment, including shared dashboard links and subscriptions, as well as caution when installing, building and enabling [apps](/docs/apps).

### Further reading

- [A simple guide to personal data & PII](/blog/what-is-personal-data-pii)
- [Is Google Analytics HIPAA compliant?](/blog/is-google-analytics-hipaa-compliant)