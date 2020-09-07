---
title: API
sidebar: Docs
showTitle: true
---

This is the dedicated events API, designed to help you push events into PostHog. We also provide a [general API](/docs/api/api).

## Sending events

To send events to PostHog, you can use any of our libraries **or** any Mixpanel library by changing the api_host setting to `https://[your-instance].herokuapp.com/capture/`.

If you'd prefer to do the requests yourself, you can send events in the following format

## Single event

**Note:** Timestamp is optional. If not set, it'll automatically be set to the current time.

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
        "key2": "value2"
    },
    "timestamp": "[optional timestamp in ISO 8601 format]"
}
```

## Batch events

You can send multiple events in one go with the Batch API.

**Note:** Timestamp is optional. If not set, it'll automatically be set to the current time.

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
                "key2": "value2"
            },
            "timestamp": "[optional timestamp in ISO 8601 format]"
        },
        ...
    ]
}
```

## Sample Requests

Here are some sample `curl` queries for each event type. Do note that you need to insert your API key into the `api_key` field.

Additionally, if you're self-hosting, you'll have to substitute `https://app.posthog.com/` for the URL of your instance.

### Alias

```
curl -v -L --header "Content-Type: application/json" -d ' {
    "api_key": "<INSERT YOUR API KEY>",
    "properties": {
        "distinct_id": "123",
        "alias": "456"
    },
    "timestamp": "2020-08-16 09:03:11.913767",
    "context": "{}",
    "type": "alias",
    "event": "$create_alias"
}' https://app.posthog.com/batch/
```

### Capture

```
curl -v -L --header "Content-Type: application/json" -d '  {
    "api_key": "<INSERT YOUR API KEY>",
    "properties": {},
    "timestamp": "2020-08-16 09:03:11.913767",
    "context": {},
    "distinct_id": "1234",
    "type": "capture",
    "event": "$event",
    "messageId": "1234"
}' https://app.posthog.com/batch/
```

### Identify

```
curl -v -L --header "Content-Type: application/json" -d ' {
    "api_key": "<INSERT YOUR API KEY>",
    "timestamp": "2020-08-16 09:03:11.913767",
    "context": {},
    "type": "screen",
    "distinct_id": "1234",
    "$set": {},
    "event": "$identify",
    "messageId": "123"
}' https://app.posthog.com/batch/
```

### Group

```
curl -v -L --header "Content-Type: application/json" -d ' {
    "api_key": "<INSERT YOUR API KEY>",
    "timestamp": "2020-08-16 09:03:11.913767",
    "groupId": "123",
    "context": {},
    "distinct_id": "1234",
    "traits": {},
    "type": "group",
    "event": "$group",
    "messageId": "123"
}' https://app.posthog.com/batch/
```

### Page

```
curl -v -L --header "Content-Type: application/json" -d '  {
    "api_key": "<INSERT YOUR API KEY>",
    "properties": {},
    "timestamp": "2020-08-16 09:03:11.913767",
    "category": "some category",
    "context": {},
    "distinct_id": "1234",
    "type": "page",
    "event": "$page",
    "name": "a page",
    "messageId": "123"
}' https://app.posthog.com/batch/
```

### Screen

```
curl -v -L --header "Content-Type: application/json" -d '  {
    "api_key": "<INSERT YOUR API KEY>",
    "properties": {},
    "timestamp": "2020-08-16 09:03:11.913767",
    "category": "some category",
    "context": {},
    "distinct_id": "1234",
    "type": "screen",
    "event": "$screen",
    "name": "a page",
    "messageId": "123"
}' https://app.posthog.com/batch/
```


## Reading data from PostHog

We have another set of APIs to read/modify anything in PostHog. See our [API documentation](/docs/api/api) for more information.

Also, feel free to reach out in the [PostHog Users Slack](https://join.slack.com/t/posthogusers/shared_invite/enQtOTY0MzU5NjAwMDY3LTc2MWQ0OTZlNjhkODk3ZDI3NDVjMDE1YjgxY2I4ZjI4MzJhZmVmNjJkN2NmMGJmMzc2N2U3Yjc3ZjI5NGFlZDQ) if you'd like help with the API.
