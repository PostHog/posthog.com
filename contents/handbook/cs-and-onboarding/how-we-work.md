---
title: How we work
sidebar: Handbook
showTitle: true
---

> This page covers more of the operational detail of how our team generally works - for a broader overview of roles and responsibilities, visit the [customer success team page](/handbook/cs-and-onboarding/customer-success).

## Main metrics for each role

- Technical CSM: revenue retention

## Book of business

### Customer Success Managers

Each CSM is assigned customer accounts accumulating to ~$2.5m ARR to work with.  We use the CSM Managed Segment in Vitally to track this against goals. Don't assign yourself as the CSM on an account - assigning a CSM automatically adds the account to the segment. Allocation is up to Dana, Phil and Simon.

## Weekly Customer Success standup

In addition to the weekly sprint planning meeting on a Monday, we do an account review standup on Wednesday to discuss any at-risk accounts.

The objective of the meeting is to hold each other to account, provide direct feedback, and also support each other. It is a great place to ask for help from the team with thorny problems - you should not let your teammates fail.

## How contractual bonus works - Technical CSMs

CSMs are responsible for ensuring that a larger book of existing customers - both annual and monthly - continue to use PostHog successfully. They nurture customers and are product experts - this isn't a role of just going back and forth between customers and support engineers, or collecting feedback.

> This plan will _also_ almost certainly change as we scale up the size and complexity of our success machine! As above, we will always ensure folks are treated fairly when we make changes.

**Variables**

- Your OTE comprises an 80/20 split between base and contractual bonus.
- Bonus is paid based on revenue retention above 100%, and is _uncapped_.
  - For example, if you have 100% revenue retention and your target is 120% revenue retention, you get 0% of bonus. For 120% retention, it's 100% bonus, and for 140% retention, it's 200% bonus. This is on a sliding scale so if you hit 110% retention you get 50% bonus.
  - The Q3 2026 target is 110% quarterly NRR. This may change in future depending on how things go.
  - To calculate retention we use the total usage over the past quarter and annualize this, then compare it to the quarter before that.
    - For monthly customers this is the total of their 3 invoices multiplied by 4
    - For annual customers, we look at the usage-based MRR and multiply by 4
    - An account starts counting toward NRR once it has 3 paid invoices in the previous quarter (a $0 month doesn't count).
- Bonuses are paid out quarterly, and in any case after an invoice is paid
  - Bonus payments are made at the end of January, April, July, and October - at the end of each quarter, we'll monitor how many invoices actually get paid in the first two weeks of the next quarter. Fraser will send you an email that breaks down how you did.
- Your bonus is guaranteed at 100% for your first 3 months at PostHog - this gives you time to get up to speed, but also if you over-perform then you will get your additional bonus.
- If an account is added to your book:
  - If you inherit a new account that hasn't been managed by a PostHog human before, you have a 3 month grace period - if they drop or churn in that initial period, they won't be counted against you. We want to encourage you to right-size customers, rather than your deliberately letting them wastefully spend money due to some poor implementation.
  - If you inherit an account from another CSM, AE, or AM, it will normally count toward your NRR in that quarter, even in the first 3 months.
    - In exceptional circumstances we may need you to take on an account which we know isn't in a good state (ie. despite the previous owners best efforts we haven't been able to work with them).  We will note in writing on a case by case basis that any churn or downgrade in the first 3 months won't be counted against you.
- How bonus is calculated:
  - In general, we compare annualized ARR over the past quarter with annualized ARR from the previous quarter.
    - For Q3 2026 bonus: Q3 ARR vs Q2 ARR
  - For customers on annual plans, we will look at their usage-based spending (instead of total contract amount / 12)
  - If an account is removed from your book mid-quarter (we do this extremely rarely), it will not be included in bonus calculation.
  - If a customer churns during the quarter, their current ARR counts as $0 and they will be removed from your book the next quarter.
  - If a customer drops below the $20k threshold with no likelihood of growing, we don't adjust their ARR - it counts as-is, and they will be removed from your book the next quarter.
  - If we have to give a customer a big refund, we'll deal with your bonus on a case by case basis depending on what happened, but usually this will still be counted. 
  - If we give a customer additional credits (goodwill, bug/incident compensation - not the credits they pre-purchase with a contract), the NRR treatment depends on why we gave them:
    - Unintended usage spikes - a misconfiguration, SDK bug, or runaway loop inflates usage: we credit the customer and exclude the excess usage from NRR. Nobody's NRR should go up because of an accident. There are [eligibility criteria for credits](/handbook/growth/sales/refunds#eligibility-criteria) - check them before promising one.
    - Goodwill credits - a bug hurt a paying customer's experience but their usage was real: the credit compensates them, and the usage counts as normal.
    - Startup / YC credits - usage covered by these doesn't count toward NRR. If a customer isn't paying us real money, we don't count it. In practice the 3-paid-invoices rule above handles this.
    - Comped usage on contract buy-outs / early renewals (e.g. comping 2 months of usage to move a customer onto a new contract early) - no blanket rule here, so flag it to your team lead and we'll handle it case by case.
 
