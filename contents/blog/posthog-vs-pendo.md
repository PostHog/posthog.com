---
date: 2023-04-25
title: "In-depth: PostHog vs Pendo"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/posthog-vs-pendo/posthog-vs-pendo.jpg
featuredImageType: full
author:
    - joe-martin
category: General
tags:
    - Comparisons
---

Want to understand the difference between Pendo and PostHog? Here's the short answer:

1. Pendo enables users to add in tool-tips and in-app messages. It includes some product analytics tools.

2. PostHog is an all-in-one product improvement platform that includes the ability to add in-app messages, as well as analytics, feature flags, session replays and more.

Now it's time for the long answer...

In this article we’ll explore the crucial differences and similarities between Pendo (specifically, Pendo Engage) and PostHog. We’ll cover topics such as:

- Pendo and PostHog’s [core features](#core-features)
- [Product analytics](#product-analytics) and [in-app messaging](#in-app-messages-and-prompts) features in detail
- [Integrations](#apps-and-integrations) and [data pipelines](#data-pipelines)
- [Libraries](#library-support), [tracking differences and SDKs](#sdks-and-tracking)
- [Privacy, security and regulatory compliance](#compliance-and-security)
- [Pricing details](#how-much-does-pendo-cost), [free trials](#do-pendo-and-posthog-offer-free-trials) and other [frequently asked questions](#frequently-asked-questions)

## How is PostHog different?

### 1. PostHog is an all-in one platform
PostHog brings all the tools engineers need to measure success, run experiments, and more, into one platform. It’s a complete, all-in-one product OS, with robust analytics, feature flagging, A/B testing, and session capturing features. Pendo, on the other hand, is a more limited, and requires you to adopt other platforms, such as Hotjar or [LaunchDarkly](/blog/posthog-vs-launchdarkly), to get comparable functionality to PostHog.

### 2. PostHog is built for engineers
We built PostHog to support technically-savvy product managers and engineers — especially [engineers with a product focus in their role](/blog/what-is-a-product-engineer). As such, PostHog includes many powerful features that aren’t available in tools like Pendo, which are built for more general audiences.

### 3. PostHog is open source
Because we build for engineers first, we're also open source. You can check out [PostHog’s source code](https://github.com/PostHog), [build integrations](/docs/apps/build) or [other services](/blog/how-we-built-an-app-server) on top of the product, and even [give feedback or interact with the team via GitHub](https://github.com/PostHog). Transparency, including transparent pricing, is one of our core values.

<ArrayCTA />

## Comparing PostHog and Pendo
**Pendo** has four pricing tiers — Free, Starter, Growth, and Portfolio – for its main product, Pendo Engage. Pendo's Starter plan is limited to 2,000 active users a minimum of $8,000 per year.

**PostHog** has three pricing plans — Free, Scale, and Enterprise:

- The Free plan includes everything early-stage companies need with a generous usage limit – 1 million events and 15k replays per month.

- The Scale plan unlocks advanced features, like group analytics and A/B testing. Your first 1 million events and 15k replays each month are still free – you pay for what you use thereafter. 

- The Enterprise plan unlocks extra security, compliance, and permissioning features to meet the needs of large businesses. 

> **Are you an early-stage startup?** Get $50k in PostHog credit, and more, by joining [our PostHog for Startups program](/startups)!

To make a clean comparison between PostHog and Pendo, we’ll focus on comparing Pendo Engage to PostHog and include features from all pricing tiers.

## Core features
<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
          <td className="w-3/12"></td>
            <td><strong>Pendo</strong></td>
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
            <td><strong>Session replays</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Watch real users use your product; diagnose bugs</td>
        </tr>
        <tr>
            <td><strong>User surveys</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Ask users for qualitative feedback and gather responses</td>
        </tr>
        <tr>
            <td><strong>Feature flags</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Roll out features safely; toggle features for cohorts or individuals</td>
        </tr>
        <tr>
            <td><strong>A/B testing</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Test changes and analyze impact</td>
        </tr>
        <tr>
            <td><strong>In-app prompts and messages</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Send messages to users in your app</td>
        </tr>
        <tr>
            <td><strong>Apps/Integrations</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Push and pull data to other destinations</td>
        </tr>
        <tr>
            <td><strong>Open source</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Build your own apps and contribute code</td>
        </tr>
    </tbody>
</table>
</div>

- **Session replays:** [Session replays](/session-replay) in PostHog recreate exactly what real users see and how they use your product. They also enable you to debug problems using built-in console logs and network performance.

- **Feature flags:** PostHog includes [multivariate feature flags](/feature-flags) that support JSON payloads, enabling you to push real-time changes to your product without redeploying. Teams can use feature flags to offer different features or UI choices to users, to trigger in-app messages, and more.

- **A/B testing:** In PostHog, you can use the [experimentation suite](/ab-testing) to create multivariate tests within your product, such as showing some users a different page layout to others. Over time, you can build an understanding of which page performs better, correlate results with other events, and deploy a final version.

### Product Analytics

PostHog and Pendo are ultimately built for different types of users. While PostHog is designed with engineers and technical users in mind, Pendo is intended more for marketers and UX designers. 

This difference is reflected in all levels of the product, but especially in product analytics, where many advanced features which are lacking in Pendo, are available in PostHog. 

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
			<td className="w-3/12"></td>
            <td><strong>Pendo</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Graphs and trends</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Build custom insights and visualizations</td>
        </tr>
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
            <td><strong>Cohorts</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Combine users based on properties and events for group analysis</td>
        </tr>
        <tr>
            <td><strong>User paths</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track user flows and where they drop-off</td>
        </tr>
        <tr>
            <td><strong>Retention</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Analyze user and revenue retention</td>
        </tr>
        <tr>
            <td><strong>UTM tracking</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track marketing campaigns with UTM tags</td>
        </tr>
        <tr>
            <td><strong>Correlation analysis</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Suggested events and properties that lead to success or failure</td>
        </tr>
        <tr>
            <td><strong>Group analytics</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Understand how organizations use your product</td>
        </tr>
        <tr>
            <td><strong>Formulas</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Use custom formulas to calculate unique insights</td>
        </tr>
        <tr>
            <td><strong>SQL access</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Write your own queries in SQL</td>
        </tr>
    </tbody>
</table>
</div>

- **Correlation analysis:** [Correlation analysis](/product-analytics) automatically highlights significant linking properties or events relevant to an insight. For example, you can find if users who complete a funnel are likely to be from a certain location, or have completed another event. In PostHog, correlation analysis is a standard part of analytics. 

- **Formulas:** Formulas in PostHog enable you to create custom insights using your data. A simple example of a formula would be an equation to figure out a ratio or percentage (e.g. the percentage of user who completed two different events), though advanced formulas can use more elaborate functions, such as `COS` and `SIN`.

- **SQL access:** While both PostHog and Pendo have ready-made insights and visualization types, only PostHog gives you unlimited access to your data by [writing your own SQL queries](/docs/product-analytics/hogql). This is ideal for data scientists, product managers, and engineers who want to perform advanced analysis on user data.

<h4 className="mb-4">Discover what's possible with <span className="text-blue">product analytics</span></h4>
<TutorialsSlider slugs={[
  "/tutorials/churn-rate",
  "/tutorials/funnels",
  "/tutorials/api-get-insights-persons",
  "/tutorials/feature-retention",
  "/tutorials/next-steps-after-installing"
]} />

### In-app messages and prompts
Pendo is all about creating in-app messages, prompts, tooltips, measuring their impact on adoption and retention, and collecting feedback. But these aren't unique features – PostHog also supports in-app messages and interactive pop-ups through the use of [feature flag payloads](/docs/feature-flags/payloads) and [site apps](/tutorials/build-site-app), as well as [customizable surveys](/docs/surveys/manual).

The main difference is, because Pendo is designed for less technical users, it offers an interface that is simpler, but less powerful. You can easily create tooltips, announcement pop-ups and polls in Pendo, but not other types of prompt such as a Calendly integration. 

PostHog has ready-made apps for displaying pop-ups and tooltips, including banners and site notifications, but can also create customizable surveys with which you can collect qualitative feedback to analyze alongside the quantitative data. Surveys can even be used to send links to users for scheduling face-to-face interviews. 

<h4 className="mb-4">Discover what's possible with <span className="text-blue">PostHog apps</span></h4>
<TutorialsSlider slugs={[
  "/tutorials/build-site-app",
  "/tutorials/build-your-own-posthog-app",
  "/tutorials/how-to-connect-discord-to-posthog-with-zapier",
  "/tutorials/react-popups"
]} />

### Apps and integrations
Both Pendo and PostHog have a wide selection of apps and integration. Both also include integrations with tools such as Zapier, which enable you to move data to even more platforms.

One unique advantage of PostHog is that, because it is open source, it’s easy to [create your own apps and integrations](/tutorials/build-your-own-posthog-app). This is useful if you’re, for example, using niche software in your stack that hasn’t been widely adopted, or if you require a direct integration between PostHog and your product. 

> The number of available apps is constantly increasing for both PostHog and Pendo, so rather than list all available apps, we’ve shortened this section to only list the most popular integrations in particular categories. Want the full list? Check [the PostHog app library](/apps)!

### Data pipelines

‘Data pipeline’ refers to apps which enable you to integrate with data warehouses, data lakes, or other forms of data storage. 

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>Pendo</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Export API</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Export data via API</td>
        </tr>
        <tr>
            <td><strong>Import API</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Export data via API</td>
        </tr>
        <tr>
            <td><strong>Amazon Redshift</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Export data to Redshift</td>
        </tr>
        <tr>
            <td><strong>Amazon S3</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Export data to S3 bucket</td>
        </tr>
        <tr>
            <td><strong>Azure Blob Storage</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Export data to Microsoft Azure</td>
        </tr>
        <tr>
            <td><strong>Google Cloud Storage</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Export data to GCS</td>
        </tr>
        <tr>
            <td><strong>Snowflake</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Export data to Snowflake database</td>
        </tr>
        <tr>
            <td><strong>Google BigQuery</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Export data to BigQuery for analysis</td>
        </tr>
        <tr>
            <td><strong>RudderStack</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Sync event and person data</td>
        </tr>
        <tr>
            <td><strong>Airbyte</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Extract and load data to external platforms</td>
        </tr>
    </tbody>
</table>
</div>

### Popular integrations 

Below, we've listed a few of the most popular integrations used across PostHog and Pendo. 

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>Pendo</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Hubspot</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Sync event and person data</td>
        </tr>
        <tr>
            <td><strong>Salesforce</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Sync event and person data</td>
        </tr>
        <tr>
            <td><strong>Zapier</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Export events for use in Zaps</td>
        </tr>
        <tr>
            <td><strong>Shopify</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Sync customer and order data </td>
        </tr>
        <tr>
            <td><strong>Stripe</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Sync customer and invoice data</td>
        </tr>
        <tr>
            <td><strong>Slack</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Receive notifications about new data</td>
        </tr>
        <tr>
            <td><strong>Discord</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Receive notifications about new data</td>
        </tr>
        <tr>
            <td><strong>MS Teams</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Receive notifications about new data</td>
        </tr>
        <tr>
            <td><strong>Intercom</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Extract and load data to external platforms</td>
        </tr>
        <tr>
            <td><strong>Customer.io</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Sync data between platforms</td>
        </tr>
        <tr>
            <td><strong>Sentry</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Ingest Sentry errors for analysis</td>
        </tr>
        <tr>
            <td><strong>Segment</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Ingest events from Segment</td>
        </tr>
    </tbody>
</table>
</div>

> **Want more?** For a full list of PostHog’s available integrations, please [check the app directory](/apps).

## Compliance and security

Regulatory compliance can be a critical need for many teams, especially if they operate in financial or healthcare industries. Regulations such as HIPPA and GDPR can require teams to store data in certain locations, or to protect data in certain ways. 

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 400px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>Pendo</strong></td>
            <td><strong>PostHog</strong></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>GDPR ready</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>EU hosting available</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Data anonymization</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Cookie-less tracking option</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>SOC 2 certified</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>SAML/SSO available</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>2FA available</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
    </tbody>
</table>
</div>

## SDKs and tracking

Pendo and PostHog both support a variety of tracking and implementation options to get your data into their platform. Both platforms enable you to create tracked events manually, as well as offering autocapture to help you get started quickly.

Autocapture is preferred by many users because it's faster to setup, but some argue that it creates too much noise or cost to be useful. We disagree, and it’s why PostHog gives you your first million events for free, every month — so you can capture events without worrying about these issues. [It’s something we feel quite strongly about](/blog/is-autocapture-still-bad).

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>Pendo</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
            <tr>
            <td><strong>Event tracking</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track manually instrumented events</td>
        </tr>
        <tr>
            <td><strong>Autocapture</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Automatically track events without instrumentation</td>
        </tr>
        <tr>
            <td><strong>Combined events (actions)</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track related events as a single trackable action or behavior</td>
        </tr>
        <tr>
            <td><strong>Send events from your own domain</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Ensure ad blockers don't block data capture</td>
        </tr>
        <tr>
            <td><strong>Cross-domain tracking</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track users across domains and sub-domains</td>
        </tr>
        <tr>
            <td><strong>Server-side tracking</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Send events from your server</td>
        </tr>
        <tr>
            <td><strong>Capture API</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Send events through an API</td>
        </tr>
    </tbody>
</table>
</div>

### Library support

PostHog supports a wide range of client and server libraries, but not all features are equally available across all of them. We recommend using PostHog's JavaScript snippet to enjoy all features. See [our client library documentation](/docs/integrate?tab=snippet) for more information.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 400px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>Pendo</strong></td>
            <td><strong>PostHog</strong></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>JavaScript</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>React Native</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>React</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Flutter</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>iOS</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Android</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Ruby</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
    </tbody>
</table>
</div>

## Frequently asked questions

-   [Who is Pendo useful for?](#who-is-pendo-useful-for)
-   [Who is PostHog useful for?](#who-is-posthog-useful-for)
-   [How much does Pendo cost?](#how-much-does-pendo-cost)
-   [How much does PostHog cost?](#how-much-does-posthog-cost)
-   [Do Pendo and PostHog offer free trials?](#do-pendo-and-posthog-offer-free-trials)

Got another question? You can [ask the PostHog team anything you want](/questions)!

### Who is Pendo useful for?
Pendo is designed primarily for marketers and UX specialists. Its key features are the ability to create in-app prompts and messages, such as tooltips, without technical know-how. Pendo enables these users to follow the performance of such messages and to monitor broad feature adoption and usage. 

### Who is PostHog useful for?
PostHog is built primarily with engineers, product managers and other technical users in mind. It also offers the ability to create in-app prompts and messages, but also offers a number of other tools that are useful for these types of teams, such as feature flags and session replays. 

This difference is ultimately reflected in many of the features both platforms offer, and how they are designed. PostHog's focus on breadth and supporting engineers in creating better products, for example, is reflected in its core features. 

### How much does Pendo cost?

Pendo has complex, tier-based pricing, which isn’t entirely transparent and is based on the number of monthly active users. 

A free tier is available with basic features, but can only track up to 500 monthly active users. After this, the Starter tier offers greater in-app messaging features and support for up to 2,000 monthly active users — but costs $8,000 per year. 

Two additional tiers are available for larger teams — Growth and Portfolio — but the pricing for each is custom and not available publicly.

### How much does PostHog cost?

PostHog has transparent pricing based on the usage. It’s free to get started and completely free for the first 1 million events and 15,000 sessions captured every month.

After this free monthly allowance you'll pay $0.00031/event and $0.005/replay, and PostHog charges progressively less the more you use. Volume, non-profit and [startup discounts](/startups) are available upon request, and we recommend trying [our pricing calculator](/pricing) to estimate your pricing.

### Do Pendo and PostHog offer free trials?

Pendo offers a free tier, called Pendo Free. This version is limited in scope, supporting only one web, iOS or Android application, basic features and up to 500 monthly active users. After this, you must pay additional fees.

With PostHog, it’s free to get started, and all users get their first 1 million events and 15,000 sessions for free, every month. There are no other restrictions and billing limits can be used to keep usage beneath this allowance, enabling you to use PostHog for free indefinitely.

<ArrayCTA />
