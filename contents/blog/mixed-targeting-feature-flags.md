---
title: "Surgery on a load-bearing assumption"
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
  metaTitle: "How to do surgery on a load-bearing assumption"
  metaDescription: "How we changed a foundational assumption in PostHog's feature flag engine – and a playbook for doing it in your own systems."
---

X days ago, I enabled mixed targeting for feature flags in PostHog.

Before this released, you couldn't target a mix of user-level and group-level conditions in the same flag. For example, if you had a new feature and wanted to enable beta testing for all enterprise-tier companies *plus* a handful of specific users, you wouldn't have been able to do this. You had to pick either one: an entire group, or a list of users.

Here's what that looked like in the old flag filter payload:

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

There was a simple assumption baked into this logic: a feature flag targets exactly one entity type – either users or groups, never both. But it was never written down as a rule. It was just the shape of the data, and over years, everything downstream quietly organized itself around it.

Changing this required a special kind of surgery for two reasons:

1. First of all, these are feature flags we're talking about, which means nothing is allowed to ever go down. We're working on a live patient who needs to remain conscious during the procedure.
2. Second, the operation involves multiple "hidden" sites. It's not like a refactor with clear calls, or a migration with an explicit schema. This assumption lives in the gaps; between lines of code that never mentioned it directly, yet silently depends on it being true. In other words, I couldn't grep for the assumption the way I could grep for a field.

To tackle this, I took a two-phase approach with what a stent for safety, and then actual staging.


## Part 1: Placing the stent

To keep the system live throughout the procedure, I needed to first ensure all old flags would work exactly as before, while new flags would support the new functionality.

I first tried to move `aggregation_group_type_index` from the top level down to each condition, but I couldn't just delete the top-level field since millions of existing flags were actively using it. So, I created a stent that allowed both to exist at the same time.

The way this worked was a simple migration that copied the top-level value down to each condition. Then, at runtime, if the condition-level field is absent, the code just falls back to the top-level value.

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

The resulting code could be shipped, with effectively nothing changing for customers and users. Every `effective_aggregation` call still returns the same value the old code would have used. But now each condition *can* resolve its own aggregation whenever the rest of the system is ready.

This stent was the most important part of the whole project. It's what makes the rest of the surgery safe and possible.

## Part 2: Staging

At this point, the data model was in place, the migration had been run, and the evaluator was starting to read the new per-condition fields. 

However, even if the evaluator had been updated to _support_ per-condition aggregation types, it still didn't know how to actually handle them. In other words, if someone were to have created a mixed flag at that point, the evaluator wouldn't know what to do.

So to prevent anything from messing with the stent, I added validation to ensure all conditions agree on their aggregation type. It contained effectively the same constraints as the assumptions baked in before – no mixed targeting allowed – just expressed through the new per-condition field. 

The core idea behind this was to constrain first, then relax. That way, I could continue with all the complex parts of the actual surgery – rewiring the evaluation logic, separating property caches by entity type, teaching the system to skip a group condition instead of failing the whole flag, etc. – all behind the safety of this constraint that guarantees that prod is only seeing inputs it can already handle. 

Once the evaluator was fully ready, I could safely remove the validation. And that was the whole point. The final incision – the last part of the surgery – was a very safe and tiny step. All the risk had already been managed in the earlier phases. 

## Part 3: Post-op complications

After the evaluator shipped, I figured I was done and started working on other things. But then I looked at our reason scoring function.

Something wasn't right.

The way our scoring works is that when a flag doesn't match, we return a reason explaining why. Each reason has a priority score, and we surface the highest-priority one across all conditions. The old scoring looked like this:

```rust
FeatureFlagMatchReason::NoGroupType => 3,
FeatureFlagMatchReason::OutOfRolloutBound => 2,
FeatureFlagMatchReason::NoConditionMatch => 1,
```

I was seeing that `NoGroupType` ranked highest. In the old system, this was correct – if a group flag is evaluated without group keys, then every condition returns `NoGroupType`, so "Hey, you forgot to send groups" is the most useful thing to tell the caller.

With mixed targeting, a _person_ condition can return `NoConditionMatch` while a _group_ condition returns `NoGroupType` in the same evaluation. The problem was that the old scoring would surface "Hey, you forgot to send groups" even though the actual answer with this new logic should have been "Hey, your person properties didn't match." 

In other words, the real evaluation result was getting buried by a skipped condition.

The fix was just three lines:

```rust
FeatureFlagMatchReason::OutOfRolloutBound => 3,
FeatureFlagMatchReason::NoConditionMatch => 2,
FeatureFlagMatchReason::NoGroupType => 1,
```

Notice how `aggregation_group_type_index` – the original top-level condition – doesn't appear anywhere in this function? You would never have been able to find it by searching for the field. So while the function was technically correct, it was the correct implementation for a world that no longer existed. 

It's yet another example of how this assumption was silently encoded everywhere, even in just the simple relative ordering of three integers in a scoring function. Quite literally impossible to find until you know how to look. I found a few more places like this:

- The blast radius endpoint returned either user counts or group counts, never both. 
- The frontend rendered one unit label per flag.
- The SDK request payloads assumed one hash key type. 

None of them referenced the `aggregation_group_type_index` field. All of them cascaded from the assumption.

## Lessons learned

From my experience, I learned that these types of hidden assumptions tend to hide in three places: 

1. **Ranking and priority logic** like the scoring function – anything that defines an ordering over outcomes
2. **API response shapes** like the blast radius endpoint – anything that assumes a fixed cardinality in its return type
3. **UI rendering code** like the unit labels – anything that maps data to a display format. 

For anyone else out there doing this kind of surgery, those are the places I'd audit first.