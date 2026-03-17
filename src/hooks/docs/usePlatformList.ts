/**
 * usePlatformList: Auto-populates platform cards from MDX files
 * PR example: https://github.com/PostHog/posthog.com/pull/13838
 *
 * Landing pages automatically display cards by reading MDX files and
 * sidebar navigation at build time. Only platforms listed in the sidebar
 * will appear on the page.
 *
 * Add a platform to an existing section:
 * 1. Create MDX file with frontmatter:
 *    ---
 *    title: Elixir error tracking installation
 *    platformLogo: elixir
 *    ---
 * 2. Add to sidebar in src/navs/index.js (platforms are sorted alphabetically)
 * 3. Done!
 *
 * Remove a platform:
 * 1. Remove from sidebar in src/navs/index.js - this removes it from the page
 * 2. Optionally delete MDX file if no longer needed
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
 * Collects all URLs from a section and its nested children
 */
function collectAllUrls(children: any[], parentUrl: string): string[] {
    const urls: string[] = []
    for (const child of children) {
        if (child.url && child.url !== parentUrl) {
            urls.push(child.url)
        }
        if (child.children) {
            urls.push(...collectAllUrls(child.children, child.url))
        }
    }
    return urls
}

interface SidebarSection {
    urls: string[]
    sortChildrenAlpha?: boolean
}

/**
 * Searches for a section with the given URL and returns its descendant URLs and config
 */
function findSection(sections: any[], targetUrl: string): SidebarSection | null {
    for (const section of sections) {
        if (section.url === targetUrl && section.children) {
            return {
                urls: collectAllUrls(section.children, targetUrl),
                sortChildrenAlpha: section.sortChildrenAlpha,
            }
        }
        if (section.children) {
            const result = findSection(section.children, targetUrl)
            if (result) return result
        }
    }
    return null
}

/**
 * Extracts platform URLs and config from sidebar navigation
 * Looks up the section within docsMenu and returns child URLs and properties
 */
function getSidebarSection(sidebarPath: string): SidebarSection | null {
    const sections: any[] = (docsMenu as any).children || []
    const fullPath = `/${sidebarPath}`

    return findSection(sections, fullPath)
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

    const section = getSidebarSection(basePath)

    if (section && section.urls.length > 0) {
        // Warn about MDX files that exist but aren't in the sidenav
        const orphanedFiles = result.filter((platform: Platform) => !section.urls.includes(platform.url))
        if (orphanedFiles.length > 0) {
            console.warn(
                `[usePlatformList] Found ${orphanedFiles.length} MDX file(s) in "${basePath}" not listed in sidenav:\n` +
                    orphanedFiles.map((p: Platform) => `  - ${p.url}`).join('\n') +
                    `\nAdd these to src/navs/index.js or delete the MDX files if they're no longer needed.`
            )
        }

        // Filter to only include items that are in the sidebar, then sort alphabetically if configured
        const filtered = result.filter((platform: Platform) => section.urls.includes(platform.url))
        return section.sortChildrenAlpha
            ? filtered.sort((a: Platform, b: Platform) => a.label.localeCompare(b.label))
            : filtered
    }

    return result
}
