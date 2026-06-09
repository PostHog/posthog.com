---
title: Onboarding and lifecycle emails
sidebar: Handbook
showTitle: true
---

This page explains how our automated onboarding and lifecycle email flows are put together in Customer.io — the broad architecture, the conventions we follow, and what you should do when you launch a new product.

It's aimed at product marketers. It documents how things are set up *today*, but none of it is set in stone. These are broad rules of practice, not hard constraints — it's very possible (and encouraged) to build new things around this structure when a launch calls for it.

> **Not sure where to start, or want a second pair of eyes on a new flow?** <TeamMember name="Joe Martin" photo /> owns customer comms and is the best point of contact. Loop him in early rather than late.

This page is about *marketing* onboarding — the emails new users get automatically. It is **not** about the Sales/CS-led [onboarding program](/handbook/onboarding/onboarding-program), which is a human-led pipeline for high-value accounts. Both are called "onboarding," but they're different things.

For the underlying email infrastructure — broadcasts, transactional sends, tags, unsubscribe behavior, and sending addresses — see the [email marketing page](/handbook/marketing/email-comms). This page builds on that.

## The mental model

Almost everything we do in Customer.io is built from three layers stacked on top of each other. If you understand these layers, you understand the system:

1. **Data** — events and person attributes that flow in from PostHog (e.g. "this person signed up", "this person showed interest in session replay", "this person activated"). This is the raw material.
2. **Segments** — saved groups of people defined by that data ("everyone who signed up but hasn't activated", "everyone interested in flags"). Segments are how we slice the audience.
3. **Campaigns** — the automated flows (sometimes called journeys) that send messages. A campaign is *triggered* by data, often *filtered* or *branched* by segments, and *exits* people when they convert.

A fourth concept sits across all of it:

4. **Subscription topics** — the consent categories a person can opt in or out of (e.g. "Welcome emails", "Changelog updates"). Every campaign is tied to a topic so people only get what they've agreed to.

When you launch something new, you're almost always working across these same four layers: making sure the right data exists, building the segments you need, wiring up a flow, and choosing the right subscription topic.

## Layer 1: Where the data comes from

Customer.io doesn't know anything we don't tell it. The events and attributes that drive every flow are captured in PostHog and synced into Customer.io, where they become campaign triggers and segment conditions.

The events that matter most for onboarding are:

| Event | What it means | Used for |
| --- | --- | --- |
| `user signed up` | A new person created an account | The entry trigger for the main onboarding flows |
| `user showed product intent` | Someone indicated interest in a specific product | Building "intent" segments (see below) |
| `billing product activated` | An org started paying for / enabled a product | Activation and conversion |
| Product milestone events | e.g. `insight created`, `feature flag created`, `experiment created`, `survey launched`, `recording analyzed`, `source created` | Defining what "activated" means per product |
| `$feature_enrollment_update` | Someone joined (or left) a beta / early-access feature | The trigger for the beta feedback flow |

The two concepts worth understanding properly are **product intent** and **activation**, because most of our onboarding logic hangs off them:

- **Product intent** is how we know *which product a person actually came for*. When someone picks products during onboarding (or takes a deep, deliberate action elsewhere), we fire a `user showed product intent` event tagged with the product and whether it's their primary, secondary, or basic intent. This is documented in detail on the [product intents](/handbook/growth/growth-engineering/product-intents) page.
- **Activation** is how we know someone got value. Each product has its own activation criteria — a qualifying event or set of events. See [per-product activation](/handbook/growth/growth-engineering/per-product-activation).

Both of these are owned and instrumented by Growth Engineering. As a product marketer you generally *consume* them, but if they don't exist yet for your product, that's the first thing to sort out (more on that below).

## Layer 2: How segments are organized

There are several hundred segments in the workspace. You don't need to know them all — most are one-off lists for specific sends. But they fall into a handful of recurring **families**, and knowing the families is enough to find your way around:

| Family | Examples | Purpose |
| --- | --- | --- |
| **Hygiene / deliverability** | "Unsubscribed", "Valid Email Address", users who opted out of email in-app | Protect deliverability. Almost every flow excludes these. |
| **Instance & geography** | "All Cloud Users (US + EU)", "Self-hosted Users", "Open source users", "EU Cloud Users" | Distinguish who can actually be messaged and how. |
| **Lifecycle / recency** | "New Signups", "Just signed up", "Logged in last 30 days", "Recently engaged (4 months)" | Target by where someone is in their journey. |
| **ICP / role** | "High ICP", "Org owners or admins", "Founders" | Tailor messaging by fit and seniority. |
| **Product intent** | "Primary Intent: Product Analytics", "Secondary Intent: Session Replay", "Basic Intent: Flags" | Route people to content about the product they care about. Built from the `user showed product intent` event. |
| **Activation** | "Activated – Analytics", "Activated – Replays", "Activated anything, or on platform addon" | Know who's succeeded, so we can stop nudging them. Built from product milestone events. |
| **Beta** | "Beta Users – Joined a beta ever", "Beta Users – Error Tracking", product-specific beta lists | Target and follow up with beta participants. |
| **Programs** | "PostHog for Startups and YC (new)", "YC Users in Current/Recent Batch" | Power program-specific flows like the Startups & YC onboarding. |

