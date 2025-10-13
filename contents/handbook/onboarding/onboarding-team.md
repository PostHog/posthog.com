---
title: Onboarding team
sidebar: Handbook
showTitle: true
---

## How we work

### What does this team do?

The north star metric for the Onboarding team is 3-month logo retention at 90% from the first $100+ forecasted bill, which can be tracked here ([link](https://app.posthog.com/project/2/dashboard/363452)).

We also care about net dollar retention for this segment, but we treat it as an auxiliary metric.

### Which customers get onboarding?

The segment consists of customers who self-serve PostHog and generate a forecasted bill of over $100. In practice, because billing is metered and in arrears, and we don't know what people will pay when they sign up (or when they first exceed a $100 forecast), so _most_ accounts > $100 forecast are routed to us. We also handle a couple of other segments:

-   YC program participants
-   Startup customers rolling off, who have generated a first bill in the $500-$1500 range.
-   Startup plan customers with high credit usage (> ~$1500).
-   Hype startups we want to work with (despite being below $ thresholds), or longer-standing customers that have paid in this range and need billing or setup assistance.

### Which customers are out of scope

Since we primarily focus on customers who've signed up and have a forecasted bill, in most circumstances, we're not the right choice to talk to customers who've:

-   Not signed up/generated a bill, but have contacted sales.
-   Are early-stage startups on the startup plan with no billing/low credit usage (<$500/mo).

### Tooling

Check out the list of [shared tools](https://posthog.com/handbook/growth/sales/sales-and-cs-tools). 

The team-specific tools for this team are:

- Onboarding hub in Vitally, and [main view](https://posthog.vitally-eu.io/hubs/08486fc6-0250-4c4c-abd8-3c5a168fd874/9f17c73c-94d2-487f-bc9a-e5041a568c8b) with Onboarding accounts
- [Shared Calendly link](https://calendly.com/posthog-onboarding-team)
- [Github project board](https://github.com/orgs/PostHog/projects/134/views/1)
- [Alfred workflows](https://github.com/PostHog/company-internal/tree/master/onboarding-team)

### Internal process (Vitally)

**Daily view** (<PrivateLink url="https://posthog.vitally-eu.io/hubs/152ccd4c-c7b2-4508-865b-b08fea5c3dc6/d08c5202-bdcd-40b8-aba7-5746c340a35b">link</PrivateLink>)

Sort your view by the “Next Renewal Date” column to reach out to users in a timely manner. Also, keep an eye on “Onboarding Pipeline”. Since our role is focused on proactively providing users with value and setting them up for success, we’ve found it’s best to contact them ~14 days before their bill renews. This gives them enough time to see our email, schedule a call, and implement potential improvements in their setup.

You can add other useful columns to the view, like “Users Count,” “Next Due Task,” “Notes Count,” or who’s assigned to the account.

Maintaining good hygiene and attention to detail is key here. Keep labels up to date and make sure not to miss accounts that were recently added to the segment—they might appear at the top of the list among accounts you’ve already worked through.

Remember to add a short summary from meetings in a Note, and if you need to follow up at some point, create a Task with a due date.

**Kanban view** (<PrivateLink url="https://posthog.vitally-eu.io/hubs/08486fc6-0250-4c4c-abd8-3c5a168fd874/15496ad6-4a4b-4c53-a9ea-b36100c301cb">link</PrivateLink>)

A supplementary view that’s great for getting a general overview of progress.

### Account analysis

-   Take a look at the [Metabase primer](https://github.com/PostHog/company-internal/wiki/Onboarding-Workflows#metabase-account-analysis) and follow the tips included there.
-   Check and get familiar with the [Account health check](https://posthog.com/handbook/cs-and-onboarding/health-tracking) page.
-   Use our docs, and link to relevant information.
-   Check the [Matching PostHog to a business type](https://posthog.com/handbook/growth/sales/utilization-by-business-type) page to understand your customers better in general.

## How to succeed 

### How to deal with complex technical issues

Our role is pretty hybrid and lives at the intersection of other teams. As much as we love solving our own problems, escalations may happen. Here’s a brief guide on how to handle them:

-   Do your homework – check our docs, ask Max AI, and search Slack and Zendesk for similar questions. You can also check GitHub to see whether we have a bug or enhancement logged. If that doesn’t bring you closer to a solution, ask in the team Slack channel.
-   Don’t be afraid to admit when you don’t know something. Note it down and circle back once you’ve found the answer! Honesty goes a long way.
-   Consider sharing a Loom recording in your reply to the user – It might be more efficient than a written instruction.
-   If the issue requires in-depth troubleshooting, you can direct the user to create a ticket from the app, or you can do so on their behalf. Just remember to let them know before you do, so they’re not surprised when they see it in the UI!
-   Before escalating the issue to Support, gather as much information and context as possible so your handover is informative and thorough. You can also share a recording of the call with the team, highlighting the relevant timestamp.
-   If a support issue lands in your inbox, forwarding it to supportreply@posthog.com should do the trick. Make sure to double-check in Zendesk that the ticket is not marked as Solved.
- Ideally, after the meeting with the user, they should know how to seek further help. That includes using Max, consulting the docs, and reaching out to our Support team.

### How to deepen your knowledge

-   Go through Sales docs, especially [Contract Rules](https://posthog.com/handbook/growth/sales/contract-rules), [Creating Contracts](https://posthog.com/handbook/growth/sales/contracts), and others from the SalesOps section. There will be some related conversations that you'll need to handle yourself, so come prepared.
-   Add yourself to some AEs' Slack channels to see what kinds of questions are being asked and how they’re solved.
-   Check recordings in the [Technical product troubleshooting](https://app.buildbetter.app/folders/14593) BuildBetter folder.
-   Go through [Product Homework](https://docs.google.com/document/d/1x8fnUUi5bDGeSYQl_E-_fViuNxi7j_tC0YwhLC5lwv0/edit?tab=t.0#heading=h.cioukeluttdh) and [Analytics Exercise](https://posthog.com/handbook/cs-and-onboarding/new-hire-onboarding-exercise).
-   Go through the [PostHog curriculum](https://posthog.com/handbook/cs-and-onboarding/new-hire-onboarding#posthog-curriculum).
-   Check out [Troubleshooting tips](https://posthog.com/handbook/support/troubleshooting-tips) and attend Ticket Deep Dive sessions and Product Intros that are scheduled periodically.
