---
date: 2023-06-08
title: In-depth: How to reliably measure product-market fit
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

## The 6 ways to measure product-market fit

You can measure product-market fit using a _combination_ of these six methods:

Leading indicators:

1. Word-of-mouth
2. User engagement 
3. The PMF Survey

Lagging indicators:

4. Retention curve
5. Burn multiple
6. CLV/CAC Ratio

**Leading indicators** are predictive of future growth revenue. A surge in word-of-mouth awareness, if matched by signups, suggests you'll see growth in the future.

**Lagging indicators** confirm progress toward a goal, whether it's revenue, retention, or product-market fit.

It's best to track a minimum of three, preferably two leading indicators and one lagging indicator, but you can always start with less and add more when you're ready.

Why three? Because of what Brian Balfour, a serial co-founder and form VP Growth at Hubspot calls The Trifecta[^1]:

1. Non-trivial top-line growth
2. A flat retention curve
3. Meaningful usage

I'll touch on this more at the end.

### Method #1: Word-of-mouth 📈🥰

To be clear... you _can't_ validate product-market fit _using word-of-mouth alone_. That way lies madness.

That said, it's still a useful leading indicator _when confirmed using other metrics_, such as user engagement and retention, and can act as an early warning sign 

You'll need to deploy two or more ways to track word-of-mouth to get a useful signal. Here are some options.

#### 1. Brand mentions

Use a tool like [Syften](https://syften.com/) to monitor social media, communities, newsletters, etc., for mentions of any keyword you choose, such as your brand name. We use Syften at PostHog to send alerts to a `#brand-alerts` channel on our Slack. 

You can go one step further by setting up a Zapier integration with Google Sheets, where you can collect your mentions, and track trends over time. Needless to say, up and to the right is your goal.

Brand alerts are also a great way to drive acquisition by talking to people considering your product. 

> **❗️Important:** It's _much easier_ to track brand mentions if your company has a unique name. If your company name is also a common noun (e.g. Amplitude, Apple, etc.), you're bang out of luck.

#### 2. Searches for your brand

**Google Trends** is a good option if you have a unique brand name. Just plug your brand into Trends to see how searches for your brand are trending over time.

[INSERT IMAGE]

It's also useful for comparing yourself to other companies, such as those you _know_ have product-market fit, companies of a similar size / age to yours, or competitors in your space.

[INSERT IMAGE]

At PostHog, we also use [Glimpse](https://meetglimpse.com/) – a handy browser extension that augments Google Trends by adding trend lines, forecasts, real search volumes, and the ability track search trends (and get alerts) over time.

[INSERT IMAGE]

It'll also suggest similar companies you can compare yourself against.

**Google Search Console** is an alternative if you don't have a unique brand name, but the data is sampled and not 100% reliable, so you're better off using the next method.

#### 3. Organic traffic to your homepage

One final way to track word-of-mouth is organic users who visit your website homepage. We track this in PostHog as an insight that combines:

- Unique users who visited the homepage via Google search
- Unique users how visited the homepage directly

This will capture people who search for your brand, and those who navigate there directly, visit via Slack, WhatsApp and other "dark social" sources.

If you're using PostHog, remember to add `UTM Source` = `Is not set` to filter out any paid ad campaigns you're running.

This method will capture some existing users as well, but we've found it correlates well with surges in word-of-mouth awareness.

#### Word-of-mouth pros and cons

<td className="text-center"><span className="text-green text-lg">✔</span></td> Easy to track.

<td className="text-center"><span className="text-green text-lg">✔</span></td> Useful when you're pre-revenue.

<td className="text-center"><span className="text-green text-lg">✔</span></td> Easy to compare with other companies.

<td className="text-center"><span className="text-green text-lg">✔</span></td> Positive sentiment is highly motivating.

<td className="text-center"><span className="text-red text-lg">✖</span></td> Not a reliable sign of product-market fit on its own.

<td className="text-center"><span className="text-red text-lg">✖</span></td> Spikes in hype and awareness can be misleading.

<td className="text-center"><span className="text-red text-lg">✖</span></td> Not useful for companies with low-profile brands – e.g. enterprise products.

### Method #2: The PMF Survey ❓📋

The PMF Survey[^2] is a twist on the classic Net Promoter Score, but it's designed _specifically_ for finding product-market fit.

Created by entrepreneur Sean Ellis, the core question it asks is:

“How would you feel if you could no longer use [ProductName]?”

- a) Very disappointed
- b) Somewhat disappointed
- c) Not disappointed

