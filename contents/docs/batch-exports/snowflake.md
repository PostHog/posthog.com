---
title: Snowflake Destination for Batch Exports
sidebar: Docs
showTitle: true
availability:
    free: full
    selfServe: full
    enterprise: full
---

With PostHog Batch Exports, data can be exported to a Snowflake database table.

## Creating the Batch Export

1. Navigate to the Batch Exports UI (Quick links if you use [PostHog Cloud US](https://app.posthog.com/project/exports) or [PostHog Cloud EU](https://eu.posthog.com/project/exports)).
2. Select Snowflake as the Batch Export type.
3. Fill in the necessary [configuration details](#snowflake-configuration).
4. Click on Create Export.
5. Done! The Batch Export will schedule its first run on the start of the next period.

## Snowflake configuration

Configuring a Batch Export targetting Snowflake requires the following Snowflake-specific configuration values:
* User: A Snowflake user name with permissions to insert data into the provided table and, if the table is meant to be created, permissions to create the table.
* Password: The password of the Snowflake user provided.
* Role (optional): A role to assume for the required permissions.
* Account: A [Snowflake account identifier](https://docs.snowflake.com/en/user-guide/admin-account-identifier) without the `snowflakecomputing.com` suffix (if any).
* Database: The Snowflake database where the table provided to insert data is located (and created if not present).
* Schema: The Snowflake database schema where the table provided to insert data is located (and created if not present).
* Table name: The name of a Snowflake table where to export the data.
* Warehouse: The Snowflake warehouse used for data loading.

### Data export table creation

If the provided table doesn't exist in the provided database and schema, the first Batch Export run will create it. This is generally the safest option, but you may also create it yourself by running the query:

```sql
CREATE TABLE IF NOT EXISTS "{database}"."{schema}"."{table_name}" (
    "uuid" STRING,
    "event" STRING,
    "properties" VARIANT,
    "elements" VARIANT,
    "people_set" VARIANT,
    "people_set_once" VARIANT,
    "distinct_id" STRING,
    "team_id" INTEGER,
    "ip" STRING,
    "site_url" STRING,
    "timestamp" TIMESTAMP
)
COMMENT = 'PostHog events table'
```
