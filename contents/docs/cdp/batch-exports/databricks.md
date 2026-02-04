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

import { CalloutBox } from 'components/Docs/CalloutBox'

<CalloutBox icon="IconInfo" title="Databricks destination is in beta" type="fyi">

The Databricks destination is currently in `beta`. This means the configuration and features are subject to change.

</CalloutBox>

## Requirements

To create a batch export to Databricks, you need the following:

- A Databricks account with serverless SQL warehouses enabled
- A Databricks workspace with Unity Catalog enabled
- A SQL warehouse
- A catalog and schema you wish to use
- A service principal with [OAuth Machine-to-Machine (M2M)](https://docs.databricks.com/aws/en/dev-tools/auth/oauth-m2m) authentication configured. This is the only authentication type we support currently. This service principal must have the appropriate permissions (see below)

## Setup instructions

### 1. SQL warehouse

Batch exports uses SQL warehouses to export data into your Delta tables.

You can use either an existing warehouse, or you can [create a new one](https://docs.databricks.com/aws/en/compute/sql-warehouse/create).

You will need to make a note of the **Server hostname** and **HTTP path** for your warehouse:

1. In Databricks, navigate to **SQL Warehouses**.
2. Select your SQL warehouse.
3. Go to the **Connection details** tab.
4. Copy the **Server hostname** (e.g. `abc123.cloud.databricks.com`).
5. Copy the **HTTP path** (e.g. `/sql/1.0/warehouses/abc123def456`).

### 2. Set up catalog and schema

1. In your Databricks workspace, create a catalog (or use an existing one) where PostHog will export data.
2. Create a schema within that catalog (or use an existing one).
3. Note the names of both the catalog and schema – you'll need these when configuring the batch export.

> **Note:** You don't need to create tables manually. PostHog will create destination tables for you to ensure the data schemas are correct.

### 3. Create a service principal

Service principals give automated tools and scripts API-only access to Databricks resources, providing greater security than using user accounts.

1. In your Databricks workspace, navigate to **Settings** > **Identity and access** > **Service principals**.
2. Click **Add service principal**.
3. Click **Add new**.
4. Enter a name for your service principal (e.g. "PostHog Batch Exports").
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

**At the schema level:**
- `USE SCHEMA` - Required to access the schema
- `CREATE TABLE` - Required to create new tables (if the destination table doesn't exist)
- `CREATE VOLUME` - Required to create temporary volumes for staging data

**At the table level:**

(Only needed if your table already exists. In general it is recommended to allow PostHog to create tables for you to ensure the data schemas are correct)

- `SELECT` - Required to read the table schema
- `MODIFY` - Required to insert and update data

You can grant these permissions using SQL commands in Databricks:

```sql runInPostHog=false
-- Grant catalog permissions
GRANT USE CATALOG ON CATALOG `<catalog_name>` TO `<service_principal_id_or_group>`;

-- Grant schema permissions
GRANT USE SCHEMA ON SCHEMA `<catalog_name>`.`<schema_name>` TO `<service_principal_id_or_group>`;
GRANT CREATE TABLE ON SCHEMA `<catalog_name>`.`<schema_name>` TO `<service_principal_id_or_group>`;
GRANT CREATE VOLUME ON SCHEMA `<catalog_name>`.`<schema_name>` TO `<service_principal_id_or_group>`;

-- Grant table permissions (only needed if the table already exists)
GRANT SELECT ON TABLE `<catalog_name>`.`<schema_name>`.`<table_name>` TO `<service_principal_id_or_group>`;
GRANT MODIFY ON TABLE `<catalog_name>`.`<schema_name>`.`<table_name>` TO `<service_principal_id_or_group>`;
```

> **Note:** Replace `<catalog_name>`, `<schema_name>`, `<table_name>`, and `<service_principal_id_or_group>` with your actual values. You can either assign permissions to the service principal directly or via a [group](https://docs.databricks.com/aws/en/admin/users-groups/groups).


## Creating the batch export

1. In PostHog, click [Data management > Destinations](https://app.posthog.com/data-management/destinations) in the left sidebar.
2. Click **+ New destination** in the top-right corner.
3. Search for **Databricks**.
4. Click the **+ Create** button.
5. Fill in the necessary [configuration details](#databricks-configuration)
6. Create a Databricks integration (if you haven't already):
   - Enter a name for the integration
   - Enter your **Server hostname** (from [step 1](#1-sql-warehouse))
   - Enter your **Client ID** (from [step 4](#4-generate-oauth-credentials))
   - Enter your **Client Secret** (from [step 4](#4-generate-oauth-credentials))
7. Finalize the creation by clicking on **Create**.
8. Done! The batch export will schedule its first run on the start of the next period.

## Databricks configuration

You'll need to specify the following configuration settings in PostHog:

**Connection settings:**
* **Integration:** Select the Databricks integration you created (or create a new one). The integration stores your server hostname and OAuth credentials securely.
* **HTTP Path:** The HTTP path value for your SQL warehouse or all-purpose compute cluster (e.g. `/sql/1.0/warehouses/abc123def456`).

**Destination settings:**
* **Catalog:** The name of the Databricks catalog where the table will be created.
* **Schema:** The name of the schema within the catalog where the table will be created.
* **Table name:** The name of the table where data will be exported. If the table doesn't exist, it will be created automatically (this is the recommended approach).

**Advanced settings (optional):**
* **Use VARIANT type:** Whether to use Databricks' `VARIANT` type for JSON fields (like `properties` and `person_properties`). Enabled by default. The `VARIANT` type is optimized for semi-structured data and provides better querying performance. However, it requires **Databricks Runtime 15.3 or above**. If you're using an older runtime version, disable this setting to use `STRING` type instead.


## Models

This section describes the models that can be exported to Databricks.

> **Note:** New fields may be added to these models over time. PostHog uses Databricks' [automatic schema evolution](https://docs.databricks.com/aws/en/delta/update-schema#automatic-schema-evolution-for-delta-lake-merge) feature, which means these new fields will be automatically added to your destination tables. Existing columns are never removed or modified.

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
| databricks_ingested_timestamp  | `TIMESTAMP` | An additional metadata column, indicating when the event was ingested into Databricks          |

### Persons model

The schema of the model as created in Databricks is:

| Field                      | Type        | Description                                                                                                    |
|----------------------------|-------------|----------------------------------------------------------------------------------------------------------------|
| team_id                    | `BIGINT`    | The id of the project (team) the person belongs to                                                             |
| distinct_id                | `STRING`    | A `distinct_id` associated with the person                                                                     |
| person_id                  | `STRING`    | The id of the person associated to this (`team_id`, `distinct_id`) pair                                        |
| properties                 | `VARIANT` or `STRING` | A JSON object with all the latest properties of the person                                           |
| person_version             | `BIGINT`    | Internal version of the person properties, used by batch export in merge operation                             |
| person_distinct_id_version | `BIGINT`    | Internal version of the person to `distinct_id` mapping, used by batch export in merge operation               |
| created_at                 | `TIMESTAMP` | The timestamp when the person was created                                                                      |

The Databricks table will contain one row per `(team_id, distinct_id)` pair, and each pair is mapped to their corresponding `person_id` and latest `properties`.

### Sessions model

You can view the schema for the sessions model in the configuration form when creating a batch export (there are a few too many fields to display here!).

## FAQ

### How does the batch export process work?

The batch export process follows a consistent pattern regardless of the model being exported, with variations depending on whether the model is mutable (like persons) or immutable (like events).

**For immutable models (e.g. events):**

1. Create a temporary volume to store Parquet files.
2. Create the destination table if it doesn't exist.
3. Query data from PostHog and transform it into Parquet format.
4. Upload Parquet files to the temporary volume.
5. Copy data directly from the volume into the destination table using Databricks' `COPY INTO` command.
6. Delete the temporary volume.

**For mutable models (e.g. persons, sessions):**

1. Create a temporary volume to store Parquet files.
2. Create the destination table if it doesn't exist.
3. Create a temporary stage table with the same schema as the destination table.
4. Query data from PostHog and transform it into Parquet format.
5. Upload Parquet files to the temporary volume.
6. Copy data from the volume into the **stage table** using `COPY INTO`.
7. Execute a `MERGE` operation between the stage table and the destination table:
   - Update existing rows where the stage table has newer versions.
   - Insert new rows that don't exist in the destination table.
8. Delete the stage table and temporary volume.

The merge operation for mutable models ensures that:
- Rows that match in the destination table and have newer version fields in the stage table are updated.
- New rows not found in the destination table are inserted.
- Your data always reflects the latest state while maintaining historical records that haven't been updated.


### Should I use VARIANT or STRING type for JSON fields?

We recommend using `VARIANT` (the default) for the following reasons:
- Better query performance
- Native support for JSON operators and functions

However, you should use `STRING` if:
- You're using Databricks Runtime older than 15.3
- You need to export the data to another system that doesn't support VARIANT
- You prefer to handle JSON parsing in your application code
