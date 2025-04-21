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

For startups in the current/upcoming batch:

- Get $50k of credit for PostHog Cloud for 12 months
- _All founders_ get a Timbuk2 backpack
- A private YC Slack channel for priority support
- Get the batphone - CEO on whatsapp/text

For previous batches:

- Get $50k of credit for PostHog Cloud for 12 months ($25k / 12 months for anyone not in the last 4 batches).

> Only James has the ability to update our deal in Bookface, so any changes to the deal text should be made in [this Google Doc](https://docs.google.com/document/d/17MtngAx2DeVo3YyhPwwKRvakI54SJuNmHkPtFns2IVQ/edit) then shared with him. 

## Our process

We want to make this feel as personalized and smooth as possible - there is an outsized impact in giving YC companies personal attention to ensure they are successful with PostHog. 

- Kendal maintains a sheet with the details for all companies in the current batch as they launch
- James H messages every single one of them individually so that a) they have his number, and b) to tell them about the YC deal on Bookface
- YC companies check out the [deal on Bookface](https://bookface.ycombinator.com/deals/687)
- Founders first need to [sign up](https://app.posthog.com/) for PostHog Cloud
- After logging in, they can submit their [application form](https://app.posthog.com/startups/yc)
  - We check if they have added their billing details (needed to ensure they have a Stripe account so we can add credits there) and prompt them to do so if needed
  - We ask for their YC batch (this determines their deal variant), a screenshot showing them on Bookface and a number of merch packs for them and their co-founders
- Valid applications are added to the [Zapier table](https://tables.zapier.com/app/tables/t/01JRCYMWYAJNP3K0B6GTYKKBQB) and approved automatically, which means that founders get their credits almost instantly
  - A brief confirmation email from [Scott](https://posthog.com/community/profiles/32112) is sent right away
  - Shortly after they receive automated emails with invite to the 
    - Invite to the `#posthog-founders-club` channel in Slack - this is where they can get priority support
    - Links to order merch (multiple emails with unique links, if more than 1 merch pack was requested) 
  - After ~12h they receive a welcome email from [Joe](https://posthog.com/community/profiles/29070) with some additional information and access to perks
- We review submitted applications in the background
  - We automatically check their batch membership based on their company name and domain (using APIs like these: [1](https://api.ycombinator.com/v0.1/docs), [2](https://github.com/yc-oss/api) - they only include publicly launched companies)
  - We manually review the rest of the details, especially the submitted screenshot
- If there are some details missing or we believe they might not qualify for the YC deal, we can request additional information via the `Criteria Check` button in the table, which will trigger an email, which allows them to respond within a week
- If we know they don't qualify for the deal or if we didn't hear back within a week, we can remove their Stripe credits using the `Rejection after approval` button in the table, which will also trigger an email informing them about this (they can still reply later and if we find they do qualify for the deal, we can onboard them to it again using the `Approve` button in the table - you might need to right click on the button first to re-enable it)

### If we need to send giveaways outside of the Zapier automation

The easiest way to give a customer merch is to [create a gift card for them in Shopify](/handbook/company/merch-store#customers).

If the customer lives outside the US or Canada, you should offer them a choice between $150 merch credit or Open Collective donation, rather than offering specific merch items.

Please do not send specific merch items outside of the US and Canada - this creates big customs headaches for us and is a bad experience for the user. If a user outside those countries is desperate for them, then either:

- Suggest they give us a US/Canada postal address they can forward or collect from
- Send them the item but at their own risk for paying customs fees etc.
