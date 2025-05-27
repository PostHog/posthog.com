---
title: Retention Metrics
sidebar: Handbook
showTitle: true
---

We use Net Dollar Retention (NDR) and Gross Dollar Retention (GDR) to track how well we're 
retaining and growing customer revenue over time. We use adjusted revenue to calculate these retention metrics 
for a more accurate picture of our business. This way, we get clearer signals about retention by removing the 
noise from spikes, trials, and organizational shifts.

## How we calculate
We use a rolling time period approach that compares customer revenue from a base month to the current month:
- For each calendar month, we look backward to identify the "base month" (3, 6, or 12 months prior)
- We identify customers who were active in that base month with minimum $5K annual revenue
- We compare what those same customers were paying then versus what they're paying now

### NDR (Net Dollar Retention)
NDR shows total revenue retention including expansions, contractions, and churn.

Formula: Sum(current_month_mrr) / Sum(base_month_mrr)

If NDR > 100%: We're growing revenue from existing customers (expansions outpace contractions/churn)
If NDR = 100%: We're maintaining the same revenue from existing customers
If NDR < 100%: We're losing revenue from existing customers

### GDR (Gross Dollar Retention)
GDR shows how much of our base revenue we're retaining, without counting expansions.

Formula: Sum(MIN(current_month_mrr, base_month_mrr)) / Sum(base_month_mrr)

GDR caps each customer's current revenue at their base month amount so it only measures downgrades and churn.

## Why $5K+ ARR customers?
- these customers represent the majority of our revenue
- they tend to have more established implementations
- they have invested enough time and resources to properly implement our product
- focusing on these customers provides clearer retention signals by filtering out noise from small, transient accounts

## Why rolling retention?
- Allows us to continuously monitor monthly trends without waiting for cohorts to mature
- Includes all customers in each calculation, giving us larger sample sizes and more reliable metrics
- More commonly used in reporting and easily understood by those who want a simple, current retention number

## Cohort based retention for lifecycle insights
We also track cohort based GDR and NDR as well as cohort based usage retention to:
- Understand how retention evolves throughout different stages of customer lifecycle
- See if newer cohorts perform better or worse than older ones
- Track how significant business or product changes may impact specific cohorts
- Recognize seasonal or other time based patterns in customer behavior