You want to learn everything you possibly can about people who answer "very disappointed". Organize a call and talk to these users. Follow-up survey questions are useful too, but don't rely on these alone. Ask open-ended, probing questions to understand why they love your product. Do the same users in the "somewhat disappointed" cohort.

Based on his research of 100+ startups, Ellis believes 40% answering "very disappointed" is a strong signal of product-market fit. The more responses you get, the more reliable the signal. Ellis recommends a minimum of 30:

> "In my experience, a minimum of 30 responses is needed before the survey becomes directionally useful. At 100+ responses I am much more confident in the results."

An open research project run by Hiten Shah[^3], co-founder of KISSmetrics, used the PMF Survey on 731 Slack users, the results showed:

- 51% responded they would be very disappointed if they couldn't use Slack
- These users believed it increased productivity and improved collaboration
- All groups said video conferencing was a must-have addition

It's no coincidence Slack has since added video conferencing.

Email app Superhuman – valued at $825 million after a 2021 Series C – is a great case study for the PMF survey.[^4] 

When it started using the survey in 2017, 22% of users answered "very disappointed" and 52% answered "somewhat disappointed".

After the initial survey, Superhuman created a four-step process to convert the 52% into strong supporters, and double-down on the 22% who already loved the app.

1. **Segmenting users:** They assigned personas to each person who responded to survey – e.g. founder, engineer, customer success, etc. – and created a cohort based on the personas who appeared in the 22%. In this cohort, 32% of people responded "very disappointed", and they created a more detailed Ideal Customer Profile based on these users.

2. **Gathering feedback:** They analyzed feedback from "on-the-fence" users, asking them "how can we improve Superhuman for you?" They ignored users who answered "not disappointed". The most common thing the on-the-fence users wanted? A mobile app. They did the same for their strong supporters.

3. **Building a roadmap:** Armed with this feedback, Superhuman built a roadmap of new features. Half dedicated to improvements for their "very disappointed" cohort, the other for the users they wanted to convert.

4. **Rinse and repeat:** Superhuman continued to survey users, tracking progress towards the 40% mark: "It was our most highly visible metric, and we tracked it on a weekly, monthly and quarterly basis." The score became the primary OKR for the product team and, after three quarters, Superhuman had doubled the score to 58%.

#### PMF Survey pros and cons

- <td className="text-center"><span className="text-green text-lg">✔</span></td> Can help guide product development in the right direction.

- <td className="text-center"><span className="text-green text-lg">✔</span></td> Easy to break down into multiple cohorts to understand your ICP.

- <td className="text-center"><span className="text-green text-lg">✔</span></td> Can be systematised to improve product-market fit over time.

- <td className="text-center"><span className="text-green text-lg">✔</span></td> Useful for tracking how your product-market fit changes over time.

- <td className="text-center"><span className="text-green text-lg">✔</span></td> Will help you understand why you do or don't have product-market fit.

- <td className="text-center"><span className="text-red text-lg">✖</span></td> It can provide a false positive – e.g. you can have good fit for people who won't pay.

- <td className="text-center"><span className="text-red text-lg">✖</span></td> Somewhat labor intensive – requires setting up surveys and collating results for analysis.

- <td className="text-center"><span className="text-red text-lg">✖</span></td> Not driven by real usage – always validate with engagement, or retention, data.

### Method #3: User engagement

By user engagement we mean data showing users experiencing value from your product – i.e. performing an action, or a series of actions. Logging in ≠ engagement.

You want to see user engagement growing in line with, or faster, than new user signups. If engagement is growing much faster than signups, it's a strong sign you have product-market fit.

[GRAPH HERE SHOWING GOOD FIT]

If signups are growing, but user engagement isn't, it's likely you _don't_ have product-market fit.

