---
title: Failure modes of an engineering team lead 
# alt: 7 Failure modes an engineering team lead
date: 2025-06-18
author:
  - lior-neu-ner
featuredImage: >-
  ttps://res.cloudinary.com/dmukukwp6/image/upload/cec9bd6f50e59b2250958054823e5ce7_c967d62274.jpg
featuredImageType: full
tags:
  - Product engineers
  - Culture
crosspost:
  - Founders
  - Blog
---
Subheading for email: "and how to avoid them."

Leading an engineering team is a strange job. You're still expected to ship code and suddenly you have a second full‑time job: unblocking everyone else and owning the success of your product. It's easy to slip into bad habits that slow your team down, sap motivation, and ultimately hurt the product.

Below are the failure modes we've seen our team leads fall into and how to avoid them. They're written for anyone who leads engineering teams of any size, and not just formal managers or senior ICs wearing the "tech lead" hat.

{POLL}

## 1. Bottleneck syndrome

### Symptom

You attend every meeting, forward every message, approve every PR, and personally decide whether each ticket ships this sprint or the next. Your calendar is full, your CI pipeline is not. Eventually shipping slows as everyone waits for your decisions.

### Why it happens

In an effort to save everyone time and "protect engineers so they can focus", you start acting like a PM instead of an engineer. It's the easiest way to feel in control. Unfortunately, it also turns you into the single point of failure. Good ideas die in your Slack DMs because engineers don't feel empowered to ownership.

### How to fix it

Let your engineers feel empowered to make decisions and take ownership of their feature's success. Here are a few way to do that:


