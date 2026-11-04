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

/**
 * The URL a page shares its sidebar position with. An SDK reference's explicit major, like
 * /docs/libraries/python/7, sits where the library page /docs/libraries/python does.
 */
export const navURL = (url: string | undefined): string | undefined =>
    url?.replace(/^(\/docs\/libraries\/[a-z0-9-]+)\/\d+\/?$/, '$1')

// query strings are ignored when comparing URLs
export const containsURL = (items: MenuNode[] | undefined, url: string | undefined): boolean => {
    if (!items) return false
    const value = navURL(url)

    for (let i = 0; i < items.length; i++) {
        const item = items[i]

        if (item.url?.split('?')[0] === value) {
            return true
        }

        if (item.children) {
            const found = containsURL(item.children, value)
            if (found) {
                return true
            }
        }
    }

    return false
}

export function getActiveMenuSection<T extends MenuNode>(
    sections: T[] | undefined,
    url: string | undefined
): T | undefined {
    const lookupURL = navURL(url)
    // First section that lists the page in its sidebar wins
    const listed = sections?.find((section) => containsURL(section.children, lookupURL))
    if (listed) return listed

    // Last resort: a section whose own URL is the page, even with no sidebar to show
    return sections?.find((section) => lookupURL === section.url?.split('?')[0])
}
