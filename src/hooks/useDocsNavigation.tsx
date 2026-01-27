import { useMemo } from 'react'
import { docsMenu } from '../navs'

interface NavItem {
    name: string
    url?: string
    icon?: string
    color?: string
    children?: NavItem[]
    badge?: {
        title: string
        className?: string
    }
    featured?: boolean
}

interface DocsSection {
    name: string
    url: string
    color?: string
    colorDark?: string
    icon?: string
    description?: string
    children: NavItem[]
}

/**
 * Hook to get docs navigation for a specific product section
 * @param docsPath - The base docs path (e.g., "/docs/llm-analytics")
 * @returns The navigation structure for that docs section
 */
export function useDocsNavigation(docsPath: string): NavItem[] | null {
    const navigation = useMemo(() => {
        if (!docsPath) return null

        // Search through docsMenu children to find matching section
        const docsChildren = (docsMenu as any)?.children || []

        for (const section of docsChildren) {
            if (section.url === docsPath) {
                return section.children || []
            }
        }

        return null
    }, [docsPath])

    return navigation
}

/**
 * Hook to get docs section metadata (name, description, icon, etc.)
 * @param docsPath - The base docs path (e.g., "/docs/llm-analytics")
 * @returns The section metadata
 */
export function useDocsSectionMeta(docsPath: string): DocsSection | null {
    const section = useMemo(() => {
        if (!docsPath) return null

        const docsChildren = (docsMenu as any)?.children || []

        for (const s of docsChildren) {
            if (s.url === docsPath) {
                return s as DocsSection
            }
        }

        return null
    }, [docsPath])

    return section
}

export default useDocsNavigation
