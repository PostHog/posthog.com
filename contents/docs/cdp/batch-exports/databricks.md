---
title: Databricks destination for batch exports
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
---

Batch exports can be used to export data to a Databricks Delta table.

> **Note:** The Databricks destination is currently in `beta`. This means the configuration and features are subject to change.
>
> You can request access via the [in-app support form](https://us.posthog.com/#panel=support%3Asupport%3Abatch_exports%3Alow%3Atrue).

## Requirements

To create a batch export to Databricks, you need the following:

- A Databricks account with the [Premium plan or above](https://www.databricks.com/product/pricing/platform-addons)
- A Databricks workspace with Unity Catalog enabled
- A SQL warehouse
- A catalog and schema you wish to use
- A service principal with [OAuth Machine-to-Machine (M2M)](https://docs.databricks.com/aws/en/dev-tools/auth/oauth-m2m) authentication configured. This is the only authentication type we support currently. This service principle must have the appropriate permissions (see below)

## Setup instructions

### 1. SQL warehouse

Batch exports uses SQL warehouses to export data into your Delta tables.

Can can use either an existing warehouse, or you can [create a new one](https://docs.databricks.com/aws/en/compute/sql-warehouse/create).

You will need to make a note of the **Server hostname** and **HTTP path** for your warehouse:

1. In Databricks, navigate to **SQL Warehouses**.
2. Select your SQL warehouse.
3. Go to the **Connection details** tab.
4. Copy the **Server hostname** (e.g., `abc123.cloud.databricks.com`).
5. Copy the **HTTP path** (e.g., `/sql/1.0/warehouses/abc123def456`).

### 2. Set up catalog and schema

1. In your Databricks workspace, create a catalog (or use an existing one) where PostHog will export data.
2. Create a schema within that catalog (or use an existing one).
3. Note the names of both the catalog and schema - you'll need these when configuring the batch export.

### 3. Create a service principal

Service principals give automated tools and scripts API-only access to Databricks resources, providing greater security than using user accounts.

1. In your Databricks workspace, navigate to **Settings** > **Identity and access** > **Service principals**.
2. Click **Add service principal**.
3. Click **Add new**.
4. Enter a name for your service principal (e.g., "PostHog Batch Exports").
5. Click **Add**.

### 4. Generate OAuth credentials

1. Select the service principal you just created.
2. Navigate to the **Secrets** tab.
3. Click **Generate secret**.
4. Choose a lifetime for the new secret.
4. Copy and save both the **Client ID** (also the same as the service principal UUID) and **Secret** securely - you'll need these for PostHog configuration.

> **Important:** The client secret is only shown once. Make sure to save it securely before closing the dialog.


### 5. Grant permissions to the service principal

The service principal needs the following permissions:

**At the catalog level:**
- `USE CATALOG` - Required to access the catalog
- `USE SCHEMA` - Required to access schemas within the catalog
- `CREATE TABLE` - Required to create the export table if it doesn't exist

**At the schema level:**
- `USE SCHEMA` - Required to access the schema
- `CREATE TABLE` - Required to create tables
- `MODIFY` - Required to insert and update data

**For the persons model (mutable data):**
- `CREATE TABLE` - Required to create temporary stage tables
- `DELETE` - Required to drop stage tables after merge operations

You can grant these permissions using SQL commands in Databricks:

```sql
-- Grant catalog permissions
GRANT USE CATALOG ON CATALOG <catalog_name> TO <service_principal_name>;
GRANT CREATE SCHEMA ON CATALOG <catalog_name> TO <service_principal_name>;

-- Grant schema permissions
GRANT USE SCHEMA ON SCHEMA <catalog_name>.<schema_name> TO <service_principal_name>;
GRANT CREATE TABLE ON SCHEMA <catalog_name>.<schema_name> TO <service_principal_name>;
GRANT MODIFY ON SCHEMA <catalog_name>.<schema_name> TO <service_principal_name>;
```

> **Note:** Replace `<catalog_name>`, `<schema_name>`, and `<service_principal_name>` with your actual values.



## Models

This section describes the models that can be exported to Databricks.

> **Note:** New fields may be added to these models over time. If automatic schema evolution is enabled (the default), new fields will be automatically added to your destination tables. Otherwise, you can manually add missing fields, and they will be populated in future exports.

### Events model

This is the default model for Databricks batch exports. The schema of the model as created in Databricks is:

| Field                          | Type        | Description                                                    |
|--------------------------------|-------------|----------------------------------------------------------------|
| uuid                           | `STRING`    | The unique ID of the event within PostHog                      |
| event                          | `STRING`    | The name of the event that was sent                            |
| properties                     | `VARIANT` or `STRING` | A JSON object with all the properties sent along with an event |
| distinct_id                    | `STRING`    | The `distinct_id` of the user who sent the event               |
| team_id                        | `BIGINT`    | The `team_id` for the event                                    |
| timestamp                      | `TIMESTAMP` | The timestamp associated with an event                         |
| databricks_ingested_timestamp  | `TIMESTAMP` | The timestamp when the event was queried from PostHog          |

> **Note on VARIANT vs STRING:** By default, JSON fields like `properties` use Databricks' `VARIANT` type, which is optimized for semi-structured data and enables better querying performance. This requires Databricks Runtime 15.3 or above. If you're using an older runtime, you can configure the export to use `STRING` type instead.

### Persons model

The schema of the model as created in Databricks is:

| Field                      | Type        | Description                                                                                                    |
|----------------------------|-------------|----------------------------------------------------------------------------------------------------------------|
| team_id                    | `BIGINT`    | The id of the project (team) the person belongs to                                                             |
| distinct_id                | `STRING`    | A `distinct_id` associated with the person                                                                     |
| person_id                  | `STRING`    | The id of the person associated to this (`team_id`, `distinct_id`) pair                                        |
| properties                 | `VARIANT` or `STRING` | A JSON object with all the latest properties of the person                                               |
| person_version             | `BIGINT`    | Internal version of the person properties, used by batch export in merge operation                             |
| person_distinct_id_version | `BIGINT`    | Internal version of the person to `distinct_id` mapping, used by batch export in merge operation               |
| created_at                 | `TIMESTAMP` | The timestamp when the person was created                                                                      |

The Databricks table will contain one row per `(team_id, distinct_id)` pair, and each pair is mapped to their corresponding `person_id` and latest `properties`.

## Creating the batch export

1. Click [Data pipelines](https://app.posthog.com/pipeline) in the navigation and go to the **Destinations** tab.
2. Click **+ New destination** in the top-right corner.
3. Search for **Databricks**.
4. Click the **+ Create** button.
5. Follow the steps to create a Databricks integration (if you haven't already):
   - Enter a name for the integration
   - Enter your **Server hostname** (from step 5 in [Setting up Databricks access](#setting-up-databricks-access))
   - Enter your **Client ID** (from step 2 in [Setting up Databricks access](#setting-up-databricks-access))
   - Enter your **Client Secret** (from step 2 in [Setting up Databricks access](#setting-up-databricks-access))
6. Fill in the necessary [configuration details](#databricks-configuration).
7. Finalize the creation by clicking on "Create".
8. Done! The batch export will schedule its first run on the start of the next period.

## Databricks configuration

Configuring a batch export targeting Databricks requires the following configuration values:

**Connection settings:**
* **Integration:** Select the Databricks integration you created (or create a new one). The integration stores your server hostname and OAuth credentials securely.
* **HTTP Path:** The HTTP path value for your SQL warehouse or all-purpose compute cluster (e.g., `/sql/1.0/warehouses/abc123def456`).

**Destination settings:**
* **Catalog:** The name of the Databricks catalog where the table will be created.
* **Schema:** The name of the schema within the catalog where the table will be created.
* **Table name:** The name of the table where data will be exported. If the table doesn't exist, it will be created automatically.

**Advanced settings (optional):**
* **Table partition field:** The field to partition the table by. Partitioning can improve query performance for large tables. By default:
  - Events model: partitioned by `timestamp`
  - Sessions model: partitioned by `end_timestamp`
  - Persons model: no default partitioning
* **Use VARIANT type:** Whether to use Databricks' `VARIANT` type for JSON fields. Enabled by default. Requires Databricks Runtime 15.3 or above. If disabled, `STRING` type will be used instead.
* **Automatic schema evolution:** Whether to automatically add new fields to the destination table when they appear in the source data. Enabled by default. This uses Databricks' [automatic schema evolution](https://docs.databricks.com/aws/en/delta/update-schema#automatic-schema-evolution-for-delta-lake-merge) feature. Note that columns are never dropped from the destination table.

## Examples

These examples illustrate how to use the data from batch exports in Databricks.

### Requirements

Two batch exports need to be created:
* An events model batch export.
* A persons model batch export.

For the purposes of these examples, assume that these two batch exports have already been created and have exported some data to Databricks in tables `example_catalog.example_schema.events` and `example_catalog.example_schema.persons`.

### Example: Count unique persons that have triggered an event

The following query can be used to count the number of unique persons that have triggered events:

```sql
SELECT
  event,
  COUNT(DISTINCT persons.person_id) AS unique_persons_count
FROM
  example_catalog.example_schema.events AS events
LEFT JOIN
  example_catalog.example_schema.persons AS persons
  ON events.distinct_id = persons.distinct_id
  AND events.team_id = persons.team_id
WHERE
  persons.person_id IS NOT NULL
GROUP BY
  event
ORDER BY
  unique_persons_count DESC
```

### Example: Query properties using VARIANT type

If you're using the `VARIANT` type for properties, you can query nested JSON fields efficiently:

```sql
SELECT
  event,
  properties:$browser AS browser,
  properties:$current_url AS current_url,
  COUNT(*) AS event_count
FROM
  example_catalog.example_schema.events
WHERE
  timestamp >= CURRENT_DATE() - INTERVAL 7 DAYS
GROUP BY
  event,
  browser,
  current_url
ORDER BY
  event_count DESC
LIMIT 100
```

> **Note:** The `:` notation is used to access fields within VARIANT columns. See [Databricks VARIANT documentation](https://docs.databricks.com/aws/en/semi-structured/variant) for more details.

## FAQ

### How does PostHog keep the persons model (or any mutable model) up to date?

Exporting a mutable model can be divided into new rows that have to be inserted, and existing rows that have to be updated. When a PostHog batch export exports mutable data (like the persons model) to Databricks, it executes a merge operation to apply new updates to existing rows.

The operation the PostHog batch export executes in Databricks roughly involves the following steps:

1. Creating a temporary stage table and a temporary volume.
2. Uploading data as Parquet files to the temporary volume.
3. Copying data from the volume into the stage table.
4. Executing a merge operation between the existing table and stage table:
   - Any rows that match in the final table and for which any of the stage table's version fields is higher are updated.
   - Any new rows not found in the final table are inserted.
5. Drop the stage table and temporary volume.

This ensures that your persons data always reflects the latest state while maintaining historical records that haven't been updated.

### Why are additional permissions required to export the persons model?

The merge operation described above explains why a mutable export requires additional permissions beyond those required for exporting the events model:
- `CREATE TABLE` permission is needed to create temporary stage tables.
- `DELETE` permission (or table modification permissions) is needed to drop the stage tables after the merge operation completes.

### What is the benefit of table partitioning?

Partitioning your Databricks table can significantly improve query performance, especially for large datasets. When you partition by a field like `timestamp`, Databricks can skip reading entire partitions of data when you filter by that field in your queries.

For example, if you partition by `timestamp` and run a query filtering for events from the last 7 days, Databricks will only scan the relevant partitions rather than the entire table.

By default, PostHog automatically partitions:
- Events tables by `timestamp`
- Sessions tables by `end_timestamp`

You can override this by specifying a different partition field in the configuration.

### What is automatic schema evolution?

Automatic schema evolution is a feature that automatically adds new columns to your destination table when they appear in the source data. This is useful because PostHog may add new fields over time, and with automatic schema evolution enabled, you don't need to manually update your table schema.

When enabled (the default), PostHog uses Databricks' `MERGE WITH SCHEMA EVOLUTION` feature to handle schema changes automatically. Note that:
- New columns are added automatically
- Existing columns are never removed
- Column types are never changed

If you prefer to manage schema changes manually, you can disable this option in the configuration.

### Should I use VARIANT or STRING type for JSON fields?

We recommend using `VARIANT` (the default) for the following reasons:
- Better query performance for nested JSON data
- More efficient storage
- Type safety and validation
- Native support for JSON operators and functions

However, you should use `STRING` if:
- You're using Databricks Runtime older than 15.3
- You need to export the data to another system that doesn't support VARIANT
- You prefer to handle JSON parsing in your application code

### What's the difference between a SQL warehouse and an all-purpose cluster?

For batch exports, we recommend using a **SQL warehouse** rather than an all-purpose cluster because:
- SQL warehouses are optimized for SQL workloads and data export tasks
- They provide better cost management with auto-suspend features
- They offer better concurrency and performance for analytics queries

However, both will work for batch exports as long as you have the correct HTTP path configured.
