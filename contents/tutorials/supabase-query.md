---
title: How to query Supabase data in PostHog
date: 2024-08-01
author:
 - ian-vanagas
tags:
 - data warehouse
---

Combining your database and analytics data is a powerful way to understand your users. [Supabase](https://supabase.com/) is a popular choice for handling that app data, as it provides a database, auth, storage, and more all-in-one.

Because Supabase is built on Postgres, we can link and query it in PostHog using our data warehouse. This tutorial shows you how to do that and provides some example insights you can create with the data afterward. 

## Linking Supabase data to PostHog

To start, you need both a Supabase and PostHog account. Once you have those, head to PostHog's [data pipeline sources tab](https://us.posthog.com/pipeline/sources) and:

1. Click **New source**
2. Choose the **Postgres** option by clicking **Link.**
3. Go to your Supabase project settings and under configuration, click **Database.**
4. Fill out the PostHog data warehouse link fields with your Supabase data.
    1. Under connection parameters, copy host, database name, port, and user (database name in Supabase is just `database` in PostHog) 
    
    ![Supabase data warehouse link setup in PostHog](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_07_30_at_10_35_42_a606e7fc02.png)
    
    2. Enter the password you set for your database.
    3. Choose the schema you want to import. See the Supabase table editor for details on what each one has. `public` is the default, but we also use `auth` and `extensions` later in this tutorial.
5. Once you add the details, click **Next**.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/light_supa_90406c4e12.png" 
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/dark_supa_317ba9c1fc.png" 
  alt="Supabase data warehouse link setup in PostHog" 
  classes="rounded"
/>

6. Choose set up the sync methods, choose the tables you want to include, and click **Import** to start the sync.

Once it completes, you can then query the data in PostHog.

## Querying Supabase data in PostHog

You can query your Supabase data using SQL insights. This enables you to combine it with your PostHog usage data.

### Visualizing the count of objects over time

You can use trends to visualize your data. For example, to visualize a count of objects over time:

1. Create a [new insight](https://us.posthog.com/insights/new).
2. As a series, search for `postgres` and select your table. For us, that is `postgres_newsletters`.
3. Ensure your ID, distinct ID, and timestamp fields are correct and press **Select.**

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_07_31_at_14_41_05_2x_cdb4380df6.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_07_31_at_14_41_35_2x_0e47f5c8db.png"
  alt="Setting up a data warehouse query in PostHog"
  classes="rounded"
/>

This creates a trend of the count of the objects in your table over time. You can then modify it using filters, visualization options, and breakdowns. For example, to break down by `user_id`, click **Add breakdown**, select the **Data warehouse properties** tab, and then choose `user_id`. To visualize this nicely, you can change the line chart to a total value bar chart.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_07_31_at_14_48_04_2x_c6c8b9c6c5.png" 
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_07_31_at_14_47_48_2x_807de9f4c3.png" 
  alt="Visualizing Supabase data in PostHog" 
  classes="rounded"
/>

### Combined user overview

Linking your Supabase `user` table (under the `auth` schema) enables you to get an overview of user data across both sources. This does require you to add a table prefix like `supabase_` if you already have a Postgres source linked. 

To create this overview, create a new SQL insight that:

- Gets `email`, `last_sign_in_at`, `created_at` from Supabase's `user` table
- A count of events from PostHog's  `event` table
- Join the tables using  `email` and `distinct_id`

Altogether, this looks like this:

```sql
with sb_users as (
    select email, last_sign_in_at, created_at from supabase_postgres_users
),
big_events as (
    select count(*) as event_count, distinct_id
    from events
    group by distinct_id
)
select email, last_sign_in_at, created_at, event_count
from sb_users
left join big_events on big_events.distinct_id = sb_users.email
```

We could also PostHog person properties or a Supabase table to these by joining more tables to this query. 

> **Tip:** You can also set up a join between PostHog's `persons` table and your Supabase `users` table. Go to the data warehouse tab, click the three dots next to the `persons` source, and click **Add join**. This enables you to use Supabase `users` data wherever you can use persons.
> <ProductScreenshot imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_08_01_at_14_42_17_2x_21724552d8.png" imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_08_01_at_14_42_45_2x_1d6608820e.png" alt="Setting up a join between PostHog's persons table and Supabase users table" classes="rounded" />

### Usage by paid users

Similar to the last query, we can get a list of paid users from Supabase by filtering for users with a `paid` column (or equivalent) set to true. We can then use this list to analyze their PostHog usage.

```sql
with sb_users as (
    select email, last_sign_in_at, created_at
    from supabase_postgres_users
    where paid = true
),
big_events as (
    select count(*) as event_count, distinct_id
    from events
    group by distinct_id
)
select email, last_sign_in_at, created_at, event_count
from sb_users
left join big_events on big_events.distinct_id = sb_users.email
```

If your payment details were on another table, you could also join that table.

### Querying observability stats

Supabase also captures observability data we can query if you link the `pg_state_statements` table from the `extensions` schema. 

An example of a query you could get from this is p95 total execution time along with the median rows read:

```sql
SELECT 
    quantile(0.95)(total_exec_time) AS p95_exec_time,
    median(rows) AS median_rows_read
FROM sb_stats_postgres_pg_stat_statements
```

Another example is the most time-consuming queries:

```sql
SELECT 
    query,
    total_exec_time,
    calls,
    rows
FROM sb_stats_postgres_pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 10
```

One more for good luck, this gets queries with high variability:

```sql
SELECT 
    query,
    stddev_exec_time,
    mean_exec_time,
    calls
FROM sb_stats_postgres_pg_stat_statements
WHERE calls > 10  -- Filter out queries with few calls
ORDER BY stddev_exec_time / mean_exec_time DESC
LIMIT 20
```

## Further reading

- [How to set up Stripe reports](/tutorials/stripe-reports)
- [The basics of SQL for analytics](/product-engineers/sql-for-analytics)
- [How to set up Google Ads reports](/tutorials/google-ads-reports)

<NewsletterForm />