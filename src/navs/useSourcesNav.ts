import { useStaticQuery, graphql } from 'gatsby'
import { SELF_HOSTED_SOURCES } from '../constants/sources'

export default function useSourcesNav(basePath = '/docs/data-warehouse/sources'): { url?: string; name: string }[] {
    const { allPostHogSource } = useStaticQuery(graphql`
        query SourcesNav {
            allPostHogSource(filter: { unreleased: { ne: true } }, sort: { fields: name, order: ASC }) {
                nodes {
                    slug
                    name
                    beta
                }
            }
        }
    `)

    const managed = allPostHogSource.nodes.map((node: any) => ({
        url: `${basePath}/${node.slug}`,
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
