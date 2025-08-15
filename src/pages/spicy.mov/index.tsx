import React, { useState, useEffect } from 'react'
import Explorer from 'components/Explorer'
import MediaPlayer from 'components/MediaPlayer'

import SEO from 'components/seo'

export default function Spicy(): JSX.Element {
    return (
        <>
            <SEO
                title="spicy.mov - PostHog"
                description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/product-analytics.jpg`}
            />
            <MediaPlayer videoId="dQw4w9WgXcQ" />
        </>
    )
}
