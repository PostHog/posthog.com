---
title: Customer health tracking
sidebar: Handbook
showTitle: true
---

We use Vitally as a customer success platform.  You can log in via Google SSO to view customer data but will need [Mine](/community/profiles/29862) or [Simon](/community/profiles/28895) to grant you admin access to let you manage your accounts. It integrates with our other systems such as PostHog, PostHog Support, and Salesforce to give you a complete view of what's going on with your customers.

## Health scoring

### Overview

Health scores are a great way to assess whether your customer is at risk of churn or in a good state and are a common pattern in Customer Success tracking.  We compute an overall <PrivateLink url="https://posthog.vitally-eu.io/settings/health/accounts">health score</PrivateLink> out of 10 based on the following factors and weighting.  You can read more about how Vitally health scores work in their docs <PrivateLink url="https://docs.vitally.io/account-health-scores-and-metrics/health-scores">here</PrivateLink>.

Health score metrics are divided into two categories: Customer Engagement (25%) and Product Engagement (75%).

[**Customer engagement**](/handbook/cs-and-onboarding/health-tracking#customer-engagement)

| Score Name                | Measuring                                        | Weighting    | 
|---------------------------|--------------------------------------------------|--------------|
| User engagement           | Are they using PostHog regularly?                | 15%          | 
| Product experience        | Are there negative experiences with the product? | 5%           | 
| Company engagement        | Are they engaging with PostHog humans?           | 5%           | 

[**Product engagement**](/handbook/cs-and-onboarding/health-tracking#product-engagement)

| Score Name                  | Measuring                                                                            | Weighting    | 
|-----------------------------|--------------------------------------------------------------------------------------|--------------|
| Product Analytics           | Event volume and users analyzing insights                                            | 33%          | 
| Session replay              | Replay volume and users analyzing replays                                            | 20%          | 
| Feature flags & Experiments | Flag requests, users creating feature flags, users creating or viewing experiments | 17%          | 
| Surveys & Data warehouse    | Users creating and viewing surveys, volume of rows synced                            | 5%           | 

### Customer engagement

Non-product metrics, looking holistically at: Are customers using PostHog? Do they have friction when using PostHog? Are they engaging with PostHog humans?

#### User engagement

This tracks whether users are logging in to PostHog. It can tell us if customers are getting value from PostHog (regardless of the products they're using). Customers that have a low active user percentage, or only have 1-3 users engaging with PostHog are at risk of churn.

| Measure                                       |  Poor   | Concerning | Healthy |
|-----------------------------------------------|---------|------------|---------|
| Last seen in product                          | >5 days | 1-5 days   | ≤ 1 day |
| Active user percentage                        | <20%    | 20-40%     | ≥40%    |
| Percentage decrease in active user percentage | >20%    | 5-20%      | ≤5%     |
| Users engaging with features                  | <3      | 3-10       | ≥10     |

#### Product experience

This looks at the experience of using PostHog. 

Creating a lot of tickets can mean users are not satisfied with PostHog, haven’t implemented PostHog correctly or aren’t using the product correctly (opportunity to offer training)! Similarly, visiting docs can mean users are trying to do something and could need help.

We also look at query failure rate. Failed queries are common (users can cancel a query, there can be SQL syntax errors, etc.), however, a high failure rate means users aren't getting the data they need from PostHog. You should [help investigate and provide recommendations](https://www.loom.com/share/dcd1da54963d46d79478425be0f22239?sid=3e85c8a0-3781-41f3-ab2a-2404991deafb).

| Measure                                       | Poor | Concerning | Healthy |
|-----------------------------------------------|------|------------|---------|
| Tickets created in last 30 days               | >10  | 5-10       | ≤5      |
| Urgent tickets that remain unresolved         | >2   | 0-2        | 0       |
| Docs visited in last 7 days                   | >100 | 20-100     | ≤20     |
| Query failure rate in last 7 days             | >13% | 5-13%      | ≤5%     |

#### Company engagement

This looks at a customer's engagement with PostHog as a company. Most of PostHog's customers are happily self served so this is weighted very little in the overall healthscore. 

| Measure                     | Poor     | Concerning | Healthy  |
|-----------------------------|----------|------------|----------|
| Most recent meeting         | >90 days | 30-90 days | ≤30 days |
| Most recent ticket          | >90 days | 30-90 days | ≤30 days |
| Total product count         | <3       | 3-6        | >6       |

### Product engagement

Across PostHog's products, we look at 2 factors – data volume & user engagement.

**Data volume**

This tracks _percentage decrease_ in data volume over the last 30 days. We use <PrivateLink url="https://posthog.vitally-eu.io/settings/successMetrics/accounts">success metrics</PrivateLink> to track billable usage over the last 30 days and compare it with the previous 30 days on a rolling basis. The percentages you see in the tables below are the _decrease_ between the previous and current period.

**User engagement**

Data volume is a lagging indicator, by the time it drops, customers may have already decided to churn. We combine data volume with product-specific user engagement, measuring the percentage of _active users_ interacting with product features over the last 14 days.

> There are products we don't include in the health score. Vitally has a limit of max 20 health metrics so we are excluding other products for now as the overall ARR from them are still very low compared to the others.

#### Product analytics

| Measure                                        | Poor | Concerning | Healthy |
|------------------------------------------------|------|------------|---------|
| Event count last 30 days (percentage decrease) | >20% | 5-20%      | <= 5%   |
| Active users analyzing insights                | <20% | 20-40%     | ≥40%    |

> Product analytics usage include: analyzing insights or dashboards, creating or saving insights, creating or updating dashboards

#### Session replay

| Measure                                         | Poor | Concerning | Healthy |
|-------------------------------------------------|------|------------|---------|
| Replay count last 30 days (percentage decrease) | >20% | 5-20%      | <= 5%   |
| Active users watching replays                   | <20% | 20-40%     | ≥40%    |

#### Feature flags & experiments

| Measure                                            | Poor | Concerning | Healthy |
|----------------------------------------------------|------|------------|---------|
| Decide requests last 30 days (percentage decrease) | >20% | 5-20%      | <= 5%   |
| Active users creating feature flags last 30 days*  | <5%  | 5-20%      | ≥20%    |
| Active users using experiments**                   | <5%  | 5-20%      | ≥20%    |

> Feature flag usage includes: creating or updating feature flags. We look at this over 30 days instead of the usual 14 as feature flags provide value over a longer time frame.
> Experiments usage includes: creating experiments, viewing experiments, and launching experiments.

#### Surveys & data warehouse

| Measure                                            | Poor     | Concerning | Healthy |
|----------------------------------------------------|----------|------------|---------|
| Active users viewing surveys                       | <5%      | 5-20%      | ≥20%    |
| Rows synced last 30 days (percentage decrease)     | >20%     | 5-20%      | <= 5%   |


## Account indicators

Health scores are useful for tracking the long-term trends in an account, but occasionally there are more immediate point-in-time events that we should react to.  These are tracked as indicators in Vitally and fall into one of two categories

 - Risk indicators - show up red against the account name and indicate potential churn
 - Opportunity indicators - show up green against the account name and indicate a potential opportunity for growth

### Risk indicators

These are automatically applied via Vitally playbooks (see the Risk category <PrivateLink url="https://posthog.vitally-eu.io/settings/playbooks">here</PrivateLink>):

#### Forecasted MRR decrease

Applied if the Forecasted MRR Change is less than -10%, indicating a drop in MRR.  We should look into the account to understand whether it is just a reduction in usage, or they are trending towards churn.

#### Increased billing page visits

Applied if there have been more than 1 visits to the billing page in the previous 7 days.  Can be a good indicator that the customer needs help understanding or reducing their bill.

#### Query failure rate > 10%

Applied if the Query failure rate over the last 7 days (Success metric) is greater than 10%.  Use Vitally to see which user was impacted and see if you can help optimize their queries or flag to our team for investigation.

#### Sudden decrease in event volume

Applied if the Event count last 7 days (Success metric) decreases more than 20% versus the previous 7 days.  Indicates that they may have turned event tracking off.

#### No insights analyzed past week

Applied if `insight analyzed` was last seen greater than 7 days ago.  Indicates that they may have stopped using PostHog to track analytics data.

#### Payment failed

Applied if there is a failed payment on their Stripe account.  We should reach out to get this resolved ASAP.

#### Startup credit will run out this billing cycle

Applied if they are currently in the Startup plan segment but also have Forecasted MRR, meaning that they are on track to make a payment this month.

#### Organization owner recently removed

Applied if the Owner role has been removed from a user in the last 14 days.  May be a sign that you've lost a champion.

### Opportunity indicators

These are automatically applied via Vitally playbooks (see the Opportunity category <PrivateLink url="https://posthog.vitally-eu.io/settings/playbooks">here</PrivateLink>):

#### Forecasted MRR growth

Applied if the Forecasted MRR Change is more than 10%, indicating an increase in MRR.  We should look into the account to understand whether it is likely to be deliberate or an accidental spike.

#### Organization owner recently added

Applied if the Owner role has been added to a user in the last 14 days. This is a good opportunity to reach out to a potential champion if you've not met them before. 

## Coming soon - Health scoring in PostHog Customer Analytics

> This section is a work in progress as we migrate from Vitally to PostHog Customer Analytics.  Trending of materialized views isn't currently supported in PostHog, so whilst the computed score will be more accurate than Vitally, we can't yet see historic trends of customer health.

When looking at an account in [Customer Analytics](https://us.posthog.com/project/2/customer_analytics/accounts), you can access the `account_health_scores` view in the column selector.

> We purposefully haven't included any data volume increase / shrinkage in this scoring.  These are captured elsewhere by spike alerts and should be treated differently versus a health score trend (ie. immediate action is needed)

### Implementation

`account_health_scores` is a materialized view (refreshed once every 24 hours) in the PostHog data warehouse that scores every paying or trialing account on how healthily they're using the product. It helps us understand whether users are continuing to use the products they have implemented, or whether they are reducing their usage of PostHog.
 
It provides three main numbers per account, all out of 10:
 
| Column | What it tells you |
| --- | --- |
| `engagement_health` | Are the people who use PostHog here still using it? Trend-based, measured against the account's own history. |
| `stickiness` | For products without continuous user engagement how embedded is PostHog in their stack? Absolute, not trend-based. |
| `health_score` | The headline blend: `0.615 × engagement_health + 0.385 × stickiness`. |
 
Plus a per-product breakdown (`e_*`) and each product's share of the engagement score (`contrib_*`).
 
It runs entirely on PostHog-native data - events, the billing usage report, and our own revenue tables. 

### Who gets scored
 
An account appears in the view if it is either:
 
- **Paying** — positive current MRR in `iwa_summary_customer_month` (our canonical revenue table), looking at invoice periods ending in the last 45 days; or
- **Actively trialing** — `prod_postgres_billing_customer` shows a future `free_trial_until`, or the `is_enterprise_trial` flag, and the org isn't deactivated.

### Why the score is built this way
 
#### Why two axes instead of one
 
Engagement and stickiness fail in different directions, and a single number hides that.
 
**Engagement is a trend, measured against the account itself.** A five-person startup with 3 weekly active users is not less healthy than a 500-person enterprise with 30 — it's the *trend* that matters. A small account holding steady scores well, and a large account that's halved scores badly, which is the right way round for a CSM triaging a book.
 
**Stickiness is an absolute measure of how hard PostHog is to remove.** An account can have flat engagement and still be extremely safe because they've got feature flags in production code, a data warehouse sync, and three destinations piping data out. Ripping that out is a major undertaking. Conversely, an account can be highly engaged and still trivially churnable if all they do is look at dashboards.
 
Two accounts at 6.5 overall can be completely different problems - always read the two components, not just the headline.
 
#### Why 61.5 / 38.5
 
 If we take into account customer relationship (not included here, still very much a work in progress for Customer Anayticds), the full health model weights product engagement at 0.40 and stickiness at 0.25, with the remaining 0.35 going to relationship. This view only covers the two product axes, so those weights are renormalised to sum to 1: `0.40 / 0.65 = 0.615` and `0.25 / 0.65 = 0.385`. We will likely keep these and pull relationship into an overall score later down the line.

### How stickiness is measured
 
Stickiness is absolute embeddedness — breadth of engaged products plus depth of active infrastructure.
 
```
stickiness = min( ( engaged_product_weight
                  + 2 × [flags   > 0] × (1 + min(flags/20,  1))
                  + 3 × [dwh     > 0] × (1 + min(dwh/10,    1))
                  + 3 × [dests   > 0] × (1 + min(dests/5,   1))
                  + 2 × [transf  > 0] × (1 + min(transf/5,  1))
                  + 1 × [exports > 0] × (1 + min(exports/3, 1))
                  ) / 12, 1 ) × 10
```
 
`engaged_product_weight` is the summed weight (see below) of every product the account has a measurable baseline for — so an account using Product Analytics (3) and Session Replay (2) starts at 5.

### How we measure engagement for each paid product
 
Two sources feed each product axis: UI events, and MCP tool calls attributed by category.
 
| Product | Weight | UI event(s) | MCP `$mcp_tool_category` | MCP `$mcp_tool_name` override |
| --- | --- | --- | --- | --- |
| Product Analytics | 3 | `insight viewed`, `viewed dashboard` | `Product analytics`, `Dashboards`, `Insights & analytics`, `Query wrappers` | — |
| Session Replay | 2 | `recording viewed` | `Session replays`, `Replay vision` | — |
| Error Tracking | 2 | `error_tracking_issue_viewed` | `Error tracking`, `Error tracking alerts` | — |
| Logs | 2 | `logs query executed` | `Logs` | — |
| AIO | 2 | `llm analytics usage` | `AI observability` | `query-llm-trace`, `query-llm-traces-list` |
| Experiments | 2 | `experiment viewed` | `Experiments` | — |
| Web Analytics | 2 | *(none — MCP only)* | `Web analytics` | `query-web-stats`, `query-web-overview`, plus six `heatmaps-` tools |
| PostHog AI | 1 | `max conversation turn completed` | — | — |
| Surveys | 1 | `survey viewed` | `Surveys` | — |
 
> The rest of this page goes into the inner workings and reasoning behind the score - team members need not read further unless they are really interested, it's more for reference to capture why we compute things the way we do.

#### How engagement is calculated
 
For each account and each in-scope product, over an 84-day lookback:
 
1. **Count weekly active users.** Distinct persons who fired that product's qualifying event, bucketed by week. UI events and MCP calls both count.
2. **Current level** — mean WAU over the last 21 days.
3. **Baseline** — median WAU over weeks older than 28 days. Median rather than mean, so a single spike week doesn't inflate the bar the account has to clear.
   - The gap between 21 and 28 days is a deliberate one-week buffer, keeping the comparison period cleanly separated from the current one.
   - **Silent weeks are skipped, not counted as zero.** Only weeks with at least one active user exist as rows, so both the mean and the median are computed over *active* weeks only. An account active in 1 of the last 3 weeks with 1 user scores a current level of 1.0, not 0.33. This is systematically generous to intermittent usage — worth knowing when a score looks better than the account feels.
4. **Score the product:**
   ```
   e_p = NULL                              if no baseline (never meaningfully active)
   e_p = 0                                 if there is a baseline but zero current activity
   e_p = min(current / baseline / 0.85, 1) otherwise
   ```
 
5. **Blend across products**, weighted:
   ```
   engagement_health = Σ(weight × e_p) / Σ(weight)     over products where e_p is not NULL
   ```
 
`contrib_*` splits that blend back out per product — they sum to `engagement_health`, so you can see at a glance which product is dragging a score down.
 
##### Reading `e_*`: NULL and 0 mean very different things
 
- **`NULL`** — the account has no usable baseline for that product. They've never really used it. This is a **cross-sell opportunity**, not a problem.
- **`0`** — the account *was* active and has gone completely silent. This is a **cliff**, and it's the single most actionable signal in the view.
An account showing `e_session_replay = 0` deserves a conversation this week. One showing `NULL` deserves a demo at some point.

##### Why the 0.85 grace band
 
Engagement compares current activity to the account's own historical median, but real usage is noisy — holidays, sprint cycles, one person on leave. An account only needs to hold **85% of its own baseline** to score a full 10. Below that, the score falls off proportionally. This stops the score flapping on ordinary week-to-week variance.