Raw revenue numbers can sometimes be misleading due to various factors that don't reflect the true health of our 
business. Our adjusted revenue methodology helps us account for these factors to get a clearer picture of our 
growth.

## Why we adjust revenue
1. Create a more accurate representation of our business performance
2. Identify growth patterns by removing short term noise due to the nature of usage based revenue
3. Easily spot any anomalies in growth patterns
4. Standardize our reporting methodology

## Adjustments
We make three primary adjustments to our revenue data:

### 1. Trial adjustments
Revenue from customers who are testing our platform with the intention of potentially moving to self hosted or 
another solution.

Why: Including trial revenue in our regular metrics could create an artificially inflated view of 
sustainable ARR, especially if we know the customer is likely to leave.

How: 
- We flag accounts as "trials" when we know they're evaluating our service (typically identified by our sales team)
- We remove the revenue from these accounts when calculating retention and other business metrics

### 2. Revenue spike adjustments
One time significant increases in customer spending that don't represent sustainable revenue growth. This could be due to bot attacks, implementation errors, or sudden unexpected increase in volume on the customer side.

Why: These spikes can significantly distort our monthly growth metrics and don't represent sustainable revenue we can count on going forward.

How: We define a spike when all these conditions are met:
- Customer's current month revenue is more than twice the average of the previous two months
- The increase is at least $1000
- The following month's revenue decreases by 50% or more from the spike month

### 3. Annual plan adjustments
Accounting for the full spending potential of customers on annual plans who receive discounted credits.

Why: This gives us insight into the actual usage value customers are receiving, which is often higher than what they pay due to annual discount incentives.

How: Calculate what customers would have paid without the annual plan discount (annual_mrr_value = total_mrr / (1 - discount))

### 4. Account consolidations
Reconciling multiple accounts that belong to the same organization.

Why: Organizations sometimes have multiple accounts that should be viewed as a single customer for accurate revenue analysis. This way we can make sure we're tracking true customer retention rather than treating internal movements as churn

How: 
- identify and consolidate accounts when customers move from EU to US instances
- combine revenue and usage from different teams under the same organization that may exist as separate PostHog accounts
