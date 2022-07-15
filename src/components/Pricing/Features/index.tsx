import React from 'react'
import { icons } from './icons'

interface IFeature {
    title: string
    icon?: React.ReactNode
    enterpriseSelfHostOnly?: boolean
}

interface IColumn {
    title: string
    section: IFeature[]
    className?: string
}

const features: IFeature[] = [
    { title: 'Product Analytics', icon: icons.analytics },

    { title: 'Session Recording', icon: icons.sessionRecording },

    { title: 'Feature Flags', icon: icons.featureFlags },

    { title: 'Heatmaps', icon: icons.heatmaps },

    { title: 'A/B Testing', icon: icons.abTesting },

    { title: 'Correlation Insights', icon: icons.correlationInsights },

    { title: 'Group analytics', icon: icons.groupAnalytics },

    { title: 'Team collaboration', icon: icons.teamCollaboration },
]

const dataStack: IFeature[] = [
    { title: 'Event pipelines', icon: icons.eventPipelines },
    { title: 'Data warehouse', icon: icons.dataWarehouse },
    { title: 'SQL access', icon: icons.sqlAccess, enterpriseSelfHostOnly: true },
    { title: 'App library', icon: icons.appLibrary },
    { title: 'Event autocapture', icon: icons.eventAutocapture },
    { title: 'API', icon: icons.api },
    { title: 'Multiple projects', icon: icons.multipleProjects },
    { title: 'User permissions', icon: icons.userPermissions },
]

const planAllowances: IFeature[] = [
    { title: '1 million events included every month!' },
    { title: 'Unlimited tracked users' },
    { title: 'Unlimited teammates' },
    { title: 'Unlimited event tracking' },
]

const support: IFeature[] = [{ title: 'Community support at posthog.com/questions' }, { title: 'Community Slack' }]

const enterpisePlansOffer: IFeature[] = [
    { title: 'Dedicated support (email, Slack)' },
    { title: 'Team training' },
    { title: 'Configuration support' },
    { title: 'SSO/SAML' },
]

const enterpriseSelfHosted: IFeature[] = [
    { title: 'Deployment support' },
    { title: 'Project permissions' },
    { title: 'Configurable backups' },
    { title: 'SLA available' },
]

const leftCol: IColumn[] = [
    { title: 'Features', section: features, className: 'md:row-span-2' },
    {
        title: 'Data stack',
        section: dataStack,
        className: 'md:row-span-2',
    },
    {
        title: 'Plan allowances',
        section: planAllowances,
    },
    {
        title: 'Support',
        section: support,
    },
]

const rightCol: IColumn[] = [
    { title: 'Enterprise plans offer:', section: enterpisePlansOffer },
    {
        title: 'Plus on Enterprise self-hosted:',
        section: enterpriseSelfHosted,
    },
]

const Check = () => {
    return (
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.9947 5.52548L6.4635 8.99428L14.7025 0.75528C15.2095 0.24824 16.0369 0.24824 16.5439 0.75528L17.3259 1.53732C17.833 2.04436 17.833 2.8717 17.3259 3.37872L7.46034 13.2443C6.95566 13.749 6.13534 13.7521 5.62674 13.2521L0.389145 8.10213C0.126645 7.84509 -0.00381509 7.52713 8.49096e-05 7.15995C0.00399111 6.79277 0.141491 6.47791 0.408685 6.22635L1.18056 5.49979C1.69306 5.01775 2.49696 5.02947 2.99462 5.52714L2.9947 5.52548Z"
                fill="#BFBFBC"
            />
        </svg>
    )
}

const Section = ({ title, section, className = '' }: IColumn) => {
    return (
        <ul className={`list-none m-0 p-0 mb-6 ${className}`}>
            <h5 className="text-[15px] text-white/50 m-0 mb-2">{title}</h5>
            <ul className="list-none p-0 m-0 grid gap-y-4">
                {section.map(({ title, icon, enterpriseSelfHostOnly }) => {
                    return (
                        <li
                            key={title}
                            className={`text-white font-semibold text-[14px] flex space-x-2 items-center leading-tight ${
                                enterpriseSelfHostOnly
                                    ? 'relative after:w-[9px] after:h-[9px] after:rounded-full after:bg-dark-yellow after:ml-1 after:-mt-1'
                                    : ''
                            }`}
                        >
                            <span className="w-[32px] flex justify-center items-center flex-shrink-0">
                                {icon || <Check />}
                            </span>
                            <span>{title}</span>
                        </li>
                    )
                })}
            </ul>
        </ul>
    )
}

export default function Features() {
    return (
        <div className="bg-primary rounded-[10px] grid sm:grid-cols-3 lg:grid-cols-4 relative">
            <div className="grid sm:grid-rows-2 sm:grid-cols-2 md:grid-cols-3 sm:grid-flow-col sm:col-span-3 p-11 lg:pb-5 pb-0">
                {leftCol.map((section) => {
                    return <Section key={section.title} {...section} />
                })}
            </div>
            <div className="grid sm:grid-rows-1 sm:col-span-3 lg:col-span-1 lg:grid-rows-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 sm:grid-flow-col p-11 lg:pt-11 pt-6 pb-5 lg:border-l lg:border-t-0 border-t border-dashed border-[#5B5B5B] lg:mb-0 mb-4">
                {rightCol.map((section) => {
                    return <Section key={section.title} {...section} />
                })}
            </div>
            <p className="flex absolute left-11 bottom-1 lg:bottom-4 items-center before:w-[9px] before:h-[9px] before:rounded-full before:bg-dark-yellow before:mr-1 text-[12px] text-white font-medium">
                <span className="opacity-60">Currently available on Enterprise Self-host only</span>
            </p>
        </div>
    )
}
