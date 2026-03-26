---
title: Refunds
sidebar: Handbook
showTitle: true
---

We know things happen and sometimes you might need to issue a refund. Here’s how we handle common scenarios:

### Learning curve

Just got off of the startup plan/new client accidentally used us a lot.

We issue refunds or credits in this category if this is the first bill >$1 and/or they meet eligibility criteria as explained below.

### Unexpected stardom

Side project sudden volume spike

We issue refunds or credits in this category if this is the first bill >$1 and/or usage spiked by >200% compared to their average usage over the past three months, and the company doesn't have any revenue, or is a hobby project.

### Under attack

Bot spike/abusive user drove traffic which in turn increased PostHog usage

We flag accounts with unusual activity spikes for review, and refund or issue credits to cover the overage amount once the issue has been resolved. The issued amount covers any amount exceeding the average usage of the three months preceding the spike.

### Wrong setup

New feature trial with incorrect configuration

We issue refunds or credits in this category if the customer was charged for features they didn't intend to use due to default settings or configuration errors, and this is the first occurrence of unintended usage charges.

## Eligibility criteria

Customer must meet the following criteria to get a refund:

-   The request is made within 30 days of the billing date.
-   The customer provides a reasonable explanation for the request, fitting into one of the scenarios.
-   The account does not show signs of fraudulent activity or abuse of PostHog services.
-   In cases of volume spikes, the unusual usage has ceased and there is evidence that the customer has taken measures (like implementing a billing limit or managing event volume).

## Repeat incidents

For first incident response, we follow standard policy above and provide guidance for preventing future incidents (e.g. ask them to implement billing limits)

Subsequent incidents:
- First, check if the customer has acted on PostHog’s earlier recommendations.
- If they have not yet fixed the issue, refunds are conditional. Give them a window to implement the fix, and offer a partial refund (up to 50%) while they address it.
- If they have made good faith fixes but the issue still occurred, then we issue a full or partial refund depending on severity.
- Always warn that repeated incidents may not be refunded again.
- For third incident and beyond, refunds may be declined unless there are extraordinary circumstances (e.g. a PostHog bug).

## Request channels and processing

Refund requests can come through different channels:

In-app ticket

-   Support team reviews the request, issues refund or credits based on the eligibility and criteria outlined above, and responds to customer.

Contact sales form or email to sales@posthog.com
Account Executives can direct these to the Support team using the ticket emoji in the #website-contact-sales Slack channel to auto-create a Zendesk ticket

Large account requests

-   For large accounts managed by an AE, AE may lead the customer conversation and can loop in Support or RevOps team as needed to process credits or refund in Stripe.

# Processing credits or refunds

## How to calculate overage amount

### Review customer usage

Before doing a refund, review customer's usage. Some useful sources:

