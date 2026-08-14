# Pricing page experiment

A three-way test of the pricing page, served on `/pricing` behind the multivariate flag
`pricing-page-redesign`.

| Variant key                     | What renders                                          | Component                    |
| ------------------------------- | ----------------------------------------------------- | ---------------------------- |
| `control`                       | `/pricing` as it shipped before the redesign          | `ControlPage`                |
| `redesign`                      | The redesign, calculator as its own visible section    | `RedesignPage` (`section`)   |
| `redesign-calculator-minimized` | The redesign, calculator collapsed behind a link       | `RedesignPage` (`minimized`) |

Split 34/33/33 at 100% rollout, test accounts filtered, experience continuity on (signup is an
identity transition, so without it the conversion event would land on a different person).

## How a variant gets chosen

`pages/pricing/index.tsx` is a one-liner that renders `PricingPageExperiment`. That component
reads the flag inside `RenderInClient` and renders the matching arm.

**Reading the flag is what enrolls someone.** `posthog.getFeatureFlag()` fires
`$feature_flag_called`, which is the exposure event every metric here is anchored to, and PostHog
tags that person's later events with `$feature/pricing-page-redesign`. So:

- **Only `/pricing` reads this flag**, and nothing else should — no preview route, no query-param
  override. Anything that reads the flag enrolls whoever triggered it, which would dilute every
  metric with people who never saw the experiment. To preview a variant, force the flag instead
  (see below).
- Exposure is scoped to people who actually reach `/pricing`, which is what the sizing assumed
  (~14.1% baseline, ~2,175 visitors/day, ~36k exposed, ~24 days). Run whole weeks — traffic swings
  about 2× weekday-to-weekend.

## Previewing a variant

Force the flag, don't bypass it. Either:

- **PostHog toolbar** — open it on `/pricing` and override `pricing-page-redesign` to the variant
  you want.
- **Console:**
  ```js
  posthog.featureFlags.overrideFeatureFlags({ flags: { 'pricing-page-redesign': 'redesign' } })
  // 'control' | 'redesign' | 'redesign-calculator-minimized'
  posthog.featureFlags.overrideFeatureFlags(false) // clear
  ```

Both change what the flag returns, so the page takes the same code path a real visitor does —
which is the point. There is deliberately **no** preview route and **no** query-param override: a
second way in is a second thing to keep working, and one that skips the flag read is one that can
drift from what visitors actually get. `/pricing/redesign` existed for this and was removed when
the experiment went in.

## Why control is the placeholder

Flags aren't bootstrapped on this site (see `static/scripts/posthog-init.js`), so there's a
network round trip before a variant is known. `RenderInClient` renders `placeholder` until then,
and control is the placeholder, which makes it:

- the server-rendered HTML, so crawlers index the canonical pricing content;
- what renders in the gap before flags resolve;
- what visitors keep if flags are blocked (ad blockers) or never arrive — `RenderInClient` gives
  up after 5 seconds and renders anyway, and an unresolved flag resolves to control.

The cost is a brief flash of control for the two-thirds assigned to a redesign arm. The
alternative — a blank page until flags land — would strip `/pricing` of its content for crawlers
and punish every visitor to spare two-thirds a reflow. Worth revisiting only if flag bootstrapping
gets added site-wide.

## Metrics, and what to distrust

**Primary:** exposure → `user signed up` (first org user, cloud), 7-day window.

**Secondary:** `Get started - free` click on `/pricing` · reached signup page ·
`pricing_calculator_interacted` · paid subscription (30d, directional only — a 3.5% base rate can't
resolve a 10% lift in any sane window, so nobody should call the test on it) · rageclick and
dead-click guardrails.

Two metrics were deliberately **not** used, despite prior pricing experiments relying on them:

- Action 33102 "First org user signed up (cloud)" filters on `is_email_verified=true`, which at
  signup time is only true for OAuth users. It drops ~34% of real signups and its capture rate has
  drifted from ~73% to ~66% since February, which would have manufactured a downward trend inside
  the experiment window. The raw event is used instead.
- Action 23735 "Clicked a signup CTA (comprehensive)" has three of four steps returning zero for
  years — a single-href action wearing a comprehensive name, with regime breaks in Sep 2024 and
  Sep 2025.

Actions 47707/91982 are identical duplicates; 91983 is the healthy one and is what's used.

## Calculator engagement

Two events, and they are not interchangeable:

- **`pricing_calculator_interacted`** — fires on the first real interaction with the calculator's
  controls, once per page view. Captured by delegation on the calculator root in
  `PricingCalculator/Tabbed.tsx`, so it means the same thing in all three arms and survives a
  redesign of the controls. **This is the cross-variant metric.**
- **`pricing_calculator_expanded`** — fires when the collapsed calculator is opened. It only exists
  in `redesign-calculator-minimized`, because the other arms have nothing to expand. Don't compare
  it across arms: an arm that can fire an extra engagement event will always look more engaged.

This replaces the autocapture-based metric (`$autocapture` change events on `/pricing` inputs),
which worked only as long as the DOM held still — and a redesign is exactly what breaks it. Since
calculator engagement is the entire point of the third arm, the bespoke events matter more here
than they would in most tests.

## Before launching

One thing still lives in the PostHog app, not this repo:

1. **`homepage-cta` (experiment 399989, 5 variants)** has been running since Aug 4 and reaches
   ~68% of `/pricing` visitors via the homepage, the top inbound path. It won't bias the
   comparison, but it inflates variance and entangles the signup effect. Wait it out or share a
   holdout.

**`enterprise-pricing-table`** used to be listed here too. Its dead branch has since been removed
from `components/Pricing/Plans/index.tsx`. The branch only rendered under the `test` variant, which
the flag had held at 0% since the experiment was archived in Jan 2024, so the control arm renders
exactly as it did before — but the flag itself still needs disabling in the app.

## Unwinding this

When the test ends, the winner's component moves back to `pages/pricing/index.tsx` and this whole
folder is deleted, along with the losing variants' components. `ControlPage` is a lift-and-shift of
the old page body and is frozen for the duration — editing the control mid-flight changes what the
other arms are measured against.
