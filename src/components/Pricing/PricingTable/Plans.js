import { TrackedCTA } from 'components/CallToAction/index.js'
import Link from 'components/Link'
import React from 'react'
import {
    CLOUD_ENTERPRISE_MINIMUM_PRICING,
    CLOUD_MINIMUM_PRICING,
    ENTERPRISE_MINIMUM_PRICING,
    features,
    SCALE_MINIMUM_PRICING,
} from '../constants'
import { Features, Plan, Price, Section } from './Plan'

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
                featureFlag={{ response: 'slider_on', name: 'homepage-feature-slider' }}
            >
                Deploy now
            </TrackedCTA>
            <span className="h-[49.5px] text-center text-gray">
                Includes community support via our{' '}
                <Link href="/questions" className="text-red">
                    Questions?
                </Link>{' '}
                page and <Link href="/slack">Slack</Link>
            </span>
        </Plan>
    )
}

export const Scale = ({
    setOpen,
    hideActions,
    hideBadge,
    hideCalculator,
    className = 'border border-dashed border-gray-accent-light rounded-sm bg-white/20',
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
                        featureFlag={{ response: 'slider_on', name: 'homepage-feature-slider' }}
                    >
                        Get started
                    </TrackedCTA>
                    <TrackedCTA
                        type="outline"
                        to="/signup/self-host/get-in-touch?plan=scale&demo=scale#demo"
                        event={{ name: 'select edition: clicked book demo', type: 'scale' }}
                        featureFlag={{ response: 'slider_on', name: 'homepage-feature-slider' }}
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
                        href="https://license.posthog.com/?price_id=price_1L1AeWEuIatRXSdzj0Y5ioOU"
                        className="mt-7 mb-3"
                        event={{ name: 'select edition: clicked get started', type: 'enterprise' }}
                        featureFlag={{ response: 'slider_on', name: 'homepage-feature-slider' }}
                    >
                        Get started
                    </TrackedCTA>
                    <TrackedCTA
                        type="outline"
                        to="/signup/self-host/get-in-touch?plan=enterprise&demo=enterprise#demo"
                        event={{ name: 'select edition: clicked book demo', type: 'enterprise' }}
                        featureFlag={{ response: 'slider_on', name: 'homepage-feature-slider' }}
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
                    <TrackedCTA
                        to="https://app.posthog.com/signup"
                        className="my-7"
                        event={{ name: 'select edition: clicked get started', type: 'cloud' }}
                        featureFlag={{ response: 'slider_on', name: 'homepage-feature-slider' }}
                    >
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
                        featureFlag={{ response: 'slider_on', name: 'homepage-feature-slider' }}
                    >
                        Get in touch
                    </TrackedCTA>
                    <TrackedCTA
                        type="outline"
                        to="/signup/self-host/get-in-touch?plan=enterprise&demo=enterprise#demo"
                        event={{ name: 'select edition: clicked book demo', type: 'enterprise' }}
                        featureFlag={{ response: 'slider_on', name: 'homepage-feature-slider' }}
                    >
                        Book a demo
                    </TrackedCTA>
                </>
            )}
        </Plan>
    )
}
