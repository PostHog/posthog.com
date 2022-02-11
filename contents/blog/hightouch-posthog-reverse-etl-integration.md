---
date: 2022-02-14
title: You can now Reverse ETL into PostHog with Hightouch
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/posthog-array-blog.png
featuredImageType: full
author: ["andy-vandervell"]
categories: ["Product updates"]
---

We're delighted to announce that [Hightouch](https://hightouch.io/) has released an integration with PostHog so you can sync modeled data from your data warehouse into PostHog.

## What is Hightouch?

Hightouch is an alternative to Customer Data Platforms (CDP) like Segment, though it can be used in conjunction with them. It allows data teams and engineers to sync data from centralized data warehouses (e.g. Google BigQuery, Redshift, Snowflake etc.) to products like PostHog. This is called Reverse ETL – that's extract, transform and load.

## Why is Reverse ETL useful?

Because it makes your data warehouse the single source of truth, ensuring all your tools are using the same up-to-date data. It effectively turns your data warehouse into a CDP, removing the need for a third-party platform that owns your data or introduces latency into your data pipeline.

It's worth pointing out that you can send customer data directly to PostHog from CDPs to like [Rudderstack](/docs/integrate/third-party/rudderstack) and [Segment](/docs/integrate/third-party/segment) with [existing PostHog integrations](/integrations). However, CDPs will send raw data, whereas a Reverse ETL from your data warehouse gives data scientists the opportunity to model data before it's synced. 

Ultimately, the pros and cons of CDPs vs data warehouses is an article in itself, but the most useful thing to know is that, in most organizations, a data warehouse will be owned by a data science team, whereas a marketing team will own a CDP.

## What data can be synced?

Currently, Hightouch can sync data to the 'Persons' object in PostHog from any of the following data sources:

- Airtable
- Athena
- BigQuery
- Databricks
- Looker
- MySQL
- PostgreSQL
- Presto
- Google Sheets
- Rockset
- Redshift
- Snowflake
- SQL Server

## Why is this useful?

Let's say your marketing team uses a CRM. It's syncing customer data into your data warehouse, such as names, email addresses, how they found your product, job title, pricing information and organization data. This is all contextual data you can use in PosHog.

Once this data is synced into 'Persons' in PostHog, you can [create Cohorts](/tutorials/cohorts) of users with this additional data. You could, for example, create Cohorts based on:

- Users who are on a particular payment plan or product tier
- Users from the same company
- Users with similar job titles or roles

The possibilities are only limited by the data you're collecting, but the key point is you're ensuring the Persons data in PostHog is the same as in your CRM, data warehouse and other tools.

## How much does Hightouch cost?

Hightouch has three standard tiers:

- Individual (free for up to 1 destination)
- Starter ($350 per month for up 2 destinations)
- Pro ($800 per month for up to 3 destinations)

Hightouch also offers a 30-day trial on its paid tiers. Head to its [pricing page](https://hightouch.io/pricing/) for more detail and custom options.

## Can I build my own Reverse ETL plugin for PostHog?

You absolutely can. 

PostHog is open source and we love it when people contribute to making the product better for everyone. The community has already contributed plugins for, to name just a few, [Salesforce](https://github.com/Vinovest/posthog-salesforce), [Google Pub Sub](https://github.com/vendasta/pubsub-plugin), and [Rudderstack](https://github.com/rudderlabs/rudderstack-posthog-plugin).

We're also currently running a [PostHog Plugin Bounty](https://github.com/PostHog/posthog/issues/8437) for a few specific plugins we'd like have on PostHog.

Whether you have an idea for a plugin or just need some help, please [join our community Slack channel](/slack) to get involved.