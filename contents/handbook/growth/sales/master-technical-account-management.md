---
title: Mastering technical account management
sidebar: Handbook
showTitle: true
---

<!-- Could this just be an edit to an existing page?!?! -->

The process is pretty simple: optimize their setup, save them money, get intros to other team leads and power users, then cross-sell. Everything below is in service of that loop.

## 1. What is a Technical Account Manager?

A TAM really does three jobs in one:

- **Support engineer.** You deep dive and help fix things. You don't punt to support unless you have to.
- **Solutions architect.** You understand the customer's stack and recommend the right setup for net new implementations. 
- **Salesperson.** You retain revenue, sell credits, increase usage + adoption and cross-sell new products.

## 2. An overview of the sales process

Here's the loop:

1. Build and prioritize your book.
2. Identify the right people (power users + champions).
3. Find value add recommendations or cost optimizations for engineers, get them implemented -> use this 'win' to ask for intro's to the commercial folks.
4. Save them money by pre-purchasing credits -> use this to ask for intro's to other teams.
5. Ask for intros to other teams and cross-sell.

Note: you don't have to follow this exactly. For example, if you can get intro's to team leads straight away - you probobaly should take them...

Plus the less 'every day' things:

1. Offer training sessions.
2. Set up live signals (event stream to Slack) so you can DM people in the moment.
3. Run weekly audits on your book. When you're starting, do a daily deep dive on one account.

## 3. Your book

### Prioritizing your book

You'll be given 10-15 accounts. See [Account allocation and handover](/handbook/growth/sales/account-allocation).

You've got two jobs that both feed quota: stop revenue from leaking (retention) and grow it (expansion + cross-sell). Every account in your book deserves attention, but if we're honest; you won't be able to give them all equal attention. A simple 2x2 can be a good way to think about how to spend your time:

- **Spend (MRR/ARR):** how much quota damage if they churn or shrink.
- **Health:** how likely they are to churn or shrink. Engagement, setup quality, active champions, recent usage trend, support tickets — roll all of that up into one gut call (healthy / not healthy). Vitally health scores are a decent starting point but don't outsource the judgment.

|                          | **Not healthy**                                                                | **Healthy**                                                                       |
| ------------------------ | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| **Spending a lot**       | **1. Fix first.** Biggest quota risk. Get on a call this week.                 | **2. Expand.** Credits, cross-sell, multi-thread into other teams.                |
| **Not spending a lot**   | **4. Triage.** Is there a real path to meaningful growth? If not, maybe they belong elsewhere. | **3. Nurture + grow.** Light touch, find the cross-sell angle.                    |
 
Work the quadrants in order: 1 → 2 → 3 → 4.

**Why this order:**

