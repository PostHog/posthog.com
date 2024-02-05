---
title: Timestamps
sidebar: Docs
showTitle: true
---

PostHog automatically computes timestamps for captured events, but you can also set them manually. For example:

- If the payload contains `timestamp` and `sent_at` fields, the `sent_at` field is compared to the server time to account for clock skew. The event's `timestamp` is adjusted by this difference before being stored. This is the method our libraries use.

- If the payload includes a `timestamp` but no `sent_at` field, then `timestamp` is directly used as the event timestamp.

- If `offset` is included in the payload, then this value is interpreted as milliseconds and is subtracted from the capture time recorded by the server to obtain the event timestamp. The first two alternatives have higher priority so `offset` is ignored if `timestamp` is present.

- Finally, as a fallback when no `timestamp` or `offset` are included in the payload, the capture time recorded by the server is used as the event timestamp.

To ensure maximum compatibility with PostHog, `timestamp` and `sent_at` fields should be in `ISO-8601` format like `2023-12-13T15:45:30.123Z` or `YYYY-MM-DDTHH:MM:SSZ`.