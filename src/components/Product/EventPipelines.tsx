import {
    Android,
    Ios,
    JS,
    NodeJS,
    ReactIcon,
    Ruby,
    Segment,
    Sentry,
    Shopify,
    Slack,
    WordPress,
    Zapier,
} from 'components/Icons/Icons'
import Link from 'components/Link'
import React from 'react'
import { FeatureWrapperRow } from './FeatureWrapper'

const pipelines = [
    {
        Icon: JS,
        title: 'JavaScript',
    },
    {
        Icon: ReactIcon,
        title: 'React',
    },
    {
        Icon: NodeJS,
        title: 'NodeJS',
    },
    {
        Icon: Ruby,
        title: 'Ruby',
    },
    {
        Icon: Ios,
        title: 'iOS',
    },
    {
        Icon: Android,
        title: 'Android',
    },
    {
        Icon: Segment,
        title: 'Segment',
    },
    {
        Icon: Zapier,
        title: 'Zapier',
    },
    {
        Icon: Sentry,
        title: 'Sentry',
    },
    {
        Icon: Slack,
        title: 'Slack',
    },
    {
        Icon: Shopify,
        title: 'Shopify',
    },
    {
        Icon: WordPress,
        title: 'WordPress',
    },
]

export default function EventPipelines() {
    return (
        <FeatureWrapperRow
            id="event-pipelines"
            title="Event pipelines"
            cta={{
                url: '/docs/integrate',
                title: 'Explore all event pipelines',
            }}
            description={
                <>
                    <p>
                        PostHog ships with SDKs and a JavaScript snippet (with autocapture). Apps built on PostHog make
                        it possible to ingest data from sources like Salesforce, Hubspot, and Zendesk – and there’s
                        loads more you can do with a Zapier app.
                    </p>
                    <p>
                        And if there’s no app for what you’re looking to do, there probably will be soon – or{' '}
                        <Link to="/docs/apps/build">you can build it*</Link>! (Check out our{' '}
                        <Link to="https://github.com/PostHog/posthog/issues/8437">app bounty list</Link>.)
                    </p>
                </>
            }
        >
            <div className="grid product-event-pipelines">
                <ul>
                    {pipelines.map(({ Icon, title }) => {
                        return (
                            <li
                                key={title}
                                className=" flex items-center justify-center text-center border-b border-r border-dashed border-gray-accent-light py-6"
                            >
                                <span className="flex flex-col justify-center items-center">
                                    <Icon className="md:h-[100px] md:w-[100px] h-[50px] w-[50px]" />
                                    <p className="text-black/70 m-0 mt-2">{title}</p>
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </FeatureWrapperRow>
    )
}
