---
title: Revenue and forecasting
sidebar: Handbook
showTitle: true
---

The growth team maintains the revenue dashboards and queries that are used to understand:

1. What our historical revenue record looks like
2. What our revenue is expected to be this month
3. What our churn, growth, expansion, and contraction look like
4. Which customers have done the above activities
5. etc

Currently, all revenue dashboards can be found in Metabase (though we hope to have them all in PostHog's own data warehouse soon 👀).

## Important dashboards
(these require internal access)
- [General overview](http://metabase-prod-us/dashboard/1-overview): Useful to see our ARR graph and get quick links to dig into revenue for certain months.
- [Revenue lifecycle](http://metabase-prod-us/dashboard/38-revenue-lifecycle-deep-dive-dashboard): Useful to see trends over time for churn, expansion, new revenue, etc.
- [Product-specific analysis](http://metabase-prod-us/dashboard/39-revenue-growth-by-product (pick your product and date [month] at the top!)): Kind of a combination of the above two, but for a specific product
- [Revenue by customer bucket](http://metabase-prod-us/dashboard/40-revenue-growth-by-customer-spend-size): Useful for understanding trends in contract size for financial modeling, support, etc

## FAQ

### How is revenue attributed to a certain month?
Revenue is attributed to a given month based on the end-date of the invoice period. For example, an invoice that has a period of 2023-01-12 to 2023-02-12 will be counted in the revenue for 2023-02. 

Some invoices cover multiple months. In this case, in the `invoice_with_annual` table (which is what all our dashboards use) we take the total amount of the invoice and divide it by the number of months the invoice covers, which gives us the MRR. We then generate a row for each month with that MRR so we can count that revenue into our monthly ARR/churn/expansion/etc calculations.

### When is it a "forecast" vs a real, complete number?
As soon as any given month starts, we start closing invoices. As the month goes on and customers' invoice periods end, we close more invoices. This means that as the month goes on, we get more and more confident about what our revenue will be for that month. The month's revenue can still change after the month is over, however, due to delayed payments. This is generally not a hugely significant number, but it is something to be aware of.

### How do we forecast a customer's revenue?
Our revenue is based on usage, so we do some basic math to make an educated guess about how much usage a customer will have in the current period.
- For new customers, their usage can be very spiky as they tune their implementation. We don't currently forecast their usage if it's less than 31 days since their subscription started. Instead, we just report their current usage as their forecast.
- If there are fewer than 7 days elapsed in the customer's current billing period, get the last 7 days usage (even if it's from the last period) and calculate the usage per hour. The calculate the remaining hours in the billing period, and do math to make an estimate.
- If there are more than 7 days elapsed in the customer's current billing period, do the math based on all the days in the billing period.
- If the customer has billing limits set, respect those billing limits.

### How are cancelled bills handled? Are those forecasted?
As soon as someone cancels their account, their invoice is immediately closed. The revenue from that invoice immediately goes into the "completed" pile.

### When are invoices updated?
A task is run nightly to sync the last 2 months of completed invoices, as well as all upcoming invoices for all customers. After the task is complete, the `invoice_with_annual` view is updated with the fresh data.
