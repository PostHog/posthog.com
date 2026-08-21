/**
 * PostHog Desktop's cloud compute rate card, and the sandbox shape needed to turn it into a
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
 * Keep this and {@link PUBLISHED_RATES_DATE} in step with the model snapshot in
 * `components/PostHogDesktopPricing`; they're published together as one dated set of rates.
 */
export const PUBLISHED_COMPUTE_RATE_CARD: ComputeRateCard = {
    cpu_core_second_usd: '0.000075',
    memory_gib_second_usd: '0.000008',
}

/** When the current snapshot was published. Shown wherever a fallback rate is quoted. */
export const PUBLISHED_RATES_DATE = 'August 21, 2026'

/**
 * Every cloud task gets the same sandbox — sizes aren't customizable yet. The rate card prices
 * CPU and memory per second, so the shape has to come from somewhere, and it isn't in the API.
 * If tasks ever become resizable, this stops being a constant.
 */
export const SANDBOX_CPU_CORES = 0.5
export const SANDBOX_MEMORY_GIB = 16

const SECONDS_PER_HOUR = 3600

/**
 * What an hour of cloud task time costs, for the standard sandbox. Against the v1 card that's
 * ~$0.60/hour: $0.135 of CPU plus $0.461 of memory.
 */
export const hourlyComputeUsd = (compute: ComputeRateCard): number =>
    SANDBOX_CPU_CORES * SECONDS_PER_HOUR * Number(compute.cpu_core_second_usd) +
    SANDBOX_MEMORY_GIB * SECONDS_PER_HOUR * Number(compute.memory_gib_second_usd)
