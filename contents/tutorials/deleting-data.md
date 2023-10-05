---
title: Deleting bulk data
sidebar: Docs
showTitle: true
author: ['yakko-majuri']
date: 2021-07-14
featuredImage: ../images/tutorials/banners/deleting-data.png
tags: ['configuration', 'data management', 'product os']
---

> <strong>Important:</strong> Bulk data deletion is done at your own risk. We do not yet provide a standard way to delete data in bulk, so you must be extremely careful when performing such an operation. We do not take responsibility for any loss of data as a result of this process.

To delete bulk data from your database (e.g. all events), the current suggested way is to directly interact with the PostgreSQL or ClickHouse instance and use SQL queries to delete the desired data.

* [PostgreSQL Docs](https://www.postgresql.org/docs/8.2/sql-delete.html)
* [ClickHouse Docs](https://clickhouse.tech/docs/en/sql-reference/statements/alter/delete/)

Alternatively, one of our [contributors](https://github.com/FUSAKLA/) has suggested the following [Python script](https://gist.github.com/FUSAKLA/3f322d478839cabef7ace64a4be9177a) for deleting data:

```python

#!/usr/bin/python

import logging
import os
from datetime import datetime, timedelta

import django

django.setup()

from posthog.models import Event, ElementGroup
from django.utils import timezone

max_age_days = int(os.getenv("POSTHOG_CLEANUP_OLDER_THAN_DAYS", 30))
step_size = int(os.getenv("POSTHOG_CLEANUP_BATCH_SIZE", 1000))
dry_run = True if os.getenv("POSTHOG_CLEANUP_DRY_RUN", "False").lower() in ["true", "yes", "1"] else False
logging.basicConfig(level=logging.INFO, format='%(asctime)s %(message)s', datefmt='%m/%d/%Y %H:%M:%S ')


def get_events_older_than(older_than):
    return Event.objects.filter(timestamp__lt=timezone.make_aware(datetime.now() - timedelta(older_than))).values_list(
        'pk', flat=True)


def get_non_referenced_event_groups():
    event_group_hashes = Event.objects.all().values_list('elements_hash', flat=True)
    return ElementGroup.objects.exclude(hash__in=list(event_group_hashes))


def delete_items(item_type, items):
    if dry_run:
        logging.info("Skipping delete of items in dry run mode...")
        return
    item_type.objects.filter(id__in=list(items)).delete()


def delete_items_batched(item_type, items, logging_indent=6 * " "):
    number_of_items = len(items)
    logging.info("%sDeleting %d items of type %s using batches of %d size:", logging_indent, number_of_items,
                 item_type.__name__, step_size)
    last_id = 0
    while last_id + step_size <= number_of_items:
        delete_items(item_type, items[last_id:last_id + step_size])
        logging.info("%s   %d%%", logging_indent, int(last_id / number_of_items * 100))
        last_id += step_size
    delete_items(item_type, items[last_id:])
    logging.info("%s   100%%", logging_indent)


if __name__ == "__main__":
    logging.info("Running cleanup of PostHog...")
    start_time = datetime.now()
    logging.info(" - Deleting all events older than %d days:", max_age_days)
    delete_items_batched(Event, get_events_older_than(max_age_days))
    logging.info(" - Deleting all elements and element groups not referenced by any event anymore:")
    delete_items_batched(ElementGroup, get_non_referenced_event_groups())
    logging.info("Cleanup finished, total duration: %s", datetime.now() - start_time)
```
