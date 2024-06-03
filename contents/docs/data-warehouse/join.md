---
title: Filtering, visualizing, and joining data
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
---

Your external data can be used alongside the rest of the PostHog.

### Visualizing

Data synced to the data warehouse is available for use in insights, just as events and actions are. You can select your data warehouse data as a series in the dropdown when creating an insight.

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/data_light_a4b621d2dc.png" 
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/data_dark_bd8533060b.png"
    alt="Selecting data warehouse data" 
    classes="rounded"
/>

The main difference from events is that you must identify 3 fields from the data warehouse data to visualize it:

 - ID: A field that corresponds to the ID of the element. 
 - Distinct ID: A field that corresponds to an ID representing the user associated with the element. If none, can match ID.
 - Timestamp: A timestamp field representing when the element was created.
 
It's infeasible for us to map these fields. We pre-fill with a best guess, but allow you to edit it.

### Filtering

Once you select a data warehouse table to visualize, you can filter on the related data in the schema under the insight specific filter dropdown.

### Joining

You can join external data on existing PostHog schemas and other external data tables. These joins are saved and interpreted anytime they're accessed on the origin table. For example, if you import your Stripe data, get a table `stripe_customers`, and define a join between `events` and `stripe_customers`, you can then query `SELECT stripe_customers.id FROM events`. 

To define a join, go to the data warehouse tab, select the origin table of the join, click "Add join", and define the join parameters.

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2024_06_01_at_4_13_52_PM_c676e12a91.png" 
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2024_06_01_at_4_14_04_PM_74fd0ef4dc.png"
    alt="Create a join" 
    classes="rounded"
/>

#### Special Joins

Joining data warehouse data against the PostHog `persons` schema enables the data to be used as person filters within an insight. 

<ProductScreenshot
    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2024_06_01_at_4_43_58_PM_e35e915229.png" 
    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2024_06_01_at_4_43_10_PM_c7af61a58f.png"
    alt="Filter on joined person properties" 
    classes="rounded"
/>



