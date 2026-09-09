import React from 'react'
import Editor from 'components/Editor'
import { SEO } from 'components/seo'
import CanvasGallery, { CanvasGalleryHeader } from 'components/Code/CanvasGallery'

export default function DesktopCanvasesPage(): JSX.Element {
    return (
        <>
            <SEO
                title="Canvas gallery – PostHog Desktop"
                description="Live example canvases for investigating, monitoring, and presenting PostHog data. See each one running on dummy data, copy the prompt, and build your own."
                image="/images/og/default.png"
            />
            <Editor
                maxWidth={1100}
                bookmark={{
                    title: 'Canvas gallery',
                    description: 'Example canvases for PostHog Desktop, with prompts',
                }}
            >
                <CanvasGalleryHeader />
                <CanvasGallery />
            </Editor>
        </>
    )
}
