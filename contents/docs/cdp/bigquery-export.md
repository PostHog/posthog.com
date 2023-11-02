---
title: BigQuery
github: https://github.com/PostHog/bigquery-plugin
thumbnail: ../../cdp/thumbnails/bigquery.svg
tags:
    - bigquery-export
---

> **Important:** This app has been deprecated in favor of the [BigQuery batch exports destination](/docs/cdp/batch-exports/bigquery). 

This app streams events from PostHog into BigQuery as they are ingested.

## Requirements

This requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

## Enabling the destination

1. Visit the 'Apps' page from PostHog.
2. Search for 'BigQuery' and select the 'BigQuery Export' app.
3. Click on the blue settings icon and follow the [configuration](#setting-up-bigquery-access) steps:
    1. Upload your Google Cloud key `.json` file. (See below for instructions on how to retrieve this.)
    2. Enter your Dataset ID
    3. Enter your Table ID
4. Watch events roll into BigQuery

## Setting up BigQuery access

To set the right permissions up for the BigQuery plugin, you'll need:

1. A service account.
2. A dataset which has permissions allowing the service account to access it.

Here's how to set these up so that the app has access only to the table it needs:

1. [Create a service account](https://cloud.google.com/bigquery/docs/reference/libraries#setting_up_authentication). Keep hold of the JSON file at the end of these steps for setting up the app, and remember the name too.

2. Create a role which has only the specific permissions the PostHog BigQuery app requires (listed below), or use the built in `BigQuery DataOwner` permission. If you create a custom role, you will need:

    - `bigquery.datasets.get`
    - `bigquery.tables.create`
    - `bigquery.tables.get`
    - `bigquery.tables.list`
    - `bigquery.tables.updateData`

3. Create a dataset within a BigQuery project (ours is called `posthog`, but any name will do).

4. Follow the instructions [on granting access to a dataset in BigQuery](https://cloud.google.com/bigquery/docs/dataset-access-controls#granting_access_to_a_dataset) to ensure your new service account has been granted either the role you created or the "BigQuery Data Owner" permission.

![SQL_workspace_–_BigQuery_–_Data_Warehouse_Exp_–_Google_Cloud_Platform](https://user-images.githubusercontent.com/1108173/130323561-444cbbf6-a994-455e-97b6-8db6df69e274.png)

Use the Share Dataset button to share your dataset with your new service account and either the `BigQuery DataOwner` role, or your custom role created above. In the below, we've used a custom role `PostHog Ingest`.

![SQL_workspace_–_BigQuery_–_Data_Warehouse_Exp_–_Google_Cloud_Platform](https://user-images.githubusercontent.com/1108173/130323602-50f13200-6fde-4ee9-b507-1bce75fc75b2.png)

That's it! Once you've done the steps above, your data should start flowing from PostHog to BigQuery.

## Event schema

Here is a summary of all the fields that are exported to BigQuery.

| Field                 | Type        | Description                                                                             |
| --------------------- | ----------- | --------------------------------------------------------------------------------------- |
| uuid                  | `STRING`    | The unique ID of the event within PostHog                                               |
| event                 | `STRING`    | The name of the event that was sent                                                     |
| properties            | `STRING`    | A JSON object with all the properties sent along with an event                          |
| elements              | `STRING`    | Elements surrounding an [autocaptured](/docs/data/autocapture) event |
| set                   | `STRING`    | A JSON object with any person properties sent with the `$set` field                     |
| set_once              | `STRING`    | A JSON object with any person properties sent with the `$set_once` field                |
| distinct_id           | `STRING`    | The `distinct_id` of the user who sent the event                                        |
| team_id               | `STRING`    | The `team_id` for the event                                                             |
| ip                    | `STRING`    | The IP address that was sent with the event                                             |
| site_url              | `STRING`    | This is always set as an empty string for backwards compatibility                       |
| timestamp             | `TIMESTAMP` | The timestamp when the event was ingested into PostHog                                  |
| bq_ingested_timestamp | `TIMESTAMP` | The timestamp when the event was sent to BigQuery                                       |

## Configuration

<AppParameters />

## Troubleshooting

### What should I do if events aren't showing up?

The best way to debug events not showing up is by viewing the logs, which can be accessed by clicking the 'Logs' icon just to the left of the blue settings button.
This will bring up a new panel with a list of all the most recent logs from our app.
Take a look back through the log and see if there are any `ERROR` messages that can help provide more information on why the export is failing.

> **Tip:** You can filter down and only view `ERROR` or `WARN` messages using the toggles at the top of the panel next to 'Show logs of type'

### Why am I seeing duplicate PostHog events in BigQuery?

There's a very rare case when duplicate events appear in BigQuery. This happens due to network errors, where the export seems to have failed, yet it actually reaches BigQuery.

While this shouldn't happen, if you find duplicate events in BigQuery, follow these [Google Cloud docs](https://cloud.google.com/bigquery/streaming-data-into-bigquery#manually_removing_duplicates) to manually remove them.

Here is an example query based on the [Google Cloud docs](https://cloud.google.com/bigquery/streaming-data-into-bigquery#manually_removing_duplicates) that would remove duplicates:

```sql
WITH
-- first add a row number, one for each uuid
raw_data AS
(
       SELECT *,
              Row_number() OVER (partition BY uuid) AS row_number
       FROM   `<project_id>.<dataset>.<TABLE>`
       WHERE  date(timestamp) = '<YYYY-MM-DD>' ),
-- now just filter for one row per uuid
raw_data_deduplicated AS
(
       SELECT *
       EXCEPT (row_number)
       FROM   raw_data
       WHERE  row_number = 1 )
SELECT *
FROM   raw_data_deduplicated ;
```

## FAQ

### Who created this app?

We'd like to thank PostHog team members [Yakko Majuri](https://github.com/yakkomajuri), [Marius Andra](https://github.com/mariusandra), [Neil Kakkar](https://github.com/neilkakkar), [Michael Matloka](https://github.com/Twixes) and community member [Edward Hartwell Goose](https://github.com/edhgoose) for creating this.

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 