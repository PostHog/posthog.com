---
title: Who we work with
sidebar: Handbook
showTitle: true
---

Who we work with has two parts: the [ideal customer profile](/newsletter/ideal-customer-profile-framework) (ICP), which is the account, and the persona, which is the people we work alongside inside that account.

## Our current ideal customer profile

We work with **teams that have a PostHog problem other customers have too**.

We want to fix a bad implementation before the customer stops trusting their own data.

| &nbsp; | Teams that have a PostHog problem other customers have too |
| --- | --- |
| **Description** | Accounts where something in the implementation holds the team back, where self-serving hasn't fixed it, and where the fix would help other customers too. That covers three cases:<br />• A customer at churn risk from an implementation they no longer trust<br />• A team scaling into a product area where no best practice exists yet<br />• A new customer whose first implementation decides whether the account ever works |
| **Criteria** | Ideally we meet all of them. We choose to take some work outside the profile, so not every criterion has to be met.<br />• The work compounds across customers, so what we leave behind transfers to the next one<br />• It serves revenue retention or growth<br />• $50k in annual recurring revenue (ARR) or above. For a new customer we count predicted ARR. Smaller accounts qualify as a group when one piece of work serves all of them and their combined ARR clears the bar<br />• Any industry, any region<br />• At Proving or later in the [customer journey](/handbook/growth/sales/customer-journey). The coverage map leaves us blank at Exploring, Evaluating, and Buying<br />• The [wizard audit](/handbook/forward-deployed-engineering/how-to-get-fde-involved) and the PostHog skills haven't already closed the gap |
| **Why they matter** | • Retention and expansion both run through the implementation. An account that can't trust its own data doesn't renew, and it doesn't expand<br />• Every engagement produces something reusable, so the next customer with the same problem costs us far less than the first<br />• We see the difficult problems before anyone else, and that tells us what the product should build next |
| **Examples** | • A team whose three SDKs evaluated the same flags with no shared identity state<br />• A technically strong product team with no bandwidth to work on PostHog<br />• An account where one person held the whole data pipeline<br />• A net-new implementation that set the foundation for everything built after it |

## Where we show up in the customer journey

The [coverage map](/handbook/growth/sales/customer-journey) marks us conditional at every phase we appear in, and blank at Exploring, Evaluating, and Buying. Conditional means someone has to bring us in, and that's nearly always a technical account manager, customer success manager, or technical account executive selling an engagement. There's always a customer success manager or technical account manager on the account before us.

| Phase | What brings us in |
| --- | --- |
| **Proving** | We help prove technical fit during a proof of concept with a top prospect. |
| **Implementing** | The implementation needs more than a technical account manager or customer success manager can deliver. |
| **Ramping** | Friction in an implementation that's already live. Most of our engagements land here today. |
| **Expanding** | A mature account moving into a product area that has no playbook yet. |
| **Steady state** | A churn prevention play, where we fix an implementation the customer no longer trusts. |

An account can be at risk in any of these phases.

## What the ICP decides

The ICP decides who we approach. It doesn't decide whether we say yes when a customer or someone in sales comes to us. That account has already found us, so what's left is capacity and scoping.

Any PostHog customer is technically interesting. Without a shared definition, every account looks like a candidate and we spread ourselves thin.

Taking work outside the ICP is also how we find out when the definition has gone stale. The line we draw between forward-deployed engineering and professional services is our current reading of it, and it will move as we learn.

Capacity is a separate question. The ICP says which accounts qualify, and how many we hold at once comes down to what the team can carry. Today, one embedded engagement is roughly one engineer.

## Out of scope

- **Accounts below the ARR bar, unless one piece of work serves a group of them.** We serve those through the product, the PostHog skills, and the wizard audit.

- **Single-customer delivery.** We still do it, as professional services. It comes to us through sales, or bundled into an engagement we're already running, and we don't go out looking for it.

- **Exploring, Evaluating, and Buying.** Sales owns those phases.

Two things we don't screen on:

- **Geography and time zone.** They make no difference to us.

- **Whether the customer has engineering capacity.** Every engagement we've converted so far involved a team without it. That predicts a customer saying yes, and it says nothing about whether the work compounds.

## Our current persona

Persona is the role of the person we work alongside in the account. Whoever asks for us is usually not that person.

**Who asks for us.** Someone who is accountable for what the data says and can't fix it themselves. Often a founder, a product lead, or a technical account manager carrying the account. They can be deeply technical and still have no PostHog depth, which is the common case and the one we plan for.

**Who we work alongside.** An engineer, or the one person who owns the data pipeline. They know the codebase, they don't know PostHog's failure modes, and they have other work. Our job is to leave them able to maintain it themselves.

**The anti-persona.** A team that wants a pair of hands for a few weeks. That work still happens, and sales scopes and bills it as professional services. We look for what compounds inside it anyway, because that's the habit we bring to every engagement, but it isn't work we seek out.
