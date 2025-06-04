---
title: How to filter and search error tracking issues in PostHog
sidebar: Docs
showTitle: true
author:
  - olly-browne
date: 2024-06-04
tags:
  - error tracking
  - debugging
---

## What is an issue?

In the error tracking tool, exception events are grouped into issues, based on the information in the exception, such as the exception type, message, and stack trace. Which information is used for this grouping depends on what information is available, and is subject to change as we try to improve our grouping algorithm - if you spot two issues that you think should have been one, or one issue that you think should have been split into two, please let us know!

## Finding specific issues with the search bar

When looking for a particular issue, you can use the search bar at the top of the issue page to filter issues based on the properties of the exceptions in that issue. This means, for example, if you search for "TypeError", we'll show you all issues where *any* exception grouped into the issue has a type of "TypeError". Keep this in mind, as you may see search results that seem unrelated to your search term, but it's due to at least one exception in the issue group matching your search.

The search bar provides two modes of filtering:
- Exact property filtering, which operates like property filters elsewhere in PostHog, allowing you to add terms like `where 'http_referer' is set` or `where 'library' equals 'web'`.
- Freeform text search, which does text matching for a subset of the error-tracking specific properties of the exception event

The results of both of these filter types (property filters and freeform search) are ANDed together, such that only exceptions that match all filters are included in the search results.

## Freeform text search

The freeform search splits the text you give it into tokens, and matches an exception even if *each* of the tokens in your search term appear in at least one of the following:
- The exception type
- The exception message
- The function names in the exception stack trace (if known)
- The file paths in the exception stack trace (if known)

For example, imagine you have an exception that looks like this:

```
TypeError: Cannot read property 'name' of undefined
    at Object.<anonymous> (/path/to/myfile.js:123:45)
    at Module._compile (module.js:653:30)
    at Object.Module._extensions..js (module.js:664:10)
    at Module.load (module.js:566:32)
    at tryModuleLoad (module.js:506:12)
    at Function.Module._load (module.js:498:3)
    at Function.Module.runMain (module.js:694:10)
    at startup (bootstrap_node.js:204:16)
    at bootstrap_node.js:625:3
```

and you search for the term `TypeError myfile.js`. The exception will match this search, as it contains `TypeError` (as the exception type) and `myfile.js` (as a file path in the stack trace). If you searched for `TypeError myfile.js abc`, the exception would not match, as the token `abc` does not appear anywhere in freeform search properties. If you want to search for longer strings, e.g. a particular exception message, you can group tokens into a single term using quotes, e.g. `"Cannot read property 'name' of undefined" myfile.js` would match, and `"Cannot read property of myfile.js"` would not, but `Cannot read property of myfile.js` would (because the tokens are ungrouped, and all of them appear *somewhere* in the exception search properties).

Keep in mind that exception events can have more than one exception in them, due to exception chaining or similar language features, and for the purpose of search, we put the types, messages, functions and file paths of all exceptions into one list, and match if the token appears in any of them. For example, if you had a chained exception with the messages `MyCustomError: Failed to load user` and `Cannot read property 'age' of undefined`, searching for `cannot read name` would match the exception, because it matches *one* of the exception messages (the "root" one).

## Improving search performance

We try to return results to you within a second, but sometimes if you're querying over large amounts of data, it may take longer. The following can improve the search performance:

- Limit the time range you're searching over - 7 days is usually enough to get a sense for the trends of an issue over time.
- Use freeform search rather than property filters - our freeform searches are generally faster than property filters, as the total amount of data processed is smaller.

If you find your queries timing out or taking more than 30 seconds, please let us know! We're always looking for benchmarks to improve against.

<NewsletterForm />
