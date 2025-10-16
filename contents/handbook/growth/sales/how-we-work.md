---
title: How we work
sidebar: Handbook
showTitle: true
---

> This page covers more of the operational detail of how our team generally works - for a broader overview of roles and responsibilities, visit the [overview page](/handbook/growth/sales/overview).

## Roles

We have three types of role:
- Technical Account Executives - closing new business from [inbound](/handbook/growth/sales/inbound-sales) and [outbound](/handbook/growth/sales/outbound-sales) leads
- Technical Account Managers - [expansion](/handbook/growth/sales/expansion-and-retention) from existing customers, closing new business from [product-led leads](/handbook/growth/sales/product-led-sales)
- Technical Account Managers called Leon and Scott - [expansion](/handbook/growth/sales/expansion-and-retention) from a small set of very high potential existing customers

### Technical Account Executives

TAEs work with:

- People email sales@ directly
- People who book a demo via contact sales
- Other triggers we see in product, supplemented by data from Clay

As we start to generate cold outbound leads, these will be routed to TAEs to work with as well. Customers move off of a TAE to a TAM or CSM 3 months after closing on a prepaid contract (usually annual) - you have to ensure they are well set up, not just contract signed!

#### TAE Territory Review

In addition to the weekly sprint planning meeting on a Monday, we do a weekly territory review standup on Wednesday. A Technical AE is picked at random, and we spend 30min going through:

