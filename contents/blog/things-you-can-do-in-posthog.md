---
date: 2022-07-18
title: 20+ ways PostHog can help you build better products
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: ../images/blog/product-people.png
featuredImageType: full
author: ["andy-vandervell"]
categories: ["Guides", "Product analytics"]
---

PostHog is a growing platform.

We used to call ourselves a product analytics platform, but product analytics is just one feature [among many](/product) these days.

And that got us wondering... just how many useful things can you do with PostHog?

The answer? A lot – and this list is just a snapshot of the possibilities.

Here's the TL;DR:

1. [Replace multiple services with just PostHog](#1-replace-multiple-services-with-just-posthog)
1. [Build an AARRR pirate metrics dashboard](#2-build-an-aarrr-pirate-metrics-dashboard)
1. [Discover who your power users are](#3-discover-who-your-power-users-are)
1. [Gather user feedback](#4-gather-user-feedback)
1. [Identify users who are at risk of churning](#5-identify-users-who-are-at-risk-of-churning) 
1. [Validate a product change using experiments](#6-validate-a-product-change-using-experiments)
1. [Use feature flags as kill switches](#7-use-feature-flags-as-kill-switches) 
1. [Track the performance of marketing campaigns](#8-track-the-performance-of-marketing-campaigns) 
1. [Use Correlation Analysis to discover commonalities](#9-use-correlation-analysis-to-discover-commonalities) 
1. [Track errors as events](#10-track-errors-as-events) 
1. [Watch users interact with your acquisition funnel](#11-watch-users-interact-with-your-acquisition-funnel) 
1. [Analyze retrospective data](#12-analyze-retrospective-data) 
1. [Spend a week watching people using your product](#13-spend-a-week-watching-people-using-your-product)
1. [Build your own app](#14-build-your-own-app) 
1. [Subscribe to an insight or dashboard](#15-subscribe-to-an-insight-or-dashboard) 
1. [Capture where people first heard about you](#16-capture-where-people-first-heard-about-you) 
1. [Measure how long it takes users to complete a series of actions](#17-measure-how-long-it-takes-users-to-complete-a-series-of-actions) 
1. [Organize your custom events in Notion](#18-organize-your-custom-events-in-notion)
1. [Collect location data while respecting user privacy](#19-collect-location-data-while-respecting-user-privacy) 
1. [Connect PagerDuty and PostHog to get threshold alerts](#20-connect-pagerduty-and-posthog-to-get-threshold-alerts) 
1. [Track support tickets by connecting Zendesk](#21-track-support-tickets-by-connecting-zendesk) 

> Got an idea to add to this article? Share it on the [PostHog website repo](https://github.com/PostHog/posthog.com/issues).

### 1. Replace multiple services with just PostHog

Let's start with a big one.

You could use Amplitude for product analytics, Hotjar for session recording, Flagsmith for feature control, Segment as your customer data platform, Optimizely for testing, and Redshift for your data warehouse – these are sensible choices.

But you can replace some (or even all) of them with just PostHog.

We've built PostHog so companies don't have to run multiple services to get the insights they need. 

[PostHog Cloud](/pricing) delivers a complete set a tools to help you build better products, while our integration with numerous data platforms means many of our customers end up ditching products like Segment for organizing and syncing customer data. 

And if you [self-host PostHog](/docs/self-host), you get a built-in data warehouse based on ClickHouse into the bargain. 

## 2. Build an AARRR pirate metrics dashboard

![AARRR pirate metrics](../images/blog/things-to-do-in-posthog/aarrr.png)

AARRR (Acquisition, Activation, Retention, Revenue, Referral) is a classic framework for driving product-led growth, and it's a great place to start when building your first dashboard in PostHog.

What metrics you choose will depend on the business and it's fine to have more than one metric for each category. What's vital, however, is that they're easy to understand, actionable and comparable.

Read our guide to [getting started with the AARRR framework](/tutorials/aarrr-framework) and [B2B product metrics](/blog/b2b-saas-product-metrics) guides for more.

## 3. Discover who your power users are

![discovering power users](../images/blog/things-to-do-in-posthog/cohorts.png)

You can learn a huge amount by discovering who your most active users are, and what they're doing.

What are the features they use the most? How often do they perform specific tasks? What job title or role do these people have in their company? 

These are the kinds of insights that inform your marketing efforts, your product roadmap, and help you find product market fit.

For this you'll want to employ our powerful Cohorts tool by using the "completed event regularly" or "completed an event multiple times" conditions. 

An e-commerce platform might ask for "users who bought an item in 5 out of the last 7 weeks" – we track many things, including users who view dashboards frequently.

## 4. Gather user feedback

![pineapple on pizza](../images/blog/things-to-do-in-posthog/pinepapple.png)

You can [use PostHog to gather feedback on your product](/tutorials/survey), website, or conduct user polls.

On our website, every docs page has a question asking whether the page was useful – we use this to help identify pages that need improvement. We also ask anyone who gets a 404 on our website whether pineapple belongs on pizza. We use this to report people to the pizza police. 

## 5. Identify users who are at risk of churning

You can track users who could churn using "stopped doing an event" Cohort condition.

First, you need to identify an event – it may be the same one you use to identify power users – and then decide on the date range for your cohort. For example, you could ask for "users who haven't logged in during the last 30 days, but had done so in the 30 days prior".

Once you've defined your cohort, you can evaluate if you've used the correct parameters, build insights to understand what these users have in common, or simply get in touch with them to see if you can help.

You can also capture users who didn't churn using the "started doing an event again" condition, and that's just one more among more than half a dozen conditions. 

Here are a few more examples:

- **Did not complete event:** Find users who aren't doing what you expect. For example, "Give me users who visited the home page, but did not click on the 'Sign up' button".

- **Completed an event multiple times:** Find your most active users. For example, "Give me users who have 'Bought item' more than 3 times in the last 30 days".

- **Completed a sequence of events:** Find users using your product in a very specific way. For example, "Give me users who added something to their cart and then entered a promo code within a day".

- **Do not have the property:** Find more specific sets of users. For example, "Give me users outside of Europe".

- **Completed an event for the first time:** Find the newest users of a feature. For example, "Give me users who bought an item for the first time in the last 7 days".

- **Completed an event regularly:** Find your power users. For example, "Give me users who bought an item in 5 out of the last 7 weeks".

Try experimenting with any of the above, while also using AND/OR operators, to create new and useful insights.

## 6. Validate a product change using experiments

![PostHog experiments](../images/blog/things-to-do-in-posthog/experiments-1.png)

Experimentation is a fundamental tool every engineer and product manager needs. While you can roll out changes and observe their impact after the fact, it's impossible to verify whether small shifts in your metrics are down to your changes or some other unknown variable.

PostHog's Experimentation suite is built atop our Feature Flag functionality, allowing you to run straight A/B tests and multivariate tests. You can set a minimum acceptable improvement for the test, and PostHog will recommend a sample size and test duration based on your parameters.

![PostHog experiments](../images/blog/things-to-do-in-posthog/experiments-2.png)

We then run a Bayesian analysis on the data to give a probability for each variant being the best, a graph of how things are looking for each variant, and whether the results are statistically significant or not.

For more info, you can read the [Experimentation user guide](/docs/user-guides/experimentation) and our [guide to running effective A/B tests](/blog/experiments).

## 7. Use feature flags as kill switches

[Feature flags](/docs/user-guides/feature-flags) are often used to turn new features on under certain conditions, so that you can test things with a certain [cohort](/docs/user-guides/cohorts) or user segment. But you can also use them globally, then leverage the flag as a kill switch to turn features off in the event of an emergency. 

When [Phantom](/customers/phantom) started using PostHog, it couldn't deploy new updates or features to all users instantly. In Phantom's case this was because the product was a browser extension. Using Feature Flags as kill switches gave them a degree of control not normally available to such products. 

## 8. Track the performance of marketing campaigns

PostHog can track all sorts of data, including a variety of UTM fields – many of which will be automatically captured. Creating insights based on UTM parameters in PostHog also enables you to follow users along your entire funnel in a single platform, so you can isolate how paid ads correlate to traffic, acquisition and retention.

Quoting [Pry CEO and co-founder Andy Su](https://posthog.com/customers/pry): 

> "We were asking: How valuable are customers who come to us via ads as opposed to those who are organic? We were able to answer that question with PostHog and use that information to make decisions about our advertising strategy.”

## 9. Use Correlation Analysis to discover commonalities

![correlation analysis posthog](../images/blog/things-to-do-in-posthog/correlation-analysis.png)

Accessible via Funnel insights, [Correlation Analysis](https://posthog.com/docs/user-guides/correlation) shows you the events and person properties that your converting users have in common. Is there an industry that really loves your product that you don't event know about? Correlation Analysis helps surface insights like these, which can change your product strategy completely.

It's also great for marketing and website teams. For example, we know visitors complete a specific user journey on our website are 5.0x more likely to perform the 'clicked calculate scale price' event, 8x more likely to have used docs search, and 2.9x more likely to have arrived via Google.

## 10. Track errors as events

You can track any sort of event in PostHog, including failures or other sorts of errors. All you need to do is put an [action](https://posthog.com/docs/user-guides/actions) or [event](https://posthog.com/docs/user-guides/events) next to the error, find some other unique identifier you can use - such as views of a /404 page – or use our [Sentry Connector](/apps/sentry-connector) to track errors as events.  

Tracking errors can be enormously useful for deciding where to invest engineering time, or when to prioritize areas of your product. [Phantom](https://posthog.com/customers/phantom), for example, used this to prioritize updates to their infrastructure by tracking failure rates for payments across their platform.

## 11. Watch users interact with your acquisition funnel

![funnel users](../images/blog/things-to-do-in-posthog/converted-users.png)

One of the beauties of having session recording and product analytics in one tool is the seamless way you can go from reviewing a funnel insight to watching exactly what those same users are doing. 

Simply click on the number of users who completed the step, or dropped off, and you can view the full list of those users, and recordings of their sessions. From here you can understand what they're doing individually, or create a cohort from them to drill down further.

## 12. Analyze retrospective data

With some analytics platforms, you can only look at data once you've started collecting it – you have to define an action, then wait months to gather data for it. In PostHog, you can look at retroactive data easily as we capture information automatically and enable you to make faster decisions. 

Quoting [MentionMe Software Engineer Lleo Harress](https://posthog.com/customers/mention-me): 

> “Retrospective data and event autocapture have been especially useful. We’ve had occasions where we’ve speculated something but haven’t been capturing the data to prove it, so we define an event and then see the retroactive data for it immediately. Previously we’d have to wait months to get usable data like that in Google Analytics or other tools.”

## 13. Spend a week watching people using your product

![recording filters posthog](../images/blog/things-to-do-in-posthog/session-recording.png)

Seriously, sometimes it's just useful to spend a whole load of time watching people using your product. 

In the Recordings page in PostHog, you can filter all recordings based on cohorts you've already created, or specific events you're interested in. You can also select a date range and a minimum/maximum recording duration. 

Once setup, you're ready to dive in and discover all the odd things users do that you never anticipated, the problems they encounter, and the workarounds they employ.

![twitter quote](../images/blog/things-to-do-in-posthog/twitter-quote.png)

This guy gets it.

## 14. Build your own app

PostHog is an open source platform and one of the key benefits is you don't have to wait for us to build a specific integration you need. You can build yourself. 

The PostHog App Store has numerous examples of useful apps built by our community, such as [URL Normalizer](/apps/url-normalizer) (thanks to Mark Bennett), the [Property Filter](/apps/property-filter) app (thanks to Lukas Kahwe Smith and Christian), and the [User Agent Populator](/apps/user-agent-populator) (thanks to Weyert).

There's no shortage of official PostHog apps, too. We've built over 40 apps and integrations so far, including import and export apps for most of the popular data warehouses on the market. 

Don't fancy building your own? Don't hesitate to suggest one on the [PostHog repo](https://github.com/PostHog/posthog). We might decide to build it ourselves, or there may be another member of the community with the same problem. 

## 15. Subscribe to an insight or dashboard

![posthog insight subscriptions](../images/blog/things-to-do-in-posthog/subscriptions.png)

You don't need to login to PostHog everyday to get insights. Instead, setup your most valuable insights and dashboards, and then get them sent to your inbox on any schedule and time to suit you. You can also send updates to multiple addresses, which is ideal for keeping stakeholders up-to-date.

Coming soon: Slack channel subscriptions!

## 16. Capture where people first heard about you

It's useful for sales and marketing teams to understand how people find your product. There are numerous ways to do this, and like so many things you can track this using PostHog. 

We ask everyone who books a PostHog demo this question using a free text box – we could use a defined list, but we prefer the flexibility. We collect this data in PostHog for our marketing and customer success dashboards.

## 17. Measure how long it takes users to complete a series of actions

Whether you want to understand how long it takes to onboard a new organization, or how long it takes for customers to complete a purchase, the [Event Sequence Timer](/apps/event-sequence-timer) lets you define a series of events in order and track the time to complete them all. 

Once you're tracking this metric you can then make changes to improve the process and examine the difference, positive or negative. Improving processes like onboarding can have a big impact on customer satisfaction and other important downline metrics, like [new user activation](/blog/b2b-saas-product-metrics#new-user-activation).

## 18. Organize your custom events in Notion

No modern data platform is complete without a [Zapier Connector](/apps/zapier-connector), so naturally PostHog has one. 

What's possible with PostHog and Zapier combined is almost limitless, but one option is to use Zapier to [keep a record of custom events in Notion](/tutorials/how-to-connect-posthog-and-notion-with-zapier). 

This can be useful for sharing your most valuable metrics with colleagues who don't use PostHog, or to simply keep an eye on things and make sure people aren't creating duplicate custom events.
 
## 19. Collect location data while respecting user privacy

We created the [GeoIP Enricher](/apps/geoip-enrichment) app to enhance events and persons with IP location data, allowing you to run queries on a range of geographic data, including city name, country, continent and time zone data. 

But what if you want geographic data, but don't don't to collect more personally identifiable IP data? 

Enter the [Property Filter](/apps/property-filter) app, which was built by PostHog users Witty Works so they [could collect country data in a privacy-friendly way](/tutorials/property-filter).

## 20. Connect PagerDuty and PostHog to get threshold alerts

Connecting PagerDuty and PostHog allows you to get alerts on all sorts of metrics based on PostHog events. 

Want to know when you're going viral? Set an alert when website page views go above a threshold. You can do the same for tracking errors, logins – pretty much anything you can track as an event on a Trends insight. 

It's also useful for setting goals and receiving alerts when you achieve them.

## 21. Track support tickets by connecting Zendesk

The [Zendesk Connector for PostHog](/apps/zendesk-connector) is a two-way connector that allows you turn Zendesk tickets into PostHog events and enrich Zendesk tickets with PostHog event data. 

Importing support tickets as events allows you to understand support trends, and use Cohorts and Correlation Analysis to breakdown common traits among users who raise tickets frequently.

<ArrayCTA />