---
title: Risk mitigation and churn prevention
sidebar: Handbook
showTitle: true
---

If you're actively thinking about churn prevention in response to a customer churn threat or major red flag, it's already way too late.

Churn prevention is best done from early, and often, risk mitigation practices.

We should default to flagging "at risk" accounts using the "Churn Risk" segment in Vitally well before the customer has told you they are exploring alternatives. If you have the slightest inkling that something may look off or something has you feeling a bit uncomfortable, flag it. This could be anything from not taking action on a recommendation you gave them for too long, down-trending volume with no apparent seasonality cause, only one or two core users of the platform, or no Slack activity for an extended period. To name a few.

There are a few risk-mitigation strategies you'll want to incorporate that serve as early detection and proactive mitigation, as well as a process for what to do when an account is actively at risk.

---

## Risk mitigation (proactive)

Risk mitigation is about building habits that surface problems before they become emergencies. If you're doing this well, you'll rarely need the reactive playbook below.

### Quarterly account planning

Every AM Managed account should have an Account Plan note created in Vitally once per quarter. You should also review this weekly with your manager.  This forces you to step back and evaluate the account holistically rather than just reacting to whatever's in front of you.

**Title format:** `Q[X] Account Plan - [Company Name]`

Use the Account Plan template in Vitally, which auto-populates key fields from the account record. The template covers:

**Account overview**

- ARR, business description, website, HQ location
- Business type (B2B SaaS, E-commerce, Marketplace, Developer Tools, Fintech, Healthcare, etc.)
- Key metrics relevant to their business model
- Business stage and funding

**Business objectives**

- What they're trying to achieve with PostHog (specific goals, not vague "analytics")
- How PostHog connects to their larger business objectives
- Whether value aligns with their expectations
- Obstacles they're facing, both in using PostHog and in their broader goals
- Upcoming constraints (budget freezes, code freezes, migrations, seasonality)
- Future needs over 6-18 months

**Stakeholders and users**

- Admin emails and total user count
- Percentage of active users (30 days)
- Key contacts with their priorities, goals, and preferred communication
- Multithreading status: do we have two-way dialogue with technical stakeholders, budget holders, and end-users?
- Record of multithreading attempts and progress

**Current usage and cross-sell**

- Products adopted (Product Analytics, Feature Flags, Group Analytics, Error Tracking, Session Replay, Surveys, Data Warehouse)
- Usage notes on how they're actually using each product
- Cross-sell opportunities with specific use cases, next steps, and relevant content to share
- Optimization opportunities for existing products (underused features, configuration improvements)

**Risks**

- Document each risk with: the challenge, what's at stake, plan of action, and next key date

**Action items**

- Multithreading: who, why, progress, anyone at PostHog who can help
- Finding new opportunity: what are you doing to find new revenue?
- Mitigating risk: what are you doing to uncover and mitigate risk?

If you can't fill out most of this template, that's a signal you need to dig deeper into the account. An incomplete account plan usually means incomplete understanding of the customer.

### Early warning signals

These aren't emergencies yet, but they should make you pay closer attention. Many of these are also tracked automatically as [risk indicators in Vitally](/handbook/cs-and-onboarding/health-tracking#risk-indicators).

| Signal | Why it matters |
|--------|----------------|
| Recommendation not actioned for 2+ weeks | They're not engaging with your guidance |
| Down-trending event volume (no seasonality) | Usage decline is a leading indicator of churn |
| Only 1-2 active users | Single point of failure, low organizational buy-in |
| No Slack activity for 14+ days | Relationship is going cold |
| Billing page visits without context | They're evaluating costs, possibly shopping around |
| Champion changed roles or left | Your internal advocate is gone |
| Support tickets spiking | Something is broken or frustrating |
| Single product usage | Low switching cost, easy to replace |
| Data exported to external warehouse only | PostHog becomes a pipe, not a destination |

When you notice any of these, don't wait. Reach out, dig in, and address it before it compounds.

### Drive adoption of behavioral products

Not all PostHog products carry the same switching cost. Customers who primarily use PostHog as a data pipe to an external warehouse are structurally riskier. If their analysts query Snowflake or BigQuery, PostHog becomes invisible and replaceable.

Behavioral products create stickiness because they're used directly in PostHog's UI and embed into day-to-day workflows:

