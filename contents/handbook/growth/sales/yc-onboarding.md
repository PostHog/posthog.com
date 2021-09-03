---
title: YC onboarding
sidebar: Handbook
showTitle: true
---

As a YCombinator company ourselves, we want to be supportive of other YC companies that want to use PostHog. As such, our onboarding process for YC companies is different and more extensive than our general process.

## The YC deal

Our YC deal provides the following:

One free year of PostHog Cloud with up to 10 million events per month *or* a one-year enterprise license if they want to self-host PostHog.

Companies also get a $50 gift card to spend on our merch and enterprise support (i.e. a private Slack with our core team members).

For YC W21 companies, we also offer:

- A choice of Airpods or Allbirds shoes
- A referral scheme to get more of the above
    - We will also give more merch (an extra $50 voucher for our store) to the company they refer to us

> **Note:** Batch-specific deals will be updated here as new batches come along.

## Onboarding call

### Inbound request sources

YC companies can reach out to us in many ways. Ideally we will steer them towards the [dedicated YC Onboarding page](/yc-onboarding), but they may also reach out to us on _yc@posthog.com_ or _ycdeal@posthog.com_ (as well as individual emails and _hey@posthog.com_).

Having received a demo request through one of these sources, schedule an appropriate 1h slot and make sure at least one person is certainly able to attend it.

### Before the call

Ideally we want users to have gotten started with PostHog before the demo call. From our YC Onboarding page:

<div class="blog-quote">
Before the call, we recommend you sign up to our Cloud version and try your hand at installing our snippet on your website. Doing so would allow us to tailor the onboarding to your needs, leveraging data from your own website instead of demo data. However, if you prefer to get a demo first, we'll give you access to a demo playground during our call.
</div>

> **Note:** We recommend PostHog Cloud as a way to get started quick, but it's up to them if they want to set up a self-hosted instance before the call. You should also help with this.

If users come to the call with a ready instance, we can focus more on their needs and setting up relevant views for them than a basic overview of the platform that they could have gotten without us.

### The demo

When doing a demo of PostHog, you should prioritize using the following environments:

1. The client's own instance or PostHog Cloud account (if they have one **and** are OK with this). 
2. The [PostHog Demo Environment](https://playground.posthog.com)
3. A local environment
4. PostHog Cloud 

Read more about running demos on our [dedicated page](/handbook/growth/sales/demos).

#### Bookmarklet

A super cool way of doing demos for websites and web apps is using the PostHog bookmarklet. This way you can set up funnels, charts, and other views for the user (or, ideally, have them set it up themselves) by leveraging their *own data*. If done on their own instance, some of these views might even be ready for them to start analyzing user data once "real events" start coming in.

To learn more about the bookmarklet, check out our [Snippet Installation](/docs/integrate/client/snippet-installation#get-started-with-no-code) page.

#### Let the user drive

Always tailor the demo to the user specifically! Skip things they don't need, and let them decide what they want to see. Be friendly and helpful, not salesy! Our goal is for these users to be able to use PostHog to improve *their* product.

### After the call

If you have time left in the 1h slot, **do this during the call** - it ensures the user is fully set up by the time the call is over.

You should:

- Set up a private Slack group with them on our core team Slack group.
    - If they do not use Slack internally, set up a private chat on the PostHog Users Slack.
    - You should add Yakko, James, Tim, Paolo, and a random engineer to each group.
- Send them a link to [the merch form](https://forms.gle/K61bhD6uLxaaTqoK6).
    - Let them know that if they refer another company, they will get another set of merch. All the other company needs to do is say that "Company X" referred them. We'll double merch for both of them. 
- If they will use PostHog Cloud, [update their plan to the Startup plan](/handbook/growth/sales/billing) using the Django Admin panel.
    - Also set `should_setup_billing` to `True` - this will prompt them to add card details (but ensure them they won't get charged!)
- If they will self-host PostHog, set them up with a [one-year EE license](/handbook/growth/sales/billing) (Paolo can help with this).
- Ask them to confirm they've tagged themselves as using us, and send a direct link [to the deal](https://bookface.ycombinator.com/deals/687), so this is easy.
- If they refer another company, use Shopify to send them a $50 voucher at [our store](https://merch.posthog.com).
- After they've gotten set up, [create a deal on the appropriate Hubspot pipeline](/handbook/growth/sales/sales-operations)
- Add their email domain to the 'YC W21 Onboarded Users' cohort as a new match group that tags `email contains @theirdomain.com`

## Processing AirPods and Allbirds orders

We collect responses to the [the merch form](https://forms.gle/K61bhD6uLxaaTqoK6) and process these manually once a week by placing the orders on the user's behalf. You can just place the order on your Brex card. 

We provide the standard [AirPods](https://www.apple.com/shop/product/MV7N2AM/A/airpods-with-charging-case) and case (ie. not AirPods Pro or the wireless charging case). For Allbirds, we provide any shoes that show as $95 or less on their [US site](https://www.allbirds.com/). 

This is where we buy from, in descending order of preference:

1. Buy directly from that country's Apple or Allbirds site. This usually applies to the USA, UK and EU. For Apple, use your Brex card via [this referral link](https://apple.sjv.io/c/2279798/524650/7613?subId1=VXNlcjpjdXVzZXJfY2tlY28zN29zMDAyMTAxcmF5OWY4c201OA==&sharedId=RewardsMarketplace) as it gets us cashback. 
2. Send an Amazon gift card for $100 equivalent from their local store.
3. If Amazon is not available in their country, ask the user to buy and send us a receipt, and we will reimburse to their bank account.

When ordering from Apple, put in your email address as the main one for the order, and then add the user's email address under 'Share delivery updates' so they can easily track their order. For Allbirds, you will need to put in your email address and then just forward the receipt to the user for them to track. You should not just put in their email address for the order, as you won't then get a copy of the receipt for expenses. 

## Current responsibilities

Yakko currently handles YC onboarding calls while Charles processes merch requests. Paolo is the point of contact for billing issues.
