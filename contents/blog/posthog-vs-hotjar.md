---
date: 2023-05-08
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

1. **Hotjar** enables you to see how customers use your product with session replays and heatmaps. It also provides widgets for collecting feedback and tools for scheduling customer interviews. Hotjar is built for marketers and user experience (UX) researchers.

2. **PostHog** is an all-in-one product improvement platform for product analytics, session replays, feature flags, in-app prompts, and more. PostHog is built for engineers and product teams.

Now it's time for the long answer...

In this guide, we'll cover:

- Hotjar and PostHog [feature comparison](#core-features)
- [Session replay](#session-replay) capabilities
- [Heatmap](#Heatmaps) capabilities
- [In-app messages and user research](#in-app-messages-and-user-research)
- [Apps and integrations](#apps-and-integrations)
- [Privacy, compliance, and security](#privacy-compliance-and-security)
- [Frequently asked questions](#frequently-asked-questions)

## How is PostHog different?

### 1. PostHog is an all-in one platform

Hotjar focuses mainly on session replays, heatmaps, and user research. That means you need to adopt additional tools for things like [product analytics](/product-analytics), [feature management](/feature-flags), and [A/B testing](/ab-testing). PostHog integrates all these features into one platform (in addition to [session replays and heatmaps](/session-replay)). PostHog is like mission control for your product, rather than just a single tool. 

### 2. PostHog is built for engineers

As such, PostHog includes many powerful features that aren’t available in tools like Hotjar, which is built for more general audiences. These features include tools like feature flags with JSON payloads, which enable you to trigger in-app messages or other notifications. 

We built PostHog to support technically-savvy product managers and engineers — especially [engineers with a product focus in their role](/blog/what-is-a-product-engineer). Although anyone can use PostHog ([just ask our marketing team](blog/posthog-marketing)), our goal is to help engineers be better at product by giving them the insights and tools they need to ship impactful features at speed.

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
            <td>Watch real users use your product; diagnose bugs</td>
        </tr>
        <tr>
            <td><strong>Heatmaps</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Visualize where users click in your app or website</td>
        </tr>
        <tr>
            <td><strong>Product analytics</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track events and conversion; analyze user behavior</td>
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
            <td><strong>Feedback widgets</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Suggestion box on your site where users can express frustration or delight.</td>
        </tr>
        <tr>
            <td><strong>In-app prompts and messages</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Send messages to users in your app</td>
        </tr>
        <tr>
            <td><strong>Surveys</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Capture user feedback with surveys. </td>
        </tr>
        <tr>
            <td><strong>Customer interview scheduling</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>In-app widget for requesting customer interviews.</td>
        </tr>
        <tr>
            <td><strong>User research tooling</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Integrated tools to assist you in research sessions.</td>
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

- **Session replays:** [Session replays](/session-replay) in PostHog recreate exactly what real users see and how they use your product. They also enable you to debug problems using built-in [console logs](/docs/session-replay/configure#console-logs-recording-beta), [performance monitoring](/tutorials/performance-metrics) and the [DOM explorer](/blog/posthog-changelog#experimental-dom-explorer-mode).

- **Feature flags:** PostHog includes [multivariate feature flags](/feature-flags) that support JSON payloads. Teams can use feature flags to offer different features or UI choices to users, to trigger in-app messages, and more.

- **A/B testing:** In PostHog, you can use the [experimentation suite](/ab-testing) to create multivariate tests within your product, such as showing some users a different page layout to others. Over time, you can build an understanding of which page performs better, correlate results with other events, and deploy a final version.
- 
### Session replays

Session replays are an essential tool for understanding how people use your product, especially for [early-stage companies](/blog/early-stage-analytics) searching for product-market fit. Both Hotjar and PostHog offer session replays:

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
            <td><strong>Free recording allowance</strong></td>
            <td className="text-center">~1,000 per month (max 35 per day) on Basic plan</td>
            <td className="text-center">15,000 per month</td>
            <td>Free recordings before being charged</td>
        </tr>
        <tr>
            <td><strong>Price for first 50,000 sessions</strong></td>
            <td className="text-center">~$200 per month (max 1,500 sessions per day)</td>
            <td className="text-center">$175 per month</td>
            <td></td>
        </tr>
        <tr>
            <td><strong>Price for first 50,000 sessions</strong></td>
            <td className="text-center">~$200 per month (max 1,500 sessions per day)</td>
            <td className="text-center">$175 per month</td>
            <td></td>
        </tr>
        <tr>
            <td><strong>Browser app recording</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Watch real users use your product; diagnose bugs.</td>
        </tr>
        <tr>
            <td><strong>Connected to product analytics</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span> Requires additional integration</td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>View replays for specific users and events.</td>
        </tr>
        <tr>
            <td><strong>Console logs</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span> Only in Scale plan</td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Debug user problems and app errors.</td>
        </tr>
        <tr>
            <td><strong>Network activity</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Monitor network activity and performance.</td>
        </tr>   
        <tr>
            <td><strong>iOS app recording</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center">Planned Q2 2023</td>
            <td>Record user sessions in iOS apps.</td>
        </tr>
        <tr>
            <td><strong>Android app recording</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center">Planned 2023</td>
            <td>Record user sessions in Android apps.</td>
        </tr>     
        <tr>
            <td><strong>Custom playlists</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Create playlists of related recordings.</td>
        </tr>   
        <tr>
            <td><strong>Download recordings</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Save recording files offline for storage.</td>
        </tr>
    </tbody>
</table>
</div>

- **Recording retention:** Hotjar keeps all recordings for 365 days. PostHog retains all recordings for three weeks, but retains recordings saved to a playlist forever. PostHog also allows you to download recordings as a `.json` file for safe keeping.

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
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Filter heatmaps by date, country etc.</td>
        </tr>
    </tbody>
</table>
</div>

### In-app messages and user research

Hotjar enables you to hear from users with feedback widgets, surveys, and an integrated user research tool. PostHog also supports [feedback widgets](/apps/feedback-widget) and [user research scheduling](/apps/user-interviews), although not surveys. However, PostHog offers additional ways to communicate with your users, such as a [notification bar](/apps/notification-bar) and interactive [pop-ups](tutorials/react-popups) through the use of [feature flag payloads](/docs/feature-flags/payloads) and [site apps](/tutorials/build-site-app). Also, since PostHog provides product analytics, you can easily define your target users who should see your widgets.

The main difference is, because Hotjar is designed for less technical users, it offers an interface that is simpler, but less powerful. You can easily create surveys and feedback widgets in Hotjar, but not other types of prompt such as a Calendly integration.

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
            <td><strong>Feedback widget</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Suggestion box on your site where users can express frustration or delight.</td>
        </tr>
        <tr>
            <td><strong>Customer interview scheduling</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>In-app widget for requesting customer interviews.</td>
        </tr>
        <tr>
            <td><strong>Custom user targeting</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span> Requires additional integration</td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Define who should see your widgets with your own data.</td>
        </tr>
        <tr>
            <td><strong>Surveys</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Capture user feedback with surveys. </td>
        </tr>
        <tr>
            <td><strong>User research tooling</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Integrated tools to assist you in research sessions.</td>
        </tr>
        <tr>
            <td><strong>Notification bar</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Display a customised banner on your site.</td>
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
Both Hotjar and PostHog have a wide selection of apps and integration. Both also include integrations with tools such as Zapier, which enable you to move data to even more platforms.

One unique advantage of PostHog is that, because it is open source, it’s easy to [create your own apps and integrations](/tutorials/build-your-own-posthog-app). This is useful if you’re, for example, using niche software in your stack that hasn’t been widely adopted, or if you require a direct integration between PostHog and your product. 

> The number of available apps is constantly increasing for both PostHog and Hotjar, so rather than list all available apps, we’ve shortened this section to only list the most popular integrations in particular categories. Want the full list? Check [the PostHog app library](/apps)!

Below, we've listed a few of the most popular integrations used across PostHog and Pendo. 

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
            <td className="text-center"><span className="text-red text-lg">✖</span> Surveys only</td>
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
            <td><strong>PagerDuty</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Receive customized alerts from insights</td>
        </tr>
        <tr>
            <td><strong>Intercom</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
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

## Privacy, compliance, and security

Regulatory compliance can be a critical need for many teams, especially if they operate in financial or healthcare industries. Regulations such as HIPPA and GDPR can require teams to store data in certain locations, or to protect data in certain ways. 

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 400px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>Hotjar</strong></td>
            <td><strong>PostHog</strong></td>
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
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
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
    </tbody>
</table>
</div>

## Frequently asked questions

- [How is PostHog different?](#how-is-posthog-different)
  - [1. PostHog is an all-in one platform](#1-posthog-is-an-all-in-one-platform)
  - [2. PostHog is built for engineers](#2-posthog-is-built-for-engineers)
  - [3. PostHog is open source](#3-posthog-is-open-source)
- [Core features](#core-features)
  - [Session replays](#session-replays)
  - [Heatmaps](#heatmaps)
  - [In-app messages and user research](#in-app-messages-and-user-research)
  - [Apps and integrations](#apps-and-integrations)
- [Privacy, compliance, and security](#privacy-compliance-and-security)
- [Frequently asked questions](#frequently-asked-questions)
  - [Who is Hotjar useful for?](#who-is-hotjar-useful-for)
  - [Who is PostHog useful for?](#who-is-posthog-useful-for)
  - [How much does Hotjar cost?](#how-much-does-hotjar-cost)
  - [How much does PostHog cost?](#how-much-does-posthog-cost)
  - [Do Hotjar and PostHog offer free trials?](#do-hotjar-and-posthog-offer-free-trials)

Got another question? You can [ask the PostHog team anything you want](/questions)!

### Who is Hotjar useful for?

Hotjar is designed primarily for marketers and UX specialists. Its key features are the ability to record session replays and heatmaps. It also provides widgets for collecting feedback and tools for scheduling customer interviews. These provide insights into how customers are using your product. 

### Who is PostHog useful for?

PostHog is built primarily with engineers, product managers and other technical users in mind. It also offers the ability to record session replays, heatmaps, and create feedback widgets, but also offers a number of other tools that are useful for these types of teams, such as product analytics and feature flags. 

This difference is ultimately reflected in many of the features both platforms offer, and how they are designed. PostHog's focus on breadth and supporting engineers in creating better products, for example, is reflected in its core features. 

### How much does Hotjar cost?

Hotjar has tier-based pricing: Basic, Plus, Business and Scale. All plans offer session recordings, although the costs and limits differ. Additional features such as API access and SAML single sign-on are only available on some plans.

The free can only record up to 35 daily session recordings. After this, the Plus tier offers 100 daily session recordings for $32 per month and the Business tier offers 500 daily sessions for $80 per month (with the option to pay for more sessions). Finally, the Scale tier offers 500 daily sessions for $171 per month, but offers access to additional features such as Console tracking and the Hotjar API.

### How much does PostHog cost?

PostHog has transparent pricing based on the usage. It’s free to get started and completely free for the first 15,000 sessions and 1 million events captured every month.

After this free monthly allowance you'll pay $0.005/recording and $0.00045/event, and PostHog charges progressively less the more you use. Volume, non-profit and [startup discounts](/startups) are available upon request, and we recommend trying [our pricing calculator](/pricing) to estimate your pricing.

### Do Hotjar and PostHog offer free trials?

Hotjar offers a free tier, called Hotjar Basic. This version is limited in scope, supporting only 35 daily recordings and limited feature access.

With PostHog, it’s free to get started, and all users get their first 1 million events and 15,000 sessions for free, every month. There are no other restrictions and billing limits can be used to keep usage beneath this allowance, enabling you to use PostHog for free indefinitely.

<ArrayCTA />
