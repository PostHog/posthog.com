/**
 * useServicesList - Auto-populates service integration cards from MDX files
 *
 * Similar to useFrameworkList but for service integrations (no-code builders,
 * e-commerce platforms, automation tools, data pipelines, etc.).
 * Reads from /docs/libraries/ and uses the Services nav section for ordering.
 *
 * FRONTMATTER:
 * - title: Service name (e.g., "Zapier")
 * - icon: URL to logo (e.g., "https://res.cloudinary.com/.../zapier.svg")
 *
 * USAGE:
 * const services = useServicesList()
 */

import { useStaticQuery, graphql } from 'gatsby'
import { docsMenu } from '../../navs'

interface Service {
    url: string
    label: string
    image?: string
}

/**
 * Recursively searches for a section with the given URL and returns its children URLs.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function findSectionChildren(sections: any[], targetUrl: string): string[] {
    for (const section of sections) {
        if (section.url === targetUrl && section.children) {
            return (
                section.children
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .filter((child: any) => child.url && child.url !== targetUrl)
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .map((child: any) => child.url)
            )
        }
        if (section.children) {
            const result = findSectionChildren(section.children, targetUrl)
            if (result.length > 0) return result
        }
    }
    return []
}

/**
 * Gets service URLs from the Services nav section to determine display order.
 */
function getServicesNavOrder(): string[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sections: any[] = (docsMenu as any).children || []
    return findSectionChildren(sections, '/docs/services')
}

export default function useServicesList(): Service[] {
    const { allMdx } = useStaticQuery(graphql`
        query {
            allMdx(filter: { frontmatter: { title: { ne: null } } }) {
                nodes {
                    slug
                    frontmatter {
                        title
                        icon {
                            publicURL
                        }
                    }
                }
            }
        }
    `)

    // Get the list of service URLs from nav to filter and order by
    const serviceUrls = getServicesNavOrder()

    const result = allMdx.nodes
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((node: any) => {
            // Remove trailing slash from slug if present (for index.mdx files in directories)
            const normalizedSlug = node.slug.replace(/\/$/, '')
            const url = `/${normalizedSlug}`
            return serviceUrls.includes(url)
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((node: any) => {
            let label = node.frontmatter.title

            // Strip "How to set up X analytics with PostHog" pattern to just "X"
            const howToMatch = label.match(/^How to set up (.+?) analytics with PostHog$/i)
            if (howToMatch) {
                label = howToMatch[1]
            }

            // Remove trailing slash from slug if present (for index.mdx files in directories)
            const normalizedSlug = node.slug.replace(/\/$/, '')

            const service: Service = {
                label,
                url: `/${normalizedSlug}`,
            }

            if (node.frontmatter.icon?.publicURL) {
                service.image = node.frontmatter.icon.publicURL
            }

            return service
        })

    // Sort by nav order
    return result.sort((a: Service, b: Service) => {
        const indexA = serviceUrls.indexOf(a.url)
        const indexB = serviceUrls.indexOf(b.url)

        if (indexA !== -1 && indexB !== -1) return indexA - indexB
        if (indexA !== -1) return -1
        if (indexB !== -1) return 1
        return 0
    })
}
