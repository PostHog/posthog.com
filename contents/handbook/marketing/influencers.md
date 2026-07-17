---
title: Influencers
sidebar: Handbook
showTitle: true
---

We work with creators and influencers to make content about PostHog and sponsor placements that drive awareness and sign ups.

We're always open to inbound proposals. If you'd like to collaborate with us, email <TeamMember name="Adlet Smykov" /> directly — we love seeing thoughtful ideas.

## Our approach

We don't think of influencer marketing as buying ads. We think of it as building long-term relationships with people our ICP already trusts.

The best creators are usually users first. We'd rather work with someone who genuinely likes PostHog than someone with a much larger audience who has no connection to the product.

We optimize for recurring collaborations over one-off sponsorships. The goal is to become part of a creator's story, not interrupt it.

## Creator lifecycle

A sponsorship shouldn't be viewed as a single transaction. The ideal lifecycle looks something like:

**Discover → Evaluate → Outreach → First collaboration → Feedback → Repeat collaboration → Long-term partnership**

Most of the value shows up later in this arc, not at the first collaboration, so it's worth investing early in creators you can see yourself working with again across launches.

## Sourcing and evaluating influencers

- You can find new influencers by looking at the creators engineers share or mention internally, searching for ones who have made relevant videos, looking at the recommendations of ones we've already sponsored, inbound, and [Kuli](https://kuli.one/#how-it-works) (AI-powered influener discovery tool).

Don't limit yourself to individual creators. Great partnerships often come from other places too:

- recommendations from existing creator partners
- agencies
- conferences and IRL events
- founders building interesting products
- people actively sharing what they've built with PostHog

The creator economy is surprisingly small. Building a good reputation compounds over time, so investing in long-term relationships is usually more valuable than constantly sourcing new creators.

When you're evaluating a specific creator:

- Their audience needs to be relevant to us, ideally targeting our [ICP](/handbook/who-we-build-for), but broadly engineers and founders.

- Even within this group, there are some categories to avoid like job interview prep, career growth, low-level engineering, and heavy computer science focus. Try to find web or mobile developers, product engineers, startup founders, and indiehackers instead.

