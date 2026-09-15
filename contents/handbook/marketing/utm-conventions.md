---
title: UTM conventions
sidebar: Handbook
showTitle: true
---

Every link we buy or place must carry UTM parameters from the lists on this page. Tag a campaign before it goes live, not after.

PostHog does not store the acquisition channel on a session. It calculates the [channel type](/docs/data/channel-type) from the referring domain, the advertising IDs, and the UTM parameters on the first page the person lands on. The calculation runs each time somebody opens a report, and it matches `utm_source` and `utm_medium` against a fixed [list of known values](https://github.com/PostHog/posthog/blob/master/posthog/models/channel_type/channel_definitions.json).

A value outside that list therefore moves paid traffic into an organic channel or into Direct. The paid channel report then under-reports the spend, and there is no error to warn us.

## Four rules

1. **Tag every paid link.** A paid link with no UTM parameters becomes Direct or Referral.
2. **`utm_source` is the platform that showed the ad**, not the partner or the creator. PostHog matches the source against its list of platforms. A creator name, an agency name, or an internal codename is not on that list.
3. **`utm_medium` says how we paid.** Use the value in the tables below, and use one value per channel. PostHog treats traffic as paid when `utm_medium` is `cpc`, `cpm`, `cpv`, `cpa`, `ppc`, or `retargeting`, or when it starts with `paid`.
4. **The partner, the creative, and the placement go in `utm_content`.** PostHog does not read `utm_content`, so it is the safe place for free text. `utm_campaign` is different: three words in it change the channel, so use the campaign-name format below.

A Dub link such as `go.posthog.com/sponsored`, or a `posthog.com` redirect, must end at a destination URL that carries these parameters.

## Paid channels

| Placement | `utm_source` | `utm_medium` | Channel type |
| --- | --- | --- | --- |
| Google Search ads | `google` | `cpc` | Paid Search |
| Bing ads (including DuckDuckGo) | `bing` | `cpc` | Paid Search |
| LinkedIn ads | `linkedin` | `paid-social` | Paid Social |
| Reddit ads | `reddit` | `paid-social` | Paid Social |
| Facebook ads | `facebook` | `paid-social` | Paid Social |
| Instagram ads | `instagram` | `paid-social` | Paid Social |
| YouTube ads | `youtube` | `paid-video` | Paid Video |
| Influencer placement on YouTube | `youtube` | `paid-video` | Paid Video |
| Influencer placement on Instagram | `instagram` | `paid-social` | Paid Social |
| ChatGPT ads | `chatgpt` | `cpc` | Paid Unknown |
| Connected TV | `ctv` | `paid-video` | Paid Unknown |
| Paid newsletter placement | the newsletter slug, for example `tldrnewsletter` | `paid-newsletter` | Paid Unknown |
| Any other paid placement | the platform slug | `paid-<placement>` | Paid Unknown |

The last four rows land in Paid Unknown because PostHog has no channel for an LLM search ad, a TV ad, or a sponsorship. Paid Unknown is still correct: the spend stays in a paid channel and out of the organic report. To split Paid Unknown into channels of our own, add a [custom channel type](/docs/data/channel-type#custom-channel-types) in the project settings, and keep its rules in step with this page.

## Organic and owned channels

These values already resolve correctly. Do not change them.

| Placement | `utm_source` | `utm_medium` | Channel type |
| --- | --- | --- | --- |
| Our newsletter | `posthog-newsletter` | `post` | Newsletter |
| Lifecycle and product email | `posthog` | `email` | Email |
| Onboarding email | `vitally` | `email` | Email |

The Newsletter channel is a custom channel type, and it matches on the source. A different source spelling loses the channel.

## Campaign names

Write `utm_campaign` as `<product-or-theme>-<yyyy-mm>`, in lowercase, with hyphens and no spaces. A campaign that runs for several months keeps the month it started in. For example: `session-replay-2026-10`.

Put the creator, the ad variant, or the placement in `utm_content`, for example `utm_content=pre-roll-30s`.

Three words in `utm_campaign` change the channel type, so avoid them unless they describe the placement:

- `cross-network` sends the session to Cross-Network.
- Any name that contains `video` sends the session to a video channel.
- Any name that contains `shop` or `shopping` sends the session to a shopping channel.

## Values to stop using

| Do not use | Use instead | Why |
| --- | --- | --- |
| `utm_medium=ppc` or `cpa` for search | `cpc` | Three spellings split one platform across three rows in the medium report. |
| `utm_medium=cpm` for social | `paid-social` | `cpm` is a display medium, so the session becomes Display. |
| `utm_source=meta` | `facebook` or `instagram` | `meta` is not a known social source, so the session becomes Paid Unknown. |
| `utm_source=influencer` | the platform the video sits on | The creator is not a platform, so paid influencer traffic becomes Organic Video. |
| A paid link with no `utm_medium` | a paid medium from the table | The session becomes Direct, Referral, or Organic Search. |

## Reviewing a campaign

A day after launch, open the [web analytics](https://us.posthog.com/project/2/web) channel report, filter it to the campaign name, and check that the sessions arrive in the channel you expect. A wrong value is cheap to correct on day one. It is impossible to correct later, because PostHog calculates the channel from the values already stored on the session.
