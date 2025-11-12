---
title: How Grantable replaced Zapier with PostHog Workflows and cut setup time by ~90%
customer: Grantable
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/grantable_story_85e8fd3bba.jpg
date: 2025-11-05
---

[Grantable](https://www.grantable.co/) is an AI-powered platform that helps nonprofits, businesses, and government offices write winning grant proposals faster. Evan Rallis leads product there – and he says PostHog is now "a massive part of pretty much everything we do."

PostHog wasn’t always this central. Early on, Grantable mostly used it for session replay to see how people behaved in the app. Over time, that changed. Now they’re using product analytics, feature flags, error tracking, surveys, web analytics, data warehouse, even LLM tracing – and most recently, [Workflows](https://posthog.com/docs/workflows).

“We’ve started adding PostHog events into every PR. All new features have a PostHog event requirement,” Evan says. “We track usage, pipe that into dashboards for activation and retention, and now we’re starting to act on it automatically with Workflows.”

That move, from ‘see data’ to ‘do something with it right away,’ is exactly why Grantable is betting on Workflows.

## PostHog Workflows vs. other tools

Grantable had already tried basically every workflow automation platform in the market – tools like Zapier, Make, and relay.app – and had gone all-in on them before: hiring teams to build complex automation, shipping real production flows on top of those systems, even auto-generating large sites with tens of thousands of pages powered by those workflows.

However, this didn’t work for two reasons.

### No shared source of truth

Tools like Zapier or Make don’t sit on top of your product data. You have to keep feeding them user state, usage events, subscription info, ICP classification logic, etc. Every time your data model changes, you’re updating brittle queries and reconnecting fields by hand.

_“There’s no core dataset they live on top of unless you keep pushing data in manually. That is not a pretty process. And as your product changes, you have to keep re-wiring all of it.”_

With Workflows, Grantable doesn’t have to do that. Workflows runs on top of the same PostHog data they’re already tracking: product events, user properties, revenue data, attribution, onboarding steps – all the context that actually matters.

<OSQuote
  customer="grantable"
  author="evan_rallis"
  product="workflows"
 />

### Pricing that scales out of control

Traditional automation tools charge per task or action, so complex workflows quickly become unaffordable.

_“You get into higher and higher pricing tiers just to use certain integrations like Stripe. Then as more events happen you move into even higher tiers. It becomes unworkable past MVP.”_

With Workflows, he says, the cost difference is “absurd” in a good way. According to the pricing calculator he built, PostHog is about 1/100th of the cost compared to other tools when it comes to the number of events you can set up. According to Evan, this fact basically unblocked their roadmap.

Now, instead of worrying about cost or upkeep, the team can simply build — confident that their workflows run on the same trusted data powering the rest of PostHog.

## What they’ve already built with Workflows (in alpha)

Grantable started with onboarding — rebuilding their first user email (previously in Customer.io) directly in Workflows.

How it works is simple. The workflow is triggered when a user completes onboarding in the product, then as a second step pulls in context on that user.

![grantable_screenshot1](https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_11_03_at_16_14_58_782d6dffa3.png)

Next, that data flows into an HTML email built inside PostHog's editor. Evan used drag-and-drop tools to make the email template, and can pull in contextual data from the user with Liquid template language - including setting a fallback for situations where data is not available.

![grantable_screenshot2](https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_11_03_at_16_15_29_d7febfd2c2.png)

Finally, once the email is sent, the workflow triggers a Slack alert for Grantable to let them know the user exists and their status. This helps keep the team informed about new users and, again, can pull in whatever information the team needs from PostHog.

![grantable_screenshot3](https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_11_03_at_16_15_48_8e02547d60.png)

That workflow is live in production today and it took Evan only 10 minutes to set it up.
_“We’re thrilled with it. We shipped it fast, it works, and it’s tied to our real product data instead of being duct-taped across tools. Even in alpha, Workflows has been at least one-tenth of the time it would’ve taken us to build something we’d actually put in production in Zapier. And that might be an understatement.”_

The Grantable team is following a familiar PostHog pattern: start with one product, realize it works better, then pull more into the stack. Session replay replaced standalone tools; error tracking replaced Sentry; heat maps replaced Clarity; surveys replaced Intercom; and now Workflows is replacing Customer.io and Zapier-style automations — all powered by the same shared data underneath.

## Why this matters (to Grantable and to us)

Grantable isn’t just “using a new feature.” They’re reshaping their operating rhythm around PostHog.
A few things stand out:

-   Workflows is credible for production, not just prototyping.
    _“We’re already running onboarding email off it, in alpha. We would never have put onboarding into Zapier."_
-   Setup time is meaningfully lower.
    They shipped production messaging + internal notifications in ~10 minutes instead of the usual slog of stitching 6–8 brittle steps in a third-party tool.
-   Cost scales with value, not button clicks.
    They’re no longer scared that ‘success’ (more signups, more triggers) will nuke their automation budget.
-   It sits on top of data they already trust.
    This is the real unlock. They’ve already standardized on PostHog for product analytics, activation funnels, retention tracking, attribution, error tracking, surveys, and more. Workflows becomes the “do something with it” layer.

And they’re not done.
_“Our endgame is to move customer communication, onboarding, internal alerts, product usage summaries – basically the nervous system of our product and go-to-market – into Workflows. You all ship really fast. We’re willing to invest in this because we can see where it’s going.”_
