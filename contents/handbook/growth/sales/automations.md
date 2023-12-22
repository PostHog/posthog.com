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
   2. `paying_customer` if the MRR is less than $1666

#### Stripe Subscription cancelled -> Zendesk ([link](https://zapier.com/editor/190426088/published))

Triggered when a Stripe Subscription is cancelled

1. Looks up the associated email in Clearbit
2. Uses the Update tags on Zendesk org Sub Zap to ensure that there is a corresponding Zendesk Organization tagged as `non_paying`

### HubSpot Automation ([link](https://zapier.com/app/zaps/folder/1703751))

There are three zaps here which create follow-on deals when any hands-on pipeline deal is closed:

1. HubSpot Inbound Hands-on Deal Closed to Renewal Deal ([link](https://zapier.com/editor/197645719/published))
2. HubSpot PQL Hands-on Deal Closed to Renewal Deal([link](https://zapier.com/editor/209163551/published))
3. HubSpot Renewal Deal Closed to Renewal Deal ([link](https://zapier.com/editor/197651007/published))

They're triggered by a deal closing in the respective pipeline.  It figures out the new deal close date based on the term 
in the existing deal (1,2,3 years) and then creates a new deal in the renewal pipeline, with amounts and ownership copied over too. 

### Sales Pipeline Events to PostHog ([link](https://zapier.com/app/zaps/folder/1831268))

This is to ensure we are tracking pipeline updates as PostHog events, so that we can model our sales pipeline as a funnel.

#### Calendly Event Scheduled to PostHog ([link](https://zapier.com/editor/208732730/published))

Triggered when a new event is created via Calendly, this:

1. Looks up the PostHog Distinct ID via the email address of the person
2. Captures a `calendly.event_scheduled` event in PostHog with either the Distinct ID above or email address as the Distinct ID if there wasn't a match.

#### HubSpot Deal Stage Changes to PostHog ([link](https://zapier.com/editor/208833861/published))

Triggered when a deal stage is updated in HubSpot, this:

1. Transforms the HubSpot ID of the Pipeline and Stage to the names via lookup tables and only carries on if matches are found
2. Gets the Deal Contact and Owner information
3. Captures a `<pipeline-name> <stage-name>` event in PostHog with the Contact email as the Distinct ID

### Annual Plan Automation ([link](https://zapier.com/app/zaps/folder/1926239))

To ensure consistency in the setup of annual plans we have Zapier Automation to take care of all of the Stripe-related object setup.

#### Load Contract Details to Annual Plan Table ([link](https://zapier.com/editor/217375860/published))

Once an [Order Form is closed in PandaDoc](/handbook/growth/sales/contracts#routing-an-order-form-for-review-and-signature), Zapier will add a new row to the [Annual Plan Table](https://tables.zapier.com/app/tables/t/01HGX2N9JXNV2EEDYARD24901R) with the following information set:

1. Order Form ID
2. Customer Email
3. Customer Address
4. Company Domain 
5. Contract Start Date
6. Contract Term (months)
7. Credit Amount
8. Discount
9. Price

#### Create ([link](https://zapier.com/editor/217382132/published)) or Update Stripe Customer

If the Customer has an existing record in Stripe (e.g. they are already subscribed to PostHog) then copy their Customer ID 
(starts `cus_`) from Stripe to the _Stripe Customer ID_ column.  If they don't have an existing Customer in Stripe then 
click the _Create Stripe Customer_ button in the table to trigger a Zap to create one.  The Zap also automatically adds the ID to the table.

#### Create Invoice ([link](https://zapier.com/editor/217383049/published))

Once you click the Create Invoice button this will create a Stripe Invoice in draft format.  The following table fields need to be populated for this to work so check them before clicking the button:

1. Start Date
2. Term (months)
3. Credit Amount
4. Price

Once it's completed it'll populate the table with the Invoice ID and Link.  Review this in Stripe, and when you are ready send the Invoice to the customer.

**Note: You need to send the invoice to the customer before you apply the credit below.  If you apply the credit whilst the Invoice is in a draft state it'll just pay the invoice with the credit, which defeats the purpose**

#### Apply Stripe Credit / Zendesk Tags ([link](https://zapier.com/editor/217389895/published))

Here you can click _Apply Credit_ to apply the Stripe Credit and Zendesk tags using the corresponding Sub Zaps.  It will apply the `priority_customer` tag if the price is above $20k, and `paying_customer` otherwise.

#### Schedule Subscription ([link](https://zapier.com/editor/217713096/published))

If the customer doesn't already have a running monthly subscription you can create one with the desired configuration of paid products.  Select the products you want to include and then click the Schedule Subscription button.  It'll create a Subscription which is either Scheduled if the Start Date is in the future, or live if it is in the past.

Remember to update the Subscription in the Billing Admin Portal

**Note: It has the current default Stripe Price IDs hardcoded in the Zap so if we update those we need to remember to update them in this Zap too.**

### YC Program ([link](https://zapier.com/app/zaps/folder/1685574))

This process is documented in the [YC Onboarding](/handbook/growth/sales/yc-onboarding) section of the handbook.

### PostHog for Startups

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

#### Apply Stripe Credit ([link](https://zapier.com/editor/198228018/published))

Applies credit and associated metadata to a Stripe Customer object

1. Accepts the following inputs:
   1. Duration (e.g. 1 year or 6 months)
   2. Stripe Customer ID
   3. Amount (dollars)
   4. Description (optional)
   5. Credit start date
   6. Is startup credit
2. Calculates the credit end date from the Start Date + Duration
3. Converts Dollars to Cents (for Stripe)
4. Adds the credit balance via the Stripe API
5. Updates the following metadata on the Customer Object:
   1. `credit_expires_at`
   2. `is_startup_plan_customer`
