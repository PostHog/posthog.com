import React from 'react'
import { graphql } from 'gatsby'
import { IGatsbyImageData, StaticImage } from 'gatsby-plugin-image'

import docs from 'sidebars/docs.json'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import { Tutorials } from 'components/Docs/Tutorials'
import { LinkGrid } from 'components/Docs/LinkGrid'
import { GettingStarted } from 'components/Docs/GettingStarted'

const quickLinks = [
    {
        name: 'Insights',
        to: '/docs/product-analytics/insights',
        description: 'Learn how to use PostHog to understand your users and product.',
    },
    {
        name: 'Identify users',
        to: '/docs/product-analytics/identify-users',
        description: 'Learn how to identify users in PostHog.',
    },
    {
        name: 'User properties',
        to: '/docs/product-analytics/user-properties',
        description: 'Learn how to use user properties in PostHog.',
    },
]

type DataProps = {
    data: {
        tutorials: {
            nodes: {
                slug: string
                frontmatter: {
                    title: string
                    featuredImage: {
                        childImageSharp: {
                            gatsbyImageData: IGatsbyImageData
                        }
                    }
                }
            }[]
        }
    }
}

const Data: React.FC<DataProps> = ({ data }) => {
    const { tutorials } = data

    return (
        <Layout>
            <SEO title="Data - Docs - PostHog" />

            <PostLayout title={'Data'} menu={docs} hideSurvey fullWidthContent>
                <h1 className="text-4xl mb-2 mt-6">Data management</h1>
                <h3 className="text-lg text-gray">Get a complete picture of your users and events.</h3>

                {/* Get started section */}
                <section className="py-12">
                    <GettingStarted
                        product="Data management"
                        title="Get started with data management"
                        description="Learn how to get started with PostHog's data management features. Create cohorts, actions, and more."
                        link="/docs/data/start-here"
                    >
                        <StaticImage
                            alt=""
                            placeholder="none"
                            quality={100}
                            className="w-[400px]"
                            src="../../components/Product/images/hogs/data-warehouse.png"
                        />
                    </GettingStarted>
                </section>

                {/* Quick links */}
                <section className="my-12">
                    <h3 className="mb-6 mt-0">Quick links</h3>
                    <LinkGrid links={quickLinks} />
                </section>

                <section className="my-12">
                    <h3 className="mb-6">Tutorials</h3>
                    <Tutorials tutorials={tutorials.nodes} />
                </section>
            </PostLayout>
        </Layout>
    )
}

export default Data

export const query = graphql`
    query Data {
        tutorials: allMdx(filter: { frontmatter: { featuredTutorial: { eq: true } } }) {
            nodes {
                slug
                frontmatter {
                    title
                    featuredImage {
                        childImageSharp {
                            gatsbyImageData(placeholder: NONE)
                        }
                    }
                }
            }
        }
    }
`
