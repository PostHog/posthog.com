import { useStaticQuery, graphql } from 'gatsby'

const SELF_MANAGED_SOURCES = [
    { name: 'S3', url: '/docs/data-warehouse/sources/s3' },
    { name: 'Azure Blob', url: '/docs/data-warehouse/sources/azure-blob' },
    { name: 'Cloudflare R2', url: '/docs/data-warehouse/sources/r2' },
    { name: 'Google Cloud Storage', url: '/docs/data-warehouse/sources/gcs' },
]

export default function useSourcesNav(): { url?: string; name: string }[] {
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
        url: `/docs/data-warehouse/sources/${node.slug}`,
        name: node.name,
        ...(node.beta && {
            badge: {
                title: 'Beta',
                className: '!bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
            },
        }),
    }))

    return [...managed, { name: 'Self-managed' }, ...SELF_MANAGED_SOURCES]
}
