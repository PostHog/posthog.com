import React from 'react'

import LearnLanding from 'components/Learn/LearnLanding'
import LearnPage from 'components/Learn/LearnPage'
import type { LearnLandingProps } from 'components/Learn/LearnPage'

// The pocket guide isn't written yet, so the story section shows a coming-soon cover and links to Start here.
const Landing = (props: LearnLandingProps): JSX.Element => (
    <LearnLanding
        {...props}
        storyLead="The Data Pipelines pocket guide is on its way."
        storyText="Until then, Start here walks through the three parts of a pipeline – sources, transformations, and destinations – and how to test one before you turn it on."
        upcomingGuide={{ token: 'blue', readUrl: '/docs/data-pipelines/start-here', readLabel: 'Read Start here' }}
    />
)

export default function DataPipelinesLearn(): JSX.Element {
    return (
        <LearnPage
            productHandle="data_pipelines"
            title="Learn Data Pipelines – PostHog"
            description="Learn to sync data in from the tools you already use, change events as they arrive, and send them to the rest of your stack."
            landing={Landing}
        />
    )
}
