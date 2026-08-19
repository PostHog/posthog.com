/**
 * Picks the sidebar section a URL belongs to.
 *
 * `AppWindow` renders the children of the section this returns. The logic lives outside the
 * React tree so that `activeMenu.test.ts` can run it against the real nav data under
 * `node --test`. See `pnpm test:navs`.
 */

export interface MenuNode {
    url?: string
    children?: MenuNode[]
}

interface SearchOptions {
    fullUrl?: boolean
    includeNav?: boolean
}

// fullUrl keeps the query string when comparing; includeNav also matches ?nav= links (skipped by default)
export const containsURL = (
    items: MenuNode[] | undefined,
    value: string | undefined,
    { fullUrl = false, includeNav = false }: SearchOptions = {}
): boolean => {
    if (!items) return false

    for (let i = 0; i < items.length; i++) {
        const item = items[i]

        const isNavLink = item.url?.includes('?nav=')
        const url = fullUrl ? item.url : isNavLink && !includeNav ? undefined : item.url?.split('?')[0]
        if (url && url === value) {
            return true
        }

        if (item.children) {
            const found = containsURL(item.children, value, { fullUrl, includeNav })
            if (found) {
                return true
            }
        }
    }

    return false
}

export function getActiveMenuSection<T extends MenuNode>(
    sections: T[] | undefined,
    url: string | undefined,
    search?: string
): T | undefined {
    // 1. A nav link with this exact URL + query wins (e.g. ?nav=self-driving)
    if (search) {
        const fullURL = `${url}${search}`
        const contextMatch = sections?.find(
            (section) => section.url === fullURL || containsURL(section.children, fullURL, { fullUrl: true })
        )
        if (contextMatch) return contextMatch
    }

    // 2. A section whose own URL is this page wins (if it has children to show)
    const dedicated = sections?.find((section) => section.url?.split('?')[0] === url && section.children?.length)
    if (dedicated) return dedicated

    // 3. Otherwise, first section that links to this page (?nav= links don't count)
    const linked = sections?.find((section) => containsURL(section.children, url))
    if (linked) return linked

    // 4. Last resort: allow ?nav= links and bare section URLs
    return sections?.find(
        (section) => url === section.url?.split('?')[0] || containsURL(section.children, url, { includeNav: true })
    )
}
