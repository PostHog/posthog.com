---
title: How we work
sidebar: Handbook
showTitle: true
---

> This page covers more of the operational detail of how our team generally works - for a broader overview of roles and responsibilities, visit the [customer success team page](/handbook/cs-and-onboarding/customer-success).

## Main metrics for each role

- Technical CSM: revenue retention

## Book of business

Each CSM is assigned customer accounts accumulating to ~$2.5m ARR to work with.  We use the account relationship history in PostHog Customer Analytics to track this against goals. Don't assign yourself as the CSM on an account - allocation is up to the CSM Team Leads and Simon.

## Weekly Customer Success standup

In addition to the weekly sprint planning meeting on a Monday, we do an account review standup on Wednesday to discuss any at-risk accounts.

The objective of the meeting is to hold each other to account, provide direct feedback, and also support each other. It is a great place to ask for help from the team with thorny problems - you should not let your teammates fail.

### How CSM bonus works

- Your OTE is split 80/20 between base salary and bonus.
- Bonus is paid on quarterly net revenue retention (NRR) above 100%, on a linear scale, and is _uncapped_.
  - The Q4 2026 target is 110% NRR. 100% NRR = 0% bonus, 105% = 50%, 110% = 100%, 120% = 200%, and so on.
  - The target may change in future quarters depending on how things go.
- **Who is paid on what:**
  - CSMs are paid on the NRR of their own book.
  - CSM Team Leads are paid on the combined NRR of their team's books.
  - The Head of CS is paid on the combined NRR of all CSM books.
- Your bonus is guaranteed at 100% for your first 3 months at PostHog. If you exceed your target during that time, you get the higher amount.
- Bonuses are paid at the end of January, April, July and October. We wait to see which invoices are paid in the first two weeks of the next quarter, then send you a breakdown of your result.

### How NRR is calculated

- We compare each account's annualized usage this quarter with the previous quarter (e.g. Q4 2026 vs Q3 2026).
  - Monthly customers: the total of their 3 invoices in the quarter × 4.
  - Annual customers: their usage-based spend in the quarter × 4. We don't use the total contract value ÷ 12.
- Usage is measured before discounts and excludes tax.
- If we credit or refund a customer for an accidental billing spike, the spike is removed from their usage so it doesn't inflate or deflate your NRR. Credits and refunds for genuine usage are left in. The full method is documented in [how commissions are calculated](/handbook/growth/revops/commissions).
- If a customer churns or gives formal notice of churn during the quarter, their ARR counts as $0 and they're removed from your book at the start of the following quarter.
- Once a quarter has been paid out, it's final. If we later find a correction, we fix it in the next quarter's calculation, not by reopening the past quarter.

### Which accounts count toward your NRR

Your book is the set of accounts where you're the CSM in [PostHog Customer Analytics]([link](https://us.posthog.com/project/2/customer_analytics/accounts)). We use the account relationship history there, so changes can be made at any time and we can still see who held what, and when.

An account counts toward your NRR for a quarter if **all** of these are true:

1. You're the assigned CSM on the second-to-last day of the quarter.
2. You've held it for at least one month of that quarter.
3. It isn't in a grace period or an approved exception (see below).
4. It isn't excluded (see "Excluded accounts" below).

#### Adding accounts

- Allocation is decided by the CSM Team Leads and Simon. Don't assign yourself as the CSM on an account.
- **Accounts added in the last month of a quarter don't count for that quarter.** They start counting from the next quarter. This means we can get a CSM on an account as soon as it needs one, without penalizing them for a quarter they barely worked.

#### Removing accounts

