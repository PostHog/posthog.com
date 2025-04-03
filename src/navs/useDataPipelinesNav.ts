import { useStaticQuery, graphql } from 'gatsby'

export default function useDataPipelinesNav({ type }: { type?: string }): { slug: string; name: string }[] {
    const { allPostHogPipeline } = useStaticQuery(graphql`
        query {
            allPostHogPipeline(filter: { mdx: { id: { eq: null } } }) {
                nodes {
                    slug
                    name
                    type
                }
            }
        }
    `)

    return allPostHogPipeline.nodes
        .filter((node: any) => (type ? node.type === type : true))
        .sort((a: any, b: any) => a.name.localeCompare(b.name))
        .map((node: any) => ({
            url: `/docs/cdp/${type}s/${node.slug}`,
            name: node.name,
        }))
}
