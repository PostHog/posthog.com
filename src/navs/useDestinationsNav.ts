import { useStaticQuery, graphql } from 'gatsby'

export default function useDestinationsNav(): { slug: string; name: string }[] {
    const { allPostHogDestination } = useStaticQuery(graphql`
        query {
            allPostHogDestination(filter: { mdx: { id: { eq: null } } }) {
                nodes {
                    slug
                    name
                }
            }
        }
    `)

    return allPostHogDestination.nodes.map((node) => ({
        url: `/docs/cdp/destinations/${node.slug}`,
        name: node.name,
    }))
}
