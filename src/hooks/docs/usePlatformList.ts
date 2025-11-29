/**
 * usePlatformList - Auto-populates platform cards from MDX files
 * PR example: https://github.com/PostHog/posthog.com/pull/13838
 *
 * Landing pages automatically display cards by reading MDX files and
 * sidebar navigation at build time. No more manually maintaining hardcoded platform lists!
 *
 * Currently used in: error-tracking/installation, experiments/installation
 *
 * ADD A PLATFORM (to existing section):
 * 1. Create MDX file with frontmatter:
 *    ---
 *    title: Elixir error tracking installation
 *    platformImageUrl: https://res.cloudinary.com/.../elixir.svg
 *    ---
 * 2. Add to sidebar in src/navs/index.js (order there = order on page)
 * 3. Done!
 *
 * REMOVE A PLATFORM:
 * 1. Delete MDX file
 * 2. Remove from sidebar in src/navs/index.js
 *
 * ADD PATTERN TO NEW SECTION:
 * 1. Add platformImageUrl/platformIconName to all platform MDX files
 * 2. Create _snippets/[section]-platforms.tsx (see existing examples)
 * 3. Update sidebar with section children in src/navs/index.js
 * 4. Import and use snippet in index.mdx
 *
 * FRONTMATTER:
 * - title: "[Platform] [section name]" (suffix trimmed for display)
 * - platformImageUrl: URL to logo (optional)
 * - platformIconName: Icon like "IconCode" (optional, fallback if no image)
 *
 * USAGE:
 * const platforms = usePlatformList('docs/error-tracking/installation', 'error tracking installation')
 * const platforms = usePlatformList('docs/revenue-analytics/payment-platforms', 'payment platform')
 */

import { useStaticQuery, graphql } from 'gatsby'
import { docsMenu } from '../../navs'

interface Platform {
    url: string
    label: string
    image?: string
    icon?: string
}

/**
 * Extracts platform URLs from sidebar navigation to determine display order.
 * Looks up the section within docsMenu and returns child URLs in order.
 */
function getSidebarOrder(sidebarPath: string): string[] {
    const sections: any[] = (docsMenu as any).children || []
    const fullPath = `/${sidebarPath}`
    const productPath = `/${sidebarPath.split('/').slice(0, 2).join('/')}`

    for (const section of sections) {
        if (section.url === productPath) {
            const targetSection = section.children?.find((child: any) => child.url === fullPath)

            if (targetSection?.children) {
                return targetSection.children
                    .filter((child: any) => child.url && child.url !== fullPath)
                    .map((child: any) => child.url)
            }
        }
    }

    return []
}

export default function usePlatformList(basePath: string, titleSuffix?: string): Platform[] {
    const { allMdx } = useStaticQuery(graphql`
        query {
            allMdx(filter: { frontmatter: { title: { ne: null } } }) {
                nodes {
                    slug
                    frontmatter {
                        title
                        platformImageUrl
                        platformIconName
                    }
                }
            }
        }
    `)

    const pathPattern = new RegExp(`^${basePath}/[^/]+$`)

    const result = allMdx.nodes
        .filter((node: any) => {
            if (!pathPattern.test(node.slug)) return false
            if (node.slug === basePath || node.slug.endsWith(`${basePath}/index`)) return false
            return true
        })
        .map((node: any) => {
            let label = node.frontmatter.title

            if (titleSuffix) {
                // Extract versioning content in title (ex: "(v3.6 and below)")
                const parenMatch = label.match(/\(([^)]+)\)/)
                const versionInfo = parenMatch ? ` ${parenMatch[0]}` : ''

                // Preserve versioning if applicable
                const suffixRegex = new RegExp(`\\s+${titleSuffix}(\\s*\\([^)]+\\))?$`, 'i')
                label = label.replace(suffixRegex, '').trim() + versionInfo
            }

            const platform: Platform = {
                label,
                url: `/${node.slug}`,
            }

            if (node.frontmatter.platformImageUrl) {
                platform.image = node.frontmatter.platformImageUrl
            } else if (node.frontmatter.platformIconName) {
                platform.icon = node.frontmatter.platformIconName
            }

            return platform
        })

    const sidebarOrder = getSidebarOrder(basePath)

    if (sidebarOrder.length > 0) {
        return result.sort((a: Platform, b: Platform) => {
            const indexA = sidebarOrder.indexOf(a.url)
            const indexB = sidebarOrder.indexOf(b.url)

            if (indexA !== -1 && indexB !== -1) return indexA - indexB
            if (indexA !== -1) return -1
            if (indexB !== -1) return 1
            return 0
        })
    }

    return result
}
