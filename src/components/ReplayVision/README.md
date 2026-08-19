# ReplayVision components

Sections for the Replay Vision product pages (`/replay-vision` and `/replay-vision/pricing`), wired
up through `productMenu`/`pricingMenu` in `src/hooks/productData/replay_vision.tsx` and rendered by
the ReaderView product system (`components/Products/ReaderViewProduct`).

Most files here are one section each (`OldWaySection`, `HowToUseSection`, …). The pricing pieces
are the ones with structure worth documenting:

## PricingEstimator.tsx

The interactive cost estimator — model selector, observation-denominated tier table, and
observations slider. It renders in **two places**:

| Surface                  | Consumer                                            | Tier source                                                            |
| ------------------------ | --------------------------------------------------- | ---------------------------------------------------------------------- |
| `/replay-vision/pricing` | `PricingCredits` in `PricingSections.tsx`           | `LAUNCH_CREDIT_TIERS`, built from hardcoded launch constants            |
| `/pricing`               | `Pricing/PricingCalculator/Tabs/ReplayVision.tsx`   | The billing API's `replay_vision` credit tiers via `useProducts()`      |

### Contract

- **Controlled component.** The parent owns `modelKey` and `observations`; the estimator renders
  and reports changes through `onModelKeyChange`/`onObservationsChange`. It returns a fragment so
  it can't disturb its parent's layout, and `null` if `creditTiers` is missing/empty.
- **`estimateReplayVisionPricing()`** is the pure math (React-free, like
  `Pricing/PricingCalculator/calculatorLogic.ts`): it converts credit tiers to observation tiers
  for the selected model (`up_to ÷ creditsPerObservation`, `unit price × creditsPerObservation`),
  clamps observations to `[freeObservations, MAX_OBSERVATIONS]`, and walks the tiers with the
  shared `calculatePrice`. It also reports `credits` (clamped observations converted back), which
  is the denomination the shared `/pricing` calculator state uses.
- **`MODELS`** (credits per observation for Standard/Premium/Lightweight) is product knowledge that
  only exists here — the billing API knows credits, not models.

### Why two tier sources

On `/pricing`, the tab must never disagree with the shared calculator's subtotals: `useProducts`'s
`setVolume` computes cost from the billing API tiers, so the tab passes that *same array* into the
estimator and syncs its result back via `setProduct` (volume in credits). If billing changes the
free allocation or price, the tab follows automatically at the next build.

The product page instead keeps hardcoded constants (`FREE_CREDITS`, `CREDIT_PRICE`,
`STANDARD_FREE_CREDITS` in `PricingSections.tsx`) because the launch framing — struck-through 500 →
2,500 free credits — isn't expressible from billing data. **Those constants must track the billing
API's `replay_vision` tiers** (currently in agreement: 2,500 free, then $0.01/credit). When the
launch boost ends in billing, `PricingSections.tsx` needs a manual edit; the `/pricing` tab does
not.

### Known rounding edge

Converting a credit tier boundary to observations rounds by up to half an observation (e.g.
Premium: 2,500 credits ÷ 15 → 167 observations ≈ 2,505 credits), so a credit-side total and an
observation-side total can differ by cents. Everything visible on one surface is computed from one
side, so nothing on screen ever disagrees with itself. The tier table also assumes the current
two-tier shape (free allocation + one paid rate); if billing grows more tiers, revisit the labels
and `activeTierIndex`.

## PricingSections.tsx

`PricingTLDR`, `PricingPlans`, and `PricingCredits` — the sections of `/replay-vision/pricing`.
`PricingCredits` is a thin wrapper: heading + intro, `<PricingEstimator />` with
`LAUNCH_CREDIT_TIERS`, and the "Estimated monthly cost" footer.
