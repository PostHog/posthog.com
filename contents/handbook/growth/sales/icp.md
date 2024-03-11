---
title: ICP scoring
sidebar: Handbook
showTitle: true
---

Aligned with our Strategic [Ideal Customer Profile](/newsletter/ideal-customer-profile-framework), ICP scoring helps us to focus our efforts on those customers who are likely to help us hit our growth targets quickly.
We use [Clearbit](https://clearbit.com/) to enhance our contact information as it is created and then compute a score out of 24 in [HubSpot](https://app.hubspot.com/property-settings/6958578/properties?action=edit&property=hubspotscore&search=hubspot&type=0-1) based on the following parameters:

- *Employee count* - we use this as a strong indicator for product market fit.  Smaller companies are less likely to have achieved this so our highest score here goes to companies in the 15-500 employee range.  We score companies over 500 employees lower as they will generally be slower to deal with.
- *Ability to pay* - indicates whether a company is likely to pay for a product like PostHog to solve their problems.  This is computed from the estimated company revenue. If their revenue is between $1m and $50m they get the highest score (6 points).
- *Role* - from experience we sell best to people in an engineering role (6 points) and score those the highest.  We also do well with leadership (3 points) and product (3 points) folks, so they have a favourable score.
- *Company Type* - private companies are ideal here and get 3 points
- *Founded Year* - here we want to capture scale-ups so give 3 points to companies founded 2015-2022
- *Country* - from experience we know that certain countries have a lower inclination to pay for software so we downweight those.
- *Email provider* - if someone signs up with a non-work email they are less likely to become a high-paying customer so we downweight those.

| Metric         | Value                                                                                                                                                                                                                                                                                    | Score |
|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------|
| Employee Count | 0-14                                                                                                                                                                                                                                                                                     | 0     |
|                | 15-500                                                                                                                                                                                                                                                                                   | 6     |
|                | 500-1000                                                                                                                                                                                                                                                                                 | 3     |
|                | 1000+                                                                                                                                                                                                                                                                                    | 0     |
| Ability to pay | Estimated Revenue $1m-$50m                                                                                                                                                                                                                                                               | 6     |
|                | Estimated Revenue $50m-$100m                                                                                                                                                                                                                                                             | 3     |
| Role           | engineering                                                                                                                                                                                                                                                                              | 6     |
|                | leadership                                                                                                                                                                                                                                                                               | 6     |
|                | product (technical e.g. do they have a Github ID)                                                                                                                                                                                                                                        | 6     |
|                | product (non-technical)                                                                                                                                                                                                                                                                  | 3     |
|                | marketing                                                                                                                                                                                                                                                                                | 0     |
| Company type   | private                                                                                                                                                                                                                                                                                  | 3     |
| Founded year   | 2015-2022                                                                                                                                                                                                                                                                                | 3     |
| Country        | Not in Australia, Austria, Belgium, Brazil, Canada, Denmark, Estonia, Finland, France, Germany, Iceland, Ireland, Israel, Italy, Japan, Latvia, Lithuania, Netherlands, New Zealand, Norway, Portugal, Singapore, South Korea, Spain, Sweden, Switzerland, United Kingdom, United States | -5    |
| Email provider | Non-work email                                                                                                                                                                                                                                                                           | -10   |


We also sync the HubSpot score back into PostHog as the `hubspot_score` person property using the [HubSpot App](/apps/hubspot-connector).  Our current dividing line between High and Low ICP score is **12**.
