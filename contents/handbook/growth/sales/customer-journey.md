---
title: Customer journey and coverage model
sidebar: Handbook
showTitle: true
---

This is a rough articulation of the stages a paid and "sales sized" customer moves through PostHog, from first signup to steady state, and which role covers them at each stage. The purpose of mapping this out is creating a shared understanding so we can better standardize how we think of and approach accounts, as well as account allocation. When you know a customer's stage and ARR band, you know who should be working with the account. For the operational process (book planning, allocation cadence, handover mechanics), see [Account allocation and handover](/handbook/growth/sales/account-allocation), which holds the allocation rules.

## The stages

### Presales

| Stage          | Definition                                                               |
| -------------- | ------------------------------------------------------------------------ |
| **Exploring**  | Signed up, sending events, free tier or trivial spend. No buying signal. |
| **Evaluating** | Actively comparing us against alternatives or against not buying.        |
| **Proving**    | Running a structured POC with success criteria, ours or theirs.          |
| **Buying**     | Commercial negotiation. Quote out, annual terms in discussion.           |

> In a PLG motion most customers move through the presales stages invisibly and without contact. Our process and system should be able to capture and identify the right accounts to work with at the right time based on signals and stages. Exploring, Evaluating, and Proving are inferred from product signals unless sales is engaged. The presales stages only need to be as granular as the routing decision they drive, which is binary: automation, or a human from new biz.

### Postsales

| Stage            | Definition                                                                                                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Implementing** | Delivering a closed deal. Posthog instrumentation, onboarding and success plan, stakeholder map.                                                                                                                    |
| **Ramping**      | Usage growing, account below full TAM threshold or still climbing toward committed volume or otherwise just not at fully implemented production volume. Generally takes longer for larger or more traditional orgs. |
| **Expanding**    | A clear expansion, cross-sell, or save opportunity exists and is being worked.                                                                                                                                      |
| **Steady state** | Growth and expansion exhausted. Core products adopted, saturated across the organization, healthy engagement, no viable expansion play.                                                                             |

> Edge case worth noting: a pure self-serve account that crosses $20k ARR with no sales involvement skips Implementing entirely.  They enter at whatever their adoption or usage indicates, usually Ramping or Expanding. This is important, though, because an account that's been self-serve and steady state in prod for 2 years doesn't need the same tactic and approach as a sales-driven "implementation" account, and our process shouldn't treat them the same.

### At risk is a status, not a stage

An account in any postsales stage can be at risk. At risk does not change the stage or reassign the account. The current owner runs the churn save. 

## Coverage map

Who covers the account at each stage. 

| Ownership                                                 | Exploring | Evaluating | Proving | Buying | Implementing | Ramping | Expanding | Steady |
| --------------------------------------------------------- | :-------: | :--------: | :-----: | :----: | :----------: | :-----: | :-------: | :----: |
| **New biz (TAE)**, if ICP qualified                       |           |     ✓      |    ✓    |   ✓    |              |         |           |        |
| **CSM base layer**, all accounts >$20k ARR                |           |            |         |  (✓)   |      ✓       |    ✓    |     ✓     |   ✓    |
| **TAM overlay**, >$20k, while there's expansion to be had |           |            |         |        |     (✓)      |    ✓    |     ✓     |        |
| **Growth TAM**, pooled, $500 to $1,667 MRR                |           |            |         |        |     (✓)      |    ✓    |     ✓     |        |
| **Onboarding team**                                       |    (✓)    |    (✓)     |   (✓)   |  (✓)   |     (✓)      |   (✓)   |           |        |

Notes:

- Automation is the base level everywhere a direct human coverage isn't needed. Below-$500 MRR accounts and sub-$20k steady-state accounts have no human owner by design.
-  TAM allocation can start during Implementing when a deal closed with a known expansion path.
- Growth TAM pickup can happen during Implementing for a fast-ramping sub-$20k account.
- The onboarding team's lane is wide because its trigger is first payment, which can land anywhere from Exploring through Ramping.

## Ownership rules

**CSM is the base layer, unconditionally.** Every account above $20k ARR has a CSM from day one post-sale. The CSM never leaves. Steady state is not a handoff event, it just means the TAM/TAE overlay has been removed.

**TAM coverage is the exception, not the default.** A TAM is added to an account only when a clear expansion or cross-sell opportunity justifies it, and released when the opportunity is exhausted. 

**TAE handoff goes to CSM, always** (above threshold). Optionally the TAE also hands to a TAM, but only when the handoff doc names the specific opportunity that justifies the layer. "Still ramping" is not a justification. 
