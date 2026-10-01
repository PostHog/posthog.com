interface MenuTabNavigationArgs {
    href?: string
    tabValue: string
    activeTab: string
    navigateOnActiveClick?: boolean
    currentPath?: string
}

const normalizePath = (path?: string): string | undefined => path?.replace(/\/$/, '')

/** Pure navigation rule shared by the ReaderView sidebar and its focused tests. */
export function shouldNavigateMenuTab({
    href,
    tabValue,
    activeTab,
    navigateOnActiveClick,
    currentPath,
}: MenuTabNavigationArgs): boolean {
    if (!href) return false
    if (tabValue !== activeTab) return true
    return Boolean(navigateOnActiveClick && normalizePath(currentPath) !== normalizePath(href))
}
