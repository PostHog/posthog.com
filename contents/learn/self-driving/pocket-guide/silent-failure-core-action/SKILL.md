---
name: signals-scout-silent-failure
description: >
  Watches the completion rate of one named core action for breaks from its own norm, and
  reports the likely cause – with swallowed exceptions as the first thing it looks for.
allowed_tools:
  - emit_report
  - edit_report
---

# Silent failure in the core action

Watch one named flow for failures that never surface as errors.

The mechanism this is built around: **something caught the failure.** A retry wrapper, a
`try`/`catch` with a log line, a fallback that returns an empty result. The user sees a spinner
and then nothing, no error page renders, no alert fires, and the only trace is the completion
rate quietly dropping. That's what makes it silent, and it's what this scout looks for first.

Narrower than `signals-scout-anomaly-detection`, which builds a durable watchlist of the
insights a team actually looks at and scores each one against a seasonality-matched baseline.
This one watches a single flow you name, every run, whether or not anyone has built an insight
for it. If the core action is already on that scout's watchlist and you're hearing about breaks
in time, you don't need both.

Daily is the fleet default. For a flow where hours matter, set `run_interval_minutes` to 60 when
you create the scout – the tradeoff is that hourly buckets are noisier, so raise the volume
floor below to match.

## Discriminator

Emit a report when the **completion rate** – completions divided by attempts – breaks from its
trailing two-week norm for the same day of week. Write nothing when attempts and completions
moved together and the rate held: that's a traffic change, not breakage.

Attempts are the disqualifier check, not half the trigger. Watching two counts separately leaves
you stuck the moment both move a little; watching the rate doesn't.

### The bar

A starting point, to be tuned against what this flow's data actually does:

- a completion rate **≥10 points below** its trailing 14-day median for the same weekday, on a
  complete bucket, and
- **≥500 attempts** in that bucket.

The volume floor matters more than the threshold. A completion rate computed on 40 attempts is
noise, and a scout that fires on it is exactly the crying-wolf failure the discriminator is
meant to prevent. If the flow doesn't clear the floor, widen the bucket rather than lowering the
bar, and write what you chose to the scratchpad.

## Explore

1. **Confirm the instrumentation still works.** Before anything else: is the completion event
   still firing at all, and was it renamed, moved, or removed in the deploy window? A broken
   tracking call looks identical to a broken product – attempts flat, completions gone – and it
   is the most likely false positive for this scout. Check the event's total volume across all
   properties, not just within the flow. `signals-scout-observability-gaps` watches this kind of
   drift more broadly.
2. **Check whether the drop is uniform.** Did the completion rate fall across every segment, or
   only inside a new or shifted one? Steady attempts with a falling rate is also the shape of a
   traffic-composition change – a campaign bringing lower-intent users, a new geo, a bot wave.
   Nothing is broken in that case, and the rate framing alone won't catch it. Break down by
   source, device, geo, and new-vs-returning before going further.
3. **Find what was caught.** Look for new or spiking error-tracking issues on the same code
   path, weighting **handled** exceptions – the ones that never reached the user. A caught
   timeout, a retry that exhausted, a fallback that returned empty. This is the mechanism the
   whole scout is built around, so look here before looking anywhere else.
4. **Check the failures that never reached your server.** If Error Tracking is clean, the failure
   may not have made it out of the browser: a dropped request, an ad blocker or CSP rule
   blocking the call, the tab closing mid-request. Session Replay is the only thing that sees
   these – look for stalls, rage clicks, and abandonment at a consistent point in the flow.
5. **Locate it in the flow.** If intermediate events exist, find the step where the drop happens.
   Without them you can say the flow broke, but not where.
6. **Tie it to a deploy.** Where a deploy sits in the window, include the commit range.
7. Name the most likely cause in the report. A rate that moved with no cause attached is
   something the reader still has to go investigate themselves.

## Disqualifiers

- Attempts and completions moved together – the rate held.
- The completion event stopped firing entirely, or was renamed in the window. That's an
  instrumentation finding, not a product one, and it should say so.
- The rate fell only inside one new or shifted segment – that's a mix change, not breakage.
- The bucket is below the volume floor.
- The change is within normal weekday/weekend variance.
- A known, announced maintenance window covers the period.
