---
title: How we use the data warehouse at PostHog
date: 2025-07-14
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/warehouse_blog_633055c72f.png
featuredImageType: full
author:
 - ian-vanagas
tags:
 - data warehouse
 - Product engineers
crosspost:
 - product-engineers
---

PostHog’s [data warehouse](/data-warehouse) is arguably our most powerful feature. It lets you sync data from the tools you already use (like [Stripe](/docs/cdp/sources/stripe), [Salesforce](/docs/cdp/sources/salesforce), and [Hubspot](/docs/cdp/sources/hubspot)), query it alongside your existing product data using [SQL](/docs/data-warehouse/sql), and visualize it natively.

We built it because the [modern data stack sucks](/blog/modern-data-stack-sucks). What starts as a handful of business critical tools devolves into dozens of tools, many specifically built to capture, clean, format, load, query, and visualize data.

We knew it didn't have to be this way, so we built the data warehouse to get rid of all this complexity and give you a single source of truth for all your business data.

Our team is big fans of what we've built. As proof, they've created **over 1600** SQL insights using our data warehouse. It’s our second most popular type of insight behind trends (which was around long before we had the data warehouse).

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_07_10_at_11_47_15_2x_9b179c988a.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_07_10_at_11_47_58_2x_19e2267c12.png"
  alt="PostHog"
  classes="rounded"
/>

The downside of the data warehouse’s power and flexibility is that it can be tricky to know where to start. To help you with this, we’re going over how different teams at PostHog actually use the data warehouse from the sources they use to the actual SQL queries they write.

> **Modifying queries to your data:** Because our data structure is unique, the SQL queries included here likely won’t work out-of-the-box for you. Luckily, [Max AI](/max) makes modifying SQL easily. Just paste these queries in as context and ask him to use your data instead.

## Understanding growth and churn

- Sources: [Postgres](/docs/cdp/sources/postgres), [PostHog](/docs/new-to-posthog/understand-posthog), [Salesforce](/docs/cdp/sources/salesforce)
- Tables: `postgres_invoice_with_annual_view`, `postgres_billing_customer`, `events`, `salesforce.contact`, `postgres.posthog_team`, `postgres.posthog_organization`,

Product managers at PostHog [don’t tell engineers what to do](/newsletter/product-management-is-broken). Instead, they do help them with analysis. SQL is often their weapon of choice to do this.

Core to this analysis is often combining product and revenue data, we don’t only want to see how people are using a product but:

- Who churned, how much was their churn, and why (so we can prevent future churn).
- Product-specific activation and retention rates, using our custom definition.
- Metrics for their growth reviews like revenue expansion and contraction

For all this, you might think we’d use our [Stripe source](/docs/cdp/sources/stripe), but you’d be wrong. Since we have multiple different products with different usage-based pricing, we need a custom billing service to handle everything. The data from this service goes into Postgres which then gets synced and used in PostHog. 

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_07_01_at_13_39_25_2x_9cd97c333c.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_07_01_at_13_40_29_2x_88ae2be58f.png"
  alt="PostHog"
  classes="rounded"
/>

### Using views

Because product managers are slicing and dicing the data in multiple similar ways, they end up using a lot of [views](/docs/data-warehouse/views). These enable them to reuse queries to build other ones. Some examples include:

- `org_icp_scores`: Gets ICP scores for customers from Salesforce where they are calculated.
- `feature_flags_activation_base`: Builds a funnel of product intent → activation → retention, all centered on [feature flags](/feature-flags) and enriched with an ICP score.
- `source_of_truth_for_dp_pricing_model`: Data on which customers are using [pipelines](/cdp), what volume they are doing, and more to help improve our data pipeline pricing.

### Sample queries

<details>
  <summary>Error tracking churn for June</summary>

