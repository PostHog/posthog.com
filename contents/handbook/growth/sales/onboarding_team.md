---
title: Onboarding Team
sidebar: Handbook
showTitle: true
---

# PLG Onboarding: The Onboarding (Specialist) Team


## Team overview

### What does this team do?

The north star metric for the Onboarding team is 3-month logo retention from the first $500+ forecasted bill, which can be tracked here (link).

Secondarily, we also care about net dollar retention for this segment (link).

### Which customers get onboarding?

As above, the segment consists of customers who self-serve PostHog and generate a forecasted bill over $500. In practice, because billing is metered and in arrears, and we don't know what people will pay when they sign up (or when they first exceed a $500 forecast), so _most_ accounts > $500 forecast are routed to us. We also handle a couple of other segments:

- Startup customers rolling off, who have generated a first bill in the $500-$1500 range
- Startup plan customers with high credit usage (> ~$1500)
- Hype startups we want to work with (despite being below $ thresholds), or longer-standing customers that have paid in this range and need billing or setup assistance

### Which customers are out of scope

Since we primarily focus on customers who've signed up and have a forecasted bill, in most circumstances, we're not the right choice to talk to customers who've:

- Not signed up/generated a bill, but have contacted sales
- Are early stage startups on the startup plan with no billing/low credit usage (<$500/mo)

### What does onboarding consist of?

Customers in this bucket essentially get high touch assistance for the first three months, who will focus on:

- **Billing Assistance**: It's easy to configure PostHog poorly, pay for products you don't use (eg Groups, Data Pipelines, Autocapture), or generally misconfigure such that the ROI is poor. Our main objective and first pass outreach is oriented towards trimming unnecessary spend, and communicating our position that [we are the cheapest for every product](/why).
- **Technical Assistance**: Beyond billing related configuration, we assist customers with any technical questions they have around setup and fitting PostHog into their stack. One 30-minute call discussing customer's architecture/providing suggestions, can go a long way to preventing issues down the road, especially for more complex setups. Misconfiguration (especially for analytics/identity merging) is a known churn risk.
- **Annual Plan/Sales-Assist**: When appropriate, get the customer on an annual plan or pass off to an AE (for more complex procurement process)

Tactically, the work consists of: 
- Audit the account based on data in Vitally and elsewhere (see below for more on [tooling](#tooling)) 
- Email owners/admins about any configuration issues affecting their bill or ability to use the product properly, and make ourselves available for a 30 mintue meeting.
  - Refund/adjust bills for misconfigurations, per our [policy](/handbook/growth/sales/refunds)
- Create a Slack Connect channel where spend is appropriate (on track to spend $20K/yr)
- Continue follow up (1-3 times depending on reception) throughout 3 billing periods, serve as point of contact as questions come up. Escalate anything we cannot answer directly  

The response rate for billing/cost-reduction initial messaging is typically very high (we don't have exact data yet, but ~75% at some point over the first three months).

### Tooling

The main tools for this team are:

- Vitally
  - `Onboarding Lead` segment
  - Account status is tracked using the `Onboarding Status` property, and serves as our hit list for which accounts we've talked to. Customers are marked as `Onboarded` if they have told us they are happy with PostHog and don't have any issues, or if they've paid three bills.
  - Segments `Paid one nonzero bill`, `Paid two nonzero bills`, and `Paid three nonzero bills` are set as respective bills are paid by [this](https://posthog.vitally-eu.io/settings/playbooks/f6f3c9e0-2dc5-4560-8653-63d143816293) playbook, so we can track this data elsewhere (eg in PostHog via DWH sync, though this hasn't run as a backfill/won't be up to date as of Q1 2025)
  - Onboarding Specialist role is set by region [here](https://posthog.vitally-eu.io/settings/playbooks/50120bc6-98ae-4fc2-af38-7374ba424474)
- Metabase [Customer Usage Dash (US/EU)](https://metabase.prod-us.posthog.dev/dashboard/139-customer-usage-breakdown?organization_id=&project_id=&lookback_days=30)







