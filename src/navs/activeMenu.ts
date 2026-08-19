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

const pathOf = (url: string | undefined): string | undefined => url?.split('?')[0]

/** True when `url` matches one of `items` or anything below it. */
export const containsURL = (items: MenuNode[] | undefined, url: string | undefined): boolean => {
    if (!items) return false

    for (const item of items) {
        if (pathOf(item.url) === url) {
            return true
        }

        if (containsURL(item.children, url)) {
            return true
        }
    }

    return false
}

/**
 * A URL can be the root of its own section and also a plain link inside an earlier section.
 * Match the section that owns the URL first, so the earlier link does not shadow it. A section
 * without children has no sidebar of its own, so it stays out of that first pass.
 */
export function getActiveMenuSection<T extends MenuNode>(
    sections: T[] | undefined,
    url: string | undefined
): T | undefined {
    if (url) {
        const owner = sections?.find((section) => section.children?.length && pathOf(section.url) === url)
        if (owner) {
            return owner
        }
    }

    return sections?.find((section) => pathOf(section.url) === url || containsURL(section.children, url))
}
