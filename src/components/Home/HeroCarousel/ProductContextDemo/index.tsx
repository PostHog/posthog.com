import React from 'react'
import { useInView } from 'react-intersection-observer'
import useProduct from 'hooks/useProduct'
import Link from 'components/Link'
import Tooltip from 'components/RadixUI/Tooltip'
import { mcpInstallSchema } from 'components/PlatformInstall'
import { usePrefersReducedMotion } from 'components/Code/usePrefersReducedMotion'
import { useSlideActive, useSlidePaused } from '../autoAdvanceGate'
import './animations.css'

// Positions share the SVG's 1000 × 774 coordinate system.
const NODES = [
    { handle: 'product_analytics', x: 230, y: 140 },
    { handle: 'session_replay', x: 770, y: 140 },
    { handle: 'error_tracking', x: 160, y: 387 },
    { handle: 'feature_flags', x: 840, y: 387 },
    { handle: 'experiments', x: 230, y: 634 },
    { handle: 'data_warehouse', x: 770, y: 634 },
]

const CLIENTS = ['claude', 'codex', 'cursor', 'vscode'].flatMap((id) => {
    const platform = mcpInstallSchema.platforms.find((platform) => platform.id === id)
    return platform?.href ? [{ ...platform, href: platform.href }] : []
})

export default function ProductContextDemo() {
    const allProducts = useProduct()
    const active = useSlideActive()
    const paused = useSlidePaused()
    const reducedMotion = usePrefersReducedMotion()
    const { ref, inView } = useInView({ threshold: 0.25 })
    const running = active && inView && !paused && !reducedMotion
    const nodes = NODES.flatMap((node) => {
        const product = Array.isArray(allProducts)
            ? allProducts.find((product: any) => product.handle === node.handle)
            : undefined
        return product ? [{ ...node, product }] : []
    })

    return (
        <figure
            ref={ref}
            className="product-context-demo @container aspect-[1000/774] paper-desk not-prose relative w-full m-0 border border-primary rounded"
            data-running={running}
        >
            <figcaption className="sr-only">
                PostHog analytics, session replays, errors, feature flags, experiments, and warehouse data flow into
                your agents.
            </figcaption>
            <div>
                <svg
                    className="context-connections absolute inset-0 h-full w-full"
                    viewBox="0 0 1000 774"
                    fill="none"
                    aria-hidden="true"
                >
                    {nodes.map(({ handle, x, y, product }, index) => {
                        const startX = x + (x < 500 ? 155 : -155)
                        const path = `M ${startX} ${y} C 500 ${y}, ${startX} 387, 500 387`
                        return (
                            <g key={handle} className={`text-${product.color}`}>
                                <path d={path} className="context-connection stroke-[rgb(var(--border))] stroke-2" />
                                <path
                                    d={path}
                                    pathLength="100"
                                    className="context-pulse stroke-current stroke-[4] [stroke-linecap:round] [stroke-dasharray:8_100]"
                                    style={{ animationDelay: `${index * -0.6}s` }}
                                />
                            </g>
                        )
                    })}
                </svg>

                {nodes.map(({ handle, x, y, product }, index) => (
                    <div
                        key={handle}
                        className="context-product-position absolute w-[31%] -translate-x-1/2 -translate-y-1/2"
                        style={{
                            left: `${x / 10}%`,
                            top: `${(y / 774) * 100}%`,
                            animationDuration: `${4 + (index % 5) * 0.9}s`,
                            animationDelay: `${index * -1.1}s`,
                        }}
                    >
                        <Link
                            to={`/${product.slug}`}
                            state={{ newWindow: true }}
                            wrapperClassName="block"
                            className="context-product flex items-center justify-center gap-[1.2cqw] py-[1cqw] text-[2.8cqw] font-medium whitespace-nowrap leading-tight text-center text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 [&_g]:[clip-path:none]"
                        >
                            {product.Icon && (
                                <product.Icon
                                    aria-hidden="true"
                                    className={`context-product-icon size-[3.4cqw] shrink-0 fill-current text-${product.color}`}
                                />
                            )}
                            <span className="underline underline-offset-2">{product.name}</span>
                        </Link>
                    </div>
                ))}

                <div className="context-hub absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[31%] px-[1.5cqw] py-[3cqw] rounded-md flex flex-col items-center gap-[1cqw] text-center bg-primary border border-primary">
                    <strong className="text-[3.6cqw] leading-[1.2]">Your agents</strong>
                    <div className="context-clients flex items-center justify-center gap-[1.8cqw] mt-[1.4cqw] [&_svg]:block [&_svg]:size-[3.4cqw]">
                        {CLIENTS.map((client) => (
                            <Tooltip
                                key={client.id}
                                className="inline-flex"
                                delay={150}
                                trigger={
                                    <Link
                                        to={client.href}
                                        state={{ newWindow: true }}
                                        externalNoIcon
                                        aria-label={client.label}
                                        wrapperClassName="flex"
                                        className="context-client block size-[3.4cqw] rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                                    >
                                        <span aria-hidden="true">{client.icon}</span>
                                    </Link>
                                }
                            >
                                {client.label}
                            </Tooltip>
                        ))}
                    </div>
                </div>
            </div>
        </figure>
    )
}
