---
title: Schema Enforcer documentation
showTitle: true
topics:
    - schema-enforcer
---

## How does this app work?

The app enables you to enforce a schema on events in PostHog as they are ingested. It does this by preventing ingestion if the event:

- Is missing a required property
- Has a property with the wrong type
- Is not included in the file and ```onlyIngestEventsFromFile``` is true

It also:

- Removes all other properties from an event except selected ones if acceptOnlySchemaProps is true
- Configuration is done via a JSON file uploaded as a plugin attachment

## Example configuration file

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

## What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

## What if my question isn't answered above?

You can [join the PostHog Community Slack group](/slack) to ask more questions, or get advice on developing your own PostHog apps.
