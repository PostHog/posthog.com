import Layout from 'components/Layout'
import PostLayout from 'components/PostLayout'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import React from 'react'
import { Question } from 'components/Squeak'
import community from 'sidebars/community.json'

import QuestionSidebar from 'components/Questions/QuestionSidebar'
import Link from 'components/Link'

type QuestionPageProps = {
    pageContext: {
        id: string
    }
    data: {
        squeakQuestion: {
            subject: string
            squeakId: string
        }
    }
    params: {
        permalink: string
    }
}

export default function QuestionPage(props: QuestionPageProps) {
    console.log(props)

    if (!props?.data?.squeakQuestion) {
        return null
    }

    return (
        <Layout>
            <SEO title={`${props.data.squeakQuestion.subject} - PostHog`} />
            <PostLayout
                title={props.data.squeakQuestion.subject}
                menu={community}
                sidebar={<QuestionSidebar question={props.data.squeakQuestion} />}
                hideSurvey
            >
                <section className="max-w-5xl mx-auto pb-12">
                    <div className="mb-4">
                        <Link to="/questions" className="text-gray hover:text-gray-accent-light">
                            ← Back to Questions
                        </Link>
                    </div>

                    <Question id={props.data.squeakQuestion.squeakId} question={props.data.squeakQuestion} />
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
            profile {
                id
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
                id
                profile {
                    id
                    avatar {
                        url
                    }
                    firstName
                    lastName
                }
                body
                createdAt
            }
        }
    }
`
