---
title: Lead routing & scoring
sidebar: Handbook
showTitle: true
---

## Lead routing

Generally speaking, companies already using PostHog and spending money will be routed to the product-led sales team. Leads where the customer is earlier in their lifecycle with us, e.g. using PostHog but not spending money, will go to the new business sales team. 

> We frequently tweak these rules and experiment with different signals to see which work best. Generally you should be aiming for a 20% conversion rate from these types of leads. 

They follow the [normal territory assignment rules](https://posthog.com/handbook/growth/sales/crm#how-we-do-lead-assignments) in Salesforce, and are routed either to Technical Account Executives or Technical Account Managers depending on the type.

**Product-led sales team**
1. Customers with MRR between $500-1,667, employee count > 50, user count > 7, based in ICP country, and has been paying for at least 3 months
2. Customers who have high ICP score and subscribe to the Scale plan
3. Customers with MRR >$1K and >50% forecasted spend increase this month

**New business sales team**
1. Completed the book a demo form (organic inbound, paid ads campaign, or outbound)
2. [Onboarding specialist referral](/handbook/onboarding/sales-handover)
3. First signup from a company with 500+ employees who have ingested at least 1 event and invited at least 1 person 
4. Customers who have used 50% or more of their startup credits and had a last invoice greater than $5000
5. Customers set to roll off startup plan in the next ~100 days with last invoice between $2k–$5k
6. Customers who are set to roll off the startup plan in the next two months and had a last invoice greater than $1500
7. [AE named lists](https://posthog.slack.com/docs/TSS5W8YQZ/F0A9W1BVCKE)
8. Emailed sales@ 

**Customer success team**
1. Unmanaged customers with >$20K ARR who raise a support ticket

**BDR team**

Campaigns are all [tracked in Lemlist](https://app.lemlist.com/teams/tea_kvdy3nLu9KEA4QPiD/campaigns-next) - these change week-to-week. 

Team focus:

1. Engineering Managers (VPs, Directors, Heads of) who follow us on LinkedIn but are not (yet!) customers
2. Job Switchers v4
3. Competitor takeouts
4. Companies with recent fundraising activity
5. Revenue-fit and Growth-fit lookalikes

Backlog:

1. Filled contact sales but then went silent, never talked to an AE (next: AE Campaign to warm back up)
2. Future Event attendees 
3. Closed lost opportunities (new biz _and_ renewals) 5+ months old where reason was 'unresponsive'
4. Tried PostHog but did not convert - signed up but went inactive, never paid, never talked to an AE in DW (next: more filtering on this list)

Automated (Abhischek):
1. Requests for Trust Center access that require an NDA
2. Paused - [Warmbound](https://app.clay.com/workspaces/268768/workbooks/wb_0t9mfmifwKAqEGkwFC8/tables/t_0ta1652W6yS8tnSyUQF/views/gv_0ta1652BJM69kS4G3P2) - $100-499 MRR at some point in the account's history (need to filter more) 

Anyone at PostHog can also manually flag an account as a high potential lead. This includes new or low spend accounts with strong net new potential or existing paying customers with credible expansion potential. To create a lead, go to the customer's Vitally record and add a Segment for `AM referral` (product-led sales) or `AE referral` (new business). 

### Demo booking

Customers that want to book a demo and show strong ICP fit signals are automatically get shown a booking link for a demo with a TAE. Those <20 are for the TAE to manually review and schedule. [Default](https://www.default.com/) is our contact form submission routing system for managing this. 

- We have an AI qualifier step to classify submissions as sales/support/spam. If 'support' or 'spam', it'll skip round robin - 'support' will auto create Zendesk tickets, 'spam' are dropped.
- Accounts also have to match 2/3 requirements for revenue, title, and/or industry to see the instant scheduler. 
- If an account has had a lead disqualified within the last month, we no longer show the scheduler.

## Lead scoring

We calculate lead scores in Salesforce to help us prioritize our inbound book of business.  Put simply, the higher the score the higher value a potential contract with a customer **should** be. The current [ICP fit score is described here](/handbook/growth/revops/icp-fit-score)

