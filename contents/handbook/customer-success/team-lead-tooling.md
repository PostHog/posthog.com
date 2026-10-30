---
title: Team lead tooling
sidebar: Handbook
showTitle: true
---

## Overview

Team leads are responsible for overseeing a wide range of managed accounts, and unmanaged accounts that need to be allocated. We've adopted some tools to make that process a lot easier! The tools below should be understood and adopted by any new team leads.

## Account Review, Board, and Sync

Turns 1:1 notes into a shared account review board, a Wednesday call agenda, and if you want, records in Salesforce and Customer analytics.

**How you use it, week to week**

- Mondays the board regenerates with churn risks and upcoming renewals: who is on it, which bin, the facts and open opps. Your job starts below the `Yours` header.
- Your team, either in 1:1s or async, can populate the updates: what happened, what's next, what they need. A sync skill exists to help populate this for you. Try to identify accounts that are worthy of wider discussion.
- Before the Wednesday call, scan `Asks for help` and `Status of renewal` across your team and pick additional rows the group should discuss.
- During the Wednesday call, walk through any accounts you or the team has raised for discussion. This is not a stand-up, but a chance to get insight from the team.
- On Monday, the export rolls the board forward. If you've opted in, it first banks the week's judgment to Salesforce and the churn logs.

**The pieces**

- **Weekly account review sync** (<PrivateLink url="https://us.posthog.com/project/2/skills/weekly-account-review-sync">skill store</PrivateLink>): writes one sentence per field into your team's rows from the week's 1:1 notes, Slack and account notes. Never overwrites a human line. Add your roster to the skill to onboard a team.
- **The board** (<PrivateLink url="https://us.posthog.com/project/2/notebooks/4y8jtyiF">CS NA</PrivateLink>, <PrivateLink url="https://us.posthog.com/project/2/notebooks/ArJeewLg">CS EU</PrivateLink>): one notebook per team, three bins (churn risks, renewals, credits running out). Facts regenerate Mondays; everything under `Yours` is edited by people.
- **The canvas** (<PrivateLink url="https://us.posthog.com/code/canvas/55b93018-aa64-4d36-9996-7b9415a043fd/01a0119d-3e7b-7fbc-815f-a044ef8f722f">Account Review</PrivateLink>): read-only view of both boards for the call. Filter by team or CSM, sort by key date.
- **Monday export and refresh** (local skill `csm-account-review-export`, currently owned by Phil): updates the board to the next week, carrying forward written rows and clearing closed accounts. Moving to the skill store and a cloud routine so any lead can run their own board. If you want this step to also publish updates to your team's Salesforce opps and Customer analytics notebooks, let Phil know and he will add you.

## CSM coverage gap (the Potato digest)

A common churn path is an unowned account undergoing a sudden spike and leaving PostHog without ever alerting a team member. This Monday <PrivateLink url="https://us.posthog.com/project/2/inbox/scouts/signals-scout-csm-coverage-gap">scout</PrivateLink> finds fast-growing risk accounts no CSM owns, ranks them P1 to P3 by urgency, and tags each with the customer's region for assignment.

- **The digest** (<PrivateLink url="https://us.posthog.com/project/2/inbox/01a063b8-3d67-7060-8a2f-57f387c202ef">inbox report</PrivateLink>, <PrivateLink url="https://us.posthog.com/project/2/skills/signals-scout-csm-coverage-gap">skill</PrivateLink>): one report a week. P1 accounts with no routing decision get a proposed `US`, `EU` or `Unknown CSM Potato` stamp on <PrivateLink url="https://us.posthog.com/project/2/customer_analytics/configuration">New Owner</PrivateLink>; everything else unowned is a lead decision.
- **Using it**: open Monday's digest and the <PrivateLink url="https://us.posthog.com/project/2/customer_analytics/tasks">Customer analytics task</PrivateLink> it created for you. Apply the stamps from the task, then work through your lead-decision rows. Accounts open four weeks or more are called out at the top. Past runs are under <PrivateLink url="https://us.posthog.com/project/2/inbox/scouts/runs">scout runs</PrivateLink>.

## Unowned contract allocation

Team leads are responsible for monitoring annual contracts with usage under $20k ARR, and assigning team members if action is needed. This Monday <PrivateLink url="https://us.posthog.com/project/2/inbox/scouts/signals-scout-unowned-contract-csm-allocation">scout</PrivateLink> finds annual-contract accounts no CSM or TAM owns that will need action: crossing $20k ARR on consumption, forecast to cross, or renewing or running out of credit inside four months.

- **The digest** (<PrivateLink url="https://us.posthog.com/project/2/inbox/01a15adb-bb00-7381-9eda-e83e9da83b46">inbox report</PrivateLink>, <PrivateLink url="https://us.posthog.com/project/2/skills/signals-scout-unowned-contract-csm-allocation">skill</PrivateLink>): one report a week, edited in place. Each account gets a proposed `EU`, `US` or `Unknown CSM - Annual` stamp on <PrivateLink url="https://us.posthog.com/project/2/customer_analytics/configuration">New Owner</PrivateLink> by the customer's region, plus the AE and their last touch. Accounts a PostHog person is working, with no relationship on record sit in their own block for investigation, unstamped.
- **Using it**: open Monday's <PrivateLink url="https://us.posthog.com/project/2/customer_analytics/tasks">Customer analytics task</PrivateLink> it created for you. Apply the stamps, or overwrite with a CSM's email where you already know the owner; check the region on any `Unknown` line first. Then work the investigation block from the digest. Leave `Below 20k`, `Ignored` or `Disqualified` on anything you decide against so it stops surfacing. The stamp is a queue, not an owner; assign the relationship as before. Past runs are under <PrivateLink url="https://us.posthog.com/project/2/inbox/scouts/runs">scout runs</PrivateLink>.
