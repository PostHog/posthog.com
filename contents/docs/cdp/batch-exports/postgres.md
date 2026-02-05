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

> **Notes:** 
> -  We only support connections using SSL/TLS. This [provides protection against various types of attacks](https://www.postgresql.org/docs/current/libpq-ssl.html#LIBPQ-SSL-PROTECTION).

2. Create a Postgres user with table creation privileges.

When executing a batch export, if the destination table doesn't exist, it will be created. `CREATE TABLE` and `USAGE` permissions are required for this reason. The other permissions that are required on the destination table are `INSERT`, `SELECT`, and `UPDATE`. You can and should block PostHog from doing anything else on any other tables. In particular, we recommend creating a new schema and only granting PostHog `CREATE TABLE` and `USAGE` access limited to that schema:

```sql runInPostHog=false
CREATE USER posthog WITH PASSWORD 'insert-a-strong-password-here';
CREATE SCHEMA posthog_exports;
GRANT CREATE ON SCHEMA posthog_exports TO posthog;
GRANT USAGE ON SCHEMA posthog_exports TO posthog;
```

## Models

> **Note:** New fields may be added to these models over time. To maintain consistency, these fields are not automatically added to the destination tables. If a particular field is missing in your Postgres tables, you can manually add the field, and it will be populated in future exports.

### Events model

This is the default model for Postgres batch exports. The schema of the model as created in Postgres is:

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

### Persons model

The schema of the model as created in Postgres is:

| Field                      | Type               | Description                                                                                                                        |
|----------------------------|--------------------|------------------------------------------------------------------------------------------------------------------------------------|
| team_id                    | `INTEGER`        | The id of the project (team) the person belongs to                                                                                 |
| distinct_id                | `TEXT`           | A `distinct_id` associated with the person                                                                                         |
| person_id                  | `TEXT`           | The id of the person associated to this (`team_id`, `distinct_id`) pair                                                            |
| properties                 | `JSONB`          | A JSON object with all the latest properties of the person                                                                         |
| person_distinct_id_version | `INTEGER`        | Internal version of the person to `distinct_id` mapping associated with a (`team_id`, `distinct_id`) pair, used by batch export in merge operation |
| person_version             | `INTEGER`        | Internal version of the person properties associated with a (`team_id`, `distinct_id`) pair, used by batch export in merge operation               |
| created_at                 | `TIMESTAMP WITH TIME ZONE`   | The timestamp when the person was created                                                                                          |

The Postgres table will contain one row per `(team_id, distinct_id)` pair, and each pair is mapped to their corresponding `person_id` and latest `properties`.

### Sessions model

You can view the schema for the sessions model in the configuration form when creating a batch export (there are a few too many fields to display here!).

## Creating the batch export

1. Click [Data management > Destinations](https://app.posthog.com/data-management/destinations) in the left sidebar.
2. Click **+ New destination** in the top-right corner.
3. Select **Postgres** as the batch export destination.
4. Fill in the necessary [configuration details](#postgres-configuration).
5. Finalize the creation by clicking on **Create**.
6. Done! The batch export will schedule its first run on the start of the next period.

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
