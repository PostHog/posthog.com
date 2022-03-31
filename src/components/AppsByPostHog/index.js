import React from 'react'
import Icon from './Icon'

const Listing = ({ name, icon, url }) => {
    return (
        <li className="border-t border-l border-dashed border-gray-accent-light">
            <a
                href={url}
                className="flex flex-col h-full relative items-center text-center px-2 py-8 hover:bg-gray-accent-light"
            >
                <Feature icon={icon} />

                <span className="text-primary">{name}</span>
                <div className="absolute top-4 right-4 inline-flex px-2 py-1 text-[12px] uppercase bg-gray-accent-light rounded-[2px] text-primary text-opacity-50">
                    Built-in
                </div>
            </a>
        </li>
    )
}

const Feature = ({ icon }) => {
    return <Icon className="w-5 h-5" name={icon} />
}

export default function AppsByPostHog() {
    return (
        <React.Fragment>
            <Listing name="Funnels" icon="funnels" url="/apps/funnels" />
            <Listing name="Trends" icon="trends" url="/apps/trends" />
            <Listing name="User Paths" icon="user-paths" url="/apps/user-paths" />
            <Listing name="Correlation Insights" icon="correlation-insights" url="/apps/quantitative-analysis" />
            <Listing name="Experimentation" icon="experimentation" url="/apps/experimentation-suite" />
            <Listing name="Session Recording" icon="session-recording" url="/apps/session-recording" />
            <Listing name="Feature Flags" icon="feature-flags" url="/apps/feature-flags" />
            <Listing name="Heatmaps" icon="heatmaps" url="/apps/heatmaps" />
        </React.Fragment>
    )
}