1. Recent Closed Won
2. Where are you going to end up vs quota this quarter?   a. Confidence (scale of 1-5? a percentage out of 100? what's keeping it from being 5 or 100%?)
3. Review deals (use this <PrivateLink url="https://posthog.lightning.force.com/lightning/r/Report/00OVx000003qcc9MAA/view">Salesforce view</PrivateLink>) for this quarter by Commit -> Best Case -> Pipeline 
   - For "Commit", how could it possibly end up "closed lost?"
   - For "Best Case", how does it advance to "Commit" (or what's keeping it from doing so?)
   - For "Pipeline", 1-2 opps you're excited about or want to share with the group
4. Outbound successes and failures

> The objective of the meeting is to hold each other to account, provide direct feedback, and also support each other. It is a great place to ask for help from the team with thorny problems - you should not let your teammates fail.

### Technical Account Managers

Each TAM is assigned up to 15 existing customer accounts to work with. Additionally, you will manage inbound leads as they are assigned to you in your territory. Overall, the hard cap on existing book + new leads is 25 accounts, so staying extremely focused is important.

We use the "AM Managed" Segment in Vitally to show that an account is part of somebody's book of business and therefore included in individual and team quota calculations.  AMs should not assign this themselves (that's up to Simon or Charles), but can add themselves as the Account Executive in Vitally to make it easier to track things you're working on.

For Product-led leads we will only add them to your book for quota purposes if you have a solid plan in place for conversion to prepaid credit or cross-product adoption. Account Owners can use the "Leads" Segment in Vitally to separately track these from the main managed book. 

At the end of each quarter we will review your accounts and look to hand off some to bring your focus account list back down to 10.  Simon and Charles will also review everyone's accounts each month proactively to make sure that the balance of accounts across the team makes sense.

#### TAM Territory Review

In addition to the weekly sprint planning meeting on a Monday, we do a weekly territory review standup on Wednesday. A Technical AM is picked at random and runs through the following for each customer in their book of business in Vitally:

1. Rate your relationship with them (no connection yet/made contact/answering their questions in Slack/trusted advisor)
2. What's your next step with that customer (annual plan, cross-sell etc).
3. Are they a churn risk and why?

> The objective of the meeting is to hold each other to account, provide direct feedback, and also support each other. It is a great place to ask for help from the team with thorny problems - you should not let your teammates fail.

### Handing off customers to Technical CSMs

We want to ensure the expansion potential of a customer has been thoroughly exhausted before moving to a Technical CSM for more steady-state retention.  When you want to move a customer off your book you should talk it through with Simon. Here are the things we will be looking at:

1. Have you tried multiple times to [make contact](/handbook/growth/sales/expansion-and-retention#1-get-people-to-talk-to-you) with all of the active users in an account?
   - An _Active User_ is someone who has been seen in Vitally in the past month
   - When you reach out, demonstrate how you can help that person out, be specific to their role/usage of PostHog.
2. Are they using all PostHog products?
   - If they have been customers for a while they may not be aware of new products like Surveys and Data Warehouse.  Look at their usage and see if there are any obvious cross-sell opportunities.
   - Could they benefit from some of the advanced capabilities and training/support available in Teams/Enterprise?
3. Is there an opportunity to cross-sell to a different team?
   - Have a look at what they are tracking with PostHog.  If it's an app then maybe get in touch with the marketing team to talk about Web Analytics or No Code Testing
   - Are they a multi-product company?  Find out if there are other teams who aren't using us who could benefit from PostHog today, and then use your current users as an internal reference.

If the answer to any of the above questions is 'no' then it's likely that there is more work to be done with a customer, but we will use a common sense approach here.

> A customer being negative/difficult to work with isn't a reason to remove them from your book.  It's your job to turn them around to being a happy customer (AKA be their favorite).

## How commission works - Technical Account Executives

**General principles**

- When thinking about commission, we want to particularly incentivize:
  - Closing annual contracts with payment up front - better retention, de-risks PostHog financially.
  - Selling multiple products in a deal - all-in-one is how we will beat the competition.
- We aim for a 50/50 split between base/commission when calculating OTE by default.

> This plan will almost certainly change as we scale up the size and complexity of our sales machine! This is completely normal - we will ensure everyone is always treated fairly, but you need to be comfortable with this. For now we are generally trying to optimize for something straightforward here so it’s easy for PostHog (and you) to calculate commission. Fraser runs this process, so if you have any questions, ask him in the first instance.

**Variables**

- Your quota is set for the year and then divided by 4 - this means you don't have to cram deals into the end of a quarter.
- Commission is _uncapped_ and paid out on a sliding scale based on the % of your quota you hit. Hit 100% quota, get 100% of commission. 0% for 0%. And 200% for 200%.
- Quota is based on $ amount sold, not credits/product usage, so you can't in theory sell a $500k deal with an 80% discount and claim the full $500k to your quota, for example. Ways to hit quota:
  - ARR from new annual deals sold
  - ARR from monthly customers for the first _3 months_ where you got them set up but they didn't commit to an annual contract
    - After 3 months, either you can keep working them if you believe they'll go annual, or they'll get handed over to a TAM or CSM
  - For multiyear contracts we will true the quota ARR up to the year 1 equivalent amount as you'll have given a deeper discount but there is more committed revenue for PostHog which is a good thing.
    - The way we work this out is by taking the annual credit purchased by the customer and applying the standard 1 year discount to it.
  - Your quota will depend on your OTE
- Commission is paid out quarterly, and in any case after an invoice is paid
  - This incentivises securing upfront payment, not just annual contracts with monthly payment every time.
    - If you close an annual contract with monthly/quarterly payments, you will still get recognized for the full commission amount, but the actual payout of your commission will be quarterly.
  - We also don't want AEs to throw invoice chasing to a finance person - you should make friends with the finance person on the customer's side too
  - For monthly customers, commission is only paid after all 3 invoices have been paid
    - Commission is still paid out quarterly even if the customer pays monthly
  - If we have to give a customer a big refund, we’ll deal with your commission on a case by case basis - in the future we may introduce a more formal clawback
  - Commission payments are made at the end of January, April, July, and October - at the end of each quarter, we'll monitor how many invoices actually get paid in the first two weeks of the next quarter. Fraser will send you an email that breaks down your commmission into the above 4 buckets and how you did.
- In your first 3 months you'll be paid 100% OTE fixed.

## How commission works - Technical Account Managers

**General principles**

- When thinking about commission, we want to particularly incentivize:
  - Cross-selling new products - all-in-one is how we will beat the competition.
  - Closing prepaid credit contracts (often annual, but may not be) - better retention, de-risks PostHog financially.
- We aim for a 50/50 split between base/commission when calculating OTE by default.

> This plan will almost certainly change as we scale up the size and complexity of our sales machine! This is completely normal - we will ensure everyone is always treated fairly, but you need to be comfortable with this. For now we are generally trying to optimize for something straightforward here so it’s easy for PostHog (and you) to calculate commission. Fraser runs this process, so if you have any questions, ask him in the first instance.

**Variables**

- Your quota is set as _the additional $ on a usage basis you are expected to add to your book of business_ - ie. any new product usage counts. This is different from TAEs, because here we care about the invoiced usage _not_ the actual $ amount.
  - For example, if you start a quarter with $700k in ARR and are set a target to grow this by $200k ARR, your commission is based on your attainment towards the $200k figure based on amounts invoiced.
  - We measure the change in annualised quarterly ARR. Take Q1's usage ARR x4, compare it to Q2's usage ARR x4 - the different in these numbers is your attainment towards quota.
- This means you can hit quota by a combo of bringing in new business and expanding existing. Because your target is based on invoiced usage, this means that even if you have an annual customer in your book, you can still expand their usage and get recognized for that.
  - It also means that you are less likely to totally neglect existing customers because if they reduce usage, it hurts your overall ARR figure.
- Commission is _uncapped_ and paid out based on the % of your quota you hit, on a sliding scale. Hit 100% commission, get 100% of commission. 0% for 0%. And 200% for 200%. Ways to hit quota:
  - Increase ARR for your monthly customers
  - Convert monthly customers to a prepaid annual plan - in this case, their monthly usage invoices paid with annual credits will count 1.25x towards your quota
  - For customers already on annual plans, additional usage ARR _beyond_ their annual run rate - for example, if you have a customer on a $120k annual contract, but they are being invoiced $20k/mo for their usage, you will get recognized on the additional $10k/mo
  - Your quota will depend on your OTE
- Commission is paid out quarterly, and in any case after an invoice is paid
  - We don't want TAMs to throw invoice chasing to a finance person - you should make friends with the finance person on the customer's side too
  - For monthly customers, commission is only paid after the first 2 invoices have been paid (ie. you don't get commission due to a random spike)
    - To clarify, this means the first 2 invoices the customer has ever paid, ie. you still get commission from 'your' month 1 if you inherit a paying monthly customer
    - Commission is still paid out quarterly even if the customer pays monthly
  - If we have to give a customer a big refund, we’ll deal with your commission on a case by case basis - in the future we may introduce a more formal clawback
  - Commission payments are made at the end of January, April, July, and October - at the end of each quarter, we'll monitor how many invoices actually get paid in the first two weeks of the next quarter. Fraser will send you an email that breaks down your commmission into the above 4 buckets and how you did.
- In your first 3 months you are expected to retain your existing book and have closed at least one deal (either totally new or converting an existing customer to annual) - you'll be paid 100% OTE fixed.

> Your quota and assigned customers are likely to change slightly from quarter to quarter. In any case, your quota will be amended appropriately (up or down) to account for any movement. We will also be flexible in making changes mid-quarter if it's obviously the sensible thing to do. If you inherit a new account, you have a 3 month grace period - if they churn in that initial period, they won't be counted against your quota.
>
> If you have customer you converted from monthly to annual under the old, non-usage-based commission plan, you won't _also_ get recognized for additional usage beyond their annual run rate in the first year - no double dipping!

You can see how we are tracking on the [TAM Quota Tracker](https://us.posthog.com/project/2/dashboard/498582) dashboard.

## Team lead quota

From your first full quarter as a team lead in Sales, you will move to a 60% base 40% commission split in reflection of your new player/coach role.  This will be based on your team's quota attainment although you will still have your own individual quota target.

> Your individual quota will be lower than others in the team as you'll be spending more time on managing the team, but we still want you to demonstrate the sales individual contributor skills to your team.  You should aim for 80% team management, 20% IC work, and the quota will reflect that.

To calculate the team quota, we combine the quota of all team members with proration applied if they are still ramping:

 - For fully ramped team members we add 100% of their quota to the team quota.
 - For team members who begin the quarter still in their first three months in the role we add 50% of their quota to the team quota.

Example: With a flat quota of $250,000 and 3 fully ramped people, and 1 ramping, the team quota would be $875,000 (($250,000 * 3) + $125,000)

> If someone leaves the team, we may recalculate the team quota depending on how their accounts and opportunities are reallocated to others in the team. If someone joins the team, we don't change the team target, and don't count their contribution towards the existing target, to keep it simple.

## Travel to see customers

You are likely to need to travel a lot more than the typical PostHog team member in order to meet customers. Please make sure that you follow our company [travel policy](/handbook/people/spending-money) and act in PostHog's best interests. We trust you to do the right thing here and won't pre-approve your travel plans, but we do keep track of what people are spending and the Ops team will follow up with you if it looks like you are wasting money here. We are not a giant company that pays for fancy flights, accommodation, and meals so please be sensible.

## Working with engineering teams

We hire Technical AEs. This means you are responsible for dealing with the vast majority of product queries from your customers. However, we still work closely with engineering teams!

**Product requests from large customers**

Sometimes an existing or potential customer may ask us to fix an issue or build new features. These can vary hugely in size and complexity. A few things to bear in mind:

- Engineers at PostHog [talk to customers](/handbook/making-users-happy#engineers-talk-to-users-and-provide-support). It's much better to bring engineers onto calls to speak to large customer to talk to them directly than just do the call yourself and copy and paste notes back and forth. This is especially useful if a) the team was already considering building the feature at some point, b) it's an interesting new use case, or c) the customer is really unhappy for valid reasons and could churn.
- Provide as much internal context as you can. If a customer sends a one-liner in Slack, don't just copy and paste into a product team's channel - find out as much as you reasonably can first, ask clarifying questions up front etc. Otherwise the relevant team will just ask you to do this anyway.
- We already have [principles](/handbook/how-we-make-money#principles-for-dealing-with-big-customers) for how we build for big customers - if you have a big customer with a niche use case that isn't applicable to anyone else, you should assume we won't build for them (don't be mad!)

Finally, if you are bringing engineers onto a call, brief them first - what is the call about, who will be there. And then afterwards, summarize what you talked about. This goes a long way to ensuring sales <\> engineering happiness.

**Complicated technical questions**

You will run into questions that you don't know the answer to from time to time - this is ok! Some principles here:

- Try to solve your own problems. Deep dive the docs, ask Max AI, ask the rest of the sales team first - a bit of digging is a valuable opportunity for you to learn.
- Similar to the above, don't just copy and paste questions from Slack with no context. Add some commentary - 'they have asked X, their use case is generally Y, I think the answer might be Z - is that right?'. Do some of the lifting here, rather than putting all the mental load on an engineering team.
- If you open a ticket in Zendesk and know which team the ticket needs to go to, make sure to select "escalated" on the ticket so that it will bypass support and go straight to that team.

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
7. Add Tim, Simon, Charles, and Abigail to the channel.

Once enabled, you can add the :ticket: emoji to a Slack thread to create a new Ticket in Zendesk.  Customers can also do this.  Make sure that a Group and Severity are selected or the ticket won't be routed properly.

> It's your job to ensure your customer issues are resolved, make sure you follow up with Support and Engineering if you feel like the issue isn't getting the right level of attention.
