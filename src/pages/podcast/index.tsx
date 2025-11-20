import React, { useState, useEffect } from 'react'
import Explorer from 'components/Explorer'
import MediaPlayer from 'components/MediaPlayer'

import SEO from 'components/seo'

export default function Podcast(): JSX.Element {
  return (
    <>
      <SEO
        title="Podcast - PostHog"
        description="PostHog is the only developer platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
        image={`/images/og/default.png`}
      />
      <MediaPlayer mp3="https://res.cloudinary.com/dmukukwp6/video/upload/values_26850deb2a.mp3" />
    </>
  )
}
