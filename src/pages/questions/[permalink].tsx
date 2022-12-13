import Layout from 'components/Layout'
import PostLayout from 'components/PostLayout'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import { createHubSpotContact } from 'lib/utils'
import { useTopicMenu } from 'lib/useTopicMenu'
import React from 'react'
import { FullQuestion } from 'squeak-react'
import useSWR from 'swr'

import type { Question } from 'components/Questions'
import QuestionSidebar from 'components/Questions/QuestionSidebar'

type QuestionPageProps = {
    params: {
        permalink: string
    }
}

export default function QuestionPage(props: QuestionPageProps) {
    const menu = useTopicMenu()
    const { data: question } = useSWR<Question>(
        `${process.env.GATSBY_SQUEAK_API_HOST}/api/question?organizationId=${process.env.GATSBY_SQUEAK_ORG_ID}&permalink=${props.params.permalink}`,
        (url) => fetch(url).then((res) => res.json())
    )

    console.log(question)

    return (
        <Layout>
            <SEO title={`${question?.subject} - PostHog`} />
            <PostLayout
                title={question?.subject || ''}
                menu={menu}
                sidebar={<QuestionSidebar question={question} />}
                hideSurvey
            >
                {question && (
                    <section className="max-w-5xl mx-auto py-12">
                        <FullQuestion
                            apiHost="https://squeak.cloud"
                            organizationId="a898bcf2-c5b9-4039-82a0-a00220a8c626"
                            onSignUp={(user) => createHubSpotContact(user)}
                            question={question}
                        />
                    </section>
                )}
            </PostLayout>
        </Layout>
    )
}
