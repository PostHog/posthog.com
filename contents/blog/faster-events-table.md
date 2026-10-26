---
title: A faster events table (and what's changing)
date: 2026-10-26
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
    - lizzie-epton
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-engineering-blog.png
featuredImageType: full
category: PostHog news
tags:
    - PostHog news
    - Infrastructure
seo:
    metaTitle: A faster events table (and what's changing)
    metaDescription: "We're rebuilding how PostHog stores events. Queries are about a third faster on average, and up to 2x faster for common queries. Here's what changes on November 30."
---

## TL;DR

- We're rebuilding how PostHog stores events. Queries are about a third faster on average, and up to 2x faster for common queries.
- `$set`, `$set_once` and other short-lived debugging properties on events are now kept for 60 days instead of forever.
- Person properties are unaffected. They stay on your persons and on every event, queryable as before.
- `$feature_flag_called` events and `$feature/*` properties move to dedicated storage built for them.
- We're removing some deprecated properties, mostly flag payloads and internal SDK state.
- All of this takes effect on November 30.

## What's happening

Every event you send is stored in one very large table. Until now we stored much of each event twice: once as raw JSON and again as columns for fast querying. That made the table slow to change and expensive to scan.

We're moving to a format that stores each property once, with its real type (numbers stay numbers, booleans stay booleans). It takes far less storage, and a query reads only the properties it asks for.

Here's what we measured by replaying real production queries against the new format:

| Query type | Speed-up |
| --- | --- |
| All queries (average) | ~35% faster |
| Filtering on event properties | ~50% faster |
| Session-based queries | ~2x faster |
| Heaviest session replay queries | Over 2x faster |

Replay, error tracking, LLM analytics, experiments and PostHog AI all got faster. Queries over many custom properties improve least, and a few may be slightly slower.

## Why some data becomes temporary

We looked at how event properties get queried. A small set, mostly SDK diagnostics and person-update instructions like `$set`, is useful for debugging right after an event arrives. After that it's almost never queried, but we stored it forever on every event.

`$set` and `$set_once` are the biggest part of this. They're instructions to our person-merging engine ("update this person's properties"), which we apply the moment an event arrives. The result is stored on the person, and on every event as person properties. Keeping the raw instruction forever as well meant storing the same data twice.

From November 30, we keep these properties for 60 days. You can still inspect them while debugging, and we no longer store and scan the same data twice. The tables below list every change.

## What's moving

These stay available, in a new place.

<!-- TODO: confirm flag evaluations retention ([N] days) and the batch exports row before publishing -->

| What | Before | After | Do you need to do anything? |
| --- | --- | --- | --- |
| `$feature_flag_called` events | Stored in the events table | Stored in a dedicated flag evaluations table, kept for [N] days | Only if you query these events directly in SQL |
| `$feature/<flag>` properties | One property per flag on each event | One feature flags map per event | No. Existing insights and HogQL queries keep working |
| `null` property values | Stored as `null` | Stored as "not set". Exports and event details still show `null` | No. Queries already treat `null` and "not set" the same |
<!-- | Batch exports | Full event properties | [Export format changes – confirm before publishing] | [TBC] | -->

## What expires after 60 days

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

## What we're removing

These properties are deprecated, and we'll stop storing them on events.

| Category | Properties | Why |
| --- | --- | --- |
| Feature flag payloads | `$feature_flag_payload`, `$feature_flag_payloads`, `$feature_flag_bootstrapped_payload`, `$feature_flag_original_payload` | Almost never queried |
| Active flags list | `$active_feature_flags` | Duplicates `$feature/*`. Use those instead |
| Product tours and surveys | `ph_product_tours`, `$product_tours_activated`, `$product_tours_enabled_server_side`, `$surveys_activated` | Internal SDK state |
| Data pipeline debugging | `$transformations_succeeded`, `$transformations_skipped` | Internal debugging data |
| Raw LLM payloads | `$ai_input`, `$ai_output`, `$ai_output_choices`, `$ai_input_state`, `$ai_output_state`, `$ai_tools` | Already moved to a dedicated table (see below) |

**Raw LLM payloads already live somewhere else.** `$ai_input`, `$ai_output` and the rest moved to a dedicated LLM analytics table with 30-day retention, which keeps very heavy data off the events table and LLM analytics affordable. Any copies still on the events table are legacy data older than 30 days, so removing them changes nothing in the product.

## When

The changes take effect on November 30. Questions? [Get in touch with support](/support).
