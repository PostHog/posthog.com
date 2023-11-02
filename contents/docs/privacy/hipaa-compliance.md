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

## How to set PostHog up for HIPAA compliant analytics

PostHog enables you to self-host on your own infrastructure and maintain full control of the data. This means you don't need to anonymize the data, nor do you need to set up a Business Associate Agreement with PostHog because you never need to send any Protected Health Information (PHI) to us in the first place. The data stays on your systems, in its original form. 

You may need to sign a BAA with your hosting provider, but major providers such as Google and AWS offer these for free.

### Step 1: Choose a hosting provider

We recommend hosting PostHog on your own infrastructure. If you’re leveraging a private cloud you will need a Business Associate Agreement with your provider first. These are commonly and easily available with services such as [Amazon Web Services](https://aws.amazon.com/compliance/hipaa-compliance/), [Google Cloud Platform](https://cloud.google.com/security/compliance/hipaa), [Microsoft Azure](https://docs.microsoft.com/en-us/azure/compliance/offerings/offering-hipaa-us) and many more, often for free.

### Step 2: Deploy PostHog

Deploying PostHog onto your own infrastructure is straightforward and we provide support to solve any issues you encounter. You can follow our [standard deployment guides](https://posthog.com/docs/self-host) to get started, or [arrange a demo](https://posthog.com/book-a-demo) to see it in action first.

### Step 3: Security configuration

When setting up a PostHog instance **we strongly recommend that you use HTTPS** to secure data in transmission, whether or not your instance has access to the wider internet. We also have a [guide for securing PostHog](https://posthog.com/docs/self-host/configure/securing-posthog) which you should follow to further protect your instance.

We also strongly recommend that you limit access to PostHog and the infrastructure it is deployed on only to people who are authorized and need to access the data, including shared dashboard links. Although aggregate data in dashboards should not contain PHI, it may be possible for malicious users to infer PHI unless it is evaluated thoroughly via expert determination.

Finally, we advise caution when installing, building and enabling [apps](/docs/apps) for your PostHog instance. Apps are a great way to share and augment data from your instance with other systems, but it’s essential to ensure you have the proper controls (e.g. BAA, anonymization or self-hosting) in place when sharing PHI outside of your self-hosted PostHog instance.

## Does PostHog offer a BAA for PostHog Cloud?

We believe the most effective solution to HIPAA-compliant product analytics is to control the data yourself. That's why we recommend using the self-hosted versions of PostHog. As such, we do not offer a [Business Associate Agreement (BAA)](https://www.hhs.gov/hipaa/for-professionals/covered-entities/sample-business-associate-agreement-provisions/index.html) for PostHog Cloud - we recommend you self host PostHog instead. 

### Further reading

- [A simple guide to personal data & PII](/blog/what-is-personal-data-pii)
- [Is Google Analytics HIPAA compliant?](/blog/is-google-analytics-hipaa-compliant)