| Product | Why it's sticky |
|---------|-----------------|
| **Surveys** | Active feedback collection tied to user segments. Hard to replicate externally. |
| **Cohorts** | Saved user segments used across insights, feature flags, and experiments. Accumulated investment. |
| **Workflows** | Automated actions triggered by product events. Operational dependency. |
| **Feature flags & experiments** | Engineering teams build release processes around them. Deep integration. |
| **Session replay** | Qualitative context that doesn't exist in a data warehouse. Unique value. |

When you see a customer heavily reliant on data pipelines and external analytics, proactively introduce behavioral products. Frame it as expanding what they can do, not replacing their warehouse workflow. The goal is to make PostHog the place where decisions get made, not just where data passes through.

**Practical moves:**

- Show them how cohorts can power targeted surveys or experiments
- Demo how session replay answers "why" questions that SQL can't
- Introduce workflows for automated follow-ups based on product events
- Help them build dashboards they actually use inside PostHog

If they're doing all their analysis in Looker or Mode, ask why. Sometimes it's habit, sometimes it's a gap we can fill. See [communication templates for new feature adoption](/handbook/growth/sales/communications-templates-feature-adoption) for outreach examples.

### Implementation health

A lot of customers self-serve without ever talking to a PostHog human. This means they can implement PostHog in ways that cause problems down the road: inflated bills, inaccurate data, or features that don't work as expected. Left unchecked, these issues lead to avoidable churn.

Proactively check for common implementation issues, especially for newer accounts or accounts that haven't had a technical review. See [checking the health of a customer's deployment](/handbook/cs-and-onboarding/health-checks) for the full checklist.

**Billing waste:**

- **Group Analytics enabled but not implemented.** We have a Vitally risk indicator for this. If they're B2B and could benefit, help them implement it. If not, tell them to remove the add-on.
- **Autocapture noise.** If >50% of events are autocapture and they haven't defined any autocapture actions, they're likely paying for events they don't use. Help them tune or disable it.
- **Session replay capturing everything.** Default settings capture all sessions. At minimum, recommend setting minimum duration to 2+ seconds to filter out low-value recordings.

**Tracking issues that erode trust:**

