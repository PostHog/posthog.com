import { useStaticQuery, graphql } from 'gatsby'

export default function useSourcePlatforms() {
    const { allPostHogSource } = useStaticQuery(graphql`
        query SourcePlatforms {
            allPostHogSource(filter: { unreleased: { ne: true } }, sort: { fields: name, order: ASC }) {
                nodes {
                    name
                    slug
                    icon_url
                }
            }
        }
    `)

    return allPostHogSource.nodes.map((node: any) => ({
        label: node.name,
        url: `/docs/cdp/sources/${node.slug}`,
        image: node.icon_url,
    }))
}
