---
title: Lead scoring
sidebar: Handbook
showTitle: true
---

We calculate lead scores in Salesforce to help us prioritize our inbound book of business.  Put simply, the higher the score the higher value a potential contract with a customer **should** be.
We use [Clearbit](https://clearbit.com/) to enhance our contact information as it is created and then compute a score out of 70 in [Salesforce](https://posthog.lightning.force.com/lightning/setup/ObjectManager/Lead/FieldsAndRelationships/00NVx000001lSDC/view) based on the following parameters:

- *Employee count* - larger companies are more likely to have a bigger customer base and more usage data to capture.  They are also more likely to need an Enterprise plan.
- *Ability to pay* - indicates whether a company is likely to pay for a product like PostHog to solve their problems.  This is computed from the estimated company revenue. 
- *Role* - from experience we sell best to people in an engineering, product or leadership role.
- *Country* - from experience we know that certain countries have a higher inclination to pay for software so we weight those.

> Note that we also calculate an [ICP score](/handbook/growth/marketing/icp) in Salesforce.  This is more marketing aligned and designed to show us whether we are capturing [who we are building for](/handbook/who-we-are-building-for) as inbound leads.

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