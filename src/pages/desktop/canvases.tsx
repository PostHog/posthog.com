import React from 'react'
import Editor from 'components/Editor'
import { SEO } from 'components/seo'
import Link from 'components/Link'
import CanvasGallery from 'components/Code/CanvasGallery'

export default function DesktopCanvasesPage(): JSX.Element {
    return (
        <>
            <SEO
                title="Canvas gallery – PostHog Desktop"
                description="Live example canvases built with PostHog Desktop, sorted by how long they should live. See each one running on dummy data, copy the prompt, and build your own."
                image="/images/og/default.png"
            />
            <Editor
                maxWidth={1100}
                title="canvases"
                type="gallery"
                bookmark={{
                    title: 'Canvas gallery',
                    description: 'Example canvases for PostHog Desktop, with prompts',
                }}
            >
                <h1 className="!mt-0 mb-2 text-3xl">Canvas gallery</h1>
                <p className="!mt-0 mb-2">
                    A canvas is an app an agent builds around your PostHog data. Most people's first canvas is a
                    dashboard. That is fine. Most people's second canvas is also a dashboard, and that is the problem
                    this page exists to fix.
                </p>
                <p className="!mt-0 mb-2">
                    Canvases come in three shapes, sorted by how long they should live. Each one below is{' '}
                    <strong>running live on dummy data</strong>. Open it, watch it tick, copy the prompt, and change the
                    nouns. The suggested model is the cheapest one that reliably builds that shape, because a canvas you
                    throw away in an hour should not cost the same as one you keep for a year.
                </p>
                <p className="!mt-0 mb-4 text-sm">
                    New to canvases? Read the{' '}
                    <Link to="/docs/posthog-desktop/canvases" state={{ newWindow: true }}>
                        canvas docs
                    </Link>{' '}
                    first. Want your canvas in this gallery? Post it in{' '}
                    <Link to="/questions" state={{ newWindow: true }}>
                        the community
                    </Link>{' '}
                    with the prompt you used.
                </p>
                <CanvasGallery />
            </Editor>
        </>
    )
}
