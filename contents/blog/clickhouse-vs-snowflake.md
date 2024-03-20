---
date: 2023-02-15
title: 'In-depth: ClickHouse vs Snowflake'
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - mathew-pregasen
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-engineering-blog.png
featuredImageType: full
category: Engineering
tags:
  - Guides
  - ClickHouse
---

Two years ago, Snowflake versus ClickHouse was a straightforward comparison. Back then, Snowflake was fully managed, expensive, and broadly featured. ClickHouse was on-prem, open source, and speed-optimized. Two ends of a data warehouse spectrum splitting versatility (Snowflake) and speed (ClickHouse).

If I was to compare the databases to boats, ClickHouse is a jet ski – ultra-fast, but limited. Snowflake, meanwhile, is a shipyard – a slew of (expensive) tools spanning various functions.

![Clickhouse vs Snowflake.png](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/clickhouse-vs-snowflake/clickhouse-vs-snowflake.png)

But, as I said, that was *two years ago*. Today, Clickhouse has broken ground on features that compete with Snowflake’s managed solution. Likewise, Snowflake released features that are beginning to tackle ClickHouse’s speed. However, the overlap between ClickHouse and Snowflake remains nascent. Today, they are both still  *pretty* different, though the gaps are closing.

## Background

Snowflake and ClickHouse are at wildly different stages of growth.

Snowflake, founded in 2012, is a well-funded, publicly-traded decacorn with nearly 4,000 employees.

In contrast, ClickHouse is relatively new as an independent company. While the project originated internally at Yandex around 2012, ClickHouse only spun out independently in 2016 and received funding in 2021. 

Recently, ClickHouse raised a Series B to launch ClickHouse Cloud, its Snowflake-like service.

### What even is Snowflake?

Every engineer and their cousin has heard about Snowflake. Its massive IPO was one of the most successful public launches in technology history. The title of “Next Snowflake” translates to “Next Incredible Business” in venture-capital land. And with over $1B in revenue, the hype is deserved. However, there’s also a rather curious phenomenon – relatively speaking, few engineers appear to be versed in SnowSQL (Snowflake’s SQL dialect).

This contradiction between success and adoption is because Snowflake doesn’t behave like a typical database company. Unlike ClickHouse, [Apache Druid](/blog/clickhouse-vs-druid), TimescaleDB, QuestDB, and most other OLAP databases Snowflake is cloud-only. The codebase is neither open source nor locally installable. And sorry, startups, but there is no free tier.

To some developer evangelists, this business-first scheme is seen as heresy. But it's an excellent solution for Snowflake’s customers, each of whom pays an average of ~$170,000 a year. But why? Snowflake isn’t Louis Vuitton – people aren’t clamoring to buy its product merely because it's expensive.

Instead, Snowflake is a jack of all trades. Snowflake has complex, performant architecture, but its cloud-first, fully-managed design makes scaling seamless. Snowflake can handle complex, conditional-heavy queries, but its GUI enables non-technical people to take advantage of stored data.

Snowflake was built for businesses with complex, ever-changing needs with big budgets. It’s by no means the fastest horse, but it’s the only one that can prance, race, dance, and even sing.

### What about Clickhouse?

An obvious difference between Snowflake and ClickHouse is that ClickHouse is an open-source solution that can be deployed on any arbitrary server – e.g. Metal, Cloud, K8s, etc. ClickHouse doesn’t make money on any of those open source deployments, and this leads their team to be less sales-driven and more product-lead. 

The biggest difference is in Clickhouse’s strength. Let’s return to the analogy of ClickHouse being a jet ski. ClickHouse is fast. Incredibly, unbelievably fast. In particular, ClickHouse can return complex aggregations of terabyte-level data spanning millions of rows in milliseconds. In comparison, Snowflake takes dozens of seconds to query gigabyte-level data. 

ClickHouse accomplishes this by optimizing the database for speed at returning aggregates. ClickHouse isn’t designed to be utilized like a stock PostgreSQL or mySQL database; it’s particularly good at write-heavy, mutation-low, read-and-reduce-heavy operations. It's perfect solution for analytics providers, like [PostHog](https://posthog.com/).

However, normal, on-prem ClickHouse lacks a lot of features that Snowflake likely considers table-stakes: 

- A dedicated non-technical-friendly GUI for exploring and visualizing data
- The ability to modify entry data without massive performance burns
- The ability to scale architecture seamlessly with no migrations whatsoever

### Hosted ClickHouse

It is slightly silly to compare Snowflake and ClickHouse without mentioning ClickHouse Cloud, Altinity Cloud, Firebolt, or TinyBird. Each solution simplifies deploying and maintaining a ClickHouse instance. This helps address the final bullet in the previous section; they make scaling architecture seamless without complex data migrations.

