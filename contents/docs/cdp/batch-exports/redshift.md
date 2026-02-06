---
title: Redshift destination for batch exports
sidebar: Docs
showTitle: true
availability:
    free: full
    selfServe: full
    enterprise: full
---

Batch exports can be used to export data to Redshift, Amazon's data warehouse product. There are two SQL commands that can be used to export data: `COPY` and `INSERT`. Essentially, `COPY` works by reading and writing entire files in parallel from an S3 bucket, where as `INSERT` works by writing batches of rows. In general, we recommend `COPY` as it offers significantly better performance, but `INSERT` is provided as an alternative that requires less setup.

## Creating the batch export

1. Click [Data management > Destinations](https://app.posthog.com/data-management/destinations) in the left sidebar.
2. Click **+ New destination** in the top-right corner.
3. Search for **Redshift**.
4. Click the **+ Create** button.
5. Fill in the necessary [configuration details](#redshift-configuration).
6. Finalize the creation by clicking on "Create".
7. Done! The batch export will schedule its first run on the start of the next period.

## Redshift configuration

Regardless of the SQL command used, configuring a batch export targeting Redshift requires the following Redshift-specific configuration values:

- **User:** A Redshift user name with permissions to insert data into the specified table and, if the table does not exist, permissions to create the table.
- **Password:** The password for the Redshift user specified.
- **Host:** The endpoint of your Redshift cluster, excluding the port number and database name.
- **Port:** The port number on which the Redshift cluster is listening (default is 5439).
- **Database:** The name of the Redshift database to which the data is to be exported.
- **Schema:** The name of the schema within the database. This determines where the table for exporting data will be located.
- **Table name:** The name of the table where the data will be inserted.
- **Semi-structured data type:** The Redshift data type to use to export semi-structured data, like data in the `properties`, `set`, and `set_once` columns of the `events` model. This can be either `SUPER` or `VARCHAR(65535)`. We recommend `SUPER` as `VARCHAR` limits the document size to 65535 bytes, whereas with a `SUPER` type the limit applies per value in the document, instead of to the entire document.
- **Events to exclude:** A list of events to omit from the exported data.
- **Events to include:** A list of events to include in the exported data. If added, only these events will be exported.

Additionally, when choosing to `COPY` data to Redshift, the batch export requires access to an S3 bucket, thus the additional configuration is required:
* **Bucket name:** The name of the S3 bucket. The bucket must already exist.
* **Region:** The AWS region where the bucket is located. This must be in the same region as your Redshift instance.
* **Key prefix:** A key prefix to use for the batch export files. The files will be cleaned up after the batch export finishes.
* **AWS Access Key ID:** An AWS access key ID with access to the S3 bucket.
* **AWS Secret Access Key:** An AWS secret access key with access to the S3 bucket.

Finally, Redshift needs access to your S3 bucket too, and we must provide it with either AWS credentials (which could be the same PostHog uses to access your bucket) or an IAM role that Redshift can assume with sufficient privileges to read from your S3 bucket. We recommend using an IAM role to avoid the need for another set of credentials.

## Models

> **Note:** New fields may be added to these models over time. To maintain consistency, these fields are not automatically added to the destination tables. If a particular field is missing in your Redshift tables, you can manually add the field, and it will be populated in future exports.

### Events model

This is the default model for Redshift batch exports. The schema of the model as created in Redshift is:

| Field        | Type                          | Description                                                               |
|--------------|-------------------------------|---------------------------------------------------------------------------|
| uuid         | `VARCHAR(200)`                | The unique ID of the event within PostHog                                 |
| event        | `VARCHAR(200)`                | The name of the event that was sent                                       |
| properties   | `SUPER` or `VARCHAR(65535)`   | A JSON object with all the properties sent along with an event            |
| elements     | `VARCHAR(65535)`              | This field is present for backwards compatibility but has been deprecated |
| set          | `SUPER` or `VARCHAR(65535)`   | A JSON object with any person properties sent with the `$set` field       |
| set_once     | `SUPER` or `VARCHAR(65535)`   | A JSON object with any person properties sent with the `$set_once` field  |
| distinct_id  | `VARCHAR(200)`                | The `distinct_id` of the user who sent the event                          |
| team_id      | `INTEGER`                     | The `team_id` for the event                                               |
| ip           | `VARCHAR(200)`                | The IP address that was sent with the event                               |
| site_url     | `VARCHAR(200)`                | This field is present for backwards compatibility but has been deprecated |
| timestamp    | `TIMESTAMP WITH TIME ZONE`    | The timestamp associated with an event                                    |

### Persons model

The schema of the model as created in Redshift is:

| Field                      | Type               | Description                                                                                                                        |
|----------------------------|--------------------|------------------------------------------------------------------------------------------------------------------------------------|
| team_id                    | `INTEGER`        | The id of the project (team) the person belongs to                                                                                 |
| distinct_id                | `VARCHAR(200)`           | A `distinct_id` associated with the person                                                                                         |
| person_id                  | `VARCHAR(200)`           | The id of the person associated to this (`team_id`, `distinct_id`) pair                                                            |
| properties                 | `SUPER` or `VARCHAR(65535)`   | A JSON object with all the latest properties of the person                                                                         |
| person_distinct_id_version | `INTEGER`        | Internal version of the person to `distinct_id` mapping associated with a (`team_id`, `distinct_id`) pair, used by batch export in merge operation |
| person_version             | `INTEGER`        | Internal version of the person properties associated with a (`team_id`, `distinct_id`) pair, used by batch export in merge operation               |
| created_at                 | `TIMESTAMP WITH TIME ZONE`    | The timestamp when the person was created                                                                                          |

The Redshift table will contain one row per `(team_id, distinct_id)` pair, and each pair is mapped to their corresponding `person_id` and latest `properties`.

### Sessions model

You can view the schema for the sessions model in the configuration form when creating a batch export (there are a few too many fields to display here!).
