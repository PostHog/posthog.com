---
date: 2023-08-04
title: "In-depth: PostHog vs Kubit"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/posthog-vs-kubit/posthog-vs-kubit.jpg
featuredImageType: full
author:
    - joe-martin
category: General
tags:
    - Comparisons
---

Kubit is a product analytics platform built for product teams. PostHog, on the other hand, is built primarily for engineers. 

In this article we’ll explore the differences between Kubit and PostHog in detail, but it can helpful to first discuss the different needs of engineers and product teams:  

- Product managers need tools which help them simply collect and analyze product data, so they can unearth user patterns. They also need to collaborate closely with other roles.
 
- Engineers and developers also need to collect and analyze data, but often want to run much more detailed analysis and crucially want to directly implement or test changes as a result of their discoveries.

These differences explain why PostHog and Kubit have such different features, even though they both include product analytics tooling. Kubit focuses on providing a simplified, no-code experience, while PostHog has a much broader suite of tools — feature flags, user surveys, A/B experimentation, and much more. 

> ### What about product-minded engineers?
>
> Increasingly, many organizations are hiring engineers with a product-orientated approach, called _product engineers_. PostHog is especially helpful for these types of roles and we’ve written at length about [what product engineering is, and why it matters](/blog/what-is-a-product-engineer) — and [we even have a newsletter about it](/newsletter).

In this article we’ll explore these differences in more detail, and take a deep dive into the product analytics features of both. 

## How do PostHog and Kubit differ?

### PostHog does more than product analytics
Kubit is intended for product and data teams at large organizations. It therefore focuses solely on providing product analytics tools (and has an opaque pricing model that’s squarely aimed at enterprises), and that’s it.

PostHog, on the other hand, offers far more than just product analytics and empowers engineers to collect feedback (with surveys), deploy changes (with feature flags), test ideas (with A/B testing), and gather more information (with session replays). In short, it’s just ridiculously more powerful. 

### PostHog can gather multiple types of data
Both Kubit and PostHog are built around the concept of _events_, which users define, track and analyze. An event can be performed, or not, and can have properties, or not. That’s about it. 

However, what if you want to analyze something which isn’t an event, like a feedback comment, or how long a user spent reading a page? With Kubit that’s not possible, but with PostHog it is. You can watch replays of actual user interactions with your product, issue surveys to collect feedback — or even use PostHog as a data warehouse to track other data. 

### PostHog is open source 
At PostHog, we aren’t just open source – we’re transparent by default. Everything from our [roadmap](/roadmap) to our [team profiles](/team) are available to the public. This means we’re constantly taking feedback on how to improve, as well as code contributions from our community that directly impact the product. Need an integration that doesn’t exist yet? You can build it yourself. 

Kubit, on the other hand, is _incredibly_ closed source. There's no public pricing information, free trials require personal information, and the roadmap is non-existent. That’s not the way we like to work.  

## PostHog and Kubit feature comparison
As explained above, PostHog offers a wider selection of feature than Kubit, which focuses solely on product analytics.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
          <td className="w-3/12"></td>
            <td><strong>Kubit</strong></td>
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
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track where users click</td>
        </tr>
        <tr>
            <td><strong>Event pipelines</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
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

<ArrayCTA/>

## Product analytics comparison

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
          <td className="w-3/12"></td>
            <td><strong>Kubit</strong></td>
            <td><strong>PostHog</strong></td>
            <td></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Funnel analysis</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Track users through a sequence of events</td>
        </tr>
        <tr>
            <td><strong>Path analysis</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Chart how users get from A to B</td>
        </tr>
        <tr>
            <td><strong>Retention analysis</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Visualize which users stay, for how long</td>
        </tr>
        <tr>
            <td><strong>Lifecycle analysis</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Understand who is dormant, churning, and thriving</td>
        </tr>
        <tr>
            <td><strong>Correlation analysis</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Identify predictors and shared commonalities</td>
        </tr>
        <tr>
            <td><strong>Dashboards</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Save insights into a shared workspace</td>
        </tr>
        <tr>
            <td><strong>Formulas</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Calculate unique insights, with math</td>
        </tr>
        <tr>
            <td><strong>SQL access</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Use code to directly query the data</td>
        </tr>
        <tr>
            <td><strong>Group analytics</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Gather individual users into larger organizations</td>
        </tr>
        <tr>
            <td><strong>Predictive analytics</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td>Extrapolate from now, into the future</td>
        </tr>
    </tbody>
