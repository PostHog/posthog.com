---
title: Releasing new products and features
sidebar: Handbook
showTitle: true
hideAnchor: true
---

import { CalloutBox } from 'components/Docs/CalloutBox'

This guide walks you through the full lifecycle of releasing new products and features at PostHog, from initial planning to general availability.

For complete step-by-step checklists when creating a new product, use [the new product RFC template](https://github.com/PostHog/requests-for-comments/blob/main/.github/ISSUE_TEMPLATE/new-product.md).

## Overview of the product lifecycle

New products at PostHog go through four phases:

1. **Setting up** - Initial planning and alpha development behind a feature flag
2. **Alpha** - Slowly adding customers you've spoken with to the feature flag
3. **Beta** - Opening up to all users who want to opt-in
4. **General availability (GA)** - Full launch with pricing and marketing

PostHog includes a variety of early access features in [the feature previews section of a users' settings page](https://app.posthog.com/settings/user-feature-previews), as well as a roadmap of feature previews which are coming soon.

Items in the feature previews section can be toggled on or off if users want to try a feature out. Items in the coming soon section enable users to register their interest so that we can contact them with updates. Both sections work only at the user-level and not at the org or project level.

Please refer to the RFC for what the actual steps are. Duplicating them here would cause them to go out-of-sync extremely quickly. We'll simply explain the rationale behind each of the stages.

## Phase 1: Setting up a product

Adding items to the coming soon menu early offers several advantages. It enables us to gauge interest in a new feature via sign-ups, equips our marketing teams with news they can promote to users, and ensures that betas can have sample users ready from the moment they launch.

Coming soon features can either be large or small, so use your judgement about what is of interest to users, but it should be something that you expect to work on in the next 3-6 months.

## Phase 2: Alpha

During alpha, you're testing with a small group of customers you've specifically invited. It's fine to have bugs and your testers know that's the case. You're also actively working on fixing all known bugs before we can move this on to an opt-in scenario.

## Phase 3: Beta

Beta is when you open up the product to all users who want to opt-in. Betas do not need to have been in `concept` stage first.

<CalloutBox icon="IconInfo" title="Moving from Concept to Beta" type="fyi">

Once you are ready to move an item from the coming soon roadmap to a beta which users can interact with, simply update the flag state from `concept` to `beta`. This will trigger an automatic notification to all subscribed users letting them know that the beta is available. All users who are subscribed to updates will be immediately opted in to the beta.

Make sure your early access feature flag includes a `product_key` on the payload field to give people access to the product in their sidebar. Check the new product RFC for more details.

</CalloutBox>

### Beta requirements

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
<Caption>Betas should include a title, description, feedback button, payload with `product_key` and link to basic docs</Caption>

All betas should follow the best practices below in order to provide a minimum amount of information and usability for customers.

- Betas in the feature preview menu should include a title and short description
- Betas in the feature preview menu should include a 'Give feedback' button
- Betas in the feature preview menu should have documentation (marked as beta) linked to them
- Betas should have a [feature owner](/handbook/engineering/feature-ownership)
- Betas should have a `product_key`

Product teams are responsible for [writing documentation](/handbook/engineering/writing-docs), but the <SmallTeam slug="content" /> can help, if needed. Titles, descriptions, and links can be added using [the early access menu](https://us.posthog.com/project/2/early_access_features).

<CalloutBox icon="IconInfo" title="Launching a new beta?" type="fyi">

  It's helpful to let the Marketing teams know when new betas are added. They'll then add the beta to [the changelog](https://posthog.com/changelog/), organize any marketing announcements, plan [a full announcement](https://github.com/PostHog/meta/issues/new?template=launch-plan-.md) for full release, create an email onboarding flow to help you collect user feedback, and anything else you need. You can let them know via [the Marketing Slack channel](https://posthog.slack.com/archives/C08CG24E3SR).

</CalloutBox>

### Collecting beta feedback

Teams are encouraged to collect feedback from users in current betas so that they can build better products and we have some automations in place to facilitate this.

After a week in any new beta, users will trigger an automatic email from the `beta-feedback@posthog.com` Google Group. This email will ask them, essentially, for any suggested changes to the beta. By default, all team leads and exec team members are in this Google Group and will get daily digests of responses. Others are invited to add themselves to the group, or change their notification settings.

Regardless, emails to this Google Group will sync to the PostHog Feedback Slack channel for general awareness. Team leads are encouraged to respond to beta feedback emails.

Teams can collect additional feedback if needed and the Brand & Vibes team is able to help with creating feedback emails or funnels.

## Phase 4: Launching to general availability

Once a beta is mature enough, you may want to launch it into general availability (GA).

**If you're planning to launch your product in a specific quarter, you MUST let the Marketing team know at the start of the quarter.**

Smaller features which don't require [major announcements](/handbook/brand/product-announcements) should be announced internally via the [Tell PostHog Anything channel](https://posthog.slack.com/archives/C0351B1DMUY) so other teams are aware.

You can set the feature flag to release to 100% of users BEFORE the Marketing launch, you don't need to wait for it.

See [product announcements](/handbook/marketing/product-announcements) for marketing requirements during launch.

> **How do I work with marketing and billing teams?**
> The short version here is to try and give other teams as much notice as possible when starting a launch cycle. Marketing and billing teams typically ask for two weeks of notice before a major launch, as a minimum. It's the responsibility of the team lead to ensure these teams are aware of upcoming launches.

## Who's responsible?

The Team Lead is typically responsible for:

- Creating and managing the RFC
- Keeping Marketing and Billing teams informed about product progress
- Ensuring timely communication (at least 2-3 weeks notice before a major launch)

Team members can be assigned specific tasks within the RFC checklist.

## Related resources

- [Deciding which products we build](/handbook/which-products)
- [Small teams and launching products](/handbook/company/small-teams#launching-new-products-and-features)
- [Product announcements](/handbook/marketing/product-announcements)
- [Per-product activation](/handbook/growth/growth-engineering/per-product-activation)
