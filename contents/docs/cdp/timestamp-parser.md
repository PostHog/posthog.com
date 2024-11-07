---
title: Parse event timestamps
github: 'https://github.com/PostHog/timestamp-parser-plugin'
installUrl: 'https://app.posthog.com/project/apps?name=Timestamp%20Parser'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/timestamp-parser.png
tags:
  - timestamp-parser
---

import Requirements from "./_snippets/requirements.mdx"
import FeedbackQuestions from "./_snippets/feedback-questions.mdx"
import CommunityMaintained from "./_snippets/community-maintained.mdx"

This transformation parses the timestamp of each event that comes in to PostHog and adds the following time-based properties:

| Property          | Description                                       | Example    |
| ----------------- | ------------------------------------------------- | ---------- |
| `day_of_the_week` | Plain text value for the day of the week          | Monday     |
| `day`             | Numeric value for the day within a month          | 7          |
| `month`           | Numeric value corresponding to the current month  | 6 _(June)_ |
| `year`            | Numeric value of the year                         | 2022       |
| `hour`            | Numeric value for the hour in UTC (24-hour clock) | 21         |
| `minute`          | Numeric value for the minute                      | 37         |

<Requirements />

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/pipeline)" tab in the left sidebar.
2. Click the 'Transformations tab'.
3. Click the '+ New Transformation' button.
4. Look for the 'Timestamp Parser' and click the '+ Create' button.
5. Click on the toggle to enable the transformation and then click 'Create'.

Any new events that come into PostHog will now be automatically parsed!

## Using the Timestamp Parser

The timestamp parser is a great tool for answering time-based questions that are sometimes very challenging to tackle with PostHog alone.

By filtering and breaking down events, we can now easily answer questions such as:

- Do we get more purchases on weekdays or weekends?
- Why does our traffic spike on Tuesdays?
- How do users use our platform differently during the holiday season?
- How does retention compare for users who join on a weekend versus a weekday?

> **Note: ** This transformation only works on _new_ events sent to PostHog, and as a result you won't be able to filter events that were sent before it was enabled.

## Examples

Here is an example of what these properties look like after they have been added to an event.

![event with timestamp properties added](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/apps/timestamp-parser/timestamp-properties.png)

Here's an example of creating a filter in a [trends](/docs/user-guides/trends) insight to only show events that were send on a Saturday or Sunday.

![filter for only events on Saturday or Sunday](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/apps/timestamp-parser/weekend-filter.png)

We can also break down an insight by `month` to get an idea of how it varies over the course of a year.

![breaking down an insight by month](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/docs/apps/timestamp-parser/month-breakdown.png)

Overall, the timestamp parser is a simple yet incredibly powerful transformation that these examples only scratch the surface on.

## FAQ

### Who created this transformation?

We'd like to thank PostHog team member [Yakko Majuri](https://github.com/yakkomajuri) and community member [Victor Campuzano](https://github.com/vicampuzano) for creating the Timestamp Parser. Thank you, both!

<CommunityMaintained />

<FeedbackQuestions />
