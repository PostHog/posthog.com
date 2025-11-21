import React, { useState, useEffect } from 'react'
import Explorer from 'components/Explorer'
import MediaPlayer from 'components/MediaPlayer'

import SEO from 'components/seo'

export default function Demo(): JSX.Element {
    return (
        <>
            <SEO
                title="The SDK doctor will see you now - PostHog Changelog S1E3"
                description="In this episode of PostHog Changelog, Max AI makes a noble sacrifice, and the SDK Doctor lends a helping hand."
                image={`/images/og/default.png`}
            />
            <MediaPlayer videoId="xCrfK6eMexg" />
        </>
    )
}
