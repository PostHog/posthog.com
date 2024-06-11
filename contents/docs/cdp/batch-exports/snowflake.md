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

1. Subscribe to data pipelines add-on in [your billing settings](https://us.posthog.com/organization/billing) if you haven't already.
2. Click [Data pipelines](https://app.posthog.com/apps) in the navigation and go to the exports tab in your PostHog instance.
3. Click "Create export workflow".
4. Select **Snowflake** as the batch export destination.
5. Fill in the necessary [configuration details](#snowflake-configuration).
6. Finalize the creation by clicking on "Create".
7. Done! The batch export will schedule its first run on the start of the next period.

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

> **Note:** This differs from the old PostHog Snowflake export destination which required extra configuration and used S3 or GCS as an external stage.

## FAQ

### Export is showing up as NULL recods in Snowflake

This is most likely because the table's schema is different from what we are sending. To verify, run this command replacing the variables:
```
snow sql -q "SELECT GET_DDL('TABLE', '\"<database_name>\".\"<schema_name>\".\"<table_name>\"');" --password='<password>' --account='<account>' --username='<user>' --warehouse='<warehouse>' -x --database='"<database_name>"'
```
and check that the output matches this
```
+------------------------------------------------------------------------------------------------------------------+
| GET_DDL('TABLE',                                                                                                 |
| '"DATABASE_NAME"."SCHEMA_NAME"."TABLE_NAME"')                                                                    |
|------------------------------------------------------------------------------------------------------------------|
| create or replace TABLE "table_name" (                                                         |
|         "uuid" VARCHAR(16777216),                                                                                |
|         "event" VARCHAR(16777216),                                                                               |
|         "properties" VARIANT,                                                                                    |
|         "elements" VARIANT,                                                                                      |
|         "people_set" VARIANT,                                                                                    |
|         "people_set_once" VARIANT,                                                                               |
|         "distinct_id" VARCHAR(16777216),                                                                         |
|         "team_id" NUMBER(38,0),                                                                                  |
|         "ip" VARCHAR(16777216),                                                                                  |
|         "site_url" VARCHAR(16777216),                                                                            |
|         "timestamp" TIMESTAMP_NTZ(9)                                                                             |
| )COMMENT='PostHog generated events table'                                                                        |
| ;                                                                                                                |
+------------------------------------------------------------------------------------------------------------------+
```

If your table doesn't match exactly (including casing), then the recommended approach is delete the table and let PostHog create it for you (alternatively you can copy the DDL exactly).

### Export shows a "no active warehouse selected" error

This error indicates the warehouse provided is not active (likely `SUSPENDED`). Batch exports do not activate, suspend, or manipulate warehouses in any capacity, which can be enforced by not giving permissions required to do so to the user provided to batch exports. The reason for this is that a running warehouse consumes Snowflake credits, and deciding on Snowflake credit spending is out of scope for batch exports. That being said, batch exports do require a running Snowflake warehouse to be able to export events to. So, if you see this error, you will have to inspect your Snowflake configuration to discover why it is `SUSPENDED`. One potential explanation is that Snowflake's auto-suspend feature suspended the warehouse after some time of inactivity, which could be the case if the warehouse is used only for batch exports on slow frequencies (like daily).

Here are some useful links on the subject:
* [Snowflake documentation][https://docs.snowflake.com/en/user-guide/warehouses-tasks] on managing warehouses.
* [Snowflake documentation][https://docs.snowflake.com/en/user-guide/cost-controlling#label-cost-control-auto-suspend] on auto-suspend feature for cost management.
