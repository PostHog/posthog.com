---
title: "In-depth: PostHog vs GrowthBook"
date: 2023-10-03
author: ["ian-vanagas"]
showTitle: true
rootpage: /blog
sidebar: Blog
hideAnchor: true
featuredImage: ../images/blog/posthog-engineering-blog.png
featuredImageType: full
category: Engineering
tags:
 - Guides
---

PostHog and GrowthBook share a lot of similarities. Both provide open source, self-serve feature flags and experimentation. Beyond this, there are big differences:

- GrowthBook is a warehouse-native feature flag and experiments platform. It focuses on integrating with the product and data tools you already use.

- PostHog is an all-in-one product and data platform. Beyond [feature flags](/docs/feature-flags) and [experiments](/docs/experiments), it includes [product analytics](/docs/product-analytics), [session replay](/docs/session-replay), [surveys](/docs/surveys), [CDP](/docs/cdp), and more.

This post goes over their differences, platforms, features, pricing, reporting, integrations, and frequently asked questions.

## How is PostHog different?

### 1. PostHog is an all-in-one platform

PostHog brings together all the tools engineers need for testing, releasing, and measuring the success of new features. Feature flags and A/B testing are only part of a suite of tools PostHog offers.

![PostHog homepage features](../images/blog/posthog-vs-growthbook/build.png)

PostHog combines usage, performance, and behavioral data with flags and experiments. PostHog’s [data warehouse](/docs/data-warehouse) also enables you to pull in data from external sources (like GrowthBook is reliant on).

Having all these product and data tools together enables you to do better analysis of shipped features and make better decisions about what you are building next. 

### 2. PostHog is built for startups and engineers

PostHog is built for high-growth startups. This means it is simple for founders and engineers to implement themselves. There are many [SDKs](/docs/libraries), [tutorials](/tutorials), and [docs](/docs) to help you get started quickly with any type of app.

As startups scale, PostHog also provides the mores advanced tools they need to succeed. These include like advanced product analytics, [SQL querying](/docs/product-analytics/sql), [CDPs](/docs/cdp), and [data warehousing](/docs/data-warehouse).

GrowthBook, on the other hand, focuses only on later-stage, larger companies than PostHog. Many of their features, like their analytical A/B testing suite, are great for data teams which also come at a later stage.

### 3. PostHog is easier to setup

GrowthBook requires more setup than PostHog as it relies heavily on external tools and writing SQL:

1. To get data into GrowthBook, you must integrate a data source. 
2. To track data related to flags and experiments, you connect to an analytics tool.
3. To configure data sources and track events, you write SQL configurations in GrowthBook.
4. To set up goals and analysis, you write more SQL.

PostHog needs none of this. You use the same app and SDKs for managing and evaluating feature flags as tracking usage. There is no extra configuration needed. Creating flags, experiments, and insights doesn’t require writing SQL. This makes PostHog faster to get started and easier to use once set up.

## Comparing PostHog and GrowthBook

### Platform

Both PostHog and GrowthBook have the infrastructure to use flags and experiments effectively with your current app. PostHog has a wider range of product and data tools built in, while GrowthBook relies on integrations with 3rd parties.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>PostHog</strong></td>
            <td><strong>GrowthBook</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
       <tr>
            <td><strong>Open source</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Code publicly accessible</td>
        </tr>
       <tr>
            <td><strong>Self-service</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>No need to talk to sales</td>
        </tr>
       <tr>
            <td><strong>SDKs</strong></td>
            <td className="text-center">14</td>
            <td className="text-center">11</td>
            <td>Including JavaScript, Android, iOS, and Python.</td>
        </tr>
       <tr>
            <td><strong>Native data sources</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Compute metrics and results without integrations</td>
        </tr>
       <tr>
            <td><strong>Proxies</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Reverse proxy to avoid blockers</td>
        </tr>
       <tr>
            <td><strong>Self-hostable</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Host on your own infrastructure</td>
        </tr>
       <tr>
            <td><strong>API</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center">Beta</td>
            <td>Edit and evaluate flags with API</td>
        </tr>
       <tr>
            <td><strong>Local evaluation (aka streaming)</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Faster flags by not having to rely on the server for evaluation</td>
        </tr>
       <tr>
            <td><strong>SQL</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Query flag and product data directly via SQL</td>
        </tr>
       <tr>
            <td><strong>Session replays</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Real user playback of flag session</td>
        </tr>
    </tbody>
</table>
</div>

## Feature flags

