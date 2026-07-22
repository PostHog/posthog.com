---
title: Paid ads
sidebar: Handbook
showTitle: true
---

Paid ads sit with the <SmallTeam slug="demand-gen" />. As PostHog marketing is incredibly brand- and content-driven, our role is to reach potential users of PostHog that those teams can't. We don't have one specific, over-arching goal - each channel has its own goal.

> Ads are expensive, so it is typically only worth running paid ads for individual products once they are generally available, with pricing, and where we feel the feature set is broadly on parity with the main competitors. Earlier than that is usually a waste of money.

This page is for paid ads for PostHog in general. If you're looking for paid ads for our newsletter, see the [newsletter ads guide](/handbook/content/newsletter-ads).

## Channels

We currently run ads on:

- Google Search - _conversion_ (signup + credit card added)
- Bing (for DuckDuckGo) - _conversion_ (signup+ credit card added)
- ChatGPT ads - _conversion_ (signup)
- LinkedIn - _awareness_ (impressions)
- Reddit - _awareness_ (impressions)
- YouTube - _awareness_ (video views + completion rate)
- Connected TV - _awareness_ (video views + completion rate)

We have previously tried and no longer use X, Product Hunt, Carbon Ads, and Google Display, as they did not help us meet our goals. Where a channel allows, we usually focus campaigns on users in the US, Canada, UK, Germany and France, and prefer targeting desktop users when the goal is conversion. 

> Unlike most demand gen teams, we don't run campaigns to generate demo bookings for sales. We make it incredibly easy for customers to self serve without ever needing to talk to sales, so trying to funnel people towards a demo is a waste of time. 

### Partners

We work with [Hey](https://www.heydigital.co/) to manage these channels - they set up the campaigns and ensure that spend is paced properly. We have a shared internal Slack channel, and <TeamMember name="Brian Young" /> has 2 check-in calls with them each month.

In addition to Hey, we also have a monthly call with Google Partners who provide feedback on performance and competitive analysis on a per product basis as requested.

### Tracking conversion & conversion optimization

Using 3rd party trackers or pixels like Google Tag Manager is against our brand and values, so we use a combination of PostHog, BigQuery, Clay, Clearbit, & Census.

PostHog sends back anonymized (click ID) conversion data to each ad platform with conversion values based on ICP score to improve lead quality via target ROAS bidding. Our goal is to use our ads program as a powerhouse for the sales team and a key tool for onboarding users that will improve both MRR and CAC:LTV ratio.

In order to keep our privacy policy front of mind we've built a bespoke conversion tracking system that uses the following flow:

PostHog > Clearbit > BigQuery > Census > Ad Platforms. 

You can learn more about this flow here <PrivateLink url="https://www.figma.com/board/HKy51yIfjNlDFHhyrOHHzo/PostHog-Ads-Funnel?node-id=10-1574&t=uN5chTzlw2pFXbpo-4">here</PrivateLink>. 

We take privacy seriously, and follow these principles:

* If it creates third-party cookies for us, don't do it
* All testing must align with [our privacy policy](/privacy)
* Always verify what data is collected and how it is used
* Don't collect or share any user PII contained within PostHog, obviously (Including IP addresses)
* Limit data collection only to what is _absolutely_ required
* Always be transparent with users about what we're collecting, if any
* All ClickIDs are considered safe to send back to each ad platform

## Creative

### Copy

You can find the master sheet of search ad copy <PrivateLink url="https://docs.google.com/spreadsheets/d/1uO8dxflZfHbBLN1OlHdNZrl7WuiklhYO3DQ0U4naGxM">here</PrivateLink>.

We change up campaigns frequently, but generally run campaigns for brand, individual products, and competitors.

We turn these on and off depending on performance and spend, and review copy every 4 weeks. We try both fun and straightforward copy. Even if the fun stuff doesn't convert super well, we keep it if it's doing ok as it helps with our brand - we know people screenshot and share it sometimes. 

We aim for as much product coverage as possible unless there are compelling reasons to not do them (e.g. it's just very expensive). 

## Graphics & video

For channels like LinkedIn and Reddit, we request artwork from <SmallTeam slug="graphics" /> using [this process](https://posthog.com/handbook/brand/art-requests). For video, there isn't a super structured process yet, so the best way to get started is to post a message in `#team-youtube`. 

We want to get better at shipping a lot more variants to test what works on these kinds of platforms. <TeamMember name="Jonah Svihus" /> is exploring tools that could help us do this while staying on brand. 

### Landing pages

We use a simplified version of our docs getting started pages as a template. We currently have landing pages for:

- [Session replay](https://posthog.com/r/session-replay)
- [Error tracking](https://posthog.com/r/error-tracking)
- [Product analytics](https://posthog.com/r/product-analytics)
- [PostHog MCP](https://posthog.com/r/posthog-mcp)

For products that we don't have a landing page for, we send them to the home page. 

## Roles

- Brian owns budget, channel strategy, analytics, and reporting, inc. ICP signups
- Jonah writes copy and creative across all platforms, inc. scripts for video ads
- Charles acts as copy editor

### Budget

<TeamMember name="Brian Young" /> maintains the media plan, which can be found <PrivateLink url="https://docs.google.com/spreadsheets/d/1ArZG48QUZ81y1RMCJ0PrA50DnAqoIyvo2cWmc4l-cYU">here</PrivateLink>. We broadly aim to split our budget 50-50 between awareness and conversion. 

### Growth review

<TeamMember name="Brian Young" /> runs a monthly growth review with Charles where we look at the main performance metrics for the month prior. Here are the <PrivateLink url="https://docs.google.com/spreadsheets/d/1JxE2t0C6P9s_5Ee_TTsbNrayNAgwx1kjA9jgqdp3dDw">main sheet</PrivateLink> and <PrivateLink url="https://docs.google.com/document/d/1H20mB0gWrISKZMOBlJ12avlyNC5yGRD3e97BVuABtys">commentary</PrivateLink>. For completeness, this also covers the organic funnel, though the main focus is still paid as well as influencer spend.
