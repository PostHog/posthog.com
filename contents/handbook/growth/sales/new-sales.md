---
title: Inbound sales
sidebar: Handbook
showTitle: true
---

This is our playbook for managing inbound sales, ie. customers who have contacted the sales team directly. 

We [build PostHog for product engineers](/handbook/who-we-are-building-for). While many non-technical folks use PostHog successfully every day, our inbound sales process is built with technical folks in mind. Once implemented, a customer may use PostHog for all manner of things (and we hope they do!).

Three other general principles to bear in mind:

- Aim to **drive the sales process** as much as possible. Most of our customers in our core segment don't regularly buy software like PostHog, so you will need to guide them through the process - for fast growing startups, this may be their first time. Even for much larger customers, this still may be the case. Remember that we've sold software hundreds of times - it's ok to guide the customer here. Inbound leads =/= the customer wants to drive.
- **Discovery is an ongoing process** - you want to be finding out useful information at each stage, not just going through a checklist at the beginning. Asking 'why' can be a really powerful tool, and you should be curious throughout, not just selling.
- At the end of each conversation with a customer, you should aim to **be really specific and prescriptive about next steps**. If you haven't identified a next step, the opportunity is Closed - Lost. Waiting for a customer to come back to you is not a valid next step - instead you should be saying things like "at this point, usually the next best step is for us to do X".

## Maximizing your chance of success

