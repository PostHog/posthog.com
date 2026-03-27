import { useStaticQuery, graphql } from 'gatsby'

const SELF_MANAGED_SOURCES = [
    { name: 'S3', slug: 's3' },
    { name: 'Azure Blob', slug: 'azure-blob' },
    { name: 'Cloudflare R2', slug: 'r2' },
    { name: 'Google Cloud Storage', slug: 'gcs' },
]

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

    const selfManaged = SELF_MANAGED_SOURCES.map((s) => ({
        name: s.name,
        url: `${basePath}/${s.slug}`,
    }))

    return [...managed, { name: 'Self-managed' }, ...selfManaged]
}
