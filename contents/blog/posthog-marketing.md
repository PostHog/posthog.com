---
date: 2022-09-23
title: "How our marketing team uses PostHog"
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: ["Inside PostHog"]
author: ["andy-vandervell"]
featuredImage: ../images/blog/posthog-engineering-blog.png
featuredImageType: full
---

We learned an interesting fact recently: only 20% of our users track their marketing website **and** their product using PostHog.

This is our fault. We market PostHog to engineers, so it's not a surprise few use it for marketing as well.

But here's another fact: all the things that make PostHog great for understanding your product also apply to your website. To show you how, we're sharing how our marketing uses PostHog. We hope you find it useful.

> Andy Vandervell is Content Marketing Lead at PostHog. Yadda Yadda

## The goals of our marketing team

To start, let's talk about our goals as a marketing team. In Q3 2022, these were:

- Average 420 weekly 'new organization signups'
 
- Increase Organic SEO traffic to 5,000 unique users per week

- Acquire 20 new reviews on our G2 profile

But these are top-level goals. We use PostHog to track them, but they're the output of dozens of others track. To do so, we built dashboards... lots of dashboards. 

In fact, 'how we use PostHog for marketing' is really a story about all the dashboards we use. Let's start at the top.

## The Marketing Dashboard 

This is our top-level dashboard. It tracks our most important metrics, like 'new org signups', as well as other top-level ones (e.g. validated credit cards). It also features a handful of "circuit breaker" metrics.

### Core KPIs

This dashboard has a row of two insights for each top-level metric. One is the total number with 'compare to previous period' enabled; the second is the same metric as a weekly trend. This gives us an at-a-glance view of the top-level number, and context on how it's trending.

[Number + Weekly Trend SCREENSHOT]

We look at the last 90 days by default, but you can change the date range of the whole dashboard whenever you like. We add annotations to denote important events – e.g. changes to landing page designs, or a blog article going viral.

[Annotation screenshot] 

