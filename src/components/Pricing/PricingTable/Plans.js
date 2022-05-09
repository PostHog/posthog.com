import { TrackedCTA } from 'components/CallToAction/index.js'
import { Cohorts, FeatureFlags, Funnels, PathAnalysis, SessionRecordings } from 'components/Icons/Icons'
import Link from 'components/Link'
import React from 'react'
import {
    SCALE_MINIMUM_PRICING,
    ENTERPRISE_MINIMUM_PRICING,
    CLOUD_MINIMUM_PRICING,
    CLOUD_ENTERPRISE_MINIMUM_PRICING,
} from '../constants'
import { Features, Plan, Price, Section } from './Plan'
import { features } from '../constants'

export const OpenSource = () => {
    return (
        <Plan title="Open source" subtitle="Great for startups" badge="LIMITED TO 1 PROJECT">
            <Section title="Platform" className="mb-auto">
                <Features features={features['Platform']} size="sm" className="grid-cols-1 md:grid-cols-2 gap-y-4" />
            </Section>
            <Section title="Platform features" className="mt-auto">
                <Features features={features['Platform features']} className="grid-cols-1 md:grid-cols-2" />
            </Section>
            <Section title="Pricing" className="mt-auto">
                <Price>Free</Price>
                <span className="text-base opacity-50 text-xs">&nbsp;</span>
            </Section>
            <TrackedCTA
                to="/signup/self-host/deploy"
                className="mt-7 mb-3"
                event={{ name: 'select edition: clicked get started', type: 'open_source' }}
            >
                Deploy now
            </TrackedCTA>
            <span className="h-[49.5px] flex justify-center items-center text-black opacity-50">
                Includes community support on Slack
            </span>
        </Plan>
    )
}

export const Scale = ({
    setOpen,
    hideActions,
    hideBadge,
    hideCalculator,
    className = 'border border-dashed border-gray-accent-light rounded-sm bg-white bg-opacity-20',
}) => {
    return (
        <Plan
            title="Scale"
            subtitle="For large userbases or event volumes"
            badge={!hideBadge && 'INCLUDES OPEN SOURCE FEATURES'}
            className={className}
        >
            <Section title="Advanced features">
                <Features features={features['Advanced features']} />
            </Section>
            <Section title="Collaboration">
                <Features features={features['Collaboration']} />
            </Section>
            {!hideActions && (
                <>
                    <Section title="Pricing starts at" className="mt-auto">
                        <div className="flex justify-between items-center" id="scale-price">
                            <Price>
                                ${Math.round(SCALE_MINIMUM_PRICING).toLocaleString()}
                                <span className="text-base opacity-50">/mo</span>
                            </Price>
                            {!hideCalculator && (
                                <Link
                                    className="text-red font-bold"
                                    event="select edition: clicked calculate scale price"
                                    onClick={() => setOpen(true)}
                                >
                                    Calculate your price
                                </Link>
                            )}
                        </div>
                        <span className="text-base opacity-50 text-xs">&nbsp;</span>
                    </Section>
                    <TrackedCTA
                        href="https://license.posthog.com/"
                        className="mt-7 mb-3"
                        event={{ name: 'select edition: clicked get started', type: 'scale' }}
                    >
                        Get started
                    </TrackedCTA>
                    <TrackedCTA
                        type="outline"
                        to="/signup/self-host/get-in-touch?plan=scale&demo=scale#demo"
                        event={{ name: 'select edition: clicked book demo', type: 'scale' }}
                    >
                        Book a demo
                    </TrackedCTA>
                </>
            )}
        </Plan>
    )
}

