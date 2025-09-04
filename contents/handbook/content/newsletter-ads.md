---
title: Newsletter ads
sidebar: Handbook
showTitle: true
---

We promote our newsletter across a variety of different channels. This page covers the paid options.

## Budget

Budget plans can be viewed in this <PrivateLink url="https://docs.google.com/spreadsheets/d/1MmNUd9fFlZM3-SDk-HQ9cOmBY8XtqT7F97JFOAehxh8/edit?gid=860081018#gid=860081018">spreadsheet</PrivateLink>.

## Uploading emails to Substack

Annoyingly, Substack doesn't have an API, which means that we manually need to upload emails we capture via our website, InstantForm ads, and most other paid marketing channels. This means that we have to manually upload these emails to Substack. <TeamMember name="Andy Vandervell" photo /> does this once a week.

The emails are to PostHog via an event called `newsletter_subscribed`, which are sent to the <PrivateLink url="https://posthog.slack.com/archives/C06V4CW0ZC3">#newsletter-sub-alerts</PrivateLink> in Slack.

If you wish to avoid doing this, an alternative is to send users directly to our Substack so they can sign up directly there. The drawback is that we're unable to send conversion events to 3rd parties (e.g. Meta, Reddit), so their algorithms won't know if their targeting is working (and we cannot send them the emails of people who signed up, because privacy).

You can still track how campaigns on Substack by using this loophole <TeamMember name="Ian Vanagas" photo /> found:

1. Sign up for Substack with another email (lior+refer@substack.com or something, can create multiple).
2. Subscribe to Product for Engineers.
3. Go to https://newsletter.posthog.com/leaderboard and get your ref code/link. You can add the `?r=1tb4kk` bit to any newsletter link and it will track who signs up using it.
4. See results <PrivateLink url="https://newsletter.posthog.com/publish/stats/reader-sharing">here</PrivateLink>.

## Meta Ads

In Q2+Q3 2025, we're testing Meta ads as a way to increase newsletter subscribers. You can view our ads in [Ads Manager](https://adsmanager.facebook.com/adsmanager/manage/campaigns?nav_entry_point=lep_237&nav_source=unknown&global_scope_id=643559792019437&business_id=643559792019437&act=1028028472241792&redirect_session_id=0302e4c2-f5ff-4150-92af-95821305a344&ads_manager_read_regions=true#).

For access to the Ads Manager, please contact <TeamMember name="Lior Neu-ner" /> or <TeamMember name="Brian Young" />.

We do not have Meta's pixel installed, as we do not allow any third-party cookies on our site. For tracking conversions, we use Meta's Conversions API via the [PostHog destination](https://us.posthog.com/project/2/functions/0196edd0-6d74-0000-636b-5f69c8e7e9f5). 

> **🚨 Important**: We must be extremely careful not to include any personally identifiable information. We should only include the `fbclid` parameter and the `client_user_agent`. Avoid sending personal identifiable information to Meta such as name or email.

Our ad creative can be accessed in <PrivateLink url="https://www.figma.com/design/CLj2U34xpNiHuZRo73GJPm/posthog.com?node-id=17915-50&t=9Wn8U6aWkxf2ZVry-1">Figma</PrivateLink>.

This [issue](https://github.com/issues/assigned?issue=PostHog%7Cposthog.com%7C12092) has some information on learnings from previous ad campaigns

### Instant Form ads

Meta has something called InstantForm ads, which enable users to sign up to our newsletter directly in the FB+IG apps without needing to open our website. Facebook then sends us these emails via <PrivateLink url="https://zapier.com/editor/304264592/published">Zapier</PrivateLink>.

## Paid placements in other newsletters

> We're not running paid placements anymore due to the high cost per conversion. More details in <PrivateLink url="https://posthog.slack.com/archives/C01FHN8DNN6/p1756222160449869">Slack</PrivateLink>

As mentioned above, Substack's attribution sucks. Historically, we instead created a custom link for each campaign using Dub.co and calculate cost per click to measure success. However, we should now be able to track signups using leaderboard + referral code workaround mentioned above.

We generally prefer to use a pay-per-sub model, which perform better and are easier to track. This <PrivateLink url="https://github.com/issues/assigned?issue=PostHog%7Ccompany-internal%7C2017">issue</PrivateLink> outlines our current partnerships with other newsletter as of June 2025.

We look for newsletters that focus on software development and engineering. We don't care about list size or reach as much as we care about clickthrough rate (you can ask for their average CTR). Some we like working with and sponsoring include:

- [Pointer](https://www.pointer.io/)
- [Bytes](https://bytes.dev/), [React newsletter](https://reactnewsletter.com/) (same publisher for both)
- [Quastor](https://www.quastor.org/)
- [Tech Lead Digest](https://techleaddigest.net/), [Programming Digest](https://programmingdigest.net/) (same publisher for both)
- [Software Lead Weekly](https://softwareleadweekly.com/)
- [Architecture Notes](https://architecturenotes.co/)
- [React Status](https://react.statuscode.com/), [Frontend Focus](https://frontendfoc.us/), [Node Weekly](https://nodeweekly.com/) (same publisher)
- [The .NET Weekly](https://www.milanjovanovic.tech/)
- [hackernewsletter](https://hackernewsletter.com/)
- [Unzip](https://unzip.dev/)
- [Internal Tech Emails](https://www.techemails.com/)
- [This Week in React](https://thisweekinreact.com/)

Smaller newsletters that we also have supported:

- [Level Up](https://levelup.patkua.com/)
- [Console](https://console.dev/)
- [FOSS Weekly](https://fossweekly.beehiiv.com/) (same publisher as Console) 
- [Fullstack Bulletin](https://fullstackbulletin.com/)
- [freek.dev](https://freek.dev/)

### Newsletter sponsorship content

Titles that work well include:

- Product for Engineers: A newsletter helping flex your product muscles
- Product for Engineers: The first newsletter dedicated to product engineers

The main copy is some variation of:

> Product for Engineers is PostHog's newsletter dedicated to helping engineers improve their product skills. Learn how to talk to users, build new features users love, and find product market fit. Subscribe for free to get curated advice on building great products, lessons (and mistakes) from building PostHog, and deep dives into the strategies of top startups.

We have also found that linking to an article directly converts better than just a generic "subscribe to our newsletter" link.

If you need images, there is a <PrivateLink url="https://www.figma.com/design/HwUmk7WqccLkGgNNGAs4zN/Art-board?node-id=10059-57205">collection of many sizes of them in Figma</PrivateLink>.


## LinkedIn and Reddit Ads

We tried to run LinkedIn and Reddit ads for the newsletter but both were unsuccessful. Here's what we found:

- LinkedIn is too expensive. Cost per link clicks were north of $5, about 10x-20x more expesnvie than meta ads
- Reddit ads had CPCs similar to meta ads, but converted at a significantly lower rate (about 20x worse), meaning that cost per sign up was between $50-$90.