---
date: 2024-05-09
title: 'What is user stickiness and how to measure it?'
author:
  - james-temperton
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-marketing/marketing-hog.jpg
featuredImageType: full
tags:
  - Product analytics
  - Product metrics
  - Product engineers
  - Growth
crosspost:
  - Founders
  - Blog
---

Can’t stop scrolling on TikTok? Endlessly gawping at Instagram? That’s stickiness. Popularized by Facebook, the notion of stickiness remains a crucial measure of how engaging your product or service is regardless of whether you’re a planet-conquering social media app or a B2B SaaS company.

In this guide we’ll explain what user stickiness is, why it’s so important, how to measure it, and give you some tips on how to increase the stickiness of your product.

## What is user stickiness?

Stickiness is a type of insight that lets you see how many people use your product on a regular basis. There are a few different ways to calculate it. DAU/MAU ratio is the most popular, but session frequency, session duration, and individual feature use can also help you understand how sticky your product is.

Customer stickiness is similar but different to customer retention and loyalty. Think of it like this:

* **Customer loyalty** is all about building emotional connections and brand advocacy. Your most loyal customers should love your product. \

* **Customer retention** is a metric that focuses on reducing user churn. You do this by fixing reasons why users might want to leave. \

* **Customer stickiness** is a measure of how well your product keeps users coming back. Achieve that, and you might well have [product-market fit](/founders/measure-product-market-fit).

All three of these metrics work in tandem: improving customer retention is likely to give you more loyal customers, who are, in turn, more likely to be sticky. Get this right and you’ll have a growing customer base, growing revenue, and growing profits.

## Why is user stickiness important?

However you measure it, stickiness is the lifeblood of a successful product. Acquiring new users can be expensive and time-consuming, so once you’ve onboarded someone you want to keep them engaged and loyal. And, if your product is paid, you want to keep them paying.

Improving the stickiness of your product, and individual features within it, will allow you to spend more time on existing customers, rather than chasing new ones. Loyal users also provide you with great data to help you optimize your product.

For early-stage startups, stickiness will also likely help create brand advocates. Sparking joy for your more loyal users will make them more likely to recommend your product to friends and colleagues, creating priceless word-of-mouth growth.

## How to measure your DAU/MAU ratio

