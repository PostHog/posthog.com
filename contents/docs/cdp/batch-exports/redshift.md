---
title: Redshift destination for batch exports
sidebar: Docs
showTitle: true
availability:
    free: full
    selfServe: full
    enterprise: full
---

Batch exports can be used to export data to Redshift, Amazon's data warehouse product.

## Creating the batch export

1. Subscribe to data pipelines add-on in [your billing settings](https://us.posthog.com/organization/billing) if you haven't already.
2. Click on [data pipeline](https://us.posthog.com/apps) in the sidebar and go to the exports tab in your PostHog instance.
3. Click "Create export workflow".
4. Select **Redshift** as the batch export type.
5. Fill in the necessary [configuration details](#redshift-configuration).
6. Finalize the creation by clicking on "Create".
7. Done! The batch export will schedule its first run on the start of the next period.

## Redshift configuration

Configuring a batch export targeting Redshift requires the following Redshift-specific configuration values:

- **User:** A Redshift user name with permissions to insert data into the specified table and, if the table does not exist, permissions to create the table.

- **Password:** The password for the Redshift user specified.

- **Host:** The endpoint of your Redshift cluster, excluding the port number and database name.

- **Port:** The port number on which the Redshift cluster is listening (default is 5439).

- **Database:** The name of the Redshift database to which the data is to be exported.

- **Schema:** The name of the schema within the database. This determines where the table for exporting data will be located.

- **Table name:** The name of the table where the data will be inserted.

- **Properties data type:** The data type configurations for the `properties`, `set`, and `set_once` columns, either `VARCHAR(65535)` or `SUPER`.

- **Events to exclude:** A list of events to omit from the exported data.

- **Events to include:** A list of events to include in the exported data. If added, only these events will be exported.

## Event schema

This is the schema of all the fields that are exported to Redshift.

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