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

const quickLinks = [
    {
        name: 'Creating an experiment',
        to: '/docs/experiments/manual#creating-an-experiment',
        description: 'Create an experiment to test a hypothesis.',
    },
    {
        name: 'Statistical significance',
        to: '/docs/experiments/significance',
        description: 'Notes on how to interpret statistical significance.',
    },
    {
        name: 'Under the hood',
        to: '/docs/experiments/under-the-hood',
        description: 'Detailed information on how experiments work',
    },
]

type ExperimentsProps = {
    data: {
        tutorials: {
            edges: {
                node: any
            }[]
        }
    }
}

const Experiments: React.FC<ExperimentsProps> = ({ data }) => {
    const { tutorials } = data

    return (
        <Layout>
            <SEO title="Experiments - Docs - PostHog" />

            <PostLayout title={'Experiments'} menu={docs} hideSurvey hideSidebar>
                <StaticImage
                    alt=""
                    placeholder="none"
                    quality={100}
                    className="w-full sm:w-[400px] sm:float-right sm:ml-8 sm:-mt-8 sm:mb-8"
                    src="../../components/Home/Slider/images/ab-testing-hog.png"
                />
                <h1 className="text-4xl mb-2 mt-6">Experiments</h1>
                <h3 className="text-lg font-semibold text-primary/60 dark:text-primary-dark/75 leading-tighttext-lg text-gray">
                    Test changes in production with an experimentation suite that makes it easy to get the results you
                    want.
                </h3>

                {/* Get started section */}
                <section className="py-6 sm:py-12">
                    <GettingStarted
                        product="Experiments"
                        title="Roll out your first feature"
                        description="Start A/B testing your features in minutes."
                        link="/docs/experiments/manual#creating-an-experiment"
                    ></GettingStarted>
                </section>

                {/* Quick links */}
                <section className="my-6">
                    <h3 className="mb-6 mt-0">Quick links</h3>
                    <LinkGrid links={quickLinks} />
                </section>

                <Tutorials tutorials={tutorials} />
            </PostLayout>
        </Layout>
    )
}

export default Experiments

export const query = graphql`
    query Experiments {
        tutorials: allMdx(
            limit: 6
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { tags: { in: ["experimentation"] } }, fields: { slug: { regex: "/^/tutorials/" } } }
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
                            childImageSharp {
                                gatsbyImageData(placeholder: NONE)
                            }
                        }
                    }
                }
            }
        }
    }
`
