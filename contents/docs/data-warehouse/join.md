---
title: Filtering, Visualizing, and Joining Data
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
---

Your external data can be used alongside the rest of the PostHog system.

### Visualizing

Data synced to the data warehouse will be available for use in an insight just as events and actions are. You can select your data warehouse data as a category besides events and actions in the event dropdown when analyzing insights.

The main difference from PostHog events to note is that you must identify 3 fields from the data warehouse data (id, distinct id, and timestamp) for the data to be graphable. It's infeasible for us to map and assume which fields represent the time and id from a given data source so we do a best guess prefill but allow you to edit it. ID should be a field that corresponds to the id of the element. Distinct id should correspond to an id that represents the user associated with the element (if none, can match Id). Timestamp field should be a timestamp field representing when the element was created

### Filtering

Once you've selected a data warehouse table to visualize, you can filter on the related data in the schema under the insight specific filter dropdown.

### Joining

External data can be joined on existing PostHog schemas and other external data tables. These joins will be saved and interpreted anytime they're accessed on the origin table. For example, if you import your stripe data and get a table `stripe_customers` and define a join between `events` and `stripe_customers`, you will then be able to query `SELECT stripe_customers.id FROM events`. 

#### Special Joins

Joining data warehouse data against the PostHog `persons` schema enables the data to be used as person filters within the insight scene. 


