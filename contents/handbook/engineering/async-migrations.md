---
title: Async Migrations
sidebar: Handbook
showTitle: true
---

> **Note:** Async migrations are currently a work in progress under the name of "special migrations".

## What are async migrations?

Async migrations (AKA big/special migrations) are migrations that do not run synchronously on an update to a PostHog instance. Rather, they execute on the background of a running PostHog instance, and should be completed within a range of PostHog versions. 

## Why are async migrations necessary?

Migrations are inevitable, and sometimes it may be necessary to execute non-trivial schema changes that can take a long time to complete. 

For example, ClickHouse does not support changing the primary key of a table, which is a change we were [forced to make in anticipation of upgrading ClickHouse beyond version 21.6](https://github.com/PostHog/posthog/issues/5684). As a result, the way to change the schema of the table was to create a new table and insert all the data from the old table into it, which took us an entire week to run on PostHog Cloud.

Now, while we can execute such changes to PostHog Cloud "manually" (i.e. James G SSHs into CH5, runs a bunch of queries using clickhouse-client, and keeps an eye on them), we cannot expect the same of our users (plus this approach does not scale well for us either).

As a result, we needed to create a system capable of safely and efficiently managing migrations that need to happen asynchronously.

## Why did we write this system from scratch?

As a provider of a product that users can self-host, we needed a bespoke solution that interoperates well with our particular tech stack and requirements, such as:

1. The ability to run asynchronous tasks using a system already in use (Celery)
2. Accounting for both databases we have in use (Postgres and ClickHouse) and their subsequent migrations
3. Accounting for our EE codebase
4. The ability for self-hosted users to manage and monitor migrations easily 
5. Accounting for our particular deployment options
6. Allowing logical branching (splitting code paths) in the future
7. Extensibility to support future needs we might have for long-running operations

## How do async migrations work?

### Writing an async migration

To write an async migration, you should create a migration file inside `posthog/special_migrations/migrations`. The name should follow the convention we use for Django and EE migrations (e.g. `0005_update_events_schema`).

Here's what an example async migration looks like:

<details>

<summary><b>Example async migration</b></summary>

<br />



```python
from posthog.constants import AnalyticsDBMS
from posthog.special_migrations.definition import SpecialMigrationDefinition, SpecialMigrationOperation
from posthog.version_requirement import ServiceVersionRequirement
from ee.clickhouse.client import sync_execute

class Migration(SpecialMigrationDefinition):

    description = "Migrate table_x to a new schema"

    # minimum posthog version for running this migration
    posthog_min_version = "1.28.0"

    # maximum posthog version this migration can be run on - it becomes a requirement from 1.31.1 onwards
    posthog_max_version = "1.31.0"

    # if clickhouse is on a version below 21.6.0, this migration won't run
    service_version_requirements = [
        ServiceVersionRequirement(service="clickhouse", supported_version=">=21.6.0"),
    ]

    # the special migration that needs to have completed before this one
    depends_on = "0003_previous_special_migration"

    # ordered list of operations in the migration
    operations = [
        SpecialMigrationOperation(
            database=AnalyticsDBMS.POSTGRES,
            sql="CREATE TABLE table_x_new ( key VARCHAR, value VARCHAR ) ENGINE = ReplacingMergeTree('value') ORDER BY key",
            rollback="DROP TABLE table_x_new",
        ),
        SpecialMigrationOperation(
            database=AnalyticsDBMS.POSTGRES,
            sql="INSERT INTO table_x_new (col1) SELECT key, value FROM table_x",
            rollback="TRUNCATE TABLE table_x_new",
        ),
    ]
    
    # only run if the table doesn't already exist
    def is_required(self):
        result = sync_execute("SELECT count(*) FROM system.tables WHERE database='posthog' AND name='table_x_new'")
        return result[0][0] == 0 

    # check if we're not running low on storage
    def healthcheck(self):
        result = sync_execute("SELECT free_space FROM system.disks")
        if result[0][0] < 1000000000:
            return (False, "ClickHouse available storage below 1GB") 

        return (True, None)

    # update progress based on the total rows moved
    def progress(self, _):
        result = sync_execute(f"SELECT count(*) FROM table_x")
        result2 = sync_execute(f"SELECT count(*) FROM table_x_new")
        total_rows_to_move = result2[0][0]
        total_rows_moved = result[0][0]

        progress = 100 * total_rows_moved / total_rows_to_move
        return progress

```

</details>


### Workflow and architecture 

#### Setup

When the Django server boots up - a setup step for async migrations happens, which does the following:

1. Imports all the migration definitions 
2. Populates a dependencies map and in-memory record of migration definitions
3. Creates a database record for each
4. Check if all async migrations necessary for this PostHog version have completed (else don't start)
5. Triggers a migration to run if `AUTO_START_SPECIAL_MIGRATIONS` is set and there's an uncompleted migration for this version

#### Running a migration

When a migration is triggered, the following happens:

1. A task is dispatched to Celery to run this migration in the background
2. The following basic checks are performed to ensure the migration can indeed run:
    1. We're not over the concurrent migrations limit
    2. The migration can be run with the current PostHog version
    3. The migration is not already running
    4. The service version requirements are met (e.g. X < ClickHouse version < Y)
    5. The migration's `is_required` check passes
    6. The migration's `healthcheck` passes
    7. The migration's dependency (if any) has been completed
3. We run through each of the operations in order
4. Every 30 minutes, a Celery task performs a healthcheck, to ensure that:
   1. The Celery process running the migration didn't crash
   2. The migration's healthcheck still passes 

> **Note:** Async migrations can also be run synchronously (i.e. not in Celery) using the async migrations CLI (WIP) or the Django shell.

#### Stopping a migration

A migration can be stopped by issuing a command via Celery's app control to terminate the process running the task. 

#### Rollbacks

If a migration is stopped for any reason (manual trigger or error), we will attempt to roll back the migration following the operations specified in reverse order from the last started operation. 

If a roll back succeeds, the migration status will be updated to reflect this.

#### Errors

If a migration errors, the error message is added to the migration's database record and we automatically trigger a rollback.

### Scope and limitations

The initial implementation of async migrations targets only **data migrations**, and assumes that the migration is used as a mechanism to help users move into a new default state. 

For example, when we [moved our ClickHouse `person_distinct_id` table to a `CollapsingMergeTree`](https://github.com/PostHog/posthog/pull/5563), we updated the SQL for creating the table, and wrote a migration to help users on the old schema migrate to the new schema. 

However, users that did a fresh deploy of PostHog _after_ this change already had the table with the new schema created by default.

This is the only type of operation that async migrations _currently_ support, to prevent a complex web of dependencies between migration types.

As such, those writing an async migration should write a sensible `is_required` function that determines if the migration should run or not. 

Thus, when a user deploys a new PostHog instance, we will first run **all** EE migrations in order, and then **all** of the async migrations in order. At this step, async migrations should be skipped if the codebase already contains updated default schemas. 

For instance, here's a good `is_required` function, which ensures the migration will only run if the table does not already exist.

```python
def is_required(self):
    result = sync_execute("SELECT count(*) FROM system.tables WHERE database='posthog' AND name='table_x_new'")
    return result[0][0] == 0 
```

Is required functions could also take into consideration table schemas, for example by checking the output of `SHOW CREATE TABLE` in ClickHouse.


### Codebase structure

The codebase is structured as follows:

#### posthog/models/special_migration.py

The Django ORM (Postgres) model for storing metadata about async migrations.

#### posthog/api/special_migrations.py

API for requesting data about async migrations as well as triggering starts, stops, and rollbacks.

#### posthog/tasks/special_migrations.py

Celery tasks for dealing with async migrations. These are:

1. `run_special_migration`: Explicitly triggered to run a migration
2. `check_special_migration_health`: Runs every 30 minutes to perform a healthcheck

#### posthog/special_migrations/definition.py

Classes to be used when writing an async migration, outlining the necessary components of a migration.

#### posthog/special_migrations/setup.py

Code that runs when the Django server boots to setup the necessary scaffolding for async migrations.

#### posthog/special_migrations/runner.py

Code related to running an async migration, from executing operations in sequence to attempting rollbacks.

#### posthog/special_migrations/utils.py

Code to support the runner in tasks that do not depend on the availability of the migration definition (module).

