import React, { useState, useEffect } from 'react'
import Explorer from 'components/Explorer'
import MediaPlayer from 'components/MediaPlayer'

import SEO from 'components/seo'

export default function Demo(): JSX.Element {
    return (
        <>
            <SEO
                title="Demo - PostHog"
                description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/default.png`}
            />
            <MediaPlayer videoId="2jQco8hEvTI" />
        </>
    )
}
