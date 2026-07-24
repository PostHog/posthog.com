import React, { forwardRef, useMemo } from 'react'
import { ANNOTATIONS } from './annotations'
import { PRODUCTS } from './products'
import { Annotation, ProductKey } from './types'

interface LegendProps {
    pageAnnotations: Annotation[]
    filter: ProductKey | null
    onFilter: (filter: ProductKey | null) => void
}

const Legend = forwardRef<HTMLDivElement, LegendProps>(function Legend({ pageAnnotations, filter, onFilter }, ref) {
    const counts = useMemo(() => {
        const byProduct: Partial<Record<ProductKey, number>> = {}
        pageAnnotations.forEach((a) => {
            byProduct[a.product] = (byProduct[a.product] || 0) + 1
        })
        return byProduct
    }, [pageAnnotations])

    return (
        <div ref={ref} className="hpw-legend">
            <div className="hpw-lg-title">PostHog instrumentation</div>
            <div className="hpw-lg-sub">
                One project, one snippet, every product below. Click a pin to see the code, or a row to filter.
            </div>
            {Object.values(PRODUCTS).map((product) => {
                const total = ANNOTATIONS.filter((a) => a.product === product.key).length
                if (total === 0) return null
                const onPage = counts[product.key] || 0
                return (
                    <button
                        key={product.key}
                        className={`hpw-lg-row${filter && filter !== product.key ? ' inactive' : ''}`}
                        onClick={() => onFilter(filter === product.key ? null : product.key)}
                    >
                        <span className="hpw-sw" style={{ background: product.color }} />
                        <span className="hpw-lg-name">{product.name}</span>
                        <span className="hpw-lg-ct">{onPage ? `${onPage} here` : 'other page'}</span>
                    </button>
                )
            })}
        </div>
    )
})

export default Legend
