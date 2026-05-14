import React from 'react'
import SEO from 'components/seo'
import ImageGenerator from 'components/ImageGenerator'
import Explorer from 'components/Explorer'
import { useUser } from 'hooks/useUser'

function GatedExplorer() {
    return (
        <Explorer template="generic" slug="image-generator" title="Image generator">
            <div className="p-8 text-center">
                <h2>This tool is for moderators</h2>
                <p className="text-secondary">Sign in with a moderator account to use the image generator.</p>
            </div>
        </Explorer>
    )
}

export default function ImageGeneratorPage() {
    const { isModerator } = useUser()
    return (
        <>
            <SEO
                title="Image generator - Internal"
                description="Generate event posters, blog images, and social cards."
                image={`/images/og/default.png`}
            />
            {isModerator ? <ImageGenerator /> : <GatedExplorer />}
        </>
    )
}
