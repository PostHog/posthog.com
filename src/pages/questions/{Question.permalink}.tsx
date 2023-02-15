import Layout from 'components/Layout'
import PostLayout from 'components/PostLayout'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import { createHubSpotContact } from 'lib/utils'
import React from 'react'
import { FullQuestion } from 'squeak-react'
import community from 'sidebars/community.json'

import type { Question } from 'components/Questions'
import QuestionSidebar from 'components/Questions/QuestionSidebar'
import Link from 'components/Link'

type QuestionPageProps = {
    pageContext: {
        id: string
    }
    data: {
        question: Question
    }
    params: {
        permalink: string
    }
}

export default function QuestionPage(props: QuestionPageProps) {
    return (
        <Layout>
            <SEO title={`${props.data.question.subject} - PostHog`} />
            <PostLayout
                title={props.data.question.subject}
                menu={community}
                sidebar={<QuestionSidebar question={props.data.question} />}
                hideSurvey
            >
                <section className="max-w-5xl mx-auto pb-12">
                    <div className="mb-4">
                        <Link to="/questions" className="text-gray hover:text-gray-accent-light">
                            ← Back to Questions
                        </Link>
                    </div>

                    <FullQuestion
                        apiHost={process.env.GATSBY_SQUEAK_API_HOST as string}
                        organizationId={process.env.GATSBY_SQUEAK_ORG_ID as string}
                        onSignUp={(user) => createHubSpotContact(user)}
                        question={props.data.question}
                    />
                </section>
            </PostLayout>
        </Layout>
    )
}

export const query = graphql`
    query ($id: String!) {
        question(id: { eq: $id }) {
            id
            subject
            published
            permalink
            profile {
                id
                avatar
                first_name
                last_name
            }
            topics {
                topic {
                    label
                }
            }
            replies {
                id
                published
                profile {
                    id
                    avatar
                    first_name
                    last_name
                }
                body
                created_at
            }
        }
    }
`
