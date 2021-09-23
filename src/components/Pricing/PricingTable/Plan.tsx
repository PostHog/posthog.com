import React from 'react'
import { Funnels, Cohorts, PathAnalysis, FeatureFlags, SessionRecordings } from 'components/Icons/Icons'

export const features = {
    Platform: [
        { title: 'Funnels & trends', icon: <Funnels className="w-4" /> },
        { title: 'Feature flags', icon: <FeatureFlags className="w-4" /> },
        { title: 'Cohorts & retention', icon: <Cohorts className="w-4" /> },
        { title: 'Session recordings', icon: <SessionRecordings className="w-4" /> },
        { title: 'Path analysis', icon: <PathAnalysis className="w-4" /> },
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

export const Features = ({ features, className = '' }) => {
    return (
        <ul className={`p-0 list-none m-0 grid gap-4 ${className}`}>
            {features.map((feature, index) => {
                const { title, icon } = feature
                return (
                    <li key={index} className="flex space-x-2 items-center">
                        {icon && <span>{icon}</span>}
                        <span>{title}</span>
                    </li>
                )
            })}
        </ul>
    )
}

export const Plan = ({ title, subtitle, badge, children, className = '' }) => {
    return (
        <div className={`flex flex-col py-9 px-14 ${className}`}>
            <h3 className="my-0">{title}</h3>
            <p className="text-[15px] mt-1 mb-2">{subtitle}</p>
            {badge && (
                <span className="text-[11px] py-1 px-2 rounded-sm border border-primary border-opacity-50 self-start opacity-50">
                    {badge}
                </span>
            )}
            {children}
        </div>
    )
}

export const Price = ({ children }) => {
    return <h5 className="m-0">{children}</h5>
}

export const Section = ({ title, children, className = '' }) => {
    return (
        <div className={className}>
            <h4 className="opacity-50 border-b border-dashed border-gray-accent-light pb-2 font-semibold text-[15px] mb-3 mt-7">
                {title}
            </h4>
            {children}
        </div>
    )
}
