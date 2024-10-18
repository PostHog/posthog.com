---
title: Customer health scoring
sidebar: Handbook
showTitle: true
---

# Overview 

We use Vitally as a Customer Success platform.  You can log in via Google SSO to view customer data but will need [Mine](/community/profiles/29862) or [Simon](/community/profiles/28895) to grant you admin access to let you manage your accounts.  It integrates with our other systems such as PostHog, Salesforce and Zendesk to give you a complete view of what's going on with your customers.

## Health Scoring

Health Scores are a great way to assess whether your customer is at risk of churn or in a good state and are a common pattern in Customer Success tracking.  We compute an overall [health score](https://posthog.vitally-eu.io/settings/health/accounts) out of 10 based on the following factors and weighting.  You can read more about how Vitally health scores work in their docs [here](https://docs.vitally.io/account-health-scores-and-metrics/health-scores).  We have different weightings for scoring depending on whether a customer is New (organization created in the last 90 days) or not:

| Score Name                | Measuring                                      | New Customer | Established Customer |
|---------------------------|------------------------------------------------|--------------|----------------------|
| Activation                | Onboarding completion                          | 50%          | 10%                  |
| Primary Features Activity | Sustained usage of key PostHog features        | 40%          | 30%                  |
| Data Volume               | Are they continuing to send data from our SDKs | 30%          | 10%                  |
| Engagement                | Are they generally happy with PostHog          | 20%          | 10%                  |

### Activation

This aligns with the Growth [definition of activation](https://us.posthog.com/project/2/dashboard/130345) and tracks whether a customer has completed onboarding for each of our products.  Data shows that if customers successfully complete onboarding they are more likely to still be customers three months later.  The following metrics look at the count of an event or Element since the customer was first seen in Vitally.

| Measure             | Product Area      | Metric type | Poor | Concerning | Healthy |
|---------------------|-------------------|-------------|------|------------|---------|
| team member invited | Platform          | Event count | 0    | 1-2        | 3+      |
| Insights            | Product Analytics | Element     | 0    | 1-2        | 3+      |
| recording analyzed  | Session Replay    | Event count | 0    | 1-4        | 5+      |
| Feature Flags       | Feature Flags     | Element     | 0    | 1          | 2+      |
| Surveys             | Surveys           | Element     | 0    | 1          | 2+      |

### Primary Features Activity

This tracks whether users are continuing to log in to PostHog and use our features.  If these measures start to trend down, we know it can be an early indicator of churn/friction.  We use Success metrics here to track the total number of PostHog events over the last 14 days and then compare them with the previous 14 days on a rolling basis.  The percentages you see in the table below are the _decrease_ between the previous and current period.

| Measure                                   | Product Area      | Poor   | Concerning | Healthy |
|-------------------------------------------|-------------------|--------|------------|---------|
| Insight + Dashboard Analyzed last 14 days | Product Analytics | \> 20% | 5-20%      | <= 5%   |
| Recordings Analyzed last 14 days          | Session Replay    | \> 20% | 5-20%      | <= 5%   |
| Experiment Viewed last 14 days            | Feature Flags     | \> 20% | 5-20%      | <= 5%   |
| Surveys Viewed last 14 days               | Surveys           | \> 20% | 5-20%      | <= 5%   |

### Data Volume

This tracks the change in data that users are sending to us to capture their user behavior.  Although directly related to billing, if customers start to reduce the data they send to us it is often too late to react as they have already made the decision to churn, which is why we weight this lower than the measure above.  We use Success metrics here to track the billable usage over the last 30 days and then compare them with the previous 30 days on a rolling basis.  The percentages you see in the table below are the _decrease_ between the previous and current period.


| Measure                            | Product Area          | Poor   | Concerning | Healthy |
|------------------------------------|-----------------------|--------|------------|---------|
| Event count last 30 days           | Product Analytics     | \> 20% | 5-20%      | <= 5%   |
| Replay count last 30 days          | Session Replay        | \> 20% | 5-20%      | <= 5%   |
| Feature Flag Requests last 30 days | Feature Flags         | \> 20% | 5-20%      | <= 5%   |
| Rows synced last 30 days           | Data Warehouse | \> 20% | 5-20%      | <= 5%   |

> We don't yet track Surveys here, as the overall ARR from this product is still very low compared to the others.

### Engagement

Here we track the sentiment of the customer, looking at the most recent NPS or CSAT score, as well as whether our technical champion has logged in recently.

| Measure                            | Poor         | Concerning     | Healthy       |
|------------------------------------|--------------|----------------|---------------|
| Current NPS Score                  | 0-6          | 7-8            | 9-10          |
| Account owner last seen            | 31+ days ago | 15-30 days ago | 0-14 days ago |

## Account Indicators

Health scores are useful for tracking the long-term trends in an account, but occasionally there are more immediate point-in-time events that we should react to.  These are tracked as indicators in Vitally and fall into one of two categories

 - Risk indicators - show up red against the account name and indicate potential churn
 - Opportunity indicators - show up green against the account name and indicate a potential opportunity for growth

### Risk indicators

These are automatically applied via Vitally playbooks (see the Risk category [here](https://posthog.vitally-eu.io/settings/playbooks)):

#### Forecasted MRR Decrease

Applied if the Forecasted MRR Change is less than -10%, indicating a drop in MRR.  We should look into the account to understand whether it is just a reduction in usage, or they are trending towards churn.

#### Increased Billing Page Visits

Applied if there have been more than 1 visits to the billing page in the previous 7 days.  Can be a good indicator that the customer needs help understanding or reducing their bill.

#### Query failure rate > 10%

Applied if the Query failure rate over the last 7 days (Success metric) is greater than 10%.  Use Vitally to see which user was impacted and see if you can help optimize their queries or flag to our team for investigation.

#### Sudden decrease in event volume

Applied if the Event count last 7 days (Success metric) decreases more than 20% versus the previous 7 days.  Indicates that they may have turned event tracking off.

#### No insights analyzed past week

Applied if `insight analyzed` was last seen greater than 7 days ago.  Indicates that they may have stopped using PostHog to track analytics data.

#### Payment Failed

Applied if there is a failed payment on their Stripe account.  We should reach out to get this resolved ASAP.

#### Startup credit will run out this billing cycle

Applied if they are currently in the Startup plan segment but also have Forecasted MRR, meaning that they are on track to make a payment this month.

#### Organization Owner Recently Removed

Applied if the Owner role has been removed from a user in the last 14 days.  May be a sign that you've lost a champion.

### Opportunity indicators

These are automatically applied via Vitally playbooks (see the Opportunity category [here](https://posthog.vitally-eu.io/settings/playbooks)):

#### Forecasted MRR Growth

Applied if the Forecasted MRR Change is more than 10%, indicating an increase in MRR.  We should look into the account to understand whether it is likely to be deliberate or an accidental spike.

#### Organization Owner Recently Added

Applied if the Owner role has been added to a user in the last 14 days.  This is a good opportunity to reach out to a potential champion if you've not met them before. 
