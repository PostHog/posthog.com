---
title: Working with customers
sidebar: Handbook
showTitle: true
---

Forward deployed engineers (FDEs) own the technical outcome of an engagement; the commercial relationship stays with [sales and CS](/handbook/forward-deployed-engineering/working-with-sales-and-cs). Once the work is scoped, delivering it well comes down to a handful of habits: a steady cadence, clear deliverables, and a clean handover. For the process behind an engagement (the lifecycle, scoping, engagement types, and pricing), see [how we work](/handbook/forward-deployed-engineering/how-we-work).

## Delivery

Hands-on implementation work: instrumentation, data modeling, migrations, integrations, and reference implementations.

A deliverable is finished when a stranger on the customer's team could pick it up cold, understand the scope, follow the recommendation, and not need to ping us. Every deliverable answers four questions, in order:

1. **What is this?** One paragraph, no jargon.
2. **What did we find or build?** The substance: lead with the conclusion, then the supporting analysis.
3. **What does the customer do next?** Specific, ordered, and assigned to named people.
4. **What did we assume, and what's out of scope?** Calibrates expectations and protects against scope creep on the next iteration.

Write in the customer's vocabulary, not ours; their team has to live with the deliverable. Be direct: "use X" beats "you may want to consider X."

### Foundations before dashboards

Most analytics engagements have a hidden trap: the dashboards are the visible deliverable, so there's pressure to build them first, but they're only as trustworthy as the data layer underneath. A dashboard built on a half-joined identity layer or a partially instrumented event stream doesn't fail; it renders a number that's plausible and wrong, which is worse than no dashboard, because the customer makes decisions on it.

So we work in order:

1. **Data layer.** Get the product, billing, and CRM sources cleanly joinable, taxonomy clean, and identify/group calls firing on time.
2. **Dashboards and automations.** The daily tools the customer actually uses (churn triage, renewals, product health, alerts).
3. **Documentation and training.** Hand off to the customer's team so they own it after we leave.

When someone asks "can we just build the dashboard now?", the honest answer is "we can, but it'll be silently wrong until the data lands."

## Rhythms

- **Reply within a business day** to any direct customer mention or DM. If you can't answer in a day, acknowledge in a day and give a real ETA.
- **Weekly sync.** 30 minutes at the same time each week for in-flight engagements. If there's nothing to talk about, cancel; don't pad.
- **Weekly async update.** A one-paragraph status note in the customer channel that frames the next week, so nobody's surprised on Monday.

Internally, we split each day into **planned** work (the couple of things you chose to make progress on) and **adhoc** work (customer pings, escalations, quick questions that arrive during the day). Both count. If the week is mostly adhoc, you're firefighting, not executing. That's the signal to scope back or redistribute, and it's why we log even the small stuff. Invisible work can't be managed.


<!-- TODO: ONSITES document how FDEs run customer on-sites: when one is worth it, how to prepare, and what good looks like. Reference the sales team's customer on-sites guide (/handbook/growth/sales/customer-onsites) and engineering's visiting customers guide (/handbook/engineering/visiting-customers). -->

## Handover

When the technical work is done, hand the relationship back to CS and write down what was built and why. A clean handover means:

- The deliverable is shipped and approved by a named person on the customer side.
- Any follow-on work is captured as explicit tasks, not left implicit in the prose.
- Questions that came up during the engagement are answered in writing, so the next customer, or the CS owner, hits an answer instead of re-deriving it.
- Anything that generalized has been graduated into shared team knowledge.

## Boundaries with support

FDE engagements are scoped and higher-touch, and they leave a durable artifact. Ongoing, ticket-shaped issues belong with [support](/handbook/support/support-team). If a customer's questions are recurring and reactive rather than pointed at a specific outcome, that's a signal it's support (or a support retainer), not an FDE engagement, so reframe it rather than absorbing it silently.
