import {
    IconBadge,
    IconBrackets,
    IconCheckbox,
    IconClock,
    IconColumns,
    IconDownload,
    IconFilter,
    IconFunnels,
    IconGear,
    IconGridMasonry,
    IconLifecycle,
    IconMagicWand,
    IconPalette,
    IconPeople,
    IconPulse,
    IconRetention,
    IconRewind,
    IconShare,
    IconStickiness,
    IconTarget,
    IconTerminal,
    IconTestTube,
    IconTrends,
    IconUserPaths,
} from '@posthog/icons'
import Link from 'components/Link'
import { motion } from 'framer-motion'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { feature } from 'components/Pricing/PricingTable/classes'
import { CallToAction } from 'components/CallToAction'

const Title = ({ title }) => {
    return <h3 className="text-lg lg:text-3xl mb-1 md:block hidden">{title}</h3>
}

const Subtitle = ({ subtitle, className = '' }) => {
    return <h4 className={`text-lg opacity-70 mb-3 font-semibold leading-tight ${className}`}>{subtitle}</h4>
}

const Description = ({ description, className = '' }) => {
    return <p className={`text-sm lg:text-base opacity-70 !leading-5 mb-1 ${className}`}>{description}</p>
}

const ContentContainer = ({ children, className = '' }) => {
    return (
        <div
            className={`md:flex items-center order-1 md:order-2 md:p-0 p-3 bg-accent md:bg-transparent dark:bg-accent-dark md:dark:bg-transparent z-10 relative text-black dark:text-white md:text-inherit dark:md:text-inherit ${className}`}
        >
            {children}
        </div>
    )
}

const Content = ({ children, className = '' }) => {
    return <div className={`relative z-10 mx-2 md:px-4 xl:px-8 py-4 ${className}`}>{children}</div>
}

const ImageContainer = ({ children, className = '' }) => {
    return <div className={`relative order-2 md:order-1 ${className}`}>{children}</div>
}

const Subfeature = ({ name, description }) => {
    return (
        <li>
            <h4 className="mb-1 text-lg leading-tight">{name}</h4>
            <p className="text-sm mb-0" dangerouslySetInnerHTML={{ __html: description }} />
        </li>
    )
}

const FeatureList = ({ features, className = '' }) => {
    return (
        <ul className={`list-none m-0 p-0 flex flex-col gap-4 md:gap-1 lg:gap-2 lg:mt-2 pt-2 pb-4 ${className}`}>
            {features.map(({ title, Icon }) => {
                return (
                    <li
                        key={title}
                        className="flex gap-2 items-start md:items-center text-base md:text-sm xl:text-[15px]"
                    >
                        <span className="inline-flex p-1 rounded-sm bg-dark/10 dark:bg-white/10">
                            <Icon className="w-4 mdlg:w-6" />
                        </span>
                        <span className="opacity-70 font-semibold">{title}</span>
                    </li>
                )
            })}
        </ul>
    )
}

export const Funnels = () => {
    const subfeatures = [
        {
            name: 'Filtering',
            description:
                'Set filters for individual steps – or the entire funnel – by user property, group or cohort, or event property',
        },
        {
            name: 'Graph types',
            description:
                'Track user progression between steps, conversion time between each step, and how a funnel’s conversion rate changes over time',
        },
        {
            name: 'Step ordering',
            description:
                'Choose between a sequential series of steps, a strict order, or any order of steps that lead to conversion',
        },
        {
            name: 'Granular controls',
            description:
                'Set conversion window limit, add exclusionary steps, set attribution type, and see the relative conversion rate between each step',
        },
    ]

    return (
        <div className="md:bg-accent dark:md:bg-accent-dark rounded-md text-primary dark:text-primary-dark py-8 px-8 space-y-6">
            <h2 className="text-center text-4xl">Find drop-off across a series of actions</h2>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-5">
                    <StaticImage src="./images/funnel-basic.png" className="w-full shadow-xl" height={335} />
                </div>
                <div className="col-span-7">
                    <StaticImage src="./images/funnel-grouped.png" className="w-full shadow-xl" height={335} />
                </div>
            </div>

            <ul className="grid grid-cols-4 gap-8 list-none p-0">
                {subfeatures.map((subfeature, index) => {
                    return <Subfeature {...subfeature} key={index} />
                })}
            </ul>
        </div>
    )
}

