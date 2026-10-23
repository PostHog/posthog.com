---
date: "2026-10-19"
title: '"Find issues that frustrate users" (and other things teams ask AI to watch in their product)'
featuredImage: https://res.cloudinary.com/dmukukwp6/image/upload/find_issues_that_frustrate_ece77572e7.png
featuredImageType: full
author:
  - sara-miteva
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
category: Using PostHog
tags:
  - Product updates
  - AI
  - Replay Vision
  - Session replay
seo:
  metaTitle: '"Find issues that frustrate users" (and other things teams ask AI to watch in their product)'
  metaDescription: "What 20,097 Replay Vision scanners across 9,488 organizations were told to look for, the exact prompts people wrote, and where to point your first scanner."
---

It's been over two months since [we launched Replay Vision](/blog/replay-vision), our AI layer that watches batch session recordings and reports on them, so it's time to check the data: What are people actually doing with it? Apparently, a lot of things are broken, and there's a lot of rage everywhere.

Replay Vision points scanners at your session recordings, and then summarizes the findings. A [scanner](/docs/replay-vision/scanner-types) is a standing instruction for Replay Vision. You write what to look for, pick what you want back (a flag, a 1-5 score, a tag, or a written summary), and set filters for which recordings it watches. It checks new sessions every few minutes and returns observations, each one citing the moment in the recording it came from.

