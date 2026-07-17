import React from 'react'
import Link from 'components/Link'
import Markdown from 'components/Markdown'
import { ImageDW, TooltipDW } from 'components/Home/Decorations'

export const DataStackSection = () => (
    <div id="customer-infrastructure">
        <h2>
            The PostHog Context Warehouse: Built for data teams,{' '}
            <span className="bg-blue/10 dark:bg-blue/20 text-blue rounded-md px-1">loved by engineers</span>
        </h2>

        <div className="@lg:float-right text-sm @lg:max-w-xs bg-accent p-4 rounded-sm @lg:ml-6 @lg:mb-2 relative overflow-hidden">
            <p className="my-0 [&_p]:my-0">
                <strong>
                    Built-in, Product OS{' '}
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

        <Markdown className="[&_li]:marker:text-primary/50">{`Whether you're analyzing customer usage or directing an AI, you should be operating with the *full context*.

This includes things that happen outside your product:

- payments from Stripe
- enrichment from Clay
- tickets in Zendesk

Our context warehouse integrates with 120+ other tools and can push and pull data from our managed data warehouse.

Combine it with all the other tools and PostHog isn't just a single source of truth. It's a single source of *everything*.`}</Markdown>

        <Link to="/data-stack" state={{ newWindow: true }}>
            README: PostHog data stack.md
        </Link>
    </div>
)

export default DataStackSection
