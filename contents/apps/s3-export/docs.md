---
title: Amazon S3 Export documentation
showTitle: true
topics:
    - s3 export
---

### What does the S3 Export app do?

This app enables you to export events to Amazon S3 on ingestion. Archive your data, or simply free it up for other kinds of analysis, by integrating export right into your event processing pipeline.

### What are the requirements for this app?

The S3 Export app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.24.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later. 

Not running 1.24.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)! 

You'll also need access to an AWS S3 account. 

### How do I install the S3 Export app for PostHog?

This app requires a PostHog 1.24.0+ self-hosted, or PostHog Cloud. 

1. Log in to your PostHog instance
2. Click 'Apps' on the left-hand tool bar
3. Search for 'S3' 
4. Select the app, press 'Install' and follow the on-screen instructions
5. Configure the app by entering your AWS credentials and S3 bucket details
6. Watch events roll into S3

### How do I setup AWS credentials?

1. Log in to [AWS](https://console.aws.amazon.com/).
2. Open [S3](https://s3.console.aws.amazon.com/) in the AWS console and create a new bucket in your chosen region.
3. Open [IAM](https://console.aws.amazon.com/iam/home) and create a new policy to allow access to this bucket.
    1. Open "Policies" and click "Create policy"
    2. On the "Visual Editor" tab, click "Choose a service" and select "S3"
    3. Under "Actions" select
        1. "Write" -> "PutObject"
        2. "Permission Management" -> "PutObjectAcl" 
    4. Under "Resources" select "Specific" and click "object" -> "Add ARN"
    5. Specify your bucket name and choose "any" for the object name, so the ARN looks something like this: `arn:aws:s3:::my-bucket-name/*`
    6. Click "Next" until you end up on the "Review Policy" page
    7. Give it a name
4. Open [IAM](https://console.aws.amazon.com/iam/home) and create a new user who uses this policy
    1. Click "Users" -> "Add User"
    2. Specify a name and choose "Programmatic access"
    3. Click "Next" 
    4. Select "Attach existing policies directly"
    5. Select the policy you had just created
    6. Click "Next" until you reach the "Create user" button. Click that as well.
    7. Make sure to copy your "Access key" and "Secret access key". The latter will not be shown again.
5. Install the app in PostHog and fill in the "Access key", "Secret access key", "Bucket region" and "Bucket name" fields. Adjust other parameters as needed.

### How does the S3 Export app batch events?

To vastly increase export throughput, this app batches events in memory before uploading them to S3. Upload frequency (every minute by default) and maximum upload size (1 MB by default) can be configured when the app is installed.

You should make sure to keep these numbers reasonable to avoid running out of memory on your server. Note that the values apply to **each** concurrent app server thread.

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the S3 Export app](https://github.com/PostHog/s3-export-plugin) is available on GitHub. 

### Who created this app?

A lot of people worked on this app! We'd like to thank...

- [Yakko Majuri](https://github.com/yakkomajuri)
- [Marius Andra](https://github.com/mariusandra)
- [Michael Matloka](https://github.com/Twixes)
- [Maximilian Ferdinand Müller](https://github.com/maxmue)
- [Sam Winslow](https://github.com/samwinslow) and
- [StackoverFrog](https://github.com/hjweddie)

For creating the S3 Export app. Thank you, all!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

### What if my question isn't answered above?

You can [join the PostHog Community Slack group](/slack) to ask more questions, or get advice on developing your own PostHog apps.
