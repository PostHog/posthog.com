---
date: 2021-10-22
title: An introduction to product analytics and how it works
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: joe-martin
featuredImage: ../images/blog/blog-generic-1.png
featuredImageType: full
---
## What is product analytics?

There are a lot of ways to describe product analytics and no fixed definition which every product manager or engineer could agree on. However, at the most basic level product analytics refers to the process of gathering data about how a product is used, then analyzing that data in order to make decisions about improving it. 

A common example of product analytics is collecting information about how many users reach each stage of an onboarding funnel, so that changes can be identified to drive better conversion rates. 

There are two types of data which are typically gathered for product analytics:

- *Quantitative data* is that which is objectively measurable, such as an increase in a number of users or sales. Using [funnel analysis](https://posthog.com/docs/user-guides/funnels) in PostHog to measure the conversion rate of a sign-up flow is an example of quantitative data analysis.
- *Qualitative data* is that which is subjective, such as user feedback or observations. Using [session recordings](https://posthog.com/docs/user-guides/recordings) in PostHog to intuit where users may be experiencing friction is an example of qualitative data analysis.

While there is a clear distinction between qualitative and quantitative data, there are also frameworks which can be used to translate between the two. NPS scores, for example, are often used to trandslate a user sentiment into a measurable data point.

> Find out how [PostHog’s enables you to leverage quantative and qualitative data](https://posthog.com/product), or [schedule a demo](https://posthog.com/book-a-demo) to see it in action. 

## Why are product analytics tools important?

Product analytics tools are important because they enable teams to make thoughtful and well-informed decisions about changes to their product. Product analytics tools also provide the means to measure success (or failure!) when needed, which can be important for knowing when to rollback changes. 

While it is certainly possible to make and prioritise changes to a product without using product analytics tools, doing so is often very risky. Working without an analytical approach means it’s impossible to know if changes are having a beneficial impact, or even if you are solving the right problems to start with. 
<BorderWrapper>
    <Quote
        imageSource="/images/customers/rikin.png"
        size="md"
        name="Rikin Kachhia"
        title="Software Engineer, Hasura"
        quote={`“We observed drop-offs at very particular stages of our onboarding flows, as a result, we took several actions such as moving these steps further down the funnel. These changes helped us deliver a 10-20% improvement in our conversion rate.”`}
    />
</BorderWrapper>

## Who uses product analytics?

Nearly all modern businesses which sell digital products will employ product analytics tools at some level, from new start-ups such as [Pry](https://posthog.com/customers/pry) to established products with thousands of users such as [Hasura](https://posthog.com/customers/hasura).

Product analytics tools are _not_ used solely by Product teams, but can be used by a wide range of teams or individuals within a business. These can include:

- Product Managers or Product Engineers
- Growth Marketers or Product Marketers
- Software Engineers or Developers
- Leadership or senior management
- UI or UX Designers

Individuals will often approach product analytics with a particular area of focus depending on their role. Product Engineers, for example, may investigate the adoption rate for certain features so that they can make decisions about the product roadmap. Meanwhile, UX Designers may use product analytics tools to understand where users spend the most time in a product, so they can optimize an interface. 

<BorderWrapper>
    <Quote
        imageSource="/images/customers/joe.png"
        size="md"
        name="Joe Saunderson"
        title="Software Engineer, Mention Me"
        quote={`“We use feature flags to issue changes to 50% of users and then compare the effect. Experiment, find results, decide where to focus and then iterate.”`}
    />
</BorderWrapper>

## What product metrics should I track?

It’s important when using product analytics tools to look at a wide variety of data and consider metrics relevant to specific decisions. Some metrics, such as number of customers, can give you a good sense of your overall product health but may not help you plan a product roadmap.

Some of the product metrics you should definitely consider monitoring though include:

- Usage metrics, such as DAU (daily active users) or MAU (monthly active users)
- Discovery metrics, such as what percentage of users adopt new features
- Engagement metrics, such as how often users login to your product
- Business metrics, such as MRR (monthly recurring revenue)
- Retention metrics, such as churn rate and referral rates

The interval you track this data over will also vary depending on what the product is and the typical user lifecycle, but it can often help to look at data over daily, weekly, monthly and quarterly intervals.

One simple set of metrics which can help teams to focus their efforts is the so-called pirate funnel, which tracks AARRR. That stands for: acquisition, activation, retention, referral and revenue.

> Find out [how to build an AARRR pirate funnel](https://posthog.com/blog/aarrr-how-to-build-pirate-funnel-posthog-with-posthog) in PostHog to determine where you can make improvements to your product.

## Do I need to share my data when using product analytics tools?

Many product analytics tools work by capturing user actions with a short code snippet or third-party cookie, which then sends that data to the product analytics platform which runs on a remote data centre. This is how popular product analytics tools such as Amplitude or Mixpanel work. 

However there are many situations where it may be preferable not to share data with a third-party analytics platform, such as a need to protect user information or mitigate the risk of data breaches. This is why PostHog enables teams to self-host their product analytics, so that you can keep data on your existing infrastructure and benefit from product analytics without sharing data.

Self-hosting your product analytics platform also provides other benefits, such as circumventing many ad blockers or browser privacy features due to the lack of third-party cookies and enabling greater control over how the service performs.

> Find out [how to self-host product analytics](https://posthog.com/docs/self-host) with PostHog and easily deploy to your infrastructure using Digital Ocean. 

## Is Google Analytics good for product analytics?

Google Analytics is one of the most popular analytics platforms in the world and is useful for understanding a number of important metrics, but it isn’t the ideal platform for running product analytics. This is because Google Analytics was built to help users understand web metrics, rather than answer questions about _why_ users behave in certain ways. 

In short, Google Analytics provides a handy overview of metrics such as bounce rate or web traffic, but it doesn’t offer more comprehensive tools such as feature flags or session recording.

As a result, Google Analytics is often the preferred tool for specific roles in a marketing team who use other Google tools like AdWords, but is unsuitable for the needs of Product or Engineering teams. 

<BorderWrapper>
    <Quote
        imageSource="/images/customers/anca.png"
        size="md"
        name="Anca Filip"
        title="Head of Product, Mention Me"
        quote={`“We used to use Google Analytics, but PostHog has helped us improve our product and get a much better understanding of our users than we've ever been able to before."`}
    />
</BorderWrapper>

## What are the best product analytics tools?

There are a wide variety of product analytics tools available to choose from, each with its own quirks and strengths. Popular options include platforms such as Amplitude, Heap or Mixpanel, though each of these requires that user data must be shared with the platform. 

While we’re obviously biased on the topic, we believe PostHog is the best product analytics platform because it enables teams to choose whether to self-host or to host in the cloud, integrates with tools such as data warehouses and offers everything teams need to interrogate their data. Self-hosting means no data is shared with anyone else (not even PostHog), while hosting in the cloud enables you to get started in minutes. 

In either case, PostHog offers all of the features you’d expect from a market-leading product analytics platform, including session recording, feature flags and funnel analysis. It's an all-in-one product analytics tool.

> PostHog is an open source product analytics tool which enables teams to build better products faster and without writing SQL. [Try PostHog for free today](https://posthog.com/signup) or [schedule a demo](https://posthog.com/book-a-demo) to learn more. 
