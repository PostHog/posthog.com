---
title: Postgres destination for batch exports
sidebar: Docs
showTitle: true
availability:
    free: full
    selfServe: full
    enterprise: full
---

Batch exports can be used to export data to a Postgres table.

## Setting up Postgres access

1. Make sure PostHog can access your Postgres database.

> **Note:** Wherever your Postgres database is hosted, make sure the host is set to accept all incoming connections so that PostHog can connect to the database and insert events. PostHog does not guarantee a static list of IP addresses to whitelist. If this is not possible in your case, consider exporting data to a different destination (like [S3](./s3.md)) and then setting up your own system for getting data into your Postgres database.

2. Create a Postgres user with table creation privileges.

When executing a batch export, if the destination table doesn't exist, it will be created. `CREATE TABLE` and `USAGE` permissions are required for this reason. You can and should block PostHog from doing anything else on any other tables. In particular, we recommend creating a new schema and only granting PostHog `CREATE TABLE` and `USAGE` access limited to that schema:

```sql
CREATE USER posthog WITH PASSWORD 'insert-a-strong-password-here';
CREATE SCHEMA posthog_exports;
GRANT CREATE ON SCHEMA posthog_exports TO posthog;
GRANT USAGE ON SCHEMA posthog_exports TO posthog;
```

## Event schema

This is the schema of all the fields that are exported to Postgres.

| Field       | Type           | Description                                                               |
|-------------|----------------|---------------------------------------------------------------------------|
| uuid        | `VARCHAR(200)` | The unique ID of the event within PostHog                                 |
| event       | `VARCHAR(200)` | The name of the event that was sent                                       |
| properties  | `JSONB`        | A JSON object with all the properties sent along with an event            |
| elements    | `JSONB`        | This field is present for backwards compatibility but has been deprecated |
| set         | `JSONB`        | A JSON object with any person properties sent with the `$set` field       |
| set_once    | `JSONB`        | A JSON object with any person properties sent with the `$set_once` field  |
| distinct_id | `VARCHAR(200)` | The `distinct_id` of the user who sent the event                          |
| team_id     | `INTEGER`      | The `team_id` for the event                                               |
| ip          | `VARCHAR(200)` | The IP address that was sent with the event                               |
| site_url    | `VARCHAR(200)` | This field is present for backwards compatibility but has been deprecated |
| timestamp   | `TIMESTAMP WITH TIME ZONE`    | The timestamp associated with an event                                    |

## Creating the batch export

1. Subscribe to data pipelines add-on in [your billing settings](https://us.posthog.com/organization/billing) if you haven't already.
2. Click on [data pipeline](https://us.posthog.com/apps) in the sidebar and go to the exports tab in your PostHog instance.
3. Click "Create export workflow".
4. Select **Postgres** as the batch export destination.
5. Fill in the necessary [configuration details](#postgres-configuration).
6. Finalize the creation by clicking on "Create".
7. Done! The batch export will schedule its first run on the start of the next period.

## Postgres configuration

Configuring a batch export targeting Postgres requires the following Postgres-specific configuration values:
* **User:** User for your Postgres database with CREATE TABLE access used by PostHog to login to your database.
* **Password:** The password of the username provided.
* **Host:** The host name of the server on which your Postgres database is running.
* **Port:** The TCP port on which the Postgres database server is listening for connections.
* **Table name:** The name of a Postgres table where to export the data.
* **Database:** The name of the Postgres database where the table provided to insert data is located.
* **Schema:** The name of the Postgres database schema where the table provided to insert data is located.
* **Does your Postgres instance have a self-signed SSL certificate?**: In most cases, Heroku and RDS users should check this box.
