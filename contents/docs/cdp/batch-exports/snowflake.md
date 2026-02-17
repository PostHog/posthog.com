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

1. Click [Data management > Destinations](https://app.posthog.com/data-management/destinations) in the left sidebar.
2. Click **+ New destination** in the top-right corner.
3. Search for **Snowflake**.
4. Click the **+ Create** button. 
5. Fill in the necessary [configuration details](#snowflake-configuration).
6. Finalize the creation by clicking on "Create".
7. Done! The batch export will schedule its first run on the start of the next period.

## Authentication

PostHog supports two authentication methods for Snowflake:

1. **Password:** This is the simplest method, and just requires a password for the user.
2. **Key pair:** For enhanced security, you can use a key pair to authenticate with Snowflake. For information on how to set this up, see [Snowflake's documentation](https://docs.snowflake.com/en/user-guide/key-pair-auth#configuring-key-pair-authentication). We support both encrypted and unencrypted key pairs.

## Snowflake configuration

Configuring a batch export targeting Snowflake requires the following Snowflake-specific configuration values:
* **Account:** A [Snowflake account identifier](https://docs.snowflake.com/en/user-guide/admin-account-identifier) without the `snowflakecomputing.com` suffix (if any).
* **User:** A Snowflake user name with permissions to insert data into the provided table and, if the table is meant to be created, permissions to create the table.
* **Authentication type:** The authentication method to use: password or key pair.
* **Password:** The password of the Snowflake user provided, if using password authentication.
* **Private key:** The private key of the Snowflake user provided, if using key pair authentication.
* **Private key passphrase (optional):** The private key passphrase, if using an encrypted key pair.
* **Role (optional):** A role to assume for the required permissions.
* **Database:** The Snowflake database where the table provided to insert data is located (and created if not present).
* **Schema:** The Snowflake database schema where the table provided to insert data is located (and created if not present).
* **Table name:** The name of a Snowflake table where to export the data.
* **Warehouse:** The Snowflake warehouse used for data loading.

### File staging

Batch exports use Snowflake's [internal table stages](https://docs.snowflake.com/en/user-guide/data-load-local-file-system-create-stage#table-stages) to stage the files copied into your Snowflake tables. We recommend using separate tables to export data from PostHog to avoid conflicting with other workflows that use internal table stages.

> **Note:** This differs from the old PostHog Snowflake export destination which required extra configuration and used S3 or GCS as an external stage.

## Models

This section describes the models that can be exported to Snowflake.

> **Note:** New fields may be added to these models over time. To maintain consistency, these fields are not automatically added to the destination tables. If a particular field is missing in your Snowflake tables, you can manually add the field, and it will be populated in future exports.

### Events model

This is the default model for Snowflake batch exports. The schema of the model as created in Snowflake is:

| Field           | Type        | Description                                                               |
|-----------------|-------------|---------------------------------------------------------------------------|
| uuid            | `STRING`    | The unique ID of the event within PostHog                                 |
| event           | `STRING`    | The name of the event that was sent                                       |
| properties      | `VARIANT`   | A JSON object with all the properties sent along with an event            |
| elements        | `VARIANT`   | This field is present for backwards compatibility but has been deprecated |
| people_set      | `VARIANT`   | A JSON object with any person properties sent with the `$set` field       |
| people_set_once | `VARIANT`   | A JSON object with any person properties sent with the `$set_once` field  |
| distinct_id     | `STRING`    | The `distinct_id` of the user who sent the event                          |
| team_id         | `INTEGER`   | The `team_id` for the event                                               |
| ip              | `STRING`    | The IP address that was sent with the event                               |
| site_url        | `STRING`    | This field is present for backwards compatibility but has been deprecated |
| timestamp       | `TIMESTAMP` | The timestamp associated with an event                                    |

If the provided table doesn't exist in the provided database and schema, the first batch export run will create it. This is generally the safest option, but you may also create it yourself by running the query:

```sql runInPostHog=false
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

### Persons model

The schema of the model as created in Snowflake is:

| Field                      | Type      | Description                                                                                          |
|----------------------------|-----------|------------------------------------------------------------------------------------------------------|
| team_id                    | `INTEGER` | The id of the project (team) the person belongs to                                                   |
| distinct_id                | `STRING`  | A `distinct_id` associated with the person                                                           |
| person_id                  | `STRING`  | The id of the person associated to this (`team_id`, `distinct_id`) pair                              |
| properties                 | `VARIANT` | A JSON object with all the latest properties of the person                                           |
| person_version             | `INTEGER` | The version of the person properties associated with a (`team_id`, `distinct_id`) pair               |
| person_distinct_id_version | `INTEGER` | The version of the person to `distinct_id` mapping associated with a (`team_id`, `distinct_id`) pair |
| created_at                 | `TIMESTAMP` | The timestamp when the person was created                                                                                          |

The Snowflake table will contain one row per `(team_id, distinct_id)` pair, and each pair is mapped to their corresponding `person_id` and latest `properties`.

If the provided table doesn't exist in the provided database and schema, the first batch export run will create it. This is generally the safest option, but you may also create it yourself by running the query:

```sql runInPostHog=false
CREATE TABLE IF NOT EXISTS "{database}"."{schema}"."{table_name}" (
    "team_id" INTEGER,
    "distinct_id" STRING,
    "person_id" STRING,
    "properties" VARIANT,
    "person_version" INTEGER,
    "person_distinct_id_version" INTEGER,
    "created_at" TIMESTAMP
)
COMMENT = 'PostHog persons table'
```

### Sessions model

You can view the schema for the sessions model in the configuration form when creating a batch export (there are a few too many fields to display here!).

#### How is the persons model kept up to date?

Exporting mutable data (like the persons model) requires executing a merge operation to apply new updates to existing rows. Executing this merge operation in Snowflake involves the following steps:

1. Creating a stage table.
2. Inserting new data into the stage table.
3. Execute a merge operation between existing table and stage table.
  a. Any rows that match in the final table and for which the stage table's version is higher are updated.
  b. Any new rows not found in the final table are inserted.
4. Drop the stage table.


## FAQ

### Export is showing up as NULL records in Snowflake

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

This error indicates the warehouse provided is not active (likely `SUSPENDED`). You will have to inspect your Snowflake configuration to discover why. One potential explanation is that Snowflake's auto-suspend feature suspended the warehouse after some time of inactivity, which could be the case if the warehouse is used only for batch exports on slow frequencies (like daily).

Batch exports require a `RUNNING` Snowflake warehouse to be able to export events to. It does not activate, suspend, or manipulate warehouses in any capacity, which can be enforced by not giving permissions required to do so to the user provided to batch exports. The reason for this is that a running warehouse consumes Snowflake credits, and deciding on Snowflake credit spending is out of scope for batch exports.

Once the cause has been identified and the configuration amended, a warehouse can be started with the query `ALTER WAREHOUSE <name> RESUME` or via the Snowflake console.

See Snowflake's documentation on [managing warehouses](https://docs.snowflake.com/en/user-guide/warehouses-tasks) and [the cost management auto-suspend feature](https://docs.snowflake.com/en/user-guide/cost-controlling#label-cost-control-auto-suspend) for more details.

## Examples

These examples illustrate how to use the data from batch exports in Snowflake.

### Requirements

Two batch exports need to be created:
* An events model batch export.
* A persons model batch export.

For the purposes of these examples, assume that these two batch exports have already been created and have exported some data to Snowflake in tables `example.events` and `example.persons`.

### Example: Count unique persons that have triggered an event

The following query can be used to count the number of unique persons that have triggered events:

```sql
SELECT
  event,
  COUNT(DISTINCT persons.person_id) AS unique_persons_count
FROM
  example.events AS events
LEFT JOIN
  example.persons AS persons ON events.distinct_id = persons.distinct_id AND events.team_id = persons.team_id
WHERE
  persons.person_id IS NOT NULL
GROUP BY
  event
ORDER BY
  unique_persons_count DESC
```
