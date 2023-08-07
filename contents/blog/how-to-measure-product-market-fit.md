---
date: 2023-06-08
title: "In-depth: How to reliably measure product-market fit"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: ["andy-vandervell"]
featuredImage: ../images/blog/pmf-game-guide/pmf-guide.png
featuredImageType: full
category: Startups
tags:
  - Guides
---

[Achieving product-market fit](/blog/product-market-fit-game) isn't a golden ticket to a billion-dollar IPO, but startups can't succeed without it. 

Most guides tell you how it _feels_ to have product-market fit. Everything feels effortless when you have it, or impossibly difficult when you don't, and so on.

But product-market fit isn't just an ephemeral gut feeling. You can _measure_ it, and _it moves_ as your customer's needs change, or new solutions appear.

This guide is about finding ways to measure product-market fit, your progress toward it, and how it changes over time.

## Leading and lagging indicators

Measuring product-market fit requires a _combination_ of leading and lagging indicators.

**Leading indicators**, are predictive. A surge in organic growth and positive word-of-mouth suggests product-market fit, but can't confirm it. They include:
- **Organic word-of-mouth growth** – Not directly linked to paid promotions
- **User feedback & PMF Survey** – Direct feedback from users
- **Meaningful user engagement** – Users experiencing real value    

**Lagging indicators** confirm whether you have product-market fit. They're more reliable, particularly if they're linked to financial performance. They include:
- **Retention curve** – Evidence users are coming back
- **Burn multiple** – Evidence you're growing sustainably
- **CLV/CAC ratio** – Can you acquire customers for less than they cost to support? 

We recommend a minimum of three to start with – likely two leading indicators and one lagging indicator – and adding more when you need.

**Pre-revenue**, word-of-mouth, user engagement, and retention are good indicators of product-market fit. They'll tell you how people feel about your product, whether they're using it, and if they stick around.

**Post-revenue** you'll want to want another lagging indicator, like burn multiple or CLV/CAC ratio, that provide a more concrete link to revenue and the financial viability of your product.

Why a minimum of three? Because of what Brian Balfour, a serial co-founder and a former VP of Growth at Hubspot, calls The Trifecta:[^1]

![pmf trifecta](../images/blog/how-to-measure-product-market-fit/pmf-trifecta.png)

If you can nail these three at the same time, it's a strong sign you have product-market fit.

## Indicator #1: Organic word-of-mouth growth

To be clear... you _can't_ validate product-market fit _using word-of-mouth alone_. That way lies madness. But it is a useful leading indicator _when confirmed using other metrics_, such as user engagement, and retention.

Hopefully, you already have a strong grasp of your organic user growth via user signup, or whatever metric makes sense for your product.

But you can, with a little work, also track word of mouth awareness and sentiment of your product. Here are a few options.

### 1. Brand mention alerts

