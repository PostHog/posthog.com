---
title: YC onboarding
sidebar: Handbook
showTitle: true
---

We want to support other YC companies using PostHog because:

- Many of these companies will quickly grow into [our ICP](https://posthog.com/handbook/strategy/ideal-customer-persona) and we have an opportunity to get in early with them. 
- A lot of our most helpful and direct product feedback has generally come from other YC companies. 
- It's nice to give back to the YC community. 

## The YC deal

For startups in the W23 batch:

- Get $50k of credit for PostHog Cloud for 12 months
- _All founders_ get a Timbuk2 backpack
- Book into a free YC group setup session where we will…
  - Build a dashboard for the batch with your product growth metrics
  - Pair with you to ensure you pass calls correctly
- Get the batphone - CEO on whatsapp/text

If a founder refers us to another YC company, both founders get an additional $5k of credit for PostHog Cloud plus a copy of the PMF guide. 

For previous batches:

- Get $50k of credit for PostHog Cloud for 12 months ($25k / 6 months for anyone not in the last 4 batches).

> Only James has the ability to update our deal in Bookface, so any changes to the deal text should be made in [this Google Doc](https://docs.google.com/document/d/17MtngAx2DeVo3YyhPwwKRvakI54SJuNmHkPtFns2IVQ/edit) then shared with him. 

## Our process

We want to make this feel as personalized as possible - there is an outsized impact in giving YC companies personal attention to ensure they are successful with PostHog. 

- Kendal maintains a sheet with the details for all companies in the current batch as they launch (since the list isn't available anywhere)
- James H messages every single one of them individually so that a) they have his number, and b) to tell them about the YC deal on Bookface
- YC companies check out the deal and then book in for an onboarding call (see detailed section below)
- Once companies are set up with us, we ask them to mark themselves as 'using' PostHog in Bookface

## Onboarding call

### Inbound request sources

YC companies can either fill in our [dedicated YC Onboarding form](/yc-onboarding) or email us directly on _[yc@posthog.com](mailto:yc@posthog.com)_.

The YC Onboarding form will automatically populate the [YC Plan Applications](https://tables.zapier.com/app/tables/t/01H2896A4Y47C650WK0ZKX9FPE) Zapier table, looking up Stripe and HubSpot data for the company if we have it.  If people email us directly you'll need to update the table yourself.

When submitting the form users have four options to describe their situation:
1. "I need a demo" - they will receive an email from Cameron inviting them to sign up and book a demo.
2. "I just want the YC deal" - they won't receive an email and we just need to Activate them (see below)
3. "I have a few questions" - they will receive an email from Cameron inviting them to sign up and then email the questions they have.
4. "I need help with implementation" - they will receive an email from Cameron inviting them to sign up and book a meeting.

### Before the call

Ideally, we want users to have gotten started with PostHog before the demo call. From our YC Onboarding page:

> Before the call, we recommend you sign up to our Cloud version and try installing our snippet on your website. Doing so would allow us to tailor the onboarding to your needs, leveraging data from your website instead of demo data. However, if you prefer to get a demo first, we'll provide a 30-minute overview.

> We require people to be using PostHog Cloud for the YC deal - there are no longer paid plans for self-hosted.

If users come to the call with a ready instance, we can focus more on their needs and setting up relevant views than a basic overview of the platform that they could have gotten without us.

### The demo

Read more about running demos on our [dedicated page](/handbook/growth/sales/demos).

#### Let the user drive

Always tailor the demo to the user specifically! Skip things they don't need and let them decide what they want to see. Be friendly and helpful, not salesy! Our goal is for these users to be able to use PostHog to improve *their* product.

## After the call

To get them set up for the YC Deal there are various options in the [Zapier table](https://tables.zapier.com/app/tables/t/01H2896A4Y47C650WK0ZKX9FPE).

There are three Approve buttons for each row in the table corresponding to the different YC deals.  There's also a handy link in the table to the YC Search for their company name so you can click through to validate them.

**Note that the Approve buttons require the following fields to be populated, or the automation will fail silently:**
* Stripe Customer ID (for Stripe credit)
* Company Name (for Zendesk tagging)
* Domain (for Zendesk tagging)
* Email (for confirmation and to share Printfection giveaway links)

If the Stripe Customer ID is set to `unknown` it's because we couldn't automatically find a Stripe subscription for the email they used.  You need to populate it yourself or ask the customer to subscribe if they've not yet set up billing.  There's a handy *Subscribe Please* button in each table row which will email them asking to subscribe.

Once you click the correct Approve button the [Zap](https://zapier.com/editor/196025535/published/196317316) will automatically do the following:

1. Apply the correct credit amount to their Stripe customer object, and also update the plan expiry data metadata
2. Set up their org on Zendesk and tag them as on the startup plan (meaning their tickets will be tagged with Normal priority)
3. (Current batch only) Generate a Printfection giveaway link
4. Email the details of the plan and giveaway link to the customer (from Cameron)

### If we need to send giveaways outside of the Zapier automation

Customers have the following giveaway options. Our default are a choice of AirPods or Timbuk2 rucksack for folks in the US or Canada - if they live outside these countries, you should offer them a choice between $150 merch credit or Open Collective donation.

Please do _not_ send Airpods or Timbuk2 outside of the US and Canada - this creates big customs headaches for us and is a bad experience for the user. If a user outside those countries is desperate for them, then either:

- Suggest they give us a US/Canada postal address they can forward or collect from
- Send them the item but at their own risk for paying customs fees etc.

<table>
<thead>
<tr>
<td width="150" valign="top">

**Giveaway**

</td>
<td width="100" valign="top">

**Eligible locations**

</td>
<td valign="top">

**How to share**

</td>
</tr>
</thead>
<tbody>

<!-- AirPods or Timbuk2 backpack via Printfection -->
<tr>
<td valign="top">

AirPods or Timbuk2 backpack
<small>(Depending on stock availability)</small>

</td>
<td valign="top">

US and Canada addresses only*

</td>
<td valign="top">

To create a one-time giveaway link:

- [Login to Printfection](https://app.printfection.com/account/secure_login.php)
- Go to **Campaigns** -> **Giveaways** -> **The PostHog YC Program**.
- Click the **Get New Link** button and copy the link.
- Send the link to the YC contact and mark the link as sent in Printfection.

</td>
</tr>

<!-- Shopify merch giftcard -->

<tr>
<td valign="top">

[PostHog merch](https://merch.posthog.com) $150 gift card (Shopify)

</td>
<td valign="top">

Global

</td>
<td valign="top">

To create a giftcard in Shopify:

- [Login to Shopify](https://posthog.myshopify.com/admin)
- Select **Products** -> **Gift cards** from the left-hand menu
- Click **Issue gift card**
- Create a new customer via the **Find or create a customer** section
- Update the value to $150 and click **Save**

</td>
</tr>

<!-- Open Collective giftcard -->

<tr>
<td valign="top">

[Open Collective](https://opencollective.com) $150 gift card

</td>
<td valign="top">

Global

</td>
<td valign="top">

To create a giftcard in Open Collective:

- [Signin to Open Collective](https://opencollective.com/signin)
- Go to the [Gift Cards section within the PostHog org](https://opencollective.com/posthog/edit/gift-cards)
- Click **Create gift cards**
- Set the amount to $150 and set a reasonably long expiry
- Choose to either send the customer the gift card via Open Collective or via a link
- Depending on the option chosen for the above step, create the gift card

</td>
</tr>

</tbody>
</table>

## Responsibilities

- James H and Kendal manage 1-1 comms with YC companies initially
- Cameron handles YC onboarding calls, billing, and HubSpot
- Grace manages Printfection, Open Collective, and Shopify
