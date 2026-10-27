---
title: Adding and removing a TAM
sidebar: Handbook
showTitle: true
---

How a TAM gets added to an account and taken off again. [Account allocation](/handbook/growth/sales/account-allocation) covers the coverage rules and the books this sits inside.

## Adding a TAM to an account

There is no CSM to TAM handoff anymore, because the CSM never leaves. Instead, when someone spots a growth opportunity on a CSM-covered account, they flag it for a TAM.

Anyone can flag: the CSM, a TAE, support, or automated alerts. The flag routes to a TAM in the right region for qualification.

To flag an account, add the `tam overlay needed` tag to it in Customer Analytics. TAM team leads check accounts with this tag and assign them to a TAM. Before you tag an account, use the [growth potential framework](/handbook/growth/sales/evaluating-growth-potential) to check that there is a real expansion opportunity. Add a Customer Analytics note that tells the TAM what you saw.

The receiving TAM qualifies the opportunity using the [growth potential framework](/handbook/growth/sales/evaluating-growth-potential). If it holds up, they join the account as the overlay, open the opp, and intro themselves to the customer with the CSM's help. If it doesn't, they document why in Customer Analytics and the account stays CSM-only. A documented "no" is still useful. It stops the next person re-litigating the same idea in 3 months.

We track coverage in Customer Analytics with the CSM account relationship for the base layer and the TAM assigned for the TAM overlay. An account can have both.

### When to request an overlay

Every $20k+ account has a CSM, so every customer has someone who knows them. On a CSM account, a TAM's job is selling expansion nobody on the customer's side is driving yet, like a new team, a new budget, or replacing a competitor. The TAM stays while there's more of that to work.

An overlay isn't extra coverage. If an account needs more hands, ask your team lead first, then bring in another CSM, an FDE, or exec support.