Use a tool like [Syften](https://syften.com/) to monitor social media, communities, newsletters, etc., for mentions of any keyword you choose, such as your brand name. We use Syften at PostHog to send alerts to a `#brand-alerts` channel on our Slack. 

You can go one step further by setting up a Zapier integration with Google Sheets, where you can collect your mentions, and track trends over time.

Brand alerts are also a great way to drive acquisition by talking to people considering your product. 

> **❗️Important:** It's _much easier_ to track mentions if your company has a unique name. You're bang out of luck if it's a common noun – e.g. Apple, Amplitude. 

### 2. Searches for your brand

**Google Trends** is a good option if you have a unique brand name. Just plug your brand into Trends to see how searches for your brand are trending over time.

![google trend for posthog](../images/blog/how-to-measure-product-market-fit/posthog-trends.png)

It's also useful for comparing yourself to other companies, such as those you _know_ have product-market fit, or competitors.

![google trend comparison](../images/blog/how-to-measure-product-market-fit/posthog-with-logrocket.png)

At PostHog, we also use [Glimpse](https://meetglimpse.com/) – a handy extension that augments Trends by adding trend lines, forecasts, and real search volumes. 

![trends with Glimpse](../images/blog/how-to-measure-product-market-fit/glimpse.png)

It'll also suggest similar companies you can compare yourself against.

![related companies](../images/blog/how-to-measure-product-market-fit/related-companies.png)

**Google Search Console** is an alternative if you don't have a unique brand name, but the data isn't 100% reliable, so you're better off using the next method.

### 3. Organic traffic to your homepage

One final way to track word-of-mouth is organic users who visit your website homepage as a proxy for word-of-mouth. We track this in PostHog as an insight that combines:

- Unique users who visited the homepage via Google search
- Unique users how visited the homepage directly

This captures people who search for your brand, and those who navigate there directly, or visit via Slack, WhatsApp, etc. 

This method will capture some existing users as well, but we've found it correlates well with surges in word-of-mouth awareness.

> 💡 **PostHog Tip:** If you're using PostHog, remember to add `UTM Source` = `Is not set` to filter out any paid ad campaigns you're running.

### When to use word-of-mouth

Word-of-mouth growth is a good option for any product-led company – i.e. a product that's self-serve and doesn't do outbound sales. It's a weak leading indicator, but useful so long as you don't buy into your own PR and verify with other metrics.

| **Pros**                                                                                                                 | **Cons**                                                                                                                 |
|--------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------| 
| <span className="text-green text-lg">✔</span> Easy to track                                                              | <span className="text-red text-lg">✖</span> Not a reliable sign of product-market fit on its own                         |
| <span className="text-green text-lg">✔</span> Useful when you're pre-revenue                                             | <span className="text-red text-lg">✖</span> Spikes in awareness and user growth can be misleading                        |
| <span className="text-green text-lg">✔</span> Easy to compare with other companies                                       | <span className="text-red text-lg">✖</span> Not useful for companies with low-profile brands – e.g. enterprise products  |
| <span className="text-green text-lg">✔</span> Positive feedback and growth is highly motivating                          | <span className="text-red text-lg">✖</span> It's tempting (and easy) to rationalize negative word-of-mouth               |

## Indicator #2: User feedback & PMF Survey

Like word-of-mouth, _consistently_ positive user feedback is an indicator of product-market fit. There's a decent chance you're onto a winner when people tell you they can't live without your product.

To this end, the PMF Survey is a twist on the classic Net Promoter Score, but it's designed _specifically_ for finding product-market fit, and creating a feedback loop for user feedback.

Created by entrepreneur Sean Ellis, the core question (among others) it asks is:

“How would you feel if you could no longer use [ProductName]?”

- a) Very disappointed
- b) Somewhat disappointed
- c) Not disappointed

You want to learn everything you possibly can about people who answer "very disappointed". Organize a call and talk to these users. Ask open-ended, probing questions to understand why they love your product. Do the same for users in the "somewhat disappointed" cohort.

Based on his research of 100+ startups, Ellis believes 40% answering "very disappointed" is a strong signal of product-market fit. The more responses you get, the more reliable the signal. Ellis recommends a minimum of 30:

> "In my experience, a minimum of 30 responses is needed before the survey becomes directionally useful. At 100+ responses I am much more confident in the results." – Sean Ellis[^2]

An open research project run by Hiten Shah[^3], co-founder of KISSmetrics, used the PMF Survey on 731 Slack users, the results showed:

- 51% responded they would be very disappointed if they couldn't use Slack
- These users believed it increased productivity and improved collaboration
- All groups said video conferencing was a must-have addition

It's no coincidence Slack has since added video conferencing.

### A PMF Survey case study

When email app Superhuman started using the survey in 2017, 22% of users answered "very disappointed" and 52% answered "somewhat disappointed".[^4]

After the initial survey, Superhuman created a four-step process to convert the 52%, and double-down on what the 22% loved.

1. **Segmenting users:** They assigned personas to each person who responded (e.g. founder, engineer, customer success) and created a cohort of those who appeared in the 22%. In this cohort, 32% of people responded "very disappointed", and they created a more detailed Ideal Customer Profile based on these users.

2. **Gathering feedback:** They analyzed feedback from "on-the-fence" users, and asked "how can we improve Superhuman for you?" They ignored users who answered "not disappointed". The most common thing the on-the-fence users wanted? A mobile app. They did the same for their strong supporters.

