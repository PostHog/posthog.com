---
title: Running trials
sidebar: Handbook
showTitle: true
---

## Running trials at PostHog

A trial creates space for you and the customer to validate technical fit, agree on success criteria, and close the deal. This guide covers when to offer trials and how to run them effectively.

## When to offer Trials

**Offer a trial when:**
- Qualified for sales-assist (>$20K ARR potential)
- Clear decision makers and timeline identified
- Customer wants technical validation
- Customer is ready to invest time in proper evaluation

**Skip the trial when:**
- Below sales-assist threshold (route to self-serve)
- No clear timeline or decision process
- They are price shopping with no technical criteria
- They are already committed to buying

## Trial length: 2 or 4 Weeks?

We default to 2 weeks ($20-$60K ARR) unless there's a compelling reason for 4 weeks.

**Extend to 4 weeks when:**
- Deal value >$60K ARR
- Customer has a complex technical environment requiring extended implementation
- Multiple stakeholder validation required
- They are evaluating PostHog alongside other products

## Recommended trial prerequisites

Every trial must include:

1. **SDK installed and events firing** - Can't evaluate without data. This is a non-negotiable.
2. **Kickoff call/message** - Align on timeline, success criteria, and support expectations.
3. **Documented success criteria** - Define what "winning" looks like for them (specific metrics, dashboards, or use cases).
4. **Written timeline** - Include the trial schedule and your closing plan if success criteria are met.
5. **Shared Slack channel** - Set up before kickoff if possible. Although not required, it is preferred as we can provide much better support. 

You can use the [30-day onboarding success plan template](/handbook/cs-and-onboarding/onboarding-success-plan) as your shared doc and iterate where appropriate. Adapt for trial length and share with the customer as a Slack Canvas.

## Required steps (all trials)

Your first priority is to try and get them into [a shared Slack channel](/handbook/growth/sales/slack-channels) as quickly as possible. If you close them, this will also be their primary channel for support. Add the Pylon app to the channel and it will automate the support bot and channel description. React with a 🎫 to customer messages or tag @support to create a ticket in a thread.

You should then follow up with a standard email/Slack message that:
- Summarizes what they're after and how PostHog is a great fit (if it's not a good fit, they shouldn't have made it this far)
- Lays out next steps on both sides
- Shares a proposed timetable for the evaluation and onboarding process
- Includes any useful links (relevant docs, competitor comparisons, case studies)

As a separate message, you should lay out what criteria they need to see for the trial to be considered a success - the evaluation will almost certainly fail if you just leave the customer to noodle around trying PostHog.

### Day 0: Installation
- SDK installed and firing events

> The evaluation shouldn't progress further into the below guidance until this is complete.

### Days 1-3: Kickoff & Review
- 30-min kickoff with key stakeholders
- Review settings and configuration aligned with evaluation goals (Identified events, Session Replay controls, Group analytics etc.)
- Custom events (real KPIs) and properties instrumented (not just pageviews)
  - This is crucial. We want to be able to tie back event data in PostHog to actionable business insights stakeholders care about.
- Build initial dashboards together with customers

### Days 4-7: Initial validation
- Additional insights created (trends, funnels, paths)
- Complimentary products introduced (Session Replay, Error Tracking, LLM Analytics, Data Warehouse etc.)
- Start to gather initial feedback from test group
- Start to validate success criteria

### Business process happens in parallel

As customers are technically validating PostHog, you should also start to work with them on initiating procurement, reviewing legal requirements and aligning on price. 

- **Ask:** "What does the procurement process look like?"
- **Validate:** Build and agree on a quote together in QuoteHog based on expected volumes. Does pricing make sense and work within their budget?
- **Identify:** Who approves? What legal/security requirements exist?
- **Timeline:** Confirm we're still on track to close by trial end. "How long does procurement typically take?"

### Days 7-14: Close
- Feedback session with stakeholders
- Confirm their success criteria has been met
- Address any remaining concerns
- Validate procurement is in motion
- Mutually aim to get an order form signed by trial end

## Support approach

Different customers may need and/or request different levels of support during their evaluation. We should match the customer's energy accordingly: 

**Hands-on (larger deals, less technical teams):**
- Weekly check-ins
- Proactive dashboard building
- Regular training sessions
- Frequent Slack engagement

**Self-serve (technical teams, smaller deals):**
- We're available when needed
- Very quick response times
- Async support via Slack

Most trials fall somewhere in-between. It's up to us to read the room and adapt.

## Monitoring engagement

It's important to have visibility into a customer's usage and engagement in order to validate whether or not they will be successful with PostHog. 

These signals are not guaranteed to always indicate success. Some teams are chattier than others, some teams like to keep comms over email, others enjoy regular Zoom meetings - see above for notes on Hands-on vs. Self-serve approaches.

> Pro tip: You can always use Session Replay to also check their activity and learn how they are using PostHog!

**High engagement signals:**
- Active Slack channel (questions, wins, feedback)
- High insight creation volume
- Extensive event instrumentation
- Regular meetings scheduled

**Low engagement signals:**
- Quiet Slack channel
- Limited insight creation
- No logins for 3-5+ days

**If engagement drops, be proactive:**
- Build dashboards tied to their KPIs and share with stakeholders
- Send Loom videos showing interesting insights from their data or record your own demos
- Ask directly: "Is this still a priority?"

Your time is valuable. If timing isn't right, it's okay to pause the trial and reconnect with them at a later date.

## Extensions

It's common that a customer needs more time to validate PostHog. People get sick, take vacations, priorities change. There are a number of reasons why a customer may need an extension and we're happy to be amenable to them while getting a good understanding of the path to trial end, win or lose.

When considering granting extra time (7-30 days), we should ask for something in return. Examples include: 

- Introduction to key stakeholders
- Commitment to start procurement process in parallel
- Verbal confirmation they're moving forward
- Weekly check-in calls until trial end

Always understand: Why do they need more time? What specifically needs to be accomplished?

## Wrapping up the trial 

Whether it's a 14 or 30-day trial, you should already be getting clear signals that the customer will choose PostHog halfway through. Schedule a feedback session to confirm the technical win and understand what else needs to happen before we make things official.

In your feedback session, be sure to: 

- Confirm they've achieved what they need to in order to buy PostHog
- Address any remaining concerns
- Discuss next steps and validate timeline
- Confirm that procurement is in motion

Don't wait for the trial to end to start closing conversations. If success criteria are met early, no need to wait. You can always start moving towards the required closing steps (order form, amount, where to send invoices, etc.) at the customer's pace. 
