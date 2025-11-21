import React, { useState, useEffect } from 'react'
import Explorer from 'components/Explorer'
import MediaPlayer from 'components/MediaPlayer'

import SEO from 'components/seo'

export default function Demo(): JSX.Element {
    return (
        <>
            <SEO
                title="The SDK doctor will see you now - PostHog Changelog S1E3"
                description="PostHog is the only developer platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/default.png`}
            />
            <MediaPlayer videoId="xCrfK6eMexg" />
        </>
    )
}
