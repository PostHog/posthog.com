---
date: 2023-05-25
title: "In-depth: PostHog vs FullStory"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/posthog-vs-fullstory/posthog-vs-fullstory.jpg
featuredImageType: full
author:
    - joe-martin
category: General
tags:
    - Comparisons
---

PostHog and FullStory are both popular tools for understanding user behavior, but how are they different? Here’s the short answer.

- **PostHog** is an all-in-one product improvement platform built primarily for engineers and technical users. It offers a wide range of features to help teams build better products, including analytics, feature flags, session replays, and more.

- **FullStory** is primarily a session replay tool focused on helping product managers and UX specialists to understand more about how their users interact with product UI. 

In this comparison, we'll explore, compare and contrast PostHog and FullStory in detail, so you can decide which tool is right for you. We’ll look at areas such as...

- [Core features and product focus](#core-feature-comparison)
- [Product analytics](#product-analytics), [Session replay](#session-replays), and [Heatmapping](#heatmaps-clickmaps-and-scrollmaps) features
- [Integrations with other software](#apps-integrations-and-plugins)
- [Event tracking and data management](#event-tracking)
- [Privacy, security and compliance](#security-and-compliance) 
- [Pricing and frequently asked questions](#frequently-asked-questions)

## How is PostHog different?

#### 1. PostHog is an all-in-one product improvement platform
FullStory includes a few additional features, but it's mostly focused on session replay. In contrast, PostHog is a comprehensive, all-in-one platform that easily replaces an entire stack of traditional tools, such as LaunchDarkly, Amplitude, and FullStory.  

#### 2. PostHog is for engineers, technical users, _builders_
PostHog is designed from the ground up to meet the needs of developers, and product-focused engineers. Session replay includes advanced tools for debugging errors and performance issues, while feature flags make it easy to test, and roll out, new features at scale 

#### 3. PostHog is open source
As an open source company, we build in public and give you unrivalled access. You can check out the PostHog repo to monitor code changes, build your own features and apps, and interact directly with our engineering team.

<ArrayCTA /> 

## Core features

This comparison will compare all available features, regardless of pricing tier. Visit the [pricing section in the FAQ](#how-much-do-posthog-and-fullstory-cost) for more information on pricing.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
          <td className="w-3/12"></td>
            <td><strong>FullStory</strong></td>
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
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Watch real users use your product; debug behaviour</td>
        </tr>
        <tr>
            <td><strong>Feature flags</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Roll out features safely; toggle features for cohorts or individuals</td>
        </tr>
        <tr>
            <td><strong>User surveys</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Ask users for qualitative feedback and gather responses</td>
        </tr>
        <tr>
            <td><strong>A/B testing</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Test changes and analyze impact</td>
        </tr>
        <tr>
            <td><strong>In-app prompts and messages</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
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

- **Product analytics:** Both FullStory and PostHog offer product analytics, but _what_ they offer is drastically different. We explore this comparison in greater detail below. 

- **Build your own apps:** PostHog makes it easy to build your own apps and integrations, including site apps that inject surveys, messages and prompts into your product.

> **Further reading:** [How FullStory compares to other PostHog alternatives](/blog/posthog-alternatives)

### Product Analytics

FullStory is aimed at UI designers and general product managers, while PostHog is suited to product engineers, front-end developers and more technical users. As a result, PostHog offers a wider range of analytics tools, including [its own SQL dialect for detailed analysis](/docs/product-analytics/hogql).

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
	<td className="w-3/12"></td>
            <td><strong>FullStory</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Event tracking</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Log page views, clicks and other custom events.</td>
        </tr>
        <tr>
            <td><strong>Trends</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track your data over time and visualize in charts.</td>
        </tr>
        <tr>
            <td><strong>Funnels</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Visualize conversion rates and drop-offs.</td>
        </tr>
        <tr>
            <td><strong>Dashboards</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Display a collection of insights and trends.</td>
        </tr>
        <tr>
            <td><strong>Correlation analysis</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Automatically highlight factors affecting funnel conversion rates.</td>
        </tr>
        <tr>
            <td><strong>Group analytics</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Group events by users in the same company, project, or any other attribute.</td>
        </tr>
        <tr>
            <td><strong>Lifecycle insights</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Break down events from new, returning, resurrecting, and dormant users.</td>
        </tr>
        <tr>
            <td><strong>Retention insights</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Understand churn with returning user actions.</td>
        </tr>
       <tr>
            <td><strong>Stickiness insights</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>See how many times users perform an event in a period of time.</td>
        </tr>
         <tr>
            <td><strong>Path insights</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Inspect how users journey through your product.</td>
        </tr>
    </tbody>
</table>
</div>

Product analytics in PostHog is closely integrated with other tools, such as feature flags and session replays. 

This means you can use a Trends insight to examine the performance of a particular metric, click on a point in the graph to see users who contributed to it, and then jump directly to their session replay to see what they did.

You can also do this in reverse by filtering for session replays where particular events occur, and creating dynamic playlists. We cover these session replay features in greater depth below. 

> **PostHog ships weirdly fast.** We never stop shipping. Visit the [the weekly changelog](/changelog/2023) to keep up to date, or take a look at what we’re planning in [our public roadmap](/roadmap)!

### Session replay

FullStory is _primarily_ a session replay tool, while PostHog is all-in-one platform. FullStory's specialism means it has some extra features compared to Posthog, though the gap isn’t as large as you may imagine... and it's closing fast.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
	<td className="w-3/12"></td>
            <td><strong>FullStory</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>iOS app replays</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center">Planned 2023</td>
            <td>Record user sessions in iOS apps.</td>
        </tr>
        <tr>
            <td><strong>Android app replays</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center">Planned 2023</td>
            <td>Record user sessions in Android apps.</td>
        </tr>
        <tr>
            <td><strong>Web app replays</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Capture replays from single-page apps.</td>
        </tr>
        <tr>
            <td><strong>Privacy masking</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Avoid capturing user data.</td>
        </tr>
        <tr>
            <td><strong>Conditional capturing</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Only capture the sessions you want.</td>
        </tr>
        <tr>
            <td><strong>Performance monitoring</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Monitor network activity and performance.</td>
        </tr>       
        <tr>
            <td><strong>Custom playlists</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Create playlists of related replays.</td>
        </tr>
        <tr>
            <td><strong>Share replays</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Generate timestamped short links for sharing.</td>
        </tr>
        <tr>
            <td><strong>Add notes to replays</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Add notes to a timebar when sharing</td>
        </tr>
        <tr>
            <td><strong>DOM explorer</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Explore an interactive snapshot of replays</td>
        </tr>     
        <tr>
            <td><strong>Export replays</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Save replay files offline for storage.</td>
        </tr> 
        <tr>
            <td><strong>Data retention</strong></td>
		<td className="text-center">1 month<sup>*</sup></td>
            <td className="text-center">3 weeks</td>
            <td></td>
        </tr>
        <tr>
            <td><strong>Free replay allowance</strong></td>
		<td className="text-center">No free allowance<sup>**</sup></td>
            <td className="text-center">15,000 sessions every month</td>
            <td></td>
        </tr>
    </tbody>
</table>
</div>

<sup>*</sup> Data retention increases on more expensive plans.
<sup>**</sup> FullStory offers a 14-day trial with 5,000 free sessions before forcing you to pay.

Beyond this, PostHog and FullStory are roughly comparable even in spite of FullStory’s near-exclusive focus on session replays as a feature. A major exception is PostHog’s lack of mobile app recording features, but [we’re working on it](/roadmap).

### Heatmaps, clickmaps and scrollmaps
Different types of heatmaps enable you to see where users are focusing their attention – or even precisely where they are looking on a page. FullStory is inarguably a better heatmapping tool, but PostHog's clickmaps offer all the essential information – especially when used in conjunction with session replays and product analytics.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
	<td className="w-3/12"></td>
            <td><strong>FullStory</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Clickmaps</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Visualize where users click on a page.</td>
        </tr>
        <tr>
            <td><strong>Scrollmaps</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Check where users scroll to.</td>
        </tr>
        <tr>
            <td><strong>Movement maps</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Visualize mouse movements.</td>
        </tr>
        <tr>
            <td><strong>Eye tracking</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Support for eye-tracking tools.</td>
        </tr>
    </tbody>
</table>
</div>

<ArrayCTA />

### Apps, integrations and plugins
Apps are a major point of difference between FullStory and PosthHog because PostHog offers the ability to inject code into your site. We use this functionality for our [surveys](/docs/surveys/manual) feature, which enables you to ask users for qualitative feedback, to schedule face to face interviews, and more.

PostHog is also open source, meaning [you can easily create your own apps](/tutorials/build-your-own-posthog-app). In fact, it’s so easy to create apps in PostHog that some of the apps we already offer have been developed by non-engineers! 

Below are some of the most popular apps and integrations for FullStory and PostHog:

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>FullStory</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Hubspot</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
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
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Export events for use in Zaps</td>
        </tr>
        <tr>
            <td><strong>Stripe</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Sync customer and invoice data</td>
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
        <tr>
            <td><strong>Amazon Redshift</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Export data to Redshift</td>
        </tr>
        <tr>
            <td><strong>Amazon S3</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Export data to a S3 bucket</td>
        </tr>
        <tr>
            <td><strong>Azure Blob Storage</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Export data to Microsoft Azure</td>
        </tr>
        <tr>
            <td><strong>Google Cloud Storage</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
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
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Sync event and person data</td>
        </tr>
    </tbody>
</table>
</div>

## Event tracking

Both PostHog and FullStory support a broad range of tracking options and libraries, and manual event instrumentation, as well as autocapture.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>FullStory</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Autocapture</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Automatically track events without instrumentation</td>
        </tr>
        <tr>
            <td><strong>Combined events</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track related events as a single trackable action or behavior</td>
        </tr>
        <tr>
            <td><strong>Reverse proxy available</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Send events from your own domain to capture more data</td>
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

> #### Should you autocapture events?
>
> Autocapture is much faster to setup than manual instrumentation, but some argue that it creates too much noise to be useful. We disagree, and it’s why PostHog gives you your first million events for free, every month – so you can capture events without worrying about event limits. [It’s something we feel strongly about](/blog/is-autocapture-still-bad).

## Security and compliance

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>FullStory</strong></td>
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

## Frequently asked questions

### How much do PostHog and FullStory cost?
Both PostHog and FullStory offer three main pricing tiers, but how these tiers differ is actually quite different. 

**PostHog** has a free tier with a limited feature set and a generous allowance of 1 million free events and 15,000 free sessions each month, after which users move to a more full-featured paid plan that's billed on usage. The third tier is an enterprise add-on, which expands the feature set further with the permissioning and privacy tools needed by large organizations.

>  See [PostHog’s pricing page](/pricing) to find out more about what’s included in each tier.

**FullStory** has three premium, paid-for tiers, which differ in available features. The basic Business plan offers minimal features and a limited 14-day trial, while the following Advanced and Enterprise plans increase the feature scope and, presumably, cost. 

We say 'presumably' because FullStory’s pricing isn’t transparent and there’s no way to know exactly how much each tier costs. In contrast, PostHog's pricing is completely transparent – we have a cost calculator on [our pricing page](/pricing) and you can set billing limits to prevent surprise bills.

#### Do PostHog and FullStory offer free trials?

It doesn’t cost anything to get started with PostHog, and every month we give user their first million events _and_ their first 15,000 sessions for free. As a result, there’s no need for a free trial — you can get started, start tracking and use billing limits to stay within the free allowance. Forever. 

FullStory offers a 14-day free trial which is limited to only 5,000 sessions. After this, it defaults to a premium Business plan. 

#### Does session replay capture personal information?

Both PostHog and FullStory offer privacy masking to automatically remove text field input from session replays, as well as more advanced controls to further protect user privacy. 

#### What are the alternatives to PostHog and FullStory?

Some other popular session replay tools include [HotJar](/blog/posthog-vs-hotjar) and [LogRocket](/blog/posthog-vs-logrocket). For more information on how PostHog compares to these, check [the session replay page](/session-replay). 
