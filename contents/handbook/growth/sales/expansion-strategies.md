---
title: Expansion strategies
sidebar: Handbook
showTitle: true
---

The [Expansion and Retention page](/handbook/growth/sales/expansion-and-retention) lays out the REREE priority order for managing your book: retain, expand (cross-sell), retain (commit), expand (new teams), expand (same team). The [cross-sell motions](/handbook/growth/cross-selling/cross-sell-motions) page tells you *what* to sell. The [use-case-selling playbooks](/handbook/growth/use-case-selling) tell you *how to frame it*. This page covers the layer underneath: **how you structurally grow an account.**

Not every account grows the same way. A 30-person startup with one engineering team is a completely different expansion motion than a 500-person company with four business units. You need to pick the right approach for the account you're working with, and sometimes run multiple strategies in parallel.

These four strategies are not mutually exclusive. Most accounts will involve a combination over time. But being deliberate about which one you're running right now, on this account, this quarter, makes it much easier to focus your effort and measure progress.

## Overview

| Strategy | Core idea | Best for |
|----------|-----------|----------|
| Go deeper | Layer more products onto the team already using PostHog | Accounts with 1-2 products adopted, strong engagement, same team |
| Build champions | Grow usage and advocacy from individual power users up | Accounts where you lack executive access, or where adoption is engineer-driven |
| Expand into new teams | Replicate PostHog usage in a different team or business unit | Larger orgs with multiple engineering teams, product lines, or workloads |
| Move upward | Engage leadership to drive org-wide adoption or commitment | Accounts with strong bottom-up usage ready for credit purchase or org-wide rollout |

## Strategy 1: Go deeper on the existing team

The team already uses Product Analytics. You help them adopt Session Replay, then Experiments, then Error Tracking. Same people, same workload, more products.

### When to use it

- Account has strong engagement but low product count (1-2 paid products)
- Your champion is receptive and has the ability to try new things without heavy approvals
- The team's workflows have natural gaps that other PostHog products fill

### How to execute

