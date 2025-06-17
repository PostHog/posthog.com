---
title: Newsletter Ads
sidebar: Handbook
showTitle: true
---

We promote our newsletter across a variety of different channels. This page covers the paid options.

## Budget

Budget plans can be viewed in this <PrivateLink url="https://docs.google.com/spreadsheets/d/1MmNUd9fFlZM3-SDk-HQ9cOmBY8XtqT7F97JFOAehxh8/edit?gid=860081018#gid=860081018">spreedsheet</PrivateLink>.

## Uploading emails to Substack

Annoyingly, Substack doesn't have an API, which means that we manually need to upload emails we capture via our website, InstantForm ads, and most other paid marketing channels. This means that we have to manually upload these emails to Substack.  <TeamMember name="Andy Vandervell" photo /> does this once a week.

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

Our ad creative can be accessed in <PrivateLink url="https://www.figma.com/design/CLj2U34xpNiHuZRo73GJPm/posthog.com?node-id=17915-50&t=9Wn8U6aWkxf2ZVry-1">Figma</PrivateLink>

### Instant Form ads

Meta has something called InstantForm ads, which enable users to sign up to our newsletter directly in the FB+IG apps without needing to open our website. Facebook then sends us these emails via <PrivateLink url="https://zapier.com/editor/304264592/published">Zapier</PrivateLink>.

## Paid placements in other newsletters

Our preference is to avoid using paid "placements" as these are hard to track conversions with Substack, which means we rely on cost per click. Instead, we prefer to use a pay-per-sub model, which perform better and are easier to track

This <PrivateLink url="https://github.com/issues/assigned?issue=PostHog%7Ccompany-internal%7C2017">issue</PrivateLink> outlines our current partnerships with other newsletter as of June 2025.