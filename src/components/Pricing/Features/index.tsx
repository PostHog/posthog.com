import Link from 'components/Link'
import React from 'react'
import {
    AbTesting,
    Analytics,
    API,
    AppLibrary,
    CorrelationAnalysis,
    DataWarehouse,
    EventAutocapture,
    EventPipelines,
    FeatureFlags,
    GroupAnalytics,
    Heatmaps,
    Projects,
    SessionRecording,
    SQL,
    TeamCollaboration,
    UserPermissions,
} from 'components/ProductIcons'

interface IFeature {
    title: string
    icon?: React.ReactNode
    enterpriseSelfHostOnly?: boolean
    url?: string
}

interface IColumn {
    title: string
    section: IFeature[]
    className?: string
}

const features: IFeature[] = [
    { title: 'Product analytics', icon: <Analytics /> },
    { title: 'Session recording', icon: <SessionRecording /> },
    { title: 'Feature flags', icon: <FeatureFlags /> },
    { title: 'Heatmaps', icon: <Heatmaps /> },
    { title: 'A/B testing', icon: <AbTesting /> },
    { title: 'Correlation analysis', icon: <CorrelationAnalysis /> },
    { title: 'Group analytics', icon: <GroupAnalytics /> },
    { title: 'Team collaboration', icon: <TeamCollaboration /> },
]

const dataStack: IFeature[] = [
    { title: 'Event pipelines', icon: <EventPipelines /> },
    { title: 'Data warehouse', icon: <DataWarehouse /> },
    { title: 'SQL access', icon: <SQL /> },
    { title: 'App library', icon: <AppLibrary /> },
    { title: 'Event autocapture', icon: <EventAutocapture /> },
    { title: 'API', icon: <API /> },
    { title: 'Multiple projects', icon: <Projects /> },
    { title: 'User permissions', icon: <UserPermissions /> },
]

const planAllowances: IFeature[] = [
    { title: '1 million events free every month!' },
    { title: 'Unlimited tracked users' },
    { title: 'Unlimited teammates' },
    { title: 'Unlimited event tracking' },
]

const support: IFeature[] = [
    { title: 'Community support at posthog.com/questions', url: '/questions' },
    { title: 'Community Slack' },
]

const enterpisePackage: IFeature[] = [
    { title: 'Dedicated support (email, Slack)' },
    { title: 'SAML SSO' },
    { title: 'Advanced permissions' },
    { title: 'Team training' },
    { title: 'Dashboard configuration' },
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

const rightCol: IColumn[] = [{ title: 'Enterprise package', section: enterpisePackage }]

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

const Parent = ({ children, url }: { children: React.ReactNode; url?: string }): JSX.Element => {
    return url ? (
        <Link className="text-white hover:text-white" to={url}>
            {children}
        </Link>
    ) : (
        <>{children}</>
    )
}

const Section = ({ title, section, className = '' }: IColumn) => {
    return (
        <ul className={`list-none m-0 p-0 mb-6 ${className}`}>
            <h5 className="text-[15px] text-white/50 m-0 mb-4">{title}</h5>
            <ul className="list-none p-0 m-0 grid gap-y-4">
                {section.map(({ title, icon, enterpriseSelfHostOnly, url }) => {
                    return (
                        <li
                            key={title}
                            className={`text-white font-semibold text-[14px] flex space-x-2 items-center leading-tight ${
                                enterpriseSelfHostOnly
                                    ? 'relative after:w-[9px] after:h-[9px] after:rounded-full after:bg-yellow after:ml-1'
                                    : ''
                            }`}
                        >
                            <span className="w-6 h-6 flex justify-center items-center flex-shrink-0">
                                {icon || <Check />}
                            </span>
                            <Parent url={url}>
                                <span>{title}</span>
                            </Parent>
                        </li>
                    )
                })}
            </ul>
        </ul>
    )
}

export default function Features() {
    return (
        <div className="bg-primary rounded-[10px] lg:pl-4 lg:pr-2 relative">
            <div className="lg:grid lg:grid-cols-4">
                <div className="lg:col-span-3 lg:border-r border-dashed border-[#5B5B5B]">
                    <div className="xs:grid xs:gap-x-2 sm:gap-x-8 sm:gap-y-4 grid-cols-2 lg:grid-cols-3 p-6 lg:pt-10 pb-4">
                        {leftCol.map((section) => {
                            return <Section key={section.title} {...section} />
                        })}
                    </div>
                </div>

                <div className="sm:grid sm:grid-cols-2 lg:block p-6 lg:py-10 border-t lg:border-t-0 lg:border-0 border-dashed border-[#5B5B5B] lg:mb-0 mb-4">
                    {rightCol.map((section) => {
                        return <Section key={section.title} {...section} />
                    })}
                </div>
            </div>
        </div>
    )
}
