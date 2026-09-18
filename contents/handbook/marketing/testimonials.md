---
title: Testimonials and G2
sidebar: Handbook
showTitle: true
---

## Social reviews on G2
We collect [reviews from users on G2](https://www.g2.com/products/posthog/reviews), both to act as social proof and to collect feedback on our product. After a process of trialling incentives, messaging and processes throughout 2022 we have established that:

- Reviews are best sought from users who have had a meaningful experience with the product (see below)
- Direct gift card incentives work better than other incentives, including charitable donations
- Batching reviews into monthly sends is imprecise and a non-trivial amount of work

As such, we have automated our review request process using Customer.io. 

The automation currently invites users to leave an honest review in exchange for a $25 gift card, if they match the following criteria. 

- User has completed the `insight analyzed` event at least 3 times in the last 30 days
OR
- User has completed the `recording analyzed` event at least 3 times in the last 30 days
OR
- User has completed the `feature flag created` event at least 1 time in the last 30 days
OR
- User has completed the `experiment launched` event at least 1 time in the last 30 days
AND
- User has a valid email address and is in the `Valid Email Address` segment
AND
- User has not previously been asked to review PostHog and is not in the `Historic G2 Requests` segment

This process is handled in Customer.io using the `G2 Review Requests` segment and the `G2 Review Requester` campaign workflow. Users are only asked to review PostHog once, with a 2-day delay after the targeting confirms a match. This is important so we can avoid bombarding users with emails and do not nag users for reviews after the initial request. 

More information about the G2 review process is available in [the initial G2 automation RFC](https://github.com/PostHog/meta/pull/83/files).

New reviews are automatically collected for team members in the internal #posthogfeedback Slack channel.

## Testimonials
We speak to our users regularly and are often fortunate enough that they say nice things about our product or our way of working. Other times users talk about us in public, such as on social media or on review platforms and forums. 

Not all of the feedback we receive can be used publicly. We don't assume that comments from [product feedback calls](/handbook/product/user-feedback) can be used without explicit approval, for example, though [approved customer stories](/customers), public reviews and social media comments certainly can. 

If feedback can be used publicly then we collect it here, so that we can use it elsewhere to enhance our website or docs. 

<TestimonialsTable />