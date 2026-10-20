import React from 'react'
import LearnLanding from './LearnLanding'
import TwigBrowseFigure from './TwigBrowseFigure'
import type { LearnLandingProps } from './LearnPage'

/** A home for three learning experiences; the story continues in embedded Learn chapters. */
export default function ProductAnalyticsLearnLanding(props: LearnLandingProps): JSX.Element {
    return (
        <LearnLanding
            {...props}
            intro="Learn what to track, what your data means, and how to answer questions about your product."
            storyLead="Follow engineers as they build a product."
            storyText="Read how engineers decide what to track and use that data to answer questions about their product."
            playground={{
                figure: <TwigBrowseFigure id="overview-twig-preview" />,
                caption: 'Try the destination filters to explore Twig’s stays.',
            }}
        />
    )
}
