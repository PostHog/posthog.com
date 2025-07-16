import React from 'react'
import InstallationPlatforms from './installation-platforms'
import { CallToAction } from 'components/CallToAction'
import { StepList, StepDef } from './StepList'

const steps: StepDef[] = [
    {
        title: 'Capture your first exception',
        goal: 'Capture your first exception events to PostHog.',
        required: 'required',
        content: <InstallationPlatforms />,
    },
    {
        title: 'Get accurate stack traces',
        goal: 'automatically upload source maps for your captured stack traces.',
        required: 'optional',
        content: (
            <CallToAction type="primary" to="#upload-source-maps">
                Upload source maps
            </CallToAction>
        ),
    },
    {
        title: 'Configure alerts and automations',
        goal: 'Receive notifications and automate your error tracking related workflows.',
        required: 'optional',
        content: (
            <CallToAction type="primary" to="#configure-alerts">
                Configure alerts and automations
            </CallToAction>
        ),
    },
    {
        title: 'Cutting costs',
        goal: "We try to have the lowest pricing for every product. Here's how you can take advantage of our pricing.",
        required: 'optional',
        content: (
            <CallToAction type="primary" to="#cutting-costs">
                See cost-cutting tips
            </CallToAction>
        ),
    },
]

export default function ErrorTrackingImplementationSteps() {
    return <StepList steps={steps} />
}
