---
title: Sales handover
sidebar: Handbook
showTitle: true
---
### Initial qualification

#### Direct handover - skipping onboarding

If you see that a customer is spending **more than $1,000 monthly**, evaluate whether their usage looks stable and legitimate, and make sure that MRR doesn't come from an unwanted event spike or misconfiguration issue.

If that's the case, you can pass the account to Sales even **without speaking with the customer first**, as long as you’ve confirmed that the high spend is intentional. The goal is to react quickly to healthy, high-spend accounts—but avoid passing through problematic ones.

Before you hand off, also consider month-over-month growth. A flat $1.2k account is a very different lead from a $1k account that doubled organically last month. Growth rate matters to the Sales person deciding whether to prioritise the lead, so call it out. Here is a [useful doc](/handbook/growth/sales/evaluating-growth-potential) on evaluating growth potential.

Be courteous and **leave a note in Customer Analytics** with context on the account before handing off. Include what you spotted in Metabase, any relevant billing patterns, and your read on why the spend is legitimate. The Sales person receiving the lead should be able to pick it up without having to dig.

#### Handover during onboarding - engaged customers

While talking with customers or analyzing the account, do some discovery to understand the reason behind their high spend and assess whether there's potential for stable spend or usage moving forward. If they’re happy continuing with PostHog, you can mention our discounted pre-paid plan, which helps them save ~20%. However, if they prefer paying monthly, they are more than welcome to do so!

We typically hand the account over to Sales when a customer is interested in the annual plan, requires additional contractual or legal support, or we notice potential ourselves.

**Make sure to include in Customer Analytics our point of contact**, i.e., the person you've been in touch with, while handing over the account to Sales.

#### Unresponsive customers during onboarding

Historically, there's still a good chance that they'll talk with Sales after passing them on! AEs have been successful in reaching out and securing long-term commitments. **You don't have to wait for the customer to complete the onboarding program - you can pass them earlier on, if they didn't respond to our initial message**, and if you see that the account matches criteria and the handover makes sense. 

If there are any pending config issues that you raised before but the customer didn't respond to, just provide relevant context to the fellow AE/TAM in Customer Analytics - sometimes it might be a good conversation starter!

### Lead creation
If you come across an account with growth potential or stable high-level spend (especially if that high spend has occurred over the past two - three months and there are no pending issues to resolve), that might benefit from an annual plan or general sales engagement, you can add the `AE/TAM Referral` tag to the account in Customer Analytics. Within a few minutes, this will automatically create a Salesforce lead and assign it using round-robin logic.

After a few minutes, your lead will appear in the `#sales-leads` Slack channel, tagged as "AE/TAM Referral". As a good practice, leave a note in Customer Analytics for the Account Executive with some relevant context on the customer. You can also ping an assigned AE on Slack, if any further follow up is needed.

The automation flips the Customer Analytics Onboarding pipeline property to `Sales Handoff` so that we have not only data on the leads passed, but also a visual indication.

### Proactively looking out for opportunities
- If you see an account with a promising, positive growth trajectory, but they may achieve the $ threshold after finishing the onboarding program, **set a task in Customer Analytics assigned to yourself** in order to circle back after some time and see if they're eligible for being passed on to Sales.
- If you reach out to a high spender (+$1000), add a Customer Analytics task to see if the first bill came through. If it did, we could pass them on to Sales faster, without having to circle back to the account before the second bill comes up. We currently have a [playbook](https://us.posthog.com/project/2/workflows/01a11165-4311-0000-eec5-642052e6944c/workflow) running that automates task creation. 

### Confusion about previous Sales engagement

Some pointers on what to pay attention to in Customer Analytics while checking for prior Sales engagement:

- Check the "Sales info" widget in the Onboarding dashboard view. It should indicate engagement or lack of engagement.
- Tags (e.g. TAM/CSM Candidate, $20k MRR, Active Trial, Active Self-serve Trial, Annual Plan, etc.)
- Slack channel (following the naming convention `#posthog-[company name]`)
- Check out the Relationships tab to double-check potential account ownership
- Trial Status widget in the Onboarding dashboard
- Active Conversations and Meetings (any trace of a booked call or an ongoing conversation)
- Notes

If Sales are already engaged, there's no need to create an `AE/TAM Referral`. 

If the account has engaged with the Sales team at some point and it's unclear where the conversation stands, ping your fellow AE to make sure you’re not overlapping efforts. 

If it’s clear there’s a duplication issue and we shouldn’t be involved, ping Mine to double-check the logic.

### What to do when Sales is involved?

If an account has the `Onboarding Lead` tag, but there are recent Active Conversations in Customer Analytics from a TAE/TAM (or scheduled meetings), and TAE/TAM confirms they are already actively engaged with the account, add a Customer Analytics note saying: “Removing Onboarding Lead tag — Sales already engaged.” Then remove the tag from the account and delete both the pipeline property and the timestamp.
