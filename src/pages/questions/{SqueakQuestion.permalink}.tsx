import Layout from 'components/Layout'
import PostLayout from 'components/PostLayout'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import React from 'react'
import { Question } from 'components/Squeak'
import community from 'sidebars/community.json'

import QuestionSidebar from 'components/Questions/QuestionSidebar'
import Link from 'components/Link'
import { QuestionData, StrapiRecord } from 'lib/strapi'
import { RightArrow } from 'components/Icons'

type QuestionPageProps = {
    pageContext: {
        id: string
    }
    location: any
    data: {
        squeakQuestion: {
            id: string
            squeakId: number
            subject: string
            permalink: string
            resolved: boolean
            profile: {
                squeakId: number
                avatar: {
                    url: string
                }
                firstName: string
                lastName: string
            }
            topics: {
                label: string
            }[]
            replies: {
                id: number
                publishedAt: string
                profile: {
                    squeakId: number
                    avatar: {
                        url: string
                    }
                    firstName: string
                    lastName: string
                }
                body: string
                createdAt: string
                updatedAt: string
            }[]
        }
    }
    params: {
        permalink: string
    }
}

export default function QuestionPage(props: QuestionPageProps) {
    const { squeakQuestion } = props.data
    const previous = props?.location?.state?.previous || { title: 'Questions', url: '/questions' }

    // Remap the data to match the Strapi format
    const question: StrapiRecord<QuestionData> = {
        id: squeakQuestion.squeakId,
        attributes: {
            subject: squeakQuestion.subject,
            permalink: squeakQuestion.permalink,
            resolved: squeakQuestion.resolved,
            profile: {
                data: {
                    id: squeakQuestion.profile.squeakId,
                    attributes: {
                        avatar: {
                            data: {
                                id: 0,
                                attributes: {
                                    url: squeakQuestion.profile.avatar?.url,
                                },
                            },
                        },
                        firstName: squeakQuestion.profile.firstName,
                        lastName: squeakQuestion.profile.lastName,
                    },
                },
            },
            replies: {
                data: squeakQuestion.replies.map((reply) => ({
                    id: reply.id,
                    attributes: {
                        body: reply.body,
                        createdAt: reply.createdAt,
                        updatedAt: reply.updatedAt,
                        publishedAt: reply.publishedAt,
                        profile: {
                            data: {
                                id: reply.profile.squeakId,
                                attributes: {
                                    avatar: {
                                        data: {
                                            id: 0,
                                            attributes: {
                                                url: reply.profile.avatar?.url,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                })),
            },
        },
    }

    return (
        <Layout>
            <SEO title={`${props.data.squeakQuestion.subject} - PostHog`} />
            <PostLayout
                title={props.data.squeakQuestion.subject}
                menu={community}
                sidebar={<QuestionSidebar question={question} />}
                hideSurvey
            >
                <section className="max-w-5xl mx-auto pb-12">
                    <div className="mb-4">
                        <Link
                            to={previous.url}
                            className="inline-flex space-x-1 p-1 pr-2 rounded hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark relative hover:scale-[1.005] active:scale-[1] hover:top-[-.5px] active:top-0"
                        >
                            <RightArrow className="-scale-x-100 w-6" />
                            <span className="text-primary dark:text-primary-dark text-[15px]">{previous.title}</span>
                        </Link>
                    </div>

                    <Question id={props.data.squeakQuestion.squeakId} question={question} expanded={true} />
                </section>
            </PostLayout>
        </Layout>
    )
}

export const query = graphql`
    query ($id: String!) {
        squeakQuestion(id: { eq: $id }) {
            id
            squeakId
            subject
            permalink
            resolved
            profile {
                squeakId
                avatar {
                    url
                }
                firstName
                lastName
            }
            topics {
                label
            }
            replies {
                squeakId
                profile {
                    squeakId
                    avatar {
                        url
                    }
                    firstName
                    lastName
                }
                body
                publishedAt
                createdAt
            }
        }
    }
`
