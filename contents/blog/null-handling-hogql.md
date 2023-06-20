---
title: "Adventures in null handling: Null money, null problems"
date: 2023-06-14
author: ["ian-vanagas"]
showTitle: true
rootpage: /blog
sidebar: Blog
hideAnchor: true
featuredImage: ../images/blog/orange-blog-image.jpg
featuredImageType: full
category: Engineering
---

The value (or non-value) null can be the bane of a programmer’s existence. Null can work as expected in one language and context, then act in completely unexpected ways in another language or context.

We recently had challenges with null during the [release of HogQL](/blog/introducing-hogql). Our engineers Marius and Michael realized null values for properties were leading to inaccurate results and customer confusion. This post covers their efforts to figure out and implement a solution for this.

## The problem with null in HogQL

The issue with null in HogQL was that ClickHouse is strict about nulls. If any value in an expression is null, then [the entire expression is null](https://clickhouse.com/docs/en/sql-reference/functions#null-processing). Here are two HogQL expressions showcasing why this is a problem:

1. `sumIf(properties.money, event = 'no problems') + sumIf(properties.money - 10, event = 'some problems')` returns null if either of the sides of the equation are null. This  happens if there are no matching events (named `no problems` or `some problems`) or the property (`money`) is null.
2. `concat('money: ', properties.money)` returns null if there's no `money` property, though users might expect either `'money: '`  or `'money: null'`

PostHog’s existing solutions for handling null did not work with the full access HogQL provides. Specifically:

- ClickHouse skips null during aggregation, but users could want to concat or check null values with HogQL.
- PostHog previously treated nulls as strings, but this could include null values in counts when they shouldn’t be.

At this stage in HogQL’s development, if a value could be null, users must handle it themselves. For example, users must wrap each `sumIf` function in the first example above in a `ifNull(x, 0)` like this:

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

To solve the issue with nulls, Marius and Michael came up with a few potential solutions, but each had its own pitfalls.

1. **Returning a default value depending on type.** For example, returning `""` for strings, `0` for numbers, or `false` for booleans. This didn’t handle the expression `properties.bla is null` and required rewriting `is set` and `is not set` logic. Defaulting to `0` also might mess up aggregation when you expect null fields to be discarded.

2. **Including a nullable checkbox in data management.** Similar to the previous option, but required users to input if they expect a property to be null. This required a lot of user work and remains confusing if they didn’t understand how to handle null.

3. **Create JS-like `'bla' (NOT) IN properties` expression logic.** We felt this was too complex for users and makes the question of `is null` for an unset property unclear. 

4. **Use the ClickHouse function `sumOrDefaultIf`.** Faces the same problem of being null if any values are null.

5. **Use non-ANSI compliant string operator.** ANSI is SQL standards for function and syntax. For example, `f'{NULL}-haha-{properties.bla}'` is non-ANSI compliant because it doesn’t conform to standard SQL string concatenation syntax. We decided it is better to keep the standard operators and be flexible with types instead.

## The solution(s) to our null problems

The solution was to handle null for values we expect to be strings differently than numbers.

For numbers, returning `0` for null number properties meaningfully affects calculations, because they get added as non-null to counts. To prevent this, PostHog continues to return null and lets ClickHouse skip these in aggregations.

Strings don’t need the same accuracy, users mostly want to return or concat strings anyway. To solve the specific issue with the concat function, Marius made it null-tolerant. This means every value converts to a string. For example, `concat(null, 'a', 3, toString(4), toString(NULL), properties.$screen_width)` turns into `concat('', 'a', toString(3), toString(4), '')`. 

To do this, PostHog automatically adds `ifNull` falling back to empty strings (`''`) to concat functions. HogQL abstracts this away because the functionality creates a long and "dorky" ClickHouse SQL string like:

```
-- hogql
concat(properties.$screen_width, 'x', properties.$screen_height)

-- clickhouse
concat(ifNull(toString(replaceRegexpAll(nullIf(nullIf(JSONExtractRaw(events.properties, '$screen_width', ''), 'null'), '^\"|\"$', '')), ''), 'x', ifNull(toString(replaceRegexpAll(nullIf(nullIf(JSONExtractRaw(events.properties, '$screen_height'), ''), 'null'), '^\"|\"$', '')), ''))
```

By understanding the common use cases and objectives of users when interacting with nulls, Marius implemented these solutions to streamline the user experience. He also didn’t implement a solution moving us too far away from standard practice, making HogQL more maintainable for us and understandable for users.

## Further reading

- [How PostHog built an app server (from MVP to billions of events)](/blog/how-we-built-an-app-server)
- [How we build features users love (really fast)](/blog/measuring-feature-success)
- [In-depth: ClickHouse vs PostgreSQL](/blog/clickhouse-vs-postgres)