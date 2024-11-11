---
title: How to set up Hubspot reports
date: 2024-06-25
author:
 - ian-vanagas
tags:
 - data warehouse
---

Creating and analyzing reports of Hubspot data along with product data helps you better understand your customers and close more deals. 

In this tutorial, we show how you can create Hubspot reports in PostHog by connecting it as a data source and then creating insights like the number of contacts, deals by stage, usage by leads, and more.

## Linking Hubspot data to PostHog

To start, you need both Hubspot and PostHog accounts. Once you have those, head to PostHog's [data pipeline sources tab](https://us.posthog.com/pipeline/sources) and:

1. Click **New source**
2. Choose the Hubspot option by clicking **Link**
3. Choose the Hubspot account you want to link
4. Add a table prefix like `prod_` (optional) and press **Next**
5. Select all the tables, choose your sync method, and press **Import**

Once done, PostHog will automatically pull and format your Hubspot data for querying. You can adjust the sync frequency, see the last successful run, and more in [data pipeline sources tab](https://us.posthog.com/pipeline/sources).

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/hubspot_import_light_a33a8297cf.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/hubspot_import_dark_e617845de2.png"
  alt="Linking Hubspot Account"
  classes="rounded"
/>

> **Note:** If you are missing a table, make sure you have data for that table in Hubspot and check your data warehouse settings to make sure it synced correctly.

## Creating insights for your Hubspot report

Now that your Hubspot data is synced into PostHog, you can use it to create insights for your report. Each requires you to create a [new insight in the product analytics tab](https://us.posthog.com/project/insights/new).

> **Want to get started fast?** Check out our [Hubspot starter report template](/templates/hubspot-report-dashboard).

### Deal count

To start, we create a trend of deal count over time.

On the trends tab, click the data series, go to the **Data Warehouse** tab, hover over the `hubspot_deals` table, change the timestamp to `createdate`, and click **Select**. 

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/deal_light_8673e48cc3.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/deal_dark_3ba3974e6a.png"
  alt="Deal Count Trend"
  classes="rounded"
/>

You can breakdown the trend this creates by any of the deal's properties like `dealstage` or `amount`. To do this, click **Add breakdown**, go to the data warehouse properties tab, and choose your property. 

You can also visualize other tables like `hubspot_companies` and `hubspot_contacts`. 

### Usage by lead

The best part of adding your Hubspot data to PostHog is querying it next to usage data. 

An example of this is figuring out the leads with the most usage. To do this, we create an [SQL insight](/docs/product-analytics/sql) where we get leads from `hubspot_contacts`, join their email with PostHog's `distinct_id`, and get a count of events.

```sql
with
    leads as (
        select email
        from hubspot_contacts
        where lifecyclestage = 'lead'
    ),
    big_events as (
        select count(*) as event_count, distinct_id
        from events
        group by distinct_id
    )
select email, event_count
from leads
left join big_events on big_events.distinct_id = leads.email
order by event_count desc
```

This gets us a list of Hubspot emails ordered by their PostHog event count.
<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/lead_light_b3fa92d5bc.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/lead_dark_0ffe0eaffa.png"
  alt="Lead Usage Insights"
  classes="rounded"
/>

### Leads who visit specific pages

We can do something similar to get a list of leads who visit important pages like your pricing or signup page. This requires us to filter for `$pageview` events where the `$current_url` contains `/pricing`.

```sql
with
    leads as (
        select email
        from hubspot_contacts
        where lifecyclestage = 'lead'
    ),
    pricing_pageviews as (
        select count(*) as pageviews, distinct_id
        from events
        where 
	        event = '$pageview' 
	        and properties.$current_url like '%pricing'
        group by distinct_id
    )
select email, pageviews
from leads
left join pricing_pageviews on pricing_pageviews.distinct_id = leads.email
order by pageviews desc
```

You can modify this query to track other important types of events such as billing page visits or recent user signups.

### Getting revenue from closed deals by joining with Stripe

Beyond PostHog data, you can also join and query data from other sources like [Stripe](/tutorials/stripe-reports) if you have them set up.

An example of this is getting the revenue from closed deals. We can get the email and `recent_deal_amount` from the `hubspot_contacts` table and the `amount_paid` and billing email from `stripe_charge` to compare the revenue and predicted deal amount.

```sql
with
    closed_deals as (
        select email, recent_deal_amount
        from hubspot_contacts
        where lifecyclestage = 'customer'
    ),
    revenue as (
        select 
            sum(amount) / 100 as amount_paid, 
            JSONExtractString(billing_details, 'email') as stripe_email
        from stripe_charge
        where status = 'succeeded'
        group by stripe_email
    )
select email, recent_deal_amount, amount_paid
from closed_deals
left join revenue on revenue.stripe_email = closed_deals.email
```

You can modify this to fit the financial and sales metrics you want to track.

## Further reading

- [The basics of SQL for analytics](/product-engineers/sql-for-analytics)
- [Using HogQL for advanced breakdowns](/tutorials/hogql-breakdowns)
- [How to set up Stripe reports](/tutorials/stripe-reports)

<NewsletterForm />