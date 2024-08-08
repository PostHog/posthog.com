---
title: New sales
sidebar: Handbook
showTitle: true
---

This is our playbook for managing new sales. These are customers who have contacted sales proactively - we don't do outbound sales. 

Three principles to bear in mind:

- Aim to **drive the sales process** as much as possible. Most of our customers in our core segment don't regularly buy software like PostHog, so you will need to guide them through the process - for fast growing startups, this may be their first time. Even for much larger customers, this still may be the case. Remember that we've sold software hundreds of times - it's ok to guide the customer here. Inbound leads =/= the customer wants to drive. 
- **Discovery is an ongoing process** - you want to be finding out useful information at each stage, not just going through a checklist at the beginning. Asking 'why' can be a really powerful tool, and you should be curious throughout, not just selling. 
- At the end of each conversation with a customer, you should aim to **be really specific and prescriptive about next steps**. If you haven't identified a next step, the opportunity is Closed - Lost. Waiting for a customer to come back to you is not a valid next step - instead you should be saying things like "at this point, usually the next best step is for us to do X".

## Sales process

This is an overview for what you should actually be doing with a customer at each stage of the sales process. For details on how to manage this in our CRM, visit our [Salesforce docs](/handbook/growth/sales/crm). The steps are:

1. People contact us
2. We assign and qualify
3. Initial demo
4. Product evaluation
5. Security & legal review (only if asked - skip otherwise)
6. Commercial evaluation
7. Closed - Won or Lost

### 1. People contact us

Most people fill in the [form](/talk-to-a-human) via the website. Some email sales@posthog.com or open a Zendesk ticket. 

### 2. We assign and qualify

