import React from 'react'
import Editor from 'components/Editor'
import SEO from 'components/seo'
import EarlyAccessFeaturesSection from 'components/Roadmap/EarlyAccessFeaturesSection'
import { ROADMAP_STAGE_STYLES } from 'components/Roadmap/roadmapStageStyles'

const RoadmapPage = () => {
    return (
        <>
            <SEO
                title="Roadmap - PostHog"
                description="See what we're building next"
                image={`/images/og/roadmap.jpg`}
            />
            <Editor
                hideToolbar
                hasPadding={false}
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
                    className="@container flex min-h-full flex-col gap-3 bg-transparent p-3 text-primary @xl:p-4"
                >
                    <header className="grid gap-4 px-2 @3xl:grid-cols-[minmax(0,1fr)_minmax(22rem,34rem)] @3xl:items-center @3xl:gap-8">
                        <div className="min-w-0">
                            <h1 className="m-0 text-2xl @xl:text-3xl">Roadmap</h1>
                            <p className="mb-0 mt-2 max-w-5xl text-base leading-relaxed text-secondary">
                                Here's what we're building. Betas are ready to enable today, and anything coming soon
                                has a waitlist. Drop your email and we'll let you know the moment it ships.
                            </p>
                            <p className="mb-0 mt-3 max-w-5xl text-sm leading-relaxed text-secondary">
                                Every feature moves through stages:{' '}
                                <span
                                    className={`rounded-sm px-1 py-0.5 font-semibold ${ROADMAP_STAGE_STYLES.concept.surface} ${ROADMAP_STAGE_STYLES.concept.text}`}
                                >
                                    concept
                                </span>{' '}
                                and{' '}
                                <span
                                    className={`rounded-sm px-1 py-0.5 font-semibold ${ROADMAP_STAGE_STYLES.alpha.surface} ${ROADMAP_STAGE_STYLES.alpha.text}`}
                                >
                                    alpha
                                </span>{' '}
                                are early ideas,{' '}
                                <span
                                    className={`rounded-sm px-1 py-0.5 font-semibold ${ROADMAP_STAGE_STYLES.beta.surface} ${ROADMAP_STAGE_STYLES.beta.text}`}
                                >
                                    beta
                                </span>{' '}
                                is ready to try, and then it reaches general availability.
                            </p>
                        </div>
                        <img
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/w_1000,c_limit,q_auto,f_auto/self_driving_with_road_3ff29b8dc3.png"
                            alt="A hedgehog driving down the road in a dinosaur costume"
                            className="w-full max-w-[34rem] justify-self-end object-contain"
                        />
                    </header>
                    <EarlyAccessFeaturesSection />
                </div>
            </Editor>
        </>
    )
}

export default RoadmapPage
