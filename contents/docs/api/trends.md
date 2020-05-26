---
title: Trends
sidebar: Docs
showTitle: true
---


In PostHog, there is an API endpoint available to do advanced analytics on your data. We use this endpoint for the [Trends page](/docs/features/trends) in PostHog.

## List trends


```plaintext
GET /action/trends/?events=[{"id":"$pageview"}]
GET /action/trends/?events=[{"id":"$pageview"}]&properties=[{"key":"$browser","value":"Chrome"}]
```

| Attribute | Type | Required | Description |
| --- | --- | --- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `events` | Array of Events | yes | Basic usage is `[{"id": "$pageview"}]` |
| `properties` | Array of Properties | no | The key/values that you want to filter on. Basic usage is: `[{"key": "$browser", "value": "Chrome"}]`<br><br>For each property, you can specify:<br>- `key` Key of the property<br>- `value` Value you want to filter on<br>- `type` Either `person` or `event`<br>- `connector`, any of: <br>-- `exact`/empty<br>--`is_not`<br>--`icontains`<br>--`not_icontains`<br>--`gt`<br>--`lt`<br>--`is_set` |
| `interval` | String | no | Interval of the data. `minute`, `hour`, `day`, `week`, `month`
| `breakdown_value` | String | no | Split out all entities by any property value or cohort id.  
| `breakdown_type` | String | no | Default: `property`. Can be set to `cohort`, in which case you can pass through a cohort_id to `breakdown_value`

Example request:

```shell
curl https://app.posthog.com/action/trends/?events=[{"id":"$pageview"}]
```

Example response:

```json
[
    {
        "action": {
            "id": "$pageview",
            "type": "events",
            "order": null,
            "name": "$pageview",
            "math": null,
            "properties": []
        },
        "label": "$pageview",
        "count": 11.0,
        "data": [
            4.0,
            0.0,
            0.0,
            0.0,
            0.0,
            0.0,
            7.0,
            0.0
        ],
        "labels": [
            "Tue. 19 May",
            "Wed. 20 May",
            "Thu. 21 May",
            "Fri. 22 May",
            "Sat. 23 May",
            "Sun. 24 May",
            "Mon. 25 May",
            "Tue. 26 May"
        ],
        "days": [
            "2020-05-19",
            "2020-05-20",
            "2020-05-21",
            "2020-05-22",
            "2020-05-23",
            "2020-05-24",
            "2020-05-25",
            "2020-05-26"
        ]
    }
]
```