- **Let your [engineers own the product engineers](/newsletter/product-management-is-broken#2-engineers-make-product-decisions)**
- **Push decisions down.** When someone asks, "Should we do X or Y?"" reply with, "What do you think and why?"" then ship *their* answer if it’s 80 % as good as yours.
- **Ensure everyone has access to best information to make good decisions.** Write public RFCs, living docs, record quick Looms (?).
- **Engineers talk directly to PMs, designers, and customers.**  Be connective tissue, not a gate.
- **Don't the sole point of communication between your team and others.** Instead, connect the right people together. Be connective tissue, not a gate.
- **Let engineers own the outcomes of their work** and offer support when needed.


( Maybe add: Let engineers own outcomes. At PostHog, Karl shipped Session Replay by ignoring the roadmap and chasing what users needed—and it changed the company’s trajectory. That autonomy is impossible if every conversation routes through a lead.)

Then your job becomes to ensure the team is heading in the right direction and shipping the right features, instead of micromanaging every decision.

> 🏆 **You'll know you're successful if:** You can disappear for two weeks without affecting the quality and frequency of the release schedule.

## 2. You stopped writing code

hedgehog version of this - https://media.licdn.com/dms/image/v2/D5610AQFPrI1pRqqgFA/image-shrink_800/image-shrink_800/0/1728154838097?e=2147483647&v=beta&t=H6AEd1utCpJBY8lhwhljSyUBW1LVO98uFZaCErRsJx4 
<caption>Source: source of image</caption>

Coding should still be ~80-90% of your time. Leadership is an overlay, not a new job description. Your job isn't to run meetings and manage sprints

Prioritize shipping and impact over unnecessary meta-work. (maybe this is a separate point)

### Symptom

Slack is your new IDE and your calendar is a tetris board of stand-ups, retros, and "quick syncs". Your GitHub graph looks like a blank game of minesweeper.

### Why it happens

Leadership feels like a new role, so you abandon the old one. Meetings are the easiest way for you to keep an eye on things, so now you only have time to manage the work instead of actually doing it.

A quieter force is ego – those invites feel important. Meetings create an illusion of productivity, and nobody pings you afterward asking why you didn't commit today. Repetition cements the habit: more meetings → fewer commits → you feel rusty → meetings feel safer → repeat.

> Image idea: Repetition cements the habit: more meetings → fewer commits → you feel rusty → meetings feel safer → repeat.
> Caption: The tech lead doom loop

### How to fix it

Kill the meetings and [work asynchronusly](https://posthog.com/newsletter/how-we-work-async):

- Add at least two no-meeting days in your team's calendar.
- Batch 1-1s or skip a cycle. They exist to support your team, not surveil them. If a teammate is cruising, trade today's chat for an open-ended "ping me any time."
- Aim for 80‑90 % of your week in the codebase.
- Move Async status updates beat daily stand-ups. A Loom recording can replace most demos.
- Work transparently by writing public RFCs, living docs, record quick Looms and share everything in public channels. 
- Avoid working in private group chats or DMs so that context is always shared with the team.
- What other tips?

> 🏆 **You'll know you're successful if:** Your team geunienly looks up to you. Respect is earned in pull requests far faster than in meetings.

## 3. You're scared of changing goals

### Symptom

Mid-quarter you discover customers aren't using Feature X, but you ship the next phase anyway because it’s on the roadmap. By the time the quarter ends, the team has delivered everything except impact.

### Why it happens

Plans feel like commitments. You fear looking indecisive or a failure if you change them. You forget the job of the team lead is to ensure the team is delivering impact, not just code.

### How to fix it

Add a regular feedback loop to your progress. At PostHog, we do [monthly growth reviews](https://posthog.com/newsletter/product-management-is-broken#b-product-managers-run-monthly-growth-reviews):

We collect all available data, such as revenue metrics, product usage, and user feedback from interviews and surveys. Then, once a month the team meets to discuss hard questions like:

- Are our 10 biggest customers happy users of the product?
- Where is churn spiking and why?
- Are new releases shifting core metrics or just vanity stats?
- What surprised us in user interviews?
- Where are users struggling?

This paints a full picture of how the team is doing. It's then up to you to decide if the team shound continue on their course or if something needs to change.

Remember, the only failure is xyz.

> 🏆 **You'll know you're successful if:** 

## 4. You don't keep the talent bar high 

Bits on using the [Keeper Test](https://posthog.com/handbook/company/management#the-keeper-test)

### Symptom

The same bugs and sloppy PRs keep reappearing from the same people, yet no one seems surprised.

### Why it happens

You're scared of giving [hard feedback](/newsletter/how-to-give-feedback), so they never improve. Gradually, things begin to annoy you and before you know it you...

### How to fix it

Great teams stay great by keeping the bar high. Run the Keeper Test quarterly: "If this person resigned today, would I fight to keep them". Dig in where the answer is "no" and ask yourself what would it take for this to be a "yes"? Is this just temporary, or is there a deeper issue to resolve? If not, do something today: coaching, clearer expectations, or, when necessary, parting ways. 

Side note: anyone can ask their manager or tech lead "how hard would you work to change my mind if I were thinking of leaving?"". It's a great way to solicit valuable feedback.

> 🏆 **You'll know you're successful if:** 

## 4. You focus on made up metrics


### Symptom

You high-five the team for a 4% bump in made-up metrics while MRR is flat and churn is quietly climbing.



You forget about the _real_ goal

The real goal isn't activation rates, sign up rates, funnels, etc. Its revenue (and usage and quality?)

Success looks like usages from real users who are actually getting value from your product
 
maybe Something on the cause being you dont lean into understanding your product and what you're building enough. Not engaging deeply with the product: A lead must genuinely understand and care about the product. Without that, it's easy to lose focus or chase abstract, low-impact problems.

Your goal is a team lead is to align your team as much as possible on these goals

Maybe a bit on not focusing on fancy architecture and how every decision you make should be aligned with improving your users value. E.g. increasing your code speed 10% is not something they would notice.

Your resposibilty is to make sure your team hits the goal and produces output


### Why it happens

Numbers are comforting and make it easy to justify your work. Even if you pick the wrong ones you still feel productive. Metrics are great until they camouflage the only metric that matters: revenue from happy customers.

### How to fix it

* Revenue (or at least usage that eventually drives revenue) is the only metric your CFO cannot ignore.  

Track the metrics your CFO cares about: revenue, usage depth, NPS, LTV/CAC.

Ask “will a user notice?” before optimising anything.  A 10 % speed bump on a screen nobody uses is math, not impact.

Review metrics in weekly growth reviews and kill any that don’t change decisions.

Sit in on one user call per week. No spreadsheet beats the sound of a frustrated click. No chart beats hearing a frustrated click or a delighted “wow.”

Align every backlog item with a genuine user outcome. If you can’t draw a line from the work to usage, retention, or revenue, question the work, not the metric.

Metrics are a compass, not a security blanket. Measure what moves the business, then build until the compass swings.

Before green-lighting work, explain—in plain English—how a real human benefits. If you can’t, kill the ticket or re-scope it.

## 6. You try to do it all yourself

## Symptom
 
You triage support, write specs, code features, review PRs, check dashboards, and still wonder why velocity crawls. There's never enough time in a day and you're slowly burning yourself out.

## Why it happens

You confuse being responsible with doing it yourself. Spoiler: that doesn’t scale

## How to fix it 


Delegate decision‑making with the context and authority to act.

Bring in missing skills early — PM, designer, data analyst, whatever unblocks users.

Start new hires on fast‑win tasks so they build momentum and confidence.

Defining the outcome, not the path. Let the team own their work, and it's success. Offer to support them when they needed

you're responsible for the performance of the team and making sure things are getting, not necessarily doing it all yourself

David's failure mode on not reaching out for a PM/ Was hard to dig into onboarding and activation metrics but didn't have time to dig into the data and why (speaking to customers etc), ultimately affecting growth of the product.

Feeling like you have to know all the answers . Your responible for making sure the team is making progress and getting answers, but you dont do it all yourself

---