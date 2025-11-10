---
title: Workflows graduate to beta! Product data, meet automation
date: 2025-11-09
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
    - sara-miteva
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/w_1600,c_limit,q_auto,f_auto/workflows_beta_cover_a04e206b7a.jpg
featuredImageType: full
category: Product
tags:
    - Workflows
seo:
    {
        metaTitle: 'Workflows graduate to beta, and they’re ready for real automations',
        metaDescription: 'Workflows are now in Beta, bringing drip campaigns, new channels, and different automation opportunities. No syncing, no Zapier, just pure product-led automation.',
    }
---

When we first introduced [Workflows (in alpha)](https://posthog.com/blog/workflows-alpha), it was still a bit rough around the edges, and many of you were brave enough to test (and occasionally break) it. Since then, we’ve spent a lot of time fixing, refining, and adding power where it counts.

Now, Workflows have officially graduated to beta.

So what does that mean in practice? You can finally automate product-led actions, like sending emails, updating properties, or triggering Slack alerts, directly from your PostHog data. No syncing tools, no duct-taped integrations, no API key scavenger hunts.

Everything runs on the same event data you already track. Want to send a “welcome” email when a user completes onboarding? Add a delay, wait for them to perform a specific action, and follow up with a message that feels timely and personal. Want to branch logic or stop a workflow if a user upgrades? You can do that too.

Workflows now support a range of actions:

- Send emails, from simple notifications to full [drip campaigns](https://posthog.com/docs/workflows/email-drip-campaign)
- Trigger Slack messages or webhooks based on live product events
- Add delays, conditions, and branches to control when and how actions fire
- Update user properties or trigger events as part of your automation

If you’ve used Zapier or Make before, the idea will feel familiar, but this time, everything happens inside PostHog. It’s faster, more reliable, and powered by the product data you already trust.

Teams like [Grantable](https://posthog.com/customers/grantable) are already seeing the benefits. Evan Rallis, who leads product & growth there, told us:

**“PostHog Workflows just lives on top of the event data and the amazing user data you already have. The setup was incredibly easy.”**

For Grantable, switching to Workflows cut automation setup time by around 90%. And because it all runs within their existing PostHog setup, they no longer need to sync data between tools or rebuild fragile connections when their schema changes.

Workflows are still free during beta, so now’s a good time to experiment. Try building something small – maybe an onboarding reminder, a feedback request, or a Slack alert when a user hits a key milestone.

You can learn more in the [docs](https://posthog.com/docs/workflows) or jump straight into launching your first [workflow](https://app.posthog.com/workflows).

And if you manage to break something, don’t worry, you wouldn’t be the first.
