---
title: People
sidebar: Docs
showTitle: true
---


In PostHog, there is an API endpoint available to see all people ("users") in your PostHog instance.

## Pagination

This endpoint has pagination. See [pagination](/docs/api/api#pagination) for more info.

## List people

```plaintext
GET /person
GET /person/?properties=[{"key":"email","connector":"icontains","value":"@gmail.com"}]
GET /person/?id=214882,492810,18240
```

| Attribute | Type | Required | Description |
| --- | --- | --- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `properties` | Array of Properties | no | The key/values that you want to filter on. Basic usage is: `[{"key": "$browser", "value": "Chrome"}]`<br><br>For each property, you can specify:<br>- `key` Key of the property<br>- `value` Value you want to filter on<br>- `type` Either `person` or `event`<br>- `connector`, any of: <br>-- `exact`/empty<br>--`is_not`<br>--`icontains`<br>--`not_icontains`<br>--`gt`<br>--`lt`<br>--`is_set` |
| `id` | Comma separated ids | no | Get multiple people by id.

Example request:

```shell
curl https://posthog.example.com/api/person/
```

Example response:

```json
{
    "next": "https://posthog.example.com/api/person/?cursor=cD0yMjgxOTA2",
    "previous": null,
    "results": [
        {
            "id": 2296750,
            "name": "tim@posthog.com",
            "distinct_ids": [
                "h76pUrwsXarWvHjexBr8rHU6_b-yszcWBjJZiTC87C8",
                "171842424bf55-06b1843bc657b5-396d7507-7e9000-171842424c07d2",
            ],
            "properties": {
                "$os": "Mac OS X",
                "name": "Tim",
                "email": "tim@posthog.com",
                "$browser": "Chrome",
                "company_name": "test",
                "$browser_version": 81,
                "$initial_referrer": "http://127.0.0.1:8081/demo.html",
                "$initial_referring_domain": "127.0.0.1:8081"
            },
            "created_at": "2020-05-19T14:28:58.397533Z"
        },
        {
            "id": 2296684,
            "name": "1720df7f0d91e-031be0d49f91cb-d373666-2a3000-1720df7f0da30b",
            "distinct_ids": [
                "1720df7f0d91e-031be0d49f91cb-d373666-2a3000-1720df7f0da30b"
            ],
            "properties": {},
            "created_at": "2020-05-13T12:17:36.340682Z"
        },
    ]
}
```

## Get single person

```plaintext
GET /person/:id
```

| Attribute | Type | Required | Description |
| --- | --- | --- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id` | Integer | yes | ID of the user

Example request:

```shell
curl https://posthog.example.com/api/person/2296750/
```

Example response:

```json
{
    "id": 2296750,
    "name": "tim@posthog.com",
    "distinct_ids": [
        "h76pUrwsXarWvHjexBr8rHU6_b-yszcWBjJZiTC87C8",
        "171842424bf55-06b1843bc657b5-396d7507-7e9000-171842424c07d2",
    ],
    "properties": {
        "$os": "Mac OS X",
        "name": "Tim",
        "email": "tim@posthog.com",
        "$browser": "Chrome",
        "company_name": "test",
        "$browser_version": 81,
        "$initial_referrer": "http://127.0.0.1:8081/demo.html",
        "$initial_referring_domain": "127.0.0.1:8081"
    },
    "created_at": "2020-05-19T14:28:58.397533Z"
}
```