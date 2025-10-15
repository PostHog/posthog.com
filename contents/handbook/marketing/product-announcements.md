---
title: Product Marketing
sidebar: Handbook
showTitle: true
---

> **Have something you want to announce?** Let the Marketing team know! If it's an iterative update, you can also demo it in the all-hands, or post in the #tell-posthog-anything Slack channel. 

Product marketers take responsibility for coordinating and publicizing news about PostHog, including product announcements. We also help with [incident](/handbook/engineering/incidents) and [maintenance announcements](/handbook/marketing/product-announcements#announcing-scheduled-maintenance), if needed. 

## Types of announcement

We classify announcements using the general guidelines below, with full discretion for doing something different.

### Minor announcements
Minor announcements involve changes which have no noticeable impact on the experience of most users. They can involve small visual changes, such as UI tweaks, but are more often small bug fixes or back-end changes. They do not require action from users and pose no known risk. 

We may typically support minor announcements by:

- Including them in the weekly changelog update.
- Writing a short Twitter and/or LinkedIn post.

An example of a minor announcement is the [UUID format change](/changelog/2023#new-uuid-format-for-posthog-js).

### Medium announcements
Medium announcements involve changes which have a noticeable impact on the experience of some users, but not the majority. They are likely to involve visual or functional changes, such as adding a chart type, but do not introduce wholly new features. They do not require action from users and pose no known risk.

We may typically support medium announcements by:

- Including them in the weekly changelog update and related emails.
- Creating an in-app changelog notification.
- Writing a Twitter and LinkedIn post.

An example of a medium announcement includes the [launch of the NPS app](/changelog/2023#nps-survey-app).

### Major announcements
Major announcements involve changes which have a noticeable impact on the experience of most users, or require specific action from affected users. They may introduce new features, require product downtime, or include opt-in betas for upcoming work.

We might do anything and everything for a major announcement.

Examples of major announcements include [the surveys beta](/changelog/2023#user-surveys-beta) or [the analytics pricing change](/changelog/2023#reduced-pricing-for-product-analytics).

### New product announcements
New product launches are major announcements. They have their own GitHub template: [Launch Plan](https://github.com/PostHog/meta/issues/new/choose). Product marketers should always create a launch plan for new product announcements. 

For new product announcements we generally apply the following best practices:

- Ensure the product has at least one customer story created for it within 3 weeks of launch.
- Ensure we publish best practice content for the product and link to it from docs.
- Ensure the product has at least one tutorial created for it at launch.
- Ensure launch activities (such as changelog) link clearly to the docs.
- Ensure the product is added to email and in-app onboarding flows.

Comms should also be aware of [the engineering best practices for product launches](/handbook/engineering/development-process#best-practices-for-full-releases), so we can be sure that features launch well.

### PR announcements
We do not typically do public relations for anything other than company-level news. We have separate [processes and guides for managing press announcements](/handbook/brand/press). 

## Maintenance communications

Occasionally, we have to conduct scheduled maintenance. When this happens, it's important that we tell users about it in advance if they would experience any disruption. 

> If you're aware of any upcoming maintenance which would cause disruption, please inform the Support, Marketing, and Customer Success teams as soon as possible. MArketing will ensure that users are notified as the work is planned and completed. Customer Success may wish to inform specific users at the time. 

Typically, Product Marketers take responsibility for informing users about maintenance work beforehand by telling users who will be impacted through email and other channels. 

When informing users about maintenance, it is important to answer all of the following points:

- When will the maintenance occur?
- How long will it take?
- Who will be impacted? 
- Will any data be lost?
- Do users need to take any sort of action?
- How will feature flags and experiments be impacted?
- What will the impact be? Will insights, etc., still function?
- Why is the maintenance being done, and what benefit will there be for users?

We typically notify users of upcoming maintenance by email, so the Marketing team will need a way to target the correct users before they can update them. For smaller maintenance updates which will not cause any user updates, engineering teams can also update our status page. 

## Incidents communications

When an [incident is declared](/handbook/engineering/incidents) the Brand team should join the incident channel as observers, and monitor to make sure that customer comms are handled correctly. 