1. Losing a big spender is the fastest way to miss quota. Unhappy whales churn loud.
2. Happy customers are where your [cross-sell multiplier](/handbook/growth/sales/how-we-work#commission) actually compounds. Every additional paid product bumps commission by 0.2x, so a healthy $50k account on 2 products is worth more effort than it looks.
3. Healthy smaller accounts are your future big accounts. Cheap to keep happy, and a well-timed cross-sell can flip them into quadrant 2.
4. Unhealthy small accounts are the most tempting time sink and usually the worst ROI. Be honest about whether there's a real path to growth. If not, they might belong with CS or self-serve. See [Account allocation and handover](/handbook/growth/sales/account-allocation#removal-criteria).

### Cross-sell opportunities

After your deep dive on each account (see [section 3](#3-your-book)), map out the cross-sell angles per account. Which primary products are they missing? Which team (growth, eng, product, support) would be the natural buyer? Who's the intro? See [Cross-sell motions](/handbook/growth/sales/cross-sell-motions) and [Use-case selling](/handbook/growth/use-case-selling/use-case-selling).

Put a plan in place and work it. The goal is moving TAM-managed accounts from the current ~4.8 products adopted toward 6.

### Weekly rhythm

Re-plot your book semi-reguraly (start with every Monday until you find a cadence that works for you). Accounts move quadrants so staying on top of this is important to being successful (and it's useful for your customers if you can be proactive and not just re-active)

### Finding champions and power users

In Vitally, sort Users by Last Seen and Sessions. The most engaged user isn't always the most senior, but they're usually the easiest first conversation.

### Account prep

#### Vitally

- **Indicators:** pull any existing signals.
- **ARR/MRR:** size the opportunity. Cross-reference Metabase for revenue breakdown.
- **Event / Replay / FF count L30D:** are they growing?
- **Engagement metrics:** are they actually using the product?
- **Active convos:** is someone else already working this account?
- **Users:** sort by Last Seen and Sessions to find who to reach out to.

#### Metabase

- **Per-product spend:** what's driving revenue growth? New product activation or growing usage in one?
- **Billing limits:** how conservative are they? Fewer is better.
- **Project-to-host mapping:** check the top host to see what their product actually is.
- **Identified events:** do they care about identifying users? How well are they doing it?
- **Event count by project:** find the biggest project to focus on.
- **Identify / groupidentify / set per session:** low-hanging optimization fruit for outreach.
- **Event volume donut:** spot autocapture or mobile SDK noise (like Application Opened). The % breakdown lets you estimate cost savings.
- **Total event counts stacked area:** which events are driving growth over time.
- **Destinations:** data going out? Amplitude is higher risk than Snowflake than Google Ads, etc.

#### PostHog

- **Org page:** watch recent recordings to see who's using it and how.
- **Org event page:** track specific events (e.g., pathname contains `billing` to see who hit the billing page and when).

#### Impersonation

Mostly for screenshots in outreach, or helping with a specific dashboard/flag/experiment.

- **Billing page:** see what they see (better than Stripe/Metabase for this).
- **Activity logs:** find who made an org change (e.g., toggling session replay).
- **Activity page:** event volume + double-click into a person to understand a typical journey.
- **Data management:** review event instrumentation and properties. Properties like `StoreID` or `Company Name` are a tell for Group Analytics.

## 4. Getting on calls

Start with the [getting people to talk to you playbook](/handbook/growth/sales/getting-people-to-talk-to-you).

Then: create a shared Slack channel and invite team members who are active in their PostHog org. It's cheap, it's not annoying if you keep the channel useful, and it's the fastest path to valuable comms for them + multi-threading for us.

## 5. Offer a training session

Low-pressure, high-value, gets a calendar invite on the books. Tailor to what you saw in their instrumentation. See [Customer training](/handbook/growth/sales/customer-training).

Note: try to avoid deep diving specific issues on these and book follow up calls for later. Getting deep on a training sessions can waste the groups time and only focus on 1 specific thing you might not be able to fix then and there vs being able to train up the rest of the team. 

## 6. Find and share value add recommendations or cost optimizations to the teams engineers

Optimization wins, features they don't know about, setup tweaks. Post them in the shared Slack channel and @-mention specific people instead of addressing nobody.

"Hey @sarah, noticed your autocapture is 80% of event volume, I did a deep dive on your current insights/dashboards and here's a list I've started of custom events that if implemented would answer your product questions, save your team quite a bit of money + reduce noise."

## 7. Set up a live event stream to Slack

Pipe your accounts' events into a dedicated Slack channel so you can see who's doing what in real time. When someone's deep in a flag config or stuck on a funnel, DM them and ask what they're trying to do. Reply rates are strong because they're actively thinking about PostHog and usually stuck.

See [User event streams](/handbook/growth/sales/user-event-streams).

## 8. Build trust, then expand

Do the above consistently and the power users and champions identify themselves. Once you have a geneuine relationship + have been useful enough, ask for intros to other team leads. That's your cross-sell opening.

Reminder on the core loop: optimize setup, save them money, get intros, cross-sell. If you actively optimize a customer's spend down, that usage drop can be excluded from quota. See [How we work](/handbook/growth/sales/how-we-work).

## 9. Conducting calls

The full playbook lives in [New business sales](/handbook/growth/sales/new-sales). TAM-specific notes:

- **Prep:** research accounts (see [section 3](#3-your-book)). Environment check: tabs, mic, camera, lighting.
- **Discovery:** the 3 crimes are tell, accept, guess. See [How to do discovery](/handbook/growth/sales/how-to-do-discovery).
- **Demo:** don't present decks to engineers, spend the time in-product. Use real customer stories. See [New business sales](/handbook/growth/sales/new-sales#demo).
- **Delivery:** watch your nonverbals (posture, eye contact), verbals (pace, cut the "erms"), and content (specifics over features).
- **Close:** always end with a concrete next step, owner, and date. Ask for the thing.
- **Contracts:** [QuoteHog](/handbook/growth/sales/contracts) for pricing, Pandadoc for signing. Confirm billing contact, ACH vs card, signatory. See [Contract rules](/handbook/growth/sales/contract-rules).

---

## Tips

- Practice your recording and ask the teammate for feedback.
- Collect real examples to share and show. People remember stories, not feature lists.
- Worth cross-referencing with [Expansion, cross-sell & retention](/handbook/growth/sales/expansion-and-retention) since some of this overlaps. Link rather than duplicate where you can.
