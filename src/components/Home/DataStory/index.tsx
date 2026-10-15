import React from 'react'
import { cn } from '../../../utils'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import FeedbackPopup from './FeedbackPopup'
import FormPointer from './FormPointer'
import IngestStep from './Ingest/IngestStep'
import QueryStep from './Query/QueryStep'
import Link from 'components/Link'
import useSourcePlatforms from 'hooks/useSourcePlatforms'

const SOURCE_COUNT_ROUNDING = 100

const SourceCountLink = (): JSX.Element => {
    const sourceCount = useSourcePlatforms().length
    return (
        <Link to="/docs/cdp/sources" state={{ newWindow: true }} className="underline underline-offset-2">
            {Math.round(sourceCount / SOURCE_COUNT_ROUNDING) * SOURCE_COUNT_ROUNDING}+ other tools
        </Link>
    )
}

const Emphasis = ({ className, children }: { className: string; children: React.ReactNode }): JSX.Element => (
    <span className={cn('rounded-md px-1 @xl:whitespace-nowrap', className)}>{children}</span>
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
    },
    {
        title: 'Query the data with your agent',
        description:
            'Every source attaches to the same person. Ask PostHog AI or your own agent why a customer churned, and it follows the trail from the refund to the error to the replay.',
    },
    {
        title: 'Give the data to your agent to act on',
        description:
            'Scouts watch your data overnight and file reports in your Inbox. Each report carries the replays, errors, and revenue behind it, so your agent can pick it up and start.',
    },
    {
        title: 'Let PostHog self-drive',
        description:
            'PostHog writes the PR, ships it behind a feature flag, and measures it with an experiment. The results go back into step 1, and the loop starts again.',
    },
]

export const ProblemSection = (): JSX.Element => (
    <section className="grid gap-8 items-start @2xl:grid-cols-2">
        <div>
            <h2>
                Knowing <Emphasis className="bg-purple/10 dark:bg-purple/20 text-purple">what users want</Emphasis> is
                now the{' '}
                <RoughAnnotation type="underline" strokeWidth={2} delay={400} multiline>
                    hardest part of building software
                </RoughAnnotation>
            </h2>
            <p>Most users never tell you. Don't believe us? Go ahead and fill out this feedback form.</p>
            <FormPointer />
        </div>
        <div className="@2xl:mt-28">
            <FeedbackPopup />
        </div>
    </section>
)

export const StepsSection = (): JSX.Element => (
    <section>
        <h2>
            How to build a{' '}
            <Emphasis className="bg-red/10 dark:bg-yellow/20 text-red dark:text-yellow">
                usage-informed product
            </Emphasis>{' '}
            with PostHog
        </h2>
        {STEPS.map(({ title, description }, index) =>
            index === 0 ? (
                <IngestStep key={title} title={title} description={description} />
            ) : index === 1 ? (
                <QueryStep key={title} index={index} title={title} description={description} />
            ) : (
                <div key={title}>
                    <h3>
                        {index + 1}. {title}
                    </h3>
                    <p>{description}</p>
                </div>
            )
        )}
    </section>
)
