import React from 'react'
import Link from 'components/Link'
import type { ProductHandle } from 'hooks/productData/relationships'
import type { ProductGraph } from './graph'

interface ProductLite {
    handle: string
    name: string
    description?: string
    slug?: string
}

interface SSRFallbackProps {
    products: ProductLite[]
    graph: ProductGraph
    /** When true, collapse visually but keep in DOM for SEO. */
    hiddenAfterMount: boolean
}

export default function SSRFallback({ products, graph, hiddenAfterMount }: SSRFallbackProps): JSX.Element {
    return (
        <section aria-hidden={hiddenAfterMount} className={hiddenAfterMount ? 'sr-only' : 'p-6 space-y-4 text-primary'}>
            <h2 className="text-lg font-bold">PostHog product galaxy</h2>
            <p className="opacity-70">
                Interactive 3D view of how PostHog products work together. Enable JavaScript to use the explorer.
            </p>
            <ul className="grid gap-4 grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3">
                {products.map((product) => {
                    const edges = graph.adjacency.get(product.handle as ProductHandle) ?? []
                    const partnerNames = Array.from(
                        new Set(edges.map((e) => (e.from === product.handle ? e.to : e.from)))
                    )
                        .map((handle) => products.find((p) => p.handle === handle)?.name ?? handle)
                        .join(', ')
                    return (
                        <li key={product.handle} className="border border-primary p-3">
                            <h3 className="font-semibold">
                                {product.slug ? (
                                    <Link to={`/${product.slug}`} state={{ newWindow: true }}>
                                        {product.name}
                                    </Link>
                                ) : (
                                    product.name
                                )}
                            </h3>
                            {product.description && <p className="text-sm opacity-70 mt-1">{product.description}</p>}
                            {edges.length > 0 && <p className="text-xs mt-2 opacity-70">Connects to: {partnerNames}</p>}
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}
