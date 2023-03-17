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
        to: '/docs/session-recording/manual',
        description: 'How to use session recording.',
    },
    {
        name: 'Configuration',
        to: '/docs/session-recording/configure',
        description: 'Settings for customizing session recording capture.',
    },
    {
        name: 'Data retention',
        to: '/docs/session-recording/data-retention',
        description: 'Adjust how long session recordings are stored when self-hosting.',
    },
    {
        name: 'Troublehsooting & FAQs',
        to: '/docs/session-recording/troubleshooting',
        description: 'Common issues and how to resolve them.',
    },
]

type SessionRecordingProps = {
    data: {
        tutorials: {
            edges: {
                node: any
            }[]
        }
    }
}

const SessionRecording: React.FC<SessionRecordingProps> = ({ data }) => {
    const { tutorials } = data

    return (
        <Layout>
            <SEO title="Session recording - Docs - PostHog" />

            <PostLayout title={'Session recording'} menu={docs} hideSurvey hideSidebar>
                <StaticImage
                    alt=""
                    placeholder="none"
                    quality={100}
                    className="w-full sm:w-[400px] sm:float-right sm:ml-8 sm:-mt-8 sm:mb-8"
                    src="../../components/Home/Slider/images/session-recording-hog.png"
                />
                <h1 className="text-4xl mb-2 mt-6">Session recording</h1>
                <h3 className="text-lg font-semibold text-primary/60 dark:text-primary-dark/75 leading-tight">
                    Play back sessions to diagnose UI issues, improve support, and get context for nuanced user
                    behavior.
                </h3>

                {/* Quick links */}
                <section className="my-12">
                    <h3 className="mb-6 mt-0">Pages</h3>
                    <LinkGrid links={quickLinks} />
                </section>

                {/* Get started section */}
                <section className="pt-4 pb-0">
                    <GettingStarted
                        articleType="Pinned"
                        title="Record your first session"
                        description="Flip a switch to start capturing session recordings in minutes."
                        link="/docs/session-recording/manual#enabling-session-recording"
                    ></GettingStarted>
                </section>

                <Tutorials tutorials={tutorials} />
            </PostLayout>
        </Layout>
    )
}

export default SessionRecording

export const query = graphql`
    query SessionRecording {
        tutorials: allMdx(
            limit: 6
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: {
                frontmatter: { tags: { in: ["session recording"] } }
                fields: { slug: { regex: "/^/tutorials/" } }
            }
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
