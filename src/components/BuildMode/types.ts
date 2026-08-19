import { ImageDataLike } from 'gatsby-plugin-image'

/** A `/newsletter/*` MDX node, shaped by the `/newsletter` page query. */
export type BuildModePost = {
    id: string
    fields: {
        slug: string
        /** Recent pageview count sourced from PostHog at build time; 0 when the build ran without POSTHOG_APP_API_KEY. */
        pageViews?: number | null
    }
    excerpt?: string
    frontmatter: {
        title: string
        /** `MMM D` – used where space is tight (featured). */
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
