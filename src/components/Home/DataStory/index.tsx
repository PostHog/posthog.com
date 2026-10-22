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
                PostHog collects events, replays, errors, surveys, and logs from your product, and aggregates revenue,
                CRM, and support data from Stripe, HubSpot, Zendesk, and <SourceCountLink />.
            </>
        ),
        Scene: EventBoard,
    },
    {
        title: 'Query the data with your agent',
        description:
            'Every source attaches to the same person. Ask PostHog AI or your own agent why a customer churned, and it follows the trail from the refund to the error to the replay.',
        Scene: QueryScene,
    },
    {
        title: 'Give the data to your agent to act on',
        description:
            'Scouts watch your data overnight and file reports in your Inbox. Each report carries the replays, errors, and revenue behind it, so your agent can pick it up and start.',
        Scene: ActScene,
    },
    {
        title: 'Let PostHog self-drive',
        description:
            'When a report is ready to fix, PostHog writes the pull request on its own. You review and merge. After the change ships, PostHog checks whether it worked, and any new problem starts the loop again in step 1.',
        Scene: SelfDriveScene,
    },
]

export const StepsSection = (): JSX.Element => (
    <section>
        <h2>
            How to build a{' '}
            <Emphasis className="bg-red/10 dark:bg-yellow/20 text-red dark:text-yellow">
                usage-informed product
            </Emphasis>{' '}
            with PostHog
        </h2>
        {STEPS.map(({ title, description, Scene }, index) => (
            <StepFrame key={title} number={index + 1} title={title} description={description}>
                <Scene />
            </StepFrame>
        ))}
        <MergedFeed />
    </section>
)
