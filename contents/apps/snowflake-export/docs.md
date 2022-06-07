---
title: Snowflake Export documentation
showTitle: true
topics:
    - snowflake-export
---

### What does the Snowflake Export app do?

This app uses a Snowflake external stage to stage events in object storage - Amazon S3 or Google Cloud Storage. Staged events (stored in object storage as files containing event batches) are then copied into the final destination – your Snowflake table – once an hour. 

### What are the requirements for this app?

The First Time Event Tracker requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later. 

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)! 

You'll also need:

- a Snowflake user
- an S3 _or_ GCS bucket
- an AWS _or_ GCP user with permissions to access that bucket in order to use this app

### How do I configure the Snowflake Export app?

1. [Create a new user in Snowflake](https://docs.snowflake.com/en/sql-reference/sql/create-user.html) that this app can use.
    > ⚠️ Make sure it has appropriate permissions to **create stages**, as well as **create, modify, and copy into a table** in your desired database. 
2. Make sure you have a [Snowflake Warehouse](https://docs.snowflake.com/en/user-guide/warehouses-overview.html) set up. Warehouses are needed to perform `COPY INTO` statements. We recommend a warehouse that will start up automatically when needed.
3. Fill in the configuration options with the user you just created, passing its username and password. For the Snowflake account ID, this can be found in your Snowflake URL. For example, if your URL is: `https://xxx11111.us-east-1.snowflakecomputing.com/`, your account ID will be `xxx11111.us-east-1`. You may also pass in the Cloud provider if that does not work e.g. `xxx11111.us-east-1.aws`.
4. **GCS-only.** Make sure the user available to the plugin has permissions on the storage integration you created at Step 2 of the GCS configuration instructions. You can do this like so:
    ```sql
    GRANT USAGE ON INTEGRATION <your_gcs_integration_name> TO ROLE <plugin_user_role>
    ```

If you're exporting from PostHog Cloud, do **NOT set any IP whitelist/blacklist** or other network policies. PostHog Cloud operates on a decentralized network of computing resources and therefore the IPs could change at any time.

### How do I configure Amazon S3 for the Snowflake Export app?

1. Create a new S3 bucket, preferably in the same AWS region as your Snowflake instance.
2. Follow [this Snowflake guide on S3](https://docs.snowflake.com/en/user-guide/data-load-s3-config-aws-iam-user.html) to configure AWS IAM User Credentials to Access Amazon S3. However, instead of doing step 3 yourself, input the AWS Key ID and Secret Key in the appropriate app configuration options. We'll take care of creating the stage for you.

### How do I configure Google Cloud Storage for the Snowflake Export app?

1. Create a new GCS bucket.
2. Follow [this Snowflake guide on GCS](https://docs.snowflake.com/en/user-guide/data-load-gcs-config.html) to create a storage integration and generate a user for Snowflake to use when accessing your bucket. Make sure not to skip over any part of the guide!
3. Download the service account credentials JSON file and upload it in the configuration step of this app.

### Why am I seeing connection issues with the Snowflake Export app?

If you're running into connection issues please verify your login credentials, make sure **all** the permissions listed above have been granted to your user, and that you do not have any IP whitelist/blacklist policy (if exporting from PostHog Cloud).

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Snowflake Export app](https://github.com/PostHog/snowflake-export-plugin) is available on GitHub. 

### Who created this app?

We'd like to thank PostHog team members [Yakko Majuri](https://github.com/yakkomajuri), [Marius Andra](https://github.com/mariusandra) and [Michael Matloka](https://github.com/Twixes) and former team member [Paolo D'Amico](https://github.com/paolodamico) for creating the Snowflake Export app. We miss you, Paolo! 

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&template=bug_report.md) to let us know!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our FAQ page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.