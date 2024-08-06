---
title: Refunds
sidebar: Handbook
showTitle: true
---

Most of the requests we receive fall under the following scenarios:
- Learning curve: just got off of the startup plan/new client accidentally used us a lot
- Unexpected stardom: side project sudden volume spike
- Under attack: bot spike/abusive user drove traffic which in turn increased posthog usage

## Eligibility Criteria
Customer must meet the following criteria to get a refund:
- The request is made within 30 days of the billing date.
- The customer provides a reasonable explanation for the request, fitting into one of the above scenarios.
- The account does not show signs of fraudulent activity or abuse of PostHog services.

## Scenarios and Procedures

### Learning Curve
We issue refunds in this category if this is the first bill >$1 and/or they meet criteria as explained above.

#### Next steps
- Use [Refund - Learning Curve email template](https://posthog.lightning.force.com/lightning/r/EmailTemplate/00XHp000001vSDAMA2/view) to respond to the customer if they match criteria.
- Assign the refund request to the RevOps team in Salesforce for processing.
- If the issue is caught before the end of the current billing cycle, contact the customer and explain that after the current billing cycle we will refund the delta occured by unusual usage during the learvning curve.
- Calculate the delta between average use and unusual use and issue a refund through Stripe. 

### Unexpected Stardom
We issue refunds in this category if this is the first bill >$1 and/or usage spiked by >200% compared to their average usage over the past 3 months, and/or the account is a non-commercial or a hobby project.

#### Next steps
- Use [Refund - Unexpected Stardom](https://posthog.lightning.force.com/lightning/r/EmailTemplate/00XHp000001vSDFMA2/view) email template to respond to the customer if they match criteria.
- Assign the refund request to the RevOps team in Salesforce for processing.

### Under Attack
We flag accounts with unusual activity spikes for review, and refund the overage amount once the issue has been resolved. The refund will cover any amount exceeding the average usage of the three months preceding the spike.

#### Next steps
- Use [Refund - Under Attack](https://posthog.lightning.force.com/lightning/r/EmailTemplate/00XHp000001vSDKMA2/view) email template to respond to the customer if they match criteria.
- Assign the refund request to the RevOps team (Mine) in Salesforce for processing.

### Repeat incidents
For first incident response, we follow standard policy above and provide guidance for preventing future incidents (e.g. ask them to implement billing limits).

Subsequent Incidents:
- Check if the user followed PostHog’s recommendations in the previous incident.
- We issue up to 50% refund or up to 100% credits that can apply on future usage depending on the issue severity and previous actions taken to prevent spikes.
- Provide warning that in the event that this happens again PostHog may not be able to support. Remind them of the measures necessary to take to avoid such issues going forward.
- After 2 incidents, further refunds for similar issues may be declined unless there are extraordinary circumstances.

#### Next steps
- Use [Refund - Repeat Incident](https://posthog.lightning.force.com/lightning/r/EmailTemplate/00XHp000001vSDPMA2/view) or [Refund - Same Issue](https://posthog.lightning.force.com/lightning/r/EmailTemplate/00XHp000001vSDUMA2/view) email templates to respond to the customer if they match criteria.
- Assign refund request to RevOps (Mine) in Salesforce for processing.
- Escalate any cases that do not match criteria above to RevOps for review.