There are two segment types:

- **Dynamic** segments update automatically as people meet (or stop meeting) the conditions. Use these for anything behavioral or ongoing — the vast majority of onboarding segments are dynamic.
- **Static** segments are fixed lists, usually built by importing or a one-time query. Use these for specific one-off sends (an incident, an apology, a manual export).

> **Convention:** before building a new segment, check whether one already exists. Duplicated, near-identical segments are the single biggest source of mess in the workspace. Give new segments a clear, descriptive name, and prefer dynamic over static unless you specifically need a frozen list.

## Layer 3: The core onboarding flows

These are the long-running flows that make up the backbone of our lifecycle program. Each one is triggered by data, sends a series of messages, and is designed to exit people once they convert.

### Onboarding 8.0 — the flagship

This is the big one, and the model you should understand first. It's a single, large campaign (more than 130 emails, with dozens of branches) that handles the entire first-run experience for new cloud users.

- **Trigger:** the `user signed up` event.
- **Entry filter:** excludes self-hosted users (they get a different, lighter touch).
- **Branching:** this is the key idea. Rather than sending everyone the same emails, the flow *branches on product intent*. Near the top it asks "what was this person's primary onboarding product?" (and secondary, and basic) and routes them down a path tailored to that product — a relevant demo video, product-specific tips, and nudges toward that product's activation moment. It also branches on behavior: "have they ingested any data?", "have they activated this product?", "have they activated 2+ products?", "are they an org owner or admin?"
- **Content mix:** product demo videos (one per product), educational pieces, activation nudges ("connect a source", "ingestion help"), brand/fun emails, and the occasional add-on or upgrade push.
- **Conversion goal:** entering the "Activated anything, or on platform addon" segment within 7 days. When someone activates, they've succeeded — so they convert and stop receiving nudges.
- **Subscription topic:** "Welcome emails".

The takeaway: **Onboarding 8.0 is intent-aware and activation-aware.** It tries to send people content about the product they actually came for, and it gets out of the way as soon as they succeed.

### Long-running onboarding — the extended nurture

A lighter, slower flow that also triggers on `user signed up` but plays out over a longer window than the intense first few weeks. It sends spaced-out pushes — content, beta invites, event invites — to keep new users engaged over time. Its conversion goal is simply that the person logs in again (`user logged in`), i.e. they keep coming back.

### Beta onboarding — feedback after joining a beta

A deliberately simple flow that shows the second common pattern: **event-triggered, single-purpose**.

- **Trigger:** the `$feature_enrollment_update` event — fired when someone joins a beta or early-access feature.
- **Flow:** wait a short while, then send a single "beta feedback request" email asking how the feature is going.
- **Conversion goal:** the org activates a billing product.
- **Subscription topic:** "Changelog updates".

This is the flow that catches *every* beta opt-in across *every* product, so when you put a feature into beta you generally get feedback collection for free — you don't need to build a new campaign for it.

### Startups & YC onboarding — a program flow

Shows the third pattern: **segment-triggered**.

- **Trigger:** *entering a segment* (the "Startups & YC – In Onboarding Flow" segment), rather than firing on a single event.
- **Content:** program-specific — credits guidance, the job board, useful integrations, product combinations, and tailored content.
- **Conversion goal:** activation, same as the main flow.
- **Subscription topic:** "Welcome emails".

Segment-triggered flows are the right choice when membership is the thing that matters ("everyone in this program", "everyone who hit this state"), rather than a single moment in time.

> **A note on the legacy flows.** You'll also see older onboarding campaigns for open-source and self-hosted users built on Customer.io's legacy "behavioral" campaign type. Don't copy that pattern for anything new — see the trigger types below.

## The anatomy of a flow

Every campaign, big or small, is assembled from the same building blocks. When you build or read a flow, these are the dials:

- **Trigger type.** How people enter:
  - *Event-triggered* (Customer.io calls these "transactional" campaigns) — fires the moment an event happens. Best for "do X when Y happens" (signed up, joined a beta). This is the default for new flows.
  - *Segment-triggered* (`seg_attr`) — fires when someone enters a segment. Best for "everyone who is / becomes part of this group."
  - **Avoid the legacy "behavioral" type** for new campaigns. It only updates on live transitions, so it silently excludes existing or backfilled people.
