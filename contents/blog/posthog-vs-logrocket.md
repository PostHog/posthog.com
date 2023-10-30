---
date: 2023-03-15
title: PostHog vs LogRocket
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/posthog-vs-logrocket/posthog-vs-logrocket.jpg
featuredImageType: full
author:
    - joe-martin
category: General
tags:
    - Comparisons
---

LogRocket is a frontend monitoring platform which, like PostHog, combines multiple tools into one platform. In this article we’ll explain some of the biggest similarities and differences between PostHog and LogRocket, but here’s the short version:

- LogRocket focuses on helping frontend developers detect and solve issues. It offers tools such as session recording, analytics, and performance monitoring.

- PostHog is an all-in-one platform that helps teams build better products. It includes many of the same tools as LogRocket, including session recording, analytics and performance monitoring — but also extends to feature flags, A/B testing and more.

In this article, we will:

- Compare PostHog and LogRocket’s core features
- Examine PostHog and LogRocket’s library support
- Discuss what integrations are available with other tools
- Explore other frequently asked questions about PostHog and LogRocket

## How do PostHog and LogRocket differ?

### 1. PostHog does more than frontend monitoring

PostHog goes beyond frontend monitoring by augmenting product analytics and session recording with powerful product and data tools, such as feature flags, A/B testing, and SQL querying. While LogRocket’s focus on the frontend means it offers a few specialist features, PostHog offers greater value and is more widely useful for the majority of teams and organizations

### 2. PostHog is open source and transparent

