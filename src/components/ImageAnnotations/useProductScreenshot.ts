import { useMemo } from 'react'
import useProducts from 'hooks/useProducts'

export interface ResolvedScreenshot {
    src?: string
    srcDark?: string
    alt?: string
    annotations?: Record<string, { type?: 'dots' | 'numbered'; items: any[] }>
}

/**
 * Looks up a screenshot entry on a product hook by handle + key, so annotated
 * images stay in sync with `useProducts`. Returns `null` until both are provided.
 */
export function useProductScreenshot(product?: string, screenshot?: string): ResolvedScreenshot | null {
    const { products } = useProducts()
    return useMemo(() => {
        if (!product || !screenshot) return null
        const match = products.find((p: any) => p.handle === product)
        return (match as any)?.screenshots?.[screenshot] || null
    }, [products, product, screenshot])
}
