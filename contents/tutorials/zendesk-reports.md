---
title: How to set up Zendesk reports
date: 2024-07-01
author:
 - ian-vanagas
tags:
 - data warehouse
---

Combining Zendesk data and product data helps you understand support performance, identify problem areas, and provide a better customer experience.

In this tutorial, we show how you can create Zendesk reports in PostHog by connecting it as a data source. 

## Linking Zendesk data to PostHog

To start, you need both Zendesk and PostHog accounts. Once you have those, head to PostHog's [data pipeline sources tab](https://us.posthog.com/pipeline/sources) and:

1. Click **New source**
2. Choose the Zendesk option by clicking **Link**
3. Enter your Zendesk subdomain (like `posthoghelp` for `https://posthoghelp.zendesk.com/`), [API key](https://support.zendesk.com/hc/en-us/articles/4408889192858-Managing-access-to-the-Zendesk-API#topic_bsw_lfg_mmb),  email, table prefix (optional), and then press **Next**
4. Select the tables you want to import as well as your sync methods, and press **Import**

Once done, PostHog will automatically pull and format your Zendesk data for querying. You can adjust the sync frequency, see the last successful run, and more in [data pipeline sources tab](https://us.posthog.com/pipeline/sources).

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/zd_link_d66a49cdc7.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/zd_dark_5ef31c727e.png"
  alt="Linking Zendesk Account"
  classes="rounded"
/>

> **Note:** If you are missing a table, make sure you have data for that table in Zendesk and check your data warehouse settings to make sure it synced correctly.

## Creating insights for your Zendesk report

Now that your Zendesk data is synced into PostHog, you can use it to create insights for your report. Each requires you to create a [new insight in the product analytics tab](https://us.posthog.com/project/insights/new).

> **Want to get started fast?** Check out our [Zendesk starter report template](/templates/zendesk-report-dashboard).

### Ticket count

To start, we create a trend of ticket count over time.

On the trends tab, click the data series, go to the **Data Warehouse** tab, hover over the `zendesk_tickets`, and press **Select**. This creates a trend of ticket count created over time. 

You can then filter or break these tickets down by their properties such as `status` or `subject`. For example, we could add a filter for where `subject` includes `flags` like this:

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/zdt_light_86ddf37f7d.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/zdt_dark_bf428799b1.png"
  alt="Zendesk Ticket Count"
  classes="rounded"
/>

### Tickets for a specific user

PostHog also provides the ability to query your Zendesk data with SQL. This is useful for doing more complicated queries with all the data Zendesk provides. 

An example of this is querying for tickets for a specific user email. The `zendesk_tickets` table doesn't include `email` so we use `requester_id` and a join with `zendesk_users` to connect it to an email.

```sql
with 
    user_id as (
        select id, email
        from zendesk_users
        where email = 'ian@posthog.com'
    ),
    tickets as (
        select *
        from zendesk_tickets
    )
select requester_id, user_id.email 
from tickets
left join user_id on tickets.requester_id = user_id.id
where tickets.requester_id = user_id.id
```

### Power user Zendesk profiles

The most powerful part about linking your Zendesk data in PostHog is the ability to combine it with product data. 

An example of this is getting the Zendesk profile links of your most active users. To do this, we query `zendesk_users` for URLs, `events` for `event` counts, and then join the two.

```sql
with 
    user_id as (
        select email, url
        from zendesk_users
    ),
    big_events as (
        select count(*) as event_count, distinct_id
        from events
        group by distinct_id
    )
select distinct_id, url, event_count
from big_events
left join user_id on big_events.distinct_id = user_id.email
order by event_count desc
```

You notice that not every `distinct_id` has a `url`. This means they haven't created any tickets, which we can keep as a feature of our query or remove with a `where` clause.

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/power_light_27967cd39f.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/power_dark_a2801d9ce0.png"
  alt="Power User Zendesk Profiles"
  classes="rounded"
/>

We can also add another join to the `zendesk_tickets` to get the ticket count for that user as well.

```sql
with 
    user_id as (
        select email, url, id
        from zendesk_users
    ),
    big_events as (
        select count(*) as event_count, distinct_id
        from events
        group by distinct_id
    ),
    ticket_count as (
        select count() as ticket_count, requester_id
        from zendesk_tickets
        group by requester_id
    )
select 
    big_events.distinct_id, 
    user_id.url, 
    big_events.event_count,
    COALESCE(ticket_count.ticket_count, 0) as ticket_count
from big_events
left join user_id on big_events.distinct_id = user_id.email
left join ticket_count on user_id.id = ticket_count.requester_id
where user_id.url != ''
order by big_events.event_count desc
```

### Zendesk profiles of users needing help

We can also use PostHog data to identify users potentially needing help, such as those repeatedly visiting `help` or `billing` page. 

To do this we write a similar query to get `distinct_id` values having a billing `$pageview` count higher than 1 (which you can modify).  

```sql
with billing_pageviews as (
    select distinct_id, count(*) as billing_view_count
    from events
    where event = '$pageview'
    and properties['$current_url'] like '%billing'
    group by distinct_id
    having count(*) > 1
)
select 
    bp.distinct_id,
    bp.billing_view_count,
    u.url
from billing_pageviews bp
left join zendesk_users u on bp.distinct_id = u.email
where u.url != ''
order by bp.billing_view_count desc
```

### Average first reply time

We can query `zendesk_ticket_metric_events` table for the `reply_time` metric then compare for the `measure` and `fulfill` times to get the average first reply time. 

```sql
WITH first_reply_times AS (
  SELECT 
    ticket_id,
    toStartOfMonth(MIN(time)) AS month,
    MIN(multiIf(type = 'measure', time, NULL)) AS measure_time,
    MIN(multiIf(type = 'fulfill', time, NULL)) AS fulfill_time
  FROM zendesk_ticket_metric_events
  WHERE metric = 'reply_time'
  GROUP BY ticket_id
  HAVING fulfill_time IS NOT NULL
)
SELECT 
  month,
  AVG(dateDiff('hour', measure_time, fulfill_time)) AS avg_first_reply_time_hours,
  COUNT(*) AS ticket_count
FROM first_reply_times
WHERE measure_time IS NOT NULL AND fulfill_time IS NOT NULL
GROUP BY month
ORDER BY month
```

The `zendesk_ticket_metric_events` also contains data you can use to calculate metrics like average reply time, average resolution time, and more.

## Furthering reading

- [The basics of SQL for analytics](/product-engineers/sql-for-analytics)
- [Using HogQL for advanced breakdowns](/tutorials/hogql-breakdowns)
- [How to set up Hubspot reports](/tutorials/hubspot-reports)

<NewsletterForm />