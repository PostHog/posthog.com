---
date: 2023-05-17
title: "In-depth: PostHog vs Hotjar"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/posthog-vs-hotjar/posthog-vs-hotjar.jpg
featuredImageType: full
author:
    - lior-neu-ner
category: General
tags:
    - Comparisons
---

Want to understand the difference between Hotjar and PostHog? Here's the short answer:

1. **Hotjar** is a user research tool that offers session replays, heatmaps, and tools for collecting feedback and scheduling customer interviews. It's built for marketers and user experience (UX) researchers.

2. **PostHog** is an all-in-one platform for building successful products. It includes product analytics, session replays, feature flags, in-app prompts, and more. It's built for engineers and product teams.

Now it's time for the long answer...

In this guide, we'll cover:

- [Hotjar and PostHog feature comparison](#core-features)
- [Session replays](#session-replays) 
- [Heatmaps](#heatmaps)
- [Product analytics](#product-analytics)
- [In-app messages and user research](#in-app-messages-and-user-research)
- [Apps and integrations](#apps-and-integrations)
- [Pricing](#how-much-does-hotjar-cost)

## How is PostHog different?

### 1. PostHog is an all-in one platform

Hotjar focuses mainly on session replays, heatmaps, and user research. That means you need to adopt additional tools for things like [product analytics](/product-analytics), [feature management](/feature-flags), and [A/B testing](/ab-testing). PostHog integrates all these features into one platform (in addition to [session replays and heatmaps](/session-replay)).

### 2. PostHog is built for engineers

PostHog integrates powerful features that aren’t available in Hotjar and which are designed for technical users, such as feature flags with JSON payloads, which enable you to trigger in-app messages, or other notifications. 

We built PostHog to support technically-savvy product managers and engineers – especially [engineers with a product focus in their role](/blog/what-is-a-product-engineer). Anyone can use PostHog ([just ask our marketing team](/blog/posthog-marketing)), but our primary goal is to give engineers the tools they need to ship impactful features at speed.

### 3. PostHog is open source

Because we build for engineers first, we're also open source. You can check out [PostHog’s source code](https://github.com/PostHog), [build integrations](/docs/apps/build) or [other services](/blog/how-we-built-an-app-server) on top of the product, and even [give feedback or interact with the team via GitHub](https://github.com/PostHog). Transparency, including transparent pricing, is one of our core values.

<ArrayCTA />

## Core features
<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
          <td className="w-3/12"></td>
            <td><strong>Hotjar</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Session replays</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Watch real users use your product.</td>
        </tr>
        <tr>
            <td><strong>Heatmaps</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Visualize where users click in your app or website.</td>
        </tr>
        <tr>
            <td><strong>Product analytics</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track events and conversion; analyze user behavior.</td>
        </tr>
        <tr>
            <td><strong>Feature flags</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Roll out features safely; toggle features for cohorts or individuals.</td>
        </tr>
        <tr>
            <td><strong>A/B testing</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Test changes and analyze impact.</td>
        </tr>
        <tr>
            <td><strong>In-app prompts and messages</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Send messages to users in your app.</td>
        </tr>
        <tr>
            <td><strong>Surveys</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Capture user feedback with surveys. </td>
        </tr>
        <tr>
            <td><strong>Customer interview scheduling</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>In-app widget for requesting customer interviews.</td>
        </tr>
        <tr>
            <td><strong>User interview recordings and transcriptions</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td></td>
        </tr>
        <tr>
            <td><strong>Apps</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Push and pull data to other destinations</td>
        </tr>
    </tbody>
</table>
</div>

- **Session replays:** [Session replays](/session-replay) in PostHog recreate exactly what real users see and how they use your product. They also enable you to debug problems using built-in [console logs](/docs/session-replay/manual#console-logs-recording), [performance monitoring](/tutorials/performance-metrics) and the [DOM explorer](/blog/posthog-changelog#experimental-dom-explorer-mode).

- **Feature flags:** PostHog includes [multivariate feature flags](/feature-flags) that support JSON payloads. Teams can use feature flags to offer different features or UI choices to users, to trigger in-app messages, and more.

- **A/B testing:** In PostHog, you can use the [experimentation suite](/ab-testing) to create multivariate tests within your product, such as showing some users a different page layout to others. Over time, you can build an understanding of which page performs better, correlate results with other events, and deploy a final version.


### Session replays

Session replays are an essential tool for understanding how people use your product, especially for [early-stage companies](/blog/early-stage-analytics) searching for product-market fit. 

> **Ready to learn more?** Find out [how Contra used PostHog's session replays](/customers/contra) to increase registrations by 30%. 

Both Hotjar and PostHog offer session replays:

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
			<td className="w-3/12"></td>
            <td><strong>Hotjar</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Free replay allowance</strong></td>
            <td className="text-center">~1k per month (max 35 per day) on Basic plan</td>
            <td className="text-center">15k per month.</td>
            <td></td>
        </tr>
        <tr>
            <td><strong>Price for first 50k sessions</strong></td>
            <td className="text-center">~$200 per month (max 1.5k sessions per day)</td>
            <td className="text-center">$175 per month.</td>
            <td></td>
        </tr>
        <tr>
            <td><strong>Browser app replays</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Watch real users use your product.</td>
        </tr>
        <tr>
            <td><strong>Connected to product analytics</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>View replays for specific users and events.</td>
        </tr>
        <tr>
            <td><strong>Console logs</strong></td>
            <td className="text-center">Only in Scale plan</td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Debug user problems and app errors.</td>
        </tr>
        <tr>
            <td><strong>Performance monitoring</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Monitor network activity and performance.</td>
        </tr>   
        <tr>
            <td><strong>iOS app replays</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center">Planned Q2 2023</td>
            <td>Record user sessions in iOS apps.</td>
        </tr>
        <tr>
            <td><strong>Android app replays</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center">Planned 2023</td>
            <td>Record user sessions in Android apps.</td>
        </tr>     
        <tr>
            <td><strong>Custom playlists</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Create playlists of related replays.</td>
        </tr>   
        <tr>
            <td><strong>Download replays</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Save replay files offline for storage.</td>
        </tr>
    </tbody>
</table>
</div>

- **Recording retention:** Hotjar keeps all replays for 365 days. PostHog retains all replays for three weeks, but retains replays saved to a playlist forever. PostHog also enables you to download replays as a `.json` file for safe keeping.

### Heatmaps

Heatmaps visualize user activity in your app. They use colors or numbers to show which parts of the page people are interacting with the most. Both Hotjar and PostHog offer heatmaps, although PostHog's offering is more limited:

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
			<td className="w-3/12"></td>
            <td><strong>Hotjar</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Click and tap heatmaps</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Show where users are clicking.</td>
        </tr>
        <tr>
            <td><strong>Move heatmaps</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Show where users have moved their mouse on the screen.</td>
        </tr>
        <tr>
            <td><strong>Scroll heatmaps</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Show how far down the page your users scroll.</td>
        </tr>
        <tr>
            <td><strong>Rage clicks</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Show where users repeatedly click in a short period of time.</td>
        </tr>
        <tr>
            <td><strong>Combine rage click data with product analytics</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>View related events and funnel data for users who rage click.</td>
        </tr>
        <tr>
            <td><strong>Heatmap data filters</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Filter heatmaps by date, country etc.</td>
        </tr>
    </tbody>
</table>
</div>

### Product analytics

Although product analytics is not a core focus for Hotjar, they do offer basic features, such as event tracking, funnels, and trend insights. However, these are **only available on Hotjar's Observe Scale plan**, and their offering is more limited than PostHog's:

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
			<td className="w-3/12"></td>
            <td><strong>Hotjar</strong></td>
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
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
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
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Inspect how users journey through your product.</td>
        </tr>
        <tr>
            <td><strong>Toolbar</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>View insights on your live website or app with an overlay.</td>
        </tr>
    </tbody>
</table>
</div>


### In-app messages and user research

Hotjar includes feedback widgets, surveys, and an integrated user research tool for gathering feedback from users. PostHog also offers user surveys, including the ability to customize the appearance of prompts to match your product.

PostHog also offers additional ways to communicate with your users, such as a [notification bar](/apps/notification-bar) and interactive [pop-ups](/tutorials/react-popups) through the use of [feature flag payloads](/docs/feature-flags/payloads), and [site apps](/tutorials/build-site-app). Also, since PostHog provides product analytics, you can easily define your target users who should see your widgets.

The main difference is, because Hotjar is designed for less technical users, it offers an interface that is simpler, but less powerful. You can easily create surveys and feedback widgets in Hotjar, but not other types of prompt such as a Calendly integration. In PostHog, it's possible to create such surveys easily.

Below, we've listed the different methods for communicating with and collecting user feedback in Hotjar and PostHog.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
	<td className="w-3/12"></td>
            <td><strong>Hotjar</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Collect text input</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Suggestion box on your site where users can express frustration or delight.</td>
        </tr>
        <tr>
            <td><strong>Schedule customer interviews</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Send users a link to schedule a feedback meeting.</td>
        </tr>
        <tr>
            <td><strong>Custom user targeting</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Define who should see your widgets with your own data.</td>
        </tr>
        <tr>
            <td><strong>Surveys</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Capture user feedback with surveys. </td>
        </tr>
        <tr>
            <td><strong>User interview recordings and transcriptions</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td></td>
        </tr>
        <tr>
            <td><strong>Notification bar</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Display a customized banner on your site.</td>
        </tr>
        <tr>
            <td><strong>In-app popups</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Highlight features in your app.</td>
        </tr>
    </tbody>
</table>
</div>

### Apps and integrations
Both Hotjar and PostHog have a wide selection of apps and integrations. Both also include integrations with tools such as Zapier, which enable you to move data to even more platforms.

One unique advantage of PostHog is that, because it is open source, it’s easy to [create your own apps and integrations](/tutorials/build-your-own-posthog-app). This is useful if you’re, for example, using niche software in your stack that hasn’t been widely adopted, or if you require a direct integration between PostHog and your product. 


Below, we've listed a few of the most popular integrations used across PostHog and HotJar. PostHog offers more than 50 apps, so for a full list of PostHog's integrations, please [check the app library](/apps).

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>Hotjar</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Hubspot</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Sync event and person data.</td>
        </tr>
        <tr>
            <td><strong>Salesforce</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Sync event and person data.</td>
        </tr>
        <tr>
            <td><strong>Zapier</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Export events for use in Zaps.</td>
        </tr>
        <tr>
            <td><strong>Stripe</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Sync customer and invoice data.</td>
        </tr>
        <tr>
            <td><strong>Slack</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Receive notifications about new data.</td>
        </tr>
        <tr>
            <td><strong>Discord</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Receive notifications about new data.</td>
        </tr>
        <tr>
            <td><strong>MS Teams</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Receive notifications about new data.</td>
        </tr>
        <tr>
            <td><strong>Intercom</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Extract and load data to external platforms.</td>
        </tr>
        <tr>
            <td><strong>Customer.io</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Sync data between platforms.</td>
        </tr>
        <tr>
            <td><strong>Sentry</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Ingest Sentry errors for analysis.</td>
        </tr>
        <tr>
            <td><strong>Segment</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Ingest events from Segment.</td>
        </tr>
    </tbody>
</table>
</div>

> **Want more?** Visit the [PostHog the app directory](/apps) for a full list of supported integrations.

## Privacy, compliance, and security

Regulatory compliance can be a critical need for many teams, especially if they operate in financial or healthcare industries. Regulations such as HIPPA and GDPR can require teams to store data in certain locations, or to protect data in certain ways. 

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>Hotjar</strong></td>
            <td><strong>PostHog</strong></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>SOC 2 certified</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Information security process audited</td>
        </tr>	    
        <tr>
            <td><strong>GDPR compliant</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>EU hosting or data residency available.</td>
        </tr>
        <tr>
            <td><strong>HIPAA compliant</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Business Associate Agreement available.</td>
        </tr>
        <tr>
            <td><strong>Data anonymization</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Remove personally identifiable information.</td>
        </tr>
        <tr>
            <td><strong>Cookie-less tracking option</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Use session replays and analytics without cookie consent banners</td>
        </tr>
    </tbody>
</table>
</div>

## Frequently asked questions
- [Who is Hotjar useful for?](#who-is-hotjar-useful-for)
- [Who is PostHog useful for?](#who-is-posthog-useful-for)
- [How much does Hotjar cost?](#how-much-does-hotjar-cost)
  - [Hotjar Observe features and pricing](#hotjar-observe-features-and-pricing)
  - [Hotjar Ask features and pricing](#hotjar-ask-features-and-pricing)
  - [Hotjar Engage features and pricing](#hotjar-engage-features-and-pricing)
- [How much does PostHog cost?](#how-much-does-posthog-cost)
- [Do Hotjar and PostHog offer free trials?](#do-hotjar-and-posthog-offer-free-trials)

Got another question? You can [ask the PostHog team anything you want](/questions)!

### Who is Hotjar useful for?

Hotjar is designed primarily for marketers and UX specialists. Its key features are the ability to record session replays and heatmaps. It also provides widgets for collecting feedback and tools for scheduling customer interviews. These provide insights into how customers are using your product. 

### Who is PostHog useful for?

PostHog is built primarily with engineers, product managers and other technical users in mind. It also offers the ability to record session replays, heatmaps, and create feedback widgets, but also offers a number of other tools that are useful for these types of teams, such as product analytics and feature flags. 

This difference is ultimately reflected in many of the features both platforms offer, and how they are designed. PostHog's focus on breadth and supporting engineers in creating better products, for example, is reflected in its core features. 

### How much does Hotjar cost?

Hotjar has a complex pricing structure: There are three different plans: Observe, Ask, and Engage. Each plan consists of four tiers: Basic, Plus, Business and Scale. Each plan offers discounts for annual subscriptions.

Not all features are available on every tier and plan. Below is a breakdown of which features are available on each plan, as well as their cost:

#### Hotjar Observe features and pricing

This plan includes the session replays and heatmaps features, but not the feedback widgets, surveys, or user research features.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 400px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>Basic</strong></td>
            <td><strong>Plus</strong></td>
            <td><strong>Business</strong></td>
            <td><strong>Scale</strong></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Price per month, paid annually</strong></td>
            <td className="text-center">$0</td>
            <td className="text-center">$48</td>
            <td className="text-center">$64</td>
            <td className="text-center">Contact sales</td>
        </tr>
        <tr>
            <td><strong>Price per month, paid monthly</strong></td>
            <td className="text-center">$0</td>
            <td className="text-center">$59</td>
            <td className="text-center">$79</td>
            <td className="text-center">Contact sales</td>
        </tr>
        <tr>
            <td><strong>Session replays</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Session replays limit</strong></td>
            <td className="text-center">35/day</td>
            <td className="text-center">100/day</td>
            <td className="text-center">500/day (additional cost for more)</td>
            <td className="text-center">500/day (additional cost for more)</td>
        </tr>
        <tr>
            <td><strong>Heatmaps</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Identify API: track custom user attributes</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Integrations</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
                <tr>
            <td><strong>Funnels</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Trends</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Hotjar API</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>SAML single sign-on (SSO)</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Feedback widgets</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
        </tr>
        <tr>
            <td><strong>Surveys</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
        </tr>
        <tr>
            <td><strong>User interview recordings and transcriptions</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
        </tr>
    </tbody>
</table>
</div>

#### Hotjar Ask features and pricing

This plan focuses on feedback widgets and surveys features. It also includes features from the Hotjar Observe Basic plan. It does not include user research features.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 400px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>Basic</strong></td>
            <td><strong>Plus</strong></td>
            <td><strong>Business</strong></td>
            <td><strong>Scale</strong></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Price per month, paid annually</strong></td>
            <td className="text-center">$0</td>
            <td className="text-center">$32</td>
            <td className="text-center">$80</td>
            <td className="text-center">$171</td>
        </tr>
        <tr>
            <td><strong>Price per month, paid monthly</strong></td>
            <td className="text-center">$0</td>
            <td className="text-center">$39</td>
            <td className="text-center">$99</td>
            <td className="text-center">$213</td>
        </tr>
        <tr>
            <td><strong>Session replays</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Session replays limit</strong></td>
            <td className="text-center">35/day</td>
            <td className="text-center">35/day</td>
            <td className="text-center">35/day</td>
            <td className="text-center">35/day</td>
        </tr>
        <tr>
            <td><strong>Heatmaps</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Identify API: track custom user attributes</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Integrations</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
                <tr>
            <td><strong>Funnels</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Trends</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Hotjar API</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Feedback widgets</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Surveys</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Feedback/survey response limit </strong></td>
            <td className="text-center">20/month</td>
            <td className="text-center">250/month</td>
            <td className="text-center">500/month (additional cost for more)</td>
            <td className="text-center">Unlimited</td>
        </tr>
        <tr>
            <td><strong>Create unlimited surveys & feedback widgets</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Events API: target survey & feedback widgets by custom user actions</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Remove Hotjar logo and branding</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>User interview recordings and transcriptions</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
        </tr>
    </tbody>
</table>
</div>

#### Hotjar Engage features and pricing

This plan focuses on user research features. It also includes features from the Hotjar Observe Basic plan and the Hotjar Ask Basic plan.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 400px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>Basic</strong></td>
            <td><strong>Plus</strong></td>
            <td><strong>Business</strong></td>
            <td><strong>Scale</strong></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Price per month, paid annually</strong></td>
            <td className="text-center">$0</td>
            <td className="text-center">$280</td>
            <td className="text-center">$440</td>
            <td className="text-center">Contact sales</td>
        </tr>
        <tr>
            <td><strong>Price per month, paid monthly</strong></td>
            <td className="text-center">$0</td>
            <td className="text-center">$350</td>
            <td className="text-center">$550</td>
            <td className="text-center">Contact sales</td>
        </tr>
        <tr>
            <td><strong>Session replays</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Session replays limit</strong></td>
            <td className="text-center">35/day</td>
            <td className="text-center">35/day</td>
            <td className="text-center">35/day</td>
            <td className="text-center">35/day</td>
        </tr>
        <tr>
            <td><strong>Heatmaps</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Identify API: track custom user attributes</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Integrations</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Funnels</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Trends</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Hotjar API</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Feedback widgets</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Surveys</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Feedback/survey response limit </strong></td>
            <td className="text-center">20/month</td>
            <td className="text-center">20/month</td>
            <td className="text-center">20/month</td>
            <td className="text-center">Unlimited</td>
        </tr>
        <tr>
            <td><strong>Remove Hotjar logo and branding</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>User interview recordings and transcriptions</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Interview limit</strong></td>
            <td className="text-center">6</td>
            <td className="text-center">15</td>
            <td className="text-center">30</td>
            <td className="text-center">60</td>
        </tr>
        <tr>
            <td><strong>Recruit interviewees from Hotjar participant pool</strong></td>
            <td className="text-center">Only 1</td>
            <td className="text-center">Up to 5</td>
            <td className="text-center">Up to 10</td>
            <td className="text-center">Up to 20</td>
        </tr>
        <tr>
            <td><strong>Recruit interviewees from your own network</strong></td>
            <td className="text-center">Up to 5</td>
            <td className="text-center">Up to 10</td>
            <td className="text-center">Up to 20</td>
            <td className="text-center">Up to 40</td>
        </tr>
        <tr>
            <td><strong>Max. interview length</strong></td>
            <td className="text-center">30 minutes</td>
            <td className="text-center">30 minutes</td>
            <td className="text-center">60 minutes</td>
            <td className="text-center">120 minutes</td>
        </tr>
    </tbody>
</table>
</div>

### How much does PostHog cost?

PostHog has simple and transparent pricing based on the usage – every features is available on the Paid plan. It’s free to get started and completely free for the first 15,000 sessions and 1 million events captured every month.

After this free monthly allowance you'll pay from $0.005/replay and $0.00045/event, with charges decreasing the more you use. Volume, non-profit and [startup discounts](/startups) are available upon request, and we recommend trying [our pricing calculator](/pricing) to estimate your pricing.

### Do Hotjar and PostHog offer free trials?

Hotjar offers a free tier, called Hotjar Basic. This version is limited in scope, supporting only 35 daily replays and limited feature access.

With PostHog, it’s free to get started, and all users get their first 1 million events and 15,000 sessions for free, every month. There are no other restrictions and billing limits can be used to keep usage beneath this allowance, enabling you to use PostHog for free indefinitely.

<ArrayCTA />