Both PostHog and GrowthBook offer all the functionality you expect from feature flags. 

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>PostHog</strong></td>
            <td><strong>GrowthBook</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
       <tr>
            <td><strong>Boolean flags</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Simple flags returning true or flag</td>
        </tr>
       <tr>
            <td><strong>Percentage rollouts</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Target percentages of a group</td>
        </tr>
       <tr>
            <td><strong>Custom targeting</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Target users based on user properties, custom contexts</td>
        </tr>
       <tr>
            <td><strong>JSON payloads</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Flags return JSON</td>
        </tr>
       <tr>
            <td><strong>Environments</strong></td>
            <td className="text-center">Partial</td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Manage flags for dev, stage, prod</td>
        </tr>
       <tr>
            <td><strong>Scheduling</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Schedule flags to turn on or off</td>
        </tr>
       <tr>
            <td><strong>Early access management</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Manage betas, test features</td>
        </tr>
       <tr>
            <td><strong>Bootstrapping</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Flags available on frontend application load</td>
        </tr>
    </tbody>
</table>
</div>

- **Targeting:** GrowthBooks custom targeting with attributes needs to be set every session and defined in-app before use. It is also only available on the paid Pro plan. PostHog automatically sets its equivalent ([properties](/docs/getting-started/user-properties)) on users. You don’t need to pre-defined them and unlimited custom values are free.

- **[Bootstrapping](/docs/feature-flags/bootstrapping):** PostHog’s JavaScript web SDK enables you to pass flags directly from the backend before the app loads. This makes sure they are available right away and prevents flickering. GrowthBook instead recommends moving the A/B test or flag logic earlier in the page load (server-side) to prevent this.

## Experimentation

Experimentation is where PostHog and GrowthBook’s functionality diverges. Both enable you to create [A/B/n tests](/tutorials/abn-testing) with custom goals and calculate statistical significance. The big difference between them is:

- GrowthBook’s A/B testing provides more potential statistical depth. It offers both Bayesian and Frequentist engines, value capping, regression adjustment, and testing corrections. These do require statistics knowledge to take advantage of.

- PostHog provides a simpler interface and no need to write SQL or connect to external services.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>PostHog</strong></td>
            <td><strong>GrowthBook</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
       <tr>
            <td><strong>Custom goals</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Customize metrics that test tracks</td>
        </tr>
       <tr>
            <td><strong>Secondary metrics</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Monitor impact on unrelated metrics</td>
        </tr>
       <tr>
            <td><strong>Native goal tracking</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Track impact on goals without external sources</td>
        </tr>
       <tr>
            <td><strong>Statistical significance calculation</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Calculate if changes make a statistically significant impact</td>
        </tr>
       <tr>
            <td><strong>Split testing</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Split participants into groups</td>
        </tr>
       <tr>
            <td><strong>Multivariate (A/B/n) testing</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Test multiple variants of a change</td>
        </tr>
       <tr>
            <td><strong>Recommended run time</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Calculate the recommended run time for your experiments</td>
        </tr>
       <tr>
            <td><strong>Namespaces</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Avoid conflicts by assigning all users to a namespace</td>
        </tr>
       <tr>
            <td><strong>Visual editor</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Create and edit experiments in your app</td>
        </tr>
       <tr>
            <td><strong>Statistics engine</strong></td>
            <td className="text-center">Bayesian</td>
            <td className="text-center">Bayesian, Frequentist</td>
            <td>How the success of an experiment is calculated</td>
        </tr>
    </tbody>
</table>
</div>

- **Recommended run time:** PostHog automatically calculates a recommended run time based on past data and minimally acceptable improvements. This helps you avoid the [peeking problem](/blog/ab-testing-mistakes) and end your experiment at the right time.

![Recommended run time calculator](../images/blog/posthog-vs-growthbook/runtime.png)

- **Visual editor:** GrowthBook’s visual editor is similar to PostHog’s [toolbar](/docs/toolbar). It enables you to select an element to modify using an A/B test. The editor is limited to server-side rendered apps.

- **Frequentist engine:** GrowthBook has an additional statistical analysis option. It enables you to compare the control with the experiment using p-values and confidence intervals.

### Reporting and analytics

GrowthBook offers no reporting or analytics tools other than the ability to query experiment reports with SQL. As a result, GrowthBook forces users to rely on external event tracking and visualization tools. 

