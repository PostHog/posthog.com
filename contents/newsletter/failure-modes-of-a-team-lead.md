---
title: Failure modes of an engineering team lead 
date: 2025-06-18
author:
  - lior-neu-ner
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/cec9bd6f50e59b2250958054823e5ce7_c967d62274.jpg
featuredImageType: full
tags:
  - Product engineers
  - Culture
crosspost:
  - Founders
  - Blog
---

![](https://res.cloudinary.com/dmukukwp6/image/upload/cec9bd6f50e59b2250958054823e5ce7_c967d62274.jpg)

Subheading for email: "and how to avoid them."
/////

Being a team lead is a strange job. You still code, but now the team's success is your responsibility too. It's two full-time jobs.

And here's the tricky part: it's easy to slip into habits that slow your team down, kill motivation, and stall progress.

Below are the failure modes we've seen our team leads fall into and how to avoid them. They're written for senior engineers, tech leads, staff engineers, EMs – basically anyone guiding a team, whether it's in their job title or not.

{POLL}

## 1. You're always the bottleneck

![](https://media.licdn.com/dms/image/v2/D5610AQFPrI1pRqqgFA/image-shrink_800/image-shrink_800/0/1728154838097?e=2147483647&v=beta&t=H6AEd1utCpJBY8lhwhljSyUBW1LVO98uFZaCErRsJx4)
<Caption>Source: [New Yorker](https://www.newyorker.com/cartoon/a28298)</Caption>

### Symptom

You insert yourself into every decision, review every PR, and plan every ticket. Shipping grinds to a halt as everyone waits for your decisions.

### Why it happens

In an effort to keep quality high and make the right calls, you start acting more like a PM than an engineer. It's the easiest way to feel in control. Unfortunately, it also turns you into the bottleneck.

### How to fix it

Dont treat engineers like children. They're capable of [making great product decisions](/newsletter/product-management-is-broken#2-engineers-make-product-decisions) and owning their success. Here are a few ways to empower them to do that:

- **Work transparently in public Slack channels and shared docs.** It gives your team the visibility and context they need to make smart, independent decisions.
- **Push decisions down.** When someone asks, "Should we do X or Y?"" reply with, "What do you think and why?". Ship their answer if it's 80% as good as yours.
- **Don't be the sole point of communication between your team and others.** Instead, connect the right people together. Act as a bridge, not a gate.
- **Define outcomes for your team, not tasks.** How they get there is up to them.
  
> 🏆 **You'll know you're successful if:** You can disappear for two weeks without affecting the quality and frequency of releases.

## 2. You stopped writing code

### Symptom

Slack is your new IDE and your calendar is a tetris game of stand-ups, retros, and quick syncs. Your GitHub graph looks like an empty game of minesweeper.

### Why it happens

Meetings are the easiest way for you to keep an eye on things, so now you only manage the work instead of actually doing it. 

Another factor is ego: all those invites make you feel important. They create an illusion of productivity, and nobody pings you afterward asking what you actually got done. Before you know it, you're stuck in a doom loop: more meetings → fewer commits → coding skills fade → meetings feel safer → repeat.

![](https://res.cloudinary.com/dmukukwp6/image/upload/doomloo_b8a8302df4.png)

### How to fix it

Aim for 80‑90 % of your week in the codebase. Kill the meetings and [work asynchronously](https://posthog.com/newsletter/how-we-work-async). Here's how:

- Add at least two no-meeting days in your team's calendar.
- Batch 1-1s, skip a cycle, or consider skipping them altogether.
- Replace daily stand-ups with async updates in Slack.
- Record Loom walk-throughs instead of live demos.
- Default to written RFCs instead of meetings. Give teammates 24-48 hours to comment, then merge the doc and treat it as a source of truth.

> 🏆 **You'll know you're successful if:** Your team genuinely look up to you. Respect is earned in pull requests far faster than in meetings.

## 3. You're scared of changing goals

### Symptom

Mid-quarter you discover growth is flat and churn is increasing, but you move ahead with what's on the roadmap. By the time the quarter ends, the team has delivered everything except real impact.

### Why it happens

You're scared of rocking the boat or fear looking like a failure if you change goals. It's easier to keep moving than to admit you're going in the wrong direction.

### How to fix it

Add a regular feedback loop to evaluate your team's progress. At PostHog, we do [monthly growth reviews](https://posthog.com/newsletter/product-management-is-broken#b-product-managers-run-monthly-growth-reviews):

First, we gather all available data – revenue metrics, product analytics, user feedback, etc. Then, the team meets once a month to discuss hard questions like:

- Are our 10 biggest customers happy users of the product?
- Where is churn spiking and why?
- Are new releases shifting core metrics or just vanity stats?
- What surprised us in user interviews?
- Where are users struggling?

This paints a full picture of how the product and team are doing. Then it's up to you to decide if the team shound continue on their course or if something needs to change.

> 🏆 **You'll know you're successful if:** Your reviews end with projects being removed from the roadmap because the data showed better opportunities. At the end of the quarter, your core metrics are higher than ever.

## 4. You don't keep the talent bar high 

### Symptom

The same bugs and sloppy PRs keep reappearing from the same people, yet no one seems surprised.

### Why it happens

You're scared of giving [hard feedback](/newsletter/how-to-give-feedback), so mediocrity coasts by unchecked. Gradually, your expectations lower and buggy code becomes the standard. Before you know it, you're fighting the same bugs every week instead of making real progress.

### How to fix it

Run the [Keeper Test](https://posthog.com/handbook/company/management#the-keeper-test) quarterly: "If this person resigned today, would I fight to keep them?". 

Dig into where the answer is "no" and ask yourself what would it take for it to be a "yes".  Be honest about what’s missing: is it skill, mindset, ownership, or impact? Then, address it immediately through coaching, clearer expectations, or, when necessary, parting ways. 

> 🏆 **You'll know you're successful if:** Your team has a strong reputation for delivering results, and it's the one everyone wants to join.

> **📝 Side note:** anyone can ask their team lead "how hard would you work to change my mind if I were thinking of leaving?". It's a great way to solicit valuable feedback.

## 5. You're always the hero

### Symptom

You personally fill in every gap, put out every fire, and jump in whenever the team hesitates, all while juggling your regular work. Your day starts way before breakfast and ends late into the night. You're exhausted and slowly burning out.

### Why it happens

When your team isn't yet confident or experienced enough, handling things yourself feels like the fastest way to get things done. But over time, it teaches your team to escalate rather than solve. What saved time in the short term starts costing you in the long run.

### How to fix it 

- **Pair once, then step back.** The next time something gnarly comes up, co-solve for an hour with the right person, then step back. Next time, they own it.
- **Document as you go.** Treat every hero moment as an opportunity write a short run-book or doc.
- **Upskill with micro-talks.** Ask people who've just mastered something to give a 5-minute lightning talk in the next team meeting.
- **Hire for constraints.** When you realise the work no longer matches anyone's strengths, treat it as a signal that you need to bring on a new person to the team.

> 🏆 **You'll know you're successful if:** you're no longer the first name that pops up when something breaks, and the fix is merged before you even open Slack.