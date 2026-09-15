---
title: CSM + TAM rules of engagement
sidebar: Handbook
showTitle: true
---

Some accounts have both a CSM and a TAM. Why we cover accounts that way is in [account allocation](/handbook/growth/sales/account-allocation): the [CSM is the base layer](/handbook/growth/sales/account-allocation#csms-are-the-base-layer) on every $20k+ account, and a [TAM is an overlay](/handbook/growth/sales/account-allocation#tams-are-an-overlay) added while there's a qualified expansion opportunity to work. This page picks up from there. It's about what the two of you do once you're both on.

Both roles have a real relationship with the customer. Both are in the Slack channel. Both know what's happening on the account. The difference is _focus_, not ownership. Done well, the customer knows both of you, trusts both, and feels like they have a team rather than a point of contact.

Everything below is a habit for getting the most out of having two people on an account, each playing to their strengths, so scale it to the account. A strategic account (our [Top 40](/handbook/growth/sales/account-allocation#top-40-account-management) are the clearest example) with several teams in play and a renewal coming justifies real structure. A smaller growth account with one champion and a single use case usually doesn't, so treat this as a starting point to adapt rather than a checklist to comply with.

## Who leads what

|  | CSM | TAM |
| --- | --- | --- |
| **Implementation health and reviews** | Leads | Should be able to speak to it |
| **Onboarding, training, new users** | Leads |  |
| **Support escalation and follow-through** | Leads |  |
| **Credit efficiency** | Leads | Surfaces before recommending |
| **Account health** | Owns the score | Reads it for headroom |
| **Retention** | Leads | Not off the hook. Understanding health and usage is a prerequisite for cross-selling, not work that gets delegated |
| **Cross-sell and use case discovery** | Surfaces the signals from usage and conversations | Leads |
| **New teams and stakeholders** |  | Leads the multi-threading |
| **Quotes, discounts, order forms, invoicing** |  | Leads |
| **Account plan in Customer Analytics** | Contributes | Owns the note |
| **Renewal** | Owns the value case | Leads the commercial conversation |
| **Day-to-day questions and responsiveness** | Leads | Answers whatever they see first |

None of this is exclusive. A CSM should be able to speak to product adoption, and a TAM should be able to speak to efficient implementation. The customer should never have to figure out who to contact: they reach out to either person, and PostHog sorts it out internally.

### Renewals

For accounts with a TAM overlay, the TAM leads the commercial conversation (quote creation, accounting for growth/expansion/upsells, order form creation, etc.). The CSM owns the value case behind it: what the customer actually used, what they got out of it, and what their usage looks like going forward.

A competitor turning up ahead of a renewal on a CSM-only account is one of the clearest reasons to add a TAM in the first place. [Competitive renewal](/handbook/growth/sales/account-allocation#competitive-renewal) has the detail, and the timing is the part that matters: start the renewal conversation around 3 months out, because layering a TAM in 30 days before a renewal is too late to change a competitive evaluation.

### When cost efficiency and growth pull against each other

The CSM's job includes helping a customer spend less. The TAM's job includes growing the account. Sooner or later those point in opposite directions, and pretending they don't is how one of you gets blindsided.

The customer's efficiency wins. A customer paying for waste has a reason to leave, and a right-sized customer is a far better expansion candidate than a resentful one. What matters is the process rather than the conclusion: surface it in the internal channel before you recommend it, because your counterpart may have a conversation in flight that you can't see, and log the work as you do it so a deliberate optimization doesn't read as an unexplained drop three months later.

### When it goes wrong

Each of these is what happens by default without a shared habit, not a people problem. The right-hand column is the rest of this page.

| What the customer sees | What prevents it |
| --- | --- |
| "That's not my area, let me get the other person" | Neither of you bouncing a question you could have answered |
| Gets asked "how are things going?" by both of you in the same week | Splitting the agenda in the call thread beforehand |
| Explains the same thing twice | The context dump on day one |
| Hears from the TAM only when PostHog wants to sell something | Both of you visible in the channel, not just when you need something |
| Gets pricing talk from the CSM while a deal is in play | Surfacing before you recommend |
| Gets a cross-sell email the day after filing three support tickets | Posting often in the internal channel |
| Gets no reply, because each of you assumed the other had it | A name against every person and every task |
| Health slides because the TAM assumed the CSM had it | Reading the account together on your sync |

# **Day one: kicking off the overlay**

When a TAM joins an account, or a CSM picks up an account that already has one, this is roughly what needs to happen. Doing it up front is what stops the first month going on each of you guessing what the other already knows. On a strategic account it's probably worth all of it. On a smaller growth account, the first few may be plenty.

- [ ] Internal Slack channel created, using the naming convention `#customer-[customer_name]-internal`. Invite your TAM/CSM counterpart, both team leads, Ben and Simon, plus the FDE if they're doing any active work on the account
- [ ] Your counterpart added to the external Slack channel (`#posthog-[customer_name]`)
- [ ] Whoever has the pre-existing relationship writes a note in Customer Analytics with a context dump on the history and current state of the account
- [ ] Whoever is joining posts their own read of the account, plus an action item they're picking up
- [ ] Regular internal sync booked with your counterpart, if you don't already have one for another account
- [ ] TAM creates an account plan note in Customer Analytics once they have a read on priorities for the account
- [ ] Somewhere agreed to keep track of who's who and what's outstanding
- [ ] Any important dates (renewal, 6 month discount expiry, projected credit depletion) shared in the internal channel

The internal channel effectively replaces DMs between the two of you about the account. Your public collaboration there will be a huge service to future teammates who might inherit it.

Both of you share the responsibility of making sure the other has enough context to be effective on the account.

## If you're joining on and your counterpart has the relationship

Take it upon yourself to gather as much context as you can before jumping in with questions. Share what you find and use any gaps to guide your questions.

As a CSM, treat this like your standard deep dive when [inheriting an account](/handbook/cs-and-onboarding/getting-started-with-customers), but oriented toward where you can create value immediately:

- Are there cost optimizations to surface?
- Opportunities to deepen value on products they're already using heavily?
- Implementation issues?

As a TAM, come at it through [use-case selling](/handbook/growth/use-case-selling/use-case-selling). Start from the job the customer is already using PostHog to do, then work out what's missing from it and what sits next to it:

- Which use case are they running today, and how completely are they running it?
- Are there gaps in that use case that a product they don't have yet would close?
- Which adjacent use cases does the wider org already care about, and who owns them?

Cross-reference your findings against recent Slack threads and notes in Customer Analytics, then post your read in the internal channel with your questions, ideas, and a recommended action item for yourself ([example](https://posthog.slack.com/archives/C0B0UD92EG1/p1777424141416129)). Turning up with a proposed action item is a highly effective way to take mental load off your counterpart.

**Your goal**: create value for the account as soon as possible, with the right context, while protecting your counterpart's bandwidth. This is an art, not a science. You're co-piloting a ship on a shared mission, but each of you are still responsible for your own controls.

## If you're the one with the relationship

Proactively share any top-of-mind context in the internal channel. If a quick call is needed to convey context that isn't apparent in the paper trail, do that. Your counterpart is already gathering context from what's written, so you don't need to be exhaustive. Focus on the key issues or active threads they must know about, the important relationships, and any implementations in progress or recently completed.

Use your judgment for when to introduce them to the wider customer team, and relay that guidance so you stay aligned on timing. When you do, frame it positively: the customer's PostHog team is growing, not that they're being handed off (here's a solid [example](https://posthog.slack.com/archives/C090RCG671C/p1777565614828089)).

Run the intro past your counterpart first. They'll often spot something that makes it warmer: relevant history with a similar customer, a specialty that lines up with what this one is struggling with, or previous experience worth name-checking. A customer who is excited to meet the new person starts somewhere much better than one politely acknowledging a new name.

And if you know of any low-hanging fruit that would land well, hand it over rather than doing it yourself. It's a cheap way for your counterpart to start on a good note, and it's worth more coming from the person who needs to build the relationship.

> **The underlying principle:** The goal is to outdo one another in service. Getting current on the account and elevating relevant context makes you both better experts, which directly improves the quality of your customer-facing work.

# **Staying in sync**

However you organize it, the failure mode is the same: everything ends up in the channel and nothing survives the week. One split that avoids that:

| What | Where | Why there |
| --- | --- | --- |
| Per-call agenda and follow-up | Thread in the internal channel | Tied to a date, notifies you both, and the prep sits next to the outcome |
| Who's who on the customer side | A canvas in the internal channel | Continuously rewritten, and there's no value in the history |
| Open follow-ups and who owns them | A canvas in the internal channel | You both need the current list at a glance, not scattered through a channel |
| Anything a future owner would need | Account plan note in Customer Analytics | Searchable, and it outlives the channel |

Whatever you land on, if losing it would hurt whoever inherits this account, it shouldn't live only in a canvas.

## Call threads

For a call that matters, a thread in the internal channel a few days ahead is worth the two minutes. Whoever booked it is the obvious person to start it, since they're holding the invite, but if there's no thread the day before then either of you can. A routine check-in probably doesn't need one at all.

Use the thread to draft the agenda together and split it: who covers what, who leads which section, and what each of you wants out of the call. Two people on a call with no agreed split is how a customer ends up answering the same question twice.

Whoever set the call up and led it owns the follow-up, in the same thread so the prep and the outcome stay together: what happened, the next steps, and your read on who should pick up what. Propose the split rather than leaving it open, because it's much easier for your counterpart to correct a suggestion than to work out the division themselves from a list of notes. This is also where you'll feel the superpowers of the overlay, so give each other feedback on how the call went while you're there.

## Tracking people and tasks

You both need to be able to answer who someone is, and whether something got done, without asking the other person.

Two Slack canvases in the internal channel is one setup that's worked well on bigger accounts, one for people and one for tasks. It's an example rather than a standard, so take the shape and adapt it. On a smaller account, a single pinned message often does the same job with less to maintain.

Whatever you use, every champion should have exactly one name against them. An unowned champion is how accounts go dark without anyone noticing. And because canvases aren't searchable, roll the developments that matter into the account plan note in Customer Analytics as you go, so whoever inherits the account has something they can find.

<details>
<summary>How to run the two canvases</summary>

**`[customer_name] - People`.** A light org map of who you've encountered on the account so far. A simple table does the job: name, title, and whether the CSM or TAM has the relationship. The goal isn't to map the entire org, it's to have something easy to refer back to later.

Add people as you meet them rather than in a big sweep. Recording who has the relationship is the useful part: it means one of you notices when that contact goes quiet, and is their first port of call.

**`[customer_name] - Tasks`.** A running to-do list. Especially on larger accounts with large orgs, to-dos get complex very quickly, and this gives you both visibility into what needs doing and who owns what. One format that works: after every conversation with a customer, add a new section at the top with the date and the topics covered in the heading, then a checklist of the follow-up items with the CSM or TAM assigned to each.

Keep the newest section at the top and put a name on every item. If something has sat unchecked across three conversations, it's either not happening or it's blocked, and both are worth saying out loud in the channel.

</details>

## Posting in the channel, and sharing DMs

Post often: what you're thinking about, who you have a call scheduled with, open questions, an opportunity you're chasing down. Write as generously and freely as you would on a private scratchpad. It's the closest thing we have to a shared brain.

DMs with customer contacts happen, and that's fine. What's worth avoiding is the account picture living only in one person's DMs. Drop a short summary into the internal channel whenever a DM changes the plan, surfaces a risk, or commits PostHog to something. A summary, not a transcript: your counterpart needs the shift in the account, not the pleasantries.

One more that works well on quiet accounts. Tag team your follow-ups: one of you plugs something in the customer channel, and the other stands by to chime in with a follow-up to get a response.

## Who joins which call

On strategic accounts, default to both of you on most customer calls. We don't run many calls in the first place, the context you each pick up is usually worth more than the hour, and these are the accounts where being surprised by something your counterpart said costs the most.

On smaller growth accounts that's overkill. One of you running a routine check-in is fine as long as the follow-up lands in the internal channel, and it's a better use of the other person's day.

Wherever the account sits, the calls worth both of you being on are the ones where the relationship or the commercial picture is changing: renewals, business reviews, a competitor showing up, or anything going sideways.

## How often you sync

Somewhere between every other week and once a month works for most pairs. Monthly is a reasonable baseline, and worth making more frequent if you co-own several accounts and have more to get through than a month fits. Use one sync to cover every account you share rather than one per account.

It's the one slot where you're both looking at the same account at the same time, which is usually when overlapping plans and gaps actually surface. Just talking through what you're each thinking about is often what reveals them. The internal channel carries everything in between.

# **Dividing the work without blocking each other**

Having two people on the account enables depth _and_ breadth: relationship-building, use case optimization, implementation audits, and much more. But how can you both be the driver if there are two people in the same car?

A good starting point is to identify gaps in coverage and every open thread, then prioritize from there. A non-exhaustive list of questions to explore together:

- Is the customer struggling with a specific product? <PrivateLink url="https://posthog.slack.com/archives/C0B0K4EACH2/p1787237987414149">(example)</PrivateLink>
- What frustrations have they surfaced recently?
- What expansion opportunities are there?
- Is their implementation healthy? Are they due for a health audit? <PrivateLink url="https://posthog.slack.com/archives/C0B0UD92EG1/p1782344320472969">(example)</PrivateLink>
- Any cost optimization opportunities? <PrivateLink url="https://posthog.slack.com/archives/C0BAUUD4R5E/p1783969456929179">(example)</PrivateLink>

Then explicitly assign each other the dedicated paths to run with. Think of it as delegating tasks that you'd otherwise do yourself if it was only you on the account, and give each other the work streams where you have the highest likelihood of success. If a TAM has a warm relationship with the champion for a new product expansion, they should keep it rather than hand it off while it's a work in progress.

<details>
<summary>An example of both of you creating value at the same time, in separate product areas</summary>

- Customer is a heavy Experiments user, and they run into a lot of issues because of their sophisticated setup. But they're concentrated on that product, so we're also thinking about expansion opportunities to derisk the account.
- The CSM could focus on deepening the value the customer gets from Experiments by scheduling 1:1 feedback calls with power users to better understand their pain points and work on fixes.
- The TAM can focus on a net new cross-sell opportunity into AIO with a different set of stakeholders, and deepen the value from other products that have been adopted.
- Your parallel efforts unlock goodwill from the customer, bandwidth for the TAM to grow the account, and space for the CSM to go deep on debugging and instrumentation.
- The net effect: customer feels supported on multiple fronts.

</details>

By no means is this a hard rule (CSMs focused on instrumentation, TAMs focused on expansion). You'll overlap and switch at times, and be more siloed at others, depending on the account. Bigger accounts tend to need the split made explicit because there's more in flight, and on a smaller one it's often obvious enough to leave alone.

The test: if you can confidently answer at any time what your counterpart is working on, you're doing it right. If not, catch up on a call or post more often in the channel. The risk we're avoiding is duplicative or irrelevant work, so honor each other's time by communicating clearly and often.

## Reading account health together

The [health score](/handbook/cs-and-onboarding/health-tracking) is a customer success instrument, so the CSM owns reading it and keeping it current. That doesn't make it the CSM's problem alone, and it isn't worth dividing up between you either.

- **Same numbers, different questions.** The CSM asks what's degrading and why. The TAM asks where the headroom is, and which teams aren't represented in the usage yet.
- **Read it together on your sync.** Pull the account up and each say what you think it means. Ten minutes of that beats any amount of dividing the metrics up between you.
- **Whoever sees a component hit "Poor" posts it in the channel**, whatever it relates to. No component belongs to one person.

If a full [health check](/handbook/cs-and-onboarding/health-checks) is due, agree in the channel who's running it and who's reviewing the output before it goes to the customer.

<details>
<summary>Why splitting the score by role doesn't work</summary>

It's weighted to answer one question, "is this account at risk", so splitting it by owner gets you two people watching numbers that can't answer their own question. Product engagement makes up most of the score and is a lagging signal by design, so what you spot there is usually confirmation rather than warning. Total product count, probably the most useful headroom signal a TAM has, is a rounding error inside the weighting. And an account-level score averages away a single team going quiet, which bites hardest on strategic accounts where several teams use PostHog for different things.

</details>

# **Related reading**

- [Account allocation](/handbook/growth/sales/account-allocation) covers [adding a TAM](/handbook/growth/sales/account-allocation#adding-a-tam-to-an-account), [removing a TAM](/handbook/growth/sales/account-allocation#removing-a-tam-from-an-account), and [keeping the context with the CSM](/handbook/growth/sales/account-allocation#keeping-the-context-with-the-csm) when the overlay ends
- [Customer journey](/handbook/growth/sales/customer-journey#ownership-rules) for the coverage matrix by phase, and co-owned churn saves
- [Customer health tracking](/handbook/cs-and-onboarding/health-tracking) for what the score is actually made of
- [Quarterly account planning](/handbook/growth/sales/risk-mitigation-and-churn-prevention#quarterly-account-planning) for the account plan note format
