import { IconLaptop } from '@posthog/icons'
import { getTool } from '../../data/tools'

/**
 * PostHog Desktop on the pricing surfaces (`/pricing` calculator + plans accordion).
 *
 * `handle` and `type` both stay on the tool handle `posthog_code`, because the calculator keys
 * three different things off them and they have to agree: `useProducts`' `setVolume`/`setProduct`
 * look up by `handle`, while `Tabbed` uses `type` for the tab registration in `productTabs`, the
 * `?posthog_code[volume]=` URL param, and its own `setVolume` calls.
 *
 * Billing is the one place the names diverge — the billing product predates the Code → Desktop
 * rename and is still `posthog_code_usage` — so it's matched with an explicit `billingType`.
 *
 * Volumes here are credits, the billing unit (100 credits = $1). The tab UI in
 * `PricingCalculator/Tabs/PostHogDesktop.tsx` works in hours and dollars and converts, the same
 * split Replay Vision uses between its observations and its credits.
 */
export const posthogDesktop = {
    ...getTool('posthog_code'),
    Icon: IconLaptop,
    type: 'posthog_code',
    billingType: 'posthog_code_usage',
    // Matches the Desktop entry in `useProduct`, so the product reads the same colour everywhere.
    // Brown is near-black, so the calculator's tab list needs the light variant in dark mode.
    color: 'brown',
    colorDark: 'brown-dark',
    pricingBadge: 'Beta',
    // Only the fallback the generic tab block needs if the `productTabs` registration ever goes
    // away — the real UI is the custom tab. `min` doubles as the "first N free" copy, so it
    // tracks the free allocation (2,000 credits = $20).
    slider: { marks: [2000, 10000, 50000, 200000], min: 2000, max: 200000 },
    volume: 2000,
}
