---
title: "How I performed surgery on a load-bearing assumption"
date: 2026-04-22
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - dylan-martin
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/580944574_1ff3a5f8_0cc0_4a25_8ba5_7e532793c1fb_0b30cb5f50.jpg
featuredImageType: full
category: Engineering
tags:
  - Inside PostHog
  - Engineering
seo:
  metaTitle: "How I performed surgery on a load-bearing assumption"
  metaDescription: "You can grep for a field. You can't grep for the assumption it encodes. Here's how we changed a foundational one in PostHog's feature flag engine."
---

PostHog's feature flag engine had a rule nobody had written down: a flag targets exactly one entity type — either users or groups, never both.

Here's what that looked like in the flag filter payload:

```json
{
  "aggregation_group_type_index": 0,
  "groups": [
    {
      "properties": [{"key": "plan", "value": "enterprise", "type": "group"}],
      "rollout_percentage": 50
    },
    {
      "properties": [{"key": "region", "value": "us", "type": "group"}],
      "rollout_percentage": 100
    }
  ]
}
```

`aggregation_group_type_index` lived at the top level, and every condition in `groups` inherited it. The evaluator would load one set of properties, hash one type of key, and count only one type of entity. Everything flowed from that single top-level value.

I needed to break this assumption to support mixed targeting, i.e. rolling out a flag to enterprise-tier companies *and* a handful of specific users at the same time. The field itself was easy to find, but the assumption encoded it was not – it had propagated into ranking functions, API response shapes, and UI rendering code, none of which referenced the field directly.

You can grep for a field, but it's a lot harder to grep for an _assumption_.

Changing it was harder than it sounds for two reasons. First, these are feature flags — nothing is allowed to regress in behavior, because feature flags are what other teams use to safely ship *their* changes. Second, the sites where the assumption lived had to be found and updated individually, since most of them couldn't be discovered by searching for the field name.

I broke this into two phases: I put a stent in place to keep the system stable, then I operated behind it.

## Part 1: Placing the stent

I first tried to move `aggregation_group_type_index` from the top level down to each condition, but I couldn't just delete the top-level field — a huge volume of existing flags were actively using it. So I created a stent: a backward-compatible data shape that let both exist at the same time.

The migration copied the top-level value down to each condition. Then, at runtime, if the condition-level field is absent, the code falls back to the top-level value.

On the Rust side, "absent" and "null" mean different things here. Absent means legacy flag — fall back. Null means explicitly person-aggregated. A number means group-aggregated. That's three states in a type that usually represents two:

```rust
/// Outer Option: "field absent" (legacy) vs "field present".
/// Inner Option: null (person) vs Some(idx) (group).
pub aggregation_group_type_index: Option<Option<i32>>,
```

A three-variant enum would be more readable, but the JSON wire format is already `null` or a number, and `Option<Option<i32>>` maps to that directly with serde's defaults. A custom enum would need a hand-written deserializer to produce the same JSON shape, which is more code for the same result. Ugly, but the path of least resistance when you're keeping an existing API contract intact.

The resolution logic asks each condition "what entity type do you target?" — and if the condition doesn't know (because it's a legacy flag), it defers to the old top-level value:

```rust
pub fn effective_aggregation(&self, flag_level: Option<i32>) -> Option<i32> {
    match self.aggregation_group_type_index {
        // condition says what it wants:
        // Some(None) = explicitly person-aggregated
        // Some(Some(idx)) = group-aggregated with group type idx
        Some(inner) => inner,
        None => flag_level,  // legacy flag, fall back to the old top-level field
    }
}
```

This shipped with effectively nothing changing for customers. Every `effective_aggregation` call returned the same value the old code would have used. But now each condition *could* resolve its own aggregation whenever the rest of the system was ready.

## Part 2: Operating behind the stent

With the stent holding the old behavior in place, I could start the actual rewiring.

Even with the new data model in place, the evaluator didn't know how to handle mixed flags yet. If someone had created one, the evaluator would have choked on it.

So I added validation that re-imposed the old constraint: all conditions in a flag must agree on their aggregation type. Same rule as before, just expressed through the new per-condition field. This let me do all the complex rewiring — separating property caches by entity type, teaching the system to skip a group condition instead of failing the whole flag — while prod only ever saw inputs it already knew how to handle.

Constrain first, then relax. I built the new plumbing behind a valve that only opened when everything was ready. The final step was removing that validation — the smallest and least scary change in the whole project, which is exactly what you want from a final step.

## The assumptions you can't grep for

After the evaluator shipped, I figured I was done. Then I looked at our reason scoring function.

When a flag doesn't match, we return a reason explaining why. Each reason has a priority score, and we surface the highest-priority one across all conditions. The old scoring:

```rust
FeatureFlagMatchReason::NoGroupType => 3,
FeatureFlagMatchReason::OutOfRolloutBound => 2,
FeatureFlagMatchReason::NoConditionMatch => 1,
```

`NoGroupType` ranked highest. In the old world, this was correct — if a group flag is evaluated without group keys, every condition returns `NoGroupType`, so "you forgot to send groups" is the most useful thing to tell the caller.

With mixed targeting, a person condition can return `NoConditionMatch` while a group condition returns `NoGroupType` in the same evaluation. The old scoring surfaced "you forgot to send groups" even when the real answer was "your person properties didn't match." The actual result was getting buried by a skipped condition.

The fix was three lines:

```rust
FeatureFlagMatchReason::OutOfRolloutBound => 3,
FeatureFlagMatchReason::NoConditionMatch => 2,
FeatureFlagMatchReason::NoGroupType => 1,
```

`aggregation_group_type_index` doesn't appear anywhere in this function. You would never find it by searching for the field. The function was technically correct — it was just the correct implementation for a world that no longer existed.

This is the thing about silently-encoded assumptions: they live in the relative ordering of three integers, in the shape of an API response, in the label a component renders. The scoring function was the most vivid example. The same pattern showed up in three other places.

**The blast radius endpoint** estimated how many users or groups a flag change would affect. It returned a single `count` field and a `unit` string. A mixed flag needs both a user count and a group count — the response shape itself couldn't represent the answer. It had to become a list of counts, one per aggregation type.

**The frontend** rendered a single unit label next to each flag — "50% of users" or "50% of organizations." With mixed targeting, one flag rolls out to users and organizations at potentially different percentages. The component had to learn to render per-condition labels instead of one flag-wide label.

**The SDK request payloads** sent a single `distinct_id` plus one `groups` map, implicitly assuming the server would hash against one key type. Once a flag could evaluate both person and group conditions in the same call, the SDKs had to send both consistently, and the server-side decoder had to stop short-circuiting once it found "the" key.

None of these referenced `aggregation_group_type_index`. All of them broke when the assumption behind it changed.

---

If you're about to change a load-bearing assumption in your own system, here's the audit I wish I'd done upfront:

1. Grep for the field itself — that's the easy part.
2. Find every ranking or priority function. Check what ordering it assumes and whether that ordering is still valid in the new world.
3. Find every API endpoint that returns a single value where the new world might need multiple.
4. Find every UI component that renders one label, one unit, or one count for the thing you're about to pluralize.
5. Build a backward-compatible data shape before you touch any of the above.
