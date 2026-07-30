---
title: How to evaluate an account's revenue growth potential
sidebar: Handbook
showTitle: true
---

We don't have an automated "growth score" for expansion potential, and we probably won't for a while. The signals that matter most are human-judged (depth of buy-in, roadmap fit, whether the champion actually has budget authority) and they don't live in our data. They're hard to represent even heuristically.

So instead of a model, we have a shared framework. The goal is that two people looking at the same account land in the same ballpark. Your assessment should be reproducible by a teammate, not by a query.

Answer three questions, in order. Calling your own shot matters, but the shot has to be grounded in reality rather than wishful thinking.

1. **Is there an expansion opportunity with this account at all?**
2. **What specifically is the opportunity?**
3. **How much is it worth, and how confident are you?**

---

## Question 1: Is there an opportunity?

You're looking for **headroom**: the gap between what the account spends today and what a fully-adopted version of this account would spend. Headroom shows up in a few different places, and most accounts only have it in one or two of them.

Don't size it yet. But answering this question with a "yes" implies the opportunity is meaningful. Don't keep an account just because you like the people. (They're probably great)

### Where headroom comes from

Most accounts won't have all four of these. One or two is normal.

**1. Use case gaps.** Map their paid products against the [use case framework](/handbook/growth/use-case-selling). Which use cases are they in? Which *applicable* use cases are untouched? A B2C mobile app has no Group Analytics story. A company with no AI features has no LLM analytics story. Only count use cases that plausibly map to who the company actually is externally, not everything that's technically possible. This is a big reason a heuristic model fails here, because it needs the human context to make that call.

**2. Workloads.** How many apps, products, environments, or business units do they have, and how many are instrumented? One workload fully instrumented at a company with a single product surface is largely saturated. Three business units globally with only one instrumented is an expansion lever. If you don't know the answer and you often can't get it from LinkedIn or enrichment data alone, that's not a "no" necessarily, it means you need more discovery.

**3. Free-tier usage below the paid threshold.** Someone may be experimenting with a product area, which is a warm-intent signal. Sometimes a billing spike is just someone clicking around who turned something on by accident. Sometimes they're partway through instrumenting it properly. Either way it's worth a check-in: at best it's warm intent, and even if it's accidental it's a chance to get them right-sized. Their attention is worth having regardless.

**4. Commercial levers.** The easiest to name and size. Credit conversions, renewals, and mapping org size and use-case fit to add-on packages.

### The saturation checks

Equally important: know when there's *nothing* there. An account is saturated when most of the following are true. One on its own doesn't count for much.

- All applicable use cases are at meaningful spend and actually leveraged by the customer
- Single workload, fully instrumented, and no other workloads exist
- The champion has told you directly there's no roadmap for more ("we're happy, nothing planned") This is weak on its own, so pair it with other indicators. It can also just mean you need a new champion, which is context dependent. At a small company there's no point sidestepping them, they likely know the full truth. At a medium-to-large company it's worth trying to connect with other people and create new champions
- Usage has been flat or declining for 2+ quarters
- The last two expansion conversations went nowhere, and not for any of the "check back later and nurture for now" reasons — timing wasn't right, no discernible reason, other blockers, external company factors, and the like
- Price sensitivity is the dominant theme of every conversation

A TAM being willing to let go of an account is itself a saturation signal, since TAMs are incentivized to maximize their book outcome. But don't take that at face value either.

Saturated is not a bad thing.  Quite the opposite. It's a healthy, retained customer who is bought into PostHog at an organizational level. For our purposes here it just means the account doesn't require a TAM. The worst outcome of this exercise is inventing an opportunity to justify keeping an account.

---

## Question 2: What is the opportunity?

What's the growth lever? "This account can grow" is not an answer. "They're on monthly billing at $1.8k MRR and their platform team is trialing Error Tracking" is an answer. Most real opportunities group into one of these mechanisms:

| Lever | What it looks like | Where to go deeper |
| --- | --- | --- |
| **Cross-sell (same team)** | 1-2 products adopted, gaps in their current use case | [Go deeper](/handbook/growth/sales/expansion-strategies#strategy-1-go-deeper-on-the-existing-team), [cross-sell motions](/handbook/growth/cross-selling/cross-sell-motions) |
| **New team / workload** | Multiple teams or apps, only one instrumented | [Expand into new teams](/handbook/growth/sales/expansion-strategies#strategy-3-expand-into-new-teams) |
| **Event-based add-ons** | High event volume, no Identified Events / Group Analytics / Pipelines | [Pricing](/pricing), plus the math below |
| **Platform package** | >50 people, compliance/SSO/RBAC needs, no Boost/Scale/Enterprise | [Contract rules](/handbook/growth/sales/contract-rules) |
| **Annual conversion / renewal uplift** | Monthly billing >$500 MRR, or credit expiry approaching | [How commission works](/handbook/growth/sales/how-we-work#how-commission-works---technical-account-managers) |
| **Organic usage growth** | Forecasted MRR > current MRR, headcount growth, recent funding | Nothing to sell, but it's incremental cash you should forecast |

Two guiding principles:

- **One primary lever per account per quarter.** Track several if you like, but your [account plan](/handbook/growth/sales/account-planning) should say which one you're actually focused on right now.
- **The lever must attach to a person.** "They should adopt Session Replay" is a product observation. "Rui's team spends hours reproducing bugs from user reports, and Rui has budget authority" is an opportunity. Opportunities don't happen without people on both sides. If you can't name who buys it and why they'd care, you're still on Question 1.

---

## Question 3: How much, and how confident are you?

There's no formula. There is a small set of evidence sources you can reliably build an estimate from, plus a discipline of writing down *how* you got the number so someone else can challenge it.

### Build every estimate from real evidence

**1. Their own volumes against list pricing.** When the opportunity is usage-priced against data they're *already sending*, this is mostly arithmetic. Event-based add-ons are straightforward and you can calculate them in QuoteHog.

**2. What they've told you.** Their current vendor's contract price, their company or product roadmap, their team sizes, their budget cycle. Most estimation problems are actually discovery problems: if you can't size the opportunity, the next step is getting the information that would let you. "What are you paying Sentry today?" and "how much traffic does the other product do?" are sizing questions.

**3. Comparable accounts in your own book.** You have direct visibility into what accounts of similar size, archetype, and vertical spend on the product you're pitching. This is never 1:1, though similar companies still differ in org structure, product surface area, and how saturated they are across PostHog.

**4. Bottoms-up from their product.** For a new workload or team, estimate from what you know about *that* workload: public traffic, app store presence, team size, and how the equivalent metric compares to the workloads they've already instrumented.


---

## Grow, nurture, or release

- **Grow** — there's a real, qualified expansion opportunity. This account gets proactive TAM work this quarter.
- **Nurture** — a real opportunity that isn't workable yet, because it's waiting on a funding event, a champion hire, or a roadmap item. If it's already a TAM account, it's fine to keep. If it isn't, it can wait for a TAM to be assigned.
- **Release from TAM** — healthy and retained, but no viable growth. Drop it from TAM coverage per the [quarterly book planning rules](/handbook/growth/sales/account-allocation#quarterly-book-planning). This is a good outcome: it concentrates TAM attention where it compounds.
