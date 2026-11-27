---
title: "Writing a purpose-built upsert for warehouse syncs (the old one broke)"
date: 2026-11-20
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
    - tom-owers
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-engineering-blog.png
featuredImageType: full
ogImage: generated
category: Engineering
tags:
    - Engineering
    - Data warehouse
    - Open source
seo:
    metaTitle: "Writing a purpose-built upsert for warehouse syncs (the old one broke)"
    metaDescription: "How a deadlock in DataFusion took down our data warehouse syncs, and why we fixed it by writing our own Delta Lake upsert in Rust."
---

Our [data warehouse](/warehouse) [incrementally syncs](/docs/data-pipelines/sources#incremental) a lot of data. 4.6 billion rows a day to be accurate.

We did this by loading a big part of the existing table into memory and then streaming through the incoming table to check whether we should update or add a row.

As you might guess, as the existing table grew, so did the amount of memory needed to hold it, even if we were only changing 20,000 rows. Memory costs had nothing to do with how much data was changed. Worker pods were running out of memory for one sync and that killed other syncs on the same pod.

To fix this, we built our own version of `MERGE`, deltalite. Here's its story.

## The fix for the memory problem was broken

The tools we were using for incremental syncs, [`delta-rs`](https://github.com/delta-io/delta-rs) and [DataFusion](https://datafusion.apache.org/), had a solution to this memory problem: a bounded memory pool that spills to disk. Basically, we could say a job can use 4 GB and if it goes over, it moves some of its data out of RAM to save that memory and come back to it later.

But when we turned it on, the problem got worse:

1. DataFusion would parallelize the join, fanning work across multiple workers with their own CPUs.
2. One of the workers would hit a memory cap and stall while it tries to spill to disk.
3. That worker's queue fills up which triggers DataFusion to stop sending work to _any_ worker. Other workers can't continue their work.
4. This causes the entire in-memory lookup table to never finish loading and the whole job gets stuck because no worker can finish their work.

We tried tuning the spill threshold, but this just meant we ran into the deadlock more often. There was no fix in sight either, only an [open issue](https://github.com/delta-io/delta-rs/issues/4614) and [closed PR](https://github.com/apache/datafusion/pull/22092).

## We can write our own MERGE

With the "fix" being broken, we were forced to handle the situation ourselves. We realized that our use case for `MERGE` was much more limited than most. Our upserts always look like this:

- Small incoming batch
- Huge existing table
- Matching is always equality on a primary key
- The table is usually partitioned and a batch only touches a few partitions

We could write code that was optimized for these constraints. Specifically, we didn't need to line up every incoming row against the existing table to work out whether to update or insert. We could instead:

1. Build a hash set of primary keys from the incoming batch.
2. Stream the existing files in affected partitions, one row group at a time.
3. Drop any row whose key is in the hash set. Write out everything else.
4. Write the rows from the incoming batch.
5. Commit every partition's new and removed files in one Delta commit.

With this, memory would depend on the size of the incoming batch plus a fixed number of row groups, not the size of the existing table.

We called this `deltalite`.

## deltalite is a purpose-built upsert

Building deltalite started with a spike to prove a purpose-built upsert could actually replace a `MERGE` for us. We built:

- A rough version of the hash-set-and-stream upsert.
- A fake data generator with UUID-shaped ID, ints, timestamps, and a big JSON-ish string. About 5 KB per row.
- Benchmarks and tests to ensure it produces the same rows as the production `MERGE`.

Across multiple spill size caps, deltalite worked while `delta-rs` errored:

| max_spill_size | delta-rs               | delta-rs peak memory | deltalite | deltalite peak memory |
| -------------- | ---------------------- | -------------------- | --------- | --------------------- |
| 1 MiB          | error                  | 1,511 MB             | OK, 8.1 s | 947 MB                |
| 16 MiB         | error                  | 2,044 MB             | OK, 7.3 s | 1,132 MB              |
| 64 MiB         | error                  | 2,301 MB             | OK, 8.2 s | 1,090 MB              |
| 256 MiB        | hang (killed at 120 s) | 2,780 MB             | OK, 7.9 s | 961 MB                |
| unbounded      | OK, 10.4 s             | 2,902 MB             | OK, 9.2 s | 934 MB                |

Keeping memory usage flat as the table grew also mattered, so we tested this too with fixed batches and larger partitions:

| Partition rows | delta-rs Δ RSS | deltalite Δ RSS |
| -------------- | -------------- | --------------- |
| 62,500         | 959 MB         | 836 MB          |
| 125,000        | 1,317 MB       | 689 MB          |
| 250,000        | 1,900 MB       | 601 MB          |
| 500,000        | 3,217 MB       | 804 MB          |

deltalite wasn't perfect from the start though:

- With random UUID keys, deltalite couldn't tell which files to skip, so it rewrote them all instead of just the one it needed.
- On partitions split into many files, deltalite was 2x slower because it didn't read files in parallel.
- Memory didn't scale the way we assumed, so we cut peak memory by running fewer workers.

This was our spike paying off in two ways: showing that a purpose-built upsert would work and finding areas where it broke.

## Making deltalite correct, fast, and compact for production

All these memory savings didn't matter if the data wasn't correct, so when building for production, this was the center of our test suite. We wanted to make sure every test scenario ran the same sequence of batches through both our production `MERGE` and deltalite into two fresh tables and then assert the results are identical.

Our test suite covered a lot of nasty stuff:

- NULLs in primary keys
- Composite keys with one NULL component
- Keys that move between partitions
- Schema evolution partway through a sequence
- Misaligned decimal buffers
- Unicode and quote characters in partition values
- A 123-column table

The parity work turned up a few more places where the existing `MERGE` was the one behaving badly:

- Single quote partitions broke the production path. A value like `o'brien` produced an unterminated string literal. deltalite never builds SQL so doesn't have this problem.
- Silently double-insert keys. If a batch contains the same new key twice, `MERGE` happily writes both rows. deltalite rejects the batch.
- A partial batch could be visible. `MERGE` committed per partition so a crash midway through left some updated. deltalite using one Delta commit made partial updates impossible.

Once memory and accuracy were sorted, we went for speed. In production, the average deltalite write took 3.8 seconds and half of all writes were fewer than 30 rows. That meant a lot of setup cost to remove like:

- Only reading each file's footer once which cut S3 requests in half.
- Checking 32 files for matching IDs in parallel instead of 8.
- Building a lookup of files in each partition once, rather than searching every file for every partition. One table with ~13,000 hourly partitions touched 1,500 of them on each sync and spent about 63 seconds just planning. Fixing this brought planning time down dramatically.

Lastly, we went for compaction as lots of small incremental writes means lots of small files, so we compact tables regularly. deltalite has its own partition-aware compaction. It plans entirely from Delta log without touching S3, caps decoded sizes, and handles its own commit conflicts.

For a compaction of 4 partitions with 60 files, 4 bins in parallel, deltalite uses much less memory and much fewer S3 GETs:

| Engine    | Peak Δ Memory | Wall   | S3 GETs |
| --------- | ------------- | ------ | ------- |
| delta-rs  | 738 MB        | 2.81 s | 998     |
| deltalite | 476 MB        | 2.41 s | 483     |

## What we learned

Here's what we'd tell you if you're thinking about doing this:

- **General-purpose engines are amazing until your workflow has a shape.** DataFusion is a great query engine and delta-rs is a great library, but our niche workflow shape needed a specialized solution that ended up being a few thousand lines of Rust.
- **Replace the narrowest thing you can.** We didn't write a Delta Lake implementation. `delta-rs` is still there. deltalite only replaces the upsert and compaction pain points.
- **Differential tests beat clever unit tests.** We did this both in the accuracy testing spike and production data. We found bugs with the old `MERGE` this way too.
- **Keep the escape hatch.** We kept `MERGE` as a fallback because it cost us nothing. It meant the rollout could always succeed basically.

## Go check out deltalite

deltalite is open source. The code at [rust/deltalite](https://github.com/PostHog/posthog/tree/master/rust/deltalite) includes the differential testing suite, so you can see exactly how we compared it against `delta-rs`. It's also on [PyPI](https://pypi.org/project/deltalite/), so you can try it with

```bash
pip install deltalite
```

If you'd like all of the benefits of deltalite with none of the setup, [connect a source](/docs/data-pipelines/sources) to the [PostHog data warehouse](/docs/data-warehouse). Every incremental sync is written by it now.

And if you think this kind of problem is fun, [we're hiring](/careers).
