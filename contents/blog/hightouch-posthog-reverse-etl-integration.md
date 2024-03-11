---
date: 2022-02-24
title: You can now reverse ETL into PostHog with Hightouch
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-array-blog.png
featuredImageType: full
author:
  - andy-vandervell
category: PostHog news
tags:
  - Product updates
---

We're delighted to announce that [Hightouch](https://hightouch.io/) has released an integration with PostHog so you can sync modeled data from your data warehouse into PostHog.

## What is Hightouch?

Hightouch is an alternative to Customer Data Platforms (CDP) like Segment, though it can be used in conjunction with them. It allows data teams and engineers to sync data from centralized data warehouses (e.g. Google BigQuery, Redshift, Snowflake etc.) to products like PostHog. This is called reverse ETL – that's extract, transform and load.

## Why is reverse ETL useful?

Because it makes your data warehouse the single source of truth, ensuring all your tools are using the same up-to-date data. It effectively turns your data warehouse into a CDP, removing the need for a third-party platform that owns your data or introduces latency into your data pipeline.

It's worth pointing out that you can send customer data directly to PostHog from CDPs to like [Rudderstack](/docs/libraries/rudderstack) and [Segment](/docs/libraries/segment) with [existing PostHog integrations](/integrations). However, CDPs will send raw data, whereas a reverse ETL from your data warehouse gives data scientists the opportunity to model data before it's synced. 

Ultimately, the pros and cons of CDPs vs data warehouses is an article in itself, but the most useful thing to know is that, in most organizations, a data warehouse will be owned by a data science team, whereas a marketing team will own a CDP.

## What data can be synced?

Currently, Hightouch can sync 'Events' and data to the 'Persons' object in PostHog from any of the following data sources:

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

You can read more about Hightouch's PostHog integration [in its documentation](https://hightouch.io/docs/destinations/posthog/).

## Why is this useful?

Let's say your marketing team uses a CRM. It's syncing customer data into your data warehouse, such as names, email addresses, how they found your product, job title, pricing information and organization data. This is all contextual data you can use in PostHog.

Once this data is synced into 'Persons' in PostHog, you can create Cohorts of users with this additional data. You could, for example, create Cohorts based on:

- Users who are on a particular payment plan or product tier
- Users from the same company
- Users with similar job titles or roles

The possibilities are only limited by the data you're collecting, but the key point is you're ensuring the Persons data in PostHog is the same as in your CRM, data warehouse and other tools.

## How much does Hightouch cost?

Hightouch has three standard tiers:

- Individual (free for up to 1 destination)
- Starter ($350 per month for up 2 destinations)
- Pro ($800 per month for up to 3 destinations)

You can try any destination for free for 14 days and Hightouch also offers a 30-day trial on its paid tiers. Head to its [pricing page](https://hightouch.io/pricing/) for more detail and custom options.

## Can I build my own reverse ETL app for PostHog?

You absolutely can. 

PostHog is open source and we love it when people contribute to making the product better for everyone. The community has already contributed apps for, to name just a few, [Salesforce](https://github.com/Vinovest/posthog-salesforce), [Google Pub Sub](https://github.com/vendasta/pubsub-plugin), and [Rudderstack](https://github.com/rudderlabs/rudderstack-posthog-plugin).

We also recently ran a [PostHog App Bounty](https://github.com/PostHog/posthog/issues/8437) for a few specific apps we'd like have on PostHog. All current bounties have been assigned, but we're always open to suggestions.

Whether you have an idea for an app or just need some help, please [let us know](https://app.posthog.com/home#supportModal) if you'd like to get involved.

> PostHog is an open source analytics platform you can host yourself. We help you build better products faster, without user data ever leaving your infrastructure.

<ArrayCTA />