ClickHouse Cloud – a new product launched in 2022 by ClickHouse Inc (ClickHouse’s primary contributor) – is exclusively available on AWS, with plans to support both Google Cloud and Azure like Snowflake. Meanwhile, Altinity Cloud – built by Altinity Inc (also contributors to ClickHouse) – has support for both AWS and Google Cloud. Altinity Cloud is also Kubernetes-compatible. 

The big difference between ClickHouse Cloud and Altinity Cloud is how they store data. ClickHouse Cloud is engineered like Google BigQuery. The data is stored in object storage. Altinity Cloud meanwhile runs ClickHouse similar to how an on-prem or local instance works; virtually anything you can do on a local instance is possible on Altinity Cloud. 

Separately, an advantage of ClickHouse Cloud is that it includes some exclusive features not available in the ClickHouse core distribution. One of these is a SQL GUI explorer which provides similar features to some of Snowflake’s basic data exploration. 

Overall, ClickHouse Cloud or Altinity Cloud are excellent options for companies that want a managed version of ClickHouse on the public cloud. Their emergence closes the gap between ClickHouse and Snowflake.

> 📖 **Further reading:** ClickHouse also competes with another huge, established product... Google's BigQuery. Read our [ClickHouse vs BigQuery comparison](/blog/clickhouse-vs-bigquery) to understand how the two solutions differ.

## Architecture overview

When Snowflake was released in 2012, there were two major paradigms – **Shared-Disk Architecture** and **Shared-Nothing Architecture**.

![Shared Disk Architecture.png](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/clickhouse-vs-snowflake/shared-disk-architecture.png)

Under Shared-Disk Architecture, CPU and memory were split into nodes, but each connected to a single storage unit – usually a blob store like S3 or GCS these days. The benefit of Shared-Disk Architecture is that you can scale Disk and Compute separately. This is huge when you are thinking about a data warehouse, where your workloads may be very spiky and periodic but your data has to be stored all the time. The cost here is that typically reading from disk is a bit slower, at least in terms of latency, when compared to reading from local storage.

![Shared Nothing Architecture.png](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/clickhouse-vs-snowflake/shared-nothing-architecture.png)

Meanwhile, CPU, memory, and storage are encapsulated under Shared-Nothing Architecture in separate, parallel instances, only syncing via background jobs. The benefit of Shared-Nothing Architecture is speed. There is a risk that storage could go out of sync since usually replication here is eventually consistent, but that was the case with blob stores up until recently too. The easiest way to think about this is consider Postgres. When you install Postgres everything is boxed up nice and neat on a single instance. At smaller scale this is a much simpler setup and enables you to run the architecture pretty much anywhere.

Part of Snowflake’s initial appeal is its hybrid solution that combines the advantages of Shared-Disk Architecture and Shared-Nothing Architecture. Snowflake achieved this by adding another layer of storage to each node that stored partial data, similar to the cache but more complete.

![Snowflake Architecture.png](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/clickhouse-vs-snowflake/snowflake-architecture.png)

More importantly, Snowflake’s middle layer – virtual warehouses – can be scaled easily, coming in T-shirt sizes (S/M/L/XL). Snowflake makes it easy to add parallel nodes or re-size existing nodes, made possible by Snowflake's virtualized architecture.

