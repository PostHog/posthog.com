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
- In cases of volume spikes, the unusual usage has ceased and there is evidence that the customer has taken measures (like implementing a billing limit or managing event volume).

## Repeat Incidents
For first incident response, we follow standard policy above and provide guidance for preventing future incidents (e.g. ask them to implement billing limits).

Subsequent incidents:
- Check if the user followed PostHog’s recommendations in the previous incident. For example, if a billing limit was suggested to prevent future spikes, was it implemented?
- We issue up to 50% refund or up to 100% credits that can apply on future usage depending on the issue severity and previous actions taken to prevent spikes.
- Provide warning that in the event that this happens again PostHog may not be able to support. Remind them of the measures necessary to take to avoid such issues going forward.
- After 2 incidents, further refunds for similar issues may be declined unless there are extraordinary circumstances.

## Request channels and processing
Refund requests can come through different channels:

In-app ticket
- Support team reviews the request, issues refund or credits based on the eligibility and criteria outlined above, and responds to customer.

Contact sales form or email to sales@posthog.com
Account Executives can direct these to the Support team using the ticket emoji in the #website-contact-sales Slack channel to auto-create a Zendesk ticket

Large account requests
- For large accounts managed by an AE, AE may lead the customer conversation and can loop in Support or RevOps team as needed to process credits or refund in Stripe.


# Processing credits or refunds


## How to Calculate Overage Amount

### Review customer usage
Before doing a refund, review customer's usage. Some useful sources:
- You can make a copy of [this posthog insight](https://us.posthog.com/project/2/insights/8nLWTLHu) and use organization id to review account usage.
- [This dashboard](https://metabase.prod-us.posthog.dev/dashboard/3-customer-detail?stripe_customer_id=&customer_or_org_id=) for an overview with usage reports and invoice history.
- [This dashboard](https://metabase.prod-us.posthog.dev/dashboard/139-customer-usage-breakdown?organization_id=&project_id=) to help identify issues for customers with many projects

What's "normal" vs "weird" usage:
- Normal: Gradual increase, weekly patterns
- Suspicious: Sudden 10x jumps, severe spikes
- Bot attack: Lots of similar events

### Identify baseline usage
- Calculate the average usage over the past three months to establish a baseline.
- Cross check the amount calculated with the last two invoices paid by this client to make sure they're consistent.

### Calculate overage
- Subtract the baseline usage from the spike amount to find the total overage. Example: If average monthly usage was 1 million events per month and a spike resulted in 3 million events, the overage amount would be 2 million events.

### Calculate the amount to refund/credit
- Use [pricing calculator](https://posthog.com/pricing) to calculate the total price for baseline and overage volumes. The difference between the two will be the refund amount.
- Don't just put in the overage amount in the calculator - doing this would give you the wrong amount because of our tiered pricing structure. Calculating the difference between regular usage and usage with overage is the accurate way to calculate actual amount.
- Add a note in the Zendesk ticket with a breakdown of calculations, the baseline average, and the overage. This transparency can be helpful if the customer has questions.

### Refund or Credit?
- Issue credits if the customer's period hasn't ended yet and the invoice isn't finalized. It is much easier and better for users and us to avoid payment if we can!
- If invoice is finalized and this is a first time request, issue a refund.
- If the customer has overdue invoices and needs changes on that, we need to apply credit notes. Escalate such cases to RevOps.


## How to issue refunds or credits

### Prerequisites
You need Support specialist level access to Stripe, ask Simon for access.

### Issuing credits
1. Find customer profile in Stripe (you can search by organization id)
2. Go to section "Customer invoice balance"
3. Click "adjust balance"
4. Select "credit" adjustment type
5. Type in Amount (Stripe shows this as a negative number. When you hover over the information point it will tell you that this amount will decrease the customer's next invoice)
6. Add internal note: a brief comment to explain the reason and link to Zendesk ticket
7. Click "apply to credit balance"
8. When finished issuing credits, double check customer balance and customer's next invoice to see that it is projected to be as you'd expect.

### Issuing refunds
1. Find customer profile in Stripe (you can search by organization id)
2. Under payments, find the payment that corresponds to the usage period
3. Click "Refund payment" **Be careful on this dialog box as pressing enter will automatically complete the refund. **
4. Specify the refund amount (default is full refund, remember to change as needed using instructions above)
5. Add brief comment to explain the reason and link to Zendesk ticket
6. For partial refunds, you can view the partial refund amount by hovering over the 'Partial refund' box that now displays against the payment.

### Spotting suspicious stuff - watch out for:
- Multiple accounts that seem connected - easiest way to spot this is to look up user profile in Vitally and check connected accounts. If one email is connected to multiple accounts it is good to check previous requests and refunds on all related accounts as well.
- High refunds notice in Stripe (This will appear as a yellow box notification next to the customer's name on the customer page in Stripe)
- Usage that doesn't make sense for customer size, or business details don't add up

### When to escalate to RevOps
- Something seems off
- They've asked for multiple refunds lately
- The case doesn't match the simple cases above
- It's a big customer (spending $1,667+ monthly)
- Need to create or modify an invoice for the correction. Support team should not create or modify invoices. Invoicing responsibilities will be handled by RevOps to maintain accuracy.

  
Tag Mine in Zendesk and share what you checked, what you think we should do, and any other relevant context. RevOps will review review usage trends and customer lifecycle (e.g. new client, high-value account) to figure out next steps.
