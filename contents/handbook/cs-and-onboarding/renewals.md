---
title: Renewals
sidebar: Handbook
showTitle: true
---

## Pre-renewal risk mitigation

### Account audit
Renewals should be seen as the final step of the customer relationship and are an outcome from ongoing efforts. They should be planned for throughout interactions with the customer across the entirety of their contract. If you feel asking the question "If your contract expired today, would you renew?" is uncomfortable, the customer is likely at risk, and this risk should be mitigated. As a side note, asking that question as part of business reviews isn't a bad idea!

A healthy renewal cycle begins with an account audit well ahead of any renewal conversation. In practice, this should happen roughly 6 months before contract end date. This audit should include an analysis of the current state of the customer, identifying potential risks or reasons for a non-renewal. A document of [potential churn risks](/handbook/growth/sales/risk-mitigation-and-churn-prevention) has already been written and should be leveraged as part of the review. Some ones to look out for include:

- **Reduced Usage/Single User**: Has usage decreased over the last 6 months or since your previous renewal? Is there only one user present in the platform (and more concerningly, are they not the point of signature)? 

- **Existing Product Gaps**: Are there documented or known gaps your customer is trying to work around? This can also include signs of potential gaps that have not been discussed before (i.e. Complex SQL queries, large amounts of data exports)

- **Changed Stakeholders**: Has the point of signature for this renewal changed from last year? If so, do they understand the value PostHog is providing their team?

- **Customer has too many credits**: Is your customer using credits at a slow pace, and will likely not use their credits by the end of the current contract? While this may not be a cause for concern, it is important to understand why the customer's expectation of their usage has changed over the course of the year. 

- **Disengaged Stakeholder**: Is the user responsible for signature separated from the platform? Do they understand the value that PostHog is providing the team?

- **Company Performance**: Is your customer's product doing well? Unfortunately, sometimes this is not the case, and customers can turn to cost cutting on softwares to help save money. PostHog is designed to be an invaluable tool, and you should work to ensure your customer understands that PostHog has positively impacted their financial performance.

Performing this review, and ensuring all aspects of the customer relationship are strong will make the upcoming renewal conversation much simpler. More importantly, it will allow you to identify churn risks, create mitigation plans, and action them, prior to the risk materializing to a churn request. Leverage the previously provided churn risk documentation to attack these outstanding issues and improve the customer relationship before reaching out for conversations. If you are unable to resolve the issue with the customer 2 months before the renewal, the renewal is at risk.

### Help the customer with their [North Star Metric](/contents/docs/new-to-posthog/getting-hogpilled)

Often stakeholders will have a strong understanding of what a software does, or how their team uses it. Seldom do they understand why PostHog is valuable, or how it is a strategic tool for their business. It is important to demonstrate this value to the stakeholder well before the renewal. This should be done in conjunction with the Pre-Renewal Risk Mitigation.

The goal at this stage is to align with the key stakeholders of your customer on their core KPIs as a business. Understand not just what your customer is hoping to get out of PostHog, but what the big picture business impact should be. Work with a customer to determine the single North Star metric (it can be multiple) that defines their relationship with PostHog, and success. This can be as wide as an increase in users, and as narrow as increased platform engagement from 28-year old cat-owners. When you and your customer are aligned on the why, and how PostHog measures or impacts that why, we become a key part of their strategy.

For customers you have frequent contact with, book a meeting to discuss KPIs, objectives, and how PostHog is being leveraged to reach them. Layer the discussion into your product demos. Speak less to the What ("What does this product do", "What can we pull") and more to the Why ("Why does this product matter", "Why does this data impact your business"). 

If your champion is not able to speak to wider business strategy, you may need to pull in a more senior team member. Expanding your relationship to include leadership, executive stakeholders, or key decision makers will allow PostHog to remain relevant and impactful as businesses continue to grow. As mentioned above, a warm introduction, or an offer to help with their quarterly goals, will likely pull them in. Additionally, try to coordinate a meeting to demonstrate how this Stakeholder can leverage PostHog going forward. Often super users want to look good for leadership, and demonstrating how PostHog helped them pull insights and increase efficiency will be a welcomed idea.

Having this relationship and being able to demonstrate PostHog's impact on these North Star Metrics, will make PostHog a non-negotiable for customers. Aim to be at this point ahead of the renewal conversation


## When to start the renewal conversation

Once issues are resolved, when you start the renewal conversation is dependent on your current relationship with the customer. For customers you are in frequent contact with, start renewal conversations 2 months before the contract end date. For customers who are quiet, start renewal discussions 3 months out to allow more time for re-engagement.

## When to start
Start renewal conversations at least 2 months before the contract renewal date for customers you are already in frequent contact with. For customers who are quiet, start renewal discussions 3 months out to allow more time for re-engagement.

Vitally and Slack will keep you on track with automated reminders. When a customer hits the 2-month mark, they'll automatically enter the `Upcoming renewal` segment, you'll get a task assigned to you in Vitally, and Slack will send a notification.

Start by sending a message in the shared Slack channel. Things will change in a year – the person you worked with previously may not be the right person this time. Mention when the customer is set to renew and ask if they have any preferred next steps.

As you make progress in the renewal discussions, [update the renewal opportunity](/handbook/growth/sales/crm#renewal-pipeline) in Salesforce. 

### Renewal principals
Being on a prepaid credit plan - usually annual - is a win-win solution for both PostHog and the customer. Customers get discounts on the credits they purchase and PostHog gets confirmed revenue.

When estimating renewal amount, we want to make sure we accurately determine the amount of credits the customer will need in the next 12 months (or equivalent period, e.g. if they prepaid for 6 months). This is not an opportunity to upsell - do that later by encouraging product usage. 

This page walks through recommendations for approaching and handling renewals. [Contract rules](/handbook/growth/sales/contract-rules) and [how to create contracts](/handbook/growth/sales/contracts) are covered in relevant pages under our shared processes. 

#### Customers who are projected to run out of credit before renewal
You will get notified by credit bot in Slack if a customer is set to run out of credits before their renewal date. This is considered an early renewal and follow the same process. If the customer will likely run out of credits before renewal is done, make sure they have a credit card on their account so any overage bills will be paid.

## Renewal discussions
Renewal conversations are best done on a call. There can be a lot of moving parts so talking through it is usually a good idea. 

Before the call, review your customer's usage and start a quote in <PrivateLink url="https://quote.posthog.com/"> Quotehog </PrivateLink>. If you need to look at data beyond the last 6 months, you can use <PrivateLink url="https://us.posthog.com/project/2/dashboard/374922"> this PostHog dashboard </PrivateLink> and edit the variables. Check if your customer is on any legacy pricing tiers – either talk to them about moving to standard pricing, or take it into account when building a quote. 

This call can be an opportunity to explore your customer's PostHog experience so far and upcoming initiatives that you can build on in the future. It's also a good idea to explain how contracts, credits, and discounts work at PostHog – our [pricing philosophy](/pricing/philosophy) and [contract rules](/handbook/growth/sales/contract-rules) are handy pages to bring up.

When you walk through the quote, start by looking at their past usage – try to anchor to the main products they're using as there can be a lot of numbers to look at. Explain how you estimated the usage for each product to arrive at the final number. Check-in with your customer throughout to sense check you're on the right track.

After the call - share the public quote link with your customer along with any usage information you shared on the call. 
