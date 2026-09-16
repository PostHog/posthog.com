---
title: Paid ads
sidebar: Handbook
showTitle: true
---

Paid ads sit with the <SmallTeam slug="demand-gen" />. PostHog marketing is incredibly brand- and content-driven. Our role is to reach and educate potential users of PostHog that those teams can't. We don't have one overarching goal, but because we don't use pixels, we aim to split our budget roughly 50/50 between conversion and awareness.

> Ads are expensive, so we typically only run paid ads for individual tools once they are generally available, have pricing, and have a feature set broadly on par with the main competitors. Earlier than that is usually a waste of money.

This page is for paid ads for PostHog in general. If you're looking for paid ads for our newsletter, see the [newsletter ads guide](/handbook/content/newsletter-ads).

## Channels

We currently run ads on:

- Google Search – _conversion_ (non-free email signups and credit cards added, checked against healthy org quality)
- Reddit – _awareness_ (impressions)
- Meta/Instagram – _awareness_ (impressions, experimental)
- LinkedIn – _awareness_ (impressions)
- X – _awareness_ (impressions)
- YouTube – _awareness_ (video views + completion rate)
- Connected TV – _awareness_ (video views + completion rate, experimental)

We have previously tried and no longer use ChatGPT ads, Bing, Product Hunt, Carbon Ads, and Google Display, as they did not help us meet our goals. Where a channel allows, we usually focus campaigns on users in the US, Canada, UK, Germany, and France, and prefer targeting desktop users when the goal is conversion.

> Unlike most demand gen teams, we don't run campaigns to generate demo bookings for sales. We make it incredibly easy for customers to self serve without ever needing to talk to sales, so trying to funnel people towards a demo is a waste of time. 

### How we measure campaigns

For awareness campaigns, we use impressions and Engaged Visits. Impressions tell us how many people see an ad. Engaged Visits help us judge whether the right people land on PostHog and learn something. An Engaged Visit has at least two pageviews, an autocaptured interaction, or 10 seconds on the site. See the <PrivateLink url="https://us.posthog.com/project/2/dashboard/2104209">paid marketing dashboard</PrivateLink>.

For conversion campaigns, non-freemail signups and credit cards added are leading indicators. Healthy orgs are the end goal. We consider an org healthy when it is verified, sends billable data, adds a second teammate, and activates billing within 14 days. See <PrivateLink url="https://us.posthog.com/project/2/insights/EyekVfx2">Google Ads non-freemail signups by product for the last 12 weeks</PrivateLink>.

### Partners

We work with [Hey](https://www.heydigital.co/) to manage these channels – they set up the campaigns and ensure that spend is paced properly. We have a shared internal Slack channel for near-constant communication, and <TeamMember name="Brian Young" /> has one check-in call with them each month.

In addition to Hey, we also have monthly calls with partner teams at Google, Reddit, and LinkedIn. They provide feedback on performance and competitive analysis for individual products as requested.

### Tracking conversion & conversion optimization

Using third-party trackers or pixels like Google Tag Manager is against our brand and values, so we only use the [PostHog CDP](/cdp) to send anonymized click IDs and hashed signup email addresses back to each ad platform.

We take privacy seriously and follow these principles:

* If it creates third-party cookies for us, don't do it
* All testing must align with [our privacy policy](/privacy)
* Always verify what data is collected and how it is used
* Don't share raw user PII contained within PostHog, obviously (including IP addresses)
* Limit data collection only to what is _absolutely_ required
* Always be transparent with users about what we're collecting, if any
* All click IDs are considered safe to send back to each ad platform
* Unless someone has opted out through [our privacy policy](/privacy), signup and newsletter email addresses are hashed and considered safe to send back to each ad platform

## Creative

### Copy

You can find the master sheet of search ad copy <PrivateLink url="https://docs.google.com/spreadsheets/d/1uO8dxflZfHbBLN1OlHdNZrl7WuiklhYO3DQ0U4naGxM">here</PrivateLink>.

We change up campaigns frequently, but generally run campaigns for brand, self-driving, individual tools, and competitors.

We turn these on and off depending on performance and spend, and review copy every 4 weeks. We try both fun and straightforward copy. Even if the fun stuff doesn't convert super well, we keep it if it's doing ok as it helps with our brand - we know people screenshot and share it sometimes. 

We aim for as much product coverage as possible unless there are compelling reasons to not do them (e.g. it's just very expensive). 

## Graphics & video

For channels like LinkedIn and Reddit, we request artwork from <SmallTeam slug="graphics" /> using [this process](https://posthog.com/handbook/brand/art-requests). For video, there isn't a super structured process yet, so the best way to get started is to post a message in `#team-youtube`. 

We want to get better at shipping a lot more variants to test what works on these kinds of platforms. <TeamMember name="Jonah Svihus" /> is exploring tools that could help us do this while staying on brand. 

### Landing pages

We spin up landing pages from time to time. Simplified versions of our docs have historically outperformed product pages, but the product pages have now adopted the same docs format. We now use landing pages mainly for tests and pass what we learn to the <SmallTeam slug="website" />.

## Roles

- Brian owns budget, channel strategy, analytics, and reporting, inc. ICP signups
- Jonah writes copy and creative across all platforms, inc. scripts for video ads
- Charles acts as copy editor

### Budget

<TeamMember name="Brian Young" /> maintains the media plan, which can be found <PrivateLink url="https://docs.google.com/spreadsheets/d/1ArZG48QUZ81y1RMCJ0PrA50DnAqoIyvo2cWmc4l-cYU">here</PrivateLink>. We broadly aim to split our budget 50-50 between awareness and conversion. 

### Growth review

<TeamMember name="Brian Young" /> runs a monthly growth review with Charles where we look at the main performance metrics for the month prior. Here are the <PrivateLink url="https://docs.google.com/spreadsheets/d/1ne0JMRKb_okluvrDiNV1H6h7EybRjMF2pg8JjrX6ZFU/edit?usp=sharing">main sheet</PrivateLink> and <PrivateLink url="https://docs.google.com/document/d/1H20mB0gWrISKZMOBlJ12avlyNC5yGRD3e97BVuABtys">commentary</PrivateLink>. For completeness, this also covers the organic funnel, though the main focus is still paid as well as influencer spend.
