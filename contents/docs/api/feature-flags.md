---
title: Feature Flags
sidebar: Docs
showTitle: true
---

<span class='note-block'>For instructions on how to authenticate to use this endpoint, see [API Overview](/docs/api/api).</span><br />

PostHog provides you with an API endpoint to create and update your [feature flags](/docs/features/feature-flags). This section refers to that endpoint specifically. 

If you're looking to use feature flags on your application, you can either use our [JavaScript Integration](/docs/integrations/js-integration#feature-flags) our our [dedicated endpoint](/docs/api/post-only-endpoints#feature-flags) for checking if feature flags are enabled for a given user.

## Create/Update Feature Flags

```shell
POST /feature_flag
POST /feature_flag/12
```

<span class="table-borders">

| Attribute | Type | Required | Description |
| --- | --- | --- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name` | String | Yes | The name you wish to give to your feature flag. Helps identify the flag easily when using the PostHog UI. |
| `key` | String | Yes | The actual identifier of your flag to be used when referencing it. |
| `active` | Boolean | No (Default: True) | If you want to have your flag active  |
| `rollout_percentage` | Integer | No (Default: None) | Percentage of users with the specified filters that ther given flag will apply to. If filters are not specified, this will be a percentage of your total users.  |
| `filters` | Hash table | No (Default: `{}`) | Properties of users to be matched for a flag to be on. |


</span>

Example request:

```bash
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

## Get a Single Person

```shell
GET /person/:id
```

<span class="table-borders">

| Attribute | Type | Required | Description |
| :---: | :---: | :---: | :---:|
| `id` | Integer | yes | ID of the user |

</span>

Example request:

```bash
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