export const Trends = () => {
    const subfeatures = [
        {
            name: 'Feature 1',
            description: 'Description 1',
        },
        {
            name: 'Feature 2',
            description: 'Description 2',
        },
        {
            name: 'Feature 3',
            description: 'Description 3',
        },
        {
            name: 'Feature 4',
            description: 'Description 4',
        },
    ]
    return (
        <div className="md:bg-accent dark:md:bg-accent-dark rounded-md text-primary dark:text-primary-dark py-8 px-8 space-y-6">
            <h2 className="text-center text-4xl">Trends</h2>
            <div className="overflow-x-auto flex gap-8">
                <div className="flex-shrink-0 w-1/2">
                    <StaticImage
                        objectPosition="left"
                        height={384}
                        objectFit="cover"
                        src="../../Product/ProductAnalytics/images/screenshot-trend-bar.png"
                        className="shadow-xl h-full"
                    />
                </div>
                <div className="flex-shrink-0 w-1/2">
                    <StaticImage
                        objectPosition="left"
                        height={384}
                        objectFit="cover"
                        src="../../Product/ProductAnalytics/images/screenshot-trend-multiple-sparklines.png"
                        className="shadow-xl h-full"
                    />
                </div>
                <div className="flex-shrink-0 w-1/2">
                    <StaticImage
                        objectPosition="left"
                        height={384}
                        objectFit="cover"
                        src="../../Product/ProductAnalytics/images/screenshot-trend-area.png"
                        className="shadow-xl h-full"
                    />
                </div>
                <div className="flex-shrink-0 w-1/2">
                    <StaticImage
                        objectPosition="left"
                        height={384}
                        objectFit="cover"
                        src="../../Product/ProductAnalytics/images/screenshot-trend-sparkline.png"
                        className="shadow-xl h-full"
                    />
                </div>
                <div className="flex-shrink-0 w-1/2">
                    <StaticImage
                        objectPosition="left"
                        height={384}
                        objectFit="cover"
                        src="../../Product/ProductAnalytics/images/screenshot-trend-map.png"
                        className="shadow-xl h-full"
                    />
                </div>
            </div>

            <ul className="grid grid-cols-4 gap-8 list-none p-0">
                {subfeatures.map((subfeature, index) => {
                    return <Subfeature {...subfeature} key={index} />
                })}
            </ul>
        </div>
    )
}

export const UserPaths = () => {
    const subfeatures = [
        {
            name: 'Step insights',
            description: 'See who dropped off at each step, who did or didn’t complete a step, and the drop-off rate.',
        },
        {
            name: 'Wildcard groups',
            description: 'Group similar steps into a mega-step (where any of a group of events can trigger a step).',
        },
        {
            name: 'Exclusion events',
            description: 'Prevent specific events from appearing in a path.',
        },
        {
            name: 'Granular controls',
            description: 'Visualize any sequence of page views, screen views or events, with up to 20 steps.',
        },
    ]
    return (
        <div className="md:bg-accent dark:md:bg-accent-dark rounded-md text-primary dark:text-primary-dark py-8 px-8 space-y-6">
            <div className="text-center">
                <h2 className="text-4xl mb-2">User paths</h2>
                <p className="opacity-75 mb-2">
                    Set start and end points to see how users navigate your product, website, or conversion funnel.
                </p>
            </div>

            <StaticImage
                src="../../Product/ProductAnalytics/images/screenshot-paths.png"
                className="w-full shadow-xl"
            />

            <ul className="grid grid-cols-4 gap-8 list-none p-0 mt-4">
                {subfeatures.map((subfeature, index) => {
                    return <Subfeature {...subfeature} key={index} />
                })}
            </ul>
        </div>
    )
}

export const CorrelationAnalysis = () => {
    const subfeatures = [
        {
            name: 'Feature 1',
            description: 'Description 1',
        },
        {
            name: 'Feature 2',
            description: 'Description 2',
        },
        {
            name: 'Feature 3',
            description: 'Description 3',
        },
        {
            name: 'Feature 4',
            description: 'Description 4',
        },
    ]
    return (
        <div className="md:bg-accent dark:md:bg-accent-dark rounded-md text-primary dark:text-primary-dark py-8 px-8 space-y-6">
            <div className="text-center">
                <h2 className="text-4xl mb-2">Correlation analysis</h2>
                <p className="opacity-75 mb-2 max-w-2xl mx-auto">
                    When analyzing funnels, correlation analysis highlights significant events or properties that may be
                    useful in determining how likely someone is to converting or churning.
                </p>
            </div>

            <div className="!-mb-20">
                <StaticImage
                    src="../../Product/ProductAnalytics/images/screenshot-correlation-analysis.png"
                    className="w-full"
                />
            </div>

            <ul className="hidden grid grid-cols-3 xl:grid-cols-5 gap-8 list-none p-0">
                {subfeatures.map((subfeature, index) => {
                    return <Subfeature {...subfeature} key={index} />
                })}
            </ul>
        </div>
    )
}

export const Retention = () => {
    const subfeatures = []
    return (
        <div className="md:bg-accent dark:md:bg-accent-dark rounded-md text-primary dark:text-primary-dark py-8 px-8 space-y-6">
            <div className="text-center">
                <h2 className="text-4xl mb-2">Retention</h2>
                <p className="opacity-75 mb-2 max-w-2xl mx-auto">
                    See how many users return on subsequent days after first visiting your site or product.
                </p>
            </div>

            <StaticImage
                src="../../Product/ProductAnalytics/images/screenshot-retention.png"
                className="w-full shadow-xl mb-4"
            />

            <ul className="hidden grid grid-cols-3 xl:grid-cols-5 gap-8 list-none p-0">
                {subfeatures.map((subfeature, index) => {
                    return <Subfeature {...subfeature} key={index} />
                })}
            </ul>
        </div>
    )
}

