---
title: How we work
sidebar: Handbook
showTitle: true
---

> This page covers more of the operational detail of how our team generally works - for a broader overview of roles and responsibilities, visit the [customer success team page](/handbook/cs-and-onboarding/customer-success).

## Main metrics for each role

- Technical CSM: revenue retention
- Onboarding Specialist: logo retention

## Book of business

### Customer Success Managers

Each CSM is assigned ~30 existing customer accounts to work with.  We use the CSM Managed Segment in Vitally to track this against goals and CSMs should not assign this themselves (that's up to Dana or Charles).

### Onboarding Specialists

Each OS is assigned ~100 accounts to work with across a three month period and these will be assigned in Vitally, tagged as "onboarding" segment.

## Weekly CS and Onboarding standup

In addition to the weekly sprint planning meeting on a Monday, we do a weekly cs and onboarding standups on Wednesday to review accounts and discuss any at-risk accounts to highlight.

The objective of the meeting is to hold each other to account, provide direct feedback, and also support each other. It is a great place to ask for help from the team with thorny problems - you should not let your teammates fail.

## How contractual bonus works - Technical CSMs

CSMs are responsible for ensuring that a larger book of existing customers - both annual and monthly - continue to use PostHog successfully. They nurture customers and are product experts - this isn't a role of just going back and forth between customers and support engineers, or collecting feedback.

> This plan will _also_ almost certainly change as we scale up the size and complexity of our success machine! As above, we will always ensure folks are treated fairly when we make changes.

**Variables**

- Your OTE comprises a 90/10 split between base and contractual bonus.
- Bonus is paid based on revenue retention above 100%, and is _uncapped_.
  - For example, if you have 100% revenue retention and your target is 120% revenue retention, you get 0% of bonus. For 120% retention, it's 100% bonus, and for 140% retention, it's 200% bonus. This is on a sliding scale so if you hit 110% retention you get 50% bonus.
  - While the Q2 2025 target is 120%, this may change in future depending on how things go.
  - To calculate retention we use the total quarterly usage and annualize this.
    - For monthly customers this is the total of their 3 invoices multiplied by 4
    - For annual customers, we look at the usage-based MRR and multiply by 4
- Bonuses are paid out quarterly, and in any case after an invoice is paid
  - Bonus payments are made at the end of January, April, July, and October - at the end of each quarter, we'll monitor how many invoices actually get paid in the first two weeks of the next quarter. Fraser will send you an email that breaks down how you did.
- Your bonus is guaranteed at 100% for your first 3 months at PostHog - this gives you time to get up to speed, but also if you over-perform then you will get your additional bonus.
- If an account is added to your book:
  - If you inherit a new account, you have a 3 month grace period - if they drop or churn in that initial period, they won't be counted against you. We want to encourage you to right-size customers, rather than your deliberately letting them wastefully spend money due to some poor implementation.
- How bonus is calculated:
  - In general, we compare start of quarter ARR with end of quarter ARR.
  - For customers on annual plans, we will look at their usage-based spending (instead of total contract amount / 12)
  - If you get a new account added mid-quarter, their starting ARR doesn't count towards your target - only growth from the point they were added.
  - If an account is removed from your book mid-quarter, they will not be included in bonus calculation.
  - If we have to give a customer a big refund, we’ll deal with your bonus on a case by case basis depending on what happened.

## Working with engineering teams

We hire Technical CSMs and Technical OSs. This means you are responsible for dealing with the vast majority of product queries from your customers. However, we still work closely with engineering teams!

**Product requests from large customers**

Sometimes an existing or potential customer may ask us to fix an issue or build new features. These can vary hugely in size and complexity. A few things to bear in mind:

- Engineers at PostHog [talk to customers](/handbook/making-users-happy#engineers-talk-to-users-and-provide-support). It's much better to bring engineers onto calls to speak to large customer to talk to them directly than just do the call yourself and copy and paste notes back and forth. This is especially useful if a) the team was already considering building the feature at some point, b) it's an interesting new use case, or c) the customer is really unhappy for valid reasons and could churn.
- Provide as much internal context as you can. If a customer sends a one-liner in Slack, don't just copy and paste into a product team's channel - find out as much as you reasonably can first, ask clarifying questions up front etc. Otherwise the relevant team will just ask you to do this anyway.
- We already have [principles](/handbook/how-we-make-money#principles-for-dealing-with-big-customers) for how we build for big customers - if you have a big customer with a niche use case that isn't applicable to anyone else, you should assume we won't build for them (don't be mad!)
- For any [feature requests](/handbook/cs-and-onboarding/feature-requests) customers care deeply about, we should file and track those in Vitally.

Finally, if you are bringing engineers onto a call, brief them first - what is the call about, who will be there. And then afterwards, summarize what you talked about. This goes a long way to ensuring sales <\> engineering happiness.

**Complicated technical questions**

You will run into questions that you don't know the answer to from time to time - this is ok! Some principles here:

- Try to solve your own problems. Deep dive the docs, ask Max AI, ask the rest of the sales team first - a bit of digging is a valuable opportunity for you to learn.
- Similar to the above, don't just copy and paste questions from Slack with no context. Add some commentary - 'they have asked X, their use case is generally Y, I think the answer might be Z - is that right?'. Do some of the lifting here, rather than putting all the mental load on an engineering team.

## Working with customers in Slack

Most of our customers use Slack, and it's a great way for us to be responsive to them. Everyone has the permission in Slack to create a Connect channel with a customer, and you should do this as early as possible in your relationship with them.

When you've created the channel you should also add Pylon, which is used to sync Slack conversations with Zendesk so that our Support and Engineering teams can work on customer issues in a familiar context.

To add Pylon to your customer channel:

1. In the Slack desktop app, click the channel name.
2. On the Settings tab, click Add apps.
3. Type Pylon and click Add.
4. In the popup that appears in the Slack channel, select Customer Channel.
5. Add yourself as the Account Owner.
6. Click Enable.
7. Add Tim, Charles, and Abigail to the channel.

Once enabled, you can add the :ticket: emoji to a Slack thread to create a new Ticket in Zendesk.  Customers can also do this.  Make sure that a Group and Severity are selected or the ticket won't be routed properly.

> It's your job to ensure your customer issues are resolved, make sure you follow up with Support and Engineering if you feel like the issue isn't getting the right level of attention.

## Tools we use
**Gmail**
We use Gmail for our email and the team uses many different clients from [Superhuman](https://superhuman.com/) to [Spark](https://sparkmailapp.com/) to the default Gmail web interface. Find something that works well for you. To get your own email signature, copy the signature from someone else on the team (like Simon) and then fill in your own details.

**Calendly:**
We use Calendly for scheduling meetings. In order to schedule a meeting between a customer and multiple members on the PostHog team, click on "Event types" in the left hand navigation, then click "+ New Event Type" button in the top right, and select "Group" from the dropdown. This will allow you to create a group meeting and add multiple team members to the event and create a link you can share with the customer.

**BuildBetter:**
We use BuildBetter for call recording and notetaking. You will need to integrate BuildBetter with your calendar in order for it to automatically join your calls. To do so, click on settings and look for the integrations link under account (not the one under organization) and follow the steps from there.

**Zoom:**
We use Zoom for sales calls, and if you have Calendly properly integrated, calls that are booked through the tool will default to Zoom. You can find backgrounds to use for the calls here: [This is fine \(and other awesome PostHog wallpapers\)](/blog/posthog-wallpapers).
