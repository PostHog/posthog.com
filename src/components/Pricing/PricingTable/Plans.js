import React from 'react'
import { Funnels, Cohorts, PathAnalysis, FeatureFlags, SessionRecordings } from 'components/Icons/Icons'
import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import { Plan, Section, Price, Features } from './Plan'

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
                <Features features={features['Platform']} className="grid-cols-2" />
            </Section>
            <Section title="Platform features" className="mt-auto">
                <Features features={features['Platform features']} className="grid-cols-2" />
            </Section>
            <Section title="Pricing" className="mt-auto">
                <Price>Free</Price>
            </Section>
            <CallToAction className="mt-7 mb-3">Deploy now</CallToAction>
            <CallToAction type="outline">Book a demo</CallToAction>
        </Plan>
    )
}

export const Scale = ({ setOpen }) => {
    return (
        <Plan
            title="Scale"
            subtitle="For large userbases or event volumes"
            badge="INCLUDES OPEN SOURCE FEATURES"
            className="border border-dashed border-gray-accent-light rounded-sm bg-white bg-opacity-20"
        >
            <Section title="Advanced features">
                <Features features={features['Advanced features']} />
            </Section>
            <Section title="Collaboration">
                <Features features={features['Collaboration']} />
            </Section>
            <Section title="Pricing starts at" className="mt-auto">
                <div className="flex justify-between items-center">
                    <Price>
                        $2,000<span className="text-base opacity-50">/mo</span>
                    </Price>
                    <Link className="text-yellow font-bold" onClick={() => setOpen(true)}>
                        Calculate your price
                    </Link>
                </div>
            </Section>
            <CallToAction to="/sign-up/self-host/deploy" className="mt-7 mb-3">
                Get started
            </CallToAction>
            <CallToAction type="outline">Book a demo</CallToAction>
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
            <CallToAction className="mt-7 mb-3">Get in touch</CallToAction>
            <CallToAction type="outline">Book a demo</CallToAction>
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
                <Features features={features['Platform']} className="grid-cols-2" />
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
            <CallToAction className="my-7">Deploy now</CallToAction>
            <span className="text-[15px] opacity-50 text-center">Includes community support on Slack</span>
        </Plan>
    )
}
