import { useStaticQuery, graphql } from 'gatsby'

export default function useDestinationsNav(): { slug: string; name: string }[] {
    const { allPostHogPipeline } = useStaticQuery(graphql`
        query {
            allPostHogPipeline(filter: { type: { eq: "destination" } }) {
                nodes {
                    slug
                    name
                }
            }
        }
    `)

    return allPostHogPipeline.nodes.map((node) => ({
        url: `/docs/cdp/destinations/${node.slug}`,
        name: node.name,
    }))
}
