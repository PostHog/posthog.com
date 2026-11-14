---
title: Queries are 2x faster, but we're making some event properties temporary
date: 2026-10-27
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
    - phil-haack
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/pasted_image_2026_10_26_T15_01_32_848_Z_84682dac82.png
featuredImageType: full
category: PostHog news
tags:
    - PostHog news
    - Infrastructure
seo:
    metaTitle: Queries are 2x faster, but we're making some event properties temporary
    metaDescription: "We're rebuilding how PostHog stores events. Queries are about a third faster on average, and up to 2x faster for common queries. Here's what changes on November 30."
---

## TL;DR

- We're rebuilding how PostHog stores events making queries about a third faster on average, and up to 2x faster for common queries.
- `$set`, `$set_once` and other short-lived debugging properties on events are now kept for 60 days instead of forever.
- `$feature_flag_called` events and `$feature/*` properties move to dedicated storage built for them. Most queries on flag calls keep working, but [a few need a change](#do-you-need-to-change-anything-for-flag-calls).
- We're removing some deprecated properties, mostly flag payloads and internal SDK state.
- We'll drop `null` values and empty objects from properties, and store a few built-in properties as text. [See what this changes](#how-some-property-values-change).
- These changes will also impact batch exports of events: flags arrive as one map, and some properties are left out or added as empty values. [See what changes for batch exports](#what-changes-for-batch-exports).
- Other person and event properties are unaffected. They stay on your persons and on every event, queryable as before.
- All of this takes effect on November 30.

## We're making queries faster

Every event you capture is stored in one very large table, and until now, we stored much of each event twice: once as raw JSON and again as columns for fast querying. That made the table slow to change and expensive to scan.

We're moving to a format that stores each property once, with its real type (numbers stay numbers, booleans stay booleans). This takes far less storage, and a query reads only the properties it asks for.

Here's what we measured by replaying real production queries against the new format:

| Query type | Speed-up |
| --- | --- |
| All queries (average) | ~35% faster |
| Filtering on event properties | ~50% faster |
| Session-based queries | ~2x faster |
| Heaviest session replay queries | Over 2x faster |

Replay, error tracking, AI observability, experiments and PostHog AI all got faster, but for transparency, queries over many custom properties improve least (a few may even be slightly slower).

## Why we're making some properties temporary

We looked at how event properties get queried. A small set, mostly SDK diagnostics and person-update instructions like `$set`, are useful for debugging right after an event arrives. After that these are almost never queried, but we stored it forever on every event.

`$set` and `$set_once` are the biggest part of this. They're instructions to our person-merging engine ("update this person's properties"), which we apply the moment an event arrives. The result is stored on the person and on every event as person properties. Keeping the raw instruction forever also meant storing the same data twice, both the properties and the instructions on how to change the properties.

From November 30 2026, we will keep these properties for 60 days before dropping them. This means you can still inspect them and use them to debug, but they won't be included on persons or events forever. This means less data stored twice in PostHog and faster queries for everyone. 

## Moving feature flag data to its own table

Another set of events and properties we store duplicates of is feature flags. Again, these are mostly used to debug flags and make sure they are working, but bog down the rest of events table doing so. To prevent this, we're moving `$feature_flag_called` events to their own table and then dropping them after 90 days. We're also changing `$feature/<flag>` from one property for each to one map per flag.

Here's more details on what this means:

| What | Before | After | Do you need to do anything? |
| --- | --- | --- | --- |
| `$feature_flag_called` events | Stored in the events table | Stored in a dedicated flag evaluations table, kept for 90 days | Only in a few cases. See [below](#do-you-need-to-change-anything-for-flag-calls) |
| `$feature/<flag>` properties | One property per flag on each event | One feature flags map per event | No. Existing insights and HogQL queries keep working |

### Do you need to change anything for flag calls?

Probably not. Insights, funnels, cohorts, actions, experiments, and SQL queries on `$feature_flag_called` keep working. From November 30, they show at most the last 90 days of flag calls. Destinations and workflows keep receiving `$feature_flag_called` events. [Paths](/docs/product-analytics/paths) that read every event, or that build steps from a SQL expression, no longer include `$feature_flag_called` events.

Three exceptions:

- **SQL with `SELECT *`, `SAMPLE`, or `FINAL`:** a query that reads `$feature_flag_called` with any of these returns an error. List the columns you need instead of `*`, and remove `SAMPLE` and `FINAL`.
- **Batch exports:** from November 30, exports of the `events` table will not include `$feature_flag_called` events. To keep exporting them, see [What changes for batch exports](#what-changes-for-batch-exports).
- **Legacy apps:** from November 30, legacy apps won't receive `$feature_flag_called` events. To keep receiving them, switch to the matching destination, such as [Customer.io](/docs/data-pipelines/destinations/customerio) or [RudderStack](/docs/data-pipelines/destinations/rudderstack).

We'll email you before your organization moves. For details, see [Where does PostHog store flag calls?](/docs/feature-flags/troubleshooting#where-does-posthog-store-flag-calls)

## What properties expire after 60 days

These properties stay queryable for 60 days after we receive the event, then we delete them. The event and all its other properties are kept as normal.

| Category | Properties |
| --- | --- |
| Person and group updates | `$set`, `$set_once`, `$unset`, `$group_set` |
| SDK diagnostics | All `$sdk_debug_*` properties, except `$sdk_debug_current_session_duration` |
| Feature flag diagnostics | `$feature_flag_request_id` |
| Replay diagnostics | `$debug_first_full_snapshot_timestamp`, `$snapshot_max_depth_exceeded`, `$sess_rec_flush_size` |
| Replay configuration | `$session_recording_remote_config`, `$session_recording_network_payload_capture`, `$session_recording_canvas_recording`, `$replay_script_config` |
| SDK transport | `$lib_rate_limit_remaining_tokens`, `$lib_custom_api_host` |

Good to know:

- **Person properties are not affected.** We apply `$set` and `$set_once` to the person as soon as the event arrives. The resulting person properties stay on every event and stay queryable as before. Only the raw instruction on the event expires.
- **The 60 days count from when we received the event**, not from the event's timestamp.
- **Historical events:** on November 30, events we received more than 60 days earlier (before roughly October 1) lose `$set`, `$set_once` and the other properties in this table. Their person properties are kept.
- **Not affected:** `$sent_at`, `$sdk_debug_current_session_duration` and `$debug_images` stay permanent, because people use them in longer-term queries and for error symbolication.

## What properties we're removing

These properties are deprecated, and we'll stop storing them on events.

| Category | Properties | Why |
| --- | --- | --- |
| Feature flag payloads | `$feature_flag_payload`, `$feature_flag_payloads`, `$feature_flag_bootstrapped_payload`, `$feature_flag_original_payload` | Almost never queried |
| Active flags list | `$active_feature_flags` | Duplicates `$feature/*`. Use those instead |
| Product tours and surveys | `ph_product_tours`, `$product_tours_activated`, `$product_tours_enabled_server_side`, `$surveys_activated` | Internal SDK state |
| Data pipeline debugging | `$transformations_succeeded`, `$transformations_skipped` | Internal debugging data |
| Raw LLM payloads | `$ai_input`, `$ai_output`, `$ai_output_choices`, `$ai_input_state`, `$ai_output_state`, `$ai_tools` | Already moved to a dedicated table (see below) |

Queries using `$active_feature_flags` keep working. HogQL translates them to the new feature flags map, so existing insights and queries won’t break. For new queries, use the map directly.

**Raw LLM payloads already live somewhere else.** `$ai_input`, `$ai_output` and the rest moved to a dedicated AI observability table with 30-day retention, which keeps very heavy data off the events table and AI observability affordable. Any copies still on the events table are legacy data older than 30 days, so removing them changes nothing in the product.

## How some property values change

We'll drop `null` values and empty objects from properties, and store a few built-in properties as text. You'll mostly see this where PostHog shows a whole event, like batch exports, the API, and event details.

| What you send | Before | After | Do you need to do anything? |
| --- | --- | --- | --- |
| A property set to `null`, like `{"plan": null}` | Stored as `null` | Dropped. Filters already treat `null` as not set, so they work as before. Whole events leave the property out instead of showing `null` | Only if a tool that reads your batch exports expects the `null` |
| An empty object, like `{"filters": {}}` | Stored as sent | Dropped. The property counts as not set everywhere, including in filters and whole events. An object that only holds `null` values counts as not set too | Only if you filter on whether the property is set, or a tool that reads your batch exports expects the object |
| A number in a built-in text property, like `$browser_version` or the group keys `$group_0` to `$group_4` | Stored as a number, like `155` | Stored as text, like `"155"`. An empty value (`""` or `[]`) in these properties is left out of whole events, except in [batch exports](#what-changes-for-batch-exports) | Only if a tool that reads your batch exports expects a number |

## What changes for batch exports

From November 30, [batch exports](/docs/data-pipelines/batch-exports) that use the [events model](/docs/data-pipelines/batch-exports#events-model) change in two ways:

- They no longer include `$feature_flag_called` events, because these events move to their own table. You can export that table separately (see below).
- They send `properties` and `person_properties` in the new storage format. This format stores feature flags more efficiently, so events with many flags are much smaller.

This applies to every destination. The persons and sessions models don't change.

Here's everything that changes in exported events:

| What | Before | After | What to do |
| --- | --- | --- | --- |
| `$feature_flag_called` events | Included | Not included | Create a second batch export with the [SQL query model](/docs/data-pipelines/batch-exports#sql-query-model) that exports `posthog.flag_evaluations`. This table keeps the last 90 days of flag calls |
| Feature flag values | One property for each flag, like `"$feature/new-checkout": true` | One `$feature_flags` object for each event, like `"$feature_flags": {"new-checkout": "true"}`. The values are text: `"true"`, `"false"`, or the variant name | Read flag values from `$feature_flags`, and compare them as text |
| `$active_feature_flags` | The list of active flags | Not included | Use the keys in `$feature_flags` that have a value other than `"false"` |
| Flag payloads, product tour and survey state, data pipeline debugging properties, and raw LLM payloads | Included | Not included. See [What properties we're removing](#what-properties-were-removing) for the full list | None. We no longer store these properties |
| `$set`, `$set_once`, and the other [properties that expire after 60 days](#what-properties-expire-after-60-days) | Included in `properties`. `$set` and `$set_once` also fill the `set` and `set_once` fields | Not included, and the `set` and `set_once` fields are empty | Use `person_properties`, which holds the person properties that these updates produce |
| A property set to `null`, like `{"plan": null}` | Included as `null` | Not included | Treat a missing property as not set |
| An empty object, like `{"filters": {}}` | Included as `{}` | Not included | Treat a missing property as not set |
| A number in a built-in text property, like `$browser_version` or `$group_0` to `$group_4` | A number, like `155` | Text, like `"155"` | Convert the value to a number if your tools need one |
| Built-in properties that an event didn't send, like `$browser` or `$exception_list` | Left out | Included with an empty value: `""` for text, `[]` for lists, and `{}` for `$feature_flags` | Treat `""`, `[]`, and an empty `$feature_flags` as not set |
| Built-in person properties that a person doesn't have, like `$initial_os` | Left out of `person_properties` | Included as `""` | Treat `""` as not set |

Here's an example of the `properties` of one event in a **batch export** before November 30:

```json
{
  "$browser": "Chrome",
  "$browser_version": 131,
  "$referrer": null,
  "$feature/new-checkout": true,
  "$feature/pricing-test": "variant-b",
  "$feature/legacy-nav": false,
  "$active_feature_flags": ["new-checkout", "pricing-test"],
  "$set": {"email": "user@example.com"}
}
```

And the same event in a **batch export** after November 30. The list of empty built-in properties is shortened:

```json
{
  "$browser": "Chrome",
  "$browser_language": "",
  "$browser_version": "131",
  "$device_type": "",
  "$exception_list": [],
  "$feature_flags": {"legacy-nav": "false", "new-checkout": "true", "pricing-test": "variant-b"},
  "$os": "",
  "$session_id": ""
}
```

## When

The changes take effect on November 30. Questions? [Get in touch with support](/support).