An account's size doesn't add a TAM on its own. [Top 40 accounts](/handbook/growth/sales/account-allocation#top-40-account-management) and [TAE handovers](/handbook/growth/sales/account-allocation#handing-over-customers) have their own rules.

**Who's pushing decides who works it.**
- **The customer is pulling.** They're asking for a trial, asking how to switch, or they already want it. The CSM works it, at any size, competitor swaps included.
- **We're making the case.** We have to find the budget, or get a new team or an exec to care. That's TAM work: multi-threading, exec relationships and deal structuring are what they do best.

CSMs can and should push too. Request a TAM when the push needs more than you can give alongside your retention work, usually because it's stalled on a person or a budget rather than on the product. If it's unclear which side an opportunity sits on, flag it and let the TAM decide.

A quick litmus test to assess whether you can carry it yourself: can the people you already work with turn this on? If yes, keep going. If it has to go up the chain or across to another team, consider a TAM.

Flagging is part of the CSM role: a short note with the context. Whether it becomes an overlay is the TAM's call, and they own it.

Request a TAM overlay when a significant expansion opportunity is qualified, and we're the ones pushing it. It's a meaningful expansion rather than a small add-on, and your retention work on the account doesn't leave enough room to drive it. It's your call: if scoped extra help on expansion is in the customer's interest, request a TAM to push it over the finish line.

**What counts as a qualified expansion opportunity?**
If all of the below are true:
- **There's a real use case and someone who'd own it.**
- **Someone on the customer's side is interested.** The CSM has already pitched it, you know what they use today and why. If they've said no, respect it and bring it up again only when it comes up naturally.
- **If the expansion opportunity has stalled, it's because of a person on the customer's team, not the product.**  If no one on the customer's team owns the decision to turn off an existing competitive tool, that's a good problem for a TAM to jump in. If they need a feature we don't have, that's a PR or workaround for the CSM. 

**When not to request an overlay**
- A single cross-sell that comes up naturally, or a customer who already wants to adopt one product after you pitch it.
- A large, risky, or very active account with no expansion opportunity. If the account needs more hands to de-risk, ask your team lead first, then bring in another CSM, an FDE, or exec support.
- A customer who doesn't reply to the CSM. A TAM just gives them another person to ignore. Work out why they've gone quiet first.
- Churn risk. De-risking an account is CSM work. See [churn saves](/handbook/growth/sales/account-allocation#churn-saves).
- The account is being right-sized (tagged `cost optimizing`). [Pause expansion work](/handbook/growth/sales/risk-mitigation-and-churn-prevention#implementation-health) until they're at their target monthly spend.
- You've identified other teams that could adopt PostHog, the customer uses a competitor for something we do, or they've just raised a funding round, acquired a company or gone on a hiring push. These are signals to do more discovery first. 

A [competitive renewal](/handbook/growth/sales/account-allocation#competitive-renewal) is a separate call the CSM makes and doesn't need these criteria. However, it's a narrower engagement where the TAM is there to help win the renewal, not to work several expansion opportunities over the long term.

#### Before you tag the account

Do what you can first. Then have an answer for: **what would a TAM take on that I can't?** Show what you've done and where you've hit the limit of what you can take on alongside your retention work.

If all of the above checks out, then add the `tam overlay needed` tag in Customer Analytics and add a note with the context the TAM needs to qualify the opportunity.

TAM team leads answer a request within two weeks: a TAM assigned, a no with the reason, or when a TAM will have room. The assigned TAM then qualifies the opportunity using the [growth potential framework](/handbook/growth/sales/evaluating-growth-potential), and either joins or documents in Customer Analytics why not.

Here's what your note in Customer Analytics could look like. This isn't a hard requirement - use it as a concrete way to sense check your request. 

```
Title: TAM overlay request [YYYY-MM-DD]
Account: [account]

Why a TAM:
[ ] We're pushing this, not the customer: what we'd have to do (find budget, reach a new team, get an exec to care)

The opportunity (this is what the overlay is measured on):
- [product] — use case — who'd own it

If known:
Estimated new ARR, and how you got the number
Pain: what problem this solves for them
Economic buyer: who controls the budget
Champion: who's pushing for it internally
Competition: what they use today, incl. doing nothing

What I've tried: pitches, calls, links

The opportunity is qualified (check all):
[ ] Real use case and someone who'd own it
[ ] Someone on the customer's side is interested: pitched, current tool known, no explicit rejection from the customer
[ ] If stalled, the stall is on a person, not a missing feature
Next step: what the TAM should do first
```

#### Capacity

There's no fixed number of TAMs or overlay accounts per CSM. The work comes in bursts and varies by account: number of active users, how often they engage with us, and ARR all shape the load.

TAM books are planned with room for mid-quarter requests, so a qualified request shouldn't have to wait for the next quarter's allocation. If no TAM has room, the request can sit CSM-only until one does, and the team lead says when that will be. Keep working the opportunities in the meantime.

When the TAM joins, it might be useful to tell the customer what they're there for (for example, "joining to help explore error tracking with your platform team"), so it reads as an addition with a clear purpose, not a salesy fishing trip. See [kicking off the overlay](/handbook/growth/sales/csm-tam-overlay-coverage#kicking-off-the-overlay) for guidance on kicking off an overlay.

---

## Removing a TAM from an account

A TAM stays on an account through expansion until it's fully saturated, not just until the first opportunity closes. As long as there's a realistic next play to work (another cross-sell, a new team to land, an annual conversion), the TAM keeps the account and works it. They come off once expansion is genuinely exhausted. In [journey](/handbook/growth/sales/customer-journey) terms, the account moves to Steady state and the overlay is removed. The CSM stays, so the customer keeps their point of contact throughout.

A TAM being willing to release an account is itself a decent signal the upside is gone. TAMs are paid on their book, so they don't give up real opportunities lightly. But treat it as a signal and sanity check it. Team leads should verify before agreeing. Team leads should post in public for visibility and approval before removing

Removing a TAM is usually a good outcome, and typically means a healthy, expanded customer. Inventing an opportunity to justify staying on is worse than coming off cleanly.

TAM removals generally happen at the end of the quarter. Accounts can be added to a book at any time, but plan removals for quarter end so books stay stable and handovers get done properly rather than rushed mid-quarter.

### Keeping the context with the CSM

The CSM stays on, so nothing about the customer relationship changes from their side. But the TAM knows things the CSM doesn't, and that context has to land somewhere before they leave:

- **A handover note in Customer Analytics** covering: what expansion plays were run and how they went, commercial context (discounts given and why, anything promised, credit terms), open threads, who the real decision makers are, and who on the customer side owns the renewal (champion or procurement, and how the last one went). Use the [handover note skill](https://github.com/PostHog/skills/tree/main/skills/team/product-led-sales/account-handover).
- **A 15 minute call with the CSM** to cover what's not in the data. Politics, sensitivities, what you'd try next if a new opportunity shows up.
- **The Slack channel stays open.** The CSM keeps it. Don't archive it. Channel archival only applies when an account exits managed coverage entirely.
- **Removing the TAM in Customer Analytics.** Once the note and call are done, the team lead clears the TAM field from the account, with Ben's approval.

If the same account gets a qualified opportunity later, it goes back through the normal flag and qualification path. The handover note is what lets the next TAM (maybe you) pick it up fast.

### What is NOT a valid reason to come off an account

Low engagement or an account being difficult is not a reason to come off. That's the job. Specifically:

- Account doesn't respond to your outreach
- Champion left and you haven't re-established relationships
- Low user activity or poor health score
- You don't like working with them / they don't like you

If an account is struggling on these dimensions, that's a signal to invest more. The saturation checks require *evidence* that the opportunity is gone; an account being hard to work is not the same as the opportunity being gone.

---

## What good looks like

This section covers overlays a CSM requests. Accounts where the TAM was there before the CSM aren't measured here.

The number of overlays isn't the goal. Each quarter, we look at two things:

1. **Is each overlay doing its job?** Of the overlays started, how many turned the opportunity named in the request note into closed-won expansion. Only that opportunity counts, so the overlay is judged on what it set out to do.
2. **What happens without an overlay?** Track the requests that were declined or had to wait, and what happened to their requested overlay opportunities. There won't be many, and TAMs will naturally take the strongest ones first, so the two possible results don't mean the same thing:
    - **The declined or waiting ones close about as often as the accepted ones.** They were the weaker requests and did just as well, so the overlay probably isn't adding much.
    - **The accepted ones close more often.** That's a good sign, though TAMs may also have taken the best requests, so read it alongside measure 1.

    Either way, it doesn't prove anything on its own, but it's a useful signal for the quarterly reviews.

We count from Q1 2027, and only overlays a CSM requested. Accounts that already had a TAM before then are left out.

The request note is the record, since the `tam overlay needed` tag comes off once a TAM is assigned. At the end of each quarter, TAM and CSM team leads review the requests together: which were taken or declined and why, what closed, and what happened to the ones declined. TAM team leads then share it in public in Slack. We change these criteria based on what that shows.
