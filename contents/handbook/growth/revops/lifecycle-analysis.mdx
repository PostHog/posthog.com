---
title: Lifecycle analysis
sidebar: Handbook
showTitle: true
---

Understanding how our revenue moves through different lifecycle stages helps us identify the specific drivers behind our growth, not just the net change in revenue. We use lifecycle analysis to see how much growth comes from new customers, expansions, contractions, and churn. We analyze this at both total revenue and per product levels to understand each component of our business.

## Customer lifecycle stages

### new

Customers in their first month of paying us.

### reactivated

Customers who previously churned but have returned with monthly spend > 0. This signals customers who may be using our services on and off.

### flat

Existing customers whose monthly spend remained exactly the same as the previous month. This represents our stable, predictable revenue base.

### growing

Existing customers whose spend increased compared to the previous month. This shows how successful we are with our upsell, cross sell, and product expansion efforts.

### shrinking

Existing customers whose monthly spend decreased but didn't reach zero. This could be due to usage based fluctuations but also an early warning indicator of
customer dissatisfaction or competitive pressure. We pay close attention to this amount and do deeper analysis to understand the reasons behind.

## How we calculate lifecycle components

**New revenue**: total monthly revenue from customers in their first month

```sql
SUM(CASE WHEN growth_lifecycle_stage = 'NEW' THEN mrr ELSE 0 END)
```

**Reactivated revenue**: total monthly revenue from customers who returned after churning

```sql
SUM(CASE WHEN growth_lifecycle_stage = 'REACTIVATED' THEN mrr ELSE 0 END)
```

**Retained revenue**: baseline revenue that continuing customers maintained

```sql
SUM(CASE
    WHEN growth_lifecycle_stage = 'FLAT' THEN mrr
    WHEN growth_lifecycle_stage IN ('GROWING', 'SHRINKING') THEN prev_month_mrr
    ELSE 0 END)
```

**Expansion revenue**: Additional revenue gained from existing customers through increased usage

```sql
SUM(CASE WHEN growth_lifecycle_stage = 'GROWING' THEN mrr - prev_month_mrr ELSE 0 END)
```

**Contraction revenue**: Revenue lost from existing customers due to reduced usage (negative value)

```sql
SUM(CASE WHEN growth_lifecycle_stage = 'SHRINKING' THEN mrr - prev_month_mrr ELSE 0 END)
```

**Churned revenue**: Revenue lost from customers who went to $0 (negative value)

```sql
-SUM(prev_mrr) WHERE prev_mrr > 0 AND curr_mrr = 0
```

## Rate calculations

### Baseline revenue

This the total monthly revenue at the end of previous month which is the denominator for our rate calculations:

### Key rates

**New rate**: How much new revenue we acquired relative to our at baseline revenue

```sql
new_rate = (new_revenue / baseline_revenue) × 100
```

_Example_: 10% new rate means we acquired new revenue equal to 10% of our at baseline revenue

**Expansion rate**: Growth from existing customers as a percentage of base

```sql
expansion_rate = (expansion_revenue / baseline_revenue) × 100
```

_Example_: 5% expansion rate means existing customers increased their spend by 5% on average

**Contraction rate**: Revenue decrease from existing customers due to lower usage

```sql
contraction_rate = (contraction_revenue / baseline_revenue) × 100
```

_Example_: -3% contraction rate means we lost 3% of revenue from reduced customer usage

**Churn rate**: Percentage of at baseline revenue that was completely lost

```sql
churn_rate = (churned_revenue / baseline_revenue) × 100
```

_Example_: 2% churn rate means 2% of our baseline revenue base churned completely

## Notes on data

-   Analysis covers last 18 months of historical data plus 2 months forward
-   Churned customers are identified by transition from revenue > 0 to revenue = 0
-   Reactivation requires at least one month gap with revenue = 0
