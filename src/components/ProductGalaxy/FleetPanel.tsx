import React from 'react'
import Link from 'components/Link'
import type { ProductHandle } from 'hooks/productData/relationships'
import type { Suggestion } from './graph'

interface ProductLite {
    handle: string
    name: string
    color?: string
    slug?: string
    description?: string
    Icon?: React.ComponentType<{ className?: string }>
}

interface FleetPanelProps {
    products: ProductLite[]
    fleet: ReadonlySet<ProductHandle>
    suggestions: Suggestion[]
    onToggle: (handle: ProductHandle) => void
    onHover: (handle: ProductHandle | null) => void
    onClear: () => void
}

/**
 * Single right-rail panel. State is determined by fleet size:
 *  - empty: explain the concept + show suggested starting points.
 *  - non-empty: list fleet members on top, then a merged "Where to go next" view
 *    that surfaces each recommendation along with every pairsWith description that
 *    connects it to one of the fleet's products.
 */
export default function FleetPanel({
    products,
    fleet,
    suggestions,
    onToggle,
    onHover,
    onClear,
}: FleetPanelProps): JSX.Element {
    const productByHandle = new Map(products.map((p) => [p.handle, p]))
    const fleetProducts = Array.from(fleet)
        .map((handle) => productByHandle.get(handle))
        .filter((p): p is ProductLite => Boolean(p))

    const fleetEmpty = fleet.size === 0

    return (
        <div className="font-mono text-xs p-3 space-y-4 text-primary">
            <section>
                <div className="flex items-center justify-between">
                    <div className="uppercase tracking-widest text-secondary text-[10px]">
                        › MY FLEET (<span className="text-orange">{String(fleet.size).padStart(2, '0')}</span>)
                    </div>
                    {!fleetEmpty && (
                        <button
                            type="button"
                            onClick={onClear}
                            className="text-[10px] uppercase tracking-widest underline text-secondary hover:text-orange"
                        >
                            Reset
                        </button>
                    )}
                </div>
                {fleetEmpty ? (
                    <p className="text-secondary normal-case tracking-normal font-sans text-[12px] mt-2">
                        Click a product (here, on the graph, or in the tray) to add it to your fleet. We&rsquo;ll chart
                        where to expand next.
                    </p>
                ) : (
                    <ul className="mt-2 space-y-1">
                        {fleetProducts.map((p) => (
                            <li key={p.handle}>
                                <button
                                    type="button"
                                    onClick={() => onToggle(p.handle)}
                                    onMouseEnter={() => onHover(p.handle)}
                                    onMouseLeave={() => onHover(null)}
                                    className="group w-full inline-flex items-center justify-between gap-2 min-h-[28px] px-2 border border-orange bg-orange/10 text-primary hover:bg-orange/20 transition-colors"
                                    aria-label={`Remove ${p.name} from fleet`}
                                >
                                    <span className="flex items-center gap-1.5 min-w-0">
                                        {p.Icon && (
                                            <p.Icon className={`size-3 shrink-0 text-${p.color ?? 'secondary'}`} />
                                        )}
                                        <span className="text-[12px] font-sans normal-case tracking-normal font-semibold truncate">
                                            {p.name}
                                        </span>
                                    </span>
                                    <span className="text-[10px] uppercase tracking-widest text-secondary group-hover:text-orange shrink-0">
                                        ✕
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section>
                <div className="uppercase tracking-widest text-secondary text-[10px]">
                    {fleetEmpty ? '› SUGGESTED STARTING POINTS' : '› WHERE TO GO NEXT'}
                </div>
                {suggestions.length === 0 && (
                    <p className="text-secondary normal-case tracking-normal font-sans text-[12px] mt-2">
                        No additional matches charted.
                    </p>
                )}
                <ul className="mt-2 space-y-2">
                    {suggestions.map((s, i) => {
                        const product = productByHandle.get(s.handle)
                        if (!product) return null

                        // Build the merged description: one bullet per fleet product that
                        // contributes a pairsWith edge to this recommendation.
                        const pairsBullets = s.contributors
                            .filter((c) => c.type === 'pairsWith')
                            .map((c) => {
                                const partner = productByHandle.get(c.from)
                                return {
                                    name: partner?.name ?? c.from,
                                    color: partner?.color,
                                    description: c.description,
                                }
                            })

                        return (
                            <li
                                key={s.handle}
                                className="border border-primary bg-accent px-2 py-1.5 hover:border-orange transition-colors"
                                onMouseEnter={() => onHover(s.handle)}
                                onMouseLeave={() => onHover(null)}
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-1.5 min-w-0">
                                        {product.Icon && (
                                            <product.Icon
                                                className={`size-3 shrink-0 text-${product.color ?? 'secondary'}`}
                                            />
                                        )}
                                        <span
                                            className={`text-[12px] font-sans normal-case tracking-normal font-semibold text-${
                                                product.color ?? 'primary'
                                            } truncate`}
                                        >
                                            {product.name}
                                        </span>
                                    </div>
                                    <span className="text-[10px] uppercase tracking-widest text-secondary shrink-0">
                                        {String(i + 1).padStart(2, '0')} · {s.score}
                                    </span>
                                </div>

                                {fleetEmpty && product.description && (
                                    <p className="text-[11px] normal-case tracking-normal font-sans text-secondary mt-1">
                                        {product.description}
                                    </p>
                                )}

                                {!fleetEmpty && pairsBullets.length > 0 && (
                                    <ul className="mt-1.5 space-y-1.5">
                                        {pairsBullets.map((b, idx) => (
                                            <li
                                                key={`${s.handle}-${b.name}-${idx}`}
                                                className="normal-case tracking-normal font-sans"
                                            >
                                                <span
                                                    className={`text-[10px] uppercase tracking-widest text-${
                                                        b.color ?? 'secondary'
                                                    }`}
                                                >
                                                    + {b.name}
                                                </span>
                                                {b.description && (
                                                    <p className="text-[11px] text-secondary mt-0.5 leading-snug">
                                                        {b.description}
                                                    </p>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <div className="mt-1.5 flex gap-2 text-[10px] uppercase tracking-widest font-mono">
                                    <button
                                        type="button"
                                        onClick={() => onToggle(s.handle)}
                                        className="inline-flex items-center min-h-[22px] px-2 border border-primary text-primary bg-transparent hover:border-orange hover:text-orange transition-colors"
                                    >
                                        + Add to fleet
                                    </button>
                                    {product.slug && (
                                        <Link
                                            to={`/${product.slug}`}
                                            state={{ newWindow: true }}
                                            className="inline-flex items-center min-h-[22px] px-2 border border-primary text-primary bg-transparent hover:border-orange hover:text-orange transition-colors"
                                        >
                                            Learn more →
                                        </Link>
                                    )}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </section>
        </div>
    )
}
