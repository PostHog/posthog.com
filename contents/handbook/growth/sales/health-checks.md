---
title: Checking the health of a customer's deployment
sidebar: Handbook
showTitle: true
---

In a world where a lot of our high-paying customers have self-served without 
ever speaking with a PostHog human there is scope for them to implement PostHog 
in a less than optimal way.  This could result in people spending more than they
need to, or having inaccurate reporting data available to them.  Ultimately if 
left unchecked these things will lead to avoidable churn.

## Are they paying for things they don't need?

### Group analytics

[Group Analytics](/docs/product-analytics/group-analytics) can be a real value-add for B2B companies, allowing them to track
analytics at the company or workspace level rather than an individual person.  They 
do however need to [implement group tracking](/docs/product-analytics/group-analytics#how-to-create-groups) in their PostHog SDK.  Customers who haven't 
done this may end up paying for Group Analytics but not able to use it.

We have a [Vitally](https://posthog.vitally-eu.io/) risk indicator added to customers who are paying for Group Analytics 
but not using it.  

To help the customer you should figure out whether they are B2B or could otherwise benefit
from sending group information.  If so, reach out with guidance.  If not, reach out telling 
them that they can save by removing the Group Analytics add-on from the billing page.

### Data pipelines

### Autocapture

### Session replay targeting

## Have they implemented tracking incorrectly?

### Calling identify too often

### Calling groupidentify too often

### Calling posthog.reset() before identifying the user