</table>
</div>

## Collaboration tools 

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>Kubit</strong></td>
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
            <td><strong>Notebooks</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>A built-in scratch pad for making notes, and more</td>
        </tr>
        <tr>
            <td><strong>Public insights</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Make insights available without login</td>
        </tr>
        <tr>
            <td><strong>Public dashboards</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Make dashboards available without login</td>
        </tr>
        <tr>
            <td><strong>Export dashboards</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Export dashboards as reports</td>
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
            <td><strong>Slack integration</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Receive notifications about new data</td>
        </tr>
        <tr>
            <td><strong>Discord integration</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Receive notifications about new data</td>
        </tr>
        <tr>
            <td><strong>MS Teams integration</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Receive notifications about new data</td>
        </tr>
        <tr>
            <td><strong>Data management suite</strong></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
            <td>Categorize and define a list of events and properties</td>
        </tr>
    </tbody>
</table>
</div>

> ### Should you use autocapture?
> 
> Autocapturing events is a controversial topic for data teams. The argument against it is that it introduces more noise and can introduce additional costs. The argument for it is that it collects more data for users to collaborate with, at greater consistency. 
>
> At PostHog, [we think it’s better to have more information](/blog/is-autocapture-still-bad), than less. We give users their first 1M events for free every month too, to negate the costs argument. But if you disagree, autocapture can be easily disabled. 

## Library support
PostHog supports a wide range of client and server libraries, but not all features are equally available across all of them. We recommend using PostHog's JavaScript snippet to enjoy all our features. See our [client library documentation](/docs/getting-started/install?tab=snippet) for more information.

Kubit, on the other hand, is a closed-source, no-code product. Because it's designed to work on top of a data warehouse, it doesn't use SDKs or libraries in the traditional sense. You can only use it if you have your event data in a data warehouse already.

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>Kubit</strong></td>
            <td><strong>PostHog</strong></td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>JavaScript</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>React Native</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>React</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Flutter</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>iOS</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
        <tr>
            <td><strong>Android</strong></td>
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
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

<ArrayCTA/>

## Security and compliance

Compliance can be a bit of a regulatory headache, especially for international organizations who have to adhere to rules such as GDPR. PostHog makes such things simple by offering a choice of where your data is hosted, and a variety of security options to keep your data secure. 

Kubit is similar on most fronts, but lacks the option for EU hosting (despite claiming to be GDPR ready) and doesn’t offer two-factor authentication itself (it’s offered exclusively via an integration with Google OAuth).

<div className="overflow-x-auto -mx-5 px-5">
<table className="w-full mt-4" style="min-width: 600px;">
    <thead>
        <tr>
            <td className="w-3/12"></td>
            <td><strong>Kubit</strong></td>
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
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
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
            <td className="text-center"><span className="text-red text-lg">✖</span></td>
            <td className="text-center"><span className="text-green text-lg">✔</span></td>
        </tr>
    </tbody>
</table>
</div>

> ### To cookie, or not to cookie?
>
> To ensure compliance with local privacy regulations, you may need to ask users for their permission to track them with cookies. PostHog has [tools to help you do that](/tutorials/react-cookie-banner), but if you’d rather not use cookies to track users then [you can do that too](/tutorials/cookieless-tracking). 

## Frequently asked questions

### How much should I expect to pay?

With Kubit, it’s impossible to estimate costs as pricing is not transparent and is tailored to each customer. At PostHog, [we strongly disagree with this approach](/blog/transparent-enterprise-pricing) and publish our pricing publicly.

For PostHog, we have [a guide for estimating your usage](/docs/billing/estimating-usage-costs), and [a pricing calculator](/pricing) to help — but with a generous free tier and no up-front fees, it’s often easiest to just get started and see how much data you send through that way. 

### Is there a free trial?

With PostHog, you don’t need a free trial — it’s free to get started, with a generous monthly allowance of events, replays, and API calls. If you’re within this allowance, PostHog is free to use forever. 

Kubit does offer a free trial, but you’ll need to submit your company information and wait for Kubit to respond with an invite to do so. 

### Are there discounts for nonprofits and startups?

Yes, PostHog offers both. Nonprofit organizations can contact our team and are usually eligible for a 50% discount, while startups can sign up for $50,000 of free credit (and a host of other perks) in the [PostHog for Startups program](/startups). 

Kubit currently offers no information on discounts for either nonprofits, or startups. 

<ArrayCTA/>
