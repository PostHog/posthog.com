---
title: Product releases & launches
sidebar: Handbook
showTitle: true
---

> Have something you want to announce? Let the Marketing team know in `#team-marketing`! If it's an iterative update, you can also demo it in the all-hands, or post in `#tell-posthog-anything`. 

Product marketers take responsibility for coordinating and publicizing news about PostHog, including product launches. We also help with [incident](/handbook/engineering/operations/incidents) and [maintenance announcements](/handbook/marketing/product-announcements#announcing-scheduled-maintenance), if needed. 

## Releases vs. launches

The word "launch" gets used to mean a dozen different things, which creates confusion about who owns what. So we split shipping something new into two distinct moments, with two different owners:

- **A release** is when a product or feature becomes available to existing users for the first time. This is the **product team’s** responsibility. The PM or team lead drives it, using [their own release checklist](/handbook/product/releasing-new-products-and-features). A release can be gradual, targeted, or fully open.
- **A launch** gets a product in front of existing and new people – potentially millions who've never heard of us. This is led by **marketing** with the product marketer working from the launch checklist below. If there is disagreement within a team about whether something is ready to launch, that team’s lead should make the decision - it’s either on or it’s off (“we want to launch, but not yet” is off). 

Where we can, releases and launches should happen together, but they don't have to. If pricing, the feature set, or even the name is still moving right up until the day before release, it makes no sense to build and then rebuild the product page, the video, and the campaign around a moving target. In those cases it's completely fine for the launch to follow immediately after the release, once the details are locked. **Timing depends on how certain we are about what we're shipping.** The more settled it is, the tighter the two can be coupled.

### People involved with releases & launches

Releases and launches involve lots of moving pieces. It's helpful to be very specific about who is responsible for what, so you don't waste time figuring this stuff out:

- Product team lead – product readiness for launch, flag setup, and stability.
- PM – pricing and packaging readiness, building the target cohort.
- PMM – go-to-market readiness, launch messaging, product page, and working with other teams on campaign assets (website, video, social, editorial, paid ads).
    
If you are one of these people, you can give feedback to each but you shouldn't block decisions not in your lane. For example, the team lead can say the product is not ready, but should not block a the content of an email. Similarly, marketing can decide what the product page says, but should not block a pricing decision. 

### How we launch: rolling, not big bang

You'll see companies save everything up for a single, coordinated, big-bang moment. That's not us, and it's a deliberate choice.

Our style is a rolling one: a smallish launch, followed by shipping lots of stuff the moment it's ready. This fits how our [small teams](/handbook/company/small-teams) actually work – they move independently and don't wait for a company-wide launch train to leave the station. The alternative means more coordination, more launch meetings, and more waiting, and we don't think the payoff is worth it.

It's easy to look at what competitors post on X and feel like we should be slicker, but we pay far more attention to that stuff than the wider world does. Look at the actual numbers rather than the vibes: on a comparable launch, we tend to massively outscore peers on release (we simply have far more users) _and_ on launch (far more people watch and read our content). We may not look as coordinated in the moment, but we ship things that huge numbers of people genuinely watch and read.

> Got feedback on what you'd like to see from a launch? We'd love to hear it – drop it in `#team-marketing`

## Types of announcement

We classify announcements into four tiers, from a full-blown new product launch (tier 1) down to a minor changelog note (tier 4). The tier defines how much we do to market something. It's a guideline, but PMMs have free rein to do something different.
> This framework helps us manage expectations with other teams. When a team lead or PM tells us about a launch, we use the context they give us (plus our own judgement) to decide which tier it falls into. Share that back with the team so they know what marketing will deliver.

### Deciding what to market

Before you settle on a launch tier, work through the questions below. They shape how you pitch a launch and who you point it at.

**Who is this for, and what do they expect from us?** Remember that existing users have fixed notions of what PostHog is and what it's for. As we attract new users with the self-driving story, that gap will widen – so be deliberate about which story a given audience is expecting and how this launch relates.

**Which surface is it for?** Should a user reach for this new thing through MCP, desktop, web, or the Slack app? Be explicit about where it's most relevant to the user based on the interface(s) they're engaged, or which interface you want them to adopt. 

**What can their role actually do with it?** Match the audience to their permissions. Launches with pricing usually target owners and admins, since they make a purchase decision when enabling the new thing. Owners and admins are also the ones who have to turn on integrations before the rest of the team can use the new tool or feature (as was the case with the Slack app launch). 

**How does it fit the self-driving story?** Some launches feed the loop by giving the system a new source of context (tickets, conversations). Other launches close the loop by acting on that context (Scouts generating Inbox reports). Both promise the same thing: the user's product gets better. A support product isn't exciting because an agent can read tickets. It's exciting because bugs buried in those tickets get found and fixed without anyone prompting it.

**What's the "now what?"** Once someone clicks the email, ad, or notification, what's the one meaningful action we want? Be diligent about setting a goal metric in Customer.io, usually tied to the activation criteria for thing that's launching (the PMM can ask the PM for this). Actions that carry more decision or risk, like connecting a GitHub account to enable self-driving, will typically have lower conversion and need more follow-ups emails and marketing.

### Tier 1: New product announcements

New product launches are our biggest tier. They have their own GitHub template: [Launch Plan](https://github.com/PostHog/marketing/issues/new?template=launch-plan.md). Product marketers should always create a launch plan for new product announcements.

Here are some activities your Tier 1 launch could include:

- New product page 
- Sales enablement doc
- Competitive comparison (can be added to the tool page)
- A case study
- Blog announcement
- Social media brief for Liam 
- Demo video
- Email announcement (or multiple, if you want to segment users and personalize your message)
- Custom designs for blog covers, social posts, etc. 
- [Memes](https://www.figma.com/design/I0VKEEjbkKUDSVzFus2Lpu/Hoglitos?node-id=3962-6)

Some other things we've done for launches: 

- Having a messaging doc is very useful for bigger launches because it can be used by different content-producing teams, and it brings alignment on how we want to communicate the product.
- Initiate communication with the billing team so you're on top of billing changes and schedule your announcements accordingly.
- Meet with the related PM regularly to stay informed about changes and get their input on what you're writing. Read more about [how PMs and PMMs collaborate](/blog/pm-pmm-collaboration).
- Create a separate Slack channel and communicate all updates there. Add all relevant stakeholders and make sure it's active. Post a weekly/bi-weekly update of the progress.
- Create a canvas in your Slack channel where you'll be dropping all relevant links to things published, your launch plan, Figma files, etc. This makes it easier for engineers, PMs, and other stakeholders to find what you've been working on. 
- If the product is moving from free beta to paid general availability (GA) you might also want to choose a reward for beta users. Examples of this include giving PostHog AI beta users 30 extra days of unlimited free usage, or giving Workflows beta users a discount code for merch.
- If the product has been free for a while and it's becoming paid with the launch, make sure to plan to notify free customers in advance and clearly communicate pricing. 

As an example, here's the issue of the [Tier 1 launch for Replay Vision](https://github.com/PostHog/marketing/issues/179).

_Note: All of these are suggestions, not must-haves. It's likely that not all of these things can be ready for launch. A case study, for example, can follow a few weeks after._


- Ensure the product has a product page added to the website.
- Ensure the product team has implemented [intent](/handbook/growth/growth-engineering/product-intents) and [activation](/handbook/growth/growth-engineering/per-product-activation) signals for the product.
- Ensure the product has at least one customer story created for it within 3 weeks of launch. [example](/customers/lovable)
- Ensure we publish best practice content for the product and link to it from docs. [example](/docs/product-analytics/best-practices)
- Ensure the product has at least one tutorial created for it at launch. [example](/docs/feature-flags/tutorials)
- Ensure launch activities (such as changelog) link clearly to the docs.
- Ensure the product is added to email and in-app onboarding flows.
- Ensure the product is added to the [pricing page](/pricing) (this is typically owned by the product team's PM and the <SmallTeam slug="billing" /> as part of the product's release)
- Add a 🚀 annotation in [our PostHog project](https://us.posthog.com/project/2/data-management/annotations) on the launch date, so the launch's impact is visible on dashboards.
- Submit an [art request](/handbook/brand/art-requests) for any creative assets needed for the email campaign, blog post, social media posts etc...

Comms should also be aware of [the engineering best practices for product launches](/handbook/engineering/development-process#best-practices-for-full-releases), so we can be sure that features launch well.

If the product is moving from free beta to paid general availability (GA) you might also want to choose a reward for beta users. Examples of this include giving PostHog AI beta users 30 extra days of unlimited free usage, or giving Workflows beta users a discount code for merch.

### Tier 2: Major announcements

Major announcements involve changes which have a noticeable impact on the experience of most users, or require specific action from affected users. They may introduce new features, require product downtime, or include opt-in betas for upcoming work.

Some examples of stuff you could do: 

- Email announcement
- Artwork to use for social posts or a blog cover
- Blog announcement 
- In-app modal


Examples of major announcements include [the surveys beta](/changelog?id=1945) or [the analytics pricing change](/changelog?id=1907).

### Tier 3: Medium announcements

Medium announcements involve changes which have a noticeable impact on the experience of some users, but not the majority. They are likely to involve visual or functional changes, but do not introduce wholly new features. They do not require action from users and pose no known risk.

We may typically support medium announcements by:

- Including them in the weekly changelog update and related emails.
- Creating an in-app changelog notification.
- Writing a Twitter and LinkedIn post.

An example of a medium announcement includes the [launch of the NPS survey tool](/changelog?id=1787).

### Tier 4: Minor announcements

Minor announcements involve changes which have no noticeable impact on the experience of most users. They can involve small visual changes, such as UI tweaks, but are more often small bug fixes or back-end changes. They do not require action from users and pose no known risk.

We may typically support minor announcements by:

- Including them in the weekly changelog update.
- Writing a short Twitter and/or [LinkedIn post](/handbook/content/linkedin).

An example of a minor announcement is the [UUID format change](/changelog?id=1923).

### PR announcements

We do not typically do public relations for anything other than company-level news. We have separate [processes and guides for managing press announcements](/handbook/marketing/press).

## Maintenance communications

Occasionally, we have to conduct scheduled maintenance. When this happens, it's important that we tell users about it in advance if they would experience any disruption.

> If you're aware of any upcoming maintenance which would cause disruption, please inform the Support, Marketing, and Customer Success teams as soon as possible. Marketing will ensure that users are notified as the work is planned and completed. Customer Success may wish to inform specific users at the time.

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

## Incident communications

When an [incident is declared](/handbook/engineering/operations/incidents) the Brand team should join the incident channel as observers, and monitor to make sure that customer comms are handled correctly.
