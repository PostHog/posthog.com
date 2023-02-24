---
date: 2023-02-15
title: 'In-depth: ClickHouse vs Snowflake'
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - mathew-pregasen
featuredImage: ../images/blog/posthog-engineering-blog.png
featuredImageType: full
category: Engineering
tags:
  - Guides
  - ClickHouse
---

Two years ago, Snowflake versus ClickHouse was a straightforward comparison. Back then, Snowflake was fully managed, expensive, and broadly featured. ClickHouse was on-prem, open source, and speed-optimized. Two ends of a data warehouse spectrum splitting versatility (Snowflake) and speed (ClickHouse).

If I was to compare the databases to boats, ClickHouse is a jet ski – ultra-fast, but limited. Snowflake, meanwhile, is a shipyard – a slew of (expensive) tools spanning various functions.

![Clickhouse vs Snowflake.png](../images/blog/clickhouse-vs-snowflake/clickhouse-vs-snowflake.png)

But, as I said, that was *two years ago*. Today, Clickhouse has broken ground on features that compete with Snowflake’s managed solution. Likewise, Snowflake released features that are beginning to tackle ClickHouse’s speed. However, the overlap between ClickHouse and Snowflake remains nascent. Today, they are both still  *pretty* different, but that gap is closing fast.

## Background

Snowflake and ClickHouse are at wildly different stages of growth.

Snowflake, founded in 2012, is a well-funded, publicly-traded decacorn with nearly 4,000 employees.

In contrast, ClickHouse is relatively new as an independent company. While the project originated internally at Yandex around 2012, ClickHouse only spun out independently in 2016 and received funding in 2021. Since then it has been growing rapidly. 

Recently, ClickHouse raised a Series B to launch ClickHouse Cloud, its Snowflake-like service.

### What even is Snowflake?

Every engineer and their cousin has heard about Snowflake. Its massive IPO was one of the most successful public launchs in technology history. The title of “Next Snowflake” translates to “Next Incredible Business” in venture-capital land. And with over $1B in revenue, the hype somewhat deserved. However, there’s also a rather curious phenomenon – relatively speaking, few engineers appear to be versed in SnowSQL (Snowflake’s SQL dialect).

This contradiction between success and adoption is because Snowflake doesn’t behave like a typical database company. Snowflake is closed-source and cloud-only, unlike solutions like ClickHouse, [Apache Druid](/blog/clickhouse-vs-druid), TimescaleDB, QuestDB, and most other OLAP databases. And sorry, startups, but there is no free tier. Go directly to a paid plan, do not pass go, do not collect $200.

To some developer evangelists, this business-first scheme is seen as heresy. But it's an excellent solution for Snowflake’s customers, each of whom pays an average of ~$170,000 a year. But why? Snowflake isn’t Louis Vuitton – people aren’t clamoring to buy its product merely because it's expensive.

Instead, Snowflake is a jack of all trades. Snowflake has complex, performant architecture, but its cloud-first, fully-managed design makes scaling seamless. Snowflake can handle complex, conditional-heavy queries, but its GUI enables non-technical people to take advantage of stored data. 

