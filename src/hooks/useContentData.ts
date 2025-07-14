import { useStaticQuery, graphql } from 'gatsby'

export interface ContentNode {
    fields: {
        slug: string
    }
    rawBody: string
    frontmatter?: {
        title: string
        description?: string
    }
}

export interface ContentData {
    allMdx: {
        nodes: ContentNode[]
    }
}

/**
 * Hook to fetch content from multiple directories (tutorials, product-engineers, founders)
 * for use in product pages' QuestionsSlide component
 */
export function useContentData(): ContentData {
    const data = useStaticQuery(graphql`
        query ContentDataQuery {
            allMdx(filter: { fields: { slug: { regex: "/^/(tutorials|product-engineers|founders|docs)/" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    rawBody
                    frontmatter {
                        title
                        description
                    }
                }
            }
        }
    `)

    return data
}
