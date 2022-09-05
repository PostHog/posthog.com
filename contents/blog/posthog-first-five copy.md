---
date: 2022-09-10
title: Five essential apps for PostHog
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: ["joe-martin"]
featuredImage: ../images/blog/posthog-array-blog.png
featuredImageType: full
categories: ["Guides"]
---

PostHog apps are a powerful, but ill-defined part of the platform. They’re powerful because they can do almost anything — and they’re ill-defined because they do almost anything.

Want to import or export data into or out of PostHog? [There are apps for that](/apps). 
Want to enhance data by adding or removing info? [There are apps for that too](/apps).  
Want to insert the word `hedgehog` into your personIDs randomly? There…well, there isn’t an app for that yet. [But you could build one](/docs/apps/build)!

Not sure where to get started with apps? One easy tip is to look for connectors which enable you to sync PostHog with other tools in your stack — but otherwise here are some essential apps we recommend new PostHog users consider. 

##ß 1. [GeoIP enricher](/apps/geoip-enrichment)

The GeoIP enrichment app is so useful we actually enable it by default for all new PostHog instances, meaning you won’t even need to set it up if you like the sound of it. 

The GeoIP enricher does exactly what it says; adding geographic information to your PostHog data based on the user IP. This enables you to create insights which, for example, tell you where your new users are located or to correlate location with other events, such as bug reports.

> Don’t want to capture so much geographic information about your users? [You can filter out unneeded information using the property filter app too](/tutorials/property-filter).

## 2. [Ingestion alert](/apps/ingestion-alert)

So, you’ve installed the PostHog snippet and started ingesting events. That’s great, but what happens if an error or rogue engineer disrupts the event pipeline and you’re no longer able to get data into PostHog? That’s where the ingestion alert app comes in.

The ingestion alert app works by triggering a customizable webhook whenever there are no events ingested for a specified period of time, alerting you when there’s a problem so you can get things running again quickly. 

> Normally have quiet periods and worried about false alarms? The ingestion alert app works brilliantly with [the heartbeat app](/apps/heartbeat) which ensures a steady drip of events to test ingestion!

## 3. [Zapier connector](/apps/zapier-connector)

One of the advantages of PostHog’s open source approach is that, if you can’t find an app that does what you want, you can always build your own. One of the downsides though is that not everybody wants to jump in and start coding — and that’s why we built the Zapier connector.

Zapier enables you to easily and codelessly connect PostHog to over 4,000 other tools, including popular tools such as Google Sheets, Hubspot or Slack.

> Looking for inspiration on what to do with Zapier? Check out these tutorials on how to use Zapier to [connect PostHog with Discord](/tutorials/how-to-connect-discord-to-posthog-with-zapier) or [Notion](/tutorials/how-to-connect-posthog-and-notion-with-zapier)!

## 4. [URL Normalizer](/apps/url-normalizer)

OK, so this app isn’t truly essential for all teams — but if you’re fussy about trailing slashes (or if other tools in your stack are case sensitive), the URL normalizer is a lifesaver. It enables you to customize how URLs are formatted, converting them all to lower case and stripping all trailing slashes by default. 

Another reason to love the URL normalizer is that it wasn’t built by the PostHog team, but by a member of the community who was inspired by our open-source approach. Big thanks to Mark Bennet for his hard work on this!

> Interested in seeing how this app was made? Check [the source code](https://github.com/PostHog/posthog-url-normalizer-plugin) to get ideas about building your own apps!

## 5. [BigQuery Export](/apps/bigquery-export)

Exporting information from PostHog into your data warehouse (or data lake) is a common use-case for apps, which is why we have a small library of data-out apps for such platforms. Of these, BigQuery is the most popular. 

The BigQuery Export sends batches of events from PostHog every 30 seconds, automatically retrying any failed exports to ensure that your data warehouse is as up-to-date as possible.

> Don’t store data on BigQuery? We also have export apps for platforms such as [Amazon S3](/apps/s3-export), [Databricks](/apps/databricks), [Google Cloud Storage](/apps/google-cloud-export), [Redshift](/apps/redshift-export), [Snowflake](​​/apps/snowflake-export) and more!
