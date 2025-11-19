---
title: Workflows graduate to beta! Product data, meet automation
date: 2025-11-12
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
    - sara-miteva
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/workflows_beta_cover_a04e206b7a.jpg
featuredImageType: full
category: Product
tags:
    - Workflows
seo:
    {
        metaTitle: 'Workflows graduate to beta! Product data, meet automation',
        metaDescription: 'Workflows are now in Beta, bringing drip campaigns, new channels, and different automation opportunities. No syncing, no Zapier, just pure product-led automation.',
    }
---

When we first introduced [Workflows (in alpha)](/blog/workflows-alpha), it was still a bit rough around the edges, and many of you were brave enough to test it. Since then, we’ve spent a lot of time fixing, refining, and adding power where it counts.

Now, Workflows has officially graduated to beta.

So, what does that mean in practice? You can finally automate product-led actions, like sending emails, updating properties, or triggering Slack alerts, directly from your PostHog data. No syncing tools, no duct-taped integrations, no API key scavenger hunts.

Everything runs on the same event data you already track. Want to send a welcome email when a user completes onboarding? You can build the email and trigger it with an event or a delay. Want to adding branching logic based on their upgrade path? You can do that too.

Workflows now support a range of actions:

-   Send emails, from simple notifications to full [drip campaigns](/docs/workflows/email-drip-campaign)
-   Trigger Slack messages or webhooks based on live product events
-   Add delays, conditions, and branches to control when and how actions fire
-   Update user properties or trigger events as part of your automation

If you’ve used Zapier, Make, Brevo, Active Campaign or similar tools before, the idea will feel familiar, but this time, everything happens inside PostHog. It’s faster, more reliable, and you don't need to send data to third-party platforms.

Teams like [Grantable](/customers/grantable) are already seeing the benefits. Evan Rallis, who leads product & growth there, told us:

> “PostHog Workflows just lives on top of the event data and the amazing user data you already have. The setup was incredibly easy.”

Evan said it's almost twice as fast to build automations in Workflows than with other tools, in part because he doesn't need to switch to a third-party tool and wait for data to sync.

Workflows are still free during beta, so now’s a good time to experiment. Try building something small – maybe an onboarding reminder, a feedback request, or a Slack alert when a user hits a key milestone.

You can learn more in the [docs](/docs/workflows) or jump straight into launching your first [workflow](https://app.posthog.com/workflows).
