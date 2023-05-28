import React from 'react'
import { graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

import docs from 'sidebars/docs.json'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import { Tutorials } from 'components/Docs/Tutorials'
import { LinkGrid } from 'components/Docs/LinkGrid'
import { GettingStarted } from 'components/Docs/GettingStarted'

export const quickLinks = [
    {
        name: 'Product manual',
        to: '/docs/feature-flags/manual',
        description: 'Learn how to use feature flags.',
    },
    {
        name: 'Bootstrapping & local evaluation',
        to: '/docs/feature-flags/bootstrapping-and-local-evaluation',
        description: 'Bootstrap and evaluate flags locally when you need an immediate response.',
    },
    {
        name: 'Rollout strategies',
        to: '/docs/feature-flags/rollout-strategies',
        description: 'Control how your feature flags are rolled out to your users.',
    },
    {
        name: 'Multivariate flags',
        to: '/docs/feature-flags/multivariate-flags',
        description: 'Test features with multiple variants.',
    },
    {
        name: 'Payloads',
        to: '/docs/feature-flags/payloads',
        description: 'Add configuration data to your feature flags with JSON payloads',
    },
    {
        name: 'Early Access Feature management',
        to: '/docs/feature-flags/early-access-feature-management',
        description: 'Give your users the ability to opt-in to early access features',
    },
    {
        name: 'Common questions',
        to: '/docs/feature-flags/common-questions',
        description: 'Common questions about feature flags and how to solve them.',
    },
]

type FeatureFlagsProps = {
    data: {
        tutorials: {
            edges: {
                node: any
            }[]
        }
    }
}

export const Intro = ({ image = true }) => (
    <>
        {image && (
            <StaticImage
                alt=""
                placeholder="none"
                quality={100}
                className="w-full sm:w-[400px] sm:float-right sm:ml-8 sm:-mt-8 sm:mb-8"
                src="../../components/Home/Slider/images/feature-flags-hog.png"
            />
        )}
        <h1 className="text-4xl mb-2 mt-6">Feature flags</h1>
        <h3 className="text-lg font-semibold text-primary/60 dark:text-primary-dark/75 leading-tight">
            Toggle features for cohorts or individuals to test the impact before rolling out to everyone.
        </h3>

        {/* Quick links */}
        <section className="my-6">
            <h3 className="mb-6 mt-0">Pages</h3>
            <LinkGrid links={quickLinks} />
        </section>
    </>
)

const FeatureFlags: React.FC<FeatureFlagsProps> = ({ data }) => {
    const { tutorials } = data

    return (
        <Layout>
            <SEO title="Feature flags - Docs - PostHog" />

            <PostLayout title={'Feature flags'} menu={docs} hideSurvey hideSidebar>
                <Intro />
                {/* Get started section */}
                <section className="py-6 sm:py-12">
                    <GettingStarted
                        product="Feature flags"
                        title="Create your first feature flag"
                        description="Learn how to create a feature flag and toggle it on and off for different users."
                        link="/docs/feature-flags/manual#creating-feature-flags"
                    ></GettingStarted>
                </section>

                <Tutorials tutorials={tutorials} />
            </PostLayout>
        </Layout>
    )
}

export default FeatureFlags

export const query = graphql`
    query FeatureFlags {
        tutorials: allMdx(
            limit: 6
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { tags: { in: ["feature flags"] } }, fields: { slug: { regex: "/^/tutorials/" } } }
        ) {
            edges {
                node {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        date(formatString: "MMM 'YY")
                        Category: tags
                        Contributor: authorData {
                            id
                            image {
                                childImageSharp {
                                    gatsbyImageData(width: 36, height: 36)
                                }
                            }
                            name
                        }
                        featuredImage {
                            gatsbyImageData
                        }
                    }
                }
            }
        }
    }
`
