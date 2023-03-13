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
        to: '/docs/session-recording/troublehsooting',
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
                    className="w-full sm:w-[400px] float-right ml-8 -mt-8 mb-8"
                    src="../../components/Home/Slider/images/session-recording-hog.png"
                />
                <h1 className="text-4xl mb-2 mt-6">Session recording</h1>
                <h3 className="text-lg text-gray">
                    Play back sessions to diagnose UI issues, improve support and get inspired.
                </h3>

                {/* Get started section */}
                <section className="pt-4 pb-0">
                    <GettingStarted
                        articleType="Pinned"
                        title="Record your first session"
                        description="Flip a switch to start capturing session recordings in minutes."
                        link="/docs/session-recording/start-here"
                    ></GettingStarted>
                </section>

                {/* Quick links */}
                <section className="my-12">
                    <h3 className="mb-6 mt-0">Quick links</h3>
                    <LinkGrid links={quickLinks} />
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
