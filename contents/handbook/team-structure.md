---
title: How small teams work
sidebar: Handbook
showTitle: true
hideAnchor: false
---

We're organized the company into small teams that are multi-disciplinary and as self-sufficient as possible. [You can read about why we've done it this way](/handbook/company/small-teams), or [browse the small teams](/teams).

## Forming new small teams

Organizational changes usually happen at the small team level. Here’s what happens when we form a new small team: 

- [ ] Exec discusses with relevant team leads (and/or managers if applicable).
- [ ] Exec discusses with relevant team member(s). 
- [ ] Ops team updates the [Org Chart](https://app.deel.com/organization-chart/organization/834ac289-7c04-4d93-91f0-8922c5664b77?groupBy=group-by-report) in Deel.
- [ ] Exec informs everyone else in the company in the next all hands session.

### Team Lead checklist
Once the team is announced, team leads are responsible for setting the teams up for success. Here's a checklist.

- [ ] Team lead adds/removes from relevant [Sentry teams](https://sentry.io/settings/posthog/teams/).
- [ ] Team lead adds/removes from relevant [GitHub teams](https://github.com/orgs/PostHog/teams).
- [ ] Team lead adds/removes from Slack `@` groups / team mentions (e.g. `@core-experience`).
- [ ] Team lead creates a new [teams page and adds content](/teams), team members to it
- [ ] Team lead creates 1:1s with new team members.
- [ ] Team lead creates stand-ups, planning sessions, and any other team rituals, including sprint templates.
- [ ] Team lead creates a new team Slack channel, with descriptions and group handle
- [ ] Team lead opens a PR on `posthog.com` documenting the change in the handbook.

## I've created my new small team. Now what?

Congrats! You've been nominated as the lead for a new or existing product. We've launched a number of products at PostHog over the years, and this is our mini-handbook for how to do it well.

> If you're a new lead for an existing product, not all of this doc will apply to you. However, it's still worth a read, as it describes the launch process and how we got to where we are.

### Step 1: Plan your product

Even if you have a general idea of what your product will do, the RFC process will help you think through the ins-and-outs of your product, collect feedback, and start thinking about launch.

Use the [New product RFC template](https://github.com/PostHog/product-internal/blob/main/requests-for-comments/templates/request-for-comments-new-product.md) as a guide. You don't have to follow it precisely - feel free to include whatever other sections you think are relevant. 

> Don't be afraid to deviate from your initial RFC as you go. *[Insert quote about plans being useless but planning invaluable...]*

### Step 2: Build your product

Speed is our differentiator as an engineering org. We grow fast by building fast. Here are some guidelines we've learned about how to build fast.

* **Don’t innovate on the MVP**
  * Give customers something they're already familiar with first. Innovation can happen later
* **Don't overthink the integration**
  * We stressed about how to integrate the data warehouse deeply into the product early on. People are happy to use our products pretty separately in the early days - we don't need to be better than the rest of the market on day 1 of launching.
* **Don’t even think about pricing until you have users. If people are using it, money will come.**
  * Pricing is distracting and complicated and it's not necessary to ship a product and start getting feedback. You should move existing free users onto a paid plan if you create a paid plan later, but give them more usage as a thank you, and be upfront during the free period about this.
* **We need separate teams to build new products. Don't create them within an existing team.**
  * Shipping from within an existing team causes things to take much longer because you'll get pulled onto bugs, merging PRs etc.
* **Don't put new people on new products. Definitely don't have new people _lead_ new products.**
  * Learning how PostHog works isn't going to happen on a fresh product quite so well. Take people from existing teams to run the new product so they can do that having learned the PostHog way.
* **Force usage from internal users as soon as possible**
  * We are a really good user for most of our products, so why wouldn't we. The best way to do this is force usage before we're fully ready, which will really focus the team on building the right things
* **One person teams are fine to get started, but we should add a second person very quickly.**
  * This avoids the need for hiring to block getting started, and longer term prevents loneliness and helps with shipping speed.
* **Build "must have" features ahead of more SDK coverage.**
  * Sometimes we could add more SDKs "to get more growth", but we should start by making sure we can offer the bare minimum within the most popular SDKs we support (posthog-js, python, typescript). Don't default to loads of SDKs if you know you have huge feature gaps as that will disappoint lots of users.

### Step 3: Test your product

As soon as possible, start a waitlist of users who are interested (via a roadmap item) and then collect actual feedback (via a beta). It's your responsibility to create both of these stages, but the marketing teams can help you amplify these activities and make them successful. 

If you have questions about anything beta related, reach out to [the Comms team](/teams/words-and-pictures) for answers. 

> The best thing you can do as a team lead to ensure a smooth launch and beta process is to overcommunicate with the marketing and billing teams via the #marketing channel. You can never give too much warning or too many updates on how your product is progressing. 

#### Adding your product to the roadmap

Add your product to [the in-app feature preview roadmap](/docs/feature-flags/early-access-feature-management) as soon as you start seriously thinking about developing a new product or feature. Then you'll start gathering a waitlist of interested users, ready for a beta announcement. 

Give your product a clear title and simple description in the app, so users know what they're signing up for. Let the Marketing and Billing teams know you've done this via the main #marketing channel or #tell-posthog-anything. That'll enable them to drive users to sign-up to your roadmap by mentioning it in relevant comms. 

#### Launching your product in beta

Move your roadmap item from `concept` to `beta` when it is usable and people can opt-in with the feature previews menu. All items in the Beta stage should have a feedback link and a docs link on their listing so that users know how to get started and share their thoughts. 

If you need help creating docs for your beta, the [Content & Docs team](/teams/marketing) can assist and review your drafts. Feedback links can direct either to the support modal, or to your email address. 

As always, please communicate that a beta has been released by sharing updates in the #marketing channel. This enables the marketing teams to announce the beta in relevant comms, on socials, and more. Product marketing will, for example, run communication that turns your roadmap waitlist into beta testers, and create a beta onboarding flow that helps you collect feedback automatically. 

> You can also read more detail on the process of [launching a feature or product into beta](/handbook/product/releasing-as-beta).

### Step 4. Plan your pricing

At some point most of our products should be paid-for products. Start this process with a pricing RFC using the [pricing RFC template](https://github.com/PostHog/product-internal/blob/main/requests-for-comments/templates/request-for-comments-new-pricing.md?plain=1) and be sure to tag members of [the Billing team](/teams/billing) for review.

Bonus points if you share your pricing RFC with the #marketing channel, as always. 

### Step 5: Launch your product

Betas move into full releases when we roll them out to all users. This is when we trigger a [new product announcement](/handbook/words-and-pictures/product-announcements#new-product-announcements). As always, the simplest and easiest way to work with marketing is to post in the #marketing Slack channel.  

A new product announcement takes time. Product marketing will begin by working you to collect information and create a launch plan ([example here](https://github.com/PostHog/meta/issues/298)). This will include creating landing pages, deciding rewards for beta users, requesting key art for your product, planning the launch comms, and arming the sales team to sell your product to users. 

Marketing teams will not start planning a full launch until a pricing RFC has been created, and will typically ask for a firm release window. The more warning you can give the Marketing teams and the more certainty you have around a launch date, the smoother your launch will be for you and your users. **Typically, you must give at least 2-3 weeks notice of a product launch and you should reach out directly to marketing team leads if this is not possible.**

## Org chart and reporting lines

We maintain our full org chart in Deel, [which you can access here](https://app.deel.com/organization-chart/organization/834ac289-7c04-4d93-91f0-8922c5664b77?groupBy=group-by-report).

Team leads do not necessarily = managers - read more about how we think about management [here](/handbook/company/management). 