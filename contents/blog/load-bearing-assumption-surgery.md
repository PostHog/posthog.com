---
title: "Delegate the code, own the harness"
date: 2026-07-27
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - dylan-martin
category: Engineering
tags:
  - Inside PostHog
  - Engineering
seo:
  metaTitle: "Delegate the code, own the harness"
  metaDescription: "What a risky feature flag migration taught me about deciding which work to delegate to coding agents – and which parts you still need to own."
---

Last year, I changed PostHog's feature flag engine so a single flag could target both people and groups. The code touched Rust, Python, the frontend, and several SDKs. I used coding agents throughout the project, but I didn't hand them the migration and wait for a pull request.

Instead, I tried to own the harness: the types, interfaces, constraints, and failure behavior that decided what the system actually did. Once those were in place, agents could fill in a lot of the code around them.

This distinction sounds obvious now. It wasn't obvious while I was doing the work.

## The rule nobody had written down

PostHog's feature flag engine had a foundational rule: a flag targeted exactly one type of entity. It could target people, or it could target groups like organizations, but never both.

That rule was encoded in a field called `aggregation_group_type_index`. It lived at the top level of a flag, so every condition underneath it inherited the same entity type. The evaluator loaded one set of properties, hashed one type of key, and returned one type of count.

Generic property targeting meant moving that choice down to each condition. A flag could then roll out to enterprise organizations _and_ a handful of individual users at the same time.

Moving the field was easy. Migrating the rule behind it was not.

Existing flags had to evaluate exactly as they did before. This is sensitive code: feature flags are the mechanism other engineers use to reduce the risk of their own releases. A subtle change in evaluation behavior could quietly put users into the wrong variant.

The assumption also existed in places that never referenced `aggregation_group_type_index`. It shaped API responses, UI labels, cache behavior, and the priority of error reasons. I could grep for the field. I couldn't grep for the worldview it had created.

This was not a good task to delegate whole.

## I started with the shape

Before changing the evaluator, I defined the compatibility contract.

The old top-level field stayed in place. I added a condition-level version next to it, then made the evaluator fall back to the old value when the new one was absent. On the Rust side, that required an admittedly ugly type:

```rust
pub aggregation_group_type_index: Option<Option<i32>>,
```

The outer `Option` distinguished a legacy condition where the field was absent from a new condition where the field was present. The inner `Option` distinguished person targeting (`null`) from group targeting (an index).

I could have hidden this behind a nicer enum, but the awkward type represented the existing JSON contract directly. Preserving that contract mattered more than making the new code aesthetically pleasing.

I also kept the old rule as validation: even though the data model could now represent mixed targeting, all conditions still had to agree on one entity type. That let me ship the new shape before the evaluator was capable of using all of it.

This was the harness. The types described what states were possible. The fallback defined how old flags behaved. The validation stopped new states from reaching production before the system could handle them.

Only after those decisions were fixed did I start delegating implementation work.

## Agents filled in the bodies

There was plenty to delegate. The new targeting logic had to propagate through our JavaScript, PHP, Ruby, and Flutter SDKs. There were types to update, payloads to thread through, tests to write, and repetitive call sites to change.

Agents were useful here because the desired behavior was already specified. Each SDK needed to express the same contract, and its tests could verify that it did. The work was broad, but it was locally checkable.

That is different from deciding what the contract should be.

An agent could add a nested field to four SDKs faster than I could. It could not tell me whether “absent” should mean “fall back to the flag-level value,” or whether an explicit `null` should mean person targeting. Those choices depended on the history of our API, the behavior of existing flags, and how we planned to sequence the rollout.

The more of that context I encoded into the harness, the more useful the agents became. They amplified the structure that was already there.

## I kept the failure behavior

The parts I held onto were the places where locally reasonable code could still produce globally wrong behavior.

The best example was our reason-scoring function. When a flag does not match, the evaluator collects reasons from its conditions and returns the highest-priority one. In the old world, `NoGroupType` had the highest priority. If you evaluated a group flag without providing a group key, that was the most useful answer.

Mixed targeting changed the meaning of that ordering. A person condition could legitimately return `NoConditionMatch` while a group condition returned `NoGroupType`. The old priority would report the missing group even when the person's properties were the actual reason the flag did not match.

The fix was three lines:

```rust
FeatureFlagMatchReason::OutOfRolloutBound => 3,
FeatureFlagMatchReason::NoConditionMatch => 2,
FeatureFlagMatchReason::NoGroupType => 1,
```

Nothing in this function referenced the field I was migrating. The code was correct for the old system and wrong for the new one.

This is where system sense mattered. Tests around the new data shape would not necessarily reveal that an error reason elsewhere had become misleading. Neither would a repository search. I had to understand what the system promised callers, then decide which failure should win.

The same pattern appeared in our blast-radius endpoint, which could only return one count and one unit, and in the frontend, which assumed every condition used the same label. These were not difficult edits. Finding them, and knowing how they should behave, was the work.

## Delegate the code, own the harness

I don't think the lesson is that agents should stay away from sensitive systems. They helped me move faster across a migration with a wide surface area.

The lesson is that delegation should begin after you decide what controls the system.

Design the types and APIs yourself. Define compatibility before implementation. Own validation, errors, rollout modes, and the paths that stop the new behavior. Then let agents fill bodies, propagate the contract, and write the plumbing around it.

This requires prior system sense. Agents amplify structure, including bad structure. If the boundaries are wrong, they can produce clean code, passing tests, and a complete implementation of the wrong idea.

For this migration, the highest-leverage work wasn't typing the code. It was deciding what I refused to delegate.
