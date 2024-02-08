---
title: Automations
sidebar: Handbook
showTitle: true
---

# Automations

As [Vitally](https://posthog.vitally-eu.io/) connects all of our Product, Stripe, Zendesk and HubSpot data together it's 
the best place to trigger automations via Playbooks.  These Playbooks can call a webhook after Accounts or Users meet certain
criteria.  This allows us to call out to [Zapier](https://zapier.com/) to use their inbuilt actions to update Zendesk, HubSpot, Slack and more.
  We use Zapier extensively throughout the company for automation.  There is a shared Zapier login in 1Password.

## Connecting everything together

Vitally requires a consistent `external_id` to be present to link everything together.  For Accounts, we use the `posthog_organization_id` and for Users it's their `email`.

## Vitally Segmentation

Vitally uses Playbooks to put Accounts and Users into Segments, which are useful for reporting as well as targeting of Playbooks.
We have the following Segmentation Playbooks defined:

1. Segment Name: $60K ARR
   * [Playbook Link](https://posthog.vitally-eu.io/settings/playbooks/d90fa519-5162-4dc5-b530-5a9464689f70)
   * Criteria
     * Account not in Startups Segment
     * ARR >= $60K
2. Segment Name: $20K ARR
   * [Playbook Link](https://posthog.vitally-eu.io/settings/playbooks/69d760e6-3312-4ca0-8b79-55d59d36582f)
   * Criteria
      * Account not in Startups Segment
      * ARR >= $20K AND ARR < $60K
3. Segment Name: Startup Plan
   * [Playbook Link](https://posthog.vitally-eu.io/settings/playbooks/b64b3483-485b-4892-a915-e5c424768cd7)
   * Used to track companies either on PostHog for Startups or the YC Program
   * Criteria
      * Stripe Account Balance < 0 (e.g. they have credit remaining)
      * Stripe Credit Expires at > 0 days from today (e.g. it hasn't expired yet)
      * Stripe Is Startup Plan Metadata is not false or null (e.g. they haven't been marked as being on a paid annual plan)
4. Segment Name: Annual Plan
   * [Playbook Link](https://posthog.vitally-eu.io/settings/playbooks/5aa872ac-a78a-42d5-81d5-42b198ba0a4e)
   * Criteria
     * Stripe Subscription interval is yearly
     * OR
     * Stripe Account Balance < 0 (e.g. they have credit remaining)
     * Stripe Credit Expires at > 0 days from today (e.g. it hasn't expired yet)
     * Stripe Is Startup Plan Metadata is false or null (e.g. they haven't been marked as being on the startup plan)
5. Segment Name: Active Trial
   * [Playbook Link](https://posthog.vitally-eu.io/settings/playbooks/bd306a59-f35a-4d6b-ac85-d5892277410d)
   * Criteria
      * Free Trial Until is greater than 0 days from now (comes from the Billing Postgres connection)
6. Segment Name: First payment forecasted this month
    * [Playbook Link](https://posthog.vitally-eu.io/settings/playbooks/bd306a59-f35a-4d6b-ac85-d5892277410d)
    * Criteria
        * Lifetime Value (LTV) is 0 (e.g. they have never paid us)
        * Stripe current period end is greater than 0 days from now
        * Forecasted MRR > $1

## Vitally -> Zendesk/HubSpot Automation

As Vitally has Subscription/Segment information it's the best place to drive Zendesk tagging and other activities.

### Ensuring that Vitally Accounts have corresponding Zendesk Organization and HubSpot Companies associated with them

The [New Orgs to Zendesk and HubSpot via Zapier](https://posthog.vitally-eu.io/settings/playbooks/854c7f79-a6ad-4f63-91a8-aa86ae8ef009)
playbook triggers on Accounts where there is _no associated Zendesk ID_ but there _is a Stripe Customer email_, so that we can 
look up the contact and company information in HubSpot.  When these criteria are matched the playbook sends the following traits to a webhook which triggers 
the [Vitally Webhook to New Zendesk Org and HubSpot](https://zapier.com/editor/223482722/published) Zap:
* orgName - PostHog Organization Name
* orgID - PostHog Organization ID
* customerID - Billing Customer ID
* email - Stripe Email
* siteURL - the URL of the PostHog Cloud they're on (useful to have in Zendesk)

The Zap then:

1. Tries to find a HubSpot contact matching the email
2. If successful, looks up the associated HubSpot Company
3. Sets the posthog_organization_id property in HubSpot so that Vitally will be able to link to the Company
4. Creates a Zendesk Organization with the following properties:
   * name - Billing Customer ID - PostHog Organiation Name (e.g. 12345 - PostHog) which guarantees uniqueness
   * external_id - PostHog Organization ID
   * domain - The domain name from the HubSpot Company Object (which might not exist - see below)

There are some scenarios (e.g. gmail signups) where HubSpot doesn't have an associated company record and as such 
there won't be a domain to supply to Zendesk.  In this case the automation completes but also adds the Email and Zendesk
org information to the [Zendesk Orgs Without a Domain](https://tables.zapier.com/app/tables/t/01HNJGVGMKNCSQKYZ2DG412DT2)
table.  For each row there are two buttons:
* Add Domain to Org - Will fire a [Zap](https://zapier.com/editor/224435309) to extract the company name from the email and set it on the Zendesk Organization.  Use this one if it's clearly the right company domain.
* Add User to Org - Will fire a [Zap](https://zapier.com/editor/224437649) which adds that individual user to the Zendesk Organization.  Use this if it's a webmail provider (e.g. gmail) as we don't everyone with a @gmail.com email creating tickets for this Organization, but do want this user to get the right level of support for their Organization.

### Tagging Zendesk Organizations based on Segment and Subscription information

As Vitally is the best source of truth for Active Subscription / Payment information which informs our Zendesk ticket prioritization, there are a number of Vitally playbooks which will trigger the webhook associated with the [Vitally Webhook to Zendesk Tags](https://zapier.com/editor/223322392/published) Zap, passing along the following traits:
* zendesk_id - The Zendesk Organization ID (internal, not external_id)
* playbook name - The tags to set on the Zendesk Organization

The Zap then updates the specific Zendesk Organization with the requested tags.

1. Zendesk Tag: `priority_customer`
    * [Playbook Link](https://posthog.vitally-eu.io/settings/playbooks/ec97ac42-015d-4714-b715-fc4c7456e70b)
    * Criteria
        * Account is PostHog
        * Account not in Startup Plan Segment
        * ARR >= $20K
        * Zendesk Org ID is set
2. Zendesk Tag: `paying_customer`
    * [Playbook Link](https://posthog.vitally-eu.io/settings/playbooks/44096139-7467-4840-aeee-85116488ad92)
    * Criteria
        * Account not in Startup Plan Segment
        * ARR > 0 and < $20K
        * Zendesk Org ID is set
3. Zendesk Tag: `non_paying`
    * [Playbook Link](https://posthog.vitally-eu.io/settings/playbooks/60b3e128-03dc-40ee-95b6-c2eb1b58f05e)
    * Criteria
        * Account is not PostHog  
        * Account not in Startup Plan or Active Trial Segments
        * ARR = 0
        * Zendesk Org ID is set
4. Zendesk Tag: `churned`
    * [Playbook Link](https://posthog.vitally-eu.io/settings/playbooks/18482a9c-fcfe-4051-8f02-6549059d9683)
    * Criteria
        * Account is not PostHog
        * Account not in Active Trial Segment
        * Stripe Subscription Status is Cancelled
        * Zendesk Org ID is set
5. Zendesk Tag: `startup_plan`
    * [Playbook Link](https://posthog.vitally-eu.io/settings/playbooks/c679b8de-0dfe-4edd-9195-c9bf8c1ef431)
    * Criteria
        * Account in Startup Plan Segment
        * Zendesk Org ID is set
6. Zendesk Tag: `trial`
    * [Playbook Link](https://posthog.vitally-eu.io/settings/playbooks/f416282c-75af-41b9-ad77-8134c3e2613c)
    * Criteria
        * Account in Active Trial Segment
        * Zendesk Org ID is set


## [Deprecated] HubSpot and Zendesk tagging

The Zaps in this [folder](https://zapier.com/app/zaps/folder/1626388) have been mostly turned off in favour of the Vitally automations above, however there are some 
which are still enabled as we need to figure out how to handle them via Vitally.

### Billing trial activated event -> HubSpot and Zendesk

_This needs to be moved to Vitally_

This [Zap](https://zapier.com/editor/198072630/published) is triggered when a trial is activated in the Billing UI (triggered by the [Billing trial activated](https://us.posthog.com/data-management/actions/40620) action).

1. Looks up the associated email in Clearbit
2. Continues only if there is an associated Company in the Clearbit payload
3. Calls the Update tags on Zendesk org Sub Zap to create/update a Zendesk org with the Name and Domain from Clearbit and Organizaion ID as the Zendesk External ID (so that it will link the Zendesk org to the Vitally Account)
4. Finds the Company by name in HubSpot 
5. Sets the Organization ID and Trial end date in HubSpot.
6. Creates an engagement (Task) in HubSpot for Simon reminding him of the trial end date.

## HubSpot Automation

There are three zaps in this [folder](https://zapier.com/app/zaps/folder/1703751) which create follow-on deals when any hands-on pipeline deal is closed:

1. HubSpot Inbound Hands-on Deal Closed to Renewal Deal ([link](https://zapier.com/editor/197645719/published))
2. HubSpot PQL Hands-on Deal Closed to Renewal Deal([link](https://zapier.com/editor/209163551/published))
3. HubSpot Renewal Deal Closed to Renewal Deal ([link](https://zapier.com/editor/197651007/published))

They're triggered by a deal closing in the respective pipeline.  It figures out the new deal close date based on the term 
in the existing deal (1,2,3 years) and then creates a new deal in the renewal pipeline, with amounts and ownership copied over too. 

## Sales Pipeline Events to PostHog

This [folder](https://zapier.com/app/zaps/folder/1831268) contains Zaps which ensure we are tracking pipeline updates as PostHog events, so that we can model our sales pipeline as a funnel.

### Calendly Event Scheduled to PostHog

This [Zap](https://zapier.com/editor/208732730/published) is triggered when a new event is created via Calendly, this:

1. Looks up the PostHog Distinct ID via the email address of the person
2. Captures a `calendly.event_scheduled` event in PostHog with either the Distinct ID above or email address as the Distinct ID if there wasn't a match.

### HubSpot Deal Stage Changes to PostHog

This [Zap](https://zapier.com/editor/208833861/published) is triggered when a deal stage is updated in HubSpot, this:

1. Transforms the HubSpot ID of the Pipeline and Stage to the names via lookup tables and only carries on if matches are found
2. Gets the Deal Contact and Owner information
3. Captures a `<pipeline-name> <stage-name>` event in PostHog with the Contact email as the Distinct ID

## Annual Plan Automation

To ensure consistency in the setup of annual plans we have [Zapier Automation](https://zapier.com/app/zaps/folder/1926239) to take care of all of the Stripe-related object setup.

### Load Contract Details to Annual Plan Table

Once an [Order Form is closed in PandaDoc](/handbook/growth/sales/contracts#routing-an-order-form-for-review-and-signature), This [Zap](https://zapier.com/editor/217375860/published) will add a new row to the [Annual Plan Table](https://tables.zapier.com/app/tables/t/01HGX2N9JXNV2EEDYARD24901R) with the following information set:

1. Order Form ID
2. Customer Email
3. Customer Address
4. Company Domain 
5. Contract Start Date
6. Contract Term (months)
7. Credit Amount
8. Discount
9. Price

### Create or Update Stripe Customer

If the Customer has an existing record in Stripe (e.g. they are already subscribed to PostHog) then copy their Customer ID 
(starts `cus_`) from Stripe to the _Stripe Customer ID_ column.  If they don't have an existing Customer in Stripe then 
click the _Create Stripe Customer_ button in the table to trigger a [Zap](https://zapier.com/editor/217382132/published) to create one.  The Zap also automatically adds the ID to the table.

### Create Invoice

Once you click the Create Invoice button this [Zap](https://zapier.com/editor/217383049/published) will create a Stripe Invoice in draft format.  The following table fields need to be populated for this to work so check them before clicking the button:

1. Start Date
2. Term (months)
3. Credit Amount
4. Price

Once it's completed it'll populate the table with the Invoice ID and Link.  Review this in Stripe, and when you are ready send the Invoice to the customer.

**Note: You need to send the invoice to the customer before you apply the credit below.  If you apply the credit whilst the Invoice is in a draft state it'll just pay the invoice with the credit, which defeats the purpose**

### Apply Stripe Credit / Zendesk Tags

Here you can click _Apply Credit_ to trigger a [Zap](https://zapier.com/editor/217389895/published) which applies the Stripe Credit and Zendesk tags using the corresponding Sub Zaps.  It will apply the `priority_customer` tag if the price is above $20k, and `paying_customer` otherwise.

### Schedule Subscription

If the customer doesn't already have a running monthly subscription this [Zap](https://zapier.com/editor/217713096/published) will create one with the desired configuration of paid products.  Select the products you want to include and then click the Schedule Subscription button.  It'll create a Subscription which is either Scheduled if the Start Date is in the future, or live if it is in the past.

Remember to update the Subscription in the Billing Admin Portal

**Note: It has the current default Stripe Price IDs hardcoded in the Zap so if we update those we need to remember to update them in this Zap too.**

## YC Program

This process is documented in the [YC Onboarding](/handbook/growth/sales/yc-onboarding) section of the handbook.

## PostHog for Startups

_Work in progress_

## Sub-Zaps

These are used in a few different places to ensure we do things in a consistent manner.  It also ensures repetitive tasks are easy to update if needed.

### [Deprecated] Update tags on Zendesk org

_Mostly deprecated as we use Vitally for this now_

This [Zap](https://zapier.com/editor/198225000/published) ensures that a Zendesk org is created and tagged correctly

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

### Apply Stripe Credit

This [Zap](https://zapier.com/editor/198228018/published) applies credit and associated metadata to a Stripe Customer object

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
