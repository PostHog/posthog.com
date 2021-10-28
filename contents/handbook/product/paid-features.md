---
title: Paid Features
sidebar: Handbook
showTitle: true
---

## Background

This document covers how we think about building and releasing paid features and how we enable discovery of the paid features within the free product.

## When should a feature be paid or free?

* **All new major features will be paid only by default (e.g. correlation analysis)**
    * **Why?** It will be easy for us to make Paid features free and open source in the future to support our community but it will not be possible to go the other way
* **Significant improvements to existing features will be paid only where it’s viable to split out the new functionality (e.g. Paths 2.0)**
    * **Why?** As above
* **Improvements to existing functionality and bug fixes will be free for all (e.g. resolving data integrity issues, new information architecture, "turbo mode".**
   * **Why?** It's critical that everyone using our product gets the best experience we can offer, no matter if free or paid

## How do we enable discovery of paid features?

* Paid features generally align with "Tier 1" from our [Product Announcements](https://posthog.com/handbook/growth/marketing/product-announcements) framework, we will follow the appropriate steps here to launch the feature publicly
* We will not offer "try before you buy" on a new paid feature within the product as we do not wish to later take away something that is valuable from a user - however we will continue to offer free "Zoom demos" of any new feature to any interested customer
* We do not have a one-size fits all approach for nudges and upsells and should take each feature on a case-by-case basis until we have repeatable patterns
* The product team will be responsible for implementing any in product discovery of a new feature but will work closely with the growth team who will consult on the best practices and approaches

## How disruptive should paid feature discovery be?

* Itinitally we should make upsells and nudges highly noticeable in order to give us stronger signal to validate this approach
* We should avoid significantly disrupting user's flow through the product unless necessary
* We should offer the ability for individuals to permenatly dismiss upsells where possible

## Who will get access to paid features?

* PostHog Cloud: Anyone with a credit-card on file (including users below the payment threshold)
* Posthog Self-Hosted: Anyone on Scale or Enterprise tier
* We will not take away features from existing users if we create a new tier

## How do we enable our community to use the free and open source version without nudges or upsells?

For those of our community who are content with the free and open source version of the product its essential that they have the ability to opt out of both Marketing (e.g. email campaigns) and also in-product paid feature discovery (e.g. nudges or upsells). 

To solve for this we will implement an [environment variable][/docs/self-host/configure/environment-variables] (`DISABLE_PAID_FEATURE_SHOWCASING = 1`) which disables all paid feature discovery for your instance.
