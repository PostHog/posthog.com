---
title: We tried to fix a memory problem and broke every warehouse sync instead
date: 2026-10-28
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
    - tom-owers
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-engineering-blog.png
featuredImageType: full
category: Engineering
tags:
    - Engineering
    - Open source
seo:
    metaTitle: 'We tried to fix a memory problem and broke every warehouse sync instead'
    metaDescription: 'How a deadlock in DataFusion took down our data warehouse syncs, and why we fixed it by writing our own Delta Lake upsert in Rust.'
---

One Wednesday in July, every data warehouse sync in both our US and EU regions stopped finishing. Nothing errored and nothing crashed, the syncs just ran forever with the CPU flat at zero until the worker rotated and killed them. Then the next run picked up a slightly bigger backlog and did the same thing again.

We had a deadlock inside the library that writes our warehouse tables, and we'd caused it ourselves by trying to stop that same library from running out of memory.

This is how we fixed it, and why the fix ended up being "write our own upsert in Rust".

## How our warehouse sync used to work

When you connect a source to the [PostHog data warehouse](/docs/data-warehouse), we store rows as [Delta Lake](https://delta.io/) tables in S3. Delta Lake is Parquet files plus a transaction log: the data lives in Parquet, and a `_delta_log` folder of JSON commits says which files are currently live.

Most syncs are incremental. Every few minutes or hours, we fetch the rows that changed since last time and upsert them by primary key. Rows that already exist get replaced, and new rows get inserted.

We did this with [delta-rs](https://github.com/delta-io/delta-rs), through its Python bindings. delta-rs is great, and it still does most of the work for us today. Its upsert is a SQL `MERGE`:

```python
(
    table.merge(
        source=batch,
        predicate="source.id = target.id",
        source_alias="source",
        target_alias="target",
    )
    .when_matched_update_all()
    .when_not_matched_insert_all()
    .execute()
)
```

Under the hood, delta-rs hands that to [DataFusion](https://datafusion.apache.org/), which plans it as a full outer hash join between the incoming batch and the existing table.

That's a perfectly reasonable way to run a general `MERGE`. It turned out to cause us problems:

### Problem one: memory grows with the table, not the batch

A hash join has to hold data in memory, and for our workload the expensive side was the existing table. A sync might bring in 20,000 changed rows and still need gigabytes of memory, because the join scanned and buffered a large part of the table to find those 20,000 matches.

So the memory cost of a sync had nothing to do with how much data changed, it tracked how big the table already was. Our biggest customers' tables kept growing, and they took down warehouse worker pods with out-of-memory kills.

They didn't suffer alone, either. Each worker pod runs many sync activities at once, so one heavy merge that killed a pod also killed every other sync on it.

### Problem two: when we capped the memory, it deadlocked

DataFusion supports a bounded memory pool that spills to disk. In theory, capping the memory and letting the join spill when it hits the cap should fix problem one.

So we turned it on, and that's what caused the July incident.

With a bounded `FairSpillPool`, here's what happened inside the merge:

1. DataFusion parallelizes the join by inserting a `RepartitionExec`, which fans rows out to one channel per CPU.
2. One of the downstream operators hits the memory cap and stalls while it tries to spill.
3. While it's stalled, it stops reading from its repartition channel.
4. That channel fills up and holds the repartition's backpressure gate shut, so every producer parks.
5. The hash join's build side never completes, because the producers are parked.
6. Nothing makes progress, and nothing errors.

Every thread waits on another thread forever. The same merge with an unbounded pool finishes in about 8 seconds.

Our first instinct was to tune the spill threshold. But a lower threshold makes the merge spill sooner, so it deadlocks more often, not less. It isn't a disk speed problem either. In one case the merge had written about 557 MB of spill and then froze, well under every cap.

We rolled the spill config back to stop the bleeding and filed the deadlock upstream. There are related open issues in DataFusion, and the one proposed fix we found was closed without merging.

That left us choosing between unbounded memory that killed pods and bounded memory that deadlocked.

## Our upsert has a very specific shape

A general-purpose `MERGE` has to handle any predicate, any join condition, and any number of clauses. Our upsert only ever looks like this:

- The source (the incoming batch) is small: thousands to millions of rows.
- The target (the existing table) can be huge.
- Matching is always equality on a primary key.
- The table is usually partitioned, and a batch only touches a few partitions.
- The rule never changes: replace matching rows, insert the rest.

If you know all of that, you don't need a join at all. You can do this instead:

1. Build a hash set of primary keys from the small source batch.
2. Stream the existing files in each affected partition, one row group at a time.
3. Drop any row whose key is in the hash set, and write out everything else.
4. Write the source rows after the survivors.
5. Commit every partition's new and removed files in one atomic Delta commit.

Memory now depends on the size of the batch plus a fixed number of row groups in flight. It never depends on the size of the table.

We called it deltalite.

## What deltalite is (and isn't)

deltalite is a Rust crate with a thin Python binding, built with [pyo3](https://pyo3.rs/) and [maturin](https://www.maturin.rs/). It is not a new Delta Lake implementation. It links the `deltalake` Rust crate, so delta-rs still owns the transaction log, checkpoints, file statistics, and conditional-put commits to S3. deltalite only replaces the merge.

We also build it without delta-rs's `datafusion` feature, so there are zero DataFusion crates in its dependency tree. We didn't fix the deadlock in deltalite, it can no longer happen because the code that deadlocked isn't in the binary.

Not everything worked the way we expected it to:

### Random UUID keys made it write 32x more data

Our first version picked which files to rewrite by looking at the min/max statistics of the primary key in each file. That works when keys are sequential, but with random UUIDs, every file's min/max covers almost the whole key space, so nothing can be skipped.

That's a real problem for incremental syncs. The rows a sync touches tend to be recent, so they all live in the newest file, but their UUIDs are scattered. delta-rs `MERGE` finds matches by running the join, so it rewrote exactly 1 file, deltalite rewrote 32. That's 1,831 MB of bytes written instead of 57 MB.

The fix was a new pruning mode called probe. After the stats check, deltalite reads only the primary key column of each remaining file and checks it against the source hash set. A file with no matches is carried over untouched. That brought it back to rewriting 1 file, in 1.0 s instead of 9.4 s, and it became the default.

### Fragmented partitions were 2x slower

On a partition split into 100 small files, deltalite used half the memory of `MERGE` but took twice as long. It parallelized across partitions but read files one at a time inside a partition, while DataFusion scanned in parallel.

We added concurrent file readers feeding one writer per partition, with a shared byte budget for decoded data. That took deltalite from 1.55x slower to 1.15–1.3x faster.

### Our memory model was wrong

We assumed peak memory was the number of parallel partitions multiplied by the cost per partition. Measured, it was a fixed base of around 700–900 MB plus 250–300 MB per extra worker, so eight workers cost 2.6x the memory, not 8x. So we halved the default partition workers and cut peak RSS by 31% at no cost to speed.

## Rolling it out without touching anyone's data

The scariest part of replacing a write path is the potential to introduce bugs corrupting customer tables and not knowing it. So we rolled out in phases:

### Phase 0: ship a Rust wheel inside a Python monolith

deltalite builds as a single abi3 wheel per platform, published to PyPI, and our app image installs it with `uv sync` like any other package. There's no Rust toolchain in the image.

### Phase 1: shadow writes on production data

Next, we ran deltalite against customer data without letting it write a real table.

After the real `MERGE` committed, a shadow step time-traveled the table back to its version before the merge, copied just the affected partitions to a throwaway location, ran the same batch through deltalite, and compared the two results with a DuckDB `EXCEPT ALL`. Then it deleted the copy. The diagnostics only ever recorded row counts and primary keys, never row contents.

The shadow only ever found one difference, and it was a bug in the old engine, not in deltalite.

To decide whether an incoming row already existed, `MERGE` compared keys with `=`. In SQL, `NULL = NULL` isn't true, so any row whose key contained a `NULL` never matched its existing copy. Instead of being updated, it was inserted again on every sync. We switched the comparison to `IS NOT DISTINCT FROM`, which treats two `NULL`s as equal, and after that both engines wrote exactly the same data.

### Phase 2: real writes, with a safety net

Then deltalite started doing real writes behind a [feature flag](/feature-flags). We started with our own team's tables and ramped up from there.

The rule was fallback by construction: if deltalite failed for any reason before it committed (an error, a commit conflict, an unsupported table), the sync ran the old `MERGE` as before.

## Did it work?

Here's the working set of our warehouse worker pods before and after deltalite took over the writes in early August:

| Worker memory | Before  | After  |
| ------------- | ------- | ------ |
| Median pod    | 3.0 GB  | 3.0 GB |
| p99 pod       | 14.6 GB | 7.8 GB |
| Largest pod   | 17.5 GB | 9.6 GB |

The median pod didn't change, because most syncs are small and were never the problem. Since deltalite took over, our p99 and largest worker pods use about half the memory they used to.

## Making it fast

Making one upsert use less memory is only half the job. Each warehouse worker runs lots of syncs at once, all sharing the same memory, and a pod doesn't care that every upsert is small if twenty of them arrive together.

So we added a memory governor. It splits the pod's memory into a fixed slice for each upsert that can run at once, then tunes each upsert's concurrency so it fits in its slice. If every upsert stays inside its slice, the pod can't run out of memory.

Once memory was under control, we went after fixed costs. Batches for one table run strictly one after another, and in production the average deltalite write took 3.8 seconds while half of all writes moved fewer than 30 rows. Anything we pay once per batch, we pay again for every batch in a backlog. We cut those costs by:

- **Reading each file's footer once.** The probe now passes the parsed Parquet footer to the rewrite, and every open asks for a 64 KiB footer hint so the footer arrives in one request. After a commit, we reuse the snapshot delta-rs already built for that commit instead of reading the log again.
- **Probing more files at once.** We now probe 32 files at a time instead of 8 without raising decoded memory, because probe batches share the same byte budget as the rewrite.
- **Indexing files by partition.** Planning used to scan every live file once per touched partition. Now we index the live files once.

## Lessons we learned

**General-purpose engines are amazing until your workload has a shape.** DataFusion is a great query engine and delta-rs is a great library, and we still use both every day. But a general `MERGE` has to plan for any join, and ours is always "small batch, big table, equality on a key."

**Replace the narrowest thing you can.** We didn't write a Delta Lake implementation, deltalite started by replacing the operations that were hurting us: the upsert first, then compaction once we saw the same memory problem there.

**Differential testing beats clever unit tests.** The most valuable test we wrote runs both engines on the same input and checks they agree. The shadow phase did the same on production data, and that's how we found a bug that had been duplicating rows in the old engine.

**Benchmark where you expect to lose.** Our benchmarks' best findings were the cases where deltalite was worse: 32x more writes on random UUIDs and 2x slower on fragmented tables. We were able to fix both before reaching production.

**Keep the escape hatch until the data says you don't need it.** The `MERGE` fallback cost us almost nothing to keep, and it meant every rollout step could only change which engine wrote the data, never whether a sync worked.

## Try it yourself

deltalite is open source, like the rest of PostHog. The code lives in [`rust/deltalite`](https://github.com/PostHog/posthog/tree/master/rust/deltalite) in the PostHog repo, including the differential parity suite, so you can see exactly how we check it against delta-rs.

If you'd rather not run any of this yourself, [connect a source to the PostHog data warehouse](/docs/data-warehouse). Every incremental sync you run is written by deltalite.
