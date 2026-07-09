---
title: Working with product engineering
sidebar: Handbook
showTitle: true
---

Forward deployed engineers (FDEs) are one of the fastest feedback loops between real customer usage and the product roadmap.

## Feeding customer problems back

FDEs see how PostHog behaves in real customer stacks before anyone else does. That vantage point is only useful if what we learn reaches the people who can act on it. So when an engagement surfaces a product gap, we hand the owning [small team](/handbook/company/small-teams) a concrete, reproducible write-up (what broke, who hit it, and what it blocked) rather than a Slack message that scrolls away.

Fixing that gap is unbilled by design: it makes PostHog better for every future customer, not just the account in front of us, so the time is on us. (Billed, single-customer implementation is [professional services](/handbook/forward-deployed-engineering/how-we-work#engagement-types); the product investment around it is FDE.)

## Escalations

When a customer engagement is blocked by a confirmed bug or a missing capability only a product team can fix, escalate to the owning team. Keep the ladder short:

1. The **FDE owner** handles it, and most things stop here.
2. The **FDE team lead** steps in if it touches pricing, scope, or another team's product surface.
3. **Product engineering** gets looped in for confirmed bugs that block customer work; see [bug prioritization](/handbook/engineering/bug-prioritization). Don't page a product team for one customer's preference.

Escalating isn't a failure. Sitting on a stuck thread for a week is.

## Contributing changes

FDEs can often fix or extend things directly rather than waiting on a team, which is part of the value of being engineers embedded with customers. When we do, we follow the same [development process](/handbook/engineering/development-process) and [review standards](/handbook/engineering/how-we-review) as everyone else, and we work *with* the owning team rather than around them.

Where we reach for a fix ourselves: small, well-understood changes, and anything where a reference implementation is faster to write than to specify. Where we hand off: larger changes, anything that shifts a team's roadmap, and anything touching an area we don't have the context to own safely.

## Respecting team ownership

Product teams own their areas, full stop. We find the owning [small team](/handbook/company/small-teams), loop them in early, and respect their call on their surface. The whole point of feeding customer problems back is to make the roadmap better, and routing around the team that owns it defeats that.
