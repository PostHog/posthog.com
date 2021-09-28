import { CallToAction, TrackedCTA } from 'components/CallToAction/index.js'
import { Cohorts, FeatureFlags, Funnels, PathAnalysis, SessionRecordings } from 'components/Icons/Icons'
import Link from 'components/Link'
import React from 'react'
import { Features, Plan, Price, Section } from './Plan'

export const features = {
    Platform: [
        { title: 'Funnels & trends', icon: <Funnels className="w-3" /> },
        { title: 'Feature flags', icon: <FeatureFlags className="w-3" /> },
        { title: 'Cohorts & retention', icon: <Cohorts className="w-3" /> },
        { title: 'Session recordings', icon: <SessionRecordings className="w-3" /> },
        { title: 'Path analysis', icon: <PathAnalysis className="w-3" /> },
    ],
    'Platform features': [
        { title: 'Dashboards' },
        { title: 'Event autocapture' },
        { title: 'Annotations' },
        { title: 'API' },
        { title: 'Plugins' },
        { title: 'Data I/O' },
    ],
    'Advanced features': [
        { title: 'Correlation analysis' },
        { title: 'Priority Session Recordings' },
        { title: 'Multivariate testing' },
        { title: 'Deep Dive Dashboards' },
        { title: 'Multiple projects' },
    ],
    Collaboration: [
        { title: 'User permissions' },
        { title: 'Dashboard collaboration tools' },
        { title: 'Team event management tools' },
    ],
    'Account & support': [
        { title: 'Team training' },
        { title: 'Dashboard configuration support' },
        { title: 'Monitoring setup support' },
        { title: 'Infrastructure management pairing' },
        { title: 'SLA w/ downtime developer pairing' },
    ],
    'Ops & security': [
        { title: 'Project permissions' },
        { title: 'SSO, SAML' },
        { title: 'Configurable backups' },
        { title: 'Instance monitoring' },
    ],
    Benefits: [{ title: 'Hosted by PostHog' }, { title: 'Automatic upgrades' }, { title: 'Community Slack support' }],
}

export const OpenSource = () => {
    return (
        <Plan title="Open source" subtitle="Great for startups" badge="LIMITED TO 1 PROJECT">
            <Section title="Platform" className="mb-auto">
                <Features features={features['Platform']} className="grid-cols-1 md:grid-cols-2" />
            </Section>
            <Section title="Platform features" className="mt-auto">
                <Features features={features['Platform features']} className="grid-cols-1 md:grid-cols-2" />
            </Section>
            <Section title="Pricing" className="mt-auto">
                <Price>Free</Price>
            </Section>
            <CallToAction to="/sign-up/self-host/deploy" className="mt-7 mb-3">
                Deploy now
            </CallToAction>
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
                        <div className="flex justify-between items-center">
                            <Price>
                                $2,000<span className="text-base opacity-50">/mo</span>
                            </Price>
                            {!hideCalculator && (
                                <Link className="text-yellow font-bold" onClick={() => setOpen(true)}>
                                    Calculate your price
                                </Link>
                            )}
                        </div>
                    </Section>
                    <TrackedCTA
                        to="/sign-up/self-host/deploy/scale"
                        className="mt-7 mb-3"
                        event={{ name: 'select edition: clicked get started', type: 'scale' }}
                    >
                        Get started
                    </TrackedCTA>
                    <TrackedCTA
                        type="outline"
                        to="/sign-up/self-host/get-in-touch?plan=scale&demo=personal#demo"
                        event={{ name: 'select edition: clicked book demo', type: 'scale' }}
                    >
                        Book a demo
                    </TrackedCTA>
                </>
            )}
        </Plan>
    )
}

export const Enterprise = () => {
    return (
        <Plan
            title="Enterprise"
            subtitle="Your IT & legal teams will be very pleased"
            badge="INCLUDES OPEN SOURCE & SCALE FEATURES"
        >
            <Section title="Account & support">
                <Features features={features['Account & support']} />
            </Section>
            <Section title="Ops & security">
                <Features features={features['Ops & security']} />
            </Section>
            <Section title="Pricing">
                <Price>Custom</Price>
            </Section>
            <TrackedCTA
                className="mt-7 mb-3"
                to="/sign-up/self-host/get-in-touch?plan=enterprise#contact"
                event={{ name: 'select edition: clicked get started', type: 'enterprise' }}
            >
                Get in touch
            </TrackedCTA>
            <TrackedCTA
                type="outline"
                to="/sign-up/self-host/get-in-touch?plan=enterprise&demo=personal#demo"
                event={{ name: 'select edition: clicked book demo', type: 'enterprise' }}
            >
                Book a demo
            </TrackedCTA>
        </Plan>
    )
}

export const Cloud = ({ finalCost, eventNumberWithDelimiter }) => {
    return (
        <Plan
            title="PostHog Cloud"
            subtitle="Turnkey, hosted solution"
            className="border border-dashed border-gray-accent-light rounded-sm bg-white bg-opacity-20"
        >
            <Section title="Platform">
                <Features features={features['Platform']} className="grid-cols-1 md:grid-cols-2" />
            </Section>
            <Section title="Benefits" className="mt-auto">
                <Features features={features['Benefits']} />
            </Section>
            <Section title="Pricing" className="mt-auto">
                <Price>
                    ${finalCost}
                    <span className="text-base">
                        <span className="opacity-50">/mo for</span> {eventNumberWithDelimiter} events
                    </span>
                </Price>
            </Section>
            <TrackedCTA className="my-7" event={{ name: 'select edition: clicked get started', type: 'cloud' }}>
                Deploy now
            </TrackedCTA>
            <span className="text-[15px] opacity-50 text-center">Includes community support on Slack</span>
        </Plan>
    )
}
