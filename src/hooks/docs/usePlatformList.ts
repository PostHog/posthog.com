/**
 * usePlatformList: Auto-populates platform cards from MDX files
 * PR example: https://github.com/PostHog/posthog.com/pull/13838
 *
 * Landing pages automatically display cards by reading MDX files and
 * sidebar navigation at build time. No more manually maintaining hardcoded platform lists!
 *
 * Add a platform to an existing section:
 * 1. Create MDX file with frontmatter:
 *    ---
 *    title: Elixir error tracking installation
 *    platformLogo: elixir
 *    ---
 * 2. Add to sidebar in src/navs/index.js, the order there = order on page
 * 3. Done!
 *
 * Remove a platform:
 * 1. Delete MDX file
 * 2. Remove from sidebar in src/navs/index.js
 * 3. It auto-deletes from the platformList at build time
 *
 * Add pattern to new section:
 * 1. Add platformLogo or platformIconName to all platform MDX files' frontmatter, see `src/constants/logos.ts` for available keys
 * 2. Create _snippets/[section]-platforms.tsx, must use a unique name
 * 3. Update sidebar with section children in src/navs/index.js
 * 4. Import and use snippet in index.mdx, must use a unique name
 *
 * MDX frontmatter format:
 * - platformLogo: Key from `src/constants/logos.ts` (e.g., "stripe", "react", "nodejs")
 * - platformIconName: Icon like "IconCode" (fallback if no logo)
 *
 * Usage:
 * const platforms = usePlatformList('docs/error-tracking/installation', 'error tracking installation')
 * const platforms = usePlatformList('docs/revenue-analytics/payment-platforms', 'payment platform')
 */

import { useStaticQuery, graphql } from 'gatsby'
import { docsMenu } from '../../navs'
import { getLogo } from '../../constants/logos'

interface Platform {
    url: string
    label: string
    image?: string
    icon?: string
}

/**
 * Recursively searches for a section with the given URL and returns its children URLs
 */
function findSectionChildren(sections: any[], targetUrl: string): string[] {
    for (const section of sections) {
        if (section.url === targetUrl && section.children) {
            return section.children
                .filter((child: any) => child.url && child.url !== targetUrl)
                .map((child: any) => child.url)
        }
        if (section.children) {
            const result = findSectionChildren(section.children, targetUrl)
            if (result.length > 0) return result
        }
    }
    return []
}

/**
 * Extracts platform URLs from sidebar navigation to determine display order
 * Looks up the section within docsMenu and returns child URLs in order
 */
function getSidebarOrder(sidebarPath: string): string[] {
    const sections: any[] = (docsMenu as any).children || []
    const fullPath = `/${sidebarPath}`

    return findSectionChildren(sections, fullPath)
}

interface UsePlatformListOptions {
    platformSourceType?: 'managed' | 'self-hosted'
}

export default function usePlatformList(
    basePath: string,
    titleSuffix?: string,
    options?: UsePlatformListOptions
): Platform[] {
    const { allMdx } = useStaticQuery(graphql`
        query {
            allMdx(filter: { frontmatter: { title: { ne: null } } }) {
                nodes {
                    slug
                    frontmatter {
                        title
                        platformLogo
                        platformIconName
                        platformSourceType
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
            if (options?.platformSourceType && node.frontmatter.platformSourceType !== options.platformSourceType)
                return false
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

            // Strip common prefixes like "Linking"
            label = label.replace(/^Linking\s+/i, '')

            const platform: Platform = {
                label,
                url: `/${node.slug}`,
            }

            if (node.frontmatter.platformLogo) {
                const logoUrl = getLogo(node.frontmatter.platformLogo)
                if (logoUrl) {
                    platform.image = logoUrl
                }
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
