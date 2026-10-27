import React from 'react'
import Emphasis from './Emphasis'
import StepFrame from './StepFrame'
import EventBoard from './Ingest/EventBoard'
import QueryScene from './Query/QueryScene'
import ActScene from './Act/ActScene'
import SelfDriveScene from './SelfDrive/SelfDriveScene'
import MergedFeed from './SelfDrive/MergedFeed'
import Link from 'components/Link'
import { SOURCES_DOCS_URL, useSourceCountLabel } from './sourceCount'

const SourceCountLink = (): JSX.Element => (
    <Link to={SOURCES_DOCS_URL} state={{ newWindow: true }} className="underline underline-offset-2">
        {useSourceCountLabel()} other tools
    </Link>
)

const STEPS = [
    {
        title: 'Get the data in',
        description: (
            <>
                PostHog ingests product signals from users and AI agents, and combines it with revenue,
                CRM, and support data from Stripe, HubSpot, Zendesk, and <SourceCountLink />.
            </>
        ),
        Scene: EventBoard,
    },
    {
        title: 'Query the data with your agent (or use ours)',
        description:
            'PostHog builds a profile of every user and team. Ask PostHog AI, or your own agent, why a customer churned, and it follows the trail to find the answer.',
        Scene: QueryScene,
    },
    {
        title: 'Give the data to your agent to act on',
        description:
            '[Scouts](/docs/self-driving/scouts) watch your product 24/7 and file reports in your [Inbox](/docs/self-driving/inbox). Each report carries the context behind it, so your agent can pick it up and start.',
        Scene: ActScene,
    },
    {
        title: 'Let PostHog self-drive',
        description:
            'If you enable [self-driving](/self-driving), when a report is ready, PostHog writes the pull request for you. You review and merge. After the change ships, PostHog checks whether it worked. Any new problem starts the loop again.',
        Scene: SelfDriveScene,
    },
]

export const StepsSection = (): JSX.Element => (
    <section>
        <h2>
            How PostHog helps you{' '}
            <Emphasis className="bg-red/10 dark:bg-yellow/20 text-red dark:text-yellow">
                build better products
            </Emphasis>{' '}
        </h2>
        {STEPS.map(({ title, description, Scene }, index) => (
            <StepFrame key={title} number={index + 1} title={title} description={description}>
                <Scene />
            </StepFrame>
        ))}
        <MergedFeed />
    </section>
)
