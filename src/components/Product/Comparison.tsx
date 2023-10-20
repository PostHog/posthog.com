import { IconCheck, IconX } from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import Logo from 'components/Logo'
import React from 'react'
const companies = {
    Hotjar: {
        comparisonURL: '#',
    },
    LogRocket: {
        comparisonURL: '#',
    },
    Matomo: {
        comparisonURL: '#',
    },
    FullStory: {
        comparisonURL: '#',
    },
    PostHog: {
        comparisonURL: '#',
    },
}

export default function Comparison({ comparison }) {
    const activeCompanies = Object.keys(companies).filter((company) =>
        comparison.some(({ companies }) => Object.keys(companies).includes(company))
    )
    return (
        <div className="overflow-x-auto max-w-vw -mx-5 px-5 pb-2 mb-20 md:mx-0 md:px-0">
            <div className="flex-1 grid grid-cols-6 max-w-7xl text-sm md:text-base divide-y divide-border dark:divide-border-dark mx-auto">
                {/* header row */}
                <div className="bg-accent dark:bg-accent-dark leading-tight p-2 mt-2 border-t border-border dark:border-border-dark">
                    <strong></strong>
                </div>
                {activeCompanies.map((company) => {
                    const { comparisonURL } = companies[company]
                    return company.toLowerCase() === 'posthog' ? (
                        <div className="bg-white dark:bg-accent-dark !border-t-2 !border-x-2  !border-l-blue !border-r-blue !border-t-blue rounded-sm rounded-bl-none rounded-br-none leading-tight p-2 flex justify-center items-center">
                            <Logo className="w-32" />
                        </div>
                    ) : (
                        <div key={company} className="bg-accent dark:bg-accent-dark leading-tight p-2 mt-2">
                            <strong className="block">{company}</strong>
                            {comparisonURL && (
                                <span className="block text-[12px] md:text-sm leading-tight">
                                    <Link to={comparisonURL}>See full comparison</Link>
                                </span>
                            )}
                        </div>
                    )
                })}

                {/* body row */}
                {comparison.map(({ feature, companies }) => {
                    return (
                        <>
                            <div className="p-2">Single-page app support</div>
                            {activeCompanies.map((company) => {
                                const featureAvailable = companies[company]
                                return (
                                    <div
                                        key={company}
                                        className={`p-2 ${
                                            company.toLowerCase() === 'posthog'
                                                ? 'bg-white dark:bg-accent-dark !border-x-2 !border-l-blue !border-r-blue'
                                                : ''
                                        }`}
                                    >
                                        {typeof featureAvailable === 'string' ? (
                                            featureAvailable
                                        ) : featureAvailable ? (
                                            <IconCheck className="w-8 text-green" />
                                        ) : (
                                            <IconX className="w-8 text-red" />
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
                        <div className="p-2 bg-white dark:bg-accent-dark !border-x-2 !border-b-2 !border-x-blue !border-b-blue rounded rounded-tl-none rounded-tr-none text-center">
                            <CallToAction href="#" type="primary" size="md">
                                Get started - free
                            </CallToAction>
                        </div>
                    ) : (
                        <div />
                    )
                })}
            </div>
        </div>
    )
}
