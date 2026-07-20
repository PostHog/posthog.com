import React from 'react'
import Link from 'components/Link'
import Markdown from 'components/Markdown'
import { ImageDW, TooltipDW } from 'components/Home/Decorations'

export const DataStackSection = () => (
    <div id="customer-infrastructure">
        <h2>
            All your data,{' '}
            <span className="bg-blue/10 dark:bg-blue/20 text-blue rounded-md px-1">working together</span>
        </h2>

        <div className="@lg:float-right text-sm @lg:max-w-xs bg-accent p-4 rounded-sm @lg:ml-6 @lg:mb-2 relative overflow-hidden">
            <p className="my-0 [&_p]:my-0">
                <strong>
                    Built-in, the context warehouse{' '}
                    <span className="bg-blue/10 dark:bg-blue/20 text-blue rounded-md px-1">ships</span> with:
                </strong>
            </p>
            <span className="[&_ul]:mb-0">
                <ul>
                    <li>
                        A data warehouse <TooltipDW />
                    </li>
                    <li>120+ sources/destinations</li>
                    <li>SQL editor + BI + data viz</li>
                    <li>User activity feed (CDP-lite)</li>
                    <li>API, webhooks</li>
                </ul>
            </span>
            <ImageDW />
        </div>

        <Markdown className="[&_li]:marker:text-primary/50">{`Whether you're analyzing customer usage or directing AI, you should be operating with the *full* context.

Combine everything in PostHog's context warehouse so that you, your agents, and your dashboard can query it directly. That includes:

- Data from 120+ external sources like Stripe, Postgres, and HubSpot
- Insights from every other PostHog tool like Session Replays and Experiments

The data your agents need to make good decisions is already here. Ready to turn "tell me what happened" into "here's what to fix next."`}</Markdown>

        <Link to="/data-stack/sources" state={{ newWindow: true }}>
            Connect your first data source
        </Link>
    </div>
)

export default DataStackSection
