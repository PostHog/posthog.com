import React from 'react'
import { Cohorts, FeatureFlags, Funnels, PathAnalysis, SessionRecordings } from 'components/Icons/Icons'
export const SCALE_MINIMUM_PRICING = 0
export const SCALE_MINIMUM_EVENTS = 0
export const ENTERPRISE_MINIMUM_PRICING = 450
export const CLOUD_MINIMUM_PRICING = 0
export const CLOUD_ENTERPRISE_MINIMUM_PRICING = 450

export const pricingLabels = {
    15_000: 'First 15,000 recordings/mo',
    50_000: '15,001 - 50,000',
    150_000: '50,001 - 150,000',
    500_000: '150,001 - 500,000',
    500_001: '500,000+',
    1_000_000: 'First 1 million events/mo',
    2_000_000: '1-2 million',
    10_000_000: '2-10 million',
    100_000_000: '10-100 million',
    1_000_000_000: '100 million - 1 billion',
}

export const pricing = {
    'self-hosted': [
        [1_000_000, 0],
        [2_000_000, 0.00045],
        [10_000_000, 0.000225],
        [100_000_000, 0.000075],
        [Number.MAX_SAFE_INTEGER, 0.000025],
    ],
    'self-hosted-enterprise': [
        [1_000_000, 0],
        [2_000_000, 0.00045],
        [10_000_000, 0.00045],
        [100_000_000, 0.00009],
        [Number.MAX_SAFE_INTEGER, 0.000025],
    ],
    cloud: [
        [1_000_000, 0],
        [2_000_000, 0.00045],
        [10_000_000, 0.000225],
        [100_000_000, 0.000075],
        [Number.MAX_SAFE_INTEGER, 0.000025],
    ],
    'session-recording': [
        [15_000, 0],
        [50_000, 0.005],
        [150_000, 0.0045],
        [500_000, 0.004],
        [500_001, 0.0035],
    ],
    'cloud-enterprise': [
        [1_000_000, 0],
        [2_000_000, 0.00045],
        [10_000_000, 0.00045],
        [100_000_000, 0.00009],
        [Number.MAX_SAFE_INTEGER, 0.000025],
    ],
}

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
