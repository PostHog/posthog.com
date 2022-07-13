---
date: 2022-07-13
title: 22 ways PostHog can help you build better products
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

And that got us to wondering... just how many useful things can you do with PostHog?

The answer? A lot – and this list is just a snapshot of the posibilities.

### 1. Replace multiple services with just PostHog

Let's start with a big one.

You could use Amplitude for product analytics, Hotjar for session recording, Flagsmith for feature control, Segment as your customer data platform, Optimizely for testing, and Redshift for your data warehouse – these are sensible choices.

Alternatively, you can just use PostHog.

We've built PostHog so companies don't have to run multiple services to get the insights they need. 

PostHog Cloud delivers a complete set a tools to help you build better products, while our integration with numerous data platforms means many of our customers end up ditching products like Segment for organizing and syncing customer data. 

And if you self-host PostHog, you get a built-in data warehouse based on ClickHouse into the bargain. 

## 2. Build an AARRR pirate metrics dashboard

AARRR (Acquisition, Activation, Retention, Revenue, Referral) is a classic framework for driving product-led growth, and it's a great place to start when building your first dashboard in PostHog.

What metrics you choose will depend on this business and it's fine to have more than one metric for each category. What's vital, however, is that they're easy to understand, actionable and comparable.

Read our guide to [getting started with the AARRR framework](/tutorials/aarrr-framework) and [B2B product metrics](/blog/b2b-saas-product-metrics) for more in-depth guidance on the framework and useful metrics to measure. 

## 3. Use feature flags as kill switches

[Feature flags](/docs/user-guides/feature-flags) are often used to turn new features on under certain conditions, so that you can test things with a certain [cohort](/docs/user-guides/cohorts) or user segment. But you can also use them globally, then leverage the flag as a kill switch to turn features off in the event of an emergency. 

Some PostHog users, such as [Phantom](/customers/phantom), aren't able to deploy new updates or features to all users instantly. In Phantom's case this is because the product is a browser extension. Using Feature Flags as kill switches in this way offers a degree of control not normally available to such products.

## 4. Track errors as events

