---
title: Onboarding process and tracking
sidebar: Handbook
showTitle: true
---

The onboarding team operates a high volume, high velocity sales pipeline with all pay-as-you-go (or YC) accounts that are forecasted to spend > $500 and are not otherwise engaged by Sales/CSM. As such, Onboarding is a linear flow moving from initial outreach to confirming the product is configured properly, ending with customers who are happy paying multiple bills. We aim to keep engagements to ~8 weeks, or 2 full billing periods, but in practice, there is some spillover depending on responsiveness.

### Principles

Our onboarding program was created to offer necessary help, increase the value our customers get from PostHog, and assist them in achieving their business goals.

The program is guided by a few key principles:

- Help with initial configuration and billing, offer advice on usage.
- Assist customers with any technical questions they have around fitting PostHog into their stack.
- Act as strategic partners in achieving business goals.
- Adapt to varied levels of engagement while ensuring value for everyone.
- Encourage time spent in PostHog, trying things out. Adoption can be fun!
- Share best practices to leverage PostHog tailored to specific use cases.

### Internal process

#### Vitaly views

**Daily view** (<PrivateLink url="https://posthog.vitally-eu.io/hubs/152ccd4c-c7b2-4508-865b-b08fea5c3dc6/d08c5202-bdcd-40b8-aba7-5746c340a35b">link</PrivateLink>)

Sort your view by the “Next Renewal Date” column to reach out to users in a timely manner. Since our role is focused on proactively providing users with value and setting them up for success, we’ve found it’s best to contact them ~14 days before their bill renews. This gives them enough time to see our email, schedule a call, and implement potential improvements in their setup.

Keep an eye on “Onboarding Pipeline,” which indicates whether the account is New or Onboarding has been initiated.

In the view, you have other useful columns like OS Priority, OS Last Messaged, forecasted MRR, or who’s assigned to the account. All these help in prioritizing your work.

Maintaining good hygiene and attention to detail is key here. Keep labels up to date and make sure not to miss accounts that were recently added to the segment—they might appear at the top of the list among accounts you’ve already worked through.

Remember to add a short summary from meetings in a Note, and if you need to follow up at some point, create a Task with a due date.

**Kanban view** (<PrivateLink url="https://posthog.vitally-eu.io/hubs/08486fc6-0250-4c4c-abd8-3c5a168fd874/15496ad6-4a4b-4c53-a9ea-b36100c301cb">link</PrivateLink>)

A supplementary view that’s great for getting a general overview of progress.

#### Onboarding program - logic and sequence

There are two paths for customers to progress through the onboarding process: those who engage with us in some way, and those who show little or no engagement.

User engagement is tracked behind the scenes with the time stamp in Vitally, thanks to which we can query relevant data. 

For day-to-day operations, these are the statuses we use to track users in the **Onboarding Pipeline** property:

