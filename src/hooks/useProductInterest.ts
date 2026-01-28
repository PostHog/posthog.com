import { useEffect } from 'react'
import { showedInterest, getProductSlugFromPath } from '../lib/productInterest'

/**
 * Hook to track interest in a specific product by slug.
 * Use this when you already know the product slug (e.g., from page context).
 *
 * @param slug - The product slug to track
 */
export function useProductInterest(slug: string | undefined | null): void {
    useEffect(() => {
        if (slug) {
            showedInterest(slug)
        }
    }, [slug])
}

/**
 * Hook to track product interest based on the current URL path.
 * Call this from product landing pages and docs pages.
 *
 * @param pathname - The current URL pathname (e.g., from useLocation())
 */
export function useProductInterestFromPathname(pathname: string): void {
    useProductInterest(getProductSlugFromPath(pathname))
}
