---
date: 2022-10-10
title: Introducing PostHog Cloud EU
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: ["Product updates”]
author: ["andy-vandervell"]
featuredImage: ../images/blog/posthog-eu-blog.png
featuredImageType: full
--

Today, we’re delighted to announce the [launch of PostHog Cloud EU](/eu) – a fully-managed version of PostHog where all data is hosted exclusively in the EU.

Until now, running PostHog with GDPR compliance meant self-hosting on your own infrastructure, or comprehensively anonymizing data if using PostHog Cloud.

Thanks to our new hosting option, customers in the EU, and any business that needs to keep user data within the EU, can get up and running on PostHog Cloud EU in just a few minutes.

<GDPRForm />

## FAQ

### Where are PostHog Cloud EU's servers based?

PostHog Cloud EU is hosted on AWS servers based in Frankfurt, Germany.

### What data is transferred from the EU to the US?

None. PostHog Cloud EU is an entirely independent instance of PostHog. All event data, user data, and the product itself, is hosted on our EU-based servers.

### How do I use PostHog Cloud EU in compliance with GDPR?

Just deploying PostHog Cloud EU isn't enough – you still need to [acquire consent](/tutorials/react-cookie-banner) from your users and comply with all other provisions of the GDPR, such as the right to be forgotten. Please see our [GDPR guidance](/docs/privacy/gdpr-compliance) for more information.

### I'm an existing PostHog customer, can I migrate to PostHog Cloud EU?

Yes. Please read our guide to [migrating to PostHog Cloud EU](/tutorials/migrate-eu-cloud). Please note: at this time, only event and person data can be migrated. Insights, dashboards, and feature flags are not migratable.

## GDPR compliance checklist

We recommend completing the following steps to ensure GDPR compliance when using PostHog Cloud EU, but please seek out expert advice. Further GDPR advice can be found on the [official GDPR.eu website](https://gdpr.eu/checklist/)

1. **Deploy PostHog Cloud EU:** Deploying PostHog Cloud EU is easy – simply follow the steps in the onboarding process. More information is available [via our docs](/docs/getting-started/cloud).

2. **Review what data you're collecting:** It's important to understand what data you're collecting using PostHog, or any other tools you use. Please read our [privacy documentation](/docs/privacy) and [privacy policy](/privacy) for more information on what data PostHog collects.

3. **Update your privacy policy and terms:** You must identify PostHog as a tool in your terms. When using PostHog Cloud EU, PostHog is the Data Processor and you are the Data Controller.

4. **Acquire consent from users:** You must give users the option to opt out of cookies. If you don't already do this, we've created a tutorial for [creating a simple GDPR banner using React](/tutorials/react-cookie-banner). It is also possible to run PostHog Cloud EU without cookies – see our [cookieless tracking guide](/tutorials/cookieless-tracking).

5. **Create "right to be forgotten" process:** A user must be able to request that their data be removed from PostHog. How you facilitate that request is up to you. Information on how to delete user data is [available in our docs](/docs/privacy/data-deletion).

<GDPRForm />