(Seriously, people, **use annotations!** It's way easier than trying to remember the date you redesigned your pricing page six months ago.)

### Circuit breakers

We like to iterate our website quickly, which often means pushing new designs live without testing. As a fallback, we track various  "circuit breaker" metrics on our marketing dashboard, such as the conversion rate on key landing pages.

[pricing conversion screenshot]

In July, for example, we iterated several different versions of a new pricing page. As you can see (above), our first iteration was a pretty dramatic failure. Users visiting the pricing page and "showing intent" (we'll get into what this means later) declined from ~25% down to ~10%.

This lead our Website & Docs team to iterate several new versions, which they then tested using feature flags and experiments. Conversions have since returned to normal and we've simplified our pricing as a result.

> 💡 **Try using filters on dashboards:** You can apply global filters to any dashboard based on event properties, person properties, feature flags, and cohorts. This is a great way to drill down into specific audiences (e.g. users by country, city, continent).

## Website Dashboard

One level below we have our main website dashboard. This is less focused on conversion metrics and more on general traffic trends across posthog.com. Here, we're looking at typical analytics things like:

- Total website users
- Organic SEO users
- Unique users reading the blog
- The most read pages in each website section
- A map view showing website users by country

This is all pretty straightforward stuff, but it's still very useful to us as a marketing team. Recently, for example, we identified a specific tutorial that was getting loads of SEO traffic but was in serious need of updating.

[SCREENSHOT HERE]

Again, we use a lot of `# Number` views here combined with weekly breakdowns to add further context. The top two rows of the dashboard (pictured above) combine both to provide a quick overview view of website traffic.

[Breakdown screenshot]

Drilling further down, we breakdown the unique sessions by website section (above). Given we're a developer tool first, our Docs pages are generally the most popular. You can do this by creating a trends insight with multiple graph series where `Current URL` contains your desired URL path.

[sessions per users]

We also track `sessions per user` and `pages per session` here using trends insights. We're not looking to optimize these metrics, but they can be useful for comparative purposes.

> 💡 **Tracking sessions/pages per user:** In PostHog, create a trends insight with two graph series – e.g. series 'A' as unique users and series 'B' as unique sessions. Next, input your desired formula into the 'Formula' box under 'Filters. In this case, `B/A` would give you 'sessions per user'. You can also use this to calculate conversion rates, among other things.

### SEO performance tracking

SEO is an important channel for us – it's a signal of word of mouth growth and high intent traffic to SEO content.

As the below graphic from Google Trends shows, we've seen a consistent increase in brand searches in 2022.

[Google trends screenshot]

(For those interested, the trend line is generated using the Glimpse SEO Chrome extension. I highlight recommend it!)

We use insights to help isolate the impact of our SEO content efforts from this organic word of mouth growth. For example, the insight below shows the weekly cumulative growth of all our SEO content since the beginning of the year.

[screenshot here]
 
You can get this view by selecting the 'Time' option in the 'Chart type' dropdown.

This insight also helps identify when traffic to our SEO content is dropping off.  This is normally a prompt to investigate further in SEMRush, where we track Google rankings for a few hundred different keywords. That said, a degree of fluctuation is normal, so it's best not to overreact to a couple of down weeks. 

> 🚨 **Measure outcomes, not activity:** Newsflash, bounce rate is not a useful metric! Neither, to a lesser extent, are popular web metrics like time on page or session duration. Unless you're a social network or publisher, what does the time someone spends on your website actually tell you? Nothing, so we don't measure it. Instead, we measure outcomes... which is what our next dashboard is all about.

## Content Marketing Effectiveness

This dashboard dives deeper into the impact of specific pages. It's built around a metric we call 'Showed Intent', though you could rename this 'Engaged Users' or any other euphemism you prefer. 

Let's dig into it a little more.

### What is 'Showed Intent'?

In a nutshell, 'Showed Intent' applies to any user who triggers an event we know indicates genuine interest in the product. These are things like:

- Visiting the [PostHog Cloud signup page](https://app.posthog.com/signup)
- Visiting the [self-host license page](https://license.posthog.com/)
- Booking a demo
- Visiting the [self-host section](https://posthog.com/docs/self-host) of our docs.

We track these by using an 'action' – a way of combining similar events into single event you can use in insights. You can create actions using the PostHog Toolbar or via the Data Management tab in PostHog – it's dead easy.

Why do we use this and not just signed up users? There are a few good reasons:

1. Open source users don't trigger a sign-up event.

2. Signups are a much smaller number compared to total website visitors, making it hard to generate useful insights.

3. A user's consideration period can be several weeks or months, so the actual conversion event often falls outside the tracked period, or can't be easily attributed.

4. Even a user who doesn't end up signing up to PostHog might suggest it to a friend or colleague.

### Content + intent = effectiveness

The 'Showed Intent' action allows us to create funnel insights like the one below. It shows the percentage of all blog readers who 'Showed Intent'.

[Insight screenshot]

But... hold-up-a-minute, 3.5% seems like a very low number doesn't it? Fret not, this is why we also have a second insight on our dashboard showing the historical trend, see below.

[trend insight]

That massive dip? It's when '[The really important job interview questions engineers should ask (but don't)](/blog/what-to-ask-in-interviews)' went massively viral, generating upwards of 100k users to the blog. Few of those 100k users came to consider PostHog as a product (which is fine), but it's a good reminder of why you should always check these things.

Beyond this top-level metric, the Content Marketing Effectiveness dashboard (yes, it is a long-winded name!) allows us to compare the influence of different articles and content formats. Let's look at some examples.

[screenshot]

Above is a funnel analysis for one of our most successful blog posts, a guide to open source session recording tools? It converts to intent at nearly 23%, which is awesome.

At other end of the spectrum, we have our guide to GDPR-compliant analytics tools. It only converts 6.3% of the time – perhaps the launch of [PostHog Cloud EU](/signup/eu-cloud) will increase that figure? 🤔

Comparison articles, such as [PostHog vs Amplitude](/blog/posthog-vs-amplitude) convert very well – in the region of 25%. This makes sense given people coming into these articles are already in a consideration phase, but the confirmation is useful.

Overall, these are the kinds of insights that help us inform our content and SEO priorities, which is hugely important given we're a small team. We have a nearly identical dashboard for tracking the impact of [customer stories](/customers), too.

## Paid Ads & Attribution

COPY COPY COPY

## How did we do in Q3?

So that's how we use PostHog in our marketing team, but how did we do in Q3? 

Overall, pretty well. Most pleasingly, we smashed our target 420 weekly new org. signups – we consistently hit over 450 per week in August and had our first 500+ week in September.

Progress on our organic SEO target (5,000 weekly users) has been steady rather than spectacular. We were at ~4,000 per week in July and we're currently hovering around the 4,700 mark – we had one 5,000 user week in August.

We achieved 14 of the 20 G2 profile reviews we aimed for in Q3 with an average score of 4.4. Not bad.


## What's next?

We're currently reviewing our objectives for Q4, but we're also looking to make improvements to what and how we track our marketing efforts.

### Quality signals for new users

We're currently working on a process for "quality scoring" signups. 

Our favored solution is based on an Ideal Customer Profile (ICP) score created by our customer success team. Once we've got the process nailed, it'll give us a much better picture of which channels are most valuable to us. 

We're also considering several other supporting signals, such as new users who ingest events or invite colleagues. We're still debating the best approach here.

### Improving how we track attribution

Until recently, we weren't focused on attribution outside of UTM parameters on our paid marketing activities. Marketing attribution is notoriously hard, so we felt our time and energy was better spent elsewhere. That said, it's becoming more important as we scale.

[screenshot] 

We recently started collecting more information from users at signup – we've added an optional text field where people can tell us where they heard about us. We collect this data in PostHog and manually export it for collation and analysis. It's not the most automated process ever, but it's a start and something we'll evolve over time. 

## Further reading

We hope this look at how we use PostHog will inspire you (and your marketing teams) to experiment with what's possible in PostHog. Just like our product, our approach to marketing is always evolving, so we'll be back to update you on that in future. 

In meantime, here's some suggested further reading:

- [PostHog product manual](/using-posthog): Need to learn how to build an insight, how different insights work, or how to build a cohort? This is the place to start.

- [Using the PostHog Toolbar to visualize behavior and create actions](/tutorials/toolbar): The PostHog Toolbar is a useful way to understand how users interact with your website. You can also use it to create actions.

- [How to build, analyze and optimize conversion funnels in PostHog](/tutorials/funnels): An in-depth guide to building, analyzing and improving your conversion funnel.