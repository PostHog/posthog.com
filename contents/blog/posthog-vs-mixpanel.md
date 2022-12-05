---
date: 2022-12-05
title: PostHog vs Mixpanel
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/posthog-engineering-blog.png
featuredImageType: full
author: ["andy-vandervell"]
categories: ["Guides", "Comparisons"]
---

Want to know how PostHog and Mixpanel are different? If you remember nothing else, remember these two points:

1. Mixpanel is a product analytics tool.

2. PostHog is an all-in-one platform that _includes_ product analytics **and** a whole bunch more.

In this guide, we'll cover:

- Mixpanel and PostHog's [core features](#core-features)
- [Privacy and compliance](#privacy--compliance) on each platform
- How they track usage and [library support](#tracking--sdks)
- [Compare available integrations](#integrations) in multiple categories
- [Answer frequently asked questions](#frequently-asked-questions) about PostHog and Mixpanel

## How is PostHog different to Mixpanel?

### 1. PostHog does more than product analytics

Don't mistake us, product analytics is a core part of our platform, but it's just one cog in a suite of vital tools for product and data teams. When you adopt PostHog you also get session recording (with console logs), feature flagging, A/B and multivariate testing, and customizable data pipelines – all seamlessly integrated and with just one bill to pay. Don't want session recording? Just turn it off.

### 2. It's built for engineers

Anyone can use PostHog – just [ask our marketing team](/blog/posthog-vs-amplitude) – but it's designed for engineers first. We believe engineering-led companies are the future of tech and that future requires tools that let software engineers flex their product muscles. In building a platform [product engineers](/blog/what-is-a-product-engineer) love, we're also building a platform that gives data and marketing teams unrivaled insights.

### 3. We're an open book

PostHog is [built on transparency](/blog/how-to-run-a-transparent-company). Our product is open source and released under an MIT License. You can read [our source code](https://github.com/PostHog/posthog), raise your own issues and PRs, and [build apps atop PostHog](/blog/how-we-built-an-app-server) to support custom data flows. Anyone can read our [company handbook](/handbook) and [how we pay people](/handbook/people/compensation).

> This guide compares Mixpanel's self-serve Growth plan with PostHog Cloud. Features available on other plans are marked as such.

## Core Features

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
            <td>Understand conversion between events</td>
        </tr>
        <tr>
            <td><strong>Cohorts</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Compare groups of users based on user properties and events</td>
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
            <td><strong>Feature flags</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Roll out features safely; toggle features for cohorts or individuals</td>
        </tr>
        <tr>
            <td><strong>Session recording</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Watch users interact with your product; diagnose bugs</td>
        </tr>
        <tr>
            <td><strong>Experiments</strong></td>
            <td className="text-center">Enterprise</td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Test changes in production before rolling them out</td>
        </tr>
        <tr>
            <td><strong>Heatmaps</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track where users click and why</td>
        </tr>
        <tr>
            <td><strong>Group analytics</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Understand how organizations use your product</td>
        </tr>
        <tr>
            <td><strong>In-app guides</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Create in-app feature guides</td>
        </tr>
        <tr>
            <td><strong>NPS & surveys</strong></td>
			  <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-orange text-lg">⚠</span></td>
            <td>Create, report on surveys, gather feedback</td>
        </tr>
        <tr>
            <td><strong>Open source</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Build your own apps; contribute code</td>
        </tr>
    </tbody>
</table>
</div>

- **Experiments:** Mixpanel offers an experiments feature in its Enterprise plan, but it's limited to running simple A/B tests. Users on Mixpanel's Growth plan can integrate with third-party testing tools like AB Tasty or Convert and analyze results in Mixpanel. PostHog's experimentation suite supports A/B and multivariate tests using our integrated feature flagging.

- **Feature flagging:** Mixpanel doesn't have any built-in feature flag functionality, but there are official integrations for Flagsmith, GrowthBook, and others. See: [What are the benefits of an all-in-one platform?](anchor-link-here)

- **Correlation analysis:** When viewing a funnel in PostHog, [correlation analysis](/product/correlation-analysis) automatically suggests events and properties that correlate to success or failure – e.g. "people who converted were 10x more likely to versus people who dropped off". We use transparent, testable statistical models – no phony "AI" here. 

- **NPS & surveys:** PostHog doesn't have a built-in survey feature, but it's easy to [create your own surveys and send the results to PostHog for analysis](/tutorials/survey).

## Privacy & Compliance

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
            <td><strong>GDPR compliant</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>EU hosting or data residency available</td>
        </tr>
        <tr>
            <td><strong>HIPAA compliant</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Business Associate Agreement available</td>
        </tr>
        <tr>
            <td><strong>Data anonymization</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Remove personally identifiable information for privacy</td>
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

- **Self-hosting:** While we recommend most customers use PostHog Cloud, PostHog can be self-hosted on your own infrastructure so you keep control of all your data. This is useful for businesses that handle highly sensitive information, such as defense or health data, but it is more expensive than using PostHog Cloud. See: [Who should self-host PostHog?](#who-should-selfhost-posthog)

- **HIPAA compliance:** Both Mixpanel and PostHog will sign a Business Associate Agreement if you require HIPAA compliance, [subject to conditions](anchor-link-here). Self-hosting PostHog is also a popular option for companies handling personal health information.

- **Cookie-less tracking:** If you'd rather not serve annoying cookie banners to your users, PostHog can be configured to store data in memory so it doesn't persist beyond a single session. See: [How to use PostHog without cookie banners](/tutorials/cookieless-tracking). Note: some types of user analysis aren't possible with this method.

## Tracking & SDKs

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
            <td><strong>Event tracking</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track manually instrumented events</td>
        </tr>
        <tr>
            <td><strong>Event autocapture</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Automatically track events without instrumentation</td>
        </tr>
        <tr>
            <td><strong>Combined events</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track related events as a single trackable action</td>
        </tr>
        <tr>
            <td><strong>Reverse proxy available</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Send events from your own domain</td>
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
    </tbody>
</table>
</div>

### Why autocapture?

Mixpanel, like Amplitude, forces you to manually instrument every event you want to track. Got a question about something you're not already tracking? Tough luck, it's time to write new tracking code and wait for the data! 

Autocapture eliminates this tedious process. Just deploy our snippet and we'll do the hard work. In doing so, you're creating a powerful, retroactive dataset you can call upon whenever you need it. Autocapture is ideal for fast moving teams who want to ship code product improvements quickly. 

Some would have you believe that autocapture generates "too much data" that's hard to deal with. Our answer?

To quote Tony Stark: “An intelligence agency which fears intelligence is, historically, not awesome.”

[add diagram here based on Heap one]

### Client libraries

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
            <td><strong>JavaScript</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Recommended for full PostHog functionality</td>
        </tr>
        <tr>
            <td><strong>React Native</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>PostHog: Session recording not available</td>
        </tr>
        <tr>
            <td><strong>Flutter</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>PostHog: Event tracking and user identification only</td>
        </tr>
        <tr>
            <td><strong>iOS (Swift)</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>PostHog: Autocapture and session recording not available</td>
        </tr>
        <tr>
            <td><strong>iOS (Objective-C)</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>PostHog: Autocapture and session recording not available</td>
        </tr>
        <tr>
            <td><strong>Android</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>PostHog: Event tracking and user identification only</td>
        </tr>
        <tr>
            <td><strong>Unity</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Event tracking for game developers</td>
        </tr>
    </tbody>
</table>
</div>

- **JavaScript snippet:** All client libraries support event tracking and user identification for product analytics, but we recommend using PostHog's JavaScript snippet to enjoy all our features. Our iOS libraries also support feature flagging and group analytics. See our [client library documentation](/docs/integrate/client/snippet-installation) for more information.

- **Mobile app session recordings:** We don't currently support session recording in mobile apps, but it's currently under consideration as a project for our session recording team. See our [public roadmap](/roadmap) for more info.

- **Unity:** We don't have a Unity SDK yet but, just like Unity, we're open-source, so anyone can create one. See our [contribution guidelines](/docs/contribute) for more info.

### Server libraries

Some PostHog features, such as session recording and autocapture, are only available via our client-side libraries.

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
            <td><strong>Node.js</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>PostHog: Supports events, feature flags, user ID, and group analytics</td>
        </tr>
        <tr>
            <td><strong>Go</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>PostHog: Supports events, feature flags, user ID, and group analytics</td>
        </tr>
        <tr>
            <td><strong>Python</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>PostHog: Supports events, feature flags, user ID, and group analytics</td>
        </tr>
        <tr>
            <td><strong>Rust</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center">Alpha</td>
            <td>PostHog: Under development, not recommended for production</td>
        </tr>
        <tr>
            <td><strong>Java</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center">Beta</td>
            <td>PostHog: Support events and user ID</td>
        </tr>
        <tr>
            <td><strong>PHP</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>PostHog: Supports events, feature flags, user ID, and group analytics</td>
        </tr>
        <tr>
            <td><strong>Ruby</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>PostHog: Supports events, feature flags, user ID, and group analytics</td>
        </tr>
        <tr>
            <td><strong>Elixir</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>PostHog: Community maintained</td>
        </tr>
    </tbody>
</table>
</div>

## Admin & Security

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
            <td className="text-center">Coming Q4</td>
            <td>Externally audited security</td>
        </tr>
        <tr>
            <td><strong>SAML/SSO</strong></td>
            <td className="text-center">Enterprise</td>
            <td className="text-center">Enterprise</td>
            <td>Organization single sign-on</td>
        </tr>
        <tr>
            <td><strong>Access levels</strong></td>
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
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track multiple products and domains</td>
        </tr>
        <tr>
            <td><strong>Private projects</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center">Enterprise</td>
            <td>Create hidden projects with user permissions</td>
        </tr>
    </tbody>
</table>
</div>

- **PostHog Enterprise:** Our [Enterprise tier](/enterprise) includes single sign-on, private projects, and a dedicated Slack support channel.

## Integrations

Mixpanel claims over 50 official integrations covering a wide-range of use cases. Given its focus on product analytics alone, many of these integrations connect to third-party tools for A/B testing, feature flag, and marketing.

The [PostHog app store](/apps) has over 50 apps as well, though not all of these are integrations with external tools. PostHog doesn't natively connect with A/B testing or feature flag tools as these features are built into PostHog itself.

**Categories:**

- [Data Export](#data-export) 
- [Data Import](#data-import)
- [Dev Tools & Support](#dev-tools--support) 
- [Marketing & Sales](#marketing--sales)
- [Alerts & Automation](#alerts--automation)

### Data Export

Mixpanel and PostHog support a wide-range of export destinations.

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
            <td><strong>Export API</strong></td>
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
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Export data to S3 bucket</td>
        <tr>
            <td><strong>Azure Blob Storage</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
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
        <tr>
            <td><strong>Airbyte</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Extract and load data to external platforms</td>
        </tr>
        <tr>
            <td><strong>Fivetran</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Extract and load data to external platforms</td>
        </tr>
    </tbody>
</table>
</div>

### Data Import

Mixpanel natively supports more data sources. Up to now, our priority has been to make it easy to get data out of PostHog to where you need it to be. 

Please get in touch if you require a specific import source we don't currently support. Because we're open source, it's also possible to [build you own ingestion apps](/docs/apps/build) for edge cases. 

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
            <td><strong>Import API</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>API for importing data</td>
        </tr>
        <tr>
            <td><strong>Amazon Redshift</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Import data from Redshift for analysis</td>
        </tr>
        <tr>
            <td><strong>Amazon Kinesis</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Stream events from Amazon Kinesis stream</td>
        </tr>
        <tr>
            <td><strong>Amazon S3</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Ingest data from S3 bucket for analysis</td>
        </tr>
        <tr>
            <td><strong>Google Cloud Storage</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Ingest data from GCS bucket for analysis</td>
        </tr>
        <tr>
            <td><strong>Google Pub/Sub</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Import events from Pub/Sub topics</td>
        </tr>
        <tr>
            <td><strong>Snowflake</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Import Snowflake data for analysis</td>
        </tr>
        <tr>
            <td><strong>Snowplow</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Ingest events from behavioral data platform</td>
        </tr>
        <tr>
            <td><strong>Segment</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Ingest events tracked in Segment</td>
        </tr>
        <tr>
            <td><strong>RudderStack</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Ingest events tracked in RudderStack</td>
        </tr>
        <tr>
            <td><strong>mParticle</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Ingest events tracked in mParticle CDP</td>
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
    </tbody>
</table>
</div>

### Dev Tools & Support

As an open source platform designed for technical teams, PostHog integrates with numerous developer tools and platforms. This isn't an area of strong support for Mixpanel due to its focus on product managers and marketing teams.

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
            <td><strong>PagerDuty</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Create custom alerts based on thresholds</td>
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
            <td><strong>Zendesk</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track tickets as events, add context to tickets</td>
        </tr>
    </tbody>
</table>
</div>

### Marketing & Sales

Both platforms support a wide-range of sales and marketing tools to support automation flows and syncing of user data.

Mixpanel has a specific advantage in connecting to Google and Facebook's advertising platforms directly, enabling in-product tracking of campaign ROI. 

It's easy to track marketing conversions in PostHog, but you can't currently connect that directly to campaign spending data.

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
            <td><strong>Customer.io</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Sync data and trigger workflows in Customer.io</td>
        </tr>
        <tr>
            <td><strong>Hubspot</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Sync customer data to and from Hubspot</td>
        </tr>
        <tr>
            <td><strong>Engage</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Automate onboarding and retention messaging</td>
        </tr>
        <tr>
            <td><strong>Orbit</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track community metrics</td>
        </tr>
        <tr>
            <td><strong>Pace</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Identify enterprise sales leads</td>
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
            <td><strong>Twitter Follower Tracker</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track Twitter follower growth</td>
        </tr>
        <tr>
            <td><strong>Variance</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Define PQLs with real analytics data</td>
        </tr>
        <tr>
            <td><strong>Facebook Ads</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Track Facebook ad ROI</td>
        </tr>
        <tr>
            <td><strong>Google Ads</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Track Google ad ROI</td>
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
    </tbody>
</table>
</div>

### Alerts & Automation

Mixpanel and PostHog both support popular messaging apps and automation platforms, though PostHog also support Discord and the open-source Zapier alternative, n8n.

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
            <td><strong>Slack</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Send alerts and reports to Slack</td>
        </tr>
        <tr>
            <td><strong>Discord</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Send alerts and reports to Discord</td>
        </tr>
        <tr>
            <td><strong>Microsoft Teams</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Send alerts and reports to Teams</td>
        </tr>
        <tr>
            <td><strong>n8n</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Open source workflow automation</td>
        </tr>
        <tr>
            <td><strong>Twilio</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Automate SMS alerts on events</td>
        </tr>
        <tr>
            <td><strong>Zapier</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Automate workflows on events</td>
        </tr>
    </tbody>
</table>
</div>

## Frequently asked questions

### Who should self-host PostHog?

We recommend 95% of companies use [PostHog Cloud](/pricing) – it's fully-managed by us and you can choose [PostHog Cloud EU](/eu) if you need to keep data within the EU. The most common reasons for choosing to self-host PostHog are companies that handle very sensitive data, such as medical and or defense information. 

Enterprises looking to self-host will require an infrastructure team knowledgeable in Kubernetes and ClickHouse. Our [partner directory](/partners) includes third-party specialists who can support self-hosted deployments. Please [book a call](book-a-demo) to discuss your options and whether self-hosting is right for you.

- Why choose an open source platform?
- Why should I choose an all-in-one platform?

- What are the conditions for signing a BAA with PostHog?