- **You can drop an account until the end of the first month of the quarter.** Use the first month to review your book. If an account is in the wrong region, still being worked by a TAE, below $20k, or otherwise doesn't belong with you, raise it with your Team Lead. An account dropped in this window doesn't count toward your NRR for that quarter.
- **After the first month, you keep the account for the rest of the quarter.** It counts toward your NRR unless:
  - it moves to the YC/Startup program (it's then removed and excluded automatically), or
  - Simon (or Ben B as backup) approves the removal in a public Slack thread. Approved removals are excluded from that quarter. 
- Team Leads check every book at the start of each quarter and remove accounts that have churned or are below $20k ARR. If one is missed and you're still assigned at quarter end, raise it and it will be excluded, not counted against you.

#### Grace period: accounts nobody has looked after

- If you take on an account that wasn't in another PostHog person's book before you were assigned, its churn or contraction doesn't count against you **for the quarter you were assigned it**. 
- We do this so you can help customers right-size their spend, rather than leaving them to waste money on a poor implementation.
- From the next quarter onwards the account counts as normal. If it has churned or fallen below $20k ARR by then, work with your Team Lead to get it removed before the grace quarter ends.

#### Taking over an account from someone else

- If you inherit an account from another CSM, a TAE, a TAM or an Onboarding Specialist who was actively working it, it counts toward your NRR from the quarter you take it on (subject to the one-month rule above).

#### Exception: accounts at risk of churn

- Sometimes we'll ask you to take on an account we already know is at risk, because it has churn signals and nobody has been able to engage with them. We don't want to penalize you for trying.
- If Simon (or Ben B as backup) approves it in a public Slack thread **within the first month of you taking the account**, any churn or contraction in that quarter won't count against you. This works the same way as the grace period above.
- By the end of that quarter, the account either leaves your book or becomes a normal book account and counts from the next quarter.

#### Excluded accounts

These never count toward CSM NRR:

- Accounts in the YC program, including accounts that have received YC credits.
- Accounts that churned or were recorded as churned in a previous quarter.
- Accounts in a grace period, or approved as an at-risk exception, for the quarter they apply to.
- Manual exclusions approved by Simon or Ben B. These are recorded in the NRR exclusions sheet so there's a record of every one.

## Working with engineering teams

We hire Technical CSMs. This means you are responsible for dealing with the vast majority of product queries from your customers. However, we still work closely with engineering teams!

**Product requests from large customers**

Sometimes an existing or potential customer may ask us to fix an issue or build new features. These can vary hugely in size and complexity. A few things to bear in mind:

- Engineers at PostHog [talk to customers](/handbook/making-users-happy#engineers-talk-to-users-and-provide-support). It's much better to bring engineers onto calls to speak to large customer to talk to them directly than just do the call yourself and copy and paste notes back and forth. This is especially useful if a) the team was already considering building the feature at some point, b) it's an interesting new use case, or c) the customer is really unhappy for valid reasons and could churn.
- Provide as much internal context as you can. If a customer sends a one-liner in Slack, don't just copy and paste into a product team's channel - find out as much as you reasonably can first, ask clarifying questions up front etc. Otherwise the relevant team will just ask you to do this anyway.
- We already have [principles](/handbook/how-we-make-money#principles-for-dealing-with-big-customers) for how we build for big customers - if you have a big customer with a niche use case that isn't applicable to anyone else, you should assume we won't build for them (don't be mad!)
- For any [feature requests](/handbook/cs-and-onboarding/feature-requests) customers care deeply about, we should file and track those in Vitally.

**Inviting a product engineer into a customer conversation**

Separately from product requests, there are moments where it's worth seeing whether a product engineer wants to join a customer conversation - as much for what _they_ get out of it as the customer. Always pitch this as an open invitation ("this might be an interesting call, would anyone like to join?"), never as "we need an engineer on this call." Situations where it's usually worth asking:

- **A customer is moving to or from another tool.** If someone's weighing PostHog feature flags against LaunchDarkly, or shifting their error tracking to Sentry - in either direction - the relevant product engineer often wants in. It's a first-hand look at why a customer picks one platform over another and the trade-offs they weigh, which is useful to us whichever way they're moving.
- **The customer's on early-access or giving feedback.** For anything in alpha, beta, or just shipped - or a not-yet-GA product they're already using and forming opinions on - engineers get a lot from hearing live first impressions, and the customer gets direct access to the people building it. A customer actively feeding back on pre-release features is exactly the kind of call worth pulling the team into.
- **You're meeting the customer in person.** An on-site visit is a great chance to bring along a product engineer who's local, if there's one whose area matches what the customer uses (e.g. someone from the experiments team for a heavy experiments customer). This doesn't need to fit the two cases above - a good match nearby is reason enough. Have an agenda, and keep it to topics relevant to whoever's joining.

**Why not just always invite one?**

CSMs here are technical enough to solve real problems without asking our engineers. [You're the expert!](/handbook/cs-and-onboarding/customer-success) Bringing an engineer in is the exception, earned by genuine two-way value (one of the cases above), not a default or a comfort blanket. If you can't say what the engineer would get out of it, that's your answer.

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

## Extended Time Off
During extended periods away from work (generally more than two weeks) it's important that we maintain customer relationships - we don't want to leave emails or Slack messages unanswered. For planned time off, it's recommended that you make a list of your accounts, then add an appropriate colleague to the Slack channel. Try and balance the workload, but our policy of working transparently (eg. ensuring conversations on Slack don't happen in DMs) makes it easier for others to dip in seamlessly.

The expectation is that this temporary CSM will ensure your customers aren't completely ignored. This may mean answering questions themselves or opening support tickets on a customer's behalf, but not attend routine meetings (eg. monthly check-ins) or pro-active work. For standing meetings in your absence customers should be notified that the meeting is cancelled but any questions can be asked through normal channels.

For longer periods away, Dana may look to reassign some or all of your accounts.

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
