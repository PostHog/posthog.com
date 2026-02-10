---
title: Why buy PostHog
sidebar: Handbook
showTitle: true
---

AKA our Value Proposition, these are some of the things we've found useful to share when chatting to customers about why PostHog is different and better than our competitors. As a company, the primary user persona we are building for are Product Engineers, so we focus on them first. We then provide messaging for the other roles we may encounter in an inbound sales cycle, and still want to be successful when selling to them.

## Product Engineers

### One-liner

> We help you debug and ship your product faster.

### Summary

By integrating PostHog into your app, you’ll be able to track and diagnose errors, roll out and test new features and gain a better understanding of your user behavior.  With that greater understanding, you'll then be able to take action on it and respond to your user needs quickly and effectively.  Getting all of these capabilities through one SDK means you reduce the overhead of maintaining your app and can focus on shipping your product.

### Use cases
- [Automated error tracking](/error-tracking) for front and back end, coupled with other capabilities like product analytics and session replay lets you understand where the biggest issues are in your app, see them happening in real time and then diagnose and fix them.
- [Target new features](/feature-flags) at a segment of your user base, see them experiencing them in real time and get feedback via surveys on what’s working and what’s not.
- [Test out new features](/experiments) by splitting old and new experiences between users - PostHog’s statistical model will help you understand which variant of a feature to choose and then safely roll that out to all of your users.
- [Understand and debug](/llm-analytics) how your users consume AI in your product and monitor performance and cost when using different models.
- [Respond to churn](/surveys) by triggering a survey when a subscription is canceled to understand what went wrong for them and how you can improve your product.

## Product Managers

### One-liner

> Self-serve analytics without needing to ask your engineers or data team for help.

### Summary

After your engineers integrate the PostHog SDK, you’ll be able to self-serve analytics without asking your data team for insights.  We automatically track user interactions with your app and then let you tag key events for use in analytics.  You’ll also be able to navigate from the data to individual user interactions to see how users interact with your app and make informed product decisions, and then finally use behavioral triggers to send feedback surveys and more all without engineering effort.

### Use cases
- [Create trends, funnels and other insights](/product-analytics) without asking your engineers to instrument events.  We automatically track pageviews, clicks, rageclicks etc and then make it easy to visualize these with insights Product Managers will be familiar with.
- [Easily uncover user friction](/session-replay) by following the drop-offs in a funnel to replays to understand what the user experiences.  Surface any errors to your engineering team via issue assignment to get your user problems solved quickly.
- [Enrich your product data](/bi) with revenue and other data to gain a deeper understanding of what drives revenue growth in your product.  It’s only a few clicks to integrate most data sources and then you’ll be able to enrich your user data with additional metrics without a data team.  We do the heavy lifting for you.
- [Ask questions of your product](/ai) - We create the insights for you, all you need to do is ask PostHog AI questions about your product.
- [Respond to churn](/surveys) by triggering a survey when a subscription is canceled to understand what went wrong for them.
- [Create event-driven workflows](/workflows) to automatically reach out to customers who hit a certain point in your product journey.


## Marketing

### One-liner

> A familiar analytics experience with all of the integrations you need to decide where to focus your marketing efforts.

### Summary

By deploying our simple JavaScript snippet on your website you’ll capture all of the data you need to measure channel performance, and then visualize that data in a familiar format without any additional report writing.  Optionally hook up Stripe or other revenue sources to measure revenue attribution.

### Use cases
- [Replace Google Analytics](/web-analytics) to get a view on your marketing data which is familiar to experienced marketers.  Recent updates to GA4 have not sat well with that persona so folks are looking for something more familiar.
- [Define conversion funnels](/funnels) to understand which content drives your users to sign up to your product.  
- [View aggregated page engagement](/heatmaps) with heatmaps and scroll depth tracking understanding what’s popular in your content.
- [Easily connect revenue data](/revenue-analytics) with a few clicks to get a deeper understanding of which marketing efforts drive the most revenue.
- [Ad platform connection](/docs/cdp/destinations/google-ads) provides pre-built insights to help you understand your campaign performance and associated costs.


## Data Engineers

### One-liner

> A complete developer platform which fits into your existing data stack.

### Summary

Using PostHog's [CDP](/cdp) lets you aggregate data from multiple technologies and platforms.  It takes a few clicks to set up exports of that data to your data warehouse, and your product and engineering teams can self-serve their own analytics from within PostHog.

### Use cases
- Aggregate your user and error data from web and mobile apps, backend systems, ad platforms and others into your data warehouse via our simple to set up [batch exports](/docs/cdp/batch-exports).  Avoid needing to set up ETL jobs from disparate sources and figuring out APIs.
- Let your engineers and product team self-serve analytics and error tracking from within a familiar platform.

# General talking points for all roles

- By having [all of the products you need in one place](/handbook/why-does-posthog-exist), you reduce the burden of navigating and paying for different tools on all of your teams.  
- [We only build products which we know people use today already](/handbook/which-products) (e.g. have product market fit) but provide them in an integrated and cost-effective manner.  
- Analytics is an after-the-fact passive activity, but your events in PostHog can be so much more than that. You can use PostHog events to react to customer behaviors, without investing engineering time to make those workflows.
- Our [usage-based pricing](/handbook/how-we-make-money) means that you’ll only pay for what you use and have full control of those costs, unlike opaque software contracts, where the prices go up every year with zero innovation attached.  
- Plus, [the way we do sales is different](/sales).