```sql
WITH customers_per_month AS (
    SELECT 
        customer_id,
        dateTrunc('month', toDateTime(period_end, 'UTC')) as month,
        JSONExtractString(data, 'customer_email') AS customer,
        sum(JSONExtractFloat(mrr_per_product, {variables.product})) AS mrr
    FROM postgres_invoice_with_annual_view
    WHERE dateTrunc('month', toDateTime(period_end, 'UTC')) IN ('2025-04-01', '2025-05-01', '2025-06-01')
        AND JSONExtractFloat(mrr_per_product, {variables.product}) > 0
    GROUP BY customer_id, customer, month
),

april_customers AS (
    SELECT 
        customer_id,
        customer,
        mrr as april_mrr
    FROM customers_per_month
    WHERE month = '2025-04-01'
),

may_customers AS (
    SELECT 
        customer_id,
        customer,
        mrr as may_mrr
    FROM customers_per_month
    WHERE month = '2025-05-01'
),

june_customers AS (
    SELECT 
        customer_id,
        customer,
        mrr as june_mrr
    FROM customers_per_month
    WHERE month = '2025-06-01'
),

exception_events AS (
    SELECT 
        customer_id,  -- Assuming this field exists to join with invoice data
        sum(toInt(org_usage_summary.exceptions)) as exception_count,
        count(DISTINCT date) as days_with_exceptions_june
    FROM postgres.prod.billing_usagereport
    WHERE org_usage_summary.exceptions IS NOT NULL
        AND toInt(org_usage_summary.exceptions) > 0  -- Only count days with actual exceptions
        AND date >= '2025-06-01'
        AND date < '2025-07-01'  -- June only
    GROUP BY customer_id
)

SELECT 
    m.customer as _customer,
    m.customer_id,
    round(COALESCE(a.april_mrr, 0), 0) as april_mrr,
    round(m.may_mrr, 0) as may_mrr,
    round(COALESCE(j.june_mrr, 0), 0) as june_mrr,
    round(m.may_mrr - COALESCE(j.june_mrr, 0), 0) as mrr_change,
    COALESCE(e.exception_count, 0) as exception_events,
    COALESCE(e.days_with_exceptions_june, 0) as days_with_exceptions_june,
    'CHURNED IN JUNE' as churn_status
FROM may_customers m
LEFT JOIN april_customers a ON m.customer_id = a.customer_id
LEFT JOIN june_customers j ON m.customer_id = j.customer_id
LEFT JOIN exception_events e ON m.customer_id = e.customer_id
WHERE j.customer_id IS NULL  -- Had May MRR but no June MRR = June churn
    AND m.customer_id IS NOT NULL
ORDER BY m.may_mrr DESC, days_with_exceptions_june DESC, exception_events DESC
```
    
</details>

<details>
  <summary>Organizations regularly capturing exceptions (monthly)</summary>
    
```sql
WITH daily_exceptions AS (
    SELECT 
        JSONExtractString(properties, 'organization_id') as org_id,
        toStartOfMonth(timestamp) as month,
        toDate(timestamp) as report_date,
        JSONExtractInt(properties, 'exceptions_captured_in_period') as exceptions
    FROM events 
    WHERE event = 'organization usage report'
        AND JSONExtractInt(properties, 'exceptions_captured_in_period') > 0
        AND {filters}  -- Same filters as daily customers query
        AND timestamp >= toDateTime('2025-03-01')
),

monthly_activity AS (
    SELECT 
        org_id,
        month,
        count(DISTINCT report_date) as days_with_exceptions,
        -- Calculate weeks in the month to get proper average
        dateDiff('day', min(report_date), max(report_date)) / 7.0 as weeks_active,
        count(DISTINCT report_date) / GREATEST(dateDiff('day', min(report_date), max(report_date)) / 7.0, 1) as avg_days_per_week
    FROM daily_exceptions
    GROUP BY org_id, month
),

regular_users AS (
    SELECT 
        org_id,
        month
    FROM monthly_activity
    WHERE avg_days_per_week > 4
)

SELECT 
    month,
    count(DISTINCT org_id) as orgs_regularly_capturing_exceptions
FROM regular_users
GROUP BY month
ORDER BY month
```

</details>

<details>
<summary>Surveys usage growth rate over time</summary>

