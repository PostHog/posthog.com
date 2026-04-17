import React from 'react'
import Link from 'components/Link'
import Markdown from 'components/Markdown'
import { ImageDW, TooltipDW } from 'components/Home/Decorations'

export const DataStackSection = () => (
    <div id="customer-infrastructure">
        <h2>PostHog data stack, built for data teams and loved by product teams</h2>

        <div className="@lg:float-right text-sm @lg:max-w-xs bg-accent p-4 rounded-sm @lg:ml-6 @lg:mb-2 relative pb-[120px] @md:pb-4 @md:pr-[220px] @lg:pr-6 @lg:pb-[120px]">
            <p className="my-0 [&_p]:my-0">
                <strong>Built-in, Product OS ships with:</strong>
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

        <Markdown>{`When you're analyzing how customers use your product, you should be operating from *the full set of data*.

This includes customer information that happens *outside your product*:

- payments from Stripe
- exceptions in an error tracking tool
- tickets in your support platform

Having all the data in one place means you can make more informed decisions about what to build next.

PostHog's Product OS isn't just analytics – it's the entire suite of tools built to give you a single source of truth about your customers.`}</Markdown>

        <Link to="/data-stack" state={{ newWindow: true }}>
            README: PostHog data stack.md
        </Link>
    </div>
)

export default DataStackSection
