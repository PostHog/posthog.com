import { useStaticQuery, graphql } from 'gatsby'
import { EXTRA_SOURCES } from '../constants/sources'
import { getSourceDocsPath } from '../lib/sourceDocs'

export default function useSourcesNav(basePath = '/docs/data-pipelines/sources'): { url?: string; name: string }[] {
    const { allPostHogSource } = useStaticQuery(graphql`
        query SourcesNav {
            allPostHogSource(filter: { unreleased: { ne: true } }, sort: { fields: name, order: ASC }) {
                nodes {
                    slug
                    name
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
        url: getSourceDocsPath(node, basePath),
        name: node.name,
    }))

    const extra = EXTRA_SOURCES.map((s) => ({
        name: s.name,
        url: `${basePath}/${s.slug}`,
    }))

    return [...managed, ...extra].sort((a, b) => a.name.localeCompare(b.name))
}
