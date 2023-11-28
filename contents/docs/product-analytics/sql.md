---
title: SQL (beta)
availability:
    free: full
    selfServe: full
    enterprise: full
---

SQL insights enable you to directly access data in PostHog using [SQL queries](/blog/sql-for-analytics). They're powered by [HogQL](/docs/hogql).

## SQL commands

You create SQL queries out of a list of commands that shape what data, filters, aggregations, and ordering we want to see. 

> SQL queries in PostHog don’t require the trailing semi-colon (`;`) of traditional SQL queries.

### SELECT

Use `SELECT` to select data (usually columns, transformations, or aggregations) from one or more tables in the database.

```sql
SELECT *
FROM events
```

Common values to select are `*` (representing all), `event`, `timestamp`, `properties`, and functions. These values can be found in the data management [properties tab](https://app.posthog.com/data-management/properties) or inside tables in the [database tab](https://app.posthog.com/data-management/database). 

Add the `DISTINCT` clause to `SELECT` commands to keep only unique rows in query results.

```sql
SELECT DISTINCT person_id
FROM events
```

### FROM

Use `FROM` to select the database table to run the queries on. In PostHog, examples include `events`, `groups`, `raw_session_replay_events`, and more listed in the [data management database tab](https://app.posthog.com/data-management/database) in PostHog.

```sql
SELECT session_id, min_first_timestamp, click_count 
FROM raw_session_replay_events
```

You can join multiple tables together using the `LEFT JOIN` command which takes one table before the command and another after the command and combines them based on the join condition using the `ON` keyword.

```sql
SELECT events.event, persons.is_identified
FROM events
LEFT JOIN persons ON events.person_id = persons.id
```

### WHERE

Use `WHERE` to filter rows based on specified conditions. These conditions can be:

1. Comparison operators like `=`, `<`, or `>=`
2. Logical operators like `AND`, `OR`, or `NOT`. These are often used to combine multiple conditions. 
3. Functions like `toDate`, `today()`
4. Clauses like `LIKE`, `IN`, `IS NULL`, `BETWEEN`

```sql
SELECT *
FROM events
WHERE event = '$pageview'
   AND toDate(timestamp) = today()
   AND properties.$current_url LIKE '%/blog%'
```

### GROUP BY

Use `GROUP BY` to group rows that have the same values in specified columns into summary rows.

```sql
select 
   properties.$os,
   count()
from events
group by 
   properties.$os
```

### ORDER BY

Use `ORDER BY` to sort the query results by one or more columns. You can specify order by ascending with `ASC` or descending with `DESC`.

```sql
SELECT 
   properties.$browser, 
   count()
FROM events
GROUP BY properties.$browser
ORDER BY count() DESC
```

### AS

Use `AS` to alias columns or tables with different names. This makes the query and results more readable.

```sql
SELECT 
   properties.$current_url as current_url,
   count() as current_url_count
FROM events
GROUP BY current_url
ORDER BY current_url_count DESC
```

### LIMIT

Use `LIMIT` to restrict the number of rows returned by the query. It specifies the maximum number of rows the query should retrieve. By default, PostHog sets it at `100`.

```sql
SELECT 
   properties.$lib as library,
   count() as library_count
FROM events
WHERE properties.$lib != ''
GROUP BY library
ORDER BY library_count DESC
LIMIT 1
```

### HAVING

Use `HAVING` with the `GROUP BY` command to filter the results based on aggregate function values. While `WHERE` filters rows before grouping, `HAVING` filters grouped results after aggregation.

```sql
SELECT 
   properties.$os,
   count()
FROM events
GROUP BY 
   properties.$os
HAVING count() > 100
```

### WITH

Use `WITH` to define a temporary result set that you can reference within a larger query. It helps break down complex queries into smaller parts. You can think of it as a function that returns a temporary table similar to using a subquery in a `FROM` command. The difference is that we query `WITH` subqueries each time they are used, potentially leading to slower queries.

```sql
with first_query as (
   select
      count() as first_count
   from events
)
select
   first_count
from first_query
```

## Useful functions

HogQL includes many functions to aggregate and manipulate queried data. Below are some examples of some of the most popular SQL functions you can use in your insights. 

### Aggregate functions

These aggregate results for columns across all rows. They include:

- `count()`: Counts the number of rows that match a certain condition.
- `avg()`: Calculates the average numeric value of a column.
- `sum()`: Calculates the total (sum) numeric value of a column.
- `max()`, `min()`: Finds the maximum or minimum value of a column.

```sql
SELECT 
   avg(properties.$screen_height), 
   sum(properties.$screen_height), 
   max(properties.$screen_height), 
   min(properties.$screen_height)
FROM events
WHERE event = '$pageview' AND properties.$screen_height IS NOT NULL
```

You can find a full list of these in [supported aggregations](/docs/hogql/aggregations).

### Regular functions

HogQL provides many functions for accessing, modifying, and calculating data from queries. Along with the one’s listed below, many basics include calculation operators (`+`, `-`, `/`, `*`), type conversions (`toInt`, `toString`), conditional statements (`if`, `multiIf`), and rounding (`floor`, `round`).

You can find a full list of these in [supported ClickHouse functions](/docs/hogql/clickhouse-functions).

#### JSON

You can access nested data in JSON and objects directly.

```sql
select properties.$set.$geoip_country_name
from events
```

You can parse JSON with `JSONExtractRaw()` to return a value.

```sql
SELECT
  JSONExtractRaw(properties.$set) as set_properties
FROM events
WHERE properties.$set IS NOT NULL
```

Specialized `JSONExtract` functions exist for different data types including:

- `JSONExtractFloat`
- `JSONExtractArrayRaw`
- `JSONExtractString`
- `JSONExtractBool`

#### Array

- `arrayElement(arr, n)`: Retrieves the element with the index of n from the array `arr`.
- `arrayJoin(arr)`: Takes a row and generates multiple rows for the number of elements in the array. It copies all the column values, except the column where this function is applied. It replaces the applied column with the corresponding array value.

```sql
SELECT flag, count()
FROM (
   SELECT arrayJoin(JSONExtractArrayRaw(assumeNotNull(properties.$active_feature_flags))) as flag
   FROM events
   WHERE event = '$pageview' and timestamp > '2023-08-01'
)
GROUP BY flag
ORDER BY count() desc
```

#### Date and time

- `now()`, `today()`, `yesterday()`: Returns the current time, date, or yesterday’s date respectively.
- `interval`: A length of time for use in arithmetic operations with other dates and times.
- `toDayOfWeek`, `toHour`, `toMinute`: Converts date number of day of week (1-7), hour in 24-hour time (0-23), and minute in hour (0-59).
- `toStartOfYear`, `toStartOfMonth`, `toMonday`, `toStartOfDay`, `toStartOfMinute`: rounds date down to the nearest year, month, Monday, day, hour, or minute respectively
- `dateDiff('unit', startdate, enddate)`: Returns the count in `unit` between `startdate` and `enddate`.
- `formatDateTime`: Formats a time according to a [MySQL datetime format string](https://dev.mysql.com/doc/refman/8.0/en/date-and-time-functions.html#function_date-format).

```sql
SELECT 
   formatDateTime(now(), '%a %b %T') AS current_time,
   toDayOfWeek(now()) AS current_day_of_week,
   dateDiff('day', timestamp, now()) AS days_since_event
FROM events
WHERE timestamp > now() - interval 1 day
```

> Read more examples in [How to do time-based breakdowns (hour, minute, real time)](/tutorials/time-breakdowns) and [Using HogQL for advanced time and date filters](/tutorials/hogql-date-time-filters).

#### String

- `extract`: Extracts a fragment of a string using a regular expression.
- `concat`: Concatenates strings listed without separator.
- `splitByChar`, `splitByString`, `splitByRegexp`, `splitByWhitespace`: splits a string into substring separated by a specified character, string, regular expression, or whitespace character respectively.
- `match`: Return whether the string matches a regular expression pattern.
- `replaceOne`, `replaceRegexpOne`: Replace the first occurrence of matching a substring or regular expression pattern respectively with a replacement string.
- `trim`: Remove specified characters (or whitespace) from the start or end of a string.

```sql
select 
   extract(elements_chain, '[:|"]attr__class="(.*?)"') as class_name,
	 concat(properties.$os, ' version: ', properties.$os_version),
	 replaceRegexpOne(properties.$current_url, '^/', 'site/') AS modified_current_url
from events
where event = '$autocapture'
```

#### Sparkline

A sparkline is a tiny graph contained in one cell of your query result. As an argument, it takes an array of integers.

```sql
SELECT sparkline(range(1, 10)) FROM (SELECT 1)
```

You can use it to visualize queries, such as a 24-hour `$pageview` count for different `$current_url` values.

```sql
SELECT
    pageview,
    sparkline(arrayMap(h -> countEqual(groupArray(hour), h), range(0,23))),
    count() as pageview_count
FROM
(
    SELECT
        properties.$current_url as pageview,
        toHour(timestamp) AS hour
    FROM
        events
    WHERE
         timestamp > now () - interval 1 day
         and event = '$pageview'
) subquery
GROUP BY
    pageview
ORDER BY
    pageview_count desc
```

You can also use it for art.

```sql
select 
    sparkline(arrayMap(a -> cos(toSecond(timestamp) + a/4), range(100 + 5 * toSecond(timestamp)))) 
from events
```
