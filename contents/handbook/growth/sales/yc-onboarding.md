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

- Get PostHog Cloud free for 12 months with up to 20m events and 50,000 session recordings per month
- Choose between a free pair of Airpods or a Timbuk2 backpack
- Book into a free YC group setup session where we will…
  - Build a dashboard for the batch with your product growth metrics
  - Pair with you to ensure you pass calls correctly
- Get the CEO’s phone number and message him any time - seriously (well maybe not any time, he does have to sleep you know…)

For previous batches:

- Get PostHog Cloud free for 6 months with up to 20m events and 50,000 session recordings per month

> Only James has the ability to update our deal in Bookface, so any changes to the deal text should be made in [this Google Doc](https://docs.google.com/document/d/17MtngAx2DeVo3YyhPwwKRvakI54SJuNmHkPtFns2IVQ/edit) then shared with him. 

## Our process

We want to make this feel as personalized as possible - there is an outsized impact in giving YC companies personal attention to ensure they are successful with PostHog. 

- Kendal maintains a sheet with the details for all companies in the current batch
- James H messages every single one of them individually so that a) they have his number, and b) to tell them about the YC deal on Bookface
- YC companies check out the deal and then book in for an onboarding call (see detailed section below)
- Once companies are set up with us, we ask them to mark themselves as 'using' PostHog in Bookface

## Onboarding call

### Inbound request sources

YC companies can either book a demo [dedicated YC Onboarding page](/yc-onboarding) or email us directly on _[yc@posthog.com](mailto:yc@posthog.com)_.

Having received a demo request through one of these sources, schedule an appropriate 1-hour slot and ensure at least one YC company can definitely attend it. Ideally you want to batch these demos into small groups. 

### Before the call

Ideally, we want users to have gotten started with PostHog before the demo call. From our YC Onboarding page:

> Before the call, we recommend you sign up to our Cloud version and try installing our snippet on your website. Doing so would allow us to tailor the onboarding to your needs, leveraging data from your website instead of demo data. However, if you prefer to get a demo first, we'll give you access to a demo playground during our call.

> We recommend PostHog Cloud as a way to get started quickly, but it's up to them if they want to set up a self-hosted instance before the call. You should also help with this.

If users come to the call with a ready instance, we can focus more on their needs and setting up relevant views than a basic overview of the platform that they could have gotten without us.

### The demo

When doing a demo of PostHog, you should prioritize using the following environments:

1. The client's instance or PostHog Cloud account (if they have one **and** are OK with this). 
2. The [PostHog Demo Environment](https://playground.posthog.com)
3. A local environment
4. PostHog Cloud 

Read more about running demos on our [dedicated page](/handbook/growth/sales/demos).

#### Bookmarklet

A super cool way of doing demos for websites and web apps is using the PostHog bookmarklet. This way, you can set up funnels, charts, and other views for the user (or, ideally, have them set it up themselves) by leveraging their *own data*. If done on their instance, some of these views might even be ready for them to start analyzing user data once "real events" start coming in.

To learn more about the bookmarklet, check out our [Snippet Installation](/docs/integrate/client/snippet-installation#get-started-with-no-code) page.

#### Let the user drive

Always tailor the demo to the user specifically! Skip things they don't need and let them decide what they want to see. Be friendly and helpful, not salesy! Our goal is for these users to be able to use PostHog to improve *their* product.

### After the call

If you have time left in the 1-hour slot, **do this during the call** - ensure the user is fully set up by the time the call is over. Finally, make sure they are in our [user Slack group](/slack). 

Then you should:


#### 1. Send a one-time giveaway

Customers have the following giveaway options. Our default are a choice of AirPods or Timbuk2 rucksack for folks in the US or Canada - if they live outside these countries, you should offer them a choice between $150 merch credit or Open Collective donation. 

Please do _not_ send Airpods or Timbuk2 outside of the US and Canada, no matter how much someone asks - this creates big customs headaches for us and is a bad experience for the user. 

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

US and Canada only

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

#### 2. Set up billing

If they use PostHog Cloud, [update their plan to the Startup plan](/handbook/growth/sales/billing) using the Django Admin panel. Also, set `should_setup_billing` to `True` - this will prompt them to add card details (but assure them they won't get charged!)

Ask them to confirm they've tagged themselves as using us, and send a direct link [to the deal](https://bookface.ycombinator.com/deals/687), so this is easy.

#### 3. Set up HubSpot

After they've gotten set up, if appropriate, [create a deal on the appropriate Hubspot pipeline](/handbook/growth/sales/sales-operations).

## Responsibilities

- James H and Kendal manage 1-1 comms with YC companies initially
- Cameron handles YC onboarding calls, billing, and HubSpot
- Grace manages Printfection, Open Collective, and Shopify
