import CallToAction from '../CallToAction'
import Link from 'components/Link'
import React from 'react'
import SearchIconButton from 'components/Search/SearchIconButton'
import { Wrapper } from '../Wrapper'
import { ProductIcons } from '../../../ProductIcons/ProductIcons'

interface IFeature {
    title: string
    icon?: React.ReactNode
    url?: string
}

interface IColumn {
    title: string
    section: IFeature[]
    className?: string
}

const gettingStarted: IFeature[] = [
    { title: 'Quickstart', icon: ProductIcons.sessionRecording },
    { title: 'JS snippet', icon: ProductIcons.heatmaps },
    { title: 'SDKs', icon: ProductIcons.featureFlags },
    { title: 'Migrate to PostHog', icon: ProductIcons.abTesting },
]

const products: IFeature[] = [
    { title: 'Product analytics', icon: ProductIcons.analytics },
    { title: 'Session recording', icon: ProductIcons.sessionRecording },
    { title: 'Feature flags', icon: ProductIcons.featureFlags },
    { title: 'A/B testing', icon: ProductIcons.abTesting },
    { title: 'Platform & data', icon: ProductIcons.projects },
]

const resources: IFeature[] = [
    { title: 'Tutorials', icon: ProductIcons.analytics },
    { title: 'Apps', icon: ProductIcons.appLibrary },
    { title: 'Webhooks', icon: ProductIcons.featureFlags },
    { title: 'API', icon: ProductIcons.api },
    { title: 'How PostHog works', icon: ProductIcons.projects },
    { title: 'Privacy', icon: ProductIcons.projects },
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
        <ul className={`list-none m-0 p-0 space-y-1 ${className}`}>
            <h5 className="text-[15px] font-semibold opacity-40 m-0 border-b border-dashed border-gray-accent-light pb-1">
                {title}
            </h5>
            <ul className="list-none p-0 m-0 grid grid-cols-3 md:grid-cols-6 gap-2 dark:text-primary-dark">
                {section.map(({ title, icon, url }) => {
                    return (
                        <li key={title} className="w-28">
                            <Link
                                to="/docs"
                                className="h-full font-semibold text-[14px] flex flex-col gap-2 items-center leading-tight hover:bg-gray-accent-light/50 dark:hover:bg-gray-accent-light/25 rounded p-2 text-center relative hover:scale-[1.02] active:scale-[1] active:top-[1px]"
                            >
                                <span className="w-6 h-6 flex justify-center items-center flex-shrink-0">{icon}</span>
                                <Parent url={url}>
                                    <span>{title}</span>
                                </Parent>
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
