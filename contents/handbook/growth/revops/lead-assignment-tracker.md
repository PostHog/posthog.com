---
title: Lead assignment tracker
sidebar: Handbook
showTitle: true
---

[The Lead Assignment Tracker](https://posthog.lightning.force.com/lightning/o/Lead_Assignment_Tracker__c/list?filterName=All) in Salesforce is the source of truth for who's in the round robin, how leads are weighted, and how to manage assignments. This page explains how to use it self serve.

### Understanding the tracker
Navigate to the Lead Assignment Tracker section in Salesforce. There you'll see every person who's part of the round robin, along with the following columns:

**User, Role, Territory** These identify who the person is, whether they're a TAE or TAM, and which region they cover.

**Priority** This column controls how many leads a person receives relative to others. The default value is 1. If you set someone's priority to 3, it means for every 3 leads the rest of the team receives, this person gets 1 — so a higher number means fewer leads. Use this if you want to throttle lead volume for a specific person (for example, if they're ramping or handling a reduced workload).

**Manual Leads Adjustment** This column lets you calibrate a person's total so the round robin stays fair. The most common use case is adding someone mid-month: by the time they join, others in the same region may already have leads assigned to them (lets say 50). Without an adjustment, the system would send that new person a flood of leads to "catch up" To prevent this, add 50 to their Manual Leads Adjustment column to bring their baseline in line with the rest of the team so the round robin distributes fairly going forward. This column is also used to rebalance after time off (see below).

**Is Active** This checkbox controls whether someone is included in the round robin. Uncheck it to temporarily exclude someone. For example, if they want to pause new lead intake outside of a scheduled vacation. Check it again when they're ready to receive leads.

**Note:** For planned time off, there's automation in place that handles toggling people on and off based on their calendar. Is Active column is mainly for cases outside of that — like when someone's OOO isn't on their calendar, or they want to pause for another reason.

### Adding a new person
1. Click New in the Lead Assignment Tracker
2. Select the Salesforce user you want to add
3. Select their territory from the multi-picklist
4. Set their role (TAE or TAM)
4. Add a Manual Leads Adjustment if they're joining mid-month (see above)
5. Click Save

That's it, they're automatically added to the round robin.

### Monthly reset
The Manual Leads Adjustment and total assignment counts reset at the start of each month so you don't need to redo these calibrations on an ongoing basis.

## Lead assignments during time off
For scheduled time off, automation handles turning people off and back on based on their calendar — you don't need to do this manually. The steps below apply when someone's OOO isn't reflected in their calendar, or when you need to turn off lead assignments for a reason other than vacation.

**In Salesforce → Lead Assignment Tracker**
- Uncheck the Is Active box to remove them from the round robin
- When they return, recheck it and use the Manual Leads Adjustment column to rebalance their totals if needed

**In Default app → Routing → Queues**
- Find the queues the person is part of (US East, US West, EMEA, or Asia based on location; All and Max Availability Queues for everyone)
- Toggle their Status to Inactive to stop Default from routing leads to them
- When they return, toggle them back to Active

**Important:** Even if someone marks themselves as "Out of Office" in their Default personal settings, that does not stop lead assignments. You still need to manually toggle them off in the queues.

**When to take these actions**
- ≤ 5 days off: Turn them off the day they leave, turn back on the day they return
- \> 5 days off: Turn them off 2 days before their leave starts, turn back on the day they return

### Calibration after time off
While someone is inactive, others in the queue continue receiving leads — so their totals rise. When the person returns, you'll need to rebalance so the round robin doesn't immediately dump a backlog of leads on them.
- In Default Queues: Look at the Total Assignments and Calibration columns. Add the number of leads others received during the absence to the returning person's Calibration field before reactivating them.
- In Salesforce: Do the same using the Manual Leads Adjustment column in the Lead Assignment Tracker. For example: if others received roughly 10 leads each while someone was out, add 10 to the returning person's calibration/adjustment field before turning them back on.
