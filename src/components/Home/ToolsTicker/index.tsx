import React, { useState } from 'react'
import Link from 'components/Link'
import useProduct from 'hooks/useProduct'

// Seconds each item takes to cross one loop; total duration scales with item count
// so the apparent speed stays constant when handles are added or removed.
const SECONDS_PER_ITEM = 2.5

// Core products plus notable betas, in the order they scroll.
const DEFAULT_HANDLES = [
    'product_analytics',
    'web_analytics',
    'session_replay',
    'feature_flags',
    'experiments',
    'surveys',
    'error_tracking',
    'data_warehouse',
    'cdp',
    'workflows_emails',
    'logs',
    'ai_observability',
    'endpoints',
    'inbox',
    'traces',
    'heatmaps',
    'replay_vision',
    'no_code_ab_testing',
]

// Inbox intentionally has no slug in its product data (it isn't in product/app
// navigation yet), so link it to its docs page instead.
const SLUG_OVERRIDES: Record<string, string> = {
    inbox: 'docs/self-driving/inbox',
}

interface ToolsTickerProps {
    handles?: string[]
    label?: string
    className?: string
}

export default function ToolsTicker({
    handles = DEFAULT_HANDLES,
    label = 'Built-in tools for your agents:',
    className = '',
}: ToolsTickerProps): JSX.Element | null {
    const allProducts = useProduct()
    const [isPaused, setIsPaused] = useState(false)

    const products = handles
        .map((handle) =>
            Array.isArray(allProducts) ? allProducts.find((product: any) => product.handle === handle) : undefined
        )
        .map((product: any) => (product ? { ...product, slug: SLUG_OVERRIDES[product.handle] ?? product.slug } : null))
        .filter((product: any) => product?.name && product?.slug)

    if (!products.length) {
        return null
    }

    // The list is rendered twice so the translateX(-50%) loop is seamless; the
    // duplicate is hidden from screen readers and its links removed from tab order.
    const strip = (ariaHidden: boolean) => (
        <ul aria-hidden={ariaHidden || undefined} className="flex items-center gap-6 pr-6 m-0 p-0 list-none shrink-0">
            {products.map((product: any) => (
                <li key={product.handle} className="flex items-center gap-1.5 whitespace-nowrap">
                    {product.Icon && <product.Icon className={`size-4 shrink-0 text-${product.color}`} />}
                    <Link
                        to={`/${product.slug}`}
                        state={{ newWindow: true }}
                        tabIndex={ariaHidden ? -1 : undefined}
                        className="text-sm font-semibold"
                    >
                        {product.name}
                    </Link>
                </li>
            ))}
        </ul>
    )

    return (
        <div className={`@container not-prose ${className}`}>
            <div className="flex flex-col @sm:flex-row @sm:items-center gap-1 @sm:gap-3">
                <span className="shrink-0 text-sm text-secondary">{label}</span>
                <div
                    className="relative flex-1 min-w-0 overflow-hidden motion-reduce:overflow-x-auto [mask-image:linear-gradient(to_right,transparent,#000_1.5rem,#000_calc(100%-1.5rem),transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_1.5rem,#000_calc(100%-1.5rem),transparent)]"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onFocus={() => setIsPaused(true)}
                    onBlur={() => setIsPaused(false)}
                >
                    <div
                        className="flex w-max motion-reduce:[animation:none!important]"
                        style={{
                            animation: `tools-ticker-marquee ${products.length * SECONDS_PER_ITEM}s linear infinite`,
                            animationPlayState: isPaused ? 'paused' : 'running',
                        }}
                    >
                        {strip(false)}
                        {strip(true)}
                    </div>
                </div>
            </div>
        </div>
    )
}
