---
title: "Surgery on a load-bearing assumption"
date: 2026-04-10
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - dylan-martin
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-engineering-blog.png
featuredImageType: full
category: Engineering
tags:
  - Inside PostHog
  - Engineering
seo:
  metaTitle: "Surgery on a load-bearing assumption: migrating a feature flag schema without breaking evaluation"
  metaDescription: "How we changed a foundational assumption in PostHog's feature flag engine -- and a playbook for doing it in your own systems."
---

I recently shipped [mixed targeting](/docs/feature-flags/user-and-group-targeting) for [feature flags](/feature-flags) -- letting a single flag target both users and groups at the same time. 15 PRs across four repos. The part I keep thinking about is how hard it was to find all the places the old assumption lived.

Our flag evaluation engine assumed that a flag targets exactly one entity type. Here's what a flag's filter payload looked like:

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

`aggregation_group_type_index` lives at the top level. Every condition in `groups` inherits it. The evaluator loads one set of properties, hashes one type of key, counts one type of entity. All of it flows from that single top-level value.

That assumption had been true for years, and it had quietly spread into code that never referenced the field directly.

You can grep for a field name. You can't grep for an assumption.

## The stent

Any surgery on a running system starts with keeping the patient alive. I needed old flags to keep working exactly as before while new flags could do something different.

I moved `aggregation_group_type_index` from the top level down to each condition, but I couldn't delete the top-level field -- millions of existing flags still use it. So both exist at the same time. A migration copies the top-level value down to each condition, and the code falls back to the top-level value whenever the condition-level field is absent.

On the Rust side, "absent" and "null" mean different things here. Absent means legacy flag, fall back. Null means explicitly person-aggregated. A number means group-aggregated. That's three states in a type that usually represents two:

```rust
/// Outer Option: "field absent" (legacy) vs "field present".
/// Inner Option: null (person) vs Some(idx) (group).
pub aggregation_group_type_index: Option<Option<i32>>,
```

A three-variant enum would be more readable, but the JSON wire format is already `null` or a number, and `Option<Option<i32>>` maps to that directly with serde's defaults. A custom enum would need a hand-written deserializer to produce the same JSON shape, which is more code for the same result. Ugly, but the path of least resistance when you're keeping an existing API contract intact.

The resolution logic is simple:

```rust
pub fn effective_aggregation(&self, flag_level: Option<i32>) -> Option<i32> {
    match self.aggregation_group_type_index {
        Some(inner) => inner,  // condition says what it wants
        None => flag_level,    // legacy flag, use the old field
    }
}
```

Ship this to production and nothing changes. Every `effective_aggregation` call returns the same value the old code would have used. But now each condition *can* resolve its own aggregation whenever the rest of the system is ready.

The stent is the most important part of the whole project. It's what makes the rest of the surgery safe.

## The staging

With the stent in place, I added validation that all conditions must agree on their aggregation type. Same constraint as before, just expressed through the new per-condition field.

**Constrain first, then relax.**

The data model is in place, the migration has run, the evaluator is starting to read the new field. But nobody can create a flag configuration the evaluator can't handle yet, because the validation closes that window. You do the hard work -- rewiring the evaluation logic, separating property caches by entity type, teaching the system to skip a group condition instead of failing the whole flag -- behind the safety of a constraint that guarantees you're only seeing inputs you can already handle.

Then you remove the constraint. One small diff. Mixed targeting is live.

The whole point is that the last incision is tiny. All the risk was managed in the earlier steps.

## Post-op

After the evaluator shipped, I figured I was mostly done. I started working on other things.

Then I looked at the reason scoring function.

When a flag doesn't match, we return a reason explaining why. Each reason has a priority score, and we surface the highest-priority one across all conditions. The old scoring:

```rust
FeatureFlagMatchReason::NoGroupType => 3,
FeatureFlagMatchReason::OutOfRolloutBound => 2,
FeatureFlagMatchReason::NoConditionMatch => 1,
```

`NoGroupType` ranked highest. In the old world, this was correct. If a group flag is evaluated without group keys, every condition returns `NoGroupType`, and "you forgot to send groups" is the most useful thing to tell the caller.

With mixed targeting, a person condition can return `NoConditionMatch` while a group condition returns `NoGroupType` in the same evaluation. The old scoring surfaces "you forgot to send groups" when the actual answer is "your person properties didn't match." A real evaluation result gets buried by a skipped condition.

The fix was three lines:

```rust
FeatureFlagMatchReason::OutOfRolloutBound => 3,
FeatureFlagMatchReason::NoConditionMatch => 2,
FeatureFlagMatchReason::NoGroupType => 1,
```

`aggregation_group_type_index` doesn't appear anywhere in this function. You would never find it by searching for the field. The function was correct -- a correct implementation of a world that no longer existed. The assumption was encoded in the relative ordering of three integers in a scoring function. Invisible until you know to look.

I found a few more places like this. The blast radius endpoint returned either user counts or group counts, never both. The frontend rendered one unit label per flag. The SDK request payloads assumed one hash key type. None of them referenced the field. All of them depended on the assumption.

In my experience, assumptions tend to hide in three places: **ranking and priority logic** (like the scoring function -- anything that defines an ordering over outcomes), **API response shapes** (like the blast radius endpoint -- anything that assumes a fixed cardinality in its return type), and **UI rendering code** (like the unit labels -- anything that maps data to a display format). If you're doing this kind of surgery, those are the places I'd audit first.