-   If you have access to Vitally, find the customer's Metabase dashboard link under the 'Usage Dashboard Link' trait. The 'Event counts by type last X days' insight is particularly useful here - you can change the lookback period to see a longer time range. 
-   [This dashboard](https://us.posthog.com/project/2/dashboard/259114) for an overview with usage reports and invoice history.
-   [This dashboard](https://metabase.prod-us.posthog.dev/dashboard/139-customer-usage-breakdown?organization_id=&project_id=) to help identify issues for customers with many projects
-   You can also make a copy of [this PostHog insight](https://us.posthog.com/project/2/insights/8nLWTLHu) and use organization id to review account usage. Note that the org usage report can run 2-3 times per day, so numbers may be duplicated/inflated.

What's "normal" vs "weird" usage:

-   Normal: Gradual increase, weekly patterns
-   Suspicious: Sudden 10x jumps, severe spikes
-   Bot attack: Lots of similar events

### Identify baseline usage

-   Calculate the average usage over the past three months to establish a baseline.
-   Cross check the amount calculated with the last two invoices paid by this client to make sure they're consistent.

### Calculate overage

-   Subtract the baseline usage from the spike amount to find the total overage. Example: If average monthly usage was 1 million events per month and a spike resulted in 3 million events, the overage amount would be 2 million events.

**For event-specific overages (optional):**

If you want more precision when a single event type is inflated, use the 'Event counts by type last X days' insight in the Metabase dashboard:

1. Change the lookback days to find the baseline period before the spike
2. Identify the inflated event type and compare its spike volume to the baseline
3. The difference is your overage amount for that event type

### Calculate the amount to refund/credit

-   Use the [pricing calculator](https://posthog.com/pricing) to calculate the total price for baseline and overage volumes. The difference between the two will be the refund amount.
-   Alternatively, you can use [QuoteHog](https://quote.posthog.com) - go to the usage history tab, build a price option from a specific month's usage, and subtract the inflated volume to see what the bill would have been without the spike.
-   Don't just put in the overage amount in the calculator - doing this would give you the wrong amount because of our tiered pricing structure. Calculating the difference between regular usage and usage with overage is the accurate way to calculate actual amount.
-   Add a note in the Zendesk ticket with a breakdown of calculations, the baseline average, and the overage. This transparency can be helpful if the customer has questions.

### Refund or credit?

-   Issue credits if the customer's period hasn't ended yet and the invoice isn't finalized. It is much easier and better for users and us to avoid payment if we can!
-   If invoice is finalized and this is a first time request, issue a refund via a credit note (do not use the refund button, this is important for correct revenue attribution).
-   If the customer has overdue invoices and needs changes on that, we need to apply credit notes. Escalate such cases to RevOps.

## How to issue refunds or credits

### Prerequisites

You need Support specialist level access to Stripe, ask Simon for access.

### Issuing credits

1. Go to [billing admin](https://billing.posthog.com/admin/)
2. Next to 'Credits', click on 'Add'
3. In the 'Customer' field, use the drop-down menu to find your customer
4. In the 'Amount' field, set an amount of credits you wish to issue for this customer
5. In the 'Reason' field, select a reason which best describes why you're issuing the credits
6. Add an optional note in the 'Notes' field
7. Include an optional link in the 'Reference link' field, e.g. Zendesk ticket, Slack message link, etc.
8. Click 'Save and view'
9. Confirm that the credits were successfully added to the customer's balance in Stripe under 'Customer invoice balance'

### Issuing a refund
Refunds are now initiated through Billing Admin and finalized in Stripe via a credit note. 

There are two ways to reach the Add Refund screen.

*Option A:*

1. Navigate to Billing Admin → Customers.
2. Find the right Customer (search by organization ID or customer ID).
3. Once in the Customer view, scroll down to _Related invoices_ section. Find the right one (you can identify it by its id, dates or amount).
4. Click on "Start refund"

*Option B:*

1. Navigate to Billing Admin → Invoices.
2. Find the right invoice (search by invoice ID, organization ID, etc).
3. Click and open the invoice view. 
4. Once in the view, click on the top right button "Start refund"

Once you do that (through any of the two options), you'll land on the "Add refund" screen. From there, you can continue with the refund:

1. Allocate refund amounts per product. Refunds must be issued per product. Enter the refund amount for each affected product. You may need to do more math here: for an event spike refund may span Product Analytics, Person Profiles, and Group Analytics. Billing Admin does not automatically split refunds across products, you must do the math and allocate amounts manually. As you enter per product amounts, the total refund amount updates automatically.
2. Select refund reasons: Choose a Stripe refund reason (required) and select an internal reason (used for internal reporting and analysis)
3. Add any relevant notes or context (e.g. Zendesk ticket, Slack link, short explanation)
4. Once you review everything and all looks good save the refund in Billing Admin. This will issue a Stripe credit note, which is processed as a refund to the customer’s default payment method. Stripe automatically sends a notification email to the customer.

### Fixed fee product refunds
For fixed-fee subscriptions (e.g. Boost plan), Stripe’s default proration behavior can cause double crediting.

Example: A customer subscribes to a fixed fee add on by accident and requests a refund. After we issue a credit note, they cancel their subscription. When this happens, Stripe automatically creates a prorated “unused time” line item on the next upcoming invoice. This results in the customer being credited twice:
- once via the manual credit note
- again via the prorated unused time credit

To prevent overcrediting, we need to manually delete the pending invoice item that Stripe creates after the subscription cancellation.

Steps:
1. Find customer profile in Stripe (you can search by organization id)
2. Locate the proration adjustment under Pending Invoice Items.
3. Manually delete the line item.
4. Add a note in Zendesk documenting that the proration line was removed to avoid double crediting.

### Spotting suspicious stuff - watch out for:

-   Multiple accounts that seem connected - easiest way to spot this is to look up user profile in Vitally and check connected accounts. If one email is connected to multiple accounts it is good to check previous requests and refunds on all related accounts as well.
-   High refunds notice in Stripe (This will appear as a yellow box notification next to the customer's name on the customer page in Stripe)
-   Usage that doesn't make sense for customer size, or business details don't add up

### When to escalate to RevOps

-   Something seems off
-   They've asked for multiple refunds lately
-   The case doesn't match the simple cases above
-   It's a big customer (spending $1,667+ monthly)
-   Need to create or modify an invoice for the correction. Support team should not create or modify invoices. Invoicing responsibilities will be handled by RevOps to maintain accuracy.

Tag <TeamMember name="Mine Kansu" photo /> in Zendesk and share what you checked, what you think we should do, and any other relevant context. RevOps will review usage trends and customer lifecycle (e.g. new client, high-value account) to figure out next steps.

### Our approach

We'd rather fix unexpected usage issues than have customers pay one massive invoice and then reduce spending or leave us. The goal is to maintain a fair, transparent relationship that works for everyone in the long term.

### Trial periods and usage spikes

-   We're generous with trial periods for actively engaged new ICP customers
-   Tag accounts as "trial" in the billing system. If they're already paying when actively testing the product, inform Mine/RevOps for proper tagging and revenue recognition
-   If you spot accidental usage spikes, proactively reach out and work with customers to reduce their spend to fit their budget and needs
-   When you're unsure about handling a specific case, ping Mine/RevOps directly for review
