import React, { useEffect, useState } from 'react'
import usePostHog from 'hooks/usePostHog'
import PricingSvgImport from './svgs/pricing.svg'

// Pricing is a compound glass icon (a stack of bills with a currency symbol) that
// doesn't fit the single-path `GlassIcon` model, so it lives as its own SVG. The one
// file carries all three currency symbols (classed `pricing-cur-{dollar,pound,euro}`),
// and we show one. gatsby-plugin-react-svg turns files under `svgs/` into React
// components, but the project's *.svg type declaration types them as images — so cast.
const PricingSvg = PricingSvgImport as unknown as React.FC<React.SVGProps<SVGSVGElement>>

const FLAG = 'pricing-currency'
type Currency = 'dollar' | 'pound' | 'euro'

// Toggle which currency symbol shows, driven by `data-currency` on the wrapper. Dollar
// is the default (no rule hides it), so SSR/first paint always renders a valid icon.
const TOGGLE_CSS = `
.pricing-cur-pound,.pricing-cur-euro{display:none}
[data-currency="pound"] .pricing-cur-dollar{display:none}
[data-currency="pound"] .pricing-cur-pound{display:inline}
[data-currency="euro"] .pricing-cur-dollar{display:none}
[data-currency="euro"] .pricing-cur-euro{display:inline}
`

interface PricingIconProps {
    className?: string
}

/**
 * The pricing desktop icon — a stack of bills whose currency symbol ($/£/€) matches the
 * visitor's location. The country → currency mapping lives in the PostHog multivariate
 * flag `pricing-currency` (GB → pound, eurozone → euro, else dollar); here we just read
 * the assigned variant and toggle the matching symbol layer. Defaults to dollar until
 * flags resolve (and if they never do, e.g. blocked by an ad-blocker). Matches the other
 * glass icons' size (`size-9` / 36px) and hover pop.
 */
export default function PricingIcon({ className = '' }: PricingIconProps) {
    const posthog = usePostHog()
    const [currency, setCurrency] = useState<Currency>('dollar')

    useEffect(() => {
        if (!posthog) return
        const update = () => {
            const variant = posthog.getFeatureFlag?.(FLAG)
            if (variant === 'pound' || variant === 'euro' || variant === 'dollar') {
                setCurrency(variant)
            }
        }
        update()
        posthog.onFeatureFlags?.(update)
    }, [posthog])

    return (
        <span
            data-currency={currency}
            className={`relative inline-flex items-center justify-center size-9 transition-transform duration-200 ease-out group-hover:scale-[1.03] ${className}`}
        >
            <style>{TOGGLE_CSS}</style>
            <PricingSvg className="block size-full overflow-visible" />
        </span>
    )
}
