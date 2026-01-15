---
title: Sales handover
sidebar: Handbook
showTitle: true
---
### Initial qualification

#### Direct handover - skipping onboarding

If you see that a customer is spending **more than $1,000 monthly**, evaluate whether their usage looks stable and legitimate, and make sure that MRR doesn't come from an unwanted event spike or misconfiguration issue.

If that's the case, you can pass the account to Sales even **without speaking with the customer first**, as long as you’ve confirmed that the high spend is intentional. The goal is to react quickly to healthy, high-spend accounts—but avoid passing through problematic ones.

Be courteous and always provide context on the account (e.g., what you've noticed in Metabase, etc.) to the Sales person assigned to your lead.

#### Handover during onboarding

While talking with customers or analyzing the account, do some discovery to understand the reason behind their high spend and assess whether there's potential for stable spend or usage moving forward. If they’re happy continuing with PostHog, you can mention our discounted pre-paid plan, which helps them save ~20%. However, if they prefer paying monthly, they are more than welcome to do so!

We typically hand the account over to Sales when a customer is interested in the annual plan, requires additional contractual or legal support, or we notice potential ourselves.

Make sure to mention our point of contact, i.e., the person you've been in touch with, while handing over the account to Sales.

#### Unresponsive customers during onboarding

Historically, there's still a good chance that they'll talk with Sales after passing them on! AEs have been successful in reaching out and securing long-term commitments. **You don't have to wait for the customer to complete the onboarding program** - you can pass them earlier on, if you see that it makes sense. If there are any pending config issues that you raised before but the customer didn't respond to, just provide relevant context to the fellow AE/TAM - sometimes it might be a good conversation starter!

### Lead creation
If you come across an account with growth potential or stable high-level spend (especially if that high spend has occurred over the past two - three months and there are no pending issues to resolve), that might benefit from an annual plan or general sales engagement, you can add them to the `Onboarding referral` segment in Vitally. Within a few minutes, this will automatically create a Salesforce lead and assign it using round-robin logic.

After a few minutes, your lead will appear in the `#sales-leads` Slack channel, tagged as "Onboarding referral". As a good practice, leave a note in Vitally for the Account Executive with some relevant context on the customer. You can also ping an assigned AE on Slack.

### Looking out for opportunities
If you see an account with a promising, positive growth trajectory, but they may achieve the $ threshold after finishing the onboarding program, **set a task in Vitally assigned to yourself** in order to circle back after some time and see if they're eligible for being passed on to Sales.

### Confusion about previous Sales engagement

Some pointers on what to pay attention to in Vitally while checking for prior Sales engagement:

- Segments (e.g. TAM/CSM Candidate, $20k MRR, Active Trial, Active Self-serve Trial, Annual Plan, etc.)
- Slack channel (following the naming convention `#posthog-[company name]`)
- Key Roles (is someone assigned to the account?)
- Trial Status widget in the Onboarding dashboard
- Active Conversations and Meetings (any trace of a booked call or an ongoing conversation)
- Notes

If the account has engaged with the Sales team at some point and it's unclear where the conversation stands, ping your fellow AE to make sure you’re not overlapping efforts. 

If it’s clear there’s a duplication issue and we shouldn’t be involved, ping Mine to double-check the logic.
