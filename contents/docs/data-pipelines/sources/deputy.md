---
title: Linking Deputy as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: Deputy
---

import SourceSetupIntro from "../\_snippets/source-setup-intro.mdx"
import SyncModes from "../\_snippets/sync-modes.mdx"
import TroubleshootingLink from "../\_snippets/dw-troubleshooting-link.mdx"

The Deputy connector syncs your workforce management data – employees, rosters, timesheets, leave, and more – into PostHog, so you can analyze HR and scheduling activity alongside your product data.

## Prerequisites

You need a Deputy account with administrator access and a permanent API token. Your token reads the data that its user can see, so use an administrator account to access all tables.

## Adding a data source

<SourceSetupIntro />

When linking Deputy, you'll need:

- **Deputy URL** – the address you use to sign in to Deputy, for example `https://yourbusiness.au.deputy.com`.
- **Permanent token** – an access token created in your Deputy install.

### Creating a permanent token

1. Sign in to Deputy as an administrator.
2. Go to `https://yourbusiness.au.deputy.com/exec/devapp/oauth_clients` (replace `yourbusiness.au` with your own Deputy subdomain).
3. Click **Add OAuth Application**.
4. Give your application a name (e.g. "PostHog").
5. Click **Get an Access Token**.
6. Copy the token – Deputy only shows it once.

## Sync modes

<SyncModes />

All Deputy tables support incremental sync on the `Modified` field, which merges updated rows by their `Id`. This ensures changes to existing records are captured on each sync.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />

| Table                 | Description                                                                                                                            |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| companies             | Locations (called companies in the API) of the Deputy business. Employees, areas, rosters, and timesheets link to a location.          |
| contacts              | Contact details (phone numbers, email addresses) that employees, locations, and areas link to.                                         |
| employees             | People who can be rostered, time tracked, or managed in Deputy.                                                                        |
| employee_agreements   | Employment agreements. An agreement links an employee to a pay center and sets employment type, start date, pay terms, and payroll ID. |
| employee_availability | Availability and unavailability that employees record, for one date or as a recurring schedule.                                        |
| employee_roles        | Access levels that set what an employee can see and do in Deputy.                                                                      |
| events                | Events added to schedules to track what happens in the business on a day.                                                              |
| journals              | Journal entries recorded against employees.                                                                                            |
| leave                 | Leave requests of employees, with their dates, hours, and approval status.                                                             |
| memos                 | Memos that managers send to employees.                                                                                                 |
| operational_units     | Areas (called operational units in the API) inside a location. Shifts and timesheets link to an area.                                  |
| rosters               | Scheduled shifts. A shift can be published and filled, published and open, or a private draft.                                         |
| tasks                 | Tasks assigned to areas or employees, with their due dates and completion.                                                             |
| timesheets            | Records of the time employees actually worked. A timesheet goes through time approval and pay approval.                                |
| timesheet_pay_returns | Pay lines that approved timesheets generate, with the hours and cost per pay rule.                                                     |

## Troubleshooting

<TroubleshootingLink />
