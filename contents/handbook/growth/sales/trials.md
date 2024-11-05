---
title: Trials
sidebar: Handbook
showTitle: true
---


Prerequisites
- Customer needs to have an Organization set up on the EU or US Cloud
- You need access to the billing admin (billing.posthog.com).  Ask Raquel or Simon for access.

Process for giving a customer a free trial:
1. Log in to [Billing](billing.posthog.com/admin/) with your Google SSO login.
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