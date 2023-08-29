---
title: Product announcements
sidebar: Handbook
showTitle: true
---

> This page is about planned marketing announcements, not [engineering incidents](handbook/engineering/incidents) (though we do help with those too). 

Marketing takes responsibility for coordinating and publicizing news about PostHog, including product announcements. We do this mainly through [weekly changelog updates](/changelog), which summarize product updates

In addition to the weekly updates we also send one monthly email to users, summarizing highlights. Some users, such as those in [the startups program](/startups), also get dedicated newsletter which may announce relevant features. 

We also use email, social and other channels too, where relevant.

However, not all announcements require the same level of marketing support. We therefore group them into tiers which help us decide what level of investment is required from the Marketing team. Which tier applies is agreed upon by the Marketing and Product teams and agreement should be sought as early as possible if Marketing support is expected.

The steps outlined below are a general checklist and the Marketing team will cater the level of support on a case-by-case basis, assigning an owner to each item for a specific announcement. 

> **Have something you want to announce?** The first step is to drop a message in the #team-marketing Slack channel so that marketing can assist and prevent overlapping comms. If it's an iterative update, you can also demo it in the all-hands, or post in the #tell-posthog-anything Slack channel. 

### Minor announcements
Minor announcements involve changes which have no noticeable impact on the experience of most users. They can involve small visual changes, such as UI tweaks, but are more often small bug fixes or back-end changes. They do not require action from users and pose no known risk. 

We may support minor announcements by:

- Including them in the weekly changelog update.
- Writing a short Twitter and/or LinkedIn post.
- Posting in the user Slack group.

An example of a minor announcement is the [UUID format change](/changelog/2023#new-uuid-format-for-posthog-js).

### Medium announcements
Medium announcements involve changes which have a noticeable impact on the experience of some users, but not the majority. They are likely to involve visual or functional changes, such as adding a chart type, but do not introduce wholly new features. They do not require action from users and pose no known risk.

We may support medium announcements by:

- Including them in the weekly changelog update.
- Including them in the monthly changelog email. 
- Writing a Twitter and LinkedIn post.
- Posting in the user Slack group.
- Writing a tutorial created for week of release.
- Creating an in-app banner for existing users.
- Sharing links to the social media announcement internally via Slack, so colleagues can amplify them.
- Sharing the announcement with other external parties, such as integration partners or PPC agencies.

An example of a medium announcement includes the [launch of the NPS app](https://posthog.com/changelog/2023#nps-survey-app).

### Major announcements
Major announcements involve changes which have a noticeable impact on the experience of most users, or require specific action from affected users. They may introduce new features, require product downtime, or include opt-in betas for upcoming work. 

We may support major announcements by:

- Including them in the changelog as soon as possible.
- Including them in the monthly changelog email, and other regular emails.
- Writing a Twitter thread and LinkedIn post.
- Writing a Twitter thread to be posted by @james406.
- Writing a dedicated blog post.
- Sending targeted emails to all or affected users.
- Posting in the PostHog user Slack group with a @here tag.
- Writing a tutorial for day of release.
- Creating a dedicated landing page.
- Creating an in-app banner for existing users.
- Creating on-site banner for all visitors.
- Updating any third-party sites or listings, such as G2.com or StackShare.
- Sharing links to the social media announcement internally via Slack, so colleagues can amplify them.
- Sharing the announcement with other external parties, such as integration partners or PPC agencies.

We do not typically do public relations for anything other than company-level news. We have separate [processes and guides for managing press announcements](/handbook/growth/marketing/press). 

Examples of major announcements include [the surveys beta](/changelog/2023#user-surveys-beta) or [the analytics pricing change](/changelog/2023#reduced-pricing-for-product-analytics).

## Announcing scheduled maintenance

Occasionally, we have to conduct scheduled maintenance. When this happens, it's important that we tell users about it in advance if they would experience any disruption. 

> If you're aware of any upcoming maintenance which would cause disruption, please inform the Marketing and Customer Success teams as soon as possible. Marketing will ensure that users are notified as the work is planned and completed. Customer Success may wish to inform specific users at the time. 

Typically, Marketing takes responsibility for informing users about maintenance work beforehand by telling users who will be impacted through email and other channels. 

When informing users about maintenance, it is important to answer all of the following points:

- When will the maintenance occur?
- How long will it take?
- Who will be impacted? 
- Will any data be lost?
- Do users need to take any sort of action?
- How will feature flags and experiments be impacted?
- What will the impact be? Will insights, etc., still function?
- Why is the maintenance being done, and what benefit will there be for users?

While maintenance is being carried out, we typically use the Notification Bar app within PostHog to tell users that work is ongoing and direct them firstly to `/service-message` where we will provide further information. Once the maintenance is finished, the `service-message` page is updated to reflect that no maintenance is underway, and the banner is removed. 

> The marketing team tries to ensure good, regular communication with other teams across PostHog, but mainly relies on [highlighted PRs](https://github.com/PostHog/posthog/pulls?q=is%3Apr+label%3A%22highlight+%3Astar%3A%22+is%3Aclosed) to find what has shipped in order to avoid burdening engineers with more meetings. ***If you have a shipped feature you want to see included in PostHog announcements, please add a highlight tag and a reasonable description to the PR.** Here's [an example of a good PR description](https://github.com/PostHog/posthog/pull/13414). Alternatively, you can cover it in the all-hands meeting, or post in the #tell-posthog-anything Slack channel.


## The changelog email
Every month, generally on the last Wednesday/Thursday of the month, we use Customer.io to share a broadcast titled 'PostHog Changelog:'

This email, similar to the old Array emails, contains a list of release highlights from that months' announcements. It also includes a CTA which directs users to sign up to [Hogmail](/handbook/growth/marketing/newsletter#hogmail-format).