Selling software, especially to larger companies, can be a complex process with lots of stakeholders involved.  When moving your deal along you should aim to know as much about the following as possible given where you are in the process (inspired by [MEDDPICC](https://www.scratchpad.com/blog/meddpicc)):

* Pain - Do they have a problem?  
  * Is it painful enough right now that they are willing to adopt a new solution to solve it?  
  * Will PostHog solve this problem for them?
* Timeline - When do whey want to have a contract signed/solution in place?
* Pricing - We should know the rough size of the opportunity, and that that is in line with expectations and budget of the customer.
* Champion - Are you working with a champion who is going to sell internally?
  * Are they the buyer (see below) or do they know who the buyer is?
* Decision - How are they evaluating us?  
  * Is it competitive?  Who?  
  * What is their criteria for success?
* Economic Buyer - Sometimes your Champion has to convince upper management to spend money.
  * Is that person aware of PostHog and on board with signing a contract if an evaluation is successful?
* Paper process - After a successful evaluation what happens next?  
  * Do they need a Custom DPA/BAA/MSA?  
  * Is there a security review needed?  
  * Who signs the Order Form?

These are presented in the most likely order that you will be able to discover them, although that is not a hard and fast rule.

They are also available as Opportunity fields in Salesforce and as such you should keep them up to date when you learn more.

> Always follow the [lead to opportunity conversion guidelines](/handbook/growth/sales/crm#lead-to-opportunity-conversion-guidelines) when creating opportunities in Salesforce

## Sales process

This is an overview for what you should actually be doing with a customer at each stage of the sales process. For details on how to manage this in our CRM, visit our [Salesforce docs](/handbook/growth/sales/crm). The steps are:

1. People contact us
2. We assign and qualify
3. First call (30 minutes) - Discovery & initial demo
4. Second call (60 minutes) - Technical deep dive (if needed)
5. Product evaluation
6. Security & legal review (only if asked - skip otherwise)
7. Commercial evaluation
8. Closed - Won or Lost

### 1. People contact us

Most people fill in the [form](/talk-to-a-human) via the website. Some email sales@posthog.com or open a Zendesk ticket.

### 2. We assign and qualify

Info on how leads are assigned can be [found here](/handbook/growth/sales/crm#how-we-do-lead-assignments). Once you have been assigned a lead, you'll want to qualify them before scheduling a call. Things to consider:

- What is their [Lead Score](/handbook/growth/sales/lead-scoring)?
- Which products are they looking to use? What's their use case?
- How large is their company? Revenue? Have they raised funding? (ie. will they pay >$20k for PostHog?)
- What is the role of the person who filled out the form?
- Are engineers already involved in the sales process, or will they need to be brought in?

Most companies add friction here by making customers jump on a call first to qualify them. We don't do this when we are confident that product engineers are, or will become, involved in the sale. We may ask for a 2nd call with the engineers involved if we're confident that PostHog can help and want to make sure they agree. 

It's also totally fine to ask a customer questions over email in advance of the demo to make sure you're making the best use of their time - just be specific. A few clarifying questions is fine, a 30 question survey is not.

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

If you're pretty sure that they should be qualified out of our sales process, you should still be helpful over email - some customers just use the form to get in touch and don't want to actually have a demo (e.g. they have a billing question or are asking about compliance things like HIPAA.)

#### Requests for Proposals (RFPs)

There are two types of RFPs:

- We have context on what they're trying to accomplish and where we have qualified their specific needs ahead of time. These are *solicited* RFPs, and we generally reply to these.
- We just get an RFP randomly without any context. These are *unsolicited* RFPs, and we generally don't reply to these.

If it's an unsolicited RFP where we haven't had any prior contact or usage from the company then it is **highly likely** that you will burn a lot of time for nothing and you are free to decline.  If you find the unsolicited RFP otherwise compelling and want to proceed, the suggested approach here is to see if anyone from the company has recently signed up to PostHog. If so, then make contact with them to see if they are aware of the RFP and can provide more information on PostHog's inclusion.

If you can't identify anyone who has recently signed up to PostHog, then ask the person who sent you the RFP for a call to gather more context before making a decision on whether to fill it in.  If they aren't willing to get on a call then it's likely that we are not their vendor of choice, and they are using us to make up the numbers in a tender process.  As such, we shouldn't spend time on this kind of activity. If you choose to spend time with these, timebox your effort to ensure you are not devoting a week to a 500 question RFP where we have very slim chances of success. Your time is your most valuable asset.

If it's a solicited RFP, you're free to proceed so long as the opportunity is qualified as a whole and you carefully balance the level of effort required in the RFP against the opportunity for you & PostHog. Again, a 500 question RFP may not be worth it if they plan on spending <$20k for PostHog (a 50 question RFP may not even be worth it in this instance)! Use your best judgement, and it is generally still wise to timebox your effort.

#### Startups

If they're eligible for the [Startup Plan](/startups), route them to the application form and disqualify them as it's not an immediate opportunity (but we sincerely hope they grow into loyal PostHog customers). If their usage will burn through their credits quickly, you should feel free to switch their lead status to `Nurture` and keep close tabs on them. Per our [usual approach to sales](/handbook/growth/sales/overview), we want to make sure they're successful in this "high-use" scenario and are building with us for the long-term.

You can also redirect them to use the In-app support modal if they have a product-related question - this will then be routed to the right team, as well as showing them CTAs to upgrade for high priority support.

#### Leads below the sales assist threshold (less than $20K ARR)

We often get requests for demos from leads or existing customers who are below our sales assist threshold, and who don't have a defined use case for PostHog. It usually comes in the form of "show me all the features" or "I need someone to demo to me." These can be large time sinks because they are non-technical, don't have a clear idea of what they want, and are unlikely to ever grow into a sales-assist level customer.

*We also want to be helpful to our current or potential customers, regardless of spend.* Time permitting, we can offer a demo if they are willing to give us the information we need to put something together:

- What tech stack are you on?
- What features / products are you interested in?
- What questions do you have?

This makes the demo actually valuable and can be an opportunity for you to learn more and get some demo practice. You'll also find that 90% of these requesters never respond because they are either unable or unwilling to engage with the questions, which allows you to avoid the biggest time sinks.

If you realize that they will be too small (<$20k) to go through our sales-led process and you are unable to get this information from them, you should route to [self-serve](/handbook/growth/sales/crm#self-serve-opportunity-record-type).


### 3. First call (30 minutes) - Discovery & initial demo

Your goals on this call depend on who shows up. You should know who's coming ahead of time and be prepared to change your approach based on the actual attendees.

The ideal outcome is getting engineers to be hands-on with PostHog as quickly as possible.

#### **Path A: Engineers are present on the first call**

When you have engineers on the call from a qualified company (ICP fit or otherwise highly qualified), your goal is to get them using PostHog immediately.

**Structure:**
1. **Intro & Qualification** (5-10 min)
   - Friendly banter 
   - Focused discovery on their use case
   - Articulate PostHog's vision and how it relates to their needs
   - Show PostHog in a technical demo as soon as possible

2. **Technical Demo** (15 min)
   - Highly tailored to their use case
   - Light on pitching, heavy on showing docs and GitHub
   - Use our [Demo Project](https://eu.posthog.com/project/30021/) linked to [Hogflix](https://hogflix.dev/)
   - Start with their biggest problem first, stay there until they're happy

3. **Call Close** (5-10 min)
   - **Part 1:** Confirm they agree PostHog solves their problem; scope what success looks like for their trial; answer questions, particularly around pricing: Secure [BANT](/handbook/growth/sales/new-sales#BANT)
   - **Part 2:** Ask for trial signup or PostHog org conversion; confirm next steps on the call; ensure that any "give" by PostHog receives a "get" from the customer (typically feedback on the trial at this phase)
   - Answer questions and objections

**Success looks like:**
- They commit to using PostHog in a reasonable timeframe
- You have a plan to get their feedback on the product as soon as they use it

#### **Path B: No/minimal engineers present (non-technical stakeholders)**

When engineers aren't on the call, your goal is to earn a second call with their engineering team, while also being helpful to the non-technical stakeholders in discussing PostHog.

**Structure:**
1. **Intro** (5 min)
   - Friendly banter
   - Get [BANT](/handbook/growth/sales/new-sales#BANT) info upfront (Budget, Authority, Need, Timeline)
   - Articulate PostHog's vision
   - Scope their use case

2. **Qualify or Disqualify** (10 min) - we do this politely and constructively. The customer's time is valuable and we know best who succeeds with PostHog, so we're driving the sale.
   - **Qualify if:** They have technical capability to succeed, engineers will be involved in the sales process, and there's product/solution fit
   - **Disqualify if:** They're non-technical with no engineer involvement, or there's no product/solution fit

3. **Demo** (10 min)
   - **If qualifying:** Show enough to validate required functionality and earn the next call with engineers
   - **If disqualifying:** Show what's needed to validate the lack of fit

4. **Call Close** (5 min)
   - **If qualifying:** Schedule the next call, ensure engineer attendance, set initial scope for technical demo
   - **If disqualifying:** Direct them to better resources, politely thank them for their time, ask them to reach back out when engineers are involved

**Success looks like:**
- **If qualifying:** You have a call with their engineers on the calendar (Step 5 below) and they understand why it will be helpful
- **If disqualifying:** They understand why PostHog isn't a fit right now and appreciate your helpful transparency

> **Important:** If you can't get a second call scheduled, be skeptical of the opportunity. Keep the task in nurture status until it's on the calendar - only convert to an opportunity after the call is confirmed.

#### General demo tips

We have various slide templates - ask someone on the Sales team for an invite to our Pitch account. Use the deck as scaffolding, pulling out relevant slides. Do not spend the demo presenting a deck with an engineering team - most people at PostHog spend 90% of the demo call actually in product or talking to the customer about their needs. But sometimes, there is a legitimate need for a deck.

Before you demo, make sure there is enough data to properly showcase our features. If needed, you can use [Hogbot](https://github.com/PostHog/hogbot) to generate more synthetic data. This is built by the sales team for the sales team, so if you see anything you want to improve, don't hesitate to submit a PR!

You should give a relevant and pointed demo - don't just throw everything in, as the customer will get overwhelmed. If you don't show what's important first, people on the call will become distracted.

For example, a customer may say "we need to see how our customers our using our platform". In this case, a good approach is to go straight to Session Replay, then tie Replay into Analytics, then go from there.

> Start with what their biggest problem/request is, stay there until they are happy, then move on to point two. We don't want to fall into the trap of doing the same demo for each customer regardless of what they say at the beginning.

Make sure you cover:

- Who is there and what their roles are - in particular, are they the decision-makers?
- Why do they _need_ PostHog?
- Demo specific product features according to what they asked for
  - Consider complementary products, e.g. analytics + replay; analytics + warehouse; surveys + flags
  - Don't [promise](/handbook/growth/sales/overview#enterprise-customers) things we can't/don't want to deliver
- How pricing works with an indication of their potential spend if you have enough information
- Next steps - this is really important, don't just end the demo with no clear follow-up action

### 4. Second call - Path B (60 minutes) - Technical deep dive

This call happens when engineers weren't on the first call. Your goal is to qualify the opportunity through the engineers and get them hands-on with PostHog.

**Structure:**

1. **Intro** (5 min)
   - Friendly banter
   - Confirm everyone's roles and responsibilities
   - Set context from the previous call
   - Reiterate PostHog's vision

2. **Discovery** (15 min)
   - Confirm use case(s) relative to the engineer's understanding
   - Dig into the engineer's role in shipping and their workflow
   - Confirm [BANT](/handbook/growth/sales/new-sales#BANT), particularly timeline as it relates to the PostHog implementation
   - Understand their technical stack and how PostHog fits in

3. **Technical Demo** (30 min)
   - Given the likely mixed audience, you can take a broader view of PostHog and how it supports technical and non-technical users alike.
   - Even so, cater to the engineer's role in the project and the power of PostHog for product/engineering teams
   - Show relevant documentation and GitHub integrations
   - Check for engagement from the buyer persona - note any disengagement
   - Start with what their biggest problem is, stay there until they're happy, then move on

4. **Call Close** (10 min)
   - Ask for trial signup or PostHog org conversion - be specific in asking for clarity here.
   - Ensure that any "give" by PostHog receives a "get" from the customer 
   - Answer questions and objections as they arise, particularly around pricing.
   - Be specific about next steps

**Success looks like:**
- You've met the engineers and understand their role
- You've qualified the customer's use case and involvement in the project
- You know when the engineers hands will be on keyboards trying PostHog
- You know how/when the opportunity will convert

#### BANT

By the end of either the 1st or 2nd call with a customer, you should have a defined idea about:
1. **Budget** - Calculate and share a rough ballpark figure based on which products they'll use and their expected usage. Articulate the process by which a sales-led trial will help them refine the estimate. 
2. **Need** - Is PostHog a good fit? Be politely honest if we're not, to avoid wasting everyone's time.
3. **Authority** - Who will make the decision at the customer organization? Who holds the budget? 
4. **Timeline** - When does the trial start? When are they looking to make a decision/have a contract in place?

### 5. Product evaluation

Once qualified, and if you think they are a good prospect for our sales-led process, your first priority is to try and get them into trial of PostHog with [a shared Slack channel](/handbook/growth/sales/slack-channels) as quickly as possible. If you close them, a shared Slack channel will also be their primary channel for support. Add the Pylon app to the channel and it will automate the support bot and channel description. React with a 🎫 to customer messages or tag `@support` to create a ticket in a thread. 

Some customers may wish to use MS Teams rather than Slack - we can sync our Slack with Teams via Pylon to do this. First you will need an MS Teams licence - ask Simon for one. Then, set up [a Slack channel](/handbook/growth/sales/slack-channels). Then, [follow the instructions here](https://docs.usepylon.com/pylon-docs/integrations/chat/microsoft-teams) to get set up. Before adding the customer into the channel, remember to test it on both sides to ensure the integration is working correctly.

You should then follow up with a standard email/Slack message that:

- Summarizes what they’re after and how Posthog is a great/bad fit
- Lays out next steps on both sides
- Shares a proposed timetable for the evaluation and onboarding process
- Includes any useful links (e.g. Docs page, competitor comparisons, relevant case studies)

Probably as a separate message, you should set out the criteria for the product evaluation to be considered a success - the evaluation will almost certainly fail if you just leave the customer to noodle around trying PostHog.

If the customer isn't super clear on how to articulate the success criteria then use the following as inspiration:

- Product/web analytics + session replay: get tracking set up, turn on replay, privacy controls, figure out user ID, get set up insights/dashboards.
- Feature flags + experiments: snippet, FF in the code, person ID and properties for targeting, deploy flag, run the experiment.
- Surveys: deploy a survey, view and analyze the results
- Data warehouse: set up the warehouse, sync at least 1 data source or pull additional person data in to enrich an insight

> The AE acts as the support person during this period and it's your opportunity to show them what working with you and PostHog will be like should they decide to become a paying customer.  You shouldn't just leave the customer to fend for themselves.

1. Guide them on how to set up tracking depending on their app paying attention to common points of friction such as:
   * [Anonymous vs Identified](/docs/product-analytics/identify#anonymous-and-identified-events) events.
   * Tracking pageviews in [single page apps](/docs/libraries/js/features#manually-capturing-pageviews-and-pageleaves-in-single-page-apps).
   * Deploying a [reverse proxy](/docs/advanced/proxy).
2. Guide them on creating insights either based on:
   * Metrics they've shared that they need to see or;
   * Things we know companies often want to track (e.g. the [AARRR framework](/product-engineers/aarrr-pirate-funnel)).
3. Once you have a week's worth of data in, calculate pricing based on their actual usage and proactively share this.
4. A week before the trial period ends have a wrap-up call to ensure that they have seen everything they need to see, and identify any last remaining areas you can help them with, and next steps after the trial ends.

In an ideal world this involves multiple calls per week during the trial period so that you can build a trusted relationship with the customer, but don't force that if they prefer to use Slack/Email.

We usually set up the following trials depending on likely contract size:

- $20-60k - 2 weeks
- $60k+ - 4 weeks

### 5. Security & legal review

Most customers don't need this beyond sharing our existing documentation. This step often occurs in parallel with product evaluation. Usually only bigger companies ask for this.

> You do not need an NDA to share PostHog internal policies - by default most of these should be publicly available in the [Handbook](/handbook/company/security) anyway, though some are only stored in Drata. If a customer asks you to sign their NDA, you can sign, but have our counsel review it first. As a starting point it must be governed by US law, and mutual.

If the customer requires a vendor questionnaire or security questionnaire then it's best for the AE involved to try and fill it out. If a company reaches out initially with this request, it's often best to try and understand if the customer has an intention to pay or at least grow into a paying customer before investing a lot of time filling it out. If there are any questions that are unclear post the specific question in #team-people-and-ops channel. It is easy to get driven into filling out security questionnaires for accounts that would come in below the sales assist threshold. If the lead is pushing security review without having had any commercial discussions, be transparent up front and let them know that we only do security review for accounts at $20k annual spend or greater. We are happy to work with them to understand their usage, and at that point, further entertain security discussions or point them towards a self serve path. 

Some customers may need payment details up front as part of their vendor onboarding process.  Stripe allows you to generate these ahead of them signing the contract - you can see how to do it [here](/handbook/growth/sales/billing#step-5-apply-credits).

If you need help with anything data privacy or [MSA-related](/handbook/growth/sales/contracts), ping Fraser for help.

### 6. Commercial evaluation

The [Contracts](/handbook/growth/sales/contracts) page has full guidance on the nuts and bolts of how to put together a commercial proposal - we use PandaDoc.

Don't be the AE who gets to this point and suddenly realizes you have no idea who the buyer is! You should already know this, their budget, their purchasing process etc. already as part of your discovery - if you're finding out now, hopefully it's not too late...

By this point, you may have run into some additional objections. These are the most common, and how to handle:

- Gap in the product - introduce the customer to the relevant product engineer to build together (but first agree with product team if it’s a reasonable ask). We have found this approach works exceptionally well for our newer products.
- Pricing issue - understand their budget; our [discounts](/handbook/growth/sales/contracts#discounts) section had the different levers you can pull to get a customer to the right price point. You can also help them tune their usage to lower costs. We don't buy customers out of existing contracts, and we don't do deals where year 1 is super cheap then we ratchet up the price in year 2.
- Performance (e.g. slow dashboards) - for very large customers, usually get Tim involved, or he can loop in the right engineer to help.
- Confidence in PostHog - often [this Handbook page](/handbook/finance) is enough. For Very Large companies who need to be sold a bit more on the company vision, you can get James H involved.
- Unsure how much credit they need - suggesting the customer pay monthly for one or two months can help here, especially when there is not a technical driver that can do the mental math to figure out volumes. It's also a good expectation to set at the end of the trial that they will roll onto monthly, which can be pitched as a way to de-risk for the customer if there are still loose ends or a deal is dragging. 

> Ahead of the contract being signed, you'll also need to understand the customer's invoicing process.  Companies will typically have a Finance or AP team who should be the billing contact in Stripe.  Make sure you are also aware of any special invoicing requirements (e.g. a Purchase Order number) well ahead of the invoice being generated. Follow our [contract rules](/handbook/growth/sales/contract-rules#payment-method) here - e.g. no payment by check, ever.

### 7. Closed - won

Hooray! This is defined as when the contract is signed by _everyone_. 'They're about to sign' - NOT CLOSED. 'I've sent a DocuSign' - NOT CLOSED EITHER.

If an opp moves forward with PostHog on a month-to-month basis, but is below $20k annual spend, change the type to "Monthly Contract" and mark it as closed - won in Salesforce.

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

Post-onboarding, you'll want to change gears to start thinking about [retention, expansion and/or cross-sell](/handbook/growth/sales/expansion-and-retention). 

Simon and Charles review accounts every month to see if/when it makes sense to reassign accounts once they've closed. 

### 7. Closed - lost

Oh no! It's ok - the most important thing here is that we learn. You should capture the reason in the Salesforce opportunity - this could be:

- Product/feature gap
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
