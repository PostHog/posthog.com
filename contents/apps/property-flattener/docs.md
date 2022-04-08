---
title: How the Property Flattener works
showTitle: true
topics:
    - property-flattener
---

## What does the Property Flattener app do?

This app flattens nested properties in PostHog events, making it easier to access them through filters if needed. 

## Why is this useful?

Well, let us say for example that you're an online retailer and have purchase events with the following property structure:

```
{
    "event": "purchase",
    "properties": {
        "product": {
            "name": "AZ12 shoes",
            "type": "footwear",
            "size": {
                "number": 12,
                "gender": "M"
            }
        }
    }
}
```

This plugin will keep the nested properties unchanged, but also add any nested properties at the first depth, like so:

```
{
    "event": "purchase",
    "properties": {
        "product": {
            "name": "AZ12 shoes",
            "type": "footwear",
            "size": {
                "number": 12,
                "gender": "M"
            }
        },
        "product__name": "AZ12 shoes",
        "product__type": "footwear",
        "product__size__number": 12,
        "product__size__gender": "M"
    }
}
```

As such, you can now filter your purchase events based on product__size__number for example.

The default separator for nested properties is two subsequent underscores (__), but you can also change this to:

- `.`
- `>`
- `/`

When picking your separator, make sure it will not clash with your property naming patterns! There be dragons.

## How do I install the Taxonomy Standardizer app?

1. Visit the "Apps" page in your instance of PostHog.
2. Search for 'Taxonomy Standardizer' and select the app, press Install.
3. Follow the on-screen steps to configure the app.

## What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think. 

## What if my question isn't answered above?

You can [join the PostHog Community Slack group](/slack) to ask more questions, or get advice on developing your own PostHog apps.