import React from 'react'
import { Cohorts, FeatureFlags, Funnels, PathAnalysis, SessionRecordings } from 'components/Icons/Icons'
export const SCALE_MINIMUM_PRICING = 0
export const SCALE_MINIMUM_EVENTS = 0
export const ENTERPRISE_MINIMUM_PRICING = 4500
export const CLOUD_MINIMUM_PRICING = 0
export const CLOUD_ENTERPRISE_MINIMUM_PRICING = 3000

export const features = {
    Platform: [
        { title: 'Funnels & Trends', icon: <Funnels className="w-4" /> },
        { title: 'Feature Flags', icon: <FeatureFlags className="w-4" /> },
        { title: 'Cohorts & Retention', icon: <Cohorts className="w-4" /> },
        { title: 'Session Recording', icon: <SessionRecordings className="w-4" /> },
        { title: 'Path analysis', icon: <PathAnalysis className="w-4" /> },
    ],
    'Platform features': [
        { title: 'Dashboards' },
        { title: 'Event autocapture' },
        { title: 'Annotations' },
        { title: 'API' },
        { title: 'Apps' },
        { title: 'Data I/O' },
    ],
    'Advanced features': [
        { title: 'Correlation Analysis' },
        { title: 'Group Analytics' },
        { title: 'Experimentation Suite' },
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
    Support: [
        { title: 'Team training' },
        { title: 'Dashboard configuration support' },
        { title: 'Dedicated Slack channel' },
    ],
    'Advanced security': [{ title: 'Project permissions' }, { title: 'SSO, SAML' }],
    Benefits: [{ title: 'Hosted by PostHog' }, { title: 'Automatic upgrades' }, { title: 'Community Slack support' }],
}
