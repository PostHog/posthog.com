---
title: Refunds
sidebar: Handbook
showTitle: true
---

We know things happen and sometimes you might need a refund. Here’s how we handle common scenarios:

### Learning Curve
Just got off of the startup plan/new client accidentally used us a lot.

We issue refunds or credits in this category if this is the first bill >$1 and/or they meet eligibility criteria as explained below.

### Unexpected Stardom
Side project sudden volume spike

We issue refunds or credits in this category if this is the first bill >$1 and/or usage spiked by >200% compared to their average usage over the past three months, and the company doesn't have any revenue, or is a hobby project.

### Under Attack
Bot spike/abusive user drove traffic which in turn increased posthog usage

We flag accounts with unusual activity spikes for review, and refund or issue credits to cover the overage amount once the issue has been resolved. The issued amount covers any amount exceeding the average usage of the three months preceding the spike.

## Eligibility Criteria
Customer must meet the following criteria to get a refund:
- The request is made within 30 days of the billing date.
- The customer provides a reasonable explanation for the request, fitting into one of the scenarios.
- The account does not show signs of fraudulent activity or abuse of PostHog services.

## Repeat Incidents
For first incident response, we follow standard policy above and provide guidance for preventing future incidents (e.g. ask them to implement billing limits).

Subsequent incidents:
- Check if the user followed PostHog’s recommendations in the previous incident.
- We issue up to 50% refund or up to 100% credits that can apply on future usage depending on the issue severity and previous actions taken to prevent spikes.
- Provide warning that in the event that this happens again PostHog may not be able to support. Remind them of the measures necessary to take to avoid such issues going forward.
- After 2 incidents, further refunds for similar issues may be declined unless there are extraordinary circumstances.

## Request channels and processing
Refund requests can come through different channels:

In-app ticket
- Comms team reviews the request, issues refund or credits based on the eligibility and criteria outlined above, and responds to customer.

Contact sales form or email to sales@posthog.com
Account Executives can direct these to comms team using the ticket emoji in the #website-contact-sales Slack channel to auto-create a Zendesk ticket

Large account requests
- For large accounts managed by an AE, AE may lead the customer conversation and can loop in Comms or RevOps team as needed to process credits or refund in Stripe.


## Refund processing

### Prerequisites
You need Support specialist level access to Stripe, ask Simon for access.

### How to check usage
Before doing a refund, check their usage. You can make a copy of [this posthog dashboard](https://us.posthog.com/project/2/insights/8nLWTLHu) and use organization id to review account usage

What's "normal" vs "weird" usage:
- Normal: Gradual increase, weekly patterns
- Suspicious: Sudden 10x jumps, severe spikes
- Bot attack: Lots of similar events

### Refund or Credit?
- Issue credits if the customer's period hasn't ended yet and the invoice isn't finalized. It is much easier and better for users and us to avoid payment if we can!
- If invoice is finalized and this is a first time request, issue a refund.

### Issuing credits
1. Find customer profile in Stripe (you can search by organization id)
2. Go to section "Customer invoice balance"
3. Click "adjust balance"
4. Select "credit" adjustment type
5. Type in Amount
6. Add internal note: a brief comment to explain the reason and link to Zendesk ticket
7. Click "apply to credit balance"

### Issuing refunds
1. Find customer profile in Stripe (you can search by organization id)
2. Under payments, find the payment that corresponds to the usage period
3. Click "Refund payment"
4. Specify the refund amount (default is full refund, remember to change as needed using instructions above)
5. Add brief comment to explain the reason and link to Zendesk ticket

### Spotting suspicious stuff - watch out for:
- Multiple accounts that seem connected
- High refunds notice in Stripe
- Usage that doesn't make sense for customer size, or business details don't add up

### When to escalate to RevOps
- Something seems off
- They've asked for multiple refunds lately
- The case doesn't match the simple cases above
- It's a big customer (spending $1,667+ monthly)
  
Tag Mine in Zendesk and share what you checked, what you think we should do, and any other relevant context. RevOps will review review usage trends and customer lifecycle (e.g. new client, high-value account) to figure out next steps.