- `1. New Account` - Where new customers land when they enter the `Onboarding Lead` segment. During the outreach, we audit the account and share observations on current usage and optimization tips. We point out any configuration issues affecting their bill or ability to use the product properly. Our main objective is oriented towards trimming unnecessary spending, and communicating our position that [we are the cheapest for every product](https://posthog.com/why). This step can also involve refunding/adjusting bills for misconfigurations, per [our policy](https://posthog.com/handbook/growth/sales/refunds).
- `2. Onboarding Initiated` - Assigned as soon as we send out the initial outreach email.
- `3. Onboarded` -  The onboarding program has been completed. The status chances automatically after the Graduation email is sent, or we change it manually for some reason.
- `Sales Handoff` - Assigned to customers that we [hand over to sales](/handbook/onboarding/sales-handover). This can happen at any stage throughout the process.
- `Paid call purchased` - Assigned when someone buys our consultation via the merch store. The status is applied automatically via [this Workflow](https://us.posthog.com/project/2/workflows/019ae005-7196-0000-2099-ab41737ab9f6/workflow). 

The last two are not numbered, as they happen "outside" of the regular pipeline.

> Note: You may need to add this property to your views in Vitally. It's found under `Custom Traits`.

For higher-spend accounts ($500+), we have `Check-in` **Onboarding Status** property that's triggered between 15-21 day in the Onboarding Journey. It serves us as a visual helper and reminder to circle back to the account, see if our advice was followed, record a Loom video, or share some extra resources. It's a great opportunity to re-engage customers and show them some other PostHog's capabilities that they may not know about.

The complete Onboarding Journey looks as follows:

| Weeks | Actions |
| -------- | -------- |
| Week 1    | First outreach to a New Account|
| Week 2    |          |
| Week 3    | Extra check-in for $500+ accounts|
| Week 4    |          |
| Week 5    | 2nd outreach (automated) - all accounts|
| Week 6    |          |
| Week 7    |          |
| Week 8    | Graduation (automated) - all accounts|

The last two stages of the Onboarding Journey are automated with Vitally playbooks. Second outreach prompts users to surface unanswered questions and book a session with us, and the Graduation email is a nice way to conclude the journey and point out other avenues where users can get help. It's also where we ask for feedback about our Onboarding. 

#### Account analysis for outreach and meetings

-   Take a look at the [Metabase primer](https://posthog.com/handbook/onboarding/metabase-account-analysis) and follow the tips included there.
-   Check and get familiar with the [Account health check](https://posthog.com/handbook/cs-and-onboarding/health-tracking) and the [Onboarding conversations](https://posthog.com/handbook/onboarding/onboarding-conversations-playbook) pages.
-   Use our docs, and link to relevant information.
-   Check the [Matching PostHog to a business type](https://posthog.com/handbook/growth/sales/utilization-by-business-type) page to understand your customers better in general.
-   Use Wappalyzer (browser or extension) to understand the customer's tech stack better. Credentials available in 1password.

### How this is organized in Vitally via Playbooks

#### General playbooks

- [Onboarding Pipeline Traits](https://posthog.vitally-eu.io/settings/traits/accounts) track the stage.
- [Boost plan lead for onboarding specialist](https://posthog.vitally-eu.io/settings/playbooks/992541a3-e1cb-4e87-83c1-0b0c70ac1f7f)
- [100-500 Onboarding Segment Logic - first payment due >100 (updated 9/2/2025)](https://posthog.vitally-eu.io/settings/playbooks/92d05ad4-11d6-44c7-ae29-fa1636b74920)
- [[Onboarding Pipeline] 1. New Non-startup Account (Onboarding lead first payment due](https://posthog.vitally-eu.io/settings/playbooks/533794c1-e9dc-479c-925c-7e0487648661)
- [[Onboarding Pipeline] 1. New Startup Account (Startup lead for onboarding specialist)](https://posthog.vitally-eu.io/settings/playbooks/8fd68f0d-0b86-4b16-876f-fb8097e7bf0d)

#### Setting timestamps for each stage

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

We also use the `Onboarding Lead 100-500MRR` auxiliary segment to provide us with more information about the account and help us prioritize the work. 

`Onboarding Completed` segment corresponds with `3.Onboarded` trait and it serves as a visual indicator for other teams that the Onboarding has been completed.

### Alerts and revenue tracking

We occasionally shift our attention to help customers who may need more urgent assistance. For these, we have a few types of alerts (tasks) in Vitally, where Magda is a failsafe if the account doesn't have an assigned OS.

-   **Failed payments alert** - This is more of a safety net, as users are informed when it happens. It's a good moment to reach out and offer help in figuring out their volume/billing.
-   **Upcoming large invoice alert** - It lets us prioritize the customer to touch base and make sure the bill doesn't come as a surprise.
-   **Event/Feature Flag/Replay/Error tracking spike indicator for OS** - unusually high usage that may point to a misconfiguration and require our assistance.

To help our Revenue team get the forecasting right, we now have a `Payment Risk Assessment` field in the Vitally dashboard, where we can manually mark when we see that the customer is unlikely to pay their invoice.
