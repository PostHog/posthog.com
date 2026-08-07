import { ImageDataLike } from 'gatsby-plugin-image'

/** A `/newsletter/*` MDX node, shaped by the `/build-mode` page query. */
export type BuildModePost = {
    id: string
    fields: { slug: string }
    excerpt?: string
    frontmatter: {
        title: string
        /** `MMM D` – used where space is tight (featured, pinned cards). */
        shortDate: string
        /** `MMM D, YYYY` – used in the gallery. */
        fullDate: string
        tags?: string[]
        seo?: { metaDescription?: string }
        featuredImage?: {
            publicURL?: string
            childImageSharp?: ImageDataLike | null
        }
        authors?: { name?: string }[]
    }
}
