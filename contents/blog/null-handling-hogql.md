---
title: 'Adventures in null handling: Null money, null problems'
date: 2023-07-07
author:
  - marius-andra
showTitle: true
rootpage: /blog
sidebar: Blog
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/orange-blog-image.jpg
featuredImageType: full
category: Engineering
---

The value (or non-value) null can be the bane of a programmer’s existence. Null can work as expected in one language and context, then act in completely unexpected ways in another language or context.

We had challenges working with null during the [release of HogQL](/blog/introducing-hogql), which added [direct SQL access](/docs/product-analytics/sql) to your data. Michael and I realized null values for properties were leading to inaccurate results and customer confusion. This post covers our efforts to figure out and implement a solution for this.

## The problem with null in HogQL

The issue with null in HogQL was that [ClickHouse](/docs/how-posthog-works/clickhouse), the database we use to store and process data, is **strict** about nulls. If any value in an expression is null, then [the entire expression is null](https://clickhouse.com/docs/en/sql-reference/functions#null-processing). Here are two [HogQL expressions](/docs/hogql/expressions) showcasing why this is a problem:

1. `sumIf(properties.money, event = 'no problems') + sumIf(properties.money - 10, event = 'some problems')` returns null if either of the sides of the equation is null. This happens if there are no matching events (named `no problems` or `some problems`) or the property (`money`) is null.
2. `concat('money: ', properties.money)` returns null if the `money` property does not exist, though users might expect either `'money: '`  or `'money: null'`

PostHog’s existing solutions for handling null did not work with the full access HogQL provides. Specifically:

- ClickHouse skips null during aggregation, but users could want to concat or check null values with HogQL.
- Pre-HogQL, PostHog treated nulls as empty strings, but this could include null values in counts when they shouldn’t be.

At this stage in HogQL’s development, if a value could be null, users must handle it themselves. For example, users must wrap each `sumIf` function in the first example above in an `ifNull(x, 0)` like this:

```
ifNull(
	sumIf(properties.money, event = 'no problems'), 
	0
) + ifNull(
	sumIf(properties.money - 10, event = 'some problems'),
	0
)
```

This is not a good user experience as it is non-obvious they must do this and leads to a lot of extra code and checks.

## Brainstorming potential solutions

To solve the issue with nulls, Michael and I came up with a few potential solutions, but each had pitfalls:

1. **Returning a default value depending on type.** For example, returning `""` for strings, `0` for numbers, or `false` for booleans. This didn’t handle the expression `properties.bla is null` and required rewriting `is set` and `is not set` logic. Defaulting to `0` also might mess up aggregation when you expect null fields to be discarded.

2. **Including a nullable checkbox in data management.** Similar to the previous option, but required users to input if they expect a property to be null. This required a lot of user work and remains confusing if they didn’t understand how to handle null.

3. **Create JS-like `'bla' (NOT) IN properties` expression logic.** We felt this was too complex for users and makes the question of `is null` for an unset property unclear. 

4. **Use the ClickHouse function `sumOrDefaultIf`.** We hadn't implemented this function yet, but it faces a similar usability problem to wrapping `sumIf` in `ifNull` forcing users to handle nulls themselves.

5. **Use non-ANSI compliant string operator.** ANSI is SQL standards for function and syntax. For example, `f'{NULL}-haha-{properties.bla}'` is non-ANSI compliant because it doesn’t conform to standard SQL string concatenation syntax. We decided it is better to keep the standard operators and be flexible with types instead.

## The solution(s) to our null problems

The solutions were relatively simple.

First, we modified how `concat` worked (as well as how strings were added together with `||`) to be null-tolerant. This means converting every value in the concat function, including null, to a string. For example, `concat(null, 'a', 3, toString(4), toString(NULL), properties.$screen_width)` turns into `concat('', 'a', toString(3), toString(4), '')`.

To do this, we automatically modify the ClickHouse SQL string to add `ifNull` falling back to empty strings (`''`) to `concat` functions. HogQL abstracts this away because the functionality creates a long and "dorky" ClickHouse SQL string like:

```
-- hogql
concat(properties.$screen_width, 'x', properties.$screen_height)

-- clickhouse
concat(ifNull(toString(replaceRegexpAll(nullIf(nullIf(JSONExtractRaw(events.properties, '$screen_width', ''), 'null'), '^\"|\"$', '')), ''), 'x', ifNull(toString(replaceRegexpAll(nullIf(nullIf(JSONExtractRaw(events.properties, '$screen_height'), ''), 'null'), '^\"|\"$', '')), ''))
```

Second, we added [nullish coalescing](https://github.com/PostHog/posthog/pull/16276) to change the cumbersome `ifNull(x, y)` function to `x ?? y`. Not having to use `ifNull()` makes dealing with nulls simpler.

Third, we ran into an issue where the expression `"something that could be null" != "anything"` returned nothing instead of everything. Our first solution for this broke Clickhouse's part/granule optimization and had to be rolled back. Instead, we changed the compare operation and added a `nullable` [property](https://github.com/PostHog/posthog/pull/16259) on all fields which defaults to `False`. This opts fields into special null handling constraint that doesn't break ClickHouse.

Finally, handling numbers remained the same because returning `0` for null number properties meaningfully affects calculations; they get added as non-null to counts. To prevent this, PostHog continues to return null and lets ClickHouse skip these in aggregations.

## Why modify ClickHouse SQL?

What we did with the `concat` function is an example modifying ClickHouse SQL to make it more user-friendly. With HogQL, we can enhance ClickHouse functions, add our own, or even introduce new language constructs. Other examples include adding:
- [sparklines](https://github.com/PostHog/posthog/pull/16096) as a chart function like counts or values. 
- a new language construct to check for [`person_id` in a cohort](https://github.com/PostHog/posthog/pull/16119) with `in cohort 'my cohort'`.

Each of these improves data accessibility while maintaining usability. Direct SQL access is powerful, but complex. Modifying ClickHouse SQL with HogQL abstracts away some complexity while keeping the power and freedom of direct data access provides. This is the ideal balance we'd like to continue to strike with HogQL.

## Further reading

- [How PostHog built an app server (from MVP to billions of events)](/blog/how-we-built-an-app-server)
- [How we build features users love (really fast)](/blog/measuring-feature-success)
- [In-depth: ClickHouse vs PostgreSQL](/blog/clickhouse-vs-postgres)
