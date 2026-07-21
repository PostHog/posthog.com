import React from 'react'
import Editor from 'components/Editor'
import SEO from 'components/seo'
import EarlyAccessFeaturesSection from 'components/Roadmap/EarlyAccessFeaturesSection'

const RoadmapPage = () => {
    return (
        <>
            <SEO
                title="Roadmap – PostHog"
                description="See what we're building next"
                image={`/images/og/roadmap.jpg`}
            />
            <Editor
                hideToolbar
                hasTabs
                transparentBackground
                type="roadmap"
                proseSize="base"
                maxWidth="100%"
                bookmark={{
                    title: 'Roadmap',
                    description: "See what we're building next",
                }}
            >
                <div
                    data-scheme="primary"
                    className="@container flex h-full min-h-0 flex-col gap-3 overflow-hidden border-t border-primary bg-transparent p-3 text-primary @xl:p-4"
                >
                    <header className="flex shrink-0 items-center justify-between gap-4">
                        <div className="min-w-0">
                            <h1 className="m-0 text-2xl @xl:text-3xl">Roadmap</h1>
                            <p className="mb-0 mt-1 max-w-3xl text-sm text-secondary">
                                Follow features from concept to alpha to beta. Open a card for details, ownership, and
                                early access.
                            </p>
                        </div>
                        <img
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/hog_engineer_0eebaf7af1.png"
                            alt="A hedgehog engineer hard at work"
                            className="hidden max-h-20 shrink-0 @3xl:block"
                        />
                    </header>
                    <EarlyAccessFeaturesSection />
                </div>
            </Editor>
        </>
    )
}

export default RoadmapPage
