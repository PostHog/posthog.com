---
title: How Grantable replaces Zapier-style automation with PostHog Workflows (and cuts setup time ~90%)
customer: Grantable
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/grantable.png
date: 2025-11-05
---
[Grantable](https://www.grantable.co/) builds software for compliance, onboarding, and revenue operations. Evan Rallis leads product there – and he says PostHog is now “a massive part of pretty much everything we do.”

PostHog wasn’t always this central to the way Grantable worked. Early on, the team mostly used PostHog for session replay to see how people behaved in the app. Over time, that changed. Now they’re using product analytics, feature flags, error tracking, surveys, web analytics, data warehouse, even LLM analytics – and, most recently, [Workflows](https://posthog.com/docs/workflows).

<BorderWrapper>
<Quote
 imageSource="https://res.cloudinary.com/dmukukwp6/image/upload/evan_rallis_08cffd54f7.jpeg"
    size="md"
    name="Evan Rallis"
    title="Head of Product & Growth"
    quote={`“We’ve started adding PostHog events into every PR. All new features have a PostHog event requirement. We track usage, pipe that into dashboards for activation and retention, and now we’re starting to act on it automatically with Workflows.”`}
/>
</BorderWrapper>

That move, from ‘see data’ to ‘do something with it right away,’ is exactly why Grantable is betting on Workflows.

## PostHog Workflows vs. other tools 
Grantable had already tried basically every workflow automation platform in the market – tools like Zapier, Make, and relay.app – and had gone all-in on them before: hiring teams to build complex automations, shipping real production flows on top of those systems, even auto-generating large sites with tens of thousands of pages powered by those workflows.

However, this didn’t work for two reasons.

### No shared source of truth
Tools like Zapier or Make don’t sit on top of your product data. You must continually provide them with user states, usage events, subscription information, ICP classification logic. Every time your data model changes, you’re updating brittle queries and reconnecting fields by hand.

*“There’s no core dataset they live on top of unless you keep pushing data in manually. That is not a pretty process. And as your product changes, you have to keep re-wiring all of it.”*

With Workflows, Grantable doesn’t have to do that. Workflows runs on top of the same PostHog data they’re already tracking: product events, user properties, revenue data, attribution, onboarding steps – all the context that actually matters.

<BorderWrapper>
<Quote
 imageSource="https://res.cloudinary.com/dmukukwp6/image/upload/evan_rallis_08cffd54f7.jpeg"
    size="md"
    name="Evan Rallis"
    title="Head of Product & Growth"
    quote={`"PostHog Workflows just lives on top of the event data and the amazing user data you already have. The setup was incredibly easy."`}
/>
</BorderWrapper>

### Pricing that scales out of control
Traditional automation tools charge per task or action, so complex workflows quickly become unaffordable.

 *“You get into higher and higher pricing tiers just to use certain integrations like Stripe. Then as more events happen you move into even higher tiers. It becomes unworkable past MVP.”*

With Workflows, he says, the cost difference is “absurd” in a good way. According to the pricing calculator he built, PostHog is about 1/100th of the cost compared to other tools when it comes to the number of events you can set up. According to Evan, this fact basically unblocked their roadmap.  

Now, instead of worrying about cost or upkeep, the team can simply build — confident that their workflows run on the same trusted data powering the rest of PostHog.

## How PostHog Workflows powers Grantable's onboarding

PostHog Workflows is currently in alpha, but that hasn't stopped Grantable from building complex flows and migrating away from tools such as Customer.io. The team has already rebuilt their new user onboarding in PostHog. 

Here's how it works:
1. Trigger: a user completes onboarding in the product
2. Pull context: grab info from that onboarding flow (who they are, what plan, what they did)
3. Action: send an HTML email using Workflows’ built-in email step
4. Follow-up action: post a Slack alert internally with the user’s info and status
5. Track: confirm it ran

That workflow is live in production today and it took Evan only 10 minutes to set it up. 
*“We’re thrilled with it. We shipped it fast, it works, and it’s tied to our real product data instead of being duct-taped across tools. Even though PostHog Workflows is in alpha we've been able to build and release changes in one tenth the time it would have taken with Zapier. And that might be an understatement.”*

The Grantable team is following a familiar PostHog pattern: start with one product, realize it works better, then pull more into the stack. Session replay replaced standalone tools; error tracking replaced Sentry; heatmaps replaced Clarity; surveys replaced Intercom; and now Workflows is replacing Customer.io and Zapier-style automations — all powered by the same shared data underneath.

## Why this matters (to Grantable and to us)
Grantable isn’t just “using a new feature.” They’re reshaping their operating rhythm around PostHog.

A few things stand out:
- Workflows is credible for production, not just prototyping.
*“We’re already running onboarding email off it, in alpha. We would never have put onboarding into Zapier."* 
- Setup time is meaningfully lower.
They shipped production messaging + internal notifications in ~10 minutes instead of the usual slog of stitching 6–8 brittle steps in a third-party tool.
- Cost scales with value, not button clicks.
They’re no longer scared that ‘success’ (more signups, more triggers) will nuke their automation budget.
- It sits on top of data they already trust.
This is the real unlock. They’ve already standardized on PostHog for product analytics, activation funnels, retention tracking, attribution, error tracking, surveys, and more. Workflows becomes the “do something with it” layer.

And they’re not done.
*“Our endgame is to move customer communication, onboarding, internal alerts, product usage summaries – basically the nervous system of our product and go-to-market – into Workflows. You all ship really fast. We’re willing to invest in this because we can see where it’s going.”*
