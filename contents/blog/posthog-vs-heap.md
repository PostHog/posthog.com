---
date: 2023-03-10
title: "In-depth: PostHog vs Heap"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/posthog-vs-heap/posthog-vs-heap.jpeg
featuredImageType: full
author: ["andy-vandervell"]
category: General
tags:
  - Comparisons
  - Product analytics
  - Session recording
---

Want to know how PostHog and Heap are different? If you remember nothing else, remember these two points:

1. Heap is a product analytics tool designed for non-technical users.

2. PostHog is an all-in-one platform for product analytics, session recording, feature management, and more, built for engineers and product teams.

In this guide, we'll cover:

- Heap and PostHog's [core features](#core-features)
- [Product analytics](#product-analytics) features and insight types
- [Session recording](#session-recording) capability 
- [Third-party integrations](#integrations), including data export and data import options
- [Privacy](#privacy-compliance) and [security](#admin--security)
- [Frequently asked questions](#frequently-asked-questions)

## How is PostHog different to Heap?

### 1. PostHog is an all-in-one platform

Heap, like Amplitude and Mixpanel, focuses mainly on product analytics. That means you need to adopt additional tools for things like session recording, feature management, and A/B testing. PostHog integrates all these features into one platform. PostHog is like mission control for your product.

### 2. PostHog's built for engineers

Anyone can use PostHog – just [ask our marketing team](/blog/posthog-marketing) – but our goal is to [help engineers be better at product](/blog/helping-engineers-to-product) by giving them the insights and tools they need to ship impactful features at pace. 

### 3. Self-serve vs talk to sales

Signing up to PostHog is as simple as creating an account and [adding our JavaScript snippet](/docs/integrate) to your site or app. That's it. Want more features? Just put in a card and pay for what you use. We have a [generous free tier](/pricing), so you may not pay anything at all. No sales calls. No paid add-ons. No confusing product tiers. Just sign up and start building.

<ArrayCTA />

## Feature comparison

PostHog has three plans (Free, Scale and Enterprise) to Heap's four (Free, Growth, Pro and Premier). In this guide, we'll compare PostHog's Scale plan to Heap Pro as they're the most comparable plans for a typical, mid-market business.

### Core features

PostHog integrates several normally separate tools, such as product analytics, session recording, and feature flags, into one platform. While it recently added a basic session recording feature, Heap is best known as a pure product analytics tool like Mixpanel or Amplitude.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
			<td className="w-3/12"></td>
            <td><strong>Heap</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Product analytics</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track events and conversion; analyze user behavior</td>
        </tr>
        <tr>
            <td><strong>Session recording</strong></td>
            <td className="text-center">Paid add-on</td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Watch real users use your product; diagnose bugs</td>
        </tr>
        <tr>
            <td><strong>Feature flags</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Roll out features safely; toggle features for cohorts or individuals</td>
        </tr>
        <tr>
            <td><strong>Experiments</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Run A/B/n tests on new features; optimize conversion funnels</td>
        </tr>
        <tr>
            <td><strong>Heatmaps</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Visualize where users click in your app or website</td>
        </tr>
        <tr>
            <td><strong>User surveys</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Ask users for qualitative feedback and gather responses</td>
        </tr>
        <tr>
            <td><strong>Autocapture</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Automatically track events without instrumentation</td>
        </tr>
        <tr>
            <td><strong>Sync with data warehouse</strong></td>
            <td className="text-center">Paid add-on</td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Sync data to and from your data warehouse</td>
        </tr>            
    </tbody>
</table>
</div>

- **Session replays:** Heap offers basic session replays in addition to its core product analytics product, but it's a bolt-on option on all plans. Session replays are built-in to PostHog and you get 15,000 free recordings every month. **Jump to:** [Session recording comparison](#session-recording)

- **Sync to data warehouse:** The ability to sync with your data warehouse is part of Heap Connect, a paid add-on on to Heap's Pro plan – it's included on Heap's Premier plan. Data warehouse sync is available in PostHog at no additional cost because we believe companies should own their data.

- **Experiments:** Heap doesn't have a built-in testing feature, though it does integrate with a number of popular A/B testing tools, such as AB Tasty and Optimizely. PostHog has a [built-in experimentation suite](/product/experimentation-suite) for running A/B and multivariate experiments.

- **Feature flagging:** The [benefits of feature flags](/blog/feature-flag-benefits-use-cases) include the ability to stagger new feature releases, ship to test groups or specific cohorts, manage feature access, and more. PostHog's feature flag product is built-in and tightly integrated with all other products.

- **Open source:** PostHog is open source and self-hostable via Docker Compose for small event volumes of ~100k events per month. See our [open source deployment docs](/docs/self-host/open-source/deployment) for more.

### Product analytics

Heap and PostHog offer similar product analytics features with a slight difference in emphasis – Heap has more insight options for marketing teams, while PostHog has more for product teams.

Neither currently offers an SQL editor for writing custom queries, but it's in private beta for PostHog with a planned Q1 2023 launch.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
			<td className="w-3/12"></td>
            <td><strong>Heap</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Dashboards</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Combine insights into shareable dashboards</td>
        </tr>
        <tr>
            <td><strong>Funnels</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Understand conversion between events, pages</td>
        </tr>
        <tr>
            <td><strong>Retention</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Analyze user and revenue retention</td>
        </tr>
        <tr>
            <td><strong>User paths</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track user flows and where they drop-off</td>
        </tr>
        <tr>
            <td><strong>Stickiness</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Understand your most engaging features</td>
        </tr>
        <tr>
            <td><strong>Lifecycle</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Break users down by new, resurrecting, returning, and dormant</td>
        </tr>
        <tr>
            <td><strong>Influence analysis</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Multi-touch analysis of marketing channels</td>
        </tr>
        <tr>
            <td><strong>Cohorts</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Combine users based on properties and events for group analysis</td>
        </tr>
        <tr>
            <td><strong>Group analytics</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Understand how organizations of multiple users use your product</td>
        </tr>
        <tr>
            <td><strong>Formulas</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Use custom formulas to calculate unique insights</td>
        </tr>
        <tr>
            <td><strong>Query editor</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center">Coming Q1 2023</td>
            <td>Write your own queries in SQL</td>
        </tr>
        <tr>
            <td><strong>Data retention</strong></td>
            <td className="text-center">1 year (pay for more)</td>
            <td className="text-center">7 years</td>
            <td>How long historical data is retained</td>
        </tr>             
    </tbody>
</table>
</div>

### Session replays

Session replays are an essential tool for understanding how people use your product, especially for [early-stage companies](/blog/early-stage-analytics) searching for product-market fit. Both Heap and PostHog offer session recording, though Heap's version is quite limited at present.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
			<td className="w-3/12"></td>
            <td><strong>Heap</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Free recording allowance</strong></td>
            <td className="text-center">None (free trial)</td>
            <td className="text-center">15,000 per month</td>
            <td>Free recordings before being charged</td>
        </tr>
        <tr>
            <td><strong>Browser app recording</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Watch real users use your product; diagnose bugs</td>
        </tr>
        <tr>
            <td><strong>iOS app recording</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center">Planned Q2 2023</td>
            <td>Record user sessions in iOS apps</td>
        </tr>
        <tr>
            <td><strong>Android app recording</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center">Planned 2023</td>
            <td>Record user sessions in Android apps</td>
        </tr>
        <tr>
            <td><strong>Playlists</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Create playlists of related recordings</td>
        </tr>
        <tr>
            <td><strong>Download recordings</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Save recording files offline for storage</td>
        </tr>
        <tr>
            <td><strong>Play from file</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Replay recording from saved file</td>
        </tr>
        <tr>
            <td><strong>Console logs</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Debug user problems and app errors</td>
        </tr>
        <tr>
            <td><strong>Network activity</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Monitor network activity and performance</td>
        </tr>           
    </tbody>
</table>
</div>

- **Recording retention:** Heap keeps all recordings for 90 days, but retains any **viewed recordings** for 10 years. PostHog retains all recordings for three weeks, but retains recordings saved to a playlist forever. PostHog also allows you to download recordings as a `.json` file for safe keeping.

<ArrayCTA />

## Integrations

This section includes a curated summary of the most popular integrations in PostHog and Heap, organized by category.

See the [PostHog Apps](/apps) and [Heap integrations](https://help.heap.io/category/integrations/) pages for complete lists of available integrations.

**Categories:**

- [Data out](#data-out) 
- [Data in](#data-in)
- [Dev tools & support](#dev-tools--support) 
- [Marketing & sales](#marketing--sales)

### Data out

At PostHog, we believe in your right to own your data, which means enabling you to export raw events whenever you want at no additional cost.

In Heap, data warehouse integrations are only available on Heap Premier, or as a paid add-on to Heap Pro, and there is no open export API.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>Heap</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Export API</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Export data via API</td>
        </tr>
        <tr>
            <td><strong>Amazon Redshift</strong></td>
            <td className="text-center">Paid add-on</td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Export data to Redshift</td>
        </tr>
        <tr>
            <td><strong>Amazon S3</strong></td>
            <td className="text-center">Paid add-on</td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Export data to S3 bucket</td>
        </tr>
        <tr>
            <td><strong>Google Cloud Storage</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Export data to GCS</td>
        </tr>
        <tr>
            <td><strong>Snowflake</strong></td>
            <td className="text-center">Paid add-on</td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Export data to Snowflake database</td>
        </tr>
        <tr>
            <td><strong>Google BigQuery</strong></td>
            <td className="text-center">Paid add-on</td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Export data to BigQuery for analysis</td>
        </tr>
        <tr>
            <td><strong>PostgreSQL</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Export data to a PostgreSQL instance</td>
        </tr>
        <tr>
            <td><strong>RudderStack</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Sync event and person data</td>
        </tr>
        <tr>
            <td><strong>Hightouch</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Reverse ETL data to multiple platforms</td>
        </tr>
        <tr>
            <td><strong>Census</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Reverse ETL data to multiple platforms</td>
        </tr>
        <tr>
            <td><strong>Zapier</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Connect to services using Zapier</td>
        </tr>
        <tr>
            <td><strong>n8n</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Open source Zapier alternaitve</td>
        </tr>
    </tbody>
</table>
</div>

- **Exporting events in PostHog:** PostHog provides numerous methods for exporting event data, including via the PostHog UI (for small volumes), the Events API (with rate limits), or via dedicated export apps (no limits). See our [data export documentation](/docs/migrate/export-events) for more information.

### Data in

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
			<td className="w-3/12"></td>
            <td><strong>Heap</strong></td>
            <td><strong>PostHog</strong></td>
			<td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Import API</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>API for importing and enriching data</td>
        </tr>
        <tr>
            <td><strong>Segment</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Ingest events and user properties tracked in Segment</td>
        </tr>
        <tr>
            <td><strong>RudderStack</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Ingest events and user properties tracked in RudderStack</td>
        </tr>
        <tr>
            <td><strong>Tealium</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Ingest events and user properties tracked in Tealium</td>
        </tr>
        <tr>
            <td><strong>Airbyte</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>ETL data pipelines</td>
        </tr>
        <tr>
            <td><strong>Fivetran</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>ETL data pipelines</td>
        </tr>
        <tr>
            <td><strong>Stripe</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Sync customer and invoice data</td>
        </tr>
        <tr>
            <td><strong>Zapier</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Connect to services using Zapier</td>
        </tr>
        <tr>
            <td><strong>n8n</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Open source Zapier alternaitve</td>
        </tr>
    </tbody>
</table>
</div>

- **PostHog as a Customer Data Platform:** PostHog integrates with numerous popular customer data platforms (CDP), but some customers choose to use PostHog as their CDP. This helps reduce costs, the risk of data being dropped, and ensures total compatibility with all our features. See [Using PostHog with a CDP](/docs/integrate/cdp) for more information.

### Dev tools & support

As an open source platform designed for technical teams, PostHog integrates with numerous developer tools and platforms. This isn't an area of strong support for Heap.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
			<td className="w-3/12"></td>
            <td><strong>Heap</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>BitBucket Release Tracker</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track impact of releases in analytics</td>
        </tr>
        <tr>
            <td><strong>GitHub Release Tracker</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track impact of releases in analytics</td>
        </tr>
        <tr>
            <td><strong>GitHub Star Sync</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track GitHub star growth</td>
        </tr>
        <tr>
            <td><strong>GitLab Release Tracker</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track impact of releases in analytics</td>
        </tr>
        <tr>
            <td><strong>Sentry</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Connect errors to individual users</td>
        </tr>
        <tr>
            <td><strong>Retool</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Build internal tools using your usage data</td>
        </tr>
        <tr>
            <td><strong>User Inteview Scheduler</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Invite users for an interview based on user properties</td>
        </tr>
        <tr>
            <td><strong>Zendesk</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track tickets as events, add context to tickets</td>
        </tr>
        <tr>
            <td><strong>Custom webhooks</strong></td>
            <td className="text-center">In beta</td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Create your own custom webhooks for Slack, etc.</td>
        </tr>
    </tbody>
</table>
</div>

### Marketing & sales

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>Heap</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Customer.io</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Sync data and trigger workflows in Customer.io</td>
        </tr>
        <tr>
            <td><strong>Engage</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Automate onboarding and retention messaging</td>
        </tr>
        <tr>
            <td><strong>Variance</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Define PQLs with real analytics data</td>
        </tr>
        <tr>
            <td><strong>Engage</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Automate onboarding and retention messaging</td>
        </tr>
        <tr>
            <td><strong>Pace</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Identify enterprise sales leads</td>
        </tr>
        <tr>
            <td><strong>Twilio</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Automated customer engagement platform</td>
        </tr>
        <tr>
            <td><strong>Hubspot</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Sync customer data to and from Hubspot</td>
        </tr>
        <tr>
            <td><strong>Salesforce</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Sync customer data to and from Salesforce</td>
        </tr>
        <tr>
            <td><strong>Sendgrid</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Automate email workflows</td>
        </tr>
        <tr>
            <td><strong>Mailchimp</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Automate marketing emails</td>
        </tr>
        <tr>
            <td><strong>Intercom</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Automate your product comms</td>
        </tr>
        <tr>
            <td><strong>Braze</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Marketing automation</td>
        </tr>
        <tr>
            <td><strong>Eloqua</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Marketing automation</td>
        </tr>
        <tr>
            <td><strong>Marketo</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Marketing automation</td>
        </tr>
    </tbody>
</table>
</div>

- **Advertising integration:** Neither Heap nor PostHog offer native integrations for advertising platforms (e.g. Google Ads, Facebook Ads, etc.). If you require this, we recommend integrating a CDP like Segment into your data stack.

## Privacy, admin & security

### Privacy compliance

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>Heap</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>GDPR compliant</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>EU hosting or data residency available</td>
        </tr>
        <tr>
            <td><strong>HIPAA compliant</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center">Self-host only</td>
            <td>Business Associate Agreement available</td>
        </tr>
        <tr>
            <td><strong>Data anonymization</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Remove personally identifiable information</td>
        </tr>
        <tr>
            <td><strong>Self-hosting option</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Self-host and keep complete control of your data</td>
        </tr>
        <tr>
            <td><strong>Cookie-less tracking option</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Use analytics without cookie consent banners</td>
        </tr>
    </tbody>
</table>
</div>

- **HIPAA compliance:** Heap will sign a Business Associate Agreement if you require HIPAA compliance. At PostHog, we currently recommend self-hosting PostHog if you require [HIPAA compliance](/docs/privacy/hipaa-compliance). This ensures all sensitive data never leaves your infrastructure, giving you complete control and simplifying compliance processes. HIPAA certification for PostHog Cloud is planned in 2023.

- **Cookie-less tracking:** If you'd rather not serve annoying cookie banners to your users, PostHog can be configured to store data in memory so it doesn't persist beyond a single session. See: [How to use PostHog without cookie banners](/tutorials/cookieless-tracking). Some forms of user analysis aren't possible with this method.

### Admin & security

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>Mixpanel</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>SOC 2 certification</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Externally audited security</td>
        </tr>
        <tr>
            <td><strong>SAML/SSO</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Organization single sign-on</td>
        </tr>
        <tr>
            <td><strong>User permissions</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Assign access levels to team members</td>
        </tr>
        <tr>
            <td><strong>Multiple organizations</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Create orgs for all your internal teams</td>
        </tr>
        <tr>
            <td><strong>Multiple projects</strong></td>
            <td className="text-center">2 (pay for more)</td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track multiple products</td>
        </tr>
    </tbody>
</table>
</div>


## Frequently asked questions

### How long does it take to deploy PostHog?

Deploying PostHog takes mere minutes. Just [include our tracking snippet](/docs/integrate?tab=snippet) in your product or website and (thanks to autocapture) you're immediately capturing events. Once up and running, you can enable session recording via your project settings. See our guide to [getting started on PostHog Cloud](/docs/getting-started/cloud) for more info.

### How scalable is PostHog?

PostHog is built on ClickHouse, the world’s fastest column-based database. It’s used by the likes of Uber, Spotify and Cloudflare, and allows us to handle billion-scale event volumes with ease.

Are you a company with more than 1 billion events per month? [Get in touch](/contact-sales?edition=enterprise) so we can discuss your needs and offer a volume discount.

### How much do Heap and PostHog cost?

Unlike PostHog, Heap doesn't share its pricing publicly, but its free tier is less generous.

Heap's free tier allows for only 10,000 sessions per month, "limited analysis", six months of data history, and limited access to data sources and integrations.

In comparison, PostHog offers 1 million events per month and 15,000 session recordings for free on all plans with no limits on data integrations – a typical medium-size B2B product with 10,000 monthly active users will generate ~500k events each month.

PostHog users who input their card unlock more features and can use billing limits to avoid surprise bills.

See [PostHog's pricing page](/pricing) for a full breakdown and access to our pricing calculator.

### Does PostHog use cookies?

Yes, PostHog (like Heap) uses cookies. Cookies are necessary to enable common use cases, such as cross-domain tracking and tracking returning visitors.

It is possible, however, to configure PostHog to track users without requiring without cookie banners by storing cookies in memory so it doesn't persist beyond an individual session.

The PostHog Property Filter app also allows you to further limit the types of information collected to protect user privacy.

If you user privacy is a primary concern for you, consider our [open source Docker Compose deployment](/docs/self-host/open-source/deployment) option.

### Can you use PostHog on e-commerce websites?

Absolutely. PostHog is [easy to integrate with Shopify](/docs/libraries/shopify). You can easily install PostHog on other e-commerce platforms [using our Javascript snippet](/docs/integrate) – see our guides to [setting up Webflow analytics](/tutorials/webflow) and [Wordpress](/docs/libraries/wordpress). 

### Can PostHog replace Google Analytics?

Yes, depending on your use case, PostHog could replace Google Analytics. [Our marketing team uses PostHog](/blog/posthog-marketing) effectively, but it isn't primarily designed for marketing use cases. See our [GA4 alternatives guide](/blog/ga4-alternatives) guide for more.

### How does PostHog compare to Amplitude and Mixpanel?

Amplitude and Mixpanel offer similar features to Heap. Read our [PostHog vs Mixpanel](/blog/posthog-vs-mixpanel) and [PostHog vs Amplitude](/blog/posthog-vs-amplitude) guides for more info. 

<ArrayCTA />