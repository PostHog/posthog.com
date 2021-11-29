---
title: Measuring viral growth loops
sidebar: Docs
showTitle: true
author: ['james-hawkins']
topics: ['feature flags', 'trends']
---

A growth loop is a type of perpetuating growth that occurs when growing your product fuels further growth. A successful growth loop usually means that most of your new users come from existing users.

This tutorial explains the products that are well-suited to this approach, then gives examples on how to measure a viral growth loop using PostHog. 

## Pre-requisites

There are four growth engines that you can focus on to make your product more successful. This article will focus on viral growth loops, so it's important to make sure that virality is a natural fit for your product:

* Virality is a natural fit for:
  * _Multiplayer products_: Your product is enhanced (or only works) when multiple friends or colleagues also use it (e.g. Snapchat, Figma, Zoom)
  * _Fun-to-share products_: Your users find your product is fun to share with others (e.g. TikTok, Instagram, Airbnb listings)

The three other growth engines that you can focus on are performance marketing, content and sales:

* Performance marketing is a natural fit if:
  * Customers don't naturally search for your product (e.g. Allbirds)
  * Marketing brings in new users, which funds more marketing (e.g. subscriptions/purchases)
* Content is a natural fit if:
  * Users discover your product through content which other users create and share (e.g. Stackoverflow)
  * Your product generates a large amount of data, which you use to make content (e.g. Tripadvisor)
* Sales is a natural fit if:
  * Your users require a lot of support to get value from your product
  * Customers have a high average lifetime value (LTV)

## Tracking a multiplayer product growth loop

Here's an example of a viral growth loop for a multiplayer product:

1. Your company recruits User 1 at Company 1.
2. User 1 recruits User 2. User 2 recruits User 3... etc.
3. Some of the Users tell their friends. They invite User 1 at Company 2.

### Multiplayer product loop required event taxonomy

In this example, the following [Events](../user-guides/events) are needed to track this loop in PostHog:

* User signed up (setting a Group for the User's company)
* User activated
* User referred a new user

### Multiplayer product loop dashboard items

Once you have set up the events, you can track the loop by creating a [dashboard](../user-guides/dashboards) and adding [trend](../user-guides/trends) graphs to it to report relevant data. The following trends would be relevant to such a growth loop:

* Users signed up (total)
  * External users signed up
  * Internal users signed up
* Users activated
  * External users activated
  * Internal users activated
* Referred users (total)
  * Internal referred users
  * External referred users

You can further enhance your dashboard by using [Funnels](../user-guides/funnels) to report on the following data:

* User sign-up conversion rate
* User activation rate
* Average number of users per company
* Average number of internal referrals per activated user (some overlap with average number of users per company)
* Average number of external referrals per activated user

## Tracking a fun-to-share product growth loop

Here's an example of a growth loop for a fun-to-share product:

1. Your company recruits User 1.
2. User 1 generates content.
3. User 2 sees content and signs up. 
4. User 2 generates content. 
5. User 3 sees content and signs up... etc.

### Fun-to-share loop required event taxonomy

In this example for a fun-to-share product, the following Events are needed in PostHog:

* User sign-up
  * Important - you will either need to make sure you're capturing the referrer details (our JS library does this by default), or that you have a referral mechanism you can control
* User activates
* User generates content
* User shares content (if possible)

### Fun-to-share loop dashboard items

Again, creating a dashboard is the easiest way to monitor this growth loop. The following [trend](../user-guides/trends) reports would be relevant to add to such a dashboard:

* Users signed up (total)
  * Users signed up (breakdown by initial referrer / referrer)
* Users activated
* Volume of content created
* Volume of content shared
  * This may be challenging to do technically, depending on the nature of how your product enables sharing.
* Referred users
  * Either through users signed up filtered on a specific referrer, through a direct referral mechanism inside the product, _or_ by asking users when they sign up
  
The following [funnels](../user-guides/funnels) would also be relevant to add:

* User sign-up conversion rate
* User activation rate
* Average number of pieces of content created per activated user
* Average number of pieces of content shared per piece of content created (if possible)
* Average number of referred users per piece of content shared (if possible)