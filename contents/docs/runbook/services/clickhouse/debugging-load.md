---
title: Diagnosing ClickHouse load using ClickHouse
sidebar: Docs
showTitle: true
---

One of the more powerful features of ClickHouse is its introspective capabilities. This can be easily leveraged to understand
where load on our multi-tenant clickhouse servers is coming from.

## Show me the queries:

The following query gives an at-a-glance overview of what is generating load on the cluster:

```sql
with
    toDateTime(now()) as target_time,
    toIntervalDay(3) as interval,
    (
        SELECT sum(read_bytes)
        from clusterAllReplicas('posthog', system,query_log)
        where event_time >= target_time - interval and event_time <= target_time and type > 1 and is_initial_query
    ) AS total_bytes_read
select
    multiIf(
        http_user_agent = 'Apache-HttpClient/4.5.13 (Java/11.0.17)', 'Metabase?',
        http_user_agent = 'Go-http-client/1.1', 'Grafana?',
        http_user_agent = 'python-requests/2.28.1', 'infi_orm',
        http_user_agent != '', http_user_agent,
        query = 'SELECT version()', 'version_query',
        JSONExtractString(log_comment, 'kind') = 'request' and JSONExtractString(log_comment, 'route_id') IN ('api/event/?$', 'api/projects/(?P<parent_lookup_team_id>[^/.]+)/events/?$'), '/api/event',
        log_comment != '', JSONExtractString(log_comment, 'kind'),
        query_kind = 'Insert', 'Insert',
        query LIKE '%FORMAT JSON%' or (not is_initial_query and query like '%`elements_chain` FROM `posthog`.`sharded_events%') or (query like '%min(`_timestamp`) AS `min`, max(`_timestamp`)%'), 'historical-exports',
        'unknown'
    ) as query_type,
    formatReadableSize(sum(read_bytes)) AS read_bytes_,
    sum(read_bytes) / total_bytes_read AS read_bytes_percentage,
    count(),
    sum(query_duration_ms),
    formatReadableSize(sum(result_bytes)) AS result_bytes_,
    sum(read_rows),
    arraySort(arrayDistinct(groupArray(getMacro('replica')))) as hosts
from clusterAllReplicas('posthog', system, query_log)
where event_time >= target_time - interval and event_time <= target_time and type > 1 and is_initial_query
group by query_type
order by sum(query_duration_ms) DESC
```

## Advanced

To diganose further, it's important to understand [ClickHouse operations](/handbook/engineering/clickhouse/operations).


PostHog app includes a lot of tags in `system.query_log` column `log_comment` to make analysis simpler.

Useful dimensions to slice the data on:
- `query_duration_ms` - How long the query took
- `formatReadableSize(read_bytes)` - Total number of bytes read from all tables and table functions participated in query.
- `formatReadableSize(memory_usage)` - Memory usage of this query.
- `formatReadableSize(result_bytes)` - How big was the response for this query. Useful for `not is_initial_query` to determine if too much data streaming is going on.
- `ProfileEvents['OSCPUVirtualTimeMicroseconds'])` - How much time was spent by the CPU
- `ProfileEvents['ReadCompressedBytes'])` - How much data was read from disk (compressed)
- `ProfileEvents['NetworkSendElapsedMicroseconds'])` - How much time was spent sending data over network
- `ProfileEvents['NetworkReceiveBytes'])` - How much time was spent reading data over network
- `ProfileEvents['NetworkSendBytes'])` - How much data was sent over the network

Other useful expressions:
- `is_initial_query` - indicates whether this was a main query or pushed down from coordinator. Note `log_comment` is also forwarded.
- `JSONExtractString(log_comment, 'kind')` - What is the query from? Either `celery` or `request`
- `JSONExtractString(log_comment, 'id')` - Request path or task name (depending on kind)
- `JSONExtractString(log_comment, 'route_id')` - what geberic route id was responsible for the query (only set for kind=request)
- `JSONExtractInt(log_comment, 'user_id')` - user_id
- `JSONExtractInt(log_comment, 'team_id')` - team_id
- `JSONExtractString(log_comment, 'access_method')` - What access method was used? Blank indicates it's normal web traffic (only set for kind=request)
- `JSONExtractString(log_comment, 'http_referer')` - HTTP referer (only set for kind=request)
- `JSONExtractString(log_comment, 'http_user_agent')` - HTTP user agent (only set for kind=request)
- `JSONExtractString(log_comment, 'container_hostname')` - Kubernetes pod where the query was initiated from
- `any(log_comment)` - shows the structure of the log comment
- `getMacro('replica')` - What replica was this on?
- `getMacro('shard')` - What shard was this query made on?
- `getMacro('hostClusterType')` - What cluster was this on? Online or offline?
