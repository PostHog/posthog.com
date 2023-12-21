---
title: Automations
sidebar: Handbook
showTitle: true
---

## Automations

We have automations in place which are mainly driven using [Zapier](https://zapier.com/) (although we use HubSpot workflows too).  There is a shared Zapier login in 1Password.

### HubSpot and Zendesk tagging ([link](https://zapier.com/app/zaps/folder/1626388))

This folder has Zaps which set properties in HubSpot and Zapier, allowing us to link everything together in Vitally as well
as set Zendesk tags based on invoices/trials.

#### New PostHog Org -> HubSpot and Zendesk ([link](https://zapier.com/editor/215705576/published))

Triggered when a new Organization is created in PostHog (triggered by the [True first user signup — Cloud](https://us.posthog.com/data-management/actions/55969) action).

1. Looks up the HubSpot contact record for the email address of the user who created the org.
2. Sets the Organization ID property in HubSpot (so that it will link the HubSpot company to the Vitally account).
3. Looks up the person in Clearbit, to find their associated company information
4. Calls the Update tags on Zendesk org Sub Zap to create/update a Zendesk org with the Name and Domain from Clearbit and Organizaion ID as the Zendesk External ID (so that it will link the Zendesk org to the Vitally Account)

If it can't find associated company information in Clearbit then it won't try and update Zendesk as Zendesk requires a domain/company name on the org.

#### Billing trial activated event -> HubSpot and Zendesk ([link](https://zapier.com/editor/198072630/published))

Triggered when a trial is activated in the Billing UI (triggered by the [Billing trial activated](https://us.posthog.com/data-management/actions/40620) action).

1. Looks up the associated email in Clearbit
2. Continues only if there is an associated Company in the Clearbit payload
3. Calls the Update tags on Zendesk org Sub Zap to create/update a Zendesk org with the Name and Domain from Clearbit and Organizaion ID as the Zendesk External ID (so that it will link the Zendesk org to the Vitally Account)
4. Finds the Company by name in HubSpot 
5. Sets the Organization ID and Trial end date in HubSpot.
6. Creates an engagement (Task) in HubSpot for Simon reminding him of the trial end date.

#### Stripe Subscription Created -> HubSpot and Zendesk ([link](https://zapier.com/editor/211507272/published))

Triggered when a Stripe Subscription is created

1. Looks up the Stripe Customer object
2. Find the HubSpot contact from the Stripe Customer Email
3. Updates the PostHog Org ID on the HubSpot Company
4. Uses the Update tags on Zendesk org Sub Zap to ensure that there is a corresponding Zendesk Organization

#### Invoice paid event -> HubSpot and Zendesk ([link](https://zapier.com/editor/195382669/published))

Triggered when an invoice is paid (triggered by the [Non-zero billing spend](https://us.posthog.com/data-management/actions/40432) action).

1. Looks up the Stripe Customer object
2. Find the HubSpot contact from the Stripe Customer Email
3. Updates the Last payment amount and date, and PostHog Org ID on the HubSpot Company
4. Uses the Update tags on Zendesk org Sub Zap to ensure that there is a corresponding Zendesk Organization which is tagged accordingly:
   1. `priority_customer` if the MRR is greater than $1666
   2. `paying customer` if the MRR is less than $1666

#### Stripe Subscription cancelled -> Zendesk ([link](https://zapier.com/editor/190426088/published))

Triggered when a Stripe Subscription is cancelled

1. Looks up the associated email in Clearbit
2. Uses the Update tags on Zendesk org Sub Zap to ensure that there is a corresponding Zendesk Organization tagged as `non_paying`

### Sub-Zaps

These are used in a few different places to ensure we do things in a consistent manner.  It also ensures repetitive tasks are easy to update if needed.

#### Update tags on Zendesk org ([link](https://zapier.com/editor/198225000/published))

Ensures that a Zendesk org is created and tagged correctly

1. Accepts the following inputs:
   1. Company name (required)
   2. Domain (required)
   3. Tags
   4. Organization ID
   5. Instance
   6. Startup plan or Trial ends at
2. Formats tags and startup/trial ends at in case of missing data
3. Formats startup/trial end in YYYY-MM-DD 
4. Creates or Updates an organization with the information above