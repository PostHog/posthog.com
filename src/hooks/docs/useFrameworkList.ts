/**
 * useFrameworkList - Auto-populates framework cards from MDX files
 *
 * Similar to usePlatformList but specifically for framework guides.
 * Reads from /docs/libraries/ and uses the Frameworks nav section for ordering.
 *
 * FRONTMATTER:
 * - title: Framework name (e.g., "Next.js")
 * - platformLogo: Key from `src/constants/logos.ts` (e.g., "nextjs", "react")
 * - platformIconName: Icon like "IconCode" (fallback if no logo)
 *
 * USAGE:
 * const frameworks = useFrameworkList()
 */

import { useStaticQuery, graphql } from 'gatsby'
import { docsMenu } from '../../navs'
import { getLogo } from '../../constants/logos'

interface Framework {
    url: string
    label: string
    image?: string
    icon?: string
}

/**
 * Recursively searches for a section with the given URL and returns its children URLs.
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
 * Gets framework URLs from the Frameworks nav section to determine display order.
 */
function getFrameworksNavOrder(): string[] {
    const sections: any[] = (docsMenu as any).children || []
    return findSectionChildren(sections, '/docs/frameworks')
}

export default function useFrameworkList(): Framework[] {
    const { allMdx } = useStaticQuery(graphql`
        query {
            allMdx(filter: { frontmatter: { title: { ne: null } } }) {
                nodes {
                    slug
                    frontmatter {
                        title
                        platformLogo
                        platformIconName
                    }
                }
            }
        }
    `)

    // Get the list of framework URLs from nav to filter and order by
    const frameworkUrls = getFrameworksNavOrder()

    const result = allMdx.nodes
        .filter((node: any) => {
            // Remove trailing slash from slug if present (for index.mdx files in directories)
            const normalizedSlug = node.slug.replace(/\/$/, '')
            const url = `/${normalizedSlug}`
            return frameworkUrls.includes(url)
        })
        .map((node: any) => {
            let label = node.frontmatter.title

            // Strip "How to set up X analytics with PostHog" pattern to just "X"
            const howToMatch = label.match(/^How to set up (.+?) analytics with PostHog$/i)
            if (howToMatch) {
                label = howToMatch[1]
            }

            // Remove trailing slash from slug if present (for index.mdx files in directories)
            const normalizedSlug = node.slug.replace(/\/$/, '')

            const framework: Framework = {
                label,
                url: `/${normalizedSlug}`,
            }

            if (node.frontmatter.platformLogo) {
                const logoUrl = getLogo(node.frontmatter.platformLogo)
                if (logoUrl) {
                    framework.image = logoUrl
                }
            } else if (node.frontmatter.platformIconName) {
                framework.icon = node.frontmatter.platformIconName
            }

            return framework
        })

    // Sort by nav order
    return result.sort((a: Framework, b: Framework) => {
        const indexA = frameworkUrls.indexOf(a.url)
        const indexB = frameworkUrls.indexOf(b.url)

        if (indexA !== -1 && indexB !== -1) return indexA - indexB
        if (indexA !== -1) return -1
        if (indexB !== -1) return 1
        return 0
    })
}
