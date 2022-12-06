import Breadcrumbs from 'components/Breadcrumbs'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import { createHubSpotContact } from 'lib/utils'
import React from 'react'
// import { Question } from 'squeak-react'

type QuestionPageProps = {
    pageContext: {
        id: string
    }
    data: {
        question: {
            id: string
            permalink: string
            published: boolean
            subject: string
            replies: {
                id: string
                body: string
                profile: {
                    id: string
                    avatar: string
                }
                created_at: string
            }[]
        }
    }
    params: {
        permalink: string
    }
}

export default function QuestionPage(props: QuestionPageProps) {
    console.log(props)
    return (
        <Layout>
            <SEO title={`${props.data.question.subject} - PostHog`} />
            <Breadcrumbs
                crumbs={[{ title: 'Questions', url: '/questions' }]}
                darkModeToggle
                className="px-4 mt-4 sticky top-[-2px] z-10 bg-tan dark:bg-primary"
            />
            <section className="max-w-3xl mx-auto py-12">
                {props.data.question.subject}
                {/*<Question
                    onSignUp={(user) => createHubSpotContact(user)}
                    apiHost="https://squeak.cloud"
                    organizationId="a898bcf2-c5b9-4039-82a0-a00220a8c626"
                    question={props.data.question}
                />*/}
            </section>
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
            replies {
                id
                profile {
                    id
                    avatar
                }
                body
                created_at
            }
        }
    }
`
