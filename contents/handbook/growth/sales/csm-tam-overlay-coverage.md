---
title: CSM + TAM rules of engagement
sidebar: Handbook
showTitle: true
---

Some accounts have both a CSM and a TAM. Why we cover accounts that way is in [account allocation](/handbook/growth/sales/account-allocation): the [CSM is the base layer](/handbook/growth/sales/account-allocation#csms-are-the-base-layer) on every $20k+ account, and a [TAM is an overlay](/handbook/growth/sales/account-allocation#tams-are-an-overlay) added while there's a qualified expansion opportunity to work. This page picks up from there. It's about what the two of you do once you're both on.

Both roles have a real relationship with the customer. Both are in the Slack channel. Both know what's happening on the account. The difference is _focus_, not ownership. The customer should never have to figure out who to contact: they reach out to either person, and PostHog sorts it out internally.

Everything below is a habit for getting the most out of having two people on an account, each playing to their strengths, so scale it to the account. A strategic account (our [Top 40](/handbook/growth/sales/account-allocation#top-40-account-management) are the clearest example) with several teams in play and a renewal coming justifies more structure. A smaller growth account with one champion and a single use case usually doesn't, so treat this as a starting point to adapt rather than a checklist to comply with.

## What each role focuses on

### tl;dr
 - TAM is focused on and leading commercial conversations (product adoption, renewals, expansion, etc...)
 - CSM is focused on and leading technical conversations (efficient implementation, product training, support escalation)
 - TAMs and CSMs should meet regularly (every other week / once a month) to discuss where each person is focused on the account and agree to next steps and have a shared account plan documented
 - These roles are not exclusive. CSM should be able to speak to product adoption, TAMs should be able to speak to efficient implementation

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
- Both are aligned on the current state of the customer, risks, opportunities and what their counterpart is working on.
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

There will be overlap and you will step on each other's toes, but that's by design. The end goal isn't to have a perfect division of work between the two roles, but to play to your strengths and work towards the goals set for each account. Here are some areas where you should expect overlap:

## Renewals

Renewals sit with both of you, which is exactly why it's worth being specific about who does what.

For accounts with a TAM overlay, the TAM leads the commercial conversation (quote creation, accounting for growth/expansion/upsells, order form creation, etc.). The CSM owns the value case behind it: what the customer actually used, what they got out of it, and what their usage looks like going forward.

A competitor turning up ahead of a renewal on a CSM-only account is one of the clearest reasons to add a TAM in the first place. [Competitive renewal](/handbook/growth/sales/account-allocation#competitive-renewal) has the detail, and the timing is the part that matters: start the renewal conversation around 3 months out, because layering a TAM in 30 days before a renewal is too late to change a competitive evaluation.

## Watching account health together

The [health score](/handbook/cs-and-onboarding/health-tracking) is a customer success instrument, so the CSM owns reading it and keeping it current. That doesn't make it the CSM's problem alone.

Dividing the score up by role is tempting, but it tends not to get you much. It's weighted to answer one question, "is this account at risk". Product engagement makes up most of the score and is a lagging signal by design, so what you spot there is usually confirmation rather than warning. Total product count, probably the most useful headroom signal a TAM has, is a rounding error inside the weighting. And an account-level score averages away a single team going quiet, which is most likely on strategic accounts where several teams use PostHog for different things.

A few things that tend to work better:

- **Same numbers, different questions.** The CSM asks what's degrading and why. The TAM asks where the headroom is and which teams aren't represented in the usage yet.
- **Read it together on your regular sync.** Pull the account up and each say what you think it means. Ten minutes of that beats dividing the metrics up between you.
- **Say something when a component hits "Poor"**, whoever spots it and whatever it relates to.
- **Keep an eye on `#spike-detector`** for your accounts. It flags usage moving sharply in either direction, and both directions are worth a look: a jump might be a new team onboarding or a misconfiguration, a drop might be a team going quiet. Ask your team lead to tag you as owner on your accounts so you see the ones that concern you.

## When cost efficiency and growth pull against each other

The CSM's job includes helping a customer spend less. The TAM's job includes growing the account. Sooner or later those point in opposite directions on the same account.

The customer's efficiency should win out. A customer paying for waste has a reason to leave, and a right-sized customer is a better expansion candidate than a resentful one.

How you get there matters as much as where you land:

- **Surface before you recommend.** If you're about to advise something that changes what the customer spends, say so in the internal channel first. Your counterpart may have a conversation in flight that you can't see.
- **Log the work as you do it**, in the internal channel and then in the account plan. Usage moves for all sorts of reasons, and a record of what you changed and when is the difference between a known optimization and an unexplained drop.
- **Neither of you wants to hear about it from the customer first.**

## When you disagree

Most of the time the lists above settle it, and whoever's focus area it sits in makes the call. Where it's shared ground, a reasonable default is whoever is closest to the live conversation with the customer, with a note in the channel on what they've decided and why.

A couple of things worth keeping to. Work it out in the channel rather than in DMs, so the reasoning is there for whoever picks the account up later. And once one of you has committed to something with the customer, it's usually better for the other to back it and sort the disagreement out internally, since a customer who can see daylight between the two of you will use it.

If you're stuck, bring your team leads in early. Remember, both of you will be coming from a place of truly caring about the customer and wanting to see them succeed, so it's rarely a disagreement about where you're trying to get to.

# **Kicking off the CSM + TAM overlay**

When a TAM joins an account, or a CSM picks up an account that already has one, this is roughly what needs to happen. Doing it up front is what stops the first month going on each of you guessing what the other already knows. On a strategic account it's probably worth all of it. On a smaller growth account, the first few may be plenty.

- [ ] Internal Slack channel created, using the naming convention `#customer-[customer_name]-internal`. Invite your TAM/CSM counterpart, both team leads, Ben and Simon. Invite the FDE too if they're doing any active work on the account
- [ ] Your TAM/CSM counterpart added to the external Slack channel (`#posthog-[customer_name]`)
- [ ] Whoever has the pre-existing relationship writes a note in Customer Analytics with a context dump on the history and current state of the account
- [ ] Whoever is joining posts their own read of the account, plus an action item they're picking up
- [ ] Regular internal sync booked with your counterpart, if you don't already have one for another account
- [ ] TAM creates an account plan note in Customer Analytics once they have a read on priorities for the account
- [ ] Two shared artifacts accessible to everyone: a light org map of users you're actively pursuing or working with, and a running task list. These can live anywhere as long as there's an easy link available in the channel: Slack canvas, Customer Analytics note, Google Doc, etc.
- [ ] Any important dates (renewal, 6 month discount expiry, projected credit depletion) shared in the internal channel

The internal channel effectively replaces DMs between TAMs and CSMs related to the account. Your public collaboration there will be a huge service to future teammates who might inherit it.

Both of you share the responsibility of making sure the other has enough context to be effective on the account.

## Get current on the account

### If you're joining on and your counterpart has the pre-existing relationship

Take it upon yourself to gather as much context as you can before jumping in with questions. Share what you find and use any gaps to guide your questions.

As a CSM, treat this like your standard deep dive when [inheriting an account](/handbook/cs-and-onboarding/getting-started-with-customers), but oriented toward where you can create value immediately:

- Are there cost optimizations to surface?
- Opportunities to deepen value on products they're already using heavily?
- Implementation issues?

As a TAM, come at it through [use-case selling](/handbook/growth/use-case-selling/use-case-selling). Start from the job the customer is already using PostHog to do, then work out what's missing from it and what sits next to it:

- Which use case are they running today, and how completely are they running it?
- Are there gaps in that use case that a product they don't have yet would close?
- Which adjacent use cases does the wider org already care about, and who owns them?

Cross-reference your findings against recent Slack threads and notes in Customer Analytics. You want a reasonably current assessment of the account and its needs that your counterpart can sense-check.

Go as far as recommending an initial action item for yourself based on your research - that's a highly effective way to take mental load off your counterpart. Once you have an initial grasp on the account, send a message in your internal Slack channel with your questions, ideas, and recommended action items if applicable ([example](https://posthog.slack.com/archives/C0B0UD92EG1/p1777424141416129)).

**Your goal**: create value for the account as soon as possible, with the right context, while protecting your counterpart's bandwidth. This is an art, not a science. You're co-piloting a ship on a shared mission, but each of you are still responsible for your own controls.

### If you're the one with the pre-existing relationship

Proactively share any top-of-mind context in your internal Slack channel as a starting point for your counterpart. If a quick call is needed to convey context that isn't apparent in the paper trail (Slack, Customer Analytics, etc.), do that.

Your counterpart is already gathering context from what's written, so you don't need to be exhaustive. Focus on:

- Key issues or active threads they must know about
- Important relationships or stakeholders
- Implementations in progress or recently completed

Add your counterpart to the customer's external Slack channel (`#posthog-[customer_name]`). Use your judgment for when to introduce them to the wider customer team, and relay that guidance so you stay aligned on timing.

When you do introduce them, frame it positively - the customer's PostHog team is growing, not that they're being handed off (here’s a solid [example](https://posthog.slack.com/archives/C090RCG671C/p1777565614828089)).

Run the intro past your counterpart before you send it. They'll often spot something that makes it warmer: relevant history with a similar customer, a specialty that lines up with what this one is struggling with, or previous experience worth name-checking. A customer who is excited to meet the new person starts the relationship somewhere much better than one who is politely acknowledging a new name.

If you're aware of any low-hanging fruit that would land well with the customer, hand it to your counterpart rather than doing it yourself, and let them be the one to deliver it. It's a cheap way for them to kick off on a good note, and it's worth more coming from the person who needs to build the relationship.

> **The underlying principle:** The goal is to outdo one another in service. Getting current on the account and elevating relevant context makes you both better experts, which directly improves the quality of your customer-facing work.

# **Staying in sync**

A handful of things are worth giving a home, so neither of you has to scroll back through the channel to work out where the account got to.

| What | Where | Why there |
| --- | --- | --- |
| Per-call agenda | Thread in the internal channel | Tied to a date, and it notifies you both |
| Who's who on the customer side | The org map linked in the channel | One place to look, kept current as people come and go |
| Open follow-ups and who owns them | The running task list linked in the channel | You both need the current list at a glance, not scattered through a channel |
| Anything a future owner would need | Account plan note in Customer Analytics | Searchable, and it outlives the channel |

## Agenda & call threads

For a call worth preparing for, start a thread in the internal channel a few days ahead and draft the agenda together: who covers what, who leads which section, and roughly how long each part should get. Aligning on that beforehand, rather than working it out live, tends to make for a far more impactful call with the customer.

Whoever booked the call is the obvious person to start the thread, since they're holding the invite, but either of you can. A routine check-in probably doesn't need one at all.

## Following up afterwards

After a call, or an async touchpoint that moved something along, update the two artifacts: add anyone new to the org map, and add a dated section to the task list with the follow-ups against each of your names.

A message in the internal channel to debrief is worth it too, if you'd prefer: what happened, what's next, and your read on who picks up what. Proposing the split is easier for your counterpart to react to than a list of notes they have to divide up themselves.

## Tracking people and tasks

You both need to be able to answer who someone is, and whether something got done, without asking the other person. So each internal customer channel wants two links that are easy to get at, pinned or in the channel bookmarks:

- **A light org map.** Who you've met on the account or who you're pursuing, what they do, and which of you has the relationship.
- **A running task list.** Added to rather than rewritten, so you can see what was done as easily as what's still outstanding. Dated sections work well: a one-line heading for what happened that day, then the follow-ups underneath it.

What those two things are is up to the pair. A Slack canvas, a note in Customer Analytics, a running Google Doc, whatever the two of you will keep current. The examples below use canvases in the internal channel because they sit where the conversation already happens, but the shape matters more than the tool. On a smaller account, a single pinned message often does both jobs with less to maintain.

<details>
<summary>Example: an org map as a canvas</summary>

A canvas called `[customer_name] - People`, with a table in it:

| Name | Title | Who has the relationship |
| --- | --- | --- |
| Ana | VP Engineering, exec sponsor | TAM |
| Dev | Staff engineer, owns the implementation | CSM |
| Mo | PM, heaviest Experiments user | CSM |
| Sam | Data lead, team we haven't landed yet | TAM |

The goal isn't to map the entire org, it's to have something easy to refer back to later. Add people as you meet them rather than in a big sweep.
</details>

<details>
<summary>Example: a running task list as a canvas</summary>

A canvas called `[customer_name] - Tasks`. After every conversation with the customer, add a new dated section at the top with a one-line heading for what happened, then a checklist of the follow-up items with the CSM or TAM against each:

**Sep 12, 2026 - Call with champion re: renewal prep and Experiments issues**

- [x] Send the event volume breakdown ahead of the call (CSM)
- [ ] Follow up with Sam's team on the warehouse question (TAM)
- [ ] Get the flag naming convention written up (CSM)

**Aug 28, 2026 - Implementation review with the platform team**

- [x] Walk through the replay sampling config (CSM)
- [x] Intro the TAM to the data lead (CSM)

Older sections stay where they are. That's what makes the list useful three months later, when one of you is trying to remember whether anyone ever answered the warehouse question.
</details>

Whichever you use, it only works if it's maintained, and that doesn't take long. Recording who has the relationship is the useful part of the org map: it means one of you is the person who notices when that contact goes quiet, and is their first port of call.

On tasks, keep the newest at the top and put a name on every item. If something has sat unchecked across three conversations, it's either not happening or it's blocked, and both are worth saying out loud in the channel.

Neither doc is searchable the way Customer Analytics is, so roll the developments that matter into the account plan note as you go. That keeps the working docs short enough to read, and gives whoever inherits the account something they can find.

## Sharing DMs

DMs with customer contacts happen, and that's fine. What's worth avoiding is the account picture living only in one person's DMs.

Drop a short summary into the internal channel whenever a DM changes the plan, surfaces a risk, or commits PostHog to something. A summary, not a transcript. Your counterpart needs the shift in the account, not the pleasantries. If it creates a follow-up, it belongs on the task list.

## Who joins which call

On strategic accounts, default to both of you on most customer calls. We don't run many calls in the first place, the context you each pick up is usually worth more than the hour, and these are the accounts where being surprised by something your counterpart said costs the most.

On smaller growth accounts, both of you joining every call is likely overkill. One of you running a routine check-in is fine as long as the follow-up lands in the internal channel, and it's a better use of the other person's day.

Wherever the account sits, the calls worth both of you being on are the ones where the relationship or the commercial picture is changing: renewals, business reviews, a competitor showing up, anything going sideways. And if you're both on, split the agenda beforehand.

## Sync cadence

Meet once a month, and feel free to meet more often in between if you need to. Either way, make sure what comes out of it makes its way back to the internal customer channel for visibility, since most of it has a bearing on account planning.

# **How to divide & conquer without blocking each other**

Make sure you're in lockstep with your counterpart so you can each deepen your impact on different areas of the account. Having two people on the account enables depth *and* breadth when it comes to relationship-building, use case optimization, implementation audits, and so much more. 

But how do you maximize the value of having two PostHog humans on one account? A good starting point is to identify gaps in coverage and every open thread, then prioritize from there.

A non-exhaustive list of questions to explore together to align on starting points: 
- Is the customer struggling with a specific product? <PrivateLink url="https://posthog.slack.com/archives/C0B0K4EACH2/p1787237987414149">(example)</PrivateLink>
- What frustrations have they surfaced recently?   
- What expansion opportunities are there? 
- Is their implementation healthy? Are they due for a health audit? <PrivateLink url="https://posthog.slack.com/archives/C0B0UD92EG1/p1782344320472969">(example)</PrivateLink>
- Any cost optimization opportunities? <PrivateLink url="https://posthog.slack.com/archives/C0BAUUD4R5E/p1783969456929179">(example)</PrivateLink>

Work with your counterpart to prioritize account needs, then explicitly assign each other the dedicated paths to run with. Think of it as delegating tasks that you'd otherwise do yourself if it was only you on the account. Play to your strengths and advantages on the account and give each other work streams where you have the highest likelihood of success. For example, if a TAM has a warm relationship with the champion for a new product expansion, they should continue focusing on that versus handing it off while it's a work in progress. 

<details>
<summary>An example of both of you creating value in separate product areas at the same time, while playing to your unique strengths as a TAM and CSM</summary>

- Customer is a heavy Experiments user, and they run into a lot of issues because of their sophisticated setup. But they're concentrated on that product, so we're also thinking about expansion opportunities to derisk the account. 
- The CSM could focus on deepening the value the customer gets from Experiments by scheduling 1:1 feedback calls with power users to better understand their pain points and work on fixes.
- The TAM can focus on a net new cross-sell opportunity into AIO with a different set of stakeholders and deepen the value from other products that have been adopted. 
- In this scenario, your parallel efforts unlock goodwill from the customer, bandwidth for the TAM to grow the account, and space for the CSM to go deep on debugging and instrumentation on their existing product adoption. 
- The net effect: customer feels supported on multiple fronts.
</details>

By no means is this a hard rule (CSMs focused on instrumentation, TAMs focused on expansion). There will be times where you overlap and switch, and other times where you're more siloed due to the nature of the account. Bigger accounts tend to need the split made explicit because there's more in flight; on a smaller one it's often obvious enough to leave alone. 

You should always ensure you have clarity on your parallel work streams. If you can confidently answer at any time what your counterpart is working on related to the account, then you're doing it right. If not: make time to catch up on a call or async, or share what you're working on in your internal customer channel more frequently! 

The risk we're avoiding is duplicative or irrelevant work. Your time is incredibly valuable, so honor each other's time by communicating clearly and often. 

## Concrete ways to work well together

How can you both be the driver if there are two people in the same car? Put another way, if you're sharing an account with someone, how do you avoid blocking each other while working together? 

While this process isn't perfect, here are a few good habits that protect your autonomy and effectiveness:
1. **Post often in the internal channel:** what you're thinking about, who you have a call scheduled with, open questions you have, an opportunity you're chasing down... anything. Write as generously and freely as you would on a private scratchpad - it's the closest thing we have to a shared brain.
2. **Document as much as you can in Customer Analytics, the artifacts and the internal customer channel:** all of the relevant details, developments, learnings, plans, etc. from your internal threads should have their equivalent version as a note on the account in Customer Analytics.
3. **Use each other to sense check:** consider having a monthly call where you catch up on all things related to your shared accounts - just talking through what you're thinking about can help reveal parallel work streams. 
4. **Debrief after customer calls:** this is where you'll feel the superpowers that come with a CSM + TAM overlay - give each other feedback, get clear on next steps, and review how the call went. 
5. **Tag team follow ups:** one of you plugs something in the customer channel; the other is aware of this and stands by to chime in with a follow-up to get a response. Works like a charm for unresponsive customers. 

# **Related reading**

- [Account allocation](/handbook/growth/sales/account-allocation) covers [adding a TAM](/handbook/growth/sales/account-allocation#adding-a-tam-to-an-account), [removing a TAM](/handbook/growth/sales/account-allocation#removing-a-tam-from-an-account), and [keeping the context with the CSM](/handbook/growth/sales/account-allocation#keeping-the-context-with-the-csm) when the overlay ends
- [Customer journey](/handbook/growth/sales/customer-journey#ownership-rules) for the coverage matrix by phase, and co-owned churn saves
- [Customer health tracking](/handbook/cs-and-onboarding/health-tracking) for what the score is made of
- [Quarterly account planning](/handbook/growth/sales/risk-mitigation-and-churn-prevention#quarterly-account-planning) for the account plan note format
