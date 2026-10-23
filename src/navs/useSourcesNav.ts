import { useStaticQuery, graphql } from 'gatsby'
import { SELF_HOSTED_SOURCES } from '../constants/sources'

export default function useSourcesNav(basePath = '/docs/data-pipelines/sources'): { url?: string; name: string }[] {
    const { allPostHogSource } = useStaticQuery(graphql`
        query SourcesNav {
            allPostHogSource(filter: { unreleased: { ne: true } }, sort: { fields: name, order: ASC }) {
                nodes {
                    slug
                    name
                }
            }
        }
    `)

    const managed = allPostHogSource.nodes.map((node: any) => ({
        url: `${basePath}/${node.slug}`,
        name: node.name,
    }))

    const selfManaged = SELF_HOSTED_SOURCES.map((s) => ({
        name: s.name,
        url: `${basePath}/${s.slug}`,
    }))

    return [...managed, { name: 'Self-managed' }, ...selfManaged]
}
