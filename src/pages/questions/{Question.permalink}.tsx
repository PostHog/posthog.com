import Layout from 'components/Layout'
import PostLayout, { SidebarSection } from 'components/PostLayout'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import { createHubSpotContact } from 'lib/utils'
import { useTopicMenu } from 'lib/useTopicMenu'
import React from 'react'
import { FullQuestion } from 'squeak-react'

type Question = {
    id: string
    permalink: string
    published: boolean
    subject: string
    profile: {
        id: string
    }
    replies: {
        id: string
        body: string
        published: boolean
        profile: {
            id: string
            avatar: string
        }
        created_at: string
    }[]
}

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

const QuestionSidebar = ({ question }: { question: Question }) => {
    return (
        <div>
            <SidebarSection title="Posted by">{question.profile.id}</SidebarSection>
        </div>
    )
}

export default function QuestionPage(props: QuestionPageProps) {
    const menu = useTopicMenu()

    return (
        <Layout>
            <SEO title={`${props.data.question.subject} - PostHog`} />
            <PostLayout
                title={props.data.question.subject}
                menu={menu}
                sidebar={<QuestionSidebar question={props.data.question} />}
                hideSurvey
            >
                <section className="max-w-5xl mx-auto py-12">
                    <FullQuestion
                        apiHost="https://squeak.cloud"
                        organizationId="a898bcf2-c5b9-4039-82a0-a00220a8c626"
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