PostHog is built with transparency at its core. Not only do we work in the open and give full access to [our source code](https://github.com/PostHog/posthog), we also enable others to [build integrations](/docs/apps/build) or [other services on top of PostHog](/blog/how-we-built-an-app-server), open their own PRs, or give feedback on [our roadmap](/roadmap). PostHog's open app framework makes it easy to integrate internal tools, an advantage closed-source products like LogRocket can't offer.

### 3. PostHog constantly ships new features

At PostHog, we ship weirdly fast. We update [our changelog](/blog/posthog-changelog) with a recap of new features every week, and often there’s even more in beta testing. And that’s without counting all the apps and integrations submitted by our community! We work hard to keep PostHog on the cutting edge and we’re transparent about the ways we do that.

## PostHog and LogRocket feature comparison

PostHog offers a much wider selection of tools than LogRocket, including several tools that are helpful to frontend developers — such as feature flags, and experimentation. PostHog is also entirely open source, meaning that it offers far greater transparency than LogRocket. You can even develop your own PostHog apps!

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
          <td className="w-3/12"></td>
            <td><strong>LogRocket</strong></td>
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
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
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
            <td><strong>User surveys</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Ask users for qualitative feedback and gather responses</td>
        </tr>
        <tr>
            <td><strong>Experiments</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Test changes and analyze impact</td>
        </tr>
        <tr>
            <td><strong>Heatmaps</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track where users click</td>
        </tr>
        <tr>
            <td><strong>Event pipelines</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Push and pull data to enrich customer profiles</td>
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

-   **Feature flags:** PostHog offers robust, multivariate feature flags which support JSON payloads. This enables you to push real-time changes to your product without needing to redeploy. Visit [our feature flag page](/product/feature-flags) for more information. LogRocket doesn’t have any in-built feature flag functions.

-   **Experiments:** PostHog offers multivariate experimentation, which enables you to test changes and discover statistically relevant insights. Visit [the experimentation page](/product/experimentation-suite) for more information. LogRocket doesn’t have any in-built experimentation features.

-   **Open source:** PostHog is entirely open source, under a permissive MIT license. The biggest advantage for users is the ability to build on top of PostHog and to access the source code directly. [Our team also works in the open](/handbook/company/culture). LogRocket is not an open source company, nor is the product available under an open source license.

<ArrayCTA />

### Product analytics

While LogRocket contains some product analytics features, it isn’t primarily intended as an analytics platform and lacks many features that product managers and engineers may require. PostHog is a more capable product analytics platform, offering advanced features such as correlation analysis.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
			<td className="w-3/12"></td>
            <td><strong>LogRocket</strong></td>
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
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
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
            <td><strong>Query editor</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center">Coming Q1 2023</td>
            <td>Write your own queries in SQL</td>
        </tr>
    </tbody>
</table>
</div>

-   **Correlation analysis:** This feature enables you to [automatically find correlated events or properties](/manual/correlation) which affect the conversion rate of users within a funnel. LogRocket doesn’t offer any such automated correlation discovery, meaning users must search for correlating factors manually and without assistance.

-   **Query editor:** LogRocket doesn’t currently support any way for users to interrogate data directly, either through SQL or other, abstracted query language. PostHog also doesn’t offer SQL queries... but [we’re actively working on it](/manual/hogql).

> **Further reading:** [How LogRocket compares to other PostHog alternatives](/blog/posthog-alternatives)

### Session replays

LogRocket and PostHog both offer robust, full-featured session replay tools that outperform even dedicated tools, such as [Hotjar](/blog/best-open-source-session-replay-tools). LogRocket’s session replay tool offers a handful of extra features, such as mobile recording, though PostHog is actively working on developing these.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>LogRocket</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Desktop app recordings</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Capture recordings from single-page apps</td>
        </tr>
        <tr>
            <td><strong>Mobile app recordings</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Capture recordings in iOS and Android apps</td>
        </tr>
        <tr>
            <td><strong>Identity detection</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Link recordings to user IDs</td>
        </tr>
        <tr>
            <td><strong>Console logs</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Capture extra content from a users’ browser environment</td>
        </tr>
        <tr>
            <td><strong>Playlists</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Sort recordings into static and dynamic playlists</td>
        </tr>
        <tr>
            <td><strong>Performance monitoring</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track network events within a session</td>
        </tr>
        <tr>
            <td><strong>Privacy masking</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Censor personal information from playback</td>
        </tr>
        <tr>
            <td><strong>Conditional recording</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Only capture the sessions you want</td>
        </tr>
        <tr>
            <td><strong>Export recordings</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Take recordings in/out of the platform</td>
        </tr>
    </tbody>
</table>
</div>

-   **Mobile app recordings:** PostHog does not currently offer recordings for mobile apps, but it is something we’re actively working on. Check [our roadmap](/roadmap) for more info!

### Heatmaps and click tracking

LogRocket’s heatmap and click tracking functionality exceeds PostHog’s and enables you to visualize more precisely how users interact with your site at the aggregate level. PostHog’s [toolbar](/manual/toolbar) focuses on visualizing clicks, and enabling users to [quickly track such events within product analytics](/tutorials/toolbar).

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
			<td className="w-3/12"></td>
            <td><strong>LogRocket</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Heatmaps</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Visualize cursor movements on a page</td>
        </tr>
        <tr>
            <td><strong>Clickmaps</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Visualize where users click on a page</td>
        </tr>
        <tr>
            <td><strong>Scrollmaps</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Visualize how far down a page users scroll</td>
        </tr>
        <tr>
            <td><strong>Eyetracking</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Visualize precisely where users are looking on a page</td>
        </tr>
    </tbody>
</table>
</div>

**Toolbar:** PostHog’s heatmap functionality (technically, clickmapping) is accessed via the [toolbar](/manual/toolbar). It enables you to visualize clicks as an overlay on a live page, but also enables you to quickly create events and actions which can be analyzed using PostHog’s analytics features.

## Tracking & SDKs

**Tl;dr:** Both PostHog and LogRocket support a broad range of tracking options and libraries, and manual event instrumentation, as well as autocapture.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>LogRocket</strong></td>
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

> ### Should you autocapture events?
>
> LogRocket and PostHog both support manual instrumentation, as well as autocapture. Autocapture is much faster to setup, but some argue that it creates too much noise to be useful. We disagree, and it’s why PostHog gives you your first million events for free, every month — so you can capture events freely. [It’s something we feel quite strongly about](/blog/is-autocapture-still-bad).

### Library support

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>LogRocket</strong></td>
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
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
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

> ### PostHog library support
>
> PostHog supports a wide range of client and server libraries, but not all features are equally available across all of them. We recommend using PostHog's JavaScript snippet to enjoy all our features. See [our client library documentation](/docs/integrate?tab=snippet) for more information.

<ArrayCTA />

## Integrations and extensions

Both PostHog and LogRocket are capable of integrating with third-party tools in a variety of ways. This enables you to accomplish tasks such as exporting data to another platform, importing data for analysis, or enabling two-way communication between the tools.

[PostHog offers more than 50 integrations and apps](/apps), while [LogRocket offers slightly fewer](https://logrocket.com/features/integrations).

As an open source software, PostHog welcomes contributions from the community. If an integration you need isn’t available, [it’s possible to create it](/docs/apps/build)!

### Data pipelines

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>LogRocket</strong></td>
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
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
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
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Export data to Snowflake database</td>
        </tr>
        <tr>
            <td><strong>Google BigQuery</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
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

> **Want more?** For a full list of PostHog’s available integrations, please [check the app directory](/apps).

### Popular integrations 

Below, we've listed a few of the most popular integrations used across PostHog and LogRocket. 

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>LogRocket</strong></td>
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
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
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

### Site apps

PostHog’s extensions also include [site apps](/tutorials/build-site-app), which enable you to easily add frontend components to your site — something that isn’t possible with LogRocket.

Some examples of PostHog’s site apps include:

-   **[User Notifications](/apps/notification-bar):** Display a site banner to alert users about important information.

-   **[Schedule interviews](/apps/user-interview):** Target different types of users to receive Calendly notification, so you can arrange feedback calls.

-   **[In-app prompts](/apps/feedback-widget):** Display in-app prompts which ask for written feedback, or bug reports.

-   **[Raining Pineapples](/apps/pineapple-mode):** Sometimes you just want it to rain Pineapples. You’re welcome.

## Collaboration

PostHog provides multiple ways for users to share information with their teams, or to set up notifications for important events. Depending on the collaboration tools you use already, it may even be possible to integrate with PostHog directly.

LogRocket does not offer as many ways to share information with external parties, though does still provide details role-based permissioning for users across multiple projects.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>LogRocket</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>User permissions</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Control user roles and levels of access</td>
        </tr>
        <tr>
            <td><strong>Public dashboards</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Make dashboards available without login</td>
        </tr>
        <tr>
            <td><strong>Dashboard subscriptions</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Receive regular alerts about new data</td>
        </tr>
        <tr>
            <td><strong>Embeddable dashboards</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Embed dashboards in other pages</td>
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
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Receive notifications about new data</td>
        </tr>
    </tbody>
</table>
</div>

## Compliance

Regulatory compliance can be make-or-break for many teams, especially those operating in fields such as healthcare or the financial sector. Luckily, LogRocket and PostHog both offer a variety of ways to comply with such regulations.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>LogRocket</strong></td>
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

-   How much does LogRocket cost?
-   How much does PostHog cost?
-   Do LogRocket and PostHog offer free trials?

Got another question? You can [ask the PostHog team anything you want](/questions)!

### How much does LogRocket cost?

LogRocket has a complex pricing structure which isn’t fully transparent. Although it offers a free trial, this is limited to only 1,000 sessions per month. Beyond this, subsequent product tiers begin at $99 USD per month, depending on usage. This version does not include access to many features, such as product analytics.

More feature-rich product tiers begin at $550 USD per month, but increase depending on how many session are captured — and the per session cost is not clear. Pricing for the full version of LogRocket is not publicly available.

### How much does PostHog cost?

PostHog has transparent pricing based on usage. It’s free to get started and completely free for the first 1 million events and 15,000 sessions captured every month.

After this free monthly allowance you'll pay $0.00031/event and $0.005/recording, and PostHog charges progressively less the more you use. Volume, non-profit and [startup discounts](/startups) are available upon request, and we recommend trying [our pricing calculator](/pricing) to estimate your pricing.

### Do LogRocket and PostHog offer free trials?

LogRocket offers a free version of its basic product, which is limited to only 1,000 session captures per month. 14-day free trials are also available for other product tiers, after which users must pay to continue usage.

With PostHog, it’s free to get started and all users get their first 1 million events and 15,000 sessions for free, every month. Billing limits can be used to keep usage beneath this allowance, enabling you to use PostHog for free indefinitely.

<ArrayCTA />
