---
title: Team lead responsibilities
sidebar: Handbook
showTitle: true
---

## General principles

As team lead in a customer-facing role you'll be responsible for making sure that your team is exceeding expectations when it comes to their specific role at PostHog.  This generally means that:

1. They have a solid plan for any managed customers in their book of business or deals in their pipeline
2. They are proactively building relationships with their customers, even those who are hard to engage with
3. They are flagging any potential churn as soon as they become aware of it
4. You are proactively helping them when they are struggling with what to do next on a customer or deal
5. You are providing continuous feedback to them, especially when their performance is below expectations

## Team-specific responsibilities

### Product-led Sales

Technical Account Managers (TAMs) own a book of business of nominally around 15 customers with an ARR of $1.5m, and also look to bring new customers into that book via product-led leads.

- Once a TAM has hit 15 managed customers or ARR of $1.5m, we should stop generating new product-led leads for them to allow them to focus on and grow their existing book.  Flag this to Simon (Mine as backup) when this needs to happen.
- If a TAM's book of business is too big then your first port of call should be to balance customers across your team, failing that ask for help from your peers in other teams (Simon as backup).
- TAMs will want to bring new leads into their book of business so that they count towards their quota.  It's your job to make sure that they have a solid relationship with the customer and a plan in place for growing them too.  Once you're happy, then let Simon know who will review and add them to the quota tracker.
- With big customers over $100k in ARR you should be prepared to lean in and help the TAM with that customer more directly, owning different levels of the relationship.
- Take the lead in driving churn risk and cross-sell team calls, ensuring that we stick to planning and next steps rather than storytelling.
- Ensure that TAMs are on top of any credit renewals well before they expire.
- Check the TAM quota tracker to see if there are any discrepancies and encourage your team to do so regularly as well.
- Coming up to the end of the quarter, work with your team to identify any customers that are ready to be owned by a Customer Success Manager.  Review these with Simon ahead of quarter end so that we can make for a clean transition of customers.
  - Set the New Owner trait in vitally to `EU CSM` or `US CSM` based on geography. 

### Customer Success

Customer Success Managers (CSMs) own a book of business of around 30 customers with an ARR of $1.5m and focus mainly on keeping them as customers (retention).

- Once a CSM's book is full, work to balance customers across the team ideally with a reasonable timezone overlap with the customer.
- Take the lead in driving churn risk team calls, ensuring that we stick to planning and next steps rather than storytelling.
- Ensure that CSMs are on top of any credit renewals well before they expire.

#### Populating a new CSM's book

When looking at accounts to include in a new CSM's book, the following priority order applies:

1. Any customer paying $100k+ a year with no dedicated human (TAM or otherwise)
2. Accounts tagged as `csm handover needed` or `csm overlay needed` in PostHog Customer Analytics
3. Other accounts not covered by a PostHog human in descending ARR order

For accounts in bucket 2 we have region tags which are <PrivateLink url="[posthog-code://loop/9f441418-1400-4839-b82c-4ce3f8bcb2cb](https://us.posthog.com/project/2/workflows/01a0e77c-e3fa-0000-0801-1d43e5c7fc05/overview)">automatically</PrivateLink> applied to the account when the handover or overlay tags are added to the customer.  The regions are covered as follows:

- **EU Team**: Europe, Africa, Asia
- **NA Team**: North America, South America, Oceania
- If an account is flagged as multi region or there is no explicit tag review these and make a decision.

When you assign a CSM to one of these accounts, a <PrivateLink url="https://us.posthog.com/project/2/workflows/01a00fc0-0f90-0000-6aa7-b78a941c08cb/workflow">workflow removes the tags automatically</PrivateLink>, so the account leaves the queue.

### Onboarding

The Onboarding team operates at scale, supporting hundreds of customers whose MRR falls below the TAM/CSM threshold. As a result, the number of customers in the program, as well as the ARR represented, can fluctuate from month to month. The team is currently focused on customers whose first bill is forecasted at $500+ MRR. Its north star metric is maintaining 90% logo retention through customers’ first three months.

- Make sure the Onboarding Specialists prioritize work effectively, engage with customers ahead of renewal, and prevent accounts from falling through the cracks.
- Ensure the Onboarding Specialists adapt to customer needs, continue providing value, and maintain a high-quality bar.
- Lead the team’s continuous improvement efforts across internal processes and the overall onboarding program.
- Ensure high-spend accounts are properly qualified for Sales handoff and that the handoff process runs smoothly.
- Monitor team coverage and customer volume to identify and flag hiring needs proactively.


## Other things we collectively need to stay on top of

### Incident comms

We need to ensure that teams are able to proactively follow our [incident comms process](/handbook/growth/sales/communications-templates-incidents).  We're not quite ready for a full on-call rotation yet, but Simon or Dana take the lead as Communications Manager On-Call (CMOC) when an incident is declared in EU working hours, and Landon or Tyler take the lead when it's during the US working day.

### Notifications of change to pricing/contract/discount rules

We need to proactively notify all team members when there is a change to pricing, discounts, or other contract rules which may impact in-flight and future customer conversations.

1. The author of the pull request (normally Ben or RevOps) should post in <PrivateLink url='https://posthog.slack.com/archives/C090RCG671C'>#group-sales-cs-support</PrivateLink> with the pertinent details of the update, as well as a link to the handbook pull request.
2. Team leads should then make sure all of their team are aware of the change, and any clarifying questions asked in the Slack thread from step 1.


