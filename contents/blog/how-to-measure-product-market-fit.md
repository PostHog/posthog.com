---
date: 2023-06-08
title: X proven ways to measure product-market fit
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

## What is product-market fit?

Achieving product-market fit isn't a golden ticket to a billion-dollar IPO, but startups can't succeed without it. 

According to investment legend Marc Andreesen, product-market fit means:

1. "Being in a good market" – i.e. one with sufficient potential customers who will pay for a product that solves their problem(s).

2. "With a product that can satisfy that market" – i.e. your product solves their problem _and_ the price is right.

Now, most guides tell you how it _feels_ to have product-market fit. Everything feels effortless when you have it, or impossibly difficult when you don't, and so on.

But product-market fit isn't just an ephemeral gut feeling. You can _measure_ it, and _it moves_ as your customer's needs change, or new solutions appear.

This guide is about finding ways to measure product-market fit, your progress toward it, and how it changes over time.

## x ways to measure product-market fit

You can measure product-market fit using a _combination_ of these five methods:

1. Word-of-mouth sentiment and growth
2. The Product-Market Fit Survey
3. The retention curve
4. Burn multiple (net burn / net new ARR)
5. Cost of acquisition vs lifetime customer value

We recommend tracking a minimum of two, preferably one leading indicator (e.g. user surveys) and one lagging indicator (e.g. retention). You can always add more later when you're ready.

> ### Difference between leading and lagging indicators
>
> **Leading indicators** are predictive of future growth revenue. A surge in word-of-mouth awareness, if matched by signups, suggests you'll see growth in future.
>
> **Lagging indicators** confirm progress toward a goal, whether it's revenue, retention, or product-market fit.

### Method 1: Tracking word-of-mouth 🥰

You can't validate product-market fit on word-of-mouth alone, but it's a useful leading indicator, and a great motivator.

None of the following methods are perfect on their own, but they give you a decent signal when combined.

#### 1. Get brand mention alerts using Syften

Syften does what people _think_ Google Alerts does – it monitors popular websites (Reddit, Twitter, Hacker News, etc.), communities (inc. those on Slack, Facebook and Quora), and newsletters for mentions of any keyword you choose, such as your brand name, and sends you alerts via email, RSS, or Slack.

We use Syften at PostHog to send alerts to a `#brand-alerts` channel on our Slack, so everyone can get a feel for how often we're mentioned, and what people are saying. 

To go on step further, set up a Zapier integration and connect to Google Sheets, where you can collect your mentions, and track trends over time. Needless to say, up and to the right if your goal.

Brand alerts are also a great way to drive acquisition by talking to people considering your product. 

> **❗️Important:** It's _much easier_ to track brand mentions if your company has a unique name. If your company name is also a common noun (e.g. Amplitude, Apple, etc.), you're bang out of luck.

#### 2. Track brand search using Google Trends and Search Console

**Google Trends** is a great option if you have a unique brand name. Just plug your brand into Trends to see how searches for your brand are trending over time.

[INSERT IMAGE]

Its also useful for comparing yourself to other companies, such as those you _know_ have product-market fit, companies of a similar size / age to yours, or competitors in your space.

[INSERT IMAGE]

At PostHog, we also use **Glimpse** – a handy browser extension that augments Google Trends by adding trend lines, forecasts, real search volumes, and the ability track search trends (and get alerts) over time.

[INSERT IMAGE]

**Google Search Console** is useful if you don't have a unique brand name. Unlike Trends, it tracks search traffic directly to your website, excluding any non-relevant searches. 

In search console, go to `Search results` under `Performance` to view search trends for your website. From here you can observe trends for branded search terms (i.e. "your brand" or "your brand + keyword"), or your homepage.

If you find Search Console hard to use, [try this template](LINK HERE) for Looker Studio and connect it.

#### 3. Use organic homepage traffic as a proxy

One final way to track word-of-mouth is organic users who visit your website homepage. We track this in PostHog as an insight that combines:

- Unique users who visited the homepage via Google search
- Unique users how visited the homepage directly

This will capture people who search for your brand, as well as people navigate there directly, or visit via Slack, WhatsApp and other "dark social" sources.

If you're using PostHog, remember to add `UTM Source` = `Is not set` to filter out any paid ad campaigns you're running.

This method will capture some existing users as well, but we've found it correlates well with surges in word-of-mouth awareness.

### Method 2: The Product-Market Fit Survey 📋

The PMF Survey is a twist on the classic Net Promoter score, but it's designed _specifically_ for finding product-market fit.

Created by entrepreneur Sean Ellis, it asks users one simple question:

“How would you feel if you could no longer use [ProductName]?”

- a) Very disappointed
- b) Somewhat disappointed
- c) Not disappointed

You want to learn everything you possibly can about people who answer "very disappointed". Organize a call and talk to these users. Follow-up survey questions are useful too, but don't rely on these alone. Ask open-ended, probing questions to understand why they love your product. Do the same users in the "somewhat disappointed" cohort.

Based on his research of 100+ startups, Ellis believes 40% answering "very disappointed" is a strong signal of product-market fit. The more responses you get, the more reliable the signal. Ellis recommends a minimum of 30:

> "In my experience, a minimum of 30 responses is needed before the survey becomes directionally useful. At 100+ responses I am much more confident in the results."

An open research project run by Hiten Shah, co-founder of KISSmetrics, used the PMF Survey on 731 Slack users, the results showed:

- 51% responded they would be very disappointed if they couldn't use Slack
- These users believed it increased productivity and improved collaboration
- All groups said video conferencing was a must-have addition

It's no coincidence Slack has since added video conferencing.

Email app Superhuman – valued at $825 million after a 2021 Series C – is a great case study for the PMF survey. 

When it started using the survey in 2017, 22% of users answered "very disappointed" and 52% answered "somewhat disappointed".

After the initial survey, Superhuman created a four-step process to convert the 52% into strong supporters, and double-down on the 22% who already loved the app.

1. **Segmenting users:** They assigned personas to each person who responded to survey – e.g. founder, engineer, customer success, etc. – and created a cohort based on the personas who appeared in the 22%. In this cohort, 32% of people responded "very disappointed", and they created a more detailed Ideal Customer Profile based on these users.

2. **Gathering feedback:** They analyzed feedback from "on-the-fence" users, asking them "how can we improve Superhuman for you?" They ignored users who answered "not disappointed". The most common thing the on-the-fence users wanted? A mobile app. They did the same for their strong supporters.

3. **Building a roadmap:** Armed with this feedback, Superhuman built a roadmap of new features. Half dedicated to improvements for their "very disappointed" cohort, the other for the users they wanted to convert.

4. **Rinse and repeat:** Superhuman continued to survey users, tracking progress towards the 40% mark: "It was our most highly visible metric, and we tracked it on a weekly, monthly and quarterly basis." The score became the primary OKR for the product team and, after three quarters, Superhuman had doubled the score to 58%.

### The retention curve















1. PMF / NPS survey
2. Using retentions curve / flatening curve
3. Spontanous word of mouth growth (how to measure this?)
4. Burn Multiple = Net Burn / Net New ARR https://www.lennysnewsletter.com/i/240863/cost-efficient-growth
5. CAC < LTV





Do You Have Product Market Fit? It's All About Retention: https://www.youtube.com/watch?v=bpnYFG1-rdk

https://www.lennysnewsletter.com/p/how-to-know-if-youve-got-productmarket
