import { useStaticQuery, graphql } from 'gatsby'
import { SELF_HOSTED_SOURCES } from '../constants/sources'

function docsSourceSlug(node: {
    slug: string
    mdx?: { fields?: { slug?: string | null } | null } | null
}): string {
    const mdxSlug = node.mdx?.fields?.slug
    if (!mdxSlug) {
        return node.slug
    }
    const match = mdxSlug.match(/\/docs\/(?:cdp|data-warehouse)\/sources\/([^/]+)\/?$/)
    return match?.[1] ?? node.slug
}

export default function useSourcesNav(basePath = '/docs/data-warehouse/sources'): { url?: string; name: string }[] {
    const { allPostHogSource } = useStaticQuery(graphql`
        query SourcesNav {
            allPostHogSource(filter: { unreleased: { ne: true } }, sort: { fields: name, order: ASC }) {
                nodes {
                    slug
                    name
                    beta
                    mdx {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `)

    const managed = allPostHogSource.nodes.map((node: any) => ({
        url: `${basePath}/${docsSourceSlug(node)}`,
        name: node.name,
        ...(node.beta && {
            badge: {
                title: 'Beta',
                className: '!bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
            },
        }),
    }))

    const selfManaged = SELF_HOSTED_SOURCES.map((s) => ({
        name: s.name,
        url: `${basePath}/${s.slug}`,
    }))

    return [...managed, { name: 'Self-managed' }, ...selfManaged]
}