---
date: 2023-10-12
title: "In-depth: PostHog vs Google Analytics 4"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/posthog-vs-kubit/posthog-vs-kubit.jpg
featuredImageType: full
author:
    - lior-neu-ner
category: General
tags:
    - Comparisons
    - Guides
---

Want to understand how PostHog and Google Analytics 4 (GA4) are different? Here's the short answer:

- **Google Analytics** is designed for marketers to understand user traffic, performance of different marketing channels, and return on ad spend.

- **PostHog** is an all-in-one platform that *includes* analytics and a whole bunch more – like session replays, A/B testing, surveys, and feature flags. It's built for engineers and product teams.

In this article we’ll explore these differences in more detail, and take a deep dive into the analytics features of both.

## How is PostHog different to Google Analytics?

### 1. PostHog does more than analytics

[Analytics](/product-analytics) is a core part of our platform, but it's just one component in a set of important tools for product teams. PostHog enables you to collect feedback with [surveys](/docs/surveys), understand user behavior with [session replays](/session-replay), test changes with [A/B tests](/ab-testing), and deploy changes with [feature flags](/feature-flags).

### 2. PostHog is built for engineers

Anyone can use PostHog – just [ask our marketing team](/blog/posthog-marketing) – but PostHog is designed to meet the needs of engineers. Our goal is to help developers [be better at product](/blog/helping-engineers-to-product).

### 3. PostHog is open source and transparent

