---
title: "Understanding group analytics: frontend vs backend implementations"
sidebar: Docs
showTitle: true
author: ['ian-vanagas']
date: 2022-11-09
featuredImage: ../images/tutorials/banners/tutorial-11.png
tags: ["configuration","group analytics", 'product analytics']
---

Group analytics is a powerful feature for understanding how groups such as organizations, customers, and companies use your product as a unit. It provides a new level of analysis between individual users and all your users.

When implementing group analytics, there are some differences to look out for between the frontend implementation and the backend one. This tutorial goes over why there are differences and how to implement group analytics on the frontend compared to the backend.

## Why are there differences

Before we go into the implementation, it is useful to understand **why** there are differences between the frontend and backend. 

At PostHog, we think about (and store) everything as **events**. This means a group for us is a set of events related to a group identity. People (in PostHog) are the same, a set of events related to a person identity. 

When you shift your thinking from a group as a set of people to a group as a set of events (with people identities), the differences between the frontend and backend implementation make more sense.

To further help this make sense, let’s look at both frontend and backend implementation

## Frontend group analytics implementation

It is relatively easy to implement frontend group analytics because we abstract away some of the details around connecting groups to events. On the frontend, we assume once you identify a user and connect them to a group, you want all events a user creates to include the group data. By treating everything they do as a “session” (the JavaScript library is stateful), we automatically do this for you.

A standard pattern is identifying the user, connecting them to a group, then capturing events.

```js
posthog.identify('ian@posthog.com');
posthog.group('company', 'posthog');
posthog.capture('login');
```

On the frontend, you also use the `group` call to update the properties of your group. The below example does both. It connects the user to the group and updates the group’s properties.

```js
posthog.group('company', 'posthog', {
    name: 'PostHog',
    score: 99,
})
```

Because sessions connect users and groups, you need to call `posthog.reset()` when a user changes (logs out) to ensure events aren’t captured as belonging to that user and group. You could also call `posthog.resetGroup()` to only reset the group, not the user. If you want to connect the user back to a group, you’ll need to call `posthog.group()` again.

## Backend group analytics implementation

The backend implementation is different. Backend libraries have no concept of a session (they aren’t stateful). This means they don’t get the abstraction of combining the user (person) and group. Every time you capture an event, you must add the group data to it.

<MultiLanguage>

```python
posthog.capture('ian@posthog.com', 'login', groups={'company': 'posthog'})
```

```go
client.Enqueue(posthog.Capture{
    DistinctId: "ian@posthog.com",
    Event:      "login",
    Groups: posthog.NewGroups().
        Set("company", "posthog").
})
```

```node
posthog.capture({
    event: "login",
    distinctId: 'ian@posthog.com',
    groups: { company: 'posthog' }
})
```

```php
PostHog::capture(array(
    'distinctId' => 'ian@posthog.com',
    'event' => 'login',
    '$groups' => array("company" => "posthog")
));
```

```segment
analytics.track('login', {
    "$groups": {
        "company": "posthog"
    }
})
```

</MultiLanguage>

> The API level property is `$groups` and is within the `properties` object. Libraries transform `groups` to this for you.

You also can’t update the group properties from the capture call. You must use a separate `group_identify` which looks like this:

<MultiLanguage>

```python
posthog.group_identify('company', 'posthog', {
    'name': 'PostHog',
    'score': 99
})
```

```go
client.Enqueue(posthog.GroupIdentify{
    Type: "company",
    Key:  "posthog",
    Properties: posthog.NewProperties().
        Set("name", "PostHog").
        Set("score", 99),
})
```

```node
posthog.groupIdentify({
    groupType: 'company',
    groupKey: 'posthog',
    properties: {
        name: 'PostHog',
        score: 99
    }
})
```

```php
PostHog::groupIdentify(array(
    'groupType' => 'company',
    'groupKey' => 'posthog',
    'properties' => array("name" => "PostHog", "score" => 99)
));
```

```segment
analytics.track('$groupidentify', {
    "$group_type": "company",
    "$group_key": "posthog",
    "$group_set": {
        "name": "PostHog",
        "score": 99
    }
})
```

</MultiLanguage>

PostHog currently stores groups separately from events, but soon, we will merge them. This means calling `group_identify` will not update the group details for past events (like it does now). To handle this, we recommend calling `group_identify` whenever group properties change. This ensures events always have the most updated group properties.

The benefit of the backend is that you don’t have to call `reset()` when you’re done because you have no session to reset. There are no sessions because the backend usually deals with multiple requests from different people one after another. It is awkward to enforce a session that lasts only one request, and this also reduces flexibility for implementers. Instead, you can add group analytics where and when you need it on the backend.

## Next steps in group analytics

This should give you a better understanding of how you need to implement frontend vs backend group analytics. From here, you can utilize your group analytics to [view groups and their properties](/manual/group-analytics#viewing-groups-and-their-properties), [analyze group insights](/manual/group-analytics#analyzing-group-insights), and [setup group feature flags](/manual/group-analytics#integrating-groups-with-feature-flags). 
