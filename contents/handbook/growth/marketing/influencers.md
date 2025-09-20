---
title: Influencers
sidebar: Handbook
showTitle: true
---

We sponsor influencers to drive awareness and sign ups to PostHog.

Some of the influencers we sponsor include:

- [Theo](https://www.youtube.com/watch?v=6xXSsu0YXWo). He is a great partner for us. His audience is ideal, he is doing YouTube right, and he's a PostHog user.

- [Fireship](https://www.youtube.com/@Fireship)

- [Chris Raroque](https://www.youtube.com/@raroque)

## Sourcing and evaluating influencers

- You can find new influencers by looking at the creators engineers share or mention internally, searching for ones who have made relevant videos, looking at the recommendations of ones we’ve already sponsored, inbound, and [Passionfroot](https://www.passionfroot.me/).

- Their audience needs to be relevant to us, ideally targeting our [ICP](/handbook/who-we-are-building-for), but broadly engineers and founders.

- Even within this group, there are some categories to avoid like job interview prep, career growth, low-level engineering, and heavy computer science focus. Try to find web or mobile developers, product engineers, startup founders, and indiehackers instead.

- The channel is growing, gaining in subscriber growth rate and views. Use [Social Blade](https://socialblade.com/) to see this.

- They should have engaged audiences. Strong Twitter or Discord communities are good signs as well as view to like/comment ratios:
  - **Weak**: 0.001 comment/view, 0.02 like/view
  - **Average**: 0.001–0.002 comment/view, 0.02–0.03 like/view
  - **Good**: 0.002–0.005 comment/view, 0.03–0.05 like/view
  - **Excellent:** 0.005+ comment/view, 0.05+ like/view

- Above 5k views per video. Anything below this is just not worth your time. This number will likely grow over time. Larger influencers, although they charge a lot more, are often more efficient, so we don't have an upper limit for size. 

- Both short video creators and podcasters **haven’t** worked well for us in terms of conversion and signups. We’re open to trying this again in the future though.

## Negotiating with influencers

- Make sure you know what type of slot it is: pre-roll, mid-roll, end-roll, integration.

- Ask for examples of other ad slots they’ve run to judge the quality of ad read.

- For influencers we’ve never worked with, you should negotiate quite aggressively. The number they give is usually pulled out of a hat and is often 2-3x higher than it should be.

- Use <PrivateLink url="https://docs.google.com/spreadsheets/d/1nqF-oNqSaWw-LjLBHySlf8hbyQs79nEHFwv_-bR-F7s/edit?usp=sharing">our model for how much a placement should cost</PrivateLink> to get to a better number and work towards that. Feel free to make changes to the model if you think it's not accurate.

- Make sure the link is in the top 3 lines of the description.

- We pay invoices net 30 (30 days after they’ve sent them to us).

## What should the placement actually look like?

- Make a judgement call on whether to use a unique link set up with Dub (like `https://go.posthog.com/sponsored`) to point to specific UTMs unique to each video or an influencer-specific link using `posthog.com` redirects (like `posthog.com/theo`) to the same UTMs across videos. These links should have `utm_source` and `utm_campaign` set to the influencer and campaign name.

- Make sure they tell their audience to "mention them on sign up" or "say that they heard about PostHog from them" so we can track the attribution.

- We generally let influencers decide on what the ad read is like so that it best fits their audience. We can provide guidance on what to talk about though. These points are helpful to share:
  - PostHog is an all-in-one suite of product and data tools for developers.
  - This means product analytics, web analytics, session replay, A/B testing, feature flags, error tracking, LLM analytics, surveys, and more.
  - We also have a CDP for sending data to 50+ destinations and a data warehouse product that lets you connect to external sources like your database, Stripe or Hubspot to query with SQL (or no code insights) alongside your product data.
  - The goal of these tools is to help founders and engineers understand their customers,  how they are using products, the success of their features, and the journeys of their visitors.
  - We have a generous free tier for every one of our products. You can sign up and get started with all of them for free right away. 90% of users use PostHog for free.
  - Setup is as simple as installing one of our SDKs or pasting a snippet into your site header, we then autocapture data like pageviews, button clicks, and sessions. We also have SDKs for all the popular backend languages like Python, Node, Go, etc.

- There are a handful of video assets for them to [use here](https://drive.google.com/drive/folders/1RFTEb4E1D71wYuQm9smZ9eK79glmHp1m?usp=sharing). Feel free to add more, but also suggest the website and in-app as sources.

- Ideally, a placement should relate to ongoing marketing efforts, like a new product launch, product push, or pricing change.

## Measuring impact

Some metrics we look at for individual videos include:

- CPM (cost per thousand views)
- Unique sessions from the custom link (or clicks if you're using a Dub link)
- Sign ups, either from converting from sessions or <PrivateLink url="https://us.posthog.com/project/2/insights/jdJgByZC">who mentioned the influencer on sign up</PrivateLink>

We track these on our <PrivateLink url="https://docs.google.com/spreadsheets/d/1MmNUd9fFlZM3-SDk-HQ9cOmBY8XtqT7F97JFOAehxh8/edit?gid=702711155#gid=702711155">marketing budget and spending spreadsheet</PrivateLink>. We also have an <PrivateLink url="https://us.posthog.com/project/2/dashboard/493906">influencer marketing performance dashboard in PostHog</PrivateLink> that can help you get an overall view of different influencer's performance.
