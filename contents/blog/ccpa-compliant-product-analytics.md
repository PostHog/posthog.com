---
date: 2022-02-10
title: PostHog & CCPA compliance
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: ["marcus-hyett"]
featuredImage: ../images/blog/hipaa-compliant-product-analytics.png
featuredImageType: standard
categories: ["Guides", "Privacy", "Product analytics"]
---
If you have users who are Californian residents it's important to understand the implications of handling their data privately and securely. PostHog doesn't see any of your data and can be self-hosted on your existing infrastructure, making it one of the most CCPA-compliant product analytics platforms available. 

In this article I'll explain what CCPA is, what data must be protected and what your options are for CCPA-compliant analytics - or you can [get started with PostHog today](https://posthog.com/pricing). 

## What is CCPA?

The California Consumer Privacy Act of 2018 (CCPA) gives consumers control over the personal information that businesses collect about them.

* The right to know about the personal information a business collects about them and how it is used and shared
* The right to delete personal information collected from them (with some exceptions)
* The right to opt-out of the sale of their personal information
* The right to non-discrimination for exercising their CCPA rights.

## What data is protected under CCPA?

Only California residents have rights under the CCPA. A California resident is a person who resides in California, even if they are is temporarily outside of the state.

The CCPA applies to for-profit businesses that meet any of the following:

* Have a gross annual revenue of over $25 million
* Buy, receive, or sell the personal information of 50,000 or more California residents, households, or devices
* Derive 50% or more of their annual revenue from selling California residents’ personal information.

Personal information is protected under CCPA and is consdiered information that identifies could be linked with a person.

In short, any information which is tied to a specific individual can be considered Personal Information, from their social security number or license plate number to photos, emails, URLs, IP addresses or even pseudonyms.

## What is the impact of CCPA on product analytics?

The CCPA requires businesses to give consumers certain information in a “notice at collection”, this means when people sign-up to use your product you need to explain how you intend to use their data to improve the product for them.

A notice at collection must list the categories of personal information businesses collect about consumers and the purposes for which they use the categories of information. The notice must also contain a link to the business’s privacy policy, where consumers can get more details on your privacy practices.

The right to delete personal information is also covered by CCPA, you have 45 days to respond to a request from a user to delete any personal information stored about them.

## How is CCPA compliance different with PostHog?

PostHog is different from most other product analytics tools such as Mixpanel or Amplitude because it enables you to self-host on your own infrastructure and maintain full control of the data, this means you can decide on how and where to host any personal inforation. It also means you have full control of the underling database making it possible for you to easily share any information stored about an individual or delete any personal data. 

## How to set PostHog up for GDPR compliant analytics

### Step 1: Choose a hosting provider

We recommend hosting PostHog on your own infrastructure, or a private cloud such as AWS, Google Cloud Platform or Microsoft Azure.

### Step 2: Deploy PostHog

Deploying PostHog onto your own infrastructure is very straightforward. You can follow our [standard deployment guides](https://posthog.com/docs/self-host) to get started, or [arrange a demo](https://posthog.com/book-a-demo) to see it in action first.

### Step 3: Security configuration

When setting up a PostHog instance **we strongly recommend that you use HTTPS** to secure data in transmission, whether or not your instance has access to the wider internet. We also have a [guide for securing PostHog](https://posthog.com/docs/self-host/configure/securing-posthog) which you should follow to further protect your instance.

We also strongly recommend that you limit access to PostHog and the infrastructure it is deployed on only to people who are authorized and need to access the data, including shared dashboard links. Although aggregate data in dashboards should not contain Personal Data, it may be possible for malicious users to infer Personal Data unless it is evaluated thoroughly via expert determination.

We also strongly advise caution when installing, building and enabling [plugins](https://posthog.com/docs/user-guides/plugins) for your PostHog instance. Plugins are a great way to share and augment data from your instance with other systems, but it’s essential to ensure you have the proper controls in place when sharing Personal Data outside of your self-hosted PostHog instance.
