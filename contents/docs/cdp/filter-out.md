---
title: Filter ingested data
github: 'https://github.com/PostHog/posthog-filter-out-plugin'
installUrl: 'https://app.posthog.com/project/apps?name=Filter%Out%20Plugin'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/filter-out.png
tags:
  - filter-out
---

import Requirements from "./_snippets/requirements.mdx"
import FeedbackQuestions from "./_snippets/feedback-questions.mdx"
import CommunityMaintained from "./_snippets/community-maintained.mdx"

This transformation enables you to create filters which prevent PostHog from ingesting data from your product unless it passes those filters. Any events which do not match the filter requirements are skipped over and are not ingested. 

<Requirements />

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/pipeline)" tab in the left sidebar.
2. Search for 'Filter Out' and select the transformation, press Install.
3. Follow the on-screen steps to configure the transformation.

This transformation will only work on events ingested _after_ the transformation was enabled.

## Configuration

The transformation can be configured via a JSON file which specifies the properties you would like to filter.

In the example config below, the transformation will only keep events where all of the following conditions are met:

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

### Q: How can I filter out events from unwanted hostnames or IP addresses?

To filter out all traffic from hosts that are not (for example) `posthog.com`, you could use the following config:
```
[
  {
    "property": "$host",
    "type": "string",
    "operator": "is",
    "value": "posthog.com"
  }
]
```
Or, to filter out all traffic from a particular IP address, you could use a config like this example:
```
[
    {
        "property": "$ip",
        "type": "string",
        "operator": "is_not",
        "value": "192.168.01.123"
    }
]
```

Make sure to enable the `Keep event if any of the filtered properties are undefined?` option, otherwise, any events where the `$host` property is undefined will be filtered out.

<CommunityMaintained />

<FeedbackQuestions />