- The channel is growing, gaining in subscriber growth rate and views. Use [Social Blade](https://socialblade.com/) to see this.

- They should have engaged audiences. Strong Twitter or Discord communities are good signs as well as view to like/comment ratios:
  - **Weak**: 0.001 comment/view, 0.02 like/view
  - **Average**: 0.001–0.002 comment/view, 0.02–0.03 like/view
  - **Good**: 0.002–0.005 comment/view, 0.03–0.05 like/view
  - **Excellent:** 0.005+ comment/view, 0.05+ like/view

- Above 5k views per video. Anything below this is just not worth your time. This number will likely grow over time. Larger influencers, although they charge a lot more, are often more efficient, so we don't have an upper limit for size.

Different formats have different goals. Long-form YouTube continues to be our strongest acquisition channel, while podcasts, Instagram, TikTok, and other short-form content are opportunities we're actively exploring. Don't expect every format to optimize for direct sign ups — some are better at awareness, others at education or reaching entirely new audiences.

## Working with agencies

We increasingly work with agencies to help scale sourcing and relationship management.

[Fundlevel](https://www.fundlevel.co/), a Canadian agency, is a long-term partner we really enjoy working with.

Agencies are particularly useful when:

- expanding into new regions
- testing new creator categories
- increasing the number of collaborations without increasing internal workload

They're less useful for strategic partnerships or flagship creators where a direct relationship with PostHog is more valuable.

Treat agencies as an extension of the team, not a replacement for it.

## Negotiating with influencers

- Make sure you know what type of slot it is: pre-roll, mid-roll, end-roll, integration.

- Ask for examples of other ad slots they've run to judge the quality of ad read.

- For creators we've never worked with, the initial quote is often negotiable. Understand the value of the placement before agreeing on a price, and use <PrivateLink url="https://docs.google.com/spreadsheets/d/1nqF-oNqSaWw-LjLBHySlf8hbyQs79nEHFwv_-bR-F7s/edit?usp=sharing">our pricing model</PrivateLink> as a reference rather than treating the first quote as fixed. Feel free to update the model if you think it's not accurate.

- Make sure the link is in the top 3 lines of the description.

- We pay invoices net 30 (30 days after they've sent them to us).

## Working with PMMs

Influencer marketing works best when involved early: i.e. if we have a big launch and we know exact dates, let #influence-wrangling channel in Slack know a month before (or just as soon as possible), this gives us time to prep the creators, make sure we fit in their schedules and have time to make a compelling story, naturally integrating new products into creators' content.

For launches, we generally need:

- product context
- messaging
- demo access
- visuals
- launch timelines
- someone available to answer technical questions

## What should the placement actually look like?

- Make a judgement call on whether to use a unique link set up with Dub (like `https://go.posthog.com/sponsored`) to point to specific UTMs unique to each video or an influencer-specific link using `posthog.com` redirects (like `posthog.com/theo`) to the same UTMs across videos. These links should have `utm_source` and `utm_campaign` set to the influencer and campaign name.

- Make sure they tell their audience to "mention them on sign up" or "say that they heard about PostHog from them" so we can track the attribution.

- We generally let influencers decide what the ad read is like so it best fits their audience. We can provide guidance on what to talk about though — our [brand foundations](/handbook/brand/foundations) go deeper, but the key points to get right:
  - The frame everything should ladder up to: **PostHog makes _your_ product self-driving** — it puts all your product's data in one place, turns it into signals, and uses agents to find problems and opportunities and ship the fix. Keep the creator's product (or their viewers' products) as the thing that becomes self-driving; avoid "PostHog is self-driving software," which centers us instead of the outcome.
  - PostHog is the platform for [self-driving products](/self-driving) — a suite of tools that gives developers (and their AI agents) everything they need to build successful products. Don't call it "an analytics platform" (we've grown well beyond that) or pitch it as a single product.
  - Be specific rather than benefits-y. Developers can smell marketing fluff instantly, so "it does X" beats "it empowers you to unlock X."
  - The suite spans product analytics, web analytics, session replay, error tracking, experimentation, feature flags, AI observability, and surveys. There's also a CDP for sending data to 50+ destinations and a data warehouse that connects to external sources like your database, Stripe, or Hubspot so you can query them with SQL (or no-code insights) alongside your product data.
  - The goal of these tools: help founders and engineers debug their product, understand their customers, and ship a more successful product faster.
  - There's a generous free tier for every tool — you can sign up and start using all of them for free right away, and 90% of users stay on PostHog's free tier.
  - Setup is simple: install an SDK or paste a snippet into your site header, and we autocapture data like pageviews, clicks, and sessions. There are SDKs for all the popular backend languages too — Python, Node, Go, and so on.

- There are a handful of video assets for them to [use here](https://drive.google.com/drive/folders/1RFTEb4E1D71wYuQm9smZ9eK79glmHp1m?usp=sharing). Feel free to add more, but also suggest the website and in-app as sources.

- Ideally, a placement should relate to ongoing marketing efforts, like a new product launch, product push, or pricing change.

## Measuring impact

Some metrics we look at for individual videos include:

- CPM (cost per thousand views)
- Unique sessions from the custom link (or clicks if you're using a Dub link)
- Sign ups, either from converting from sessions or <PrivateLink url="https://us.posthog.com/project/2/insights/jdJgByZC">who mentioned the influencer on sign up</PrivateLink>

We track these on our <PrivateLink url="https://docs.google.com/spreadsheets/d/1MmNUd9fFlZM3-SDk-HQ9cOmBY8XtqT7F97JFOAehxh8/edit?gid=702711155#gid=702711155">marketing budget and spending spreadsheet</PrivateLink>. For a per-influencer and per-video breakdown, <PrivateLink url="/hogwatch/performance">HogWatch</PrivateLink> joins that sheet with live sign up attribution and YouTube view counts. We also have an <PrivateLink url="https://us.posthog.com/project/2/dashboard/493906">influencer marketing performance dashboard in PostHog</PrivateLink> that can help you get an overall view of different influencers' performance.

Remember that not every collaboration should be judged purely on attributed sign ups. Some partnerships are valuable because they:

- introduce us to new audiences
- build long-term brand affinity
- lead to future collaborations
- generate clips that can be reused across channels
- strengthen relationships with creators or platforms
- are just really cool and worth doing for taste/vibes

Consider both direct performance and longer-term strategic value when reviewing partnerships.

## Relationship management

We treat creators as people, not inventory. The best partnerships are built over months or years, not a single sponsorship.

- Reply quickly.
- Give thoughtful feedback.
- Celebrate good work.
- Stay in touch between campaigns.
- Meet creators in person when it makes sense.

The goal is for creators to think of PostHog first when they have a new idea and to bring weird ideas to us.

## Events and conferences

Conferences are rarely valuable because of the talks, but they are really valuable because of the people that attend those. In the 2026 we've been to Stripe Sessions and VidCon - both of them provided us the opportunity to network with the right people and expand our creator roster.

The biggest benefits usually come from:

- meeting creators
- meeting agencies
- meeting platform teams
- strengthening existing relationships
- making introductions that continue after the event

If possible, prioritize speaking, hosting dinners, or organizing meetups over simply attending conferences.

## Current experiments

We're constantly experimenting with new distribution channels. Current areas we're exploring include:

- podcasts
- Instagram & TikTok creators
- startup founders as creators
- agency partnerships
- creator dinners and other IRL events

Not every experiment will work, and that's fine. Document the results and share what you've learned so the next person doesn't have to repeat the same experiment.