export const Stickiness = () => {
    const subfeatures = []
    return (
        <div className="md:bg-accent dark:md:bg-accent-dark rounded-md text-primary dark:text-primary-dark py-8 px-8 space-y-6">
            <div className="text-center">
                <h2 className="text-4xl mb-2">Stickiness</h2>
                <p className="opacity-75 mb-2 max-w-2xl mx-auto">
                    Learn how many times users perform a specific event in a period of time.
                </p>
            </div>

            <StaticImage
                src="../../Product/ProductAnalytics/images/screenshot-stickiness.png"
                className="w-full shadow-xl mb-4"
            />

            <ul className="hidden grid grid-cols-3 xl:grid-cols-5 gap-8 list-none p-0">
                {subfeatures.map((subfeature, index) => {
                    return <Subfeature {...subfeature} key={index} />
                })}
            </ul>
        </div>
    )
}

export const Lifecycle = () => {
    const subfeatures = []
    return (
        <div className="md:bg-accent dark:md:bg-accent-dark rounded-md text-primary dark:text-primary-dark py-8 px-8 space-y-6">
            <div className="text-center">
                <h2 className="text-4xl mb-2">Lifecycle</h2>
                <p className="opacity-75 mb-2 max-w-2xl mx-auto">
                    Discover how your active users break down, highlighting those who have recently stopped being active
                    or those who have just become active for the first time.
                </p>
            </div>

            <StaticImage
                src="../../Product/ProductAnalytics/images/screenshot-lifecycle.png"
                className="w-full shadow-xl mb-4"
            />

            <ul className="hidden grid grid-cols-3 xl:grid-cols-5 gap-8 list-none p-0">
                {subfeatures.map((subfeature, index) => {
                    return <Subfeature {...subfeature} key={index} />
                })}
            </ul>
        </div>
    )
}

export const Dashboards = () => {
    const subfeatures = [
        {
            name: 'Dashboard filtering',
            description:
                'Filter saved insights on a dashboard by anything - event properties, user properties, cohorts - even if a feature flag was active during a user’s session.',
        },
        {
            name: 'Embeddable dashboards with auto-refresh',
            description:
                'Embed a dashboard iframe and always have near-realtime data - great for showing KPIs on a TV.',
        },
        {
            name: 'Weekly updates by Slack or email',
            description:
                'Send dashboard updates to a Slack channel or to colleagues via email at any recurring frequency.',
        },
        {
            name: 'Access restrictions',
            description: 'Limit dashboard access with role-based permissions or using private projects.',
        },
        {
            name: 'Customizable layouts',
            description: 'Configure how many insights appear per row or column.',
        },
    ]
    return (
        <div className="md:bg-accent dark:md:bg-accent-dark rounded-md text-primary dark:text-primary-dark py-8 px-8 space-y-6">
            <div className="text-center">
                <h2 className="text-4xl mb-2">Dashboards</h2>
                <p className="opacity-75 mb-2">(They're exactly what they sound like.)</p>
            </div>

            <StaticImage
                src="../../Product/ProductAnalytics/images/screenshot-dashboards.png"
                className="w-full shadow-xl mb-4"
            />

            <ul className="grid grid-cols-3 xl:grid-cols-5 gap-8 list-none p-0">
                {subfeatures.map((subfeature, index) => {
                    return <Subfeature {...subfeature} key={index} />
                })}
            </ul>
        </div>
    )
}

export const HogQL = () => {
    const subfeatures = [
        {
            name: 'Breakdowns',
            description: 'Group data by multiple columns',
        },
        {
            name: 'Filters',
            description:
                'Use filters nearly everywhere data exists, like in dashboards, data series, breakdowns, funnels, and the event explorer',
        },
        {
            name: 'Aggregations',
            description:
                '<code>count</code>, <code>min</code>, <code>max</code>, <code>sum</code>, <code>avg</code>, and about 90 more',
        },
    ]
    return (
        <div className="md:bg-accent dark:md:bg-accent-dark rounded-md text-primary dark:text-primary-dark py-8 px-8 space-y-6">
            <div className="text-center">
                <h2 className="text-4xl mb-2">HogQL</h2>
                <p className="opacity-75 mb-2">
                    Directly query data stored in PostHog via our SQL transition layer, HogQL.
                </p>
                <CallToAction href="/docs/hogql" type="secondary">
                    Explore the docs
                </CallToAction>
            </div>

            <div className="overflow-hidden relative after:absolute after:bg-gradient-to-b after:from-accent/0 after:to-accent/100 dark:after:from-accent-dark/0 dark:after:to-accent-dark/100 after:h-40 after:bottom-0 after:left-0 after:w-full after:content-[''] after:z-10">
                <StaticImage
                    src="../../Product/ProductAnalytics/images/screenshot-hogql.png"
                    className="w-full shadow-xl"
                />
            </div>

            <ul className="grid grid-cols-3 gap-8 list-none p-0">
                {subfeatures.map((subfeature, index) => {
                    return <Subfeature {...subfeature} key={index} />
                })}
            </ul>
        </div>
    )
}
