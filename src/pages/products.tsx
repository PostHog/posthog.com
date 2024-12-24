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

interface ProductListingProps {
    name: string
    description: string
    freeTierLimit: string
    startingPrice: string
    url: string
}

const ProductListing: FC<ProductListingProps> = ({ name, description, freeTierLimit, startingPrice, url }) => {
    return (
        <div className="flex flex-col items-start gap-2 bg-white dark:bg-accent-dark p-4 border border-light dark:border-dark">
            <h2 className="text-lg mb-0">{name}</h2>
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
                                <ProductListing 
                                    name="Product analytics"
                                    description="Funnels, Graphs & trends, User paths, Correlation analysis, Retention, Stickiness, Lifecycle, Dashboards, HogQL"
                                    freeTierLimit="1 million events/mo"
                                    startingPrice="$0.0000500"
                                    url="/product-analytics"
                                />
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
