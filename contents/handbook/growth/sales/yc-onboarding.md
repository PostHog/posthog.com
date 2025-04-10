---
title: YC onboarding
sidebar: Handbook
showTitle: true
---

We want to support other YC companies using PostHog because:

- Many of these companies will quickly grow into [our ICP](/handbook/who-we-are-building-for) and we have an opportunity to get in early with them. 
- A lot of our most helpful and direct product feedback has generally come from other YC companies. 
- It's nice to give back to the YC community. 

## The YC deal

For startups in the current batch:

- Get $50k of credit for PostHog Cloud for 12 months
- _All founders_ get a Timbuk2 backpack
- A private YC Slack channel for priority support
- Get the batphone - CEO on whatsapp/text

If a founder refers us to another YC company, both founders get an additional $5k of credit for PostHog Cloud plus a copy of the PMF guide. 

For previous batches:

- Get $50k of credit for PostHog Cloud for 12 months ($25k / 12 months for anyone not in the last 4 batches).

> Only James has the ability to update our deal in Bookface, so any changes to the deal text should be made in [this Google Doc](https://docs.google.com/document/d/17MtngAx2DeVo3YyhPwwKRvakI54SJuNmHkPtFns2IVQ/edit) then shared with him. 

## Our process

We want to make this feel as personalized as possible - there is an outsized impact in giving YC companies personal attention to ensure they are successful with PostHog. 

- Kendal maintains a sheet with the details for all companies in the current batch as they launch (since the list isn't available anywhere)
- James H messages every single one of them individually so that a) they have his number, and b) to tell them about the YC deal on Bookface
- YC companies check out the deal and then book in for an onboarding call (see detailed section below)
- Once companies are set up with us, we ask them to mark themselves as 'using' PostHog in Bookface
- Add them to the `#posthog-founders-club` channel in Slack - this is where they can get priority support

## Setting up billing

To get them set up for the YC Deal there are various options in the [Zapier table](https://tables.zapier.com/app/tables/t/01H2896A4Y47C650WK0ZKX9FPE).

There are three Approve buttons for each row in the table corresponding to the different YC deals.  There's also a handy link in the table to the YC Search for their company name so you can click through to validate them.

**Note that the Approve buttons require the following fields to be populated, or the automation will fail silently:**
* Stripe Customer ID (for Stripe credit)
* Company Name (for Zendesk tagging)
* Domain (for Zendesk tagging)
* Email (for confirmation and to share Brilliant giveaway links)

If the Stripe Customer ID is set to `unknown` it's because we couldn't automatically find a Stripe subscription for the email they used.  You need to populate it yourself or ask the customer to subscribe if they've not yet set up billing.  There's a handy *Subscribe Please* button in each table row which will email them asking to subscribe.

Once you click the correct Approve button the [Zap](https://zapier.com/editor/196025535/published/196317316) will automatically do the following:

1. Apply the correct credit amount to their Stripe customer object, and also update the plan expiry data metadata
2. Set up their org on Zendesk and tag them as on the startup plan (meaning their tickets will be tagged with Normal priority)
3. (Current batch only) Generate a Brilliant giveaway link
4. Email the details of the plan and giveaway link to the customer (from Cameron)

### If we need to send giveaways outside of the Zapier automation

The easiest way to give a customer merch is to [create a gift card for them in Shopify](/handbook/company/merch-store#customers).

If the customer lives outside the US or Canada, you should offer them a choice between $150 merch credit or Open Collective donation, rather than offering specific merch items.

Please do not send specific merch items outside of the US and Canada - this creates big customs headaches for us and is a bad experience for the user. If a user outside those countries is desperate for them, then either:

- Suggest they give us a US/Canada postal address they can forward or collect from
- Send them the item but at their own risk for paying customs fees etc.
