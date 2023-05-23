---
date: 2023-05-23
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

PostHog and FullStory are both powerful tools for understanding user behavior and improving your digital product, but there are several important differences between them. Want to cut to the chase? Here’s the short answer.

- **PostHog** is an all-in-one product improvement platform built primarily for engineers and technical users. It offers a wide range of features to help teams build better products, including analytics, feature flags, session replays, and more. It’s also entirely open-source. 

- **FullStory** is primarily a session replay tool focused on helping product managers and UX specialists to understand more about how their users interact with product UI. 

In this comparison, we'll explore, compare and contrast PostHog and FullStory in detail, so you can decide which tool is right for you. We’ll look at areas such as…

- [Core features and who PostHog and FullStory are built for](#core-feature-comparison)
- [Product analytics capabilities and how these features connect to others](#product-analytics)
- [Session replays, performance monitoring and privacy protection](#session-replays)
- [Heatmaps, clickmaps and scrollmaps](#heatmaps-clickmaps-and-scrollmaps)
- [Integrations with other software, and PostHog’s app platform](#apps-integrations-and-plugins)
- [Event tracking and data management](#event-tracking)
- [Privacy, security and compliance](#security-and-compliance) 
- [Other frequently asked questions](#frequently-asked-questions)

### How is PostHog different from FullStory?
Before delving into the weeds, it’s worth understanding how PostHog is built for a different audience than FullStory and why it has a broader feature set. 

#### PostHog is an all-in-one product improvement platform
While FullStory includes a few additional features, it is mostly focused on being a session replay tool, while PostHog has a much wider scope. That’s because PostHog is intended to be an all-in-one platform and can easily replace an entire stack of traditionally disparate tools, such as LaunchDarkly, Amplitude, and FullStory.  

#### PostHog is for engineers, technical users, _builders_
PostHog has been designed from the ground up to meet the needs of developers and product-focused engineers. This is reflected not only in the scope of the features, but also the documentation and platform architecture. For example, PostHog offers advanced tools for debugging user issues within session replays. 

#### PostHog is open source
As an open source platform, PostHog is almost entirely transparent. You can check out the PostHog repo to monitor code changes, build your own features and apps, and even interact with the team directly. FullStory, on the other hand, is entirely closed source.

<ArrayCTA /> 

### PostHog and FullStory pricing
Both PostHog and FullStory offer three main pricing tiers, but how these tiers differ is actually quite different. 

**PostHog** has a simple free tier with a limited feature set and a generous allowance of 1 million free events and 15,000 free sessions each month, after which users move to a more full featured paid plan which is billed based on usage. The third tier is an enterprise add-on, which expands the feature set further with the permissioning and privacy tools needed by large organizations.

>  Check [PostHog’s pricing page](/pricing) to find out more about what’s included in each tier, or to see how per-event pricing scales.

**FullStory**, on the other hand, offers only three premium, paid-for tiers, which differ in available features. The basic Business plan offers minimal features and a limited 14-day trial, while the following Advanced and Enterprise plans increase the feature scope and, presumably, cost. 

We say ‘presumably’ because FullStory’s pricing isn’t transparent and there’s no way to know exactly how much each tier costs. At PostHog, that’s [an approach we strongly disagree with](/blog/transparent-enterprise-pricing). 

In order to offer a straightforward comparison of PostHog and FullStory, we’ll focus this article on the _enterprise_ versions of both products — that is, the most feature-complete tiers. In this way we can clearly establish the features which both products do or do not have without getting bogged down in what features are available on each tier. 

> If a particular feature is critically important to you, we strongly advise checking the details of FullStory’s pricing, as not all features are equally available and pricing is not transparent.

### Core feature comparison

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
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
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

- **Product analytics:** Both FullStory and PostHog offer product analytic features, but while both can tick this box broadly there’s a drastic difference in the implementation for these features. We’ll therefore explore this comparison in greater detail below. 

- **Apps/Integrations:** While both FullStory and PostHog offer standard integrations between themselves and other platforms — for example, for sending data to Salesforce — PostHog also gets a step further. On PostHog, users can additionally build their own apps on top of the platform, including site apps which can be used to inject surveys, messages and prompts into a product. We’ll explore this in more detail below, or you can [check the PostHog app library](/apps) for more info. 

### Product Analytics

PostHog and FullStory are ultimately positioned for different types of users, and this is reflected in the scope of their analytics offering. While FullStory is aimed most squarely at UI designers and general product managers, PostHog is suited to product engineers, front-end developers and more technical users. As a result, PostHog offers a wider range of analytics tools, including [its own SQL dialect for detailed analysis](/docs/product-analytics/hogql).

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

Product analytics tools in PostHog are closely integrated with other tools, such as feature flags and session replays. You can, for example, use a Trends insight to examine the performance of a particular metric and, by clicking on a point in the graph, see a sample of the persons who have contributed to it. You can even jump directly to their session replays to see the event as it occurs. 

If you prefer, you can also do this in reverse by filtering for session replays where particular events occur and creating dynamic playlists. We cover these session replay features in greater depth below. 

> **PostHog ships weirdly fast.** New features ship very regularly, so to keep up to date with our latest updates check [the weekly changelog](/blog/changelog). Or, take a look at what we’re planning in [our public roadmap](/roadmap)!

### Session replays

Both PostHog and FullStory include session replay tools, but the same difference as before is also true here. FullStory is _primarily_ a session replay tool, while PostHog has a much broader vision. As a result of its speciality in this area FullStory has some additional features over PostHog — though the gap isn’t as large as you may think…

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
            <td><strong>Desktop app replays</strong></td>
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
            <td>Generate a short link for sharing.</td>
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
            <td className="text-center">1 month</td>
            <td className="text-center">3 weeks</td>
            <td></td>
        </tr>
        <tr>
            <td><strong>Free replay allowance</strong></td>
            <td className="text-center">No free allowance</td>
            <td className="text-center">15,000 sessions each month</td>
            <td></td>
        </tr>
    </tbody>
</table>
</div>

FullStory’s complex, opaque plan-based pricing requires two important caveats:

1. Data retention on FullStory can be increased with more expensive plans.
2. FullStory does offer 5,000 free sessions on its free trial, but lasts only 14 days before changing to a premium Business plan.

Beyond this, PostHog and FullStory are roughly comparable even in spite of FullStory’s near-exclusive focus on session replays as a feature. A major exception is PostHog’s lack of mobile app recording features, but [we’re working on it](/roadmap).

### Heatmaps, clickmaps and scrollmaps
While technically a different feature in PostHog, heatmaps are nevertheless closely associated with session replays because they function as a way to aggregate the same level of data. Using different types of heatmaps, you can see where users are focusing their attention — or even precisely where they are looking on a page.

PostHog’s heatmaps are, admittedly, a nascent function of [the toolbar](/docs/product-analytics/toolbar) and can only help you to visualize where users are clicking on a page. They cannot currently surface where a user scrolls to on a page, nor track cursor movements. 

FullStory, on the other hand, offers many of these features and is inarguably a better heatmapping tool. We feel that clickmaps offer all the essential information — especially when working in conjunction with session replays and product analytics — but, if scrollmaps are essential for you then FullStory is the better tool for the job.

PostHog’s toolbar can be made to [look like a hedgehog though](/blog/posthog-changelog#hedgehog-toolbar), which is nice. 

<ArrayCTA />

### Apps, integrations and plugins
Apps are a major point of difference for PostHog and FullStory because, while both have the ability to integrate with other platforms, PostHog also offers the ability to inject code into your site (we call these [site apps](/tutorials/build-site-app). Some of the site apps which are available include:

- **[NPS surveys](/apps/nps-survey-app)** for tracking your word of mouth growth. 
- **[Interview scheduler](/apps/user-interviews)** for scaling product feedback.
- **[In-app prompts](/apps/notification-bar)** for building tutorials and content flows.
- **[Notification banners](/apps/notification-bar)** to tell users about important messages.
- **[Raining pineapples](/apps/pineapple-mode)**, just in case.

PostHog is also open source, meaning [users can easily create their own apps](/tutorials/build-your-own-posthog-app). It’s so easy to create your own apps in PostHog in fact that some of the apps we already offer have been developed by non-engineers! 

Both PostHog and FullStory offer integrations with over 50 different platforms, so rather than comparing each and every one, we’ve listed some of the most popular apps below. 

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
            <td><strong>Shopify</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
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
            <td><strong>PagerDuty</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Receive customized alerts from insights</td>
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

Both PostHog and FullStory support a broad range of tracking options and libraries, and manual event instrumentation, as well as autocapture. Should you use autocapture? ~It’s complicated~ Yes. 

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

> ### Should you autocapture events?
>
> Autocapture is much faster to setup than manual instrumentation, but some argue that it creates too much noise to be useful. We disagree, and it’s why PostHog gives you your first million events for free, every month — so you can capture events without having to worry about tracking limits. [It’s something we feel quite strongly about](/blog/is-autocapture-still-bad).

### Security and compliance
For some type of organization regulatory compliance can be an essential concern — and security is worth thinking about even when it’s not a legal requirement. Luckily, both FullStory and PostHog have robust features for protecting user privacy. However, only PostHog is open source to the extent that you can create your own apps to add extra functionality if needed!

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

### Frequently asked questions

#### Do PostHog and FullStory offer free trials?

It doesn’t cost anything to get started with PostHog, and every month we give user their first million events _and_ their first 15,000 sessions for free. As a result, there’s no need for a free trial — you can get started, start tracking and use billing limits to stay within the free allowance. Forever. 

FullStory offers a 14-day free trial which is limited to only 5,000 sessions. After this, it defaults to a premium Business plan. 

#### Does session replay capture personal information?

Both PostHog and FullStory offer privacy masking to automatically remove text field input from session replays, as well as more advanced controls to further protect user privacy. 

#### What are the alternatives to PostHog and FullStory?

Some other popular session replay tools include [HotJar](/blog/posthog-vs-hotjar) and [LogRocket](/blog/posthog-vs-logrocket). For more information on how PostHog compares to these, check [the session replay page](/session-replay). 
