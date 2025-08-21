---
title: Customer health tracking
sidebar: Handbook
showTitle: true
---

We use Vitally as a customer success platform.  You can log in via Google SSO to view customer data but will need [Mine](/community/profiles/29862) or [Simon](/community/profiles/28895) to grant you admin access to let you manage your accounts. It integrates with our other systems such as PostHog, Salesforce and Zendesk to give you a complete view of what's going on with your customers.

## Health scoring

### Overview

Health scores are a great way to assess whether your customer is at risk of churn or in a good state and are a common pattern in Customer Success tracking.  We compute an overall <PrivateLink url="https://posthog.vitally-eu.io/settings/health/accounts">health score</PrivateLink> out of 10 based on the following factors and weighting.  You can read more about how Vitally health scores work in their docs <PrivateLink url="https://docs.vitally.io/account-health-scores-and-metrics/health-scores">here</PrivateLink>.

Health score metrics are divided into two categories: Customer Engagement (20%) and Product Engagement (80%).

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
