---
title: Paid ads
sidebar: Handbook
showTitle: true
---

As we believe in [product-led growth](/blog/product-led-growth), paid ads are _not_ at the heart of our marketing strategy in the long term. Instead, we see them as an important way to kick start and then amplify the work we are doing in other areas of marketing and product. 

We work with an agency, [Hey Digital](https://www.heydigital.co/) to manage paid ads. Specifically, they help us with:
- Paid ad tactics and monthly media plan
- Creating paid ad assets for each channel
- Manage paid channels on our behalf 

We communicate with them via a shared internal Slack channel, and have 2 check-in calls with them each month. We have a very light approvals process for creative:

- Hey Digital team share asset(s) for feedback in Slack
- PostHog team approve - usually Charles or Andy, but anyone can jump in and give feedback
- If approval is not given within 48 hours, Hey Digital will process regardless

Specific details of our media plan are shared internally only, as they contain commercially sensitive information that could be beneficial to our competitors. 

## Brand guidelines

Hey Digital create our ad assets for most of our main channels. These guidelines may be useful to you however if you are doing one-off assets for things like paid newsletter sponsorships or one off campaigns on more niche paid channels. 

- For specific messaging to use in copy, you can use our [copy bank](https://docs.google.com/spreadsheets/d/1VOwyDs8qmXw38KgCiPeJMIGS-SedSAZLXfb2zvB_1jE/edit#gid=0), or our [value propositions](/handbook/growth/marketing/value-propositions) if you need to create something from scratch.
- We have [a handy set of assets](/media) that you can use. Please make sure you follow these so our brand and design language remain consistent across all our various platforms. 

## Channels

We currently run ads on:
- Google Search - _conversion_
- Twitter - _awareness_
- LinkedIn - _awareness_
- Reddit - _awareness_
- Quora - _awareness_

We may consider other paid platforms such as Facebook and Stack Overflow in the future as we learn more, though they are not currently a priority. We have previous tried and no longer use Bing, Product Hunt, Carbon Ads, and Google Display, as they did not drive high quality user signups. 

We usually focus campaigns on users in the US, Canada, UK, Germany and France, as these tend to lead to the most high quality signups. For any GDPR-specific campaigns, we target all EU countries. 

## Meta Ads

In Q2 2025, we're testing Meta ads as a way to increase newsletter subscribers. You can view our ads in [Ads Manager](https://adsmanager.facebook.com/adsmanager/manage/campaigns?nav_entry_point=lep_237&nav_source=unknown&global_scope_id=643559792019437&business_id=643559792019437&act=1028028472241792&redirect_session_id=0302e4c2-f5ff-4150-92af-95821305a344&ads_manager_read_regions=true#).

For access to the Ads Manager, please contact <TeamMember name="Lior Neu-ner" /> or <TeamMember name="Brian Young" />.

For tracking conversions, we use Meta's Conversions API via the [PostHog destination](https://us.posthog.com/project/2/functions/0196edd0-6d74-0000-636b-5f69c8e7e9f5). **Important**: We must be extremely careful not to include any personally identifiable information. We should only include the `fbclid` parameter and the `client_user_agent`.

Note that we do not have Meta's pixel installed, as we do not allow any third-party cookies on our site.

Our ad creative can be accessed in <PrivateLink url="https://www.figma.com/design/CLj2U34xpNiHuZRo73GJPm/posthog.com?node-id=17915-50&t=9Wn8U6aWkxf2ZVry-1">Figma</PrivateLink>

## Tracking conversion

We track conversion in the PostHog app, as using 3rd party trackers like Google Tag Manager is against our brand and values. 

For Google Ads specifically, we have [an app](https://github.com/PostHog/plugin-write-google-ads-to-zapier) which syncs PostHog signups to Zapier, which connects to a Google Sheet that is than synced automatically to our Google Ads account once a day.

## Dog-fooding new destinations

Occasionally, we want to help the CDP team by testing new destinations, such as ad platforms. But we also have a strict policy against third-party cookies. So, here are some guidelines to make sure testing works smoothly. 

* If it creates third-party cookies for us, don't do it. 
* All testing must align with [our privacy policy](/privacy)
* Always verify what data is collected and how it is used. 
* Don't collect any PII, obviously. 
* Limit data collection only to what is _absolutely_ required. 
* Always be transparent with users about what we're collecting, if any. 
* Document changes in the handbook by opening a PR and getting a review. 
* One week later, follow-up to verify it's working as expected.
* In the event something goes wrong, let the People & Ops team know. 