The [DAU/MAU ratio](https://posthog.com/tutorials/dau-mau-ratio) is, simply put, the radio of daily active users over monthly active users. How you define ‘active’ will depend on what your product or service does. If you work for Instacart, for example, you’re probably looking for people who have placed an order. At Spotify, you’re looking for people who have listened to a song or podcast. 

Deciding on what action, or actions, a user must perform to count as ‘active’ is an important step and should align with the mission of your company and your [ICP](https://posthog.com/newsletter/ideal-customer-profile-framework). Define ‘active’ based on the action, or actions, that impact the success of your company.

To calculate your DAU/MAU ratio, divide your daily active users by your monthly active users. To get a percentage, multiply the total by 100. For example, say your company has 1,000 DAUs and 2,000 MAUs. Divide 1,000 by 2,000 to get 0.5. Multiply that by 100 to get 50%. 

This means that 50% of your monthly active users use your product every day. The higher the number the better. So a DAU/MAU ratio of 70% is better than a DAU/MAU ratio of 60% and so on.

A blunt measure of DAU/MAU can make a great headline figure – but it hides a lot of nuance. And this is where HAU, WAU, MAU, QAU and YAU come in.

### Are you a HAU, DAU, WAU, MAU, QAU, or YAU?

How often do people use your product? The answer to that will depend on what kind of product or service you’ve built. A product can still be ‘sticky’ even if it’s used just once a week or once a month provided that’s how you expect people to interact with it.

Think of it like this: what problem is your product solving? And how often do people need to solve that problem? 

At Uber, for example, ‘normal’ usage might be for a user to book a ride twice a month. At Airbnb, it might be ‘normal’ for someone to book a trip once per year. It’s unlikely that a ‘normal’ PayPal customer uses the service every week, but they likely use it every month.

Meta’s products and services have become so dominant because they’re very good at getting users hooked every day, but this simply isn’t possible, or necessary, in a lot of industries. Users of B2B SaaS products, for example, often have no choice but to use the products their employer chooses. Here, metrics like adoption, retention, feature use, and net promoter score are the [most important metrics](https://posthog.com/blog/b2b-saas-product-metrics).

But how do you work out where your company sits? According to research by [Sequoia](https://medium.com/sequoia-capital/selecting-the-right-user-metric-de95015aa38), the threshold for stickiness is 50% for HAU/DAU, and 60% for DAU/WAU, WAU/MAU and MAU/QAU and QAU/YAU. Think of it like this table:

[TABLE HERE](https://miro.medium.com/v2/resize:fit:1312/format:webp/0*uTjliTsC7Gusreg-)

If you measure your HAU/DAU and it’s 50% or above, then your product is used daily and you should focus on your HAU/DAU. If your HAU/DAU is below 50% then keep reading right across the table until you pass one of the thresholds. If your DAU/WAU is 68%, for example, then focus on your DAU/WAU. If it’s only 30% then keep going right until you pass one of the thresholds.

This table is also a good way of identifying different kinds of users. If your WAU/MAU is 65% but your DAU/MAU is 20% then that still means there’s a significant subset of users actively using your product every day – even if you consider a ‘normal’ user as someone who is only active once a week.

### What’s a good DAU/MAU ratio?

This is dependent on a lot of factors. What is your product? What industry do you operate in? Who is the intended audience? What is your business model? Facebook, the granddaddy of the DAU/MAU ratio, has almost always had a ratio of 50% or more. It recently stopped reporting this figure in its financial results, but back in March 2023 it was 68%. That’s incredibly high – and a big reason why parent company Meta continues to be so valuable. 

Most products and services can only dream of such numbers. According to research by [Mixpanel](https://mixpanel.com/blog/2024-mixpanel-benchmarks-report/), the average DAU/MAU ratio across all industries in 2023 was 37%. Here’s how that breaks down by industry:

* Technology: 41%
* Financial services: 40%
* Media and entertainment: 36%
* Healthcare: 30%
* Ecommerce: 29%
* Gaming: 27%

A similar analysis by Mixpanel in 2017 found that the average DAU/MAU ratio for B2B and B2C SaaS products was 13%. Anything above 20% is considered great.

### Beyond the DAU/MAU ratio

Your DAU/MAU ratio, or similar, hides a lot of nuance. Products are rarely just one feature. And a lot of products are so large that a single stickiness ratio won’t represent what’s actually happening or give enough detail on what’s working and what’s not.

To better understand what is and isn’t making your product sticky you should be measuring your DAU/MAU ratio, or similar, based on different events, actions, and cohorts. Start with these:

* Measure your **feature DAU/MAU ratio **to analyze the stickiness of individual features.
* Create a **new user DAU/MAU ratio** to understand how long newly-onboarded users are sticking around.
* DAU/MAU is a proxy for power users, but **tracking a power user DAU/MAU cohort** will help you understand how often your** **most loyal users are interacting with your product.

You can do this in PostHog. [Read our in-depth guide](https://posthog.com/tutorials/dau-mau-ratio) to get started.

### Other important stickiness metrics

While MAU/DAU and other ratio metrics are key indicators of user stickiness, they don’t tell you everything. As with any metrics, you need to combine them with other data points to get a clear picture of what makes your product sticky and what makes users churn. Here are some other key metrics to track:

* **Session frequency and duration:** How often do users return to use your product and, when they do, how long is each active session? As with all stickiness metrics, to properly contextualize this you need to have a clear idea of a ‘normal’ session frequency and duration. Should users be interacting with your product for several hours a week, or several minutes a day? A product with a high session frequency but a low session duration could simply be doing a fantastic job of helping users solve a problem quickly. \

* **Feature usage:** Don’t just analyze user behavior across your entire product. Break down the MAU/DAU ratio, and other key stickiness metrics, across different product features to find those that users love and those that they don’t. Use session replays and surveys to understand user behavior and gather feedback.

* **User journeys:** Track how users navigate your product and if they are able to complete important tasks easily. Low completion rates of key tasks could be a sign that your product is either hard to use or confusing. If users are getting frustrated, they’re unlikely to stick around. \

* **User lifetime value (ULTV):** This metric, also known as customer lifetime value, or CLV, estimates the total revenue a user will generate for your company. Sticky users who are engaged and regularly using your product will normally have a higher UTLV.

### How can you increase user stickiness?

Measuring stickiness will only get you so far. To improve your MAU/DAU ratio, and other key stickiness metrics, you’ve got to improve your product. Start by focusing on these three areas:

* **Onboarding.** A great onboarding process reduces user frustration right from the start. Focus on great documentation, create videos that walk users through key functionality, and focus on making it feel [personalized and light-touch](https://posthog.com/blog/how-we-built-email-onboarding). 

* **Feedback and support.** Conduct user surveys, measure metrics like your [NPS and CES](https://posthog.com/product-engineers/nps-vs-csat-vs-ces),and [talk to users](https://posthog.com/newsletter/talk-to-users) to understand their pain points. Invest in great, technical support to help your most engaged users get the most out of your product and gather feedback on what needs improving. 

* **Product updates.** At PostHog, [we ship weirdly fast](https://posthog.com/founders/how-come-we-ship-so-much). That’s not a flex, it’s a crucial part of how we improve our product and make sure our users are happy. No product is ever perfect. Investing in improvements and new features will improve user satisfaction and, hopefully, make your product more essential.