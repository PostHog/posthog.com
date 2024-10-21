---
title: Refunds
sidebar: Handbook
showTitle: true
---

We know things happen and sometimes you might need a refund. Here’s how we handle common scenarios:

### Learning Curve
Just got off of the startup plan/new client accidentally used us a lot.

We issue refunds in this category if this is the first bill >$1 and/or they meet criteria as explained above.

### Unexpected Stardom
Side project sudden volume spike

We issue refunds in this category if this is the first bill >$1 and/or usage spiked by >200% compared to their average usage over the past 3 months, and/or the account is a non-commercial or a hobby project.

### Under Attack
Bot spike/abusive user drove traffic which in turn increased posthog usage

We flag accounts with unusual activity spikes for review, and refund the overage amount once the issue has been resolved. The refund will cover any amount exceeding the average usage of the three months preceding the spike.

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
- Comms team assigns these requests to RevOps (Mine).
- RevOps reviews the request, issues refund or credits based on the eligibility and criteria outlined above, and responds to customer.

Contact sales form or email to sales@posthog.com
Account Executives can direct these to RevOps using one of the two options below:
- Slack option: AEs use the ticket emoji in the #website-contact-sales Slack channel to auto-create a Zendesk ticket, which is then assigned to RevOps for processing.
- Salesforce option: AEs move the lead created from this request to Mine, who reviews and processes it according to criteria.

Large account requests
- For large accounts managed by an AE, the AE leads the customer conversation and requests RevOps to issue the refund in Stripe.
