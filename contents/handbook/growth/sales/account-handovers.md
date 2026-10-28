---
title: Account handovers
sidebar: Handbook
showTitle: true
---

How to hand an account over to a new owner. [Account allocation](/handbook/growth/sales/account-allocation#when-an-account-moves-owner) covers when an account moves; this page is the mechanics.

### Account Plan

Every account being handed over should have an up-to-date [Account Plan](/handbook/growth/sales/risk-mitigation-and-churn-prevention#quarterly-account-planning) saved as a note in Customer Analytics. The existing owner should ensure that this is current and schedule a handover call to walk through it with the new owner. Feel free to push back and ask for it as the new owner if this doesn't happen! Ask your team lead or [Simon](/community/profiles/28895) for help with this if you're not getting the information you need from the previous owner.

### Product Onboarding

Before handing over a customer, the existing owner needs to ensure that the customer is onboarded properly to the products they are paying for. We should first ensure that they are only paying for what they need to as detailed in the [health checks](/handbook/customer-success/health-tracking) section of the handbook and then ensure the following steps have been completed, depending on the products they are paying for:

> This is an initial pass at what good onboarding looks like for each product. We will refine this checklist as we learn what works.

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

The incoming TAM should prepare by reviewing the following in Customer Analytics and SFDC before the call, so the handover conversation can focus on context that *isn't* in the data.

#### Self-serve research (do this first)

- [ ] **Customer Analytics account overview** – review the account profile and available customer context
- [ ] **Billing & contract details** – annual plan dates, credit balances, discounts, renewal date, billing limits
- [ ] **Product adoption** – which products are they paying for? What's underutilized?
- [ ] **Usage metrics** – active users, project count, Feature Flag requests, Session Replay volume, insight/dashboard engagement
- [ ] **Support history** – recent tickets in [PostHog Support](https://us.posthog.com/project/2/support/tickets), tags, priority, resolution status
- [ ] **Conversations & notes** – read all Customer Analytics notes, meeting summaries, and conversation history
- [ ] **Customer Slack channel** – scan the shared channel for who's actually active on the customer side, what issues have come up, and any open threads worth asking the previous owner about. This is often where the most useful context lives.
- [ ] **Internal Slack discussions** – search our own Slack (outside the shared channel) for mentions of the customer. Engineering debates, pricing conversations, support escalations, and context from the previous owner often surface things that were never written down in Customer Analytics.
- [ ] **SFDC opportunity** – deal value, stage, next steps, close date
- [ ] **Admin emails & user list** – identify who's active, who has admin access, what domains are in play
- [ ] **The customer's product** – sign up or browse their website. Understand what they do and how they make money

Prepare questions based on gaps in the data. The handover call should focus on things you *can't* learn from Customer Analytics.

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
- [ ] **Renewal ownership** – who on the customer side owns the renewal, the champion or procurement? How long did the last one take?
- [ ] **Discount/credit context** – why were discounts given? What was promised?
- [ ] **Budget & procurement** – annual budget cycle, procurement process, finance contacts
- [ ] **Expansion potential** – realistic growth ceiling? New teams, new brands, new products?

#### 3. Technical & product state

- [ ] **Implementation maturity** – basic tracking or advanced setup?
- [ ] **Known technical issues** – open bugs, workarounds, or frustrations?
- [ ] **Integration landscape** – what else are they using? Any competitors still in play?
- [ ] **Product gaps** – feature requests or limitations that are blockers? Note any features with committed delivery timelines from our product teams
- [ ] **Onboarding completeness** – per the [onboarding checklist](#product-onboarding), which products are properly onboarded?

#### 4. Risks & opportunities

- [ ] **Top risks** – what keeps you up at night? Champion risk, competitor risk, budget risk?
- [ ] **Top opportunities** – lowest-hanging fruit for expansion or deeper adoption?
- [ ] **Unfinished business** – anything you wanted to do but didn't get to?
- [ ] **Anything I should avoid?** Sensitive topics, past friction, internal politics?

### After the handover call

#### Immediate actions (within 1 week)

- [ ] **Update Customer Analytics** – ensure New Owner property is set, update account plan note with handover context
- [ ] **Save an account plan** – create or update the [account plan](/handbook/growth/sales/account-planning) as a Customer Analytics note, incorporating handover insights
- [ ] **Introduce yourself to the customer** – warm intro (ideally the TAE introduces you) or cold intro via Slack/email
- [ ] **Follow up on any open items** – pick up in-flight proposals, unresolved tickets, or pending conversations

### Tips for a good handover

- **Focus the call on what's not in the data.** You can read Customer Analytics yourself – use the call for relationship context, political dynamics, and unwritten history.
- **Ask "what would you do next if you were keeping this account?"** This often surfaces the most actionable insight.
- **Move fast on your intro.** The longer the gap between handover and first contact, the more momentum you lose.
- **Keep the previous owner in the loop** for the first few weeks if there are open commercial conversations. In some cases they can also serve as a secondary support point for timezone coverage or as an escalation contact.

### Unassign yourself in Customer Analytics

Once the handover is complete, the outgoing owner should unassign themselves from the account in Customer Analytics. This keeps Customer Analytics accurate about who is actually on the account.

---

## Receiving an account as a CSM

CSMs receive every $20k+ account, whether from a TAE at close or when a TAM comes off. Accounts arriving from a TAM should generally be in a steady state: using the products they need, engaged, no major unresolved issues. It's worth looking beyond the surface to make sure that's actually the case. These aren't a rigid checklist. They're things to dig into that can surface problems which are otherwise easy to miss.

### Billing and commercial

- **Open invoices** — verify these have been resolved per the [handover requirements](/handbook/growth/sales/account-allocation#handing-over-customers). You don't want your first interaction with a customer to be chasing payment.
- **MRR trajectory** — is spend steady, declining, increasing, or swinging around? Declining or volatile MRR is worth digging into before you take over.
- **Credit purchases** — if they've pre-purchased credits, does the amount actually line up with what they're spending month to month?
- **Non-standard discounts** — review the contract for anything unusual or undocumented. If discounts exist without clear documentation, get context from the previous owner.

### Product adoption

- **Core product coverage** - see [Who covers an account](/handbook/growth/sales/account-allocation#who-covers-an-account). Receiving accounts with only 1 core product adopted is normal. It just means the previous owner determined there isn't a realistic path to expand right now, and that reasoning should be documented.
- **Deployment health** — if the customer doesn't have basic recommendations in place (e.g. session replay minimum duration, high identify call volume), that's a flag. Check the [customer deployment health check guide](/handbook/customer-success/health-checks) and the Metabase dashboard to assess this. The [product onboarding checklist](#product-onboarding) is also a good reference for what "properly set up" looks like.
- **Unexplained usage changes** — big spikes or drops that aren't documented, or where there's no record of a conversation with the customer about them. These can indicate problems nobody's looked into yet.

### Engagement

- **One-sided relationship** — is there a pattern of outreach from our side with no customer engagement? If it's been a one-sided conversation, understand why before you take over.
- **User concentration** — is usage concentrated among fewer than 3 users? That's inherently risky. Have there been attempts to engage beyond those users? If so, why haven't they been successful?

### Account documentation

- **Account plan** — one should already exist per the [handover requirements](#account-plan). Check that it's actually there and current — don't assume.

### Lower priority

Worth being aware of, but less likely to be blockers:

- **Open support tickets** — any unresolved tickets or known frustrations with specific products?
- **Upcoming features** — anything in the pipeline that's relevant to this customer and worth proactively sharing?

### Pushing back

If you're seeing multiple flags — declining usage, no engagement, concentrated users, missing account plan — push back. An account with several of these signals isn't in steady state and probably needs more work from the previous owner before it's ready for CSM. Talk to [Dana](/community/profiles/52723) if you're unsure whether to accept an account.
