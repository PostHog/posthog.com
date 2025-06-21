---
title: ICP scoring
sidebar: Handbook
showTitle: true
---

Aligned with our Strategic [Ideal Customer Profile](/newsletter/ideal-customer-profile-framework) and [who we are building for](/handbook/who-we-are-building-for), ICP scoring helps us to focus our efforts on those customers who are likely to help us hit our growth targets quickly. This is similar, but not the same as [our lead scoring](/handbook/growth/sales/lead-scoring).

We use [Clearbit](https://clearbit.com/) to enhance our contact information as it is created and then compute a score out of 24 in [Salesforce](https://posthog.lightning.force.com/lightning/setup/ObjectManager/Lead/FieldsAndRelationships/00NHp000018JdMZ/view) based on the following parameters:

- *Employee count* - we use this as a strong indicator for product market fit.  Smaller companies are less likely to have achieved this so our highest score here goes to companies in the 15-500 employee range.  We score companies over 500 employees lower as they will generally be slower to deal with.

- *Ability to pay* - indicates whether a company is likely to pay for a product like PostHog to solve their problems.  This is computed from the estimated company revenue. If their revenue is between $1m and $50m they get the highest score (6 points).

- *Role* - from experience we sell best to people in an engineering role (6 points) and score those the highest.  We also do well with leadership (3 points) and product (3 points) folks, so they have a favorable score.

- *Company Type* - private companies are ideal here and get 3 points

- *Founded Year* - here we want to capture scale-ups so give 3 points to companies founded 2015-2022

- *Country* - from experience we know that certain countries have a lower inclination to pay for software so we downweight those.

- *Email provider* - if someone signs up with a non-work email they are less likely to become a high-paying customer so we downweight those.

| Metric         | Value | Score |
|----------------|-------|-------|
| Employee Count | 0-14 | 0 |
| | 15-500 | 6 |
| | 500-1,000 | 3 |
| | 1,000+ | 0 |
| Ability to pay | Est. Revenue $1M-$50M | 6 |
| | Est. Revenue $50M-$100M | 3 |
| Role | Engineering | 6 |
| | Leadership | 6 |
| | Product (technical with GitHub ID) | 6 |
| | Product (non-technical) | 3 |
| | Marketing | 0 |
| Company type | Private | 3 |
| Founded year | 2015-2022 | 3 |
| Country | Not in: Australia, Austria, Belgium, Brazil, Canada, Denmark, Estonia, Finland, France, Germany, Iceland, Ireland, Israel, Italy, Japan, Latvia, Lithuania, Netherlands, New Zealand, Norway, Portugal, Singapore, South Korea, Spain, Sweden, Switzerland, UK, US | -5 |
| Email provider | Non-work email | -10 |


We also sync the ICP score back into PostHog as the `icp_score` person property.  Our current dividing line between High and Low ICP score is **12**.