PostHog is built with transparency at its core. We work in the open and give full access to our [source code](https://github.com/PostHog), and enable you to [build integrations](/docs/apps/build) and [other services](/blog/how-we-built-an-app-server) on top of the product. You can even give feedback on [our public roadmap](/roadmap).

<ArrayCTA /> 

## PostHog and Google Analytics feature comparison

As mentioned above, PostHog offers a wider selection of features than GA4, which focuses solely on analytics. This makes PostHog better suited for teams who are building products.

<div className="overflow-x-auto -mx-5 px-5 w-screen md:w-auto">
  <table className="w-full mt-4">
    <thead>
      <tr>
        <td className="w-3/12"></td>
        <td class="text-center"><strong>GA4</strong></td>
        <td class="text-center"><strong>PostHog</strong></td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>Analytics</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">Custom trends, funnels, and retention analysis</p>
        </td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
      </tr>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>Session replays</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">Watch real users use your product; diagnose bugs</p>
        </td>
        <td className="text-center"><span className="text-red text-lg">✖</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
      </tr>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>Heatmaps</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">Visualize where users click in your app or website</p>
        </td>
        <td className="text-center"><span className="text-red text-lg">✖</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
      </tr>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>Feature flags</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">Roll out features safely; toggle features for cohorts or individuals</p>
        </td>
        <td className="text-center"><span className="text-red text-lg">✖</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
      </tr>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>Surveys</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">Ask users for qualitative feedback and gather responses</p>
        </td>
        <td className="text-center"><span className="text-red text-lg">✖</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
      </tr>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>A/B testing</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">Test changes and analyze impact</p>
        </td>
        <td className="text-center"><span className="text-red text-lg">✖</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
      </tr>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>Apps/Integrations</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">Push and pull data to other destinations</p>
        </td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
      </tr>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>Open source</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">Full access to source code and transparent roadmap</p>
        </td>
        <td className="text-center"><span className="text-red text-lg">✖</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
      </tr>
    </tbody>
  </table>
</div>

## Analytics features comparison

Both GA4 and PostHog offer analytics, but _what_ they offer is drastically different. 

GA4 has better features for calculating ROI on Google Ads and other marketing campaigns. This is particularly useful for e-commerce websites. 

PostHog, on the other hand, focuses on providing insights on product and feature usage. The biggest difference is [group analytics](/docs/product-analytics/group-analytics), which enable you to track metrics at an account or company level – a feature which GA4 lacks. This makes PostHog better suited for companies building B2B SaaS products.

<div className="overflow-x-auto -mx-5 px-5 w-screen md:w-auto">
  <table className="w-full mt-4">
    <thead>
      <tr>
        <td className="w-3/12"></td>
        <td class="text-center"><strong>GA4</strong></td>
        <td class="text-center"><strong>PostHog</strong></td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>Group analytics</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">Track metrics at account or company level</p>
        </td>
        <td className="text-center"><span className="text-red text-lg">✖</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
      </tr>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>Marketing analytics</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">Track ROI on Google Ads and other marketing campaigns</p>
        </td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
        <td className="text-center"><span className="text-red text-lg">✖</span></td>
      </tr>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>Real-time reporting</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">Monitor activity on your site or app as it happens.</p>
        </td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
        <td className="text-center"><span className="text-red text-lg">✖</span></td>
      </tr>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>Predictive insights</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">AI-powered alerts when metrics change</p>
        </td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
        <td className="text-center"><span className="text-red text-lg">✖</span></td>
      </tr>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>Traffic breakdown</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">Gain insights into where your visitors and conversions are coming from</p>
        </td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
      </tr>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>UTM tracking</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">Track marketing campaigns with UTM tags</p>
        </td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
      </tr>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>Funnels</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">Visualize conversion rates and drop-offs</p>
        </td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
      </tr>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>User paths</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">Track user flows and where they drop-off</p>
        </td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
      </tr>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>Retention</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">Analyze user and revenue retention</p>
        </td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
      </tr>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>Cohorts</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">Combine users based on properties and events for group analysis</p>
        </td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
      </tr>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>User profiles</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">View user demographics data such as geolocation, language, and device type</p>
        </td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
      </tr>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>Data retention</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">How long historical data is retained</p>
        </td>
        <td className="text-center">14 months</td>
        <td className="text-center">7 years</td>
      </tr>
    </tbody>
  </table>
</div>

PostHog also offers these features to better understand how people are using your product:

<div className="overflow-x-auto -mx-5 px-5 w-screen md:w-auto">
  <table className="w-full mt-4">
    <thead>
      <tr>
        <td className="w-3/12"></td>
        <td class="text-center"><strong>GA4</strong></td>
        <td class="text-center"><strong>PostHog</strong></td>
        <td></td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>Correlation analysis</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">Automatically highlight factors affecting funnel conversion rates</p>
        </td>
        <td className="text-center"><span className="text-red text-lg">✖</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
        <td></td>
      </tr>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>Lifecycle insights</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">Break down events from new, returning, resurrecting, and dormant users</p>
        </td>
        <td className="text-center"><span className="text-red text-lg">✖</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
        <td></td>
      </tr>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>Stickiness insights</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">See how many times users perform an event in a period of time</p>
        </td>
        <td className="text-center"><span className="text-red text-lg">✖</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
        <td></td>
      </tr>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>Formulas</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">Use custom formulas to create unique insights</p>
        </td>
        <td className="text-center"><span className="text-red text-lg">✖</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
        <td></td>
      </tr>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>SQL access</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">Write your own queries in SQL</p>
        </td>
        <td className="text-center"><span className="text-red text-lg">✖</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
        <td></td>
      </tr>
      <tr>
        <td>
          <p class="!mb-0 pb-0.5 !leading-tight"><strong>Toolbar</strong></p>
          <p class="!mb-0 !text-sm text-opacity-75 leading-none">View insights on your live website or app with an overlay</p>
        </td>
        <td className="text-center"><span className="text-red text-lg">✖</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
        <td></td>
      </tr>
    </tbody>
  </table>
</div>

## Apps and integrations

Integrations are another major point of difference between GA4 and PosthHog, especially when it comes to importing data. Because PostHog is built to be your single source of truth for viewing data, it's very simple to import data from other sources. 

On the other hand, it's hard to import data into GA4 because:

1. The type of data you're allowed to [import into GA4](https://support.google.com/analytics/answer/10071301) is limited. 
2. You need to constantly upload CSV files manually, or you need to set up an SFTP server to automatically do this for you.

Below is a comparison of some of the most popular apps. For a full list of PostHog’s available integrations, [check our app directory](/apps).

<div className="overflow-x-auto -mx-5 px-5 w-screen md:w-auto">
  <table className="w-full mt-4">
    <thead>
      <tr>
        <td className="w-3/12"></td>
        <td class="text-center"><strong>GA4</strong></td>
        <td class="text-center"><strong>PostHog</strong></td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><p class="!mb-0 pb-0.5 !leading-tight"><strong>Zapier</strong></p><p class="!mb-0 !text-sm text-opacity-75 leading-none">Export events for use in Zaps.</p></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
      </tr>
      <tr>
        <td><p class="!mb-0 pb-0.5 !leading-tight"><strong>Hubspot</strong></p><p class="!mb-0 !text-sm text-opacity-75 leading-none">Sync event and person data.</p></td>
        <td className="text-center"><span className="text-red text-lg">✖</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
      </tr>
      <tr>
        <td><p class="!mb-0 pb-0.5 !leading-tight"><strong>Salesforce</strong></p><p class="!mb-0 !text-sm text-opacity-75 leading-none">Sync event and person data.</p></td>
        <td className="text-center"><span className="text-red text-lg">✖</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
      </tr>
      <tr>
        <td><p class="!mb-0 pb-0.5 !leading-tight"><strong>Intercom</strong></p><p class="!mb-0 !text-sm text-opacity-75 leading-none">Extract and load data to external platforms.</p></td>
        <td className="text-center"><span className="text-red text-lg">✖</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
      </tr>
      <tr>
        <td><p class="!mb-0 pb-0.5 !leading-tight"><strong>Customer.io</strong></p><p class="!mb-0 !text-sm text-opacity-75 leading-none">Sync data between platforms.</p></td>
        <td className="text-center"><span className="text-red text-lg">✖</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
      </tr>
      <tr>
        <td><p class="!mb-0 pb-0.5 !leading-tight"><strong>Sentry</strong></p><p class="!mb-0 !text-sm text-opacity-75 leading-none">Ingest Sentry errors for analysis.</p></td>
        <td className="text-center"><span className="text-red text-lg">✖</span></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
      </tr>
      <tr>
        <td><p class="!mb-0 pb-0.5 !leading-tight"><strong>Google Ads</strong></p><p class="!mb-0 !text-sm text-opacity-75 leading-none">Track Google ad ROI.</p></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
        <td className="text-center"><span className="text-red text-lg">✖</span></td>
      </tr>
      <tr>
        <td><p class="!mb-0 pb-0.5 !leading-tight"><strong>Looker Studio</strong></p><p class="!mb-0 !text-sm text-opacity-75 leading-none">Visualize events in Looker dashboards.</p></td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
        <td className="text-center"><span className="text-red text-lg">✖</span></td>
      </tr>
      <tr>
        <td><p class="!mb-0 pb-0.5 !leading-tight"><strong>Slack</strong></p><p class="!mb-0 !text-sm text-opacity-75 leading-none">Receive notifications about new data.</p></td>
        <td className="text-center text-sm">Requires 3rd party integration</td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
      </tr>
      <tr>
        <td><p class="!mb-0 pb-0.5 !leading-tight"><strong>Discord</strong></p><p class="!mb-0 !text-sm text-opacity-75 leading-none">Receive notifications about new data.</p></td>
        <td className="text-center text-sm">Requires 3rd party integration</td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
      </tr>
      <tr>
        <td><p class="!mb-0 pb-0.5 !leading-tight"><strong>MS Teams</strong></p><p class="!mb-0 !text-sm text-opacity-75 leading-none">Receive notifications about new data.</p></td>
        <td className="text-center text-sm">Requires 3rd party integration</td>
        <td className="text-center"><span className="text-green text-lg">✔</span></td>
      </tr>
    </tbody>
  </table>
</div>

> One unique advantage of PostHog is that, because it is open source, it’s easy to [create your own apps and integrations](/tutorials/build-your-own-posthog-app). This is useful if you’re, for example, using niche software in your stack that hasn’t been widely adopted, or if you require a direct integration between PostHog and your product. 

## Privacy, compliance, and security

Compliance can be a bit of a regulatory headache, especially for international organizations who have to adhere to rules such as GDPR. PostHog makes such things simple by offering a choice of where your data is hosted, cookie-less tracking, and a variety of security options to keep your data secure. 

GA4 also offers various [privacy controls](https://support.google.com/analytics/answer/9019185), but does not enable you to choose where your data is stored.

<div className="overflow-x-auto -mx-5 px-5 w-screen md:w-auto">
    <table className="w-full mt-4">
        <thead>
            <tr>
                <td className="w-3/12"></td>
                <td class="text-center"><strong>GA4</strong></td>
                <td class="text-center"><strong>PostHog</strong></td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <p class="!mb-0 pb-0.5 !leading-tight"><strong>EU hosting available</strong></p>
                </td>
                <td className="text-center"><span className="text-red text-lg">✖</span></td>
                <td className="text-center"><span className="text-green text-lg">✔</span></td>
            </tr>
            <tr>
                <td>
                    <p class="!mb-0 pb-0.5 !leading-tight"><strong>Data anonymization</strong></p>
                </td>
                <td className="text-center"><span className="text-green text-lg">✔</span></td>
                <td className="text-center"><span className="text-green text-lg">✔</span></td>
            </tr>
            <tr>
                <td>
                    <p class="!mb-0 pb-0.5 !leading-tight"><strong>Cookie-less tracking option</strong></p>
                </td>
                <td className="text-center"><span className="text-green text-lg">✔</span></td>
                <td className="text-center"><span className="text-green text-lg">✔</span></td>
            </tr>
            <tr>
                <td>
                    <p class="!mb-0 pb-0.5 !leading-tight"><strong>Security certification</strong></p>
                </td>
                <td className="text-center"><span className="text-lg">ISO 27001</span></td>
                <td className="text-center"><span className="text-lg">SOC 2</span></td>
            </tr>
            <tr>
                <td>
                    <p class="!mb-0 pb-0.5 !leading-tight"><strong>SAML/SSO available</strong></p>
                </td>
                <td className="text-center"><span className="text-green text-lg">✔</span></td>
                <td className="text-center"><span className="text-green text-lg">✔</span></td>
            </tr>
            <tr>
                <td>
                    <p class="!mb-0 pb-0.5 !leading-tight"><strong>2FA available</strong></p>
                </td>
                <td className="text-center"><span className="text-green text-lg">✔</span></td>
                <td className="text-center"><span className="text-green text-lg">✔</span></td>
            </tr>
        </tbody>
    </table>
</div>

## Frequently asked questions 

### Does PostHog have reports, dimensions, and other GA4 features?

Yes, PostHog has much of the same functionality as Google Analytics, but much of it is named differently. Here’s a quick comparison of the two:

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
  <thead>
    <tr>
      <td><strong>GA name</strong></td>
      <td><strong>PostHog equivalent</strong></td>
      <td></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Report</td>
      <td>Insight</td>
      <td>Query and filter analytics data and visualize results. Types include trends, funnels, retention, and more.</td>
    </tr>
    <tr>
      <td>Dimensions</td>
      <td>Properties</td>
      <td>Additional details added to events, persons, and groups such as location, browser, and status.</td>
    </tr>
    <tr>
      <td>View</td>
      <td>Dashboard</td>
      <td>A collection of insights displayed together.</td>
    </tr>
    <tr>
      <td>Audience</td>
      <td>Persons</td>
      <td>Represents a user or set of users who create events, potentially filtered by properties or behaviors.</td>
    </tr>
    <tr>
      <td>Segment</td>
      <td>Filter</td>
      <td>A way to create a subset of your data.</td>
    </tr>
    <tr>
      <td>Goals and conversions</td>
      <td>Actions</td>
      <td>An event or collection of events representing a target behavior.</td>
    </tr>
    <tr>
      <td>Client ID</td>
      <td>Distinct ID</td>
      <td>A unique identifier for a user.</td>
    </tr>
    <tr>
      <td>Measurement ID</td>
      <td>Project API key</td>
      <td>The unique identifier for your project, used to send data to your PostHog instance.</td>
    </tr>
  </tbody>
</table>
</div>

> Familiar with Google Analytics and want more information on how to use PostHog? We've written a [guide to PostHog for Google Analytics users](/blog/google-analytics-to-posthog).

### How much do PostHog and Google Analytics cost?

GA4 has a free tier which should be sufficient for most startups and scale-ups. Larger enterprises with higher data collection and export requirements will need to upgrade to GA360, which starts at $50,000 per year. A good rule of thumb is that if you're exporting more than 1 million events per day, or querying data with more than 10 million events, you'll need to upgrade to GA360 (see a full breakdown on [their website](https://support.google.com/analytics/answer/11202874)). 

PostHog has transparent pricing based on the usage. It’s free to get started and completely free for the first 1 million analytics events. After this free monthly allowance you'll pay $0.00031/event, and PostHog charges progressively less the more you use. We recommend trying [our pricing calculator](/pricing) and reading our [guide for estimating your usage](/docs/billing/estimating-usage-costs).

### Does PostHog offer a free trial?

With PostHog, you don’t need a free trial — it’s free to get started, with a generous monthly allowance of events, replays, and API calls. If you’re within this allowance, PostHog is free to use forever.

### Are there discounts for nonprofits and startups?

Yes, PostHog offers both. Nonprofit organizations can contact our team and are usually eligible for a 50% discount, while startups can sign up for $50,000 of free credit (and a host of other perks) in the [PostHog for Startups program](/startups).

<ArrayCTA /> 