---
title: Filter Out
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

This connector enables you to create filters which prevent PostHog from ingesting data from your product unless it passes those filters. Any events which do not match the filter requirements are skipped over and are not ingested. 

<Requirements />

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/apps)" tab in the left sidebar.
2. Search for 'Filter Out' and select the connector, press Install.
3. Follow the on-screen steps to configure the connector.

This connector will only work on events ingested _after_ the connector was enabled.

## Configuration

The connector can be configured via a JSON file which specifies the properties you would like to filter.

In the example config below, the connector will only keep events where all of the following conditions are met:

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

<CommunityMaintained />

<FeedbackQuestions />
