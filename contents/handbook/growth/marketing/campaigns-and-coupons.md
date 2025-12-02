---
title: Campaigns and coupons
sidebar: Handbook
showTitle: true
---

We run promotional campaigns with partners (e.g., newsletters, influencers) that offer exclusive benefits to their audiences via coupon codes.

## How it works

1. **Campaign setup**: Campaigns are created in Django Admin with a strategy defining what benefits are granted (e.g., free addons, increased limits, credits)
2. **Code distribution**: Coupon codes are exported as CSV and shared with the partner for distribution to their audience
3. **Redemption**: Users visit `/coupons/{campaign-slug}` to redeem their code (requires paid PostHog subscription)
4. **Expiration**: Benefits can automatically expire after the campaign period (e.g., 12 months)

## Example: Lenny's Newsletter

Our partnership with Lenny's Newsletter offers annual subscribers:
- Free Scale addon
- 2x free tier limits on all usage-based products
- Valid for 12 months from redemption
- Only for new organizations with active subscription

Redemption page: `/coupons/lenny`

## Creating a new campaign

For technical implementation details, see the [internal billing docs](https://github.com/PostHog/billing/blob/main/notes/campaigns-and-coupons.md).