PostHog provides all the visualizations and product tools for evaluating the success of your features and app. These include trends, funnels, retention, SQL querying, and session replays integrated with your flags and A/B testing data. This enables you to do deeper analysis of their impact and combine them with other product and usage data.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>PostHog</strong></td>
            <td><strong>GrowthBook</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
       <tr>
            <td><strong>Analytics</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Capture usage and calls related to flags</td>
        </tr>
       <tr>
            <td><strong>Experiment reports</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Show the results of an experiment</td>
        </tr>
       <tr>
            <td><strong>Trends</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Graphs of flag usage</td>
        </tr>
       <tr>
            <td><strong>Funnel visualization</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Analyze impact of flags on funnels</td>
        </tr>
       <tr>
            <td><strong>Retention</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>User retention related to flags</td>
        </tr>
       <tr>
            <td><strong>Breakdowns</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Breakdown reports by properties</td>
        </tr>
       <tr>
            <td><strong>Dashboards</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Multiple customizable insights for a flag</td>
        </tr>
       <tr>
            <td><strong>Non-flag data</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Combine flag data with other product data</td>
        </tr>
    </tbody>
</table>
</div>

## Pricing

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td></td>
            <td className="text-center"><strong>PostHog</strong></td>
            <td className="text-center"><strong>GrowthBook</strong></td>
        </tr>
    </thead>
    <tbody>
       <tr>
            <td><strong>Pricing</strong></td>
            <td className="text-center">Per request</td>
            <td className="text-center">Seat-based</td>
        </tr>
       <tr>
            <td><strong>Free plan</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
       <tr>
            <td><strong>Free experiments</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
       <tr>
            <td><strong>Free collaboration</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center">3 seats free, then $20/seat/month</td>
        </tr>
       <tr>
            <td><strong>Fully transparent</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
        </tr>
    </tbody>
</table>
</div>

PostHog’s [feature flag pricing](/pricing?product=feature-flags) is pay-per-request (and A/B tests use feature flags). There is a generous free tier of 1M requests per month with all features, add-ons, and integrations available.

![Pricing](../images/blog/posthog-vs-growthbook/pricing.png)

Like PostHog, GrowthBook is free to self-host. GrowthBook Cloud is a seat-based model. It is free for up to 3 users, then $20/user/month. They claim this provides "unlimited traffic," but in reality, the limit is 10M requests per month, after which you need an enterprise plan.

![Growthbook](../images/blog/posthog-vs-growthbook/growthbook.png)

Features, like flag scheduling, permissions, custom fields, and the visual editor are only available on the GrowthBook Pro paid plan. 

#### Example scenarios

To give you an idea of what pricing looks like in reality, here are some example situations and their estimated costs for both PostHog and GrowthBook. 

> **Note:** GrowthBook does not display their Enterprise pricing needed to go beyond 10M requests per month.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
       <tr>
            <td><strong>Seats</strong></td>
            <td><strong>Requests</strong></td>
            <td><strong>PostHog cost</strong></td>
            <td><strong>GrowthBook cost</strong></td>
        </tr>
    </thead>
    <tbody>
       <tr>
            <td>3</td>
            <td>1,000,000</td>
            <td>$0</td>
            <td>$0</td>
        </tr>
       <tr>
            <td>5</td>
            <td>2,000,000</td>
            <td>$100</td>
            <td>$100</td>
        </tr>
       <tr>
            <td>15</td>
            <td>4,000,000</td>
            <td>$300</td>
            <td>$300</td>
        </tr>
       <tr>
            <td>20</td>
            <td>15,000,000</td>
            <td>$1400</td>
            <td>??? (Enterprise)</td>
        </tr>
    </tbody>
</table>
</div>

