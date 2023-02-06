---
date: 2023-02-06
title: "Retention vs Churn Rate: A complete guide to retention/churn analysis/analytics – Title TBD"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - andy-vandervell
featuredImage: ../images/blog/posthog-marketing/marketing-hog.jpg
featuredImageType: full
category: Product growth
tags:
  - Product analytics
  - Product metrics
  - Guides
  - Explainers
---

You know what's cooler than gaining new customers? Retaining them.

In this guide I'm looking at churn rate and retention rate:
- How are they different?
- How do you measure them? 
- Which one would win a fight?<sup>*</sup>

These and other useful questions (like [how to reduce churn](#how-to-improve-customer-retention-and-reduce-churn)) will be answered. Let's get to it.

<sup>(*strictly speaking, they'd cancel each other out... which you'll understand if you read the next section)</sup>

## What's the difference between retention rate and churn rate?

Not much, really: retention and churn rate are inverse measures of customer retention:

- **Churn rate** is the rate at which customers **leave** your product during a period of time, expressed as a percentage. So, if you have 1,000 customers and 100 of them cancel their subscription, your monthly churn rate would be 10%.

- **Retention rate** is the percentage of **existing customers** who **still use** your product. So, if you had 1,000 customers at the and 100 of them cancelled, you'd have a 90% retention rate – i.e. the inverse or churn rate.

Simple, right? Yes, but these definitions ignore two important points:

1. There are numerous ways to measure and analyze both metrics
2. While both are important, **retention rate** is more useful most of the time

I'll explore these points further as we go.

## Churn rate explained

Here's the simplest formula for churn rate:

> **Customer churn rate** = (Churned customers during a specific period / Total customers at the start of that period) x 100

Where you use this formula to calculate churned customers:

> **Churned customers** = (Customers at the start of the period - Customers at the end of the period) + New customers acquired in that period

You can also calculate various form of revenue churn rate, but most people understand 'churn rate' to mean 'customer churn' so that's what I'm focusing on here.

Most companies should track churn monthly and/or annually. Quarterly might make sense for seasonal products, but monthly churn should capture that too. Want to track daily or weekly churn? You're better off using a [cohort retention table](#how-to-read-and-use-a-cohort-retention-table). More on those later.

🚨 **Important:** Do not, whatever you do, confuse monthly and annual churn rates. Monthly churn compounds into annual churn – i.e. a monthly churn rate of 5% equals a massive 46% annual churn rate. And you can't just multiply your monthly churn rate by 12 to get your annual number. See [how to calculate annual churn from your monthly churn rate](#how-to-calculate-annual-churn-using-your-monthly-churn-rate) in the appendix.

### What is a good churn rate?

Benchmarking churn rate is tricky because:

1. As I just mentioned, monthly churn rates compound into annual churn. It's **really important** to know which number you're talking about!

2. Companies selling to enterprises have lower churn than those selling to SMBs on cheaper, monthly contracts. They will also report churn annually – see point #1.

3. Studies investigating churn rates by industry use different methodologies and data sets. They often come to conflicting conclusions.

4. Companies who self report churn rate are liable to, erm... lie. After all, who wants to admit they have a churn problem? More likely, they'll use different definitions of churn specific to their business.

5. What's "good" for a mature business is very different to what's good for a pre-product-market fit, early-stage startup.

With all that said, and having read countless studies, meta-analyses, and finger-in-the-air opinions on the topic, here are my conclusions:

- **Monthly churn of 0.5% or less** is outstanding for any company, but an unrealistic expectation for B2C products. It's equivalent to an annual churn rate of 5.84% – i.e. a company with 1,000 customers would lose 58 over 12 months.

- **Monthly churn of 1.5 to 2%** is still very good, especially for mid-market B2B companies that don't sell to enterprises. It's equivalent to an annual churn rate of 16.59% – i.e. a company with 1,000 customers would lose 166 over 12 months.

- **Monthly churn of 3.5%** or 34.8% per year is pretty typical for B2B SaaS products with less than $250 average revenue per customer (ARPC). The higher your ARPC, the lower your churn rate ought to be. 

- While an **annual churn of 45%** (aka 5% per month) sounds terrifying, it's not unheard of among successful mid-market B2B SaaS companies. In 2016, Buffer, a successful SaaS company with over $1 million in monthly recurring revenue at the time, reported annual churn of 46%. Multiple studies show a 5% monthly churn rate is common among smaller B2B SaaS companies.

- **Monthly churn above 5%** is to be expected for any early-stage company B2B SaaS, and a good benchmark for B2C subscription products. When you're early-stage, hitting an absolute number is less important than seeing your churn rate improving.

> 📖 **Further reading:** I spent many hours and read dozens of articles researching industry benchmarks and studies. These are the most useful resources I found on churn rate benchmarks:
>
> - This [2020 meta-analysis](https://www.cobloom.com/blog/churn-rate-how-high-is-too-high) of six different studies neatly explains how methodology and data sources can distort results.
>
> - Subscription analytics company, Baremetrics, maintains an [open benchmarks page](https://baremetrics.com/open-benchmarks) based on data from its customers – mostly mid-size SaaS products like todoist, Product Hunt and npm.
>
> - [Recurly's 19-month study](https://recurly.com/research/churn-rate-benchmarks/) of 1,900 subscription products that use its platform. It breaks down churn for B2B and B2C products across multiple cohorts, including average revenue per customer (ARPC).
>
> - [Lenny Rachitksy's Q&A](https://www.lennysnewsletter.com/p/monthly-churn-benchmarks) on monthly churn, in which he polls several experts, including the CEO of subscriptions platform ProfitWell.

### Problems with churn rate and alternative methods

Other articles you about churn rate may introduce alternative ways to measure it lifted directly from [this 2011 article](https://shopify.engineering/defining-churn-rate-no-really-this-actually-requires-an-entire-blog-post) by a data scientist at Shopify.

It's a dense affair that highlights some interesting quirks about churn rate, which I'll quickly summarize:

- Extreme growth can lead to distorted churn figures – such as reporting lower churn when user behavior hasn't actually changed. High-growth startups should be wary as a result.

- Because churn rate measures churn among **existing customers**, it can hide churn problems among new, incoming customers.

The Shopify article explores several complex alternative churn formulas to address these problems. It's a laudable objective, but in my view **totally unnecessary**.

Is churn rate a perfect metric? No. Do perfect metrics exist? Also, no. Our objective here isn't mathematical perfection, it's a comparable figure that's easy to understand. The more complicated a metric becomes, the less likely people will use it or understand it. 

Bottom line: You should **never** rely on just one number to measure success. See also why the whole "one number that matters" is a trap.

> 💡**PostHog Tip:** A funnel analysis tracking signup through activation, and conversion-to-paid is a better way to investigate churn among new users. Read our guide to [building funnels in PostHog](/tutorials/funnels) for more on this.

## Retention rate explained

So that's churn rate, but what about retention rate and why, as I claimed earlier, is it a more useful metric? (most of the time) 

To calculate your overall customer retention over a period you need to know:

- How many customers you have at the start of a period (A)
- How many customers you have at the end of a period (B)
- How many new customers were added during that period. (C)

You can then calculate your retention as a percentage (R) using the following formula:

> ((B - C) / A) * 100 = R

For example, if you have 100 customers at the start of a year, gain 35 new customers during the year and end the year with a total of 80 customers then your retention rate would be:

> ((80-35)/100)*100 = 45% retention

Meaning that each year a little more than half of your customers are churning and your usage as a whole is in decline. This would be a worrying sign!

As you'll know if you didn't skip the intro, retention is just the inverse of churn rate. So, the being the case, why is retention rate **more useful** than churn rate?

Because you can analyze retention using a cohort retention table like this:

> IMAGE HERE

I'll explain how to read retention tables in a moment, but here's the rub... retention tables allow you to answer questions like:

- Which features do users come back to over and over?
- Which features do users try and never use again?
- What actions contribute to users retaining or churning?
- What properties do retaining users have that or churning users lack?

If you can answer these questions, you're on the way the improving retention and reducing churn. And that's why retention rate is more useful, most of the time.

### How to read (and use) a cohort retention table

Trust me, it's less complicated than it looks.

> IMAGE EXAMPLE

Above is a PostHog retention table for an imaginary Dropbox clone called Hedgebox. In this retention table we're looking at weekly repeat usage,  configured as:

> `Unique users` who `signed up for the first time` in the last 8 weeks who then came back and triggered the `interacted with file` event in PostHog.

To read it, just start on the left and work your way across:

- **Cohort** Denotes the week these users signed up – i.e. the cohort these users belong to.

- **Size:** Shows the size of that cohort – a useful reference to avoid comparing a very small cohort to a much larger one.

- **Week 0:** Gives you the percentage of users in the cohort who used Hedgebox in that week. As it's week 0, this number will always be 100%.

- **Week 1-8:** Shows the percentage of users in that cohort who returned to the product in each subsequent week. In this example, we can see only half the users in the `Dec 4` cohort returned in week 2, but it was as high as 77.8% in other cohorts.

From here you can apply all sorts of filters to compare cohorts of users to each other.

> IMAGE HERE

Above shows new user retention among users referred by Google. Retention is worse than in the earlier table, which might prompt a change in marketing priorities.

> IMAGE

In contract, the above shows new users via direct traffic – i.e. by visiting the website directly. Their retention is much higher, though cohort totals are lower.

These are just examples using demo data in PostHog, but it's small slice of how you can dive deeper into user behavior using retention tables.

You could, for example, filter users by:

- Their operating system
- The browser they use
- The country or city they live in
- The number of files they upload
- The types of files they upload
- User job titles, company type or myriad other properties

Cohort retention tables are also useful for tracking revenue retention, especially if you charge based on usage. Positive revenue retention (i.e. more than 100%) indicates users increase their spend over time. Needless to say, this is a good thing.

> **Pedantic Sidebar:** For those thinking "if retention and churn rate are just the inverse of each other, why can't I create a churn rate table instead?" My answer is this... yes, you could, but it would be a dumb thing to do. Why? Because retention tables make a lot more intuitive sense. Be a rebel if you like, but you're dead to me. 

## How to improve customer retention and reduce churn

"Let's reduce churn" isn't quite akin to "nobody ever got fired for buying IBM", but it's worth remembering why reducing churn is desirable:

1. High churn is a likely sign you don't have product-market fit.

2. High churn leads to increased sales and/or marketing spend to compensate.

3. Reducing churn compounds – i.e. revenue **and** marketing ROI increase.

So, how do you improve retention and reduce churn? The glib answer is "make product better", but we can do a bit better than that:

- **Check for involuntary churn:** Involuntary churn typically means billing problems – e.g. expired cards, out-of-date info etc. In e-commerce, abandoned baskets could also be an involuntary churn problem.

- **Improve new user activation:** New user activation is an [important B2B product metric](/blog/b2b-saas-product-metrics). Use funnel analysis and session recordings to identify problems in your onboarding flow. Sometimes small tweaks to user flows can have a big impact.

- **Talk to users:** Stop me if you've heard this before, but talking to users is vital in any context – not just when you're trying to solve a retention problem. We're constantly talking to users to understand what they need, and problems we can solve. We built the [PostHog User Interview](https://github.com/posthog/user-interview-app) and [Feedback apps](https://github.com/PostHog/feedback-app) to help us do se. We document our [user feedback process](/handbook/product/user-feedback) in our public handbook.

- **Consider marketing and product alignment:** Sometimes poor retention comes from acquiring the wrong users. This could be a marketing problem, or you might have the wrong ideal customer profile.

- **Learn about your power users:** It's great to have power users, but they're also more sensitive to product changes. It's important to identify who they are, what they do, and what they value so you can avoid retention problems. See: [How to identify and analyze power users in PostHog](/tutorials/power-users).

- **Build great new features:** If you're talking to your users, and learning about your power users, then you should be well-placed to build awesome new features your existing (and potential) customers will love. I'm told this is "creating value" in the official business lingo.

- **Create a customer success team:** Customer success > outbound sales a lot of the time. [Our customer success team](/handbook/small-teams/customer-success) owns all inbound contact requests, assisting new users and introducing them to the right PostHog people at the right time. An effective CS team will help onboard new customers and retain them long term.   

- **Buy or copy the new hotness:** Aka, doing a Zuckerberg. This probably isn't a viable option for most companies, but YOLO right? (Yes, I did include this one mostly for the lols. It's not serious advice, probably.)

### The things you need to improve retention

You're gonna need a few things to track, analyze and improve customer churn, such as:

1. The ability to identify your new/current users (e.g. job role, location etc.)

1. An analytics tool to help you track user churn, and analyze use behavior.

1. Session recording so you can watch real interactions with your product.

1. A way to test new features and improvements to validate if they work.

1. The ability to safely roll out new features to test groups and specific cohorts

1. Product-minded engineers or product managers who talk to users and ship fast

Some companies deploy a complicated data stack to get all this, but it's not necessary. We built PostHog (yes, this is a teeny bit of sales pitch, now) so you can get all those things in one, tightly integrated tool.

And, while we can't help you with #6, we do have strong opinions on why [product engineers are awesome](/blog/what-is-a-product-engineer) for startups, and [how product engineers and product managers](/blog/product-engineer-vs-product-manager) can work together.

Check out [our product page](/product) if this sounds interesting to you.

/pitch over

## Takeaways on churn and retention rate

Phew, ok, that was lot. Hopefully you know a little more about how churn and retention rate work, interact, and impact your product now.

To conclude, here are five takeaways you can use to sound smart in meetings, or perhaps share on LinkedIn 😱 with a hashtag – I won't judge, not publicly at least:

1. Generally speaking, **churn rate is more useful to exec teams**, investors, and finance peeps, and **retention is more useful for product teams**. That's not to say one group shouldn't also care about the other, but it's useful context for when to use them.

2. Early-stage startups shouldn't get too hung up on how high or low churn is, but you should care **which direction** it's headed. The actual rate of churn / retention is more important once you have product-market fit and care about revenue.

3. Don't overcomplicate how you measure churn. It's easier to just understand when it can lead you astray and factor that in. No metric is perfect.

4. Don't benchmark your churn rate against the wrong industry, or product type. Average revenue per customer (ARPC) is a huge factor here. A B2B SaaS with an ARPC of $200 per month should have very different expectations than one with an ARPC of $1,000 per month.

5. PostHog is awesome and you should totally adopt it at your startup. "Nobody got fired for buying PostHog" said someone, probably me.

### Further reading on startups and product-led growth

- PostHog CEO, James Hawkins, on [how we found our Ideal Customer Profile](/blog/creating-ideal-customer-profile)

- My guide to [building an AARRR pirate funnel](/blog/aarrr-pirate-funnel) for tracking your most important metrics

- Another piece from James on [how we made something people want](/blog/making-something-people-want)

You can also signup to our newsletter over there 👉. We send it every two weeks and it's full of articles like this.

## Appendix

### How to calculate annual churn using your monthly churn rate

Use this formula to convert monthly churn to annual churn:

> 1-(1-`[your monthly churn]`)^12

Using this formula, a monthly churn rate of 1% equals an annual churn of 11.6%. So, if you started the year with 1,000 customers and had 1% churn per month, you'd have 114 churned customers you need to replace through acquisition.

### How to calculate monthly churn from your annual churn rate

Use this formula to convert annual churn to average monthly churn:

> 1-(1-`[your annual churn]`)^(1/12)

Using this formula, an annual churn rate of 11.6% equals an average monthly churn of 1%.
