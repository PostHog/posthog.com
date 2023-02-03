import Link from 'components/Link'
import React from 'react'
import { Wrapper } from '../Wrapper'
import { ProductIcons } from '../../../ProductIcons/ProductIcons'
import { NotProductIcons } from '../../../NotProductIcons/NotProductIcons'

interface IFeature {
    title: string
    icon?: React.ReactNode
    url: string
}

interface IColumn {
    title: string
    section: IFeature[]
    className?: string
}

const gettingStarted: IFeature[] = [
    { title: 'Quickstart', icon: NotProductIcons.quickstart, url: '/docs/getting-started/cloud' },
    { title: 'JS snippet', icon: NotProductIcons.jsSnippet, url: '/docs/integrate' },
    { title: 'SDKs', icon: NotProductIcons.sdks, url: '/docs/integrate?tab=sdks' },
]

const products: IFeature[] = [
    { title: 'Product analytics', icon: ProductIcons.analytics, url: '/using-posthog#product-analytics' },
    { title: 'Session recording', icon: ProductIcons.sessionRecording, url: '/manual/recordings' },
    { title: 'Feature flags', icon: ProductIcons.featureFlags, url: '/manual/feature-flags' },
    { title: 'A/B testing', icon: ProductIcons.abTesting, url: '/manual/experimentation' },
    { title: 'Platform & data', icon: ProductIcons.projects, url: '/using-posthog#data' },
]

const resources: IFeature[] = [
    { title: 'Tutorials', icon: NotProductIcons.tutorials, url: '/tutorials' },
    { title: 'Apps', icon: ProductIcons.appLibrary, url: '/apps' },
    { title: 'Webhooks', icon: NotProductIcons.webhooks, url: '/docs/integrate/webhooks/message-formatting' },
    { title: 'API', icon: ProductIcons.api, url: '/docs/api' },
    { title: 'How PostHog works', icon: NotProductIcons.howPostHogWorks, url: '/docs/how-posthog-works' },
    { title: 'Privacy', icon: NotProductIcons.privacy, url: '/docs/privacy' },
]

const categories: IColumn[] = [
    {
        title: 'Getting started',
        section: gettingStarted,
        className: '',
    },
    {
        title: 'Data stack',
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
            <ul className="list-none p-0 m-0 grid grid-cols-3 md:grid-cols-6 gap-2 dark:text-primary-dark">
                {section.map(({ title, icon, url }) => {
                    return (
                        <li key={title} className="w-[6.5rem]">
                            <Link
                                to={url}
                                className="h-full font-semibold text-[14px] flex flex-col gap-2 items-center leading-tight hover:bg-gray-accent-light/50 dark:hover:bg-gray-accent-light/25 rounded p-2 text-center relative hover:scale-[1.02] active:scale-[1] active:top-[1px]"
                            >
                                <span className="w-6 h-6 flex justify-center items-center flex-shrink-0">{icon}</span>
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