3. **Building a roadmap:** Armed with this feedback, Superhuman built a roadmap of new features. Half dedicated to improvements for their "very disappointed" cohort, the other for the users they wanted to convert.

4. **Rinse and repeat:** Superhuman continued to survey users, tracking progress towards the 40% mark. The score became the primary OKR for the product team and, after three quarters, Superhuman had doubled the score to 58%.

### When to use feedback and the PMF Survey

Feedback is essential to any startup, so it's more a question of how you collect it. You don't need to use the PMF Survey to find product-market fit, but it's a useful way to systematize your efforts and lets you track how your product-market fit changes over time.

| **Pros**                                                                                                                 | **Cons**                                                                                                                 |
|--------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------| 
| <span className="text-green text-lg">✔</span> Can help guide product development in the right direction                  | <span className="text-red text-lg">✖</span> PMF Survey is somewhat labor-intensive                                       |
| <span className="text-green text-lg">✔</span> Easy to break down into multiple cohorts to understand your ICP            | <span className="text-red text-lg">✖</span> Needs to be backed-up with 121 interviews                                    |
| <span className="text-green text-lg">✔</span> Can be systematized to improve product-market fit over time                | <span className="text-red text-lg">✖</span> Not driven by real usage – always validate with engagement or retention data |
| <span className="text-green text-lg">✔</span> Useful for tracking how your product-market fit changes over time          | <span className="text-red text-lg">✖</span> Requires a minimum number of responses to be directionally useful            |
| <span className="text-green text-lg">✔</span> Will help you understand _why_ you do or don't have product-market fit     |               |

## Indicator #3: Meaningful user engagement

Are users experiencing the _real value_ of your product? Spoiler: logging in ≠ engagement.

You want to see user engagement growing in line with, or faster than, new users. If engagement is growing much faster than signups, it's a strong sign you have product-market fit.

![good pmf](../images/blog/how-to-measure-product-market-fit/good-pmf.png)

If signups are growing, but user engagement isn't, it's likely you _don't_ have product-market fit.

![bad pmf](../images/blog/how-to-measure-product-market-fit/bad-pmf.png)

At PostHog, we created a user engagement metric we call Discoveries. We define a discovery as:

- **Analyzing any insight** – Analyzing means viewing for 10 seconds or more. Insights include trends, funnels, paths, lifecycle, and stickiness.

- **Analyzing a recording** – Watching a recording for 10 seconds or more.

- **Analyzing a correlation** – Analyzing means viewing for 10 seconds or more.

- **Analyzing a dashboard** – Analyzing means viewing a dashboard for 10 seconds or more.

We also track things like people inviting new team members, which we've found correlate strongly to retention. 

If you find your chosen engagement metric doesn't correlate to retention you either:

1. Don't have product-market fit.
2. Are tracking the wrong metrics.

### When to use user engagement

It's basically impossible to measure product-market fit without tracking user engagement. The real challenge is tracking the right things – i.e. avoiding vanity metrics. See our guide to the [most useful B2B product metrics](/blog/b2b-saas-product-metrics) for help here. 

| **Pros**                                                                                                                 | **Cons**                                                                                                                 |
|--------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------| 
| <span className="text-green text-lg">✔</span> Tracks the real value users gain from your product                         | <span className="text-red text-lg">✖</span> High engagement isn't necessarily predictive of revenue                      |
| <span className="text-green text-lg">✔</span> Passive to maintain – set it up once and track forever                     | <span className="text-red text-lg">✖</span> Can provide a false positive if you're tracking the wrong things             |
| <span className="text-green text-lg">✔</span> Easy to understand for all teams                                           | <span className="text-red text-lg">✖</span> Requires user feedback or session replays to understand behavior             |
| <span className="text-green text-lg">✔</span> Can be broken down by user cohorts for comparison                          |           |
| <span className="text-green text-lg">✔</span> You can A/B test ways to improve user engagement                           |           |

## Indicator #4: Retention curve

The retention curve is a lagging indicator of product-market fit. If it fattens _at any point_, it's a strong sign you have product-market fit.

![retention curve](../images/blog/how-to-measure-product-market-fit/retention-curve.png)

To create your retention curve, you'll want to track active users over a long(ish) period of time – weeks or months, rather than days.

