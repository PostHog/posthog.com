---
title: Linking FusionAuth as a source
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
sourceId: FusionAuth
---

Enter your FusionAuth instance's base URL and an API key to pull your FusionAuth authentication and identity data – users, audit logs, event logs, login records, and more – into the PostHog data warehouse.

## Adding a data source

1. Go to the [sources tab](https://app.posthog.com/data-management/sources) of the data pipeline section in PostHog.
2. Click **+ New source** and then click **Link** next to FusionAuth.
3. Next, gather your FusionAuth credentials:
   - **Base URL** – your FusionAuth instance URL (e.g. `https://your-instance.fusionauth.io`). Must use HTTPS.
   - **API key** – create one in the FusionAuth admin UI under **Settings > API Keys**. The key needs read access to the endpoints you want to sync.
4. Back in PostHog, enter the credentials and click **Next**.
5. Select the tables you want to sync, set the sync method and frequency, then click **Import**.

Once the syncs are complete, you can start using FusionAuth data in PostHog.

### Required API key permissions

The API key needs read access to the resources you want to sync:

- `/api/user/search`
- `/api/system/audit-log/search`
- `/api/system/event-log/search`
- `/api/system/login-record/search`
- `/api/user/comment/search`
- `/api/jwt/refresh`
- `/api/identity-provider/link`
- `/api/report/daily-active-user`
- `/api/report/monthly-active-user`

## Available tables

| Table                   | Description                                                                                                   | Sync method  |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- | ------------ |
| `Users`                 | User accounts, including registrations, contact info, and account timestamps                                  | Full refresh |
| `AuditLogs`             | Administrative actions taken in the FusionAuth admin UI or API                                                | Incremental  |
| `EventLogs`             | Internal FusionAuth system events such as errors and informational messages                                   | Incremental  |
| `LoginRecords`          | Every successful and failed login attempt against a FusionAuth application                                    | Incremental  |
| `UserComments`          | Comments that admins wrote on users, for example during support or moderation                                 | Full refresh |
| `RefreshTokens`         | Refresh tokens issued to users, representing active sessions (token values are not synced)                    | Full refresh |
| `IdentityProviderLinks` | Links between users and their identity provider accounts such as social or SSO logins (tokens are not synced) | Full refresh |
| `DailyActiveUsers`      | The number of daily active users across all applications, one row per day                                     | Full refresh |
| `MonthlyActiveUsers`    | The number of monthly active users across all applications, one row per month                                 | Full refresh |

**Incremental** tables sync only new or updated records on each run. **Full refresh** tables reload all data on each sync.

## Sync limitations

- The **Users** table is full refresh only because the FusionAuth search API has no documented server-side timestamp filter. The search result window is also capped at approximately 10,000 rows.
- **AuditLogs**, **EventLogs**, and **LoginRecords** require [Elasticsearch](https://fusionauth.io/docs/lifecycle/manage-users/search/search) to be configured on your FusionAuth instance.
- The **DailyActiveUsers** and **MonthlyActiveUsers** report tables require an API key that is not scoped to a tenant.

## Configuration

<SourceParameters />

## Supported tables

<SourceTables />
