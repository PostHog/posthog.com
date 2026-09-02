---
title: CSM + TAM rules of engagement
sidebar: Handbook
showTitle: true
---

Some accounts have both a CSM and a TAM. The point is depth: two people sharing the load so each can focus on what they're best at, and the customer gets a better experience than one person stretched across everything.

Both roles have a real relationship with the customer. Both are in the Slack channel. Both know what's happening on the account. The difference is _focus_, not ownership.

The customer should never have to figure out who to contact. They reach out to either person, and PostHog sorts it out internally.

Which accounts get both, and when a TAM joins or comes off, is covered in [account allocation](/handbook/growth/sales/account-allocation). This page is about what the two of you do once you're both on.

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

### Renewals

Renewals sit with both of you, which is exactly why it's worth being specific about who does what.

For accounts with a TAM overlay, the TAM leads the commercial conversation (quote creation, accounting for growth/expansion/upsells, order form creation, etc.). The CSM owns the value case behind it: what the customer actually used, what they got out of it, and what their usage looks like going forward.

### What good looks like

- Customer reaches out to either person and gets a fast, informed response. They never think about who to contact.
- Both go deeper on their focus area than either could alone
- Customer knows both people, trusts both, feels like they have a team
- Neither person is surprised by what the other communicated
- Both are visible in Slack, not just when they need something
- Both are aligned on the current state of the customer, risks, opportunities and what their counterpart is working on.
- TAM and CSM alignment on the account happens in public, not DMs

### What bad looks like

- Customer gets told "that's not my area, let me get [other person]"
- Customer only hears from the TAM when PostHog wants to sell something
- Customer gets asked "how are things going?" by both people in the same week
- CSM discusses pricing without knowing the TAM had a deal in play
- TAM sends a cross-sell email without knowing the customer filed 3 support tickets yesterday
- Neither person responds because each assumed the other would
- TAM checks out on health because "the CSM handles that now"
- Customer has to explain the same thing twice

## When cost efficiency and growth pull against each other

The CSM's job includes helping a customer spend less. The TAM's job includes growing the account. Sooner or later those point in opposite directions on the same account, and pretending they don't is how one of you gets blindsided.

The customer's efficiency wins. A customer paying for waste has a reason to leave, and a right-sized customer is a far better expansion candidate than a resentful one.

What matters here is the process, not the conclusion:

- **Surface before you recommend.** If you're about to advise something that changes what the customer spends, say so in the internal channel first. Your counterpart may have a conversation in flight that you can't see.
- **Log the work as you do it**, in the internal channel and then in the account plan. Usage moves for all sorts of reasons, and a record of what you changed and when is the difference between a known optimization and an unexplained drop.
- **Neither of you should hear about it from the customer.**

# **Kicking off the CSM + TAM overlay**

When a TAM joins an account, or a CSM picks up an account that already has one, work through this list.

- [ ] Internal Slack channel created, using the naming convention `#customer-[customer_name]-internal`
- [ ] TAM/CSM counterpart, both team leads, Ben and Simon need to be invited. Invite the FDE too if they're doing any active work on the account
- [ ] Ensure your TAM/CSM counterpart is added to the external Slack channel (`#posthog-[customer_name]`)
- [ ] Whoever has the pre-existing relationship should create a note in Customer Analytics with a context dump on the history and current state of the account
- [ ] Whoever is joining has posted their own read of the account, plus one action item they're picking up
- [ ] Regular internal sync booked with your counterpart, if you don't already have one for another account
- [ ] TAM should create an account plan note in Customer Analytics as soon as they have a read on priorities for the account
- [ ] Create a running canvas in the internal Slack channel with a list of relevant people and a light org map of who you've encountered on the account so far. Call it `[customer_name] - People`. A simple table does the job: name, title, and whether the CSM or TAM has the relationship
  - The goal isn't to map the entire org, it's to have something easy to refer back to later
- [ ] Create another canvas to maintain to-dos on a running basis, called `[customer_name] - Tasks`
  - Especially on larger accounts with large orgs, to-dos get complex very quickly. This canvas gives you both visibility into what needs doing and who owns what
  - After every conversation with a customer, add a new section at the top with the date of the conversation and the topics covered in the heading
  - Within each section, keep a checklist of every follow-up item, with the CSM or TAM assigned to it
- [ ] Bonus: add any important dates (renewal, 6 month discount expiry, projected credit depletion date) to the internal channel

Both of you share the responsibility of making sure the other has enough context to be effective on the account.

