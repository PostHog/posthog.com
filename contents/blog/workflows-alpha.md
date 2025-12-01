---
date: 2025-11-03
title: Workflows are now in Alpha and I already broke mine
author:
  - sara-miteva
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/this_is_fine_6336efb0ae.jpg
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
category: PostHog news
tags:
  - Product
---

We've been building **[Workflows](https://posthog.com/docs/workflows)** for a while now: this is our Zapier-style automation builder you can use to trigger actions based on live user behavior. And, while it’s still in its early days, it’s already packing some serious muscle.

You can define triggers (like “user viewed this page” or “performed this event”), add logic (delays, splits, or exit conditions), and finish with actions — such as sending an email, updating a property, or firing an event to another tool.

Everything you automate runs on live product data — who clicked what, which feature they used, and how recently. Because it’s built into PostHog, there’s no syncing or connectors to manage.

This direct link to behavioral data is [what customers say makes the biggest difference](https://posthog.com/customers/grantable):

> “PostHog Workflows just lives on top of the event data and the amazing user data you already have. The setup was incredibly easy.”  
> — Evan Rallis, Head of Product & Growth at Grantable

Channel-wise you’re already live with **email** (and Slack, Twilio, etc. coming soon) – and you can tie in any real-time destination you have set up.

No fragile API scripts or custom backend logic required – just build visually, publish, and let it run.  It's so simple even a marketer can build with it, so I decided to try it out. 


## What I built
As a product marketer working on this product, I immediately started thinking about how we could dogfood it, so I set up an automation that resulted in some unexpected outcomes. 

Here’s what my very simple test campaign looked like:
![automation screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_alpha5_87ccea24d4.png)
### Trigger
This is where you choose who gets to enter your automation. I chose a Pageview event – meaning everyone who comes to the URL that contains workflows will enter this flow.
![trigger screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_alpha6_e74b0b9d8a.png)

The issue was that I hadn't limited how often someone could enter it. The default was once every 30 minutes. We added this capability after I had created this workflow, and totally missed to edit it. 

So, if someone refreshed the page a few times, the workflow happily sent them another *“test test test.”*

### Delay

I added a delay of four days before sending the email — a friendly reminder for users who’d visited the page recently.

You can add conditions or fallback actions here if something fails, but I didn’t (because what could possibly go wrong?).
![delay screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_alpha7_68e4f7ac0d.png)

### Email

The email editor is a simple, visual builder for creating and testing automated emails triggered by user behavior.  

![email editor screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/email_editor_scr_1b5a96b84b.png)

You can personalize fields, add dynamic properties, and drag in elements like text, buttons, or images while previewing the result on desktop or mobile.

Here's the email I sent: 
![workflows email](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_alpha1_04ea076a13.png)

## When it broke

On Monday morning after setting up the campaign, I was happy and caffeinated, walking to my coworking space, feeling productive and ready for the week. 

I was genuinely excited to see how users would react to my campaign from the previous week.  Maybe I'd get some quick replies or some feedback!

And… I got replies all right - but not quite the kind I expected.

![reply to my email 1](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/grouped_test_f1ecac3667.png)

So, yes, my workflow worked – but a little too well. 

Luckily, only a few users experienced the mini spam storm, and most took it as a joke (thankfully reducing my panic level from “delete everything” to “mild existential dread”). Once I had stopped laughing/crying, I fixed it and learned something useful in the process.

**Lesson learned:** always double-check your entry conditions. 
And maybe… don’t test live workflows before your second coffee.

## What we learned

This mistake actually turned into great feedback. 

People loved how easy it was to build automated flows using their own PostHog data – sending messages, triggering logic, or running any action you can imagine. 

This even helped me identify users who were real fans of Workflows. We invited them for interviews, got some use cases from them, and they provided some very useful feedback. *So, it turned out to be a win after all.*
![positive response 1](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_alpha11_914d2caad1.png)
![positive response 2](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_alpha10_15acaba857.png)

Since it’s in alpha, coming to beta soon, it’s free for you to try now, and we’d love to have you [kick the tyres as we refine it](https://app.posthog.com/workflows).

Just maybe set your entry limits first.
