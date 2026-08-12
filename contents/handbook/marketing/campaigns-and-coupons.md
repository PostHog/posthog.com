---
title: Campaigns and coupons
sidebar: Handbook
showTitle: true
---

We run promotional campaigns with partners (e.g., newsletters, influencers) that offer exclusive benefits to their audiences via coupon codes.

## How it works

1. **Campaign setup**: Campaigns are created in Billing Admin with a strategy defining what benefits are granted (e.g., free addons, increased limits, credits)
2. **Code distribution**: Coupon codes are exported as CSV and shared with the partner for distribution to their audience
3. **Redemption**: Users visit `/coupons/{campaign-slug}` to redeem their code (requires paid PostHog subscription)
4. **Expiration**: Benefits can automatically expire after the campaign period (e.g., 12 months)

## Onboarding flow integration

When new users sign up via a campaign link (e.g., `posthog.com/signup?next=/coupons/lenny`), they're shown the coupon redemption page early in onboarding:

1. User signs up with `?next=/coupons/lenny` query param
2. After signup, they're redirected to `/onboarding/coupons/lenny` instead of directly to `/coupons/lenny`
3. They can claim the coupon or skip and continue to product setup
4. After claiming/skipping, they proceed to the normal onboarding flow (use-case selection or products page)

This ensures new users see the coupon offer before diving into product configuration.

Note: Existing (already onboarded) users bypass this and go directly to `/coupons/:campaign`.

## Example: Lenny's Newsletter

When launched, our partnership with Lenny's Newsletter offered their annual subscribers:
- Free Scale package
- 2x free tier limits on all usage-based tools
- Valid for 12 months from redemption
- Only for organizations with no paid invoices before December 1st 2025

Redemption page: `/coupons/lenny`

## When a coupon customer wants an annual contract

Coupon benefits reduce a customer's bill, they don't zero it, so coupon holders are paying customers who can convert to an annual contract at any point during the campaign period. When they do, we leave the coupon alone: it runs to its original expiry and expires automatically, and the contract is sized to account for the step-up when it does. We don't extend, swap, or cancel campaign benefits to win a deal.

Sales owns the detail — see [contracts for customers on time-limited plans](/handbook/growth/sales/contract-rules#contracts-for-customers-on-time-limited-plans).

## Creating a new campaign

For technical implementation details, see the [internal billing docs](https://github.com/PostHog/billing/blob/main/notes/campaigns-and-coupons.md).
