---
title: YC onboarding
sidebar: Handbook
showTitle: true
---

As a YCombinator company ourselves, we want to support other YC companies that wish to use PostHog. As such, our onboarding process for YC companies is different and more extensive than our general process.

## The YC deal

Our YC deal provides the following:

- One free year of PostHog Cloud with up to 10 million events per month *or* a one-year enterprise license if they want to self-host PostHog.
- Companies also get a $50 gift card to spend on our merch and enterprise support (i.e. a private Slack with our core team members).

For YC W21 companies, we also offer:

- PostHog AirPods, a PostHog Timbuk2 Backpack, a $150 Open Collective gift card, or a $150 PostHog Merch gift card.
- A referral scheme that let's you double-down on the above deal

> **Note:** Batch-specific deals will be updated here as new batches come along.

## Onboarding call

### Inbound request sources

YC companies can reach out in different ways. Ideally, we will steer them towards the [dedicated YC Onboarding page](/yc-onboarding), but they may also reach out to us on _[yc@posthog.com](mailto:yc@posthog.com)_.

Having received a demo request through one of these sources, schedule an appropriate 1-hour slot and ensure at least one person can certainly attend it.

### Before the call

Ideally, we want users to have gotten started with PostHog before the demo call. From our YC Onboarding page:

> Before the call, we recommend you sign up to our Cloud version and try installing our snippet on your website. Doing so would allow us to tailor the onboarding to your needs, leveraging data from your website instead of demo data. However, if you prefer to get a demo first, we'll give you access to a demo playground during our call.

> **Note:** We recommend PostHog Cloud as a way to get started quickly, but it's up to them if they want to set up a self-hosted instance before the call. You should also help with this.

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

If you have time left in the 1-hour slot, **do this during the call** - ensure the user is fully set up by the time the call is over.

You should:

#### 1. Set up a private Slack group

Set up a private Slack group with them on our core team Slack group. If they do not use Slack internally, set up a private chat on the PostHog Users Slack.

You should add Yakko, James, Tim, Paolo, and a random engineer to each group.

#### 2. Send a one-time giveaway

Customers have the following giveaway options. Some options have restrictions depending on the shipping address.

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

Remind the YC contact that they will get another set of merch if they refer another company. All the other company needs to do is [schedule a YC onboarding session](/yc-onboarding) and say that "Company X" referred them. Then, we'll double-merch both of them.

#### 3. Set up billing

If they use PostHog Cloud, [update their plan to the Startup plan](/handbook/growth/sales/billing) using the Django Admin panel. Also, set `should_setup_billing` to `True` - this will prompt them to add card details (but assure them they won't get charged!)

If they will self-host PostHog, set them up with a [one-year EE license](/handbook/growth/sales/billing) (Paolo can help with this).

Ask them to confirm they've tagged themselves as using us, and send a direct link [to the deal](https://bookface.ycombinator.com/deals/687), so this is easy.

#### 4. Set up HubSpot

After they've gotten set up, [create a deal on the appropriate Hubspot pipeline](/handbook/growth/sales/sales-operations).

Add their email domain to the 'YC W21 Onboarded Users' cohort as a new match group that tags `email contains @theirdomain.com`.

## Responsibilities

Yakko handles YC onboarding calls, and Phil manages Printfection, Open Collective, and Shopify. Charles has admin privileges in to everything that Phil does.