## Create an internal Slack channel

Create a channel using the naming convention `#customer-[customer_name]-internal`. Invite your counterpart, respective Team Leads, Ben and Simon to the channel. If there's an FDE doing active work on the account, invite them too.

This channel effectively replaces DMs between TAMs and CSMs related to the account. Your public collaboration here will be a huge service to future teammates who might inherit the account.

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

Add your counterpart to the customer's external Slack channel (`#posthog-[customer_name]`). Use your judgement for when to introduce them to the wider customer team, and relay that guidance so you stay aligned on timing.

When you do introduce them, frame it positively - the customer's PostHog team is growing, not that they're being handed off (here’s a solid [example](https://posthog.slack.com/archives/C090RCG671C/p1777565614828089)).

Run the intro past your counterpart before you send it. They'll often spot something that makes it warmer: relevant history with a similar customer, a specialty that lines up with what this one is struggling with, or previous experience worth name-checking. A customer who is excited to meet the new person starts the relationship somewhere much better than one who is politely acknowledging a new name.

If you're aware of any low-hanging fruit that would land well with the customer, hand it to your counterpart rather than doing it yourself, and let them be the one to deliver it. It's a cheap way for them to kick off on a good note, and it's worth more coming from the person who needs to build the relationship.

> **The underlying principle:** The goal is to outdo one another in service. Getting current on the account and elevating relevant context makes you both better experts, which directly improves the quality of your customer-facing work.

# **Where things live**

Four places, each with a job. The failure mode is everything ending up in the channel and nothing surviving the week.

| What | Where | Why there |
| --- | --- | --- |
| Per-call agenda and follow-up | Thread in the internal channel | Tied to a date, notifies you both, and the prep sits next to the outcome |
| Who's who on the customer side | `[customer_name] - People` canvas | Continuously rewritten, and there's no value in the history |
| Open follow-ups and who owns them | `[customer_name] - Tasks` canvas | You both need the current list at a glance, not scattered through a channel |
| Anything a future owner would need | Account plan note in Customer Analytics | Searchable, and it outlives the channel |

The rule that keeps this honest: **if losing it would hurt whoever inherits this account, it doesn't live only in a canvas.**

## Call threads

Whoever booked the call starts a thread in the internal channel, ideally a few days ahead. That's a default rather than a rule, it just tends to be the person holding the invite. If there's no thread 24 hours before, either of you should start it.

Use the thread to draft the agenda together and split it: who covers what, who leads which section, and what each of you wants out of the call.

Whoever set the call up and led it owns the follow-up, and it goes in the same thread so the prep and the outcome stay together. Cover what happened, the next steps that came out of it, and your read on who should pick up what between the two of you. Propose the split rather than leaving it open. It's much easier for your counterpart to correct a suggestion than to work out the division themselves from a list of notes. Once you've agreed the split, the follow-up items move onto the Tasks canvas.

Two people on a call with no agreed split is how a customer ends up answering the same question twice.

## Keeping the canvases current

Both canvases only work if they're maintained, and neither takes long.

**`[customer_name] - People`.** Add people as you meet them rather than in a big sweep. The relationship column is the useful part: it means one of you is the person who notices when that contact goes quiet, and is their first port of call. Every champion should have exactly one name against them. An unowned champion is how accounts go dark without anyone noticing.

**`[customer_name] - Tasks`.** Newest dated section at the top, so the current state of play is the first thing either of you reads. Every item carries a name. If an item has been sitting unchecked across three sections, it's either not happening or it's blocked, and both are worth saying out loud in the channel.

Canvases aren't searchable, so roll the developments that matter into the account plan note in Customer Analytics as you go. That way the canvases stay short enough to actually read, and whoever inherits the account later has something they can find.

## Sharing DMs

DMs with customer contacts happen, and that's fine. The rule is that the account picture never lives only in one person's DMs.

Drop a short summary into the internal channel whenever a DM changes the plan, surfaces a risk, or commits PostHog to something. A summary, not a transcript. Your counterpart needs the shift in the account, not the pleasantries. If it creates a follow-up, it belongs on the Tasks canvas.

## Who joins which call

Default to both of you on every customer call. We don't run many calls in the first place, so the cost of both attending is low, and the context you each pick up is worth more than the hour.

Skip it when it's genuinely inconvenient: an awkward timezone, or a short working session that sits squarely inside one person's workstream. If you're both on, split the agenda in the thread first.

## Cadence

Meet every other week or once a month, whichever suits the account, and use one sync to cover every account you share rather than one per account. The internal channel carries everything in between.

# **Watching account health together**

The [health score](/handbook/cs-and-onboarding/health-tracking) is a customer success instrument, so the CSM owns reading it and keeping it current. That doesn't make it the CSM's problem alone.

Resist the urge to divide the score up by role. It's weighted to answer one question, "is this account at risk", and splitting it by owner gets you two people watching numbers that can't answer their own question. Product engagement makes up most of the score and is a lagging signal by design, so what you spot there is usually confirmation rather than warning. Total product count, probably the most useful headroom signal a TAM has, is a rounding error inside the weighting. And an account-level score averages away a single team going quiet.

What works better:

- **Same numbers, different questions.** The CSM asks what's degrading and why. The TAM asks where the headroom is and which teams aren't represented in the usage yet.
- **Read it together on your regular sync.** Pull the account up and each say what you think it means. Ten minutes of that beats any amount of dividing the metrics up between you.
- **Whoever sees a component hit "Poor" posts it in the channel**, whatever it relates to. No component belongs to one person.

If a full [health check](/handbook/cs-and-onboarding/health-checks) is due, agree in the channel who's running it and who's reviewing the output before it goes to the customer.

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

**Example scenario where you can both create value in separate product areas at the same time, whilst playing to your unique strengths as a TAM and CSM:**
- Customer is a heavy Experiments user, and they run into a lot of issues because of their sophisticated setup. But they're concentrated on that product, so we're also thinking about expansion opportunities to derisk the account. 
- The CSM could focus on deepening the value the customer gets from Experiments by scheduling 1:1 feedback calls with power users to better understand their pain points and work on fixes.
- The TAM can focus on a net new cross-sell opportunity into AIO with a different set of stakeholders and deepen the value from other products that have been adopted. 
- In this scenario, your parallel efforts unlock goodwill from the customer, bandwidth for the TAM to grow the account, and space for the CSM to go deep on debugging and instrumentation on their existing product adoption. 
- The net effect: customer feels supported on multiple fronts.

By no means is this a hard rule (CSMs focused on instrumentation, TAMs focused on expansion). There will be times where you overlap and switch, and other times where you're more siloed due to the nature of the account. 

You should always ensure you have clarity on your parallel work streams. If you can confidently answer at any time what your counterpart is working on related to the account, then you're doing it right. If not: make time to catch up on a call or async, or share what you're working on in your internal customer channel more frequently! 

The risk we're avoiding is duplicative or irrelevant work. Your time is incredibly valuable, so honor each other's time by communicating clearly and often. 

## Concrete ways to work well together

How can you both be the driver if there are two people in the same car? Put another way, if you're sharing an account with someone, how do you avoid blocking each other whilst working together? 

While this process isn't perfect, here are a few good habits that protect your autonomy and effectiveness:
1. **Post often in the internal channel:** what you're thinking about, who you have a call scheduled with, open questions you have, an opportunity you're chasing down... anything. Write as generously and freely as you would on a private scratchpad - it's the closest thing we have to a shared brain.
2. **Document as much as you can in Customer Analytics:** all of the relevant details, developments, learnings, plans, etc. from your internal threads should have their equivalent version as a note on the account in Customer Analytics.
3. **Use each other to sense check:** consider having a monthly call where you catch up on all things related to your shared accounts - just talking through what you're thinking about can help reveal parallel work streams. 
4. **Debrief after customer calls:** this is where you'll feel the superpowers that come with a CSM + TAM overlay - give each other feedback, get clear on next steps, and review how the call went. 
5. **Tag team follow ups:** one of you plugs something in the customer channel; the other is aware of this and stands by to chime in with a follow-up to get a response. Works like a charm for unresponsive customers. 

# **Related reading**

- [Account allocation](/handbook/growth/sales/account-allocation) covers [adding a TAM](/handbook/growth/sales/account-allocation#adding-a-tam-to-an-account), [removing a TAM](/handbook/growth/sales/account-allocation#removing-a-tam-from-an-account), and [keeping the context with the CSM](/handbook/growth/sales/account-allocation#keeping-the-context-with-the-csm) when the overlay ends
- [Customer journey](/handbook/growth/sales/customer-journey#ownership-rules) for the coverage matrix by phase, and co-owned churn saves
- [Customer health tracking](/handbook/cs-and-onboarding/health-tracking) for what the score is actually made of
- [Quarterly account planning](/handbook/growth/sales/risk-mitigation-and-churn-prevention#quarterly-account-planning) for the account plan note format
