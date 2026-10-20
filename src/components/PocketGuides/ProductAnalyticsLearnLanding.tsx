import React from 'react'
import { IconPlay } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { TWIG_URL } from '../../constants'
import LearnLanding from './LearnLanding'
import TwigBrowseFigure from './TwigBrowseFigure'
import type { LearnLandingProps } from './LearnPage'

/** Short Twig preview for the Learn overview. */
function LearnByDoingPreview(): JSX.Element {
    return (
        <div className="not-prose grid min-w-0 items-start gap-6 @2xl/reader-content:grid-cols-2 @2xl/reader-content:gap-8">
            <div>
                <div className="mb-5 flex items-center gap-3">
                    <IconPlay className="size-6 shrink-0 text-orange" />
                    <h2 className="m-0 text-2xl font-bold">Learn by doing</h2>
                </div>
                <h3 className="mt-0 mb-3 text-lg font-semibold leading-relaxed">
                    Explore a fully instrumented product.
                </h3>
                <p className="mt-0 mb-5 leading-relaxed text-secondary">
                    Twig is a real website with a live playground for learning PostHog and exploring real code.
                </p>
                <OSButton asLink to={TWIG_URL} external hideExternalIcon variant="primary" size="md">
                    Explore Twig
                </OSButton>
            </div>
            <div className="min-w-0">
                <TwigBrowseFigure id="overview-twig-preview" />
                <p className="mt-2 mb-0 text-sm text-secondary">Try the destination filters to explore Twig’s stays.</p>
            </div>
        </div>
    )
}

/** A home for three learning experiences; the story continues in embedded Learn chapters. */
export default function ProductAnalyticsLearnLanding(props: LearnLandingProps): JSX.Element {
    return (
        <LearnLanding
            {...props}
            intro="Learn what to track, what your data means, and how to answer questions about your product."
            storyLead="Follow engineers as they build a product."
            storyText="Read how engineers decide what to track and use that data to answer questions about their product."
        >
            <section
                id="live-playground"
                className="mt-8 scroll-mt-20 border-t border-primary pt-6 @2xl/reader-content:mt-10 @2xl/reader-content:pt-8"
            >
                <LearnByDoingPreview />
            </section>
        </LearnLanding>
    )
}
