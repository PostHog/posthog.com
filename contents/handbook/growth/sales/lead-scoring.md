---
title: Lead routing & scoring
sidebar: Handbook
showTitle: true
---

## Lead routing

Leads are lead tasks in Salesforce. The <PrivateLink url="https://github.com/PostHog/lead-gateway">lead gateway</PrivateLink> creates them from the sources below, and they go to two teams:

- **New business (TAEs)** work everyone who asks to talk to us, and product-led leads.
- **BDRs** work outbound leads: job switchers, recently funded companies, and lookalikes of our best customers.

TAMs take no lead tasks from triggers in Q4 2026, and CSMs have no triggers of their own. Both grow the accounts already in their book, and they still get a task when a customer they own gets in touch or is referred.

> We frequently tweak these rules and experiment with different signals to see which work best. Generally you should be aiming for a 20% conversion rate from these types of leads.

### Who gets the task

- **The account has an owner:** a lead from someone who gets in touch (contact form, sales@, or a referral) goes to that owner, unless the owner is a BDR. Product-led and outbound triggers look for accounts nobody manages yet, so they skip an account that has a TAM or CSM, and most also skip an account that has an AE.
- **The account has no owner:** the task goes to the team's round robin for the territory, following the [task assignment logic](/handbook/growth/sales/crm#task-assignment-logic).
- **Enterprise:** in the TAE round robin, North American companies with more than 1,500 employees go to our dedicated Enterprise TAE.
- **Work already in progress:** we don't create a new task while the account has an open lead task or opportunity that a seller touched in the last 30 days, unless the lead booked a meeting. A BDR's outbound task only holds back other BDR leads.

### New business (TAEs)

People who ask to talk to us:

1. Completed the [contact sales form](/talk-to-a-human)
2. Emailed sales@
3. Referred by a teammate, such as an [onboarding specialist referral](/handbook/onboarding/sales-handover)

Product-led leads:

1. **Big fish:** first signup from a company with 500+ employees who have ingested at least 1 event and invited at least 1 person, with no payment method yet
2. **Forecasted spend spike:** customers who paid $1,000+ last month and whose forecast for this month is at least double that, with 5+ paid invoices
3. **Rising unowned account:** customers with $1,200+ of monthly spend (billed or forecasted), paid usage at twice its normal week for two weeks in a row, and a venture profile (a YC company, $5M+ raised, a round in the last six months, or 50+ employees with a high ICP score)
4. **Startup rolloff:** startup plan customers (not YC) with credits left who use $1,500+ a month and whose plan ends within 60 days, or who use $5,000+ a month and have under $5,000 of credits left
5. **Startup credit depletion:** startup or YC plan customers who use $5,000+ a month and whose credits will run out within 120 days, before they expire or renew
6. **YC deal exit:** YC companies that will not get the next YC credit grant (goes to the account's owner when it has one)

The spend triggers skip a company on startup or YC credits until the credits stop covering its bills. Startup rolloff and startup credit depletion cover those companies.

TAEs also work <PrivateLink url="https://posthog.slack.com/docs/TSS5W8YQZ/F0A9W1BVCKE">AE named lists</PrivateLink>.

### BDRs

Lead tasks:

1. **Job switchers:** people who used PostHog at a previous company and moved to a new one, from the [job switchers list in Clay](/handbook/growth/sales/outbound-sales)
2. **Recent fundraising:** paying customers at $416 MRR or less whose latest round was over $7M and closed in the last 90 days
3. **Funded and ramping:** customers under $1,667 MRR who raised $20M+ in the last year, have 10+ engaged users, and doubled their usage in three months
4. **Growth-fit lookalikes:** active accounts flagged as lookalikes of our best customers, under $416 MRR, with a growing forecast
5. **Revenue-fit lookalikes:** active lookalike accounts at $416–1,667 MRR

Campaigns are all <PrivateLink url="https://app.lemlist.com/teams/tea_kvdy3nLu9KEA4QPiD/campaigns-next">tracked in Lemlist</PrivateLink> - these change week-to-week.

Team focus, beyond the lead tasks above:

1. Engineering Managers (VPs, Directors, Heads of) who follow us on LinkedIn but are not (yet!) customers
2. Competitor takeouts

Backlog:

1. Filled contact sales but then went silent, never talked to an AE (next: AE Campaign to warm back up)
2. Future Event attendees
3. Closed lost opportunities (new biz _and_ renewals) 5+ months old where reason was 'unresponsive'
4. Tried PostHog but did not convert - signed up but went inactive, never paid, never talked to an AE in DW (next: more filtering on this list)

Automated (Abhischek):

1. Requests for Trust Center access that require an NDA
2. Paused - <PrivateLink url="https://app.clay.com/workspaces/268768/workbooks/wb_0t9mfmifwKAqEGkwFC8/tables/t_0ta1652W6yS8tnSyUQF/views/gv_0ta1652BJM69kS4G3P2">Warmbound</PrivateLink> - $100-499 MRR at some point in the account's history (need to filter more)

### TAMs and CSMs

TAMs take no lead tasks from triggers in Q4 2026, because TAM quota only counts the accounts in their book. The triggers that used to go to TAMs changed:

- **Forecasted spend spike** now goes to TAEs.
- **Scale plan activation** and the **$500–1,667 MRR** trigger are switched off.

When an account has a CSM:

- A referral goes to the CSM, not to a TAE.
- We don't create product-led or outbound leads.

Sales opportunities that come up in support tickets follow [leads from support tickets](/handbook/growth/sales/crm#leads-from-support-tickets).

### Flag an account yourself

Anyone at PostHog can manually flag an account as a high potential lead. This includes new or low spend accounts with strong net new potential or existing paying customers with credible expansion potential. To create a lead, add the `ae referral` tag to the account in Customer Analytics. A lead task appears within a few minutes. [Sales handover](/handbook/onboarding/sales-handover#lead-creation) explains when a referral makes sense. You can also [forward an email thread to sales@](/handbook/growth/sales/crm#forwarding-sales-opportunities).

### Demo booking

Customers that want to book a demo and show strong ICP fit signals automatically get shown a booking link for a demo with a TAE. Those <20 are for the TAE to manually review and schedule. [Default](https://www.default.com/) is our contact form submission routing system for managing this.

- We have an AI qualifier step to classify submissions as sales/support/spam. If 'support' or 'spam', it'll skip round robin - 'support' will auto create support tickets, 'spam' are dropped.
- Accounts also have to match 2/3 requirements for revenue, title, and/or industry to see the instant scheduler.
- If an account has had a lead disqualified within the last month, we no longer show the scheduler.

## Lead scoring

The lead gateway scores every lead and writes the score and its tier to the lead task, to help you prioritize your queue. The score has three parts:

- **Fit (45%):** who the company is
- **Intent (35%):** what the organization does and pays for in PostHog, and whether the lead asked to talk to sales
- **Contact (20%):** who the person is

The tiers are T1 (75+), T2 (55–74), T3 (30–54), and T4 (under 30). The score doesn't decide which product-led leads you get: those triggers fire on the criteria above.

The Salesforce [ICP fit score](/handbook/growth/revops/icp-fit-score) is a separate score for the company alone, and some triggers still read it.