```sql
WITH monthly_active_orgs AS (
    SELECT
        dateTrunc('month', toDate(date)) AS month,
        customer_id,
        JSONExtractString(report, 'organization_name') AS organization_name,
        COALESCE(JSONExtractInt(org_usage_summary, 'survey_responses'), 0) AS monthly_survey_responses
    FROM
        postgres_billing_usagereport
    WHERE 
        date < dateTrunc('month', now())
        AND date > dateTrunc('month', now()) - INTERVAL 18 MONTH
    GROUP BY 1, 2, 3, 4
),
monthly_stats AS (
    SELECT
        month,
        COUNT(*) AS total_active_orgs,
        COUNT(CASE WHEN monthly_survey_responses > 0 THEN 1 ELSE NULL END) AS orgs_with_responses,
        ROUND(COUNT(CASE WHEN monthly_survey_responses > 0 THEN 1 ELSE NULL END) * 100.0 / COUNT(*), 2) AS pct_orgs_with_responses
    FROM monthly_active_orgs
    GROUP BY month
),
orgs_with_responses AS (
    SELECT
        month,
        customer_id,
        organization_name,
        monthly_survey_responses
    FROM monthly_active_orgs
    WHERE monthly_survey_responses > 0
),
max_org_per_month AS (
    SELECT 
        month,
        argMax(organization_name, monthly_survey_responses) AS max_org_name
    FROM orgs_with_responses
    GROUP BY month
),
monthly_stats_with_growth AS (
    SELECT
        ms.month,
        ms.total_active_orgs,
        ms.orgs_with_responses,
        ms.pct_orgs_with_responses,
        prev_ms.orgs_with_responses AS prev_month_orgs_with_responses,
        CASE 
            WHEN prev_ms.orgs_with_responses > 0 
            THEN ROUND(((toFloat(ms.orgs_with_responses) / toFloat(prev_ms.orgs_with_responses)) - 1) * 100, 2)
            ELSE NULL 
        END AS month_over_month_growth_pct
    FROM monthly_stats ms
    LEFT JOIN monthly_stats prev_ms ON prev_ms.month = ms.month - INTERVAL 1 MONTH
)

SELECT
    ms.month,
    ms.total_active_orgs,
    ms.orgs_with_responses,
    ms.prev_month_orgs_with_responses,
    ms.month_over_month_growth_pct,
    ms.pct_orgs_with_responses,
    CASE WHEN ms.orgs_with_responses > 0 THEN ROUND(AVG(owr.monthly_survey_responses), 0) ELSE NULL END AS avg_responses_per_org_with_responses,
    CASE WHEN ms.orgs_with_responses > 0 THEN quantile(0.5)(owr.monthly_survey_responses) ELSE NULL END AS median_responses_per_org_with_responses,
    CASE WHEN ms.orgs_with_responses > 0 THEN quantile(0.75)(owr.monthly_survey_responses) ELSE NULL END AS p75_responses_per_org_with_responses,
    CASE WHEN ms.orgs_with_responses > 0 THEN ROUND(quantile(0.95)(owr.monthly_survey_responses), 0) ELSE NULL END AS p95_responses_per_org_with_responses,
    CASE WHEN ms.orgs_with_responses > 0 THEN max(owr.monthly_survey_responses) ELSE NULL END AS max_responses_per_org,
    mo.max_org_name AS max_org_name,
    COALESCE(SUM(owr.monthly_survey_responses), 0) AS total_monthly_responses
FROM monthly_stats_with_growth ms
LEFT JOIN orgs_with_responses owr ON ms.month = owr.month
LEFT JOIN max_org_per_month mo ON ms.month = mo.month
GROUP BY ms.month, ms.total_active_orgs, ms.orgs_with_responses, ms.prev_month_orgs_with_responses, ms.month_over_month_growth_pct, ms.pct_orgs_with_responses, mo.max_org_name
ORDER BY ms.month
```
    
</details>

## Tracking revenue

- Sources: [Postgres](/docs/cdp/sources/postgres), [Salesforce](/docs/cdp/sources/salesforce)
- Tables: `postgres_invoice_with_annual_view`, `postgres_billing_customer`, `postgres_billing_usagereport`, `salesforce_opportunity`

As I hinted at above, tracking revenue at PostHog can be quite complicated. Because we have multiple products with usage-based and tiered pricing with discounts and add-ons, we can’t just query Stripe and get our revenue data. We have a specific billing service that generates invoices and reports and adds them to Postgres.

For multiple years, we used Metabase to query and visualize all this revenue data from Postgres. All of the cleanup and reformatting needed to make it usable was in there too. Moving all this to PostHog was a lot of work (it had its own project Slack channel), but we’ve done it now. 

Our PostHog revenue dashboard now includes insights on the following (powered by the data warehouse): 

- Monthly and annual recurring revenue over time
- Revenue lifecycle (new, retention, expansion, contraction)
- Customer size analysis
- Per-product revenue analysis

Rebuilding (and improving) these insights required us to build views that standardize the data, connect Salesforce to better project revenue, create SQL visualizations we were missing, and more. Overall, the project was a success both in terms of making our revenue data more accessible and improving our data warehouse as a product. 

### Sample queries

<details>
  <summary>US/EU revenue split</summary>
    