> **Notes:** 
> - Using [backend local evaluation](/docs/feature-flags/common-questions#backend-sdks) in PostHog lowers the amount of flag usage depending on the polling duration and active number of servers. If you use locally evaluated flags with one server polling every 30 seconds, this amount is under 1M requests (free). 
> - PostHog has volume discounts on flags over 2 million requests per month.

### Integrations

GrowthBook has integrations with data warehouses and analytics tools they rely on, but little beyond that. PostHog has a wider range of integrations. 

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>PostHog</strong></td>
            <td><strong>GrowthBook</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Exports</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Export data to other sources</td>
        </tr>
        <tr>
            <td><strong>Imports</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Import data from sources</td>
        </tr>
        <tr>
            <td><strong>Slack</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Alerts for Slack</td>
        </tr>
        <tr>
            <td><strong>Teams</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Alerts for Microsoft Teams</td>
        </tr>
        <tr>
            <td><strong>Zapier</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Trigger Zapier automations</td>
        </tr>
        <tr>
            <td><strong>Sentry</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Connect to Sentry data</td>
        </tr>
        <tr>
            <td><strong>Datadog</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Capture flag data in Datadog</td>
        </tr>
    </tbody>
</table>
</div>

PostHog’s event-based structure enables you to import data from anywhere for use with flags and experiments. The free API enables you to connect, edit, and capture from anywhere too. For example, you can import data from [warehouses](/docs/data-warehouse), [no-code site builders](/tutorials/webflow-ab-tests), [Segment](/docs/cdp/segment), and more.

### Security and compliance

Both PostHog and GrowthBook enable companies to remain secure and compliant with privacy regulations. Companies can customize the levels of user privacy related to these platforms to their needs. 

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>PostHog</strong></td>
            <td><strong>GrowthBook</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
       <tr>
            <td><strong>User privacy options</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Anonymize users, drop personal data</td>
        </tr>
       <tr>
            <td><strong>History, audit logs</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center">Enterprise</td>
            <td>Manage and view flag edits and related users</td>
        </tr>
       <tr>
            <td><strong>GDPR ready</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Can be compliant with GDPR</td>
        </tr>
       <tr>
            <td><strong>SOC2</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>SOC 2 security certification</td>
        </tr>
       <tr>
            <td><strong>2FA</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Enforce login with two-factor authentication</td>
        </tr>
       <tr>
            <td><strong>SAML/SSO</strong></td>
            <td className="text-center">Enterprise</td>
            <td className="text-center">Enterprise</td>
            <td>Use SAML or single sign-on authentication</td>
        </tr>
    </tbody>
</table>
</div>

## Frequently asked questions

### Who is PostHog useful for?

PostHog is built for startups and their engineers. It provides all the tools startups need to build successful products. The people who find PostHog most useful are founders, [product engineers](/blog/what-is-a-product-engineer), and growth engineers.

Companies that use PostHog feature flags and experiments include [Y Combinator](/customers/ycombinator), [Vendasta](/customers/vendasta), and [AssemblyAI](/customers/assemblyai).

### Who is GrowthBook useful for?

Larger organizations that want their feature flag and experimentation tools use GrowthBook. They often already set up data warehouses and analytics tools. GrowthBook is an added piece to their toolkit. In these organizations, it is used by a combination of engineering, data, and product teams.

Companies that use GrowthBook include Patreon, Deezer, and Pepsi.

### How much does PostHog cost?

Feature flags and experiments are free for up to 1M requests per month. Beyond that, it costs $0.0001/request (or $1 per 10,000 requests). There are discounts for high-volume users, non-profits, and [startups](/startups).

Other products, like product analytics and session replay, have separate but similarly structured pricing.

### How much does GrowthBook cost?

GrowthBook, like PostHog, is free to self-host. This doesn’t count infrastructure, implementation, or maintenance costs.

GrowthBook Cloud is free for up to 3 users and 10M requests per month. Its "Pro" plan is $20/seat/month and provides access to premium features. They also have an Enterprise plan that adds more security and compliance tools as well as a higher request limit. 

### Does GrowthBook or PostHog offer free trials?

GrowthBook is free to self-host and has a free cloud tier with unlimited flags and experiments for up to 3 users.

PostHog lets you use all its features for free. Once you upgrade to paid, you get 1M flag requests, 1M events, and 15,000 recordings for free each month. If your usage stays below this, PostHog remains free.

### How long does it take to implement PostHog?

Feature flags and experiments are simple. They are a few lines of code in any of your favorite languages. They can even be set up on no-code site builders like [Framer](/tutorials/framer-analytics) or [Webflow](/tutorials/webflow-ab-tests).

The process requires signing up for PostHog, installing the snippet or SDK in your app, creating the flag in PostHog, and implementing the flag evaluation and relevant logic in your app. Many of the SDKs handle important aspects like local evaluation and event capture for you.

You can reuse the PostHog implementation, like user identification, across products. Because PostHog is an all-in-one platform, analytics capture for targeting and A/B testing results doesn’t need set up or connection either.

### How long does it take to implement GrowthBook?

The basic GrowthBook implementation is relatively similar to PostHog.  The need to define data twice as well as integrate external tools makes it longer.

To implement GrowthBook from scratch:

- Sign up or self-host.
- Create an SDK endpoint, install the SDK in your app, and initialize the SDK.
- Set up target attributes in-app and define them in GrowthBook.
- Set up an analytics tool to track events and integrate it with GrowthBook.
- Connect your data source (warehouse) and write SQL to configure it.
- Create a feature flag or experiment. Set up tracking metric(s) using SQL. Implement related logic in-app.

Although GrowthBook provides templates for integrating external tools, this whole process takes longer than PostHog.

<ArrayCTA/>