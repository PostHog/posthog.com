---
title: What engineers get wrong about analytics
date: 2024-03-11
author:
  - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1711412696/posthog.com/contents/images/blog/misconceptions-about-analytics/analytics.webp
featuredImageType: full
tags:
  - Product engineers
  - Engineering
crosspost:
  - Product engineers
  - Blog
---

Regular readers will know we think engineers today need to [get involved in product decisions](/blog/what-is-a-product-engineer), talk to users, and analyze usage data. It’s a core part of how we [designed our company for speed](https://newsletter.posthog.com/p/how-to-design-your-company-for-speed).

But not all engineers are totally comfortable with using analytics data day-to-day. Often it’s due to working at companies where data is distorted as evidence for bad decisions, or frustration at dealing with overly complex implementations.

Whatever the reasons, these are some of the most common complaints we hear and how to deal with them.

**This week’s theme is:** Getting over your fear of data.

> This article was first published in our newsletter, [Product for Engineers](https://newsletter.posthog.com/). It's all about helping engineers and founders build better products by learning product skills. [Subscribe here](https://newsletter.posthog.com/subscribe).

## 1. “It’s too early for analytics”

Early-stage startups who want to ship as fast as possible often skip implementing analytics, thinking it’ll slow them down.This makes sense for pre-launch products, but launching without analytics because “it’s too early” is a false economy. 

Once you launch, priorities shift from shipping as fast as possible to shipping **the right thing** as fast as possible. 

This is impossible without analytics.

![Flashlight](https://res.cloudinary.com/dmukukwp6/image/upload/v1711412693/posthog.com/contents/images/blog/misconceptions-about-analytics/flashlight.jpg)

Analytics are your flashlight.

It can’t guarantee success, but it will show you where you’re going, and whether users are getting real value from your product.

The longer you wait, the more time you’ll waste [figuring out what to build](https://newsletter.posthog.com/p/how-we-decide-what-to-build).

> **Further reading:** [The 80/20 of early-stage startup analytics](/founders/early-stage-analytics)

## 2. “It’s too complicated”

Engineers often tell us they’ve found setting up analytics complex and time consuming. This is mostly due to:

- [Modern data stack](/blog/modern-data-stack-sucks) evangelists convincing people you need 10 different tools to do “proper” analytics, and to pay a consultant to set it all up for you.

- Legacy analytics tools that enforce complicated installation processes and manual event instrumentation before you can learn anything.

- Numerous online guides recommending you create an elaborate plan, like a customer journey map, tracking plan, or analytics strategy.

![Modern Data Stack](https://res.cloudinary.com/dmukukwp6/image/upload/v1711412694/posthog.com/contents/images/blog/misconceptions-about-analytics/insights.jpg)

There’s a time and place for all this, but it’s better to **start small:**

1. Choose a specific product or feature.

2. Track its usage with [autocapture](/docs/product-analytics/autocapture) and/or custom events.

3. Visualize this data with trends and retention graphs.

4. Ship features that improve those visualizations.

This gets the basics sorted and helps you quickly understand what’s useful and what you’re missing. Then you can start tracking more complex custom events and doing more advanced analysis.

## 3. “It distracts me from shipping”

Engineers are busy. At best, analytics is part of your job. You might realize you should be checking analytics, but aren’t sure about **when**. Worse still is checking it all the time and not learning anything.

Engineers are judged by what they ship, so the most leveraged time to engage with analytics is **right after you ship something:**

1. Watch sessions to see how people are using your new feature.

2. Monitor error rates to check for new bugs you need to squash.

3. Check for changes in key metrics, like adoption and activation trends.

Being intentional about when and how you engage with analytics data will ensure you get full value from it, and stop you obsessing over small changes in vanity metrics.

> **Read more:** [How we build features users love (really fast)](/product-engineers/measuring-feature-success)

## 4. “Session replays are for marketers”

Many session replay tools brand themselves as wishy-washy “customer experience” or “digital insight” platforms. Tools built for product managers and marketers.

This is unfortunate because the high information density of session replays make them incredibly useful to engineers, because they:

1. **Identify big, obvious problems.** Session replays uncover show-stopping bugs, unexpected behavior, and issues preventing people from getting value from your product. Identifying and fixing these can dramatically improve your product.

2. **Connect behavior to events.** When starting with analytics, it can be hard to understand how data represents behavior. Replays help you make this connection by showing events alongside real behavior.

![Session replay](https://res.cloudinary.com/dmukukwp6/image/upload/v1711412695/posthog.com/contents/images/blog/misconceptions-about-analytics/session-replay.png)

Next time you ship a new feature, watch replays of its usage. You might find UX issues to tidy up, use cases to connect, or unexpected behaviors you should investigate.

## 5. “The numbers are all that matters”

Engineers are used to judging their work based on quantitive data like query speed, load time, test coverage, conversion rate, and uptime. But relying on this data alone is like tying one arm behind your back.

To get it back, you need to get familiar with qualitative data sources like:

- **Surveys:** It’s often faster to validate something by asking users if they want it first – we chose our first data warehouse connectors (Stripe and Hubspot) from asking users. You can also create a powerful feedback looping using NPS or PMF surveys to track satisfaction over time, as [Superhuman famously demonstrated](https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit/).

- **User interviews:** Talking to users helps engineers understand use cases and dive into details. Our session replay feature, for example, came from an engineer talking to a user and realizing the best solution for them was integrating it with our existing product analytics tool.

“The customer isn’t always right” is a lazy get out clause. Yes, you shouldn’t slavishly follow every suggestion you receive, but combining qualitative and qualitative data will help you build better products.

> **Read more:** [10x engineers talk to users](/product-engineers/10x-engineers-do-user-interviews)

## 6. “Analytics data is unreliable”

This is a common complaint as companies grow and collect more data, especially if they’ve deployed a complicated data stack they’re struggling to manage.

But this is a fixable problem. [Anna Debenham](https://www.linkedin.com/in/anna-debenham/), a developer, product leader and startup advisor, [suggests simple solutions](/product-engineers/5-ways-to-improve-analytics-data) like:

1. **Enforcing consistent naming conventions.** For example, only using lowercase, present tense, and snake case for your custom events – i.e. click_signup_button as opposed to Signup-Button-Clicked.

2. **Deploying a reverse proxy.** This limits the impact of tracking request blockers, improving data quality. Tracking more backend events is a good idea, too.

3. **Versioning your events as your app evolves.** So you can easily distinguish between older and newer events, while preserving historical data.

Analytics is some of the most valuable data an organization has. If you find yourself avoiding it because it’s wrong or messy, fixing it is time well spent.

## Good reads for product engineers 📖

- **[Product Management is broken, a change is coming](https://zaidesanton.substack.com/p/product-management-is-broken-and) – Anton Zaides:**
Anton and Leo write about how the dynamics between engineers and product managers are broken and how to fix them.

- **[A software engineer's guide to A/B testing](/product-engineers/ab-testing-guide-for-engineers) – Lior Neu-ner:** Engineers have a lot of misconceptions about A/B testing, too. Lior writes about how A/B testing works, how to create a good test, and more.

- **[Rethinking the startup MVP: Building a competitive product](https://linear.app/blog/rethinking-the-startup-mvp-building-a-competitive-product) – Tuomas Artman:** Linear’s co-founder argues “today's Minimum Viable Product (MVP) is often about building a better version of an idea, not validating a novel one.”

- **[The 14 pains of building your own billing system](https://arnon.dk/the-14-pains-of-billing/) – Arnon Shimoni:** Billing systems are surprisingly complicated, connect to many parts of the company, and are mission critical to… making money. Arnon does a deep dive of patterns and pains you need to know when building one.

*Words by Ian Vanagas, party parrot evangelist.*