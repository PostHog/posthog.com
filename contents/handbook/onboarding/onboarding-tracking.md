---
title: Onboarding Tracking
sidebar: Handbook
showTitle: true
---

The onboarding team operates a high volume, high velocity sales pipeline with all pay-as-you-go (or YC) accounts that are forecasted to spend > $100 and are not otherwise engaged by Sales/CSM. As such, Onboarding is a linear flow moving from initial outreach to confirming the product is configured properly, ending with customers who are happy paying multiple bills. We aim to keep engagements to ~8 weeks, or 2 full billing periods, but in practice, there is some spillover depending on responsiveness. 

### Stages

There are two paths for customers to progress through the onboarding process: those who engage with us in some way, and those who show little or no engagement.

These are the statuses we use to track users in the new **Onboarding Pipeline** property:

- `1. New Account` - Where new customers land when they enter the `Onboarding Lead` segment.
- `2. Onboarding Initiated` - Assigned as soon as we send out the initial outreach email.
- `3a. Engaged — Email` - Assigned as soon as a customer responds to our initial outreach email.
- `3b. Engaged — Call Booked` -  Assigned as soon as a customer books a call with us.
- `4a. Intro Call Completed` - Assigned when the first call is completed.
- `4b. Second Call Completed` - Assigned when we complete the second call, diving deeper into specific KPIs and business goals.
- `4c. Homework Offered` - Assigned only to customers who have completed a second call with us, and receive tailored homework.
- `5. Awaiting Final Outreach` - Assigned to both engaged and unengaged customers; the final stage where we review the account, and wrap up the onboarding process.
- `6a. Onboarded — No Engagement` - Assigned to customers that never engaged with us in any way.
- `6b. Onboarded — Engaged` - Assigned to those who engaged either over email or also in a call.
- `6c. Sales Handoff` - Assigned to customers that we [hand over to sales](/handbook/onboarding/sales-handover). This can happen at any stage throughout the process.
- `6d. Churned` - Assigned to churned customers.

Stages `3a` to `4c` only happen for those customers who engaged with us over email or in a call. For those who never engaged with us, they skip immediately to `5. Awaiting Final Outreach`.

> Note: You may need to add this property to your views in Vitally. It's found under `Custom Traits`.

### How this is organized in Vitally

- [Onboarding Pipeline](https://posthog.vitally-eu.io/settings/traits/accounts) tracks the stage.
- [Onboarding Pipeline Main Workflow Playbook](https://posthog.vitally-eu.io/settings/playbooks/481c2fc5-1c52-412c-a20a-e062c9d02abc) controls setting timestamps for corresponding traits when accounts enter certain stages. These should be treated as rough estimates, as the automations that move accounts from one stage to another are imperfect.
- Additional automations use best effort to move accounts automatically from one stage to another, though they are somewhat limited by Vitally's ability to trigger on specific data.
	- Accounts that end up in the Onboarding segment get `1. New Account` automatically (set in main workflow playbook)
	- Accounts we reach out to — any with a convo started by Cameron, Magda, or Dan, get set to `2. Onboarding Initiated` [here](https://posthog.vitally-eu.io/settings/playbooks/754f037e-892b-435a-a189-9f3da9b922fa)
  	- We are working without automations for the other stages for now, as there is some complexity in actually making them update automatically based on limited Vitally triggers. This is a WIP.  

We do not track timestamps for every single stage, just for the overall numbered buckets (e.g, 1. New account, 2. Contacted, 3. Responded, 4. "Onboarding in process", 5. Last touch, 6. Various completion states).

### Segments

Going forward, we only have one main segment: `Onboarding Lead`. We'll be retiring `Onboarding - engaged` as soon as we have worked through all the legacy accounts.

### Alerts and revenue tracking

We occasionally shift our attention to help customers who may need more urgent assistance. For these, we have two types of alerts (tasks) in Vitally - they're currently assigned to Magda.

-   **Failed payments alert** - This is more of a safety net, as users are informed when it happens. It's a good moment to reach out and offer help in figuring out their volume/billing.
-   **Upcoming large invoice alert** - It lets us prioritize the customer to touch base and make sure the bill doesn't come as a surprise.

To help our Revenue team get the forecasting right, we now have a `Payment Risk Assessment` field in the Vitally dashboard, where we can manually mark when we see that the customer is unlikely to pay their invoice.
