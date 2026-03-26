import { useStaticQuery, graphql } from 'gatsby'

export default function useSourcesNav(): { url: string; name: string }[] {
    const { allPostHogSource } = useStaticQuery(graphql`
        query SourcesNav {
            allPostHogSource(filter: { unreleased: { ne: true } }, sort: { name: ASC }) {
                nodes {
                    slug
                    name
                    beta
                }
            }
        }
    `)

    return allPostHogSource.nodes.map((node: any) => ({
        url: `/docs/cdp/sources/${node.slug}`,
        name: node.name,
        ...(node.beta && {
            badge: {
                title: 'Beta',
                className: '!bg-blue/10 !text-blue !dark:text-white !dark:bg-blue/50',
            },
        }),
    }))
}
