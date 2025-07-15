---
title: Releasing a feature as beta
sidebar: Handbook
showTitle: true
hideAnchor: true
---

It's sometimes worth releasing big new features under a 'beta' label to set expectations with customers that this feature is still in active development, and might have some rough edges. We generally do this by making betas an opt-in experience for users via [the feature preview menu](https://app.posthog.com/settings/user-feature-previews).

If you're releasing something as a beta there are some guidelines you should follow - especially if the intent is that the beta will eventually become a full product in it's own right. 

## What can be released as a beta?
A beta doesn't need to be perfect, but it should provide value to the user and have base elements of functionality. It doesn't need to be feature complete, but it should provide more than a mocked up front end. 

Betas do not need to be performant for high-volume users and can have big bugs, but should be clearly marked as such in the UI. 

## Launching as a beta

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

If you're launching or planning a beta then it can be to start with [a new product RFC](https://github.com/PostHog/product-internal/blob/main/requests-for-comments/templates/request-for-comments-new-product.md). In any case, there are some things you'll need to do as part of the beta process if you're launching a major feature. 

- If the product will be metered, talk to billing team about getting the usage added to usage reports
- Create a dashboard/notebook to track usage and opt-ins

There are also some best practices which all betas should follow in order to provide a minimum amount of information and usability for customers.

- Betas in the feature preview menu should include a title and short description 
- Betas in the feature preview menu should include a 'Give feedback' button
- Betas in the feature preview menu should have documentation (marked as beta) linked to them
- Betas should have a [feature owner](/handbook/engineering/feature-ownership)

Product teams are responsible for [writing documentation](/handbook/engineering/writing-docs), the [Content team](/teams/content) can help, if needed. Titles, descriptions, and links can be added using [the early access menu](https://us.posthog.com/project/2/early_access_features).

> **Launching a new beta?** It's helpful to let  know when it launches. They'll then add the beta to [the changelog](https://posthog.com/changelog/), organize any marketing announcements, plan [a full announcement](https://github.com/PostHog/meta/issues/new?template=launch-plan-.md) for full release, create an email onboarding flow to help you collect user feedback, and anything else you need. You can let them know via [the team Slack channel](https://posthog.slack.com/archives/C083V7C6GKE).

## Announcing a beta

When we're ready to launch a new beta, it's helpful to let [the Brand & Vibes team](/teams/brand-vibes) know. They can then go through the beta announcement checklist, if appropriate. 

- [ ] Announce the beta to the changelog in a stand-alone post
- [ ] Announce the beta to users in the monthly changelog email
- [ ] Send a personal (non-designed, personally addressed) email to the `Beta Feedback - Power Users` segment in Customer.io, encouraging early beta adoption with previous beta users
- [ ] If the beta exists on [the roadmap](/roadmap), export that waitlist to a segment, email them too
- [ ] Announce the beta in-app with a changelog notification
- [ ] Add the beta as a variant path in the beta feedback flow, in Customer.io

## Activation criteria

If a beta introduces a new product and is launching into general availability, it must have [a defined activation criteria](/handbook/growth/growth-engineering/product-intents). This enables other teams to understand if users are using the product successfully and to monitor if supporting activities (such as changes to in-app onboarding) are beneficial. It's the responsibility of the feature owner to define the activation criteria. 
