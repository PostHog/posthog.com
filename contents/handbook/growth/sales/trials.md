---
title: Trials
sidebar: Handbook
showTitle: true
---


Prerequisites
- Customer needs to have an Organization set up on the EU or US Cloud
- You need access to the billing admin (billing.posthog.com).  Ask Raquel or Simon for access.

Process for giving a customer a free trial:
1. Log in to [Billing](https://billing.posthog.com/admin/) with your Google SSO login.
2. Click the `Trials` link on the left sidebar.
3. Click the `Add Trial` button (top right).
4. Fill out the trial form
  - Customer: search for customer by Organization Name or ID
  - Status: set to `Active`
  - Target: set to whatever is needed (paid, teams, enterprise)
  - Type: set to `Standard`
  - Expiration date: set it to whatever is needed (2 weeks, 4 weeks for larger ($100k+) customers, etc)
  - Check `Silence notifications` if you don't want them to get trial notifications
5. Click `Save`
6. The next time that Customer visits PostHog, their `AvailableFeatures` will be updated to reflect the standard premium features (they might have to refresh their page to properly sync the new billing information).
7. Once this date passes their `AvailableFeatures` will be reset to the free plan unless they have subscribed within this time.

Additional steps for existing customers with paid subscriptions
For customers with existing paid subscriptions we need to complete additional steps to make sure they are billed correctly. 

**Important: Ask Mine to update Stripe and billing admin so she can make sure revenue numbers are unaffected and customer isn't billed while on trial.**

1. Follow the steps above to create a trial.
2. Remove Stripe Subscription ID in the Billing Admin (keep the Stripe Customer ID).
3. Set all products in the product map to a free status.
4. Cancel subscription in stripe: Ensure the subscription is canceled in Stripe so they are not billed during the trial.
5. Create new subscription before trial ends and update Billing Admin so customer experience isn't affected when transitioning back to a paid plan.
   
If they need a shared Slack channel as part of the trial, [follow these instructions.](/handbook/growth/sales/slack-channels)

Consider framing a collaborative method for progressing in the trial period with timed objectives. If it's new and depending on the level of engagement, we can use a detailed [success plan](/handbook/cs-and-onboarding/onboarding-success-plan).

## Spend caps during a trial

A trial lifts the free tier so a customer can try what they do not pay for. It leaves a spend limit they set exactly as it stands outside the trial, on every product.

Four products also get a cap where the customer set no limit: Replay Vision, Desktop, PostHog AI, and Inbox. These meter model tokens, so an unlimited trial on them is expensive for us. Every other product the customer set no limit on runs unlimited for the length of the trial, which is what a trial is for.

| Product | On a paid plan | No subscription |
| --- | --- | --- |
| Replay Vision | 7,500 credits (free tier + $50) | 5,000 credits |
| Desktop | 12,000 credits (free tier + $100) | 4,000 credits |
| PostHog AI | 15,500 credits (free tier + $150) | 1,000 credits |
| Inbox | 19,500 credits (free tier + $150) | 9,000 credits |

A customer on a paid plan pays for what they use, so their own limit is the figure that governs. A customer with no subscription pays nothing, so the cap is what the trial lends them.

An addon reads the limit on its parent. For example, Mobile Session Replay follows the Session Replay limit, and Batch Exports follows Realtime Destinations.

If a prospect needs more than this, raise their spend limit rather than removing it.
