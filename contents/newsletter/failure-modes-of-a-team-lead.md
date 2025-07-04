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

---
Maybe we need a section here on what a team lead is or is responsible for
--

## 1. Bottleneck syndrome

### Symptom

You attend every meeting, forward every message, approve every PR, and personally decide whether each ticket ships this sprint or the next. Your calendar is full, your CI pipeline is not. Eventually shipping slows as everyone waits for your decisions.

OR 

You’re the API for every decision: DMs flow in, PRs queue up under your name, and nothing ships until you nod. Your calendar is full; your deploy log is empty.



### Why it happens

In an effort to save everyone time and "protect engineers so they can focus", you start acting like a PM instead of an engineer. It's the easiest way to feel in control. Unfortunately, it also turns you into the single point of failure. Good ideas die in your Slack DMs because engineers don't feel empowered to ownership.

OR 

Protecting engineers feels noble, so you start “shielding” them from meetings, PM pings, and context-setting. In reality, you’ve turned yourself into the single point of failure: ideas stall in your inbox, engineers stop making calls, and momentum leaks away.



### How to fix it

Let your engineers feel empowered to make decisions and take ownership of their feature's success. Here are a few way to do that:


- **Let your [engineers own the product decisions](/newsletter/product-management-is-broken#2-engineers-make-product-decisions)**
- **Push decisions down.** When someone asks, "Should we do X or Y?"" reply with, "What do you think and why?"" then ship *their* answer if it’s 80% as good as yours.
- **Ensure everyone has access to best information to make good decisions.** Write public RFCs, living docs, record quick Looms (?).
- **Engineers talk directly to PMs, designers, and customers.**  Be connective tissue, not a gate.
- **Don't the sole point of communication between your team and others.** Instead, connect the right people together. Be connective tissue, not a gate.
- **Let engineers own the outcomes of their work** and offer support when needed.

OR

Push authority to the edges. When asked “X or Y?”, reply “What do you think—and why?” If their answer is 80 % as good as yours, ship it.

Expose all the context. Default to public Slack channels, lightweight RFC docs, and Looms. Information that’s open can’t bottleneck.

Skip-level conversations. Engineers talk directly to PMs, designers, and users. You’re the connective tissue, not the gate.

Define outcomes, not tickets. Own the what (“launch error-free self-serve onboarding”)—let the team own the how.




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

## 5. Hero mode

### Symptom
 
You triage support, write specs, code features, review PRs, and analyze data. There's never enough time in a day and you're slowly burning yourself out.

You triage support, write specs, code features, review PRs, and analyse data. Your GitHub heat-map is 🔥, but your evenings are toast and nobody else touches the scary parts of the codebase.

### Why it happens

You confuse being responsible with doing it yourself. Spoiler: that doesn’t scale.

Short-term speed feels great. Shipping tonight is satisfying; mentoring someone to ship next week feels slow.

Unclear ownership. If nobody is clearly on the hook, you default to “DRI-of-everything.”

Fear of dropped balls. You’d rather juggle eight tasks yourself than risk someone else missing one.

Ego in disguise. It’s flattering to be the fixer—until you realise you’re quietly training the team to depend on you.

### How to fix it 

6. Ruthlessly prioritise your and your teams wok. If it wont move the needle, dont do it
Start each week with a top-three list that actually moves the needle. If something new pops up, ask: “Does this beat one of my three?” If not, it waits or gets reassigned. Publish the list in public Slack so everyone sees why you’re saying no—transparency turns “ruthless” into “reasonable.”

1. Give away the outcome, not just the task.
Pick a Directly Responsible Individual for every project—even when you could finish it faster yourself. They own the metrics, the demo, and the post-launch cleanup. Your job is context and unblockers on demand, not by default. When engineers feel the win (or the burn) themselves, they’ll pull you in only when they genuinely need help.

2. Map your skills gaps, then fill them early.
Write down the abilities next quarter’s roadmap truly needs—analytics chops, DX polish, user-research finesse, whatever. Colour anything you personally cover in grey, then circle the reds. Hire or contract for those reds before they turn into late-night heroics.

3. Practice the “Best-Person” reflex.
When a juicy ticket appears, pause. Ask “Who is the closest good fit today?” and route it there. If no one quite fits, pair once—then back away. The goal is to create new experts, not reinforce the single existing one.

4. Schedule help instead of streaming it.
Block two one-hour office-hour slots per week. Teammates bring gnarly bugs or architecture questions then; outside that window, Slack pings can wait. You stay helpful without playing 24/7 whack-a-mole.

5. Default to “no” unless it’s uniquely yours.
Every inbound request gets one of three fates: delegate (“Beth can own this”), defer (park it with a follow-up date), or delete (politely out of scope). A personal “yes” should be rare and intentional.


Delegate decision‑making with the context and authority to act.

Bring in missing skills early — PM, designer, data analyst, whatever unblocks users.

REcognize when your skills arent a good match for a task

Learn to say no

Learn to say “no” (or “not me”).

Fill the skills gap by hiring the right people e.g. davids story with a pm

Commit to outcomes, not tasks. Your job is ensuring the feature ships, not necessarily shipping it yourself.

Use a decision rubric: If the task is (a) outside your core strength and (b) teachable to someone else, decline and redirect.

Offer a trade: “I’ll pair for an hour now so you can own it end-to-end.” If someone is not able to do it, offer to get them started and discuss for an hour or so

Start new hires on fast‑win tasks so they build momentum and confidence.

Defining the outcome, not the path. Let the team own their work, and it's success. Offer to support them when they needed

you're responsible for the performance of the team and making sure things are getting, not necessarily doing it all yourself

David's failure mode on not reaching out for a PM/ Was hard to dig into onboarding and activation metrics but didn't have time to dig into the data and why (speaking to customers etc), ultimately affecting growth of the product.

Feeling like you have to know all the answers . Your responible for making sure the team is making progress and getting answers, but you dont do it all yourself


Write a “Not-Me” list. Document the tasks only you can do today, then work to delete items from the list by writing run-books or pairing.

Default to pairing. When an urgent ticket pings, pull in the teammate who almost has the context and solve it together. Next time, they fly solo.

Publicly celebrate hand-offs. Call out the first time someone else ships code in your once-sacred subsystem.

Track team velocity, not your own. If your personal commit count drops while team throughput rises, that’s a win.

Set sustainable guard-rails. “I’ll handle incidents out-of-hours this quarter while we hire an on-call rotation” beats “I guess I’m the on-call rotation”.

---