---
title: Lead assignments during time off
sidebar: Handbook
showTitle: true
---

We want to make sure we don’t assign new leads to people who are out of office both in Salesforce and in Default (our contact form submission routing system)

### In Salesforce → lead assignment tracker
- There’s a checkbox called Is Active
- When someone goes on leave, uncheck this box to make them inactive so they don't receive any new leads

When they return:
- Recheck the box so they start receiving leads again.
- Use the Manual Lead Adjustment column to rebalance their totals if needed (more on that below).

### In Default app → routing → queues
- Find the queues the person is part of (US East, US West, EMEA, Asia based on location, or All and Max Availability Queues for everyone)
- Under each queue find Status column
- Toggle their status to Inactive so Default to stop routing new leads to them
- When they return, Toggle them back to Active in relevant queues

Important: Even if the person marks themselves as “Out of Office” in their Default personal settings, that does not stop lead assignments. We still need to manually toggle them off in the queues.

### When to take these actions
- If taking <= 5 days off: Turn them off the day they leave and turn back on the day they return.
- If taking > 5 days off: Turn them off 2 days before their scheduled time off to avoid assigning new leads right before they leave. Turn them back on the day they return, so they have fresh leads to work on after returning.

### Calibration after time off
When someone’s inactive, others in the queue keep receiving leads so their totals rise. We need to use the calibration fields to make sure all leads don’t go to the person who comes back from OOO based on pure total lead count.

In Default Queues you’ll see Total Assignments and Calibration columns
- Let’s say the person was out two weeks, and others got +10 more leads per person during this time. 
- To rebalance, add +10 under the Calibration column of the OOO person before activating them in the queue
- This prevents the system from dumping 10 leads on them the moment they’re reactivated.

In Salesforce: do the same using the Manual Leads Adjustment column in Lead Assignment Tracker.
