import React from 'react'
import { Admonition } from './Admonition'

export const AnalyticsPlannerTip = () => {
    return (
        <Admonition icon="IconGithub" title="Plan with your teammates" type="tip">
            Get this intro to PostHog as a{' '}
            <a href="https://github.com/PostHog/posthog-integration-planner">private repo</a> you can share with your
            team. Learn the basics while documenting the specifics of your integration.
        </Admonition>
    )
}

export default AnalyticsPlannerTip
