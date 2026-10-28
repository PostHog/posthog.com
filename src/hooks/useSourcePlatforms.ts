import { useStaticQuery, graphql } from 'gatsby'
import { getSourceDocsPath } from '../lib/sourceDocs'

export default function useSourcePlatforms() {
    const { allPostHogSource } = useStaticQuery(graphql`
        query SourcePlatforms {
            allPostHogSource(filter: { unreleased: { ne: true } }, sort: { fields: name, order: ASC }) {
                nodes {
                    name
                    slug
                    mdx {
                        fields {
                            slug
                        }
                    }
                    icon_url
                }
            }
        }
    `)

    return allPostHogSource.nodes.map((node: any) => ({
        label: node.name,
        url: getSourceDocsPath(node),
        image: node.icon_url,
    }))
}
