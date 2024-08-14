---
title: PostHog & CCPA compliance
sidebarTitle: PostHog & CCPA
sidebar: Docs
showTitle: true
---

If you have users who are Californian residents, it's important to understand the implications of handling their data privately and securely.

This guide explains what the CCPA is, what data must be protected and what your options are for CCPA-compliant analytics. 

## What is the CCPA?

The California Consumer Privacy Act of 2018 (CCPA) gives consumers control over the personal information that businesses collect about them:

* The right to know about the personal information a business collects about them and how it is used and shared
* The right to delete personal information collected from them (with some exceptions)
* The right to opt-out of the sale of their personal information
* The right to non-discrimination for exercising their CCPA rights.

## What data is protected under CCPA?

Only California residents have rights under the CCPA. A California resident is a person who resides in California, even if they temporarily outside of the state.

The CCPA applies to for-profit businesses that meet **any** (not all) of the following criteria:

* Have a gross annual revenue of over $25 million
* Buy, receive, or sell the personal information of 50,000 or more California residents, households, or devices
* Derive 50% or more of their annual revenue from selling California residents’ personal information.

Personal information is protected under CCPA and is considered information that identifies or could be linked with a person.

In short, any information which is tied to a specific individual can be considered Personal Information, from their social security number or license plate number to photos, emails, URLs, IP addresses or even pseudonyms.

## What is the impact of CCPA on product analytics?

The CCPA requires businesses to give consumers certain information in a “notice at collection”. This means that, when people sign up to use your product, you need to explain how you intend to use their data to improve the product for them.

A notice at collection must list the categories of personal information businesses collect about consumers and the purposes for which they use the categories of information. The notice must also contain a link to the business’s privacy policy, where consumers can get more details on your privacy practices.

The right to delete personal information is also covered by CCPA. You have 45 days to respond to a request from a user to delete any personal information stored about them.

## How to set PostHog up for CCPA compliance

PostHog enables you to self-host your analytics on your own infrastructure and maintain full control of the data – i.e. you decide how and where to host any personal information. It also means you have full control of the underlying database, making it possible for you to easily share any information stored about an individual or delete any personal data. 

### Step 1: Choose a hosting provider

We recommend using PostHog Cloud US for CCPA compliance. If self-hosting, the steps will depend on where you're hosting your data. 

### Step 2: Deploy PostHog

If using PostHog Cloud, simply follow the steps in the onboarding process to start sending events. Read our [integration documentation](/docs/integrate) for more information on sending events to PostHog.

Deploying PostHog onto your own infrastructure is straightforward but we do not provide support for self-hosted instances. You can follow our [standard deployment guides](https://posthog.com/docs/self-host) to get started. 

### Step 3: Security configuration

When setting up a PostHog instance **we strongly recommend that you use HTTPS** to secure data in transmission, whether or not your instance has access to the wider internet. We also have a [guide for securing PostHog](https://posthog.com/docs/self-host/configure/securing-posthog) which you should follow to further protect your instance.

We also strongly recommend that you limit access to PostHog and the infrastructure it is deployed on only to people who are authorized and need to access the data, including shared dashboard links. Although aggregate data in dashboards should not contain personal data, it may be possible for malicious users to infer personal data unless it is evaluated thoroughly via expert determination.

Finally, we advise caution when installing, building and enabling [apps](/docs/apps) for your PostHog instance. Apps are a great way to share and augment data from your instance with other systems, but it’s essential to ensure you have the proper controls in place when sharing personal data outside of your self-hosted PostHog instance.

## Deleting personal information in PostHog

If a user request the deletion of their information under the CCPA, complete the following steps:

- Select **Persons** from the left-hand menu
- Search for the person via their unique ID. For example, their email
- Click **view** next to the person within the search results
- Click **Delete this person** to remove them and all their associated data from the PostHog instance. You will be prompted to confirm this action.
