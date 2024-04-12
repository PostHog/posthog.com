---
title: New sales
sidebar: Handbook
showTitle: true
---

This is our playbook for managing new sales. These are customers who have contacted sales proactively - we don't do outbound sales. Some large customers have a very prescriptive internal process that you will need to follow, but for the vast majority of our customers you will be the one driving process (and even for customers with a defined process, don't just sit back and be a passenger!).

## Sales process

This is an overview for what you should actually be doing with a customer at each stage of the sales process. For details on how to log this in HubSpot specifically, visit the relevant [HubSpot flow](/handbook/growth/sales/crm#inbound-hands-on-pipeline). 

**1. People contact us**

Most people fill in the [contact sales](/contact-sales) form via the website. Some email sales@posthog.com or raise a Zendesk ticket.

**2. We assign and qualify**

Cameron reviews these and decides whether to route to [self-serve](/handbook/growth/sales/crm#inbound-self-serve-pipeline), schedule a demo, or pass to Simon (if they seem Very Large).  This handoff is currently a gut feel based on company size/revenue as Very Large customers may technically be considered low ICP per our [scoring](/handbook/growth/sales/icp). 

**3. Initial demo**

Some general principles:
- Be genuinely helpful - our customers usually already have specific problems in mind, so help them solve those first rather 
- Get to the point - our ICP is technical and particularly sensitive to sales BS
- Don't [promise](/handbook/growth/sales/overview#enterprise-customers) things we can't/don't want to deliver
- Get into the actual demo as quickly as possible - you should spend most of your time here, not presenting PostHog's vision

We have a simple deck (seriously, it's like 5 slides) - ask someone on the Sales team for an invite to our Pitch account so you can create customized versions. 

You generally want to make sure you cover:

- Introduction, who is there, and what their roles are
- Why they are here
- Opportunity for them to ask up-front questions and get direct answers to them
- Demo product features according to what they need
- Consider complementary products, e.g. analytics + replay; analytics + warehouse; surveys + flags
- More Q&A
- Pricing - try and understand what their likely usage and spend is, as well as willingness to spend / commit to an annual plan
- Next steps - this is really important, don't just end the demo with no clear follow up action

At the end of the demo we might realise that they will be too small (<$20k) for us to go through our sales-led process, so you should route to self-serve. 

**4. Product evaluation**

If you think they are a good prospect for our sales-led process, your first priority is to try and get them into a shared Slack channel as quickly as possible. 

You should then follow up with a standard email/Slack message that:

- Summarizes what they’re after and how Posthog is a great/bad fit
- Lays out next steps on both sides
- Shares a proposed timetable for the evaluation and onboarding process
- Includes any useful lin=ks (e.g. Docs page, competitor comparisons, relevant case studies)

The AE acts as the support person during this period, usually answering questions in Slack. 

We usually set up the following trials depending on likely contract size:

- $20-60k - 2 weeks
- $60k+ - 1 month

Depending on the product they are most interested in, we usually set up the customer set up the following:

- Product/web analytics + session replay: get tracking set up, turn on replay, privacy controls, figure out user ID, get set up insights/dashboards.
- Feature flags + experiments: snippet, FF in the code, person ID and properties for targeting, deploy flag, run the experiment. 
- Surveys: deploy a survey
- Data warehouse: TBD

Set yourself a reminder for halfway through their evaluation period to look at their usage then put together a commercial proposal. 

**5. Security review**

Most customers don't need this beyond sharing our existing documentation. This step often occurs in parallel with product evaluation.  

If you need help with anything data privacy or [MSA-related](/handbook/growth/sales/contracts), ping Fraser for help. 

**6. Commercial evaluation**

The [Contracts](/handbook/growth/sales/contracts) page has full guidance on the nuts and bolts of how to put together a commercial proposal. 

By this point, you may have started running into some objections. These are the most common, and how to handle:

- Gap in the product - introduce the customer to the relevant product engineer to build together (but first agree with product team if it’s a reasonable ask). We have found this approach works exceptionally well for our newer products. 
- Pricing issue - understand their budget, just make sure that the deal overall isn't margin negative. You can also help them tune their usage to lower costs. We don't buy customers out of existing contracts. 
- Performance (e.g. slow dashboards) - for Extra Large, usually get Tim involved, or he can loop in the right engineer to help. 
- Confidence in PostHog - often [this Handbook page](/handbook/finance) is enough. For Very Large companies who need to be sold a bit more on the company vision, you can get James H involved.

**7. Closed - won**

Hooray! This is defined as when the contract is signed by _everyone_. 'They're about to sign' - NOT CLOSED. 'I've sent a DocuSign' - NOT CLOSED EITHER.  

Once the contract is signed, add it to the [signed contracts folder](https://drive.google.com/drive/folders/1ccWPIrY9dXwrzJwppFI2pm3kFIcOb8j8) and get them set up with [billing](/handbook/growth/sales/billing). 

Now it's time to set up an onboarding plan. We will templatize this, but for now you should send them something in the first week that includes:

- How to manage billing/credits
- Set up regular calls/checkins
  - $60k+ - every 1-2 weeks for the first 6 months, then every month
  - $20-60k - every month for the first 3 months, then quarterly
- Schedule training for the champion and/or additional people as needed - the more people you get successfully using PostHog, the more likely they are to retain

Here is minimum checklist of things that we find customers should know how to do:
- [Actions](/docs/data/actions)
- [Cohorts](/docs/data/cohorts)
- [Data taxonomy](/docs/data)
- [Notebooks](/docs/notebooks)
- Activity log
- Internal and test user filtering

Post-onboarding, you'll want to move the customer into our Expansion or Retention flow - this may take you a few months to determine:
- Expansion: multi-product potential, multi-team potential, _or_ same team and product but massively ramping usage next year
- Retention: everyone else, steady state only

**8. Closed - lost**

Oh no! It's ok - the most important thing here is that we learn. You should capture the reason in HubSpot - this could be:

- Product/feature gap:
  - Threshold-based alerting
  - Role-based access
  - Mobile session replay
  - Experimentation
  - Error monitoring
  - (Create a new category if something else comes up, don’t just have an ‘other’ bucket)
- Performance concerns
- Security/privacy concerns
- Pricing
- They chose to stick with current setup
- Champion left
- Business restructured/disappeared
- Don’t know (disappeared)

Add detailed comments as well, including what, if anything, we could have done differently (even if not realistic - e.g. build an entirely new product). 

For certain categories, you should create followup tasks:
- If they went with a competitor, create a reminder to check in with them in 9 months’ time. 
- If it was a feature gap, contact them when that thing is built using the sub-categories above. 
- If it was a security/privacy concern, contact them when we get the relevant certification etc. 
- If they chose to stick with current, check in again every 6 months. 

Share info about closed-lost people internally where it will help us learn - this may be with the sales team, relevant product team, or the company as a whole in Slack. The important thing is not to blame each other for losses, it's to find opportunities to do better next time!
