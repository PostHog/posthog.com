---
title: Property Flattener
github: https://github.com/PostHog/flatten-properties-plugin
installUrl: https://app.posthog.com/project/apps?name=Property%20Flattener%20Plugin
thumbnail: ../../apps/thumbnails/property-flattener.png
tags:
    - property-flattener
---

### What does the Property Flattener app do?

This app flattens nested properties in PostHog events, making it easier to access them through filters if needed.

This is useful if, for example, you're an online retailer and have purchase events with the following property structure:

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

This app will keep the nested properties unchanged, but also add any nested properties at the first depth, like so:

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

As such, you can now filter your purchase events based on product**size**number for example.

### What are the requirements for this app?

The Property Flattener requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

### How do I install the Property Flattener?

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'Property Flattener' and select the app, press Install.
3. Follow the on-screen steps to configure the app.

### How do I separate nested properties?

The default separator for nested properties is two subsequent underscores (\_\_), but you can also change this to:

-   `.`
-   `>`
-   `/`

When picking your separator, make sure it will not clash with your property naming patterns! There be dragons.

### Configuration

<AppParameters />

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Property Flattener](https://github.com/PostHog/flatten-properties-plugin) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team members [Yakko Majuri](https://github.com/yakkomajuri), [Tim Glaser](https://github.com/timgl) and [Marius Andra](https://github.com/mariusandra) and community member [Chasovskiy](https://github.com/chasovskiy) for creating the Property Flattener.

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&template=bug_report.md) to let us know!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