[GRAPH HERE SHOWING BAD FIT]

At PostHog, we created a user engagement metric we call Discoveries. We define a discovery as:

- **Analyzing any insight** – Analyzing means viewing for 10 seconds or more. Insights include trends, funnels, paths, lifecycle, and stickiness.

– **Analyzing a recording** – Watching a recording for 10 seconds or more.

- **Analyzing a correlation analysis report** – Analyzing means viewing for 10 seconds or more.

- **Analyzing a dashboard** – Analyzing means viewing a dashboard for 10 seconds or more.

We also track things like people inviting new team members, which we've found correlate strongly to retention. 

If you find your chosen engagement metric doesn't correlate to retention you either:

1. Don't have product-market fit.
2. Are tracking the wrong metric.

#### User engagement pros and cons

- <td className="text-center"><span className="text-green text-lg">✔</span></td> Tracks the real value users gain from your product.

- <td className="text-center"><span className="text-green text-lg">✔</span></td> Passive to maintain – set it up once and track forever.

- <td className="text-center"><span className="text-green text-lg">✔</span></td> Easy to understand for all teams.

- <td className="text-center"><span className="text-green text-lg">✔</span></td> Can be broken down by user cohorts for comparison.

- <td className="text-center"><span className="text-red text-lg">✖</span></td> High user engagement isn't predictive of revenue – will they pay if asked, and how much?

- <td className="text-center"><span className="text-red text-lg">✖</span></td> Can provide a false positive if you're tracking the wrong things.

### Method #4: Retention curve 📈📉

The retention curve is a lagging indicator of product-market fit. If it fattens _at any point_, it's a strong sign you have product-market fit.

[GRAPHIC HERE]

To create your retention curve, you'll want to track active users over a long(ish) period of time – weeks or months, rather than days.

How you define an active user is up to you, but it's best to track events or actions where a user is experiencing the _real value_ of your product – again, logging in does not count!

For our product PostHog, an all-in-one analytics platform, this might look like:

> Show `unique users` who performed a `discovery` for the first time in the last `12 months` and then came back to perform a `discovery` on any of the next months.

It's also a good idea to track different cohorts, such as retention for users who match your ideal customer profile, or split by job title – whatever makes sense for you product. This will help you understand how strong your product-market fit is for different groups, and plan your roadmap accordingly.

#### Retention curve pros and cons

- <td className="text-center"><span className="text-green text-lg">✔</span></td> Reliable lagging indicator of product-market fit.

- <td className="text-center"><span className="text-green text-lg">✔</span></td> Can be broken down by cohort for comparison.

- <td className="text-center"><span className="text-green text-lg">✔</span></td> Easy to understand – flat is good, not flat is bad!

- <td className="text-center"><span className="text-red text-lg">✖</span></td> Not predictive of revenue – will retained users actually pay for your product?

- <td className="text-center"><span className="text-red text-lg">✖</span></td> You need several months of data to get a realiable signal.

### Method #5: The burn multiple 🔥💸

Created by David Sacks[^5], a former COO of PayPal, burn multiple measures how much you're spending to grow revenue. The less you spend, the more efficient your growth. More efficient growth = stronger product-market fit.

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

Why is burn multiple a useful measure of product-market fit? Here's Sacks again (emphasis added):

> "The startup that generates $1M million in ARR by burning $2M is more impressive than one that does it by burning $5M. In the former case, it appears that **the market is pulling product out of the startup**, whereas in the latter case, the **startup is pushing its product onto the market**. VCs will make inferences about product-market fit accordingly."

Sacks goes on to explain that burn multiple is useful because it's a catch-all metric. Multiple factors, such as high costs, churn rate, growth, etc., will ultimately impact your burn multiple positively or negatively.

#### Burn multiple pros and cons

<td className="text-center"><span className="text-green text-lg">✔</span></td> It's a cumulative metric that's influenced by all parts of your startup.

<td className="text-center"><span className="text-green text-lg">✔</span></td> It's easy to calculate – it's just two numbers any founder should have to hand.

<td className="text-center"><span className="text-green text-lg">✔</span></td> A steady decline is a strong indicator of product-market fit.

