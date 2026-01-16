---
title: Onboarding tracking
sidebar: Handbook
showTitle: true
---

The onboarding team operates a high volume, high velocity sales pipeline with all pay-as-you-go (or YC) accounts that are forecasted to spend > $100 and are not otherwise engaged by Sales/CSM. As such, Onboarding is a linear flow moving from initial outreach to confirming the product is configured properly, ending with customers who are happy paying multiple bills. We aim to keep engagements to ~8 weeks, or 2 full billing periods, but in practice, there is some spillover depending on responsiveness.

### Principles

Our onboarding program was created to offer necessary help, increase the value our customers get from PostHog, and assist them in achieving their business goals.

The program is guided by a few key principles:

- Help with initial configuration and billing, offer advice on usage.
- Assist customers with any technical questions they have around fitting PostHog into their stack.
- Act as strategic partners in achieving business goals.
- Adapt to varied levels of engagement while ensuring value for everyone.
- Encourage time spent in PostHog, trying things out. Adoption can be fun!
- Share best practices to leverage PostHog tailored to specific use cases.

### Stages

There are two paths for customers to progress through the onboarding process: those who engage with us in some way, and those who show little or no engagement.

These are the statuses we use to track users in the new **Onboarding Pipeline** property:

- `1. New Account` - Where new customers land when they enter the `Onboarding Lead` segment. During the outreach, we audit the account and share observations on current usage and optimization tips. We point out any configuration issues affecting their bill or ability to use the product properly. Our main objective is oriented towards trimming unnecessary spending, and communicating our position that [we are the cheapest for every product](https://posthog.com/why). This step can also involve refunding/adjusting bills for misconfigurations, per [our policy](https://posthog.com/handbook/growth/sales/refunds).
- `2. Onboarding Initiated` - Assigned as soon as we send out the initial outreach email.
- `3a. Engaged — Email` - Assigned as soon as a customer responds to our initial outreach email.
- `3b. Engaged — Call Booked` -  Assigned as soon as a customer books a call with us. During the call, we focus on hands-on implementation of optimization practices.
- `4a. Intro Call Completed` - Assigned when the first call is completed.
- `4b. Second Call Completed` - Assigned when we complete the second call, diving deeper into specific KPIs and business goals.
- `5. Awaiting Final Outreach` - Assigned to both engaged and unengaged customers 10 days before the bill's renewal. It's the final stage where we review the account, ensure usage and configuration are solid, and wrap up the onboarding process. We share additional educational resources and highlight where to find ongoing help.
- `6a. Onboarded — No Engagement` -  This stage is set right after sending the final outreach. Assigned to customers that never engaged with us in any way.
- `6b. Onboarded — Engaged` - This stage is set right after sending the final outreach. Assigned to those who engaged either over email or also in a call.
- `6c. Sales Handoff` - Assigned to customers that we [hand over to sales](/handbook/onboarding/sales-handover). This can happen at any stage throughout the process.
- `6d. Churned` - Assigned to churned customers.
- `7. Paid call purchased` - Assigned when someone buys our consultation via the merch store. The status is applied automatically via [this Workflow](https://us.posthog.com/project/2/workflows/019ae005-7196-0000-2099-ab41737ab9f6/workflow). 

Stages `3a` to `4b` only happen for those customers who engaged with us over email or in a call. For those who never engaged with us, they skip immediately to `5. Awaiting Final Outreach`.

> Note: You may need to add this property to your views in Vitally. It's found under `Custom Traits`.

### How this is organized in Vitally via Playbooks

#### General playbooks

- [Onboarding Pipeline Traits](https://posthog.vitally-eu.io/settings/traits/accounts) track the stage.
- [Boost plan lead for onboarding specialist](https://posthog.vitally-eu.io/settings/playbooks/992541a3-e1cb-4e87-83c1-0b0c70ac1f7f)
- [100-500 Onboarding Segment Logic - first payment due >100 (updated 9/2/2025)](https://posthog.vitally-eu.io/settings/playbooks/92d05ad4-11d6-44c7-ae29-fa1636b74920)
- [[Onboarding Pipeline] 1. New Non-startup Account (Onboarding lead first payment due](https://posthog.vitally-eu.io/settings/playbooks/533794c1-e9dc-479c-925c-7e0487648661)
- [[Onboarding Pipeline] 1. New Startup Account (Startup lead for onboarding specialist)](https://posthog.vitally-eu.io/settings/playbooks/8fd68f0d-0b86-4b16-876f-fb8097e7bf0d)

#### Setting timestamps  for each stage

- [[Onboarding Pipeline] 2. Onboarding Initiated -> set timestamp](https://posthog.vitally-eu.io/settings/playbooks/c58150a0-a6f5-43bb-a790-59fbdec6d262)
- [[Onboarding Pipeline] 3. Engaged (Email/Call) -> set timestamp](https://posthog.vitally-eu.io/settings/playbooks/b082beb9-227d-45fc-a73a-5c694688e65a)
- [[Onboarding Pipeline] 4. (Nurture) -> set timestamp](https://posthog.vitally-eu.io/settings/playbooks/d1ff7ceb-8b9f-418c-a354-be8e2325c472)
- [[Onboarding Pipeline] 6a. Onboarded — No Engagement -> set timestamp](https://posthog.vitally-eu.io/settings/playbooks/6deca76c-7a96-4675-bfdc-b9ab7ec6f7e4)
- [[Onboarding Pipeline] 6b. Onboarded — Engaged -> set timestamp](https://posthog.vitally-eu.io/settings/playbooks/1e95eb5b-a2ca-4f47-957f-acc193776a34)
- [[Onboarding Pipeline] 6c. Sales Handoff -> set timestamp](https://posthog.vitally-eu.io/settings/playbooks/df072651-3f6f-409b-892d-74cdf099a77c)
- [[Onboarding Pipeline] 6d. Churned -> set timestamp](https://posthog.vitally-eu.io/settings/playbooks/65d770f0-fe2f-48e9-9295-0cf632974c94)

#### Automations

- [[Pipeline Automation — Stage 1 -> 2] Has been contacted by Onboarding Specialist](https://posthog.vitally-eu.io/settings/playbooks/754f037e-892b-435a-a189-9f3da9b922fa) - Accounts we reach out to — any with a convo started by Magda or Dan get set to `2. Onboarding Initiated`
- [[Pipeline Automation — Stage 2 - 3] Move status from Onboarding Initiated to Call booked](https://posthog.vitally-eu.io/settings/playbooks/bbce230d-ca70-40ef-a44d-c5d338fe80f7)
- [[Pipeline Automation — Stage X - 5] Update status to Awaiting Final Outreach](https://posthog.vitally-eu.io/settings/playbooks/aa1d8ac8-a602-4906-8508-cd29e95abe60) - This status is assigned ~10 days before the next renewal date (after having gone through any other step in the pipeline)
- [sales lead - first payment due — all 2000+](https://posthog.vitally-eu.io/settings/playbooks/755bce87-458e-4ab7-b4d4-c8a63dec4ca8)

#### Other

- [Post-onboarding satisfaction survey trigger](https://posthog.vitally-eu.io/settings/playbooks/5d5c0361-5565-4d5f-89e7-21744378a2fb)

### Segments

Going forward, we only have one main segment: `Onboarding Lead`. We'll be retiring `Onboarding - engaged` as soon as we have worked through all the legacy accounts.

### Alerts and revenue tracking

We occasionally shift our attention to help customers who may need more urgent assistance. For these, we have two types of alerts (tasks) in Vitally - they're currently assigned to Magda.

-   **Failed payments alert** - This is more of a safety net, as users are informed when it happens. It's a good moment to reach out and offer help in figuring out their volume/billing.
-   **Upcoming large invoice alert** - It lets us prioritize the customer to touch base and make sure the bill doesn't come as a surprise.

To help our Revenue team get the forecasting right, we now have a `Payment Risk Assessment` field in the Vitally dashboard, where we can manually mark when we see that the customer is unlikely to pay their invoice.
