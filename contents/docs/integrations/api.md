---
title: API
sidebar: Docs
showTitle: true
---

This is the dedicated events API, designed to help you push events into PostHog. We also provide a [general API](/docs/api/api).

## Sending events

To send events to PostHog, you can use any of our libraries OR any Mixpanel library by changing the api_host setting to `https://[your-instance].herokuapp.com/capture/`.

If you'd prefer to do the requests yourself, you can send events in the following format

## Single event

Note: Timestamp is optional. If not set, it'll automatically be set to the current time.

```
POST https://[your-instance].herokuapp.com/capture/
Content-Type: application/json
Body:
{
    "api_key": "[your api key in /setup]",
    "event": "[event name]",
    "properties": {
        "distinct_id": "[your users' distinct id]",
        "key1": "value1",
        "key2": "value2",
    },
    "timestamp": "[optional timestamp in ISO 8601 format]"
}
```

## Batch events

You can send multiple events in one go with the batch api

Note: Timestamp is optional. If not set, it'll automatically be set to the current time.

```
POST https://[your-instance].herokuapp.com/capture/
Content-Type: application/json
Body:
{
    "api_key": "[your api key in /setup]",
    "batch": [
        {
            "event": "[event name]",
            "properties": {
                "distinct_id": "[your users' distinct id]",
                "key1": "value1",
                "key2": "value2",
            },
            "timestamp": "[optional timestamp in ISO 8601 format]"
        },
        ...
    ]
}
```


## Reading data from PostHog

We have another set of APIs to read/modify anything in PostHog. See [api documentation.](/docs/api/api)

Also, feel free to reach out in [PostHog Users Slack](https://join.slack.com/t/posthogusers/shared_invite/enQtOTY0MzU5NjAwMDY3LTc2MWQ0OTZlNjhkODk3ZDI3NDVjMDE1YjgxY2I4ZjI4MzJhZmVmNjJkN2NmMGJmMzc2N2U3Yjc3ZjI5NGFlZDQ) if you'd like help with the API.