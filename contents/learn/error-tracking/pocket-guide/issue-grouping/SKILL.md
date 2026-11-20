---
name: error-tracking-grouping
description: >
  Fix a misgrouped PostHog Error Tracking issue. Find the feature the exceptions share, group on an
  existing property when there is one, and add a shared property through SDK context when there
  isn't.
---

# Fix misgrouped issues

Read the current docs first. Every PostHog docs URL returns Markdown if you append `.md`:

- https://posthog.com/docs/error-tracking/grouping-issues.md
- https://posthog.com/docs/error-tracking/fingerprints.md
- https://posthog.com/docs/libraries/python.md (contexts)
- https://posthog.com/docs/libraries/node.md (contexts)
- https://posthog.com/docs/libraries/js/usage.md (super properties)

Walk each issue through these checks in order, and stop at the first yes.

## 1. Are the frames unresolved?

If the frames point into minified bundles, fix source maps first. Unresolved frames change with
every deploy, so one bug keeps opening new issues.

## 2. Does the grouping look right?

One issue should be one bug that one change fixes. Compare the exception type, message, and top
in-app frames of each issue. If each issue is one bug, leave it alone.

## 3. Does one issue mix different bugs?

A grouping rule or fingerprint is too broad. Narrow it rather than adding another rule.

## 4. Does a shared property exist?

Look for a feature every exception in the group has and no exception outside it has. Check the
exception event first: `$exception_types`, `$exception_values`, `$exception_sources`, the URL, and
any custom properties. Then check the code: the service, route, job, or feature where they're
thrown.

If an existing property identifies the group, add a grouping rule in Error Tracking settings.
Filter on that property, test the match count, and place the rule before broader rules. The first
matching rule wins. No deploy needed.

Rules only apply to new exceptions, so merge the issues that already exist from the issue list.

## 5. Does the code decide each case?

If the code must pick the group for each exception, set `$exception_fingerprint` at capture. For
autocaptured exceptions, set it in `before_send`. Also set `$issue_name` and `$issue_description`.

## 6. Otherwise, add a context property

Add one property and set it once, at the layer every exception passes through. Don't add it at each
throw site.

| Where the exceptions come from | Set the property with |
| --- | --- |
| A Python request, job, or task | `with new_context(): tag("key", value)` at the entry point |
| A Node request or job | `posthog.withContext({ properties: {...} }, fn)` in middleware |
| A browser app area | `posthog.register({...})` when the area loads |
| One known call site | Properties on `captureException(error, {...})` |

Then add a grouping rule on the new property, as in step 4.

## Rules

1. Don't group to route ownership or to filter. Use assignment rules for that. A property you add
   in step 6 works for both.
2. Never put a catch-all grouping rule first.

## Finally

List each issue you changed, the property you grouped on, and whether you added it. Say which
changes need a code deploy.