```sql
WITH
    eu_customers as (select id from postgres_billing_customer where license_id = 1),
    us_customers as (select id from postgres_billing_customer where license_id = 2)

select
    round(sumIf(mrr, customer_id in (select id from us_customers))) * 12 as us_ARR,
    round(sumIf(mrr, customer_id in (select id from eu_customers))) * 12 as eu_ARR,
    coalesce(round(sumIf(mrr, customer_id is null OR (customer_id not in (select id from eu_customers) and customer_id not in (select id from us_customers)))) * 12, 0) as other_ARR,
    dateTrunc('month', toDateTime(period_end, 'UTC')) as period
from postgres_invoice_with_annual_view
where toDateTime(period_end, 'UTC') < dateTrunc('month', now()) + interval 2 month
and toDateTime(period_end, 'UTC') > dateTrunc('month', now() - interval 12 month)

group by period order by period asc
```

</details>

<details>
  <summary>Revenue lifecycle</summary>
    
```sql
WITH date_range AS (
    SELECT 
        toStartOfMonth(now() - INTERVAL number MONTH) as month
    FROM numbers(35)  -- 33 months back + 2 forward
    WHERE month >= toStartOfMonth(now() - INTERVAL 33 MONTH)
        AND month <= toStartOfMonth(now() + INTERVAL 2 MONTH)
),
all_customers AS (
    SELECT DISTINCT id as customer_id
    FROM iwa_summary_customer_month
    WHERE month < toStartOfMonth(now() + INTERVAL 2 MONTH) 
    AND month > toStartOfMonth(now() - INTERVAL 33 MONTH)
),
customer_month_grid AS (
    SELECT 
        ac.customer_id,
        dr.month
    FROM all_customers ac
    CROSS JOIN date_range dr
),
customers_per_month AS (
    SELECT 
        cmg.customer_id,
        cmg.month,
        COALESCE(sum(iscm.total_mrr), 0) as mrr
    FROM customer_month_grid cmg
    LEFT JOIN iwa_summary_customer_month iscm 
        ON cmg.customer_id = iscm.id 
        AND cmg.month = iscm.month
    WHERE cmg.month < toStartOfMonth(now() + INTERVAL 2 MONTH) 
    AND cmg.month > toStartOfMonth(now() - INTERVAL 33 MONTH)
    GROUP BY cmg.customer_id, cmg.month
), 
churn_calc AS (
    SELECT
        customer_id,
        month AS churn_accounting_month,
        
        mrr AS curr_mrr,
        
        lagInFrame(mrr, 1, 0) OVER (
        PARTITION BY customer_id
        ORDER BY month
        ) AS prev_mrr
    FROM customers_per_month
),
churned AS (
    SELECT
        churn_accounting_month,
        sum(prev_mrr - curr_mrr) AS churned_mrr,
        count(*) as churned_customers
    FROM churn_calc
    WHERE prev_mrr > 0
        AND curr_mrr <= 0
    GROUP BY 1
),
customer_status AS (
    SELECT 
        customer_id,
        month,
        mrr,
        CASE WHEN MIN(month) OVER (PARTITION BY customer_id) = month THEN TRUE ELSE FALSE END as first_month_active,
        CASE WHEN lagInFrame(mrr, 1, 0) OVER (PARTITION BY customer_id ORDER BY month) > 0 THEN TRUE ELSE FALSE END as active_in_previous_month,
        lagInFrame(mrr, 1, 0) OVER (PARTITION BY customer_id ORDER BY month) as prev_month_mrr
    FROM customers_per_month
),
lifecycle AS (
    SELECT
        month,
        CASE 
            WHEN NOT active_in_previous_month THEN 'NEW'
            WHEN active_in_previous_month AND prev_month_mrr = mrr THEN 'FLAT'
            WHEN active_in_previous_month AND prev_month_mrr > mrr THEN 'SHRINKING'
            WHEN active_in_previous_month AND prev_month_mrr < mrr THEN 'GROWING'
            ELSE 'UNCATEGORIZED'
        END AS growth_lifecycle_stage, 
        mrr, 
        prev_month_mrr
    FROM customer_status
    WHERE mrr > 0
), 
growth_base AS (
    SELECT 
        month, 
        SUM(CASE WHEN growth_lifecycle_stage = 'NEW' THEN mrr ELSE 0 END) as new, 
        SUM(CASE 
            WHEN growth_lifecycle_stage = 'FLAT' THEN mrr
            WHEN growth_lifecycle_stage IN ('GROWING', 'SHRINKING') THEN prev_month_mrr 
            ELSE 0 END) as retained,
        SUM(CASE WHEN growth_lifecycle_stage = 'GROWING' THEN mrr - prev_month_mrr ELSE 0 END) as grown_from_existing,
        SUM(CASE WHEN growth_lifecycle_stage = 'SHRINKING' THEN mrr - prev_month_mrr ELSE 0 END) as shrunk_from_existing,
        SUM(CASE WHEN growth_lifecycle_stage = 'UNCATEGORIZED' THEN mrr ELSE 0 END) as uncategorized,
        -- Calculate the base MRR that was "at risk" (from continuing customers)
        SUM(prev_month_mrr) as at_risk_mrr
    FROM lifecycle    
    GROUP BY month
)
SELECT 
    growth_base.month as month, 
    growth_base.new,
    growth_base.retained,
    growth_base.grown_from_existing,
    growth_base.shrunk_from_existing, 
    growth_base.uncategorized, 
    -churned.churned_mrr as churned,
    churned.churned_customers,
        -- Add period start and end MRR
    lagInFrame(
        growth_base.new +
        growth_base.retained + 
        growth_base.grown_from_existing + 
        growth_base.shrunk_from_existing +
        growth_base.uncategorized
    ) OVER (ORDER BY growth_base.month) as period_start_mrr,
    
    -- Period end MRR = current month's total
    growth_base.new +
    growth_base.retained + 
    growth_base.grown_from_existing + 
    growth_base.shrunk_from_existing +
    growth_base.uncategorized as period_end_mrr,
FROM growth_base
LEFT JOIN churned
ON growth_base.month = churned.churn_accounting_month
WHERE growth_base.month < today() + interval 1 month
ORDER BY month ASC
```

