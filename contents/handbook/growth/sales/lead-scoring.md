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
3. Customers who are set to roll off the startup plan in the next two months and had a last invoice greater than $1500
4. Customers with MRR > $1K and >50% forecasted spend increase this month

**New business sales team**
1. Completed the book a demo form (organic inbound or via paid ads campaign or outbound)
2. Emailed sales@ 
3. [Onboarding specialist referral](/handbook/onboarding/sales-handover)
4. First signup from a company with 1000+ employees ('Big Fish') signaling a high potential large account early in their product led journey.
5. Customers who have used 50% or more of their startup credits and had a last invoice greater than $5000
6. Requests for Trust Center access that require an NDA
7. Self-generated campaigns
  1. [Top10 campaign](https://posthog.slack.com/docs/TSS5W8YQZ/F0A9W1BVCKE) 
7. Outbound leads manually qualified by BDRs (below).

**BDR team**
1. Self-generated campaigns - all [tracked in Lemlist](https://app.lemlist.com/teams/tea_kvdy3nLu9KEA4QPiD/campaigns-next) as these change week-to-week
2. Job switchers
3. Low usage orgs
4. Closed lost oops 4-6 months old where reason was 'unresponsive'

Anyone at PostHog can also manually flag an account as a high potential lead. This includes new or low spend accounts with strong net new potential or existing paying customers with credible expansion potential. To create a lead, go to the customer's Vitally record and add a Segment for `AM referral` (product-led sales) or `AE referral` (new business). 

### Demo booking

Customers that want to book a demo and show strong ICP fit signals are automatically get shown a booking link for a demo with a TAE. Those <20 are for the TAE to manually review and schedule. [Default](https://www.default.com/) is our contact form submission routing system for managing this. 

- We have an AI qualifier step to classify submissions as sales/support/spam. If 'support' or 'spam', it'll skip round robin - 'support' will auto create Zendesk tickets, 'spam' are dropped.
- Accounts also have to match 2/3 requirements for revenue, title, and/or industry to see the instant scheduler. 
- If an account has had a lead disqualified within the last month, we no longer show the scheduler.

## Lead scoring

We calculate lead scores in Salesforce to help us prioritize our inbound book of business.  Put simply, the higher the score the higher value a potential contract with a customer **should** be.
We use [Clearbit](https://clearbit.com/) to enhance our contact information as it is created and then compute a score out of 70 in [Salesforce](https://posthog.lightning.force.com/lightning/setup/ObjectManager/Lead/FieldsAndRelationships/00NVx000001lSDC/view) based on the following parameters:

- *Employee count* - larger companies are more likely to have a bigger customer base and more usage data to capture.  They are also more likely to need an Enterprise plan.
- *Ability to pay* - indicates whether a company is likely to pay for a product like PostHog to solve their problems.  This is computed from the estimated company revenue. 
- *Role* - from experience we sell best to people in an engineering, product or leadership role.
- *Country* - from experience we know that certain countries have a higher inclination to pay for software so we weight those.

> Note that we also calculate an [ICP score](/handbook/growth/marketing/icp) in Salesforce.  This is more marketing aligned and designed to show us whether we are capturing [who we are building for](/handbook/who-we-build-for) as inbound leads.

| Metric         | Value                                                                                                          | Score |
|----------------|----------------------------------------------------------------------------------------------------------------|-------|
| Employee Count | 1-10                                                                                                           | 0     |
|                | 11-1000                                                                                                        | 10    |
|                | 1000+                                                                                                          | 20    |
| Ability to pay | Estimated Revenue $0m-$1m                                                                                      | 0     |
|                | Estimated Revenue $1m-$10m                                                                                     | 5     |
|                | Estimated Revenue $10m-$100m                                                                                   | 10    |
|                | Estimated Revenue $100m+                                                                                       | 20    |
| Role           | engineering                                                                                                    | 10    |
|                | product                                                                                                        | 10    |
|                | leadership/founder                                                                                             | 10    |
|                | marketing                                                                                                      | 5     |
|                | other                                                                                                          | 0     |
| Sub-role       | data_science_engineer                                                                                          | 10    |
|                | project_engineer                                                                                               | 10    |
|                | software_engineer                                                                                              | 10    |
|                | web_engineer                                                                                                   | 10    |
|                | founder/ceo                                                                                                    | 10    |                 
|                | other                                                                                                          | 0     |
| Country        | Austria, Canada, France, Germany, Japan, Norway, Sweden, UK, USA                                               | 10    |
|                | Australia, Belgium, Estonia, Finland, Georgia, Guernsey, Netherlands, New Zealand, Poland, Portugal, Singapore | 5     |
|                | Other                                                                                                          | 0     |
