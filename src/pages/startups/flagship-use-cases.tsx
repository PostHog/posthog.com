import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import Link from 'components/Link'
import {
    IconRewindPlay,
    IconGraph,
    IconToggle,
    IconFlask,
    IconMessage,
    IconDatabase,
    IconDecisionTree,
} from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import Editor from 'components/Editor'

interface ProductLinkProps {
    link: string
    icon: React.ComponentType<{ className?: string }>
    productName: string
    color: string
}

function ProductLink({ link, icon: Icon, productName, color }: ProductLinkProps) {
    return (
        <Link
            to={`https://posthog.com/${link}`}
            className="flex items-center gap-2 font-bold text-primary hover:text-red dark:hover:text-yellow"
            external
        >
            <span className="flex items-center gap-1">
                <Icon className={`size-6 text-${color}`} />
                <span>{productName}</span>
            </span>
        </Link>
    )
}

function ExampleContentHeader() {
    return (
        <div className="container py-12">
            <h1 className="!text-4xl">
                Scale your startup with PostHog <span className="text-red dark:text-yellow">flagship uses cases</span>
            </h1>
            <h2>A learning track for building your productd with PostHog</h2>
        </div>
    )
}

function ExampleContent() {
    return (
        <div className="container">
            <div className="grid @xl:grid-cols-2 gap-y-4 @xl:gap-y-8 pb-8">
                <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary pb-4 @xl:pb-8 mb-0">
                    1. Track your product business
                </h3>
                <div className="@xl:border-b border-primary pb-8">
                    <strong className="flex items-center gap-1.5 mb-2 text-[17px] @xl:text-lg">
                        <span>Use</span>
                        <ProductLink
                            link="/product-analytics"
                            icon={IconGraph}
                            productName="Product analytics"
                            color="blue"
                        />
                    </strong>
                    <p className="m-0">
                        Understand your key metrics: active users, retention, feature adoption, and conversion funnels.
                        Build dashboards to track growth and share with your team and investors.
                    </p>
                    <p className="mt-2">
                        <Link to="/docs/product-analytics/dashboards">Create your first dashboard</Link> to visualize
                        what matters most.
                    </p>
                </div>

                <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary pb-4 @xl:pb-8 mb-0">
                    2. Ship new features safely
                </h3>
                <div className="@xl:border-b border-primary pb-8">
                    <strong className="flex items-center gap-1.5 mb-2 text-[17px] @xl:text-lg">
                        <span>Use</span>
                        <ProductLink
                            link="/feature-flags"
                            icon={IconToggle}
                            productName="Feature flags"
                            color="[#29DBBB]"
                        />
                    </strong>
                    <p className="m-0">
                        Roll out new features to a subset of users, then gradually expand. Kill switches let you
                        instantly disable broken features without redeploying.
                    </p>
                    <p className="mt-2">
                        <Link to="/docs/feature-flags/creating-feature-flags">Learn how to create feature flags</Link>{' '}
                        and ship with confidence.
                    </p>
                </div>

                <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary pb-4 @xl:pb-8 mb-0">
                    3. Improve features with experiments
                </h3>
                <div className="@xl:border-b border-primary pb-8">
                    <strong className="flex items-center gap-1.5 mb-2 text-[17px] @xl:text-lg">
                        <span>Use</span>
                        <ProductLink link="/experiments" icon={IconFlask} productName="Experiments" color="purple" />
                    </strong>
                    <p className="m-0">
                        Run A/B tests to validate changes before committing. Measure the impact on your key metrics and
                        make decisions backed by statistical significance.
                    </p>
                    <p className="mt-2">
                        <Link to="/docs/experiments/creating-an-experiment">Run your first experiment</Link> to see what
                        actually moves the needle.
                    </p>
                </div>

                <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary pb-4 @xl:pb-8 mb-0">
                    4. Understand user behavior
                </h3>
                <div className="@xl:border-b border-primary pb-8">
                    <strong className="flex items-center gap-1.5 mb-2 text-[17px] @xl:text-lg">
                        <span>Use</span>
                        <ProductLink
                            link="/session-replay"
                            icon={IconRewindPlay}
                            productName="Session replay"
                            color="yellow"
                        />
                    </strong>
                    <p className="m-0">
                        Watch real users interact with your product. Find UX issues, debug problems faster, and
                        understand the "why" behind your analytics data.
                    </p>
                    <p className="mt-2">
                        <Link to="/docs/session-replay/filters">Filter replays</Link> by user properties, events, or
                        errors to find what you need.
                    </p>
                </div>

                <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary pb-4 @xl:pb-8 mb-0">
                    5. Collect user feedback
                </h3>
                <div className="@xl:border-b border-primary pb-8">
                    <strong className="flex items-center gap-1.5 mb-2 text-[17px] @xl:text-lg">
                        <span>Use</span>
                        <ProductLink link="/surveys" icon={IconMessage} productName="Surveys" color="salmon" />
                    </strong>
                    <p className="m-0">
                        Trigger targeted surveys based on user behavior. Ask for feedback after key actions, measure NPS
                        with power users, or validate feature ideas before building.
                    </p>
                    <p className="mt-2">
                        <Link to="/docs/surveys/creating-surveys">Create your first survey</Link> to hear directly from
                        your users.
                    </p>
                </div>

                <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary pb-4 @xl:pb-8 mb-0">
                    6. Manage your data at scale
                </h3>
                <div className="@xl:border-b border-primary pb-8">
                    <strong className="flex items-center gap-1.5 mb-2 text-[17px] @xl:text-lg">
                        <span>Use</span>
                        <ProductLink
                            link="/data-warehouse"
                            icon={IconDatabase}
                            productName="Data warehouse"
                            color="[#8567FF]"
                        />
                    </strong>
                    <p className="m-0">
                        Connect external data sources like Stripe, Hubspot, or your own database. Query everything in
                        one place and build insights that combine product and business data.
                    </p>
                    <p className="mt-2">
                        <Link to="/docs/data-warehouse/setup">Set up the data warehouse</Link> to centralize your data
                        infrastructure.
                    </p>
                </div>

                <h3 className="text-xl font-bold mt-0 @xl:pr-12 border-b border-primary mb-0">
                    7. Route data to other tools
                </h3>
                <div className="@xl:border-b border-primary pb-8">
                    <strong className="flex items-center gap-1.5 mb-2 text-[17px] @xl:text-lg">
                        <span>Use</span>
                        <ProductLink link="/cdp" icon={IconDecisionTree} productName="CDP" color="[#FF9F1C]" />
                    </strong>
                    <p className="m-0">
                        Send PostHog data to your CRM, marketing tools, or data warehouse. Build real-time pipelines
                        that keep your entire stack in sync.
                    </p>
                    <p className="mt-2">
                        <Link to="/docs/cdp">Explore destinations</Link> to connect PostHog with your other tools.
                    </p>
                </div>

                <h3 className="text-xl font-bold mt-0 @xl:pr-12">8. Get $50k in credits</h3>
                <div className="max-w-md">
                    <p className="m-0">
                        Ready to scale? <Link to="/startups">Apply for our startup program</Link> to get $50k in PostHog
                        credits, free merch, and partner credits from tools like AWS, Stripe, and more.
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-16">
                <CallToAction to="https://app.posthog.com/signup" className="mt-2">
                    Get started - free
                </CallToAction>
            </div>
        </div>
    )
}

function FlagshipUseCases() {
    return (
        <div className="container mx-auto max-w-screen-md my-12">
            <ExampleContentHeader />

            <ExampleContent />
        </div>
    )
}

export default FlagshipUseCases
