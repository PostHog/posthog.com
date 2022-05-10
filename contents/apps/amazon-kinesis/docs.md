---
title: Amazon Kinesis Import app documentation
showTitle: true
topics:
    - amazon-kinesis
---

### What does the Amazon Kinesis Import app do?

This app imports event data into PostHog from an Amazon Kinesis stream. Kinesis Records must be delivered in a JSON schema in order to be imported. 

### What are the requirements for this app?

Using the Amazon Kinesis Import app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later. 

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/self-host/configure/upgrading-posthog)! 

### How should I configure the Kinesis Record schema?

Kinesis Records must be delivered in a JSON schema.

You need to configure an `eventKey` that maps to the event name in Posthog. The `eventKey` can refer to a nested key. 

You can optionally configure a comma-separated list of `additionalPropertyMappings`, that will map Kinesis Record keys to Posthog Event properties. The Kinesis Record keys can be nested keys, while the corresponding Posthog mapped keys cannot be nested.

For example, take the following Kinesis Record

```
// Kinesis Record
{
    ...
    "properties: {
        "eventName": "my posthog event",
        "userId": "$userId",
        "foo": "bar"
    }
}
```

And the following configuration:

```
eventKey = properties.eventName
additionalPropertyMappings = properties.userId:distinct_id,properties.foo:foo
```

Will be parsed as:

```
// Posthog Event
{
    "event": "my posthog event",
    "properties: {
        "distinct_id": "$userId",
        "foo": "bar"
    }
}
```

### What is the correct IAM policy?

You need to provide an AccessKeyID and a SecretAccessKey for a AWS IAM user with at least the following Kinesis Action rights:

```
DescribeStream
GetShardIterator
GetRecords
```

### What app parameters are available?

- `Kinesis Stream Name` (required): the name of the Kinesis stream you want to read from
- `IAM Access Key ID` (required): IAM Access Key ID with Kinesis access
- `IAM Secret Access Key` (required): IAM Secret Access Key with Kinesis access
- `AWS Region` (required): AWS region where your Kinesis stream is deployed
- `Event Key (required): The Kinesis Record key to be mapped to the PostHog event name. Can be nested (e.g. `properties.eventName`)
- `Additional Property Mappings`: A comma-separated mapping of additional Kinesis Record keys to map to Posthog event properties. Can be nested (e.g. `properties.kinesisPropertyKey:posthogPropertyKey`)

### How do I install the Amazon Kinesis Import app for PostHog?

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'Amazon Kinesis' and select the app, press Install.
3. Follow the steps to configure the app.
3. Watch events roll in to PostHog. 

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Amazon Kinesis Import app](https://github.com/posthog/posthog-kinesis-plugin) is available on GitHub. 

### Where can I find out more?

Check [Amazon's Kinesis documentation](https://docs.aws.amazon.com/kinesis/index.html) for more information on using Amazon Kinesis. 

### Who created this app?

We'd like to thank community member [Emanuele Capparelli](https://github.com/kappa90) for his work creating this app. Thank you, Emanuele!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

### What if my question isn't answered above?

You can [join the PostHog Community Slack group](/slack) to ask more questions, or get advice on developing your own PostHog apps.