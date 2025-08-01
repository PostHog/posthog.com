---
title: Releasing early access and coming soon features
sidebar: Handbook
showTitle: true
hideAnchor: true
---

PostHog includes a variety of early access features [the feature previews section of a users' settings page](https://app.posthog.com/settings/user-feature-previews), as well as a roadmap of feature previews which are coming soon. 

Items in the feature previews section can be toggled on or off if users want to try a feature out. Items in the coming soon section enable users to register their interest so that we can contact them with updates. Both sections work only at the user-level and not at the org or project level. 

## Releasing as coming soon
If your team is considering building a feature in the future, you should add it to the coming soon menu. This responsibility usually sits with the Team Lead, unless the project is an individual one. 

To add an item to the coming soon, simply create a feature flag with the `concept` state in [PostHog's early access features tool](/docs/feature-flags/early-access-feature-management).

Adding items to the coming soon menu early offers several advantages. It enables us to gauge interest in a new feature via sign-ups, equips our marketing teams with news they can promote to users, and ensures that betas can have sample users ready from the moment they launch. 

Coming soon features can either be large or small, so use your judgement about what is of interest to users, but it should be something that you expect to work on in the next 3-6 months. 

> **Moving from `Concept` to `Beta`**
> Once you are ready to move an item from the coming soon roadmap to a beta which users can interact with, simply update the flag state from `concept` to `beta`. This will trigger an automatic notification to all subscribed users letting them know that the beta is available. All users who are subscribed to updates will be immediately opted in to the beta.

## Releasing as beta
If your team is releasing an early version of a feature which users can interact with, you should consider adding it to the beta menu by creating a flag in the `beta` stage. Betas do not need to have been in `concept` stage first. 

A beta doesn't need to be perfect, but it should provide value to the user and have base elements of functionality. It doesn't need to be feature complete, but it should provide more than a mocked up front end. We aim not to leave items in beta unless they are in active development. All betas should be clearly documented. 

Betas do not need to be performant for high-volume users and can have big bugs, but should be clearly marked as such in the UI. 

<CloudinaryImage
  src="https://res.cloudinary.com/dmukukwp6/image/upload/goodbeta_daa2ddca2a.png"
  alt="An example of a good beta"
  className="dark:hidden"
/>
<CloudinaryImage
  src="https://res.cloudinary.com/dmukukwp6/image/upload/goodbeta_dark_1dd8b2e833.png"
  alt="An example of a good beta"
  className="hidden dark:block"
/> 
<Caption>Betas should include a title, description, feedback button, and link to basic docs</Caption>

All betas should follow the best practices below in order to provide a minimum amount of information and usability for customers.

- Betas in the feature preview menu should include a title and short description 
- Betas in the feature preview menu should include a 'Give feedback' button
- Betas in the feature preview menu should have documentation (marked as beta) linked to them
- Betas should have a [feature owner](/handbook/engineering/feature-ownership)

Product teams are responsible for [writing documentation](/handbook/engineering/writing-docs), but the [Content team](/teams/content) can help, if needed. Titles, descriptions, and links can be added using [the early access menu](https://us.posthog.com/project/2/early_access_features).

> **Launching a new beta?** It's helpful to let the Marketing teams know when new betas are added. They'll then add the beta to [the changelog](https://posthog.com/changelog/), organize any marketing announcements, plan [a full announcement](https://github.com/PostHog/meta/issues/new?template=launch-plan-.md) for full release, create an email onboarding flow to help you collect user feedback, and anything else you need. You can let them know via [the Marketing Slack channel](https://posthog.slack.com/archives/C08CG24E3SR).

### Collecting beta feedback
Teams are encouraged to collect feedback from users in current betas so that they can build better products and we have some automations in place to facilitate this. 

After a week in any new beta, users will trigger an automatic email from the `beta-feedback@posthog.com` Google Group. This email will ask them, essentially, for any suggested changes to the beta. By default, all team leads and exec team members are in this Google Group and will get daily digests of responses. Others are invited to add themselves to the group, or change their notification settings.

Regardless, emails to this Google Group will sync to the PostHog Feedback Slack channel for general awareness. Team leads are encouraged to respond to beta feedback emails. 

Teams can collect additional feedback if needed and the Brand & Vibes team is able to help with creating feedback emails or funnels.

## Releasing as generally available
Once a beta is mature enough, you may want to launch it into general availability (GA). 

Smaller features which don't require [major announcements](/handbook/brand/product-announcements) should be announced internally via the [Tell PostHog Anything channel](https://posthog.slack.com/archives/C0351B1DMUY) so other teams are aware. 

If you're releasing an entirely new product or tool then teams should create [a new product RFC](https://github.com/PostHog/product-internal/blob/main/requests-for-comments/templates/request-for-comments-new-product.md) and complete that process before releasing the feature as GA to users. This RFC should be created by the Team Lead. 

In any case, there are some things you'll need to do as part of the beta process if you're launching a major feature. 

- If the product will be metered, talk to billing team about getting the usage added to usage reports
- Create a dashboard/notebook to track usage and opt-ins
- Ensure other teams are aware by posting to the [Tell PostHog Anything channel](https://posthog.slack.com/archives/C0351B1DMUY)

> **How do I work with marketing and billing teams?**
> The short version here is to try and give other teams as much notice as possible when starting a launch cycle. Marketing and billing teams typically ask for two weeks of notice before a major launch, as a minimum. It's the responsibility of the team lead to ensure these teams are aware of upcoming launches.







## Activation criteria

If a beta introduces a new product and is launching into general availability, it must have [a defined activation criteria](/handbook/growth/growth-engineering/product-intents). This enables other teams to understand if users are using the product successfully and to monitor if supporting activities (such as changes to in-app onboarding) are beneficial. It's the responsibility of the feature owner to define the activation criteria. 
