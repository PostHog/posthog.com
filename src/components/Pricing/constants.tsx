import React from 'react'
import { Cohorts, FeatureFlags, Funnels, PathAnalysis, SessionRecordings } from 'components/Icons/Icons'
export const SCALE_MINIMUM_PRICING = 1_500
export const SCALE_MINIMUM_EVENTS = 6_666_666

export const features = {
    Platform: [
        { title: 'Funnels & trends', icon: <Funnels className="w-4" /> },
        { title: 'Feature flags', icon: <FeatureFlags className="w-4" /> },
        { title: 'Cohorts & retention', icon: <Cohorts className="w-4" /> },
        { title: 'Session recording', icon: <SessionRecordings className="w-4" /> },
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
        { title: 'Correlation Analysis' },
        { title: 'Group Analytics' },
        { title: 'Priority Session Recording' },
        { title: 'Multivariate Testing' },
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
