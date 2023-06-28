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
        icon: 'GraduationCap',
        name: 'Start here',
        to: '/docs/session-replay/hey',
        color: 'red',
    },
    {
        name: 'Product manual',
        to: '/docs/session-replay/manual',
        description: 'How to use session replay.',
    },
    {
        name: 'Privacy controls',
        to: '/docs/session-replay/privacy',
        description: 'Settings for customizing session replay privacy.',
    },
    {
        name: 'Sharing and emedding',
        to: '/docs/session-replay/sharing',
        description: 'Share and embed session replays in your product.',
    },
    {
        name: 'Data retention',
        to: '/docs/session-replay/data-retention',
        description: 'Adjust how long session replays are stored when self-hosting.',
    },
    {
        name: 'Troubleshooting & FAQs',
        to: '/docs/session-replay/troubleshooting',
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

export const Intro = ({ image = true }) => {
    return (
        <>
            {image && (
                <StaticImage
                    alt=""
                    placeholder="none"
                    quality={100}
                    className="w-full sm:w-[400px] sm:float-right sm:ml-8 sm:-mt-8 sm:mb-8"
                    src="../../components/Home/Slider/images/session-recording-hog.png"
                />
            )}
            <h1 className="text-4xl mt-0 mb-2">Session replay</h1>
            <h3 className="text-lg font-semibold text-primary/60 dark:text-primary-dark/75 leading-tight">
                Play back sessions to diagnose UI issues, improve support, and get context for nuanced user behavior.
            </h3>

            {/* Quick links */}
            <section className="my-12">
                <h3 className="mb-6 mt-0">Pages</h3>
                <List
                    className="grid md:grid-cols-2 gap-1"
                    items={quickLinks.map(({ color, icon, name, to, description }) => ({
                        label: name,
                        url: to,
                        icon,
                        iconColor: color,
                        description,
                    }))}
                />
            </section>
        </>
    )
}

const SessionRecording: React.FC<SessionRecordingProps> = ({ data }) => {
    const { tutorials } = data

    return (
        <Layout>
            <SEO title="Session replay - Docs - PostHog" />

            <PostLayout title={'Session replay'} menu={docs} hideSurvey hideSidebar>
                <Intro />
                {/* Get started section */}
                <section className="pt-4 pb-0">
                    <GettingStarted
                        articleType="Pinned"
                        title="Record your first session"
                        description="Flip a switch to start capturing session replays in minutes."
                        link="/docs/session-replay/manual#enabling-session-recording"
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
            filter: { frontmatter: { tags: { in: ["session replay"] } }, fields: { slug: { regex: "/^/tutorials/" } } }
        ) {
            edges {
                node {
                    excerpt
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
