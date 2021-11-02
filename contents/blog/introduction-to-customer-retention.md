---
date: 2021-11-06
title: An introduction to customer retention
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: joe-martin
featuredImage: ../images/blog/blog-generic-5.png
featuredImageType: full
---

Customer retention metrics are some of the most important to understand and the most vital to the long term success of any product. In this article we’ll explain what customer retention is, why it’s important and some examples of tactics you can use to improve customer retention and reduce churn in your user base. 

Interested in how to track retention and churn in PostHog? [Check our user guides to find out more about our Retention and Stickiness tools.](https://posthog.com/docs/user-guides/retention). 

## What is customer retention and why is it important?

Customer retention is simply your ability to hold on to the customers you have, so that they keep coming back for more. The opposite of retention is _churn_ — that is, the customers who leave and don’t come back. 

Customer retention is obviously important for the future of a business in a financial sense. It’s always cheaper to retain an existing customer than to acquire a new one, so high customer retention is a good indicator for success. One report by [Bain & Company](https://media.bain.com/Images/BB_Prescription_cutting_costs.pdf) suggests that increasing retention by as little as 5% can increase revenue by as much as 25-90% if the lifetime value (LTV) of a customer is high enough.

Measuring customer retention is also important for improving your product itself, as high retention can indicate a good product/market fit. You can also use tools such as [retention tables](https://posthog.com/docs/user-guides/retention) to track time-based cohorts, which can be helpful for spotting how new releases or marketing activities impact users.

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

## How to read retention tables?

Another way to measure retention is using retention tables, which are useful if you want to explore your retention in greater detail or over rolling time periods. Retention tables can appear confusing if you’ve not used them before, so let’s look at an example from PostHog’s retention tool.

![Retention table](../images/retention-table.png)

This retention table is looking at repeat usage on a daily interval, with users from each day grouped into a cohort. The far left column tells you which day the cohort was created on, while the second column tells you how many users are in that cohort.

The third column, labelled Day 0, tells you how many users in that cohort used the product on that day. It will always read 100% because by definition any users in that cohort used the product on that day. 

The remaining columns tell you how many users from each cohort _came back each day_. We can see that five users used the product on 9 July and that 20% of them came back on days one, two and three. After that, none of them came back. The empty cells which ‘staircase’ off the chart are due to not enough time having passed for those cohorts. 

> Find out more about retention tables in [our tutorial about measuring retention and tracking churn in PostHog](https://posthog.com/docs/tutorials/retention). 

## How can you improve customer retention and reduce churn?

There are many tactics you can use to try and improve a flagging retention rate temporarily, such as re-engaging lapsed customers with a targeted email offer. However, to have a lasting impact it’s important to tackle root causes and understand why you’re not retaining enough users. 

Often this will lead you to product changes which can improve your product, or marketing activities such as nurture campaigns to stop users churning in the first place. 

There are a variety of product analytics tools available to help you explore your product data, understand your users and make such changes — but naturally we think PostHog is one of the best for improving retention. That’s because PostHog is an all-in-one product analytics platform, and gives you a wide breadth of tools, such as session recordings, feature flags, retention tables and more. No other product analytics platform offers a similar breadth of features. 

> Ready to find out more? Try [PostHog for free today](https://posthog.com/signup) or [schedule a demo with one of our engineers](https://posthog.com/book-a-demo) to see it in action and start improving your customer retention today. 
