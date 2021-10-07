---
title: YC onboarding
sidebar: Handbook
showTitle: true
---

As a YCombinator company ourselves, we want to support other YC companies that wish to use PostHog. As such, our onboarding process for YC companies is different and more extensive than our general process.

## The YC deal

Our YC deal provides the following:

One free year of PostHog Cloud with up to 10 million events per month *or* a one-year enterprise license if they want to self-host PostHog.

Companies also get a $50 gift card to spend on our merch and enterprise support (i.e. a private Slack with our core team members).

For YC W21 companies, we also offer:

- PostHog branded Airpods
- A referral scheme to get more of the above
    - We will also give more merch (an extra $50 voucher for our store) to the company they refer to us

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

- Set up a private Slack group with them on our core team Slack group.
    - If they do not use Slack internally, set up a private chat on the PostHog Users Slack.
    - You should add Yakko, James, Tim, Paolo, and a random engineer to each group.
- Create a one-time giveaway link for The PostHog YC Program in Printfection.
    - To create a one-time giveaway link, [Login to Printfection](https://app.printfection.com/account/secure_login.php), go to **Campaigns** -> **Giveaways** -> **The PostHog YC Program**. Then click the **Get New Link** button and copy the link.
    - Send the link to the YC contact and mark the link as sent in Printfection.
    Remind the YC contact that they will get another set of merch if they refer another company. All the other company needs to do is [schedule a YC onboarding session](/yc-onboarding) and say that "Company X" referred them. Then, we'll double-merch both of them.
- If they use PostHog Cloud, [update their plan to the Startup plan](/handbook/growth/sales/billing) using the Django Admin panel.
    - Also, set `should_setup_billing` to `True` - this will prompt them to add card details (but assure them they won't get charged!)
- If they will self-host PostHog, set them up with a [one-year EE license](/handbook/growth/sales/billing) (Paolo can help with this).
- Ask them to confirm they've tagged themselves as using us, and send a direct link [to the deal](https://bookface.ycombinator.com/deals/687), so this is easy.
- If they refer another company, use Shopify to send them a $50 voucher at [our store](https://merch.posthog.com).
- After they've gotten set up, [create a deal on the appropriate Hubspot pipeline](/handbook/growth/sales/sales-operations)
- Add their email domain to the 'YC W21 Onboarded Users' cohort as a new match group that tags `email contains @theirdomain.com`

## Shipping considerations

Printfection ships from the US only (but they're working on other options), so some countries will impose import duty on shipping. However, there are methods where import duty can be prepaid - for example, Priority Mail. So we will ship using a method that includes import duty where possible.

There will be some countries where shipping is not possible or unreliable. In these cases, offer the customer a $100 voucher for the PostHog merch store instead. Alternatively, you can ask if they have a US address that they can use for the Printfection delivery.

## Responsibilities

Yakko handles YC onboarding calls, and Phil manages Printfection. Charles also has admin privileges in Printfection.
