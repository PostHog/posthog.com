import React from 'react'
import { graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

import docs from 'sidebars/docs.json'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import { Tutorials } from 'components/Docs/Tutorials'
import { GettingStarted } from 'components/Docs/GettingStarted'
import List from 'components/List'

export const quickLinks = [
    {
        name: 'Actions',
        to: '/docs/data/actions',
        description: 'Combine and filter events to create custom actions.',
    },
    {
        name: 'Autocapture',
        to: '/docs/data/autocapture',
        description: 'Automatically capture events from your website or app.',
    },
    {
        name: 'Cohorts',
        to: '/docs/data/cohorts',
        description: 'Create groups of users based on their behavior or properties.',
    },
    {
        name: 'Data warehouse',
        to: '/docs/data-warehouse',
        description: 'Send your data to your data warehouse for analysis.',
    },
    {
        name: 'Events',
        to: '/docs/data/events',
        description: 'Core information on events and event properties.',
    },
    {
        name: 'Identify',
        to: '/docs/data/identify',
        description: 'Identify your users and their properties.',
    },
    {
        name: 'Persons',
        to: '/docs/data/persons',
        description: 'Identify your users and their properties.',
    },
    {
        name: 'Organizations & projects',
        to: '/docs/data/organizations-and-projects',
        description: 'Organize your data into projects and manage access to them.',
    },
    {
        name: 'User properties',
        to: '/docs/data/user-properties',
        description: 'Learn about user properties and how to use them.',
    },
    {
        name: 'UTM segmentation',
        to: '/docs/data/utm-segmentation',
        description: 'Segment your users based on UTM parameters.',
    },
]

type DataProps = {
    data: {
        tutorials: {
            edges: {
                node: any
            }[]
        }
    }
}

const Data: React.FC<DataProps> = ({ data }) => {
    const { tutorials } = data

    return (
        <Layout>
            <SEO title="Data - Docs - PostHog" />

            <PostLayout title={'Data'} menu={docs} hideSurvey hideSidebar>
                <StaticImage
                    alt=""
                    placeholder="none"
                    quality={100}
                    className="w-full sm:w-[400px] sm:float-right sm:ml-8 sm:-mt-8 sm:mb-8"
                    src="../../components/Product/images/hogs/data-warehouse.png"
                />
                <h1 className="text-4xl mb-2 mt-6">Data management</h1>
                <h3 className="text-lg font-semibold text-primary/60 dark:text-primary-dark/75">
                    Manage event and customer data used throughout the PostHog suite.
                </h3>

                {/* Quick links */}
                <section className="mt-12 mb-4">
                    <h3 className="mb-6 mt-0">Quick links</h3>
                    <List
                        className="grid md:grid-cols-2 gap-1"
                        items={quickLinks.map(({ name, to, description }) => ({
                            label: name,
                            url: to,
                            description,
                        }))}
                    />
                </section>

                {/* Get started section */}
                <section className="py-6 sm:pb-12">
                    <GettingStarted
                        product="Data management"
                        title="Data management primer"
                        description="Learn how to manage event data in PostHog."
                        link="/docs/data/data-management"
                    ></GettingStarted>
                </section>

                <Tutorials tutorials={tutorials} />
            </PostLayout>
        </Layout>
    )
}

export default Data

export const query = graphql`
    query Data {
        tutorials: allMdx(
            limit: 6
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { tags: { in: ["data management"] } }, fields: { slug: { regex: "/^/tutorials/" } } }
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
