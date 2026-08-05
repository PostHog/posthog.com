import React, { useState } from 'react'
import useProduct from 'hooks/useProduct'
import ToolsTickerStrip from './ToolsTickerStrip'

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
                        {/* Rendered twice so translateX(-50%) loops seamlessly; duplicate is aria-hidden. */}
                        <ToolsTickerStrip products={products} />
                        <ToolsTickerStrip products={products} ariaHidden />
                    </div>
                </div>
            </div>
        </div>
    )
}
