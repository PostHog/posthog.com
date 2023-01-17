---
title: Filter Out
github: https://github.com/PostHog/posthog-filter-out-plugin
installUrl: https://app.posthog.com/project/apps?name=Filter%Out%20Plugin
thumbnail: ../../apps/thumbnails/filter-out.png
tags:
    - filter-out
---

### What does the Filter Out app do?

This app enables you to create filters which prevent PostHog from ingesting data from your product unless it passes those filters. Any events which do not match the filter requirements are skipped over and are not ingested. 

###### What are the requirements for this app?

Using the Filter Out app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

### How do I install the Filter Out app?

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'Filter Out' and select the app, press Install.
3. Follow the on-screen steps to configure the app.

This app will only work on events ingested _after_ the app was enabled.

### How do I configure the Filter Out app?

The app can be configured via a JSON file which specifies the properties you would like to filter.

In the example config below, the app will only keep events where all of the following conditions are met:

- Email does not contain yourcompany.com
- Host is not localhost:8000
- Browser version greater than 100

```
[
  {
    "property": "email",
    "type": "string",
    "operator": "not_contains",
    "value": "yourcompany.com"
  },
  {
    "property": "host",
    "type": "string",
    "operator": "is_not",
    "value": "localhost:8000"
  },
  {
    "property": "browser_version",
    "type": "number",
    "operator": "gt",
    "value": 100
  }
]
```

The followed types and operators are allowed:

| Type    | Operators                                            |
| ------- | ---------------------------------------------------- |
| number  | gt, gte, lt, lte, eq, neq                            |
| string  | is, is_not, contains, not_contains, regex, not_regex |
| boolean | is, is_not                                           |


### Who maintains this app?

This app was created by [@plibither8](https://github.com/plibither8) and is maintained by the community.  If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&template=bug_report.md) to let us know!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
