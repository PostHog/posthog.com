---
title: Designing events for per-entity metrics
sidebar: Handbook
showTitle: true
---

A field guide for customer-facing roles helping customers instrument events so that "X per Y" metrics – roles per user, items per order, messages per conversation, API calls per account – can be built with PostHog's native aggregations instead of HogQL workarounds.

## The trap: analysis grain ≠ event grain

Almost every tricky instrumentation question comes down to one mismatch: the customer wants a metric about a fine-grained thing (per user) but instruments a coarse-grained event (per submission). The event fires once when the user acts, but the question is about a unit *inside* that action.

When the two grains disagree, people reach for one of two shortcuts – **packing values into an array** or **sending a pre-calculated number**. Both feel reasonable in the moment, and both quietly cost the customer self-service later. The fix is almost always to change the *shape and grain* of the events, not to do math on the way in or after the fact.

> **Running example.** A customer is instrumenting an invite flow: one form where a user invites several people and assigns one or more roles to each, then submits once. They want three metrics – **users invited per submission**, **roles assigned per user**, and **time to complete the flow**. The whole guide is built around getting these right.

## Rule 1: Match the event grain to the unit of analysis

If the metric is "per user," emit one event per user. The form submits once, but you loop over the invitees on submit and fire a **child event for each one**. That single move is what unlocks the per-user math – every downstream aggregation now has one row per unit you actually care about.

```js
const submissionId = crypto.randomUUID() // one ID for the whole batch

users.forEach((u) => {
  const rolesAssigned = u.roleAssignments.length || (u.role ? 1 : 0)
  posthog.capture("invitation_recipient_added", {
    submission_id: submissionId, // ties each invitee back to the batch
    roles_assigned: rolesAssigned, // scalar → native math (see Rule 2)
    roles: u.roleAssignments?.map((r) => r.name) ?? (u.role ? [u.role] : []),
  })
})
```

The entity you're measuring "per" doesn't have to be a user – it can be an account, a session, or any custom object. The rule is the same: emit at the grain you want to analyze. (For account- or workspace-level rollups, reach for [group analytics](/docs/product-analytics/group-analytics).)

## Rule 2: Send scalars for anything you'll do math on; arrays read as strings

This is the one that bites people. If you send a property as an array – `roles_per_user: [2, 1]` – PostHog's UI treats it as one opaque string. You cannot average, sum, or max it in the insight builder. You'd have to drop into the [SQL editor](/docs/sql) and parse it by hand, which is more than most operators and PMs want to take on.

Send a **scalar** instead. A numeric `roles_assigned: 2` on each child event gives you native [count, sum, average, maximum, and percentile](/docs/product-analytics/trends/aggregations) aggregations with zero HogQL.

Keep the array too, when a per-value breakdown is useful:

- `roles_assigned` (number) → the scalar that powers count / sum / average / max. ✅
- `roles` (string array) → the per-role breakdown still works, but only with some finesse: you'll build [insights](/docs/product-analytics/trends/breakdowns) that use HogQL array functions like `arrayJoin` to fan the array out into one row per value.

So the array isn't wrong – it's just the power-user path. Lead with the scalar for self-service, and add the array when someone needs to slice by the individual values.

## Rule 3: Don't pre-aggregate on the way in

It's tempting to compute `average_roles_per_user` or `max_roles_per_user` client-side and send that. Resist it. A pre-aggregated number locks the customer into exactly the cuts you anticipated – they can't later ask for the median, the 90th percentile, or the distribution, and they can't break it down by anything.

Send the **atomic scalar** per child event and let PostHog aggregate on demand. Raw and granular going in = maximum flexibility and self-service coming out.

## Rule 4: Stitch related events together with a shared ID

Generate one `submission_id` (a UUID) per batch and stamp every child event with it. Now the children are linked to each other and back to the parent, so you can always climb from "roles per user" up to "which submission" – or filter one submission's worth of events – without guessing.

## Rule 5: Use a parent + child pair when you need funnels *and* per-entity math

A [funnel](/docs/product-analytics/funnels) needs one clean signal per submission to key a step off of. The per-user distribution needs one event per user. Those are different grains, so emit **both** events, tied by `submission_id`:

```js
const submissionId = crypto.randomUUID()

// Parent: one per submission — the funnel's terminal step
posthog.capture("invitation_submitted", {
  submission_id: submissionId,
  user_count: users.length,
  submitted_at: new Date().toISOString(),
})

// Child: one per invitee — carries the per-user detail
users.forEach((u) => {
  const rolesAssigned = u.roleAssignments.length || (u.role ? 1 : 0)
  posthog.capture("invitation_recipient_added", {
    submission_id: submissionId,
    roles_assigned: rolesAssigned,
    roles: u.roleAssignments?.map((r) => r.name) ?? (u.role ? [u.role] : []),
  })
})
```

- **`invitation_submitted`** (parent) – one per submission. It's the terminal step of the funnel and the home for submission-level numbers like `user_count`.
- **`invitation_recipient_added`** (child) – one per invitee. It carries the per-user detail (`roles_assigned`, `roles`).

The parent answers submission-level and funnel questions; the child answers per-user questions. Together they cover both without compromise.

## Rule 6: Derive durations from timestamps, don't compute them client-side

For "time to complete the flow," send the raw `submitted_at` timestamp and pair it with the `$pageview` timestamp PostHog captures automatically. Compute the delta in the analysis layer rather than shipping a pre-computed duration – same logic as Rule 3, and it keeps the raw timestamps available for other questions.

## The payload, at a glance

**Child – `invitation_recipient_added`** (one per invitee)

| Property         | Type            | Why it's shaped this way                                             |
| ---------------- | --------------- | ------------------------------------------------------------------- |
| `submission_id`  | string (UUID)   | Ties the invitee back to its submission and to the parent event     |
| `roles_assigned` | number          | Scalar – enables native count / sum / average / max / percentiles   |
| `roles`          | string array    | Per-role breakdown, via HogQL `arrayJoin`                           |

**Parent – `invitation_submitted`** (one per submission)

| Property        | Type              | Why it's shaped this way                                          |
| --------------- | ----------------- | ----------------------------------------------------------------- |
| `submission_id` | string (UUID)     | Batch identifier and funnel key                                   |
| `user_count`    | number            | Users invited in this submission                                  |
| `submitted_at`  | string (ISO 8601) | Paired with the auto-captured `$pageview` time to derive duration |

With this shape, each of the customer's original goals maps to a native insight: **users invited per submission** is `user_count` (or a count of children grouped by `submission_id`); **roles assigned per user** is the average of `roles_assigned` across the child events; **which roles are most assigned** is a breakdown of `roles`; and **time to complete** is `submitted_at` minus the `$pageview` timestamp.

## Cheat sheet: When a customer hands you an array

- Want to **sum / average / max / count** it? → send a **scalar** on a child event.
- Want to **break down by its values**? → keep the **string array** and use HogQL, or emit **one event per value**.
- Want **both**? → send both, exactly as in the example above.

## The one-line version

**Instrument at the grain you want to analyze, send scalars for anything you'll do math on, and never pre-aggregate.**
