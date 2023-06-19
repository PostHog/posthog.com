import Link from 'components/Link'
import React from 'react'
import { Wrapper } from '../Wrapper'
import {
    AbTesting,
    Analytics,
    API,
    AppLibrary,
    DataManagement,
    EventPipelines,
    FeatureFlags,
    GroupAnalytics,
    Integrations,
    Projects,
    SessionRecording,
    UserPermissions,
    Notifications,
} from 'components/ProductIcons'
import {
    HowPostHogWorks,
    IdentifyUsers,
    Migrate,
    JSSnippet,
    Privacy,
    Quickstart,
    SDK,
    Tutorials,
    Webhooks,
} from 'components/NotProductIcons'

interface IFeature {
    title: string
    icon: React.ReactNode
    url: string
}

interface IColumn {
    title: string
    section: IFeature[]
    className?: string
}

const gettingStarted: IFeature[] = [
    { title: 'Start here', icon: <Quickstart />, url: '/docs/getting-started/cloud' },
    { title: 'Install PostHog', icon: <JSSnippet />, url: '/docs/getting-started/install?tab=snippet' },
    { title: 'Send events', icon: <EventPipelines />, url: '/docs/getting-started/send-events' },
    { title: 'Identify users', icon: <IdentifyUsers />, url: '/docs/getting-started/identify-users' },
    { title: 'User properties', icon: <UserPermissions />, url: '/docs/getting-started/user-properties' },
    { title: 'Actions & insights', icon: <DataManagement />, url: '/docs/getting-started/actions-and-insights' },
    { title: 'Group analytics', icon: <GroupAnalytics />, url: '/docs/getting-started/group-analytics' },
]

const products: IFeature[] = [
    { title: 'Product analytics', icon: <Analytics />, url: '/docs/product-analytics' },
    { title: 'Session replay', icon: <SessionRecording />, url: '/docs/session-replay' },
    { title: 'Feature flags', icon: <FeatureFlags />, url: '/docs/feature-flags' },
    { title: 'A/B testing', icon: <AbTesting />, url: '/docs/experiments' },
    { title: 'Data', icon: <Projects />, url: '/docs/data' },
    { title: 'Data connections', icon: <EventPipelines />, url: '/docs/cdp' },
    { title: 'API', icon: <API />, url: '/docs/api' },
]

const resources: IFeature[] = [
    { title: 'Tutorials', icon: <Tutorials />, url: '/tutorials' },
    { title: 'Integrations', icon: <Integrations />, url: '/docs/integrations' },
    { title: 'Templates', icon: <Notifications />, url: '/templates' },
    { title: 'Webhooks', icon: <Webhooks />, url: '/docs/webhooks' },
    { title: 'How PostHog works', icon: <HowPostHogWorks />, url: '/docs/how-posthog-works' },
    { title: 'Migrate to PostHog', icon: <Migrate />, url: '/docs/migrate/ingest-historic-data' },
    { title: 'Privacy', icon: <Privacy />, url: '/docs/privacy' },
]

const categories: IColumn[] = [
    {
        title: 'Getting started',
        section: gettingStarted,
        className: '',
    },
    {
        title: 'Products',
        section: products,
        className: '',
    },
    {
        title: 'Resources',
        section: resources,
        className: '',
    },
]

const Section = ({ title, section, className = '' }: IColumn) => {
    return (
        <ul className={`list-none m-0 p-0 space-y-2 ${className}`}>
            <h5 className="text-[15px] font-semibold opacity-40 m-0 border-b border-dashed border-gray-accent-light pb-1">
                {title}
            </h5>
            <ul className="list-none p-0 m-0 grid grid-cols-3 md:grid-cols-7 gap-2 dark:text-primary-dark">
                {section.map(({ title, icon, url }) => {
                    return (
                        <li key={title} className="w-[6.5rem]">
                            <Link
                                to={url}
                                className="h-full font-semibold text-[14px] flex flex-col gap-2 items-center leading-tight hover:bg-gray-accent-light/50 dark:hover:bg-gray-accent-light/25 rounded p-2 text-center relative hover:scale-[1.02] active:scale-[1] active:top-[1px]"
                            >
                                <div className="w-6 h-6 flex justify-center items-center">{icon}</div>
                                <span>{title}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </ul>
    )
}

export default function Docs({ referenceElement }: { referenceElement: HTMLDivElement }) {
    return (
        <Wrapper referenceElement={referenceElement} placement="bottom-start">
            <div className="rounded-md px-8 py-6 space-y-4">
                <h3 className="text-lg font-bold mb-4 text-primary dark:text-primary-dark">
                    <Link to="/docs" className="hover:text-red">
                        Docs
                    </Link>
                </h3>
                {categories.map((section) => {
                    return <Section key={section.title} {...section} />
                })}
            </div>
        </Wrapper>
    )
}
