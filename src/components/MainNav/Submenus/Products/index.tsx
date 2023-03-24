import CallToAction from '../CallToAction'
import Link from 'components/Link'
import React from 'react'
import { Wrapper } from '../Wrapper'
import {
    AbTesting,
    Analytics,
    API,
    AppLibrary,
    CorrelationAnalysis,
    DataWarehouse,
    EventPipelines,
    FeatureFlags,
    Heatmaps,
    SelfHosting,
    SessionRecording,
    SQL,
} from 'components/ProductIcons'
import { graphql, useStaticQuery } from 'gatsby'
import { Link as ScrollLink } from 'react-scroll'
import { useLocation } from '@reach/router'
import { Hasura, Phantom, Ycombinator } from './Icons'
import { Webhooks } from 'components/NotProductIcons'

interface Features {
    title: string
    description?: string
    icon?: React.ReactNode
    url?: string
}

interface productOSItem {
    title: string
    features: Features[]
}

const ProductItem = ({ title, icon, url }) => {
    return (
        <li className="md:max-w-[100px]">
            <Link
                className="group h-full cursor-pointer rounded-sm md:px-2 py-2 hover:bg-tan hover:bg-opacity-50 flex flex-col justify-start items-center space-y-2 relative hover:scale-[1.01] hover:top-[-.5px] active:top-[.5px] active:scale-[.99]"
                to={url}
            >
                <span className="w-7 h-7 text-black dark:text-white opacity-60 group-hover:opacity-100">{icon}</span>
                <h3 className="text-sm m-0 opacity-70 font-bold text-center leading-none">{title}</h3>
            </Link>
        </li>
    )
}

const productOSItem: productOSItem[] = [
    {
        title: 'Build on Product OS',
        features: [
            {
                title: 'Event pipelines',
                description: 'with autocapture',
                icon: <EventPipelines />,
            },
            {
                title: 'Data warehouse',
                description: 'powered by ClickHouse',
                icon: <DataWarehouse />,
            },
            {
                title: 'SQL access',
                icon: <SQL />,
            },
            {
                title: 'Warehouse sync',
                description: 'works with Segment, Rudderstack',
                icon: <SelfHosting />,
            },
            {
                title: 'Webhooks',
                icon: <Webhooks />,
            },
            {
                title: 'API',
                icon: <API />,
            },
        ],
    },
]

const iconClasses = 'h-[25px] text-black dark:text-white'

export default function Product({ referenceElement }: { referenceElement: HTMLDivElement }) {
    const {
        customers: { nodes: customers, totalCount },
    } = useStaticQuery(query)

    const { pathname } = useLocation()

    return (
        <Wrapper borderRadius="0px 0.375rem 0.375rem" referenceElement={referenceElement} placement="bottom-start">
            <div className="rounded-md md:flex">
                <section className="p-6 border-r border-gray-accent-light border-dashed flex flex-col">
                    <h3 className="text-[18px] font-bold m-0 text-black pl-2">Products</h3>
                    <ol className="grid grid-cols-2 md:grid-cols-4 space-x-[1px] list-none p-0 pb-4 border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark mt-2 mb-6 -mx-6 px-6">
                        <ProductItem title="Product analytics" icon={<Analytics />} url="/product-analytics" />
                        <ProductItem title="Session replay" icon={<SessionRecording />} url="/session-replay" />
                        <ProductItem title="Feature flags" icon={<FeatureFlags />} url="/feature-flags" />
                        <ProductItem title="A/B testing" icon={<AbTesting />} url="/ab-testing" />
                    </ol>

                    {productOSItem.map(({ title, features }) => {
                        return (
                            <div key={title}>
                                <div className="flex items-center w-full justify-between opacity-70">
                                    <h3 className="text-[18px] font-bold m-0 text-black pl-2">{title}</h3>
                                </div>
                                <p className="pl-2 text-75 text-sm">
                                    Our customer &amp; event data platform that ships (free) with all products
                                </p>
                                <ol className="grid grid-cols-2 space-x-[1px] list-none p-0 mx-0 mt-2 mb-6">
                                    {features.map(({ title, icon, description, ...other }: Features) => {
                                        const anchor = pathname?.startsWith('/product') && other.url?.includes('#')
                                        const MenuLink = anchor ? ScrollLink : Link
                                        const url: string | undefined = anchor ? other.url?.split('#')[1] : other.url

                                        return (
                                            <li
                                                key={title}
                                                className="h-full max-w-[235px] rounded-sm md:px-2 py-2 flex items-start space-x-2"
                                            >
                                                <div className="shrink-0 grow-0 basis-[24px]">
                                                    <span className="w-7 h-7 text-black dark:text-white opacity-60">
                                                        {icon}
                                                    </span>
                                                </div>
                                                <div className="flex-1 mt-1">
                                                    <h3 className="text-[15px] m-0 opacity-70 font-bold leading-none">
                                                        {title}
                                                    </h3>
                                                    <p className="text-xs opacity-60 mt-1 mb-0">{description}</p>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ol>
                            </div>
                        )
                    })}

                    <CallToAction className="inline-block mt-auto !w-full" to="/product-os">
                        Learn more
                    </CallToAction>
                </section>
                <section className="bg-gray-accent-light bg-opacity-10 py-6 px-3">
                    <h3 className="text-[18px] font-bold m-0 text-black/70 pl-3">Customer stories</h3>
                    <ol className="m-0 list-none p-0 max-w-[250px] mt-2">
                        <Link
                            className="rounded-sm py-2 mb-1 px-3 block hover:bg-tan hover:bg-opacity-50 relative active:top-[1px] active:scale-[.99]"
                            to="/customers/ycombinator"
                        >
                            <Ycombinator className={iconClasses} />
                            <p className="text-sm opacity-50 m-0 text-black font-medium dark:text-white mt-1 leading-tight">
                                Used PostHog experiments to boost engagement by 40%
                            </p>
                        </Link>
                        <Link
                            className="rounded-sm py-2 mb-1 px-3 block hover:bg-tan hover:bg-opacity-50 relative active:top-[1px] active:scale-[.99]"
                            to="/customers/hasura"
                        >
                            <Hasura className={iconClasses} />
                            <p className="text-sm opacity-50 m-0 text-black font-medium dark:text-white mt-1 leading-tight">
                                Used PostHog insights to increase conversion rates by 20%
                            </p>
                        </Link>
                        <Link
                            className="rounded-sm py-2 px-3 block hover:bg-tan hover:bg-opacity-50 relative active:top-[1px] active:scale-[.99]"
                            to="/customers/phantom"
                        >
                            <Phantom className={iconClasses} />
                            <p className="text-sm opacity-50 m-0 text-black font-medium dark:text-white mt-1 leading-tight">
                                Used PostHog feature flags to cut failure rates by 90%
                            </p>
                        </Link>
                    </ol>
                    <CallToAction
                        className="mt-4 !w-full inline-flex items-center justify-center space-x-1"
                        to="/customers"
                    >
                        <span>All customer stories</span>{' '}
                        <span className="opacity-50">
                            (<span className="inline-block mx-0">{totalCount}</span>)
                        </span>
                    </CallToAction>
                </section>
            </div>
        </Wrapper>
    )
}

const query = graphql`
    {
        customers: allMdx(filter: { fields: { slug: { regex: "/^/customers/" } } }, limit: 3) {
            nodes {
                id
                fields {
                    slug
                }
                frontmatter {
                    logo {
                        publicURL
                    }
                    title
                }
            }
            totalCount
        }
    }
`