1. Review their current product adoption against the [use-case-selling framework](/handbook/growth/use-case-selling). Identify which use case they're closest to completing and what product fills the next gap.
2. Tie the recommendation to something they've already told you. "You mentioned spending time reproducing bugs from user reports — Session Replay shows you exactly what happened" is better than "you should try Session Replay."
3. Offer a trial incentive if needed. 2-3 months of credited usage for a new product removes the risk for them. See [trial/evaluation incentives](/handbook/growth/cross-selling/cross-sell-motions#trialevaluation-incentives).
4. Follow up with hands-on help. Don't just suggest the product — help them set it up, build their first dashboard or workflow, and show value in week one. A [product training session](/handbook/growth/sales/customer-training) can accelerate adoption if the team is large enough to justify it.

### Signals that it's working

- New product shows up in their billing within 30 days
- Champion starts referencing the new product in conversations unprompted
- Usage is sustained (not a one-time spike)

### Common mistakes

- Pitching products the team has no use for just to hit a product count target. If they don't need Surveys, don't push Surveys.
- Suggesting too many products at once. Pick the one with the highest likelihood of adoption and land that first.
- Not following up after the initial setup. Products adopted without guidance often get abandoned.

> Each additional product above 1 adds 0.2x to the [quota multiplier](/handbook/growth/sales/how-we-work#how-commission-works---technical-account-managers) (from a 0.7x base). Going from 1 to 3 paid products moves the multiplier from 0.7x to 1.1x on the same ARR. This is the most direct way to improve your quota math.

## Strategy 2: Build champions from the bottom up

You identify 2-3 power users inside the account who are getting serious value from PostHog, and you invest in making them successful. They become your internal advocates, and their enthusiasm pulls in more users and more products organically.

### When to use it

- You don't have (or can't get) executive access
- The account is engineer-driven and decisions happen bottoms-up
- There are individual users who are clearly engaged but haven't been given direct attention
- Early-stage companies where the "champion" might be a founding engineer or product-minded CTO

### How to execute

1. **Identify power users.** Check who's logging in most frequently, who's creating dashboards and insights, who's asking questions in your Slack channel. These are your champions, whether they know it yet or not. If you're struggling to make initial contact, the [getting people to talk to you](/handbook/growth/sales/getting-people-to-talk-to-you) playbook has specific tactics.
2. **Invest in them directly.** Share tips specific to what they're building. Point them at features they haven't found yet. Help them build something impressive they can show their team. The goal is to make them look like heroes internally.
3. **Equip them to sell internally.** When your champion wants to bring in Session Replay for their team, give them the ammunition: a short summary of what it does, rough cost estimate, and how to pitch it to their manager. The [cross-sell motions](/handbook/growth/cross-selling/cross-sell-motions) page has product-specific discovery questions and value stories you can adapt for this.
4. **Ask for introductions.** Once you've built trust, ask your champion to introduce you to other people in the org. "Are there other teams that might find this useful?" is a low-pressure way to open the door to multi-team expansion.

### Signals that it's working

- Your champion starts CC'ing or introducing colleagues
- New users from the account start showing up in PostHog
- Your champion brings problems to you proactively rather than waiting for you to reach out

### Common mistakes

- Over-relying on a single champion. If your one contact leaves, you lose the account. Always work toward having at least 2-3 relationships.
- Treating champion building as a substitute for commercial conversations. Champions are great, but at some point someone needs to talk about contracts and commitments. Don't avoid that conversation forever.
- Ignoring quiet power users. The person creating 20 dashboards a week but never responding to your messages is still a champion — they're just not talking to you yet.

## Strategy 3: Expand into new teams

Engineering Team A uses PostHog for product analytics. You get introduced to Engineering Team B (different product line, different business unit, different workload) and replicate the adoption. Same org, net new usage.

### When to use it

- The org has multiple engineering teams, product lines, or business units
- Your existing team's usage is mature and there's limited room to grow with them alone
- You've identified (or your champion has mentioned) other teams with relevant use cases
- The account is at a stage where workload expansion is the primary growth lever (typically $60k+ ARR)

### How to execute

1. **Map the org.** During discovery with your existing contacts, ask: "How many products or apps does your company maintain?" and "Which teams have their own engineering org?" Each product/app is a potential new workload. Your [account plan](/handbook/growth/sales/account-planning) should explicitly document known workloads and which teams own them.
2. **Get a warm introduction.** Cold outreach to a new team inside an existing account almost never works. Ask your champion to introduce you, or use in-person visits (people feel obligated to introduce you to others when you're physically there).
3. **Treat the new team like a new customer.** They have different needs, different stakeholders, different technical contexts. Don't assume that what worked for Team A will work for Team B. Run fresh discovery and consider offering a [training session](/handbook/growth/sales/customer-training) to get the new team up to speed.
4. **Start with the use case that fits, not the product the other team uses.** Team A might use Product Analytics heavily, but Team B might need Error Tracking first. Let the [use-case-selling framework](/handbook/growth/use-case-selling) guide the conversation.

### Signals that it's working

- New projects created in the PostHog org for the new team's workload
- Event volume from new sources (different SDKs, different domains, different app identifiers)
- New admin users from a different team or department

### Common mistakes

- Assuming the new team has the same priorities as the existing one. They probably don't.
- Trying to expand into new teams when the existing team's implementation is shaky. If Team A is unhappy or poorly set up, they'll warn Team B off.
- Not involving your champion in the introduction. Going around your existing contacts to reach new teams damages trust.

> New team adoption is often the biggest single expansion lever in larger accounts. A new workload can mean an entirely new use case stack, which adds both ARR and product multiplier simultaneously.

## Strategy 4: Move upward through stakeholders

You've built strong usage and advocacy at the IC and team lead level. Now you engage a VP Engineering, CTO, or Head of Product to drive an org-wide commitment: annual contract, standardization on PostHog, top-down mandate to adopt across teams.

### When to use it

- Strong bottom-up adoption already exists (multiple users, multiple products, sustained usage)
- The account is large enough that an org-wide deal is meaningful ($60k+ ARR potential)
- You have evidence of value you can present to leadership (usage data, time saved, problems solved)
- There's a commercial event on the horizon (contract renewal, budget cycle, new fiscal year)

### How to execute

1. **Build the business case before you ask for the meeting.** Pull together usage data, product adoption, number of active users, and any concrete outcomes your champions have shared. Leadership doesn't care that Session Replay is cool. They care that it reduced bug reproduction time by 50% and saved 10 engineering hours a week.
2. **Get introduced, don't cold-call.** Ask your champion to set up the meeting. "Would it make sense to loop in [VP] so we can talk about how PostHog fits into the broader engineering org?" Your champion's internal credibility is what opens the door.
3. **Frame the conversation around their priorities, not yours.** Leadership cares about consolidation (fewer vendors, fewer contracts), cost predictability (annual plan vs. monthly surprises), and organizational efficiency (one platform for all teams vs. five point solutions). Lead with those.
4. **Have a specific commercial proposal ready.** Don't go in with "we should do an annual deal." Go in with "based on your current usage of $X/month across these teams, here's what an annual commitment would look like, including the discount and what that saves you." See [contract rules](/handbook/growth/sales/contract-rules) for discount structures, and remember that even after an annual deal is signed, additional usage beyond the annual run rate still [counts toward your quota](/handbook/growth/sales/how-we-work#how-commission-works---technical-account-managers).
5. **Use the meeting to also open multi-team expansion.** "Are there other teams that should be using PostHog but aren't?" is a natural question when you're talking to someone with org-wide visibility.

### Signals that it's working

- Leadership agrees to a meeting and brings relevant people
- Conversations shift from "should we keep using PostHog" to "how do we roll this out more broadly"
- Procurement or finance gets involved (this is a good sign, even if it slows things down)

### Common mistakes

- Going over your champion's head without their knowledge. This destroys trust and usually backfires.
- Trying to go upward before you have bottom-up proof. If leadership asks "do our teams actually use this?" and the answer is weak, you've wasted the meeting and it's very hard to get a second one.
- Treating the executive meeting as a product demo. Executives don't want a tour of features. They want to understand business impact and cost.
- Moving upward too early in the relationship. If you're still establishing trust with the IC team, forcing an executive conversation feels pushy and premature.

## Choosing the right strategy

There's no formula here, but some patterns hold:

| Account situation | Start with |
|-------------------|------------|
| Small team, 1-2 products, strong engagement | Go deeper |
| Low executive access, engineer-driven org | Build champions |
| Large org, multiple teams or products | Expand into new teams |
| Strong bottom-up usage, approaching renewal or budget cycle | Move upward |
| New account, first 90 days | Go deeper (always start here) |

For most accounts under $40k ARR with a single team, **go deeper** is the right default. You're adding products to the team that's already bought in.

For accounts over $60k ARR with multiple teams, **expand into new teams** is usually where the biggest growth lives. You can only go so deep with one team before you hit a ceiling.

**Build champions** and **move upward** are not standalone strategies — they're how you enable the other two. You build champions so they can pull you into new teams. You move upward so leadership can mandate adoption across the org. They're force multipliers, not end goals.

The best TAMs are running 2-3 of these in parallel on their largest accounts. One team is going deeper on products. A champion in that team is introducing you to another team. And you're building toward an executive conversation that ties it all together into an annual commitment.
