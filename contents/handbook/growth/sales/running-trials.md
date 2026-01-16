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
- Customer is ready to invest time in an evaluation of PostHog

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

## Trial "must-haves" and "should-haves"

Every trial _must_ include:

1. **SDK installed and events firing** - Can't trial without data. This is a non-negotiable, and should occur as a "Day 0" item requiring completion before proceeding to any of the recommended timeline steps below.
2. **Documented success criteria** - Define what "winning" looks like for them. What do they need to see for the trial to be considered a success. Leaving them to their own devices and hoping they envision their success with PostHog in the way that we do is not likely to work.
3. **Documented timeline** - Define the "when" for each of the success criteria in #2.

Every trial _should_ include:

1. **Kickoff call** - Use this time to align on the "must-haves": success criteria, timeline. An understanding of "how" they will evaluate is just as critical as what you can be doing throughout the trial to help check off the success criteria. Using this time to collaboratively build the success criteria ensures alignment and mutual understanding.
2. **Shared Slack channel** - Set up before kickoff if possible, so that there's a more "live" way to communicate that comes with better and more accessible support. See [Shared Slack Channels with Customers](/handbook/growth/sales/slack-channels) for additional guidance.
3. **Onboarding success plan** - Use the [30-day onboarding success plan template](/handbook/cs-and-onboarding/onboarding-success-plan) as a starting point, then iterate where appropriate. Adapt for trial length, and share with the customer as a Slack canvas in the shared Slack channel.

## Suggested timeline

> Note: Per above, the trial shouldn't progress past this point until the SDK is installed and event data is being sent to PostHog.

### Days 1-3: Kickoff & Review
- 30-min kickoff with key stakeholders
- Review settings and configuration aligned with trial goals (Identified events, Session Replay controls, Group analytics etc.)
- Custom events (real KPIs) and properties instrumented (not just pageviews)
  - This is crucial. We want to be able to tie back event data in PostHog to actionable business insights stakeholders care about.
- Build initial dashboards together with customers

### Days 4-7: Initial validation
- Additional insights created (trends, funnels, paths)
- Complimentary products introduced (session replay, error tracking, LLM analytics, data warehouse etc.)
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

Different customers may need and/or request different levels of support during their trial. We should match the customer's energy accordingly:

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

> Pro tip: You can always use session replay to also check their activity and learn how they are using PostHog! Leverage PostHog AI to help you analyze multiple user sessions. Look for things like:
- How well users are onboarding
- Points of friction, confusion, or frustration
- Product usage & discovery - are they doing the things they said they wanted to?


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
