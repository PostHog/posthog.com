---
title: Professional services
sidebar: Handbook
showTitle: true
---

Some potential customers either expect to pay for professional services to help them get set up. There are others who don't ask for this, but where we can tell it would be helpful for them. 

> For now this is only a service we offer to potential customers by default, so this will mainly be of interest to the <SmallTeam slug="sales-cs" />.

## Who we can offer professional services to

A good candidate for this probably has some combination of the following:

- ARR in the $100k+ region, either today or in the next 12 months (actual spend, not credit)
- Large-ish company with complex needs
- Have explicitly asked about paid implementation services and training
- The team adopting PostHog work in person at a single location
- They are not set up with PostHog yet, ie. we would be helping them implement PostHog in their codebase
- They are able and willing to give our team access to their codebase
- We are helping them get set up with session replay, feature flags, LLM analytics, and/or error tracking

If you are working with someone where this might be applicable, ping Charles and Simon first, as we can offer to send a forward deployed engineer to work with them to help get set up. **Please don't just offer this to anyone without checking in**, as we don't have unlimited capacity. 

For ongoing training, this is something that we are solving for separately, but is not within the scope of professional services at the moment. 

## What work is included

Typically, we will send a forward deployed engineer to work with a customer for a week in person. What we charge depends heavily on the nature and scope of the implementation, but in any case starting at $10k. Simon will work with you to figure out the relevant scope of work and contractual terms.

We don't offer this for free, because it is a valuable service that customers expect to pay for. We also don't offer it as a freebie negotiation tactic, because that devalues it for all other customers. 

The specific checklist of what will be implemented depends on the customer, but the following sections detail the broad topics we can cover.

### Implementation scoping 

This should be conducted ahead of time to ensure that we deliver services according to the customer's needs.  We will document a plan for:

 - PostHog SDK implementation.
 - User identification.
 - Privacy controls.
 - Sampling.
 - Autocapture tuning.
 - Custom event instrumentation.
 - Identifying key insights/dashboards to be created.

At the end of this session we should have a good plan and understanding of any onsite work which needs to take place, as well as who in the customer our engineer will be working with, and what level of access to customer systems they require.

### Technical implementation

Here we make sure that PostHog is correctly integrated into the codebase using one or more of our SDKs.  We should also:

 - Implement any user identification or privacy controls that are required.
 - Ensure they are only tracking the events which they need to (including implementing custom events where necessary).
 - Integrate the first set of feature flags into their application.
 - Set up the relevant dashboards and insights as documented in the scoping phase.
 - Ensure that everything is set up according to our best practice [guidance](/handbook/cs-and-onboarding/health-checks).

### Getting started training

Once data is integrated, we should provide an intro to PostHog session to the customer to teach them the basics of how to use PostHog.  This will be tailored to their needs but should provide a baseline understanding of how to navigate the UI, where to find events, create insights, filter replays, etc.

> Whilst Sales and CS folks also provide ongoing training to customers in their book of business, it's important to ensure they have a basic understanding of PostHog, especially if they are brand new.

### Migration

Whilst it's crucial to get live data flowing in to PostHog, the customer may also want to bring over historic data to PostHog from their previous tools.  This will normally be product analytics data, and we have both [managed](/docs/migrate/managed-migrations) and [manual](/docs/migrate/migrate-to-cloud) processes for this depending on the incumbent tool.

> Longer term it's expected that forward deployed engineers will own the managed migration tools and also build out that capability.

Once data is migrated, we may also need to implement dashboards and insights from the previous tool.  There's no automated way to do this currently, so we will need a login to the previous tool to understand and recreate the visualizations they need to move over.

If the customer is replacing a feature flagging tool and has existing feature flags in place, we will need to migrate the flags in the codebase and ensure that the flags and targeting are set up correctly in PostHog.

### Data connectivity

This will normally involve the setup of [realtime](/docs/cdp/destinations) and [batch export](/docs/cdp/batch-exports) destinations for other tools in the customer's stack.  We'll need API keys for the relevant tools as well as an agreed criteria for choosing which events will go to which destination.

This may also involve getting data into PostHog without using our SDKs, for example, by using the [Webhooks](/docs/cdp/sources/incoming-webhooks) or Data Warehouse [sources](/docs/cdp/sources).

### SQL Query implementation

Some customers aren't able to write SQL themselves and don't want to rely on PostHog AI.  We can scope and write the SQL queries that they need, as well as creating the relevant views and person joins so that all of their data is connected.

## Statement of work

Before any onsite work we will need to document a Statement of Work (SOW) which outlines the scope of work and the agreed terms of service.  We should incorporate what we learn in the scoping phase into this to ensure we have all the customer's needs covered and allocate the right amount of time to the project.