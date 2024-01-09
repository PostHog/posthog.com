---
title: Product announcements
sidebar: Handbook
showTitle: true
---

> **Have something you want to announce?** Drop a message in the #team-marketing Slack channel so marketing can assist and prevent overlapping comms. If it's an iterative update, you can also demo it in the all-hands, or post in the #tell-posthog-anything Slack channel. 

Marketing takes responsibility for coordinating and publicizing news about PostHog, including product announcements. We also help with [incident](/handbook/engineering/incidents) and [maintenance announcements](/handbook/growth/marketing/product-announcements#announcing-scheduled-maintenance), if needed. 

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

An example of a medium announcement includes the [launch of the NPS app](https://posthog.com/changelog/2023#nps-survey-app).

### Major announcements
Major announcements involve changes which have a noticeable impact on the experience of most users, or require specific action from affected users. They may introduce new features, require product downtime, or include opt-in betas for upcoming work.

We might do anything and everything for a major announcement.

Examples of major announcements include [the surveys beta](/changelog/2023#user-surveys-beta) or [the analytics pricing change](/changelog/2023#reduced-pricing-for-product-analytics).

### New product announcements
New product launches are major announcements. They have their own GitHub template: [Launch Plan](https://github.com/PostHog/meta/issues/new/choose). Marketing should always create a launch plan for new product announcements. 

For new product announcements we generally apply the following best practices:

- Ensure the product has at least one customer story created for it within 3 weeks of launch.
- Ensure we publish best practice content for the product and link to it from docs.
- Ensure the product has at least one tutorial created for it at launch.
- Ensure launch activities (such as changelog) link clearly to the docs.
- Ensure the product is added to email and in-app onboarding flows.

Marketing should also be aware of [the engineering best practices for product launches](/handbook/engineering/development-process#best-practices-for-full-releases), so we can be sure that features launch well.

### PR announcements
We do not typically do public relations for anything other than company-level news. We have separate [processes and guides for managing press announcements](/handbook/growth/marketing/press). 

## Maintenance communications

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

## Incidents communications

When an [incident is declared](/handbook/engineering/incidents) the Marketing team should join the incident channel as observers, and monitor to make sure that customer comms are handled correctly. 

