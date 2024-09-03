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

Use `SELECT` to select data (usually columns, transformations, or aggregations) from one or more tables in the database. You can use arithmetic or functions to modify the selected data.

```sql
SELECT 
   event, 
   timestamp, 
   properties.$current_url,
   concat(properties.$lib, ' - ', properties.$lib_version)
FROM events
```

Common values to select are `*` (representing all), `event`, `timestamp`, `properties`, and functions like `count()`. You can access properties using dot notation like `person.properties.$initial_browser`. These values can be found in the data management [properties tab](https://app.posthog.com/data-management/properties) or inside tables in the [database warehouse tab](https://us.posthog.com/data-warehouse). 

Add the `DISTINCT` clause to `SELECT` commands to keep only unique rows in query results.

```sql
SELECT DISTINCT person_id
FROM events
```

### FROM

Use `FROM` to select the database table to run the queries on. In PostHog, examples include `events`, `groups`, `raw_session_replay_events`, and more listed in the [data management database tab](https://app.posthog.com/data-management/database).

```sql
SELECT session_id, min_first_timestamp, click_count 
FROM raw_session_replay_events
```

`FROM` also enables you to break down your query into subqueries. This is useful for analyzing multiple groups of data. For example, to get the difference in event count between the last 7 days and the 7 days before that, you can use two subqueries like this:

```sql
SELECT 
  last_7_days.last_7_days_count - previous_7_days.previous_7_days_count
FROM
  (
      SELECT COUNT(*) AS last_7_days_count
      FROM events
      WHERE timestamp > now() - INTERVAL 7 DAY
         AND timestamp <= now()
   ) AS last_7_days,
  (
      SELECT COUNT(*) AS previous_7_days_count
      FROM events
      WHERE timestamp > now() - INTERVAL 14 DAY
      AND timestamp <= now() - INTERVAL 7 DAY
   ) AS previous_7_days
```

### JOIN

You can query over multiple tables together using the `JOIN` command. This combines the tables and returns different records depending on which of the four conditions you use:

1. `INNER JOIN`: Records with matching values in both tables.

2. `LEFT JOIN`: All records from the left table and the matched records from the right table.

3. `RIGHT JOIN`: All records from the right table and the matched records from the left table.

4. `FULL JOIN`: All records matching either the left or right tables.

The command then takes one table before it and another after it and combines them based on the join condition using the `ON` keyword. For example, below, the events table is the left table and the persons table is the right table:

```sql
SELECT events.event, persons.is_identified
FROM events
LEFT JOIN persons ON events.person_id = persons.id
```

This is especially useful when querying using the [data warehouse](/docs/data-warehouse) and querying external sources. For example, once you set up the Stripe connector, you can query for a count of events from your customers like this:

```sql
SELECT events.distinct_id, COUNT() AS event_count
FROM events
INNER JOIN prod_stripe_customer ON events.distinct_id = prod_stripe_customer.email
GROUP BY events.distinct_id
ORDER BY event_count DESC
```

### WHERE

Use `WHERE` to filter rows based on specified conditions. These conditions can be:

1. Comparison operators like `=`, `!=`, `<`, or `>=`
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

To have the insight or dashboard date range selector apply to the insight, include `{filters}` in query like this:

```sql
SELECT *
FROM events
WHERE event = '$pageview'
   AND properties.$current_url LIKE '%/blog%'
   AND {filters}
```

`WHERE` is also useful for querying across multiple tables. For example, if you have the Hubspot connector set up, you can get a count of events for contacts with a query like this:

```sql
SELECT COUNT() AS event_count, distinct_id
FROM events
WHERE distinct_id IN (SELECT email FROM hubspot_contacts)
GROUP BY distinct_id
ORDER BY event_count DESC
```

### GROUP BY

Use `GROUP BY` to group rows that have the same values in specified columns into summary rows. It is often used in combination with [aggregate functions](#aggregate-functions).

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

### LIKE

Use `LIKE` to search for a specified pattern in a column. This is often done in the `WHERE` command. You can also use `ILIKE` to make the search case insensitive.

Use the `%` sign to represent any set of characters (wildcard). Use the `_` sign to define a single character wildcard.

For example, to get all the current URLs that contain the string "docs" you can use:

```sql
SELECT properties.$current_url
FROM events
WHERE properties.$current_url LIKE '%docs%'
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

To paginate results, you can use the `OFFSET` command. For example, to get the 101-150th rows, you can use it like this:

```sql
SELECT event, count(*)
FROM events
GROUP BY event
ORDER BY count(*) DESC
LIMIT 50 OFFSET 100
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

### WINDOW

Use `WINDOW` to query data across a set of rows related to the current row without grouping the rows in the output like aggregates do. This is useful for complex queries that need row-level detail while also aggregating data from a set of rows.

A window function contains multiple parts:

1. `PARTITION BY`: Divides the rows into partitions which the function then applies to. Each partition is processed separately.

2. `ORDER BY`: Sorts rows within each partition.

3. Frame Specification: Defines the subset of rows to include in the window such as `ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING`.

It is useful for analysis like running totals, moving averages, ranking, and percentiles. For example, to get a running total of pageviews, you can:

```sql
SELECT 
    event, 
    timestamp,
    COUNT(*) OVER w AS running_total_pageviews
FROM events
WHERE event = '$pageview'
WINDOW w AS (ORDER BY timestamp)
ORDER BY timestamp DESC
```

### CASE

Use `CASE` within the `SELECT` command to implement conditional logic within your SQL queries. It allows you to execute different SQL expressions based on conditions. It is similar to if/else statements in programming.

For example, to group `properties.$os` values in `mobile`, `desktop`, and `other`, you can use:

```sql
SELECT 
  CASE 
    WHEN properties.$os IN ('iOS', 'Android') THEN 'mobile'
    WHEN properties.$os IN ('Windows', 'Mac OS X', 'Linux', 'Chrome OS') THEN 'desktop'
    ELSE 'other'
  END AS os_category,
  COUNT(*) AS os_count
FROM events
WHERE properties.$os IS NOT NULL
GROUP BY os_category
ORDER BY os_count DESC
```

### Comments

Use two dashes (`--`) to write comments. 

```sql
SELECT *
FROM events
-- WHERE event = '$pageview'
```

## Useful functions

HogQL includes many functions to aggregate and manipulate queried data. Below are some examples of some of the most popular SQL functions you can use in your insights. 

### Aggregate functions

These aggregate results for columns across all rows. They include:

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

#### Count

Use `count()` to count the number of rows in a particular column. `count(*)` counts all rows, while `count(column_name)` counts the number of non-null values in a column.

### Regular functions

HogQL provides many functions for accessing, modifying, and calculating data from queries. Along with the ones listed below, many basics include calculation operators (`+`, `-`, `/`, `*`), type conversions (`toInt`, `toString`), conditional statements (`if`, `multiIf`), and rounding (`floor`, `round`).

You can find a full list of these in [supported ClickHouse functions](/docs/hogql/clickhouse-functions).

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
- `upper`, `lower`: Converts a string to uppercase or lowercase.

```sql
select 
   extract(elements_chain, '[:|"]attr__class="(.*?)"') as class_name,
	concat(properties.$os, ' version: ', properties.$os_version),
	replaceRegexpOne(properties.$current_url, '^/', 'site/') AS modified_current_url
from events
where event = '$autocapture'
```

> Read more in [How to analyze autocapture events with HogQL](/tutorials/hogql-autocapture).

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

> Read more in [How to filter and breakdown arrays with HogQL](/tutorials/array-filter-breakdown).

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

## Accessing data

### Strings and quotes

Quotation symbols work the same way they would work with ClickHouse, which inherits from ANSI SQL:

- **S**ingle quotes (`'`) for **S**trings literals.
- **D**ouble quotes (`"`) and **B**ackticks (\`) for **D**ata**B**ase identifiers.

For example:

```sql
SELECT * FROM events WHERE properties.`$browser` = 'Chrome'
```

### Types

Types (and names) for the accessible data can be found in the [database](https://us.posthog.com/data-management/database), [properties](https://us.posthog.com/data-management/properties) tabs in data management as well as in the [data warehouse tab](https://us.posthog.com/data-warehouse) for external sources. They include:

- `STRING` (default)
- `JSON` (accessible with dot or bracket notation)
- `DATETIME`(in `ISO 8601`, [read more in our data docs](/docs/data/timestamps))
- `INTEGER`
- `FLOAT`
- `BOOLEAN`

For example:

```sql
SELECT round(properties.$screen_width * properties.$screen_height / 1000000, 2) as `Screen MegaPixels` FROM events LIMIT 100
```

This works because `$screen_width` and `$screen_height` are both defined as numeric properties. Thus you can multiply them.

To cast a string property into a different type, use type conversion functions, such as`toString`, `toDate`, `toFloat`, `JSONExtractString`, `JSONExtractInt`, and more.

### Property access

To access a property stored on an event or person, just use dot notation. For example `properties.$browser` or `person.properties.$initial_browser`. You can also use bracket notation like `properties['$feature/cool-flag']`.

Nested property or JSON access, such as `properties.$some.nested.property`, works as well.

> PostHog's properties include always include `$` as a prefix, while custom properties do not (unless you add it).

Property identifiers must be known at query time. For dynamic access, use the JSON manipulation functions from below on the `properties` field directly.

Some queries can error when accessing null values. To avoid this, use the `COALESCE` function to replace null values with a default value or filter `NULL` values with `IS NOT NULL` and use `assumeNotNull` to cast a column to a non-null type.

### Actions

To use [actions](/docs/actions) in SQL insights, use the `matchesAction()` function. For example, to get a count of the action `clicked homepage button`, you can do:

```sql
SELECT count() 
FROM events 
WHERE matchesAction('clicked homepage button')
```

For more customization when using actions, start by selecting you action in the [actions tab](https://us.posthog.com/data-management/actions) under data management.

In the action details under "Matching events," click the export dropdown and select "Edit SQL directly."

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/v1714065991/posthog.com/contents/images/docs/product-analytics/action-sql-light.png" 
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/v1714065992/posthog.com/contents/images/docs/product-analytics/action-sql-dark.png" 
  alt="Action SQL" 
  classes="rounded"
/>

This opens an SQL insight using the action. You can then copy parts of the SQL, like the `WHERE` filter or columns under `SELECT`, to use in your own insights.

### Cohorts

To use [cohorts](/docs/data/cohorts) in SQL insights, simply filter where `person_id IN COHORT '{name}'`.

For example, to get a count of users in the `Power user` cohort:

```sql
select count()
from persons
where id IN COHORT 'Power users'
```

To get a count of events for users in the `Power user` cohort:

```sql
select count()
from events
where person_id IN COHORT 'Power user'
```
