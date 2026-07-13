---
title: Customer journey and coverage model
sidebar: Handbook
showTitle: true
---

This page defines the stages a customer moves through with PostHog, from first signup to steady state, and which role covers them at each stage. The purpose is account allocation. When you know a customer's stage and ARR band, you know who should be touching the account, full stop. For the operational process (book planning, allocation cadence, handover mechanics), see [Account allocation and handover](/handbook/growth/sales/account-allocation).

Two rules underpin everything here:

1. **Stages describe the customer. Lanes describe who covers them.** Nothing changes hands when a customer changes stage. Ownership only changes when a coverage lane is added or removed.
2. **Every stage transition must be observable in data**, not self-reported and not vibes. If a transition can't be detected from usage, billing, or a logged sales event, it doesn't belong in this model.

## The stages

### Presales

| Stage | Definition | Entry signal |
| --- | --- | --- |
| **Exploring** | Signed up, sending events, free tier or trivial spend. No buying signal. | Signup + first events |
| **Evaluating** | Actively comparing us against alternatives or against not buying. | Multiple users invited, docs and pricing traffic, inbound question |
| **Proving** | Running a structured POC with success criteria, ours or theirs. | Prod-adjacent volume, security or procurement review started, POC scoped with sales |
| **Buying** | Commercial negotiation. Quote out, annual terms in discussion. | Quote sent or contract in redlines |

> In a PLG motion most customers move through the presales stages invisibly. Exploring, Evaluating, and Proving are inferred from product signals unless sales is engaged. That's expected. The presales stages only need to be as granular as the routing decision they drive, which is binary: automation, or a human from new biz.

### Postsales

| Stage | Definition | Entry signal |
| --- | --- | --- |
| **Implementing** | Delivering a closed deal. Workload instrumentation, success plan, stakeholder map. | Sales-assisted close, or crossing $20k ARR _with_ a deal to deliver |
| **Ramping** | Usage growing, account below full TAM threshold or still climbing toward committed volume. | Sustained MoM usage growth post-implementation |
| **Expanding** | A clear expansion, cross-sell, or save opportunity exists and is being worked. | Named opp in SFDC, or expansion signal fired (billing limit, new team, funding) |
| **Steady state** | Levers exhausted. Core products adopted, healthy engagement, no viable expansion play. | TAM releases the account, or no expansion signal for a defined window |

> Edge case worth writing down: a pure self-serve account that crosses $20k ARR with no deal skips Implementing entirely. There is nothing to implement, they are already live. They enter at whatever their usage state says, usually Ramping or Expanding. Do not run a 30-day success plan for an account that has been in prod for two years.

### At risk (overlay, not a stage)

An account in any postsales stage can be at risk. At risk does not change the stage or reassign the account. The current owner runs the save play. If no human owner exists (sub-$20k automation territory), the risk signal routes to the pooled Growth TAM queue or the churn channel.

## Coverage map

Who covers the account at each stage. A checkmark means the lane is active. Parentheses mean conditionally active.

| Coverage lane | Exploring | Evaluating | Proving | Buying | Implementing | Ramping | Expanding | Steady |
| --- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **New biz (AE/TAE)**, if ICP qualified | | ✓ | ✓ | ✓ | | | | |
| **CSM base layer**, all accounts >$20k ARR | | | | | ✓ | ✓ | ✓ | ✓ |
| **TAM overlay**, >$20k, only while an opp exists | | | | | (✓) | ✓ | ✓ | |
| **Growth TAM**, pooled, $500 to $1,667 MRR | | | | | (✓) | ✓ | ✓ | |
| **Automation**, no human owner | ✓ | (✓) | (✓) | (✓) | (✓) | (✓) | (✓) | (✓) |
| **Onboarding team** (motion, see below) | (✓) | (✓) | (✓) | (✓) | (✓) | (✓) | | |
| **At-risk overlay** | | | | | ✓ | ✓ | ✓ | ✓ |

How to read the conditionals:

- Automation is the floor everywhere a human lane isn't active. Sub-$500 MRR accounts and sub-$20k steady-state accounts have no human owner by design.
- The TAM overlay can start during Implementing when a deal closed with a known expansion path.
- Growth TAM pickup can happen during Implementing for a fast-ramping sub-$20k account.
- The onboarding team's lane is wide because its trigger is first payment, which can land anywhere from Exploring through Ramping.

## Ownership rules

**CSM is the base layer, unconditionally.** Every account above $20k ARR has a CSM from day one postsale. The CSM never leaves. Steady state is not a handoff event, it just means the overlays have been removed.

**TAM coverage is the exception, not the default.** A TAM is added to an account only when a clear expansion, cross-sell, or save opportunity justifies it, and released when the opportunity is exhausted. "Move to CSM" and "remove the TAM layer" are the same action.

**TAE handoff goes to CSM, always** (above threshold). Optionally the TAE also hands to a TAM, but only when the handoff doc names the specific opportunity that justifies the layer. "Still ramping" is not a justification. If every new close gets a TAM by default, the base-layer model is dead.

**Sub-$20k closes get no standing human owner.** Growth TAM coverage is signal-driven pickup, not handoff. A TAE close under $20k enters the pooled queue and gets human attention when a scout signal fires, not before.

**Only one human lane per account per band.** When lanes could collide (the Ramping column is the busiest), the ARR band decides: >$20k gets TAM or CSM, $500 to $1,667 MRR gets Growth TAM, below that gets automation.

## Two things called onboarding

These are different and the words matter.

**Product onboarding** is a _motion_ run by the onboarding team. It fires once, at first payment, for every paid PLG account regardless of size or sales involvement. Its goal is product activation. It does not change ownership or stage. It can fire while the account is presales relative to any deal.

**Implementing** is the _lifecycle stage_. It starts at a sales-assisted close, it's about delivering the deal, and it's CSM-led with the onboarding team assisting rather than owning.

Do not use the word "onboarding" for the stage. That word belongs to the team and their motion.
