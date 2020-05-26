---
title: API
sidebar: Docs
showTitle: true
---


In PostHog, there is an API endpoint available to do XXXXX.
For more information on XXXX, see [XXXX](/docs/features/...)

## Pagination

This endpoint has pagination. See [pagination](/docs/api/api#pagination) for more info.

## List trends


```plaintext
GET /...
GET /.../?properties=[{"key":"$browser","value":"Chrome"}]
```

| Attribute | Type | Required | Description |
| --- | --- | --- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `events` | Array of Events | yes | Basic usage is `[{"id": "$pageview"}]` |
| `properties` | Array of Properties | no | The key/values that you want to filter on. Basic usage is: `[{"key": "$browser", "value": "Chrome"}]`<br><br>For each property, you can specify:<br>- `key` Key of the property<br>- `value` Value you want to filter on<br>- `type` Either `person` or `event`<br>- `connector`, any of: <br>-- `exact`/empty<br>--`is_not`<br>--`icontains`<br>--`not_icontains`<br>--`gt`<br>--`lt`<br>--`is_set` |

Example request:

```shell
curl https://posthog.example.com/api/
```

Example response:

```json
{}
```