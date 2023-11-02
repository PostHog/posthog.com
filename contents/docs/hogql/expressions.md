---
title: HogQL expressions
sidebar: Docs
showTitle: true
availability:
    free: full
    selfServe: full
    enterprise: full
---

HogQL expressions enable you to directly access, modify, and aggregate data in PostHog using SQL. You can use them nearly everywhere where event filters exist, including:

- [Dashboards](/docs/product-analytics/dashboards)
- Data series
- Breakdowns
- [Funnels](/docs/product-analytics/funnels)
- Event explorer

![HogQL trends breakdown filter](../../images/features/hogql/trends-breakdown.png)

HogQL expressions can access data like:

- event properties
- [person properties](/docs/product-analytics/user-properties)
- `event`
- `elements_chain`
- `timestamp`
- `distinct_id`
- `person_id`

They then use SQL functions to access, filter, modify, or aggregate the data. A full list of SQL functions are found in our [supported ClickHouse functions](/docs/hogql/clickhouse-functions) and [supported aggregations](/docs/hogql/aggregations) docs.

> **Tip:** If you're having trouble getting results from your expression, try debugging by using a different visualization (trends table often works best as it shows all values returned) or breaking down your expression into pieces and testing each one.

## Useful functions

To help you get the most out of HogQL expressions, here are some of the most popular functions.

### Comparisons

- `if`: Checks a condition, and if true (or non-zero), and then returns the result of an expression.
- `multiIf`: Enables chaining multiple `if` statements together, each a condition and return expression.
- `in`: Checks if an array or string contains a value.
- `match`: Checks whether a string matches a regular expression pattern.
- `like`: Checks if string matches pattern that contain string(s) and symbols `%` (arbitrary number of arbitrary characters), `_` (single arbitrary character), `\` (escaped literals).

### Aggregations

- `count`: Counts the values. If you want a condition, use `sumIf`.
- `count(distinct)`: Counts the number of `uniqExact` values.
- `uniq`: Calculates the approximate number of different values (`uniqExact` is slower but exact).
- `uniqExact`: Calculates the exact number of different argument values (`uniq` is faster and you should use it if a close approximation is good enough).
- `sum`: Calculates the total (sum) numeric value.
- `sumIf`: Calculates the total (sum) numeric value for values meeting a condition.
- `avg`: Calculates the average numeric value.
- `median`: Computes an approximate middle (50%) value for a numeric data sequence.

### Strings

- `extract`: Extracts a fragment of a string using a regular expression.
- `concat`: Concatenates strings listed without separator.
- `splitByChar`: Splits string into substrings separated by a specified character.
- `replaceOne`, `replaceRegexpOne`: Replace the first occurrence of matching a substring or regular expression pattern respectively with a replacement string.

### Dates

- `dateDiff('unit', startdate, enddate)`: Returns the count in `unit` between `startdate` and `enddate`.
- `toDayOfWeek`, `toHour`, `toMinute`: Converts date number of day of week (1-7), hour in 24-hour time (0-23), and minute in hour (0-59).
- `now()`, `today()`, `yesterday()`: Returns the current time, date, or yesterday’s date respectively.
- `interval`: A length of time for use in arithmetic operations with other dates and times.

## Use cases

- Checking if a property or autocapture element chain contains a specific value or any of an array of values using `in` or `match`.
- Modifying the display string in the visualization by extracting or concatenating properties using `concat()`, `+`, `extract()`, or `replaceOne`.
- Grouping or binning events based on properties using `if()`, `multiIf()`.
- Accessing nested properties such as `properties.$set.$geoip_city_name`.
- Filtering for events that happened in the last X minutes or hours with `dateDiff()`, `now()`, and `interval`.
- Creating percentages by calculating the sum of one property over the sum of all related properties with `sum()`, `/`, `+`, and `*`.
- Getting unique values with `uniq()`.
- Binning events based on time of day, week, and month with `toHour`, `toDayOfWeek`, `toStartOfWeek`, `toMonth`.