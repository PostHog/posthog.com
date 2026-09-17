---
title: CSM + TAM rules of engagement
sidebar: Handbook
showTitle: true
---

Some accounts have both a CSM and a TAM. [Account allocation](/handbook/growth/sales/account-allocation) covers why: the [CSM is the base layer](/handbook/growth/sales/account-allocation#csms-are-the-base-layer) on every $20k+ account, and a [TAM is an overlay](/handbook/growth/sales/account-allocation#tams-are-an-overlay) while there's an expansion opportunity worth working. This page is about what the two of you do once you're both on.

Both of you have a relationship with the customer. Both are in the Slack channel. Both know what's going on. The difference is _focus_, not ownership. The customer shouldn't have to work out who to contact: they message either of you, and we sort it out internally.

Scale what follows to the account. A strategic account (our [Top 40](/handbook/growth/sales/account-allocation#top-40-account-management) are the clearest example) with several teams and a renewal coming needs the structure. A smaller account with fewer users probably doesn't.

## What each role focuses on

### tl;dr
 - TAM leads commercial conversations (product adoption, renewals, expansion)
 - CSM leads technical conversations (efficient implementation, product training, support escalation)
 - Meet regularly (every other week or once a month) to agree where each of you is focused and what's next, with a shared account plan documented
 - These roles aren't exclusive. CSMs should be able to speak to product adoption, TAMs to efficient implementation

### CSM

- Operational health and [health score](/handbook/cs-and-onboarding/health-tracking) monitoring
- Support escalation and follow-through
- Credit usage optimization
- Onboarding, training, getting new users set up
- Day-to-day responsiveness
- Health of the technical implementation
- Surface cross-sell signals from product usage and conversations to TAM

### TAM

- Cross-sell strategy and execution
- Credit discount negotiation and deal structuring for new credit purchases, invoicing
- Use case discovery, mapping products to problems
- Multi-threading into new teams and stakeholders
- Account planning (kept current in Customer Analytics)
- Stakeholder management

### Both

- General customer questions (whoever sees it first)
- Implementation reviews
- Retention. TAMs are not off the hook here. Understanding health and usage is a prerequisite for cross-selling, not work that gets delegated.
- Renewal process

<details>
<summary>What good looks like</summary>

- Customer reaches out to either person and gets a fast, informed response. They never think about who to contact.
- Both go deeper on their focus area than either could alone
- Customer knows both people, trusts both, feels like they have a team
- Neither person is surprised by what the other communicated
- Both are visible in Slack, not just when they need something
- Both are aligned on the current state of the customer, risks, opportunities and what their counterpart is working on
- TAM and CSM alignment on the account happens in public, not DMs
</details>

<details>
<summary>What bad looks like</summary>

- Customer gets told "that's not my area, let me get [other person]"
- Customer only hears from the TAM when PostHog wants to sell something
- Customer gets asked "how are things going?" by both people in the same week
- CSM discusses pricing without knowing the TAM had a deal in play
- TAM sends a cross-sell email without knowing the customer filed 3 support tickets yesterday
- Neither person responds because each assumed the other would
- TAM checks out on health because "the CSM handles that now"
- Customer has to explain the same thing twice
</details>

# **Where to expect overlap**

There will be overlap and you'll step on each other's toes. That's by design. The goal isn't a perfect division of work between the two roles, it's to play to your strengths and hit the goals set for the account. Where overlap shows up most:

## Day-to-day questions

Whoever sees it first answers. If one of you has replied and the other has something better to add, chime in anyway. Two helpful answers beats one person holding back because someone got there first.

## Renewals

Renewals sit with both of you, so be specific about who does what.

On accounts with a TAM overlay, the TAM leads the commercial conversation: quotes, accounting for growth and upsells, order forms. The CSM owns the value case behind it: what the customer used, what they got out of it, and where usage is heading.

A competitor showing up before a renewal on a CSM-only account is one of the best reasons to add a TAM. [Competitive renewal](/handbook/growth/sales/account-allocation#competitive-renewal) has the detail. Timing is the thing: start the renewal conversation 3 months out, since adding a TAM 30 days before is too late to shift a competitive evaluation.

## Account health

The CSM owns reading the [health score](/handbook/cs-and-onboarding/health-tracking) and keeping it current, but it isn't the CSM's problem alone. Both of you watching it might feel like duplicated work. It isn't: you're asking different questions of the same numbers.

The score on its own also won't tell you enough. It's weighted to answer one question, "is this account at risk". Product engagement makes up most of it and lags by design, so what you see there usually confirms something rather than warning you. Total product count, a better headroom signal for a TAM, barely counts toward it. And it won't show you a single team going quiet, which is most likely on strategic accounts where several teams use PostHog for different things.

A few tips:

- **Same numbers, different questions.** The CSM asks what's degrading and why. The TAM asks where the [headroom](/handbook/growth/sales/evaluating-growth-potential) is and which teams aren't in the usage yet.
- **Read it together on your regular sync.** Pull the account up and each say what you make of it. Ten minutes of that beats splitting the metrics between you.
- **Say something when a component hits "Poor"**, whoever spots it and whatever it relates to.
- **Watch `#spike-detector`** for your accounts. It flags usage moving sharply either way, and both directions are worth a look: a jump might be a new team or a misconfiguration, a drop might be a team going quiet. Ask your team lead to tag you as owner so you see yours.

## Cost efficiency vs. growth

The CSM's job includes helping a customer spend less. The TAM's job includes growing the account. Sometimes those point in opposite directions.

Efficiency should win. A customer paying for waste has a reason to leave, and a right-sized customer expands better than a resentful one. How to handle it:

- **Surface before you recommend.** If you're about to advise something that changes what the customer spends, say so in the channel first. Your counterpart may have a conversation in flight you can't see.
- **Log the work as you do it**, in the channel and then in the account plan. Usage moves for all sorts of reasons, and a record of what you changed and when turns an unexplained drop into a known optimization.
- **Neither of you wants to hear about it from the customer first.**

## When you disagree

Usually the lists above settle it: whoever's focus area it sits in makes the call. On shared ground, default to whoever is closest to the live conversation, and have them post what they decided and why.

Two things worth keeping to:

- **Work it out in the channel, not in DMs**, so the reasoning is there for whoever picks the account up later.
- **Back your counterpart once they've committed to something** with the customer, and sort the disagreement out internally. A customer is more likely to pursue something you both agree on.

If you're stuck, bring your team leads in early. Both of you care about the customer and want to see them succeed, so it's rarely a disagreement about where you're headed.

# **Kicking off the overlay**

When a TAM joins an account, or a CSM picks up one that already has a TAM, work through this list. Doing it up front saves a first month of each of you guessing what the other already knows. On a strategic account it's worth all of it. On a smaller one, the first few are usually enough.

- [ ] Internal Slack channel created (`#customer-[customer_name]-internal`). Invite your counterpart, both team leads, Ben and Simon. Add the FDE if they're doing active work on the account, and the PostHog Slack bot (`@PostHog`) so you can both dig into the account's data without leaving the channel
- [ ] Your counterpart added to the external Slack channel (`#posthog-[customer_name]`)
- [ ] Whoever has the existing relationship writes a Customer Analytics note dumping the history and current state of the account
- [ ] Whoever is joining posts their own read of the account, plus an action item they're picking up
- [ ] Regular internal sync booked with your counterpart, if you don't already have one
- [ ] TAM creates an account plan note in Customer Analytics once they have a read on priorities
- [ ] Two shared artifacts accessible to everyone: a light org map of users you're actively pursuing or working with, and a running task list. These can live anywhere as long as there's an easy link in the channel: Slack canvas, Customer Analytics note, Google Doc
- [ ] Any important dates (renewal, 6 month discount expiry, projected credit depletion) shared in the internal channel

The internal channel replaces DMs about the account. Working in the open there is a gift to whoever inherits it later. And you both own making sure the other has enough context to be useful.

## Get current on the account

### If you're joining on and your counterpart has the relationship

Gather as much context as you can before jumping in with questions. Share what you find, and let the gaps guide what you ask.

As a CSM, treat it like your standard deep dive when [inheriting an account](/handbook/cs-and-onboarding/getting-started-with-customers), pointed at where you can add value fastest:

- Are there cost optimizations to surface?
- Opportunities to deepen value on products they're already using heavily?
- Implementation issues?

As a TAM, come at it through [use-case selling](/handbook/growth/use-case-selling/use-case-selling). Start from the job they already use PostHog for, then work out what's missing and what sits next to it:

- Which use case are they running today, and how completely?
- Are there gaps a product they don't have yet would close?
- Which adjacent use cases does the wider org care about, and who owns them?

Cross-reference what you find against recent Slack threads and Customer Analytics notes. You want a current read on the account that your counterpart can sense-check.

Go as far as recommending a first action item for yourself. It takes work off your counterpart's plate. Then post in the internal channel with your questions, ideas, and that action item (<PrivateLink url="https://posthog.slack.com/archives/C0B0UD92EG1/p1777424141416129">example</PrivateLink>).

**Your goal**: create value fast, with the right context, while protecting your counterpart's bandwidth. This is an art, not a science. You're co-piloting a ship on a shared mission, but each of you is still responsible for your own controls.

### If you're the one with the relationship

Share whatever's top of mind in the internal channel as a starting point. If there's context a quick call would convey better than the paper trail, do that.

Your counterpart is already gathering context from what's written, so don't be exhaustive. Focus on:

- Key issues or active threads they must know about
- Important relationships or stakeholders
- Implementations in progress or recently completed

Add your counterpart to the external Slack channel (`#posthog-[customer_name]`). Use your judgment on when to introduce them to the wider customer team, and say what you're thinking so you stay aligned on timing.

When you do introduce them, frame it positively: the customer's PostHog team is growing, not that they're being handed off (here’s a solid <PrivateLink url="https://posthog.slack.com/archives/C090RCG671C/p1777565614828089">example</PrivateLink>).

Run the intro past your counterpart first. They'll often spot something that makes it warmer: history with a similar customer, a specialty that lines up with what this one struggles with, experience worth name-checking. A customer who's excited to meet someone starts better than one politely acknowledging a new name.

If you know of low-hanging fruit that would land well, hand it to your counterpart and let them deliver it. It's a cheap way for them to start on a good note, and it's worth more coming from the person who needs to build the relationship.

> **The underlying principle:** The goal is to outdo one another in service. Getting current on the account and elevating relevant context makes you both better experts, which directly improves the quality of your customer-facing work.

# **Staying in sync**

So you're both on the same page, and so there's continuity if someone new takes over the account, a few things are worth keeping in a fixed place:

| What | Where | Why there |
| --- | --- | --- |
| Per-call agenda | Thread in the internal channel | Tied to a date, and notifies you both |
| Who's who at the customer | Org map linked in the channel | One place to look, kept current |
| Open follow-ups and owners | Task list linked in the channel | The current list at a glance |
| Anything a future owner needs | Account plan note in Customer Analytics | Searchable, and outlives the channel |

## Before a call

If you're both joining, start a thread in the internal channel a few days ahead and draft the agenda together: who covers what, who leads which section, and roughly how long each part gets. Sorting that out beforehand instead of live makes for a much better call.

Make sure you both get time to speak. Even when there isn't much for the second person to cover, two voices beat one.

Whoever booked the call is the obvious person to start the thread, but either of you can.

## After a call

Update both docs: add anyone new to the org map, and add a dated section to the task list with the follow-ups against each of your names. Same after an async exchange that moved something along.

A debrief in the channel is worth it too: what happened, what's next, and who you think should pick up what. Proposing the split is easier to react to than a list of notes your counterpart has to divide up themselves.

## Tracking people and tasks

Either of you should be able to answer who someone is, or whether something got done, without asking the other. So each internal channel wants two links that are easy to find, pinned or bookmarked:

- **A light org map.** Who you've met or who you're pursuing, what they do, and which of you has the relationship.
- **A running task list.** Added to rather than rewritten, so you can see what got done as easily as what's outstanding. Dated sections work well: a one-line heading for what happened, then the follow-ups underneath.

Use whatever you'll both keep current: a Slack canvas, a Customer Analytics note, a Google Doc. The examples below use canvases because they sit where the conversation already happens. On a smaller account, one pinned message often covers both.

<details>
<summary>Example: an org map as a canvas</summary>

A canvas called `[customer_name] - People`, with a table in it:

| Name | Title | Who has the relationship |
| --- | --- | --- |
| Ana | VP Engineering, exec sponsor | TAM |
| Dev | Staff engineer, owns the implementation | CSM |
| Mo | PM, heaviest Experiments user | CSM |
| Sam | Data lead, team we haven't landed yet | TAM |

You're not mapping the whole org, just keeping something easy to refer back to. Add people as you meet them.
</details>

<details>
<summary>Example: a running task list as a canvas</summary>

A canvas called `[customer_name] - Tasks`. After every conversation, add a dated section at the top with a one-line heading for what happened, then a checklist of follow-ups with the CSM or TAM against each:

**Sep 12, 2026 - Call with champion re: renewal prep and Experiments issues**

- [x] Send the event volume breakdown ahead of the call (CSM)
- [ ] Follow up with Sam's team on the warehouse question (TAM)
- [ ] Get the flag naming convention written up (CSM)

**Aug 28, 2026 - Implementation review with the platform team**

- [x] Walk through the replay sampling config (CSM)
- [x] Intro the TAM to the data lead (CSM)

Older sections stay put. That's what makes the list useful three months later, when you're trying to remember if anyone ever answered the warehouse question.
</details>

Recording who has the relationship is the useful part of the org map: it means someone notices when that contact goes quiet, and they're the first port of call.

On tasks, keep the newest at the top and put a name on every item. If something has sat unchecked across three conversations, it's either not happening or it's blocked. Both are worth saying out loud in the channel.

Neither doc is searchable the way Customer Analytics is, so roll the developments that matter into the account plan note as you go.

## Sharing DMs

DMs with customer contacts happen, and that's fine. What you want to avoid is the account picture living only in one person's DMs.

Post a short summary in the internal channel whenever a DM changes the plan, surfaces a risk, or commits PostHog to something. A summary, not a transcript: your counterpart needs what shifted, not the pleasantries. If it creates a follow-up, it goes on the task list.

## Who joins which call

On strategic accounts, default to both of you on most calls. We don't run many in the first place, and the context you each pick up is worth more than the hour.

On smaller growth accounts, both of you joining every call is likely overkill. One of you running a routine check-in is fine, as long as the follow-up lands in the internal channel.

Either way, the calls worth both of you being on are the ones where the relationship or the commercial picture is changing: renewals, business reviews, a competitor showing up, anything going sideways.

## Sync cadence

Meet once a month, more often if you need to. Either way, what comes out of it should land back in the internal channel, since most of it feeds account planning.

# **Dividing the work**

Two people on an account buys depth *and* breadth: relationship-building, use case optimization, implementation audits, and much more. To get that, stay in lockstep on who's doing what.

A good starting point is to find the gaps in coverage and the open threads, then prioritize. Questions worth working through together:

- Is the customer struggling with a specific product? <PrivateLink url="https://posthog.slack.com/archives/C0B0K4EACH2/p1787237987414149">(example)</PrivateLink>
- What frustrations have they surfaced recently?
- What expansion opportunities are there?
- Is their implementation healthy? Are they due for a health audit? <PrivateLink url="https://posthog.slack.com/archives/C0B0UD92EG1/p1782344320472969">(example)</PrivateLink>
- Any cost optimization opportunities? <PrivateLink url="https://posthog.slack.com/archives/C0BAUUD4R5E/p1783969456929179">(example)</PrivateLink>

Prioritize together, then explicitly assign each other paths to run with. Think of it as delegating what you'd otherwise do yourself if you were alone on the account. Give each other the work streams where you're each most likely to succeed: if a TAM already has a warm relationship with the champion for an expansion, they should keep it rather than hand it off mid-flight.

<details>
<summary>An example of both of you creating value in separate product areas at the same time, while playing to your unique strengths as a TAM and CSM</summary>

- Customer is a heavy Experiments user, and they run into a lot of issues because of their sophisticated setup. But they're concentrated on that product, so we're also thinking about expansion opportunities to derisk the account.
- The CSM could focus on deepening the value the customer gets from Experiments by scheduling 1:1 feedback calls with power users to better understand their pain points and work on fixes.
- The TAM can focus on a net new cross-sell opportunity into AIO with a different set of stakeholders and deepen the value from other products that have been adopted.
- In this scenario, your parallel efforts unlock goodwill from the customer, bandwidth for the TAM to grow the account, and space for the CSM to go deep on debugging and instrumentation on their existing product adoption.
- The net effect: customer feels supported on multiple fronts.
</details>

None of this is a hard rule (CSMs on instrumentation, TAMs on expansion). You'll overlap and switch at times, and be more siloed at others. Bigger accounts need the split made explicit because there's more in flight; on a smaller one it's often obvious enough to leave alone.

The test: can you say what your counterpart is working on right now? If not, catch up on a call or post in the internal channel more often. What you're avoiding is duplicative or irrelevant work, so honor each other's time by communicating clearly and often.

## Good habits

How can you both be the driver if there are two people in the same car? A few habits that protect your autonomy without blocking each other:

1. **Post often in the internal channel:** what you're thinking about, who you have a call scheduled with, open questions, an opportunity you're chasing down... anything. Write as generously and freely as you would on a private scratchpad - it's the closest thing we have to a shared brain.
2. **Document in Customer Analytics, the artifacts and the internal channel:** details, developments, learnings and plans from your internal threads should end up as a note on the account in Customer Analytics.
3. **Use each other to sense check:** consider a monthly call where you catch up on your shared accounts. Talking through what you're thinking often reveals parallel work streams.
4. **Debrief after customer calls:** this is where you'll feel the superpowers that come with a CSM + TAM overlay - give each other feedback, get clear on next steps, and review how the call went. 
5. **Tag team follow ups:** one of you plugs something in the customer channel; the other stands by to chime in with a follow-up to get a response. Works like a charm for unresponsive customers.

# **Related reading**

- [Account allocation](/handbook/growth/sales/account-allocation) covers [adding a TAM](/handbook/growth/sales/account-allocation#adding-a-tam-to-an-account), [removing a TAM](/handbook/growth/sales/account-allocation#removing-a-tam-from-an-account), and [keeping the context with the CSM](/handbook/growth/sales/account-allocation#keeping-the-context-with-the-csm) when the overlay ends
- [Customer journey](/handbook/growth/sales/customer-journey#ownership-rules) for the coverage matrix by phase, and co-owned churn saves
- [Customer health tracking](/handbook/cs-and-onboarding/health-tracking) for what the score is made of
- [Quarterly account planning](/handbook/growth/sales/risk-mitigation-and-churn-prevention#quarterly-account-planning) for the account plan note format
- [Evaluating growth potential](/handbook/growth/sales/evaluating-growth-potential) for judging whether the headroom on an account is worth working
