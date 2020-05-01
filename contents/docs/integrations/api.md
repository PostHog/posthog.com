# Sending events

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

PostHog provides a detailed API. This is [documented here](https://app.posthog.com/redoc/).

There are some new areas of the API that are not yet in that documentation - we are working on this.

If the [API docs](https://app.posthog.com/redoc/) are missing something, in the meantime, you can view all the calls by using the app's front end in the browser and viewing the Network events.