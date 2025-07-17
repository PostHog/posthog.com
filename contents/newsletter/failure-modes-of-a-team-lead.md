---
title: Failure modes of an engineering team lead 
# alt: 7 Failure modes an engineering team lead
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

Leading an engineering team is a strange job. You're still expected to ship code and suddenly you have a second full‑time job: unblocking everyone else. It's easy to slip into bad habits that slow your team down, sap motivation, and ultimately hurt the product.

Below are the failure modes we've seen our team leads fall into and how to avoid them. They're written for anyone who leads engineering teams of any size – not just formal managers or senior ICs wearing the "tech lead" hat.

{POLL}

## 1. You're always the bottleneck

![](https://media.licdn.com/dms/image/v2/D5610AQFPrI1pRqqgFA/image-shrink_800/image-shrink_800/0/1728154838097?e=2147483647&v=beta&t=H6AEd1utCpJBY8lhwhljSyUBW1LVO98uFZaCErRsJx4)
<Caption>Source: source of image</Caption>

### Symptom

You attend every meeting, forward every message, approve every PR, and personally decide whether each ticket ships this sprint or the next. Your calendar is full, your CI pipeline is not. Eventually shipping slows as everyone waits for your decisions.

### Why it happens

In an effort to save everyone time and "protect engineers so they can focus", you start acting like a PM instead of an engineer. It's the easiest way to feel in control. Unfortunately, it also turns you into the single point of failure. Good ideas die in your Slack DMs because engineers don't feel empowered to take ownership.

### How to fix it

You don't need to treat engineers like children. They're capable of [making great product decisions](/newsletter/product-management-is-broken#2-engineers-make-product-decisions) and own their features' success. Here are a few ways to empower them to do that:

- **Ensure everyone has access to best information to make good decisions.** Expose all context to public channels by default. PMs should provide them with insights from analytics, user interviews, and competitor research. 
- **Push decisions down.** When someone asks, "Should we do X or Y?"" reply with, "What do you think and why?". Ship their answer if it's 80% as good as yours.
- **Don't be the sole point of communication between your team and others.** Instead, connect the right people together. Be connective tissue, not a gate.
- **Define outcomes for your team, not tickets.** Let the team decide how they'll achieve them.
  
> 🏆 **You'll know you're successful if:** You can disappear for two weeks without affecting the quality and frequency of releases.

## 2. You stopped writing code

### Symptom

Slack is your new IDE and your calendar is a tetris board of stand-ups, retros, and "quick syncs". Your GitHub graph looks like a blank game of minesweeper.

### Why it happens

Leadership feels like a new role, so you abandon the old one. Meetings are the easiest way for you to keep an eye on things, so now you only have time to manage the work instead of actually doing it. 

Another factor is ego: all those invites make you feel important. Meetings create an illusion of productivity, and nobody pings you afterward asking why you didn't commit today. Repetition cements the habit: more meetings → fewer commits → you feel rusty → meetings feel safer → repeat.

> Image idea: Turn this into an image:  more meetings → fewer commits → you feel rusty → meetings feel safer → repeat.
> Caption: The tech lead doom loop

### How to fix it

Aim for 80‑90 % of your week in the codebase. Kill the meetings and [work asynchronusly](https://posthog.com/newsletter/how-we-work-async):

- Add at least two no-meeting days in your team's calendar.
- Batch 1-1s or skip a cycle. They exist to support your team, not surveil them. If a teammate is in flow, trade today's chat for an open-ended "ping me any time".
- Replace daily stand-ups with async updates in Slack.
- Ship Loom walk-throughs instead of live demos.
- Default to written RFCs for any change bigger than a PR. Give teammates 24 hours to comment, then merge the doc and treat it as a source of truth.

> 🏆 **You'll know you're successful if:** Your team geunienly look up to you. Respect is earned in pull requests far faster than in meetings.

## 3. You're scared of changing goals

### Symptom

Mid-quarter you discover customers aren't using Feature X, but you ship the next phase anyway because it's on the roadmap. By the time the quarter ends, the team has delivered everything except impact.

### Why it happens

Plans feel like commitments. You fear looking indecisive or a failure if you change them. You forget the job of the team lead is to ensure the team is delivering impact, not just code.

### How to fix it

Add a regular feedback loop to evaluate your progress. At PostHog, we do [monthly growth reviews](https://posthog.com/newsletter/product-management-is-broken#b-product-managers-run-monthly-growth-reviews):

First, we gather all available data, such as revenue metrics, product usage, and user feedback from interviews and surveys. Then, the team meets once a month to discuss hard questions like:

- Are our 10 biggest customers happy users of the product?
- Where is churn spiking and why?
- Are new releases shifting core metrics or just vanity stats?
- What surprised us in user interviews?
- Where are users struggling?

This paints a full picture of how the product and team are doing. It's then up to you to decide if the team shound continue on their course or if something needs to change.

> 🏆 **You'll know you're successful if:** Your reviews end with projects being removed from the roadmap because the data showed better opportunities. At the end of the quarter, your north-star metric is higher than ever.

## 4. You don't keep the talent bar high 

### Symptom

The same bugs and sloppy PRs keep reappearing from the same people, yet no one seems surprised.

### Why it happens

You're scared of giving [hard feedback](/newsletter/how-to-give-feedback), so mediocrity coasts by unchecked. Gradually, your expectations blur and buggy code feels "good enough". Before you know it, you're firefighting the same bugs every sprint instead of shipping new value.

### How to fix it

Great teams stay great by keeping the bar high. Run the Keeper Test quarterly: "If this person resigned today, would I fight to keep them". Dig in where the answer is "no" and ask yourself what would it take for this to be a "yes"? 

Is it just temporary, or is there a deeper issue to resolve? If not, do something today: coaching, clearer expectations, or, when necessary, parting ways. 

Side note: anyone can ask their manager or tech lead "how hard would you work to change my mind if I were thinking of leaving?"". It's a great way to solicit valuable feedback.

> 🏆 **You'll know you're successful if:** Every Keeper Test answer is a confident "yes" and repeat-bug tickets have vanished from the board.

## 5. You're always the hero

### Symptom
 
You do it all yourself: write specs, code features, review PRs, analyze data, talk to customers, and more. There's never enough time in a day and you're slowly burning yourself out.

### Why it happens

Your team is missing key skills sets such as codebase knowledge, data analysis, or UX taste. Since you're the team lead, it falls on your plate. It feels faster (and safer) to just do it all yourself.

### How to fix it 

- **Pair once, then step back.** When a nasty ticket lands, co-solve the first hour with the nearest good fit, then exit. Next time, they fly solo and a new expert is born.
- **Document as you go.** Treat every hero moment as an opportunity write a short run-book or Loom. Next time the incident shows up, your teammates have the map.
- **Upskill with micro-talks.** Ask team members who've just mastered something (e.g., feature flags, query optimisation) to give a 5-minute lightning talk in the next sprint retro.
- **Hire for constraints.** When you realise the work no longer matches anyone's strengths treat it as a signal that you need to bring on a new person to the team and not a personal challenge to learn something new.

> 🏆 **You'll know you're successful if:** you're no longer the first name that pops up when something breaks, and the fix is merged before you even open Slack.
