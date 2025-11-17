---
title: New hire onboarding exercise
sidebar: Handbook
showTitle: true
---

This exercise can help you learn more about your customer’s usage of PostHog while helping you ramp up on your own PostHog skills!

## Tactical questions
 
To get started you’ll need all the organization IDs for your accounts. You can get those via SQL query: `SELECT DISTINCT posthog_org_id_c, NULL as empty_column FROM salesforce.account WHERE owner_id = 'your_salesforce_id'`
You can find your salesforce ID by going to your profile and copy the text in the website URL after “/User/” then export the results via CSV. (The empty column is there so we have commas as delimiter for the org ids, this allows you to directly copy and paste all the org ids into a filter input text field.)

### Cohorts
1. Who are all the users in your accounts?
2. Who are all the admins / owners in your accounts? (Hint: check the current_organization_membership_level property)
3. Who are the new users in your account this week?
4. Who are the power users in your account? (Power users can be across multiple products, or you can split it by product. Define a power user as you see fit!)

### Activation
1. For the new users on your accounts, how many came back to analyze an insight, watch a recording, create a feature flag, etc. within their first week?
2. What are the monthly activation rates across all your accounts for product analytics? (Hint: read this [activation metric post](https://posthog.com/product-engineers/activation-metrics) and [these insights](https://us.posthog.com/project/2/insights?search=activation))

### Retention / Usage 
1. Which of your new users have retained their usage after their first 3 months?
2. Which of your organizations have viewed /docs/ pages more than once in the past week? How many /docs/ pages views have there been across accounts for the past week?

### Churn

1. Have any of your accounts churned from a specific product within the last 3 months? How many/if any across all your organizations within the last 3 months?

## Strategic questions

1. Are any of your users getting stuck setting up a product?
2. What alerts / CDP destinations can you set up to help you monitor drastic changes in your account metrics in PostHog?
3. What analysis would help understand why accounts take so long to convert from first login to consistent usage?


### Example answers
If you get stuck or want to verify your implementation against an example, below are existing cohorts, insights, etc. to match each question.

__Cohorts__:
1. [Example cohort](https://us.posthog.com/project/2/cohorts/144987)
2. [Example cohort](https://us.posthog.com/project/2/cohorts/146377)
3. [Example cohort](https://us.posthog.com/project/2/cohorts/154066)
4. [Example cohort](https://us.posthog.com/project/2/cohorts/154067) 

__Activation__:
1. [Example insight](https://us.posthog.com/project/2/insights/aBpMC6Zv)

__Retention / Usage__:
1. [Example insight](https://us.posthog.com/project/2/insights/wlpuXyz2)
2. [Example insight](https://us.posthog.com/project/2/insights/revCSbzO)

__Churn__:
1. [Example insight](https://us.posthog.com/project/2/insights/DpKrMKxj)

__Strategic questions__:
1. [Example funnel](https://us.posthog.com/project/2/insights/O8lthh4G) -  Where would you dive deep next from here?
