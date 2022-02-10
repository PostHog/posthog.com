---
date: 2022-02-10
title: PostHog & GDPR compliance
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: ["marcus-hyett"]
featuredImage: ../images/blog/hipaa-compliant-product-analytics.png
featuredImageType: standard
categories: ["Guides", "Privacy", "Product analytics"]
---
If you have users in Europe it's important to understand the implications of handling their data privately and securely. PostHog doesn't see any of your data and can be self-hosted on your existing infrastructure, making it one of the most GDPR-compliant product analytics platforms available. 

In this article I'll explain what GDPR is, what data must be protected and what your options are for GDPR-compliant analytics - or you can [get started with PostHog today](https://posthog.com/pricing). 

## What is GDPR?

The General Data Protection Regulation (GDPR) is the toughest privacy and security law in the world. Though it was drafted and passed by the European Union (EU), it imposes obligations onto organizations anywhere, so long as they target or collect data related to people in the EU. The regulation was put into effect on May 25, 2018.

GDPR applies to any anyone that processes the personal data of EU citizens or residents, or you offer goods or services to such people, even if you’re not in the EU.

The consequences of violating GDPR are severe. It can lead to fines reaching into the tens of millions of euros and can be up to 4% of global revenue.

## What data is protected under GDPR?

Personal data is protected under GDPR, this means any information that relates to an individual who can be directly or indirectly identified. Names and email addresses are obviously personal data. Location information, ethnicity, gender, biometric data, religious beliefs, web cookies, and political opinions can also be personal data.

In short, any information which is tied to a specific individual can be considered Personal Data, from their social security number or license plate number to photos, emails, URLs, IP addresses or even Pseudonyms.

## What is the impact of GDPR on product analytics?

The number one rule is don’t collect, store or use any personal data without a good reason for it, such as:
* The person gave you specific, unambiguous consent to process the data. (e.g. They’ve opted in to your marketing email list.)
* Processing is necessary to enter into a contract to someone. (e.g. You need to do a background check.)
* You need to process it to comply with a legal obligation of yours. (e.g. You receive an order from the court in your jurisdiction.)
* You need to process the data to save somebody’s life. (e.g. Well, you’ll probably know when this one applies.)
* Processing is necessary to perform a task in the public interest or to carry out some official function. (e.g. You’re a private garbage collection company.)
* You have a legitimate interest to process someone’s personal data. This is the most flexible lawful basis, though the “fundamental rights and freedoms of the data subject” always override your interests, especially if it’s a child’s data

**Unambiguous Consent**

There are specific rules about what consent means, hiding it away on page 73 or of your terms and conditions is not good enough:

* Consent must be “freely given, specific, informed and unambiguous.”
* Requests for consent must be “clearly distinguishable from the other matters” and presented in “clear and plain language.”
* Data subjects can withdraw previously given consent whenever they want, and you have to honor their decision.
* Children under 13 can only give consent with permission from their parent.
* You need to keep documentary evidence of consent.

So if you're tracking users in your product using PostHog to improve your product, you should explicity ask for consent to use this data and explain exactly how you will use it when users sign up for your service.

If you use PostHog with cookies on your website (for logged out users), you should also use a cookie banner to enable people to give and withdraw their consent for using cookies.

**Security**

You’re required to handle data securely by implementing “appropriate technical and organizational measures.”

This means both technical measures (like encrypting data) and organizational measures (like staff training and limiting access to personal data).

If you have a data breach, you have 72 hours to tell the data subjects or face penalties. (This notification requirement may be waived if you use technological safeguards, such as encryption, to render data useless to an attacker.)

## How is GDPR compliance different with PostHog?

PostHog is different from most other product analytics tools such as Mixpanel or Amplitude because it enables you to self-host on your own infrastructure and maintain full control of the data, this means you can decide on the technical and organizational security measures that are most appropriate for your organization. It also means that you can store your data within the EU, encouraging consent from EU citizens and making it easy to comply with any future data sovereignty requirements.

## How to set PostHog up for GDPR compliant analytics

### Step 1: Choose a hosting provider

We recommend hosting PostHog on your own infrastructure, or a private cloud such as AWS, Google Cloud Platform or Microsoft Azure.

### Step 2: Deploy PostHog

Deploying PostHog onto your own infrastructure is very straightforward. You can follow our [standard deployment guides](https://posthog.com/docs/self-host) to get started, or [arrange a demo](https://posthog.com/book-a-demo) to see it in action first.

### Step 3: Security configuration

When setting up a PostHog instance **we strongly recommend that you use HTTPS** to secure data in transmission, whether or not your instance has access to the wider internet. We also have a [guide for securing PostHog](https://posthog.com/docs/self-host/configure/securing-posthog) which you should follow to further protect your instance.

We also strongly recommend that you limit access to PostHog and the infrastructure it is deployed on only to people who are authorized and need to access the data, including shared dashboard links. Although aggregate data in dashboards should not contain Personal Data, it may be possible for malicious users to infer Personal Data unless it is evaluated thoroughly via expert determination.

We also strongly advise caution when installing, building and enabling [plugins](https://posthog.com/docs/user-guides/plugins) for your PostHog instance. Plugins are a great way to share and augment data from your instance with other systems, but it’s essential to ensure you have the proper controls in place when sharing Personal Data outside of your self-hosted PostHog instance.
