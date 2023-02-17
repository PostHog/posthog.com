---
title: Detached Materialized Views
sidebar: Docs
showTitle: true
---

If you ever `DETACH` a materialized view, it's important to keep in mind that the view now exists in a "limbo" state that can be confusing and cause issues.

Detached views don't show up on `system.tables`, but you can assert that a view exists by running `SHOW CREATE TABLE <detached_mv>`. 

In addition, detached views (except if `DETACH` was executed with `PERMANENTLY`) will be reattached on server restarts! 

As an example of how this has been problematic for us in the past, we once detached views to handle ingestion problems, and then on rebooting the nodes we got confused as to why ingestion hadn't stopped!