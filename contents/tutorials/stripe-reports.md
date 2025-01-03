---
title: How to set up Stripe reports
date: 2024-06-21
author:
 - ian-vanagas
tags:
 - data warehouse
---

Creating and analyzing reports for your Stripe data helps you understand how you are making money and how you can improve. 

This tutorial shows you how to sync your Stripe data to PostHog and then create a report of insights like customer count, gross revenue, recurring revenue, revenue churn, and more.

## Linking Stripe data to PostHog

To start, you need both a Stripe and PostHog account. Once you have those, head to PostHog's [Data pipeline page](https://us.posthog.com/pipeline/sources) and:
1. Under the sources tab, click **New source**
2. Choose the Stripe option by clicking **Link**
3. Enter [your account ID](https://dashboard.stripe.com/settings/user) and a [restricted API key](https://dashboard.stripe.com/apikeys/create) that can read the resources you want to query
4. Press **Next**, keep all tables selected and click **Import**

> For Stripe tables, incremental syncs will only sync new records and not update existing records. This is a limitation of the Stripe API in which it's not possible to query for updated data. 

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/link_light_d827d9f83f.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/link_dark_6622bd98c2.png"
  alt="Linking Stripe Account"
  classes="rounded"
/>

Once done, PostHog will automatically pull and format your Stripe data for querying. You can adjust the sync frequency, see the last successful run, and more in [data pipeline sources tab](https://us.posthog.com/pipeline/sources).

> **Note:** If you are missing a table, check your [data pipeline sources tab](https://us.posthog.com/pipeline/sources) to make sure it synced correctly.

## Creating insights for your Stripe report

Now that your Stripe data is synced into PostHog, you can use it to create insights for your report. Each of these requires you to create a [new insight in the product analytics tab](https://us.posthog.com/project/insights/new).

> **Want to get started fast?** Check out our [Stripe starter report template](/templates/stripe-report-dashboard).

### Customer count

To start, we create a trend of customer count over time. 

On the trends tab, change the aggregation to **Unique users**, and then click the data series, go to the **Data Warehouse** tab, hover over the `stripe_customer` table, and click **Select**. You might want to change the **Distinct ID field** from `id` to `email` as Stripe can give multiple `id` values to the same user email.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/customer_light_944920946a.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/customer_dark_e18fc2d09c.png"
  alt="Customer Count Insights"
  classes="rounded"
/>

This can also be done for any of the other Stripe data like charges, subscriptions, and invoices. You can also add filters based on property values like `created_at`, `email`, `status`, and more.

### Gross revenue

Next, we can get our gross revenue by doing a similar process and selecting `stripe_charge`. For aggregation, we want **Property value sum** and then choose `amount`. We also want to filter out failed charges by clicking the filter button, selecting the `status` property, and making sure it doesn't equal `failed`.

Finally, to clean up the visualization, click **enable formula mode** to divide by 100 (the `amount` value is in cents) and click **Options** on the chart to add `$` as a prefix.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/revenue_light_bf87a357f2.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/revenue_dark_e75e42ffb3.png"
  alt="Gross Revenue Insights"
  classes="rounded"
/>

### Monthly recurring revenue (average revenue per customer)

There are many ways to calculate monthly recurring revenue, but the easiest and most common is multiplying the number of customers by the average revenue per customer per month.

To do this, we'll rely on the `stripe_invoice` series. Make sure to set `customer_id` as the distinct ID field before you select it, and then change the aggregation type to unique users. We also want to filter out invoices with nothing paid, so add a filter where `amount_paid` is greater than 0.

Next, we can copy that series to create another  but modify it to aggregate by property value average of `amount_paid`. 

Finally, we use formula mode to divide the amount by 100 and then multiply by the number of users with `(B/100)*A`. You can add the prefix and likely want to change the graph to the last 180 days grouped by month.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/mrr_light_6250aa8e04.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/mrr_dark_53df84dbb5.png"
  alt="Monthly Recurring Revenue Insights"
  classes="rounded"
/>

### Monthly recurring revenue (the Stripe way)

[Stripe calculates MRR](https://support.stripe.com/questions/calculating-monthly-recurring-revenue-(mrr)-in-billing) by "summing the monthly-normalized amounts of all active subscriptions at that time." 

To mimic this calculation in PostHog, we need to write an [SQL query](/docs/product-analytics/sql) that gets all the subscription items, normalizes the subscription amount, and then sums them up. Because a lot of this data is in `JSON`, we need to extract the values.

```sql
WITH subscription_items AS (
   SELECT
       id,
       current_period_start, 
       JSONExtractArrayRaw(items ?? '[]', 'data') AS data_items
   FROM stripe_subscription
   WHERE status = 'active'
   AND (trial_end IS NULL OR trial_end < now())
),
flattened_items AS (
   SELECT
       id,
       current_period_start,
       arrayJoin(data_items) AS item
   FROM subscription_items
)
SELECT
   sum(
       case
           when JSONExtractString(JSONExtractRaw(item, 'plan'), 'interval') = 'month' 
               then JSONExtractFloat(JSONExtractRaw(item, 'plan'), 'amount')
           when JSONExtractString(JSONExtractRaw(item, 'plan'), 'interval') = 'year' 
               then JSONExtractFloat(JSONExtractRaw(item, 'plan'), 'amount') / 12
           else 0
       end
   ) / 100 AS current_mrr,
   count(DISTINCT id) as subscription_count 
FROM flattened_items
WHERE JSONExtractBool(JSONExtractRaw(item, 'plan'), 'active') = true
AND JSONExtractFloat(JSONExtractRaw(item, 'plan'), 'amount') > 0
```

> **Why can't we get a rolling MRR?** Due to a Stripe API limitation, we only sync new records, not update existing ones. This means when a subscription was created in July but is still active in November, we can't see that it was active for all those months, we only see its current state. For an accurate rolling MRR calculation, we need to know the active state of each subscription for every month in history, but this data isn't available with our current setup.

### Revenue churn

For many companies, the amount of money they lose is just as important as the amount they retain. To measure this, we can track revenue churn. 

To do this, we write SQL to query both the `stripe_invoice` and `stripe_subscription` for users with an invoice but without a subscription. This requires joining the tables together on the `customer_id` value, and looks like this for the last 30 days:

```sql
with 
    recent_invoices as (
        select customer_id, amount_paid, created_at 
        from stripe_invoice 
        where created_at >= now() - INTERVAL 30 day
    ),
    subscribed_customers as (
        select DISTINCT customer_id
        from stripe_subscription
    )
select sum(recent_invoices.amount_paid)/100
from recent_invoices
LEFT JOIN subscribed_customers on subscribed_customers.customer_id = recent_invoices.customer_id
where empty(subscribed_customers.customer_id)
```

### Revenue growth rate

To get revenue growth rate, query `stripe_invoice` to get the monthly amount paid sum, but then we use window functions to calculate growth. These smooth out the month-over-month changes to give us a 3-month average to use in our growth rate calculation.

```sql
WITH monthly_mrr AS (
    SELECT
        toStartOfMonth(created_at) AS month,
        sum(amount_paid) / 100 AS mrr
    FROM prod_stripe_invoice
    WHERE status = 'paid'
    GROUP BY month
    ORDER BY month
),

mrr_with_growth AS (
    SELECT
        month,
        mrr,
        avg(mrr) OVER (
            ORDER BY month
            ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
        ) AS mrr_avg,
        avg(mrr) OVER (
            ORDER BY month
            ROWS BETWEEN 3 PRECEDING AND 1 PRECEDING
        ) AS previous_mrr_avg
    FROM monthly_mrr
)

SELECT
    month,
    mrr_avg AS mrr,
    previous_mrr_avg AS previous_mrr,
    (mrr_avg - previous_mrr_avg) * 100.0 / previous_mrr_avg AS mrr_growth_rate
FROM mrr_with_growth
WHERE previous_mrr_avg IS NOT NULL
ORDER BY month
```

The nice part about this is that we can still visualize the query data as a graph by choosing the line chart option below the query and then choosing month as the X-axis and MRR growth as the Y-axis.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/graph_light_24ca8acf72.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/graph_dark_2aded653fd.png"
  alt="Revenue growth rate graph"
  classes="rounded"
/>

### Usage by top customers

The great part of syncing your Stripe data in PostHog is using it alongside your product data. An example of doing this is querying the usage of top customers. 

To do this, we get the top customers from the `stripe_invoice` and join their emails with their PostHog `distinct_id` to get a count of their events. 

```sql
with
    top_customers as (
        select customer_email, sum(amount_paid) / 100 as total_paid 
        from stripe_invoice
        where created_at >= now() - INTERVAL 30 day
        group by customer_email
    ),
    big_events as (
        select count(*) as event_count, distinct_id
        from events
        group by distinct_id
    )
select customer_email, total_paid, event_count
from top_customers
left join big_events on big_events.distinct_id = top_customers.customer_email
order by total_paid desc
```

You can further break this down by filtering for specific events like `home_api_called`.
<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/top_light2_c7e1feff7f.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/top_dark2_44770c94b4.png"
  alt="Top customers usage graph"
  classes="rounded"
/>

## Further reading

- [The basics of SQL for analytics](/product-engineers/sql-for-analytics)
- [Using HogQL for advanced breakdowns](/tutorials/hogql-breakdowns)
- [Adventures in null handling: Null money, null problems](/blog/null-handling-hogql)

<NewsletterForm />