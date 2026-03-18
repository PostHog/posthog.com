---
title: Team lead responsibilities
sidebar: Handbook
showTitle: true
---

## General principles

As team lead in a customer-facing role you'll be responsible for making sure that your team is exceeding expectations when it comes to their specific role at PostHog.  This generally means that:

1. They have a solid plan for any managed customers in their book of business or deals in their pipeline
2. They are proactively building relationships with their customers, even those who are hard to engage with
3. They are flagging any potential churn as soon as they become aware of it
4. You are proactively helping them when they are struggling with what to do next on a customer or deal
5. You are providing continuous feedback to them, especially when their performance is below expectations

## Team-specific responsibilities

### Product-led Sales

Technical Account Managers (TAMs) own a book of business of nominally around 15 customers with an ARR of $1.5m, and also look to bring new customers into that book via product-led leads.

- Once a TAM has hit 15 managed customers or ARR of $1.5m, we should stop generating new product-led leads for them to allow them to focus on and grow their existing book.  Flag this to Simon (Mine as backup) when this needs to happen.
- If a TAM's book of business is too big then your first port of call should be to balance customers across your team, failing that ask for help from your peers in other teams (Simon as backup).
- TAMs will want to bring new leads into their book of business so that they count towards their quota.  It's your job to make sure that they have a solid relationship with the customer and a plan in place for growing them too.  Once you're happy, then let Simon know who will review and add them to the quota tracker.
- With big customers over $100k in ARR you should be prepared to lean in and help the TAM with that customer more directly, owning different levels of the relationship.
- Take the lead in driving churn risk and cross-sell team calls, ensuring that we stick to planning and next steps rather than storytelling.
- Ensure that TAMs are on top of any credit renewals well before they expire.
- Check the TAM quota tracker to see if there are any discrepancies and encourage your team to do so regularly as well.
- Coming up to the end of the quarter, work with your team to identify any customers that are ready to be owned by a Customer Success Manager.  Review these with Simon ahead of quarter end so that we can make for a clean transition of customers.
  - Set the New Owner trait in vitally to `EU CSM` or `US CSM` based on geography. 

### Customer Success

Customer Success Managers (CSMs) own a book of business of around 30 customers with an ARR of $1.5m and focus mainly on keeping them as customers (retention).

- Once a CSM's book is full, work to balance customers across the team ideally with a reasonable timezone overlap with the customer.
- Take the lead in driving churn risk team calls, ensuring that we stick to planning and next steps rather than storytelling.
- Ensure that CSMs are on top of any credit renewals well before they expire.

## Other things we collectively need to stay on top of

### Tracking new products

When we know that a new product is being launched, we need to ensure that Vitally tracking is in place for that product before it is launched.  This involves:

1. Updating the Postgres integration to ensure that we are tracking the following traits for the product:
   - `product_name_ltv` added to the `completed` CTE - the lifetime value of the product
   - `product_name_forecasted_mrr` added to the `forecasted` CTE - the MRR forecasted for the product
   - `product_name_last_month` added to the `last_month` CTE - the last month payment for the product
   - `product_name_billing_limit` added to the main query - the current billing limit for the product
   - also add the traits from the 3 CTEs above into the main query
2. Once the traits are in place, create a success metric to capture the product's data usage if applicable.
   - Sum of a property on events -> `billing usage report` -> `product_count_in_period` over the last 30 days
3. If there is a specific engagement to track how people use the product in PostHog add it to the Vitally engagement events Action
   - If you do this, also ensure there is a corresponding success metric for this (Total event count over 14 days)


### Incident comms

We need to ensure that teams are able to proactively follow our [incident comms process](/handbook/growth/sales/communications-templates-incidents).  We're not quite ready for a full on-call rotation yet, but Simon or Dana take the lead as Communications Manager On-Call (CMOC) when an incident is declared in EU working hours, and Landon or Tyler take the lead when it's during the US working day.