</details>

<details>
  <summary>Revenue per product</summary>
    
```sql
SELECT
    dateTrunc('month', toDateTime(period_end, 'UTC')) AS period_month,
    tupleElement(kv, 1) AS product,
    SUM(toFloat(tupleElement(kv, 2))) AS revenue
FROM postgres_invoice_with_annual_view
ARRAY JOIN JSONExtractKeysAndValuesRaw(assumeNotNull(mrr_per_product)) AS kv
WHERE 
    toDateTime(period_end, 'UTC') < dateTrunc('month', now() + interval 1 month)
    AND toDateTime(period_end, 'UTC') >= dateTrunc('month', now() - interval 12 month)
GROUP BY period_month, product
ORDER BY period_month, product

LIMIT 500
```
    
</details>

## Tracking startup and YC plan growth, costs, and ROI

- Sources: [Stripe](/docs/cdp/sources/stripe), [Postgres](/docs/cdp/sources/postgres)
- Tables: `stripe_customer`, `stripe_invoice`, `postgres_billing_usagereport`, `postgres_billing_customer`

Each quarter, hundreds of startups sign up for our [startup plan](/startups) (which gives them $50k in free credits), dozens more sign up to our upgraded [YC plan](/handbook/brand/startups#posthog-for-y-combinator). To make sure it is going well, we have a dashboard with details like:

1. The number of organizations on the startup plan
2. The cost of the startup plan for us based on credit usage.
3. The count of startups who “graduate” and pay us money as well as how much money they pay us. 

Unlike the revenue, churn, and growth data, we actually do use Stripe for this. We have metadata on Stripe customers saying if they are a startup plan customer and what type of startup plan they are on. This helps us get the customer count as well as the “graduate” details.

Costs rely on combining the Stripe data with our billing data in Postgres. This lets us see how many credits startup plan customers are going through.

### Sample queries

<details>
  <summary>Startup plan customer count (not YC)</summary>
    
```sql
SELECT 
    COUNT(*) 
FROM 
    stripe_customer 
WHERE 
    metadata.is_current_startup_plan_customer = 'true' 
    AND metadata.startup_plan_label != 'YC'
```

</details>

<details>
  <summary>Previous startup & YC plan customers revenue per customer</summary>
    
```sql
WITH previous_startup_customers AS (
    SELECT 
        sc.id AS customer_id,
        sc.name as name,
        sc.metadata.startup_plan_end_at
    FROM stripe_customer AS sc
    WHERE 
        sc.metadata.is_previous_startup_plan_customer = 'true'
)
SELECT 
    psc.customer_id,
    psc.name,
    concat('$', formatReadableQuantity(SUM(si.amount_paid / 100))) as total_amount_paid,
    concat('$', formatReadableQuantity(SUM(si.total / 100))) as total_invoice_amount,
    concat('$', formatReadableQuantity(SUM((si.starting_balance - si.ending_balance) / 100)*-1)) as total_credits,
    COUNT(si.id) AS invoice_count
FROM stripe_invoice AS si
JOIN previous_startup_customers AS psc ON psc.customer_id = si.customer_id
WHERE 
    si.total > 0
    AND 
    si.status <> 'draft'
group by psc.customer_id, psc.name
having SUM(si.amount_paid) > 0
order by SUM(si.amount_paid) desc    
```

</details>

<details>
  <summary>Startup & YC plan customers cohorts by starting month</summary>
    
```sql
SELECT 
    COUNT(*) AS customer_count, 
    toStartOfMonth(fromUnixTimestamp(toInt(metadata.startup_plan_start_at))) AS month_start,
    SUM(metadata.startup_plan_label = 'YC') AS yc_customer_count,
    SUM(metadata.startup_plan_label != 'YC') AS non_yc_customer_count
FROM 
    stripe_customer 
WHERE 
    metadata.is_current_startup_plan_customer = 'true' 
    OR metadata.is_previous_startup_plan_customer = 'true'
GROUP BY 
    month_start
ORDER BY 
    month_start ASC
```

</details>

## Creating support reports (SLA, first response time, and more) 

- Sources: [Zendesk](/docs/cdp/sources/zendesk)
- Tables: `zendesk_ticket_events`, `zendesk_tickets`, `zendesk_ticket_metric_events`, `zendesk_groups`

We have high standards for our support experience. Where do those standards get judged? The data warehouse, of course. 

We used to do all our support reporting in Zendesk, but since we added the Zendesk source, doing it in PostHog has become easier and better. 

Unlike other teams, support almost always uses Zendesk exclusively. This means less complicated queries and more opportunities to use trend insights on top of SQL insights. 

For example, our **SLA Achievement Rate** insight looks at the `ticket_metrics_events` table from `zendesk` to find what percentage of tickets were replied to or updated within the [SLA goals we set out](/handbook/support/customer-support#response-targets-slas-and-csat-surveys) (no SQL required).

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_07_09_at_10_31_29_2x_5928b4166b.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_07_09_at_10_31_48_2x_73f756a1b4.png"
  alt="PostHog"
  classes="rounded"
/>

Beyond this, they use both insight types to track:

- Service-level agreement (SLA) and first response time goals.
- Performance and breaches on escalated tickets.
- Support load on our product teams.
- Sources of support requests.

This data is combined with [CSAT surveys](/templates/csat-survey) (both scores and responses) to give a complete picture of the support we’re providing at PostHog. Abigail writes up a summary based on this data and shares it with the exec team weekly. 

![Support report](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_07_14_at_10_27_19_2x_5d1fdd9ef1.png)

### Sample queries

<details>
  <summary>Breached non-escalated tickets in the last 7 days</summary>
    
```sql
with first_escalated as(
    select 
        ticket_id,
        min(created_at) as timestamp
    from zendesk_ticket_events
    where child_events like '%escalated%'
    group by ticket_id
),

before_escalated_breaches_in_time_range as(
    select
        ztme.ticket_id as ticket_id,
    from zendesk_ticket_metric_events ztme
    join first_escalated fe on fe.ticket_id = ztme.ticket_id
    where 
        ztme.type = 'breach'
        and ztme.metric in ('reply_time', 'pausable_update_time')
        and ztme.time <= fe.timestamp
        and ztme.time >= {filters.dateRange.from}
        and ztme.time <= {filters.dateRange.to}
    group by ztme.ticket_id
),

never_escalated as(
    select 
        id as ticket_id,
    from zendesk_tickets
    where tags not like '%escalated%'
    group by id
),

never_escalated_breaches_in_time_range as(
    select
        ztme.ticket_id as ticket_id,
    from zendesk_ticket_metric_events ztme
    join never_escalated ne on ne.ticket_id = ztme.ticket_id
    where 
        ztme.type = 'breach'
        and ztme.metric in ('reply_time', 'pausable_update_time')
        and ztme.time >= {filters.dateRange.from}
        and ztme.time <= {filters.dateRange.to}
    group by ztme.ticket_id
),

select 
    count(distinct(zt.id)) as num_breaches,
    count(distinct(IF(zt.id in (select ticket_id from never_escalated_breaches_in_time_range), zt.id, null)))as never_escalated_breaches,
    count(distinct(IF(zt.id in (select ticket_id from before_escalated_breaches_in_time_range), zt.id, null))) as before_escalated_breaches,
    zg.name
from zendesk_tickets zt
join zendesk_groups zg on zg.id = zt.group_id
where 
    zt.id in (select ticket_id from before_escalated_breaches_in_time_range)
    or zt.id in (select ticket_id from never_escalated_breaches_in_time_range)
group by zg.name
order by num_breaches desc
```

</details>

<details>
  <summary>Escalated SLA % last 7 days by team</summary>
    
```sql
with first_escalated as(
    select 
        ticket_id,
        min(created_at) as timestamp
    from zendesk_ticket_events
    where child_events like '%"added_tags":["escalated"%'
    group by ticket_id
),

escalated_breaches_in_time_range as(
    select
        ztme.ticket_id as ticket_id

    from zendesk_ticket_metric_events ztme
        join first_escalated fe on fe.ticket_id = ztme.ticket_id
    where 
        ztme.type = 'breach'
        and ztme.metric in ('reply_time', 'pausable_update_time')
        and ztme.time >= fe.timestamp
        and ztme.time >= {filters.dateRange.from}
        and ztme.time <= {filters.dateRange.to}
    group by ztme.ticket_id
),

escalated_fulfill_events_in_time_range as (
    select
        ztme.ticket_id as ticket_id

    from zendesk_ticket_metric_events ztme
        join first_escalated fe on fe.ticket_id = ztme.ticket_id
    where 
        ztme.type = 'fulfill'
        and ztme.metric in ('reply_time', 'pausable_update_time')
        and ztme.time >= fe.timestamp
        and ztme.time >= {filters.dateRange.from}
        and ztme.time <= {filters.dateRange.to}
    group by ztme.ticket_id
),

breaches_by_group as (
    select 
        count(distinct(zt.id)) as num_breaches,
        zg.name as group_name
    from zendesk_tickets zt
        join zendesk_groups zg on zg.id = zt.group_id
    where zt.id in (select ticket_id from escalated_breaches_in_time_range)
    group by zg.name
    order by num_breaches desc
),

fulfills_by_group as (
    select 
        count(distinct(zt.id)) as num_fulfills,
        zg.name as group_name
    from zendesk_tickets zt
        join zendesk_groups zg on zg.id = zt.group_id
    where zt.id in (select ticket_id from escalated_fulfill_events_in_time_range)
    group by zg.name
    order by num_fulfills desc
),

select
    zg.name,
    IF(fbg.num_fulfills=0, 0, (fbg.num_fulfills-bbg.num_breaches)/fbg.num_fulfills) as sla_attainment
from zendesk_groups zg
    left outer join breaches_by_group bbg on bbg.group_name = zg.name
    left outer join fulfills_by_group fbg on fbg.group_name = zg.name
where (bbg.num_breaches>0 or fbg.num_fulfills>0)
order by sla_attainment desc
```

</details>

<details>
  <summary>Time UTC when tickets are created (last 6 months)</summary>
    
```sql
with all_tickets as(
    select
        count() as total_tickets
    from zendesk_tickets
    where created_at >= toStartOfDay(now()) - interval 6 month
)

select
    toHour(toTimeZone(created_at, 'UTC')) as hour_of_day,
    count() as count_per_hour,
    count_per_hour/(select total_tickets from all_tickets) as percentage_per_hour
from zendesk_tickets
where created_at >= toStartOfDay(now()) - interval 6 month
group by hour_of_day
```
</details>

## Creating quarterly sales and customer success reports

- Sources: [Salesforce](/docs/cdp/sources/salesforce), [Postgres](/docs/cdp/sources/postgres), [Vitally](/docs/cdp/sources/vitally)
- Tables: `invoice_with_annual_plans_shifted`, `vitally_all_managed_accounts`, `salesforce_opportunity`, `salesforce_user`

Similar to support, sales does reporting through PostHog. They pull from Salesforce mostly, but also billing data in Postgres and account ownership details from Vitally. These are best combined in the **Sales and CS Quarter Tracker** dashboard which covers details like:

- Revenue from customers managed by sales and customer success
- Details on managed customers
- Salesforce opportunity pipeline and how much they’re worth
- Won opportunities and how much they’re worth

### Using variables

The sales dashboard is the best example of the power of [variables](/docs/data-warehouse/sql/variables). Nearly every insight uses variables to set the account owner, quarter, and whether they are managed by sales or customer success. 

This makes all of the insights much more reusable by being able to reuse them across quarters or for looking at individual performance. 

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_07_09_at_13_52_43_2x_d99d5c2158.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2025_07_09_at_13_52_20_2x_a3d79b8b95.png"
  alt="PostHog"
  classes="rounded"
/>

### Sample queries

<details>
  <summary>Salesforce opportunities by quarter</summary>
    
```sql
SELECT 
    u.email AS owner,
    opp.name,
    opp.type,
    opp.close_date AS close_date,
    opp.forecast_category_name,
    opp.stage_name,
    opp.amount,
    opp.discount_rate_c AS discount,
    opp.amount_discounted_c AS discounted_amount
FROM 
    salesforce_opportunity opp
JOIN 
    salesforce_user u ON opp.owner_id = u.id
WHERE 
    toDateTime(opp.close_date) >= {variables.start_of_quarter}
    AND toDateTime(opp.close_date) < {variables.start_of_quarter} + INTERVAL 3 MONTH
    AND opp.is_closed = FALSE
    AND opp.self_serve_no_interaction_c = FALSE
    AND opp.self_serve_post_engagement_c = FALSE
    AND u.email LIKE CONCAT('%', {variables.account_owner})
ORDER BY 
    opp.close_date ASC;
```

</details>

<details>
  <summary>Salesforce open pipeline by quarter (annual only)</summary>
    
```sql
SELECT 
    SUM(opp.amount_discounted_c)
FROM 
    salesforce_opportunity opp
JOIN 
    salesforce_user u ON opp.owner_id = u.id
WHERE 
    toDateTime(opp.close_date) >= {variables.start_of_quarter}
    AND toDateTime(opp.close_date) < {variables.start_of_quarter} + INTERVAL 3 MONTH
    AND opp.forecast_category_name IN ('Commit', 'Best Case', 'Pipeline')
    AND opp.self_serve_no_interaction_c = FALSE
    AND opp.self_serve_post_engagement_c = FALSE
    AND opp.type = 'Annual Contract'
    AND u.email LIKE CONCAT('%', {variables.account_owner});
```

</details>

<details>
  <summary>Sales and CS managed accounts start of quarter ARR</summary>
    
```sql
WITH start_of_quarter AS (
    SELECT 
        inv.organization_id AS organization_id,
        acc.organization_name,
        acc.account_executive,
        acc.customer_success_manager,
        ROUND(SUM(inv.mrr * 12), 2) AS arr,
        CASE 
            WHEN arrayExists(x -> x LIKE '%annual%', groupArray(type)) 
            THEN 'annual' 
            ELSE 'monthly' 
        END AS type
    FROM 
        invoice_with_annual_plans_shifted inv
    JOIN 
        vitally_all_managed_accounts acc 
        ON inv.organization_id = acc.organization_id
    WHERE 
        period_end < toDateTime({variables.start_of_quarter})
        AND period_end >= toDateTime({variables.start_of_quarter}) - INTERVAL 1 MONTH
    GROUP BY 
        organization_id, organization_name, account_executive, customer_success_manager
    ORDER BY 
        arr DESC
)

SELECT 
    ROUND(SUM(arr), 0)
FROM 
    start_of_quarter
WHERE 
    (
        account_executive LIKE CONCAT('%', {variables.account_owner}) 
        OR customer_success_manager LIKE CONCAT('%', {variables.account_owner})
    )
    AND CASE 
        WHEN {variables.segment} = 'All' THEN 1
        WHEN {variables.segment} = 'AE Managed' AND account_executive IS NOT NULL THEN 1
        WHEN {variables.segment} = 'CSM Managed' AND customer_success_manager IS NOT NULL THEN 1
        ELSE 0
    END = 1;
```

</details>

## How should you get started?

Feeling inspired? Here's how you can get started:

1. Start by [linking a source](/docs/cdp/sources) from a tool you already use.
2. Go to the [SQL editor](https://us.posthog.com/sql) and start by writing a basic query like `select * from events limit 10`.
3. Layer more complexity, like filtering, [aggregating](/docs/data-warehouse/sql/useful-functions#aggregate-functions), and [joining](/docs/data-warehouse/join) data. Use [Max AI](/max) to help you with this.
4. Use our [SQL visualizations](/docs/data-warehouse/query#sql-visualizations) to see your data in a new way.
5. Build a dashboard of related insights and share them with your team.