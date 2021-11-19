---
date: 2021-11-03
title: An introduction to customer retention
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: ["marcus-hyett"]
featuredImage: ../images/blog/blog-generic-5.png
featuredImageType: full
---

Customer retention metrics are some of the most important to understand and the most vital to the long term success of any product. In this article we’ll explain what customer retention is, why it’s important and some examples of tactics you can use to improve customer retention and reduce churn in your user base. 

Interested in how to track retention and churn in PostHog? [Check our user guides to find out more about our Retention and Stickiness tools.](https://posthog.com/docs/user-guides/retention). 

## What is customer retention?

Customer retention is simply your ability to hold on to the customers you have, so that they keep coming back for more. 

There are three key metrics used in retention analytics:

- **Retention rate:** % of customers still using the product at the end of the period.
- **Churn rate:** % of customers lost by the end of the period.
- **Lifetime value (LTV):** How much each customer is worth to you before they churn.

## Why is retention important? 

If your retention is bad, no matter how much you spend on advertising or how many new users or you sign up you will struggle to grow. The people who are joining are just leaving.

Many growing businesses focus only on sign-ups, because getting 1,000 new users sounds like progress. But if you lose 90% of them through churn, you only have 100 at the end of the month. If you acquired half the number of users but retained 90% you'd end up with 450 users at the end of the month, instead of 100.

It’s also always cheaper to retain an existing customer than to acquire a new one. One report by [Bain & Company](https://media.bain.com/Images/BB_Prescription_cutting_costs.pdf) suggests that increasing retention by as little as 5% can increase revenue by as much as 25-90% if the lifetime value (LTV) of a customer is high enough.

Measuring customer retention is also important for improving your product itself, as high retention can indicate a good product/market fit. You can also use tools such as [retention tables](https://posthog.com/docs/user-guides/retention) to track time-based cohorts, which can be helpful for spotting how new releases or marketing activities impact users.

## What does good retention look like?

A good benchmark for retention rate of a SaaS product is around 95-98% retention per month. 99% or more is considered excellent. However retention rates will differ based on the nature of your product and the size of your customers.

You would typically expect much higher retention rates for businesses paying >$100K/yr than you would for businesses spending <$100. However, for consumer facing and free products, retention rates of around 30% are considered a good benchmark.

## How to calculate customer retention?

To calculate your overall customer retention over a period you need to know: 

- How many customers you have at the start of a period (A)
- How many customers you have at the end of a period (B)
- How many new customers were added during that period. (C) 

You can then calculate your retention as a percentage (R) using the following formula:

> ((B - C) / A) * 100 = R

For example, if you have 100 customers at the start of a year, gain 35 new customers during the year and end the year with a total of 80 customers then your retention rate would be:

> ((80-35)/100)*100 = 45% retention

Meaning that each year a little more than half of your customers are churning and your usage as a whole is in decline. This would be a worrying sign!

It’s important when measuring retention to choose a time period which suits your product usage. Some businesses, such as news websites, may want to measure daily or hourly retention rates while others, such as international hotels, may choose to measure retention over an annual period or longer. 

## Understanding cohort retention?

Understanding the retention rate for all users is a good starting point, but as you make improvements to your product you will need to understand if they're improving your retention. That's where retention tables come in. 

Retntion tables break down your retention by cohorts, with each cohort being a group of users which activated within a certain time period (e.g. one week). This enables you to understand how you retain individual cohorts over time. 

## How to read retention tables?

Retention tables can appear confusing if you’ve not used them before, so let’s look at an example from PostHog’s retention tool.

![Retention table](../images/retention-table.png)

This retention table is looking at repeat usage on a daily interval, with users from each day grouped into a cohort. The far left column tells you which day the cohort was created on, while the second column tells you how many users are in that cohort.

The third column, labelled Day 0, tells you how many users in that cohort used the product on that day. It will always read 100% because by definition any users in that cohort used the product on that day. 

The remaining columns tell you how many users from each cohort came back _each day_. We can see that five users used the product on 9 July and that 20% of them came back on days one (10 July), two (11 July) and three (12 July). After that, none of them came back. The empty cells which ‘staircase’ off the chart are due to not enough time having passed for those cohorts - the data doesn't exist yet.

> Find out more about retention tables in [our tutorial about measuring retention and tracking churn in PostHog](https://posthog.com/docs/tutorials/retention). 

## How can you improve customer retention and reduce churn?

There are many tactics you can use to try and improve a flagging retention rate, all of which can be grouped into the following categories:

- **Improving activation:** You can leverage tools such as [PostHog's Funnels](https://posthog.com/docs/user-guides/funnels) to understand where people are dropping off after they sign up, then solve these problems. Do they get to the key feature of your product before they leave? User guides and tool tips can be really helpful to help users get activated successfully.
- **Creating more value for customers:** Building new features that your customers need and love will create more value for them and will drive them to return and use the product again in the future. You can use tools such as [Feature Flags](https://posthog.com/docs/user-guides/feature-flags) to test new features safely, or to roll them out to beta testers.
- **Re-engagement:** Users who like your product can sometimes be distracted by other things. Well timed re-engagement messages such as "_you left these items in your basket_" can be extremely powerful in bringing customers back to your product and improving retention. Tools such as [PostHog's Paths tool](https://posthog.com/docs/user-guides/paths) can help you understand where users are getting distracted.

There are a variety of product analytics tools available to help you explore your product data, understand your users and make such changes — but naturally we think PostHog is one of the best for improving retention. That’s because PostHog is an all-in-one product analytics platform, and gives you a wide breadth of tools, such as session recordings, feature flags, retention tables and more. No other product analytics platform offers a similar breadth of features. 

> Ready to find out more? Try [PostHog for free today](https://posthog.com/signup) or [schedule a demo with one of our engineers](https://posthog.com/book-a-demo) to see it in action and start improving your customer retention today. 
