---
title: Paid ads
sidebar: Handbook
showTitle: true
---

The paid ads team exists to do two things only:

- Convert high intent people searching for PostHog or products we offer into signups
- Generate leads for the new business sales team

We don't do paid ads for general awareness - our website, content, and word of mouth are much better (and cheaper) ways to do this. 

> For now paid ads sits within the [new business sales team](/teams/sales-cs), but will become its own thing once we have more people. This page is for paid ads for PostHog in general. If you're looking for paid ads for our newsletter, [click here](handbook/content/newsletter-ads).

## Channels

We currently run ads on:
- Google Search - _conversion_
- Bing (for DuckDuckGo) - _conversion_
- LinkedIn - _leads_
- Reddit - _leads_
- YouTube - _leads_

We have previously tried and no longer use X, Product Hunt, Carbon Ads, and Google Display, as they did not drive high quality user signups or leads. We usually focus campaigns on users in the US, Canada, UK, Germany and France, as these tend to lead to the most high quality signups and leads.

We work with [Hey](https://www.heydigital.co/) to manage these channels - they set up the campaigns and ensure that spend is paced properly. We have a shared internal Slack channel, and <TeamMember name="Brian Young" /> has 2 check-in calls with them each month.

## Mission 1 - converting people to signup

We do this through search ads on Google and Bing, and you can find the master sheet of ad copy <PrivateLink url="https://docs.google.com/spreadsheets/d/1uO8dxflZfHbBLN1OlHdNZrl7WuiklhYO3DQ0U4naGxM/edit?gid=0#gid=0">here</PrivateLink>.

We change up campaigns frequently, but generally run campaigns for:

- Brand
- Individual products
- Competitors

We generally turn these on and off depending on performance and spend, and review copy every 4 weeks. The flow is <TeamMember name="Brian Young" /> writes copy, <TeamMember name="Brian Cook" /> reviews. We try both fun and straightforward copy. Even if the fun stuff doesn't convert super well, we keep it if it's doing ok as it helps with our brand - we know people screenshot and share it sometimes. 

We aim for as much product coverage as possible unless there are compelling reasons to not do them (e.g. it's just very expensive). We prioritize ads for those products closest to our [ICP](/handbook/who-we-are-building-for). 

> It is typically only worth running paid ads for individual products once they are generally available, with pricing, and where we feel the feature set is broadly on parity with the main competitors. 

### Tracking conversion

Using 3rd party trackers or pixels like Google Tag Manager is against our brand and values, so we use a combination of PostHog, BigQuery and Census. 

We take privacy seriously, and follow these principles:

* If it creates third-party cookies for us, don't do it
* All testing must align with [our privacy policy](/privacy)
* Always verify what data is collected and how it is used
* Don't collect any PII, obviously
* Limit data collection only to what is _absolutely_ required
* Always be transparent with users about what we're collecting, if any

## Mission 2 - generating new business leads

We have three ways we prospect for new leads:
- ABM on LinkedIn
- Prospecting on LinkedIn
- Prospecting on Reddit

We use a variety of creative campaigns here which we don't list in the Handbook, as they keep changing over time. Some principles though:
- We are open to using gated content if it is fun and/or weird and/or actually useful
- Gated content must be freely available elsewhere

The full flow of how this works can be found <PrivateLink url="https://www.figma.com/board/1WkL0kLqG0OzYDYa2EWEdU/Ads--Copy--Landing-Page-Synergy?node-id=1-40&t=BVbxo8tRm3Xh8Cpl-0#1452470455">here</PrivateLink>. 

### Landing pages

We use custom presentations that match the style of our website as our landing pages. We have an internal guide on how to create these [here](https://github.com/PostHog/posthog.com/blob/915fe9ad366dcec8516bc0285af8a63d0e9c4b48/contents/handbook/engineering/posthog-com/presentations.mdx).

If you add `?contact=true` to the end of the page URL, that will add a 'contact us' popup. 

## How we work

### Brand guidelines and creative

By default, all paid ads visual creative should be based on stuff that already exists in some form on one of:

- [Our website](https://posthog.com)
- [Product for Engineers](https://newsletter.posthog.com/)
- [Hoggies](https://www.figma.com/design/I0VKEEjbkKUDSVzFus2Lpu/Hoggies?node-id=0-1) library
- [Merch](https://posthog.com/merch)
- Events
- [Video](https://www.youtube.com/@PostHog)
- Billboards

We take anything we’ve ever created there, and then repurpose/reformat/reconfigure it as an ad. This minimizes approvals - because these assets have previous been through a round of approval with design, we can use them knowing we don't need to get approval again. The only check required is then between <TeamMember name="Charles Cook" /> and <TeamMember name="Brian Young" /> on the concept and/or copy. This means we are doing less creative work, but the upside is that we can move faster (and have a lot of Lego bricks to play with). <TeamMember name="Brian Young" /> works with <TeamMember name="Daniel Hawkins" /> on this.

For the copy itself, we also use the search ads copy where we can as a starting point, so we're not repeating work. 

If we have a particular campaign in mind that _really does_ require a new, one-off asset, then we request it from Lottie in [the usual way](/handbook/brand/art-requests).

### Budget

<TeamMember name="Brian Young" /> maintains the media plan, which can be found <PrivateLink url="https://docs.google.com/spreadsheets/d/1ArZG48QUZ81y1RMCJ0PrA50DnAqoIyvo2cWmc4l-cYU/edit?gid=218274017#gid=218274017">here</PrivateLink>.

### Growth review

<TeamMember name="Brian Young" /> runs a monthly growth review with Charles where we look at the main performance metrics for the month prior. Here are the <PrivateLink url="https://docs.google.com/spreadsheets/d/1JxE2t0C6P9s_5Ee_TTsbNrayNAgwx1kjA9jgqdp3dDw/edit?gid=0#gid=0">main sheet</PrivateLink> and <PrivateLink url="https://docs.google.com/document/d/1H20mB0gWrISKZMOBlJ12avlyNC5yGRD3e97BVuABtys/edit?tab=t.m8x9ro13rh7a#heading=h.6inc6rvynqga">commentary</PrivateLink>. For completeness, this also covers the organic funnel, though the main focus is still paid. 
