---
title: Privacy compliance
sidebarTitle: Overview
sidebar: Docs
showTitle: true
---

PostHog offers considerable flexibility in hosting and configuration options to comply with privacy regulations around the world.

In these guides, we offer advice for using PostHog in a compliant manner under the following legal frameworks:

- [The General Data Protection Regulation](/docs/privacy/gdpr-compliance/) (GDPR), which applies to all businesses collecting data on EU citizens

- [The Health Insurance Portability and Accountability Act](/docs/privacy/hipaa-compliance/) (HIPAA), which applies to businesses capturing and processing health data in the US

- [The California Consumer Privacy Act](/docs/privacy/ccpa-compliance/) (CCPA), which applies to qualifying for-profit businesses collecting personal information on residents of California

> **Please note:** these guides do not constitute legal advice. We recommend seeking professional advice to ensure you remain compliant with relevant legislation.

## Frequently asked questions

This overview covers some frequently asked questions about PostHog and privacy. Have a question not covered here? Use the 'Ask a question' box at the bottom of the page.

### What is and isn't considered personal data?

It's hard to have a single legal definition of personal data because every legal privacy framework has different ideas, and even names, for it. The GDPR calls it 'personal data' but the US uses the term 'personally identifiable information' (PII) and others refer to it as 'personal information'.

According to the GDPR, personal data is any information which: 

1. Identifies a 'data subject' directly
2. Can be used to identify a 'data subject' when combined with other information

Read our [simple guide to personal data and PII](/blog/what-is-personal-data-pii) for more specific examples to help you identify what personal data you are collecting.

### What personal data does PostHog collect?

PostHog collects a range of data that is considered personal data, including but not limited to:

- Technical device information (e.g. IP addresses)
- Names and email addresses of logged in users of the product
- Names and email addresses of community Slack members
- Location

It also collects behavioral data, such as:

- Referral URLs
- Content viewed or product features used
- Content or product interaction

We also collect this data on users of the PostHog Cloud and self-hosted instances to enable us to understand, and improve, the experience, but we cannot see or collect data on the end users of self-hosted PostHog instances.

We **do not** intentionally collect sensitive or special category information, such as genetic or biometric data, in any setting. 

More information is available in our [privacy policy](/privacy).

### How does the GDPR impact analytics?

There are three key GDPR principles that impact your use PostHog and analytics in general:

1. You need to have a good reason to collect personal data
2. You need to acquire unambiguous consent
3. Data must be handled securely

Our [guide to personal data](/blog/what-is-personal-data-pii) provides an overview of what's considered personal data under the GDPR, but suffice it to say that its definition is broad.

### Is PostHog GDPR compliant?

Yes, PostHog is GDPR compliant. We have [in-depth GDPR guidance documentation](/docs/privacy/gdpr-compliance) for advice on deploy PostHog in a GDPR-compliant way, including [how to configure GDPR consent in PostHog](/docs/privacy/gdpr-compliance#step-4-configure-consent) and complying with ['right to be forgotten' requests](/docs/privacy/gdpr-compliance#complying-with-right-to-be-forgotten-requests).

### Can I use PostHog to collect user data under HIPAA?

Yes. You can [self-host PostHog](/docs/self-host) on your own infrastructure and maintain full control of your data, making it an excellent solution for analytics in healthcare settings. Because you maintain full control, you don't need to sign a Business Associate Agreement with us. Read our [HIPAA guidance](/docs/privacy/hipaa-compliance) for more information.

### Can I use PostHog Cloud under HIPAA?

No. We believe self-hosting is the best solution for HIPAA compliance. Read our documentation for more on [how to self-host PostHog](https://posthog.com/docs/self-host).

### Is Google Analytics HIPAA compliant?

No, [Google Analytics isn't HIPAA compliant](/blog/is-google-analytics-hipaa-compliant), so it can't be used in any context where you're collecting or processing personal health information. PostHog can be used to collect user data under HIPAA. Read our [HIPAA guidance](/docs/privacy/hipaa-compliance) for more information.
