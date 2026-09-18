---
title: CSM + TAM rules of engagement
sidebar: Handbook
showTitle: true
---

Some accounts have both a CSM and a TAM. The point is depth: two people sharing the load so each can focus on what they're best at, and the customer gets a better experience than one person stretched across everything.

[Account allocation](/handbook/growth/sales/account-allocation) covers why: the [CSM is the base layer](/handbook/growth/sales/account-allocation#csms-are-the-base-layer) on every $20k+ account, and a [TAM is an overlay](/handbook/growth/sales/account-allocation#tams-are-an-overlay) while there's an expansion opportunity worth working. This page is about what the two of you do once you're both on.

Both of you are expected to have a relationship with the customer, be in the Slack channel and know what's going on. The difference is _focus_, not ownership. The customer shouldn't have to work out who to contact: they message either of you, and we sort it out internally.

The structure outlined on this page should be treated as a guideline & should be tweaked as needed for different accounts:
- A strategic account (our [Top 40](/handbook/growth/sales/account-allocation#top-40-account-management) are the clearest example) with several teams and a renewal coming needs the structure.
- A smaller account earlier on in their trajectory with us & with fewer users probably doesn't.

## What each role focuses on

### tl;dr
 - TAM leads commercial conversations (product adoption, renewals, expansion, etc.)
 - CSM leads technical conversations (efficient implementation, product training, support escalation)
 - Meet regularly (1-2x/month) to agree where each of you is focused and what's next, with a shared account plan documented
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
- Account planning (updated regularly in Customer Analytics)
- Stakeholder management

### Both

- General customer questions (whoever sees it first)
- Implementation reviews
- Retention (TAMs are not off the hook here - understanding health is a prerequisite for cross-selling and not something to be delegate do the CSM)
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

There will be overlap and you'll step on each other's toes - that's by design. The goal isn't a perfect division of work between the two roles, it's to play to your strengths and hit the goals set for the account. Where overlap shows up most:

## Day-to-day questions

Whoever sees it first answers. If one of you has replied and the other has something better to add, chime in anyway. Two helpful answers beats one person holding back because someone got there first.

## Renewals

Renewals sit with both of you for overlay accounts. The TAM leads the commercial conversation: stakeholder approval, quotes, accounting for growth and upsells, order forms. The CSM owns the value case behind it: what the customer used, what they got out of it, and where usage is heading.

A competitor showing up before a renewal on a CSM-only account is one of the best reasons to add a TAM ([Competitive renewal](/handbook/growth/sales/account-allocation#competitive-renewal) has more details). Between both of you, coordinating the timing is important: start the renewal conversation 3 months out, since adding a TAM 30 days before is too late to shift a competitive evaluation.

## Account health

The CSM owns reading the [health score](/handbook/cs-and-onboarding/health-tracking) and keeping it current, but it isn't the CSM's problem alone. Both of you watching it might feel like duplicated work, but you're asking different questions despite looking at the same numbers.

The score on its own also won't tell you enough, as it's only designed to answer whether an account is at risk. Product engagement makes up most of it which usually confirms something that already happened rather than warning you. Total product count, a better headroom signal for a TAM, doesn't count much towards it. And it won't show you a single team going quiet, which is most likely on strategic accounts where several teams use PostHog for different things.

A few tips to help you approach this better:

- **Same numbers, different questions.** The CSM asks what's degrading and why. The TAM asks where the [headroom](/handbook/growth/sales/evaluating-growth-potential) is and which teams aren't in the usage yet.
- **Read it together on your regular sync.** Consider pulling the account up and sharing your thoughts on account health.
- **Watch <PrivateLink url="https://posthog.slack.com/archives/C08TDN99UNP">#spike-detector</PrivateLink>** for your accounts. It flags usage moving sharply either way, and both directions are worth a look: a jump might be a new team or a misconfiguration, a drop might be a team going quiet.

## Cost efficiency vs. growth

The CSM's job includes helping a customer spend less. The TAM's job includes growing the account. Some situations might make you both pull in opposite directions.

At the end, efficiency should win, because a customer paying for waste has a reason to leave, and a right-sized customer expands better than a resentful one. More importantly, neither of you wants the customer to find out about this first.

Here's how you should consider handling it:

- **Surface the suggestion before recommending.** If you're about to advise something that changes what the customer spends, say so in the internal channel first. Your counterpart may have a conversation in flight you can't see.
- **Log the work as you do it** in the internal channel and then in the account plan. Usage moves for all sorts of reasons, and a record of what you changed and when turns an unexplained drop into a known optimization.

## When you disagree

Usually the lists above settle it: whoever's focus area it sits in makes the call. On shared ground, default to whoever is closest to the live conversation, and have them post what they decided and why.

Two things worth keeping to:

- **Work it out in the channel, not in DMs**, so the reasoning is there for whoever picks the account up later.
- **Back your counterpart once they've committed to something** with the customer, and sort the disagreement out internally. A customer is more likely to pursue something you both agree on.

If you're stuck, bring your team leads in early. Both of you care about the customer and want to see them succeed, so it's rarely a disagreement about where you're headed.

# **Kicking off the overlay**

When a TAM joins an account, or a CSM gets added to one that already has a TAM, use this list as a guide on how to kick things off strongly. Especially for larger/strategic accounts, try to adhere to it as much as possible, but the the first three need to be followed regardless of account size:

- [ ] Internal Slack channel created (`#customer-[customer_name]-internal`). Invite your counterpart and both the team leads. Add the FDE if they're doing active work on the account, and the PostHog Slack bot (`@PostHog`) so you can both dig into account data without leaving the channel
- [ ] Your counterpart added to the external Slack channel (`#posthog-[customer_name]`) with a proper introduction
- [ ] Whoever has the existing relationship writes a Customer Analytics note with the history and current state of the account
- [ ] Whoever is joining posts their own read of the account, plus an action item they're picking up
- [ ] Regular internal sync booked with your counterpart, if you don't already have one
- [ ] TAM creates an account plan note in Customer Analytics once they have a read on priorities
- [ ] Two shared artifacts accessible to everyone: a light org map of users you're actively pursuing or working with, and a running task list. These can live anywhere as long as there's an easy link in the channel: Slack canvas, Customer Analytics note, Google Doc
- [ ] Any important dates (renewal, 6 month discount expiry, projected credit depletion) shared in the internal channel

The internal channel replaces DMs about the account, and you're both responsible for making sure the other has enough context to be useful. Working in the open there also ensures that it's easy for anyone to look up historical context around decisions in the future.

## Get current on the account

### If you're joining on and your counterpart has the relationship

Gather as much context as you can before jumping in with questions. Share what you find, and let the gaps guide what you ask.

As a CSM, treat it like your standard deep dive when [inheriting an account](/handbook/cs-and-onboarding/getting-started-with-customers), pointed at where you can add value fastest:

- Are there cost optimizations to surface?
- Opportunities to deepen value on products they're already using heavily?
- Implementation issues?

As a TAM, come at it through [use-case selling](/handbook/growth/use-case-selling/use-case-selling). Start from the job they already use PostHog for, then work out what's missing yet adjacent to what they're using:

- Which use cases are they running today, and how deep are they?
- Do they have gaps that can be closed by a product they aren't using yet?
- Which adjacent use cases does the wider org care about, and who owns them?

Cross-reference what you find against recent Slack threads and Customer Analytics notes. You want a current read on the account that your counterpart can sense-check.

Ideally, you come up with a recommendation for a first action item to share with the customer. Then post in the internal channel with your questions, ideas, and that action item (<PrivateLink url="https://posthog.slack.com/archives/C0B0UD92EG1/p1777424141416129">example</PrivateLink>).

**Your goal**: create value fast while learning as much as you can about your customers' business & usage, so you can start building rapport immediately with them.

### If you're the one with the relationship

Share whatever's top of mind in the internal channel as a starting point. If there's context a quick call would convey better than the paper trail, do that.

Your counterpart is already gathering context from what's written, so don't be exhaustive. Focus on:

- Key issues or active threads they must know about
- Context around their business that cannot easily be deciphered from public info
- Specifics around important relationships or stakeholders
- Implementations in progress or recently completed

Add your counterpart to the external Slack channel (`#posthog-[customer_name]`). Use your judgment on when to introduce them to the wider customer team, and say what you're thinking so you stay aligned on timing.

When you do introduce them, frame it positively: the customer is growing and we want to support them better by having more hands on deck, not that they're being handed off (here’s a solid <PrivateLink url="https://posthog.slack.com/archives/C090RCG671C/p1777565614828089">example</PrivateLink>).

Run the intro past your counterpart first. They'll often spot something that makes it warmer: history with a similar customer, a specialty that lines up with what this one struggles with, or calling out their experience for clout. A customer who's excited to meet someone starts better than one politely acknowledging a new name.

If you know of low-hanging fruit that would land well, hand it to your counterpart and let them deliver it. It's a cheap way for them to start on a good note, and it's worth more coming from the person who needs to build the relationship.

> **Your goal**: share as much helpful and relevant context as possible with your counterpart, focusing on the things that aren't easily figured out by scanning the customers' site, usage or existing notes.

# **Staying in sync**

To make sure you're both on the same page and to ensure continuity if someone new takes over the account, there a few things worth maintaining:

| What | Where | Why there |
| --- | --- | --- |
| Who's who at the customer | Org map artifact linked in the channel | One place to look, kept current |
| Open follow-ups, action items & assignees | Task list artifact linked in the channel | The current list at a glance |
| Per-call agenda | Thread in the internal channel | Tied to a date, and notifies you both |
| Any info that anyone outside of you needs about this account | Account plan note in Customer Analytics | Easily searchable, and lives outside the channel |

## Before a call

If you're both joining, start a thread in the internal channel a few days ahead and draft the agenda together: who covers what, who leads which section, and roughly how long each part gets. Sorting that out beforehand will make for a much more impactful call.

Make sure you both get at least some time to speak, even if one of you doesn't have an explicit agenda item. Two voices helps break the monotony if you're both on the call.

Use this same thread to also keep in touch while on a call. While Slack can be distracting on a call, having the thread opened up in a new window can help you both coordinate while on the call.

## After a call

Update both artifacts: add anyone new to the org map, and add a dated section to the task list with the assigned follow-ups. Same after an async exchange that moved something along.

A post-call debrief huddle or thread in the channel is worth it too: what happened, what's next, who you think should pick up what and feedback on the call. Proposing the split is easier to react to than a list of notes your counterpart has to divide up themselves.

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

Older sections stay put. That's what makes the list useful three months later, when you're trying to remember if anyone ever answered a specific question.
</details>

Recording who has the relationship is very useful in the org map because it means they should flag if that contact goes abnormally quiet.

On tasks, keep the newest ones at the top and make sure someone's assigned to each one. If something has sat unchecked for a while, have a chat in the internal channel with your counterpart on whether it's still important

Neither doc is searchable the way Customer Analytics is, so roll the developments that matter into the account plan note as you go.

## Sharing DMs

DMs with customer contacts happen, and that's fine. What you want to avoid is the account picture living only in one person's DMs.

Post a short summary in the internal channel whenever a DM changes the plan, surfaces a risk, or commits PostHog to something. Your counterpart needs to know what shifted or if there was a win in the DM, especially if there are joint follow-ups coming out of it.

## Who joins which call

On strategic accounts, default to both of you on most calls. We don't run many in the first place, and the context you each pick up will be very helpful even if you don't have anything to discuss.

On smaller growth accounts, both of you joining every call is likely overkill. One of you running a routine check-in is fine, as long as the follow-up lands in the internal channel.

Either way, the calls worth both of you being on are the ones where the relationship or the commercial picture is changing: renewals, business reviews, potential expansion conversations, competitors surfacing or anything going sideways.

## Sync cadence

Meet at least once a month, or more often if you need to. Either way, what comes out of it should land back in the internal channel, since most of it feeds account planning.

# **Dividing the work**

Two people on an account buys depth *and* breadth: relationship-building, use case optimization, implementation audits, and much more. To get that, have good communication on who's doing what.

A good starting point is to find the gaps in coverage and the open threads, then prioritize. Here are some questions worth working through together:

- Is the customer struggling with a specific product? <PrivateLink url="https://posthog.slack.com/archives/C0B0K4EACH2/p1787237987414149">(example)</PrivateLink>
- What frustrations have they surfaced recently?
- What expansion opportunities are there?
- Is their implementation healthy? Are they due for a health audit? <PrivateLink url="https://posthog.slack.com/archives/C0B0UD92EG1/p1782344320472969">(example)</PrivateLink>
- Any cost optimization opportunities? <PrivateLink url="https://posthog.slack.com/archives/C0BAUUD4R5E/p1783969456929179">(example)</PrivateLink>

Prioritize together, then explicitly assign each other paths to run with. Think of it as delegating what you'd otherwise do yourself if you were alone on the account. Give each other the work streams where you're each most likely to succeed, and if a TAM already has a warm relationship with the champion for an expansion, they should keep it rather than hand it off mid-flight.

<details>
<summary>An example of both of you creating value in separate product areas at the same time, while playing to your unique strengths as a TAM and CSM</summary>

- Customer is a heavy Experiments user, and they run into a lot of issues because of their sophisticated setup. But they're concentrated on that product, so we're also thinking about expansion opportunities to derisk the account.
- The CSM could focus on deepening the value the customer gets from Experiments by scheduling 1:1 feedback calls with power users to better understand their pain points and work on fixes.
- The TAM can focus on a net new cross-sell opportunity into AIO with a different set of stakeholders and deepen the value from other products that have been adopted.
- In this scenario, your parallel efforts unlock goodwill from the customer, bandwidth for the TAM to grow the account, and space for the CSM to go deep on debugging and instrumentation on their existing product adoption.
- The net effect: customer feels supported on multiple fronts.

</details>

None of this is a hard rule (CSMs on instrumentation, TAMs on expansion). You'll overlap and switch at times, and be more siloed at others. Bigger accounts need the split made explicit because there's more in flight while on a smaller one, it's often obvious enough to leave alone.

Here's a good way to test this: ask yourself whether you can say what your counterpart is working on right now? If not, ask in the internal channel more often. What you're avoiding is duplicative or irrelevant work, so honor each other's time by communicating clearly and often.

## Good habits

How can you both be the driver if there are two people in the same car? A few habits that protect your autonomy without blocking each other:

1. **Post often in the internal channel:** what you're thinking about, who you have a call scheduled with, open questions, an opportunity you're chasing down... anything. Write as generously and freely as you would on a private scratchpad - it's the closest thing we have to a shared brain.
2. **Document as much as you can in Customer Analytics, the artifacts and the internal channel:** details, developments, learnings and plans from your internal threads should end up as a note on the account in Customer Analytics.
3. **Use each other to sense check:** consider a monthly call where you catch up on your shared accounts. Talking through what you're thinking often reveals parallel work streams.
4. **Debrief after customer calls:** this is where you'll feel the superpowers that come with a CSM + TAM overlay - give each other feedback, get clear on next steps, and review how the call went. 
5. **Tag team follow ups:** one of you plugs something in the customer channel; the other stands by to chime in with a follow-up to get a response. Works like a charm for unresponsive customers.

# **Related reading**

- [Account allocation](/handbook/growth/sales/account-allocation) covers [adding a TAM](/handbook/growth/sales/account-allocation#adding-a-tam-to-an-account), [removing a TAM](/handbook/growth/sales/account-allocation#removing-a-tam-from-an-account), and [keeping the context with the CSM](/handbook/growth/sales/account-allocation#keeping-the-context-with-the-csm) when the overlay ends
- [Customer journey](/handbook/growth/sales/customer-journey#ownership-rules) for the coverage matrix by phase, and co-owned churn saves
- [Customer health tracking](/handbook/cs-and-onboarding/health-tracking) for what the score is made of
- [Quarterly account planning](/handbook/growth/sales/risk-mitigation-and-churn-prevention#quarterly-account-planning) for the account plan note format
- [Evaluating growth potential](/handbook/growth/sales/evaluating-growth-potential) for judging whether the headroom on an account is worth working
