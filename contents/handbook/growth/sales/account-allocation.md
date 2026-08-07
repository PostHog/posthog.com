---
title: Account allocation and handover
sidebar: Handbook
showTitle: true
---
We have different roles who manage customers through their lifecycle. Customers typically sign up and start paying on their own, or land via a [Technical Account Executive](/handbook/growth/sales/how-we-work#technical-account-executives). Once an account hits $20k a year in spend, a Customer Success Manager becomes the point of contact. A Technical Account Manager is added on top only where there's a qualified growth opportunity.

The [customer journey and coverage model](/handbook/growth/sales/customer-journey) covers the phases an account moves through and who covers it at each one. This page covers the operational side: book planning, how TAMs get added and removed, and handover mechanics.

We're partway through this transition. Not every $20k+ account has a CSM yet, so some accounts are TAM-only for now. The rules below describe where we're headed. Where today works differently, we've noted it.

## How coverage works

### CSMs are the base layer

Every $20k+ account gets a [CSM](/handbook/cs-and-onboarding/customer-success). They own the relationship: onboarding depth, product health, engagement, retention. If nothing else is happening on an account, the CSM is who the customer knows.

### TAMs are an overlay

A [TAM](/handbook/growth/sales/how-we-work#technical-account-managers) joins an account only when there's a qualified expansion opportunity. That could be cross-sell, workload expansion, annual conversion, or a renewal worth actively working. How to judge whether an opportunity is real is covered in [how to evaluate an account's revenue growth potential](/handbook/growth/sales/evaluating-growth-potential). Without a qualified opportunity, the account stays CSM-only.

In [customer journey](/handbook/growth/sales/customer-journey) terms: a TAM is on an account while it's Expanding (or Implementing, when a deal closed with a qualified opp already attached). When the account reaches Steady state, the TAM comes off. The CSM was there the whole time, so nothing gets handed over.

When both are on an account, who does what is covered in [CSM + TAM rules of engagement](/handbook/growth/sales/csm-tam-overlay-coverage).

Where there's expansion potential but no TAM capacity yet, an account can sit CSM-only until a TAM can be added.

### A note on primary products

We used to route accounts between TAM and CSM based on primary product adoption (Session Replay, Feature Flags, Error Tracking, tracked in Vitally as `Paying for <Product Name>`). That was the old model. Product count is still a decent rough signal, since an account paying for all three is often closer to saturated. Rather than using a strict product adoption method, we rely on the framing in [how to evaluate an account's revenue growth potential](/handbook/growth/sales/evaluating-growth-potential) to determine if there's actually expansion potential.

### Churn saves

An at-risk account follows the [risk mitigation and churn prevention](/handbook/growth/sales/risk-mitigation-and-churn-prevention) playbook, same as always. Flag early with the Churn Risk segment, dig into the why, and run the save.

When both a TAM and a CSM are on the account, they co-own the save. Both are responsible, and neither should assume the other is handling it.

An account going at risk is also not a reason to add a TAM. Churn saves are generally not a legitimate TAM opportunity. Risk on a CSM-only account stays with the CSM unless a genuine expansion opportunity qualifies through the normal path.

### Below $20k

Accounts below $20k don't get a CSM or TAM. The [coverage map](/handbook/growth/sales/customer-journey#coverage-map) covers who (or what) handles them, including Growth TAM coverage and automation.

---

## TAM book balance

TAM book size is set by ARR under management. Account count follows from that. This mirrors how [CSM books](/handbook/cs-and-onboarding/how-we-work) are balanced, by shape as well as total.

- **Target:** $1.5M to $2.5M ARR per TAM. This usually works out to 12-18 accounts.
- **Rough makeup:** 1-2 accounts around $200k ARR, 3-4 around $100k, and the rest in the $30k-$100k range.

Beyond total size, a balanced book also needs:

- **Billing mix.** At least 40% of book ARR on monthly billing. Annual accounts still have plenty to work: renewals, cross-sells, and expanding into more of the org. But monthly accounts are where annual conversions come from, and usage growth there turns into cash faster, so a book with little monthly billing has a thin conversion pipeline.
- **Conversion candidates.** At least 2 accounts above $100k ARR with a realistic path to an annual conversion this year.
- **A staggered renewal calendar.** If half your book renews in the same quarter, a single weak quarter can set back the whole year, so spread renewals across the calendar.
- **Concentration awareness.** Two $200k accounts can be a quarter of your book. That's fine, but know what losing one does to your number. Don't stack more concentration than that.

If your book is outside these bounds at quarter start, work with your team lead to rebalance.

## Adding a TAM to an account

There is no CSM to TAM handoff anymore, because the CSM never leaves. Instead, when someone spots a growth opportunity on a CSM-covered account, they flag it for a TAM.

Anyone can flag: the CSM, a TAE, support, or automated alerts. The flag routes to a TAM in the right region for qualification.

The receiving TAM qualifies the opportunity using the [growth potential framework](/handbook/growth/sales/evaluating-growth-potential). If it holds up, they join the account as the overlay, open the opp, and intro themselves to the customer with the CSM's help. If it doesn't, they document why in Vitally and the account stays CSM-only. A documented "no" is still useful. It stops the next person re-litigating the same idea in 3 months.

We track coverage in Vitally with the existing segments: `CSM Managed` for the base layer and `AM Managed` for the TAM overlay. An account with both segments has both.

---

## Removing a TAM from an account

A TAM stays on an account through expansion until it's fully saturated, not just until the first opportunity closes. As long as there's a realistic next play to work (another cross-sell, a new team to land, an annual conversion), the TAM keeps the account and works it. They come off once expansion is genuinely exhausted. In [journey](/handbook/growth/sales/customer-journey) terms, the account moves to Steady state and the overlay is removed. The CSM stays, so the customer keeps their point of contact throughout.

A TAM being willing to release an account is itself a decent signal the upside is gone. TAMs are paid on their book, so they don't give up real opportunities lightly. But treat it as a signal and sanity check it. Team leads should verify before agreeing.

Removing a TAM is usually a good outcome, and typically means a healthy, expanded customer. Inventing an opportunity to justify staying on is worse than coming off cleanly.

TAM removals generally happen at the end of the quarter. Accounts can be added to a book at any time, but plan removals for quarter end so books stay stable and handovers get done properly rather than rushed mid-quarter.

### Keeping the context with the CSM

The CSM stays on, so nothing about the customer relationship changes from their side. But the TAM knows things the CSM doesn't, and that context has to land somewhere before they leave:

- **A handover note in Vitally** covering: what expansion plays were run and how they went, commercial context (discounts given and why, anything promised, credit terms), open threads, and who the real decision makers are. Use the [handover note skill](https://github.com/PostHog/skills/tree/main/skills/team/product-led-sales/account-handover).
- **A 15 minute call with the CSM** to cover what's not in the data. Politics, sensitivities, what you'd try next if a new opportunity shows up.
- **The Slack channel stays open.** The CSM keeps it. Don't archive it. Channel archival only applies when an account exits managed coverage entirely.
- **Removing the TAM in Vitally.** Once the note and call are done, the team lead removes the TAM and the `AM Managed` segment from the account, with Ben's approval.

If the same account gets a qualified opportunity later, it goes back through the normal flag and qualification path. The handover note is what lets the next TAM (maybe you) pick it up fast.

### What is NOT a valid reason to come off an account

Low engagement or an account being difficult is not a reason to come off. That's the job. Specifically:

- Account doesn't respond to your outreach
- Champion left and you haven't re-established relationships
- Low user activity or poor health score
- You don't like working with them / they don't like you

If an account is struggling on these dimensions, that's a signal to invest more. The saturation checks require *evidence* that the opportunity is gone; an account being hard to work is not the same as the opportunity being gone.

---

## Doing the allocation

It's Simon's job, with input from Ben and Team Leads, to review the list of [$20K accounts without an owner](https://posthog.vitally-eu.io/hubs/152ccd4c-c7b2-4508-865b-b08fea5c3dc6/1c518181-54a5-4c59-98de-f0b0bb54f9c3), as well as accounts flagged by TAEs and TAMs. The CSM assignment is the base layer. A TAM is added where an opportunity qualifies. We use Vitally data to understand which region the account is primarily based in. Looking at the user list in Vitally will show you where the most users are, so make a judgement call on where the CSM or TAM should be based to best support the customer. Once decided, the New Owner trait is populated with one of the following:

- US TAM
- US CSM
- EU TAM
- EU CSM

And then it is down to the Team Leads to figure out which team member is taking on the customer.

### Quarterly allocation process

At the start of each quarter, Simon (with input from Ben and Team Leads) reviews:

1. **[$20K accounts without an owner](https://posthog.vitally-eu.io/hubs/152ccd4c-c7b2-4508-865b-b08fea5c3dc6/1c518181-54a5-4c59-98de-f0b0bb54f9c3)** – accounts that need a CSM assigned
2. **Accounts flagged for handover** from TAEs and TAMs
3. **TAM books outside the $1.5M-$2.5M ARR band** – identifying which accounts to rebalance
4. **Flagged growth opportunities on CSM-only accounts** – identifying where to add a TAM

Once Simon determines the region and whether a TAM should be added, the `New Owner` trait is populated, and Team Leads assign the specific team member.

### Mid-quarter changes

Account removals should only happen at the end of the quarter so that quota can be calculated correctly. However, accounts can be **added** to your book at any time if you're confident there's growth potential.

If you're assigned an account with a previous owner, work with them on a proper handover. If the customer isn't in a healthy state (usage and engagement-wise), push back and ask the previous owner to get them to a good state first.

> New accounts with no previous owner come with a 3 month grace period – if they churn in that initial period, they won't count against your quota. Don't ask for the `AM Managed` segment to be added until you're confident there's growth potential.

---

## Top 40 account management

Our highest-spend customers (~Top 40 by ARR) get special consideration. Adding or removing a TAM on a Top 40 account is decided directly by Simon and Ben rather than the standard Team Lead process. The bar for change is higher here. Sometimes a TAM stays on a saturated account because the relationship is strong and there's long-term strategic value.

---

## Handing over customers

To help the new owner hit the ground running, we should make sure the customer is in a good state and a warm introduction happens.

TAE handoff goes to a CSM, always. This typically happens when onboarded, around 3 months after the initial credit purchase, or 12 months after the initial credit pre-purchase if the TAE retains the account against a specific opportunity (see the [journey page ownership rules](/handbook/growth/sales/customer-journey#ownership-rules)). If a qualified expansion opportunity exists at handover, a TAM is added at the same time.

TAM add and removal aren't handoffs, since the CSM stays throughout. See [Adding a TAM](#adding-a-tam-to-an-account) and [Removing a TAM](#removing-a-tam-from-an-account) above.

> For accounts who will be landing at $100k+ a year or have high expansion potential after the initial deal, we should involve a TAM early in the process to ensure a smooth transition. See the section further down this page on how this works.

- When judging growth potential, use [how to evaluate an account's revenue growth potential](/handbook/growth/sales/evaluating-growth-potential)
- When in doubt, ask yourself: do I see this account growing in the next year? If not, it doesn't need a TAM

For handover to take place there should be an Account Plan (saved as a note on the account in Vitally) and the customer should have been onboarded properly to the products they are currently paying for.

> All open invoices should also have been paid before handing over. It makes sense to use existing relationships to chase payments, rather than the new owner's first action needing to be chasing payments/suspending access for non-payment.

> For TAE accounts being handed over, set the New Owner to `Ready to move` in Vitally and then flag this with Simon directly.  There's no need to wait for the end of the quarter to do this.  He will review the plan and current state of the customer and then work with TAM or CSM leads to assign a new owner.

### Account Plan

Every account being handed over should have an up-to-date [Account Plan](/handbook/growth/sales/risk-mitigation-and-churn-prevention#quarterly-account-planning) saved as a note in Vitally. The existing owner should ensure that this is current and schedule a handover call to walk through it with the new owner. Feel free to push back and ask for it as the new owner if this doesn't happen! Ask your team lead or [Simon](/community/profiles/28895) for help with this if you're not getting the information you need from the previous owner.

### Product Onboarding

Before handing over a customer, the existing owner needs to ensure that the customer is onboarded properly to the products they are paying for. We should first ensure that they are only paying for what they need to as detailed in the [health checks](/handbook/cs-and-onboarding/health-tracking) section of the handbook and then ensure the following steps have been completed, depending on the products they are paying for:

> This is an initial pass at what good onboarding looks like for each product. We will refine this and add it to Vitally as a checklist to work through with the customer.

#### General principles

- They are aware of how to get support both via Slack and in-app and where in-app is more appropriate.
- They have the correct owners and admins set up in their PostHog organization.
- We have the correct finance contact details in Stripe.

#### Product analytics

- They have set up tracking, implementing posthog.identify() and posthog.group() correctly where appropriate.
- They are aware of the difference between anonymous and identified events.
- Event capture is tuned and automatic events have been turned off where not wanted.
- We have completed training for the core user base, so that they are aware of concepts such as Actions, Cohorts etc.
- They have set some insights and dashboards aligned with their use case for PostHog.

#### Session replay

- They have set up tracking using posthog-js.
- They are aware of the different recording controls and how to use them.
- They have implemented privacy controls where necessary.
- We have completed training for the core user base so that they know how to find specific recordings, as well as navigate from other products to session replays (e.g. from a funnel)

#### Feature flags

- They understand how to integrate feature flags into their workflow.
- Feature flag calls are implemented correctly so as not to artificially inflate the bill.
- They understand the current targeting mechanisms which are available.
- We've conducted training on how to set up Feature Flags and Experiments.

#### Data warehouse

- They have connected up the sources they need to.
- They are aware of the difference between incremental and full sync and the impact on billing.
- We've conducted training on using SQL in PostHog, creating views and joining on person data.

#### Error Tracking

- They have set up tracking using posthog-js.

---

## Account handover checklist 

Every account handover should include a 15-30 minute call between the outgoing and incoming owner. This checklist helps you prep for that call and make sure nothing falls through the cracks.

### When to use this

- When a TAE-led customer is being handed over to a TAM after the initial contract is signed
- When a TAM is taking over an account from another TAM or TAE mid-lifecycle
- As a prep guide for the 15-30 minute handover call between outgoing and incoming owner

### Before the handover call

The incoming TAM should prepare by reviewing the following in Vitally and SFDC before the call, so the handover conversation can focus on context that *isn't* in the data.

#### Self-serve research (do this first)

- [ ] **Vitally account overview** – MRR, ARR, health score, segments, paid products, usage traits
- [ ] **Billing & contract details** – annual plan dates, credit balances, discounts, renewal date, billing limits
- [ ] **Product adoption** – which products are they paying for? What's underutilized?
- [ ] **Usage metrics** – active users, project count, Feature Flag requests, Session Replay volume, insight/dashboard engagement
- [ ] **Support history** – recent tickets in [PostHog Support](https://us.posthog.com/project/2/support/tickets), tags, priority, resolution status
- [ ] **Conversations & notes** – read all Vitally notes, meeting summaries, and conversation history
- [ ] **Customer Slack channel** – scan the shared channel for who's actually active on the customer side, what issues have come up, and any open threads worth asking the previous owner about. This is often where the most useful context lives.
- [ ] **Internal Slack discussions** – search our own Slack (outside the shared channel) for mentions of the customer. Engineering debates, pricing conversations, support escalations, and context from the previous owner often surface things that were never written down in Vitally.
- [ ] **SFDC opportunity** – deal value, stage, next steps, close date
- [ ] **Admin emails & user list** – identify who's active, who has admin access, what domains are in play
- [ ] **The customer's product** – sign up or browse their website. Understand what they do and how they make money

Prepare questions based on gaps in the data. The handover call should focus on things you *can't* learn from Vitally.

### Handover call agenda

This isn't an exhaustive list and not every item needs to be covered every time. Use your judgment based on what's relevant to the account.

#### 1. Relationships & people

This is the most valuable part of the handover – relationship context doesn't live in any tool.

- [ ] **Who is the champion?** Name, role, communication style, what motivates them
- [ ] **Who is the economic decision-maker?** Who signs off on renewals and expansion?
- [ ] **Who are the power users?** Engineers, PMs, analysts – who lives in PostHog daily?
- [ ] **Org structure?** Parent/subsidiary dynamics, relevant teams, reporting lines
- [ ] **Any recent people changes?** Champions who left, new hires, reorgs
- [ ] **General vibe?** Easy to work with? High-maintenance? Responsive or hard to reach?
- [ ] **Preferred communication style?** Slack-first? Email? Regular calls or async?
- [ ] **Has the customer been told about the handover?** If not, agree on how to introduce the new TAM

#### 2. Commercial context

- [ ] **Open proposals or negotiations** – anything in-flight that needs immediate follow-up?
- [ ] **Renewal strategy** – what's the plan? Any risks?
- [ ] **Discount/credit context** – why were discounts given? What was promised?
- [ ] **Budget & procurement** – annual budget cycle, procurement process, finance contacts
- [ ] **Expansion potential** – realistic growth ceiling? New teams, new brands, new products?

#### 3. Technical & product state

- [ ] **Implementation maturity** – basic tracking or advanced setup?
- [ ] **Known technical issues** – open bugs, workarounds, or frustrations?
- [ ] **Integration landscape** – what else are they using? Any competitors still in play?
- [ ] **Product gaps** – feature requests or limitations that are blockers? Note any features with committed delivery timelines from our product teams
- [ ] **Onboarding completeness** – per the [onboarding checklist](/handbook/growth/sales/account-allocation#product-onboarding), which products are properly onboarded?

#### 4. Risks & opportunities

- [ ] **Top risks** – what keeps you up at night? Champion risk, competitor risk, budget risk?
- [ ] **Top opportunities** – lowest-hanging fruit for expansion or deeper adoption?
- [ ] **Unfinished business** – anything you wanted to do but didn't get to?
- [ ] **Anything I should avoid?** Sensitive topics, past friction, internal politics?

### After the handover call

#### Immediate actions (within 1 week)

- [ ] **Update Vitally** – ensure New Owner trait is set, update account plan note with handover context
- [ ] **Save an account plan** – create or update the [account plan](/handbook/growth/sales/account-planning) as a Vitally note, incorporating handover insights
- [ ] **Introduce yourself to the customer** – warm intro (ideally the TAE introduces you) or cold intro via Slack/email
- [ ] **Follow up on any open items** – pick up in-flight proposals, unresolved tickets, or pending conversations

### Tips for a good handover

- **Focus the call on what's not in the data.** You can read Vitally yourself – use the call for relationship context, political dynamics, and unwritten history.
- **Ask "what would you do next if you were keeping this account?"** This often surfaces the most actionable insight.
- **Move fast on your intro.** The longer the gap between handover and first contact, the more momentum you lose.
- **Keep the previous owner in the loop** for the first few weeks if there are open commercial conversations. In some cases they can also serve as a secondary support point for timezone coverage or as an escalation contact.

### Unassign yourself in Vitally

Once the handover is complete, the outgoing owner should unassign themselves from the account in Vitally. This keeps Vitally accurate about who is actually on the account.

---

## Receiving an account as a CSM

CSMs receive every $20k+ account, whether from a TAE at close or when a TAM comes off. Accounts arriving from a TAM should generally be in a steady state: using the products they need, engaged, no major unresolved issues. It's worth looking beyond the surface to make sure that's actually the case. These aren't a rigid checklist. They're things to dig into that can surface problems which are otherwise easy to miss.

### Billing and commercial

- **Open invoices** — verify these have been resolved per the [handover requirements above](#handing-over-customers). You don't want your first interaction with a customer to be chasing payment.
- **MRR trajectory** — is spend steady, declining, increasing, or swinging around? Declining or volatile MRR is worth digging into before you take over.
- **Credit purchases** — if they've pre-purchased credits, does the amount actually line up with what they're spending month to month?
- **Non-standard discounts** — review the contract for anything unusual or undocumented. If discounts exist without clear documentation, get context from the previous owner.

### Product adoption

- **Core product coverage** - see [How coverage works](#how-coverage-works). Receiving accounts with only 1 core product adopted is normal. It just means the previous owner determined there isn't a realistic path to expand right now, and that reasoning should be documented.
- **Deployment health** — if the customer doesn't have basic recommendations in place (e.g. session replay minimum duration, high identify call volume), that's a flag. Check the [customer deployment health check guide](/handbook/cs-and-onboarding/health-checks) and the Metabase dashboard to assess this. The [product onboarding checklist](#product-onboarding) is also a good reference for what "properly set up" looks like.
- **Unexplained usage changes** — big spikes or drops that aren't documented, or where there's no record of a conversation with the customer about them. These can indicate problems nobody's looked into yet.

### Engagement

- **One-sided relationship** — is there a pattern of outreach from our side with no customer engagement? If it's been a one-sided conversation, understand why before you take over.
- **User concentration** — is usage concentrated among fewer than 3 users? That's inherently risky. Have there been attempts to engage beyond those users? If so, why haven't they been successful?

### Account documentation

- **Account plan** — one should already exist per the [handover requirements above](#account-plan). Check that it's actually there and current — don't assume.

### Lower priority

Worth being aware of, but less likely to be blockers:

- **Open support tickets** — any unresolved tickets or known frustrations with specific products?
- **Upcoming features** — anything in the pipeline that's relevant to this customer and worth proactively sharing?

### Pushing back

If you're seeing multiple flags — declining usage, no engagement, concentrated users, missing account plan — push back. An account with several of these signals isn't in steady state and probably needs more work from the previous owner before it's ready for CSM. Talk to [Dana](/community/profiles/52723) if you're unsure whether to accept an account.

---

## High potential customers

For TAE-led customers who will be landing at $100k+ a year or have high expansion potential into new product areas, we should introduce a TAM earlier on than normal.

The prime time for this is when the technical win is confirmed - the TAM should be introduced to the customer by the TAE in an evaluation or POC wrap-up call when we know that the customer has selected PostHog.

The introduction is purely for relationship building and continuity purposes so that the TAM can hit the ground running with the customer after the initial credit pre-purchase is signed. It's still on the TAE to work with the customer on the deal, and as such only the TAE will be recognized on the initial deal for commission purposes. After the initial deal is closed won the TAM will take over the account in their book of business.

The TAE and TAM should use their overlapping time to work with the customer on a documented onboarding plan per the above guidance.
