---
title: Working with Legal
sidebar: Handbook
showTitle: true
---

PostHog's legal function is owned by Hector. This page explains when engineers need to loop him in, and how.

The default at PostHog is to move fast and trust people's judgment. But some engineering decisions have legal or compliance implications that aren't obvious at design time — and the cost of discovering them after the fact is high. This page is here to help you spot those situations early.

## When to involve Legal

Reach out to Hector **before writing the PR** for any of the following:

- **Changing data processing defaults** — anything that auto-opts customers into or out of data handling (e.g. enabling a new AI feature by default, changing what data is sent to a third-party service)
- **Adding or changing subprocessors** — any new third-party service that will process customer data (AI model providers, ML APIs, analytics tools, etc.)
- **New AI or ML features** that send customer data to external models or APIs
- **Changes to opt-in/opt-out mechanics** for features covered by DPAs or BAAs
- **Feature flags or settings** that would affect HIPAA customers or any customer with a signed BAA
- **Anything that touches DPA or BAA scope** — even changes that seem minor can affect our contractual obligations

If you're unsure whether something has compliance implications, the answer is to ask. A Slack message takes two minutes; unwinding a compliance issue takes much longer.

## How to involve Legal

1. Post in **#legal** on Slack with a one-paragraph summary: what you're building, what data it touches, and why you think it might have compliance implications
2. Tag **@Hector** directly for anything touching BAAs, HIPAA, or subprocessors
3. Do this at design/planning stage — not after the PR is up

If the change might affect customers who have signed BAAs, Sales and CS may also need a heads-up so they can manage customer comms. Hector can advise on this.

## Background: why this matters

PostHog signs [Business Associate Agreements (BAAs)](/handbook/growth/sales/contracts#business-associate-agreement-baa) with HIPAA-regulated customers. A BAA is a legal contract that governs how we handle Protected Health Information (PHI).

Our subprocessors — third-party services that process customer data on our behalf — are listed in our DPA. If customer data is routed through a subprocessor that isn't covered by our BAA (for example, an AI model provider), that's a compliance breach for any HIPAA customer whose data touched it.

This means a seemingly small engineering decision — like defaulting a new AI feature to on — can create a compliance problem for a subset of customers that's invisible unless Legal has been consulted first.
