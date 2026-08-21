/**
 * PostHog Desktop's cloud compute rate card, and the sandbox figures needed to turn it into a
 * price anyone can reason about.
 *
 * Two surfaces quote cloud compute — the rate table on `/docs/posthog-desktop/pricing` and the
 * Desktop tab in the `/pricing` calculator — and they must never disagree. Both read the live
 * card from `/api/posthog-desktop-pricing` and both fall back to the snapshot here, so a rate
 * change is one edit rather than two that can drift.
 *
 * The API route itself deliberately does NOT import this: `api/posthog-desktop-pricing.js` is a
 * self-contained CommonJS entrypoint so the Vercel function can boot without pulling in app code
 * (see #19629). This module is client-side only.
 */

export interface ComputeRateCard {
    cpu_core_second_usd: string
    memory_gib_second_usd: string
}

/**
 * v1 of the published rate card, used when the live card is unavailable — either because the
 * pricing API is failing, or because it has yet to start reporting one.
 *
 * Mirrors `COMPUTE_RATE_CARDS` in the tasks backend (`sandbox_pricing.py`), v1, effective
 * 2026-08-21 16:00 UTC. Keep this and {@link PUBLISHED_RATES_DATE} in step with the model
 * snapshot in `components/PostHogDesktopPricing`; they're published together as one dated set.
 */
export const PUBLISHED_COMPUTE_RATE_CARD: ComputeRateCard = {
    cpu_core_second_usd: '0.000075',
    memory_gib_second_usd: '0.000008',
}

/** When the current snapshot was published. Shown wherever a fallback rate is quoted. */
export const PUBLISHED_RATES_DATE = 'August 21, 2026'

/*
 * What a cloud task is *billed* for per second of wall time — which is deliberately not the size
 * of the box it runs on, and the two must not be conflated.
 *
 * A task sandbox is configured with 4 cores and 16 GiB (`SandboxConfig` in the tasks backend).
 * Billing then reads `_billable_resources`, which prices:
 *
 *   - CPU at the burstable *request floor* of 0.5 cores. CPU bursts up to the limit and the
 *     provider bills max(request, actual), so the floor is what a task reserves.
 *   - memory at the full 16 GiB *limit*. VM memory can't burst, so its request is pinned to the
 *     limit rather than to the 1 GiB floor CPU uses.
 *
 * Hence 0.5 and 16 — one a floor, one a limit. Do not "correct" the core count to 4 to match the
 * memory figure: that inflates the quoted hourly rate 2.5x. Against the v1 card these give
 * ~$0.60/hour ($0.135 CPU + $0.461 memory), the figure the launch note quotes.
 *
 * Tasks may override their sandbox size (clamped to 16 cores / 64 GiB), so this is the default a
 * task gets, not a guarantee about every task.
 */
export const BILLABLE_CPU_CORES = 0.5
export const BILLABLE_MEMORY_GIB = 16

const SECONDS_PER_HOUR = 3600

/** What an hour of cloud task time costs, for a default sandbox. ~$0.60 against the v1 card. */
export const hourlyComputeUsd = (compute: ComputeRateCard): number =>
    BILLABLE_CPU_CORES * SECONDS_PER_HOUR * Number(compute.cpu_core_second_usd) +
    BILLABLE_MEMORY_GIB * SECONDS_PER_HOUR * Number(compute.memory_gib_second_usd)