Probably one of the most appealing reasons why companies use Snowflake is that it can handle terabytes of data, but it’s also designed to be used by small businesses. From day one they have [built the system](https://event.cwi.nl/lsde/papers/p215-dageville-snowflake.pdf) to be able to scale from a single user to a global enterprise with thousands of users. This is entirely because Snowflake was designed to have separate compute and storage layers.

Snowflake was built for businesses with complex, ever-changing needs with big budgets. It’s by no means the fastest horse, but it is a very reasonable choice for a lot of companies that are just looking to get more out of their data.

### What about Clickhouse?

An obvious difference between Snowflake and ClickHouse is that ClickHouse is an open source solution that can be deployed on any environment: Metal, Cloud, K8s, you name it. ClickHouse doesn’t make money on any of those open source deployments, and this leads their team to be less sales-driven and more product lead (something we are huge fans of!). 

The biggest difference is in Clickhouse’s strength. Let’s return to the analogy of ClickHouse being a jet ski. ClickHouse is fast. Incredibly, unbelievably fast. In particular, ClickHouse can return complex aggregations of terabyte-level data spanning millions of rows in milliseconds. In comparison, Snowflake takes dozens of seconds to query petabyte amounts data. 

ClickHouse accomplishes this by optimizing the database for reading large swaths of data. ClickHouse isn’t designed to be utilized like a stock PostgreSQL or mySQL database; it’s particularly good at write-heavy, mutation-low, read-and-reduce-heavy operations. It's perfect solution for analytics providers, like [PostHog](https://posthog.com/).

### Hosted ClickHouse

It is slightly silly to compare Snowflake and ClickHouse without mentioning ClickHouse Cloud, Altinity Cloud, Firebolt, or TinyBird. Each solution simplifies deploying and maintaining a ClickHouse instance. This helps address the final bullet in the previous section; they make scaling architecture seamless without complex data migrations.

ClickHouse Cloud – a new product launched in 2022 by ClickHouse Inc (ClickHouse’s primary contributor) – is exclusively available on AWS, with plans to support both Google Cloud and Azure like Snowflake. ClickHouse Cloud is engineered like Google BigQuery and Snowflake. The data is stored in object storage and you can scale up compute nodes on demand. This makes capacity planing and scaling a breeze. You never have to worry about resharding or worrying about capacity planning for the number of disks in your cluster (*swoon*). ClickHouse also purchased Arctype to provide a top tier GUI for exploring and visualizing data.

Altinity Cloud – built by Altinity Inc (also contributors to ClickHouse) – has support for both AWS and Google Cloud. Altinity Cloud is also Kubernetes-compatible.  Altinity Cloud runs ClickHouse similar to how an on-prem or local instance works; virtually anything you can do on a local instance is possible on Altinity Cloud. 

There are other, somewhat related, hosted versions of ClickHouse. We'll probably write about them in a separate blog post, but if you are curious and want to read up about them now you should check out [Firebolt](https://altinity.com/blog/database-on-fire-reflections-on-embedding-clickhouse-in-firebolt#:~:text=Firebolt%20uses%20a%20forked%20ClickHouse,a%20number%20of%20important%20changes.) and [TinyBird](https://tinybird.co/). Both take ClickHouse and create derivative products that are more focused on specific use cases.

## Architecture overview

When Snowflake was released in 2012, there were two major paradigms – **Shared-Disk Architecture** and **Shared-Nothing Architecture**.

![Shared Disk Architecture.png](../images/blog/clickhouse-vs-snowflake/shared-disk-architecture.png)

Under Shared-Disk Architecture, CPU and memory were split into nodes, but each connected to a single storage unit (these days usually a blob store like S3 or GCS). The benefit of Shared-Disk Architecture is that you can scale Disk and Compute separately. This is huge when you are thinking about a data warehouse when your workloads my be very spiky and periodic but your data has to be stored all the time. The cost here is that typically reading from disk is a bit slower, at least in terms of latency, when compared to reading from local storage. 

![Shared Nothing Architecture.png](../images/blog/clickhouse-vs-snowflake/shared-nothing-architecture.png)

Meanwhile, CPU, memory, and storage are encapsulated under Shared-Nothing Architecture in separate, parallel instances, only syncing via background jobs. The benefit of Shared-Nothing Architecture is speed. There is a risk that storage could go out of sync since usually replication here is eventually consistent, but that was the case with blob stores up until recently too. The easiest way to think about this is consider Postgres. When you install Postgres everything is boxed up nice and neat on a single instance. At smaller scale this is a much simpler setup and enables you to run the architecture pretty much anywhere.


![Snowflake Architecture.png](../images/blog/clickhouse-vs-snowflake/snowflake-architecture.png)

More importantly, Snowflake’s middle layer – virtual warehouses – can be scaled easily, coming in T-shirt sizes (S/M/L/XL). Snowflake makes it easy to add parallel nodes or re-size existing nodes, made possible by Snowflake's virtualized architecture.

ClickHouse utilizes Shared-Nothing Architecture by default (which is why we chose it originally!). We wanted something that was going to be fast and reliable. ClickHouse is a great fit for this. The great part here is...ClickHouse also [supports Shared-Disk Architecture](https://clickhouse.com/docs/en/faq/operations/deploy-separate-storage-and-compute/)! This is useful if you want to scale disk and compute separately, something we are very excited about for the future of PostHog. You literally can have the best of both worlds depending on your use case and tune it to fit. You can do this by leveraging Zero Copy Replication and [S3/GCS Backed MergeTrees](https://clickhouse.com/docs/en/guides/sre/s3-multi-region)... or even HDFS if that is your thing!

### Differences in query optimization & speed

ClickHouse has three significant optimizations that make querying aggregate computations efficient: (i) materialized views, (ii) specialized engines, and (iii) vectorized query execution.

- **Materialized views:** Materialized views are independent tables derived from other table data generated at some specific point in time. Unlike databases like Postgres, ClickHouse's materialized views are constantly re-generated in the background after new data is inserted. While materialized views are delayed because most of ClickHouse's use cases involve aggregate, analytical data, the delay doesn’t pose a problem.

- **Specialized engines:** Materialized views are aided by ClickHouse's specialized engines which can do anything from storing aggregates more efficiently on disk (AggregatingMergeTree) to allowing you to make HTTP calls to fetch data. This is truely one of the killer features that we leverage extensively at PostHog. If you are curious about this you should watch our video on them on [Youtube](https://youtu.be/6IwLWEx_mg4?t=804)

- **Vectorized query execution:** Vectorized execution organizes data in a way that makes it possible to use SIMD (Single Instruction Multiple Data) to process multiple values at once. This is a huge performance boost for aggregate computations. Read more about it [here](https://clickhouse.tech/docs/en/engines/table-engines/mergetree-family/mergetree/#vectorized-execution) or watch this [CMU video](https://www.youtube.com/watch?v=FrspnYbFSxQ) that explains it! 

Snowflake has some of these features, but the main thing that snowflake has bet on is the proliferation of JSON and unstructured data: 

- Snowflake's [Variant type](https://docs.snowflake.com/en/sql-reference/data-types-semistructured) was built into the service from the beginning and makes querying unstructured data nearly effortless. it basically decomposes JSON objects into a table of key-value pairs that better leverages the columnar aspect of Snowflake's architecture. This is something ClickHouse is actively working on, but for now is a competitive advantage of Snowflake.

Overall, ClickHouse's close-metal optimizations enable it to be faster than Snowflake and have more flexibility in how you can deploy it. Snowflake is, and forever will be, cloud only. ClickHouse can be deployed on-prem, in the cloud, or even on your laptop. You can even run it on a Raspberry Pi! The best bit about ClickHouse is that you can progressively tier your data from being local to block storage so that you have the best of all worlds. 

### Who uses Snowflake and ClickHouse?

Part of Snowflake’s value prop is the broad appeal to both technical and non-technical users. Snowflake’s marketplace makes connecting business intelligence tools with warehouse data easy, which appeals to teams wanting explore their data. ClickHouse Cloud has a competitive offering and the ecosystem is growing fast, but still smaller than Snowflake’s.

**Snowflake customers** include AT&T, Jetblue, Anthem, and Capital One. Snowflake customers tend to be enterprise-level and have to deal with a lot of data. 

**ClickHouse’s customers** include Github, YouTube, Twitter, Sentry, Uber, CloudFlare, and Slack. We, at PostHog, also [use ClickHouse](/docs/how-posthog-works/clickhouse). It is core to our product and powers most of everything you see when you visit our [app](https://app.posthog.com). 


### How is ClickHouse and Snowflake used?

ClickHouse and Snowflake are both used for analytics, but ClickHouse is more focused on analytical queries. ClickHouse is a great fit for PostHog because we are a product analytics tool and we need to be able to answer questions like “what is the average time to convert for users who saw a certain feature?” or “what is the average time to convert for users who saw a certain feature?” in *real time* and *at speed of click*.

Traditionally Snowflake can be considered more of a standard data warehouse or data lake where you can store all your data and then query it. This is a great fit for companies that want to store all their data in one place and then query it.

## Conclusion

The key take away here is that the lines are blurring between the two. ClickHouse is quickly developing features that make it look more and more like a data warehouse. 

For teams looking to built data intensive applications (think product analytics or a data backed CRM), ClickHouse is a fantastic solution. If you grow that business to the point where you need a data warehouse ClickHouse will grow with you. However, if you are looking for a product that has deep integrations with a long list of tools and the majority of your data is schemaless JSON, Snowflake may be for you.

### Further reading

Consider the following resources if you want to learn more about ClickHouse and Snowflake’s differences.

- [ClickHouse Documentation](https://clickhouse.com/docs/en/home/)

- [Snowflake Documentation](https://docs.snowflake.com/en/)

- [Clickbench](https://benchmark.clickhouse.com/), a benchmark test comparing ClickHouse, Snowflake, and other databases

- [Snowflake Whitepaper](https://event.cwi.nl/lsde/papers/p215-dageville-snowflake.pdf)

- [Why we chose ClickHouse](https://youtu.be/6IwLWEx_mg4)

- [Andy Pavlo - Vectorized Query Execution](https://www.youtube.com/watch?v=FrspnYbFSxQ) <--- this is a great video that explains vectorized query execution and you should check out all of Andy's videos

- [ClickHouse Separate Storage & Compute](https://clickhouse.com/docs/en/faq/operations/deploy-separate-storage-and-compute/)

- [S3 Backed MergeTrees](https://clickhouse.com/docs/en/integrations/s3/s3-merge-tree/)
