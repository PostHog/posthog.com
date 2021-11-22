---
date: 2021-11-23
title: How to measure product engagement
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: hanna-crombie
featuredImage: ../images/blog/blog-generic-1.png
featuredImageType: standard
---

Product engagement is the most important factor when it comes to driving retention and revenue for your business. Though it seems easy to view success through a financial lens, revenue alone is rarely a clear indicator of a sustainable product. 

In this article we’ll take a look at why strong customer engagement metrics are vital to the success of your product, how to define engagement for your platform, and how to use analytics tools to measure and build on the results.

## What is product engagement?
The golden rule for any product manager: [listen to your users](https://posthog.com/handbook/product/user-feedback).

Product engagement metrics measure how active your users are and how they spend time with your product. They give valuable insight into what is resonating, and what’s not quite hitting the mark. Knowing more about the specifics of customer engagement can inform your product roadmap going forward, so you build more features that matter and don’t dilute your offering with ones that don’t. 

Churn is a metric we associate closely with customer satisfaction but alone it isn’t sophisticated enough to explain _why_ your customers do or do not stay. It’s also a lagging metric – it can take at least 30 days just to understand that a customer is not coming back, during which you’ve lost precious time.

Your users are constantly providing feedback through their actions; which features they interact with, how they scroll, where their mouse hovers. By interpreting those actions, you’ll better understand what keeps them on your platform and be able to build more of what they need and love.

Product engagement also makes a great [North Star Metric](https://posthog.com/blog/north-star-metrics), as it’s usually a reliable forecast for retention and can provide a strong foundation for product development.

<BorderWrapper>
    <Quote
        imageSource="/images/customers/anca.png"
        size="md"
        name="Anca Filip"
        title="Head of Product, Mention Me"
        quote={`“PostHog has helped us improve our product and get a much better understanding of our users than we've ever been able to before.”`}
    />
</BorderWrapper>

## What are product engagement metrics?
The engagement metrics you need to track will depend on what your business looks like and what your product is.

In order to use the right product engagement metric for your organization you need a strong understanding of your customer personas. What does your ideal user look like? How do they interact with your platform? What are the revenue drivers attached to them?
By examining your personas and how their individual actions influence revenue and growth, you can select the most appropriate engagement metrics for your product.

### Common engagement metrics
For some products **interactions** are a key metric. Social media platforms, for example, look at numbers of likes, comments and shares.

For a gaming product **session duration** is likely to be a good indicator of positive user engagement. The longer users play, the better. 

Other digital services may track different types of usage. YouTube may base engagement metrics on **views**, for example, while Google may use the number of **search queries**.

The individual metrics are limitless. You’ll see **pageviews**, **bounce rate**, **page scroll depth**, **purchases** and many more used as KPIs for different business models. It’s important not to choose these glibly, but to make sure you’ve chosen the perfect fit for your product.

## What is the best way to measure product engagement?
Listening to users’ actions is important, but how can you track engagement metrics and translate them into actionable insights?

![](../images/blog/how-to-measure-engagement/correlation.png)

A good way to get started is to use some basic metrics to create a broad framework for engagement insight. The following metrics are very easy to track with the help of product analytics software such as PostHog (pictured above).

### Active users
Active users are those who perform valuable actions on your platform. 
Daily Active Users (DAU) is a key metric for subscription services and is expressed as a percentage of total users. High DAU is evidence that you’ve been successful in attracting customers. On PostHog, you can track this by [defining actions for key activities, such as daily sign-ins](https://posthog.com/docs/user-guides/actions).

This metric is particularly important if you’re working with an ad-based revenue model. The number of daily users you see is directly linked to your profitability, so you should be keeping a close eye on DAU.

### Stickiness
Imagine you’re a customer at a local hair salon. 

You like the cut you’re given, so you book to go back. That’s great for their business – at that salon you’re considered a sticky customer. 

The stickiness metric validates that your customers are happy and are likely to keep using your product. It’s a good demonstration of [retention](https://posthog.com/blog/introduction-to-customer-retention).

Again, the way you measure stickiness will depend on your business but many product managers calculate stickiness using this formula: 

> DAU ÷ MAU. 

This will show you what percentage of customers you’re retaining over a period of time. 

An easier way to track this is to use a tool such as PostHog, which has a dedicated stickiness tool which can be used to track the stickiness of any defined action and gives a granular view of how this correlates to engagement. 

### Adoption
Adoption represents the number of users using key features in your product.
Each new feature presents an opportunity for additional customer value. Low adoption implies that you’re offering something which users don’t need, or that there’s something wrong with the feature itself. High adoption means users are flocking to a new feature.

If users are paying for features they don’t use then it lowers the perceived value, so it’s essential to keep an eye on what isn’t working and rollback where necessary. That’s why PostHog offers tools like [feature flags](https://posthog.com/docs/user-guides/feature-flags), which help you to incrementally roll out new features and key an eye on adoption progress. If something isn’t working, you can roll it back instantly. 

[Flagging the use of specific features as a key event](https://posthog.com/docs/user-guides/events) per user type will also help you to track adoption.whether you’re successfully reaching the users they were intended for.

By comparing the values of these metrics against each other you can begin to get an idea of where you’re winning on product engagement, and where you might be losing out. 

![](../images/blog/how-to-measure-engagement/product-engagement-metrics.jpeg)

## What tools are good for tracking product engagement?
Naturally, we think PostHog is the best tool for tracking product engagement. 

This is because, in addition to tracking the metrics above, PostHog enables you to to understand their context through tools such as  [session recording](https://posthog.com/docs/user-guides/sessions), [heat maps](https://posthog.com/docs/user-guides/toolbar#inspecting-elements), [cohorts](https://posthog.com/docs/user-guides/cohorts) and [correlation analysis](https://posthog.com/docs/user-guides/correlation). You can also create dashboards to monitor engagement continuously.

Paying attention to engagement and building more of what your customers love is a sure way to turn them from regular users into fans and advocates. Stay on top of your user engagement, listen and respond, and you’ll turn casual customers into product champions.

> PostHog is an open source product analytics tool which enables teams to build better products faster without sharing their user data with third parties.[Try PostHog for free today](https://posthog.com/signup) or [schedule a demo](https://posthog.com/book-a-demo) to learn more.

