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

Here's how to set these up so that the app has access only to the dataset it needs:

1. Create a [Service Account](https://cloud.google.com/iam/docs/service-accounts-create#creating).

![Create service account](../../../images/docs/batch-exports/bigquery/create-service-account.png)

2. Create a [key](https://cloud.google.com/iam/docs/keys-create-delete#creating) for the Service Account you created in the previous step.
3. Save the key file as JSON to upload it when configuring a batch export.

![Create JSON private key](../../../images/docs/batch-exports/bigquery/create-private-key-json.png)

4. Create a role which has only the specific permissions the batch export requires (listed below), or use the built in `BigQuery Data Owner` and `BigQuery Job User` roles. If you create a custom role, you will need:
   * `bigquery.datasets.get`
   * `bigquery.jobs.create`
   * `bigquery.tables.create`
   * `bigquery.tables.get`
   * `bigquery.tables.list`
   * `bigquery.tables.updateData`

![Create custom role for batch exports](../../../images/docs/batch-exports/bigquery/create-role.png)

5. Grant the Service Account access to run jobs in your Google Cloud project. This can be done by granting the `BigQuery Jobs User` role or the role we created in the previous step on your project.

Navigate to IAM and click on Grant Access to arrive at this screen:

![Project grant](../../../images/docs/batch-exports/bigquery/project-grant.png)

> In the screenshot above, we have used a custom role named `Testing PostHog BatchExports` with the permissions listed in the previous step.

6. Create a dataset within a BigQuery project (ours is called `BatchExports`, but any name will do).
7. Follow the instructions on [granting access to a dataset in BigQuery](https://cloud.google.com/bigquery/docs/control-access-to-resources-iam#grant_access_to_a_dataset):

![Sharing dataset](../../../images/docs/batch-exports/bigquery/dataset-sharing.png)
![Add principal](../../../images/docs/batch-exports/bigquery/dataset-add-principal.png)

Use the Sharing and Add Principal buttons to share your dataset with your new Service Account created in step 1.

Grant either the `BigQuery Data Owner` role, or your custom role created in step 4 to the Service Account. In the screenshot below, we have used a custom role named `Testing PostHog BatchExports`.

![Sharing dataset](../../../images/docs/batch-exports/bigquery/dataset-grant-access.png)

8. All done! After completing these steps you can create a BigQuery batch export and your data will start flowing from PostHog to BigQuery.

## Event schema

This is the schema of all the fields that are exported to BigQuery.

| Field                 | Type        | Description                                                                                                         |
|-----------------------|-------------|---------------------------------------------------------------------------------------------------------------------|
| uuid                  | `STRING`    | The unique ID of the event within PostHog                                                                           |
| event                 | `STRING`    | The name of the event that was sent                                                                                 |
| properties            | `STRING`    | A JSON object with all the properties sent along with an event                                                      |
| elements              | `STRING`    | A string of elements surrounding an [autocaptured](/docs/data/autocapture) event                                    |
| set                   | `STRING`    | A JSON object with any person properties sent with the `$set` field                                                 |
| set_once              | `STRING`    | A JSON object with any person properties sent with the `$set_once` field                                            |
| distinct_id           | `STRING`    | The `distinct_id` of the user who sent the event                                                                    |
| team_id               | `STRING`    | The `team_id` for the event                                                                                         |
| ip                    | `STRING`    | The IP address that was sent with the event                                                                         |
| site_url              | `STRING`    | The $current_url property of the event. This field has been kept for backwards compatibility and will be deprecated |
| timestamp             | `TIMESTAMP` | The timestamp associated with an event                                                                              |
| bq_ingested_timestamp | `TIMESTAMP` | The timestamp when the event was sent to BigQuery                                                                   |

## Creating the batch export

1. Navigate to the exports page in your PostHog instance (Quick links if you use [PostHog Cloud US](https://app.posthog.com/batch_exports) or [PostHog Cloud EU](https://eu.posthog.com/batch_exports)).
2. Click "Create export workflow".
3. Select **BigQuery** as the batch export destination.
4. Fill in the necessary [configuration details](#bigquery-configuration).
5. Finalize the creation by clicking on "Create".
6. Done! The batch export will schedule its first run on the start of the next period.

## BigQuery configuration

Configuring a batch export targeting BigQuery requires the following BigQuery-specific configuration values:
* **Table ID:** The ID of a BigQuery table where to export the data. This is not the fully-qualified name of a table, so omit the dataset and project IDs. For example for the fully-qualified table name `project-123:dataset:MyExportTable` only `MyExporTable` is to be used as the table ID.
* **Dataset ID:** The ID of a BigQuery dataset where the table to export the data is located. Only the dataset ID is required, so omit the project ID. For example for the dataset `project-123:my-dataset` only `my-dataset` is to be used as the dataset ID.
* **Google Cloud JSON key file:** In order to access your BigQuery instance, we use a Service Account. When creating one, a JSON key file will be generated. That JSON file needs to be uploaded here. See [here](#setting-up-bigquery-access) for more information.
