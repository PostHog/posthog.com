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

type FeatureFlagsProps = {
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

const FeatureFlags: React.FC<FeatureFlagsProps> = ({ data }) => {
    const { tutorials } = data

    return (
        <Layout>
            <SEO title="Feature flags - Docs - PostHog" />

            <PostLayout title={'Feature flags'} menu={docs} hideSurvey fullWidthContent>
                <h1 className="text-4xl mb-2 mt-6">Feature flags</h1>
                <h3 className="text-lg text-gray">
                    Toggle features for cohorts or individuals to test the impact before rolling out to everyone.
                </h3>

                {/* Get started section */}
                <section className="py-12">
                    <GettingStarted
                        product="Feature flags"
                        title="Roll out your first feature"
                        description="Learn how to create a feature flag and toggle it on and off for different users."
                        link="/docs/feature-flags/start-here"
                    >
                        <StaticImage
                            alt=""
                            placeholder="none"
                            quality={100}
                            className="w-[400px]"
                            src="../../components/Home/Slider/images/feature-flags-hog.png"
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

export default FeatureFlags

export const query = graphql`
    query FeatureFlags {
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
