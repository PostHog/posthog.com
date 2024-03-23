---
title: Filter Out
github: 'https://github.com/PostHog/posthog-filter-out-plugin'
installUrl: 'https://app.posthog.com/project/apps?name=Filter%Out%20Plugin'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/filter-out.png
tags:
  - filter-out
---

This app enables you to create filters which prevent PostHog from ingesting data from your product unless it passes those filters. Any events which do not match the filter requirements are skipped over and are not ingested. 

## Requirements

Using the Filter Out app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/apps)" tab in the left sidebar.
2. Search for 'Filter Out' and select the app, press Install.
3. Follow the on-screen steps to configure the app.

This app will only work on events ingested _after_ the app was enabled.

## Configuration

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
    "property": "$host",
    "type": "string",
    "operator": "is_not",
    "value": "localhost:8000"
  },
  {
    "property": "$browser_version",
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

## FAQ

### Who maintains this app?

This app is maintained by the community. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 
