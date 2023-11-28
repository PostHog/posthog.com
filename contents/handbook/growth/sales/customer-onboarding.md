---
title: New customer onboarding
sidebar: Handbook
showTitle: true
---
## Day -1 - Session: Initial demo

Our moat is that we have a fully-integrated tool that allows customers to go across Analytics, Recordings and Experimentation easily.  We want new customers to see the value of this as quickly as possible when evaluating us against other solutions.

For high-touch prospective customers the following process will get them onboarded quickly so that they can experience the value we provide using their own product data.

The process should run for 2 weeks by default, but can be extended if we think it's worth the additional effort.

The aim at the end of the evaluation is to have them:
1. Sending in auto or custom captured event data
2. Enabled session recordings
3. Created a trend chart tracking User Acquisition
4. Created a funnel tracking Activation
5. Added the above to a dashboard

### At the end of the demo call

If at the end of a demo call we think a customer qualifies for high-touch onboarding we should outline our suggested evaluation approach.  If they aren't quite ready to kick the evaluation off then we should follow up with a templated email reminding them of the process, then check in with them after they've had some time to regroup.

#### High touch criteria

As a small team we have limited bandwidth to run customer evaluations so we need to focus on potential customers who:
1. Are likely to contract above $20k with us.
   (Ideally we qualify this by giving indicative pricing in the demo)
2. Are likely to enter into an annual contract.
   (This is quite a high-effort process for people just going month to month)
3. Are ready to get hands-on with PostHog and will make a decision in weeks, not months.

### Expectations of the customer

We'll need them to be able to demo their product to us, as well as attend two or more zoom calls where we scope out the data and help them get set up.

Ideally we will also have them in Slack Connect channel so that we can provide responsive support and expose them to the wider PostHog team.

## Day 0 - Session: Kick off

At the start of the evaluation, we want to review their product to understand and advise on the best approach to tracking, as well as address any privacy concerns associated with session recordings.

By the end of the call we should have a plan for event capture/opt-out capture and an agreed timeline to get that set up.

### Prerequisites

The customer should come prepared to demo their product to us, where we can help figure out the key tracking events needed for the evaluation to be successful.

If they don't already know about AARRR we should share our [AARRR blog post](https://posthog.com/blog/aarrr-pirate-funnel) and [Tracking Plan](https://docs.google.com/spreadsheets/d/12uV5aKAhU_wygUQl3YXZU2J_QN_AZi4nPFj-9WIKhlY/edit#gid=0) and ask them to review it before the call.

### Structure

1. Review goals and structure of this session 
2. Review key concepts:
   * Acquisition
   * Activation
   * User Identification
   * Cohorts
   * Groups
   * Privacy / opt out capture
3. Have customer demo their app to you, focusing on where the above information is captured
   * During the demo agree where Acquisition/Activation/Identification take place
   * Get the CSS selectors and pages of any items to opt-out of capture
   * Agree any additional properties that need to be captured
4. Recap and agree the tracking and other implementation details
5. Agree the timeline to have tracking implemented and set up the following call (ideally 3 days after capture is implemented)

### Deliverables

1. A partially filled-in tracking plan detailing Activation and Acquisition
2. A code snippet showing them how to implement tracking for their product (including Identification and Groups if applicable)
3. Elements and pages to add opt-out-capture to

## Day 3 - Session: Using PostHog

The aim of this call is to get the customer familiar with navigating PostHog as well as:

* Defining Actions
* Defining Cohorts
* Creating Insights
* Creating Dashboards
* Finding Recordings

As much as possible the customer should be sharing their screen and driving the session, by teaching them to fish they become comfortable and self-sufficient with PostHog.

### Prerequisites

Tracking should be set up in line with what was shared after the previous call.

### Structure

1. Review goals/agenda
2. Have them share screen and guide them through:

   1. Live events
   2. Creating actions
   3. (Optionally if using Autocapture) the toolbar
   4. Creating cohorts
   5. Creating their Acquisiton trend insight
   6. Creating their Activation funnel
   7. Adding insights to a dashboard
   8. Navigate from dashboard to insight to recordings 
3. Note any inconsistencies or missing tracking information and plan to follow-up to help get that set up 4
4. Show them the billing page and their projected usage (pricing discussion)

### Deliverables

1. Updated tracking guidance based on issues discovered in the guided demo
2. Updated pricing quote based on volume

## Next Steps

Every trial should have an end date by which time we expect the customer to make a decision on whether PostHog is right for them.  If they need more time we first need to understand what they've not seen so we can proactively help them see everything they need to do make a decision (within reason).

If they do become a customer (yay!) then we should agree a regular check in call cadence with them from the start (it's much harder to do after they are in the steady state).


## Sales to CSM "handoff"

While we don't follow a traditional model of sales and customer success being fully separate roles with a formal "handoff", we are experimenting with spezialization within the CSM role. Simon is leading new acquisition, commercial conversations, evaluations (especially for larger enterprise-y customers), and Cameron is managing existing accounts, holding regular (at least quarterly) meetings with larger accounts, where review technical issues, product feedback/requests, and gauge overall account health in a more qualitative way to supplement product usage data in pocus and help retention.

In practice, everyone on the team should have context on high-touch customers from standups, but a formal introduction will be made when a Slack channel is set up. We don't currently have a great process for this for email only customers, but working this out is a to do (as is keeping better tabs on non-Slack high revenue customers more generally). Given the size of our team, we will still mostly need everyone to have context on all customers, so we have redundancy to cover absences.


## Meeting cadence and owners

|Action|Cadence|CSM owner|
|------|-------|----------|
|Onboarding / post-sales handoff|Once|Simon|
|Sync meeting|Quarterly|Cameron|
|Technical troubleshooting/implementation calls|Ad-hoc|Cameron|
|Contract re-negotiation|Annually (per contract)| Simon| 




 
