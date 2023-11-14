---
date: 2023-11-13
title: The most useful B2B SaaS activation metrics
featuredImage: ../images/blog/experiment-hog.jpg
featuredImageType: full
author:
  - lior-neu-ner
tags:
  - Product analytics
  - Product metrics
  - Product engineers
  - Growth engineering
  - Growth 
---

So, you're building a B2B SaaS product.

Everyone knows you've got to measure stuff to succeed. This is not news. 

What, why, and how? These are the questions that matter and the answers lie in the product metrics you track.

In this guide, we'll cover:

1. [What makes a good metric](#what-makes-a-good-b2b-product-metric) for a B2B product
2. [The common metrics used by B2B SaaS companies](#common-b2b-saas-product-metrics)
3. [How to choose your product metrics](#how-to-choose-your-product-metrics) 

> **Note:** This guide is about _product_ metrics, not revenue or wider business metrics like customer lifetime value (LTV) or average revenue per user (ARPU). Naturally, they're important too, but this guide is all about the metrics of most interest to product teams.

## What are activations metrics?

From lenny:
Your activation rate is the percentage of your new users who hit your activation milestone. Concretely:
activation rate = [users who hit your activation milestone] / [users who completed your signup flow].




As a team, throw out ideas on what that “a-ha!” moment might be for your end users. In general, an “a-ha” moment will be the moment your customer realizes that he or she is getting value.



User activation refers to the moment when your new users complete the set of initial onboarding steps for the first time. It involves a series of steps, specific events, or predefined milestones your users need to complete to be considered activated.

The typical first level of user activation flow goes like this: 

A prospective user visits your website >> signs up for the product >> creates a profile >> starts a trial >> completes the first set of tasks >> reaches the “aha!” moment >> tries out different features >> gets the real value



Hubspot: User activation is the moment a user first experiences the core value of a product or service. It marks the transition from a mere visitor to an active participant, propelling them towards further engagement.

 

From go practice:

Teams create new products to help people solve their problems more effectively. If the team succeeds in doing this, then the product creates added value in comparison to alternative solutions. If this value is enough to make users from a certain segment to switch from their current solution to the new one, then the product has achieved product/market fit.

After achieving product/market fit, teams try to attract users from the target market segment. They draw the attention of potential users by telling them the potential benefits of the product. If the team is successful, the users try the product. But there is a gap to fill between an interested user and a loyal user who has personally experienced the value of the product.

Activation is the bridge between a new users who believes that this product can be useful and the one who have realized all the benefits of the product and decided when and how he will be using it. It involves creating mechanisms that convey the value of the product to new users. Activation mechanisms should help the maximum proportion of new users to realize in what situations and for what tasks the product creates enough added value to make it worth using.



https://gopractice.io/product/when-product-activation-matters-and-you-should-focus-on-it/ 

I like GoPractices image -> https://gopractice.io/wp-content/uploads/2022/05/Frame-79.png



**When to work on activation **

Having a product/market fit is a prerequisite for working on activation.
Add posthog links to how to measure product market fit

It is absolutely critical that the product has an added value over alternatives. Otherwise there won’t be anything the team can convey to new users during the activation process.

If the added value is not enough to convince users to switch to the new solution, then even a perfectly constructed onboarding and activation process won’t help.



Customer activation rate is a metric used to measure the number of customers who actually make use of a product or service after they purchase it. It measures the effectiveness of your customer onboarding process and is an indicator of how satisfied customers are with their purchase. Put simply, CAR measures whether or not customers become active users after they’ve made their initial purchase.



## How to pick your activation metric

https://www.lennysnewsletter.com/p/how-to-determine-your-activation

To measure user activation, you need to know your company's personas* really well. How come? You'll be tracking the activation milestones that your users need to complete to get their jobs done and get the true value of your offer.

The milestones are very much persona-related. The more in-depth your understanding of your personas is, the more effective you'll be when deciding which events to track. ‍


Consider a scenario: 

Imagine you develop an SEO tool. Sue, your app user, is a content marketer who needs to create high-ranking content for websites. Being familiar with what jobs-to-be-done her work entails, you know that to fully get the value of the tool, Sue will have to:

Run keyword research. 
Generate lists of keywords to rank for. 
Track her website's position in SERP (search engine results page).
Use a content creator tool to pen competitive content.
Run audits.
Download reports recapping her success.
By performing all the actions with your tool, Sue achieves milestones and becomes more and more activated as a user.  

To track Sue's user activation, you'd have to define and track all the in-app events that have to take place for Sue to appreciate the value of your product.

‍

To calculate the user activation rate: divide the number of users who have reached an activation point (completed all the milestones connected with the activation) by the total number of registered users. Then, multiply the number by 100: 

**Examples of companies and their activaiton metric**

Facebook - ALex schulz 10 friends in one week 

Trello: Trello's key activation metric was the number of boards created per user. They found that users who created at least one board within the first week were more likely to become long-term users.
Dropbox: Dropbox's key activation metric was the number of files saved within the first week of sign-up. They found that users who saved at least one file within the first week were more likely to become long-term users.
Zoom: Zoom's key activation metric was the number of meetings hosted per user. They found that users who hosted at least one meeting within the first week were more likely to become long-term users.

For Dropbox it’s “file uploaded”, for Twitter — “10 users followed”, for Airbnb — “booking made”. Once the event is identified, the objective is to increase the % of leads that reach it (without affecting its predictive power).




### User activation vs aha moment (or how to measure it)

User activation vs. the “aha!” moment
The “aha!” moment is the trigger that kicks off the user activation process—it’s the point where a user “gets” it, the point where they’ve used your product long enough to figure out how it works, and suddenly it strikes them that your product solves the problems they had in mind when they signed up.


Reaches their “aha!” moment where they “get” it and figure out how your product is going to solve their pain point.

Find real value from the product —The “aha!” moment leads the new user to dive into your product, import some of their data, start trying it out and it either matches or beats their expectations




## What makes a good B2B product metric?

From lenny:

2. What are examples of activation milestones?
A good activation metric should be two things:

Highly predictive: It should be predictive of long-term value delivery to the user, which often manifests itself in long-term retention, monetization, or both. Users who hit your activation milestone should retain at a rate at least 2x better than those who do not complete the activation step.

Highly actionable: The metric needs to be something growth teams can directly impact. For example, for a multi-user SaaS products (e.g. Figma), teams often set their activation metrics on workspace- or account-level actions (e.g. “workspace with 10 items created and 2+ active editors by W4”) vs. a user taking action. You can’t make a workspace or an account do anything—only users can.

https://www.lennysnewsletter.com/p/what-is-a-good-activation-rate


Good metrics are understandable, comparative, specific and actionable.

Here's what those mean in a little more detail:

1. **Understandable:** Can you easily explain a metric to anyone in the business? If you can't, it's unlikely people will want to use or refer to it.

2. **Comparative:** Can you benchmark a metric against your industry, or compare internally using cohorts?

3. **Specific:** Some broad trends are useful, but we recommend metrics that measure specific actions. Don't measure how long users use your product, measure how long it takes for them to get value from it.

4. **Actionable:** Can you easily identify actions to take when you see a drop in a metric? If yes, you're onto a winner. Specific metrics are the most actionable metrics, too.

It's not realistic to achieve all four in every metric you use, but three out of four is a good benchmark.



## Common product metrics

Coming up are some of the most common metrics for products. We explain what they are, how to measure them, and how useful they really are.


### Onboarding completion rate
Onboarding completion rate refers to the percentage of users who completed the onboarding process during a specific period of time. Formula: (Number of users who completed onboarding / Total number of users who enrolled for onboarding) * 100

The Onboarding Completion Rate determines the percentage of new users who successfully complete the entire onboarding process, ensuring they have been introduced to the primary features and functions of the software.

Calculation: (Number of users who complete the entire onboarding process / Total number of new users) x 100.

Imagine a sales automation tool with a guided tour and a series of onboarding tasks, like importing contacts, setting up an email campaign, and scheduling a follow-up. If 450 out of 1,000 new users go through all these steps, the onboarding completion rate is 45%. A high onboarding completion rate generally suggests that new users are finding the process helpful and easy to navigate, which sets a positive tone for their continued use of the software.



### 1- User Activation Rate

number of users who activate

First, you need to decide on specific user behavior or milestone task that will define your active user. This could be, as always, an Aha! Moment, using some core features or interacting with certain app experiences.


What's a good user activation rate? different benchmarks? Lenny has a post on this?
https://www.lennysnewsletter.com/p/what-is-a-good-activation-rate 
https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F8a395e25-1c25-48d2-aa0f-35f486280d0f_2792x3166.png


### Adoption rate

**What is it?**  Adoption rate is a product health metric that tells you what percentage of total signups turned into active users in any given period. 

Your adoption rate is `(new active users / signups) x 100`, so 40 new active users and 200 signups equals an adoption rate of 20%.

**Is it useful?** We'd argue not. There are better, more specific measures for product health, like [new user activation](#new-user-activation).


### Feature usage

**What is it?** The specifics will vary depending on the product, but this is all about tracking what people are doing. 

At PostHog, our main product metric is [Discoveries](/handbook/product/metrics), which amalgamates a number of actions as one usage metric. 

We view this figure as more important than the number of active users. If the number of Discoveries is growing, we know we're on the right path. 

**Is it useful?** You're in serious trouble if you're not tracking feature usage, and it's where a [product analytics platform](/product) like PostHog is vital. Trying to do this with Google Analytics is a losing battle.

### Net Promoter Score (NPS)

**What is it?**  NPS is a well-known customer satisfaction metric, and a good indicator for future customer retention and [product-market fit](/blog/product-market-fit-game). 

On a scale of 1 to 10, users who select 9 or 10 when asked "how likely are you to recommend us to a friend of colleague" are promoters. Those who vote 0 to 6 are detractors.

You NPS score is the `% of promoters - % of detractors` and scores range between `-100` (100% negative) and `+100` (100% positive).

Any score above zero is technically good, but most sources put the industry average for B2B SaaS products somewhere [around +30](https://www.getbeamer.com/blog/good-nps-for-saas) to [+40](https://www.retently.com/blog/good-net-promoter-score/). 

**Is it useful?** There's a reason NPS is an industry standard. Measuring NPS over time is a powerful way to understand the evolution of your product, and improving it is a clear sign your customers are happy with the changes you're making. Definitely worth tracking, but you need other metrics or follow-up questions to understand changes in your NPS score.

### New user activation

**What is it?** New user activation is similar in purpose to adoption rate, but it's more specific. It measures the percentage of new users who completed a specific task in their first week.

The formula is `(new users who completed key action / total number of new users) x 100`.  

**Is it useful?** This is an essential metric because, unlike adoption rate, it's measuring the success of your new users, not their mere existence. 

You want new users to find the value in your product as quickly as possible, and this is the perfect metric to measure that. 

Improving activation is widely regarded as one of the best ways to improve monthly recurring revenue (MRR).

### Time to value

Time to Value: The amount of time that passes between the initial interaction with your product and the “aha!” moment for your users. But keep in mind that reaching the “aha!” moment still doesn’t mean activation. It represents the understanding of the value, while activation happens after your users get value from your product for a specific use case.    

User activation vs. time to value
Time to value refers to how long it takes a user to see the value they’re expecting from your product. If we put those two terms together, we can derive a relationship between them: user activation is getting users to stick with your product long enough to get value out of it while time-to-value is how long it takes.


### Time to activation

**What is it?** How long does it take for people to start using your product after they sign-up? Watching [session recordings](/product/session-recording) is a useful to diagnose problems with this metric.

**Is it useful?:** This can be a good metric if your product has a complex but well-defined setup process. Otherwise, you're better off using a metric like new user activation that captures a specific key action for your product.

### User invites and shares

**What is it?** Users inviting their colleagues, or sharing what they're doing, is an engagement metric and a user experience indicator.

[Experimentation](/product/experimentation-suite) can help you find ways to encourage users to invite their colleagues.

**Is it useful?** Inviting colleagues to create an account is a sure sign users are getting value from your product, and will reduce churn among your customers. What's not to like about that?

## Churn rate

Relationship between activaiton and churn rate. Acitvaition should be higher so active users higher over time .

So basically validates if you chose the right activation metric. 

If activation is high, but churn is high, you've chosen wrong metric.

## Active users

More activation = more active users over time

Same as churn rate. In the long run, validates you chose the right meteic

If doesnt grow by activation is high, youve chosen the wrong one.



## Conversion from Trial to Paid ? 
## Or sign up to subscriber rate?

https://userguiding.com/blog/activation-metrics/

✅ Activation Rate – For tracking users who are turning into active users & engaged users.

✅ Sign-up Conversion Rate – For tracking users who have converted to paying customers.

✅ Time to First Key Action – For tracking how long it takes for users to perform their first meaningful action on a platform.

✅ Retention Rate – For tracking users who are continually choosing to stick with your product.

✅ Referral Rate – For tracking referrals.

✅ Churn Rate – For tracking users who are choosing to stop doing business with you.

✅ User Engagement Metrics – For tracking how many of your users are frequently engaging with your product.

✅ User Satisfaction Metrics – For tracking how many of your users are actually satisfied with your solution.

Maybe this validates your activation metric? e.g. if they hit activation, they should convert

What is it: The trial-to-paid conversion rate measures the percentage of users subscribing to a paid account after the trial period.
Who should track it: Companies that offer free trials should track and measure the Trial-to-Paid Conversion Rate to assess how effectively their trial programs convert users into paying customers.
Why it matters: This metric provides valuable insights into revenue generation and determines if your trial version effectively guides users to value realization. 





## How to choose your product metrics

When choosing your product metrics, first remember the four qualities of good metrics we mentioned earlier: understandable, comparative, specific and actionable.

They're all important in isolation, but more powerful when combined. Here's an example of how this works.

Our product, [PostHog](https://posthog.com/), is all about helping engineers and product teams discover insights about product usage. 

In PostHog, users can:

- Create and analyze insights that track trends over time such as how well users convert, what paths they take, and how well they retain.

- Use dashboards to combine insights into cohesive reports on any element of the product experience. We've built a [B2B SaaS product metrics dashboard template](/templates/b2b-dashboard) you can use.

- View session recordings of real customers to understand where they get stuck or how they use the product.

- Use feature flags to test and run experiments before rolling features out.

To capture all this activity, we created a composite metric we call [Discoveries](/handbook/product/metrics). We define Discoveries as any time a PostHog user analyzes an insight, dashboard, recording, or correlation analysis report for 10 second or more.

What makes this a good product metric for us? Let's break it down:

- **Is easy to understand?** Yes. While it combines several different events into one action, they're all easy for anyone who knows the product to understand.

- **Is it comparable?** Absolutely. We can use this metric to compare power users to average users and compare different cohorts based on multiple criteria (e.g. paying vs non-paying customers, job title etc.). It's also sensitive to changes in the product, so we can see whether our users make more or fewer discoveries when we make a change.

- **Is it specific?** Yes. Again, while it's a composite metric, each individual event captures users getting value from our product.

- **Is it actionable?** Yes. If this metric drops, it immediately gives us several avenues of investigation to understand the cause.

Not all useful product metrics follow this trend – active users is a notable exception – but it's a good acid test to apply to any metric you're considering.

### Recommended B2B product metrics

To help get you started, we've chosen five metrics that are useful for any B2B product. You will want to augment and adapt these for your specific needs, but 

- **Active users (DAU / WAU / MAU)** because it's a fundamental metric that underpins others, and allows you to measure user growth over time.

- **Customer retention rate** because it will alert you to problems if you have them, and it's highly comparable.

- **Feature usage** because it's vital to measure the value you're offering to users, and will help you learn what they find most useful.

- **Net Promoter Score (NPS)** because it's a ubiquitous, easy to understand metric you can benchmark against your industry.

- **New user activation** because helping new users generate value quickly will drive satisfaction and word of mouth growth.

You don't need to measure all of these to be successful, and other metrics might be better for your specific product, but they're a good starting point.

And if you're in need a product analytics platform to track them, learn [how we can help](/product).

## Further reading

For more inspiration around measuring product success, we recommend reading our [guide to AARRR pirate metrics](/blog/aarrr-pirate-funnel) – a popular framework for understanding user behavior and discovering opportunities.

You may also find the following guides useful:

- [How to achieve B2B product market fit](/blog/product-market-fit-game): There's no universal standard for achieving market fit, but this guide introduces heuristics to help you find it

- [Finding your north star metric](/blog/north-star-metrics): All SaaS products can benefit from a north star metric and this guide will help you find one

- [How to measure product-market fit](/blog/measure-product-market-fit): Product-market fit isn't just an ephemeral gut feeling. You can measure it, and it moves as your customer's needs change. 
