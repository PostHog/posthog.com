import React from 'react'

import funnels from './logos/funnels.svg'
import trends from './logos/trends.svg'
import userPaths from './logos/user-paths.svg'
import correlationInsights from './logos/correlation-insights.svg'
import experimentation from './logos/experimentation.svg'
import sessionRecording from './logos/session-recording.svg'
import featureFlags from './logos/feature-flags.svg'
import heatmaps from './logos/heatmaps.svg'
import webPerformance from './logos/web-performance.svg'

const Listing = ({ name, image, url }) => {
    return (
        <li className="border-t border-l border-dashed border-gray-accent-light">
            <a
                href={url}
                className="flex flex-col h-full relative items-center text-center px-2 py-8 hover:bg-gray-accent-light"
            >
                <img className="icon w-6 h-6 mb-2" src={image} />

                <span className="text-primary">{name}</span>
                <div className="absolute top-4 right-4 inline-flex px-2 py-1 text-[12px] uppercase bg-gray-accent-light rounded-[2px] text-primary text-opacity-50">
                    Built-in
                </div>
            </a>
        </li>
    )
}

export default function AppsByPostHog() {
    return <React.Fragment></React.Fragment>
}
