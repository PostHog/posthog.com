---
title: Events
sidebar: Docs
showTitle: true
---


In PostHog, there is an API endpoint available to see all events in your system, and filter.

*Important!* While you can technically create new events with this API, it's much easier to [use the dedicated API](/integrations/api) or [any of our libraries](/integrations/api) for that.

## Pagination

This endpoint has pagination. See [pagination](/docs/api/api#pagination) for more info.

## List trends

```plaintext
GET /event
GET /event/?properties=[{"key":"email","connector":"icontains","value":"@gmail.com"}]
```

| Attribute | Type | Required | Description |
| --- | --- | --- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `properties` | Array of Properties | no | The key/values that you want to filter on. Basic usage is: `[{"key": "$browser", "value": "Chrome"}]`<br><br>For each property, you can specify:<br>- `key` Key of the property<br>- `value` Value you want to filter on<br>- `type` Either `person` or `event`<br>- `connector`, any of: <br>-- `exact`/empty<br>--`is_not`<br>--`icontains`<br>--`not_icontains`<br>--`gt`<br>--`lt`<br>--`is_set` |

Example request:

```shell
curl https://posthog.example.com/api/event/
```

Example response:

```json
{
    "next": true,
    "results": [
        {
            "id": 2291628,
            "distinct_id": "0xbG68iGeFo5brkG5j__Nd0Z73N6qQe5Vz4nsL9jgBE",
            "properties": {
                "$ip": "127.0.0.1",
                "$os": "Mac OS X",
                "$lib": "web",
                "$time": 1590415593.574,
                "token": "[token]",
                "$browser": "Chrome",
                "$user_id": "0xbG68iGeFo5brkG5j__Nd0Z73N6qQe5Vz4nsL9jgBE",
                "$referrer": "http://127.0.0.1:8000/actions",
                "$device_id": "1715fb07a0a57c-047d7c8c5ec5d6-396a7f07-7e9000-1715fb07a0b541",
                "$insert_id": "jiv7kstz1oqna7s1",
                "distinct_id": "0xbG68iGeFo5brkG5j__Nd0Z73N6qQe5Vz4nsL9jgBE",
                "$current_url": "http://127.0.0.1:8000/",
                "$lib_version": "1.0.0",
                "$screen_width": 1680,
                "$screen_height": 1050,
                "posthog_version": "1.6.0",
                "$browser_version": 81,
                "$initial_referrer": "http://127.0.0.1:8081/demo.html",
                "$referring_domain": "127.0.0.1:8000",
                "has_slack_webhook": true,
                "$initial_referring_domain": "127.0.0.1:8081",
                "$had_persisted_distinct_id": true
            },
            "elements": [],
            "event": "$pageview",
            "timestamp": "2020-05-25T14:06:33.584171Z",
            "person": "tim@posthog.com"
        },
        {
            "id": 2291610,
            "distinct_id": "0xbG68iGeFo5brkG5j__Nd0Z73N6qQe5Vz4nsL9jgBE",
            "properties": {
                "$ip": "127.0.0.1",
                "$os": "Mac OS X",
                "$lib": "web",
                "$host": "127.0.0.1:8000",
                "$time": 1589898391.007,
                "token": "[token]",
                "$browser": "Chrome",
                "$user_id": "0xbG68iGeFo5brkG5j__Nd0Z73N6qQe5Vz4nsL9jgBE",
                "$pathname": "/demo",
                "$device_id": "1715fb07a0a57c-047d7c8c5ec5d6-396a7f07-7e9000-1715fb07a0b541",
                "$insert_id": "jnyt20j9bt261ckx",
                "$ce_version": 1,
                "$event_type": "click",
                "distinct_id": "0xbG68iGeFo5brkG5j__Nd0Z73N6qQe5Vz4nsL9jgBE",
                "$current_url": "http://127.0.0.1:8000/demo",
                "$lib_version": "1.0.0",
                "$screen_width": 1680,
                "$screen_height": 1050,
                "posthog_version": "1.5.0",
                "$browser_version": 81,
                "$initial_referrer": "http://127.0.0.1:8081/demo.html",
                "has_slack_webhook": true,
                "$initial_referring_domain": "127.0.0.1:8081",
                "$had_persisted_distinct_id": true
            },
            "elements": [
                {
                    "event": null,
                    "text": "Sign up",
                    "tag_name": "a",
                    "attr_class": [
                        "btn",
                        "btn-lg",
                        "btn-success"
                    ],
                    "href": "/demo/1",
                    "attr_id": "sign-up",
                    "nth_child": 5,
                    "nth_of_type": 1,
                    "attributes": {
                        "attr__id": "sign-up",
                        "attr__href": "/demo/1",
                        "attr__class": "btn btn-lg btn-success"
                    },
                    "order": 0
                },
                {
                    "event": null,
                    "text": null,
                    "tag_name": "div",
                    "attr_class": [
                        "container"
                    ],
                    "href": null,
                    "attr_id": null,
                    "nth_child": 1,
                    "nth_of_type": 1,
                    "attributes": {
                        "attr__class": "container"
                    },
                    "order": 1
                },
                {
                    "event": null,
                    "text": null,
                    "tag_name": "body",
                    "attr_class": null,
                    "href": null,
                    "attr_id": null,
                    "nth_child": 2,
                    "nth_of_type": 1,
                    "attributes": {},
                    "order": 2
                }
            ],
            "event": "$autocapture",
            "timestamp": "2020-05-19T14:26:31.128297Z",
            "person": "tim@posthog.com"
        }
    ]
}
```