---
date: 2025-11-03
title: Workflows are now in Alpha and I already broke mine
author:
  - sara-miteva
featuredImage: >-
  
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
category: PostHog news
---

Monday morning. This is me, happy and caffeinated, walking to my coworking space, feeling productive and ready for the week.

[Add image here, art request is submitted]

Last week, I set up a new automation using our new **workflows** product, which is in alpha. I wanted to test how it worked – and, at the same time, let users know it’s available to try.  

I sent out a simple test email that looked like this:
![workflows email](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_alpha1_04ea076a13.png)
---

I was genuinely excited to see how users would react.  
Maybe some quick replies. Maybe some feedback.
And… I got replies all right.
But not quite the kind I expected.
![reply to my email 1](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_alpha3_8f3453dfbd.png)
![reply to my email 2](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_alpha2_dcc58991c0.png)
![reply to my email 3](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_alpha4_4174b14490.png)

So, yes, my workflow worked – but a little too well. 

Luckily, only a few users experienced the spam storm, and most took it as a joke (thankfully reducing my panic level from “delete everything” to “mild existential dread”). Once I had stopped laughing/crying, I fixed it and learned something useful in the process.

---

## About the automation

Here’s what my very simple test campaign looked like:
![automation screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_alpha5_87ccea24d4.png)
### Trigger
![trigger screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_alpha6_e74b0b9d8a.png)
This is where you choose who gets to enter your automation.  
I chose a **Pageview** event – meaning everyone who comes to the URL that contains *workflows* will enter this flow.

The issue? I forgot to limit how often someone could enter it. The default was **once every 30 minutes**.

So, if someone refreshed the page a few times, the workflow happily sent them another *“test test test.”*
![frequency screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_frequenct_3ff32a51ff.png)
Next, you can set a conversion goal if you want to, and choose your exit condition.
![conversion goal screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_alpha9_8b7b92da46.png)
---

### Delay

The delay was pretty simple – I set the email to get sent **four days after** the user visited the page so they’d be reminded to use it again.

Here, you can also set some conditions, if you have any (which I didn’t because I didn't think they were necessary).  
One more thing you can add to this step is what to do if this step fails. By default, the user continues to the next step.
![delay screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_alpha7_68e4f7ac0d.png)
---

### Email

You already saw my email, but here’s an overview of the editor:
![email editor screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_alpha8_a0ecf84e4a.png)
It’s a simple, visual builder for creating and testing automated emails triggered by user behavior.  
You can personalize fields, add dynamic properties, and drag in elements like text, buttons, or images while previewing the result on desktop or mobile.

---

### Exit

Finally, getting this email means the user has gone through the flow successfully and they exit the campaign.

**Lesson learned:** always double-check your entry conditions. 
And maybe… don’t test live workflows before your second coffee.

Also, I got so much useful feedback from users testing Workflows. People loved how easy it was to build automated flows using their own PostHog data – sending messages, triggering logic, or running any action you can imagine. This mistake helped me identify users who were real fans of Workflows. We invited them for interviews, got some use cases from them, and they provided some very useful feedback. *So, it turned out to be a win after all.*
![positive response 1](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_alpha11_914d2caad1.png)
![positive response 2](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/workflows_alpha10_15acaba857.png)
---

## What Workflows can actually do

**[Workflows](https://posthog.com/docs/workflows)** is our no-code, drag-and-drop automation engine built right into PostHog – and while it’s still in its early days, it’s already packing some serious muscle.

You start by choosing a **trigger** (for example, when someone views a particular page or performs an event in your product).  
Then you drag in **logic** such as delays, audience splits, or exit conditions.  
From there, you choose an **action**: send an email, update a user property, or dispatch an event to one of your real-time destinations.

Because it’s built into PostHog’s platform, workflows lets you leverage behavioral data (who clicked what, what feature they used, how recently) to create highly targeted automations. This turned out to be the biggest benefit for several customers we interviewed: 

> “PostHog Workflows just lives on top of the event data and the amazing user data you already have. The setup was incredibly easy.”  
> — Evan Rallis, Head of Product & Growth at Grantable

Channel-wise you’re already live with **email** (and Slack, Twilio, etc. coming soon) – and you can tie in any real-time destination you have set up.

The best bit? No fragile API scripts or custom backend logic required – just build visually, publish, and let it run.  
Since it’s in alpha, coming to beta soon, it’s free for you to try now, and we’d love to have you [kick the tyres as we refine it](https://app.posthog.com/workflows).

Just maybe set your entry limits first.
