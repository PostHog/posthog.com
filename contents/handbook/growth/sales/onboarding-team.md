---
title: Onboarding Team
sidebar: Handbook
showTitle: true
---

# PLG Onboarding: The Onboarding (Specialist) Team


## Team overview

### What does this team do?

The north star metric for the Onboarding team is 3-month logo retention from the first $500+ forecasted bill, which can be tracked here ([link](https://us.posthog.com/project/2/dashboard/363452)).

Secondarily, we also care about net dollar retention for this segment.

### Which customers get onboarding

As above, the segment consists of customers who self-serve PostHog and generate a forecasted bill over $500. In practice, because billing is metered and in arrears, and we don't know what people will pay when they sign up (or when they first exceed a $500 forecast), so _most_ accounts > $500 forecast are routed to us. We also handle a couple of other segments:

- Startup customers rolling off, who have generated a first bill in the $500-$1500 range.
- Startup plan customers with high credit usage (> ~$1500).
- Hype startups we want to work with (despite being below $ thresholds), or longer-standing customers that have paid in this range and need billing or setup assistance.

### Which customers are out of scope

Since we primarily focus on customers who've signed up and have a forecasted bill, in most circumstances, we're not the right choice to talk to customers who've:

- Not signed up/generated a bill, but have contacted sales.
- Are early stage startups on the startup plan with no billing/low credit usage (<$500/mo).

### What does onboarding consist of?

Customers in this bucket essentially get high touch assistance for the first three months, who will focus on:

- **Billing Assistance**: It's easy to configure PostHog poorly, pay for products you don't use (eg Groups, Data Pipelines, Autocapture), or generally misconfigure such that the ROI is poor. Our main objective and first pass outreach is oriented towards trimming unnecessary spend, and communicating our position that [we are the cheapest for every product](/why).
- **Technical Assistance**: Beyond billing related configuration, we assist customers with any technical questions they have around setup and fitting PostHog into their stack. One 30-minute call discussing customer's architecture/providing suggestions, can go a long way to preventing issues down the road, especially for more complex setups. Misconfiguration (especially for analytics/identity merging) is a known churn risk.
- **Annual Plan/Sales-Assist**: When appropriate, get the customer on an annual plan or pass off to an AE (for more complex procurement process).

Tactically, the work consists of: 
- Audit the account based on data in Vitally and elsewhere (see below for more on [tooling](#tooling)). 
- Email owners/admins about any configuration issues affecting their bill or ability to use the product properly, and make ourselves available for a 30 mintue meeting.
  - Refund/adjust bills for misconfigurations, per our [policy](/handbook/growth/sales/refunds).
- Create a Slack Connect channel where spend is appropriate (on track to spend $20K/yr).
- Continue follow up (1-3 times depending on reception) throughout 3 billing periods, serve as point of contact as questions come up. Escalate anything we cannot answer directly.  

The response rate for billing/cost-reduction initial messaging is typically very high (we don't have exact data yet, but ~75% at some point over the first three months).

### Tooling

The main tools for this team are:

- Vitally
  - `Onboarding Lead` segment
  - Segments `Paid one nonzero bill`, `Paid two nonzero bills`, and `Paid three nonzero bills` are set as respective bills are paid by [this](https://posthog.vitally-eu.io/settings/playbooks/f6f3c9e0-2dc5-4560-8653-63d143816293) playbook, so we can track this data elsewhere (eg in PostHog via DWH sync, though this hasn't run as a backfill/won't be up to date as of Q1 2025)
  - Onboarding Specialist role is set by region [here](https://posthog.vitally-eu.io/settings/playbooks/50120bc6-98ae-4fc2-af38-7374ba424474)
- Metabase [Customer Usage Dash (US/EU)](https://metabase.prod-us.posthog.dev/dashboard/139-customer-usage-breakdown?organization_id=&project_id=&lookback_days=30)
- Stripe (make sure you have “Support Associate” permission level)
- Cal.com and BuildBetter (read more in [How we work](https://posthog.com/handbook/growth/sales/how-we-work#tools-we-use))
- QuoteHog (useful for predicting the usage)

### Onboarding Lifecycle

Since our role is focused on proactively providing users with value and setting them up for success, we’ve found it’s best to contact them **at least** 7 days before their bill renews. This gives them enough time to see our email, schedule a call, and implement potential improvements in their setup.

Our email should already include some actionable advice, so make sure you’re spending enough time on account analysis. Use your sixth sense here—if you see a large team with non-technical members who might benefit from PostHog training, offer it if you think it’s appropriate!

To monitor and stay on top of where accounts are in their ~3-month-long Onboarding Lifecycle, we use several workflows in Vitally:

**1. Onboarding Status**

- `Reach Out` – The account is waiting for our initial contact.
- `Meeting Scheduled` – Self-explanatory.
- `Ongoing` – They are in the onboarding cycle - we’ve reached out, and possibly we have an ongoing conversation.
- `Onboarded (Follow-Up)` – They’re all set, but we want to monitor their activity throughout the onboarding billing cycle.
- `Onboarded (Done)` – They have told us they are happy with PostHog and don't have any issues, or they have paid three bills.
- `No Engagement` – We haven’t heard back despite our efforts, but they’re still actively using PostHog.
- `Churned` – Sadly, despite our efforts, we lost the customer.

**2. Daily view** ([link](https://posthog.vitally-eu.io/hubs/152ccd4c-c7b2-4508-865b-b08fea5c3dc6/d08c5202-bdcd-40b8-aba7-5746c340a35b))

Sort your view by the “Next Renewal Date” column to reach out to users in a timely manner. Also, keep an eye on “Onboarding Status.”

You can add other useful columns to the view, like “Users Count,” “Next Due Task,” “Notes Count,” or who’s assigned to the account.

Maintaining good hygiene and attention to detail is key here. Keep labels up to date and make sure not to miss accounts that were recently added to the segment—they might appear at the top of the list among accounts you’ve already worked through.

Remember to add a short summary from meetings in a Note, and if you need to follow up at some point, create a Task with a due date.

**3. Kanban view** ([link](https://posthog.vitally-eu.io/hubs/fcbd959f-4b0e-4786-9c37-8a1d9fc4f634/5dca462e-a6d2-4710-a8f8-a2f4b492569c ))

A supplementary view that’s great for getting a general overview of progress.

### Account analysis

- Take a look at the [Metabase primer](https://github.com/PostHog/company-internal/wiki/Onboarding-Workflows#metabase-account-analysis) and follow the tips included there.
- Check and get familiar with the [Account health check](https://posthog.com/handbook/growth/sales/health-checks) page.

### How to deal with complex technical issues

Our role is pretty hybrid and lives at the intersection of other teams. As much as we love solving our own problems, escalations may happen. Here’s a brief guide on how to handle them:

- Do your homework – check our docs, ask Max AI, and search Slack and Zendesk for similar questions. You can also check GitHub to see whether we have a bug or enhancement logged. If that doesn’t bring you closer to a solution, ask in the team Slack channel.
- Don’t be afraid to admit when you don’t know something. Note it down and circle back once you’ve found the answer! Honesty goes a long way.
- Consider sharing a Loom recording in your reply to the user – It might be more efficient than a written instruction.
- If the issue requires in-depth troubleshooting, you can direct the user to create a ticket from the app, or you can do so on their behalf. Just remember to let them know before you do, so they’re not surprised when they see it in the UI!
- Before escalating the issue to Support, gather as much information and context as possible so your handover is informative and thorough. You can also share a recording of the call with the team, highlighting the relevant timestamp.

**How to deepen my product knowledge?**

- Add yourself to some AEs' Slack channels to see what kinds of questions are being asked and how they’re solved.
- Check recordings in the [Technical product troubleshooting](https://app.buildbetter.app/folders/14593) BuildBetter folder.
- Go through [Product Homework](https://docs.google.com/document/d/1x8fnUUi5bDGeSYQl_E-_fViuNxi7j_tC0YwhLC5lwv0/edit?tab=t.0#heading=h.cioukeluttdh).

**Teach how to fish**

Ideally, after the meeting with the user, they should know how to seek further help. That includes using Max, consulting the docs, and reaching out to our Support team.

### Handover to the Sales team

If you see that the customer spends more than ~$1667 monthly, do the discovery for their high spend level. If they’re happy with PostHog moving forward, you can casually mention our annual plan to them, which helps them save 20%. However, if they’re happy paying monthly, they’re more than welcome to do so! 

We can hand the account over to Sales when someone is interested in the annual plan, or requires some additional contractual or legal work. 

If you see accounts where there were some previous conversations with Sales, ping your fellow AE to make sure you’re not stepping on their toes. If there’s clearly a problem with duplication, and we shouldn’t be involved, ping Mine to double-check the logic. 

