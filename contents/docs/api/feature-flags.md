---
title: Feature Flags
sidebar: Docs
showTitle: true
---

<span class='note-block'>For instructions on how to authenticate to use this endpoint, see [API Overview](/docs/api/api).</span><br />

PostHog provides you with an API endpoint to create and update your [feature flags](/docs/features/feature-flags). This section refers to that endpoint specifically. 

If you're looking to use feature flags on your application, you can either use our [JavaScript Integration](/docs/integrations/js-integration#feature-flags) our our [dedicated endpoint](/docs/api/post-only-endpoints#feature-flags) for checking if feature flags are enabled for a given user.

## Create Feature Flags

```shell
POST /feature_flag
```

### Data

<span class="table-borders">

| Attribute | Type | Required | Description |
| --- | --- | --- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name` | String | Yes | The name you wish to give to your feature flag. Helps identify the flag easily when using the PostHog UI. |
| `key` | String | Yes | The actual identifier of your flag to be used when referencing it. |
| `active` | Boolean | No (Default: True) | If you want to have your flag active  |
| `rollout_percentage` | Integer | No (Default: None) | Percentage of users with the specified filters that ther given flag will apply to. If filters are not specified, this will be a percentage of your total users.  |
| `filters` | Hash table | No (Default: `{}`) | Properties of users to be matched for a flag to be on. |

</span>

### Example Request

```bash
curl -i -X POST \
-H "Host: app.posthog.com" \
-H "DNT: 1" \
-H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36" \
-H "Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryqXQHtL5zR8zjk6lh" \
-H "Accept: */*" \
-H "Referer: https://app.posthog.com/" \
-F "active=true" \
-F "filter={}" \
-F "name=My Flag" \
-F "key=ayo" \
-F "rollout_percentage=20" \
-F "personal_api_key=w1O-6ExaX-t44IOUSb-Hx65Jjj4CwOwLlqAxdfo4gvg" \
-L -v "https://app.posthog.com/api/feature_flag/"
```

### Example Response

```bash
{
    "id": 123,
    "name": "My Flag",
    "key": "my-flag",
    "rollout_percentage": 20,
    "filters": {
        "properties": [
            {
                "key": "ice_cream_preference",
                "type": "person",
                "value": "chocolate"
            }
        ]
    },
    "deleted": false,
    "active": true,
    "created_by": {
        "id": 766,
        "distinct_id": "4aa16b878667276092ced03c6f434b8932f",
        "first_name": "John",
        "email": "john.smith@fakeemail.com"
    },
    "created_at": "2020-09-02T18:36:15.993777Z"
}
```

## Get the Details of a Flag

```shell
GET /feature_flag/12
```

### Data

To get the details of a given feature flag, pass its ID directly on the path. No additional form data is required. 

### Example Request

```bash
curl https://posthog.example.com/api/feature_flag/12
```

### Example Response

```bash
{
    "id": 123,
    "name": "My Flag",
    "key": "my-flag",
    "rollout_percentage": 20,
    "filters": {
        "properties": [
            {
                "key": "ice_cream_preference",
                "type": "person",
                "value": "chocolate"
            }
        ]
    },
    "deleted": false,
    "active": true,
    "created_by": {
        "id": 766,
        "distinct_id": "4aa16b878667276092ced03c6f434b8932f",
        "first_name": "John",
        "email": "john.smith@fakeemail.com"
    },
    "created_at": "2020-09-02T18:36:15.993777Z"
}
```

## Update the Details of a Flag

```shell
PATCH /feature_flag/12
```

### Data 

Passing the ID of the flag directly in the path, include any values from the table shown under 'Create Feature Flags' that you wish to update.