How you define an active user is up to you, but it's best to track events or actions where a user is experiencing the _real value_ of your product. Again, logging in does not count!

For our product PostHog, an [all-in-one analytics platform](http://posthog.com/), this might look like:

> Show `unique users` who performed a `discovery` for the first time in the last `12 months` and then came back to perform a `discovery` on any of the next months.

It's also a good idea to track different cohorts, such as retention for users who match your ideal customer profile, or split by job title. This will help you understand how strong your fit is for different groups, and plan your roadmap accordingly.

### When to use retention

Retention is another non-negotiable way to measure product-market fit. It's simplest lagging indicator of product-market fit, so there's really no reason not to use it.

| **Pros**                                                                                                                 | **Cons**                                                                                                                 |
|--------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------| 
| <span className="text-green text-lg">✔</span> Reliable lagging indicator of product-market fit                           | <span className="text-red text-lg">✖</span> Not predictive of revenue – will users actually pay for your product?        |
| <span className="text-green text-lg">✔</span> Can be broken down by cohort for comparison                                | <span className="text-red text-lg">✖</span> You need several weeks or months of data to get a reliable signal            |
| <span className="text-green text-lg">✔</span> Easy to understand – flat is good, not flat is bad!                        | <span className="text-red text-lg">✖</span> Won't help you understand why you do or don't have product-market fit        |

## Indicator #5: The burn multiple

Created by former PayPal COO David Sacks, burn multiple measures how much you're spending to grow revenue. The less you spend, the more efficient your growth. More efficient growth = stronger product-market fit.

To calculate your burn multiple, divide your net burn during a period (e.g. a quarter) with net new annual revenue for the same period:

> Burn Multiple = Net Burn / Net New ARR

A company that burns $2 million to generate $1.5 million in new ARR would have a burn multiple of 1.33. Sacks offers these benchmarks for venture-stage startups:

| **Burn multiple** | **Efficiency** |
|-------------------|----------------|
| Under 1x          | Amazing        |
| 1 to 1.5x         | Great          |
| 1.5 to 2x         | Good           |
| 2 to 3x           | Suspect        |
| Over 3x           | Bad            |

Why is burn multiple useful? Here's Sacks (emphasis added):

> "The startup that generates $1M million in ARR by burning $2M is more impressive than one that does it by burning $5M. In the former case, it appears that **the market is pulling product out of the startup**, whereas in the latter case, the **startup is pushing its product onto the market**. VCs will make inferences about product-market fit accordingly." – David Sacks[^5] 

Sacks goes on to explain how burn multiple works because it's a catch-all metric. Factors such as costs, churn rate, and growth, all impact your burn multiple positively or negatively, giving you a complete picture of your company's health in one number.

### When to use burn multiple

Burn multiple is a good metric to add once you believe you have The Trifecta: consistent growth, real user engagement, and strong retention. It'll help you connect your product-market fit to revenue and costs, and understand how investors will evaluate your product-market fit.

| **Pros**                                                                                                                 | **Cons**                                                                                                                 |
|--------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------| 
| <span className="text-green text-lg">✔</span> It's a cumulative metric that's influenced by all parts of your startup    | <span className="text-red text-lg">✖</span> It's a significantly lagging indicator                                       |
| <span className="text-green text-lg">✔</span> It's easy to calculate – it's just two numbers any founder should have     | <span className="text-red text-lg">✖</span> It's not useful if you're pre-revenue                                        |
| <span className="text-green text-lg">✔</span> A steady decline is a strong indicator of product-market fit               | <span className="text-red text-lg">✖</span> It won't help you understand why you do or don't have product-market fit     |
| <span className="text-green text-lg">✔</span> It's useful for investors                                                  | <span className="text-red text-lg">✖</span> Skewed by non-product factors – e.g. poor cost control                       |
| <span className="text-green text-lg">✔</span> It's easy to understand                                                    |        |
| <span className="text-green text-lg">✔</span> Useful for mid to late-stage startups                                      |        |

## Indicator #6 CLV/CAC ratio

> **CLV** = customer lifetime value – i.e. the total value of a customer after churn and the cost of supporting / retaining them.
>
> **CAC** = customer acquisition cost - i.e. total sales and marketing spend divided by how many customers you acquired.

CLV/CAC ratio is a robust but complex measure of product-market fit. Robust because it speaks directly to the long-term financial health of your company; complex because calculating CLV accurately isn't a trivial task.

Customer lifetime value attempts to quantify how much a customer is worth over their entire lifetime. This means you need to understand:

- Your average deal size.
- How long customers stay until they churn.
- Your gross margin – i.e. how much it costs to support and retain customers.
- How long it'll take for a customer to pay back the cost of acquiring them. 

Consequently, the ratio is best used by companies selling to enterprises, where sales costs are higher and play a larger role in a product's success.  

A ratio of 1x means your CLV and CAC are the same – i.e. you're only earning enough to cover your acquisition costs. A ratio of 2x means you're earning twice as much as you're spending to acquire new customers. Karen Rhorer, currently a senior director at Twilio, considers CLV/CAC of 3x and a CAC payback of less than 18 months ideal[^6] for sales-lead products.

| **CLV/CAC ratio** | **Product-market fit** |
|-------------------|----------------|
| Over 3x           | Guaranteed     |
| 2x to 3x          | Strong         |
| 1.5x to 2x        | Good           |
| 1x to 1.5x        | Weak           |
| Under 1x          | None           |

> **CLV/CAC ratio vs burn multiple:** The ratio measures the cost of acquiring and retaining customers, but it _doesn't_ include product development costs. Burn multiple includes all costs, including support, acquisition, sales, and product development.

### When to use CLV/CAC ratio

This is the metric to use if your product is sales-led – i.e. you're doing lots of outbound sales, probably to enterprise customers. Unlike your burn multiple, it'll help you isolate your acquisition costs from other parts of the business. You're on the right track once you can acquire customers for less than their lifetime value.

| **Pros**                                                                                                                 | **Cons**                                                                                                                 |
|--------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------| 
| <span className="text-green text-lg">✔</span> Reliable indicator of product-market fit and long-term financial health    | <span className="text-red text-lg">✖</span> Complicated to calculate and understand                                      |
| <span className="text-green text-lg">✔</span> Can't be gamed or rationalized                                             | <span className="text-red text-lg">✖</span> Not useful for engineering or product teams                                  |
| <span className="text-green text-lg">✔</span> Useful for enterprise products where acquisition costs are higher          | <span className="text-red text-lg">✖</span> Not useful for early-stage startups                                          |
| <span className="text-green text-lg">✔</span> Investors will love a high ratio                                           | <span className="text-red text-lg">✖</span> Not useful for product-led growth companies                                  |
| <span className="text-green text-lg">✔</span> Useful for sales-led companies                                             |                              |

## Final thoughts

TODO: Some words here:

- Starting metrics: Organic word-of-mouth growth, meaningful user engagement, and retention. 
- When you can, add PMF survey to help you fine-tune, improve PMF and track over time
- Add burn multiple once you're making decent revenue. Use CLV/CAC ratio if you're an enterprise product / have data scientists.


#### Footnotes

[^1]: [The Never Ending Road To Product Market Fit](https://brianbalfour.com/essays/product-market-fit) – Brian Balfour – Dec 11, 2013

[^2]: [Using Product/Market Fit to Drive Sustainable Growth](https://blog.growthhackers.com/using-product-market-fit-to-drive-sustainable-growth-58e9124ee8db) – Sean Ellis – Apr 5, 2019

[^3]: [731 Slack Users Reveal Why It’s So Addictive](https://hitenism.com/slack-product-market-fit-survey/) – Hiten Shah – May, 18, 2015

[^4]: [How Superhuman Built an Engine to Find PMF](https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit) – Rahul Vohra – Nov 13, 2018

[^5]: [The Burn Multiple](https://sacks.substack.com/p/the-burn-multiple-51a7e43cb200) – David Sacks – Apr 23, 2020

[^6]: [Growth at All Costs is Perilous](https://review.firstround.com/growth-at-all-costs-is-perilous-this-is-how-to-scale-sales-sustainably) – Karen Rhorer – Sep 25, 2018