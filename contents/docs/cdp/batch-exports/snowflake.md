---
title: Snowflake destination for batch exports
sidebar: Docs
showTitle: true
availability:
    free: full
    selfServe: full
    enterprise: full
---

With batch exports, data can be exported to a Snowflake database table.

## Creating the batch export

1. Navigate to the exports page in your PostHog instance (Quick links if you use [PostHog Cloud US](https://app.posthog.com/batch_exports) or [PostHog Cloud EU](https://eu.posthog.com/batch_exports)).
2. Click "Create export workflow".
3. Select **Snowflake** as the batch export type.
4. Fill in the necessary [configuration details](#snowflake-configuration).
5. Finalize the creation by clicking on "Create".
6. Done! The batch export will schedule its first run on the start of the next period.

## Snowflake configuration

Configuring a batch export targeting Snowflake requires the following Snowflake-specific configuration values:
* **User:** A Snowflake user name with permissions to insert data into the provided table and, if the table is meant to be created, permissions to create the table.
* **Password:** The password of the Snowflake user provided.
* **Role (optional):** A role to assume for the required permissions.
* **Account:** A [Snowflake account identifier](https://docs.snowflake.com/en/user-guide/admin-account-identifier) without the `snowflakecomputing.com` suffix (if any).
* **Database:** The Snowflake database where the table provided to insert data is located (and created if not present).
* **Schema:** The Snowflake database schema where the table provided to insert data is located (and created if not present).
* **Table name:** The name of a Snowflake table where to export the data.
* **Warehouse:** The Snowflake warehouse used for data loading.

### Data export table creation

If the provided table doesn't exist in the provided database and schema, the first batch export run will create it. This is generally the safest option, but you may also create it yourself by running the query:

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

> **Note:** This is the same query used by PostHog Batch Exports if the table is not present in your database. Notice that the database, schema, and table_name parameters are surrounded by double quotes to respect the casing provided during configuration.

### File staging

Batch exports use Snowflake's [internal table stages](https://docs.snowflake.com/en/user-guide/data-load-local-file-system-create-stage#table-stages) to stage the files copied into your Snowflake tables. We recommend using separate tables to export data from PostHog to avoid conflicting with other workflows that use internal table stages.

> **Note:** This differs from the old PostHog Snowflake export app which required extra configuration and used S3 or GCS as an external stage.
