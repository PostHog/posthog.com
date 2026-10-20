import React from 'react'
import { graphql } from 'gatsby'
import DocsPocketGuide from 'components/PocketGuides/DocsPocketGuide'
import LearnPage from 'components/PocketGuides/LearnPage'
import { volumeById } from '../constants/pocketGuides'

interface PocketGuideTemplateProps {
    data: { mdx: { excerpt: string; frontmatter: { title: string; subtitle?: string; description?: string } } }
    pageContext: { volumeId: string; chapter: string }
}

/** Each authored chapter gets its own HTML page, metadata, and public URL. */
export default function PocketGuideTemplate({ data, pageContext }: PocketGuideTemplateProps): JSX.Element | null {
    const { volumeId, chapter } = pageContext
    const volume = volumeById(volumeId)
    if (!volume) return null
    const { title, subtitle, description } = data.mdx.frontmatter
    const pageDescription = description || subtitle || data.mdx.excerpt || volume.description
    if (!volume.productHandle)
        return <DocsPocketGuide volumeId={volumeId} chapter={chapter} description={pageDescription} />
    return (
        <LearnPage
            productHandle={volume.productHandle}
            chapter={chapter}
            title={`${title} – ${volume.title} pocket guide`}
            description={pageDescription}
        />
    )
}

export const query = graphql`
    query PocketGuideChapter($id: String!) {
        mdx(id: { eq: $id }) {
            excerpt(pruneLength: 160)
            frontmatter {
                title
                subtitle
                description
            }
        }
    }
`
