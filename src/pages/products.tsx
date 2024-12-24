import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import Tooltip from 'components/Tooltip'
import { graphql, useStaticQuery } from 'gatsby'
import slugify from 'slugify'
import TeamPatch from 'components/TeamPatch'
import { CallToAction } from 'components/CallToAction'
import { useUser } from 'hooks/useUser'
import SidebarSection from 'components/PostLayout/SidebarSection'
import { Contributor } from 'components/PostLayout/Contributors'
import { productMenu } from '../navs'
import RoadmapPreview from 'components/RoadmapPreview'
import { PRODUCT_COUNT } from '../constants'
import { FC } from 'react'
import * as Icons from '@posthog/icons'

interface ProductListingProps {
    name: string
    description: string
    freeTierLimit?: string
    startingPrice: string
    url: string
    icon: React.ReactNode
    color: string
}

const ProductListing: FC<ProductListingProps> = ({ name, description, freeTierLimit, startingPrice, url, icon, color }) => {
    return (
        <div className="flex flex-col items-start gap-2 bg-white dark:bg-accent-dark p-4 border border-light dark:border-dark">
          <div className="flex items-center gap-2">
            {icon}
            <h2 className="text-lg mb-0">{name}</h2>
            </div>
            <p className="opacity-70 text-[15px]">{description}</p>
            <dl className="grid grid-cols-2 gap-2 text-sm">
                <dt>
                    <label>Free tier</label>
                </dt>
                <dt>
                    <label>Then pricing starts at</label>
                </dt>
                <dd>
                    <p>{freeTierLimit}</p>
                </dd>
                <dd>
                    <p><strong>{startingPrice}</strong>/event</p>
                </dd>
            </dl>
            <CallToAction to={url} type="secondary" size="sm" width='auto'>Explore</CallToAction>
        </div>
    )
}

const productDetails: Record<string, {
    freeTierLimit: string
    startingPrice: string
    description: string
}> = {
    'product-analytics': {
        freeTierLimit: 'Up to 1M events/month',
        startingPrice: '$0.0000500',
        description: 'Understand user behavior with event-based analytics, cohorts, and conversion funnels',
    },
    'web-analytics': {
        freeTierLimit: 'Up to 1M pageviews/month',
        startingPrice: '$0.0000400',
        description: 'Privacy-friendly website analytics with no cookie banner required',
    },
    'session-replay': {
        freeTierLimit: 'Up to 5K recordings/month',
        startingPrice: '$0.0006000',
        description: 'Watch real users use your product to identify pain points and opportunities',
    },
    'feature-flags': {
        freeTierLimit: 'Unlimited flags',
        startingPrice: 'Free',
        description: 'Release features safely with targeted rollouts and experiments',
    },
    'experiments': {
        freeTierLimit: 'Unlimited experiments',
        startingPrice: 'Free',
        description: 'Run A/B tests to optimize your product with statistical rigor',
    },
    'surveys': {
        freeTierLimit: 'Up to 500 responses/month',
        startingPrice: '$0.1000000',
        description: 'Get qualitative feedback from the right users at the right time',
    },
    'cdp': {
        freeTierLimit: 'Up to 1M events/month',
        startingPrice: '$0.0000500',
        description: 'Send customer data anywhere with our CDP and reverse ETL pipeline',
    },
    'data-warehouse': {
        freeTierLimit: 'Up to 1M events/month',
        startingPrice: '$0.0000300',
        description: 'Query your data with SQL in our lightning-fast data warehouse',
    },
    'product-os': {
        freeTierLimit: 'Custom',
        startingPrice: 'Contact us',
        description: 'Build and scale your product with our complete product operating system',
    },
}

const Teams: React.FC = () => {
    const { james, supportTeam } = useStaticQuery(graphql`
        {
            james: squeakProfile(squeakId: { eq: 27732 }) {
                squeakId
                firstName
                lastName
                avatar {
                    url
                }
                companyRole
            }
        }
    `)
   
    const products = productMenu.children.map((product) => {
        const IconComponent = Icons[product.icon as keyof typeof Icons]
        const key = product.url.replace('/', '')
        const details = productDetails[key]
        
        return {
            name: product.name,
            description: details.description,
            url: product.url,
            startingPrice: details.startingPrice,
            freeTierLimit: details.freeTierLimit,
            icon: <IconComponent className={`text-${product.color} size-5`} />,
            color: product.color,
        }
    })

    return (
        <Layout>
            <SEO
                title="Products"
                description={`${PRODUCT_COUNT} products and counting`}
                image={`/images/og/why-posthog.png`}
            />
            <PostLayout
                title={'Handbook'}
                hideSurvey
                sidebar={
                    <SidebarSection title="From the desk of...">
                        <div className="-mx-4 pt-1">
                            <Contributor
                                url={james.squeakId && `/community/profiles/${james.squeakId}`}
                                image={james.avatar?.url}
                                name={`${james.firstName} ${james.lastName}`}
                                role={james.companyRole}
                                text
                            />
                        </div>
                    </SidebarSection>
                }
                menu={[{ name: 'Explore products', url: undefined }, ...productMenu.children]}
                tableOfContents={[
                    {
                        url: 'posthog-is-literally-designed-to-be-a-no-brainer',
                        value: 'PostHog is literally designed to be a no-brainer',
                        depth: 0,
                    },
                    {
                        url: 'popular-roadmap-items',
                        value: 'Popular roadmap items',
                        depth: 0,
                    },
                    
                ]}
            >
                <section className="mx-auto">
                    <div className="flex flex-col md:items-center md:justify-end md:flex-row-reverse gap-8 md:gap-2">
                        <div className="md:flex-1">
                            <div className="@container">
                              <div className="flex items-center gap-2">
                                <h1 className="text-2xl flex-1">All products</h1>
                                <aside>
                                  Search
                                  |
                                  Sort
                                </aside>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {products.map((product) => (
                                    <ProductListing
                                        key={product.url}
                                        {...product}
                                    />
                                ))}
                              </div>

                                

                                

                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 mt-8">
                                    <CallToAction to="https://app.posthog.com/signup">Get started - free</CallToAction>
                                    <CallToAction to="/product-analytics" type="secondary">
                                        Explore products
                                    </CallToAction>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </PostLayout>
        </Layout>
    )
}

export default Teams
