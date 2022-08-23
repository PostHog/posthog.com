import CallToAction from '../CallToAction'
import Link from 'components/Link'
import React from 'react'
import SearchBar from 'components/Docs/SearchBar'
import { Wrapper } from '../Wrapper'
import ProductIcons from 'components/ProductIcons'
import { graphql, useStaticQuery } from 'gatsby'
import LogoVendasta from './vendasta.svg'
import LogoHasura from './hasura.svg'
import LogoPhantom from './phantom.svg'

interface Features {
    title: string
    icon?: React.ReactNode
    url?: string
}

interface LeftColMenuItems {
    title: string
    features: Features[]
}

const leftColMenuItems: LeftColMenuItems[] = [
    {
        title: 'Features',
        features: [
            {
                title: 'Product analytics',
                icon: ProductIcons.funnels,
                url: '/product#product-analytics',
            },
            {
                title: 'Session recording',
                icon: ProductIcons.sessionRecording,
                url: '/product/session-recording',
            },
            {
                title: 'Heatmaps',
                icon: ProductIcons.heatmaps,
                url: '/product/heatmaps',
            },
            {
                title: 'Feature flags',
                icon: ProductIcons.featureFlags,
                url: '/product/feature-flags',
            },
            {
                title: 'A/B testing',
                icon: ProductIcons.abTesting,
                url: '/product/experimentation-suite',
            },
            {
                title: 'Correlation analysis',
                icon: ProductIcons.correlationAnalysis,
                url: '/product/correlation-analysis',
            },
        ],
    },
    {
        title: 'Data stack',
        features: [
            {
                title: 'Event pipelines',
                icon: ProductIcons.eventPipelines,
                url: '/product#event-pipelines',
            },
            {
                title: 'Data warehouse',
                icon: ProductIcons.dataWarehouse,
                url: '/product#data-warehouse',
            },
            {
                title: 'App library',
                icon: ProductIcons.appLibrary,
                url: '/product#apps',
            },
            {
                title: 'Self-hosting',
                icon: ProductIcons.selfHosting,
                url: '/product#self-hosting',
            },
            {
                title: 'API',
                icon: ProductIcons.api,
                url: '/product#api',
            },
        ],
    },
]

export default function Product({ referenceElement }: { referenceElement: HTMLDivElement }) {
    const {
        customers: { nodes: customers, totalCount },
    } = useStaticQuery(query)

    return (
        <Wrapper borderRadius="0px 0.375rem 0.375rem" referenceElement={referenceElement} placement="bottom-start">
            <div className="rounded-md md:flex">
                <section className="p-6 border-r border-gray-accent-light border-dashed flex flex-col">
                    <div className="grid grid-cols-2 gap-x-6">
                        {leftColMenuItems.map(({ title, features }) => {
                            return (
                                <div key={title}>
                                    <div className="flex items-center w-full justify-between opacity-70">
                                        <h3 className="text-[18px] font-bold m-0 text-black pl-2">{title}</h3>
                                    </div>
                                    <ol className="m-0 list-none p-0 mt-2">
                                        {features.map(({ title, icon, url }: Features, index) => {
                                            return (
                                                <li key={title}>
                                                    <Link
                                                        className="rounded-sm md:px-2 py-2 hover:bg-tan hover:bg-opacity-50 flex items-center space-x-2 relative active:top-[1px] active:scale-[.99]"
                                                        to={url}
                                                    >
                                                        <span className="w-5 h-5">{icon}</span>
                                                        <h3 className="text-base m-0 opacity-70">{title}</h3>
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ol>
                                </div>
                            )
                        })}
                    </div>
                    <CallToAction className="inline-block mt-auto !w-full" to="/product">
                        Product overview
                    </CallToAction>
                </section>
                <section className="bg-gray-accent-light bg-opacity-10 py-6 px-3">
                    <h3 className="text-[18px] font-bold m-0 text-black/70 pl-3">Customer stories</h3>
                    <ol className="m-0 list-none p-0 max-w-[250px] mt-2">
                        <Link
                            className="rounded-sm py-2 mb-1 px-3 block hover:bg-tan hover:bg-opacity-50 relative active:top-[1px] active:scale-[.99]"
                            to="/customers/vendasta"
                        >
                            <img className="h-[25px]" src={LogoVendasta} />
                            <p className="text-sm opacity-50 m-0 text-black font-medium dark:text-white mt-1 leading-tight">
                                How Vendesta replaced Snowplow and cut onboarding drop-off by 50%
                            </p>
                        </Link>
                        <Link
                            className="rounded-sm py-2 mb-1 px-3 block hover:bg-tan hover:bg-opacity-50 relative active:top-[1px] active:scale-[.99]"
                            to="/customers/hasura"
                        >
                            <img className="h-[25px]" src={LogoHasura} />
                            <p className="text-sm opacity-50 m-0 text-black font-medium dark:text-white mt-1 leading-tight">
                                How Hasura improved conversion rates by 10-20% with PostHog
                            </p>
                        </Link>
                        <Link
                            className="rounded-sm py-2 px-3 block hover:bg-tan hover:bg-opacity-50 relative active:top-[1px] active:scale-[.99]"
                            to="/customers/phantom"
                        >
                            <img className="h-[25px]" src={LogoPhantom} />
                            <p className="text-sm opacity-50 m-0 text-black font-medium dark:text-white mt-1 leading-tight">
                                How Phantom enhanced its product and cut failure rates by 90%
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