- **Entry filters.** Conditions layered on top of the trigger (e.g. "signed up *and* not self-hosted"). Usually used to exclude people who shouldn't be in the flow.
- **Delays and send windows.** Waits between messages, and time-of-day windows so emails land at sensible local times rather than 3am.
- **Branches.** Two kinds:
  - *Conditional branches* route people based on a yes/no question ("have they activated this product?").
  - *Split branches* divide people into groups — used for A/B testing content and for routing by product intent.
- **Conversion goal.** The thing you're trying to make happen (usually activation). Customer.io measures each flow against its goal, which is how you know whether it works.
- **Exit conditions.** When people should leave — almost always *on conversion*, so we stop emailing someone the moment they've done what we wanted.
- **Subscription topic.** The consent category the flow sends under (see below).
- **Message limits.** Frequency caps that stop a person being hit by too many emails across all flows at once. Keep these on.

## Conventions and rules of practice

These are the defaults we follow. Deviate when you have a good reason, but know that you're deviating:

- **Respect consent.** Pick the right [subscription topic](/handbook/marketing/email-comms) for the flow. Onboarding and welcome flows use "Welcome emails"; beta and feature news use "Changelog updates". Don't send marketing flows to unsubscribed users.
- **Always exit on conversion.** A flow should stop the moment someone activates. Nothing reads as more broken than "congrats on activating" followed by "you still haven't activated".
- **Set a real conversion goal.** If you can't say what the flow is trying to make happen, you can't tell if it's working. For onboarding, that's almost always activation.
- **Keep message limits on.** People are usually in several flows at once. Frequency caps stop us overwhelming them.
- **Prefer extending over rebuilding.** If your product has an onboarding story, the main flow is often the right home for it — see below.
- **Name things clearly** and check for an existing segment/campaign before creating a near-duplicate.
- **Test before you launch.** Send yourself test emails, check the branching with a few real-looking profiles, and have someone review big sends.

## What to do when you launch a new product

Here's the playbook. Not every step applies to every launch, but this is the path of least surprise:

1. **Make sure intent and activation exist.** Before any email work, confirm Growth Engineering has instrumented a [product intent](/handbook/growth/growth-engineering/product-intents) and [activation criteria](/handbook/growth/growth-engineering/per-product-activation) for your product. Without these, the onboarding system is flying blind — there's no way to route interested people to your content or to know when they've succeeded. This should happen *before* public beta.

2. **During beta, lean on what already exists.** The beta onboarding flow already catches everyone who enrolls in your feature and asks them for feedback — you usually get that for free. If you want to do more (a dedicated beta nurture, an announcement to a waitlist), build a beta segment for your product (the "Beta Users – [product]" pattern) and a small, single-purpose flow.

3. **Decide: extend the main flow, or build a new one?** This is the key decision.
   - *Extend Onboarding 8.0* when your product is part of the standard new-user experience. In practice this means adding your product's intent branch and a few product-specific emails (a demo video, a tip, an activation nudge) to the existing flow. This is usually the right answer for a core product — it keeps everything in one place and benefits from the existing branching and exit logic.
   - *Build a standalone flow* when your audience is distinct (a specific program, a specific behavior) or the messaging doesn't fit the new-user arc. Use an event trigger for "when X happens" and a segment trigger for "everyone who is X."

4. **Build the segments you need.** Typically an intent segment (to find interested people), an activation segment (to know who succeeded — often already built as part of step 1), and any audience segment specific to your launch.

5. **Wire up the flow.** Choose the trigger, add entry filters to exclude who shouldn't be there, set delays and send windows, add branches if you're routing by intent or behavior, set the conversion goal and exit-on-conversion, pick the subscription topic, and keep message limits on.

6. **Test, draft, and launch.** Preview and test-send every message, sanity-check the branching, then move it from draft to live.

7. **Measure against activation.** Once it's running, watch conversion to your activation goal — that's the number that tells you whether the flow is doing its job.

## This is a starting point, not a cage

Everything above describes the patterns we've converged on because they work — but they're conventions, not rules carved in stone. New launches frequently need something the existing structure doesn't quite cover, and building that is fine and expected. The point of documenting the architecture is so you know what you're building *with* and *around*, not to stop you building.

If you're planning anything substantial — a new flow, a big change to the main onboarding campaign, or a launch that doesn't fit the patterns here — talk to <TeamMember name="Joe Martin" photo /> first. He can point you at prior art, sanity-check the approach, and help you avoid the sharp edges.