ClickHouse utilizes Shared-Nothing Architecture by default. But ClickHouse also [supports Shared-Disk Architecture](https://clickhouse.com/docs/en/faq/operations/deploy-separate-storage-and-compute/). This is useful if you want to scale disk and compute separately, so you can can have the best of both worlds depending on your use case and tune it to fit. You can do this by leveraging Zero Copy Replication and [S3/GCS Backed MergeTrees](https://clickhouse.com/docs/en/guides/sre/s3-multi-region), or even HDFS.



### Differences in query optimization & speed

ClickHouse has three significant optimizations that make querying aggregate computations efficient: (i) materialized views, (ii) specialized engines, and (iii) vectorized query execution.

- **Materialized views:** Materialized views are independent tables derived from other table data generated at some specific point in time. Unlike databases like Postgres, ClickHouse's materialized views are constantly re-generated in the background as new data is inserted. While materialized views are delayed because most of ClickHouse's use cases involve aggregate, analytical data, the delay doesn’t pose a problem.

- **Specialized engines:** Materialized views are aided by ClickHouse's specialized engines, which can do anything from storing aggregates more efficiently on disk (AggregatingMergeTree) to allowing you to make HTTP calls to fetch data. This is one of the useful features we leverage extensively at PostHog – watch our [video on them](https://youtu.be/6IwLWEx_mg4?t=804) if you're curious. 

**Vectorized query execution:** Vectorized execution organizes data in a way that makes it possible to use SIMD (Single Instruction Multiple Data) to process multiple values at once. This is a huge performance boost for aggregate computations – see [ClickHouse's documentation] and this [CMU video](https://www.youtube.com/watch?v=FrspnYbFSxQ) for more on this.

Snowflake has some of these features, but the main thing that Snowflake has bet on is the proliferation of JSON and unstructured data:

- Snowflake's [Variant type](https://docs.snowflake.com/en/sql-reference/data-types-semistructured) was built into the service from the beginning and makes querying unstructured data nearly effortless. It decomposes JSON objects into a table of key-value pairs that better leverages the columnar aspect of Snowflake's architecture. This is something ClickHouse is actively working on, but for now is a competitive advantage of Snowflake.

- While Snowflake has support for materialized views, it charges additionally for it since it needs to allocate serious CPU resources to recompute the views. Those re-computations, under the hood, are more resource intensive for Snowflake because it lacks the same partial-update techniques ClickHouse uses to expedite re-calculations.

- **Virtual warehouses instead of specialized engines:** Unlike ClickHouse's specialized engines, which utilize hardware to optimize query execution, Snowflake segments its database into virtual warehouses sized from small to large. These warehouses can have larger or lesser compute to handle complex to easy queries and isolate workloads. However, while clever and organized, this approach is computationally and financially expensive when taken full advantage of.

- **Search optimization service:** Introduced in 2021, Snowflake offers a search optimization service at its higher enterprise tiers. Because Snowflake is a closed-source product, not much is known about how the search optimization service works, but it can offer enormous performance gains (4x-100x) relative to un-optimized search for some types of queries. Unfortunately, while Snowflake likely uses similar mechanisms to ClickHouse, direct side-by-side analysis isn’t possible due to Snowflake’s closed-search tier. By extension, the search optimization service’s performance boost is unpredictable.

Overall, ClickHouse's close-metal optimizations enable it to return aggregate values over a thousand times faster (and cheaper) than Snowflake. However, Snowflake’s approach is more user-friendly as it requires less SQL-level optimization to take advantage of these organizational features.

### Who uses Snowflake and ClickHouse?

Part of Snowflake’s value prop is the broad appeal to both technical and non-technical users. Snowflake’s marketplace makes connecting business intelligence tools with warehouse data easy, which appeals to teams wanting explore their data. ClickHouse Cloud has a growing competitive offering, but the current integrations are less numerous.

ClickHouse and Snowflake are both used for analytics, but ClickHouse is more focused on analytical queries. 

ClickHouse is a great fit for PostHog because we are an analytics platform – we need to be able to answer questions like “what is the average time to convert for users who saw a certain feature?” in *real time* and *at speed of click*.

Traditionally, Snowflake can be considered more of a standard data warehouse or data lake where you can store all your data and then query it. This is a great fit for companies that want to store all their data in one place and then query it.

**Snowflake customers** include AT&T, Jetblue, Anthem, and Capital One. Snowflake customers tend to be enterprise-level and have to deal with a lot of data. 

**ClickHouse’s customers** include Github, YouTube, Twitter, and Slack. We, at PostHog, also [use ClickHouse](/docs/how-posthog-works/clickhouse). It dramatically improved our analytics data warehouse from our previous Postgres setup and allows us to deliver billion-event scale insights quickly. 

## Conclusion

While ClickHouse didn't start life as a business-first data warehouse like Snowflake, the lines between the two are increasingly blurred. While it has some work to do, ClickHouse is quickly developing features that make it look more and more like a data warehouse.

ClickHouse is a fantastic solution for teams looking to built data intensive applications, such as analytics or a data-backed CRM. If you grow that business to the point where you need a data warehouse, ClickHouse will grow with you. However, if you are looking for a product that has deep integrations with a long list of tools and the majority of your data is schemaless JSON, Snowflake may be for you.


### Further reading

Consider the following resources if you want to learn more about ClickHouse and Snowflake’s differences.

- [ClickHouse Documentation](https://clickhouse.com/docs/en/home/)

- [Snowflake Documentation](https://docs.snowflake.com/en/)

- [Clickbench](https://benchmark.clickhouse.com/), a benchmark test comparing ClickHouse, Snowflake, and other databases

- [Snowflake Whitepaper](https://event.cwi.nl/lsde/papers/p215-dageville-snowflake.pdf)

- [Why we chose ClickHouse](https://youtu.be/6IwLWEx_mg4)

- [Andy Pavlo - Vectorized Query Execution](https://www.youtube.com/watch?v=FrspnYbFSxQ) <--- this is a great video that explains vectorized query execution and you should check out all of Andy's videos

- [ClickHouse Separate Storage & Compute](https://clickhouse.com/docs/en/faq/operations/deploy-separate-storage-and-compute/)

- [Velotio](https://www.velotio.com/engineering-blog/clickhouse-the-newest-data-store-in-your-big-data-arsenal)’s Snowflake versus ClickHouse article. Note, this article was published before the ClickHouse Cloud announcement, which impacts the comparison with Snowflake.
