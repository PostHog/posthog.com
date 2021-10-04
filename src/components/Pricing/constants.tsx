import React from 'react'
import { Cohorts, FeatureFlags, Funnels, PathAnalysis, SessionRecordings } from 'components/Icons/Icons'
export const SCALE_MINIMUM_PRICING = 1_000
export const SCALE_MINIMUM_EVENTS = 4_444_444

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