**Account allocation**
- CSMs manage approximately $2.5M in ARR. Books are balanced by shape as well as total: a target number of accounts per ARR bucket, so a single large account doesn't dominate a book.
- As of Q3 2026, a typical book is roughly 4 accounts at $20-30k, 12 at $30-60k, 5 at $60-100k, 5 at $100-250k, and 2 at $250k+. These numbers come from our [live capacity calculation](https://us.posthog.com/project/2/dashboard/1737835), and will shift as coverage grows and capacity modelling improves.
- When rebalancing accounts (e.g., if accounts drop below the $20k threshold), we'll bring you up to the current quarter's target amount.

## Working with engineering teams

We hire Technical CSMs. This means you are responsible for dealing with the vast majority of product queries from your customers. However, we still work closely with engineering teams!

**Product requests from large customers**

Sometimes an existing or potential customer may ask us to fix an issue or build new features. These can vary hugely in size and complexity. A few things to bear in mind:

- Engineers at PostHog [talk to customers](/handbook/making-users-happy#engineers-talk-to-users-and-provide-support). It's much better to bring engineers onto calls to speak to large customer to talk to them directly than just do the call yourself and copy and paste notes back and forth. This is especially useful if a) the team was already considering building the feature at some point, b) it's an interesting new use case, or c) the customer is really unhappy for valid reasons and could churn.
- Provide as much internal context as you can. If a customer sends a one-liner in Slack, don't just copy and paste into a product team's channel - find out as much as you reasonably can first, ask clarifying questions up front etc. Otherwise the relevant team will just ask you to do this anyway.
- We already have [principles](/handbook/how-we-make-money#principles-for-dealing-with-big-customers) for how we build for big customers - if you have a big customer with a niche use case that isn't applicable to anyone else, you should assume we won't build for them (don't be mad!)
- For any [feature requests](/handbook/cs-and-onboarding/feature-requests) customers care deeply about, we should file and track those in Vitally.

Finally, if you are bringing engineers onto a call, brief them first - what is the call about, who will be there. And then afterwards, summarize what you talked about. This goes a long way to ensuring sales <\> engineering happiness.

**Complicated technical questions**

You will run into questions that you don't know the answer to from time to time - this is ok! Some principles here:

- Try to solve your own problems. Deep dive the docs, ask PostHog AI, ask the rest of the sales team first - a bit of digging is a valuable opportunity for you to learn.
- Similar to the above, don't just copy and paste questions from Slack with no context. Add some commentary - 'they have asked X, their use case is generally Y, I think the answer might be Z - is that right?'. Do some of the lifting here, rather than putting all the mental load on an engineering team.

## Working with customers in Slack

Most of our customers use Slack, and it's a great way for us to be responsive to them. Everyone has the permission in Slack to create a Connect channel with a customer, and you should do this as early as possible in your relationship with them.

When you've created the channel you should also add SupportHog, our own tool that syncs Slack conversations with PostHog so that our Support and Engineering teams can work on customer issues in a familiar context. Follow the [shared Slack channel setup steps](/handbook/growth/sales/slack-channels#setting-up-a-shared-slack-channel-via-slack-connect) to invite SupportHog and configure the channel.

Once it's in the channel, you can add the :ticket: emoji to a Slack thread — or mention `@SupportHog` — to create a new ticket in [PostHog Support](/handbook/support/posthog-support).  Customers can also do this.

> It's your job to ensure your customer issues are resolved, make sure you follow up with Support and Engineering if you feel like the issue isn't getting the right level of attention.

## Tools we use
**Gmail**
We use Gmail for our email and the team uses many different clients from [Superhuman](https://superhuman.com/) to [Spark](https://sparkmailapp.com/) to the default Gmail web interface. Find something that works well for you. To get your own email signature, copy the signature from someone else on the team (like Simon) and then fill in your own details.

**Calendly:**
We use Calendly for scheduling meetings. In order to schedule a meeting between a customer and multiple members on the PostHog team, click on "Event types" in the left hand navigation, then click "+ New Event Type" button in the top right, and select "Group" from the dropdown. This will allow you to create a group meeting and add multiple team members to the event and create a link you can share with the customer.

**Zoom:**
We use Zoom for all customer and sales calls. If you have Calendly properly integrated, calls that are booked through the tool will default to Zoom. You can find backgrounds to use for the calls here: [This is fine \(and other awesome PostHog wallpapers\)](/blog/posthog-wallpapers).

**Gong:**
We use Gong to record calls. Once it's set up, Gong automatically joins your Zoom calls and saves the recording to a shared library the whole team can search and review. See [sales & CS tools](/handbook/growth/sales/sales-and-cs-tools#connecting-them-together) for how to connect Gong to your Zoom calls. [BuildBetter](https://app.buildbetter.app) is still where we store historical demos and meetings, and some teams continue to use it.

**Granola:**
We use Granola for transcripts and AI notes. It runs on your laptop and transcribes whatever call you're in, so you get a transcript without adding another bot to the meeting.