Info on how leads are assigned can be [found here](https://posthog.com/handbook/growth/sales/crm#how-we-do-lead-assessment). Once you have been assigned a lead, you'll want to qualify them - don't just immediately go out and offer a demo every time. Things to consider:

- How closely do they match our [ICP](/handbook/who-we-are-building-for)?
- Which products are they looking to use? What's their use case?
- How large is their company? Revenue? Have they raised funding? (ie. will they pay >$20k for PostHog?)
- What is the role of the person who filled out the form?

Most companies add friction here by making customers jump on a call first to qualify them - we don't do this because it's annoying to the customer. However, it's totally fine to ask them questions over email in advance of the demo to make sure you're making the best use of their time - just be specific. A few clarifying questions is fine, a 30 question survey is not. 

If you're pretty sure that they should be qualified out, you should still be helpful over email - some customers just use the form to get in touch and don't want to actually have a demo (e.g. they have a billing question or are asking about compliance things like HIPAA.)

You can also redirect them to use the In-app support modal if they have a product-related question - this will then be routed to the right team, as well as showing them CTAs to upgrade for high priority support.

> **Examples of good discovery questions - this is not a script, just ideas!**
> - What is the problem? What is this problem affecting?
> - What metric is impacted as a result of this? What metric would be improved as a result of PostHog?
> - How important is this problem to the wider team?
> - What attempts have been made to fix this so far? Why has no attempt been made to fix this?
> - Why fix this now? Why fix this ahead of the other important things happening at your company?
> - Are you looking at {product} as a point solution that would slot into the rest of your stack, or are you looking to consolidate multiple tools and have a single source of truth?
> - What does the rest of your stack look like? What other tools or data would you want PostHog data to connect to?
> - Who owns that data stack? Do you have a data team or data engineers?
> - Who will be the consumers of PostHog data? How are they currently answering their questions, and how easy is it for them to do so with existing tooling?
> 
> (We will flesh this out into something more structured by product eventually.)

### 3. Initial demo

This is basically a combo of discovery and demo call - your objectives here are to:

- Show the customer PostHog and get them excited
- Find out as much as you reasonably can about them
- Have a solid plan for next steps in place

We have a simple deck (seriously, it's like 5 slides) - ask someone on the Sales team for an invite to our Pitch account so you can create customized versions with your name etc. 

You should give a relevant and pointed demo - don't just throw everything in, as the customer will get overwhelmed. If you don't show what's important first, typically more senior people on the call will become distracted.

For example, a customer may say "we need to see how our customers our using our platform". In this case, a good approach is to go straight to Session Replay, then tie Replay into Analytics, then go from there.

> Start with what their biggest problem/request is, stay there until they are happy, then move on to point two. We don't want to fall into the trap of doing the same demo for each customer regardless of what they say at the beginning.

Make sure you cover:

- Who is there and what their roles are - in particular, are they the decision-makers at their company?
- Why do they _need_ PostHog?
- Opportunity for them to ask up-front questions and get direct answers to them
- Demo specific product features according to what they have asked for - _this is really important, don't just chat about PostHog's vision or give a high level product overview_
  - Consider complementary products, e.g. analytics + replay; analytics + warehouse; surveys + flags
  - Don't [promise](/handbook/growth/sales/overview#enterprise-customers) things we can't/don't want to deliver
- Budget - try and understand what their likely usage and spend is, as well as willingness to spend / commit to an annual plan
- Timeline - how fast do they want to move? What does their decision-making process look like?
- Next steps - this is really important, don't just end the demo with no clear follow up action

If you realize that they will be too small (<$20k) to go through our sales-led process, you should route to [self-serve](/handbook/growth/sales/crm#self-serve-opportunity-record-type). 

### 4. Product evaluation

If you think they are a good prospect for our sales-led process, your first priority is to try and get them into a shared Slack channel as quickly as possible. If you close them, this will also be their primary channel for support. Add the Pylon app to the channel and it will automate the support bot and channel description. React with a 🎫 to customer messages or tag `@support` to create a ticket in a thread.

Some customers may wish to use MS Teams rather than Slack - we can sync our Slack with Teams via Pylon to do this. First you will need an MS Teams licence - ask Simon for one. Then, [follow the instructions here](https://docs.usepylon.com/bridges/microsoft-teams/setup) to get set up. Before adding the customer into the channel, remember to test it on both sides to ensure the integration is working correctly.

You should then follow up with a standard email/Slack message that:

- Summarizes what they’re after and how Posthog is a great/bad fit
- Lays out next steps on both sides
- Shares a proposed timetable for the evaluation and onboarding process
- Includes any useful links (e.g. Docs page, competitor comparisons, relevant case studies)

Probably as a separate message, you should set out the criteria for the product evaluation to be considered a success. These should be specific and product-dependant - the evaluation will almost certainly fail if you just leave the customer to noodle around trying PostHog:

- Product/web analytics + session replay: get tracking set up, turn on replay, privacy controls, figure out user ID, get set up insights/dashboards.
- Feature flags + experiments: snippet, FF in the code, person ID and properties for targeting, deploy flag, run the experiment. 
- Surveys: deploy a survey, view and analyze the results
- Data warehouse: set up the warehouse, sync at least 1 data source or pull additional person data in to enrich an insight

The AE acts as the support person during this period, usually answering questions in Slack. 

We usually set up the following trials depending on likely contract size:

- $20-60k - 2 weeks
- $60k+ - 4 weeks

Set yourself a reminder for halfway through their evaluation period to look at their usage then put together a commercial proposal. At the end of the product evaluation, you should have a followup call with the customer to talk through the success criteria you outlined at the beginning, to show how you have (hopefully) successful hit them and are ready to move to the next stage!

### 5. Security & legal review

Most customers don't need this beyond sharing our existing documentation. This step often occurs in parallel with product evaluation. Usually only bigger companies ask for this. 

> You do not need an NDA to share PostHog internal policies - by default most of these should be publicly available in the [Handbook](/handbook/company/security) anyway, though some are only stored in Drata.  

If the customer requires a vendor questionnaire or security questionnaire then it's best for the AE involved to try and fill it out. If a company reaches out initially with this request, it's often best to try and understand if the customer has an intention to pay or at least grow into a paying customer before investing a lot of time filling it out. If there are any questions that are unclear post the specific question in #team-people-and-ops channel.

If you need help with anything data privacy or [MSA-related](/handbook/growth/sales/contracts), ping Fraser for help. 

### 6. Commercial evaluation

The [Contracts](/handbook/growth/sales/contracts) page has full guidance on the nuts and bolts of how to put together a commercial proposal - we use PandaDoc. 

Don't be the AE who gets to this point and suddenly realizes you have no idea who the buyer is! You should already know this, their budget, their purchasing process etc. already as part of your discovery - if you're finding out now, hopefully it's not too late...

By this point, you may have started running into some objections. These are the most common, and how to handle:

- Gap in the product - introduce the customer to the relevant product engineer to build together (but first agree with product team if it’s a reasonable ask). We have found this approach works exceptionally well for our newer products. 
- Pricing issue - understand their budget, just make sure that the deal overall isn't margin negative. You can also help them tune their usage to lower costs. We don't buy customers out of existing contracts, and we don't do deals where year 1 is super cheap then we ratchet up the price in year 2. 
- Performance (e.g. slow dashboards) - for Extra Large, usually get Tim involved, or he can loop in the right engineer to help. 
- Confidence in PostHog - often [this Handbook page](/handbook/finance) is enough. For Very Large companies who need to be sold a bit more on the company vision, you can get James H involved.

### 7. Closed - won

Hooray! This is defined as when the contract is signed by _everyone_. 'They're about to sign' - NOT CLOSED. 'I've sent a DocuSign' - NOT CLOSED EITHER.  

Once the contract is signed, it lives in PandaDoc. Next step - get them set up with [billing](/handbook/growth/sales/billing). 

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

Post-onboarding, you'll want to move the customer into our Expansion or Retention flow - this may take you a few months to determine, so by default everyone should go into Expansion unless you have obvious reasons not to:
- Expansion: multi-product potential, multi-team potential, _or_ same team and product but massively ramping usage next year
- Retention: everyone else, steady state only

### 7. Closed - lost

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
