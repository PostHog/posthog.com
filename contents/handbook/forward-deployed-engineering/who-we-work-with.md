---
title: Who we work with
sidebar: Handbook
showTitle: true
---

We define who we work with as the ICP, meaning the account, and the persona, meaning the people we work alongside in the account.

## Our current ICP

AKA our [ideal customer profile](/newsletter/ideal-customer-profile-framework).

We work with **teams that have a PostHog problem** that FDE can help solve with hands-on engineering. These customers can be at any stage of the customer lifecycle, from new business and migrations, to expansion, to retention.

| &nbsp; | Teams with a hands-on PostHog problem |
|---|---|
| **Description** | Accounts where something in the implementation holds the team back and self-serve hasn't fixed it. That covers:<br />• A customer at churn risk from an implementation they no longer trust<br />• A team scaling into a product area where no best practice exists yet<br />• A new customer whose first implementation decides whether the account ever works |
| **Criteria** | Ideally all of them, but we take work outside the ICP on purpose, so not every one has to be met.<br />• It serves revenue retention or growth<br />• $50k ARR or above. For a new customer, we count predicted ARR. Smaller accounts qualify as a group when one piece of work serves all of them and their combined ARR clears the bar<br />• Any industry, any region<br />• At Proving or later in the [customer journey](/handbook/growth/sales/customer-journey). Earlier stages (Exploring, Evaluating, and Buying) are covered by other teams<br />• The [wizard audit](/handbook/forward-deployed-engineering/how-to-get-fde-involved) and PostHog skills haven't already closed the gap |
| **Why they matter** | • Retention and expansion both run through the implementation. An account that can't trust its own data doesn't renew or expand<br />• Solving the problem well for one customer often makes it faster to solve for the next<br />• We see the messy problems before anyone else, which tells us what the product should build next |
| **Examples** | • A team whose three SDKs evaluated the same flags with no shared identity state<br />• A technically strong product team with no bandwidth to work on PostHog<br />• An account where one person held the whole data pipeline<br />• A net-new implementation that set the foundation for everything built after it |

## Where we show up in the customer journey

The [coverage map](/handbook/growth/sales/customer-journey) marks us conditional at every phase we appear in, and blank at Exploring, Evaluating, and Buying. Conditional means someone has to bring us in, nearly always a TAM, CSM, or TAE selling an engagement. There's always a CSM or TAM on the account before us.

| Phase | What brings us in |
| --- | --- |
| **Proving** | We help prove technical fit during a POC with a top prospect. |
| **Implementing** | The implementation need is more than a TAM or CSM can deliver. |
| **Ramping** | Friction in an implementation that's already live. This is where most of our engagements currently land. |
| **Expanding** | A mature account moving into a product area with no playbook yet. |
| **Steady state** | A churn prevention play, fixing an implementation the customer no longer trusts. |

## How we use this

The ICP decides who we approach, not whether we say yes when a customer or someone in sales comes to us. That account has already found us, so what's left is capacity and scoping.

Any PostHog customer is technically interesting, so without a shared definition every account looks like a candidate and we spread thin.

Capacity is a separate question. The ICP says which accounts qualify; how many we hold at once comes down to what the team can carry. Currently, one embedded engagement is roughly one engineer.

## What this rules out

- **Accounts below the ARR bar, unless one piece of work serves a group of them.** We serve those through the product, the PostHog skills, and the wizard audit.

- **Single-customer delivery.** We still do it, as professional services. It comes to us through sales or bundled into an engagement we're already running, and we don't go out looking for it.

- **Exploring, Evaluating, and Buying.** Sales owns those phases.

Two things we deliberately don't screen on:

- **Geography and time zone.** They make no difference to us.

## Our current persona

Persona is the role of the person we work alongside in the account. Whoever asks for us is usually not that person.

**Who asks for us.** Someone accountable for what the data says, and unable to fix it themselves. Often a founder, a product lead, or a TAM carrying the account. They can be deeply technical and still have no PostHog depth, which is the common case and the one to plan for.

**Who we work alongside.** An engineer, or the one person who owns the data pipeline. They know the codebase, but they don't know PostHog's failure modes, and they have other work. Our job is to leave them able to maintain what we build themselves. Co-building with a technical champion gives us a fast feedback loop: they test things and fail fast with us. It also makes the learnings we bring back to the product more relevant to our wider customer base. If there's no one like that, the engagement probably isn't set up for success.

**The anti persona.** A team that wants a pair of hands for a few weeks. That work still happens, and sales scopes and bills it as professional services.
