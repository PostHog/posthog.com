---
title: Elements
sidebar: Docs
showTitle: true
---

> For instructions on how to authenticate to use this endpoint, see [API Overview](/docs/api/overview).

In PostHog, there is an API endpoint available to fetch the DOM elements captured by the autocapture functionality.
The most interesting usecase for this is to be able to get all elements we have for a specific page, and how often that element has been interacted with.

## Pagination

This endpoint has pagination. See [Pagination](/docs/api/overview#pagination) for more info.

## Element Stats

`/stats` gives you an aggregate count of the number of events for each element. Internally we use this in the toolbar to show you a heatmap.

```shell
GET /element/stats/
GET /element/stats/?properties=[{"key":"$browser","value":"Chrome"}]
GET /element/stats/?properties=[{"key":"$browser","value":"Chrome"}]&date_from=-2d
```


| Attribute | Type | Required | Description |
| --- | --- | --- | ------------------------------------------------------------------------------ |
| `properties` | Array of Properties | no | The key/values that you want to filter on. Basic usage is: `[{"key": "$browser", "value": "Chrome"}]`<br><br>For each property, you can specify:<br>- `key` Key of the property<br>- `value` Value you want to filter on<br>- `type` Either `person` or `event`<br>- `operator`, any of: <br>-- `exact`/empty<br>--`is_not`<br>--`icontains`<br>--`not_icontains`<br>--`gt`<br>--`lt`<br>--`is_set` |
| `date_from` | Date or Relative Date | no | Date from which to filter events from. Can be an iso date: `2020-06-18`, or a relative date. <br>Some examples of relative dates:<br>- `-2mStart` the start of the month, 2 months ago<br>- `-1y` one year ago<br>- `-1wEnd` the end of the last week.
| `date_to` | Date or Relative Date | no | Date from which to filter events to. Can be an iso date: `2020-06-18`, or a relative date. <br>Some examples of relative dates:<br>- `-2mStart` the start of the month, 2 months ago<br>- `-1y` one year ago<br>- `-1wEnd` the end of the last week.


Example request:

```bash
curl https://posthog.example.com/api/elements/stats/
```

Example response:

```json
[
    {
        "count": 245,
        "hash": "31cd783c8572a24e1bd1912d8c436b72",
        "elements": [
            {
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
            }
        ]
    }
]
```

## Elements

Lists all elements.

```shell
GET /element/
```

| Attribute | Type | Required | Description |
| :---: | --- | --- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `properties` | Array of Properties | no | The key/values that you want to filter on. Basic usage is: `[{"key": "$browser", "value": "Chrome"}]`<br><br>For each property, you can specify:<br>- `key` Key of the property<br>- `value` Value you want to filter on<br>- `type` Either `person` or `event`<br>- `operator`, any of: <br>-- `exact`/empty<br>--`is_not`<br>--`icontains`<br>--`not_icontains`<br>--`gt`<br>--`lt`<br>--`is_set` |


Example request:

```bash
curl https://posthog.example.com/api/elements/
```

Example response:

```json
{
    "count": 1009034,
    "next": "https://app.posthog.com/api/element/?limit=100&offset=100",
    "previous": null,
    "results": [
        {
            "text": null,
            "tag_name": "body",
            "attr_class": null,
            "href": null,
            "attr_id": null,
            "nth_child": 2,
            "nth_of_type": 1,
            "attributes": {},
            "order": 10
        },
        {
            "text": null,
            "tag_name": "div",
            "attr_class": null,
            "href": null,
            "attr_id": "root",
            "nth_child": 1,
            "nth_of_type": 1,
            "attributes": {
                "attr__id": "root"
            },
            "order": 9
        },
    ]
}
```
