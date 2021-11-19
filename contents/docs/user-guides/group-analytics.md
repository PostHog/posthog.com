---
title: Group Analytics (Alpha)
sidebar: Docs
showTitle: true
---

<blockquote class="warning-note">
    <strong>Group Analytics</strong> is currently an <strong>Alpha</strong> feature and not available for everyone.
<br />
Exact details of the feature can change over the Alpha period.
</blockquote>

**Group Analytics** allows you to calculate metrics on a group level. A "Group" is an Entity that events
belong to - such as a specific Company, Team or Playlist of songs. If you're a B2B company, Groups help
you analyze how various groups interact with your product rather than individual users.

## Prerequisites

- The feature is only available in Alpha right now. <a href="/slack" target="_blank">Reach out</a> if you're interested.
You can instrument up to 5 different group types per project and unlimited groups under each type.
    - Example of a Group type: Company, Playlist.
    - Example of a Group: PostHog, Tesla, Slack.
- The feature is currently available on PostHog Cloud and 1.30.0 if you self-host.

## Known limitations

- You can't yet use Groups for Feature Flags or in Lifecycle/Stickiness/Session Insights.
- Updating Group properties overwrites _all_ previous properties for that Group.

These limitations will be removed in the coming weeks.

## How to get access to the feature

Update to release [1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or above.

As you upgrade, please set the env var `PERSISTED_FEATURE_FLAGS` to `group-analytics`. If you're deploying via helm charts, you can do this bu adding the following to `values.yaml` and deploying:
```
env:
- name: PERSISTED_FEATURE_FLAGS
  value: "group-analytics"
```

## How to set up Group Analytics (client libraries)

To make use of Group Analytics, you need to update your event capture code. See the sections below for how to set it up depending on how you send data to PostHog.

The following examples use `company` as a group type and `id:5` as the group key. Replace these with your particular values.

> **Tip:** Use a singular form of the group type throughout ingestion

### [posthog-js](https://posthog.com/docs/integrate/client/js)

Update to version 1.16.0 or above to make use of the new functionality.

In posthog-js, it's possible to declare that a user is currently "active" in a particular Group. This means all events (both normal and autocaptured) are considered to be for that Group.

To ensure all events get attached to Groups, we recommend calling `posthog.group` in `loaded` callback.

```js
posthog.init('[your api key]', {
    api_host: 'https://posthog.[your-domain].com',
    loaded: function(posthog) {
        posthog.identify('[user unique id]');

        posthog.group('company', 'id:5');
        posthog.group('playlist', 'id:77', {
            length: 77,
            some: 'properties'
        });
    }
});
```

Subsequent calls to `posthog.group()` with the same group type but a different group key make the new Group active.

#### Handling logging out

When the user logs out, it's important to call `posthog.reset()` to avoid new events being registered under registered groups and the logged-in user.

### [posthog-python](https://posthog.com/docs/integrate/server/python)

Update to version 1.4.3 or above to make use of the new functionality.

```python
# Capturing an event with Groups
posthog.capture('[distinct id]', 'some event', groups={'company': 'id:5'})

# Updating Group properties
posthog.group_identify('company', 'id:5', {
    'company_name': 'Awesome Inc',
    'employees': 11
})
```

### [posthog-php](https://posthog.com/docs/integrate/server/php)

Update to version 2.1.0 or above to make use of the new functionality.

```c
# Capturing an event with Groups
PostHog::capture(array(
    'distinctId' => '[distinct id]',
    'event' => 'some event',
    '$groups' => array("company" => "id:5")
));

# Updating Group properties
PostHog::groupIdentify(array(
    'groupType' => 'company',
    'groupKey' => 'id:5',
    'properties' => array("company_name" => "Awesome Inc", "employees" => 11)
));
```

### [posthog-go](https://posthog.com/docs/integrate/server/go)

```go
// Capturing an event with Groups
client.Enqueue(posthog.Capture{
    DistinctId: "[distinct id]",
    Event:      "some event",
    Groups: posthog.NewGroups().
        Set("company", "id:5").
})

// Updating a Groups properties
client.Enqueue(posthog.GroupIdentify{
    Type: "company",
    Key:  "id:5",
    Properties: posthog.NewProperties().
        Set("company_name", "Awesome Inc").
        Set("employees", 11),
})
```

Using Groups with Go requires the latest version of `posthog-go`. Update dependencies via:

```shell
go get -u github.com/posthog/posthog-go
```

### [posthog-node](https://posthog.com/docs/integrate/server/node)

Update to version 1.2.0 or above to make use of the new functionality.

```javascript
// Capturing an event with Groups
posthog.capture({
    event: "some event",
    distinctId: '[distinct id]',
    groups: { company: 'id:5' }
})

// Updating a Groups properties
posthog.groupIdentify({
    groupType: 'company',
    groupKey: 'id:5',
    properties: {
        company_name: 'Awesome Inc',
        employees: 11
    }
})
```

### Other libraries

Not all libraries support Group Analytics yet, but you can work around this issue by sending events in specific formats.

This section uses our [Capture APIs](https://posthog.com/docs/api/post-only-endpoints) for examples, but you can adapt this
approach to any library.

#### Capturing events with groups

```shell
POST https://[your-instance].com/capture/
Content-Type: application/json
Body:
{
    "api_key": "<ph_project_api_key>",
    "event": "[event name]",
    "properties": {
        "distinct_id": "[your users' distinct id]",
        "key1": "value1",
        "key2": "value2",
        "$groups": {
            "company": "id:5"
        }
    }
}

```

#### Updating Group properties

```shell
POST https://[your-instance].com/capture/
Content-Type: application/json
Body:
{
    "api_key": "<ph_project_api_key>",
    "event": "$groupidentify",
    "properties": {
        "distinct_id": "[your users' distinct id]",
        "$group_type": "company",
        "$group_key": "id:5",
        "$group_set": {
            "company_name": "Awesome Inc",
            "employees": 11
        }
    }
}

```
