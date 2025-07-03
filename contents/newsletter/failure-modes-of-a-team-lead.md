---
title: Failure modes of an engineering team lead 
# alt: 7 Failure modes an engineering team lead
date: 2025-06-18
author:
  - lior-neu-ner
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/job_interview_questions_35bb07c898.jpg
featuredImageType: full
tags:
  - Product engineers
  - Culture
crosspost:
  - Founders
  - Blog
---
Subheading for email: "and how to avoid them."

Cover image: Hedge version of this  
![](https://res.cloudinary.com/dmukukwp6/image/upload/cec9bd6f50e59b2250958054823e5ce7_c967d62274.jpg)


# intro

Leading an engineering team is a strange job. You're still expected to ship code and suddenly you have a second full‑time job: unblocking everyone else and owning the success of your product. It's easy to slip into bad habits that slow your team down, sap motivation, and ultimately hurt the product.

Below are the failure modes we've seen our team leads fall and how to avoid them. They're written for anyone who leads engineering teams of any size, and not just formal manager or senior IC wearing the “tech lead” hat.

## 1. Bottleneck syndrome

### Symptom


You attend every meeting, forward every message, approve every PR, and personally decide whether ticket ENG‑12345 ships today or next sprint. Your calendar is full; your CI pipeline is not.

### Why it happens

Hoarding context feels efficient ("I'll save everyone time!") until you’re out‑of‑office and nothing moves.  You became the single point of failure.

In an effort to “protect engineers so they can focus,” you start acting like a traditional PM: filtering every request, sanitizing the truth, and divvying out work. It’s the same broken pattern we called out in Product‑management‑is‑broken: gatekeepers slow shipping and starve the team of context.

Why it happens
We hoard context because it’s the easiest way to feel in control. Unfortunately, it also turns us into single‑threaded CPUs.

Hoarded context doesn’t compound. It decays. Decisions queue behind you, cycle times balloon and the team loses ownership.

What gets lost
Engineers receive half-baked specs instead of raw user feedback.

Smart ideas die in your Slack DMs because nobody else sees the problem.

Decision-making bottlenecks on your availability, not the team’s talent.

Engineers receive half‑baked specs instead of raw user feedback.

Smart ideas die in your Slack DMs because nobody else sees the problem.

Decision‑making bottlenecks on your availability, not the team’s talent.

Why it happens – the “mini-PM” trap
In an effort to “protect engineers so they can focus,” you slip into product-manager mode: filtering every request, sanitizing the truth, and divvying out work. Unfortunately, a single gatekeeper slows shipping and starves the team of context.

### How to fix it

- Push context outwards: write public RFCs, living docs, record quick Looms (?).
- **Push decisions down.** When someone asks, “Should we do X or Y?” reply with, “What do you think and why?” then ship *their* answer if it’s ≥ 80 % as good as yours.
- Let engineers talk directly to PMs, designers, and customers.  Be connective tissue, not a gate.
1. **Make yourself replaceable.** A good week is one where you can disappear for a few weeks and nothing stalls.
- **Let engineers own outcomes, and hold them accountable if they slip up** 
- 
> TODO: At PostHog every engineer gets 30 support tickets in their first week.  Context isn’t a perk; it’s onboarding.

> Litmus test: Can you disappear for a week without affecting the release schedule?If not, start delegating today.

Bits on hoarding context and acting like the teams gatekeeper/router. Bring the context to your team

Maybe some overlap from the PM newsletter section 1 on not controlling engineers - https://posthog.com/newsletter/product-management-is-broken#1-pms-dont-control-engineers

Dont try become the sole point of communication between your team and others. Instead, connect the right people together directly.

Dont be be the only person on your team who talks to customers. Instead, encourage everyone to do this - this starts at onboarding!

Tell-tale sign is that you're the final decision maker / everyone looks to much to your for guidance 
Acting like a manager or sole decision-maker is a red flag.
Best ideas often come from all team members, not just the lead.
A lead being the bottleneck or central figure can slow down progress.

Maybe: something on making sure you're replacable


## 2. You stopped writing code

hedgehog version of this - https://media.licdn.com/dms/image/v2/D5610AQFPrI1pRqqgFA/image-shrink_800/image-shrink_800/0/1728154838097?e=2147483647&v=beta&t=H6AEd1utCpJBY8lhwhljSyUBW1LVO98uFZaCErRsJx4 
<caption>Source: source of image</caption>

Coding should still be ~80-90% of your time. Leadership is an overlay, not a new job description. Your job isn't to run meetings and manage sprints

Prioritize shipping and impact over unnecessary meta-work. (maybe this is a separate point)

Slack is not your IDE

## Symptom

Slack is your new IDE and your calendar is a tetris board of stand-ups, retros, and “quick syncs”. Your GitHub graph looks like a blank game of minesweeper.

## Why it happens

Leadership feels like a new role, so you abandon the old one.  Now you manage the work instead of doing the work

The moment “lead” appears in your title, you get flooded with expectations that look managerial: run the sprint, mentor the junior, fly the roadmap slides. Because those activities have fixed meeting slots—and writing code doesn’t—you let the calendar drive your priorities. Soon you’re performing “lead as role replacement” instead of “lead as overlay.”

A quieter force is ego: those invites feel important. Meetings create an illusion of productivity, and nobody pings you afterward asking why you didn’t commit today. Repetition cements the habit: more meetings → fewer commits → you feel rusty → meetings feel safer → repeat.

## How to fix it

Block two maker mornings per week — headphones on, code shipping.

Aim for 80‑90 % of your week in the codebase.  The rest is an overlay, not a promotion.

Lead by merge request: nothing teaches taste like shipping production paths yourself. Respect is earned in pull requests far faster than in meetings.

---

Fix – reclaim maker time
Automate or delete rituals. Async status updates beat daily stand-ups; a Loom recording can replace most demos.

Batch 1-1s or skip a cycle. They exist to support reports, not surveil them. If a teammate is cruising, trade today’s chat for an open-ended “ping me any time.”

Block “no-meeting” chunks. Two four-hour stretches of uninterrupted coding each week outperform ten scattered 30-minute windows.

Ship something small every week. A doc tweak, a metrics alert, a one-line bug fix—anything that lands in main keeps your technical instinct sharp and your credibility high.

Delegate meta-work, or drop it altogether (remember meta work is not work). Let another engineer run the retro, or rotate sprint-lead duty. Leadership is an overlay, not a replacement, for building.



## 3. You focus on made up metrics

You forget about the _real_ goal

The real goal isn't activation rates, sign up rates, funnels, etc. Its revenue (and usage and quality?)

Success looks like usages from real users who are actually getting value from your product
 
maybe Something on the cause being you dont lean into understanding your product and what you're building enough. Not engaging deeply with the product: A lead must genuinely understand and care about the product. Without that, it's easy to lose focus or chase abstract, low-impact problems.

Your goal is a team lead is to align your team as much as possible on these goals

Maybe a bit on not focusing on fancy architecture and how every decision you make should be aligned with improving your users value. E.g. increasing your code speed 10% is not something they would notice.

Your resposibilty is to make sure your team hits the goal and produces output

## Symptom

You high-five the team for a 4 % bump in “mobile-invited-workspace activation” while MRR is flat and churn is quietly climbing. The dashboard is greener; the bank account isn’t.



You celebrate a 4 % bump in activation conversion of invited workspaces created on mobile even though revenue is flat and retention is sliding. Metrics are great until they camouflage the only metric that matters: revenue from delighted users.

* Revenue (or at least usage that eventually drives revenue) is the only metric your CFO cannot ignore.  

You ring the victory gong because the “invite-to-workspace-on-mobile” funnel jumped from 2.3 % to 2.4 %, yet real users are still slipping away and ARR hasn’t moved a penny. You’re singing along to the dashboard—but the audience left the venue.



## Why it happens

Numbers are comforting and make it easy to justify your work. Even if you Pick the wrong ones  you still feel productive.

## How to fix it

* Revenue (or at least usage that eventually drives revenue) is the only metric your CFO cannot ignore.  

Track the metrics your CFO cares about: revenue, usage depth, NPS, LTV/CAC.

Ask “will a user notice?” before optimising anything.  A 10 % speed bump on a screen nobody uses is math, not impact.

Review metrics in weekly growth reviews and kill any that don’t change decisions.

Sit in on one user call per week. No spreadsheet beats the sound of a frustrated click. No chart beats hearing a frustrated click or a delighted “wow.”

Align every backlog item with a genuine user outcome. If you can’t draw a line from the work to usage, retention, or revenue, question the work, not the metric.

Metrics are a compass, not a security blanket. Measure what moves the business, then build until the compass swings.

Before green-lighting work, explain—in plain English—how a real human benefits. If you can’t, kill the ticket or re-scope it.

## 4. You're scared of changing goals

## Symptom

The quarter’s plan lives in a lovely Miro board.  Six weeks in, customer interviews scream for a new integration — but the roadmap is locked, so you soldier on.

Your quarterly plan is laminated—literally or metaphorically. Mid-sprint you discover customers aren’t using Feature X, but you ship the “Phase 2 enhancements” anyway because it’s on the roadmap. **By the time the quarter ends, the team has delivered everything except impact.**

## Why it happens

Plans feel like commitments.  You fear looking indecisive or a failure if you change them.  IN reality The longer you wait to edit them, the more sunk-cost regret you accrue.

Fear of looking fickle. Changing course sounds like admitting you were wrong.

No structured feedback loop. Without a recurring forum to inspect reality, the only checkpoint is “end of quarter”—far too late.


## How to fix it

As lead, you’re not paid to deliver story points or hit a deadline-shaped KPI.
You’re paid to create impact—revenue, retention, and delight for real customers—and to hold the team (and yourself) publicly accountable for that impact.

Fix

Convert roadmaps into hypotheses.  Every milestone starts with “We believe that…”.

Run fortnightly growth reviews.  If the data disproves the hypothesis, pivot.

- **Run a growth review every 4 weeks.** The lead (or a PM partner) assembles one lightweight doc: • Revenue & adoption graphs • Key product-usage funnels • NPS / support themes • What we shipped, what changed

Something on how you plan your roadmmap in advance, but never question it until the end of the quarter/half/year. Ultimately your product's success is your responsibility/the buck stops with you, so its up to you to ensure your team is providing value

Instead, use growth reviews for this (can reuse bits from PM newsletter - https://posthog.com/newsletter/product-management-is-broken#4-accountability-through-feedback-loops)

Promote experiments that surprise you—even if they weren’t on the original roadmap.

Ask 5 hard questions:
1. Are our top 10 customers active this month?
2. Where is churn spiking—and why?
3. Did the last release shift a core metric or just vanity stats?
4. What surprised us in user interviews?
5. What is the single riskiest assumption in next month’s backlog?

## 5. You don't keep the talent bar high 

Bits on using the [Keeper Test](https://posthog.com/handbook/company/management#the-keeper-test)

## Symptom

the same bugs, missed estimates, and sloppy PRs keep reappearing from the same people, yet no one seems surprised.

## Why it happens

You're scared of giving hard feedback. So they never improve. Gradually, things start to annoy you.  Good humans are hard to let go.  Plus, firing feels like failure.  


## How to fix it

Great teams stay great by continuously raising the average—not by accumulating warm bodies.

Run the Keeper Test quarterly: “If this person resigned today, would I fight to keep them?” If the answer is “no”, start a plan. Would you fight to keep every engineer if they told you they were leaving? If not, do something today — coaching, clearer expectations, or, when necessary, parting ways. Dig in where the answer is 'no' - what would it take for this to be a 'yes'? Is this just temporary, or is there a deeper issue to resolve?

Side note: anyone can ask their manager 'how hard would you work to change my mind if I were thinking of leaving?'. It's a great way to solicit valuable feedback!

Would you fight to keep every engineer if they told you they were leaving? If not, do something today — coaching, clearer expectations, or, when necessary, parting ways.

start giving hard feedback. Avoid filler words like "uh", be direct, be specific and stop waiting for the right time

## 6. You try to do it all yourself

## Symptom

You triage support, write specs, code features, review PRs, check dashboards, and still wonder why velocity crawls.
You're burning yourself out. Theres not enough time in a day.

## Why it happens

You confuse being responsible with doing it yourself.  Spoiler: that doesn’t scale

## How to fix it 

Delegate decision‑making with the context and authority to act.

Bring in missing skills early — PM, designer, data analyst, whatever unblocks users.

Start new hires on fast‑win tasks so they build momentum and confidence.

Defining the outcome, not the path. Let the team own their work, and it's success. Offer to support them when they needed

you're responsible for the performance of the team and making sure things are getting, not necessarily doing it all yourself

David's failure mode on not reaching out for a PM/ Was hard to dig into onboarding and activation metrics but didn't have time to dig into the data and why (speaking to customers etc), ultimately affecting growth of the product.

Feeling like you have to know all the answers . Your responible for making sure the team is making progress and getting answers, but you dont do it all yourself

----

Things I could include maybe:

Maybe: A point on how team size doesnt matter, small teams etc. (can use bits from magic of small eng teams)


from dylan:
Pasting from notes app (I'm on a plane) so forgive formatting
success stories
Parallelizing subject matter expertise and shipping twice as fast (more credit to team than me)
Start new hires off with easier stuff and let them ramp rather than throw them at the biggest problem they want to tackle.  Helps them grow confidence and get better faster.
Recruiting my friends to join the team
How it started
I was a small team of 1 for about 2 months and I still just wrote down a lot of learnings, updates, and external processes in my channel even though no one was really there.  Great for referencing later
Set up automations etc early when standing up a new team.
Failure modes
imposing too much process early, then not being intentional about process later.  Not so failure as optimizing
Being a knowledge suck and not letting support heroes etc own it.  Too many pings of @dylan and not enough pings of @feature-flags-team.  Let the team shine! 
Insulating folks from annoying processes rather than letting them tell me when it's too much. Shoot straight with the team.
Emblematic
Andy hiring was really good; watching the team come together to groom backlog and plan things and collectively unpack all of our shared knowledge of the product we own was a great exercise. 


---
Symptom

You attend every meeting, forward every message, approve every PR, and personally decide whether ticket ENG‑12345 ships today or next sprint. Your calendar is full; your CI pipeline is not.

Why it happens – the “mini‑PM” trap

What gets lost

Engineers receive half‑baked specs instead of raw user feedback.

Smart ideas die in your Slack DMs because nobody else sees the problem.

Decision‑making bottlenecks on your availability, not the team’s talent.

Fix

Broadcast context, don’t hoard it. Forward the raw customer call recording, link the unfiltered metrics dashboard, cc everyone on the angry‑CEO email.

Let engineers own outcomes. At PostHog, Karl shipped Session Replay by ignoring the roadmap and chasing what users needed—and it changed the company’s trajectory. That autonomy is impossible if every conversation routes through a lead.

Pair the right people directly. Designer ↔︎ backend dev, support hero ↔︎ feature owner. Your job is switchboard operator, not firewall.

Write yourself out of the critical path. Ask: “Could the team ship this feature if I disappeared for two weeks?” If not, fix the documentation or ownership until the answer is yes.

Make yourself replaceable, and you’ll make the team unstoppable.