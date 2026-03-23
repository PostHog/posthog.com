---
title: 'Run A/B tests inside your Workflows'
date: 2026-03-23
sidebar: Docs
showTitle: true
hideAnchor: true
author:
    - christophe-eynius-tranberg
    - sara-miteva
category: Product
tags:
    - Workflows
    - A/B testing
seo:
    {
        metaTitle: 'Run A/B tests inside your Workflows',
        metaDescription: 'Use cohort branches in PostHog Workflows to split users into groups, send them down different paths, and measure which one converts better – all without leaving PostHog.',
    }
---
[Workflows](https://app.posthog.com/workflows) let you automate actions based on things your users do (or don't do). A user signs up? Send them an email. Someone hits a paywall three times? Ping your sales team. A trial's about to expire? Update a property and trigger a re-engagement sequence.

The building blocks are simple: triggers fire when something happens, then nodes, like sending messages, updating person properties, or capturing events, execute in sequence. Which brings us to a particularly fun node type – cohorts.

Cohort branches add a fork in the road, randomly splitting users into groups so you can test whether that onboarding email, that nudge notification, or that property update actually moves the needle.

Think of it as multivariate testing baked right into your automation layer. Set it up once, let it run, then check your funnels.

> Heads up: These cohorts are not the same as the cohorts you create in People & Groups. Workflow cohorts live entirely inside the workflow and are just a splitting mechanism. Don't go looking for them in your sidebar.

## How to set it up?

### Step 1: Start with your trigger

This could be a signup event, a page view, a property change, etc.

![set up your trigger](https://res.cloudinary.com/dmukukwp6/image/upload/Set_up_your_trigger_3d60e43354.png)

### Step 2: Insert a cohort branch

Click to add a new node after your trigger and select **cohort branch.** This is the fork. By default, you get two branches, but you can add as many as you need.

![insert a cohort branch](https://res.cloudinary.com/dmukukwp6/image/upload/Insert_a_cohort_branch_a66bfef4c5.png)

### Step 3: Configure your split

Name your branches and add the percentage split. We added "test" and "control" for this example.

![configure your split](https://res.cloudinary.com/dmukukwp6/image/upload/Configure_your_split_60b0258813.png)

### Step 4: Build your branches

You can send an email, trigger an in-app message, update a property – whatever you're testing via the test branch. The control branch can, but doesn't have to do anything. Alternatively, you can test different stuff on different branches.

![build your branches](https://res.cloudinary.com/dmukukwp6/image/upload/Build_your_branches_5f6fe23303.png)

### Step 5: Add tags for measurement

At the end of each branch, update a person property or capture a custom event. This is how you find these users later in funnels and insights.

![add tags for measurement](https://res.cloudinary.com/dmukukwp6/image/upload/Tag_your_users_for_measurement_978da34c31.png)

And, here's the full workflow we built:

![full workflow](https://res.cloudinary.com/dmukukwp6/image/upload/Full_workflow_0a49bac0df.png)

## Two ways to track impact

The whole point of tagging users at the end of each branch is so you can use them outside the workflow. Here's the play:

- **Update a person property** – e.g., set `workflow_completed` to true or false. Then filter your funnels by that property to compare conversion rates between groups.
- **Capture a custom event** – e.g., fire a `workflow_test_exposed` event. Then use that event as a step in your funnels, or break down any insight by users who have (or haven't) triggered it.

Here's an example: build a funnel from signup all the way to first meaningful action (first feature used, first invite sent, first dashboard created – whatever "activated" means for you). Then break that funnel down by `workflow_completed = true` vs `false`. If the test group converts better, you've got a winner, and you can ship it to 100%.

## Use cases & tips

Here are some good candidates for workflow A/B tests:

- **Onboarding email sequences.** Does sending a tips email on day 2 improve activation?
- **Re-engagement nudges.** Do users who get a "come back" email actually come back?
- **Internal workflows.** Does auto-assigning a CSM to trial accounts reduce churn?
- **Property enrichment.** Does tagging power users with a VIP flag change support behavior?

Also, before you start building your test with Workflows, consider this:

- **Always tag both branches.** If you only tag the test group, you can't build a clean comparison. Set the control group's property to `false` (or capture a separate event) so you have an explicit baseline – not just "everyone who didn't get tagged."
- **Don't over-split.** Running five variants with 20% each sounds scientific. In practice, you'll wait forever for significance. Start with two branches unless you have serious volume.
- **Name things like a human will read them.** Six months from now, someone (probably you) will see `wf_test_v3_final_FINAL` in a funnel breakdown and quietly suffer. Be kind to future-you.

Workflows is already inside PostHog, meaning it already has your event data, your person properties, and your funnels. Adding cohort branches means you can run experiments on the same platform where you measure them. Now, [go test something](https://app.posthog.com/workflows).