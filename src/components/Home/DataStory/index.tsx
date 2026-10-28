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

const StepLink = ({ to, children }: { to: string; children: React.ReactNode }): JSX.Element => (
    <Link to={to} state={{ newWindow: true }} className="underline underline-offset-2">
        {children}
    </Link>
)

const SourceCountLink = (): JSX.Element => (
    <StepLink to={SOURCES_DOCS_URL}>{useSourceCountLabel()} other tools</StepLink>
)

const STEPS = [
    {
        title: 'Get the data in',
        description: (
            <>
                PostHog ingests product signals from users and AI agents, and combines them with revenue, CRM, and
                support data from Stripe, HubSpot, Zendesk, and <SourceCountLink />.
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
        description: (
            <>
                <StepLink to="/docs/self-driving/scouts">Scouts</StepLink> watch your product 24/7 and file reports in
                your <StepLink to="/docs/self-driving/inbox">Inbox</StepLink>. Each report carries the context behind
                it, so your agent can pick it up and start.
            </>
        ),
        Scene: ActScene,
    },
    {
        title: 'Let PostHog self-drive',
        description: (
            <>
                If you enable <StepLink to="/self-driving">self-driving</StepLink>, when a report is ready, PostHog
                writes the pull request for you. You review and merge. After the change ships, PostHog checks whether it
                worked. Any new problem starts the loop again.
            </>
        ),
        Scene: SelfDriveScene,
    },
]

export const StepsSection = (): JSX.Element => (
    <section>
        <h2>
            How PostHog helps you{' '}
            <Emphasis className="bg-red/10 dark:bg-yellow/20 text-red dark:text-yellow">build better products</Emphasis>{' '}
        </h2>
        {STEPS.map(({ title, description, Scene }, index) => (
            <StepFrame key={title} number={index + 1} title={title} description={description}>
                <Scene />
            </StepFrame>
        ))}
        <MergedFeed />
    </section>
)