export const Enterprise = ({ setOpen, hideActions, hideBadge, hideCalculator, className = '' }) => {
    return (
        <Plan
            title="Enterprise"
            subtitle="Your IT & legal teams will be very pleased"
            badge={!hideBadge && 'INCLUDES OPEN SOURCE & SCALE FEATURES'}
            className={className}
        >
            <a href="/enterprise" className="inline-block mt-2 text-red font-bold">
                See what comes with Enterprise
            </a>

            <Section title="Account & support">
                <Features features={features['Account & support']} />
            </Section>
            <Section title="Ops & security">
                <Features features={features['Ops & security']} />
            </Section>
            {!hideActions && (
                <>
                    <Section title="Pricing starts at" className="mt-auto">
                        <div className="flex justify-between items-center" id="enterprise-price">
                            <Price>
                                ${Math.round(ENTERPRISE_MINIMUM_PRICING).toLocaleString()}
                                <span className="text-base opacity-50">/mo</span>
                            </Price>
                            {!hideCalculator && (
                                <Link
                                    className="text-red font-bold"
                                    event="select edition: clicked calculate enterprise price"
                                    onClick={() => setOpen(true)}
                                >
                                    Calculate your price
                                </Link>
                            )}
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-base opacity-50 text-xs">Annual discount available</span>

                            {/*
                            <Price>
                                ${Math.round(ENTERPRISE_MINIMUM_PRICING * 10.8).toLocaleString()}
                            </Price>
                            */}
                        </div>
                    </Section>
                    <TrackedCTA
                        className="mt-7 mb-3"
                        to="/signup/self-host/get-in-touch?plan=enterprise#contact"
                        event={{ name: 'select edition: clicked get started', type: 'enterprise' }}
                    >
                        Get in touch
                    </TrackedCTA>
                    <TrackedCTA
                        type="outline"
                        to="/signup/self-host/get-in-touch?plan=enterprise&demo=enterprise#demo"
                        event={{ name: 'select edition: clicked book demo', type: 'enterprise' }}
                    >
                        Book a demo
                    </TrackedCTA>
                </>
            )}
        </Plan>
    )
}

export const Cloud = ({ setOpen, hideActions, hideBadge, hideCalculator, className = '' }) => {
    return (
        <Plan title="Cloud" subtitle="Turnkey, hosted solution" className={className}>
            <Section title="Platform">
                <Features features={features['Platform']} className="grid-cols-1 md:grid-cols-2" />
            </Section>
            <Section title="Advanced features">
                <Features features={features['Advanced features']} />
            </Section>
            <Section title="Collaboration">
                <Features features={features['Collaboration']} />
            </Section>
            {!hideActions && (
                <>
                    <Section title="Pricing starts at" className="mt-auto">
                        <div className="flex justify-between items-center" id="scale-price">
                            <Price>
                                ${Math.round(CLOUD_MINIMUM_PRICING).toLocaleString()}
                                <span className="text-base opacity-50">/mo</span>
                            </Price>
                            {!hideCalculator && (
                                <Link
                                    className="text-red font-bold"
                                    event="select edition: clicked calculate cloud price"
                                    onClick={() => setOpen(true)}
                                >
                                    Calculate your price
                                </Link>
                            )}
                        </div>
                    </Section>
                    <TrackedCTA className="my-7" event={{ name: 'select edition: clicked get started', type: 'cloud' }}>
                        Get started
                    </TrackedCTA>
                    <span className="text-[15px] opacity-50 text-center">Includes community support on Slack</span>
                </>
            )}
        </Plan>
    )
}

export const CloudEnterprise = ({
    setOpen,
    hideActions,
    hideBadge,
    hideCalculator,
    className = 'border-0 border-t lg:border-t-0 lg:border-l border-dashed border-gray-accent-light',
}) => {
    return (
        <Plan
            title="Cloud Enterprise"
            subtitle="Turnkey, hosted solution with added benefits"
            badge={!hideBadge && 'INCLUDES CLOUD FEATURES'}
            className={className}
        >
            <Section title="Platform">
                <Features features={features['Support']} />
            </Section>
            <Section title="Advanced security">
                <Features features={features['Advanced security']} />
            </Section>
            {!hideActions && (
                <>
                    <Section title="Pricing starts at" className="mt-auto">
                        <div className="flex justify-between items-center" id="scale-price">
                            <Price>
                                ${Math.round(CLOUD_ENTERPRISE_MINIMUM_PRICING).toLocaleString()}
                                <span className="text-base opacity-50">/mo</span>
                            </Price>
                            {!hideCalculator && (
                                <Link
                                    className="text-red font-bold"
                                    event="select edition: clicked calculate cloud enterprise price"
                                    onClick={() => setOpen(true)}
                                >
                                    Calculate your price
                                </Link>
                            )}
                        </div>
                    </Section>
                    <TrackedCTA
                        className="mt-7 mb-3"
                        to="/signup/self-host/get-in-touch?plan=enterprise#contact"
                        event={{ name: 'select edition: clicked get started', type: 'enterprise' }}
                    >
                        Get in touch
                    </TrackedCTA>
                    <TrackedCTA
                        type="outline"
                        to="/signup/self-host/get-in-touch?plan=enterprise&demo=enterprise#demo"
                        event={{ name: 'select edition: clicked book demo', type: 'enterprise' }}
                    >
                        Book a demo
                    </TrackedCTA>
                </>
            )}
        </Plan>
    )
}