Since the launch on August 3, people have created 20,097 scanners across 9,488 organizations. The percentages below are for scanners where someone wrote their own prompt. Many prompts fit more than one of the four categories, which is why the percentages add up to more than 100. (For authenticity purposes, I haven't fixed the typos. Real people typed these.)

The charts cover scanners created between August 1 and October 7.

## 1. Custom scanners for bug detection (37%)

This use case is music to our team's ears because connecting data from several PostHog products can give you context you can't find anywhere else. Users spot something in [Error Tracking](/error-tracking), then come to Replay Vision to see it happen to a real person.

If you use Error Tracking, this pairing is worth setting up. Error Tracking tells you that an exception fired, how often, and on which release. It can't tell you what the person was doing, whether they noticed, or whether they gave up. A scanner pointed at the same failure can, and it tags those sessions so the next one comes to you.

Bugs are different from friction, which comes up in #3. Friction is "this is confusing," "this is slow," or "this made me give up." Bugs are broken things with a fixable cause.

Some examples include:

- A Shopify seller saw a variant-fetch failure in Error Tracking, then built a matching scanner tagging `variant_fetch_failed`
- A payment modal rendering wrong on iOS Safari (hitting people mid-payment)
- Broken lettering from a translation bug, costing them bookings
- A voice-AI company watching for the AI talking over people, barging in on responses, or cutting learners off mid-sentence

These are some bugs that scanners look for:

![types of bugs that scanners look for](https://res.cloudinary.com/dmukukwp6/image/upload/what_bug_scanners_look_for_updated_115052d788.png)

### Common prompts for bug/error detection

More technical framing than the other categories, and several explicitly reference "bugs" or "error" by name rather than softer language like "friction":

- "Help me find bugs, ux issues and 404"
- "Catch error when click checkout"
- "Look users sessions where our AI failed and user got stuck" (an AI-product company hunting AI-specific failures)
- "Find instances where user experienced friction, submission failure or UI error when interacting with the experiment variant/experience"

These are the scanners people use to catch bugs:

![types of scanners used to catch bugs](https://res.cloudinary.com/dmukukwp6/image/upload/how_bugs_get_hunted_updated_e4e72f397f.png)

## 2. Conversion/drop-off analysis (32%)

This category is mostly about one question: *why don't people pay?*

A scanner can tell you about billing flow errors, like a checkout button not working, or users getting stuck somewhere along the way before they even reach the step where they enter their credit card number.

It can't tell you that people think your product is too expensive, sorry – maybe try [Surveys](/surveys) instead?

Not everything is a payment page, though. Examples:

- a buyer portal people abandon,
- a product an org wants more people to actually use ("I want more adoption and usage out of them"),
- and setup/onboarding: where people hesitate and where they leave.

Prompts vary by industry:

- travel companies watch booking flows,
- food companies watch catering pages,
- job boards watch where people land from Google,
- a fintech watches whether people finish paying an overdue invoice,
- and a Stripe Connect business watches whether merchants finish signing up.

### Common prompts for conversion/drop-off analysis

The words that keep coming back are "onboarding" and "stuck," plus plenty of "why" questions:

Onboarding/signup drop-off (the largest cluster):

- "Find where users get stuck in onboarding" (this near-identical phrase recurs across many unrelated orgs)
- "Categorize the specific stage or feature where users stall or drop off during onboarding"
- "Find people that try to sign up but can't"

Checkout/payment failure:

- "why users abandon checkout"
- "Find sessions where user didn't manage to pay because of an error or UX problem"
- "find session initiated to pay roll by credit card but user get lost"

Broad "why aren't we converting," asked almost like a business question, not a UI spec:

- "I want to understand why are we not converting to paid users"
- "i am trying to understand where a customter getting stuck and why is sales not happening"
- "I want to track our Donation Page layout and get as much data as possible to get insights to improve the conversion of that page"

Landing-page / content-engagement framing tied to conversion:

- "I want you to watch landing page recordings and tell me where people are dropping off"
- "Find where does users spend most time on the page and what is the general patterns for users who convert to reserve"
- "I want to know for people who converted on Mobile how far did they scroll when reaching the holiday page"

Here are the most common flows conversion scanners watch:

![flows monitored by conversion scanners](https://res.cloudinary.com/dmukukwp6/image/upload/which_flows_conversion_scanners_watch_updated_ac0cfa7cc1.png)

## 3. UX friction/rage-click detection (31%)

**UX friction/rage-click detection** shows up in 31% of prompts. It's one of the default scanners and it answers the question: *How frustrating is it to engage with my product? (On a 1-5 scale.)*

This is also the most commonly reused template. Customers gravitate to the built-in Frustration score starting point more than any other.

![setting up a scanner](https://res.cloudinary.com/dmukukwp6/image/upload/set_up_scanner_a60bb170b0.png)

They also set up custom scanners that measure similar metrics, like "Session UX and Friction Summary" or "Sign-in authentication struggle," which measures unresponsive forms, delays in receiving a verification code, or repeated credential attempts.

### Common prompts for UX friction/rage-click detection

"Stuck" comes up again and again:

- "Find sessions where users get stuck on mobile"
- "find sessions where users get stuck on checkout"
- "Find sessions where users get stuck on the `/offer` page"

Frustration/annoyance, named directly:

- "Find issues that frustrate users"
- "find sessions where users get frustrated with the book editor"
- "I need to track annoying popups, mobile ui flaws etc"

Struggle, phrased as a direct question:

- "Understand users struggle in PostHog"
- "find sessions where the user tried to model company scenarios but struggle in doing so"

Some words people use to describe a bad session:

![words to describe a bad session](https://res.cloudinary.com/dmukukwp6/image/upload/how_people_describe_a_bad_session_updated_52e623ee45.png)

## 4. Feature adoption/usage tracking (14%)

*Does anyone use this thing I shipped?* is the main reason people use PostHog.

Most users just ask about usage, but some go a bit deeper, asking *how* people use it, what parts of the page they focus on, interaction types, whether people hit their limits, etc.

In general, these are product-specific questions, so there's little overlap. Still, it's worth skimming for ideas. *"Conversational onboarding completion"* is someone confirming a freshly rolled-out onboarding flow does what it should. *"First login user interaction and confirmation"* walks through five separate steps of inviting someone to a workspace to see where people land. You get the gist.

These are the scanner types people use to monitor feature adoption:

![scanner types used for feature adoption](https://res.cloudinary.com/dmukukwp6/image/upload/scanner_type_chosen_for_measuring_adoption_updated_557d2378d6.png)

### Common prompts for feature adoption/usage tracking

"Does anyone use this thing?" asked in many different ways:

- "I want to know if a feature is used and/or if they stay on it for long"
- "Find occurrences for the new edit settings" (checking adoption of a newly shipped setting)
- "Find sessions when people have used all their videos, and also where they came back" (quota/return-visit tracking)
- "can you identify someone going through the auth flow, then either assign tag `auth-login` or `auth-signup`?"
- "can u tell me what users typically do in my app?" (the broadest, most open-ended version of this category)

Here are the specific feature types people track with Replay Vision:

![features monitored by replay vision scanners](https://res.cloudinary.com/dmukukwp6/image/upload/what_adoption_scanners_actually_track_updated_fd2c5327e2.png)

### Bonus: Does a short prompt actually work?

Yes, as a starting point. Most people never touch their prompt again – 93% of scanners keep the one they started with.

The ones who do go back tend to make it longer, from a median of 117 characters to 139. And it pays off: edited scanners are more likely to still be running a month later (62% vs 44%).

So start short. Give it one sentence, let it run for a day, and read what comes back. Then refine it. Often the fix is in the filters, sometimes it's in the wording. For more on writing scanners that work, see [what we learned from our first 400k Replay Vision scans](/blog/a-scanner-that-watches-everything-sees-nothing).

## Where to start?

One pattern is obvious. Onboarding is the biggest cluster in drop-off, and the same prompt about people getting stuck in it turns up across orgs with nothing in common but that. About 200 organizations, independently, decided that's the part of their product they can't see.

What is your equivalent? Onboarding, signup, and checkout are probably the easiest places to start and the flows where you'll catch the biggest frustrations. [Point a scanner and see what happens.](https://app.posthog.com/replay-vision)