<td className="text-center"><span className="text-green text-lg">✔</span></td> It's useful for investors.

<td className="text-center"><span className="text-green text-lg">✔</span></td> It's easy to understand.

<td className="text-center"><span className="text-green text-lg">✔</span></td> Revenue growth is a significant factor – useful for mid/later-stage startups.

<td className="text-center"><span className="text-red text-lg">✖</span></td> It's a significantly lagging indicator.

<td className="text-center"><span className="text-red text-lg">✖</span></td> It's not useful if you're pre-revenue.

<td className="text-center"><span className="text-red text-lg">✖</span></td> It won't help you understand why you do or don't have product-market fit.

### Method #6 CLV/CAC ratio 📆💰

> - **CLV** = customer lifetime value – i.e. the total value of a customer after churn and the cost of supporting / retaining them.
>
> - **CAC** = customer acquisition cost - i.e. how much you're spending to > acquire new customers.

CLV/CAC ratio is a robust, but complicated, measure of product-market fit. Robust because it speaks directly to the long-term financial health of your company; complex because calculating CLV and CAC accurately isn't a trivial task.

Nikhyl Singhal, who has sold startups to IBM and Google and is currently VP of Product at Meta, favors this measure because:

> "There are a lot of product/market fit definitions out there that focus on how many users love you. But that misses a key ingredient: the profitability and sustainability of what it takes to acquire that love."

A CLV/CAC ratio of 1x means your CLV and CAC are the same – i.e. you're only earning enough to cover your acquisition costs. A ratio of 2x means you're earning twice as much as you're spending to acquire new customers.

| **CLV/CAC ratio** | **PMF likelihood** |
|-------------------|----------------|
| Over 3x           | Guaranteed     |
| 2x to 3x          | High           |
| 1x to 2x          | Good           |
| 0.5 to 1x         | Low            |
| Under 0.5x        | Very low       |

By its nature, the ratio is most useful for later-stage companies who have other strong signs of product-market fit. Their CLV/CAC ratio will either confirm or deny this belief, or indicate a need to cut costs / increase margins to make the business healthy in the long term.

#### CLV/CAC ratio pros and cons

- <td className="text-center"><span className="text-green text-lg">✔</span></td> Very reliable indicator of product-market fit and long-term financial health.

- <td className="text-center"><span className="text-green text-lg">✔</span></td> Investors will love a high ratio.

- <td className="text-center"><span className="text-green text-lg">✔</span></td> Useful for confirming other signs of product-market fit.

- <td className="text-center"><span className="text-green text-lg">✔</span></td> Can't be gamed or rationalized.

- <td className="text-center"><span className="text-red text-lg">✖</span></td> Complicated to calculate and understand.

- <td className="text-center"><span className="text-red text-lg">✖</span></td> Not useful for engineering or product teams.

- <td className="text-center"><span className="text-red text-lg">✖</span></td> Not useful for early-stage startups.

## The Triforce of Product-Market Fit






[^1]: [The Never Ending Road To Product Market Fit](https://brianbalfour.com/essays/product-market-fit) – by Brian Balfour – Dec 11, 2013

[^2]: [Using Product/Market Fit to Drive Sustainable Growth](https://blog.growthhackers.com/using-product-market-fit-to-drive-sustainable-growth-58e9124ee8db) – Sean Ellis – Apr 5, 2019

[^3]: [731 Slack Users Reveal Why It’s So Addictive](https://hitenism.com/slack-product-market-fit-survey/) – Hiten Shah – May, 18, 2015

[^4]: [How Superhuman Built an Engine to Find Product Market Fit](https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit) – Rahul Vohra – Nov 13, 2018

[^5]: [The Burn Multiple](https://sacks.substack.com/p/the-burn-multiple-51a7e43cb200) – David Sacks – Apr 23, 2020

[^6]: [How to Craft Your Product Team at Every Stage, From Pre-Product/Market Fit to Hypergrowth](https://review.firstround.com/how-to-craft-your-product-team-at-every-stage-from-pre-product-market-fit-to-hypergrowth) – Nikhyl Singhal – Dec 10, 2019

