import { IconCheck, IconX } from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import Logo from 'components/Logo'
import React, { useState } from 'react'
const companies = {
    Amplitude: {
        comparisonURL: '/blog/posthog-vs-amplitude',
    },
    AmplitudeExperiment: {
        comparisonURL: '',
    },
    Mixpanel: {
        comparisonURL: '/blog/posthog-vs-mixpanel',
    },
    Heap: {
        comparisonURL: '/blog/posthog-vs-heap',
    },
    FullStory: {
        comparisonURL: '/blog/posthog-vs-fullstory',
    },
    Hotjar: {
        comparisonURL: '/blog/posthog-vs-hotjar',
    },
    Optimizely: {
        comparisonURL: '/blog/posthog-vs-optimizely',
    },
    LaunchDarkly: {
        comparisonURL: '/blog/posthog-vs-launchdarkly',
    },
    Pendo: {
        comparisonURL: '/blog/posthog-vs-pendo',
    },
    Matomo: {
        comparisonURL: '/blog/posthog-vs-matomo',
    },
    LogRocket: {
        comparisonURL: '/blog/posthog-vs-logrocket',
    },
    VWO: {
        comparisonURL: '',
    },
    Flagsmith: {
        comparisonURL: '',
    },
    GrowthBook: {
        comparisonURL: '/blog/posthog-vs-growthbook',
    },
    Sprig: {
        comparisonURL: '',
    },
    PostHog: {
        comparisonURL: '',
    },
}

export default function Comparison({ comparison, columnCount, truncate }) {
    const [collapsed, setCollapsed] = useState(truncate)
    const activeCompanies = Object.keys(companies).filter((company) =>
        comparison.some(({ companies }) => Object.keys(companies).includes(company))
    )
    return (
        <>
            <div className={`max-w-vw pb-2 mb-10 md:mb-20 [justify-content:_safe_center] overflow-auto`}>
                <div
                    className={`flex-1 grid md:grid-cols-${columnCount} grid-cols-${
                        columnCount + 1
                    } text-sm md:text-base divide-y divide-border dark:divide-border-dark mx-auto min-w-[600px] md:min-w-fit ${
                        collapsed
                            ? 'h-[460px] overflow-hidden relative after:absolute after:w-full after:h-24 after:bottom-0 after:left-0 after:bg-gradient-to-b after:from-transparent dark:after:via-dark/80 dark:after:to-dark after:via-light/80 after:to-light after:z-10'
                            : ' '
                    }`}
                >
                    {/* header row */}
                    <div className="bg-accent dark:bg-accent-dark leading-tight p-2 mt-2 border-t border-border dark:border-dark">
                        <strong></strong>
                    </div>
                    {activeCompanies.map((company) => {
                        const { comparisonURL } = companies[company]
                        return company.toLowerCase() === 'posthog' ? (
                            <div className="bg-white dark:bg-accent-dark !border-t-2 !border-x-2  !border-l-blue !border-r-blue !border-t-blue rounded-sm rounded-bl-none rounded-br-none leading-tight p-2 flex justify-center items-center md:col-span-1 col-span-2">
                                <Logo className="w-32" />
                            </div>
                        ) : (
                            <div
                                key={company}
                                className="bg-accent dark:bg-accent-dark leading-tight p-2 mt-2 text-center"
                            >
                                <strong className="block">{company}</strong>
                                {comparisonURL && (
                                    <span className="block text-[12px] md:text-sm leading-tight">
                                        <Link to={comparisonURL}>Compare to PostHog</Link>
                                    </span>
                                )}
                            </div>
                        )
                    })}

                    {/* body row */}
                    {comparison.map(({ feature, companies }) => {
                        return (
                            <>
                                <div className="p-2 text-sm" dangerouslySetInnerHTML={{ __html: feature }}></div>
                                {activeCompanies.map((company) => {
                                    const featureAvailable = companies[company]
                                    return (
                                        <div
                                            key={company}
                                            className={`p-2 text-center flex justify-center ${
                                                company.toLowerCase() === 'posthog'
                                                    ? 'bg-white dark:bg-accent-dark !border-x-2 !border-l-blue !border-r-blue md:col-span-1 col-span-2'
                                                    : ''
                                            }`}
                                        >
                                            {typeof featureAvailable === 'string' ? (
                                                <span
                                                    className="text-sm"
                                                    dangerouslySetInnerHTML={{ __html: featureAvailable }}
                                                />
                                            ) : featureAvailable ? (
                                                <IconCheck className="w-6 text-green" />
                                            ) : (
                                                <IconX className="w-6 text-red" />
                                            )}
                                        </div>
                                    )
                                })}
                            </>
                        )
                    })}
                    <div />
                    {activeCompanies.map((company) => {
                        return company.toLowerCase() === 'posthog' ? (
                            <div className="p-2 bg-white dark:bg-accent-dark !border-x-2 !border-b-2 !border-x-blue !border-b-blue rounded rounded-tl-none rounded-tr-none text-center md:col-span-1 col-span-2">
                                <CallToAction href="https://app.posthog.com/sigup" type="primary" size="md">
                                    Get started - free
                                </CallToAction>
                            </div>
                        ) : (
                            <div />
                        )
                    })}
                </div>
            </div>
            {collapsed && (
                <div className="-mt-10 mb-10 text-center z-20 relative">
                    <CallToAction onClick={() => setCollapsed(false)} className="mt-4 max-w-sm">
                        See full comparison
                    </CallToAction>
                </div>
            )}
        </>
    )
}
