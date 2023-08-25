import React from 'react'
import { IDocumentation } from './types'
import { Content as SessionReplayIntro } from '../../pages/docs/session-replay'
import { Content as ProductAnalyticsIntro } from '../../pages/docs/product-analytics'
import { Content as FeatureFlagIntro } from '../../pages/docs/feature-flags'
import { Content as ExperimentsIntro } from '../../pages/docs/experiments'

const quickLinks = {
    'session replay': <SessionReplayIntro quickLinks />,
    'product analytics': <ProductAnalyticsIntro quickLinks />,
    'feature flags': <FeatureFlagIntro quickLinks />,
    'a/b testing': <ExperimentsIntro quickLinks />,
}

export default function Documentation({ title }: IDocumentation) {
    const Intro = title && quickLinks[title.toLowerCase()]
    return (
        <div id="documentation" className="max-w-screen-2xl mx-auto">
            {Intro}
        </div>
    )
}
