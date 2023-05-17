import React from 'react'
import { IDocumentation } from './types'
import { Intro as SessionReplayIntro } from '../../pages/docs/session-replay'
import { Intro as ProductAnalyticsIntro } from '../../pages/docs/product-analytics'
import { Intro as FeatureFlagIntro } from '../../pages/docs/feature-flags'
import { Intro as ExperimentsIntro } from '../../pages/docs/experiments'

const quickLinks = {
    'session replay': SessionReplayIntro,
    'product analytics': ProductAnalyticsIntro,
    'feature flags': FeatureFlagIntro,
    'a/b testing': ExperimentsIntro,
}

export default function Documentation({ title }: IDocumentation) {
    const Intro = title && quickLinks[title.toLowerCase()]
    return (
        <div id="documentation" className="max-w-screen-2xl mx-auto">
            {Intro && <Intro image={false} />}
        </div>
    )
}
