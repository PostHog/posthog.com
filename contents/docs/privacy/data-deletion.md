---
title: Data deletion
sidebarTitle: Data deletion
sidebar: Docs
showTitle: true
---

## How to delete data from PostHog

One can remove unwanted data from posthog by:
1. Deleting teams/organizations
2. Deleting persons

This can be done either under (1) the settings pages , (2) under persons & groups pages, or (3) using the API.

When deleting individual persons, you can also choose to delete all of their events. When deleting teams, all data under the team
(including events) are automatically removed.

## How to delete persons and related events using the API

> **Please note:** reusing `distinct_id`s after deletion is not supported. If you wish to delete bad data on some `distinct_id`s but keep that person's other `distinct_id` active , you should first split that person with the "Split IDs" button.

Persons and events can be deleted using our API endpoints. 

To query all persons in your project, use the [GET Persons API endpoint](https://posthog.com/docs/api/persons#get-api-projects-project_id-persons).

You can filter for specific subsets of persons using the query parameters. For example, you can get a specific person by filtering by email:

```
GET https://posthog.example.com/api/projects/{YOUR_PROJECT_ID}/persons?email={EMAIL}
```

You can paginate through the results using the `next` and `previous` parameters returned by this endpoint.

To delete the persons and their events, you can use the [DELETE Persons API endpoint](https://posthog.com/docs/api/persons#delete-api-projects-project_id-persons-id)

To do that, iterate through the persons returned in the previous step, and use the person's `id` or `distinct_id` in the DELETE call. To delete the person's corresponding events in addition to the person, add a `delete_events=true` parameter. For example:

```
GET https://posthog.example.com/api/projects/{YOUR_PROJECT_ID}/persons/{ID}?delete_events=true
```

## Asynchronous data deletion

While most data in PostHog is deleted instantly, event data is not. Instead data is cleared asynchronously during non-peak usage times (weekends on PostHog Cloud).

This is done because data deletion in ClickHouse is expensive and it can impact performance for other users.

On self-hosted, asynchronous deletions happen according to the `CLEAR_CLICKHOUSE_REMOVED_DATA_SCHEDULE_CRON` environment variable (defaults to Sunday 5AM UTC). Read more on environment variables [here](/docs/self-host/configure/environment-variables)