- **Calling identify() on every page.** Inflates event volume dramatically. They only need to call it [once per session](/docs/product-analytics/identify#best-practices-when-using-identify).
- **Calling group() on every page.** Same problem. Once per group per session is enough, or [when the group changes](/docs/product-analytics/group-analytics#how-to-create-groups).
- **Calling posthog.reset() before identify.** Creates unlinked anonymous users. Common culprit when web-to-app tracking seems broken. See guidance in the [JavaScript library features guide](/docs/libraries/js/features#resetting-a-user).
- **No reverse proxy.** Best practice is to use PostHog's [managed reverse proxy](/docs/advanced/proxy/managed-reverse-proxy) or configure their own. Events from their own domain improve reliability and ad-blocker resistance.

**Feature flag resilience:**

- **No fallback code.** If flags fail to load, the app should still work. Check that they're [falling back to working code](/docs/feature-flags/best-practices#9-fallback-to-working-code) when flags return unexpected values.
- **No local evaluation (server-side).** [Server-side local evaluation](/docs/feature-flags/local-evaluation) ensures flags work regardless of network status. Important for reliability.

When you find implementation issues, don't just tell them what's wrong. Help them fix it. A customer who had a billing problem you solved is more loyal than one who never had a problem at all.

### De-risking common churn scenarios

Most churn follows predictable patterns. See [common churn reasons](/handbook/cs-and-onboarding/churn-reasons) for the full list. Here's how to de-risk the scenarios we have some control over:

| Churn scenario | De-risking strategy |
|----------------|---------------------|
| **Champion leaves** | Multi-thread relationships across teams. The more users actively in PostHog, the less one departure matters. |
| **Champion isn't the decision maker** | Identify and build relationships with actual decision makers. Your champion can help with introductions. |
| **Customer builds internally or switches to competitor** | Drive multi-product adoption. Harder to replace five products than one. |
| **Poor customer experience** | Stay on top of open issues proactively. Circle back before they have to follow up. Rebuild trust through responsiveness. |
| **Customer can't extract value** | Offer workshops, training, or hands-on help building specific insights. Don't wait for them to ask. |
| **Missing critical feature** | Loop in the relevant PM and engineering team. Be transparent about what we can and can't do. Make sure the request is also [tracked in Vitally](/handbook/cs-and-onboarding/feature-requests) |
| **PostHog isn't trusted as source of truth** | Dig into data discrepancies. Often an implementation issue. If they're exporting everything to another tool, they're one step from leaving. |
| **Privacy/compliance concerns** | Help them understand [data controls](/docs/privacy/data-collection), [masking](/docs/cdp/transformations/template-url-masking), [privacy controls](/docs/session-replay/privacy), [cookieless tracking](/tutorials/cookieless-tracking), and [data deletion](/docs/privacy/data-storage#data-deletion) options. Often they assume they can't use features when they actually can. |

For scenarios outside our control (acquisition, company shuts down, not ICP fit), document what happened and share learnings with the team. There's usually something we can learn even when we couldn't have changed the outcome.

---

## Churn prevention (reactive)

When an account is actively at risk (they've told you they're evaluating alternatives, usage has cratered, or you've lost a champion) you need to move fast and follow a clear process.

### When to flag an account as at risk

Add the account to the **Churn Risk** segment in Vitally if any of the following are true:

- Customer explicitly mentions evaluating alternatives or considering churning
- Usage has dropped 30%+ with no seasonal explanation
- Key champion has left and no replacement relationship exists
- Payment has failed and they're unresponsive
- They've asked for a full data export
- Health score has been "Poor" for 4+ consecutive weeks
- Contract is up for renewal in <90 days with negative engagement signals
- They're not using PostHog as source of truth (all analysis happens externally)

**When in doubt, flag it.** It's easier to remove a flag than to explain why we didn't see a churn coming.

### Internal process

**1. Post in #customer-churn**

When you flag an account as at risk, post in the #customer-churn Slack channel with:

- Account name and ARR
- What triggered the risk flag
- What you know about the situation
- What help you need (if any)

This keeps the team informed and surfaces accounts that might need additional support or visibility.

**2. Weekly at-risk account review**

We hold a weekly team meeting to review all accounts in the Churn Risk segment in Vitally. Come prepared to:

- Give a 60-second status update on each at-risk account you own
- Share what you've tried and what's working or not
- Ask for help or ideas from the team

The objective is accountability and support. If an account has been at-risk for 4+ weeks with no improvement, we need to either escalate for additional support or accept the loss and document learnings.

**3. Escalation**

Escalation means getting support at a higher level, not handing off the account. You remain the owner and primary contact. Use your best judgment on when to pull in additional resources:

- **Engineering involvement:** If there's a technical issue, bug, or feature gap that's driving the churn risk, loop in the relevant engineering team directly. Tag them in Slack, share context, and ask for their help.
- **Product involvement:** If the customer needs a feature we don't have or is struggling with product limitations, bring in the relevant PM. They may want to join a call to understand the use case.
- **Leadership involvement:** For strategic accounts or situations that need executive attention (pricing negotiations, product commitments, relationship rescue at the exec level), loop in your team lead. For accounts >$50k ARR at serious risk, involve Charles or Simon to get their perspective and support.

The goal of escalation is to get the right people involved to help you save the account, not to pass the problem to someone else. You're still driving the relationship and the recovery plan.

### Recovery playbook

Once flagged, your job is to diagnose and act:

**Diagnose the root cause.** Is this price, product, relationship, implementation, or business change? You can't fix what you don't understand. Use the churn scenarios above as a checklist.

**Get on a call.** Don't try to save accounts over email. Get face-to-face (or video) time to have a real conversation.

**Listen more than pitch.** Understand their perspective fully before proposing solutions.

**Be honest about gaps.** If we can't do something they need, say so. Credibility matters more than closing a save. This aligns with our [sales principles](/handbook/growth/sales/overview): we don't care about losing deals if we'd have to compromise on our principles.

**Create a recovery plan.** Document specific actions with dates and owners. Share it with the customer so they know you're taking this seriously.

**Follow up relentlessly.** A save isn't done until the risk is resolved and usage is stable. Check in weekly until you're confident.

### When churn happens

Not every at-risk account can be saved. When a customer churns, write a retro and share it in #customer-churn as soon as possible while the details are fresh. See [learn from churn](/handbook/cs-and-onboarding/customer-churn-retros) for the template and guidance.

---

## Summary

| Activity | Cadence |
|----------|---------|
| Account Plan note in Vitally | Quarterly |
| Implementation health check | At onboarding + annually |
| Early warning signal monitoring | Ongoing |
| Behavioral product adoption push | Ongoing (especially for warehouse-heavy accounts) |
| #customer-churn posts | As needed when flagging risk |
| At-risk account review meeting | Weekly |
| Recovery calls with at-risk accounts | Within 48 hours of flagging |
| Churn retros in #customer-churn | Within 1 week of churn |

The best churn prevention is never needing to prevent churn. Build the habits, check implementation health, drive behavioral product adoption, and catch problems early.


