---
title: Schema Enforcer
github: https://github.com/PostHog/schema-enforcer-plugin
installUrl: https://app.posthog.com/project/apps?name=Schema%20Enforcer
thumbnail: ../../apps/thumbnails/schema-enforcer.png
tags:
    - schema-enforcer
---

### How does this app work?

The app enables you to enforce a schema on events in PostHog as they are ingested. It does this by preventing ingestion if the event:

-   Is missing a required property
-   Has a property with the wrong type
-   Is not included in the file and `onlyIngestEventsFromFile` is true

It also:

-   Removes all other properties from an event except selected ones if acceptOnlySchemaProps is true
-   Configuration is done via a JSON file uploaded as an attachment

### What are the requirements for this app?

The Schema Enforcer app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

### How do I install the Schema Enforcer for PostHog?

1. Log in to your PostHog instance
2. Click 'Apps' on the left-hand tool bar
3. Search for 'Schema Enforcer'
4. Select the app, press 'Install' and follow the on-screen instructions

## How do I configure the Schema Enforcer?

Below is an example configuration file:

```
{
    "onlyIngestEventsFromFile": true,
    "eventSchemas": {
        "testEvent": {
            "acceptOnlySchemaProps": true,
            "schema": {
                "foo": {
                    "type": "string",
                    "required": false
                },
                "bar": {
                    "type": "number",
                    "required": true
                },
                "baz": {
                    "type": "boolean",
                    "required": false
                }
            }
        }
    }
}
```

### Configuration

<AppParameters />

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Schema Enforcer](https://www.npmjs.com/package/@posthog/schema-enforcer-plugin) is available on NPM.

### Who created this app?

A lot of people worked on this app! We'd like to thank the following PostHog team members...

-   [Yakko Majuri](https://www.npmjs.com/~yakkomajuri)
-   [Marius Andra](https://www.npmjs.com/~mariusandra)
-   [James Greenhill](https://www.npmjs.com/~fuziontech)
-   [Michael Matloka](https://www.npmjs.com/~twixes)
-   [Alex Kim](https://www.npmjs.com/~alexkim205)
-   [Karl Aksel-Puulmann](https://www.npmjs.com/~macobo) and
-   [Tim Glaser](https://www.npmjs.com/~timgl)

For creating the Schema Enforcer. Thank you, all!

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&template=bug_report.md) to let us know!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
