---
title: Event Sequence Timer
github: 'https://github.com/PostHog/event-sequence-timer-plugin'
installUrl: 'https://app.posthog.com/project/apps?name=Event%20Sequence%20Timer%20Plugin'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/event-sequence-timer-plugin.png
tags:
  - event-timer
---

import Requirements from "./_snippets/requirements.mdx"
import FeedbackQuestions from "./_snippets/feedback-questions.mdx"
import PostHogMaintained from "./_snippets/posthog-maintained.mdx"
import TransformationDisabled from "./_snippets/transformation-disabled.mdx"

<TransformationDisabled />

> You can still analyze the timing of event sequences using [HogQL](/docs/hogql). For example, to get the average time between a `$pageview` and `$pageleave` events this year, [create an SQL insight](https://app.posthog.com/insights/new) and use the following SQL statement:
>
>```sql
>SELECT avg(time_between) AS avg_time_between
> FROM (
>   SELECT
>     dateDiff('minute', first_timestamp, next_timestamp) AS time_between
>   FROM (
>     SELECT 
>       distinct_id,
>       event AS first_event,
>       timestamp AS first_timestamp,
>       first_value(event) OVER w AS next_event,
>       first_value(timestamp) OVER w AS next_timestamp
>     FROM events
>     WHERE 
>       toYear(timestamp) = 2023
>       AND (event = '$pageview' OR event = '$pageleave')
>     WINDOW w AS (PARTITION BY distinct_id ORDER BY timestamp ASC ROWS BETWEEN 1 FOLLOWING AND 1 FOLLOWING)
>     ORDER BY distinct_id, timestamp
>   ) AS subquery
>   WHERE first_event = '$pageview'
>     AND next_event = '$pageleave'
> )
>```
>
> This can be customized with different events or properties. See an example use case in our “[How to calculate time on page](/tutorials/time-on-page)” tutorial.
>
>If there is functionality around event sequence timing you want but don’t see a way to do, let us know by asking a question in [our community](/questions).

## What does this transformation do?

This transformation measures the time it takes for a user to perform one event (`EventB`), after an earlier event (`EventA`).

<Requirements />

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/pipeline)" tab in the left sidebar.
2. Search for 'Event Sequence Timer' and select the transformation, press Install.
3. Follow the on-screen steps to configure the transformation.

## Configuration

First, you must configure the list of events to track time differences on. This list is specified as follows:

`(eventA,eventB),(eventC,eventD),(eventA,eventD)`

Where the first event in a tuple is the event that "starts the timer" and the second event being the one that "finishes it". In other words, the first event happens before the second.

You can further configure the transformation using the 'Update timestamp on every new first event?' setting. The default behaviour is 'Yes'.

If you select 'Yes', the stored timestamp for the first event will always be updated when a new event with the same name comes in (for the same user). This means your second event will always contain the difference between its time and the last time the user triggered the first event.

If you select No, the stored timestamp will only be set once and never updated. This means you will get the difference between the time of the second event and the first time the user triggered the first event.

## How does the Event Sequence Timer show elapsed time?

The Event Sequence Timer transformation measures time between two events (`EventA` and `EventB`) in milliseconds.

When a sequence is completed, the Event Sequence Timer adds a new property called `time_since_eventA` to `EventB`. You can then use this property in analysis with other PostHog transformations.

## Parameters

<AppParameters />

## FAQ

### Is the source code for this transformation available?

PostHog is open-source and so are all transformations on the platform. The [source code for the Event Sequence Timer](https://github.com/PostHog/event-sequence-timer-plugin) is available on GitHub.

### Who created this transformation?

We'd like to thank PostHog team member [Yakko Majuri](https://github.com/yakkomajuri) for creating the Event Sequence Timer. Thanks Yakko!

<PostHogMaintained />

<FeedbackQuestions />
