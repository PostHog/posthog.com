---
title: BigQuery Export documentation
showTitle: true
topics:
    - bigquery-export
---

### What does the BigQuery Export app do?

This app streams events from PostHog directly into a BigQuery service account, as they are ingested. This is especially useful if you have an existing data warehouse or data lake running in BigQuery. 

### What are the requirements for this app?

The BigQuery Export app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later. 

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)! 

You'll also need access to the BigQuery instance you want to export to. 

### How do I install the BigQuery export app for PostHog?

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'BigQuery' and select the app, press Install.
3. Follow the configuration steps:
   1. Upload your Google Cloud key `.json` file. (See below for permissions and how to retrieve this.)
   2. Enter your Dataset ID
   3. Enter your Table ID 
3. Watch events roll into BigQuery

### How do I setup BigQuery permissions for PostHog?

To set the right permissions up for the BigQuery plugin, you'll need:
1. A service account.
2. A dataset which has permissions allowing the service account to access it.

Here's how to set these up so that the app has access only to the table it needs:

1. [Create a service account](https://cloud.google.com/bigquery/docs/reference/libraries#setting_up_authentication). Keep hold of the JSON file at the end of these steps for setting up the app, and remember the name too.

2. Create a role which has only the specific permissions the PostHog BigQuery app requires (listed below), or use the built in `BigQuery DataOwner` permission. If you create a custom role, you will need:
   * bigquery.datasets.get
   * bigquery.tables.create
   * bigquery.tables.get
   * bigquery.tables.list
   * bigquery.tables.updateData

3. Create a dataset within a BigQuery project (ours is called `posthog`, but any name will do).

4. Follow the instructions [on granting access to a dataset in BigQuery](https://cloud.google.com/bigquery/docs/dataset-access-controls#granting_access_to_a_dataset) to ensure your new service account has been granted either the role you created or the "BigQuery Data Owner" permission. 

![SQL_workspace_–_BigQuery_–_Data_Warehouse_Exp_–_Google_Cloud_Platform](https://user-images.githubusercontent.com/1108173/130323561-444cbbf6-a994-455e-97b6-8db6df69e274.png)

Use the Share Dataset button to share your dataset with your new service account and either the `BigQuery DataOwner` role, or your custom role created above. In the below, we've used a custom role `PostHog Ingest`.

![SQL_workspace_–_BigQuery_–_Data_Warehouse_Exp_–_Google_Cloud_Platform](https://user-images.githubusercontent.com/1108173/130323602-50f13200-6fde-4ee9-b507-1bce75fc75b2.png)

That's it! Once you've done the steps above, your data should start flowing from PostHog to BigQuery.

### Why am I seeing duplicate PostHog events in BigQuery?

There's a very rare case when duplicate events appear in BigQuery. This happens due to network errors, where the export seems to have failed, yet it actually reaches BigQuery.

While this shouldn't happen, if you find duplicate events in BigQuery, follow these [Google Cloud docs](https://cloud.google.com/bigquery/streaming-data-into-bigquery#manually_removing_duplicates) to manually remove the them.

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the BigQuery Export app](https://github.com/PostHog/bigquery-plugin) is available on GitHub. 

### Who created this app?

We'd like to thank PostHog team members [Yakko Majuri](https://github.com/yakkomajuri), [Marius Andra](https://github.com/mariusandra), [Neil Kakkar](https://github.com/neilkakkar), [Michael Matloka](https://github.com/Twixes) and community member [Edward Hartwell Goose](https://github.com/edhgoose) for creating this BigQuery Export app. 

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&template=bug_report.md) to let us know!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our FAQ page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.