---
title: Async Migrations
sidebar: Handbook
showTitle: true
---

> Note: Async Migrations are in Alpha, if you're interested in trying this out reach out to us on [PostHog Users's Slack](https://posthog.com/slack) first.

## What are async migrations?

Async migrations are _data migrations_ that do not run synchronously on an update to a PostHog instance. Rather, they execute on the background of a running PostHog instance, and should be completed within a range of PostHog versions. 

## Why are async migrations necessary?

Migrations are inevitable, and sometimes it may be necessary to execute non-trivial schema changes that can take a long time to complete. 

For example, ClickHouse does not support changing the primary key of a table, which is a change we were [forced to make in anticipation of upgrading ClickHouse beyond version 21.6](https://github.com/PostHog/posthog/issues/5684). As a result, the way to change the schema of the table was to create a new table and insert all the data from the old table into it, which took us an entire week to run on PostHog Cloud.

Now, while we at PostHog can execute such changes to our Cloud instance "manually", we felt compelled to provide a better approach for our users to do so.

As a result, we created a system capable of safely and efficiently managing migrations that need to happen asynchronously.

## Working with async migrations

Managing async migrations is a job for self-hosted PostHog instance admins. These migrations require some level of supervision as they affect how data is stored and may run for long periods of time.

However, worry not! We've built a system to make managing these as easy as possible.

### Prerequisite

To manage async migrations, you must be a staff user. PostHog deployments from version 1.31.0 onwards will automatically give the instance's first user "staff status", but those who have deployed PostHog before 1.31.0 will have to manually update Postgres.

To do so, follow our [guide for connecting to Postgres](/docs/self-host/deploy/troubleshooting#how-do-i-connect-to-postgres) and then run the following query:

```sql
UPDATE posthog_user 
SET is_staff=true
WHERE email=<your_email_here>
```

To confirm that everything worked as expected, visit `/admin/` (trailing slash required) in your instance. If you're able to access the admin panel, you're good to go!

### Async migrations page

We've added a page where you can manage async migrations at `/instance/async_migrations`. 

On this page you can trigger runs, stop running migrations, perform migration rollbacks, check errors, and gather useful debugging information.

Here's a quick summary of the different columns you see on the async migrations table:

| Column | Description |
| : -----: | :--------: |
| Name     | The migration's name. This corresponds to the migration file name in [`posthog/async_migrations/migrations`](https://github.com/PostHog/posthog/tree/master/posthog/async_migrations/migrations) |
| Description | An overview of what this migration does |
| Status | The current [status](https://github.com/PostHog/posthog/blob/master/posthog/models/async_migration.py#L5) of this migration. One of: 'Not started','Running','Completed successfully','Errored','Rolled back','Starting'. |
| Error | The last error encountered by this migration |
| Progress | How far along this migration is (0-100) |
| Current operation index | The index of the operation currently being executed. Useful for cross-referencing with the migration file |
| Current query ID | The ID of the last query ran (or currently running). Useful for checking and/or killing queries in the database if necessary. |
| Celery task ID | The ID of the Celery task running the migration. Used to force stop a migration task if necessary. |
| Started at | When the migration started. |
| Finished at | When the migration ended. |

### Automatically running migrations

From PostHog 1.32.0 onwards, we will set `AUTO_START_ASYNC_MIGRATIONS` to `true` by default. This means that when your instance starts/re-starts, we will look for migrations that are ready to be run (based on a healthcheck, service requirement checks, version checks, etc.) and automatically start them in the background (using Celery).

The current default is to trigger a task to run 30 minutes after the deploy and if there are multiple migrations to run, we will automatically run the next migration in line once the previous one completes.

However, on PostHog 1.31.0, `AUTO_START_ASYNC_MIGRATIONS` is set to `false`. As such, to run the async migration included, you will have to manually trigger it from `/instance/async_migrations`.

If you would like to customize the behaviour you can set `AUTO_START_ASYNC_MIGRATIONS` in your `values.yaml` file like this (note the two values we have in the chart default `values.yaml` should be kept):
```
web:
  env:
    - name: AUTO_START_ASYNC_MIGRATIONS
      value: "false"
```

### Celery scaling considerations

To run async migrations, we occupy one Celery worker process to run the task. Celery runs `n` processes (per pod) where `n == number of CPU cores on the posthog-worker pod`. As such, we recommend scaling the `posthog-worker` pod in anticipation of running an async migration.

You can scale in two ways:

1. Horizontally by increasing the desired number of replicas of `posthog-worker`
2. Vertically by increasing the CPU request of a `posthog-worker` pod 

Once the migration has run, you can scale the pod back down. 