You can track any sort of event in PostHog, including failures or other sort of errors. All you need to do is put an [action](https://posthog.com/docs/user-guides/actions) or [event](https://posthog.com/docs/user-guides/events) next to the error, find some other unique identifier you can use - such as views of a /404 page – or use our Sentry Connector to track errors as events.  

Tracking errors can be enormously useful for deciding where to invest engineering time, or when to prioritize areas of your product. [Phantom](https://posthog.com/customers/phantom), for example, used this to prioritize updates to their infrastructure by tracking failure rates for payments across their platform. 

## 5. Gather user feedback

You can use PostHog to gather feedback on your product, website, or conduct user polls.

On our website, every docs page has a question asking whether the page was useful – we use this to help identify pages that need improvement. We also ask anyone who gets a 404 on our website whether pineapple belongs on pizza. We use this to report people to the pizza police. 

Look, PostHog lets you control your own data so you can protect and respect user privacy, but there are limits! The limit is pineapple on pizza.

## 6. Discover who your power users are

You can learn a huge amount by discovering who your most active users are. 

What are the features they use the most? How often do they perform specific tasks? What job title or role do these people have in their company? 

These are the kinds of insights that inform your marketing efforts, your product roadmap, and help you find product market fit.

For this you'll want to use our powerful Cohorts features by using the "completed event regularly" condition. For example, an e-commerce platform might ask for "users who bought an item in 5 out of the last 7 weeks".

If you're unsure what action you want to track, try heading to Data Management and sorting your events by '30-day query volume' or '30-day query volume' to find the most frequent events for your product.

## 7. Validate a product change using experiments

Experimentation is a fundamental tool every engineer and product manager needs. While you can roll out changes and observe their impact after the fact, it's impossible to verify whether small shifts in your metrics are down to your changes or some other unknown variable.

PostHog's Experimentation suite is built atop our Feature Flag functionality, allowing you to run straight A/B tests and multivariate tests. You can set a minimum acceptable improvement for the test, and PostHog will recommend a sample size and test duration based on your parameters.

We then run a Bayesian analysis on the data to give a probability for each variant being the best, a graph of how things are looking for each variant, and whether the results are statistically significant or not.

For more info, you can read the [Experimentation user guide](/docs/user-guides/experimentation) and our [guide to running effective A/B tests](/blog/experiments).

## 8. Track the performance of marketing campaigns

PostHog can track all sorts of data, including a variety of UTM fields – many of which will be automatically captured. Creating insights based on UTM parameters in PostHog also enables you to follow users along your entire funnel in a single platform, so you can isolate how paid ads correlate to traffic, acquisition and retention.

Quoting [Pry CEO and co-founder Andy Su](https://posthog.com/customers/pry): 

> "We were asking: How valuable are customers who come to us via ads as opposed to those who are organic? We were able to answer that question with PostHog and use that information to make decisions about our advertising strategy.”

## 9. Use Correlation Analysis to discover what type of users are successful

Accessible via Funnel insights, [Correlation Analysis](https://posthog.com/docs/user-guides/correlation) shows you the events and person properties that your converting users have in common. Is there an industry that really loves your product that you don't event know about? Correlation Analysis helps surface insights like these, which can change product strategy completely.

It's also great for marketing and website teams. For example, we know visitors complete a specific user journey on our website are 5.0x more likely to perform the 'clicked calculate scale price' event, and that those users are 7.8x to have used docs search and 2.9x more likely to have arrived via Google.

## 10. Watch users interact with your acquisition funnel

Sticking with Funnels, one of the beauties of having session recording and product analytics in one tool is the seamless way you can go from reviewing a funnel insight to watching exactly what those same users are doing. 

Simply click on the number of users who completed the step, or dropped off, and you can view the full list of those users, and recordings of their sessions. From here you can understand what they're doing individually, or create a cohort from them to drill down further.

## 9. Analyze retrospective data

With some analytics platforms, you can only look at data once you've started collecting it – you have to define an action, then wait months to gather data for it. In PostHog, you can look at retroactive data easily as we capture information automatically and enable you to make faster decisions. 

Quoting [MentionMe Software Engineer Lleo Harress](https://posthog.com/customers/mention-me): 

> “Retrospective data and event autocapture have been especially useful. We’ve had occasions where we’ve speculated something but haven’t been capturing the data to prove it, so we define an event and then see the retroactive data for it immediately. Previously we’d have to wait months to get usable data like that in Google Analytics or other tools.”

## 12. Identify users who are at risk of churning

Using Cohorts you can track users who "stopped doing an event" – a useful way to identify users who might be at risk of churning. 

First, you need to identify an event – it may be the same one you use to identify power users – and then decide on the date range for your cohort. For example, you could ask for "users who haven't logged in during the last 30 days, but had done so in the 30 days prior".

Once you've defined your cohort, you can evaluate if you've used the correct parameters, build insights to understand what these users have in common, or simply get in touch with them to see if you can help.

You can also capture users who didn't churn using the "started doing an event again" condition, and that's just one more among more than half a dozen conditions. Here are a few more examples:

- **Did not complete event:** Find users who aren't doing what you expect. For example, "Give me users who visited the home page, but did not click on the 'Sign up' button".

- **Completed an event multiple times:** Find your most active users. For example, "Give me users who have 'Bought item' more than 3 times in the last 30 days".

- **Completed a sequence of events:** Find users using your product in a very specific way. For example, "Give me users who added something to their cart and then entered a promo code within a day".

- **Do not have the property:** Find more specific sets of users. For example, "Give me users outside of Europe".

- **Completed an event for the first time:** Find the newest users of a feature. For example, "Give me users who bought an item for the first time in the last 7 days".

- **Completed an event regularly:** Find your power users. For example, "Give me users who bought an item in 5 out of the last 7 weeks".

Try experimenting with any of the above, while also using AND/OR operators, to create new and useful insights.

## 13. Spend a week watching people using your product

Seriously, sometimes it's just useful to spend a whole load of time watching people using your product. 

In the Recordings page in PostHog, you can filter all recordings based on cohorts you've already created, or specific events you're interested in. You can also select a date range and a minimum/maximum recording duration. 

Once setup, you're ready to dive in and discover all the odd things users do that you never anticipated, the problems they encounter, and the workarounds they employ. You'll be amazed what you find.  

## 14. Build your own app

PostHog is an open source platform and one of the key benefits is you don't have to wait for us to build a specific integration you need. You can build yourself. 

The PostHog App Store has numerous examples of useful apps built by our community, such as [URL Normalizer](/apps/url-normalizer) (thanks to Mark Bennett), the [Property Filter](/apps/property-filter) app (thanks to Lukas Kahwe Smith and Christian), and the [User Agent Populator](/apps/user-agent-populator) (thanks to Weyert).

There's no shortage of official PostHog apps, too. We've built over 40 apps and integrations so far, including import and export apps for most of the popular data warehouses on the market. 

Don't fancy building your own? Don't hesitate to suggest one on the [PostHog repo](https://github.com/PostHog/posthog). We might decide to build it ourselves, or there may be another member of the community with the same problem. 

## 15. Subscribe to an insight or dashboard

You don't need to login to PostHog everyday to get insights. Instead, setup your most valuable insights and dashboards, and then get them sent to your inbox on any schedule and time to suit you. You can also send updates to multiple addresses, which is ideal for keeping stakeholders up-to-date.

Coming soon: Slack channel subscriptions!

## 16. Capture where people first heard about you

It's useful for sales and marketing teams to understand how people find your product. There are numerous ways to do this, and like so many things you can track this using PostHog. 

We ask everyone who books a PostHog demo this question using a free text box – we could use a defined list, but we prefer the flexibility. We collect this data in PostHog for our marketing and customer success dashboards.

## 17. Measure how long it takes users to complete a series of actions

Whether you want to understand how long it takes to onboard a new organization, or how long it takes for customers to complete a purchase, the [Event Sequence Timer](/apps/event-sequence-timer) lets you define a series of events in order and track the time to complete them all. 

Once you're tracking this metric you can then make changes to improve the process and examine the difference, positive or negative. Improving processes like onboarding can have a big impact on customer satisfaction and other important downline metrics, like [new user activation](/blog/b2b-saas-product-metrics#new-user-activation).

## 18. Organize your custom events on Notion

No modern data platform is complete without a [Zapier Connector](/apps/zapier-connector), so naturally PostHog has one. 

What's possible with PostHog and Zapier combined is almost limitless, but one option is to use Zapier to [keep a record of custom events in Notion](/tutorials/how-to-connect-posthog-and-notion-with-zapier). 

This can be useful for sharing your most valuable metrics with colleagues who don't use PostHog, or to simply keep an eye on things and make sure people aren't creating duplicate custom events.
 
## 19. Collect location data while respecting user privacy

We created the [GeoIP Enricher](/apps/geoip-enrichment) app to enhance events and persons with IP location data, allowing you to run queries on a range of geographic data, including city name, country, continent and time zone data. 

But what if you want geographic data, but don't don't to collect more personally identifiable IP data? 

Enter the [Property Filter](/apps/property-filter) app, which was built by PostHog users Witty Works so they [could collect country data in a privacy-friendly way](/tutorials/property-filter).

## 20. Track your GitHub Star growth

For any open source project, tracking GitHub Stars and the rate of growth is a useful way to understand the level of awareness for your project. We built [GitHub Star Sync](/apps/github-star-sync) so you can track them in PostHog, identify and understand surges, and correlate stars to new releases.

## 21. Connect PagerDuty and PostHog to get threshold alerts

Connecting PagerDuty and PostHog allows you to get alerts on all sorts of metrics based on PostHog events. 

Want to know when you're going viral? Set an alert when website page views go above a threshold. You can do the same for tracking errors, logins – pretty much anything you can track as an event on a Trends insight. 

It's also useful for setting goals and receiving alerts when you achieve them.

## 22. Track support tickets by connecting Zendesk

The Zendesk Connector for PostHog is a two-way connector that allows you turn Zendesk tickets into PostHog events and enrich Zendesk tickets with PostHog event data. 

Importing support tickets as events allows you to understand support trends, and use Cohorts and Correlation Analysise to breakdown common traits among users who raise tickets frequently.

> Got an idea to add to this article? Share it on the PostHog website repo.

<ArrayCTA />