---
title: BigQuery destination for batch exports
sidebar: Docs
showTitle: true
availability:
  free: full
  selfServe: full
  enterprise: full
---

Batch exports can be used to export data to a BigQuery table.

## Setting up BigQuery access

To set up the right permissions for a batch export targeting BigQuery, you need:

1. A Service Account.
2. A dataset which has permissions allowing the service account to access it.

Here's how to set these up so that the destination has access only to the dataset it needs:

1. Create a [Service Account](https://cloud.google.com/iam/docs/service-accounts-create#creating).

![Create service account](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/batch-exports/bigquery/create-service-account.png)

2. Create a [key](https://cloud.google.com/iam/docs/keys-create-delete#creating) for the Service Account you created in the previous step.
3. Save the key file as JSON to upload it when configuring a batch export.

![Create JSON private key](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/batch-exports/bigquery/create-private-key-json.png)

4. Create a role which has only the specific permissions the batch export requires:
   * `bigquery.datasets.get`
   * `bigquery.jobs.create`
   * `bigquery.tables.create`
   * `bigquery.tables.get`
   * `bigquery.tables.getData`
   * `bigquery.tables.list`
   * `bigquery.tables.updateData`
   * (Optional, for mutable models) `bigquery.tables.delete`

![Create custom role for batch exports](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/batch-exports/bigquery/create-role.png)

This step can be skipped if using the built-in roles `BigQuery Data Editor` and `BigQuery Job User` in the steps that follow.

5. Grant the Service Account access to run jobs in your Google Cloud project. This can be done by granting the `BigQuery Jobs User` role or the role we created in the previous step on your project.

Navigate to IAM and click on Grant Access to arrive at this screen:

![Project grant](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/batch-exports/bigquery/project-grant.png)

> In the screenshot above, we have used a custom role named `Testing PostHog BatchExports` with the permissions listed in the previous step.

6. Create a dataset within a BigQuery project (ours is called `BatchExports`, but any name will do).
7. Use the Sharing and Add Principal buttons to grant access to your dataset with your Service Account created in step 1. Next, assign either the `BigQuery Data Editor` role or your custom role created in step 4 to provide permissions for the dataset access. Read the full instructions on [granting access to the dataset in BigQuery](https://cloud.google.com/bigquery/docs/control-access-to-resources-iam#grant_access_to_a_dataset) if unclear.

![Sharing dataset](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/batch-exports/bigquery/dataset-sharing.png)
![Add principal](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/batch-exports/bigquery/dataset-add-principal.png)

> In the screenshot below, we grant our Service Account access to the `BatchExports` data set and assign the `Testing PostHog BatchExports` role permissions for it.

![Dataset grant access](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/batch-exports/bigquery/dataset-grant-access.png)

8. All done! After completing these steps you can create a BigQuery [batch export in PostHog](https://app.posthog.com/pipeline/new/destination?search=bigquery) and your data will start flowing from PostHog to BigQuery.

## Models

This section describes the models that can be exported to BigQuery.

> **Note:** New fields may be added to these models over time. To maintain consistency, these fields are not automatically added to the destination tables. If a particular field is missing in your BigQuery tables, you can manually add the field, and it will be populated in future exports.

### Events model

This is the default model for BigQuery batch exports. The schema of the model as created in BigQuery is:

| Field                 | Type               | Description                                                               |
|-----------------------|--------------------|---------------------------------------------------------------------------|
| uuid                  | `STRING`           | The unique ID of the event within PostHog                                 |
| event                 | `STRING`           | The name of the event that was sent                                       |
| properties            | `STRING` or `JSON` | A JSON object with all the properties sent along with an event            |
| elements              | `STRING`           | This field is present for backwards compatibility but has been deprecated |
| set                   | `STRING` or `JSON` | A JSON object with any person properties sent with the `$set` field       |
| set_once              | `STRING` or `JSON` | A JSON object with any person properties sent with the `$set_once` field  |
| distinct_id           | `STRING`           | The `distinct_id` of the user who sent the event                          |
| team_id               | `INT64`            | The `team_id` for the event                                               |
| ip                    | `STRING`           | The IP address that was sent with the event                               |
| site_url              | `STRING`           | This field is present for backwards compatibility but has been deprecated |
| timestamp             | `TIMESTAMP`        | The timestamp associated with an event                                    |
| bq_ingested_timestamp | `TIMESTAMP`        | The timestamp when the event was sent to BigQuery                         |

Some fields can be either `STRING` or `JSON` type depending on whether the corresponding checkbox is marked or not when creating the batch export.

### Persons model

The schema of the model as created in BigQuery is:

| Field                      | Type               | Description                                                                                                                        |
|----------------------------|--------------------|------------------------------------------------------------------------------------------------------------------------------------|
| team_id                    | `INT64`            | The id of the project (team) the person belongs to                                                                                 |
| distinct_id                | `STRING`           | A `distinct_id` associated with the person                                                                                         |
| person_id                  | `STRING`           | The id of the person associated to this (`team_id`, `distinct_id`) pair                                                            |
| properties                 | `STRING` or `JSON` | A JSON object with all the latest properties of the person                                                                         |
| person_version             | `INT64`            | Internal version of the person properties associated with a (`team_id`, `distinct_id`) pair, used by batch export in merge operation               |
| person_distinct_id_version | `INT64`            | Internal version of the person to `distinct_id` mapping associated with a (`team_id`, `distinct_id`) pair, used by batch export in merge operation |
| created_at                 | `TIMESTAMP`        | The timestamp when the person was created                                                                                          |

The BigQuery table will contain one row per `(team_id, distinct_id)` pair, and each pair is mapped to their corresponding `person_id` and latest `properties`. The `properties` field can be either `STRING` or `JSON`, depending on whether the corresponding checkbox is marked or not when creating the batch export.

### Sessions model

You can view the schema for the sessions model in the configuration form when creating a batch export (there are a few too many fields to display here!).

## Creating the batch export

1. Click [Data management > Destinations](https://app.posthog.com/data-management/destinations) in the left sidebar.
2. Click **+ New destination** in the top-right corner.
3. Select **BigQuery** as the batch export destination.
4. Fill in the necessary [configuration details](#bigquery-configuration).
5. Finalize the creation by clicking on **Create**.
6. Done! The batch export will schedule its first run on the start of the next period.

## BigQuery configuration

Configuring a batch export targeting BigQuery requires the following BigQuery-specific configuration values:
* **Table ID:** The ID of the destination BigQuery table. This is not the fully-qualified name of a table, so omit the dataset and project IDs. For example for the fully-qualified table name `project-123:dataset:MyExportTable`, use only `MyExportTable` as the table ID.
* **Dataset ID:** The ID of the BigQuery dataset which contains the destination table. Only the dataset ID is required, so omit the project ID if present. For example for the fully-qualified dataset `project-123:my-dataset`, use only `my-dataset` as the dataset ID.
* **Google Cloud JSON key file:** The JSON key file for your BigQuery Service Account to access your instance. Generated on Service Account creation. See the [BigQuery access setup section](#setting-up-bigquery-access) for more information.

## Examples

These examples illustrate how to use the data from batch exports in BigQuery.

### Requirements

Two batch exports need to be created:
* An events model batch export.
* A persons model batch export.

For the purposes of these examples, assume that these two batch exports have already been created and have exported some data to BigQuery in tables `example.events` and `example.persons`.

### Example: Count unique persons that have triggered an event

The following query can be used to count the number of unique persons that have triggered events:

```sql runInPostHog=false
SELECT
  event,
  COUNT(persons.person_id) AS unique_persons_count
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

## FAQ

### How does PostHog keep the persons model (or any mutable model) up to date?

Exporting a mutable model can be divided into new rows that have to be inserted, and existing rows that have to be updated. When a PostHog batch export exports mutable data (like the persons model) to BigQuery, it executes a merge operation to apply new updates to existing rows.

The operation the PostHog batch export executes in BigQuery roughly involves the following steps:

1. Creating a stage table.
2. Inserting new data into stage table.
3. Execute a merge operation between existing table and stage table.
    a. Any rows that match in the final table and for which any of the stage table's version fields is higher are updated.
    b. Any new rows not found in the final table are inserted.
4. Drop the stage table.

### Why are additional permissions required to export the persons model?

The merge operation described above explains why a mutable export requires additional permissions beyond the permissions required for exporting the events model: Since we need to clean-up a stage table, `bigquery.tables.delete` is required.

### Which jobs does the batch export run in BigQuery?

If you check your BigQuery [JOBS view](https://cloud.google.com/bigquery/docs/information-schema-jobs) or the [Google Cloud console](https://cloud.google.com/bigquery/docs/managing-jobs#view-job) for job details, you may notice the PostHog batch export running jobs in your BigQuery warehouse.

Regardless of model, PostHog batch exports run a [load job](https://cloud.google.com/bigquery/docs/batch-loading-data) to batch load the data for the current period into BigQuery. Moreover, you will see additional [query jobs](https://cloud.google.com/bigquery/docs/running-queries) in your logs when exporting a mutable model as the merge operation the batch export executes requires running additional queries in your BigQuery warehouse.

If you are noticing an issue with your BigQuery batch export, it may be useful to check the aforementioned [JOBS view](https://cloud.google.com/bigquery/docs/information-schema-jobs) and the [Google Cloud console](https://cloud.google.com/bigquery/docs/managing-jobs#view-job). The error logs in them could be valuable to either diagnose the issue by yourself, or when creating a support request for us to look into.
